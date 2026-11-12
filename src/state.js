import{validateTools}from './tools-state.js';
import{emptyLearning,validateLearning}from './learning-state.js';
import { defaults, diagnostics, passed, diagnosticResult } from './planner.js';
import { lessons, allQuestions } from './content.js';
export const KEY = 'nihongo:learning:v1';
export const fresh = () => ({ version: 1, profile: null, route: 'start', lessonId: 'hira-1', answers: {}, completed: {}, reviews: {}, aiModel: 'qwen3:1.7b', preferences: {...defaults}, notebook: {}, materials: [], diagnostics: {}, listening: {}, retention: {}, wordReviews: {}, savedWords: [], openTasks: {}, lastSummary: null, checkpointAttempts: [], listeningActivities: {}, writingHistory: {}, learning: emptyLearning(),wordNotes:{},wordEvidence:{},kanjiDrafts:{},kanjiReviews:{} });
export function validate(value) {
  if (!value || value.version !== 1 || typeof value !== 'object') throw new Error('Không đúng định dạng bản sao lưu phiên bản 1.');
  const result = fresh();
  const routes = ['start','today','roadmap','lesson','practice','review','progress','settings','diagnostic','library','tools'];
  if (!routes.includes(value.route) || !lessons.some(l => l.id === value.lessonId)) throw new Error('Vị trí học không hợp lệ.');
  result.route = value.route; result.lessonId = value.lessonId;if(value.selectedLessonId!==undefined){if(!lessons.some(l=>l.id===value.selectedLessonId))throw Error('Bài tự chọn không hợp lệ.');result.selectedLessonId=value.selectedLessonId;}
  if(value.toolLessonId!==undefined){if(!lessons.some(l=>l.id===value.toolLessonId&&l.referenceLesson))throw Error('Bài trong công cụ không hợp lệ.');result.toolLessonId=value.toolLessonId;}
  if (value.profile !== null) {
    if (!value.profile || typeof value.profile.name !== 'string' || value.profile.name.length > 60 || ![10,15,30,45,60,90].includes(value.profile.minutes)) throw new Error('Hồ sơ không hợp lệ.');
    result.profile = { name: value.profile.name, minutes: value.profile.minutes };
  }
  if (!['qwen3:4b','qwen3:1.7b'].includes(value.aiModel)) throw new Error('Mô hình không được hỗ trợ.');
  result.aiModel = value.aiModel;
  for (const field of ['answers','completed','reviews']) if (!value[field] || typeof value[field] !== 'object' || Array.isArray(value[field])) throw new Error('Dữ liệu học không hợp lệ.');
  for (const [id,a] of Object.entries(value.answers)) {
    const q = allQuestions.find(q => q.id === id);
    if (!q || !a || !Number.isInteger(a.choice) || a.choice < 0 || a.choice >= q.choices.length || typeof a.correct !== 'boolean' || a.correct !== (a.choice === q.answer)) throw new Error('Câu trả lời không hợp lệ.');
    if(a.response!==undefined&&(typeof a.response!=='string'||a.response.length>100))throw Error('Dữ liệu gõ không hợp lệ.');
    result.answers[id] = { choice: a.choice, correct: a.correct, ...(a.response!==undefined?{response:a.response}:{}), ...(Number.isFinite(a.at)?{at:a.at}:{}) };
  }
  for (const [id,t] of Object.entries(value.completed)) {
    const lesson = lessons.find(l => l.id === id);
    if (!lesson || !Number.isFinite(t) || t <= 0 || !(lesson.legacyQuestionIds||lesson.questions.map(q=>q.id)).every(id => result.answers[id])) throw new Error('Kết quả hoàn thành không hợp lệ.');
    result.completed[id] = t;
  }
  if(value.preferences){const p=value.preferences;if(!['N5','N4','N3','N2','N1'].includes(p.goal)||!['Nền tảng','JLPT','Giao tiếp','Du lịch','Du học','Công việc'].includes(p.purpose)||!['path','free'].includes(p.mode)||![10,15,30,45,60,90].includes(p.todayMinutes))throw Error('Kế hoạch không hợp lệ.');result.preferences={goal:p.goal,purpose:p.purpose,mode:p.mode,todayMinutes:p.todayMinutes};}
  if(value.diagnostics){for(const[id,d]of Object.entries(value.diagnostics)){if(!diagnostics[id]||!Array.isArray(d.choices)||d.choices.length!==3||d.choices.some(c=>!Number.isInteger(c)||c<0||c>2))throw Error('Kiểm tra bỏ qua không hợp lệ.');const checked=diagnosticResult(id,d.choices);result.diagnostics[id]={...checked,at:Number.isFinite(d.at)?d.at:Date.now()};}}
  if(value.notebook){for(const[id,n]of Object.entries(value.notebook)){if(!lessons.some(l=>l.id===id)||typeof n!=='string'||n.length>4000)throw Error('Ghi chú không hợp lệ.');result.notebook[id]=n;}}
  if(value.materials){if(!Array.isArray(value.materials)||value.materials.length>50)throw Error('Thư viện không hợp lệ.');for(const m of value.materials){if(!m||typeof m.text!=='string'||m.text.length>300000||typeof m.name!=='string'||m.name.length>100||typeof m.source!=='string'||m.source.length>500||!Number.isFinite(m.at))throw Error('Tài liệu không hợp lệ.');result.materials.push({name:m.name,text:m.text,source:m.source,at:m.at,status:'Bản nháp riêng'});}}
  if(value.listening){for(const[id,r]of Object.entries(value.listening)){if(!lessons.some(l=>'listen-'+l.id===id||'listen-v2-'+l.id===id)||!r||(typeof r.choice!=='string'||r.choice.length>80)||typeof r.correct!=='boolean'||!Number.isFinite(r.due)||!Number.isFinite(r.at))throw Error('Dữ liệu nghe không hợp lệ.');if(r.lessonId!==undefined&&!lessons.some(l=>l.id===r.lessonId))throw Error('Nguồn bài nghe không hợp lệ.');result.listening[id]={choice:r.choice,correct:r.correct,due:r.due,at:r.at,...(r.lessonId?{lessonId:r.lessonId}:{}),...(typeof r.target==='string'?{target:r.target.slice(0,80)}:{}),...(typeof r.audioId==='string'?{audioId:r.audioId.slice(0,80)}:{})};}}
  if(value.retention){for(const[id,r]of Object.entries(value.retention)){if(!lessons.some(l=>l.id===id&&l.checkpoint)||!r||!Number.isFinite(r.checkedAt)||!Number.isFinite(r.anchorAt))throw Error('Kiểm tra trì hoãn không hợp lệ.');result.retention[id]={checkedAt:r.checkedAt,anchorAt:r.anchorAt,afterRest:r.anchorAt>0&&r.checkedAt-r.anchorAt>=86400000&&lessons.find(l=>l.id===id).questions.every(q=>(result.answers[q.id]?.at||0)>=r.anchorAt+86400000)};}}
  if(value.listeningActivities){for(const[id,r]of Object.entries(value.listeningActivities)){const task=lessons.flatMap(l=>l.listeningTasks||[]).find(t=>t.id===id);if(!task||!r||!Array.isArray(r.attempts)||!Number.isFinite(r.due))throw Error('Lịch sử nghe không hợp lệ.');const attempts=r.attempts.map(a=>{if(!a||!Number.isFinite(a.at)||typeof a.transcriptUsed!=='boolean'||!Number.isInteger(a.plays)||a.plays<1||!a.choices||!task.questions.every(q=>Number.isInteger(a.choices[q.id])&&a.choices[q.id]>=0&&a.choices[q.id]<q.choices.length))throw Error('Lượt nghe không hợp lệ.');return {at:a.at,transcriptUsed:a.transcriptUsed,plays:a.plays,...(typeof a.audioId==='string'?{audioId:a.audioId.slice(0,100)}:{}),choices:Object.fromEntries(task.questions.map(q=>[q.id,a.choices[q.id]])),correct:task.questions.filter(q=>a.choices[q.id]===q.answer).length};});result.listeningActivities[id]={attempts,due:r.due};}}
  if(value.savedWords){if(!Array.isArray(value.savedWords)||value.savedWords.some(k=>typeof k!=='string'||k.length>100))throw Error('Từ lưu không hợp lệ.');result.savedWords=[...new Set(value.savedWords)];}
  if(value.wordReviews){for(const[k,r]of Object.entries(value.wordReviews)){if(k.length>100||!r||!Number.isInteger(r.streak)||r.streak<0||r.streak>3||!Number.isFinite(r.last)||!Number.isFinite(r.due))throw Error('Ôn từ không hợp lệ.');if(r.algorithm!==undefined&&(r.algorithm!=='sm2-binary-v1'||!Number.isFinite(r.ease)||r.ease<1.3||r.ease>3||!Number.isInteger(r.repetitions)||r.repetitions<0||!Number.isInteger(r.intervalDays)||r.intervalDays<0))throw Error('Lịch SM-2 không hợp lệ.');result.wordReviews[k]={streak:r.streak,last:r.last,due:r.due,...(r.algorithm?{algorithm:r.algorithm,ease:r.ease,repetitions:r.repetitions,intervalDays:r.intervalDays}:{})};}}
  if(value.openTasks){for(const[id,t]of Object.entries(value.openTasks)){if(!lessons.some(l=>l.id===id)||!t||typeof t.text!=='string'||t.text.length>5000||typeof t.intention!=='string'||t.intention.length>1000||!Array.isArray(t.checks)||t.checks.some(n=>!Number.isInteger(n)||n<0||n>20))throw Error('Nhiệm vụ mở không hợp lệ.');result.openTasks[id]={text:t.text,intention:t.intention,checks:t.checks};}}
  if(value.checkpointAttempts){if(!Array.isArray(value.checkpointAttempts))throw Error('Lịch sử tự kiểm không hợp lệ.');for(const run of value.checkpointAttempts){const l=lessons.find(l=>l.id===run.lessonId&&l.checkpoint);if(!l||!Number.isFinite(run.at)||!run.answers||typeof run.answers!=='object')throw Error('Lượt tự kiểm không hợp lệ.');const answers={};for(const [id,a] of Object.entries(run.answers)){const q=l.questions.find(q=>q.id===id);if(!q||!a||!Number.isInteger(a.choice)||a.choice<0||a.choice>=q.choices.length||a.correct!==(a.choice===q.answer)||a.response!==undefined&&(typeof a.response!=='string'||a.response.length>100))throw Error('Đáp án tự kiểm không hợp lệ.');answers[id]={choice:a.choice,correct:a.correct,...(a.response!==undefined?{response:a.response}:{}),...(Number.isFinite(a.at)?{at:a.at}:{})};}result.checkpointAttempts.push({lessonId:l.id,at:run.at,completedAt:Number.isFinite(run.completedAt)?run.completedAt:null,answers});}}
  if(value.writingHistory){for(const[id,items]of Object.entries(value.writingHistory)){if(!lessons.some(l=>l.id===id)||!Array.isArray(items)||items.length>100)throw Error('Lịch sử viết không hợp lệ.');result.writingHistory[id]=items.map(v=>{if(!v||typeof v.text!=='string'||v.text.length>5000||typeof v.intention!=='string'||v.intention.length>1000||!Number.isFinite(v.at))throw Error('Phiên bản viết không hợp lệ.');return {text:v.text,intention:v.intention,at:v.at};});}}
  result.learning=validateLearning(value.learning,lessons);
  validateTools(value,result);
  if(value.lastSummary&&lessons.some(l=>l.id===value.lastSummary))result.lastSummary=value.lastSummary;
  for (const [id,r] of Object.entries(value.reviews)) {
    if (!allQuestions.some(q => q.id === id) || !r || !Number.isFinite(r.due) || r.due <= 0 || !Number.isInteger(r.streak) || r.streak < 0 || r.streak > 3) throw new Error('Lịch ôn không hợp lệ.');
    result.reviews[id] = { due: r.due, streak: r.streak };
  }
  if (!result.profile && !['start','settings'].includes(result.route)) throw new Error('Thiếu hồ sơ học.');
  return result;
}
export function recordAnswer(state, q, choice, now = Date.now(), response) {
  const correct = choice === q.answer;
  return { ...state, answers: { ...state.answers, [q.id]: { choice, correct, at:now, ...(typeof response==='string'?{response:response.slice(0,100)}:{}) } }, reviews: { ...state.reviews, [q.id]: { due: correct ? now + 86400000 : now, streak: 0 } } };
}
export function completeLesson(state, lesson, now = Date.now()) {
  if (!lesson.questions.every(q => state.answers[q.id])) throw new Error('Hãy trả lời hết câu hỏi trước.');
  return { ...state, completed: { ...state.completed, [lesson.id]: now }, ...(lesson.checkpoint?{retention:{...state.retention,[lesson.id]:{checkedAt:now,anchorAt:state.completed[lesson.waitFor]||0,afterRest:Boolean(state.completed[lesson.waitFor])&&lesson.questions.every(q=>(state.answers[q.id]?.at||0)>=state.completed[lesson.waitFor]+86400000)}}}:{}), lastSummary:lesson.id, route: 'today' };
}
export function reviewAnswer(state, id, correct, now = Date.now()) {
  const old = state.reviews[id] || { streak: 0 };
  const streak = correct ? Math.min(old.streak + 1, 3) : 0;
  const days = [0,1,3,7][streak];
  return { ...state, reviews: { ...state.reviews, [id]: { streak, due: correct ? now + days * 86400000 : now + 5 * 60000 } } };
}
export const available = (_state, lesson) => Boolean(lesson && (lesson.questions?.length || lesson.reading || lesson.grammar?.length));

