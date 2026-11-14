import crypto from'node:crypto';
import fs from'node:fs';
import{n4VocabularyBatch02}from'../src/n4-vocabulary-batch-02.js';
import{mnnUnits}from'../src/mnn-course.js';
import{createWordIndex,candidates}from'./dictionary-match.mjs';

const research=JSON.parse(fs.readFileSync('evaluation/vocabulary-source-gap-research.json','utf8'));
const openSource=research.sources.find(source=>source.id==='openjlpt-community');
const jfSource=research.sources.find(source=>source.id==='jf-wordlist');
const jmdictSource=research.sources.find(source=>source.id==='jmdict');
const openJlpt=JSON.parse(fs.readFileSync(openSource.artifacts.N4,'utf8'));
const jfRows=JSON.parse(fs.readFileSync(jfSource.artifact,'utf8'))[0].rows;
const dictionary=JSON.parse(fs.readFileSync('public/dictionaries/word-evidence.json','utf8'));
const register=JSON.parse(fs.readFileSync('public/lexical-register.json','utf8'));
const audio=JSON.parse(fs.readFileSync('src/generated-audio.json','utf8'));
const rawDictionary=JSON.parse(fs.readFileSync('.sources/edrdg-20261109/jmdict-eng.json','utf8'));
const index=createWordIndex(rawDictionary.words);
const digest=path=>crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex');
const expectedHashes=[
  [openSource.artifacts.N4,openSource.sha256.N4],
  [jfSource.artifact,jfSource.sha256],
  [jmdictSource.artifact,jmdictSource.sha256]
];
for(const[path,expected]of expectedHashes)if(digest(path)!==expected)throw Error('Source hash changed: '+path);

const hiragana=value=>value.replace(/[ァ-ヶ]/g,char=>String.fromCharCode(char.charCodeAt(0)-0x60));
const findIrodori=(item,entryId)=>{
  const exact=[];
  const entryMatches=[];
  for(const row of jfRows)for(const key of Object.keys(row)){
    if(!/^C\d+$/.test(key))continue;
    const rowNumber=Number(key.slice(1)),form=row[key],reading=row[`D${rowNumber}`];
    if(!form||!reading)continue;
    if(form===item.text&&hiragana(reading)===hiragana(item.reading))exact.push({row:rowNumber,form,reading});
    else if(candidates(form,hiragana(reading),index).some(candidate=>candidate.entry.id===entryId))entryMatches.push({row:rowNumber,form,reading});
  }
  return{exact,entryMatches};
};

