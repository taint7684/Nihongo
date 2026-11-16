import {expect, it} from 'vitest';
import {lessons} from './content.js';
import {hasKanjiStrokePractice, kanjiUseMatchesWord, kanjiWordForLesson} from './kanji-usage-link.js';
import {kanjiAssessmentSupplementFor} from './n5-kanji-assessment-supplement.js';
import {fresh, recordAnswer, validate} from './state.js';
import fs from 'node:fs';

const items = [...Array.from({length: 9}, (_, index) => kanjiAssessmentSupplementFor(index + 1)).flat(), ...kanjiAssessmentSupplementFor(14)];

it('matches the actual in-lesson Kanji word format without accepting substrings', () => {
  expect(kanjiUseMatchesWord({inWord: '学生（がくせい）'}, '学生')).toBe(true);
  expect(kanjiUseMatchesWord({wordKey: '学生', inWord: '学'}, '学生')).toBe(true);
  expect(kanjiUseMatchesWord({inWord: '学生（がくせい）'}, '学')).toBe(false);
  expect(kanjiUseMatchesWord({inWord: '大学生（だいがくせい）'}, '大学')).toBe(false);
});

it('counts only usable licensed stroke data and the Kanji focus exact linked-word fallback', () => {
  expect(kanjiWordForLesson({words: [{text: '学生'}]}, {wordKey: '学生', char: '学'}).text).toBe('学生');
  expect(kanjiWordForLesson({words: [{text: '手紙'}]}, {char: '手'}).text).toBe('手紙');
  expect(kanjiWordForLesson({words: [{text: '本'}]}, {char: '学'})).toBeUndefined();
  expect(hasKanjiStrokePractice({char: '学', paths: ['M0 0'], credit: 'KanjiVG', license: 'CC BY-SA'}, '学')).toBe(true);
  expect(hasKanjiStrokePractice({char: '学', paths: [], credit: 'KanjiVG', license: 'CC BY-SA'}, '学')).toBe(false);
  expect(hasKanjiStrokePractice({char: '学', paths: ['M0 0'], credit: '', license: 'CC BY-SA'}, '学')).toBe(false);
});

it('links each new reading check to taught words and Kanji in its actual source lesson', () => {
  expect(items).toHaveLength(16);
  for (const q of items) {
    const source = lessons.find(lesson => lesson.id === q.sourceLessonId);
    const word = source.words.find(entry => entry.text === q.wordKey);
    expect(word, q.id).toBeTruthy();
    expect(q.usageId).toBe(source.id + ':' + word.text);
    expect(q.choices[q.answer]).toBe(word.reading);
    expect(q.assessesKanji.length).toBeGreaterThan(0);
    for (const char of q.assessesKanji) {
      expect(q.wordKey.includes(char), q.id + ':' + char).toBe(true);
      expect(source.kanji.some(item => item.char === char && kanjiUseMatchesWord(item, q.wordKey)), q.id + ':' + char).toBe(true);
    }
    expect(lessons.find(lesson => lesson.id === 'n5-assessment-r1-' + q.sourceLessonId.slice(-2)).questions.some(item => item.id === q.id)).toBe(true);
  }
});

it('provides the previously missing N5 教 reading practice through its existing 教えます lesson word', () => {
  const lesson = lessons.find(item => item.id === 'mnn-14');
  const kanji = lesson.kanji.find(item => item.char === '教');
  const word = kanjiWordForLesson(lesson, kanji);
  expect(word.text).toBe('教えます');
  expect(word.example.ja).toBeTruthy();
  expect(word.sourceReview.senseIds.length).toBeGreaterThan(0);
  expect(items.find(item => item.wordKey === '教えます').assessesKanji).toEqual(['教']);
});

it('has actual stroke-practice data for every distinct N5/N4 lesson Kanji', () => {
  const chars = new Set(lessons.filter(lesson => lesson.referenceLesson && ['N5', 'N4'].includes(lesson.level || 'N5')).flatMap(lesson => (lesson.kanji || []).map(item => item.char)));
  for (const char of chars) {
    const path = 'public/kanji/' + char.codePointAt(0).toString(16).padStart(5, '0') + '.json';
    const asset = JSON.parse(fs.readFileSync(path, 'utf8'));
    expect(hasKanjiStrokePractice(asset, char), char).toBe(true);
  }
});

it('records Kanji reading in the common word queue as distinct evidence and preserves backup state', () => {
  const source = lessons.find(lesson => lesson.id === 'mnn-01');
  const q = lessons.find(lesson => lesson.id === 'n5-assessment-r1-01').questions.find(item => item.id === items[0].id);
  let state = fresh();
  state.wordNotes['会社員'] = 'Existing note';
  state = recordAnswer(state, q, (q.answer + 1) % q.choices.length, 1000);
  const restored = validate(JSON.parse(JSON.stringify(state)));
  expect(restored.wordReviews['会社員'].due).toBe(301000);
  expect(restored.wordEvidence['会社員'].at(-1)).toMatchObject({
    kind: 'kanji-reading',
    usageId: source.id + ':会社員',
    correct: false,
    afterModel: false,
  });
  expect(restored.wordNotes['会社員']).toBe('Existing note');
  expect(restored.completed).toEqual({});
  expect(restored.reviews[q.id]).toBeUndefined();
});
