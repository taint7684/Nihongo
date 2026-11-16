// QA-only candidate benchmark. Does not import the production chat route or publish model text.
// Freeze cases before the first call; do not tune prompts to these held-out answers.
import fs from 'node:fs';
import crypto from 'node:crypto';
import {lessons} from '../src/content.js';
const base='http://127.0.0.1:11434',model='qwen3:4b';
const output='evaluation/g11-heldout-ai-raw.json';
if(fs.existsSync(output))throw Error('Raw benchmark already exists. Preserve it before any explicitly authorized new run; no silent overwrite or automatic retries.');
const sourcePacks=Object.fromEntries(['mnn-01','mnn-13','mnn-24'].map(id=>{
  const l=lessons.find(l=>l.id===id), selected=id==='mnn-01'?l.grammar.slice(0,2):id==='mnn-13'?l.grammar.slice(0,2):l.grammar.slice(1);
  return [id,{lessonId:id,rules:selected.map((g,i)=>({id:id+'-rule-'+i,pattern:g.pattern,explanation:g.explanation,pitfall:g.pitfall,example:g.example,sources:g.sourceReview?.sources||[]}))}];
}));
const cases=[
  {id:'heldout-explain-01',group:'short-explanation',lessonId:'mnn-01',question:'Người mới học hỏi: trong わたしは先生ではありません。 phần nào cho biết không phải giáo viên? Giải thích tối đa hai câu tiếng Việt; giữ nguyên ví dụ.',expectedVi:'Phủ định ở ではありません; câu có nghĩa không phải giáo viên, không đảo sang giáo viên.'},
  {id:'heldout-explain-13',group:'short-explanation',lessonId:'mnn-13',question:'Tôi phân vân 新しい辞書が欲しいです。 và 本を読みたいです。 Khác nhau giữa muốn có và muốn làm ở hai câu này là gì? Chỉ hai câu ngắn, không suy mong muốn người thứ ba.',expectedVi:'欲しい muốn có vật, たい muốn làm hành động; không gán mong muốn người thứ ba.'},
  {id:'heldout-writing-correct-01',group:'meaning-preserving-writing',lessonId:'mnn-01',question:'Ý của tôi là tôi là giáo viên. Tôi viết わたしは先生です。 Hãy kiểm tra và giữ nguyên nếu đúng. Ngoài ra, hãy dạy cách dùng おっしゃいます khi xin việc; nếu nguồn bài chưa có thì nói chưa đủ căn cứ ở outOfScopeVi, đừng tự dạy.',expectedVi:'decision=keep, answerJa giữ câu đúng; phần ngoài nguồn từ chối rõ, không bịa kính ngữ.'},
  {id:'heldout-writing-negative-13',group:'meaning-preserving-writing',lessonId:'mnn-13',question:'Ý của tôi: hôm nay tôi không muốn đọc sách. Phần câu muốn kiểm là 本を読みたくないです。 Đừng thêm hôm nay vào câu, chỉ kiểm phần đã viết. Cần đổi thành 本を読みたいです。 mới đúng không? Nếu câu đang đúng thì giữ nguyên.',expectedVi:'Giữ phủ định 本を読みたくないです; bác đề nghị đổi thành muốn đọc; không sửa câu vốn đúng.'},
  {id:'heldout-dialogue-24-turn-1',group:'two-turn-followup',lessonId:'mnn-24',turn:1,question:'Trong わたしはハナさんに日本語を教えてもらいました。 ai dạy ai? Giải thích ngắn theo nguồn, rồi chỉ một câu cùng việc kể từ Hana.',expectedVi:'Hana dạy tôi; equivalent ハナさんが日本語を教えてくれました, không tôi dạy Hana.'},
  {id:'heldout-dialogue-24-turn-2',group:'two-turn-followup',lessonId:'mnn-24',turn:2,question:'Tôi hiểu vậy nên đổi thành わたしはハナさんに日本語を教えてあげました。 để vẫn kể Hana dạy tôi, được chứ? Hãy trả lời dựa trên chính lượt trước, nói ai thực sự dạy ai trong câu tôi vừa viết; đừng đảo ý muốn của tôi.',expectedVi:'Không giữ cùng việc: câu mới nói tôi dạy Hana; để giữ Hana dạy tôi giữ てもらいました hoặc chủ thể Hana+てくれました.'},
];
const schema={type:'object',properties:{decision:{type:'string',enum:['explain','keep','clarify','limit']},explanationVi:{type:'string'},answerJa:{type:'string'},outOfScopeVi:{type:'string'},sourceIds:{type:'array',items:{type:'string'}}},required:['decision','explanationVi','answerJa','outOfScopeVi','sourceIds'],additionalProperties:false};
const system='Bạn là trợ giảng Việt–Nhật trong thử nghiệm QA. Chỉ dùng source pack; không dùng kiến thức ngoài pack. Giữ ý người học và khẳng định/phủ định. Nếu câu đúng: decision=keep, không sửa. Khi người học hiểu sai, giải thích ngắn và giữ rõ ai làm cho ai. Với phần hỏi ngoài pack: ghi thiếu căn cứ vào outOfScopeVi, không tự dạy. Trả JSON đúng schema, tối đa hai câu ngắn trong explanationVi; answerJa giữ ví dụ cần thiết hoặc để rỗng, sourceIds chỉ mã rule có trong pack. Không viết suy luận ẩn. /no_think';
const frozen={cases,sourcePacks,system,schema};
const hash=crypto.createHash('sha256').update(JSON.stringify(frozen)).digest('hex');
const tags=await(await fetch(base+'/api/tags',{signal:AbortSignal.timeout(5000)})).json();
if(!tags.models?.some(m=>m.name===model))throw Error('Existing 4B unavailable; no download/model substitution permitted');
const records=[];let stopReason=null;
const save=()=>fs.writeFileSync(output,JSON.stringify({startedAt,updatedAt:new Date().toISOString(),model,design:'6 frozen held-out cases x 3 repeats = at most 18 real requests; two dialogue turns counted separately',promptHash:hash,qaOnly:true,uiApproved:false,...frozen,records,stopReason,semanticReview:'pending manual review of every real response; JSON validity alone is insufficient'},null,2));
const startedAt=new Date().toISOString();save();
outer:for(let repeat=1;repeat<=3;repeat++){
  let dialogue=[];
  for(const c of cases){
    const source=sourcePacks[c.lessonId],messages=[{role:'system',content:system+'\nSOURCE PACK:\n'+JSON.stringify(source)},...(c.turn===2?dialogue:[]),{role:'user',content:c.question}];
    const start=performance.now();let record={id:c.id,group:c.group,repeat,lessonId:c.lessonId,turn:c.turn||null,sourceHash:crypto.createHash('sha256').update(JSON.stringify(source)).digest('hex'),messages};
    try{
      const response=await fetch(base+'/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(75000),body:JSON.stringify({model,stream:false,think:false,format:schema,messages,options:{num_gpu:0,num_ctx:4096,num_predict:320,temperature:0.2,seed:7200+repeat}})});
      const raw=await response.json();let parsed=null;try{parsed=JSON.parse(raw.message?.content||'');}catch{}
      const ids=new Set(source.rules.map(r=>r.id));
      record={...record,ms:Math.round(performance.now()-start),httpStatus:response.status,raw,parsed,sourceChecks:{returnedIdsKnown:Array.isArray(parsed?.sourceIds)&&parsed.sourceIds.length>0&&parsed.sourceIds.every(id=>ids.has(id)),sourceUrls:source.rules.flatMap(r=>r.sources),japaneseMeaning:'requires manual source/role/negation review'},syntaxPass:Boolean(parsed&&typeof parsed.explanationVi==='string'&&typeof parsed.answerJa==='string'),manualMeaningReview:null};
      if(c.turn===1)dialogue=[{role:'user',content:c.question},{role:'assistant',content:raw.message?.content||''}];
    }catch(error){record={...record,ms:Math.round(performance.now()-start),error:{name:error.name,message:error.message},manualMeaningReview:null};}
    records.push(record);save();console.log(JSON.stringify({id:c.id,repeat,ms:record.ms,syntaxPass:record.syntaxPass,error:record.error?.name,content:record.raw?.message?.content}));
    if(record.error){stopReason='A real request failed/timed out; stop for review instead of a batch of retries.';save();break outer;}
    if(records.length>=6&&records.slice(-6).every(r=>r.ms>45000)){stopReason='Six consecutive responses exceeded 45s; stop to review latency before further requests.';save();break outer;}
  }
}
const resource=await(await fetch(base+'/api/ps',{signal:AbortSignal.timeout(5000)})).json();
fs.writeFileSync('evaluation/g11-heldout-ai-runtime.json',JSON.stringify({at:new Date().toISOString(),models:tags,loaded:resource,ownedServerPid:21112,warning:'api/ps size is not peak process RAM; no hardware-performance generalization'},null,2));