const currentN4=register.uses.filter(use=>use.level==='N4');
const n5=register.uses.filter(use=>use.level==='N5');
const batchUsageKeys=new Set(n4VocabularyBatch02.map(item=>`mnn-${String(item.lessonNumber).padStart(2,'0')}|${item.text}|${item.reading}`));
const beforeN4=currentN4.filter(use=>!batchUsageKeys.has(`${use.lessonId}|${use.legacyKey}|${use.reading}`));
const summarize=rows=>{
  const aligned=rows.filter(use=>use.lexemeId.startsWith('jmdict:'));
  return{surfaceKeys:new Set(rows.map(use=>use.legacyKey)).size,usageRecords:rows.length,candidateLexemes:new Set(aligned.map(use=>use.lexemeId)).size};
};
const beforeN4New=beforeN4.filter(use=>!new Set(n5.map(row=>row.lexemeId)).has(use.lexemeId));
const afterN4New=currentN4.filter(use=>!new Set(n5.map(row=>row.lexemeId)).has(use.lexemeId));
const beforeCumulative=new Set([...n5,...beforeN4].filter(use=>use.lexemeId.startsWith('jmdict:')).map(use=>use.lexemeId)).size;
const afterCumulative=new Set([...n5,...currentN4].filter(use=>use.lexemeId.startsWith('jmdict:')).map(use=>use.lexemeId)).size;
const before={N5:summarize(n5),N4New:summarize(beforeN4New),cumulative:{surfaceKeys:new Set([...n5,...beforeN4].map(use=>use.legacyKey)).size,candidateLexemes:beforeCumulative}};
const after={N5:summarize(n5),N4New:summarize(afterN4New),cumulative:{surfaceKeys:new Set([...n5,...currentN4].map(use=>use.legacyKey)).size,candidateLexemes:afterCumulative}};
const items=n4VocabularyBatch02.map(item=>{
  const entry=dictionary.entries.find(row=>row.id===item.sourceReview.entryId);
  const sense=entry?.senses.find(row=>item.sourceReview.senseIds.includes(row.id));
  if(!entry||!sense)throw Error('Missing selected JMdict entry/sense '+item.text);
  const use=dictionary.uses.find(row=>row.lessonId==='mnn-'+String(item.lessonNumber).padStart(2,'0')&&row.surface===item.text&&row.reading===item.reading);
  if(!use?.candidates.some(candidate=>candidate.id===item.sourceReview.entryId))throw Error('JMdict usage crosswalk mismatch '+item.text);
  const openMatches=openJlpt.filter(row=>row.jmdict_id===Number(item.sourceReview.openJlptJmdictId));
  if(!openMatches.length)throw Error('No OpenJLPT N4 entry-ID match '+item.text);
  const exactOpen=openMatches.find(row=>row.word===item.text&&row.reading===item.reading);
  const irodori=findIrodori(item,item.sourceReview.entryId);
  const lessonId='mnn-'+String(item.lessonNumber).padStart(2,'0');
  const assets=[
    audio.find(row=>!row.retired&&row.kind==='word'&&row.text===item.text&&row.reading===item.reading&&row.lessonIds.includes(lessonId)),
    audio.find(row=>!row.retired&&row.kind==='sentence'&&row.text===item.example.ja&&row.displayReading===item.example.reading&&row.lessonIds.includes(lessonId))
  ];
  if(assets.some(row=>!row||row.readingCheck.actual!==row.readingCheck.expected||!fs.existsSync('public'+row.path)))throw Error('Missing or mismatched batch audio '+item.text);
  const unit=mnnUnits.find(row=>row.number===item.lessonNumber);
  if(!unit?.words.some(word=>word.text===item.text&&word.reading===item.reading))throw Error('Missing course link '+item.text);
  return{
    text:item.text,reading:item.reading,meaningVi:item.meaning,group:item.group,
    reason:item.reason,lessonNumber:item.lessonNumber,example:item.example,
    selectedJmdict:{entryId:item.sourceReview.entryId,senseIds:item.sourceReview.senseIds,englishGloss:sense.gloss},
    openJlptN4:{exactWordReadingMember:Boolean(exactOpen),matchedSourceForms:openMatches.map(row=>({id:row.id,word:row.word,reading:row.reading}))},
    irodori:{exactCoordinates:irodori.exact,entryCrosswalkCoordinates:irodori.entryMatches},
    audio:assets.map(row=>({id:row.id,path:row.path,readingCheck:row.readingCheck,status:row.status}))
  };
});

