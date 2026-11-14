import{describe,it,expect}from'vitest';
import{lessons}from'./content.js';
import{mnnUnits}from'./mnn-course.js';
import{n4VocabularyBatch01}from'./n4-vocabulary-batch-01.js';
import{n4VocabularyBatch02}from'./n4-vocabulary-batch-02.js';
import{n4VocabularyBatch03}from'./n4-vocabulary-batch-03.js';
import{fresh,recordAnswer,recordListening,validate}from'./state.js';
import{buildN4VocabularyAssessment}from'./n4-vocabulary-assessment.js';
import fs from'node:fs';

const audioCatalog=JSON.parse(fs.readFileSync('src/generated-audio.json','utf8'));

describe('integrated N4 vocabulary assessment batches 01–03',()=>{
  const assessment=buildN4VocabularyAssessment();
  const sourceWords=[...n4VocabularyBatch01,...n4VocabularyBatch02,...n4VocabularyBatch03];

  it('is included in the open course and links every new lexeme to a contextual task',()=>{
    expect(lessons.some(lesson=>lesson.id===assessment.id)).toBe(true);
    expect(assessment.questions).toHaveLength(15);
    const links=assessment.questions.flatMap(question=>question.wordLinks);
    expect(new Set(links.map(link=>link.wordKey))).toEqual(new Set(sourceWords.map(word=>word.text)));
    expect(new Set(assessment.reading.lookupWordKeys)).toEqual(new Set(sourceWords.map(word=>word.text)));
    expect(links.every(link=>mnnUnits.some(unit=>unit.number===Number(link.usageId.match(/^mnn-(\d+):/)?.[1])&&unit.words.some(word=>word.text===link.wordKey)))).toBe(true);
    expect(assessment.questions.every(question=>question.assessment&&question.explanation&&question.choices.length===3&&question.answer>=0&&question.answer<question.choices.length)).toBe(true);
    expect(new Set(assessment.questions.map(question=>question.answer)).size).toBeGreaterThan(1);
    expect(assessment.reading.text).toContain('市役所の窓口');
    expect(assessment.application.writing).toContain('3–5 câu');
    expect(assessment.application.criteria.length).toBeGreaterThanOrEqual(4);
  });

  it('connects each listening response to shared review without treating transcript help as independent evidence',()=>{
    expect(assessment.listeningTasks).toHaveLength(4);
    for(const task of assessment.listeningTasks){
      expect(task.transcript).toBeTruthy();
      expect(task.questions[0].wordLinks.length).toBeGreaterThan(0);
      expect(task.questions[0].wordLinks.every(link=>link.kind==='listening')).toBe(true);
      const audio=audioCatalog.find(asset=>!asset.retired&&asset.kind==='dialogue'&&asset.text===task.transcript&&asset.lessonIds.includes(assessment.id)&&asset.taskIds.includes(task.id));
      expect(audio).toBeTruthy();
      expect(audio.readingCheck.actual).toBe(audio.readingCheck.expected);
      expect(fs.existsSync(`public${audio.path}`)).toBe(true);
      let state=recordListening(fresh(),task,{[task.questions[0].id]:task.questions[0].answer},{plays:1,transcriptUsed:false},1700000000000);
      state=recordListening(state,task,{[task.questions[0].id]:task.questions[0].answer},{plays:2,transcriptUsed:true},1700000001000);
      const restored=validate(JSON.parse(JSON.stringify(state)));
      expect(restored.listeningActivities[task.id].attempts.map(attempt=>attempt.transcriptUsed)).toEqual([false,true]);
      expect(restored.wordEvidence[task.questions[0].wordLinks[0].wordKey].map(evidence=>evidence.afterModel)).toEqual([false,true]);
    }
  });

  it('schedules all contextual reading links in the shared word review system',()=>{
    for(const question of assessment.questions){
      const state=recordAnswer(fresh(),question,question.answer,1700000000000);
      for(const link of question.wordLinks){
        expect(state.wordEvidence[link.wordKey][0]).toMatchObject({kind:'meaning',correct:true,usageId:link.usageId});
      }
    }
  });
});
