import {it,expect} from 'vitest';
import fs from 'node:fs';
import {placementSupportFor} from './n5-placement-support.js';
const rows=Array.from({length:25},(_,i)=>placementSupportFor(i+1)).flat();
it('places exactly the seven reused lexical items in N5 without mutating old source identities',()=>{
 expect(rows).toHaveLength(7);expect(new Set(rows.map(w=>w.sourceReuse.canonicalId)).size).toBe(7);
 expect(placementSupportFor(2).map(w=>w.text)).toEqual(['言葉','質問']);
 expect(placementSupportFor(5).map(w=>w.text)).toEqual(['先月','来月','来年','帰り']);
 expect(placementSupportFor(6).map(w=>w.text)).toEqual(['今度']);
 for(const w of rows){expect(w.sourceReuse.doesNotAddCumulativeLexeme).toBe(true);expect(w.example.ja).toContain(w.text);expect(w.example.reading).toBeTruthy();expect(w.example.vi).toBeTruthy();expect(w.placementReview.prerequisiteMax).toBeLessThanOrEqual(w.placementReview.targetLesson);}
});
it('keeps selected source senses and readings inside the existing N4 source record',()=>{
 for(const w of rows){const d=JSON.parse(fs.readFileSync('public'+w.sourceReuse.sourcePath,'utf8'));expect(d.reading).toBe(w.reading);expect(d.lexemeId).toBe(w.sourceReuse.canonicalId);for(const sid of w.sourceReview.senseIds){expect(d.meaning.selectedSourceSenses).toContain(sid);expect(d.sourceEntries.flatMap(e=>e.senses).some(s=>s.id===sid)).toBe(true);}}
 expect(placementSupportFor(2)[0].sourceReview.senseIds).toEqual(['1264540-s1']);
 expect(placementSupportFor(6)[0].sourceReview.senseIds).toEqual(['1289370-s1']);
});
it('reuses real indexed word assets but does not fabricate new sentence audio or a phonetic review',()=>{
 const index=JSON.parse(fs.readFileSync('public/audio/tts/index.json','utf8'));
 for(const w of rows){const asset=index.find(a=>a.id===w.audioReuse.wordAssetId);expect(asset.text).toBe(w.text);expect(asset.reading).toBe(w.reading);expect(asset.path).toBe(w.audioReuse.wordAssetPath);expect(fs.existsSync('public'+asset.path)).toBe(true);expect(w.audioReuse.exampleStatus).toContain('not generated');expect(w.audioReuse.wordStatus).toContain('no new playback');}
});
it('uses only noun frames, basic travel/tense and invitations rather than importing N4 example grammar',()=>{
 for(const w of rows)expect(w.example.ja).not.toMatch(/ように|つもり|予定|てしま|ばかり|と思|ことが|ていただ/);
 const a=placementSupportFor(5);expect(a.find(w=>w.text==='先月').example.ja).toContain('行きました');expect(a.find(w=>w.text==='来月').example.ja).toContain('行きます');expect(placementSupportFor(6)[0].example.ja).toContain('見ませんか');
 const modified=placementSupportFor(2);modified[0].sourceReview.senseIds.push('not-a-source');expect(placementSupportFor(2)[0].sourceReview.senseIds).toEqual(['1264540-s1']);
});
