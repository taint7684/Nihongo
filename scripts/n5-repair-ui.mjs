import{fresh,validate,recordAnswer,completeLesson}from '../src/state.js';
// Real local Edge, actual generated WAV playback. AI network is blocked, not evaluated.
import { spawn } from 'node:child_process';
import { existsSync,mkdirSync,readFileSync,writeFileSync,readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import {lessons} from '../src/content.js';
const browser=['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Google/Chrome/Application/chrome.exe'].find(existsSync);
assert(browser,'Chrome/Edge not installed');
const out=resolve('.tmp-ui/n5-repair');mkdirSync(out,{recursive:true});
const profile=resolve(out,'profile-'+Date.now());
const child=spawn(browser,['--headless=new','--disable-gpu','--autoplay-policy=no-user-gesture-required','--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream','--disable-background-networking','--no-first-run','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{windowsHide:true,stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));let socket;const report=[];
try{
 const portFile=resolve(profile,'DevToolsActivePort');for(let n=0;n<100&&!existsSync(portFile);n++)await sleep(100);assert(existsSync(portFile),'Browser startup');
 const port=readFileSync(portFile,'utf8').split('\n')[0];const targets=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();
 socket=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j;});
 let seq=0;const pending=new Map();const errors=[];const calls=[];let fixture='success';
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;const timer=setTimeout(()=>reject(new Error('CDP timeout '+method)),12000);pending.set(id,{resolve,reject,timer});socket.send(JSON.stringify({id,method,params}));});
 socket.onmessage=({data})=>{const m=JSON.parse(data);if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);clearTimeout(p.timer);m.error?p.reject(new Error(m.error.message)):p.resolve(m.result);}if(m.method==='Network.requestWillBeSent'&&m.params.request.url.includes('/ollama/api/chat'))calls.push(m.params.request.url);if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);
 };
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});assert(!r.exceptionDetails,r.exceptionDetails?.exception?.description||r.exceptionDetails?.text);return r.result.value;};
 const wait=async expression=>{for(let n=0;n<600;n++){if(await evaluate(`Boolean(${expression})`))return;await sleep(100);}throw Error('Wait failed: '+expression+'\n'+await evaluate('document.body.innerText.slice(-1500)'));};
 const click=async text=>{assert(await evaluate(`(()=>{const b=[...document.querySelectorAll('button')].find(b=>b.textContent.includes(${JSON.stringify(text)})&&!b.disabled);if(!b)return false;b.click();return true})()`),'Missing button '+text);await sleep(100);};
 const setInput=async (selector,text)=>evaluate(`(()=>{const el=document.querySelector(${JSON.stringify(selector)});Object.getOwnPropertyDescriptor(${selector.includes('textarea')?'HTMLTextAreaElement':'HTMLInputElement'}.prototype,'value').set.call(el,${JSON.stringify(text)});el.dispatchEvent(new Event('input',{bubbles:true}));})()`);




 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Network.setBlockedURLs',{urls:['*/ollama/*','*/audio/tts/index.json']});
 await send('Page.navigate',{url:'http://127.0.0.1:5175/'});await wait('document.body.innerText.includes("Cùng bắt đầu nhé")');
 const seed=fresh();seed.profile={name:'QA sửa N5',minutes:10};seed.route='lesson';seed.lessonId='mnn-01';seed.selectedLessonId='mnn-01';const l1=lessons.find(l=>l.id===seed.lessonId);seed.answers[l1.questions[0].id]={choice:l1.questions[0].answer,correct:true,at:1000};seed.learning.sessions['mnn-01']={step:'grammar-'+(l1.grammar.length-1),finished:[],at:1000,wordIndex:0,aids:[]};
 await evaluate('localStorage.setItem("nihongo:learning:v1",'+JSON.stringify(JSON.stringify(seed))+')');await send('Page.reload');
 await wait('document.body.innerText.includes("Hỏi tuổi có lựa chọn")');await wait('document.body.innerText.includes("Thử tải lại audio")');
 assert.equal(await evaluate('JSON.parse(localStorage.getItem("nihongo:learning:v1")).answers["m01-1"].correct'),true);report.push('AUDIO FAILURE: missing manifest has explicit error/retry; text lesson and old answer remain usable');
 await send('Network.setBlockedURLs',{urls:['*/ollama/*']});await click('Thử tải lại audio');await wait('document.querySelector(".course-audio audio")');
 for(const n of [1,7,14,25]){const l=lessons.find(l=>l.referenceLesson===n),g=l.grammar.at(-1),q=l.questions.find(q=>q.id==='m'+String(n).padStart(2,'0')+'-gap-use');
 if(n!==1){await evaluate('(()=>{const s=JSON.parse(localStorage.getItem("nihongo:learning:v1"));s.route="lesson";s.lessonId='+JSON.stringify(l.id)+';s.selectedLessonId=s.lessonId;s.learning.sessions[s.lessonId]={step:'+JSON.stringify('grammar-'+(l.grammar.length-1))+',finished:[],at:Date.now(),wordIndex:0,aids:[]};localStorage.setItem("nihongo:learning:v1",JSON.stringify(s))})()');await send('Page.reload');}
 await wait('document.body.innerText.includes('+JSON.stringify(g.functionName)+')');await wait('document.querySelector(".course-audio audio")');assert(await evaluate('document.body.innerText.includes('+JSON.stringify(g.example.vi)+')'));await evaluate('document.querySelectorAll(".question .choice")['+q.answer+'].click()');await click('Kiểm tra đáp án');await wait('document.querySelector(".feedback.correct")');assert.equal(await evaluate('JSON.parse(localStorage.getItem("nihongo:learning:v1")).answers['+JSON.stringify(q.id)+'].correct'),true);report.push('CYCLE '+n+': original meaning + example + actual audio file + inline practice, correct response persists');}
 await evaluate('(()=>{const s=JSON.parse(localStorage.getItem("nihongo:learning:v1"));s.route="practice";s.lessonId="n5-assessment-b";s.selectedLessonId=s.lessonId;localStorage.setItem("nihongo:learning:v1",JSON.stringify(s))})()');await send('Page.reload');const b=lessons.find(l=>l.id==='n5-assessment-b'),q=b.questions[0];await wait('document.body.innerText.includes('+JSON.stringify(q.prompt)+')');await evaluate('document.querySelectorAll(".question .choice")['+q.answer+'].click()');await click('Kiểm tra đáp án');await wait('document.querySelector(".feedback.correct")');await send('Page.reload');await wait('document.querySelector(".feedback.correct")');
 const backup=await evaluate('JSON.parse(localStorage.getItem("nihongo:learning:v1"))');assert.deepEqual(backup.completed,{});assert.equal(backup.answers['m01-1'].at,1000);assert.equal(backup.answers[q.id].correct,true);assert.equal(validate(backup).answers[q.id].correct,true);assert(!backup.answers['m02-gap-use']);assert.equal(calls.length,0);assert.deepEqual(errors,[]);report.push('ASSESSMENT B: distinct new question can be answered, feedback/resume/backup validation pass; unstudied lessons unchanged');
 writeFileSync(resolve(out,'report.json'),JSON.stringify({time:new Date().toISOString(),report,errors,ai:'blocked, not evaluated',academic:'not independently reviewed',learner:'QA only, no human learning evidence'},null,2));console.log(JSON.stringify(report,null,2));
}finally{socket?.close();child.kill();}
