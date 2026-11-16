import fs from 'node:fs';

const d = JSON.parse(fs.readFileSync('./public/dictionaries/word-evidence.json', 'utf8'));

// Read rows from batch file text directly
const fileText = fs.readFileSync('./src/n4-vocabulary-batch-08.js', 'utf8');
const rowsStart = fileText.indexOf('const rows=[');
const rowsEnd = fileText.indexOf('];', rowsStart) + 2;
const rowsSource = fileText.slice(rowsStart, rowsEnd);

// Extract each array element line by line
const lines = rowsSource.split('\n');
const rows = [];
for (const line of lines) {
  const trimmed = line.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(',')) {
    const arrStr = trimmed.slice(0, -1);
    try {
      const arr = eval('(' + arrStr + ')');
      if (Array.isArray(arr)) rows.push(arr);
    } catch (e) {
      console.log('Failed to parse line:', trimmed.slice(0, 80), e.message);
    }
  } else if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const arr = eval('(' + trimmed + ')');
      if (Array.isArray(arr)) rows.push(arr);
    } catch (e) {
      console.log('Failed to parse line:', trimmed.slice(0, 80), e.message);
    }
  }
}

console.log('Rows extracted:', rows.length);

const existingUseKeys = new Set(d.uses.map(u => u.lessonId + '|' + u.surface + '|' + u.reading));
let added = 0;

for (const row of rows) {
  const [lessonNumber, text, reading, meaning, ja, kana, vi, entryId, senseIndex, group] = row;
  const lessonId = 'mnn-' + String(lessonNumber).padStart(2, '0');
  const key = lessonId + '|' + text + '|' + reading;
  if (existingUseKeys.has(key)) {
    continue;
  }
  const entry = d.entries.find(e => e.id === entryId);
  if (!entry) {
    console.log('Entry not found:', entryId, text);
    continue;
  }
  const readingObj = entry.readings.find(r => r.text === reading) || entry.readings[0];
  const candidates = [{
    id: entryId,
    lemma: readingObj.text,
    reading: [readingObj.text],
    method: 'exact'
  }];
  d.uses.push({
    lessonId,
    surface: text,
    reading,
    vietnamese: vi,
    matchStatus: 'one candidate; sense review required',
    candidates,
    meaningStatus: 'Project-authored contextual Vietnamese meaning; selected JMdict sense; not independently reviewed'
  });
  existingUseKeys.add(key);
  added++;
}

fs.writeFileSync('./public/dictionaries/word-evidence.json', JSON.stringify(d));
console.log('Added', added, 'new uses to word-evidence.json');
console.log('Total uses now:', d.uses.length);
