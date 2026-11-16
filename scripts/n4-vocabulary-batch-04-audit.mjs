import crypto from'node:crypto';
import fs from'node:fs';
import{n4VocabularyBatch04}from'../src/n4-vocabulary-batch-04.js';
import{mnnUnits}from'../src/mnn-course.js';

const research=JSON.parse(fs.readFileSync('evaluation/vocabulary-source-gap-research.json','utf8'));
const openSource=research.sources.find(source=>source.id==='openjlpt-community');
const jfSource=research.sources.find(source=>source.id==='jf-wordlist');
const jmdictSource=research.sources.find(source=>source.id==='jmdict');
const openJlpt=JSON.parse(fs.readFileSync(openSource.artifacts.N4,'utf8'));
const jfRows=JSON.parse(fs.readFileSync(jfSource.artifact,'utf8'))[0].rows;
const dictionary=JSON.parse(fs.readFileSync('public/dictionaries/word-evidence.json','utf8'));
const register=JSON.parse(fs.readFileSync('public/lexical-register.json','utf8'));
const audio=JSON.parse(fs.readFileSync('src/generated-audio.json','utf8'));
const courseAudio=JSON.parse(fs.readFileSync('.tmp-ui/tts-course/report.json','utf8'));
const sha256=path=>crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex');
const kana=value=>value.replace(/[ァ-ヶ]/g,char=>String.fromCharCode(char.charCodeAt(0)-0x60));
for(const[path,hash]of [[openSource.artifacts.N4,openSource.sha256.N4],[jfSource.artifact,jfSource.sha256],[jmdictSource.artifact,jmdictSource.sha256]])if(sha256(path)!==hash)throw Error('Source hash changed: '+path);

const n5=register.uses.filter(use=>use.level==='N5');
const n4=register.uses.filter(use=>use.level==='N4');
const batchKeys=new Set(n4VocabularyBatch04.map(item=>`mnn-${String(item.lessonNumber).padStart(2,'0')}|${item.text}|${item.reading}`));
const beforeN4=n4.filter(use=>!batchKeys.has(`${use.lessonId}|${use.legacyKey}|${use.reading}`));
const summarize=rows=>{
  const aligned=rows.filter(use=>use.lexemeId.startsWith('jmdict:'));
  return{surfaceKeys:new Set(rows.map(use=>use.legacyKey)).size,usageRecords:rows.length,candidateLexemes:new Set(aligned.map(use=>use.lexemeId)).size};
};
const n5Ids=new Set(n5.map(use=>use.lexemeId));
const beforeNew=beforeN4.filter(use=>!n5Ids.has(use.lexemeId));
const afterNew=n4.filter(use=>!n5Ids.has(use.lexemeId));
const beforeCumulative=new Set([...n5,...beforeN4].filter(use=>use.lexemeId.startsWith('jmdict:')).map(use=>use.lexemeId)).size;
const afterCumulative=new Set([...n5,...n4].filter(use=>use.lexemeId.startsWith('jmdict:')).map(use=>use.lexemeId)).size;
const before={N5:summarize(n5),N4New:summarize(beforeNew),cumulative:{surfaceKeys:new Set([...n5,...beforeN4].map(use=>use.legacyKey)).size,candidateLexemes:beforeCumulative}};
const after={N5:summarize(n5),N4New:summarize(afterNew),cumulative:{surfaceKeys:new Set([...n5,...n4].map(use=>use.legacyKey)).size,candidateLexemes:afterCumulative}};

