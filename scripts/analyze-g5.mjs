import {lessons} from '../src/content.js';
import fs from 'node:fs';

const missingWords = [
  '足','遅れます','授業','理由','頭'
];

const n4Lessons = lessons.filter(l => l.referenceLesson && l.referenceLesson >= 26 && l.referenceLesson <= 50);

// Collect existing assessment IDs to avoid duplicates
const existingIds = new Set();
for (const l of n4Lessons) {
  for (const q of l.questions || []) existingIds.add(q.id);
  for (const t of l.listeningTasks || []) {
    for (const q of t.questions || []) existingIds.add(q.id);
  }
}

console.log('Existing assessment IDs:', existingIds.size);

// For each N4 lesson, find words WITHOUT separate assessment by checking done-gates.json
const dg = JSON.parse(fs.readFileSync('evaluation/done-gates.json','utf8'));
const n4Words = dg.levels.N4.items.words;
const wordsMissingAssessment = n4Words.filter(w => !w.hasSeparateAssessment);
console.log('N4 words missing separate assessment:', wordsMissingAssessment.length);
