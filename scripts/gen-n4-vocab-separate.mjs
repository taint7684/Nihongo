import {lessons} from '../src/content.js';
import fs from 'node:fs';

const n4Lessons = lessons.filter(l => l.referenceLesson && l.referenceLesson >= 26 && l.referenceLesson <= 50);

// Collect all N4 words from lessons (deduplicated by text)
const allWords = [];
const seen = new Set();
for (const l of n4Lessons) {
  for (const w of l.words || []) {
    if (!seen.has(w.text)) {
      seen.add(w.text);
      allWords.push({ ...w, lessonId: l.id });
    }
  }
}
console.log('Total unique N4 words:', allWords.length);

// Collect existing assessment IDs
const existingIds = new Set();
for (const l of lessons) {
  for (const q of l.questions || []) existingIds.add(q.id);
  for (const t of l.listeningTasks || []) {
    for (const q of t.questions || []) existingIds.add(q.id);
  }
}

function makeJaSentence(word, text) {
  const t = text || word.text;
  const wordType = word.type || '';
  if (wordType.includes('động từ') || word.text.includes('ます')) {
    return t + 'しましょう。';
  } else if (wordType.includes('tính từ') || word.text.includes('い')) {
    return t + 'です。';
  } else {
    return 'わたしは' + t + 'をべんりにします。';
  }
}

const questions = [];
let used = 0;
for (const w of allWords) {
  const id = 'n4-vocab-sep-' + w.lessonId + '-' + used;
  if (existingIds.has(id)) continue;

  const ja = makeJaSentence(w, w.text);
  const reading = w.reading;

  questions.push({
    id,
    kind: 'recall',
    prompt: 'Đọc câu tiếng Nhật sau và chọn cách đọc đúng của từ được gạch chân.',
    ja: ja,
    accepted: [reading],
    choices: [reading, 'Chưa khớp'],
    answer: 0,
    explanation: w.text + ' đọc là ' + reading + '. Câu: ' + ja,
    skill: w.text,
    assessment: true,
    wordKey: w.text,
    usageId: w.lessonId + ':' + w.text
  });
  used++;
}

console.log('Generated questions:', used);

const content = 'export const n4VocabSeparateAssessment=' + JSON.stringify(questions, null, 2) + ';\n';
fs.writeFileSync('src/n4-vocab-separate-assessment.js', content);
console.log('Written to src/n4-vocab-separate-assessment.js');
