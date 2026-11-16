import{describe,it,expect}from'vitest';
import{mnnUnits}from'./mnn-course.js';
import{n5VocabularyBatch01}from'./n5-vocabulary-batch-01.js';
import fs from'node:fs';

const proposal=JSON.parse(fs.readFileSync('reference/vocabulary-scope-proposal-r2.json','utf8'));
const dictionary=JSON.parse(fs.readFileSync('public/dictionaries/word-evidence.json','utf8'));
const audioCatalog=JSON.parse(fs.readFileSync('src/generated-audio.json','utf8'));
const normalizeKana=value=>value.replace(/[ァ-ヶ]/g,char=>String.fromCharCode(char.charCodeAt(0)-0x60));

describe('N5 vocabulary batch 01',()=>{
  it('adds 80 unique, source-pinned entries to their linked N5 lessons',()=>{
    expect(n5VocabularyBatch01).toHaveLength(80);
    expect(new Set(n5VocabularyBatch01.map(row=>row.sourceReview.entryId)).size).toBe(80);
    for(const row of n5VocabularyBatch01){
      expect(row.lessonNumber).toBeLessThanOrEqual(25);
      expect(row.reason.length).toBeGreaterThan(30);
      expect(row.example.ja).toBeTruthy();
      expect(row.example.reading).toBeTruthy();
      expect(row.example.vi).toBeTruthy();
      const lesson=mnnUnits.find(unit=>unit.number===row.lessonNumber);
      expect(lesson.words.filter(word=>word.text===row.text&&word.reading===row.reading)).toHaveLength(1);
      expect(lesson.words.find(word=>word.text===row.text).sourceReview.senseIds).toEqual(row.sourceReview.senseIds);
      const source=proposal.entries.find(entry=>entry.proposedStage==='N5'&&entry.key===row.text);
      expect(source).toBeTruthy();
      expect(source.sourceCoordinates.length).toBeGreaterThan(0);
      expect(source.dictionaryEvidence.some(candidate=>candidate.entryId===row.sourceReview.entryId&&normalizeKana(candidate.matchingReading)===normalizeKana(row.reading))).toBe(true);
      expect(source.minnaFunctionalLinks).toContain(row.lessonNumber);
      const selectedEntry=dictionary.entries.find(entry=>entry.id===row.sourceReview.entryId);
      expect(selectedEntry?.senses.filter(sense=>row.sourceReview.senseIds.includes(sense.id)).length).toBe(1);
      const lessonId='mnn-'+String(row.lessonNumber).padStart(2,'0');
      const wordAudio=audioCatalog.find(asset=>!asset.retired&&asset.kind==='word'&&asset.text===row.text&&asset.reading===row.reading&&asset.lessonIds.includes(lessonId));
      const exampleAudio=audioCatalog.find(asset=>!asset.retired&&asset.kind==='sentence'&&asset.text===row.example.ja&&asset.displayReading===row.example.reading&&asset.lessonIds.includes(lessonId));
      for(const asset of [wordAudio,exampleAudio]){
        expect(asset).toBeTruthy();
        expect(asset.readingCheck.actual).toBe(asset.readingCheck.expected);
        expect(fs.existsSync('public'+asset.path)).toBe(true);
      }
    }
  });
});
