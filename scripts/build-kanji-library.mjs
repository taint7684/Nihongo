import fs from 'node:fs';
import crypto from 'node:crypto';
import { lessons } from '../src/content.js';

const sourceRoot = '.sources/library-r1';
const all = JSON.parse(fs.readFileSync('.sources/kanjidic-parsed.json', 'utf8'));
const byChar = new Map(all.map(item => [item.char, item]));
const official = JSON.parse(fs.readFileSync(`${sourceRoot}/official-joyo.json`, 'utf8'));
const joyoAliases = new Map([[String.fromCodePoint(0x53f1), String.fromCodePoint(0x20b9f)]]);
const joyo = official.map(row => ({
  ...row,
  indexCharacter: row.char,
  char: joyoAliases.get(row.char) || row.char
}));
const joyoSet = new Set(joyo.map(item => item.char));

if (joyoSet.size !== 2136) throw Error(`Expected 2,136 Jōyō identities, got ${joyoSet.size}`);
for (const item of joyo) {
  if (!byChar.has(item.char)) throw Error(`KANJIDIC2 record not found for Jōyō character ${item.char}`);
}

const nameOnly = all
  .filter(item => [9, 10].includes(item.grade) && !joyoSet.has(item.char) && !joyoAliases.has(item.char))
  .sort((a, b) => a.char.codePointAt(0) - b.char.codePointAt(0));
if (nameOnly.length !== 863) {
  throw Error(`Expected 863 non-Jōyō grade 9/10 characters, got ${nameOnly.length}`);
}

const taught = new Map();
for (const lesson of lessons) {
  for (const item of lesson.kanji || []) {
    if (!taught.has(item.char)) taught.set(item.char, []);
    taught.get(item.char).push(lesson.id);
  }
}

const selected = [
  ...joyo.map(item => ({
    ...byChar.get(item.char),
    category: 'joyo',
    official: item,
    ...(item.indexCharacter !== item.char ? { aliases: [item.indexCharacter] } : {})
  })),
  ...nameOnly.map(item => ({
    ...item,
    category: 'name-source',
    categoryNote: 'KANJIDIC2 grade 9/10 metadata; not legal advice about name registration.'
  }))
];

const dictionaryRoot = 'public/dictionaries/kanji';
fs.mkdirSync(dictionaryRoot, { recursive: true });
const lookupFiles = new Set(
  fs.readdirSync(dictionaryRoot).filter(file => /^[0-9a-f]{5}\.json$/i.test(file))
);
for (const item of selected) {
  const hex = item.char.codePointAt(0).toString(16).padStart(5, '0');
  const file = `${dictionaryRoot}/${hex}.json`;
  if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify(byChar.get(item.char)));
  lookupFiles.add(`${hex}.json`);
}

const refs = lessons.filter(lesson => lesson.referenceLesson);
const library = selected.map(item => {
  const contexts = refs.flatMap(lesson =>
    (lesson.kanji || [])
      .filter(kanji => kanji.char === item.char)
      .map(kanji => {
        const word = lesson.words.find(value => value.text === (kanji.wordKey || '')) ||
          lesson.words.find(value => value.text.includes(item.char));
        return {
          lessonId: lesson.id,
          wordKey: word?.text || null,
          meaning: word?.meaning || null,
          example: word?.example || null,
          assessmentId: kanji.assessmentId || null
        };
      })
  );
  const lessonsForChar = taught.get(item.char) || [];
  return {
    ...item,
    contexts,
    layers: {
      lookup: true,
      strokes: fs.existsSync(`public/kanji/${item.char.codePointAt(0).toString(16).padStart(5, '0')}.json`),
      learning: contexts.some(context => context.example?.ja),
      practiceReview: contexts.some(context => context.wordKey),
      assessment: contexts.some(context => context.assessmentId)
    },
    taught: lessonsForChar.length > 0,
    lessonIds: lessonsForChar
  };
});

