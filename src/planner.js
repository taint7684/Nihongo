export const defaults={goal:'N5',purpose:'Nền tảng',mode:'path',todayMinutes:30};
export const diagnostics={
'hira-1':[{p:'Chọn a–i–u.',c:['あいう','ういあ','いうあ'],a:0},{p:'Chọn i–a.',c:['あい','いあ','うあ'],a:1},{p:'Chọn u–i.',c:['いう','あい','うい'],a:2}],
'hira-2':[{p:'Chọn o–e–i.',c:['おえい','えおい','いえお'],a:0},{p:'Chọn a–o–u.',c:['あうお','あおう','おあう'],a:1},{p:'Chọn e–u–a.',c:['うえあ','あえう','えうあ'],a:2}],
'hira-3':[{p:'Chọn i–o–e–a.',c:['いおえあ','おいえあ','いえおあ'],a:0},{p:'Chọn u–e–i–o.',c:['えういお','うえいお','ういえお'],a:1},{p:'Chọn a–u–o–i.',c:['あおうい','うあおい','あうおい'],a:2}]};
export const passed=(s,id)=>s.diagnostics?.[id]?.passed===true;
export function diagnosticResult(id,choices){const qs=diagnostics[id];if(!qs||choices.length!==qs.length)throw Error('Thiếu câu trả lời.');const score=qs.filter((q,i)=>choices[i]===q.a).length;return{choices,score,passed:score===qs.length,at:Date.now()};}
