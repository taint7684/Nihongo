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
const out=resolve('.tmp-ui/placement-audio-ee8');mkdirSync(out,{recursive:true});
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







 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Network.setBlockedURLs',{urls:['*/ollama/*']});await send('Page.navigate',{url:'http://127.0.0.1:5189/'});await wait('document.body.innerText.includes("Cùng bắt đầu nhé")');
 const index=JSON.parse(readFileSync('public/audio/tts/index.json','utf8'));let count=0;
 for(const n of [2,5,6])for(const w of lessons.find(l=>l.referenceLesson===n).words.filter(w=>w.sourceReuse)){
  for(const[kind,text,reading]of [['word',w.text,w.reading],['sentence',w.example.ja,undefined]]){
   const a=index.find(a=>!a.retired&&a.kind===kind&&a.text===text&&(!reading||a.reading===reading));assert(a,'Missing indexed asset '+text);assert(existsSync('public'+a.path));
   await evaluate(`(async()=>{const a=document.createElement("audio");a.src=${JSON.stringify(a.path)};a.controls=true;document.body.append(a);await new Promise((r,j)=>{a.addEventListener("ended",r,{once:true});a.addEventListener("error",()=>j(Error("Audio decode error")),{once:true});a.play().catch(j);});a.remove();})()`);count++;
  }
 }
 assert.equal(count,14);assert.deepEqual(errors,[]);report.push('REAL Edge HTML audio: all 7 reused word clips and 7 newly generated sentence clips fetch/decode/play to end. Reading-plan comparison is separate; this is NOT independent phonetic approval.');
 writeFileSync(resolve(out,'report.json'),JSON.stringify({at:new Date().toISOString(),report,errors,clips:count,source:'Existing local VOICEVOX; no download or paid API',learner:'fresh QA, no learner data'},null,2));console.log(JSON.stringify(report,null,2));
}finally{socket?.close();child.kill();}
