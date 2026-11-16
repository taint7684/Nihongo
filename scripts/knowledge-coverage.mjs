import fs from 'node:fs';
import {n4AssessmentLinks} from '../src/assessment-links.js';
import {communication,transfer} from '../src/communication-content.js';
import {lessons} from '../src/content.js';
import {guidedMap} from '../src/guided-links.js';
import {hasKanjiStrokePractice,kanjiUseMatchesWord,kanjiWordForLesson} from '../src/kanji-usage-link.js';
import {fresh,recordAnswer} from '../src/state.js';
import {wordReviewKey} from '../src/word-identity.js';

const isAssessment=lesson=>/assessment|final-review|comprehensive/.test(lesson.id);
const assessmentQuestions=[];
for(const lesson of lessons){
  for(const question of [
    ...(lesson.questions||[]).filter(q=>isAssessment(lesson)||q.assessment),
    ...(lesson.listeningTasks||[])
      .filter(task=>isAssessment(lesson)||task.assessment)
      .flatMap(task=>(task.questions||[]).map(q=>({...q,assessmentTranscript:task.transcript})))
  ]){
    const sourceLessonId=question.sourceLessonId||question.usageId?.split(':')[0]||null;
    assessmentQuestions.push({id:question.id,lessonId:lesson.id,sourceLessonId,question});
  }
}

const questionById=new Map(assessmentQuestions.map(item=>[item.id,item]));
const grammarLinks={
  'mnn-01-g1':['final-g1'],'mnn-06-g1':['final-g2'],'mnn-10-g1':['final-g3'],
  'mnn-12-g2':['final-g4'],'mnn-17-g3':['final-g5'],'mnn-18-g3':['final-g6'],
  'mnn-22-g0':['final-g7'],'mnn-24-g2':['final-g8'],'mnn-25-g3':['final-g9'],
  ...n4AssessmentLinks
};
for(const lesson of lessons.filter(l=>l.referenceLesson&&l.referenceLesson<=25)){
  grammarLinks[lesson.id+'-g'+(lesson.grammar.length-1)]=[
    'n5b-use-'+String(lesson.referenceLesson).padStart(2,'0')
  ];
}

const wordQuestionIds=new Map();
const kanjiQuestionIds=new Map();
for(const {id,sourceLessonId,question} of assessmentQuestions){
  const source=lessons.find(lesson=>lesson.id===sourceLessonId);
  if(question.wordKey&&source?.words?.some(word=>word.text===question.wordKey)
    &&question.usageId===source.id+':'+question.wordKey){
    const key=wordReviewKey(question.wordKey);
    wordQuestionIds.set(key,[...(wordQuestionIds.get(key)||[]),id]);
  }
  for(const grammarId of question.grammarIds||[]){
    const [lessonId,indexText]=grammarId.split('-g');
    const grammarLesson=lessons.find(lesson=>lesson.id===lessonId);
    const index=Number(indexText);
    if(grammarLesson?.grammar?.[index]){
      grammarLinks[grammarId]=[...(grammarLinks[grammarId]||[]),id];
    }
  }
  if(!source||!question.wordKey||!question.usageId)continue;
  for(const kanji of source.kanji||[]){
    const explicitlyAssesses=question.assessesKanji?.includes(kanji.char)
      ||id.includes('-kanji-reading-');
    if(explicitlyAssesses&&kanjiUseMatchesWord(kanji,question.wordKey)){
      kanjiQuestionIds.set(kanji.char,[...(kanjiQuestionIds.get(kanji.char)||[]),id]);
    }
  }
}

const now=1700000000000;
function schedulesReview(question){
  if(!Number.isInteger(question.answer)||!Array.isArray(question.choices)
    ||question.choices.length<2||question.answer<0||question.answer>=question.choices.length)return false;
  const incorrectChoice=question.answer===0?1:0;
  const correct=recordAnswer(fresh(),question,question.answer,now);
  const incorrect=recordAnswer(fresh(),question,incorrectChoice,now);
  if(question.wordKey){
    const key=wordReviewKey(question.wordKey);
    return correct.wordReviews?.[key]?.due>now
      &&incorrect.wordReviews?.[key]?.due>now
      &&correct.wordEvidence?.[key]?.some(item=>item.usageId===question.usageId);
  }
  return correct.reviews?.[question.id]?.due>now
    &&incorrect.reviews?.[question.id]?.due===now;
}

function uniqueExisting(ids){
  return [...new Set(ids)].filter(id=>questionById.has(id));
}

