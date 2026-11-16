import { lessons } from './content.js';

export const PLAN_MINUTES = [10, 20, 40, 60, 90, 120, 180];
export function validateStudyPlan(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || !Number.isInteger(value.dailyMinutes) || value.dailyMinutes < 10 || value.dailyMinutes > 180 || !['auto', 'beginner', 'N5', 'N4'].includes(value.currentLevel)) throw Error('Nhịp kế hoạch tuần không hợp lệ.');
  const examDate = value.examDate ?? '';
  if (typeof examDate !== 'string' || examDate && (!/^\d{4}-\d{2}-\d{2}$/.test(examDate) || new Date(examDate + 'T00:00:00Z').toISOString().slice(0, 10) !== examDate)) throw Error('Ngày thi dự kiến không hợp lệ.');
  return {dailyMinutes: value.dailyMinutes, currentLevel: value.currentLevel, examDate};
}
export function planPreferences(state) {
  return state.preferences?.studyPlan || {dailyMinutes: state.preferences?.todayMinutes || state.profile?.minutes || 30, currentLevel: 'auto', examDate: ''};
}
export const phaseGuide = [
  {id:'intro', title:'Nhập môn', range:'Khoảng 2–3 tuần tham chiếu; có thể dài hơn', task:'Chữ và âm; tự kiểm kana, trường âm, âm ngắt. Học câu đơn giản song song.'},
  {id:'N5', title:'N5 · bài 1–25', range:'Chia mỗi bài thành nhiều buổi theo thời gian thực có', task:'Mỗi 5 bài mở ôn trộn cũ–mới; tiếp tục Katakana, nghe và tự nói.'},
  {id:'N5-check', title:'Mốc N5', range:'Sau hoạt động bài 25; chưa đồng nghĩa vững N5', task:'Mở tự kiểm riêng và mẫu JLPT chính thức; xem riêng kiến thức/đọc và nghe.'},
  {id:'N4', title:'N4 · bài 26–50', range:'Đi tiếp theo bằng chứng và bù điểm yếu', task:'Mỗi 5 bài ôn tổng hợp; giữ nghe, đọc, viết và giao tiếp.'},
  {id:'N4-check', title:'Mốc N4', range:'Sau hoạt động bài 50; cần đánh giá riêng', task:'Tự kiểm N4, mẫu chính thức; ghi điểm sàn chỉ khi có kết quả JLPT thật.'},
  {id:'exam', title:'Luyện thi', range:'4–8 tuần cuối trước ngày thi bạn nhập', task:'Ưu tiên bộ mới có giờ, lỗi theo từng phần. Kho hiện chưa chứng minh đủ đề song song.'},
];
const mnn = n => 'mnn-' + String(n).padStart(2,'0');
const dateKey = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const DAY = 86400000;
function checkpointFor(n) { return n <= 25 ? `mnn-review-${String(n-4).padStart(2,'0')}-${String(n).padStart(2,'0')}` : `n4-assessment-${n-4}-${n}`; }

