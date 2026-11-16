import{describe,it,expect}from'vitest';
import{fresh,recordAnswer,recordListening}from'./state.js';
import{getWordReview}from'./word-identity.js';

describe('integrated multiword assessment review',()=>{
  const question={
    id:'multiword-context',
    answer:0,
    choices:['The details match','The details conflict'],
    assessment:true,
    wordLinks:[
      {wordKey:'枝',usageId:'mnn-26:枝',kind:'meaning'},
      {wordKey:'森',usageId:'mnn-26:森',kind:'meaning'}
    ]
  };

  it('schedules every explicitly linked word in the shared review system',()=>{
    const now=1700000000000;
    const state=recordAnswer(fresh(),question,question.answer,now);

    for(const word of ['枝','森']){
      expect(getWordReview(state,word).due).toBeGreaterThan(now);
      expect(state.wordEvidence[word][0]).toMatchObject({
        kind:'meaning',
        correct:true,
        usageId:`mnn-26:${word}`
      });
    }
    expect(state.answers[question.id].correct).toBe(true);
  });

  it('schedules linked words as incorrect when the integrated response is wrong',()=>{
    const now=1700000000000;
    const state=recordAnswer(fresh(),question,1,now);

    for(const word of ['枝','森']){
      expect(getWordReview(state,word).due).toBeGreaterThan(now);
      expect(state.wordEvidence[word][0].correct).toBe(false);
    }
  });

  it('rejects duplicate or malformed word links instead of silently skipping review',()=>{
    expect(()=>recordAnswer(fresh(),{
      ...question,
      wordLinks:[...question.wordLinks,question.wordLinks[0]]
    },0,1700000000000)).toThrow('Liên kết từ trong câu hỏi không hợp lệ.');
    expect(()=>recordAnswer(fresh(),{
      ...question,
      wordLinks:[{wordKey:'枝',usageId:4}]
    },0,1700000000000)).toThrow('Liên kết từ trong câu hỏi không hợp lệ.');
  });

  it('schedules linked listening words in the shared review system and records transcript help',()=>{
    const now=1700000000000;
    const task={id:'multiword-listening',questions:[{
      ...question,
      id:'multiword-listening-q',
      wordLinks:question.wordLinks.map(link=>({...link,kind:'listening'}))
    }]};
    const state=recordListening(fresh(),task,{[task.questions[0].id]:0},{plays:1,transcriptUsed:true},now);

    for(const word of ['枝','森']){
      expect(getWordReview(state,word).due).toBeGreaterThan(now);
      expect(state.wordEvidence[word][0]).toMatchObject({
        kind:'listening',
        correct:true,
        usageId:`mnn-26:${word}`,
        afterModel:true
      });
    }
    expect(state.listeningActivities[task.id].attempts[0].transcriptUsed).toBe(true);
  });

  it('rejects malformed links on listening evidence instead of omitting review',()=>{
    const task={id:'bad-listening-links',questions:[{
      ...question,
      wordLinks:[...question.wordLinks,question.wordLinks[0]]
    }]};
    expect(()=>recordListening(fresh(),task,{[task.questions[0].id]:0},{plays:1},1700000000000)).toThrow('Liên kết từ trong câu hỏi không hợp lệ.');
  });
});
