import{describe,it,expect}from'vitest';
import{mnnUnits}from'./mnn-course.js';
import{n4VocabularyBatch01}from'./n4-vocabulary-batch-01.js';
import fs from'node:fs';

const proposal=JSON.parse(fs.readFileSync('reference/vocabulary-scope-proposal-r2.json','utf8'));
const dictionary=JSON.parse(fs.readFileSync('public/dictionaries/word-evidence.json','utf8'));
const audioCatalog=JSON.parse(fs.readFileSync('src/generated-audio.json','utf8'));

describe('N4 vocabulary batch 01',()=>{
  it('adds 85 source-pinned entries with examples to functional lesson links',()=>{
    expect(n4VocabularyBatch01).toHaveLength(85);
    expect(new Set(n4VocabularyBatch01.map(row=>row.text)).size).toBe(85);
    expect(new Set(n4VocabularyBatch01.map(row=>row.sourceReview.entryId)).size).toBe(85);
    for(const row of n4VocabularyBatch01){
      expect(row.lessonNumber).toBeGreaterThanOrEqual(26);
      expect(row.reason.length).toBeGreaterThan(30);
      expect(row.example.ja.length).toBeGreaterThan(5);
      expect(row.example.reading.length).toBeGreaterThan(5);
      expect(row.example.vi.length).toBeGreaterThan(5);
      const lesson=mnnUnits.find(unit=>unit.number===row.lessonNumber);
      expect(lesson.words.filter(word=>word.text===row.text&&word.reading===row.reading)).toHaveLength(1);
      const source=proposal.entries.find(entry=>entry.proposedStage==='N4'&&entry.key===row.text);
      expect(source).toBeTruthy();
      expect(source.sourceCoordinates.length).toBeGreaterThan(0);
      expect(source.minnaFunctionalLinks).toContain(row.lessonNumber);
      if(row.text!=='うがい')expect(source.dictionaryEvidence.some(candidate=>candidate.entryId===row.sourceReview.entryId&&candidate.matchingReading===row.reading)).toBe(true);
      const entry=dictionary.entries.find(candidate=>candidate.id===row.sourceReview.entryId);
      expect(entry).toBeTruthy();
      expect(entry.senses.some(sense=>row.sourceReview.senseIds.includes(sense.id))).toBe(true);
      const lessonId=`mnn-${String(row.lessonNumber).padStart(2,'0')}`;
      const assets=[
        audioCatalog.find(asset=>!asset.retired&&asset.kind==='word'&&asset.text===row.text&&asset.reading===row.reading&&asset.lessonIds.includes(lessonId)),
        audioCatalog.find(asset=>!asset.retired&&asset.kind==='sentence'&&asset.text===row.example.ja&&asset.displayReading===row.example.reading&&asset.lessonIds.includes(lessonId))
      ];
      for(const asset of assets){
        expect(asset).toBeTruthy();
        expect(asset.readingCheck.actual).toBe(asset.readingCheck.expected);
        expect(fs.existsSync('public'+asset.path)).toBe(true);
      }
    }
  });

  it('uses the gargling sense rather than the homographic cormorant-fishing match',()=>{
    const row=n4VocabularyBatch01.find(item=>item.text==='うがい');
    expect(row.sourceReview.entryId).toBe('1577660');
    const entry=dictionary.entries.find(candidate=>candidate.id===row.sourceReview.entryId);
    expect(entry.senses.find(sense=>sense.id==='1577660-s0').gloss).toContain('gargling');
  });
});
