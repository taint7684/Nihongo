import crypto from'node:crypto';
import fs from'node:fs';
import{n4VocabularyBatch01}from'../src/n4-vocabulary-batch-01.js';

const research=JSON.parse(fs.readFileSync('evaluation/vocabulary-source-gap-research.json','utf8'));
const proposal=JSON.parse(fs.readFileSync('reference/vocabulary-scope-proposal-r2.json','utf8'));
const dictionary=JSON.parse(fs.readFileSync('public/dictionaries/word-evidence.json','utf8'));
const register=JSON.parse(fs.readFileSync('public/lexical-register.json','utf8'));
const audio=JSON.parse(fs.readFileSync('src/generated-audio.json','utf8'));
const courseAudio=JSON.parse(fs.readFileSync('.tmp-ui/tts-course/report.json','utf8'));
const jf=research.sources.find(item=>item.id==='jf-wordlist');
const openJlpt=research.sources.find(item=>item.id==='openjlpt-community');
const jmdict=research.sources.find(item=>item.id==='jmdict');
const jfRows=JSON.parse(fs.readFileSync(jf.artifact,'utf8'))[0].rows;
const openN4=JSON.parse(fs.readFileSync(openJlpt.artifacts.N4,'utf8'));
const dictionaryEntries=new Map(dictionary.entries.map(item=>[item.id,item]));
const normalizeKana=value=>value.trim().replace(/[ァ-ヶ]/g,char=>String.fromCharCode(char.charCodeAt(0)-0x60));
const digest=path=>crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex');
for(const [path,expected]of [[jf.artifact,jf.sha256],['.sources/edrdg-20261109/jmdict-eng.json',jmdict.sha256],[openJlpt.artifacts.N4,openJlpt.sha256.N4]])if(digest(path)!==expected)throw Error('Source hash changed: '+path);

const items=n4VocabularyBatch01.map(item=>{
  const proposalRow=proposal.entries.find(row=>row.proposedStage==='N4'&&row.key===item.text);
  if(!proposalRow||!proposalRow.minnaFunctionalLinks.includes(item.lessonNumber))throw Error('Missing proposal/lesson link '+item.text);
  const entry=dictionaryEntries.get(item.sourceReview.entryId);
  const sense=entry?.senses.find(row=>item.sourceReview.senseIds.includes(row.id));
  if(!entry||!sense)throw Error('Unresolved selected JMdict sense '+item.text);
  if(item.text!=='うがい'&&!proposalRow.dictionaryEvidence.some(row=>row.entryId===item.sourceReview.entryId&&normalizeKana(row.matchingReading)===normalizeKana(item.reading)))throw Error('JMdict crosswalk mismatch '+item.text);
  const coordinates=proposalRow.sourceCoordinates.map(coordinate=>{
    const row=jfRows.find(candidate=>candidate[`C${coordinate.row}`]===item.text);
    if(!row||normalizeKana(row[`D${coordinate.row}`])!==normalizeKana(item.reading))throw Error('Irodori coordinate mismatch '+item.text);
    return{...coordinate,verifiedText:row[`C${coordinate.row}`],verifiedReading:row[`D${coordinate.row}`]};
  });
  if(!coordinates.length)throw Error('No Irodori coordinate '+item.text);
  const openMatch=openN4.find(row=>row.word===item.text&&row.reading===item.reading);
  const lessonId='mnn-'+String(item.lessonNumber).padStart(2,'0');
  const assets=[
    audio.find(row=>!row.retired&&row.kind==='word'&&row.text===item.text&&row.reading===item.reading&&row.lessonIds.includes(lessonId)),
    audio.find(row=>!row.retired&&row.kind==='sentence'&&row.text===item.example.ja&&row.displayReading===item.example.reading&&row.lessonIds.includes(lessonId))
  ];
  if(assets.some(row=>!row||row.readingCheck.actual!==row.readingCheck.expected||!fs.existsSync('public'+row.path)))throw Error('Missing/mismatched audio '+item.text);
  return{
    text:item.text,reading:item.reading,meaningVi:item.meaning,group:item.group,
    reason:item.reason,curriculum:item.curriculum,example:item.example,
    selectedJmdict:{entryId:item.sourceReview.entryId,senseIds:item.sourceReview.senseIds,englishGloss:sense.gloss},
    irodoriCoordinates:coordinates,
    openJlptN4:{exactWordReadingMember:Boolean(openMatch),jmdictId:openMatch?.jmdict_id||null},
    ...(item.sourceReview.matcherCorrection?{matcherCorrection:item.sourceReview.matcherCorrection}:{}),
    audio:assets.map(row=>({id:row.id,path:row.path,readingCheck:row.readingCheck,status:row.status}))
  };
});

