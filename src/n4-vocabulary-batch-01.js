const groups={
  'public-procedures':{
    links:[26,27,34],
    reason:'Read notices, submit a form, ask for help at a public counter, and understand local facilities and fees.'
  },
  'medical-communication':{
    links:[29,39],
    reason:'Describe common symptoms and understand routine health-check or pharmacy communication; examples are language practice, not medical advice.'
  },
  'emergency-safety':{
    links:[32,33,45],
    reason:'Understand common safety signs, disaster-preparedness notices, and basic emergency communication.'
  }
};

const verbs=new Set(['申し込む','受け取る','受ける','指定','避難','転ぶ','ぶつける','逃げる','助ける','助かる','倒れる','揺れる','あわてる','落ち着く']);
const adjectives=new Set(['だるい','危ない']);
const signs=new Set(['立入禁止','通行止め','工事中']);
const kanaAudioTexts=new Map([
  ['薬局でかぜ薬について質問します。','やっきょくでかぜぐすりについてしつもんします。']
]);
const audioReadings=new Map([
  ['市役所で手続きをします。','しやくしょでてつずきおします'],
  ['窓口で申込書を出します。','まどぐちでもおしこみしょおだします'],
  ['受付で免許証を見せます。','うけつけでめんきょしょおおみせます'],
  ['申込書に名前を書きます。','もおしこみしょになまえおかきます'],
  ['申し込みは今日までです。','もおしこみわきょおまでです'],
  ['講座に申し込む方法を聞きます。','こおざにもおしこむほおほおおききます'],
  ['手続きはこの窓口でできます。','てつずきわこのまどぐちでできます'],
  ['担当の人に質問します。','たんとおのひとにしつもんします'],
  ['来週、健康診断を受けます。','らいしゅうけんこおしんだんおうけます'],
  ['申し込みの期間は今月までです。','もおしこみのきかんわこんげつまでです'],
  ['指定された場所で待ちます。','してえされたばしょでまちます'],
  ['症状を医師に説明します。','しょおじょおおいしにせつめえします'],
  ['せきが三日続いています。','せきがみっかつずいています'],
  ['昨日から下痢が続いています。','きのおからげりがつずいています'],
  ['花粉症で目がかゆいです。','かふんしょおでめがかゆいです'],
  ['消防署で防災について聞きます。','しょおぼおしょでぼおさいについてききます'],
  ['火災の時は非常口へ行きます。','かさいのときわひじょおぐちえいきます'],
  ['災害に備えて水を用意します。','さいがいにそなえてみずおよおいします'],
  ['学校で防災の訓練をします。','がっこおでぼおさいのくんれんおします'],
  ['非常口の場所を確認してください。','ひじょおぐちのばしょおかくにんしてください'],
  ['消火器は入口の近くにあります。','しょおかきわいりぐちのちかくにあります'],
  ['ニュースで震源を確認しました。','にゅうすでしんげんおかくにんしました'],
  ['工事中なので、ここは立入禁止です。','こおじちゅうなのでここわたちいりきんしです'],
  ['大雨でこの道は通行止めです。','おおあめでこのみちわつうこおどめです'],
  ['この建物は工事中です。','このたてものわこおじちゅうです'],
  ['停電に備えて懐中電灯を置きます。','てえでんにそなえてかいちゅうでんとおおおきます'],
  ['店でろうそくを買いました。','みせでろおそくおかいました'],
  ['寒い夜は毛布を使います。','さむいよるわもおふおつかいます'],
  ['屋外で防災訓練をします。','おくがいでぼおさいくんれんおします'],
  ['水をきれいな容器に入れます。','みずおきれいなよおきにいれます'],
  ['この講座は無料です。','このこおざわむりょおです'],
  ['この駐車場は有料です。','このちゅうしゃじょおわゆうりょおです'],
  ['公共施設の使い方を聞きます。','こおきょおしせつのつかいかたおききます'],
  ['処方せんを薬局に出します。','しょほおせんおやっきょくにだします'],
  ['薬局でかぜ薬について質問します。','やっきょくでかぜぐすりについてしつもんします'],
  ['会社で健康診断を受けます。','かいしゃでけんこおしんだんおうけます'],
  ['学校で予防接種の案内をもらいました。','がっこおでよぼおせっしゅのあんないおもらいました']
]);
const rows=[
  [26,'役所','やくしょ','cơ quan hành chính','明日、役所で住所を変更します。','あした、やくしょでじゅうしょをへんこうします。','Ngày mai tôi sẽ đổi địa chỉ tại cơ quan hành chính.','1538020','public-procedures'],
  [26,'市役所','しやくしょ','tòa thị chính; văn phòng hành chính thành phố','市役所で手続きをします。','しやくしょでてつづきをします。','Tôi làm thủ tục tại tòa thị chính.','1308760','public-procedures'],
  [26,'窓口','まどぐち','quầy tiếp nhận; quầy giao dịch','窓口で申込書を出します。','まどぐちでもうしこみしょをだします。','Tôi nộp đơn tại quầy tiếp nhận.','1401420','public-procedures'],
  [27,'免許証','めんきょしょう','giấy phép; bằng lái xe (tùy ngữ cảnh)','受付で免許証を見せます。','うけつけでめんきょしょうをみせます。','Tôi xuất trình bằng lái ở quầy tiếp nhận.','1533150','public-procedures'],
  [27,'パスポート','パスポート','hộ chiếu','空港でパスポートを見せます。','くうこうでぱすぽおとをみせます。','Tôi xuất trình hộ chiếu ở sân bay.','1101510','public-procedures'],
  [27,'ビザ','ビザ','thị thực; visa','ビザの期間を確認します。','びざのきかんをかくにんします。','Tôi kiểm tra thời hạn thị thực.','1104720','public-procedures'],
  [27,'書類','しょるい','giấy tờ; tài liệu','必要な書類を持って来ました。','ひつようなしょるいをもってきました。','Tôi đã mang các giấy tờ cần thiết đến.','1344200','public-procedures'],
  [27,'申込書','もうしこみしょ','đơn đăng ký','申込書に名前を書きます。','もうしこみしょになまえをかきます。','Tôi viết tên vào đơn đăng ký.','1605150','public-procedures'],
  [27,'申し込み','もうしこみ','việc đăng ký; đơn yêu cầu','申し込みは今日までです。','もうしこみはきょうまでです。','Hạn đăng ký là đến hôm nay.','1605140','public-procedures'],
  [27,'申し込む','もうしこむ','đăng ký; nộp đơn','講座に申し込む方法を聞きます。','こうざにもうしこむほうほうをききます。','Tôi hỏi cách đăng ký khóa học.','1362890','public-procedures'],
  [27,'手続き','てつづき','thủ tục','手続きはこの窓口でできます。','てつづきはこのまどぐちでできます。','Có thể làm thủ tục tại quầy này.','1598350','public-procedures'],
  [27,'本人','ほんにん','chính người đó; đương sự','本人が窓口に来てください。','ほんにんがまどぐちにきてください。','Xin chính người đó đến quầy tiếp nhận.','1522750','public-procedures'],
  [27,'担当','たんとう','phụ trách; người phụ trách','担当の人に質問します。','たんとうのひとにしつもんします。','Tôi hỏi người phụ trách.','1418160','public-procedures'],
  [27,'係員','かかりいん','nhân viên phụ trách; nhân viên hướng dẫn','分からない時は係員に聞いてください。','わからないときはかかりいんにきいてください。','Khi không rõ, hãy hỏi nhân viên phụ trách.','1589850','public-procedures'],
  [27,'受け取る','うけとる','nhận; tiếp nhận','窓口で書類を受け取ります。','まどぐちでしょるいをうけとります。','Tôi nhận giấy tờ tại quầy.','1329650','public-procedures'],
  [27,'受ける','うける','nhận; tham gia (khám, thi, dịch vụ)','来週、健康診断を受けます。','らいしゅう、けんこうしんだんをうけます。','Tuần tới tôi sẽ đi khám sức khỏe định kỳ.','1329590','public-procedures',4],
  [27,'変更','へんこう','thay đổi; điều chỉnh','住所の変更をお願いします。','じゅうしょのへんこうをおねがいします。','Xin vui lòng thay đổi địa chỉ.','1511040','public-procedures'],
  [27,'問い合わせ','といあわせ','việc hỏi thông tin; yêu cầu giải đáp','電話で問い合わせをしました。','でんわでといあわせをしました。','Tôi đã gọi điện hỏi thông tin.','1598590','public-procedures'],
  [34,'施設','しせつ','cơ sở; công trình; cơ sở dịch vụ','この施設はだれでも使えます。','このしせつはだれでもつかえます。','Ai cũng có thể sử dụng cơ sở này.','1310410','public-procedures'],
  [34,'市内','しない','trong thành phố','市内のバスは便利です。','しないのばすはべんりです。','Xe buýt trong thành phố rất tiện.','1308640','public-procedures'],
  [34,'市立','しりつ','do thành phố quản lý','市立図書館は九時に開きます。','しりつとしょかんはくじにひらきます。','Thư viện thành phố mở cửa lúc chín giờ.','1308820','public-procedures'],
  [34,'無料','むりょう','miễn phí','この講座は無料です。','このこうざはむりょうです。','Khóa học này miễn phí.','1531040','public-procedures'],
  [34,'有料','ゆうりょう','có thu phí','この駐車場は有料です。','このちゅうしゃじょうはゆうりょうです。','Bãi đỗ xe này có thu phí.','1541690','public-procedures'],
  [34,'公共','こうきょう','công cộng','公共施設の使い方を聞きます。','こうきょうしせつのつかいかたをききます。','Tôi hỏi cách sử dụng cơ sở công cộng.','1273510','public-procedures'],
  [27,'金額','きんがく','số tiền; khoản tiền','金額をもう一度確認してください。','きんがくをもういちどかくにんしてください。','Xin hãy kiểm tra lại số tiền một lần nữa.','1242700','public-procedures'],
  [27,'期間','きかん','thời hạn; khoảng thời gian','申し込みの期間は今月までです。','もうしこみのきかんはこんげつまでです。','Thời hạn đăng ký kéo dài đến hết tháng này.','1220550','public-procedures'],
  [27,'指定','してい','chỉ định; được chỉ định','指定された場所で待ちます。','していされたばしょでまちます。','Tôi đợi ở địa điểm được chỉ định.','1309910','public-procedures'],
  [29,'症状','しょうじょう','triệu chứng','症状を医師に説明します。','しょうじょうをいしにせつめいします。','Tôi mô tả triệu chứng với bác sĩ.','1351030','medical-communication'],
  [29,'せき','せき','ho; cơn ho','せきが三日続いています。','せきがみっかつづいています。','Tôi đã ho liên tục ba ngày.','1204300','medical-communication'],
  [29,'くしゃみ','くしゃみ','hắt hơi; cái hắt hơi','花粉の季節はくしゃみが出ます。','かふんのきせつはくしゃみがでます。','Vào mùa phấn hoa, tôi bị hắt hơi.','1003710','medical-communication'],
  [29,'鼻水','はなみず','nước mũi','鼻水が出るので、ティッシュを使います。','はなみずがでるので、てぃっしゅをつかいます。','Tôi dùng khăn giấy vì bị chảy nước mũi.','1487060','medical-communication'],
  [29,'吐き気','はきけ','buồn nôn','少し吐き気があります。','すこしはきけがあります。','Tôi hơi buồn nôn.','1444120','medical-communication'],
  [29,'下痢','げり','tiêu chảy','昨日から下痢が続いています。','きのうからげりがつづいています。','Tôi bị tiêu chảy từ hôm qua đến nay.','1186540','medical-communication'],
  [29,'腹痛','ふくつう','đau bụng','食事のあと、腹痛がありました。','しょくじのあと、ふくつうがありました。','Sau bữa ăn, tôi bị đau bụng.','1501230','medical-communication'],
  [29,'胃','い','dạ dày','胃が痛いと医師に伝えました。','いがいたいといしにつたえました。','Tôi đã nói với bác sĩ rằng mình đau dạ dày.','1158500','medical-communication'],
  [29,'インフルエンザ','インフルエンザ','cúm mùa; cúm influenza','インフルエンザで学校を休みました。','いんふるえんざでがっこうをやすみました。','Tôi nghỉ học vì bị cúm.','1024400','medical-communication'],
  [29,'アレルギー','アレルギー','dị ứng','卵のアレルギーについて店員に伝えます。','たまごのあれるぎいについててんいんにつたえます。','Tôi nói với nhân viên cửa hàng về dị ứng trứng.','1019740','medical-communication'],
  [29,'花粉症','かふんしょう','dị ứng phấn hoa','花粉症で目がかゆいです。','かふんしょうでめがかゆいです。','Mắt tôi ngứa do dị ứng phấn hoa.','1194900','medical-communication'],
  [29,'けが','けが','vết thương; chấn thương','転んでけがをしました。','ころんでけがをしました。','Tôi bị thương do ngã.','1200220','medical-communication'],
  [29,'傷','きず','vết thương; vết xước','手に小さな傷があります。','てにちいさなきずがあります。','Tôi có một vết xước nhỏ trên tay.','1580260','medical-communication'],
  [29,'骨','ほね','xương','この図で骨の場所を確認します。','このずでほねのばしょをかくにんします。','Tôi kiểm tra vị trí xương trên sơ đồ này.','1288550','medical-communication'],
  [29,'食欲','しょくよく','cảm giác thèm ăn; khẩu vị','今日は食欲がありません。','きょうはしょくよくがありません。','Hôm nay tôi không thấy ngon miệng.','1358660','medical-communication'],
  [39,'食後','しょくご','sau bữa ăn','食後の予定をノートに書きます。','しょくごのよていをのおとにかきます。','Tôi ghi kế hoạch sau bữa ăn vào sổ.','1358450','medical-communication'],
  [39,'処方せん','しょほうせん','đơn thuốc','処方せんを薬局に出します。','しょほうせんをやっきょくにだします。','Tôi nộp đơn thuốc ở hiệu thuốc.','1655680','medical-communication'],
  [39,'かぜ薬','かぜぐすり','thuốc cảm','薬局でかぜ薬について質問します。','やっきょくでかぜぐすりについてしつもんします。','Tôi hỏi về thuốc cảm ở hiệu thuốc.','1609540','medical-communication'],
  [39,'健康診断','けんこうしんだん','khám sức khỏe định kỳ','会社で健康診断を受けます。','かいしゃでけんこうしんだんをうけます。','Tôi đi khám sức khỏe định kỳ ở công ty.','1256210','medical-communication'],
  [39,'レントゲン','レントゲン','ảnh/chụp X-quang','病院でレントゲンを撮りました。','びょういんでれんとげんをとりました。','Tôi đã chụp X-quang ở bệnh viện.','1146230','medical-communication'],
  [39,'予防接種','よぼうせっしゅ','tiêm chủng','学校で予防接種の案内をもらいました。','がっこうでよぼうせっしゅのあんないをもらいました。','Tôi nhận được thông báo tiêm chủng ở trường.','1543690','medical-communication'],
  [39,'うがい','うがい','súc miệng; súc họng','帰ったら、うがいをします。','かえったら、うがいをします。','Khi về nhà, tôi súc miệng.','1577660','medical-communication'],
  [39,'手洗い','てあらい','việc rửa tay','食事の前に手洗いをします。','しょくじのまえにてあらいをします。','Tôi rửa tay trước bữa ăn.','1328020','medical-communication'],
  [39,'睡眠','すいみん','giấc ngủ; việc ngủ','睡眠の時間を日記に書きます。','すいみんのじかんをにっきにかきます。','Tôi ghi thời lượng ngủ vào nhật ký.','1372370','medical-communication'],
  [39,'ストレス','ストレス','căng thẳng; stress','ストレスがたまった時、散歩します。','すとれすがたまったとき、さんぽします。','Khi căng thẳng tích tụ, tôi đi dạo.','1071490','medical-communication'],
  [29,'だるい','だるい','mệt mỏi; uể oải','今日は体がだるいです。','きょうはからだがだるいです。','Hôm nay người tôi uể oải.','1007520','medical-communication'],
  [29,'転ぶ','ころぶ','ngã; té','雨の日に道で転びました。','あめのひにみちでころびました。','Tôi bị ngã trên đường vào ngày mưa.','1582130','medical-communication'],
  [29,'ぶつける','ぶつける','va; đập vào','机に足をぶつけました。','つくえにあしをぶつけました。','Tôi va chân vào bàn.','2742080','medical-communication'],
  [32,'危ない','あぶない','nguy hiểm; coi chừng','この道は車が多くて危ないです。','このみちはくるまがおおくてあぶないです。','Con đường này nguy hiểm vì có nhiều xe.','1218380','emergency-safety'],
  [32,'救急車','きゅうきゅうしゃ','xe cứu thương','けがをした人のために救急車を呼びました。','けがをしたひとのためにきゅうきゅうしゃをよびました。','Tôi đã gọi xe cứu thương cho người bị thương.','1229100','emergency-safety'],
  [32,'消防署','しょうぼうしょ','trạm cứu hỏa','消防署で防災について聞きます。','しょうぼうしょでぼうさいについてききます。','Tôi hỏi về phòng chống thiên tai ở trạm cứu hỏa.','1350370','emergency-safety'],
  [32,'火災','かさい','hỏa hoạn; vụ cháy','火災の時は非常口へ行きます。','かさいのときはひじょうぐちへいきます。','Khi có hỏa hoạn, tôi đi đến lối thoát hiểm.','1193880','emergency-safety'],
  [32,'災害','さいがい','thảm họa; thiên tai','災害に備えて水を用意します。','さいがいにそなえてみずをよういします。','Tôi chuẩn bị nước để đề phòng thiên tai.','1295100','emergency-safety'],
  [32,'防災','ぼうさい','phòng chống thiên tai','学校で防災の訓練をします。','がっこうでぼうさいのくんれんをします。','Ở trường, chúng tôi diễn tập phòng chống thiên tai.','1520360','emergency-safety'],
  [32,'避難','ひなん','sơ tán; lánh nạn','地震の時の避難場所を確認します。','じしんのときのひなんばしょをかくにんします。','Tôi kiểm tra địa điểm sơ tán khi có động đất.','1484660','emergency-safety'],
  [32,'非常口','ひじょうぐち','lối thoát hiểm','非常口の場所を確認してください。','ひじょうぐちのばしょをかくにんしてください。','Xin hãy kiểm tra vị trí lối thoát hiểm.','1484950','emergency-safety'],
  [32,'消火器','しょうかき','bình chữa cháy','消火器は入口の近くにあります。','しょうかきはいりぐちのちかくにあります。','Bình chữa cháy ở gần lối vào.','1350170','emergency-safety'],
  [32,'津波','つなみ','sóng thần','この地域の津波避難地図を見ます。','このちいきのつなみひなんちずをみます。','Tôi xem bản đồ sơ tán sóng thần của khu vực này.','1432220','emergency-safety'],
  [32,'震度','しんど','cường độ rung chấn','テレビで地震の震度を確認しました。','てれびでじしんのしんどをかくにんしました。','Tôi đã kiểm tra cường độ rung chấn trên TV.','1366380','emergency-safety'],
  [32,'震源','しんげん','tâm chấn','ニュースで震源を確認しました。','にゅうすでしんげんをかくにんしました。','Tôi đã kiểm tra tâm chấn trên bản tin.','1366350','emergency-safety'],
  [32,'煙','けむり','khói','火事で煙が出ています。','かじでけむりがでています。','Có khói bốc ra từ đám cháy.','1177180','emergency-safety'],
  [32,'逃げる','にげる','chạy thoát; lánh khỏi nguy hiểm','危ない時は、安全な場所へ逃げます。','あぶないときは、あんぜんなばしょへにげます。','Khi nguy hiểm, tôi chạy đến nơi an toàn.','1450330','emergency-safety'],
  [32,'助ける','たすける','giúp; cứu giúp','安全な場所から、困っている人を助けます。','あんぜんなばしょから、こまっているひとをたすけます。','Tôi giúp người gặp khó khăn từ một nơi an toàn.','1344410','emergency-safety'],
  [32,'助かる','たすかる','được cứu; thoát nạn','みんなが無事で、本当に助かりました。','みんながぶじで、ほんとうにたすかりました。','Mọi người đều bình an, thật may quá.','1344380','emergency-safety'],
  [32,'倒れる','たおれる','đổ; ngã; sập','強い風で木が倒れました。','つよいかぜできがたおれました。','Cây đã đổ vì gió mạnh.','1445790','emergency-safety'],
  [32,'揺れる','ゆれる','rung; lắc; lay động','地震で窓が揺れました。','じしんでまどがゆれました。','Cửa sổ rung lên vì động đất.','1545710','emergency-safety'],
  [32,'あわてる','あわてる','hoảng hốt; cuống lên','あわてずに、係員の話を聞きます。','あわてずに、かかりいんのはなしをききます。','Tôi không hoảng hốt mà nghe hướng dẫn của nhân viên.','1278830','emergency-safety'],
  [32,'落ち着く','おちつく','bình tĩnh lại; ổn định','まず落ち着いて、案内を聞きます。','まずおちついて、あんないをききます。','Trước hết, tôi bình tĩnh và nghe hướng dẫn.','1589220','emergency-safety'],
  [33,'立入禁止','たちいりきんし','cấm vào; không phận sự miễn vào','工事中なので、ここは立入禁止です。','こうじちゅうなので、ここはたちいりきんしです。','Vì đang thi công nên nơi này cấm vào.','1597010','emergency-safety'],
  [33,'通行止め','つうこうどめ','đường bị chặn; cấm lưu thông','大雨でこの道は通行止めです。','おおあめでこのみちはつうこうどめです。','Con đường này bị chặn do mưa lớn.','1433190','emergency-safety'],
  [33,'工事中','こうじちゅう','đang thi công','この建物は工事中です。','このたてものはこうじちゅうです。','Tòa nhà này đang được thi công.','1278150','emergency-safety'],
  [33,'ヘルメット','ヘルメット','mũ bảo hộ; mũ bảo hiểm','自転車に乗る時、ヘルメットをかぶります。','じてんしゃにのるとき、へるめっとをかぶります。','Khi đi xe đạp, tôi đội mũ bảo hiểm.','1119000','emergency-safety'],
  [33,'懐中電灯','かいちゅうでんとう','đèn pin','停電に備えて懐中電灯を置きます。','ていでんにそなえてかいちゅうでんとうをおきます。','Tôi để sẵn đèn pin để đề phòng mất điện.','1200600','emergency-safety'],
  [33,'ろうそく','ろうそく','nến','店でろうそくを買いました。','みせでろうそくをかいました。','Tôi đã mua nến ở cửa hàng.','1561240','emergency-safety'],
  [33,'毛布','もうふ','chăn; mền','寒い夜は毛布を使います。','さむいよるはもうふをつかいます。','Tôi dùng chăn vào đêm lạnh.','1533950','emergency-safety'],
  [33,'優先','ゆうせん','ưu tiên','安全を優先して、ゆっくり進みます。','あんぜんをゆうせんして、ゆっくりすすみます。','Tôi ưu tiên an toàn và di chuyển chậm rãi.','1539390','emergency-safety'],
  [33,'屋外','おくがい','ngoài trời','屋外で防災訓練をします。','おくがいでぼうさいくんれんをします。','Chúng tôi diễn tập phòng chống thiên tai ngoài trời.','1182680','emergency-safety'],
  [33,'容器','ようき','đồ đựng; vật chứa','水をきれいな容器に入れます。','みずをきれいなようきにいれます。','Tôi cho nước vào một vật chứa sạch.','1545370','emergency-safety']
];

