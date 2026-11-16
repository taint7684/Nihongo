import fs from'node:fs';
import crypto from'node:crypto';
import{n5VocabularyBatch01}from'../src/n5-vocabulary-batch-01.js';

const research=JSON.parse(fs.readFileSync('evaluation/vocabulary-source-gap-research.json','utf8'));
const proposal=JSON.parse(fs.readFileSync('reference/vocabulary-scope-proposal-r2.json','utf8'));
const dictionary=JSON.parse(fs.readFileSync('public/dictionaries/word-evidence.json','utf8'));
const register=JSON.parse(fs.readFileSync('public/lexical-register.json','utf8'));
const audio=JSON.parse(fs.readFileSync('src/generated-audio.json','utf8'));
const courseAudio=JSON.parse(fs.readFileSync('.tmp-ui/tts-course/report.json','utf8'));
const irodoriSource=research.sources.find(source=>source.id==='jf-wordlist');
const jmdictSource=research.sources.find(source=>source.id==='jmdict');
const irodoriRows=JSON.parse(fs.readFileSync('.sources/irodori-20261112/wordlist_all.json','utf8'))[0].rows;
const normalizeKana=value=>value.replace(/[ァ-ヶ]/g,char=>String.fromCharCode(char.charCodeAt(0)-0x60));
const digest=path=>crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex');
if(digest(irodoriSource.artifact)!==irodoriSource.sha256)throw Error('Irodori source hash changed');
if(digest('.sources/edrdg-20261109/jmdict-eng.json')!==jmdictSource.sha256)throw Error('JMdict source hash changed');
const dictionaryEntries=new Map(dictionary.entries.map(entry=>[entry.id,entry]));
const sourceRows=[];
for(const item of n5VocabularyBatch01){
  const proposalRow=proposal.entries.find(entry=>entry.proposedStage==='N5'&&entry.key===item.text);
  if(!proposalRow)throw Error('Missing R2 proposal entry '+item.text);
  if(!proposalRow.minnaFunctionalLinks.includes(item.lessonNumber))throw Error('Invalid Minna functional mapping '+item.text);
  const selectedCandidate=proposalRow.dictionaryEvidence.find(candidate=>candidate.entryId===item.sourceReview.entryId);
  if(!selectedCandidate)throw Error('Selected JMdict entry absent from R2 '+item.text);
  const entry=dictionaryEntries.get(item.sourceReview.entryId);
  const sense=entry?.senses.find(candidate=>item.sourceReview.senseIds.includes(candidate.id));
  if(!sense)throw Error('Selected JMdict sense absent '+item.text);
  const coordinates=proposalRow.sourceCoordinates.map(coordinate=>{
    const row=irodoriRows.find(candidate=>candidate[`C${coordinate.row}`]===item.text);
    if(!row||normalizeKana(row[`D${coordinate.row}`])!==normalizeKana(item.reading))throw Error('Irodori coordinate mismatch '+item.text);
    return{...coordinate,verifiedText:row[`C${coordinate.row}`],verifiedReading:row[`D${coordinate.row}`],membershipVerified:true};
  });
  if(!coordinates.length)throw Error('No Irodori membership coordinate '+item.text);
  const lessonId='mnn-'+String(item.lessonNumber).padStart(2,'0');
  const wordAudio=audio.find(asset=>!asset.retired&&asset.kind==='word'&&asset.text===item.text&&asset.reading===item.reading&&asset.lessonIds.includes(lessonId));
  const sentenceAudio=audio.find(asset=>!asset.retired&&asset.kind==='sentence'&&asset.text===item.example.ja&&asset.displayReading===item.example.reading&&asset.lessonIds.includes(lessonId));
  for(const asset of [wordAudio,sentenceAudio])if(!asset||asset.readingCheck.actual!==asset.readingCheck.expected||!fs.existsSync('public'+asset.path))throw Error('Missing/mismatched audio '+item.text);
  sourceRows.push({
    text:item.text,reading:item.reading,meaningVi:item.meaning,group:item.group,
    reason:item.reason,curriculum:item.curriculum,
    selectedJmdict:{entryId:item.sourceReview.entryId,senseIds:item.sourceReview.senseIds,englishGloss:sense.gloss},
    irodoriCoordinates:coordinates,
    example:item.example,
    audio:{
      word:{id:wordAudio.id,path:wordAudio.path,readingCheck:wordAudio.readingCheck,status:wordAudio.status},
      sentence:{id:sentenceAudio.id,path:sentenceAudio.path,readingCheck:sentenceAudio.readingCheck,status:sentenceAudio.status}
    }
  });
}
const sampleQuotas={'identity-contact':8,'food-orders':8,'shopping-payment':8,'time-frequency':6};
const sample=[];
for(const[group,count]of Object.entries(sampleQuotas)){
  const selected=n5VocabularyBatch01.filter(item=>item.group===group).sort((a,b)=>{
    const hash=item=>crypto.createHash('sha256').update('g4-vocab-batch-01:'+item.text).digest('hex');
    return hash(a).localeCompare(hash(b));
  }).slice(0,count);
  sample.push(...selected.map(item=>sourceRows.find(row=>row.text===item.text)));
}
const baseline={
  measuredFromCurrentCourseBeforeBatch:{
    N5:{surfaceKeys:516,candidateLexemes:510},
    N4New:{surfaceKeys:222,candidateLexemes:217},
    cumulative:{surfaceKeys:748,candidateLexemes:727}
  },
  measurement:'scripts/lexical-register.mjs run before adding batch 01; candidateLexemes count distinct selected JMdict entries, not official JLPT inventory'
};
const countsAfter={
  N5:{surfaceKeys:register.summary.N5.surfaceKeys,candidateLexemes:register.summary.N5.candidateLexemes},
  N4New:{surfaceKeys:register.summary.N4New.surfaceKeys,candidateLexemes:register.summary.N4New.candidateLexemes},
  cumulative:{surfaceKeys:register.summary.cumulative.surfaceKeys,candidateLexemes:register.summary.cumulative.candidateLexemes}
};
if(countsAfter.N5.candidateLexemes-baseline.measuredFromCurrentCourseBeforeBatch.N5.candidateLexemes!==80)throw Error('Batch 01 did not add exactly 80 N5 candidate lexemes');
if(countsAfter.cumulative.candidateLexemes-baseline.measuredFromCurrentCourseBeforeBatch.cumulative.candidateLexemes!==80)throw Error('Batch 01 did not add exactly 80 cumulative candidate lexemes');
if(sourceRows.length!==80||sample.length!==30)throw Error('Unexpected batch or sample size');
const report={
  generatedAt:new Date().toISOString(),
  batchId:'n5-vocabulary-01',
  status:'provisional content batch; not a frozen N5/N4 inventory',
  counts:{before:baseline,after:countsAfter,added:{n5CandidateLexemes:80,cumulativeCandidateLexemes:80}},
  sourceBasis:{
    irodori:{url:irodoriSource.url,artifact:irodoriSource.artifact,sha256:irodoriSource.sha256,scope:irodoriSource.scope,rights:irodoriSource.use,verifiedMemberships:sourceRows.length},
    minna:{edition:'Minna no Nihongo Shokyu I/II, second edition',urls:research.sources.find(source=>source.id==='minna-functional').urls,scope:research.sources.find(source=>source.id==='minna-functional').scope,rights:research.sources.find(source=>source.id==='minna-functional').use,limitation:'Functional lesson mapping only; this project does not have an exact Minna vocabulary list or per-word membership audit.'},
    jmdict:{url:jmdictSource.url,date:jmdictSource.date,sha256:jmdictSource.sha256,rights:jmdictSource.rights,limitation:jmdictSource.scope}
  },
  independentWordListRequirement:{
    status:'not-met',
    reason:'Irodori supplies an exact wordlist; Minna is only a functional/order reference in the available research. JMdict is an independent dictionary, not a second curriculum vocabulary list. Do not describe this batch as checked against two independent curriculum lists.'
  },
  qualitySample:{
    method:'Stratified deterministic sample ordered by SHA-256 of g4-vocab-batch-01:<surface>; 8 identity/contact, 8 food/orders, 8 shopping/payment, 6 time/frequency.',
    sampled:sample.length,
    checks:'Compared Irodori spelling/reading/membership and English gloss with the pinned JMdict sense; manually reviewed Vietnamese meaning and authored example in the selected context.',
    result:'No confirmed content error in the 30 sampled items. One sense divergence was resolved and recorded: 相手 is listed as “spouse” in the sampled Irodori occurrence; this batch uses JMdict sense 1401000-s1 “other party/addressee” for a dialogue partner, supported by its example. This source comparison is not independent academic approval and is not a whole-batch guarantee.',
    items:sample.map(row=>({text:row.text,reading:row.reading,meaningVi:row.meaningVi,jmdictGloss:row.selectedJmdict.englishGloss,example:row.example,irodoriCoordinates:row.irodoriCoordinates,...(row.text==='相手'?{resolvedSourceDifference:{irodoriGloss:'spouse',selectedUse:'other party/addressee',decision:'Use JMdict sense 1401000-s1 in the dialogue-partner example; do not generalize either gloss across contexts.'}}:{})}))
  },
  audio:{
    jobsRequested:160,
    jobsWithPlayableAssets:sourceRows.length*2,
    engine:courseAudio.engine,
    speaker:courseAudio.speaker.name,
    style:courseAudio.style.name,
    status:'VOICEVOX-generated; stored WAV files and declared kana analyzer match verified. No human listening or phonetic review; do not infer pronunciation correctness.'
  },
  limitations:[
    'These are project-selected learning candidates, not an official JLPT list or a proof of N5 sufficiency.',
    'Minna lesson links are project functional mappings; no exact Minna vocabulary membership was copied or audited.',
    'Irodori rows establish occurrence and source reading, not N5/N4 level or mandatory priority.',
    'Vietnamese meanings and examples are project-authored; G4 sampling does not replace independent academic review.',
    'N5 remains below the project target by '+(800-countsAfter.N5.candidateLexemes)+' candidate lexemes; cumulative N4 remains below target by '+(1500-countsAfter.cumulative.candidateLexemes)+'.'
  ],
  items:sourceRows
};
fs.writeFileSync('evaluation/vocabulary-expansion-batch-01.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({batchId:report.batchId,items:sourceRows.length,sample:sample.length,counts:countsAfter,audio:report.audio.jobsWithPlayableAssets,report:'evaluation/vocabulary-expansion-batch-01.json'},null,2));
