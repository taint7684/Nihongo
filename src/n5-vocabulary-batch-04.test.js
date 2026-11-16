import{describe,it,expect}from'vitest';
import{mnnUnits}from'./mnn-course.js';
import{n5VocabularyBatch04}from'./n5-vocabulary-batch-04.js';
import fs from'node:fs';
import{wordPool}from'./LessonExperience.jsx';
import{fresh}from'./state.js';
import{scheduleWord}from'./word-state.js';
import{getWordReview}from'./word-identity.js';

const proposal=JSON.parse(fs.readFileSync('reference/vocabulary-scope-proposal-r2.json','utf8'));
const dictionary=JSON.parse(fs.readFileSync('public/dictionaries/word-evidence.json','utf8'));
const audioCatalog=JSON.parse(fs.readFileSync('src/generated-audio.json','utf8'));
const normalizeKana=value=>value.replace(/[ァ-ヶ]/g,char=>String.fromCharCode(char.charCodeAt(0)-0x60));

describe('N5 vocabulary batch 04',()=>{
  it('adds 30 unique, source-pinned entries to linked lessons with playable audio',()=>{
    expect(n5VocabularyBatch04).toHaveLength(30);
    expect(new Set(n5VocabularyBatch04.map(row=>row.text)).size).toBe(30);
    expect(new Set(n5VocabularyBatch04.map(row=>row.sourceReview.entryId)).size).toBe(30);
    for(const row of n5VocabularyBatch04){
      expect(row.lessonNumber).toBeLessThanOrEqual(25);
      expect(row.reason.length).toBeGreaterThan(30);
      const lesson=mnnUnits.find(unit=>unit.number===row.lessonNumber);
      expect(lesson.words.filter(word=>word.text===row.text&&word.reading===row.reading)).toHaveLength(1);
      const source=proposal.entries.find(entry=>entry.proposedStage==='N5'&&entry.key===row.text);
      expect(source).toBeTruthy();
      expect(source.sourceCoordinates.length).toBeGreaterThan(0);
      expect(source.minnaFunctionalLinks).toContain(row.lessonNumber);
      expect(source.dictionaryEvidence.some(candidate=>candidate.entryId===row.sourceReview.entryId&&normalizeKana(candidate.matchingReading)===normalizeKana(row.reading))).toBe(true);
      const selectedEntry=dictionary.entries.find(entry=>entry.id===row.sourceReview.entryId);
      expect(selectedEntry?.senses.filter(sense=>row.sourceReview.senseIds.includes(sense.id)).length).toBe(1);
      const lessonId='mnn-'+String(row.lessonNumber).padStart(2,'0');
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

  it('joins the shared review pool and schedules the new words without recording learner results',()=>{
    const pool=new Set(wordPool().map(word=>word.text));
    const now=Date.now();
    for(const row of n5VocabularyBatch04){
      expect(pool.has(row.text)).toBe(true);
      const state=scheduleWord(fresh(),row.text,true,now);
      expect(getWordReview(state,row.text).due).toBeGreaterThan(now);
    }
  });
});