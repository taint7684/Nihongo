import {lessons} from '../src/content.js';
import {n4AssessmentLinks} from '../src/assessment-links.js';

// Collect all valid N4 assessment question IDs
const validIds = new Set();
for (const l of lessons) {
  if (l.level === 'N4' && l.track === 'assessment') {
    for (const q of l.questions || []) validIds.add(q.id);
    for (const t of l.listeningTasks || []) {
      for (const q of t.questions || []) validIds.add(q.id);
    }
  }
}

// Check each N4 grammar group has a link and the link is valid
const n4Lessons = lessons.filter(l => l.referenceLesson && l.referenceLesson >= 26 && l.referenceLesson <= 50);
let missing = 0;
let invalid = 0;
for (const l of n4Lessons) {
  for (const [i, g] of (l.grammar || []).entries()) {
    const key = l.id + '-g' + i;
    const link = n4AssessmentLinks[key];
    if (!link) {
      missing++;
      console.log('MISSING link:', key);
    } else {
      for (const id of link) {
        if (!validIds.has(id)) {
          invalid++;
          console.log('INVALID link:', key, '->', id);
        }
      }
    }
  }
}
console.log('Total N4 grammar groups:', n4Lessons.reduce((s,l)=>s+(l.grammar||[]).length,0));
console.log('Missing links:', missing);
console.log('Invalid links:', invalid);

// Also check all links are unique (no duplicate assessment IDs used for different grammar)
const allLinkIds = [];
for (const [key, ids] of Object.entries(n4AssessmentLinks)) {
  if (key.startsWith('mnn-') && key.endsWith(('-g0','-g1','-g2','-g3'))) {
    for (const id of ids) allLinkIds.push({key, id});
  }
}
const dupIds = allLinkIds.filter((item, idx, arr) => arr.findIndex(x => x.id === item.id) !== idx);
if (dupIds.length) {
  console.log('DUPLICATE assessment IDs:', dupIds.map(d=>d.id+' ('+d.key+')'));
} else {
  console.log('No duplicate assessment IDs.');
}
