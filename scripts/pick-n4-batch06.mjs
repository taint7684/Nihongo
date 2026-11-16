// Refine N4 batch-06 candidate selection: reject noise, prefer real N4 vocabulary.
import fs from 'node:fs';
import path from 'node:path';

const root = 'C:\\Users\\LENOVO\\Desktop\\Nihongo-Compass';
const jlpt = JSON.parse(fs.readFileSync(path.join(root, '.sources/openjlpt-20261113/n4-vocab.json'), 'utf8'));
const reg = JSON.parse(fs.readFileSync(path.join(root, 'public/lexical-register.json'), 'utf8'));
const used = new Set();
for (const u of reg.uses || []) if (u.legacyKey) used.add(u.legacyKey + '|' + u.reading);
const irodori = JSON.parse(fs.readFileSync(path.join(root, '.sources/irodori-20261112/wordlist_all.json'), 'utf8'))[0].rows;

const hiragana = v => v.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
function hasIrodori(j) {
  for (const row of irodori) {
    for (const key of Object.keys(row)) {
      if (!/^C\d+$/.test(key)) continue;
      if (row[key] !== j.word) continue;
      const rn = Number(key.slice(1));
      if (hiragana(row[`D${rn}`] || '') === j.reading) return true;
    }
  }
  return false;
}

const unused = jlpt.filter(j => !used.has(j.word + '|' + j.reading));
const noise = /^[a-zA-Z0-9\s]+$/;
function score(j) {
  let s = 0;
  if (hasIrodori(j)) s += 200;
  if (/[\u4E00-\u9FFF]/.test(j.word)) s += 60; // kanji
  if (j.word.length >= 3 && !noise.test(j.word)) s += 30;
  if (j.word.length === 2) s += 10;
  if (/^[a-zA-Z]+$/.test(j.word)) s -= 100;
  if (j.word.length === 1) s -= 80;
  if (/^\d+$/.test(j.word)) s -= 100;
  if (j.reading && j.reading.length >= 4) s += 10;
  if (j.meanings && j.meanings.length > 0) s += 5;
  return s;
}

const ranked = unused.filter(j => score(j) > 0).sort((a, b) => score(b) - score(a));
const picked = ranked.slice(0, 80);
console.log('filtered unused:', ranked.length, 'picked:', picked.length);
for (const x of picked) console.log(x.word, '|', x.reading, '|', x.jmdict_id, '|', (x.meanings||[]).slice(0,2).map(m=>m.english||m).join('; '));
fs.writeFileSync(path.join(root, 'evaluation/n4-batch06-picked.json'), JSON.stringify(picked, null, 1));