export function restartCheckpoint(state,lesson,now=Date.now()){if(!lesson.checkpoint)throw Error('Chỉ làm lại mốc tự kiểm.');const answers={...state.answers},snapshot={};for(const q of lesson.questions){if(answers[q.id])snapshot[q.id]=answers[q.id];delete answers[q.id];}const completed={...state.completed};delete completed[lesson.id];return {...state,answers,completed,checkpointAttempts:Object.keys(snapshot).length?[...(state.checkpointAttempts||[]),{lessonId:lesson.id,at:now,completedAt:state.completed[lesson.id]||null,answers:snapshot}]:(state.checkpointAttempts||[])};}

export const needsStudy=(state,lesson)=>!state.completed[lesson.id]||lesson.questions.some(q=>!state.answers[q.id]);

export function recordListening(state,task,choices,help,now=Date.now()){if(!task.questions.every(q=>Number.isInteger(choices[q.id])&&choices[q.id]>=0&&choices[q.id]<q.choices.length)||!Number.isInteger(help.plays)||help.plays<1)throw Error('Cần nghe và trả lời đủ.');const correct=task.questions.filter(q=>choices[q.id]===q.answer).length;return {...state,listeningActivities:{...state.listeningActivities,[task.id]:{attempts:[...(state.listeningActivities?.[task.id]?.attempts||[]),{at:now,transcriptUsed:Boolean(help.transcriptUsed),plays:help.plays,...(help.audioId?{audioId:help.audioId}:{}),choices:{...choices},correct}],due:now+(correct===task.questions.length?86400000:300000)}}};}
