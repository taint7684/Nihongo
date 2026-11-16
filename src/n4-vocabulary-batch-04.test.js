import{describe,it,expect}from'vitest';
import{mnnUnits}from'./mnn-course.js';
import{n4VocabularyBatch04}from'./n4-vocabulary-batch-04.js';
import{wordPool}from'./LessonExperience.jsx';
import{fresh}from'./state.js';
import{getWordReview}from'./word-identity.js';
import{scheduleWord}from'./word-state.js';
import fs from'node:fs';

const openJlpt=JSON.parse(fs.readFileSync('.sources/openjlpt-20261113/n4-vocab.json','utf8'));
const irodori=JSON.parse(fs.readFileSync('.sources/irodori-20261112/wordlist_all.json','utf8'))[0].rows;
const dictionary=JSON.parse(fs.readFileSync('public/dictionaries/word-evidence.json','utf8'));
const register=JSON.parse(fs.readFileSync('public/lexical-register.json','utf8'));
const audioCatalog=JSON.parse(fs.readFileSync('src/generated-audio.json','utf8'));
const hiragana=value=>value.replace(/[ァ-ヶ]/g,char=>String.fromCharCode(char.charCodeAt(0)-0x60));

describe('N4 vocabulary batch 04',()=>{
  it('adds 80 distinct, source-selected lexemes to functionally linked N4 lessons',()=>{
    expect(n4VocabularyBatch04).toHaveLength(80);
    expect(new Set(n4VocabularyBatch04.map(row=>row.sourceReview.entryId)).size).toBe(80);
    for(const row of n4VocabularyBatch04){
      expect(row.reason.length).toBeGreaterThan(30);
      const targetStem=row.reading.replace(/(?:る|す|く|い|う)$/,'');
      expect(row.example.ja.includes(row.text)||row.example.reading.includes(targetStem)).toBe(true);
      expect(row.example.reading.length).toBeGreaterThan(5);
      expect(row.example.vi.length).toBeGreaterThan(5);
      expect(row.curriculum.lessonNumber).toBe(row.lessonNumber);
      const lesson=mnnUnits.find(unit=>unit.number===row.lessonNumber);
      expect(lesson.words.filter(word=>word.text===row.text&&word.reading===row.reading)).toHaveLength(1);
      const evidence=dictionary.uses.find(use=>use.lessonId===`mnn-${String(row.lessonNumber).padStart(2,'0')}`&&use.surface===row.text&&use.reading===row.reading);
      expect(evidence.candidates.some(candidate=>candidate.id===row.sourceReview.entryId)).toBe(true);
      const selectedSense=dictionary.entries.find(entry=>entry.id===row.sourceReview.entryId).senses.find(sense=>row.sourceReview.senseIds.includes(sense.id));
      expect(selectedSense).toBeTruthy();
      if(selectedSense.partOfSpeech.some(pos=>pos.startsWith('vs')))expect(row.type).toContain('động từ する');
      if(!selectedSense.partOfSpeech.some(pos=>pos.startsWith('vs'))&&selectedSense.partOfSpeech.some(pos=>pos.startsWith('v')&&!pos.startsWith('vi')))expect(row.type).toBe('động từ');
      if(selectedSense.partOfSpeech.includes('adj-i'))expect(row.type).toBe('tính từ い');
      if(selectedSense.partOfSpeech.includes('adj-no')&&selectedSense.partOfSpeech.includes('n'))expect(row.type).toContain('định ngữ の');
      const registered=register.uses.find(use=>use.lessonId===evidence.lessonId&&use.legacyKey===row.text&&use.reading===row.reading);
      expect(registered.lexemeId).toBe(`jmdict:${row.sourceReview.entryId}`);
    }
  });

  it('matches exact Irodori spellings and records the limited OpenJLPT crosswalk',()=>{
    let openMatches=0;
    for(const row of n4VocabularyBatch04){
      const irodoriMatch=irodori.some(source=>Object.keys(source).some(key=>{
        if(!/^C\d+$/.test(key)||source[key]!==row.text)return false;
        const rowNumber=Number(key.slice(1));
        return hiragana(source[`D${rowNumber}`]||'')===hiragana(row.reading);
      }));
      expect(irodoriMatch).toBe(true);
      const matches=openJlpt.filter(source=>source.jmdict_id===Number(row.sourceReview.entryId));
      if(matches.length)openMatches++;
      expect(Boolean(row.sourceReview.openJlptJmdictId)).toBe(matches.length>0);
    }
    expect(openMatches).toBe(1);
  });

  it('has playable word and sentence assets with declared reading matches',()=>{
    for(const row of n4VocabularyBatch04){
      const lessonId=`mnn-${String(row.lessonNumber).padStart(2,'0')}`;
      const assets=[
        audioCatalog.find(asset=>!asset.retired&&asset.kind==='word'&&asset.text===row.text&&asset.reading===row.reading&&asset.lessonIds.includes(lessonId)),
        audioCatalog.find(asset=>!asset.retired&&asset.kind==='sentence'&&asset.text===row.example.ja&&asset.displayReading===row.example.reading&&asset.lessonIds.includes(lessonId))
      ];
      for(const asset of assets){
        expect(asset).toBeTruthy();
        expect(asset.readingCheck.actual).toBe(asset.readingCheck.expected);
        expect(fs.existsSync(`public${asset.path}`)).toBe(true);
      }
    }
  });

  it('joins the shared review pool and schedules the new words without recording learner results',()=>{
    const pool=new Set(wordPool().map(word=>word.text));
    const now=Date.now();
    for(const row of n4VocabularyBatch04){
      expect(pool.has(row.text)).toBe(true);
      const state=scheduleWord(fresh(),row.text,true,now);
      expect(getWordReview(state,row.text).due).toBeGreaterThan(now);
    }
  });
});
