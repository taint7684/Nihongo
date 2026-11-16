// Project-authored reading practice. Not JLPT material, a validated assessment, or independently approved Japanese.
const rows = [
 {n:26,title:'Tin nhắn xin hướng dẫn khi đến muộn',
 text:'先生へ。明日の午前の授業なんですが、病院へ行きますから、少し遅れます。昨日から頭が痛いんです。十時ごろ学校に着きます。先に教室へ行ったらいいですか。それとも、先生の部屋へ行ったらいいですか。宿題はもうしました。ノートは友達に見せてもらいます。どうぞよろしくお願いします。',
 vi:'Gửi thầy/cô. Về buổi học sáng mai, vì em đến bệnh viện nên sẽ đến muộn một chút. Từ hôm qua em bị đau đầu. Khoảng 10 giờ em đến trường. Em nên đến lớp trước, hay đến phòng thầy/cô? Em đã làm bài tập rồi. Em sẽ nhờ bạn cho xem vở. Em mong thầy/cô giúp đỡ.',
 glossary:[['着きます','つきます','đến nơi'],['先に','さきに','trước, trước tiên'],['ごろ','ごろ','khoảng; gắn sau mốc giờ'],['それとも','それとも','hay là; nối các lựa chọn trong câu hỏi']],
 questions:[
 ['reason','Vì sao người viết sẽ đến muộn?',['phải đến bệnh viện vì đau đầu','chưa làm bài tập','đợi bạn ở nhà'],0,'病院へ行きますから và 昨日から頭が痛いんです nêu lý do. Bài tập đã làm xong; không có thông tin đợi bạn.','病院へ行きますから'],
 ['arrival','Mười giờ trong tin nhắn là mốc nào?',['giờ bệnh viện mở cửa','khoảng giờ người viết đến trường','giờ buổi học chắc chắn bắt đầu'],1,'十時ごろ学校に着きます nói giờ đến trường ước chừng. Không được biến thành giờ bắt đầu lớp hoặc bệnh viện.','十時ごろ学校に着きます'],
 ['unresolved','Điều gì người viết đang xin hướng dẫn, chưa có câu trả lời trong tin?',['đã làm bài tập hay chưa','sẽ nhờ ai cho xem vở','nên đến lớp hay phòng giáo viên trước'],2,'Hai câu 行ったらいいですか và それとも đưa ra lựa chọn nơi đến trước; tin nhắn chưa chứa phản hồi của giáo viên.','先に教室へ行ったらいいですか'],
 ]},
 {n:27,title:'Chọn phòng theo điều kiện thật',
 text:'新しい部屋は駅の近くにあります。窓から山が見えますが、海は見えません。前の部屋では電車の音がよく聞こえました。この部屋ではあまり聞こえません。台所は小さいです。料理はできますが、大きい冷蔵庫は置けません。本棚には日本語の本が十冊しかありません。友達と二人で住みます。',
 vi:'Phòng mới ở gần ga. Từ cửa sổ nhìn thấy núi nhưng không thấy biển. Ở phòng trước thường nghe rõ tiếng tàu. Ở phòng này không nghe nhiều. Bếp nhỏ. Có thể nấu ăn, nhưng không đặt được tủ lạnh lớn. Trên giá chỉ có 10 quyển sách tiếng Nhật. Tôi sẽ ở cùng bạn, hai người.',
 glossary:[['台所','だいどころ','bếp'],['冷蔵庫','れいぞうこ','tủ lạnh'],['本棚','ほんだな','giá sách'],['住みます','すみます','sống, cư trú'],['置けません','おけません','không thể đặt; thể khả năng phủ định của 置きます']],
 questions:[
 ['view','Ở phòng mới, thông tin nhìn/nghe nào đúng?',['không thấy núi nhưng thấy biển','thấy núi và ít nghe tiếng tàu','thấy biển và luôn nghe rõ tiếng tàu'],1,'山が見えます đối lập 海は見えません. この部屋ではあまり聞こえません nối với tiếng tàu ở hai câu trước.','山が見えますが、海は見えません'],
 ['limitation','Hạn chế được nêu rõ của bếp là gì?',['hoàn toàn không nấu ăn được','không có cửa sổ','không đặt được tủ lạnh lớn'],2,'料理はできます xác nhận nấu ăn được; điều bị giới hạn là 大きい冷蔵庫は置けません.','大きい冷蔵庫は置けません'],
 ['books','Mười quyển là số lượng của nhóm nào?',['sách tiếng Nhật trên giá','tất cả sách của hai người ở mọi nơi','tất cả vật trong phòng'],0,'日本語の本が十冊しかありません chỉ nhóm sách tiếng Nhật trên giá. Không nói toàn bộ sách hoặc đồ vật.','本棚には日本語の本が十冊しかありません'],
 ]},
 {n:28,title:'Hai cách luyện ở hai nơi',
 text:'私は仕事をしています。夜、日本語の学校に通っています。学校は家から近いし、先生も熱心だし、毎週月曜日と木曜日に勉強しています。電車の中では音楽を聞きながら、漢字のカードを見ています。でも、家では音楽を消して、声を出して読みます。来月、試験がありますから、今週は毎晩三十分練習します。',
 vi:'Tôi đi làm. Buổi tối tôi theo học tiếng Nhật. Trường gần nhà, giáo viên cũng nhiệt tình; mỗi tuần tôi học vào thứ Hai và thứ Năm. Trên tàu tôi vừa nghe nhạc vừa xem thẻ Kanji. Nhưng ở nhà tôi tắt nhạc và đọc thành tiếng. Tháng sau có kỳ thi, nên tuần này mỗi tối tôi luyện 30 phút.',
 glossary:[['通っています','かよっています','đi đến đều đặn; ở đây là theo học'],['熱心','ねっしん','nhiệt tình, tận tâm'],['声を出して','こえをだして','phát thành tiếng, đọc thành tiếng trong ngữ cảnh này']],
 questions:[
 ['schedule','Ngày học được nêu trong lịch hằng tuần là gì?',['thứ Hai và thứ Năm','mỗi tối trong tuần này','chỉ tháng sau'],0,'毎週月曜日と木曜日 nêu lịch học. 毎晩三十分 là lịch luyện ở tuần này, không thay thế lịch đến lớp.','毎週月曜日と木曜日に勉強しています'],
 ['contrast','Cách luyện ở nhà khác trên tàu ở điểm nào?',['ở nhà chỉ nhìn thẻ, không đọc','trên tàu đọc thành tiếng và tắt nhạc','ở nhà tắt nhạc rồi đọc thành tiếng'],2,'Trên tàu có 聞きながら và カードを見ています; ở nhà là 音楽を消して、声を出して読みます. Không suy hai nơi dùng cùng cách.','家では音楽を消して、声を出して読みます'],
 ['purpose','Vì sao người kể luyện mỗi tối 30 phút trong tuần này?',['sắp chuyển nhà','tháng sau có kỳ thi','giáo viên nghỉ việc'],1,'来月、試験がありますから liên kết kỳ thi tháng sau với việc luyện tuần này. Không có thông tin chuyển nhà hay đổi giáo viên.','来月、試験がありますから'],
 ]},
 {n:29,title:'Thông tin cần thiết khi tìm ví',
 text:'昨日、駅で財布をなくしてしまいました。駅の人に聞きましたが、まだ見つかりません。中には千円とカードが入っています。今日は午後三時にもう一度駅へ行きます。家の鍵はかばんにありますから、家には入れます。財布を見つけた人は、駅の人に渡してください。',
 vi:'Hôm qua tôi làm mất ví ở ga. Đã hỏi nhân viên ga nhưng vẫn chưa tìm thấy. Bên trong có 1.000 yên và thẻ. Hôm nay lúc 3 giờ chiều tôi sẽ đến ga lần nữa. Chìa khóa nhà ở trong túi, nên tôi vẫn vào nhà được. Ai tìm thấy ví xin giao cho nhân viên ga.',
 glossary:[['なくします','なくします','làm mất'],['見つかります','みつかります','được tìm thấy'],['見つけた人','みつけたひと','người đã tìm thấy; 見つけます là tìm thấy một vật'],['もう一度','もういちど','một lần nữa'],['渡してください','わたしてください','xin giao/đưa cho; từ 渡します']],
 questions:[
 ['contents','Nhóm đồ nào được nói rõ là trong ví?',['chìa khóa và 1.000 yên','1.000 yên và thẻ','chìa khóa và vở'],1,'中には千円とカードが入っています nói đồ trong ví. 家の鍵はかばんにあります đặt chìa khóa ở túi, không phải ví.','中には千円とカードが入っています'],
 ['status','Tại thời điểm viết, ví ở trạng thái nào?',['nhân viên đã tìm lại và trả cho chủ','chắc chắn bị lấy cắp','chưa tìm thấy'],2,'まだ見つかりません là chưa tìm thấy. Đoạn chỉ nói làm mất; không khẳng định bị lấy cắp hoặc đã nhận lại.','まだ見つかりません'],
 ['action','Hôm nay người viết dự định làm gì lúc 3 giờ chiều?',['đến ga lần nữa','lần đầu đi hỏi ở ga ngày hôm qua','viết tên lên chiếc chìa khóa'],0,'今日は午後三時にもう一度駅へ行きます nêu ngày, giờ và nơi đến. Không đổi 今日 (hôm nay) thành 昨日 (hôm qua), hoặc hiểu もう一度 là lần đầu.','今日は午後三時にもう一度駅へ行きます'],
 ]},
 {n:30,title:'Chuẩn bị chưa xong cho cuộc họp',
 text:'あした、会社で会議があります。十人が来ます。部屋には机といすが並べてあります。入口に会議の予定が貼ってあります。資料は机の上に置いてありますが、まだ八人分しかありません。私は今日の午後、あと二人分を用意しておきます。会議は午後四時までです。四時に、いすを片づけます。次に部屋を使う人が来ますから、窓は開けておきます。',
 vi:'Ngày mai công ty có cuộc họp 10 người. Bàn và ghế trong phòng đã được sắp xếp. Lịch họp đã được dán ở lối vào. Tài liệu đã được đặt trên bàn nhưng mới đủ 8 người. Chiều nay tôi sẽ chuẩn bị thêm phần cho 2 người. Cuộc họp kéo dài đến 4 giờ chiều. Lúc 4 giờ tôi sẽ dọn ghế. Vì sẽ có người đến dùng phòng tiếp, tôi sẽ để cửa sổ mở.',
 glossary:[['入口','いりぐち','lối vào'],['八人分','はちにんぶん','phần dành cho tám người'],['二人分','ふたりぶん','phần dành cho hai người'],['用意します','よういします','chuẩn bị'],['次に','つぎに','tiếp theo']],
 questions:[
 ['unfinished','Phần chuẩn bị nào còn thiếu trước cuộc họp?',['thêm tài liệu cho hai người','sắp xếp toàn bộ bàn ghế từ đầu','đổi cuộc họp sang tám người'],0,'Cuộc họp có 十人 nhưng tài liệu mới 八人分; người viết sẽ chuẩn bị あと二人分. Bàn ghế đã sắp xếp, không có quyết định giảm người.','まだ八人分しかありません'],
 ['when','Ghế sẽ được dọn lúc nào?',['trước chiều nay','lúc 4 giờ chiều, khi cuộc họp kết thúc','ngay khi lịch được dán'],1,'会議は午後四時までです và 四時に、いすを片づけます nối giờ kết thúc họp với việc dọn ghế. 今日の午後 chỉ buổi chuẩn bị tài liệu.','四時に、いすを片づけます'],
 ['window','Vì sao người viết để cửa sổ mở?',['vì tài liệu chưa được in','vì phòng không có điều hòa','vì sẽ có người đến dùng phòng tiếp'],2,'次に部屋を使う人が来ますから là lý do đã nêu. Đoạn không nói thời tiết, điều hòa hoặc việc in tài liệu.','次に部屋を使う人が来ますから'],
 ]},
];
export function n4ReadingExtensionsFor(n){return rows.filter(r=>r.n===n).map(r=>{
 const id='n4-reading-extension-'+r.n;
 return {id,title:r.title,text:r.text,vi:r.vi,glossary:r.glossary.map(([text,reading,vi])=>({text,reading,vi})),
  questions:r.questions.map(([key,prompt,choices,answer,explanation,evidence])=>({id:id+'-'+key,prompt,choices:[...choices],answer,explanation,skill:'đọc lấy thông tin và liên kết',sourceLessonId:'mnn-'+r.n,evidence,assessment:false})),
  status:'Project-authored reading practice; authoring-assistant review only; no independent academic approval. No audio or full kana transcription verified.',
  sources:[{name:'Minna II second edition: functional sequence only, no textbook passage copied',url:'https://www.3anet.co.jp/np/books/2400/'},{name:'Existing course selected JMdict records for lexical meaning comparison; source dates and licences in source manifest',path:'/dictionaries/source-manifest.json',scope:'Lexical source only; does not certify original sentences or Vietnamese translation.'}],
 };
});}
