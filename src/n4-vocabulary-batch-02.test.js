import{describe,it,expect}from'vitest';
import{mnnUnits}from'./mnn-course.js';
import{n4VocabularyBatch02}from'./n4-vocabulary-batch-02.js';
import{wordPool}from'./LessonExperience.jsx';
import{fresh}from'./state.js';
import{getWordReview}from'./word-identity.js';
import{scheduleWord}from'./word-state.js';
import fs from'node:fs';

const openJlpt=JSON.parse(fs.readFileSync('.sources/openjlpt-20261113/n4-vocab.json','utf8'));
const dictionary=JSON.parse(fs.readFileSync('public/dictionaries/word-evidence.json','utf8'));
const register=JSON.parse(fs.readFileSync('public/lexical-register.json','utf8'));
const audioCatalog=JSON.parse(fs.readFileSync('src/generated-audio.json','utf8'));

describe('N4 vocabulary batch 02',()=>{
  it('uses unique JMdict entries and selected senses in linked course lessons',()=>{
    expect(n4VocabularyBatch02).toHaveLength(86);
    expect(new Set(n4VocabularyBatch02.map(row=>row.sourceReview.entryId)).size).toBe(86);
    for(const row of n4VocabularyBatch02){
      expect(row.reason.length).toBeGreaterThan(30);
      expect(row.example.ja.length).toBeGreaterThan(5);
      expect(row.example.reading.length).toBeGreaterThan(5);
      expect(row.example.vi.length).toBeGreaterThan(5);
      const lesson=mnnUnits.find(unit=>unit.number===row.lessonNumber);
      expect(lesson.words.filter(word=>word.text===row.text&&word.reading===row.reading)).toHaveLength(1);
      const evidence=dictionary.uses.find(use=>use.lessonId===`mnn-${String(row.lessonNumber).padStart(2,'0')}`&&use.surface===row.text&&use.reading===row.reading);
      expect(evidence.candidates.some(candidate=>candidate.id===row.sourceReview.entryId)).toBe(true);
      const selectedSense=dictionary.entries.find(entry=>entry.id===row.sourceReview.entryId).senses.find(sense=>row.sourceReview.senseIds.includes(sense.id));
      expect(selectedSense).toBeTruthy();
      if(selectedSense.partOfSpeech.includes('vs'))expect(row.type).toBe('danh từ / động từ する');
      if(selectedSense.partOfSpeech.includes('adj-na'))expect(row.type).toContain('tính từ な');
      const registered=register.uses.find(use=>use.lessonId===evidence.lessonId&&use.legacyKey===row.text&&use.reading===row.reading);
      expect(registered.lexemeId).toBe(`jmdict:${row.sourceReview.entryId}`);
    }
  });

  it('crosswalks each entry to the pinned OpenJLPT list and records spelling differences',()=>{
    const membership=n4VocabularyBatch02.map(row=>openJlpt.filter(source=>source.jmdict_id===Number(row.sourceReview.openJlptJmdictId)));
    expect(membership.every(rows=>rows.length>0)).toBe(true);
    const exact=n4VocabularyBatch02.filter((row,index)=>membership[index].some(source=>source.word===row.text&&source.reading===row.reading));
    expect(exact).toHaveLength(85);
    expect(n4VocabularyBatch02.find(row=>row.text==='挨拶').sourceReview.openJlptJmdictId).toBe('1151120');
  });

  it('selects the home/family sense for うち in its neighborhood example',()=>{
    const row=n4VocabularyBatch02.find(item=>item.text==='うち');
    expect(row.sourceReview.senseIds).toEqual(['1457730-s6']);
    const entry=dictionary.entries.find(item=>item.id==='1457730');
    expect(entry.senses.find(sense=>sense.id==='1457730-s6').gloss).toContain("one's home");
  });

  it('has playable word and sentence assets with declared reading checks',()=>{
    for(const row of n4VocabularyBatch02){
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

  it('joins the shared word review pool and persists due dates through the existing scheduler',()=>{
    const pool=new Set(wordPool().map(word=>word.text));
    const now=Date.now();
    for(const row of n4VocabularyBatch02){
      expect(pool.has(row.text)).toBe(true);
      const state=scheduleWord(fresh(),row.text,true,now);
      expect(getWordReview(state,row.text).due).toBeGreaterThan(now);
    }
  });
});