// Pure recommendation: never writes completion, answers, review dates or evidence.
export function buildWeeklyPlan(state, now = Date.now(), catalog = lessons) {
  const p = planPreferences(state), completed = state.completed || {}, byId = new Map(catalog.map(l=>[l.id,l]));
  const numbered = catalog.filter(l=>l.referenceLesson).sort((a,b)=>a.referenceLesson-b.referenceLesson);
  const foundation = catalog.filter(l=>!l.referenceLesson && !l.checkpoint && (l.id.startsWith('hira-') || l.id.startsWith('kata-') || l.kind==='phonetics'));
  const firstMissing = numbered.find(l=>!completed[l.id]);
  const introMissing = foundation.find(l=>!completed[l.id]);
  const n5Done = Array.from({length:25},(_,i)=>mnn(i+1)).every(id=>completed[id]);
  const n4Done = Array.from({length:25},(_,i)=>mnn(i+26)).every(id=>completed[id]);
  let phase = introMissing && !completed['hira-3'] ? 'intro' : !n5Done ? 'N5' : !completed['mnn-final-review'] ? 'N5-check' : !n4Done ? 'N4' : 'N4-check';
  // Self-reported entry point changes recommendations only, never stored evidence.
  if (p.currentLevel==='beginner') phase='intro';
  if (p.currentLevel==='N5' && phase==='intro') phase='N5';
  if (p.currentLevel==='N4' && !n5Done) phase='N4';
  const today = new Date(now), localMidnight = new Date(today.getFullYear(),today.getMonth(),today.getDate());
  const examDays = p.examDate ? Math.ceil((new Date(p.examDate+'T00:00:00')-localMidnight)/DAY) : null;
  const examWindow = examDays !== null && examDays >= 0 && examDays <= 56;
  const learningPhase=phase;
  if (examWindow) phase='exam';
  const dueWords = Object.entries(state.wordReviews||{}).filter(([,r])=>r.due<=now).map(([id])=>id);
  const dueQuestions = Object.entries(state.reviews||{}).filter(([,r])=>r.due<=now).map(([id])=>id);
  const weakQuestions = Object.entries(state.answers||{}).filter(([,a])=>a.correct===false).map(([id])=>id);
  const listeningWeak = Object.entries(state.listening||{}).filter(([,r])=>!r.correct || r.due<=now);
  const listeningActivities = Object.entries(state.listeningActivities||{}).filter(([id,r])=>{
    const t=catalog.flatMap(l=>l.listeningTasks||[]).find(t=>t.id===id), last=r.attempts?.at(-1);
    return r.due<=now || last && t && last.correct<t.questions.length;
  });
  const warnings=[];
  if(examDays!==null && examDays<0) warnings.push('Ngày thi đã qua. Hãy cập nhật ngày hoặc để trống; kế hoạch tiếp tục theo lịch sử học.');
  if(examWindow) warnings.push(`Còn ${examDays} ngày theo ngày bạn nhập. Giữ bù nền ${learningPhase}; lịch này không chứng minh đủ chuẩn thi hoặc dự đoán ngày đỗ.`);
  if(examWindow && examDays<28) warnings.push('Còn dưới 4 tuần; không nén toàn bộ nền vào lịch còn lại. Ưu tiên lỗi thật và trao đổi lại mục tiêu/ngày thi nếu cần.');
  const recent=[...Object.values(completed),...Object.values(state.answers||{}).map(a=>a.at),...Object.values(state.wordReviews||{}).map(r=>r.last),...Object.values(state.learning?.sessions||{}).map(s=>s.at)].filter(Number.isFinite);
  if(recent.length && now-Math.max(...recent)>7*DAY) warnings.push('Chưa thấy hoạt động đã lưu trong hơn 7 ngày. Bắt đầu bằng ôn và giảm mục mới; thời gian ngoài ứng dụng chưa được ghi nhận.');
  if(dueWords.length+dueQuestions.length>20) warnings.push('Nhiều mục đến hạn: chia hàng đợi qua nhiều buổi, giảm mục mới; không cần ôn hết trong một ngày.');
  if(listeningWeak.length||listeningActivities.length) warnings.push('Có bài nghe sai hoặc đến hạn. Ưu tiên nghe lại không chữ rồi đối chiếu transcript; chưa có điểm sàn JLPT thật để kết luận sát sàn.');
  const pending = Object.entries(state.learning?.sessions||{}).filter(([id])=>byId.has(id)&&!completed[id]).sort((a,b)=>b[1].at-a[1].at)[0];
  const checkpoint = numbered.filter(l=>l.referenceLesson%5===0).find(l=>Array.from({length:5},(_,i)=>mnn(l.referenceLesson-i)).every(id=>completed[id]) && byId.has(checkpointFor(l.referenceLesson)) && !completed[checkpointFor(l.referenceLesson)]);
  let next = pending ? byId.get(pending[0]) : phase==='intro' ? introMissing : learningPhase==='N5-check' ? byId.get('mnn-final-review') : learningPhase==='N4-check' ? byId.get('n4-comprehensive-a') : checkpoint ? byId.get(checkpointFor(checkpoint.referenceLesson)) : firstMissing;
  if(p.currentLevel==='N4' && !pending && !n5Done) next=numbered.find(l=>l.referenceLesson>=26&&!completed[l.id]) || firstMissing;
  if(!next) next=byId.get('n4-comprehensive-a') || numbered.at(-1) || catalog[0];
  const wrongLesson = catalog.find(l=>l.questions?.some(q=>weakQuestions.includes(q.id)));
  const listeningLesson = catalog.find(l=>listeningWeak.some(([id,r])=>r.lessonId===l.id||id==='listen-'+l.id||id==='listen-v2-'+l.id) || (l.listeningTasks||[]).some(t=>listeningActivities.some(([id])=>id===t.id))) || (next?.listeningTasks?.length ? next : null) || numbered.find(l=>l.listeningTasks?.length);
  function daily(offset) {
    const d=new Date(today.getFullYear(),today.getMonth(),today.getDate()+offset), budget=p.dailyMinutes;
    const cutoff=offset===0?now:new Date(d.getFullYear(),d.getMonth(),d.getDate(),today.getHours(),today.getMinutes(),today.getSeconds(),today.getMilliseconds()).getTime();
    const dueWords=Object.entries(state.wordReviews||{}).filter(([,r])=>r.due<=cutoff).map(([id])=>id);
    const dueQuestions=Object.entries(state.reviews||{}).filter(([,r])=>r.due<=cutoff).map(([id])=>id);
    // At least one third for listening, even in a ten-minute session.
    const listen=Math.ceil(budget/3), review=Math.max(2,Math.floor(budget/4)), remaining=budget-listen-review;
    const speak=budget>=20?Math.max(2,Math.floor(remaining/3)):0, main=remaining-speak;
    const tasks=[];
    tasks.push({id:'review',route:dueWords.length||dueQuestions.length?'review':'lesson',lessonId:(wrongLesson||next)?.id,minutes:review,title:dueWords.length?`Ôn ${Math.min(dueWords.length,Math.max(1,Math.floor(review/2)))} từ đến hạn`:dueQuestions.length||weakQuestions.length?'Tự thử câu đến hạn / câu sai':'Nhớ lại phần vừa học',reason:dueWords.length?`${dueWords.length} từ đến hạn từ lịch wordReviews thật; mở Thẻ từ của bạn trong Ôn tập`:dueQuestions.length?`${dueQuestions.length} câu đến hạn; ${weakQuestions.length} đáp án sai đã lưu`:weakQuestions.length?`${weakQuestions.length} đáp án sai đã lưu`:'Chưa có hàng đợi ôn; không tự tạo lượt ôn.',stop:'Dừng khi hết số phút; chỉ lưu kết quả sau khi tự trả lời.'});
    if(listeningLesson) tasks.push({id:'listening',route:'lesson',lessonId:listeningLesson.id,minutes:listen,title:`Nghe không chữ · ${listeningLesson.title}`,reason:listeningWeak.length||listeningActivities.length?'Có kết quả sai/đến hạn thật':'Giữ nghe trong mỗi buổi; chưa có kết quả không đồng nghĩa nghe tốt.',stop:'Một đoạn: nghe → trả lời → transcript → nghe lại; hết giờ thì dừng, chưa xong tiếp tục buổi sau.'});
    else tasks.push({id:'sound',route:'lesson',lessonId:next?.id,minutes:listen,title:'Nghe và nhắc lại âm trong bài',reason:'Bài đầu có audio chữ/âm; chưa có dữ liệu nghe đánh giá.',stop:'Nghe một nhóm âm và nhắc lại; không tự đánh dấu năng lực nghe.'});
    if(next) tasks.push({id:'main',route:'lesson',lessonId:offset===5 && wrongLesson?wrongLesson.id:next.id,minutes:main,title:offset===5&&wrongLesson?`Bù lỗi · ${wrongLesson.title}`:`${pending?'Tiếp tục':'Học một phần'} · ${next.title}`,reason:pending?`Điểm dừng thật: ${pending[1].step}`:checkpoint?'Đến mốc ôn sau nhóm 5 bài':'Mục chưa hoàn thành; gợi ý này không khóa bài khác.',stop:main<10?'Một nhóm 2–3 từ trong câu hoặc một ví dụ ngữ pháp; dừng tại bước đang học.':'Một mẫu và tự đặt 3 câu, hoặc một đoạn đọc; tiếp tục đúng bước đang mở, không bắt xong cả bài.'});
    if(speak&&next)tasks.push({id:offset===6?'monthly':'speaking',route:'lesson',lessonId:next.id,minutes:speak,title:offset===6?'Tự nói và ghi âm đối chiếu tháng trước':'Tự nói / viết theo vai trong bài',reason:'Bài hiện có cung cấp vai và tiêu chí; đây là tự kiểm, không chấm nói chính thức.',stop:'Nói/viết 2–4 câu trước khi mở mẫu; lưu ghi âm nếu muốn. Nếu chưa có bản tháng trước, chỉ tạo bản đầu.'});
    return {date:dateKey(d),minutes:budget,tasks,plannedRange:[Math.max(5,budget-2),budget+3],continuation:'Ngày sau giữ cùng mục cho đến khi bạn thực sự hoàn thành; lịch tự tính lại từ kết quả đã lưu.'};
  }
  return {phase,learningPhase,examDays,examWindow,preferences:p,phaseGuide,today:daily(0),week:Array.from({length:7},(_,i)=>daily(i)),warnings,due:{words:dueWords.length,questions:dueQuestions.length,weak:weakQuestions.length,listening:listeningWeak.length+listeningActivities.length},nextLessonId:next?.id,completedActivities:Object.keys(completed).length,n3Suggestion:n4Done?'Sau khi tự kiểm N4 và bù các điểm yếu, có thể tự chọn Kanji N3 trong Công cụ. Hoàn thành hoạt động chưa chứng minh vững N4.':'Kanji N3 để sau nền N4; vẫn mở để tự tra cứu, không phải điều kiện học tiếp.',limits:'Ước lượng thời gian là khoảng để chia buổi, không cam kết. Chưa xác minh đủ đề thi mới có giờ; không chuyển tỷ lệ đúng thành điểm JLPT, không dự đoán ngày đỗ.'};
}
