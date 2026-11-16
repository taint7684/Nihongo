import {wordUsageId} from './word-identity.js';
import React,{useState} from 'react';
import {AudioReference} from './CourseAudio.jsx';
import {checkedWord} from './word-state.js';
import {normalizeResponse,setSessionStep} from './learning-state.js';

export default function WordWarmup({lesson:l,state,setState}) {
  const index=(state.learning?.sessions?.[l.id]?.wordIndex||0)%l.words.length;
  const w=l.words[index];
  const[recall,setRecall]=useState(false),[text,setText]=useState(''),[result,setResult]=useState(null);

  function next() {
    setState(s=>{
      const n=setSessionStep(s,l.id,'vocabulary');
      n.learning.sessions[l.id].wordIndex=(index+1)%l.words.length;
      return n;
    });
    setRecall(false);
    setText('');
    setResult(null);
  }

  function check() {
    const ok=[w.text,w.reading].some(t=>normalizeResponse(t)===normalizeResponse(text));
    setState(s=>checkedWord(s,w.text,'recall',text,ok,Date.now(),wordUsageId(l.id,w.text)));
    setResult(ok);
  }

  return <section className="card word-warmup">
    <span className="eyebrow">TỪ TRONG TÌNH HUỐNG · {index+1}/{l.words.length}</span>
    <h2>{recall?'Tự nhớ mục từ vừa học':w.text}</h2>
    {!recall
      ? <>
        <p>{w.reading} · {w.meaning}</p>
        <AudioReference kind="word" text={w.text} reading={w.reading}/>
        {w.example&&<>
          <p className="sentence" lang="ja">{w.example.ja}</p>
          <p>{w.example.reading}</p>
          <p>{w.example.vi}</p>
          <AudioReference kind="sentence" text={w.example.ja}/>
        </>}
        <button className="primary" onClick={()=>setRecall(true)}>Che mục từ, thử nhớ lại</button>
      </>
      : <>
        <p>Gõ đúng mục từ đang tập (chữ Nhật hoặc cách đọc): {w.meaning}. Đây là nhớ lại mục cụ thể, không chấm mọi cách dịch đồng nghĩa.</p>
        <label>Câu trả lời<input lang="ja" maxLength={100} value={text} onChange={e=>setText(e.target.value)}/></label>
        <button className="primary" disabled={!text.trim()||result!==null} onClick={check}>Kiểm tra mục từ và lưu ôn</button>
        {result!==null&&<div role="status">
          <strong>{result?'Khớp mục từ.':'Chưa khớp mục từ đang tập.'}</strong>
          <p>{w.text} · {w.reading} · {w.meaning}. {result?'Hẹn ôn theo lịch chung.':'Mục này vào ôn sau 5 phút; không yêu cầu học lại toàn bộ bài.'}</p>
        </div>}
      </>}
    <div className="actions">
      <button className="secondary" onClick={next}>Mục tiếp theo</button>
      <button className="text-button" onClick={()=>setState(s=>({...s,savedWords:[...new Set([...(s.savedWords||[]),w.text])]}))}>{state.savedWords?.includes(w.text)?'Đã lưu bộ cá nhân':'Lưu vào bộ cá nhân'}</button>
    </div>
    <p>Có thể học vài từ rồi tiếp phần sau; vị trí mục từ được lưu. Nhận diện/gõ đúng chưa chứng minh tự dùng trong hội thoại.</p>
  </section>;
}
