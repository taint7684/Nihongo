import React,{useEffect,useRef,useState} from 'react';
import {listClips} from './voice-store.js';
import {createVoiceComparison,monthRelation,voiceRubric} from './monthly-voice-state.js';
const emptyRatings=()=>Object.fromEntries(voiceRubric.map(r=>[r.id,{before:'',after:''}]));
const stamp=at=>new Date(at).toLocaleString('vi-VN');
function ClipPlayer({clip,side,onHeard}){
  const [url,setUrl]=useState('');
  useEffect(()=>{const u=URL.createObjectURL(clip.blob);setUrl(u);return()=>URL.revokeObjectURL(u);},[clip]);
  return <div><strong>{side==='before'?'Bản trước':'Bản sau'}: {clip.label}</strong><p>{stamp(clip.at)} · {clip.lessonId||'Tự luyện'}</p><audio aria-label={side==='before'?'Nghe bản trước để đối chiếu':'Nghe bản sau để đối chiếu'} controls src={url} onEnded={()=>onHeard(side)} onError={e=>e.currentTarget.setAttribute('aria-label','Bản ghi chưa phát được; hãy dùng Recorder để tải file và kiểm tra định dạng')}/></div>;
}
export default function MonthlyVoiceReview({state,setState,go}){
  const [open,setOpen]=useState(false),[clips,setClips]=useState([]),[loading,setLoading]=useState(false),[error,setError]=useState(''),[notice,setNotice]=useState('');
  const [beforeId,setBeforeId]=useState(''),[afterId,setAfterId]=useState(''),[situation,setSituation]=useState(''),[confirmed,setConfirmed]=useState(false),[heard,setHeard]=useState({before:false,after:false}),[ratings,setRatings]=useState(emptyRatings),[note,setNote]=useState('');
  const alive=useRef(true),request=useRef(0),saveLock=useRef(false);
  const [saving,setSaving]=useState(false);
  useEffect(()=>{alive.current=true;return()=>{alive.current=false;request.current++;};},[]);
  async function refresh(){const ticket=++request.current;setLoading(true);setError('');try{const items=await listClips();if(alive.current&&ticket===request.current)setClips(items.filter(c=>c.blob instanceof Blob&&c.blob.size&&Number.isFinite(c.at)).sort((a,b)=>a.at-b.at));}catch(e){if(alive.current&&ticket===request.current)setError('Chưa mở được kho ghi âm: '+e.message);}finally{if(alive.current&&ticket===request.current)setLoading(false);}}
  useEffect(()=>{if(open)refresh();else{request.current++;setClips([]);setHeard({before:false,after:false});}},[open]);
  const before=clips.find(c=>c.id===beforeId),after=clips.find(c=>c.id===afterId),pairValid=before&&after&&before.id!==after.id&&before.lessonId===after.lessonId&&before.at<after.at;
  const ratingsReady=voiceRubric.every(r=>['before','after'].every(k=>ratings[r.id][k]!==''));
  const canSave=pairValid&&confirmed&&situation.trim()&&heard.before&&heard.after&&ratingsReady&&!loading&&!saving;
  function changePair(side,id){side==='before'?setBeforeId(id):setAfterId(id);setHeard({before:false,after:false});setRatings(emptyRatings());setConfirmed(false);setNotice('');}
  function record(){setState(s=>({...s,toolSection:'kaiwa',toolLessonId:before?.lessonId?.startsWith('mnn-')?before.lessonId:'mnn-01'}));go('tools');}
  async function save(){
    if(saveLock.current)return;saveLock.current=true;setSaving(true);
    setError('');try{
      // Re-read only after this explicit user action, so deleted clips cannot be saved as a new pair.
      const current=await listClips(),a=current.find(c=>c.id===beforeId),b=current.find(c=>c.id===afterId);
      const normalized=Object.fromEntries(voiceRubric.map(r=>[r.id,Object.fromEntries(['before','after'].map(k=>[k,ratings[r.id][k]==='unobserved'?null:Number(ratings[r.id][k])]))]));
      const entry=createVoiceComparison({before:a,after:b,situation,confirmed,heard,ratings:normalized,note});
      if(!alive.current)return;
      if((state.voiceComparisons||[]).length>=200)throw Error('Đã có 200 bản đối chiếu; xuất backup rồi xóa chủ động nếu cần.');
      setState(s=>({...s,voiceComparisons:[...(s.voiceComparisons||[]),entry]}));setNotice('Đã lưu metadata tự kiểm do bạn chọn; không tạo kết quả nói hay thành tích.');setConfirmed(false);
    }catch(e){if(alive.current)setError('Chưa lưu: '+e.message);}finally{saveLock.current=false;if(alive.current)setSaving(false);}
  }
  return <details className="card monthly-voice-review" onToggle={e=>setOpen(e.currentTarget.open)}><summary>Đối chiếu ghi âm hằng tháng · tự kiểm</summary>{open&&<>
    <p>Chỉ khi bạn mở phần này, ứng dụng mới đọc kho ghi âm trên thiết bị. Không AI/ASR chấm nói, không gửi âm thanh đi. Thang 0–3 là rubric tạm để tự mô tả từng bản, không cộng điểm hay kết luận thành thạo/đỗ JLPT.</p>
    <p>Chọn hai bản cùng bài và cùng loại tình huống: nghe bản trước rồi bản sau, so ý đã nói, phản hồi và mức hỗ trợ. Ưu tiên bản tháng trước với bản tháng này; khác dữ kiện là cơ hội tự kiểm, không phải bằng chứng khả năng nói tự do.</p>
    <div className="actions"><button className="secondary" disabled={loading} onClick={refresh}>Đọc lại kho ghi âm</button><button className="secondary" onClick={record}>Mở Kaiwa / Recorder để ghi bản của tôi</button></div>
    {loading&&<p role="status">Đang đọc kho cục bộ…</p>}{error&&<p role="alert">{error}</p>}{notice&&<p role="status">{notice}</p>}
    {!loading&&clips.length<2&&<p>Chưa có hai bản ghi âm để đối chiếu. Hãy mở Kaiwa, ghi và tự bấm lưu từng bản. Không có bản mẫu giả để thay lịch sử của bạn.</p>}
    {clips.length>=2&&<>
      <label>Bản trước<select aria-label="Chọn bản trước" value={beforeId} onChange={e=>changePair('before',e.target.value)}><option value="">Chọn bản của bạn</option>{clips.map(c=><option key={c.id} value={c.id}>{c.label} · {stamp(c.at)} · {c.lessonId||'Tự luyện'}</option>)}</select></label>
      <label>Bản sau cùng bài<select aria-label="Chọn bản sau" value={afterId} onChange={e=>changePair('after',e.target.value)}><option value="">Chọn bản của bạn</option>{clips.filter(c=>before&&c.id!==before.id&&c.lessonId===before.lessonId&&c.at>before.at).map(c=><option key={c.id} value={c.id}>{c.label} · {stamp(c.at)}</option>)}</select></label>
      {before&&!clips.some(c=>c.lessonId===before.lessonId&&c.at>before.at)&&<p>Chưa có bản sau cùng bài; hãy ghi thêm cùng loại tình huống. Không tự ghép hai loại khác nhau.</p>}
      {pairValid&&<>
        <p>{monthRelation(before.at,after.at)==='previous-calendar-month'?'Hai bản ở hai tháng lịch liền kề: bạn đang đối chiếu với tháng trước của bản sau.':'Đây là hai buổi khác nhau; chưa gọi là đối chiếu với tháng trước.'} Không tự suy tiến bộ từ mốc thời gian.</p>
        <label>Loại tình huống chung<input maxLength={100} value={situation} onChange={e=>setSituation(e.target.value)} placeholder="Ví dụ: giới thiệu bản thân theo vai"/></label>
        <label><input type="checkbox" checked={confirmed} onChange={e=>setConfirmed(e.target.checked)}/> Tôi xác nhận hai bản của tôi cùng loại tình huống; ghi lại mức hỗ trợ thật.</label>
        <ClipPlayer key={'before-'+before.id} clip={before} side="before" onHeard={side=>setHeard(h=>({...h,[side]:true}))}/><ClipPlayer key={'after-'+after.id} clip={after} side="after" onHeard={side=>setHeard(h=>({...h,[side]:true}))}/>
        <p>{heard.before?'Đã phát hết bản trước':'Hãy nghe hết bản trước'} · {heard.after?'Đã phát hết bản sau':'Hãy nghe hết bản sau'}. Phát hết không chứng minh nghe hiểu.</p>
        {heard.before&&heard.after&&<fieldset><legend>Tự mô tả từng bản · không có tổng điểm</legend><p>0: chưa thực hiện được; 1: còn cần hỗ trợ nhiều; 2: thực hiện một phần; 3: tương đối rõ/tự thực hiện. Nếu bản ghi không cho quan sát một tiêu chí, chọn chưa quan sát được; không tự cho điểm nghe/tương tác từ độc thoại.</p>{voiceRubric.map(r=><div className="evidence" key={r.id}><strong>{r.label}</strong><p>{r.help}</p>{['before','after'].map(k=><label key={k}>{k==='before'?'Bản trước':'Bản sau'}<select aria-label={r.id+'-'+k} value={ratings[r.id][k]} onChange={e=>setRatings(v=>({...v,[r.id]:{...v[r.id],[k]:e.target.value}}))}><option value="">Chọn tự kiểm</option><option value="unobserved">Chưa quan sát được trong bản này</option>{[0,1,2,3].map(n=><option key={n} value={String(n)}>{n}</option>)}</select></label>)}</div>)}</fieldset>}
        <label>Điều tôi nhận ra / muốn nhờ người biết tiếng Nhật kiểm<textarea maxLength={2000} value={note} onChange={e=>setNote(e.target.value)}/></label>
        <button className="primary" disabled={!canSave} onClick={save}>Lưu tự kiểm hai bản ghi</button>
      </>}
    </>}
    <h3>Các lần đối chiếu do bạn chủ động lưu</h3>{!(state.voiceComparisons||[]).length&&<p>Chưa có đối chiếu đã lưu.</p>}{(state.voiceComparisons||[]).map(x=><div className="evidence" key={x.id}><strong>{x.situation} · tự kiểm {stamp(x.at)}</strong><p>{x.before.label} ({stamp(x.before.at)}) → {x.after.label} ({stamp(x.after.at)})</p><p>{monthRelation(x.before.at,x.after.at)==='previous-calendar-month'?'Hai tháng lịch liền kề theo metadata.':'Đối chiếu hai buổi theo metadata.'} {(!clips.some(c=>c.id===x.before.id)||!clips.some(c=>c.id===x.after.id))&&'Một hoặc cả hai file âm thanh chưa có trong kho này; metadata không khôi phục âm thanh.'}</p>{voiceRubric.map(r=><p key={r.id}>{r.label}: {x.ratings[r.id].before??'chưa quan sát'} → {x.ratings[r.id].after??'chưa quan sát'}</p>)}{x.note&&<p>{x.note}</p>}<button className="text-button" onClick={()=>setState(s=>({...s,voiceComparisons:(s.voiceComparisons||[]).filter(v=>v.id!==x.id)}))}>Xóa metadata đối chiếu này</button></div>)}
    <p>Backup tiến độ giữ metadata tự kiểm; file âm thanh Blob vẫn phải xuất riêng trong Recorder. Xóa metadata không xóa audio. Metadata nhập từ backup là tự báo cáo, chưa xác minh file hay năng lực nói.</p>
  </>}</details>;
}
