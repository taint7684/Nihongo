import{getWordReview}from '../src/word-identity.js';
import{fresh,validate,recordAnswer,completeLesson}from '../src/state.js';
// Real local Edge, actual generated WAV playback. AI network is blocked, not evaluated.
import { spawn } from 'node:child_process';
import { existsSync,mkdirSync,readFileSync,writeFileSync,readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import {lessons} from '../src/content.js';
const browser=['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Google/Chrome/Application/chrome.exe'].find(existsSync);
assert(browser,'Chrome/Edge not installed');
const out=resolve('.tmp-ui/content-batch-ee8');mkdirSync(out,{recursive:true});
const profile=resolve(out,'profile-'+Date.now());
const child=spawn(browser,['--headless=new','--disable-gpu','--autoplay-policy=no-user-gesture-required','--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream','--disable-background-networking','--no-first-run','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{windowsHide:true,stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));let socket;const report=[];
try{
 const portFile=resolve(profile,'DevToolsActivePort');for(let n=0;n<100&&!existsSync(portFile);n++)await sleep(100);assert(existsSync(portFile),'Browser startup');
 const port=readFileSync(portFile,'utf8').split('\n')[0];const targets=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();
 socket=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j;});
 let seq=0;const pending=new Map();const errors=[];const calls=[];let fixture='success';
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;const timer=setTimeout(()=>reject(new Error('CDP timeout '+method)),30000);pending.set(id,{resolve,reject,timer});socket.send(JSON.stringify({id,method,params}));});
 socket.onmessage=({data})=>{const m=JSON.parse(data);if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);clearTimeout(p.timer);m.error?p.reject(new Error(m.error.message)):p.resolve(m.result);}if(m.method==='Network.requestWillBeSent'&&m.params.request.url.includes('/ollama/api/chat'))calls.push(m.params.request.url);if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);
 };
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});assert(!r.exceptionDetails,r.exceptionDetails?.exception?.description||r.exceptionDetails?.text);return r.result.value;};
 const wait=async expression=>{for(let n=0;n<600;n++){if(await evaluate(`Boolean(${expression})`))return;await sleep(100);}console.log('Runtime exceptions:',errors);throw Error('Wait failed: '+expression+'\n'+await evaluate('document.body.innerText.slice(-1500)'));};
 const click=async text=>{assert(await evaluate(`(()=>{const b=[...document.querySelectorAll('button')].find(b=>b.textContent.includes(${JSON.stringify(text)})&&!b.disabled);if(!b)return false;b.click();return true})()`),'Missing button '+text);await sleep(100);};
 const setInput=async (selector,text)=>evaluate(`(()=>{const el=document.querySelector(${JSON.stringify(selector)});Object.getOwnPropertyDescriptor(${selector.includes('textarea')?'HTMLTextAreaElement':'HTMLInputElement'}.prototype,'value').set.call(el,${JSON.stringify(text)});el.dispatchEvent(new Event('input',{bubbles:true}));})()`);







 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Network.setBlockedURLs',{urls:['*/ollama/*']});await send('Browser.setDownloadBehavior',{behavior:'allow',downloadPath:out});
 await send('Page.navigate',{url:process.env.QA_BASE_URL||'http://127.0.0.1:5189/'});await wait('document.body.innerText.includes("Cùng bắt đầu nhé")');
 const expectedAnswerCount=15+[3,4,5,6,7,8,9,10].flatMap(n=>lessons.find(l=>l.id==='n5-assessment-r1-'+String(n).padStart(2,'0')).questions.filter(q=>q.id.includes('-context-b-')||q.id.includes('-context-c-'))).length;
 let qa=fresh();qa.profile={name:'QA reading and meaning',minutes:10};
 async function restore(){await evaluate('localStorage.setItem("nihongo:learning:v1",'+JSON.stringify(JSON.stringify(qa))+')');await send('Page.reload');}
 for(const n of [26,27,28,29,30]){
  const l=lessons.find(l=>l.referenceLesson===n),block=l.readingExtensions[0];qa.route='tools';qa.lessonId=l.id;qa.toolSection='reading';qa.toolLessonId=l.id;await restore();
  await wait('document.querySelector(".reading-extension")');await evaluate('document.querySelector(".reading-extension").open=true');
  assert(await evaluate('document.querySelector(".reading-extension").innerText.includes('+JSON.stringify(block.text)+')'));
  await evaluate('document.querySelector(".reading-extension input[type=checkbox]").click()');await wait('document.querySelector(".reading-extension ruby")');
  for(const q of block.questions){await evaluate(`(()=>{const s=[...document.querySelectorAll(".reading-extension .question")].find(s=>s.querySelector("h2").textContent===${JSON.stringify(q.prompt)});s.querySelectorAll("button.choice")[${q.answer}].click();})()`);await evaluate(`(()=>{const s=[...document.querySelectorAll(".reading-extension .question")].find(s=>s.querySelector("h2").textContent===${JSON.stringify(q.prompt)});[...s.querySelectorAll("button")].find(b=>b.textContent.includes("Kiểm tra đáp án")).click();})()`);await wait('JSON.parse(localStorage.getItem("nihongo:learning:v1")).answers['+JSON.stringify(q.id)+']?.correct===true');}
  qa=await evaluate('JSON.parse(localStorage.getItem("nihongo:learning:v1"))');validate(qa);assert(qa.learning.sessions[l.id].aids.includes('reading'));
 }
 report.push('REAL Edge: all 5 N4 extended readings open in tools with glosses/optional ruby; all 15 questions can be answered and explanations saved, reading help recorded separately. Text-only, no invented audio or independent assessment.');
 for(const n of [3,4,5,6,7,8,9,10]){
  const l=lessons.find(l=>l.id==='n5-assessment-r1-'+String(n).padStart(2,'0'));qa.route='practice';qa.lessonId=l.id;await restore();await wait('document.querySelectorAll(".question").length==='+l.questions.length);
  for(const q of l.questions.filter(q=>q.id.includes('-context-b-')||q.id.includes('-context-c-'))){const wrong=(q.answer+1)%q.choices.length;await evaluate(`(()=>{const s=[...document.querySelectorAll(".question")].find(s=>s.querySelector("h2").textContent===${JSON.stringify(q.prompt)});s.querySelectorAll("button.choice")[${wrong}].click();})()`);await evaluate(`(()=>{const s=[...document.querySelectorAll(".question")].find(s=>s.querySelector("h2").textContent===${JSON.stringify(q.prompt)});[...s.querySelectorAll("button")].find(b=>b.textContent.includes("Kiểm tra đáp án")).click();})()`);await wait('JSON.parse(localStorage.getItem("nihongo:learning:v1")).answers['+JSON.stringify(q.id)+']?.correct===false');const ev=await evaluate('JSON.parse(localStorage.getItem("nihongo:learning:v1")).wordEvidence['+JSON.stringify(q.wordKey)+'].at(-1)');assert.equal(ev.kind,'meaning');assert.equal(ev.usageId,q.usageId);}
  qa=await evaluate('JSON.parse(localStorage.getItem("nihongo:learning:v1"))');validate(qa);
 }
 assert.deepEqual(qa.completed,{});assert.equal(Object.keys(qa.answers).length,expectedAnswerCount);await send('Page.reload');await wait('document.querySelector(".question")');assert.equal(await evaluate('Object.keys(JSON.parse(localStorage.getItem("nihongo:learning:v1")).answers).length'),expectedAnswerCount);
 await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});assert(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'));
 await click('Cài đặt');const previousDownloads=new Set(readdirSync(out));await click('Xuất bản sao lưu');let file;for(let i=0;i<50;i++){file=readdirSync(out).filter(f=>/^la-ban-nhat-ngu.*.json$/.test(f)&&!previousDownloads.has(f)).sort().at(-1);if(file)break;await sleep(100);}assert(file);const backup=validate(JSON.parse(readFileSync(resolve(out,file),'utf8')));assert.equal(Object.keys(backup.answers).length,expectedAnswerCount);assert.deepEqual(backup.completed,{});
 report.push('REAL Edge: all 43 new N5 context checks accept actual wrong choices, explain and schedule common word meaning evidence; reload and downloaded backup retain all 58 actual QA answers, no invented completions; mobile390 no overflow.');
 assert.deepEqual(errors,[]);writeFileSync(resolve(out,'report.json'),JSON.stringify({at:new Date().toISOString(),report,errors,profile:'isolated QA, not real learner outcomes',AI:'blocked'},null,2));console.log(JSON.stringify(report,null,2));
}finally{socket?.close();child.kill();}
