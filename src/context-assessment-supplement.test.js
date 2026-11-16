import{it,expect}from 'vitest';
import{lessons}from './content.js';
import{fresh,recordAnswer,validate}from './state.js';
import{wordReviewKey}from './word-identity.js';
import{contextualSupplementFor}from './n5-context-assessment-supplement.js';
it('binds each new context to its existing source sense and preserves stable assessment IDs',()=>{
 const questions=[1,2,3,4,5].flatMap(contextualSupplementFor);expect(questions).toHaveLength(18);
 for(const q of questions){const original=lessons.find(l=>l.id===q.sourceLessonId),word=original.words.find(w=>w.text===q.wordKey);expect(word.sourceReview.entryId,q.id).toBe(q.sourceEvidence.entryId);expect(word.sourceReview.senseIds.length,q.id).toBeGreaterThan(0);expect(q.usageId).toBe(original.id+':'+word.text);expect(q.explanation.length).toBeGreaterThan(60);expect(lessons.find(l=>l.id==='n5-assessment-r1-'+original.id.slice(-2)).questions.some(x=>x.id===q.id)).toBe(true);}
});
it('keeps new high-frequency contexts distinct by lesson and preserves key contrasts',()=>{
 const added=[3,4,5].flatMap(contextualSupplementFor);
 expect(added.map(q=>q.wordKey)).toEqual(['食堂','いくら','午前','毎日','来ます','地下鉄']);
 expect(added.find(q=>q.wordKey==='毎日').explanation).toContain('土曜日');
 expect(added.find(q=>q.wordKey==='来ます').explanation).toContain('người bạn đến nhà người nói');
 expect(added.find(q=>q.wordKey==='午前').explanation).toContain('giờ đóng cửa');
});
it('records errors as meaning recognition in the common queue, retaining previous learning and backup',()=>{
 for(const raw of [...contextualSupplementFor(1),...contextualSupplementFor(2)]){const q=lessons.flatMap(l=>l.questions).find(q=>q.id===raw.id);let s=fresh();const prior=lessons[0];for(const old of prior.questions)s=recordAnswer(s,old,old.answer,100,old.accepted?.[0]);s.completed[prior.id]=123;s.wordNotes[q.wordKey]='Existing private note';s=recordAnswer(s,q,(q.answer+1)%q.choices.length,1000);const key=wordReviewKey(q.wordKey),restored=validate(JSON.parse(JSON.stringify(s)));expect(restored.wordReviews[key].due).toBe(301000);expect(restored.wordEvidence[key].at(-1)).toMatchObject({kind:'meaning',usageId:q.usageId,correct:false,afterModel:false});expect(restored.completed).toEqual({[prior.id]:123});expect(restored.wordNotes[q.wordKey]).toBe('Existing private note');expect(restored.reviews[q.id]).toBeUndefined();}
});
it('keeps different correct classifications distinct instead of inferring unprovided facts',()=>{const qs=contextualSupplementFor(1);const high=qs.find(q=>q.wordKey==='高校生'),foreign=qs.find(q=>q.wordKey==='留学生');expect(high.choices[high.answer]).toBe('Minh');expect(high.explanation).toContain('không xác định cấp học');expect(foreign.choices[foreign.answer]).toBe('là người du học');expect(foreign.explanation).toContain('Không suy quốc tịch');});

it('accepts a completed pre-supplement assessment backup without inventing new answers',()=>{const l=lessons.find(l=>l.id==='n5-assessment-r1-01');let s=fresh();for(const id of l.legacyQuestionIds){const q=l.questions.find(q=>q.id===id);s=recordAnswer(s,q,q.answer,100,q.accepted?.[0]);}s.completed[l.id]=200;const restored=validate(JSON.parse(JSON.stringify(s)));expect(restored.completed[l.id]).toBe(200);expect(Object.keys(restored.answers)).toHaveLength(4);for(const q of contextualSupplementFor(1))expect(restored.answers[q.id]).toBeUndefined();});
