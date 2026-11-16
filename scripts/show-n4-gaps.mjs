// Show OpenJLPT N4 candidates not yet in course, with Irodori crosswalk info.
import fs from 'node:fs';
import path from 'node:path';

const root = 'C:\\Users\\LENOVO\\Desktop\\Nihongo-Compass';
const c = JSON.parse(fs.readFileSync(path.join(root, 'evaluation/n4-batch06-candidates.json'), 'utf8'));
console.log('Total unused:', c.totalUnused, 'Irodori-matched:', c.withIrodori);
console.log('\n--- Irodori-matched samples ---');
for (const x of c.iriSamples) console.log(x.word, x.reading, x.jmdict_id);
console.log('\n--- Non-Irodori samples ---');
for (const x of c.samples.slice(0, 80)) console.log(x.word, x.reading, x.jmdict_id);