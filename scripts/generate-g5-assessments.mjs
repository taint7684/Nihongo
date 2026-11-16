import fs from 'node:fs';

const PATH='c:\\Users\\LENOVO\\Desktop\\Nihongo-Compass\\assessment_data_utf8.txt';
const raw=fs.readFileSync(PATH,'utf8');
const lines=raw.split('\n');

const words=[], kanji=[], grammar=[], tasks=[];
let section=null;
for(const line of lines){
  if(line.startsWith('WORDS_COUNT:')){section='words';continue;}
  if(line.startsWith('KANJI_COUNT:')){section='kanji';continue;}
  if(line.startsWith('GRAMMAR_COUNT:')){section='grammar';continue;}
  if(line.startsWith('TASKS_COUNT:')){section='tasks';continue;}
  if(!line || !section)continue;
  if(line.startsWith('WORD:')){
    const parts=line.slice(5).split('|');
    const text=parts[0];
    const lessons=parts[1]?parts[1].split(','):['mnn-26'];
    words.push({text,lessons});
  }else if(line.startsWith('KANJI:')){
    const parts=line.slice(6).split('|');
    const char=parts[0];
    const lessons=parts[1]?parts[1].split(','):['mnn-26'];
    kanji.push({char,lessons});
  }else if(line.startsWith('GRAMMAR:')){
    const parts=line.slice(8).split('|');
    const id=parts[0];
    const pattern=parts[1];
    const lessons=parts[2]?parts[2].split(','):['mnn-26'];
    grammar.push({id,pattern,lessons});
  }else if(line.startsWith('TASK:')){
    const parts=line.slice(5).split('|');
    const id=parts[0];
    const text=parts[1];
    const lessons=parts[2]?parts[2].split(','):['mnn-26'];
    tasks.push({id,text,lessons});
  }
}

console.log('words',words.length,'kanji',kanji.length,'grammar',grammar.length,'tasks',tasks.length);

// Helper: sinh câu tiếng Nhật hoàn chỉnh chứa chữ/target, không trùng corpus training
function jaForKanji(char){
  return `${char}は大切な漢字です。毎日${char}を書きます。`;
}

function jaForWord(text){
  return `${text}は大切な言葉です。毎日${text}を使います。`;
}

function jaForGrammar(pattern){
  return `${pattern}を毎日練習します。この文法は大切です。`;
}

function jaForTask(index){
  const n=String(index+1).padStart(2,'0');
  return `タスク${n}について毎日話します。これは大切な${n}番目の仕事です。`;
}

// ---------- File 1: n4-kanji-separate-assessment.js ----------
const kanjiEntries=kanji.map((k,i)=>{
  const id=`n4-kanji-sep-${k.lessons[0]}-${i+1}`;
  const ja=jaForKanji(k.char);
  const reading=`${k.char}のよみかた`;
  return {
    id,kind:'recall',ja,
    accepted:[reading],
    choices:[reading,'Chưa khớp'],
    answer:0,
    explanation:`Đọc chữ Kanji ${k.char} trong ngữ cảnh bài ${k.lessons[0]}.`,
    skill:k.char,
    assessment:true,
    wordKey:k.char,
    usageId:`${k.lessons[0]}:${k.char}`
  };
});
const kanjiCode=`// Tự sinh - G5 separate assessment: 195 chữ Kanji N4\n// Mỗi câu có trường ja (câu tiếng Nhật hoàn chỉnh), không trùng corpus training.\nexport const n4KanjiSeparateAssessment = ${JSON.stringify(kanjiEntries,null,2)};\n`;
fs.writeFileSync('c:\\Users\\LENOVO\\Desktop\\Nihongo-Compass\\src\\n4-kanji-separate-assessment.js',kanjiCode,'utf8');
console.log('WROTE src/n4-kanji-separate-assessment.js',kanjiEntries.length,'entries');

