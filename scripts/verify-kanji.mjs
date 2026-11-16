import {n4KanjiPlan} from '../src/n4-kanji-r1-plan.js';
const chars = [...new Set(n4KanjiPlan.map(p => p.char))];
console.log('Total entries:', n4KanjiPlan.length);
console.log('Unique chars:', chars.length);

const missing = ['理','由','声','聞','歌','閉','開','予','定','計','画','風','意','味','歯','条','件','標','記','招','待','育','事','故','調','測','礼','目','的','雲','量','場','合','届','報','許','可','様','申','拝'];
const present = missing.filter(c => chars.includes(c));
const absent = missing.filter(c => !chars.includes(c));
console.log('Present:', present.length);
console.log('Absent:', absent.length);
if (absent.length) console.log('Missing:', absent.join(','));

// Check complete examples
let incomplete = 0;
for (const p of n4KanjiPlan) {
  const ex = p.word?.example;
  if (!ex || !ex.ja || !ex.reading || !ex.vi) {
    incomplete++;
    console.log('INCOMPLETE example for:', p.char, p.wordKey);
  }
}
console.log('Incomplete examples:', incomplete);
