export const voiceRubric = [
  {id:'purpose',label:'Hoàn thành mục đích',help:'Có nói đủ ý và giữ đúng vai/tình huống không?'},
  {id:'listening',label:'Nghe hiểu',help:'Có hiểu lời hỏi và phản hồi đúng điều được hỏi không? Nếu bản chỉ độc thoại, chọn chưa quan sát được.'},
  {id:'interaction',label:'Tương tác',help:'Có đáp lời, hỏi tiếp hoặc xác nhận phù hợp không? Độc thoại chưa chứng minh tương tác.'},
  {id:'clarity',label:'Dễ hiểu',help:'Khi tự nghe lại, ý chính có rõ không? Đây không phải chấm phát âm độc lập.'},
  {id:'accuracy',label:'Chính xác phù hợp',help:'Từ/cấu trúc có giữ ý và phù hợp tình huống không? Chưa chắc thì ghi điều cần nhờ người biết tiếng Nhật kiểm.'},
  {id:'repair',label:'Xử lý khi không hiểu',help:'Có xin nhắc lại, nói chậm, xác nhận hoặc tự sửa không? Nếu không xuất hiện, chọn chưa quan sát được.'},
  {id:'support',label:'Mức hỗ trợ',help:'0: đọc theo mẫu; 1: cần gợi ý nhiều; 2: cần gợi ý ít; 3: tự nói không mở mẫu. Tự báo cáo, không suy từ audio.'},
];
const validAt=n=>Number.isFinite(n)&&n>0&&n<=8640000000000000;
const clipRef=c=>({id:c.id,lessonId:c.lessonId,label:c.label,at:c.at});
function checkedRef(c){if(!c||typeof c.id!=='string'||!/^[a-zA-Z0-9-]{1,80}$/.test(c.id)||typeof c.lessonId!=='string'||c.lessonId.length>100||typeof c.label!=='string'||c.label.length>100||!validAt(c.at))throw Error('Thông tin bản ghi đối chiếu không hợp lệ.');return clipRef(c);}
export function monthRelation(beforeAt,afterAt){const a=new Date(beforeAt),b=new Date(afterAt);return b.getFullYear()*12+b.getMonth()-(a.getFullYear()*12+a.getMonth())===1?'previous-calendar-month':'two-sessions';}
export function validateVoiceComparison(x){
  if(!x||typeof x.id!=='string'||!/^[a-zA-Z0-9-]{1,80}$/.test(x.id)||!validAt(x.at)||x.kind!=='self-comparison'||x.sameSituationConfirmed!==true||x.listenedToBoth!==true||typeof x.situation!=='string'||!x.situation.trim()||x.situation.length>100||typeof x.note!=='string'||x.note.length>2000)throw Error('Đối chiếu ghi âm tự kiểm không hợp lệ.');
  const before=checkedRef(x.before),after=checkedRef(x.after);
  if(before.id===after.id||before.at>=after.at||before.lessonId!==after.lessonId)throw Error('Chọn hai bản khác nhau, cùng bài/loại, theo thứ tự thời gian.');
  if(!x.ratings||typeof x.ratings!=='object'||Array.isArray(x.ratings))throw Error('Thiếu bảng tự kiểm.');
  const ratings=Object.fromEntries(voiceRubric.map(({id})=>{const v=x.ratings[id];if(!v||!['before','after'].every(k=>v[k]===null||Number.isInteger(v[k])&&v[k]>=0&&v[k]<=3))throw Error('Mức tự kiểm phải là 0–3 hoặc chưa quan sát được.');return[id,{before:v.before,after:v.after}];}));
  return {id:x.id,at:x.at,kind:x.kind,before,after,situation:x.situation.trim(),sameSituationConfirmed:true,listenedToBoth:true,ratings,note:x.note};
}
export function validateVoiceComparisons(value,result){if(value.voiceComparisons===undefined)return;if(!Array.isArray(value.voiceComparisons)||value.voiceComparisons.length>200)throw Error('Nhật ký đối chiếu ghi âm không hợp lệ.');const ids=new Set();result.voiceComparisons=value.voiceComparisons.map(x=>{const v=validateVoiceComparison(x);if(ids.has(v.id))throw Error('Trùng ID đối chiếu ghi âm.');ids.add(v.id);return v;});}
export function createVoiceComparison({before,after,situation,confirmed,heard,ratings,note},now=Date.now(),id=crypto.randomUUID()){
  if(!(before?.blob instanceof Blob)||!before.blob.size||!(after?.blob instanceof Blob)||!after.blob.size)throw Error('Cần hai bản âm thanh đang có trong kho cục bộ.');
  return validateVoiceComparison({id,at:now,kind:'self-comparison',before:clipRef(before),after:clipRef(after),situation,sameSituationConfirmed:confirmed,listenedToBoth:heard?.before===true&&heard?.after===true,ratings,note});
}