const unicodeRows = new Map(
  fs.readFileSync(`${sourceRoot}/UnicodeData.txt`, 'utf8')
    .split(/\r?\n/)
    .filter(Boolean)
    .map(line => {
      const fields = line.split(';');
      return [Number.parseInt(fields[0], 16), fields];
    })
);
const mappings = fs.readFileSync(`${sourceRoot}/CJKRadicals.txt`, 'utf8')
  .split(/\r?\n/)
  .filter(line => /^\d/.test(line))
  .map(line => {
    const [number, glyphHex, ideographHex] = line.split(';').map(value => value.trim());
    return {
      number: Number(number.replace(/'/g, '')),
      variant: number.includes("'"),
      glyph: glyphHex ? String.fromCodePoint(Number.parseInt(glyphHex, 16)) : null,
      ideograph: ideographHex ? String.fromCodePoint(Number.parseInt(ideographHex, 16)) : null
    };
  });
const radicalFallbacks = new Map([[63, String.fromCodePoint(0x6238)], [174, String.fromCodePoint(0x9752)]]);
const radicals = mappings.filter(item => !item.variant).map(item => {
  const base = byChar.get(item.ideograph) || byChar.get(radicalFallbacks.get(item.number));
  const unicodeName = unicodeRows.get(item.glyph?.codePointAt(0))?.[1];
  if (!unicodeName || !base?.strokeCounts?.length) {
    throw Error(`Missing Unicode/KANJIDIC2 source for radical ${item.number}`);
  }
  const examples = library
    .filter(character => character.radical === item.number && character.category === 'joyo')
    .sort((a, b) => (a.grade ?? 99) - (b.grade ?? 99) || a.char.localeCompare(b.char))
    .slice(0, 12)
    .map(character => character.char);
  return {
    number: item.number,
    glyph: item.glyph,
    ideograph: item.ideograph,
    ...(item.ideograph !== base.char ? { dictionaryEquivalent: base.char } : {}),
    nameEnglish: unicodeName.replace('KANGXI RADICAL ', ''),
    meanings: base.meanings,
    hanViet: base.hanViet,
    strokes: base.strokeCounts[0],
    variants: mappings
      .filter(variant => variant.variant && variant.number === item.number)
      .map(variant => ({ glyph: variant.glyph, ideograph: variant.ideograph })),
    examples,
    relatedExamples: library.filter(k=>k.radical===item.number&&k.category!=='joyo').slice(0,8).map(k=>k.char),
    sourceOnlyExamples: examples.length||library.some(k=>k.radical===item.number)?[]:all.filter(k=>k.radical===item.number).slice(0,3).map(k=>({char:k.char,meanings:k.meanings})),
    source: 'Unicode CJKRadicals/UnicodeData for number, glyph and name; KANJIDIC2 for mapped ideograph readings, meanings and strokes.',
    status: 'Source-derived lookup data; no independent academic review.'
  };
});

if (radicals.length !== 214 || new Set(radicals.map(item => item.number)).size !== 214) {
  throw Error(`Expected 214 distinct Kangxi radicals, got ${radicals.length}`);
}

fs.mkdirSync('public/library/licenses', { recursive: true });
fs.copyFileSync(`${sourceRoot}/unicode-license.txt`, 'public/library/licenses/unicode.txt');
const joyoSourceManifest = JSON.parse(fs.readFileSync(`${sourceRoot}/manifest.json`, 'utf8'));
const manifest = {
  version: 'library-r1-2026-11-12',
  at: new Date().toISOString(),
  kanji: library.length,
  joyo: joyo.length,
  nameOnly: nameOnly.length,
  radicals: radicals.length,
  selection: 'All 2,136 Jōyō identities plus all 863 distinct KANJIDIC2 grade 9/10 characters outside Jōyō; no claim that this is required N4 content.',
  glyphDisagreement: {
    index: String.fromCodePoint(0x53f1),
    dictionary: String.fromCodePoint(0x20b9f),
    decision: 'Treat the official Jōyō index form and KANJIDIC2 dictionary glyph as one Jōyō identity; retain the index form as an alias.',
    reference: 'https://www.bunka.go.jp/seisaku/bunkashingikai/kokugo/kokugo/kokugo_59/pdf/shiryo_2.pdf'
  },
  joyoSourceManifest,
  sources: [
    'Agency for Cultural Affairs, official Jōyō index and tables.',
    'KANJIDIC2 by James William Breen / EDRDG, CC BY-SA 4.0.',
    'Unicode 18.0.0 CJKRadicals and UnicodeData, Unicode License V3.',
    'KanjiVG stroke files where present, CC BY-SA 3.0.'
  ],
  sourceHashes: {
    joyo: crypto.createHash('sha256').update(fs.readFileSync(`${sourceRoot}/official-joyo.json`)).digest('hex'),
    cjkRadicals: crypto.createHash('sha256').update(fs.readFileSync(`${sourceRoot}/CJKRadicals.txt`)).digest('hex'),
    unicodeData: crypto.createHash('sha256').update(fs.readFileSync(`${sourceRoot}/UnicodeData.txt`)).digest('hex')
  },
  licenses: [
    'KANJIDIC2: CC BY-SA 4.0 / James William Breen, EDRDG',
    'Unicode: Unicode License V3 / Unicode, Inc.',
    'KanjiVG strokes: CC BY-SA 3.0 / Ulrich Apel and contributors'
  ],
  limits: [
    'Lookup is not a taught course; counts for learning, strokes, review and assessment are reported independently.',
    'KANJIDIC2 grade 9/10 metadata is not legal advice about permitted personal names.',
    'KANJIDIC2 English meanings for mapped ideographs do not explain radical etymology.',
    'Unicode radical supplement variants are not an exhaustive list of positional component shapes.',
    'Independent phonetic and academic review was not performed.'
  ]
};

fs.writeFileSync('public/library/kanji.json', JSON.stringify({ manifest, items: library }));
fs.writeFileSync('public/library/radicals.json', JSON.stringify({ manifest, items: radicals }));
const dictionaryManifestPath = 'public/dictionaries/source-manifest.json';
if (fs.existsSync(dictionaryManifestPath)) {
  const dictionaryManifest = JSON.parse(fs.readFileSync(dictionaryManifestPath, 'utf8'));
  dictionaryManifest.dictionaryCharacters = all.length;
  dictionaryManifest.lookupCharacters = lookupFiles.size;
  dictionaryManifest.taughtCharacters = taught.size;
  dictionaryManifest.library = {
    path: '/library/kanji.json',
    total: library.length,
    joyo: joyo.length,
    nameOnly: nameOnly.length,
    radicalsPath: '/library/radicals.json',
    radicals: radicals.length
  };
  fs.writeFileSync(dictionaryManifestPath, JSON.stringify(dictionaryManifest, null, 2));
}
fs.writeFileSync(
  'evaluation/library-acceptance.json',
  JSON.stringify({
    manifest,
    layers: Object.fromEntries(
      ['lookup', 'strokes', 'learning', 'practiceReview', 'assessment']
        .map(layer => [layer, library.filter(item => item.layers[layer]).length])
    ),
    joyoOnlyGradeDifference: joyo.filter(item => item.indexCharacter !== item.char)
  }, null, 2)
);
console.log(JSON.stringify({
  kanji: library.length,
  joyo: joyo.length,
  nameOnly: nameOnly.length,
  radicals: radicals.length
}));
