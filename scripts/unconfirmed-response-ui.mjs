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
const out=resolve('.tmp-ui/unconfirmed-response');mkdirSync(out,{recursive:true});
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






 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Network.setBlockedURLs',{urls:['*/ollama/*']});
 await send('Page.navigate',{url:process.env.QA_BASE_URL||'http://127.0.0.1:5175/'});await wait('document.body.innerText.includes("Cùng bắt đầu nhé")');
 const q=lessons.find(l=>l.id==='n5-assessment-r1-04').questions.find(q=>q.responseNote);
 const seed=fresh();seed.profile={name:'QA isolated open sentence',minutes:10};seed.route='practice';seed.lessonId='n5-assessment-r1-04';seed.reviews[q.id]={due:Date.now()-1000,streak:2};
 await evaluate('localStorage.setItem("nihongo:learning:v1",'+JSON.stringify(JSON.stringify(seed))+')');await send('Page.reload');
 const section=()=>`[...document.querySelectorAll("section.question")].find(s=>s.querySelector("h2").textContent===${JSON.stringify(q.prompt)})`;
 await wait(section());
 async function type(value){await evaluate(`(()=>{const el=(${section()}).querySelector("input");Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value").set.call(el,${JSON.stringify(value)});el.dispatchEvent(new Event("input",{bubbles:true}));})()`);}
 async function check(){await evaluate(`(()=>{const s=${section()};[...s.querySelectorAll("button")].find(b=>b.textContent.includes("Kiểm tra đáp án")).click();})()`);}
 await type('毎朝六時半に起きています。');await check();await wait('document.body.innerText.includes("Chưa thể xác nhận")');
 let s=await evaluate('JSON.parse(localStorage.getItem("nihongo:learning:v1"))');assert(!s.answers[q.id]);assert.deepEqual(s.reviews,seed.reviews);assert.equal(s.unconfirmedResponses[q.id].status,'unconfirmed');assert.deepEqual(s.completed,{});validate(s);
 await send('Page.reload');await wait(section());assert.equal(await evaluate(`(${section()}).querySelector("input").value`),'毎朝六時半に起きています。');
 await type(q.accepted[0]);await check();await wait('JSON.parse(localStorage.getItem("nihongo:learning:v1")).answers['+JSON.stringify(q.id)+']?.correct===true');
 s=await evaluate('JSON.parse(localStorage.getItem("nihongo:learning:v1"))');assert(!s.unconfirmedResponses[q.id]);validate(s);
 report.push('REAL Edge practice: an unlisted sentence is unconfirmed, retains the previous schedule, creates no error/answer/completion, restores its draft on reload; listed answer can then be checked.');
 s.route='review';s.reviews={[q.id]:{due:Date.now()-1000,streak:2}};await evaluate('localStorage.setItem("nihongo:learning:v1",'+JSON.stringify(JSON.stringify(s))+')');await send('Page.reload');await wait('document.querySelector(".review-area input")');
 await setInput('.review-area input','毎朝六時半に起きています。');await click('Kiểm tra đáp án');await wait('document.body.innerText.includes("Chưa thể xác nhận")');assert.equal(await evaluate('[...document.querySelectorAll(".review-area button")].some(b=>b.textContent.includes("Lưu kết quả ôn"))'),false);
 const pendingState=await evaluate('JSON.parse(localStorage.getItem("nihongo:learning:v1"))');assert.deepEqual(pendingState.reviews,s.reviews);
 await setInput('.review-area input',q.accepted[0]);await click('Kiểm tra đáp án');await click('Lưu kết quả ôn');await wait('!JSON.parse(localStorage.getItem("nihongo:learning:v1")).unconfirmedResponses['+JSON.stringify(q.id)+']');
 report.push('REAL Edge review: unconfirmed response cannot save a wrong grade or change the due date; a later checked response can save the review and clear its pending draft.');
 await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});assert(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'));assert.deepEqual(errors,[]);
 writeFileSync(resolve(out,'report.json'),JSON.stringify({at:new Date().toISOString(),report,errors,AI:'blocked; not a semantic model benchmark',profile:'fresh isolated QA, not learner outcome'},null,2));console.log(JSON.stringify(report,null,2));
}finally{socket?.close();child.kill();}
