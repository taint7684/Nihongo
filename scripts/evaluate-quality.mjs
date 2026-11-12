import fs from 'node:fs';import{generateCandidate}from'../src/ai.js';import{lessons}from'../src/content.js';
const native=globalThis.fetch;let metrics;globalThis.fetch=async(url,o)=>{const r=await native(url.startsWith('/')?'http://127.0.0.1:5175'+url:url,o);try{metrics=await r.clone().json()}catch{}return r};
const tests=[
{mode:'writing',text:'Chữa câu 学生ではありません。 Không có ý định khác.',expected:'Câu vốn đúng; giữ phủ định, hỏi ý định nếu cần.'},
{mode:'writing',text:'Chữa câu 学生です。',expected:'Câu vốn đúng; không bắt thay đổi.'},
{mode:'writing',text:'Tôi muốn nói mình là học sinh nhưng viết 学生ではありません。',expected:'Khác ý định, đổi sang 学生です có giải thích thay nghĩa, không nói câu gốc sai cấu trúc.'},
{mode:'writing',text:'Tôi muốn nói mình không phải học sinh. 学生ではありません。',expected:'Giữ nguyên phủ định.'},
{mode:'writing',text:'学生じゃありません。 và 学生ではありません。 có thể đều đúng không?',expected:'Hai cách phủ định có thể hợp lệ; xét văn phong.'},
{mode:'reading',text:'アンです。 trong tình huống tự giới thiệu nghĩa là gì?',expected:'Tôi là An, không bịa quy tắc cấm dùng riêng tư.'},
{mode:'kaiwa',text:'Xin chào, bắt đầu cuộc trò chuyện.',turn:'greet'},
{mode:'kaiwa',text:'Tôi là An. アンです。',turn:'acknowledge'},
{mode:'kaiwa',text:'Tôi chưa nghe rõ, xin nhắc lại.',turn:'repeat'},
{mode:'kaiwa',text:'Hãy hỏi tên của tôi.',turn:'askName'}];
const models=process.argv.includes('--both')?['qwen3:1.7b','qwen3:4b']:['qwen3:4b'];const results=[];for(const model of models){await native('http://127.0.0.1:11434/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:model==='qwen3:4b'?'qwen3:1.7b':'qwen3:4b',keep_alive:0})});for(const t of tests){const start=performance.now();try{const answer=await generateCandidate({model,messages:[{role:'user',content:t.text}],lesson:lessons.find(l=>l.id==='n5-intro'),mode:t.mode,signal:AbortSignal.timeout(60000)});let selected;try{selected=JSON.parse(answer).turnId}catch{}results.push({...t,model,answer,wallMs:Math.round(performance.now()-start),loadMs:metrics?.load_duration/1e6,...(t.turn?{pass:selected===t.turn}:{review:'manual source comparison required'})});console.log(model,t.mode,results.at(-1).wallMs,selected||'text');}catch(e){results.push({...t,model,error:e.name});console.log(model,t.mode,e.name)}fs.writeFileSync('.tmp-ui/quality-evaluation.json',JSON.stringify({time:new Date().toISOString(),source:'TUFS Nです / Nではありません; tests authored for project',scope:'small representative set, no universal accuracy claim',results},null,2));}}
