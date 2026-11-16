import fs from'node:fs';
import crypto from'node:crypto';
import{n5VocabularyBatch03}from'../src/n5-vocabulary-batch-03.js';

const research=JSON.parse(fs.readFileSync('evaluation/vocabulary-source-gap-research.json','utf8'));
const proposal=JSON.parse(fs.readFileSync('reference/vocabulary-scope-proposal-r2.json','utf8'));
const dictionary=JSON.parse(fs.readFileSync('public/dictionaries/word-evidence.json','utf8'));
const register=JSON.parse(fs.readFileSync('public/lexical-register.json','utf8'));
const audio=JSON.parse(fs.readFileSync('src/generated-audio.json','utf8'));
const courseAudio=JSON.parse(fs.readFileSync('.tmp-ui/tts-course/report.json','utf8'));
const source=research.sources.find(item=>item.id==='jf-wordlist');
const sourceRows=JSON.parse(fs.readFileSync('.sources/irodori-20261112/wordlist_all.json','utf8'))[0].rows;
const dictionaryEntries=new Map(dictionary.entries.map(item=>[item.id,item]));
const normalizeKana=value=>value.replace(/[ァ-ヶ]/g,char=>String.fromCharCode(char.charCodeAt(0)-0x60));
const digest=path=>crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex');
if(digest(source.artifact)!==source.sha256)throw Error('Irodori source hash changed');
if(digest('.sources/edrdg-20261109/jmdict-eng.json')!==research.sources.find(item=>item.id==='jmdict').sha256)throw Error('JMdict source hash changed');

const items=n5VocabularyBatch03.map(item=>{
  const proposalRow=proposal.entries.find(row=>row.proposedStage==='N5'&&row.key===item.text);
  if(!proposalRow||!proposalRow.minnaFunctionalLinks.includes(item.lessonNumber))throw Error('Missing proposal/lesson link '+item.text);
  const candidate=proposalRow.dictionaryEvidence.find(row=>row.entryId===item.sourceReview.entryId&&normalizeKana(row.matchingReading)===normalizeKana(item.reading));
  const entry=dictionaryEntries.get(item.sourceReview.entryId);
  const sense=entry?.senses.find(row=>item.sourceReview.senseIds.includes(row.id));
  if(!candidate||!sense)throw Error('Unresolved dictionary evidence '+item.text);
  const coordinates=proposalRow.sourceCoordinates.map(coordinate=>{
    const row=sourceRows.find(candidate=>candidate[`C${coordinate.row}`]===item.text);
    if(!row||normalizeKana(row[`D${coordinate.row}`])!==normalizeKana(item.reading))throw Error('Irodori mismatch '+item.text);
    return{...coordinate,verifiedText:row[`C${coordinate.row}`],verifiedReading:row[`D${coordinate.row}`]};
  });
  if(!coordinates.length)throw Error('No Irodori coordinate '+item.text);
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
    audio:assets.map(row=>({id:row.id,path:row.path,readingCheck:row.readingCheck,status:row.status}))
  };
});

const quotas={
  'body-basic-needs':4,'weather-describing':5,'activities-leisure':5,'basic-modifiers':4,
  'identity-contact':2,'interaction-repair':5,'time-frequency':2,'food-orders':1,
  'shopping-payment':1,'home-facilities':1,'travel-directions':1,'work-school-basics':2
};
const sample=[];
for(const[group,count]of Object.entries(quotas)){
  const selected=n5VocabularyBatch03.filter(item=>item.group===group).sort((a,b)=>{
    const hash=item=>crypto.createHash('sha256').update('g4-vocab-batch-03:'+item.text).digest('hex');
    return hash(a).localeCompare(hash(b));
  }).slice(0,count);
  if(selected.length!==count)throw Error('Incomplete G4 stratum '+group);
  sample.push(...selected.map(item=>items.find(row=>row.text===item.text)));
}
const after={
  N5:{surfaceKeys:register.summary.N5.surfaceKeys,candidateLexemes:register.summary.N5.candidateLexemes},
  N4New:{surfaceKeys:register.summary.N4New.surfaceKeys,candidateLexemes:register.summary.N4New.candidateLexemes},
  cumulative:{surfaceKeys:register.summary.cumulative.surfaceKeys,candidateLexemes:register.summary.cumulative.candidateLexemes}
};
const before={
  N5:{surfaceKeys:676,candidateLexemes:670},
  N4New:{surfaceKeys:222,candidateLexemes:217},
  cumulative:{surfaceKeys:908,candidateLexemes:887}
};
if(after.N5.candidateLexemes-before.N5.candidateLexemes!==130||after.cumulative.candidateLexemes-before.cumulative.candidateLexemes!==130)throw Error('Batch 03 count delta differs from 130');
if(items.length!==130||sample.length<30)throw Error('Unexpected batch/sample size');

