import { it, expect } from 'vitest';
import fs from 'node:fs';
import { lessons } from './content.js';
import { communication, transfer } from './communication-content.js';
import { wordEvidencePath, wordReviewKey } from './word-identity.js';
import { contextualBatch06To10BFor } from './n5-context-assessment-batch-06-10-b.js';
import { buildN5R1AssessmentBank } from './n5-r1-assessment-bank.js';
import { fresh, recordAnswer } from './state.js';

const batch = [6, 7, 8, 9, 10].flatMap(contextualBatch06To10BFor);
const norm = s => s.normalize('NFKC').replace(/[\s\p{P}\p{S}]/gu, '');
function corpus(value) {
  const out = new Set();
  const walk = (v, key = '') => {
    if (typeof v === 'string') {
      if (!/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(v)) return;
      if (['prompt', 'ja', 'text', 'transcript', 'assessmentTranscript', 'card', 'model'].includes(key) && norm(v).length >= 8) out.add(norm(v));
      for (const sentence of v.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\u30fc0-9\uff10-\uff19\u3001\uff01\uff1f\u30fb\u300c\u300d\s]+[\u3002\uff01\uff1f]/gu) || []) {
        if (norm(sentence).length >= 6) out.add(norm(sentence));
      }
    } else if (Array.isArray(v)) v.forEach(x => walk(x, key));
    else if (v && typeof v === 'object') {
      for (const [k, x] of Object.entries(v)) {
        if (!['explanation', 'meaning', 'reading', 'promptReading', 'sourceReview', 'sources', 'notes', 'skill', 'wordKey', 'usageId'].includes(k) && !(k === 'text' && v.meaning && v.reading)) walk(x, k);
      }
    }
  };
  walk(value);
  return out;
}

it('matches only existing N5 usages and their selected dictionary senses', () => {
  expect(batch).toHaveLength(25);
  expect(new Set(batch.map(q => q.id)).size).toBe(batch.length);
  for (const q of batch) {
    const lesson = lessons.find(l => l.id === q.sourceLessonId);
    const word = lesson.words.find(w => w.text === q.wordKey);
    const evidence = JSON.parse(fs.readFileSync('public' + wordEvidencePath(lesson.id, word.text)));
    expect(q.sourceEvidence.entryId, q.id).toBe(word.sourceReview.entryId);
    expect(q.sourceEvidence.senseIds, q.id).toEqual(word.sourceReview.senseIds);
    expect(evidence.meaning.selectedSourceSenses, q.id).toEqual(q.sourceEvidence.senseIds);
    expect(q.usageId).toBe(lesson.id + ':' + word.text);
    expect(q.choices[q.answer]).toBeTruthy();
    expect(new Set(q.choices).size).toBe(q.choices.length);
    expect(q.explanation.length).toBeGreaterThan(40);
    expect(q.assessmentScope).toContain('not listening');
    expect(q.validationStatus).toContain('no independent');
  }
});

it('uses contexts distinct from existing lesson and communication practice', () => {
  const training = new Set();
  for (const lesson of lessons.filter(l => !/assessment|final-review|comprehensive/.test(l.id))) {
    const teaching = {
      ...lesson,
      questions: (lesson.questions || []).filter(q => !q.assessment),
      listeningTasks: (lesson.listeningTasks || []).filter(t => !t.assessment),
    };
    for (const sentence of corpus([teaching, communication[lesson.id], transfer[lesson.id]])) training.add(sentence);
  }
  const overlaps = [];
  for (const q of batch) for (const sentence of corpus(q)) if (training.has(sentence)) overlaps.push({ id: q.id, sentence });
  expect(overlaps).toEqual([]);
});

it('records meaning review while preserving lesson completion and private notes', () => {
  const question = buildN5R1AssessmentBank().flatMap(l => l.questions).find(q => q.id === batch[0].id);
  let state = fresh();
  state.completed['mnn-06'] = 456;
  state.wordNotes[question.wordKey] = 'Existing private note';
  state = recordAnswer(state, question, question.answer, 1000);
  expect(state.wordEvidence[wordReviewKey(question.wordKey)].at(-1)).toMatchObject({
    kind: 'meaning', usageId: question.usageId, correct: true, afterModel: false,
  });
  expect(state.completed).toEqual({ 'mnn-06': 456 });
  expect(state.wordNotes[question.wordKey]).toBe('Existing private note');
});

it('integrates every item without changing the course lesson IDs or order', () => {
  const bank = buildN5R1AssessmentBank();
  for (const q of batch) expect(bank.some(l => l.questions.some(item => item.id === q.id))).toBe(true);
  expect(lessons.filter(l => /^mnn-(0[1-9]|1[0-9]|2[0-5])$/.test(l.id)).map(l => l.id))
    .toEqual(Array.from({ length: 25 }, (_, i) => 'mnn-' + String(i + 1).padStart(2, '0')));
});
