import{communication,transfer}from'./communication-content.js';
import{n4Units}from'./n4-course.js';
import{transferForN4}from'./n4-transfer.js';

const q=(id,prompt,accepted,rejected,model,explanation,skill,lessonId)=>
({id,prompt,kind:'speaking',accepted,choices:[accepted[0],'Chưa khớp'],answer:0,explanation,skill,remedialLesson:lessonId,standalone:false});

const buildKaiwaN5=()=>{
  const lessons=[];
  for(const [lessonId,tasks]of Object.entries(communication)){
    if(!lessonId.startsWith('mnn-'))continue;
    const num=Number(lessonId.slice(4));
    if(num>25)continue;
    const qs=[];
    for(const t of tasks){
      qs.push(q(`n5-kaiwa-${t.id}`,t.prompt,t.variants[0].accepted,t.variants[0].rejected||[],t.variants[0].model,t.criteria.join(' '),'nói-kaiwa',lessonId));
    }
    lessons.push({id:`n5-kaiwa-${lessonId}`,number:lessonId,stage:'Hướng N5',chapter:'Kaiwa',kind:'kaiwa',title:`Kaiwa ${lessonId}`,subtitle:'Gây ra tình huống, tự đáp và hỏi lại',minutes:10,glyph:'会',prerequisite:lessonId,goal:'Tự đáp câu hỏi và hỏi tiếp theo rubric giao tiếp.',intro:'Nghe câu hỏi, tự đáp trước khi xem mẫu, sau đó hỏi lại người đối diện.',questions:qs,notes:['Câu hỏi là mẫu cố định, không phải hội thoại AI tự do.','Chưa chấm phát음이 tự động; tự kiểm theo rubric.']});
  }
  for(const [lessonId,task]of Object.entries(transfer)){
    if(!lessonId.startsWith('mnn-'))continue;
    const num=Number(lessonId.slice(4));
    if(num>25)continue;
    lessons.push({id:`n5-kaiwa-${lessonId}-transfer`,number:lessonId,stage:'Hướng N5',chapter:'Kaiwa',kind:'kaiwa',title:`Kaiwa chuyển ${lessonId}`,subtitle:'Đổi dữ kiện, giữ cấu trúc mẫu',minutes:10,glyph:'応',prerequisite:lessonId,goal:'Áp dụng mẫu câu vào tình huống mới, giữ đúng ý.',intro:'Nghe câu hỏi, tự đáp theo dữ kiện mới trên thẻ, sau đó hỏi lại.',questions:[q(`n5-kaiwa-${task.id}`,task.prompt,task.variants[0].accepted,task.variants[0].rejected||[],task.variants[0].model,task.criteria.join(' '),'nói-kaiwa-chuyển',lessonId)],notes:['Dữ kiện mới trên thẻ, không áp ý mẫu.','Tự kiểm theo rubric giao tiếp.']});
  }
  return lessons;
};

const buildKaiwaN4=()=>{
  const lessons=[];
  for(const u of n4Units){
    const n=u.number;
    const id='mnn-'+n;
    const comm=communication[id];
    const tr=transferForN4(n);
    if(comm&&comm[0]){
      lessons.push({id:`n4-kaiwa-${id}-use`,number:String(n),stage:'Hướng N4',chapter:'Kaiwa',kind:'kaiwa',title:`Kaiwa N4 ${n}`,subtitle:'Tự đáp và hỏi lại trong tình huống mới',minutes:10,glyph:'会',prerequisite:id,goal:'Tự dùng câu giao tiếp trong tình huống mới.',intro:'Nghe câu hỏi, tự đáp theo dữ kiện trên thẻ, sau đó hỏi lại người đối diện.',questions:[q(`n4-kaiwa-${id}-use`,comm[0].prompt,comm[0].variants[0].accepted,comm[0].variants[0].rejected||[],comm[0].variants[0].model,comm[0].criteria.join(' '),'nói-kaiwa-n4',id)],notes:['Câu giao tiếp N4 do dự án soạn, chưa duyệt độc lập.','Tự kiểm theo rubric giao tiếp.']});
    }
    if(tr){
      lessons.push({id:`n4-kaiwa-${id}-transfer`,number:String(n),stage:'Hướng N4',chapter:'Kaiwa',kind:'kaiwa',title:`Kaiwa chuyển N4 ${n}`,subtitle:'Đổi dữ kiện, giữ cấu trúc mẫu',minutes:10,glyph:'応',prerequisite:id,goal:'Áp dụng mẫu câu N4 vào tình huống mới.',intro:'Nghe câu hỏi, tự đáp theo dữ kiện mới trên thẻ.',questions:[q(`n4-kaiwa-${id}-transfer`,tr.prompt,tr.variants[0].accepted,tr.variants[0].rejected||[],tr.variants[0].model,tr.criteria.join(' '),'nói-kaiwa-n4-chuyen',id)],notes:['Dữ kiện mới, không áp ý mẫu.','Tự kiểm theo rubric giao tiếp.']});
    }
  }
  return lessons;
};

export function buildKaiwaAssessment(){return[...buildKaiwaN5(),...buildKaiwaN4()];}