const report={
  generatedAt:new Date().toISOString(),
  batchId:'n5-vocabulary-03',
  status:'provisional content batch; not a frozen N5/N4 inventory',
  counts:{before,after,added:{n5CandidateLexemes:130,cumulativeCandidateLexemes:130}},
  sourceBasis:{
    irodori:{url:source.url,artifact:source.artifact,sha256:source.sha256,scope:source.scope,rights:source.use,verifiedMemberships:items.length},
    minna:{edition:'Minna no Nihongo Shokyu I/II, second edition',scope:research.sources.find(item=>item.id==='minna-functional').scope,limitation:'Functional lesson mapping only; no exact Minna vocabulary list or per-word membership audit.'},
    jmdict:{date:research.sources.find(item=>item.id==='jmdict').date,sha256:research.sources.find(item=>item.id==='jmdict').sha256,rights:research.sources.find(item=>item.id==='jmdict').rights}
  },
  independentWordListRequirement:{status:'not-met',reason:'Irodori supplies an exact wordlist; Minna is only a functional/order reference in available research. JMdict is an independent dictionary, not a second curriculum vocabulary list.'},
  qualitySample:{
    method:'Stratified deterministic sample ordered by SHA-256 of g4-vocab-batch-03:<surface>; quotas include health, describing/weather, leisure, modifiers, interaction, identity, time, food, shopping, home, travel, and work/school.',
    sampled:sample.length,
    checks:'Compare Irodori spelling/reading/membership and English gloss with the pinned JMdict sense; inspect Vietnamese meaning and authored example in the selected use.',
    result:'Author reviewed every item in the 33-item sample against the pinned Irodori spelling/reading, selected JMdict sense, Vietnamese context, and authored example. No confirmed content error was found. This is not independent academic approval or a whole-batch guarantee.',
    items:sample.map(row=>({text:row.text,reading:row.reading,meaningVi:row.meaningVi,jmdictGloss:row.selectedJmdict.englishGloss,example:row.example,irodoriCoordinates:row.irodoriCoordinates}))
  },
  audio:{
    jobsRequested:260,jobsWithPlayableAssets:items.length*2,
    engine:courseAudio.engine,speaker:courseAudio.speaker.name,style:courseAudio.style.name,
    status:'VOICEVOX-generated; batch 03 WAV and declared kana analyzer checks are verified by this script. No human listening or phonetic review.'
  },
  limitations:[
    'These are project-selected learning candidates, not an official JLPT list or proof of N5 sufficiency.',
    'Minna links are functional mappings; no exact Minna vocabulary membership was copied or audited.',
    'Irodori rows establish occurrence and source reading, not N5/N4 level or mandatory priority.',
    'Vietnamese meanings and examples are project-authored; G4 sampling is not independent academic review.',
    'N5 meets the project candidate-lexeme target, but this count does not establish syllabus sufficiency.'
  ],
  items
};
fs.writeFileSync('evaluation/vocabulary-expansion-batch-03.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({batchId:report.batchId,items:items.length,sample:sample.length,counts:after,audio:report.audio.jobsWithPlayableAssets,report:'evaluation/vocabulary-expansion-batch-03.json'},null,2));