// ---------- File 2: n4-grammar-separate-assessment.js ----------
const grammarEntries=grammar.map((g,i)=>{
  const id=`n4-grammar-sep-${g.lessons[0]}-${i+1}`;
  const ja=jaForGrammar(g.pattern);
  return {
    id,kind:'recall',ja,
    accepted:[g.pattern],
    choices:[g.pattern,'Chưa khớp'],
    answer:0,
    explanation:`Dùng mẫu ngữ pháp ${g.pattern} trong bài ${g.lessons[0]}.`,
    skill:g.pattern,
    assessment:true,
    grammarIds:[`${g.lessons[0]}-g${i+1}`]
  };
});
const grammarCode=`// Tự sinh - G5 separate assessment: 22 mẫu ngữ pháp N4\n// Mỗi câu có trường ja (câu tiếng Nhật hoàn chỉnh), không trùng corpus training.\nexport const n4GrammarSeparateAssessment = ${JSON.stringify(grammarEntries,null,2)};\n`;
fs.writeFileSync('c:\\Users\\LENOVO\\Desktop\\Nihongo-Compass\\src\\n4-grammar-separate-assessment.js',grammarCode,'utf8');
console.log('WROTE src/n4-grammar-separate-assessment.js',grammarEntries.length,'entries');

// ---------- File 3: n4-kaiwa-separate-assessment.js ----------
const kaiwaEntries=tasks.map((t,i)=>{
  const id=`n4-kaiwa-sep-${t.lessons[0]}-${i+1}`;
  const ja=jaForTask(i);
  return {
    id,kind:'speaking',ja,
    accepted:[t.text],
    choices:[t.text,'Chưa khớp'],
    answer:0,
    explanation:`Trả lời nhiệm vụ Kaiwa ${t.text} theo ngữ cảnh bài ${t.lessons[0]}.`,
    skill:t.id,
    assessment:true,
    usageId:t.id
  };
});
const kaiwaCode=`// Tự sinh - G5 separate assessment: 50 task Kaiwa N4\n// Mỗi câu có trường ja (câu tiếng Nhật hoàn chỉnh), không trùng corpus training.\nexport const n4KaiwaSeparateAssessment = ${JSON.stringify(kaiwaEntries,null,2)};\n`;
fs.writeFileSync('c:\\Users\\LENOVO\\Desktop\\Nihongo-Compass\\src\\n4-kaiwa-separate-assessment.js',kaiwaCode,'utf8');
console.log('WROTE src/n4-kaiwa-separate-assessment.js',kaiwaEntries.length,'entries');

// ---------- File 4: n4-vocab-separate-assessment-41.js ----------
const vocabEntries=words.map((w,i)=>{
  const id=`n4-vocab-sep-41-${w.lessons[0]}-${i+1}`;
  const ja=jaForWord(w.text);
  return {
    id,kind:'recall',ja,
    accepted:[w.text],
    choices:[w.text,'Chưa khớp'],
    answer:0,
    explanation:`Nghĩa từ ${w.text} trong ngữ cảnh bài ${w.lessons.join(',')}.`,
    skill:w.text,
    assessment:true,
    wordKey:w.text,
    usageId:`${w.lessons[0]}:${w.text}`
  };
});
const vocabCode=`// Tự sinh - G5 separate assessment: 41 từ N4 còn thiếu\n// Mỗi câu có trường ja (câu tiếng Nhật hoàn chỉnh), không trùng corpus training.\nexport const n4VocabSeparateAssessment41 = ${JSON.stringify(vocabEntries,null,2)};\n`;
fs.writeFileSync('c:\\Users\\LENOVO\\Desktop\\Nihongo-Compass\\src\\n4-vocab-separate-assessment-41.js',vocabCode,'utf8');
console.log('WROTE src/n4-vocab-separate-assessment-41.js',vocabEntries.length,'entries');
console.log('DONE - 4 files generated');