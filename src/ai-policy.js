export const POLICY_VERSION='2026-11-11-quality-1';
export const turns={greet:{ja:'こんにちは。',vi:'Xin chào.'},askName:{ja:'お名前は何ですか。',vi:'Tên của bạn là gì?'},acknowledge:{ja:'よろしくお願いします。',vi:'Rất mong được làm quen / giúp đỡ.'},repeat:{ja:'もう一度お願いします。',vi:'Xin nói lại một lần nữa.'}};
export function writingReview(text){
 const found=[...text.matchAll(/(?<![ぁ-んァ-ヶ一-龯])(?:私は|わたしは)?学生(?:ではありません|じゃありません|ではないです|です)(?![ぁ-んァ-ヶ一-龯])[。]?/g)].map(m=>m[0]);
 if(!found.length)return '[Hỗ trợ theo quy tắc · không gọi mô hình]\nChưa đánh giá câu này. Bạn muốn diễn đạt điều gì bằng tiếng Việt? Chữa viết mở đang đóng vì mô hình chưa đủ độ tin cậy. Không tự coi câu bạn viết là sai.\nLỗi ngữ pháp: chưa xác định.\nTự nhiên hơn: chưa đề xuất.\nDiễn đạt khác: chưa đề xuất.';
 if(found.length>1){const meanings=found.map(x=>/ではありません|じゃありません|ではないです/.test(x));const mixed=meanings.some(Boolean)&&meanings.some(x=>!x);return '[Nội dung đối chiếu · không gọi mô hình]\n'+found.map((x,i)=>x+' → '+(meanings[i]?'không phải học sinh/sinh viên':'là học sinh/sinh viên')).join('\n')+'\nCả hai đều có thể đúng ngữ pháp; '+(mixed?'khác nghĩa khẳng định/phủ định.':'cùng ý cơ bản, có thể khác cách diễn đạt hoặc mức lịch sự.')+'\nLỗi ngữ pháp: không thể kết luận chỉ vì hai câu khác nhau.\nTự nhiên hơn: cần bối cảnh.\nDiễn đạt khác: giữ nguyên ý khẳng định hoặc phủ định. Bạn muốn truyền đạt ý nào?';}
 const sentence=found[0];const negative=/ではありません|じゃありません|ではないです/.test(sentence);
 const intentClause=text.match(/(?:muốn nói|muốn diễn đạt|ý tôi là|ý định là)([^.!?\n]{0,100})/i)?.[1]?.split(/nhưng|mà|viết|câu tiếng/i)[0]||'';
 const intendedNegative=/không phải|không là/.test(intentClause);const intendedPositive=!intendedNegative&&/(?:là|mình là|tôi là|em là)\s*(?:một\s*)?(?:học sinh|sinh viên)/i.test(intentClause);const mismatch=(intendedNegative&&!negative)||(intendedPositive&&negative);
 let change='';if(mismatch)change=negative?sentence.replace(/ではありません|じゃありません|ではないです/,'です'):sentence.replace(/です/,'ではありません');
 const meaning=negative?'không phải học sinh/sinh viên':'là học sinh/sinh viên';
 return '[Nội dung đối chiếu · không gọi mô hình]\nCâu gốc: '+sentence+' → '+meaning+'.\nLỗi ngữ pháp: không phát hiện trong khung danh từ được hỗ trợ. '+(mismatch?'Câu đúng cấu trúc nhưng KHÔNG KHỚP ý định bạn nêu. Để khớp ý định: '+change+' Đây là đổi nghĩa có chủ đích, không phải lỗi ngữ pháp của câu gốc.':'Giữ nguyên câu; không đảo khẳng định/phủ định.')+'\nChỉ đánh giá phần câu nhận diện trên; chưa kiểm tra toàn bộ đoạn hoặc thông tin ngoài khung.\nTự nhiên hơn: cần ngữ cảnh người nhận và mức lịch sự; không bắt buộc đổi.\nDiễn đạt khác: '+(negative?'学生じゃありません。 là một lựa chọn phủ định thường dùng trong nói; không tự thay thế bản gốc.':'Có thể dùng 私は学生です。 khi cần nêu rõ “tôi”; không phải sửa lỗi.')+(intentClause?'':'\nNếu bạn muốn diễn đạt ý khác, hãy nói ý đó bằng tiếng Việt trước.');
}
export function groundedReply({text,lesson,mode}){
 if(mode==='writing')return writingReview(text);
 if(mode==='tutor')return '[Nội dung bài có nguồn tham chiếu · chưa duyệt độc lập · không gọi mô hình]\n'+lesson.goal+'\n'+lesson.cards.map(c=>c.kana+' → '+c.latin).join(' · ')+'\n'+lesson.notes.join('\n')+'\nPhạm vi: giải thích trong bài; câu hỏi ngoài phần này chưa được kiểm định.';
 if(mode==='reading'){
  if(/(?<![ぁ-んァ-ヶ一-龯])学生ではありません(?![ぁ-んァ-ヶ一-龯])/.test(text))return '[Nội dung đối chiếu · không gọi mô hình]\n学生（がくせい）: học sinh/sinh viên. ではありません: phủ định lịch sự trong khung danh từ. Nghĩa: (Tôi) không phải học sinh/sinh viên. Không tự đổi thành khẳng định.';
  if(/(?<![ぁ-んァ-ヶ一-龯])学生です(?![ぁ-んァ-ヶ一-龯])/.test(text))return '[Nội dung đối chiếu · không gọi mô hình]\n学生（がくせい）: học sinh/sinh viên; です: cách nói lịch sự trong câu danh từ. Nghĩa theo ngữ cảnh: (Tôi) là học sinh/sinh viên.';
  if(/アンです/.test(text))return '[Nội dung đối chiếu · không gọi mô hình]\nTrong tình huống tự giới thiệu: アン là tên An, です kết thúc câu danh từ lịch sự. アンです。→ Tôi là An. Không suy ra mọi cách dùng của です chỉ từ câu này.';
  const plain=text.trim().replace(/[。\s]/g,'');if(lesson.cards.some(c=>c.kana===plain)){const c=lesson.cards.find(c=>c.kana===plain);return '[Nội dung đối chiếu · không gọi mô hình]\n'+c.kana+' → '+c.latin;}
  return '[Giới hạn tác vụ · không gọi mô hình]\nChưa có phân tích đối chiếu cho đoạn này. Không tự suy đoán là đúng. Bạn có thể xem từ/ví dụ trong bài; phân tích đọc mở đang đóng đến khi được kiểm định.';
 }
 return null;
}

export function kaiwaIntent(text){if(/(?:tôi|mình|em) (?:là|tên)|です[。.]?$/.test(text.trim()))return 'acknowledge';if(/nhắc lại|nói lại|nghe rõ|もう一度/.test(text))return 'repeat';if(/hỏi tên|tên của tôi|ask.*name/i.test(text))return 'askName';if(/chào|こんにちは|hello/i.test(text))return 'greet';return null;}