export const n4VocabularyBatch01=rows.map(([lessonNumber,text,reading,meaning,ja,kana,vi,entryId,group,senseIndex=0])=>({
  lessonNumber,text,reading,meaning,group,
  type:signs.has(text)?'biển báo/biểu thức':verbs.has(text)?'động từ':adjectives.has(text)?'tính từ い':'danh từ',
  reason:`${groups[group].reason} This item is used in the example and supports the linked task.`,
  curriculum:{edition:'Minna no Nihongo Shokyu II, second edition; project functional alignment only',lessonNumber},
  role:'trọng tâm theo nhiệm vụ; chủ động nhận diện và vận dụng',
  example:{ja,reading:kana,...(audioReadings.has(ja)?{audioReading:audioReadings.get(ja),audioText:kanaAudioTexts.get(ja)||ja}:{}),vi},
  sourceReview:{
    entryId,senseIds:[`${entryId}-s${senseIndex}`],
    status:'Vietnamese meaning authored in context; JMdict sense selected; not independently reviewed',
    batchId:'n4-vocabulary-01',rationale:groups[group].reason,
    ...(text==='うがい'?{matcherCorrection:{discardedEntryId:'1172200',reason:'Same kana is also used for cormorant fishing; selected JMdict 1577660 is the gargling sense.'}}:{})
  }
}));

export function applyN4VocabularyBatch01(units){
  for(const item of n4VocabularyBatch01){
    const unit=units.find(candidate=>candidate.number===item.lessonNumber);
    if(!unit)throw Error(`Missing N4 lesson ${item.lessonNumber} for ${item.text}`);
    if(unit.words.some(word=>word.text===item.text&&word.reading===item.reading))throw Error(`N4 vocabulary batch duplicate ${item.text}/${item.reading}`);
    if(!groups[item.group]?.links.includes(item.lessonNumber))throw Error(`Lesson ${item.lessonNumber} is outside ${item.group} functional links`);
    unit.words.push({...item});
  }
}
