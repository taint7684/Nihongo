import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import{lessons}from '../src/content.js';
const reportPath='evaluation/vocabulary-source-gap-research.json';
const raw=fs.readFileSync('.sources/edrdg-20261109/jmdict-eng.json');
const dictionary=JSON.parse(raw),research=JSON.parse(fs.readFileSync(reportPath));
const expected=research.sources.find(s=>s.id==='jmdict')?.sha256;
const hash=crypto.createHash('sha256').update(raw).digest('hex');assert.equal(hash,expected,'Use the frozen dictionary source, not a silently changed corpus');
const entries=research.unmatchedCuratedRequests.map(request=>{
 const lemma=request.term==='覚えている'?'覚える':request.term;
 const candidates=dictionary.words.filter(w=>[...w.kanji,...w.kana].some(x=>x.text===lemma));
 const existing=lessons.filter(l=>l.referenceLesson).flatMap(l=>(l.words||[]).filter(w=>w.text===request.term).map(w=>({lessonId:l.id,text:w.text,reading:w.reading,entryId:w.sourceReview?.entryId||null,senseIds:w.sourceReview?.senseIds||[]})));
 return {...request,unmatchedSource:'bounded Irodori exact-surface lookup, NOT JMdict',lookup:lemma,form:lemma===request.term?'exact-surface':'explicit lemma lookup; do not count inflected expression as a new headword',dictionaryCandidates:candidates.map(w=>({entryId:w.id,spellings:w.kanji.map(k=>k.text),readings:w.kana.map(k=>k.text),senses:w.sense.map((s,i)=>({senseId:w.id+'-s'+i,english:s.gloss.filter(g=>g.lang==='eng').map(g=>g.text),partOfSpeech:s.partOfSpeech}))})),existingUsages:existing,decision:existing.length?'already has exact-surface teaching usage; source breadth and assessment still require audit':'source-backed research candidate only; not automatically authored or assigned a JLPT level',semanticApproval:false};
});
assert.equal(entries.length,research.unmatchedCuratedRequests.length);
const result={generatedAt:new Date().toISOString(),command:'node scripts/audit-unmatched-reference.mjs',source:{path:'.sources/edrdg-20261109/jmdict-eng.json',sha256:hash,date:dictionary.dictDate,attribution:'EDRDG / scriptin JMdict conversion; CC BY-SA 4.0 as documented in source manifest'},counts:{unmatchedBoundedIrodori:entries.length,withDictionaryCandidates:entries.filter(x=>x.dictionaryCandidates.length).length,withoutDictionaryCandidate:entries.filter(x=>!x.dictionaryCandidates.length).length,withExistingExactUsage:entries.filter(x=>x.existingUsages.length).length},entries,limits:['Candidate existence is not selected-sense approval, level evidence, or sufficient teaching/assessment.','Original R1/R2 denominators, unresolved surface coordinates and research lists are unchanged.','Explicit 覚えている → 覚える only; no general inflection or homophone merging.','No learner data read or written.']};
fs.writeFileSync('evaluation/unmatched-reference-audit.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result.counts));