const items=n4VocabularyBatch04.map(item=>{
  const entry=dictionary.entries.find(row=>row.id===item.sourceReview.entryId);
  const sense=entry?.senses.find(row=>item.sourceReview.senseIds.includes(row.id));
  if(!entry||!sense)throw Error('Missing selected JMdict entry/sense '+item.text);
  const lessonId='mnn-'+String(item.lessonNumber).padStart(2,'0');
  const usage=dictionary.uses.find(row=>row.lessonId===lessonId&&row.surface===item.text&&row.reading===item.reading);
  if(!usage?.candidates.some(candidate=>candidate.id===item.sourceReview.entryId))throw Error('JMdict usage crosswalk mismatch '+item.text);
  const irodori=[];
  for(let i=0;i<jfRows.length;i++)for(const key of Object.keys(jfRows[i])){
    if(!/^C\d+$/.test(key)||jfRows[i][key]!==item.text)continue;
    const rowNumber=Number(key.slice(1)),reading=jfRows[i][`D${rowNumber}`];
    if(reading&&kana(reading)===kana(item.reading))irodori.push({sourceRow:i+1,vocabularyRow:rowNumber,lesson:jfRows[i][`B${rowNumber}`],text:jfRows[i][key],reading});
  }
  if(!irodori.length)throw Error('Irodori spelling/reading mismatch '+item.text);
  const openMatches=openJlpt.filter(row=>row.jmdict_id===Number(item.sourceReview.entryId));
  if(item.sourceReview.openJlptJmdictId&&!openMatches.length)throw Error('No OpenJLPT N4 entry-ID match '+item.text);
  const openExact=openMatches.some(row=>row.word===item.text&&kana(row.reading)===kana(item.reading));
  const assets=[
    audio.find(row=>!row.retired&&row.kind==='word'&&row.text===item.text&&row.reading===item.reading&&row.lessonIds.includes(lessonId)),
    audio.find(row=>!row.retired&&row.kind==='sentence'&&row.text===item.example.ja&&row.displayReading===item.example.reading&&row.lessonIds.includes(lessonId))
  ];
  if(assets.some(row=>!row||row.readingCheck.actual!==row.readingCheck.expected||!fs.existsSync('public'+row.path)))throw Error('Missing or mismatched batch audio '+item.text);
  const unit=mnnUnits.find(row=>row.number===item.lessonNumber);
  if(!unit?.words.some(word=>word.text===item.text&&word.reading===item.reading))throw Error('Missing course link '+item.text);
  return{
    text:item.text,reading:item.reading,meaningVi:item.meaning,partOfSpeech:item.type,
    group:item.group,reason:item.reason,lessonNumber:item.lessonNumber,example:item.example,
    selectedJmdict:{entryId:item.sourceReview.entryId,senseIds:item.sourceReview.senseIds,partOfSpeech:sense.partOfSpeech,englishGloss:sense.gloss},
    openJlptN4:{entryIdMember:openMatches.length>0,exactWordReadingMember:openExact},
    irodoriCoordinates:irodori,
    audio:assets.map(row=>({id:row.id,path:row.path,readingCheck:row.readingCheck,status:row.status}))
  };
});

const quotas={'transport-stay':7,'shopping-service-contract':8,'appliance-digital-trouble':8,'cooking-waste':7};
const sample=[];
for(const[group,count]of Object.entries(quotas)){
  const selected=items.filter(item=>item.group===group).sort((a,b)=>{
    const hash=item=>crypto.createHash('sha256').update('g4-vocab-n4-batch-04:'+item.text).digest('hex');
    return hash(a).localeCompare(hash(b));
  }).slice(0,count);
  if(selected.length!==count)throw Error('Incomplete G4 stratum '+group);
  sample.push(...selected);
}
if(items.length!==80||after.N4New.candidateLexemes-before.N4New.candidateLexemes!==80||after.cumulative.candidateLexemes-before.cumulative.candidateLexemes!==80)throw Error('Unexpected lexical delta or duplicate lexemes');
if(sample.length!==30)throw Error('G4 sample must contain 30 entries');