export function generateKnowledgeCoverage(){
  const levels={};
  for(const level of ['N5','N4']){
    const refs=lessons.filter(lesson=>lesson.referenceLesson&&(lesson.level||'N5')===level);
    const words=new Map();
    const kanji=new Map();
    const grammar=[];
    const tasks=[];

    for(const lesson of refs){
      for(const word of lesson.words||[]){
        const key=wordReviewKey(word.text);
        if(!words.has(key)){
          words.set(key,{
            id:'word:'+key,key,text:key,lessonIds:[],hasLesson:false,hasPractice:false,
            hasReviewCapability:false,assessmentIds:[],
            quality:'Project-authored; independent semantic review not recorded.'
          });
        }
        const item=words.get(key);
        item.lessonIds.push(lesson.id);
        item.hasLesson||=Boolean(word.reading&&word.meaning&&word.example?.ja&&word.example?.vi);
        item.hasPractice||=Boolean(word.reading&&word.example?.ja);
      }

      for(const item of lesson.kanji||[]){
        if(!kanji.has(item.char)){
          kanji.set(item.char,{
            id:'kanji:'+item.char,text:item.char,lessonIds:[],hasLesson:false,
            hasPractice:false,practiceModes:[],hasReviewCapability:false,
            assessmentIds:[],
            quality:'Lesson/stroke asset links only; independent reading/meaning review not recorded.'
          });
        }
        const row=kanji.get(item.char);
        const linkedWord=kanjiWordForLesson(lesson,item);
        const hex=item.char.codePointAt(0).toString(16).padStart(5,'0');
        const strokePath='public/kanji/'+hex+'.json';
        const strokeData=fs.existsSync(strokePath)
          ?JSON.parse(fs.readFileSync(strokePath,'utf8'))
          :null;
        const modes=[];
        if(linkedWord?.reading&&linkedWord?.meaning&&linkedWord.example?.ja&&linkedWord.example?.vi){
          modes.push('word-reading-recall');
        }
        if(hasKanjiStrokePractice(strokeData,item.char))modes.push('stroke-self-practice');
        row.lessonIds.push(lesson.id);
        row.hasLesson||=Boolean(item.meaning&&item.inWord);
        row.practiceModes=[...new Set([...row.practiceModes,...modes])];
        row.hasPractice=row.practiceModes.length>0;
      }

      for(const [index,item] of (lesson.grammar||[]).entries()){
        const practiceIds=lesson.guidedMap?.[index]||guidedMap[lesson.referenceLesson]?.[index]||[];
        const practiceQuestions=practiceIds
          .map(id=>(lesson.questions||[]).find(question=>question.id===id))
          .filter(Boolean);
        const linkedAssessmentIds=grammarLinks[lesson.id+'-g'+index]||[];
        grammar.push({
          id:lesson.id+'-g'+index,text:item.pattern,lessonIds:[lesson.id],
          hasLesson:Boolean(item.explanation&&item.example?.ja),
          hasPractice:practiceQuestions.length>0,
          hasReviewCapability:practiceQuestions.some(schedulesReview),
          practiceIds,
          assessmentIds:uniqueExisting(linkedAssessmentIds),
          assessmentScope:'Declared question link only; not a non-overlap or semantic-quality determination.',
          quality:'Project-authored; independent academic review not recorded.'
        });
      }

      for(const task of [...(communication[lesson.id]||[]),...(transfer[lesson.id]?[transfer[lesson.id]]:[])]){
        tasks.push({
          id:task.id,text:task.goal,lessonIds:[lesson.id],
          hasLesson:Boolean(task.prompt&&task.criteria?.length),
          hasPractice:Boolean(task.variants?.length),
          hasReviewCapability:false,assessmentIds:[],
          quality:'Practice task; no linked independent assessment declared.'
        });
      }
    }

    for(const item of words.values()){
      const ids=uniqueExisting(wordQuestionIds.get(item.key)||[]);
      item.assessmentIds=ids;
      item.hasReviewCapability=ids.some(id=>schedulesReview(questionById.get(id).question));
      item.assessmentScope='Explicit wordKey/usageId assessment link; modes and text separation are not audited here.';
    }
    for(const item of kanji.values()){
      const ids=uniqueExisting(kanjiQuestionIds.get(item.text)||[]);
      item.assessmentIds=ids;
      item.hasReviewCapability=ids.some(id=>schedulesReview(questionById.get(id).question));
      item.assessmentScope='Reading in an explicitly linked word only; not recognition, writing, or all readings.';
    }

    const groups={words:[...words.values()],kanji:[...kanji.values()],grammar,tasks};
    const summary=Object.fromEntries(Object.entries(groups).map(([kind,items])=>[
      kind,{
        total:items.length,
        structurallyLinked:items.filter(item=>item.hasLesson&&item.hasPractice
          &&item.hasReviewCapability&&item.assessmentIds.length>0).length,
        academicApproval:0
      }
    ]));
    levels[level]={
      summary,items:groups,referenceComplete:false,publishedUnits:refs.length,
      status:level==='N4'
        ?refs.length+' reference lessons with content; full N4 scope and assessment coverage are not established.'
        :'25 reference lessons and additional checks; full N5 scope is not established.'
    };
  }

  const result={
    version:'2026-11-13-explicit-assessment-links',
    generatedAt:new Date().toISOString(),
    referenceStatus:'Existing-content links only; independent full-level denominator is not established.',
    selection:'Question IDs are derived from explicit wordKey/usageId, grammarIds, and Kanji-to-word links; manually reviewed narrow grammar links are retained.',
    levels,
    definition:'structurallyLinked means lesson + practice + an existing assessment question ID + review scheduling exercised with isolated in-memory states. It does not certify assessment independence, semantic quality, full-level coverage, or learner mastery. DONE_GATES separately checks text overlap and evidence scope.'
  };
  fs.writeFileSync('public/knowledge-coverage.json',JSON.stringify(result,null,2));

  let markdown='# Liên kết cấu trúc trong học liệu đang có\n\n'
    +'Không dùng mẫu số này làm đủ N5/N4. Đây không phải danh mục JLPT chính thức, không chứng nhận nội dung hoặc năng lực người học. DONE_GATES kiểm tra riêng độ mới/vùng bằng chứng.\n\n';
  for(const [name,data] of Object.entries(levels)){
    markdown+='## '+name+'\n\n'+data.status+'\n\n'
      +'| Nhóm | Học+luyện+đánh giá có ID+ôn / số mục đang có | Duyệt độc lập |\n'
      +'|---|---:|---:|\n'
      +Object.entries(data.summary).map(([kind,value])=>
        '| '+kind+' | '+value.structurallyLinked+'/'+value.total+' | 0 |'
      ).join('\n')+'\n\n';
  }
  fs.writeFileSync('KNOWLEDGE_COVERAGE.md',markdown);
  return result;
}
