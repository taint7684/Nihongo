import { it, expect } from 'vitest';
import { writeReferenceInventory } from '../scripts/reference-inventory.mjs';
import { referenceGapDecisions } from './reference-gap-decisions.js';

it('reports N4 grammar and glossary targets separately from missing lexical contexts', () => {
  const inventory = writeReferenceInventory();
  const n4 = inventory.levels.N4;

  expect(n4.vocabulary).toHaveLength(240);
  expect(n4.summary.plannedLexicalTargets).toBe(222);
  expect(n4.summary.missingLexicalContexts).toBe(0);
  expect(n4.summary.missingWords).toBe(0);
  expect(n4.summary.uncontextualizedGrammarTargets).toBe(15);
  expect(n4.summary.uncontextualizedGlossaryTargets).toBe(3);
  expect(n4.vocabulary.filter(item => item.unitKind === 'grammar-use').map(item => item.text))
    .toEqual(referenceGapDecisions.grammar);
  expect(n4.vocabulary.filter(item => item.unitKind === 'metalinguistic-glossary').map(item => item.text))
    .toEqual(referenceGapDecisions.glossary);
});
