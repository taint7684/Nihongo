import {lessons} from '../src/content.js';
import fs from 'node:fs';

const missingChars = ['理','由','声','聞','歌','閉','開','予','定','計','画','風','意','味','歯','条','件','標','記','招','待','育','事','故','調','測','礼','目','的','雲','量','場','合','届','報','許','可','様','申','拝'];

const missingKanji = [];
for (const c of missingChars) {
  let found = null;
  let refLesson = null;
  for (const l of lessons) {
    if (l.referenceLesson && l.referenceLesson >= 26 && l.referenceLesson <= 50) {
      for (const k of l.kanji || []) {
        if (k.char === c) { found = k; refLesson = l.referenceLesson; break; }
      }
      if (found) break;
    }
  }
  if (!found) { console.log('NOT FOUND in course kanji:', c); continue; }

  let word = null;
  for (const l of lessons) {
    if (l.referenceLesson && l.referenceLesson >= 26 && l.referenceLesson <= 50) {
      for (const w of l.words || []) {
        const base = found.wordKey ? found.wordKey.replace(/\s*[（(].*$/,'') : '';
        if (w.text === found.wordKey || w.text === base || (w.text.includes(c) && w.text.length <= 4)) {
          if (w.example && w.example.ja && w.example.reading && w.example.vi) {
            word = w; break;
          }
        }
      }
      if (word) break;
    }
  }
  if (!word) { console.log('NO COMPLETE WORD for:', c, 'wordKey:', found.wordKey); continue; }

  missingKanji.push({
    char: c,
    number: refLesson,
    wordKey: found.wordKey || word.text,
    word: {
      text: word.text,
      reading: word.reading,
      meaning: word.meaning,
      type: word.type || 'danh từ',
      role: 'Từ nền dùng lại cho chữ; lịch ôn chung',
      example: word.example,
      sourceReview: { entryId:'',senseIds:[],status:'Tự soạn; chưa người duyệt độc lập','scope':'Chữ/kana và nghĩa mục từ; câu ví dụ cần rà riêng','reviewedAt':'2026-11-12','review':'Authoring assistant source comparison; not independent specialist' },
      typeSource:'JMdict selected sense POS; labels translated by project, not independent academic review'
    },
    meaning: 'Trong ' + found.inWord + ': ' + found.meaning,
    inWord: found.inWord,
    status: 'Học chữ qua từ thật; nguồn âm/nghĩa chữ riêng ở KANJIDIC2; không lấy nghĩa cả từ làm nghĩa chữ'
  });
}

fs.writeFileSync('./scripts/missing-kanji-entries.json', JSON.stringify(missingKanji,null,2));
console.log('Generated', missingKanji.length, 'entries');
