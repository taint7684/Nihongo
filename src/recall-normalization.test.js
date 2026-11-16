import {expect, it} from 'vitest';
import {normalizeRecall} from './Exercise.jsx';

it('ignores Japanese sentence punctuation and spacing without changing kana or Kanji', () => {
  expect(normalizeRecall('このノートは いくらですか。')).toBe(normalizeRecall('このノートはいくらですか'));
  expect(normalizeRecall('駅へ、いつ行きますか？')).toBe(normalizeRecall('駅へいつ行きますか'));
  expect(normalizeRecall('おばさん')).not.toBe(normalizeRecall('おばあさん'));
});
