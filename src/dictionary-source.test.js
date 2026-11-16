import{it,expect}from 'vitest';import fs from 'node:fs';import{referenceTargets}from './reference-targets.js';import{fresh,validate}from './state.js';import{wordReviewKey,getWordReview,wordEvidenceFor,wordNote}from './word-identity.js';import{scheduleWord,checkedWord}from './word-state.js';import{candidates,createWordIndex}from '../scripts/dictionary-match.mjs';
it('excludes kana accidentally embedded in a Kanji reference string',()=>{for(const t of Object.values(referenceTargets.levels))for(const c of t.kanji)expect(/^\p{Script=Han}$/u.test(c)).toBe(true);expect(referenceTargets.levels.N4.kanji).not.toContain('さ');expect(referenceTargets.exclusions.some(x=>x.char==='さ')).toBe(true);});
it('keeps legacy alias snapshots while sharing the next schedule and backup',()=>{let s=fresh();s.wordReviews['わたし']={streak:1,last:100,due:200};s.wordNotes['わたし']='Ghi chú cũ';const before=JSON.stringify(s);expect(getWordReview(s,'私').due).toBe(200);expect(wordNote(s,'私')).toBe('Ghi chú cũ');expect(JSON.stringify(s)).toBe(before);s=scheduleWord(s,'わたし',true,300);expect(s.wordReviews['わたし']).toEqual({streak:1,last:100,due:200});expect(s.wordReviews['私'].due).toBeGreaterThan(300);expect(getWordReview(s,'わたし').due).toBe(s.wordReviews['私'].due);expect(validate(JSON.parse(JSON.stringify(s))).wordNotes['わたし']).toBe('Ghi chú cũ');});
it('retains newer alias evidence, merges display without inventing attempts, and never merges homophones',()=>{let s=fresh();s.wordEvidence['わたし']=[{kind:'recall',response:'わたし',correct:true,at:100}];s=checkedWord(s,'私','recall','私',true,200);expect(wordEvidenceFor(s,'私')).toHaveLength(2);expect(s.wordEvidence['わたし']).toHaveLength(1);expect(wordReviewKey('私')).toBe(wordReviewKey('わたし'));expect(wordReviewKey('橋')).not.toBe(wordReviewKey('箸'));expect(validate(s).wordEvidence['わたし']).toHaveLength(1);});
it('does not select an unrelated reading of an identical Kanji spelling',()=>{const w=(id,k,r)=>({id,kanji:[{text:k}],kana:[{text:r,appliesToKanji:['*']}],sense:[]});const idx=createWordIndex([w('I','私','わたし'),w('other','私','あたし'),w('bridge','橋','はし'),w('chopsticks','箸','はし')]);expect(candidates('私','わたし',idx).map(x=>x.entry.id)).toEqual(['I']);expect(candidates('私',undefined,idx)).toHaveLength(2);expect(candidates('橋','はし',idx)[0].entry.id).toBe('bridge');});
it('publishes source-attributed Kanji readings with classical radical separate from components',()=>{const s=JSON.parse(fs.readFileSync('public/dictionaries/kanji/07533.json','utf8'));expect(s.char).toBe('申');expect(s.hanViet).toContain('Thân');expect(s.on.length).toBeGreaterThan(0);expect(s.kun.length).toBeGreaterThan(0);expect(s.radical).toBeGreaterThan(0);expect(s.license).toBe('CC BY-SA 4.0');expect(s).not.toHaveProperty('jlpt');expect(s).not.toHaveProperty('componentsMeaning');});

it('adds usage context to new evidence without assigning senses to legacy answers',()=>{let s=fresh();s.wordEvidence['私']=[{kind:'recall',response:'私',correct:true,at:100}];s=checkedWord(s,'わたし','recall','わたし',true,200,'mnn-01:私');const restored=validate(JSON.parse(JSON.stringify(s)));expect(restored.wordEvidence['私'][0]).not.toHaveProperty('usageId');expect(restored.wordEvidence['私'][1].usageId).toBe('mnn-01:私');expect(restored.completed).toEqual({});});

