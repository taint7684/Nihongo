import{fresh,validate,recordAnswer,completeLesson}from '../src/state.js';
// Real local Edge, actual generated WAV playback. AI network is blocked, not evaluated.
import { spawn } from 'node:child_process';
import { existsSync,mkdirSync,readFileSync,writeFileSync,readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import {lessons} from '../src/content.js';
const browser=['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Google/Chrome/Application/chrome.exe'].find(existsSync);
assert(browser,'Chrome/Edge not installed');
const out=resolve('.tmp-ui/listening-formats');mkdirSync(out,{recursive:true});
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





 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Network.setBlockedURLs',{urls:['*/ollama/*']});await send('Page.navigate',{url:'http://127.0.0.1:5175/'});await wait('document.body.innerText.includes(\'Cùng bắt đầu nhé\')');const seed=fresh();seed.profile={name:'QA nghe lựa chọn',minutes:10};seed.route='lesson';seed.lessonId='n5-assessment-format-a';seed.selectedLessonId=seed.lessonId;await evaluate('localStorage.setItem(\'nihongo:learning:v1\','+JSON.stringify(JSON.stringify(seed))+')');await send('Page.reload');
 const l=lessons.find(l=>l.id===seed.lessonId);for(const t of l.listeningTasks.filter(t=>t.kind==='audio-choice')){const root='.audio-choice-task[data-listening='+t.id+']';await wait('document.querySelector('+JSON.stringify(root+' audio')+')');assert(!(await evaluate('document.querySelector('+JSON.stringify(root)+').innerText')).includes(t.options[0].text));const count=await evaluate('document.querySelectorAll('+JSON.stringify(root+' audio')+').length');assert.equal(count,t.options.length+(t.promptAudio?1:0));assert(await evaluate('[...document.querySelector('+JSON.stringify(root)+').querySelectorAll(\'button\')].find(b=>b.textContent===\'Lưu lựa chọn nghe\').disabled'));
 for(let i=0;i<count;i++){const sel=root+' audio';await evaluate('document.querySelectorAll('+JSON.stringify(sel)+')['+i+'].play()');await wait('document.querySelectorAll('+JSON.stringify(sel)+')['+i+'].ended');if(i===0)assert(await evaluate('[...document.querySelector('+JSON.stringify(root)+').querySelectorAll(\'button\')].find(b=>b.textContent===\'Lưu lựa chọn nghe\').disabled'));}
 const useHelp=Boolean(t.promptAudio);if(useHelp)await evaluate('[...document.querySelector('+JSON.stringify(root)+').querySelectorAll(\'button\')].find(b=>b.textContent.includes(\'Cần chữ\')).click()');const q=t.questions[0],choice=useHelp?q.answer:(q.answer+1)%3;await evaluate('document.querySelectorAll('+JSON.stringify(root+' fieldset input')+')['+choice+'].click()');await evaluate('[...document.querySelector('+JSON.stringify(root)+').querySelectorAll(\'button\')].find(b=>b.textContent===\'Lưu lựa chọn nghe\').click()');await wait('JSON.parse(localStorage.getItem(\'nihongo:learning:v1\')).listeningActivities['+JSON.stringify(t.id)+']');const result=await evaluate('JSON.parse(localStorage.getItem(\'nihongo:learning:v1\')).listeningActivities['+JSON.stringify(t.id)+']');assert.equal(result.attempts[0].correct,useHelp?1:0);assert.equal(result.attempts[0].transcriptUsed,useHelp);assert((await evaluate('document.querySelector('+JSON.stringify(root)+').innerText')).includes(q.explanation));if(!useHelp)assert(result.due<=Date.now()+300000);report.push(t.id+': all '+count+' actual WAV clips played, text initially hidden, '+(useHelp?'assisted correct response':'deliberate wrong response and review')+' saved with explanation');}
 await send('Page.reload');await wait('document.querySelector(\'.audio-choice-task\')');const data=await evaluate('JSON.parse(localStorage.getItem(\'nihongo:learning:v1\'))');assert.equal(Object.keys(validate(data).listeningActivities).length,2);assert.deepEqual(data.completed,{});assert.deepEqual(errors,[]);assert.equal(calls.length,0);report.push('Reload/backup retain both listening histories and support levels; no lesson completion or AI result manufactured');writeFileSync(resolve(out,'report.json'),JSON.stringify({time:new Date().toISOString(),report,errors,learner:'QA only; no human learning or independent phonetic validation'},null,2));console.log(JSON.stringify(report,null,2));
}finally{socket?.close();child.kill();}
