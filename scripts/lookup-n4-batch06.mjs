// Look up JMdict senses and Irodori coordinates for batch-06 candidates.
import fs from 'node:fs';
import path from 'node:path';

const root = 'C:\\Users\\LENOVO\\Desktop\\Nihongo-Compass';
const picked = JSON.parse(fs.readFileSync(path.join(root, 'evaluation/n4-batch06-picked.json'), 'utf8'));
const jmdict = JSON.parse(fs.readFileSync(path.join(root, '.sources/edrdg-20261109/jmdict-eng.json'), 'utf8'));
const irodori = JSON.parse(fs.readFileSync(path.join(root, '.sources/irodori-20261112/wordlist_all.json'), 'utf8'))[0].rows;

const hiragana = v => v.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
const entryMap = new Map(jmdict.words.map(w => [String(w.id), w]));

function findIrodori(word, reading) {
  for (const row of irodori) {
    for (const key of Object.keys(row)) {
      if (!/^C\d+$/.test(key)) continue;
      if (row[key] !== word) continue;
      const rn = Number(key.slice(1));
      const r = hiragana(row[`D${rn}`] || '');
      if (r === reading) {
        return { book: row.B || '', lesson: row[`L${rn}`] || '', activity: row[`A${rn}`] || '', ref: row[`R${rn}`] || '' };
      }
    }
  }
  return null;
}

const out = [];
for (const j of picked) {
  const entry = entryMap.get(String(j.jmdict_id));
  if (!entry) { console.log('NO ENTRY', j.word, j.jmdict_id); continue; }
  const senses = entry.sense || [];
  const sense = senses[0];
  const gloss = (sense && sense.gloss && sense.gloss[0]) ? sense.gloss[0].text : '';
  const ir = findIrodori(j.word, j.reading);
  out.push({
    word: j.word, reading: j.reading, entryId: j.jmdict_id,
    senseIds: senses.map((s, i) => `${j.jmdict_id}-s${i}`).slice(0, 1),
    gloss,
    irodori: ir,
    meanings: (j.meanings||[]).slice(0,3)
  });
}
console.log('resolved', out.length);
fs.writeFileSync(path.join(root, 'evaluation/n4-batch06-lookup.json'), JSON.stringify(out, null, 1));
for (const x of out) console.log(x.word, x.reading, x.entryId, '|', x.gloss, '|', JSON.stringify(x.iri));