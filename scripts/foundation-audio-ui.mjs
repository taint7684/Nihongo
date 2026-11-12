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
const out=resolve('.tmp-ui/foundation-audio');mkdirSync(out,{recursive:true});
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





 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Network.setBlockedURLs',{urls:['*/ollama/*']});await send('Page.navigate',{url:'http://127.0.0.1:5175/'});await wait('document.body.innerText.includes("Cùng bắt đầu nhé")');
 async function openLesson(number){const seed=fresh();seed.profile={name:'QA foundation audio',minutes:30};seed.route='lesson';seed.lessonId='mnn-'+String(number).padStart(2,'0');seed.learning.sessions[seed.lessonId]={step:'grammar-3',finished:[],aids:[],at:Date.now()};await evaluate('localStorage.setItem("nihongo:learning:v1",'+JSON.stringify(JSON.stringify(seed))+')');await send('Page.reload');await wait('document.querySelector(".foundation-table")');}
 async function play(selector){await wait('document.querySelector('+JSON.stringify(selector)+')');return evaluate('(async()=>{const a=document.querySelector('+JSON.stringify(selector)+');await a.play();await new Promise(r=>setTimeout(r,350));const out={src:a.getAttribute("src"),label:a.getAttribute("aria-label"),duration:a.duration,time:a.currentTime,error:a.error?.code||null};a.pause();return out;})()');}
 await openLesson(5);await evaluate('(()=>{const e=document.querySelector(".foundation-table select");e.value="1";e.dispatchEvent(new Event("change",{bubbles:true}));})()');await wait('document.querySelector(".foundation-table h4").textContent.includes("Ngày")');const date=await play('.foundation-table audio[aria-label="Audio 1日 ついたち"]');assert(date.duration>0&&date.time>0&&!date.error);await openLesson(11);await click('Nhóm tiếp theo');const duration=await play('.foundation-table audio[aria-label="Audio 1日 いちにち"]');assert(duration.duration>0&&duration.time>0&&!duration.error);assert.notEqual(date.src,duration.src);report.push({type:'REAL Edge playback: same writing, distinct calendar/duration audio',date,duration,limit:'Not independent phonetic judgement'});await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});assert(await evaluate('document.documentElement.scrollWidth<=window.innerWidth+1'));const saved=await evaluate('JSON.parse(localStorage.getItem("nihongo:learning:v1"))');assert.deepEqual(saved.completed,{});assert.deepEqual(saved.answers,{});report.push('390px no page overflow; merely playing table audio creates no knowledge score or completion.');assert.deepEqual(errors,[]);assert.equal(calls.length,0);writeFileSync(resolve(out,'report.json'),JSON.stringify({at:new Date().toISOString(),report,errors,AI:'blocked',learner:'isolated QA only'},null,2));console.log(JSON.stringify(report,null,2));
}finally{socket?.close();child.kill();}
