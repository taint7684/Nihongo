// Find OpenJLPT N4 lexemes not yet in the course register, for batch 06 selection.
import fs from 'node:fs';
import path from 'node:path';

const root = 'C:\\Users\\LENOVO\\Desktop\\Nihongo-Compass';
const reg = JSON.parse(fs.readFileSync(path.join(root, 'public/lexical-register.json'), 'utf8'));
const used = new Set();
for (const u of reg.uses || []) {
  if (u.legacyKey) used.add(u.legacyKey + '|' + u.reading);
}
const jlpt = JSON.parse(fs.readFileSync(path.join(root, '.sources/openjlpt-20261113/n4-vocab.json'), 'utf8'));
const irodori = JSON.parse(fs.readFileSync(path.join(root, '.sources/irodori-20261112/wordlist_all.json'), 'utf8'))[0].rows;

const unused = jlpt.filter(j => !used.has(j.word + '|' + j.reading));
console.log('OpenJLPT N4 total:', jlpt.length, 'unused:', unused.length);

const withIrodori = unused.filter(j => {
  for (const row of irodori) {
    for (const key of Object.keys(row)) {
      if (!/^C\d+$/.test(key)) continue;
      if (row[key] !== j.word) continue;
      const rn = Number(key.slice(1));
      const r = (row[`D${rn}`] || '').replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
      if (r === j.reading) return true;
    }
  }
  return false;
});
console.log('unused with Irodori exact match:', withIrodori.length);
fs.writeFileSync(path.join(root, 'evaluation/n4-batch06-candidates.json'), JSON.stringify({
  totalUnused: unused.length,
  withIrodori: withIrodori.length,
  samples: unused.slice(0, 120),
  irodoriSamples: withIrodori.slice(0, 120)
}, null, 1));
console.log('wrote evaluation/n4-batch06-candidates.json');