const quotas={'interaction-emotion':6,'change-comparison':5,'home-leisure':5,'school-work':5,'quantity-conditions':4,'travel-community':5};
const sample=[];
for(const[group,count]of Object.entries(quotas)){
  const selected=items.filter(item=>item.group===group).sort((a,b)=>{
    const hash=item=>crypto.createHash('sha256').update('g4-vocab-n4-batch-02:'+item.text).digest('hex');
    return hash(a).localeCompare(hash(b));
  }).slice(0,count);
  if(selected.length!==count)throw Error('Incomplete G4 stratum '+group);
  sample.push(...selected);
}
const sampleItems=sample.map(item=>{
  const entry=dictionary.entries.find(row=>row.id===item.selectedJmdict.entryId);
  const sense=entry.senses.find(row=>item.selectedJmdict.senseIds.includes(row.id));
  return{text:item.text,reading:item.reading,meaningVi:item.meaningVi,englishGloss:sense.gloss,example:item.example,lessonNumber:item.lessonNumber,openJlpt:item.openJlptN4,irodori:item.irodori};
});
if(items.length!==86||after.N4New.candidateLexemes-before.N4New.candidateLexemes!==86||after.cumulative.candidateLexemes-before.cumulative.candidateLexemes!==86)throw Error('Unexpected lexical delta or duplicate lexemes');
if(sample.length!==30)throw Error('G4 sample must contain 30 entries');
const exactOpen=items.filter(item=>item.openJlptN4.exactWordReadingMember);
const exactIrodori=items.filter(item=>item.irodori.exactCoordinates.length>0);
const irodoriEntryCrosswalk=items.filter(item=>item.irodori.exactCoordinates.length||item.irodori.entryCrosswalkCoordinates.length);
const report={
  generatedAt:new Date().toISOString(),
  batchId:'n4-vocabulary-02',
  status:'provisional N4 learning content; not an official JLPT list or complete syllabus',
  counts:{before,after,added:{n4NewCandidateLexemes:after.N4New.candidateLexemes-before.N4New.candidateLexemes,cumulativeCandidateLexemes:after.cumulative.candidateLexemes-before.cumulative.candidateLexemes}},
  sourceBasis:{
    openJlpt:{url:openSource.url,commit:openSource.commit,artifact:openSource.artifacts.N4,sha256:openSource.sha256.N4,license:openSource.rights,snapshotRows:openJlpt.length,entryIdMembership:items.length,exactWordReadingOverlap:exactOpen.length},
    irodori:{url:jfSource.url,artifact:jfSource.artifact,sha256:jfSource.sha256,rights:jfSource.use,exactWordReadingOverlap:exactIrodori.length,jmdictEntryCrosswalk:irodoriEntryCrosswalk.length},
    jmdict:{date:jmdictSource.date,artifact:jmdictSource.artifact,sha256:jmdictSource.sha256,rights:jmdictSource.rights,entriesWithSelectedSenses:items.length},
    minna:{edition:'Minna no Nihongo Shokyu II, second edition',scope:'Functional lesson mapping only; no exact Minna vocabulary membership claim.'}
  },
  independentListDecision:{
    result:'Every addition is in the pinned OpenJLPT N4 snapshot by the same JMdict entry ID. Irodori has exact spelling+reading support for a subset and same-entry crosswalk support for a slightly larger subset; the remaining absences are recorded rather than treated as proof of error.',
    openJlptExactOverlap:exactOpen.map(item=>item.text).sort(),
    irodoriExactOverlap:exactIrodori.map(item=>item.text).sort(),
    irodoriEntryCrosswalk:irodoriEntryCrosswalk.map(item=>({text:item.text,exact:item.irodori.exactCoordinates.length>0,coordinates:item.irodori.exactCoordinates.length?item.irodori.exactCoordinates:item.irodori.entryCrosswalkCoordinates})),
    notCrosswalkedToIrodori:items.length-irodoriEntryCrosswalk.length,
    warning:'OpenJLPT is a community estimate, not an official JLPT list. OpenJLPT uses JMdict for lexical identity, so its agreement with JMdict is not a second independent curriculum vote. Irodori does not list every item; Minna links are functional mappings only.'
  },
  qualitySample:{
    method:'Deterministic stratified sample ordered by SHA-256 of g4-vocab-n4-batch-02:<surface>; six interaction items, five each from change, home/leisure, school/work, and travel, and all four quantity/condition items.',
    sampled:sample.length,
    checks:'Compare selected JMdict sense/gloss, project-authored Vietnamese meaning and example, OpenJLPT N4 entry-ID/spelling crosswalk, Irodori source coordinates where present, Minna functional mapping, and playable word/sentence assets.',
    result:'The project author reviewed all sampled senses and contexts. The sample found an incorrect first-sense selection for うち (inside/within); it was corrected to JMdict sense 1457730-s6 (one’s home/family) for the example うちの近所. No other confirmed serious content error was found in the sample. This is not independent academic approval or a whole-batch guarantee.',
    reviewer:'Project author; no independent academic reviewer.',
    items:sampleItems
  },
  audio:{
    jobsRequested:items.length*2,jobsWithPlayableAssets:items.length*2,held:0,
    engine:audio.find(row=>row.kind==='word'&&row.lessonIds.some(id=>id.startsWith('mnn-')))?.engine||'Local VOICEVOX; see audio assets',
    status:'VOICEVOX WAV assets exist and analyzer output matches declared audio readings. No human listening or phonetic validation.'
  },
  limitations:[
    'N4 level is a project learning-scope decision, not an official JLPT word list.',
    'Irodori and OpenJLPT use different scope; absence in Irodori is explicitly recorded and not treated as an automatic exclusion.',
    'Minna II lesson links are functional mappings, not exact wordlist membership.',
    'Meanings and examples are project-authored; the sample was reviewed by the project author, not an independent academic reviewer.',
    'TTS playback/analyzer matching does not verify natural pronunciation.'
  ],
  items
};
fs.writeFileSync('evaluation/vocabulary-expansion-n4-batch-02.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({batchId:report.batchId,items:items.length,sample:sample.length,openJlptExact:exactOpen.length,irodoriExact:exactIrodori.length,irodoriEntryCrosswalk:irodoriEntryCrosswalk.length,counts:after,audio:report.audio.jobsWithPlayableAssets,report:'evaluation/vocabulary-expansion-n4-batch-02.json'},null,2));