const exactOpen=items.filter(item=>item.openJlptN4.exactWordReadingMember);
const audioGenerated=items.reduce((sum,item)=>sum+item.audio.length,0);
const audioHeld=courseAudio.report.filter(row=>row.status!=='generated-reading-match').map(row=>({text:row.text,status:row.status}));
const report={
  generatedAt:new Date().toISOString(),
  batchId:'n4-vocabulary-04',
  status:'provisional N4 learning content; not an official JLPT list or complete syllabus',
  counts:{before,after,added:{n4NewCandidateLexemes:after.N4New.candidateLexemes-before.N4New.candidateLexemes,cumulativeCandidateLexemes:after.cumulative.candidateLexemes-before.cumulative.candidateLexemes}},
  sourceBasis:{
    openJlpt:{url:openSource.url,commit:openSource.commit,artifact:openSource.artifacts.N4,sha256:openSource.sha256.N4,license:openSource.rights,snapshotRows:openJlpt.length,entryIdMembership:items.filter(item=>item.openJlptN4.entryIdMember).length,exactWordReadingOverlap:exactOpen.length},
    irodori:{url:jfSource.url,artifact:jfSource.artifact,sha256:jfSource.sha256,rights:jfSource.use,exactWordReadingOverlap:items.filter(item=>item.irodoriCoordinates.length).length},
    jmdict:{date:jmdictSource.date,artifact:jmdictSource.artifact,sha256:jmdictSource.sha256,rights:jmdictSource.rights,entriesWithSelectedSenses:items.length},
    minna:{edition:'Minna no Nihongo Shokyu II, second edition',scope:'Functional lesson mapping only; no exact Minna vocabulary membership claim.'}
  },
  independentListDecision:{
    result:'80/80 have an exact Irodori Elementary 2 spelling/reading occurrence; 1/80 also matches the pinned OpenJLPT N4 list by JMdict entry ID. These were selected for concrete travel, service, device, and food-label tasks. The 79 absent from this limited community snapshot are documented disagreements, not automatic errors or proof of JLPT level.',
    openJlptExactOverlap:exactOpen.map(item=>item.text).sort(),
    irodoriOnly:items.filter(item=>!item.openJlptN4.entryIdMember).map(item=>item.text).sort(),
    warning:'OpenJLPT is a community estimate and uses JMdict for lexical identity; it is not an official level list. Irodori membership is not evidence of JLPT level. Minna links are functional mappings only because an exact Minna vocabulary list was not available.'
  },
  qualitySample:{
    method:'Predeclared stratified sample of 30/80, seven travel, eight service, eight device, and seven food-label entries, ordered within group by SHA-256 of g4-vocab-n4-batch-04:<surface>. Checked selected JMdict gloss, Vietnamese contextual meaning, original example, spelling/reading crosswalk, and lesson link.',
    sampled:sample.length,
    result:'Project-author cross-check; not independent academic review. The sample is evidence of this batch review only, not a certificate for the whole lexicon.',
    items:sample
  },
  audio:{
    jobsRequested:160,jobsWithPlayableAssets:items.length*2,generatedReadingMatches:audioGenerated,held:audioHeld,
    engine:courseAudio.engine,speaker:courseAudio.speaker.name,style:courseAudio.style.name,
    status:'VOICEVOX-generated WAV and analyzer agreement only; no human listening or phonetic review.'
  },
  limitations:[
    'These are project-selected learning candidates, not an official JLPT list or proof of N4 sufficiency.',
    'Minna links are functional mappings; exact Minna vocabulary membership was not audited.',
    'Irodori rows establish spelling/reading occurrence, not JLPT level or curriculum priority.',
    'Vietnamese meanings and examples are project-authored; the sample is not independent academic review.',
    'Candidate counts do not establish full skill coverage or learner performance.'
  ]
};
fs.writeFileSync('evaluation/vocabulary-expansion-n4-batch-04.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({counts:report.counts,sourceBasis:{openJLPTId:report.sourceBasis.openJlpt.entryIdMembership,irodori:report.sourceBasis.irodori.exactWordReadingOverlap},sample:report.qualitySample.sampled,audio:report.audio},null,2));
