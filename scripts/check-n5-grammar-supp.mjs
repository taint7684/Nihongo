import { lessons } from '../src/content.js';

const grammarIds = new Set(
  lessons.filter((l) => l.referenceLesson).flatMap((l) => (l.grammar || []).map((_, i) => `${l.id}-g${i}`)),
);
const errors = [];
let linked = 0;
for (const l of lessons.filter((l) => l.id.startsWith('n5-grammar-assessment-supp-'))) {
  for (const q of l.questions || []) {
    if (!q.grammarIds?.length) errors.push(`${q.id}: no grammarIds`);
    for (const id of q.grammarIds || []) {
      linked += 1;
      if (!grammarIds.has(id)) errors.push(`${q.id}: unknown grammar ${id}`);
    }
    if (!q.choices || q.answer < 0 || q.answer >= q.choices.length) errors.push(`${q.id}: bad answer`);
  }
}
console.log(JSON.stringify({ linked, errors }, null, 2));
if (errors.length) process.exitCode = 1;