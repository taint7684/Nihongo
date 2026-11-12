import { it, expect } from 'vitest';
import { examEntrySummary, validateExamEntry } from './exam-log.js';
import { jlptOfficialFacts } from './jlpt-official-facts.js';
import { fresh, validate } from './state.js';

const base = {
  id: 'qa',
  at: 1,
  level: 'N4',
  kind: 'official-scaled',
  label: 'QA',
  knowledgeReading: 100,
  listening: 18,
  allSectionsAttended: true
};

it('matches the official N5/N4 timing, score ranges and pass rules', () => {
  const expected = {
    N5: { times: [20, 40, 30], overall: 80, taskTypes: 14 },
    N4: { times: [25, 55, 35], overall: 90, taskTypes: 15 }
  };

  for (const [level, values] of Object.entries(expected)) {
    const facts = jlptOfficialFacts.levels[level];
    expect(facts.timedSections.map(section => section.minutes)).toEqual(values.times);
    expect(facts.totalMaximum).toBe(180);
    expect(facts.overallPassMark).toBe(values.overall);
    expect(facts.taskTypes).toHaveLength(values.taskTypes);
    expect(facts.scoringSections.map(({ id, maximum, passMark }) => [id, maximum, passMark]))
      .toEqual([['knowledgeReading', 120, 38], ['listening', 60, 19]]);
    expect(facts.taskTypes.includes('usage')).toBe(level === 'N4');

    const knowledge = facts.scoringSections.find(section => section.id === 'knowledgeReading');
    const listening = facts.scoringSections.find(section => section.id === 'listening');
    const passing = {
      ...base,
      level,
      knowledgeReading: facts.overallPassMark - listening.passMark,
      listening: listening.passMark
    };
    expect(examEntrySummary(passing).officialPass).toBe(true);
    expect(examEntrySummary({ ...passing, allSectionsAttended: false }).officialPass).toBe(false);
    expect(() => validateExamEntry({
      ...passing,
      knowledgeReading: knowledge.minimum - 1
    })).toThrow();

    const highTotalBelowListening = {
      ...passing,
      knowledgeReading: knowledge.maximum,
      listening: listening.passMark - 1
    };
    expect(examEntrySummary(highTotalBelowListening).total).toBeGreaterThan(facts.overallPassMark);
    expect(examEntrySummary(highTotalBelowListening).officialPass).toBe(false);

    const highTotalBelowKnowledge = {
      ...passing,
      knowledgeReading: knowledge.passMark - 1,
      listening: listening.maximum
    };
    expect(examEntrySummary(highTotalBelowKnowledge).total).toBeGreaterThan(facts.overallPassMark);
    expect(examEntrySummary(highTotalBelowKnowledge).officialPass).toBe(false);
  }
});

it('never converts raw practice accuracy to JLPT scaled score or pass', () => {
  const result = examEntrySummary({
    id: 'raw',
    at: 1,
    level: 'N5',
    kind: 'raw-practice',
    label: 'QA',
    sections: {
      vocabulary: { correct: 8, total: 10 },
      grammarReading: { correct: 7, total: 10 },
      listening: { correct: 2, total: 10 }
    }
  });
  expect(result.weakest).toBe('listening');
  expect(result.scaledScore).toBe(null);
  expect(result.officialPass).toBe(null);
});

it('retains optional exam logs through v1 backup without fabricating learning', () => {
  let state = fresh();
  expect(validate(state)).not.toHaveProperty('examLogs');
  state.examLogs = [base];
  const restored = validate(JSON.parse(JSON.stringify(state)));
  expect(restored.examLogs).toEqual([base]);
  expect(restored.answers).toEqual({});
  expect(restored.completed).toEqual({});
  expect(() => validateExamEntry({ ...base, listening: 61 })).toThrow();
  expect(() => validateExamEntry({ ...base, knowledgeReading: 121 })).toThrow();
});