it('rejects spurious suru roots and keeps honorific irregulars',()=>{const row=(id,k,r,pos)=>({id,kanji:[{text:k}],kana:[{text:r,appliesToKanji:['*']}],sense:[{partOfSpeech:pos}]});const idx=createWordIndex([row('cry','なく','なく',['v5k']),row('lose','なくす','なくす',['v5s']),row('study','勉強','べんきょう',['n','vs']),row('honorific','くださる','くださる',['v5r'])]);expect(candidates('なくします','なくします',idx).map(x=>x.entry.id)).toEqual(['lose']);expect(candidates('勉強します','べんきょうします',idx).map(x=>x.entry.id)).toEqual(['study']);expect(candidates('くださいます','くださいます',idx).map(x=>x.entry.id)).toEqual(['honorific']);});
it('selected source senses exist and compositions do not inflate headwords',()=>{const r=JSON.parse(fs.readFileSync('public/lexical-register.json','utf8'));const raw=JSON.parse(fs.readFileSync('public/dictionaries/word-evidence.json','utf8'));const entries=new Map(raw.entries.map(e=>[e.id,e]));for(const u of r.uses){if(u.meaning.selectedSourceSenses.length){const e=entries.get(u.lexemeId.replace('jmdict:',''));expect(e,u.id).toBeTruthy();for(const sense of u.meaning.selectedSourceSenses)expect(e.senses.some(s=>s.id===sense),u.id+' '+sense).toBe(true);}if(u.composition)for(const[id]of u.composition.parts)expect(entries.has(id),u.id+' '+id).toBe(true);}expect(r.summary.cumulative.composedOrNamedUses).toBe(6);expect(r.summary.cumulative.unresolvedForms).toBe(0);const a=r.uses.find(u=>u.id==='mnn-01:私');expect(a.sourceType).toBe('đại từ');});

it('keeps every core dictionary usage and taught N5/N4 Kanji linked to source data', async()=>{
  const {lessons}=await import('./content.js');
  const register=JSON.parse(fs.readFileSync('public/lexical-register.json','utf8'));
  const raw=JSON.parse(fs.readFileSync('public/dictionaries/word-evidence.json','utf8'));
  const manifest=JSON.parse(fs.readFileSync('public/dictionaries/source-manifest.json','utf8'));
  expect(manifest.derivedDataLicense).toBe('CC BY-SA 4.0');
  expect(manifest.sources.some(source=>source.name==='jmdict-eng.tgz')).toBe(true);
  expect(manifest.sources.some(source=>source.name==='kanjidic2.xml.gz')).toBe(true);
  expect(manifest.sources.some(source=>source.name==='licence.html')).toBe(true);
  expect(fs.existsSync('public/dictionaries/licenses/edrdg.html')).toBe(true);
  expect(fs.existsSync('public/dictionaries/licenses/jmdict-conversion.md')).toBe(true);
  const coreUses=register.uses.filter(use=>['N5','N4'].includes(use.level));
  const dictionaryUses=coreUses.filter(use=>use.unitKind==='dictionary-unit');
  expect(dictionaryUses.length).toBeGreaterThan(0);
  for(const use of dictionaryUses){
    expect(use.meaning.selectedSourceSenses.length,use.id).toBeGreaterThan(0);
    expect(use.meaning.status,use.id).toMatch(/đối chiếu/i);
  }
  const unresolved=raw.uses.filter(use=>!use.candidates.length);
  expect(unresolved.length).toBeGreaterThan(0);
  for(const use of unresolved){
    const classified=register.uses.find(item=>item.lessonId===use.lessonId&&item.writing===use.surface&&item.reading===use.reading);
    expect(classified?.unitKind).not.toBe('dictionary-unit');
    expect(classified?.composition?.sources?.length).toBeGreaterThan(0);
  }
  const coreLessonIds=new Set(lessons
    .filter(lesson=>lesson.referenceLesson&&['N5','N4'].includes(lesson.level||'N5'))
    .map(lesson=>lesson.id));
  const ambiguous=raw.uses.filter(use=>coreLessonIds.has(use.lessonId)&&use.candidates.length>1);
  expect(ambiguous.length).toBeGreaterThan(0);
  for(const row of ambiguous){
    const use=register.uses.find(item=>item.lessonId===row.lessonId&&item.writing===row.surface&&item.reading===row.reading);
    expect(use).toBeTruthy();
    expect(use.unitKind).toBe('dictionary-unit');
    expect(use.candidates).toHaveLength(1);
    expect(use.meaning.selectedSourceSenses.length).toBeGreaterThan(0);
  }

  const characters=new Set(lessons
    .filter(lesson=>lesson.referenceLesson&&['N5','N4'].includes(lesson.level||'N5'))
    .flatMap(lesson=>(lesson.kanji||[]).map(item=>item.char)));
  expect(characters.size).toBeGreaterThan(0);
  for(const char of characters){
    const hex=char.codePointAt(0).toString(16).padStart(5,'0');
    const source=JSON.parse(fs.readFileSync(`public/dictionaries/kanji/${hex}.json`,'utf8'));
    expect(source.char).toBe(char);
    expect(source.dictionary).toBe('KANJIDIC2');
    expect(source.license).toBe('CC BY-SA 4.0');
    expect(source.meanings.length).toBeGreaterThan(0);
    expect(source.on.length+source.kun.length).toBeGreaterThan(0);
  }
});

it('applies introductory source review after separating romaji from kana',async()=>{const{lessons}=await import('./content.js');const w=lessons.find(l=>l.id==='hira-k').words.find(w=>w.text==='えき');expect(w.reading).toBe('えき');expect(w.romaji).toBeTruthy();expect(w.sourceReview.entryId).toBe('1175140');});
