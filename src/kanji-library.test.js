import { it, expect } from 'vitest';
import fs from 'node:fs';

const library = JSON.parse(fs.readFileSync('public/library/kanji.json', 'utf8'));
const radicals = JSON.parse(fs.readFileSync('public/library/radicals.json', 'utf8'));

it('keeps reference Kanji lookup coverage separate from taught-course layers', () => {
  expect(library.manifest.kanji).toBeGreaterThanOrEqual(2500);
  expect(library.manifest.joyo).toBe(2136);
  expect(library.manifest.nameOnly).toBeGreaterThan(0);
  expect(library.items).toHaveLength(library.manifest.kanji);
  expect(new Set(library.items.map(item => item.char)).size).toBe(library.items.length);

  for (const item of library.items) {
    expect(item.layers.lookup).toBe(true);
    expect(typeof item.taught).toBe('boolean');
    expect(item.layers.learning).toBe(item.contexts.some(context => context.example?.ja));
    if (!item.taught) expect(item.layers.learning).toBe(false);
  }
  expect(library.items.some(item => item.taught)).toBe(true);
  expect(library.items.some(item => !item.taught)).toBe(true);
  expect(fs.existsSync('public/library/licenses/unicode.txt')).toBe(true);
});

it('publishes the 214 Kangxi radical numbers with sourced mappings and linked examples', () => {
  expect(radicals.manifest.radicals).toBe(214);
  expect(radicals.items).toHaveLength(214);
  expect(new Set(radicals.items.map(item => item.number).sort((a, b) => a - b).map(String)))
    .toEqual(new Set(Array.from({ length: 214 }, (_, index) => String(index + 1))));

  for (const item of radicals.items) {
    expect(item.glyph).toBeTruthy();
    expect(item.ideograph).toBeTruthy();
    expect(item.nameEnglish).toBeTruthy();
    expect(item.meanings.length).toBeGreaterThan(0);
    expect(item.strokes).toBeGreaterThan(0);
    for (const char of item.examples) {
      const record = library.items.find(candidate => candidate.char === char);
      expect(record?.category).toBe('joyo');
      expect(record?.radical).toBe(item.number);
    }
  }
});
