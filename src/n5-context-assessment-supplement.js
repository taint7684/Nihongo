// Original authored reading assessments; selected lexical senses checked against existing JMdict source records.
// No generated audio, speech assessment, expert approval or JLPT score is claimed.
const items = [
[1,'company-role','会社員','リンさんは会社員です。ミンさんは学生です。','Ai được giới thiệu là nhân viên công ty?',['Linh','Minh','cả hai'],0,'会社員 ở câu đầu chỉ nhân viên công ty; 学生 ở câu sau là người đi học. Không suy ra tên công ty hay chức vụ.','1198560'],
[1,'doctor-role','医者','ナムさんは会社の社員ではありません。医者です。','Nam có nghề gì theo hai câu này?',['giáo viên','bác sĩ','chưa nói nghề'],1,'医者です nêu nghề bác sĩ. 会社の社員ではありません phủ định việc là nhân viên công ty, không phủ định câu sau.','1159980'],
[1,'research-role','研究者','ハナさんは大学の研究者です。ミンさんは会社の社員です。','Thông tin nào đúng về Hana?',['là sinh viên','không phải nhà nghiên cứu','là nhà nghiên cứu'],2,'大学の研究者です nói Hana là nhà nghiên cứu tại đại học; ミンさん là chủ đề khác. Không suy ra chuyên ngành hoặc tuổi của Hana.','1258590'],
[1,'university-role','大学','キムさんは大学の学生です。リンさんも大学の学生です。','大学 trong hồ sơ của cả hai là loại cơ sở nào?',['đại học','công ty','bệnh viện'],0,'大学 là đại học; の nối trường và người học. も cho biết Linh cũng là sinh viên đại học, không đủ thông tin để nói cùng một trường.','1413240'],
[1,'high-school-role','高校生','高校生はミンさんです。留学生はリーさんです。','Chỉ từ hai câu này, ai được nói rõ là học sinh THPT?',['Lee','Minh','cả hai chắc chắn'],1,'高校生 là học sinh THPT. 留学生 chỉ người du học; không xác định cấp học của Lee. Đây là hai cách phân loại khác nhau.','1283510'],
[1,'exchange-role','留学生','リーさんは大学の留学生です。ナムさんは大学の先生です。','留学生 bổ sung thông tin gì về Lee?',['là giáo viên đại học','là nhân viên công ty','là người du học'],2,'留学生 là người đi học ở nước ngoài; 大学の留学生 nói du học sinh ở đại học. Không suy quốc tịch hoặc tuổi từ câu này.','1552750'],
[2,'dictionary-owner','辞書','これはリンさんの辞書です。それはキムさんの本です。','Đồ vật nào của Linh được nêu rõ?',['từ điển','quyển vở','tạp chí'],0,'辞書 là từ điển; リンさんの gắn người sở hữu. 本 ở câu sau là sách của Kim, không thay thế cho 辞書 ở câu đầu.','1318970'],
[2,'magazine-not-book','雑誌','この雑誌は先生のです。その本は学生のです。','Đồ vật của giáo viên trong câu đầu là gì?',['tờ báo','tạp chí','sổ tay'],1,'雑誌 là tạp chí. 先生のです lược danh từ đã biết sau の; không nói mọi đồ vật đều của giáo viên.','1299400'],
[2,'newspaper-owner','新聞','この新聞はナムさんのです。あの雑誌はリンさんのです。','Chọn thông tin giữ đúng loại đồ vật và chủ sở hữu.',['tạp chí này của Nam','tờ báo này của Linh','tờ báo này của Nam'],2,'新聞 là báo; この新聞はナムさんのです nói tờ báo này của Nam. あの雑誌 là tạp chí kia, chủ là Linh.','1362360'],
[2,'card-owner','名刺','これは先生の名刺です。それは学生の手帳です。','名刺 trong đồ vật được chỉ gần người nói là gì?',['danh thiếp','sổ tay','bút bi'],0,'名刺 là danh thiếp; 手帳 ở câu sau là sổ tay. これ đứng độc lập làm chủ đề; không gắn trực tiếp danh từ như この.','1531550'],
[2,'pen-owner','ボールペン','そのボールペンはキムさんのです。この鉛筆は私のです。','Đồ vật nào được nói là của Kim?',['bút chì','bút bi','cả hai'],1,'ボールペン là bút bi. 鉛筆 là bút chì; 私のです nói của người đang nói, không mặc định cũng là Kim.','1123590'],
[2,'eraser-not-pencil','消しゴム','これは消しゴムです。鉛筆ではありません。','Chọn cách hiểu giữ cả khẳng định và phủ định.',['đây là bút chì, không phải cục tẩy','chưa biết là đồ gì','đây là cục tẩy, không phải bút chì'],2,'消しゴムです nêu cục tẩy; 鉛筆ではありません phủ nhận bút chì. Không đổi hai danh từ hoặc bỏ ý phủ định.','1350080'],
[3,'cafeteria-floor','食堂','この学校の食堂は四階です。','Nhà ăn của trường ở tầng mấy?',['tầng hai','tầng bốn','tầng một'],1,'この学校の食堂は四階です cho biết nhà ăn ở tầng bốn. Câu không đưa thêm dữ kiện về những tầng khác.','1358550'],
[3,'shoe-price','いくら','この靴はいくらですか。千円です。あのかばんは三千円です。','Đôi giày giá bao nhiêu?',['1.000 yên','3.000 yên','100 yên'],0,'千円 là giá của đôi giày được hỏi; 三千円 là giá chiếc cặp khác, không phải giá đôi giày.','1219980'],
[4,'morning-opening-time','午前','図書館は午前九時から午後六時までです。銀行は午前九時から午後五時までです。','Thư viện mở cửa lúc mấy giờ?',['9 giờ sáng','6 giờ chiều','9 giờ tối'],0,'午前九時 là 9 giờ sáng; 午後六時 là giờ đóng cửa. Theo lịch đã cho, câu không nói thư viện mở đến 9 giờ tối.','1269060'],
[4,'weekday-routine','毎日','月曜日から金曜日まで毎日、私は六時に起きます。土曜日は七時に起きます。','Từ thứ Hai đến thứ Sáu, người nói thức dậy lúc mấy giờ?',['6 giờ','7 giờ','không có thông tin'],0,'毎日 ở đây chỉ từng ngày trong khoảng thứ Hai đến thứ Sáu; 土曜日 được nêu riêng là 7 giờ.','1524720'],
[5,'friend-comes','来ます','明日、友達は私の家へ来ます。日曜日、私は友達の家へ行きます。','Ngày mai, người bạn sẽ làm gì?',['đến nhà người nói','người nói đến nhà bạn','không có thông tin'],0,'明日、友達は私の家へ来ます: người bạn đến nhà người nói. Câu sau đổi người đi và ngày.','1547720'],
[5,'subway-to-school','地下鉄','駅から学校まで地下鉄で行きます。駅から会社までバスで行きます。','Người nói đến trường bằng phương tiện nào?',['xe buýt','tàu điện ngầm','đi bộ'],1,'地下鉄で chỉ phương tiện đi đến trường; バスで là phương tiện đến công ty.','1420900'],
];
export function contextualSupplementFor(n) {
 return items.filter(x=>x[0]===n).map(([lesson,key,word,passage,prompt,choices,answer,explanation,entryId])=>({
  id:'n5-assessment-r1-'+String(lesson).padStart(2,'0')+'-context-'+key,
  assessment:true,sourceLessonId:'mnn-'+String(lesson).padStart(2,'0'),
  prompt:passage+'\n'+prompt,choices,answer,explanation,
  skill:'từ theo ngữ cảnh',assessesWords:[word],wordKey:word,
  usageId:'mnn-'+String(lesson).padStart(2,'0')+':'+word,
  sourceEvidence:{dictionary:'JMdict',entryId,scope:'Selected lexical meaning in existing lesson source record; new authored context reviewed by authoring assistant only',reviewedAt:'2026-11-13'},
  validationStatus:'project-authored; source-compared lexical sense; no independent academic review',
  assessmentScope:'Meaning recognition in a new written context only; not listening, free production, delayed retention or all senses',
 }));
}
