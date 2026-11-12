import{it,expect}from'vitest';import{writingReview,groundedReply}from'./ai-policy.js';import{lessons}from'./content.js';import{chat}from'./ai.js';
it('does not turn a valid negative into affirmative without intent',()=>{const r=writingReview('Chữa câu 学生ではありません。');expect(r).toContain('Giữ nguyên');expect(r).not.toContain('Để khớp ý định');});
it('changes meaning only to satisfy explicit positive intent',()=>{const r=writingReview('Tôi muốn nói mình là học sinh nhưng viết 学生ではありません。');expect(r).toContain('Để khớp ý định: 学生です');expect(r).toContain('không phải lỗi ngữ pháp');});
it('preserves explicit negative intent and valid alternatives',()=>{for(const s of ['学生ではありません。','学生じゃありません。','学生ではないです。'])expect(writingReview('Tôi muốn nói mình không phải học sinh. '+s)).toContain('Giữ nguyên');});
it('asks clarification for unsupported writing rather than inventing errors',()=>{const r=writingReview('昨日は雨でした。');expect(r).toContain('Bạn muốn diễn đạt');expect(r).not.toContain('Sửa:');});
it('distinguishes two valid meanings',()=>expect(writingReview('学生です。 và 学生ではありません。')).toContain('Cả hai đều có thể đúng'));
it('uses source content without network for all supported core tasks',async()=>{const old=globalThis.fetch;globalThis.fetch=()=>{throw Error('Network forbidden')};try{for(const mode of ['tutor','reading','writing']){const r=await chat({model:'qwen3:1.7b',mode,lesson:lessons[0],messages:[{role:'user',content:'学生ではありません。'}]});expect(r).toContain('không gọi mô hình');}}finally{globalThis.fetch=old}});

it('does not misread a question as a statement',()=>{expect(writingReview('学生ですか。')).toContain('Chưa đánh giá');});
it('keeps failed name-response branch out of model calls',async()=>{const old=globalThis.fetch;globalThis.fetch=()=>{throw Error('No model call expected')};try{const r=await chat({model:'qwen3:4b',mode:'kaiwa',lesson:lessons[0],messages:[{role:'user',content:'Tôi là An. アンです。'}]});expect(r).toContain('không gọi mô hình');}finally{globalThis.fetch=old}});

it('does not silently assess a suffix inside another Japanese noun',()=>expect(writingReview('私は大学生ではありません。')).toContain('Chưa đánh giá'));
it('retains original Japanese when learner clarifies intention in a follow-up',async()=>{const r=await chat({model:'qwen3:4b',mode:'writing',lesson:lessons[0],messages:[{role:'user',content:'学生ではありません。'},{role:'assistant',content:'Bạn muốn diễn đạt gì?'},{role:'user',content:'Tôi muốn nói mình là học sinh.'}]});expect(r).toContain('Để khớp ý định: 学生です');});

it('does not call two valid negative alternatives opposite meanings',()=>{const r=writingReview('学生じゃありません。 và 学生ではありません。');expect(r).toContain('cùng ý cơ bản');expect(r).not.toContain('khác nghĩa khẳng định/phủ định');});
it('does not parse a question or a longer noun as the supported affirmative statement',()=>{for(const text of ['学生ですか。','大学生です。'])expect(groundedReply({text,lesson:lessons[0],mode:'reading'})).toContain('Giới hạn tác vụ');});
