import { describe,it,expect } from 'vitest';
import { fresh,validate,recordAnswer,completeLesson,reviewAnswer,available,restartCheckpoint,recordListening } from './state.js';
import { lessons } from './content.js';
describe('local learning lifecycle',()=>{
 it('records errors for immediate review, completes only the selected lesson while all lessons remain open',()=>{
  let s=fresh(); s.profile={name:'Bạn',minutes:30};
  expect(available(s,lessons[1])).toBe(true);
  expect(()=>completeLesson(s,lessons[0],1000)).toThrow();
  for(const q of lessons[0].questions)s=recordAnswer(s,q,(q.answer+1)%q.choices.length,1000);
  expect(Object.values(s.reviews).every(r=>r.due===1000)).toBe(true);
  s=completeLesson(s,lessons[0],2000);
  expect(available(s,lessons[1])).toBe(true);
  expect(validate(JSON.parse(JSON.stringify(s)))).toEqual(s);
 });
 it('schedules successful and failed reviews without changing original evidence',()=>{
  let s=fresh();const q=lessons[0].questions[0];s=recordAnswer(s,q,0,1000);
  const original=s.answers[q.id];s=reviewAnswer(s,q.id,true,2000);
  expect(s.reviews[q.id].due).toBe(86402000);expect(s.answers[q.id]).toEqual(original);
  s=reviewAnswer(s,q.id,false,3000);expect(s.reviews[q.id]).toEqual({due:303000,streak:0});
 });
 it('rejects malformed or fabricated imports',()=>{
  expect(()=>validate({version:99})).toThrow();
  const s=fresh();s.completed['hira-1']=1000;expect(()=>validate(s)).toThrow();
  const r=fresh();r.reviews.bad={due:1000,streak:0};expect(()=>validate(r)).toThrow();
  const a=fresh();a.answers['h1-1']={choice:0,correct:true};expect(()=>validate(a)).toThrow();
  const locked=fresh();locked.profile={name:'Bạn',minutes:30};locked.route='practice';locked.lessonId='hira-3';expect(validate(locked).lessonId).toBe('hira-3');expect(Object.keys(validate(locked).completed)).toHaveLength(0);
 });
 it('supports all three consecutive lessons and backup roundtrip with position',()=>{
  let s=fresh();s.profile={name:'Người mới',minutes:30};
  for(const l of lessons){expect(available(s,l)).toBe(true);s={...s,route:'practice',lessonId:l.id};for(const q of l.questions)s=recordAnswer(s,q,q.answer,1000);s=completeLesson(s,l,2000);}
  expect(Object.keys(s.completed)).toHaveLength(lessons.length);expect(Object.keys(s.reviews)).toHaveLength(lessons.flatMap(l=>l.questions).filter(q=>!q.wordKey&&!q.wordLinks).length);for(const q of lessons.flatMap(l=>l.questions).filter(q=>q.wordKey)){expect(s.wordReviews[q.wordKey],q.id).toBeTruthy();expect(s.answers[q.id]?.correct,q.id).toBe(true);}
  expect(validate(JSON.parse(JSON.stringify(s)))).toEqual(s);
 });
});

import {diagnosticResult} from './planner.js';
it('migrates version-1 backups and retains independent diagnostic evidence',()=>{const old=fresh();delete old.preferences;delete old.notebook;delete old.materials;delete old.diagnostics;delete old.listening;const restored=validate(JSON.parse(JSON.stringify(old)));expect(restored.preferences.goal).toBe('N5');const result=diagnosticResult('hira-1',[0,1,2]);const state={...restored,diagnostics:{'hira-1':result}};expect(available(state,lessons[1])).toBe(true);expect(Object.keys(state.completed)).toHaveLength(0);expect(validate(state).diagnostics['hira-1'].passed).toBe(true);});
it('keeps self-study completion valid after changing back to path mode',()=>{let s=fresh();s.profile={name:'Bạn',minutes:30};s.preferences.mode='free';const lesson=lessons[2];for(const q of lesson.questions)s=recordAnswer(s,q,q.answer);s=completeLesson(s,lesson);s.preferences.mode='path';expect(validate(s).completed[lesson.id]).toBeTruthy();});

it('keeps legacy audio history and separate version-2 listening entries',()=>{const s=fresh();s.listening={'listen-hira-2':{choice:'い',correct:true,due:1000,at:1000},'listen-v2-hira-2':{choice:'お',target:'お',lessonId:'hira-2',audioId:'o',correct:true,due:1000,at:1000}};expect(validate(s).listening).toEqual(s.listening);});
it('records early and delayed checkpoints differently',()=>{const l=lessons.find(l=>l.checkpoint);let s=fresh();s.profile={name:'Bạn',minutes:30};s.preferences.mode='free';s.completed[l.waitFor]=1000;for(const q of l.questions)s=recordAnswer(s,q,q.answer,1000);let early=completeLesson(s,l,2000);expect(early.retention[l.id].afterRest).toBe(false);let later=completeLesson(s,l,86402000);expect(later.retention[l.id].afterRest).toBe(false);for(const q of l.questions)s=recordAnswer(s,q,q.answer,86402000);later=completeLesson(s,l,86403000);expect(later.retention[l.id].afterRest).toBe(true);});

