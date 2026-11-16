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
const out=resolve('.tmp-ui/kanji-library');mkdirSync(out,{recursive:true});
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





 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Network.setBlockedURLs',{urls:['*/ollama/*']});await send('Page.navigate',{url:'http://127.0.0.1:5175/'});await wait('document.body.innerText.includes("Cùng bắt đầu nhé")');const seed=fresh();seed.profile={name:'QA library',minutes:30};seed.route='tools';seed.lessonId='mnn-27';seed.toolSection='kanji';seed.toolLibrary='kanji-library';await evaluate('localStorage.setItem("nihongo:learning:v1",'+JSON.stringify(JSON.stringify(seed))+')');await send('Page.reload');await wait('document.querySelector(".kanji-library")?.innerText.includes("2999")');await setInput('.kanji-library-controls input','景');await wait('document.querySelector(".kanji-library-detail h3")?.textContent==="景"');assert(await evaluate('document.querySelector(".kanji-library-detail").innerText.includes("Năm lớp độ phủ")'));await click('Xem bộ phân loại');await wait('document.querySelector(".kanji-library-detail").innerText.includes("Tên Unicode")');await setInput('.kanji-library-controls input','214');await evaluate('(()=>{const b=[...document.querySelectorAll(".kanji-library-results button")].find(b=>b.textContent.trim().startsWith("214."));if(!b)throw Error("214 not found");b.click();})()');await wait('document.querySelector(".kanji-library-detail h3").innerText.startsWith("214.")');assert(await evaluate('document.querySelector(".kanji-library-detail").innerText.includes("FLUTE")||document.querySelector(".kanji-library-detail").innerText.includes("flute")'));report.push('REAL: search Kanji, five source/learning layers and reverse radical link; radical214 loads sourced name and example.');await send('Page.reload');await wait('document.querySelector(".kanji-library")');const saved=await evaluate('JSON.parse(localStorage.getItem("nihongo:learning:v1"))');assert.deepEqual(saved.completed,{});assert.deepEqual(saved.answers,{});assert.equal(saved.toolSection,'kanji');assert.equal(saved.toolLibrary,'kanji-library');report.push('REAL reload: v1-compatible library navigation, no invented study/completion.');await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});assert(await evaluate('document.documentElement.scrollWidth<=window.innerWidth+1'));assert.deepEqual(errors,[]);assert.equal(calls.length,0);writeFileSync(resolve(out,'report.json'),JSON.stringify({at:new Date().toISOString(),report,errors,AI:'blocked',learner:'isolated QA only'},null,2));console.log(JSON.stringify(report,null,2));
}finally{socket?.close();child.kill();}
