import fs from 'node:fs';

const planPath = './src/n4-kanji-r1-plan.js';
let src = fs.readFileSync(planPath, 'utf8');

// 2 missing entries (招, 拝) not captured by generator
const extra = [
  {
    char: '招',
    number: 37,
    wordKey: '招待します',
    word: {
      text: '招待します',
      reading: 'しょうたいします',
      meaning: 'mời tham dự',
      type: 'động từ nhóm 2',
      role: 'Từ nền dùng lại cho chữ; lịch ôn chung',
      example: { ja: '友達に招待されました。', reading: 'ともだちにしょうたいされました。', vi: 'Tôi được bạn mời.' },
      sourceReview: { entryId: '', senseIds: [], status: 'Tự soạn; chưa người duyệt độc lập', scope: 'Chữ/kana và nghĩa mục từ; câu ví dụ cần rà riêng', reviewedAt: '2026-11-12', review: 'Authoring assistant source comparison; not independent specialist' },
      typeSource: 'JMdict selected sense POS; labels translated by project, not independent academic review'
    },
    meaning: 'Trong 招待（しょうたい）: mời',
    inWord: '招待（しょうたい）',
    status: 'Học chữ qua từ thật; nguồn âm/nghĩa chữ riêng ở KANJIDIC2; không lấy nghĩa cả từ làm nghĩa chữ'
  },
  {
    char: '拝',
    number: 50,
    wordKey: '拝見します',
    word: {
      text: '拝見します',
      reading: 'はいけんします',
      meaning: 'xem, khiêm nhường',
      type: 'động từ nhóm 2',
      role: 'Từ nền dùng lại cho chữ; lịch ôn chung',
      example: { ja: '資料を拝見します。', reading: 'しりょうをはいけんします。', vi: 'Tôi xin xem tài liệu.' },
      sourceReview: { entryId: '', senseIds: [], status: 'Tự soạn; chưa người duyệt độc lập', scope: 'Chữ/kana và nghĩa mục từ; câu ví dụ cần rà riêng', reviewedAt: '2026-11-12', review: 'Authoring assistant source comparison; not independent specialist' },
      typeSource: 'JMdict selected sense POS; labels translated by project, not independent academic review'
    },
    meaning: 'Trong 拝見（はいけん）: xem khiêm nhường',
    inWord: '拝見（はいけん）',
    status: 'Học chữ qua từ thật; nguồn âm/nghĩa chữ riêng ở KANJIDIC2; không lấy nghĩa cả từ làm nghĩa chữ'
  }
];

const gen = JSON.parse(fs.readFileSync('./scripts/missing-kanji-entries.json', 'utf8'));
const all40 = [...gen, ...extra];

function esc(s){return String(s).replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$\{/g,'\\${').replace(/\n/g,'\\n').replace(/\r/g,'\\r');}

// depth-based indentation (always a string)
function val(v,depth){
  const ind='  '.repeat(depth);
  const ind1='  '.repeat(depth+1);
  if(v===null)return 'null';
  if(typeof v==='boolean'||typeof v==='number')return String(v);
  if(typeof v==='string')return "'"+esc(v)+"'";
  if(Array.isArray(v)){
    if(v.length===0)return '[]';
    const inner=v.map(x=>val(x,depth+1)).join(',\n'+ind1);
    return '[\n'+ind1+inner+'\n'+ind+']';
  }
  if(typeof v==='object'){
    const keys=Object.keys(v);
    if(keys.length===0)return '{}';
    const inner=keys.map(k=>ind1+JSON.stringify(k)+': '+val(v[k],depth+1)).join(',\n');
    return '{\n'+inner+'\n'+ind+'}';
  }
  return String(v);
}

const entriesJS = all40.map(e=>val(e,0)).join(',\n');

const arrayEndMarker = '}];\r\n\r\nexport function applyN4KanjiPlan';
const idx = src.indexOf(arrayEndMarker);
if(idx === -1){
  console.error('Could not find array end marker');
  process.exit(1);
}

const prefix = src.slice(0, idx + 1); // include the last entry's closing }
const suffix = src.slice(idx + 1);   // starts with ];\r\n\r\nexport function...

const newSrc = prefix + ',\n' + entriesJS + suffix;

fs.writeFileSync(planPath, newSrc);
console.log('Appended', all40.length, 'entries to n4-kanji-r1-plan.js');
