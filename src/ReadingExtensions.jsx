import React,{useMemo,useState}from 'react';
import Question from './Exercise.jsx';
import{recordAnswer}from './state.js';
import{lessons}from './content.js';
import{recordSessionAid}from './learning-state.js';
function Passage({item,lesson,state,setState}){
 const[furigana,setFurigana]=useState(false),[meaning,setMeaning]=useState(false),[lookup,setLookup]=useState(null);
 const pool=useMemo(()=>{const base=lessons.filter(l=>l.referenceLesson&&l.referenceLesson<=lesson.referenceLesson).flatMap(l=>l.words||[]);return [...new Map([...base,...item.glossary].map(w=>[w.text,{...w,meaning:w.meaning||w.vi}])).values()].sort((a,b)=>b.text.length-a.text.length);},[lesson.referenceLesson,item]);
 const parts=useMemo(()=>{const out=[];for(let i=0;i<item.text.length;){const w=pool.find(w=>item.text.startsWith(w.text,i));if(w){out.push({text:w.text,w});i+=w.text.length;}else out.push({text:item.text[i++]});}return out;},[item,pool]);
 function aid(){setState(s=>recordSessionAid(s,lesson.id,'reading','read-write'));}
 return <details className="card reading-extension"><summary>{item.title} · {[...item.text].length} ký tự · đọc mở rộng</summary>
 <p>Đọc để hiểu mục đích, dữ kiện và điều chưa được nói. Đây là bài luyện có hỗ trợ, không phải đề đánh giá độc lập. Chưa có audio riêng cho đoạn này.</p>
 <label><input type="checkbox" checked={furigana} onChange={e=>{setFurigana(e.target.checked);if(e.target.checked)aid();}}/> Hiện cách đọc từ đã có nguồn/chú giải</label>
 <p className="sentence" lang="ja">{parts.map((p,i)=>p.w?<button key={i} className="inline-word" onClick={()=>{setLookup(p.w);aid();}}>{furigana?<ruby>{p.text}<rt>{p.w.reading}</rt></ruby>:p.text}</button>:<span key={i}>{p.text}</span>)}</p>
 {lookup&&<aside className="notice"><strong>{lookup.text} · {lookup.reading}</strong><p>{lookup.meaning}</p>{lessons.some(l=>l.words?.some(w=>w.text===lookup.text))?<button className="secondary" onClick={()=>setState(s=>({...s,savedWords:[...new Set([...(s.savedWords||[]),lookup.text])]}))}>Lưu từ vào bộ chung</button>:<p>Từ hỗ trợ của đoạn, chưa có mục flashcard riêng; không giả đã có học liệu đủ.</p>}</aside>}
 <details onToggle={e=>{if(e.currentTarget.open)aid();}}><summary>Từ/cụm hỗ trợ khi cần</summary>{item.glossary.map(g=><p key={g.text}><strong>{g.text}</strong> · {g.reading} · {g.vi}</p>)}</details>
 <button className="secondary" onClick={()=>{if(!meaning)aid();setMeaning(v=>!v);}}>Bật/tắt nghĩa hỗ trợ của đoạn</button>{meaning&&<p className="notice">{item.vi}</p>}
 {item.questions.map(q=><Question key={q.id} question={q} number="ĐỌC HIỂU" saved={state.answers[q.id]} onAnswer={choice=>setState(s=>recordAnswer(s,q,choice))}/>)}
 <small>Đoạn tự soạn, đã rà nội bộ; chưa duyệt học thuật độc lập. Mở nghĩa/cách đọc là có hỗ trợ; trả lời đúng ở đây không chứng minh đọc độc lập hoặc đủ N4.</small>
 </details>;
}
export default function ReadingExtensions({lesson,state,setState}){return (lesson.readingExtensions||[]).map(item=><Passage key={item.id} item={item} lesson={lesson} state={state} setState={setState}/>);}