const quotas={'public-procedures':10,'medical-communication':10,'emergency-safety':10};
const sample=[];
for(const[group,count]of Object.entries(quotas)){
  const selected=items.filter(item=>item.group===group).sort((a,b)=>{
    const hash=item=>crypto.createHash('sha256').update('g4-vocab-n4-batch-01:'+item.text).digest('hex');
    return hash(a).localeCompare(hash(b));
  }).slice(0,count);
  if(selected.length!==count)throw Error('Incomplete G4 stratum '+group);
  sample.push(...selected);
}
const after={
  N5:{surfaceKeys:register.summary.N5.surfaceKeys,candidateLexemes:register.summary.N5.candidateLexemes},
  N4New:{surfaceKeys:register.summary.N4New.surfaceKeys,candidateLexemes:register.summary.N4New.candidateLexemes},
  cumulative:{surfaceKeys:register.summary.cumulative.surfaceKeys,candidateLexemes:register.summary.cumulative.candidateLexemes}
};
const before={
  N5:{surfaceKeys:806,candidateLexemes:800},
  N4New:{surfaceKeys:222,candidateLexemes:217},
  cumulative:{surfaceKeys:1038,candidateLexemes:1017}
};
if(items.length!==85||after.N4New.candidateLexemes-before.N4New.candidateLexemes!==85||after.cumulative.candidateLexemes-before.cumulative.candidateLexemes!==85)throw Error('Unexpected lexical delta');
if(courseAudio.report.filter(row=>row.status==='reading-mismatch'||row.status==='missing-curated-reading').length)throw Error('Course audio batch has held jobs');

const exactOpenOverlap=items.filter(item=>item.openJlptN4.exactWordReadingMember);
const report={
  generatedAt:new Date().toISOString(),
  batchId:'n4-vocabulary-01',
  status:'provisional N4 learning content; not an official JLPT list or complete syllabus',
  counts:{before,after,added:{n4NewCandidateLexemes:85,cumulativeCandidateLexemes:85}},
  sourceBasis:{
    irodori:{url:jf.url,artifact:jf.artifact,sha256:jf.sha256,rights:jf.use,verifiedMemberships:items.length},
    openJlpt:{url:openJlpt.url,commit:openJlpt.commit,artifact:openJlpt.artifacts.N4,sha256:openJlpt.sha256.N4,license:openJlpt.rights,listEntries:openN4.length,exactBatchWordReadingOverlap:exactOpenOverlap.length},
    minna:{edition:'Minna no Nihongo Shokyu II, second edition',scope:'Functional lesson mapping only; no exact Minna vocabulary membership claim.'},
    jmdict:{date:jmdict.date,sha256:jmdict.sha256,rights:jmdict.rights}
  },
  independentListDecision:{
    result:'Compared Irodori Elementary1/2 source coordinates with the independent Waller/OpenJLPT community N4 list. Only exact word+reading membership is treated as overlap; absence is a recorded scope disagreement, not automatic exclusion.',
    openJlptExactOverlap:exactOpenOverlap.map(item=>item.text).sort(),
    notInOpenJlptN4:items.filter(item=>!item.openJlptN4.exactWordReadingMember).length,
    warning:'OpenJLPT is an estimated community list, not an official JLPT inventory. Minna II links remain functional mappings.'
  },
  qualitySample:{
    method:'Stratified deterministic sample ordered by SHA-256 of g4-vocab-n4-batch-01:<surface>; 10 items each from public procedures, medical communication, and emergency safety.',
    sampled:sample.length,
    checks:'Compare Irodori spelling/reading coordinates, exact JMdict entry/sense and English gloss, Vietnamese contextual meaning, example usage, Minna functional link, and playable word/sentence assets.',
    result:'Author reviewed the 30-item sample against the pinned source evidence and authored context. One homographic matcher false positive for うがい was corrected before this audit; no additional confirmed content error was found. This is not independent academic approval or a whole-batch guarantee.',
    items:sample
  },
  audio:{
    jobsRequested:170,jobsWithPlayableAssets:items.length*2,held:0,
    engine:courseAudio.engine,speaker:courseAudio.speaker.name,style:courseAudio.style.name,
    status:'VOICEVOX WAV assets exist and analyzer output matches declared audio readings. No human listening or phonetic validation.'
  },
  limitations:[
    'N4 level is a project learning-scope decision, not an official JLPT word list.',
    'Minna II lesson links are functional mappings, not exact wordlist membership.',
    'OpenJLPT list absence is documented as disagreement; no source is treated as authoritative by itself.',
    'Meanings and examples are project-authored; the sample was reviewed by the author, not an independent academic reviewer.',
    'TTS playback/analyzer matching does not verify natural pronunciation.'
  ],
  items
};
fs.writeFileSync('evaluation/vocabulary-expansion-n4-batch-01.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({batchId:report.batchId,items:items.length,sample:sample.length,openJlptExactOverlap:exactOpenOverlap.length,counts:after,audio:report.audio.jobsWithPlayableAssets,report:'evaluation/vocabulary-expansion-n4-batch-01.json'},null,2));
