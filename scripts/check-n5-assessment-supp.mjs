import { lessons } from '../src/content.js';
import { n5AssessmentSupplement } from '../src/n5-assessment-supplement.js';
import { n5AssessmentSupplement2 } from '../src/n5-assessment-supplement-2.js';

const byLesson = new Map();
for (const l of lessons) {
  if (!l.referenceLesson) continue;
  byLesson.set(l.id, new Set((l.words || []).map((w) => w.text)));
}

const errors = [];
let checked = 0;
const covered = new Map();
for (const l of [...n5AssessmentSupplement, ...n5AssessmentSupplement2]) {
  const ref = l.assessmentFor;
  if (!byLesson.has(ref)) {
    errors.push(`Unknown assessmentFor ${ref}`);
    continue;
  }
  const refWords = byLesson.get(ref);
  const qs = [...(l.questions || []), ...(l.listeningTasks || []).flatMap((t) => t.questions || [])];
  for (const q of qs) {
    for (const link of q.wordLinks || []) {
      checked += 1;
      if (!refWords.has(link.wordKey)) {
        errors.push(`${q.id}: ${link.wordKey} not in ${ref}`);
        continue;
      }
      if (link.usageId !== `${ref}:${link.wordKey}`) {
        errors.push(`${q.id}: bad usageId ${link.usageId}`);
        continue;
      }
      const key = `${ref}|${link.wordKey}`;
      covered.set(key, (covered.get(key) || 0) + 1);
    }
    if (!q.choices || q.answer < 0 || q.answer >= q.choices.length) {
      errors.push(`${q.id}: bad answer schema`);
    }
  }
}

const duplicateWords = [];
for (const [key, count] of covered) if (count > 4) duplicateWords.push([key, count]);

console.log(JSON.stringify({
  lessons: n5AssessmentSupplement.length + n5AssessmentSupplement2.length,
  questions: [...n5AssessmentSupplement, ...n5AssessmentSupplement2].reduce(
    (n, l) => n + (l.questions || []).length + (l.listeningTasks || []).length,
    0,
  ),
  links: checked,
  distinctWords: covered.size,
  errors,
  duplicateWords,
}, null, 2));
if (errors.length) process.exitCode = 1;