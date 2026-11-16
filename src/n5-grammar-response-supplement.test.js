import {expect, it} from 'vitest';
import {lessons} from './content.js';
import {buildN5R1AssessmentBank} from './n5-r1-assessment-bank.js';
import {grammarResponseSupplementFor} from './n5-grammar-response-supplement.js';
import {fresh, recordAnswer} from './state.js';

const targets = [
  [3, 'deictic-cafeteria', 'mnn-03-g0'],
  [3, 'ask-notebook-price', 'mnn-03-g3'],
  [4, 'state-meeting-time', 'mnn-04-g0'],
  [4, 'state-wake-time', 'mnn-04-g2'],
  [5, 'state-destination', 'mnn-05-g0'],
  [5, 'ask-station-time', 'mnn-05-g3'],
  [1, 'introduce-name', 'mnn-01-g0'],
  [1, 'confirm-teacher', 'mnn-01-g2'],
  [1, 'friend-also-student', 'mnn-01-g3'],
  [1, 'teacher-notebook', 'mnn-01-g4'],
  [2, 'pen-by-listener', 'mnn-02-g0'],
  [2, 'this-notebook-mine', 'mnn-02-g1'],
  [2, 'ask-book-owner', 'mnn-02-g3'],
  [3, 'polite-counter-direction', 'mnn-03-g2'],
  [5, 'weekend-no-destination', 'mnn-05-g4'],
  [6, 'read-newspaper', 'mnn-06-g0'],
  [6, 'ask-breakfast-food', 'mnn-06-g2'],
  [8, 'describe-quiet-town', 'mnn-08-g0'],
  [8, 'deny-quiet-town', 'mnn-08-g1'],
  [8, 'ask-about-trip', 'mnn-08-g4'],
  [1, 'ask-person-identity', 'mnn-01-g6'],
];

it('adds distinct typed N5 responses linked only to the grammar each prompt applies', () => {
  const bank = buildN5R1AssessmentBank();
  for (const [lessonNumber, key, grammarId] of targets) {
    const id = 'n5-assessment-r1-' + String(lessonNumber).padStart(2, '0') + '-grammar-response-' + key;
    const q = bank.find(lesson => lesson.id.endsWith(String(lessonNumber).padStart(2, '0'))).questions.find(item => item.id === id);
    const source = lessons.find(lesson => lesson.id === 'mnn-' + String(lessonNumber).padStart(2, '0'));
    const grammarIndex = Number(grammarId.slice(grammarId.lastIndexOf('-g') + 2));
    expect(q, id).toBeTruthy();
    expect(q.kind).toBe('recall');
    expect(q.grammarIds).toEqual([grammarId]);
    expect(q.accepted.length).toBeGreaterThan(1);
    expect(source.grammar[grammarIndex]).toBeTruthy();
    expect(q.assessmentScope).toContain('not semantic review');
    expect(q.responseNote).toContain('chưa được chấm ngữ nghĩa');
    expect(q.wordKey).toBeUndefined();
  }
});

it('schedules accepted responses and keeps unlisted sentences unconfirmed without errors', () => {
  const q = grammarResponseSupplementFor(4)[1];
  const accepted = recordAnswer(fresh(), q, q.answer, 1000, q.accepted[1]);
  const unmatched = recordAnswer(fresh(), q, q.answer === 0 ? 1 : 0, 1000, '九時に起きます');
  expect(accepted.answers[q.id]).toMatchObject({correct: true, response: q.accepted[1]});
  expect(accepted.reviews[q.id].due).toBe(86401000);
  expect(unmatched.answers[q.id]).toBeUndefined();
  expect(unmatched.reviews[q.id]).toBeUndefined();
  expect(unmatched.unconfirmedResponses[q.id]).toMatchObject({status:'unconfirmed',response:'九時に起きます'});
});

it('adds real guided practice and a shared review link for the lesson 2 owner-question gap', () => {
  const lesson = lessons.find(item => item.referenceLesson === 2);
  const question = lesson.questions.find(item => item.id === 'm02-owner-ask');
  expect(lesson.guidedMap[3]).toContain(question.id);
  expect(question.assessment).not.toBe(true);
  const correct = recordAnswer(fresh(), question, question.answer, 1000);
  const incorrect = recordAnswer(fresh(), question, question.answer === 0 ? 1 : 0, 1000);
  expect(correct.reviews[question.id].due).toBe(86401000);
  expect(incorrect.reviews[question.id].due).toBe(1000);
});
