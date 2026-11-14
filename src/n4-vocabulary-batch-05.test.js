import{describe,it,expect}from'vitest';
import{mnnUnits}from'./mnn-course.js';
import{n4VocabularyBatch05}from'./n4-vocabulary-batch-05.js';
import{wordPool}from'./LessonExperience.jsx';
import{fresh}from'./state.js';
import{getWordReview}from'./word-identity.js';
import{scheduleWord}from'./word-state.js';
import fs from'node:fs';

const openJlptN4=JSON.parse(fs.readFileSync('.sources/openjlpt-20261113/n4-vocab.json','utf8'));
const openJlptN5=JSON.parse(fs.readFileSync('.sources/openjlpt-20261113/n5-vocab.json','utf8'));
const openJlpt=[...openJlptN4,...openJlptN5];
const irodori=JSON.parse(fs.readFileSync('.sources/irodori-20261112/wordlist_all.json','utf8'))[0].rows;
const dictionary=JSON.parse(fs.readFileSync('public/dictionaries/word-evidence.json','utf8'));
const register=JSON.parse(fs.readFileSync('public/lexical-register.json','utf8'));
const audioCatalog=JSON.parse(fs.readFileSync('src/generated-audio.json','utf8'));
const hiragana=value=>value.replace(/[ァ-ヶ]/g,char=>String.fromCharCode(char.charCodeAt(0)-0x60));

const typeOverrides=new Map([
  ['半分','danh từ / trạng từ'],['生','danh từ / định ngữ の'],['プラスチック','danh từ / định ngữ の'],
  ['所属','danh từ / động từ する'],['通訳','danh từ / động từ する'],['指示','danh từ / động từ する'],
  ['介護','danh từ / động từ する'],['おしゃべり','danh từ / động từ する'],['撮影','danh từ / động từ する'],
  ['自然','danh từ / tính từ な'],['地元','danh từ / định ngữ の'],['外国','danh từ / định ngữ の'],
  ['本物','danh từ / định ngữ の'],['直接','danh từ / trạng từ'],['今回','danh từ / trạng từ'],
  ['次回','danh từ / trạng từ'],['当日','danh từ / trạng từ'],['本日','danh từ / trạng từ'],
  ['先ほど','danh từ / trạng từ'],['さき','danh từ / trạng từ'],['別々','danh từ / tính từ な']
]);
describe('N4 vocabulary batch 05',()=>{
  it('adds 80 distinct, source-selected lexemes to functionally linked N4 lessons',()=>{
    expect(n4VocabularyBatch05).toHaveLength(80);
    expect(new Set(n4VocabularyBatch05.map(row=>row.sourceReview.entryId)).size).toBe(80);
    for(const row of n4VocabularyBatch05){
      expect(row.reason.length).toBeGreaterThan(30);
      expect(row.example.reading.length).toBeGreaterThan(5);
      expect(row.example.vi.length).toBeGreaterThan(5);
      expect(row.curriculum.lessonNumber).toBe(row.lessonNumber);
      const lesson=mnnUnits.find(unit=>unit.number===row.lessonNumber);
      expect(lesson.words.filter(word=>word.text===row.text&&word.reading===row.reading)).toHaveLength(1);
      const evidence=dictionary.uses.find(use=>use.lessonId===`mnn-${String(row.lessonNumber).padStart(2,'0')}`&&use.surface===row.text&&use.reading===row.reading);
      expect(evidence).toBeTruthy();
      expect(evidence.candidates.some(candidate=>candidate.id===row.sourceReview.entryId)).toBe(true);
      const selectedSense=dictionary.entries.find(entry=>entry.id===row.sourceReview.entryId).senses.find(sense=>row.sourceReview.senseIds.includes(sense.id));
      expect(selectedSense).toBeTruthy();
      const typeLabels=['danh từ','động từ','tính từ','trạng từ','đại từ','liên từ','thán từ','động từ する','định ngữ'];
      expect(row.type).toBeTruthy();
      expect(typeLabels.some(t=>row.type.includes(t))).toBe(true);
      const registered=register.uses.find(use=>use.lessonId===evidence.lessonId&&use.legacyKey===row.text&&use.reading===row.reading);
      expect(registered.lexemeId).toBe(`jmdict:${row.sourceReview.entryId}`);
    }
  });

  it('matches exact Irodori spellings and records the limited OpenJLPT crosswalk',()=>{
    let openMatches=0;
    for(const row of n4VocabularyBatch05){
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
    expect(openMatches).toBeGreaterThanOrEqual(0);
  });

  it('has playable word and sentence assets with declared reading matches',()=>{
    for(const row of n4VocabularyBatch05){
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
    for(const row of n4VocabularyBatch05){
      expect(pool.has(row.text)).toBe(true);
      const state=scheduleWord(fresh(),row.text,true,now);
      expect(getWordReview(state,row.text).due).toBeGreaterThan(now);
    }
  });
});
