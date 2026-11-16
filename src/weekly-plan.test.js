import {describe,it,expect} from 'vitest';
import {buildWeeklyPlan,validateStudyPlan,phaseGuide} from './weekly-plan.js';
import {fresh,validate,recordAnswer,completeLesson} from './state.js';
import {lessons} from './content.js';
const now=new Date(2026,10,12,12).getTime();
function setup(minutes=20){const s=fresh();s.profile={name:'QA kế hoạch riêng',minutes:30};s.preferences.studyPlan={dailyMinutes:minutes,examDate:'',currentLevel:'auto'};return s;}
function finish(s,id){const l=lessons.find(l=>l.id===id);for(const q of l.questions)s=recordAnswer(s,q,q.answer,now);return completeLesson(s,l,now);}
describe('weekly recommendations from real saved history',()=>{
  it.each([10,20,40,90,120,180])('fits %i-minute days with listening and explicit stop, never fabricates evidence',minutes=>{
    const s=setup(minutes),before=JSON.stringify(s),p=buildWeeklyPlan(s,now);
    expect(p.week).toHaveLength(7);expect(new Set(p.week.map(d=>d.date)).size).toBe(7);
    for(const day of p.week){expect(day.tasks.reduce((n,t)=>n+t.minutes,0)).toBe(minutes);expect(day.tasks.find(t=>['listening','sound'].includes(t.id)).minutes).toBeGreaterThanOrEqual(minutes/3);expect(day.tasks.every(t=>t.stop&&t.minutes>0&&lessons.some(l=>l.id===t.lessonId))).toBe(true);expect(day.plannedRange[0]).toBeLessThan(day.plannedRange[1]);}
    expect(JSON.stringify(s)).toBe(before);expect(p.phase).toBe('intro');
  });
  it('prioritizes due words, wrong answers, weak listening and actual continuation',()=>{
    let s=setup();const l=lessons.find(l=>l.id==='mnn-03'),q=l.questions[0];s=recordAnswer(s,q,(q.answer+1)%q.choices.length,now-1000);
    s.wordReviews['私']={streak:0,last:now-1000,due:now-1};s.wordReviews['future']={streak:1,last:now,due:now+100000};
    s.listening['listen-mnn-03']={correct:false,due:now,at:now-1000,lessonId:l.id};s.learning.sessions[l.id]={at:now,step:'grammar-2',finished:[],wordIndex:0};
    const p=buildWeeklyPlan(s,now);expect(p.due).toMatchObject({words:1,weak:1,listening:1});expect(p.today.tasks[0].route).toBe('review');expect(p.today.tasks.find(t=>t.id==='main').reason).toContain('grammar-2');expect(p.today.tasks.find(t=>t.id==='listening').lessonId).toBe(l.id);
  });
  it('uses completed groups for review milestones; self selected entry does not complete anything',()=>{
    let s=setup();s=finish(s,'hira-3');for(let n=1;n<=5;n++)s=finish(s,'mnn-'+String(n).padStart(2,'0'));
    expect(buildWeeklyPlan(s,now).nextLessonId).toBe('mnn-review-01-05');
    const entry=setup();entry.preferences.studyPlan.currentLevel='N4';const before=JSON.stringify(entry.completed);expect(buildWeeklyPlan(entry,now).nextLessonId).toBe('mnn-26');expect(JSON.stringify(entry.completed)).toBe(before);
  });
  it('includes real future due dates in conditional later days without pretending reviews happened',()=>{
    const s=setup();s.wordReviews['tomorrow']={streak:1,last:now,due:now+86400000};
    const p=buildWeeklyPlan(s,now);expect(p.due.words).toBe(0);expect(p.week[0].tasks[0].title).not.toContain('từ đến hạn');expect(p.week[1].tasks[0].title).toContain('1 từ đến hạn');expect(s.wordReviews.tomorrow.due).toBe(now+86400000);
  });
  it('keeps N5 and N4 assessment milestones separate from lesson completion and offers N3 without locking',()=>{
    let s=setup();s=finish(s,'hira-3');for(let n=1;n<=25;n++)s=finish(s,'mnn-'+String(n).padStart(2,'0'));
    expect(buildWeeklyPlan(s,now).phase).toBe('N5-check');s=finish(s,'mnn-final-review');expect(buildWeeklyPlan(s,now).phase).toBe('N4');
    for(let n=26;n<=50;n++)s=finish(s,'mnn-'+String(n).padStart(2,'0'));
    const p=buildWeeklyPlan(s,now);expect(p.phase).toBe('N4-check');expect(p.n3Suggestion).toContain('chưa chứng minh');expect(phaseGuide.map(s=>s.id)).toEqual(['intro','N5','N5-check','N4','N4-check','exam']);
  });
  it('uses the 56-day exam window and warns about short/past dates without predicting passing',()=>{
    const s=setup();s.preferences.studyPlan.examDate='2027-01-07';expect(buildWeeklyPlan(s,now).examDays).toBe(56);expect(buildWeeklyPlan(s,now).phase).toBe('exam');s.preferences.studyPlan.examDate='2027-01-08';expect(buildWeeklyPlan(s,now).examWindow).toBe(false);s.preferences.studyPlan.examDate='2026-11-20';expect(buildWeeklyPlan(s,now).warnings.some(w=>w.includes('dưới 4 tuần'))).toBe(true);s.preferences.studyPlan.examDate='2026-11-01';expect(buildWeeklyPlan(s,now).warnings.some(w=>w.includes('đã qua'))).toBe(true);
  });
  it('roundtrips optional preferences in schema 1 and preserves old backups',()=>{
    const old=fresh();expect(validate(JSON.parse(JSON.stringify(old)))).toEqual(old);
    const s=setup(40);s.preferences.studyPlan.examDate='2027-02-01';expect(validate(JSON.parse(JSON.stringify(s)))).toEqual(s);
    for(const bad of [{dailyMinutes:9,currentLevel:'auto'},{dailyMinutes:181,currentLevel:'auto'},{dailyMinutes:20,currentLevel:'N3'},{dailyMinutes:20,currentLevel:'auto',examDate:'2026-02-30'}])expect(()=>validateStudyPlan(bad)).toThrow();
    s.preferences.studyPlan.dailyMinutes='40';expect(()=>validate(s)).toThrow();
  });
});