it('archives checkpoint attempts without counting cached answers as delayed evidence',()=>{const l=lessons.find(l=>l.checkpoint);let s=fresh();s.profile={name:'Bạn',minutes:30};s.preferences.mode='free';for(const q of l.questions)s=recordAnswer(s,q,q.answer,1000);s=completeLesson(s,l,2000);s=restartCheckpoint(s,l,86402000);expect(s.checkpointAttempts[0].answers[l.questions[0].id].at).toBe(1000);expect(s.answers[l.questions[0].id]).toBeUndefined();expect(s.completed[l.id]).toBeUndefined();expect(validate(JSON.parse(JSON.stringify(s))).checkpointAttempts).toEqual(s.checkpointAttempts);});

it('loads an original four-lesson backup with no new fields or answer timestamps',()=>{const original=lessons.filter(l=>['hira-1','hira-2','hira-3','n5-intro'].includes(l.id));const old={version:1,profile:{name:'Người học cũ',minutes:30},route:'lesson',lessonId:'n5-intro',aiModel:'qwen3:1.7b',answers:{},completed:{},reviews:{}};for(const l of original){for(const q of l.questions){old.answers[q.id]={choice:q.answer,correct:true};old.reviews[q.id]={due:2000,streak:1};}old.completed[l.id]=1000;}const restored=validate(JSON.parse(JSON.stringify(old)));expect(Object.keys(restored.completed)).toHaveLength(4);expect(restored.answers).toEqual(old.answers);expect(restored.reviews).toEqual(old.reviews);expect(restored.wordReviews).toEqual({});});

it('retains a completed legacy reference lesson while requiring its new activities for a new completion',()=>{const l=lessons.find(l=>l.id==='mnn-01');let s=fresh();s.profile={name:'Cũ',minutes:30};s.preferences.mode='free';for(const id of l.legacyQuestionIds){const q=l.questions.find(q=>q.id===id);s=recordAnswer(s,q,q.answer,1000);}s.completed[l.id]=2000;const restored=validate(JSON.parse(JSON.stringify(s)));expect(restored.completed[l.id]).toBe(2000);expect(restored.answers['m01-x-age']).toBeUndefined();expect(()=>completeLesson(restored,l)).toThrow('Hãy trả lời hết');});

it('preserves independent listening attempts, transcript help and the audio identity in backups',()=>{const t=lessons.find(l=>l.id==='mnn-01').listeningTasks[0];let s=fresh();const answers=Object.fromEntries(t.questions.map(q=>[q.id,q.answer]));s=recordListening(s,t,answers,{transcriptUsed:false,plays:1,audioId:'test-asset'},1000);s=recordListening(s,t,answers,{transcriptUsed:true,plays:2,audioId:'test-asset'},2000);const r=validate(JSON.parse(JSON.stringify(s)));expect(r.listeningActivities[t.id].attempts.map(a=>a.transcriptUsed)).toEqual([false,true]);expect(r.listeningActivities[t.id].attempts[0].audioId).toBe('test-asset');expect(()=>recordListening(s,t,answers,{plays:0})).toThrow();});

it('opens all content with a fresh guided profile, and preserves a chosen advanced lesson without invented completion',()=>{let s=fresh();s.profile={name:'QA',minutes:30};for(const l of lessons)expect(available(s,l)).toBe(true);for(const id of ['mnn-10','mnn-03','mnn-25','mnn-review-21-25','mnn-final-review']){s={...s,route:'lesson',lessonId:id};s=validate(JSON.parse(JSON.stringify(s)));expect(s.lessonId).toBe(id);expect(s.completed).toEqual({});expect(s.answers).toEqual({});}const l=lessons.find(l=>l.id==='mnn-10');for(const q of l.questions)s=recordAnswer(s,q,q.answer,1000,q.accepted?.[0]);s=completeLesson(s,l,2000);expect(Object.keys(s.completed)).toEqual(['mnn-10']);expect(validate(s).completed['mnn-09']).toBeUndefined();});

it('retains explicit lesson choice and old lesson-17 completion after the added exception exercise',()=>{const l=lessons.find(l=>l.id==='mnn-17');const s=fresh();s.profile={name:'QA',minutes:30};s.route='lesson';s.lessonId='mnn-25';s.selectedLessonId='mnn-25';for(const q of l.questions.filter(q=>q.id!=='m17-x-aru'))s.answers[q.id]={choice:q.answer,correct:true,at:1000};s.completed[l.id]=2000;const old=validate(JSON.parse(JSON.stringify(s)));expect(old.selectedLessonId).toBe('mnn-25');expect(old.completed['mnn-17']).toBe(2000);expect(old.answers['m17-x-aru']).toBeUndefined();});
