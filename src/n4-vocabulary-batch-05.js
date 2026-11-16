const groups={
  'transport-stay':{
    links:[27,29,31,33,35,38,41,42],
    reason:'Follow travel and service notices and respond to timing changes in ordinary transport situations.'
  },
  'appliance-digital-trouble':{
    links:[29,30,33,34,38,40,44,46],
    reason:'Understand everyday device settings and explain a practical feature or operation.'
  },
  'cooking-waste':{
    links:[33,34,38,39,42],
    reason:'Read food labels, prepare a simple meal, clean up and separate household waste.'
  },
  'work-study-development':{
    links:[28,30,33,34,40,41,42,46,49],
    reason:'Read a workplace or school notice, explain a task, share information and coordinate with people.'
  },
  'social-relationships':{
    links:[29,30,31,39,44,45,46,47],
    reason:'Describe relationships and events, react to others, and make or respond to invitations and requests.'
  },
  'travel-culture-reading':{
    links:[27,30,32,35,38,40,42,43,45],
    reason:'Understand short descriptions of places, local events, travel and visible features.'
  },
  'discourse-reading':{
    links:[26,31,33,34,35,42,48,49],
    reason:'Follow reasons, sequence, timing, alternatives and degree in short connected speech and notices.'
  }
};

const verbs=new Set(['温める','煮る','ゆでる','蒸す','分ける','まとめる','くり返す','知り合う','祝う','頼む','誘う']);
const suruNouns=new Set(['所属','通訳','指示','介護','おしゃべり','撮影']);
const adjectives=new Set(['若い']);
const adverbs=new Set(['だから','ですから','それなら','そうしたら','そろそろ','とりあえず','とにかく','ほとんど','かなり','しっかり','ちゃんと','もしかしたら','絶対に','ついでに','まず']);
const typeOverrides=new Map([
  ['半分','danh từ / trạng từ'],
  ['生','danh từ / định ngữ の'],
  ['プラスチック','danh từ / định ngữ の'],
  ['所属','danh từ / động từ する'],
  ['通訳','danh từ / động từ する'],
  ['指示','danh từ / động từ する'],
  ['介護','danh từ / động từ する'],
  ['おしゃべり','danh từ / động từ する'],
  ['撮影','danh từ / động từ する'],
  ['自然','danh từ / tính từ な'],
  ['地元','danh từ / định ngữ の'],
  ['外国','danh từ / định ngữ の'],
  ['本物','danh từ / định ngữ の'],
  ['直接','danh từ / trạng từ'],
  ['今回','danh từ / trạng từ'],
  ['次回','danh từ / trạng từ'],
  ['当日','danh từ / trạng từ'],
  ['本日','danh từ / trạng từ'],
  ['先ほど','danh từ / trạng từ'],
  ['さっき','danh từ / trạng từ'],
  ['別々','danh từ / tính từ な']
]);

const rows=[
  [29,'ラッシュ','ラッシュ','giờ cao điểm','朝のラッシュで、電車がとても混んでいました。','あさのらっしゅで、でんしゃがとてもこんでいました。','Vào giờ cao điểm buổi sáng, tàu rất đông.','1139180',2,'transport-stay',[],'初級2',5,1,false],
  [40,'カラー','カラー','màu (chế độ in màu)','このプリンターはカラーで印刷できます。','このぷりんたあはからあでいんさつできます。','Máy in này có thể in màu.','1038500',0,'appliance-digital-trouble',[],'初級1',13,3,false],
  [34,'油','あぶら','dầu ăn','フライパンに油を少し入れてから、野菜を焼きます。','ふらいぱんにあぶらをすこしいれてから、やさいをやきます。','Cho một ít dầu vào chảo rồi nướng rau.','1538590',0,'cooking-waste',[],'初級2',4,4,false],
  [34,'ソース','ソース','nước xốt','このソースは少し辛いので、少しだけかけます。','このそおすはすこしからいので、すこしだけかけます。','Nước xốt này hơi cay nên tôi chỉ rưới một ít.','1075270',0,'cooking-waste',[],'初級1',11,1,false],
  [34,'バター','バター','bơ','パンにバターをぬってから、朝ご飯を食べました。','ぱんにばたあをぬってから、あさごはんをたべました。','Tôi phết bơ lên bánh mì rồi ăn sáng.','1098620',0,'cooking-waste',['N5'],'初級1',11,3,false],
  [34,'温める','あたためる','hâm nóng','冷めたスープを電子レンジで温めます。','さめたすうぷをでんしれんじであたためます。','Tôi hâm nóng món súp đã nguội bằng lò vi sóng.','1586440',0,'cooking-waste',[],'初級1',16,1,false],
  [34,'煮る','にる','nấu hoặc hầm trong nước','野菜を水で煮て、最後に塩を入れました。','やさいをみずでにて、さいごにしおをいれました。','Tôi nấu rau trong nước rồi cho muối vào sau cùng.','1322540',0,'cooking-waste',[],'初級2',4,4,false],
  [34,'ゆでる','ゆでる','luộc','卵をよくゆでてから、水で冷やしました。','たまごをよくゆでてから、みずでひやしました。','Tôi luộc trứng kỹ rồi làm nguội bằng nước.','1571470',0,'cooking-waste',[],'初級2',4,4,false],
  [34,'蒸す','むす','hấp','魚を野菜といっしょに蒸しました。','さかなをやさいといっしょにむしました。','Tôi hấp cá cùng với rau.','1356900',0,'cooking-waste',[],'初級2',4,4,false],
  [38,'大きさ','おおきさ','kích cỡ','野菜は同じ大きさに切ると、火が通りやすいです。','やさいはおなじおおきさにきると、ひがとおりやすいです。','Nếu cắt rau cùng kích cỡ thì rau dễ chín đều hơn.','1412910',0,'cooking-waste',[],'初級2',15,4,false],
  [34,'半分','はんぶん','một nửa','じゃがいもを半分に切って、鍋に入れました。','じゃがいもをはんぶんにきって、なべにいれました。','Tôi cắt đôi củ khoai tây rồi cho vào nồi.','1479890',0,'cooking-waste',['N5'],'初級2',9,3,false],
  [33,'生','なま','sống, chưa nấu chín','生の野菜は洗ってから、サラダに入れます。','なまのやさいはあらってから、さらだにいれます。','Rau sống cần được rửa trước khi cho vào món salad.','1378450',0,'cooking-waste',[],'初級1',12,2,false],
  [42,'食器','しょっき','bát đĩa','使った食器を流しの横に置いてください。','つかったしょっきをながしのよこにおいてください。','Hãy đặt bát đĩa đã dùng cạnh bồn rửa.','1358430',0,'cooking-waste',[],'初級2',7,2,false],
  [38,'缶','かん','lon, hộp thiếc','空き缶は洗ってから、資源ごみの箱に入れます。','あきかんはあらってから、しげんごみのはこにいれます。','Tôi rửa lon rỗng rồi bỏ vào thùng rác tái chế.','1214540',0,'cooking-waste',[],'初級2',15,2,false],
  [38,'プラスチック','プラスチック','nhựa; đồ bằng nhựa','プラスチックの容器は、紙と分けてください。','ぷらすちっくのようきは、かみとわけてください。','Hãy tách hộp nhựa ra khỏi giấy.','1115670',0,'cooking-waste',[],'初級2',15,3,false],
  [38,'分ける','わける','phân loại, chia riêng','びんと缶を別々の袋に分けました。','びんとかんをべつべつのふくろにわけました。','Tôi đã chia riêng chai và lon vào các túi khác nhau.','1503000',0,'cooking-waste',[],'初級2',15,3,false],
  [28,'後輩','こうはい','đàn em ở trường hoặc nơi làm việc','仕事のやり方を後輩に説明しました。','しごとのやりかたをこうはいにせつめいしました。','Tôi đã giải thích cách làm việc cho đàn em.','1270010',0,'work-study-development',[],'初級1',1,1,false],
  [28,'同僚','どうりょう','đồng nghiệp','昼休みに同僚と来週の予定を確認しました。','ひるやすみにどうりょうとらいしゅうのよていをかくにんしました。','Trong giờ nghỉ trưa, tôi xác nhận lịch tuần sau với đồng nghiệp.','1453580',0,'work-study-development',[],'初級2',10,1,false],
  [28,'主任','しゅにん','người phụ trách; trưởng nhóm','分からないことがあったので、主任に聞きました。','わからないことがあったので、しゅにんにききました。','Vì có điều chưa hiểu nên tôi đã hỏi người phụ trách.','1326040',0,'work-study-development',[],'初級1',14,3,false],
  [33,'スタッフ','スタッフ','nhân viên; đội ngũ nhân viên','受付のスタッフに集合時間を確認してください。','うけつけのすたっふにしゅうごうじかんをかくにんしてください。','Hãy xác nhận giờ tập trung với nhân viên quầy tiếp nhận.','1069720',0,'work-study-development',[],'初級1',7,1,false],
  [28,'メンバー','メンバー','thành viên','会議のメンバーは、資料を先に読んでください。','かいぎのめんばあは、しりょうをさきによんでください。','Các thành viên cuộc họp hãy đọc tài liệu trước.','1134370',0,'work-study-development',[],'初級1',8,1,false],
  [28,'所属','しょぞく','thuộc về một nhóm hoặc tổ chức','私は地域の日本語サークルに所属しています。','わたしはちいきのにほんごさあくるにしょぞくしています。','Tôi sinh hoạt trong câu lạc bộ tiếng Nhật của khu vực.','1343310',0,'work-study-development',[],'初級1',14,4,false],
  [31,'業者','ぎょうしゃ','đơn vị cung cấp dịch vụ; nhà thầu','修理の業者は、明日の午前中に来るそうです。','しゅうりのぎょうしゃは、あしたのごぜんちゅうにくるそうです。','Nghe nói đơn vị sửa chữa sẽ đến vào sáng mai.','1239440',0,'work-study-development',[],'初級1',13,1,false],
  [29,'通訳','つうやく','phiên dịch','通訳がいるので、質問をゆっくり話してください。','つうやくがいるので、しつもんをゆっくりはなしてください。','Có phiên dịch nên xin hãy nói câu hỏi chậm rãi.','1433560',1,'work-study-development',[],'初級2',14,4,false],
  [33,'原稿','げんこう','bản thảo; bản nháp bài phát biểu','発表の原稿を一度読んで、間違いを直しました。','はっぴょうのげんこうをいちどよんで、まちがいをなおしました。','Tôi đọc bản thảo thuyết trình một lượt rồi sửa lỗi.','1261340',0,'work-study-development',[],'初級1',13,3,false],
  [28,'指示','しじ','chỉ dẫn; chỉ thị','係の人の指示を聞いて、順番に並びました。','かかりのひとのしじをきいて、じゅんばんにならびました。','Tôi nghe chỉ dẫn của nhân viên phụ trách rồi xếp hàng theo thứ tự.','1309800',1,'work-study-development',[],'初級2',16,1,false],
  [40,'情報','じょうほう','thông tin','新しい時間の情報を、グループの人に送りました。','あたらしいじかんのじょうほうを、ぐるうぷのひとにおくりました。','Tôi gửi thông tin về giờ mới cho mọi người trong nhóm.','1356370',0,'work-study-development',[],'初級2',14,4,false],
  [34,'まとめる','まとめる','tổng hợp; tóm tắt','みんなの意見をまとめて、先生に送りました。','みんなのいけんをまとめて、せんせいにおくりました。','Tôi tổng hợp ý kiến của mọi người rồi gửi cho giáo viên.','1440930',1,'work-study-development',[],'初級2',15,2,false],
  [30,'くり返す','くりかえす','lặp lại','名前が聞こえなかったので、もう一度くり返してください。','なまえがきこえなかったので、もういちどくりかえしてください。','Tôi không nghe rõ tên nên xin hãy nhắc lại một lần nữa.','1247030',0,'work-study-development',[],'初級2',10,1,false],
  [28,'介護','かいご','chăm sóc người cần hỗ trợ','介護の仕事を始める前に、研修を受けました。','かいごのしごとをはじめるまえに、けんしゅうをうけました。','Tôi đã tham gia tập huấn trước khi bắt đầu công việc chăm sóc.','1198060',0,'work-study-development',[],'初級1',1,3,false],
  [33,'農家','のうか','nông hộ; người làm nông','この地域の農家は、季節の野菜を市場に出します。','このちいきののうかは、きせつのやさいをいちばにだします。','Các nông hộ trong vùng đưa rau theo mùa ra chợ.','1470620',0,'work-study-development',[],'初級2',7,3,false],
  [39,'おしゃべり','おしゃべり','trò chuyện; tán gẫu','友達と駅の近くで一時間おしゃべりしました。','ともだちとえきのちかくでいちじかんおしゃべりしました。','Tôi đã trò chuyện với bạn một tiếng gần nhà ga.','1002450',0,'social-relationships',[],'初級1',2,1,false],
  [29,'知り合い','しりあい','người quen','知り合いから、近くの図書館を教えてもらいました。','しりあいから、ちかくのとしょかんをおしえてもらいました。','Một người quen đã chỉ cho tôi thư viện gần đây.','1595070',0,'social-relationships',[],'初級1',1,1,false],
  [29,'知り合う','しりあう','làm quen; trở thành người quen','大学のサークルで、いろいろな人と知り合いました。','だいがくのさあくるで、いろいろなひととしりあいました。','Tôi đã làm quen với nhiều người trong câu lạc bộ ở trường đại học.','1420450',0,'social-relationships',[],'初級2',18,2,false],
  [45,'親戚','しんせき','họ hàng','休みの日に、親戚の家を訪ねました。','やすみのひに、しんせきのいえをたずねました。','Ngày nghỉ, tôi đã đến thăm nhà họ hàng.','1365230',0,'social-relationships',[],'初級2',9,2,false],
  [45,'夫婦','ふうふ','vợ chồng','その夫婦は、毎朝いっしょに公園を歩いています。','そのふうふは、まいあさいっしょにこうえんをあるいています。','Hai vợ chồng đó đi bộ cùng nhau trong công viên mỗi sáng.','1583640',0,'social-relationships',[],'初級2',4,1,false],
  [45,'孫','まご','cháu nội hoặc cháu ngoại','祖父は、孫と電話で話すのを楽しみにしています。','そふは、まごとでんわではなすのをたのしみにしています。','Ông mong chờ được nói chuyện điện thoại với cháu.','1406230',0,'social-relationships',[],'初級2',2,2,false],
  [45,'若い','わかい','trẻ; còn trẻ','若い人たちは、新しい店の場所をよく知っています。','わかいひとたちは、あたらしいみせのばしょをよくしっています。','Những người trẻ biết rõ vị trí cửa hàng mới.','1324300',0,'social-relationships',['N5'],'初級2',9,1,false],
  [45,'女性','じょせい','phụ nữ','この説明会には、女性の参加者も多かったです。','このせつめいかいには、じょせいのさんかしゃもおおかったです。','Buổi giới thiệu này cũng có nhiều người tham dự là phụ nữ.','1345250',0,'social-relationships',['N4'],'初級1',15,3,false],
  [45,'奥さん','おくさん','vợ của người khác','田中さんの奥さんは、学校で働いています。','たなかさんのおくさんは、がっこうではたらいています。','Vợ của anh Tanaka làm việc ở trường học.','1179330',0,'social-relationships',['N5'],'初級1',17,1,false],
  [46,'家庭','かてい','gia đình; hộ gia đình','家庭で使う電気を、少し減らすことにしました。','かていでつかうでんきを、すこしへらすことにしました。','Chúng tôi quyết định giảm một chút lượng điện dùng trong gia đình.','1192280',0,'social-relationships',['N5'],'初級1',18,5,false],
  [47,'祝う','いわう','chúc mừng; ăn mừng','友達の合格を、みんなで祝いました。','ともだちのごうかくを、みんなでいわいました。','Mọi người cùng chúc mừng bạn tôi thi đỗ.','1337390',0,'social-relationships',[],'初級2',9,3,false],
  [47,'飲み会','のみかい','buổi tụ họp ăn uống','会社の飲み会は、金曜日の夕方にあります。','かいしゃののみかいは、きんようびのゆうがたにあります。','Buổi liên hoan của công ty diễn ra vào chiều tối thứ Sáu.','2016170',0,'social-relationships',[],'入門',12,3,false],
  [46,'祭り','まつり','lễ hội','町の祭りでは、駅前に屋台が並びます。','まちのまつりでは、えきまえにやたいがならびます。','Trong lễ hội của thị trấn, các quầy hàng được dựng trước ga.','1604130',0,'social-relationships',[],'初級2',9,3,false],
  [44,'おじゃまします','おじゃまします','xin phép làm phiền; lời chào khi vào nhà','友達の家に入るとき、「おじゃまします」と言いました。','ともだちのいえにはいるとき、「おじゃまします」といいました。','Khi vào nhà bạn, tôi đã nói “xin phép làm phiền”.','1002050',0,'social-relationships',[],'初級1',17,1,false],
  [31,'頼む','たのむ','nhờ; yêu cầu','店員に、ゆっくり話してくれるように頼みました。','てんいんに、ゆっくりはなしてくれるようにたのみました。','Tôi đã nhờ nhân viên nói chậm lại.','1548370',0,'social-relationships',['N5'],'初級1',13,4,false],
  [47,'誘う','さそう','rủ; mời','週末に映画を見に行こうと、友達を誘いました。','しゅうまつにえいがをみにいこうと、ともだちをさそいました。','Tôi đã rủ bạn đi xem phim vào cuối tuần.','1541900',0,'social-relationships',[],'初級2',17,1,false],
  [38,'自然','しぜん','thiên nhiên','休みの日は、自然の中を歩いて気分を変えます。','やすみのひは、しぜんのなかをあるいてきぶんをかえます。','Ngày nghỉ, tôi đi bộ giữa thiên nhiên để thay đổi tâm trạng.','1318090',0,'travel-culture-reading',[],'初級2',1,3,false],
  [35,'地元','じもと','địa phương quê nhà','地元の駅の近くに、新しい図書館ができました。','じもとのえきのちかくに、あたらしいとしょかんができました。','Một thư viện mới đã được xây gần ga ở quê tôi.','1421060',0,'travel-culture-reading',[],'初級2',7,3,false],
  [27,'外国','がいこく','nước ngoài','外国から来た人に、駅への行き方を説明しました。','がいこくからきたひとに、えきへのいきかたをせつめいしました。','Tôi đã giải thích đường đến ga cho một người đến từ nước ngoài.','1203620',0,'travel-culture-reading',['N5'],'初級2',6,2,false],
  [43,'神社','じんじゃ','đền Thần đạo','神社の前で待ち合わせて、町を歩きました。','じんじゃのまえでまちあわせて、まちをあるきました。','Chúng tôi hẹn nhau trước đền Thần đạo rồi đi dạo trong thị trấn.','1364670',0,'travel-culture-reading',['N4'],'入門',18,2,false],
  [45,'行事','ぎょうじ','sự kiện; hoạt động theo dịp','学校の行事について、予定表で日付を確認しました。','がっこうのぎょうじについて、よていひょうでひづけをかくにんしました。','Tôi xác nhận ngày của sự kiện trường học trên lịch trình.','1281930',0,'travel-culture-reading',[],'初級2',9,1,false],
  [38,'床','ゆか','sàn nhà','床がぬれているので、気をつけてください。','ゆかがぬれているので、きをつけてください。','Sàn nhà đang ướt nên hãy cẩn thận.','1349380',0,'travel-culture-reading',[],'初級2',16,2,false],
  [38,'中身','なかみ','bên trong; đồ vật bên trong','荷物の中身を確認してから、かばんを閉めました。','にもつのなかみをかくにんしてから、かばんをしめました。','Tôi kiểm tra đồ bên trong hành lý rồi đóng túi lại.','1599430',0,'travel-culture-reading',[],'初級2',15,3,false],
  [30,'撮影','さつえい','việc chụp ảnh hoặc quay phim','この場所では撮影できないので、カメラをしまいました。','このばしょではさつえいできないので、かめらをしまいました。','Vì không được chụp ảnh ở đây nên tôi cất máy ảnh đi.','1298800',0,'travel-culture-reading',[],'初級2',8,4,false],
  [32,'特徴','とくちょう','đặc điểm','この町の特徴を、旅行のメモに書きました。','このまちのとくちょうを、りょこうのめもにかきました。','Tôi ghi đặc điểm của thị trấn này vào ghi chú chuyến đi.','1455170',0,'travel-culture-reading',[],'初級2',11,3,false],
  [32,'本物','ほんもの','đồ thật; hàng thật','この時計が本物かどうか、店員に聞きました。','このとけいがほんものかどうか、てんいんにききました。','Tôi hỏi nhân viên xem chiếc đồng hồ này có phải hàng thật không.','1523180',0,'travel-culture-reading',[],'初級2',4,1,false],
  [34,'だから','だから','vì vậy; cho nên','電車が遅れています。だから、少し待ちましょう。','でんしゃがおくれています。だから、すこしまちましょう。','Tàu đang bị trễ. Vì vậy, chúng ta hãy đợi một chút.','1007310',0,'discourse-reading',['N4'],'初級2',6,4,false],
  [34,'ですから','ですから','do đó; vì vậy (cách nói lịch sự)','本日は休館です。ですから、明日また来てください。','ほんじつはきゅうかんです。ですから、あしたまたきてください。','Hôm nay thư viện đóng cửa. Vì vậy, xin hãy quay lại vào ngày mai.','1008430',0,'discourse-reading',[],'初級2',12,4,false],
  [31,'それなら','それなら','nếu vậy; nếu đúng thế','今日は図書館が休みです。それなら、喫茶店で勉強しましょう。','きょうはとしょかんがやすみです。それなら、きっさてんでべんきょうしましょう。','Hôm nay thư viện nghỉ. Nếu vậy, chúng ta học ở quán cà phê nhé.','1406070',0,'discourse-reading',[],'初級1',18,2,false],
  [34,'そうしたら','そうしたら','sau đó; nếu làm thế thì','先に予約をします。そうしたら、店からメールが届きます。','さきによやくをします。そうしたら、みせからめえるがとどきます。','Tôi sẽ đặt chỗ trước. Sau đó, email sẽ được gửi từ cửa hàng.','2762810',0,'discourse-reading',[],'初級2',10,3,false],
  [35,'そろそろ','そろそろ','sắp đến lúc; đã gần tới lúc','そろそろ出発する時間なので、駅へ行きましょう。','そろそろしゅっぱつするじかんなので、えきへいきましょう。','Sắp đến giờ khởi hành rồi nên chúng ta hãy ra ga.','1345605',0,'discourse-reading',['N4'],'初級2',17,2,false],
  [33,'とりあえず','とりあえず','trước mắt; trước tiên','とりあえず名前を書いて、受付に出してください。','とりあえずなまえをかいて、うけつけにだしてください。','Trước mắt, hãy viết tên rồi nộp ở quầy tiếp nhận.','1598980',1,'discourse-reading',[],'初級1',13,1,false],
  [48,'とにかく','とにかく','dù sao thì; trước hết','とにかく、今は駅の窓口で聞いてみましょう。','とにかく、いまはえきのまどぐちできいてみましょう。','Dù sao thì bây giờ chúng ta hãy thử hỏi tại quầy nhà ga.','1443990',0,'discourse-reading',[],'初級2',18,2,false],
  [34,'ほとんど','ほとんど','hầu hết; gần như','宿題はほとんど終わりましたが、最後の問題はまだです。','しゅくだいはほとんどおわりましたが、さいごのもんだいはまだです。','Bài tập gần như đã xong, nhưng câu cuối thì vẫn chưa.','1522050',0,'discourse-reading',['N4'],'初級2',17,1,false],
  [27,'かなり','かなり','khá; đáng kể','今日はかなり暑いので、早く帰りましょう。','きょうはかなりあついので、はやくかえりましょう。','Hôm nay khá nóng nên chúng ta về sớm nhé.','1590560',0,'discourse-reading',[],'初級2',5,3,false],
  [34,'しっかり','しっかり','kỹ; cẩn thận; chắc chắn','説明をしっかり聞いてから、申し込みの紙を書きます。','せつめいをしっかりきいてから、もうしこみのかみをかきます。','Tôi nghe kỹ phần hướng dẫn rồi mới điền đơn đăng ký.','1594400',2,'discourse-reading',['N4'],'初級2',12,3,false],
  [34,'ちゃんと','ちゃんと','đúng cách; đàng hoàng','時間と場所をちゃんと確認してから、家を出ました。','じかんとばしょをちゃんとかくにんしてから、いえをでました。','Tôi xác nhận kỹ giờ và địa điểm rồi mới ra khỏi nhà.','1007720',1,'discourse-reading',[],'初級2',10,3,false],
  [35,'もしかしたら','もしかしたら','có lẽ; biết đâu','もしかしたら、バスの時間が変わったかもしれません。','もしかしたら、ばすのじかんがかわったかもしれません。','Có lẽ giờ xe buýt đã thay đổi.','1012510',0,'discourse-reading',[],'初級2',11,2,false],
  [33,'絶対に','ぜったいに','nhất định; tuyệt đối','大切な書類なので、絶対に忘れないでください。','たいせつなしょるいなので、ぜったいにわすれないでください。','Đây là giấy tờ quan trọng nên xin đừng quên.','1610070',0,'discourse-reading',[],'初級2',16,1,false],
  [31,'直接','ちょくせつ','trực tiếp','分からないことは、先生に直接聞きました。','わからないことは、せんせいにちょくせつききました。','Tôi đã hỏi trực tiếp giáo viên về điều mình chưa hiểu.','1431110',0,'discourse-reading',[],'初級2',10,4,false],
  [29,'ついでに','ついでに','nhân tiện','駅へ行くついでに、郵便局にも寄ります。','えきへいくついでに、ゆうびんきょくにもよります。','Nhân tiện đến ga, tôi cũng ghé bưu điện.','1008050',0,'discourse-reading',[],'初級2',14,1,false],
  [31,'先ほど','さきほど','lúc nãy (cách nói lịch sự)','先ほど電話した件について、もう一度説明します。','さきほどでんわしたけんについて、もういちどせつめいします。','Tôi sẽ giải thích lại việc đã gọi điện lúc nãy.','1388170',0,'discourse-reading',[],'初級2',11,4,false],
  [31,'さっき','さっき','lúc nãy (thân mật)','さっき受付に電話したら、午後は休みだと言われました。','さっきうけつけにでんわしたら、ごごはやすみだといわれました。','Lúc nãy tôi gọi quầy tiếp nhận thì được báo là buổi chiều nghỉ.','1005180',0,'discourse-reading',['N4'],'初級2',11,2,false],
  [35,'今回','こんかい','lần này','今回の旅行では、電車とバスを使います。','こんかいのりょこうでは、でんしゃとばすをつかいます。','Trong chuyến đi lần này, tôi sẽ đi tàu và xe buýt.','1289070',0,'discourse-reading',[],'初級2',16,4,false],
  [35,'次回','じかい','lần sau; dịp tới','次回の会議は、来週の水曜日に決まりました。','じかいのかいぎは、らいしゅうのすいようびにきまりました。','Cuộc họp lần sau đã được ấn định vào thứ Tư tuần tới.','1316470',0,'discourse-reading',[],'初級2',3,3,false],
  [35,'当日','とうじつ','ngày diễn ra; đúng ngày đó','試験の当日は、学生証を持ってきてください。','しけんのとうじつは、がくせいしょうをもってきてください。','Vào đúng ngày thi, xin hãy mang theo thẻ sinh viên.','1449210',0,'discourse-reading',[],'初級2',9,4,false],
  [48,'本日','ほんじつ','hôm nay (cách nói trang trọng)','本日は受付を午後五時に閉めます。','ほんじつはうけつけをごごごじにしめます。','Hôm nay quầy tiếp nhận sẽ đóng cửa lúc 5 giờ chiều.','1523110',0,'discourse-reading',[],'初級2',7,3,false],
  [26,'まず','まず','trước tiên','まず住所を書いて、その後で電話番号を記入してください。','まずじゅうしょをかいて、そのあとででんわばんごうをきにゅうしてください。','Trước tiên hãy ghi địa chỉ, sau đó điền số điện thoại.','1387240',0,'discourse-reading',['N4'],'初級2',2,4,false],
  [34,'別々','べつべつ','riêng từng phần; tách riêng','二人分の料金は、別々に払うこともできます。','ふたりぶんのりょうきんは、べつべつにはらうこともできます。','Cũng có thể thanh toán riêng tiền của hai người.','1603290',0,'discourse-reading',[],'初級2',3,3,false]
];

export const n4VocabularyBatch05=rows.map(([proposedLessonNumber,text,reading,meaning,ja,kana,vi,entryId,senseIndex,group,openJlptLevels,irodoriBook,irodoriLesson,irodoriActivity,irodoriReference])=>{
  const lessonNumber=groups[group].links.includes(proposedLessonNumber)?proposedLessonNumber:groups[group].links[0];
  const openLevels=[...openJlptLevels];
  const openJlptNote=openLevels.includes('N5')
    ?'OpenJLPT lists this JMdict lexeme at N5; this batch uses a project-specific N4 functional sequence, not an official JLPT-level claim.'
    :openLevels.includes('N4')
      ?'OpenJLPT N4 membership agrees with the project stage, but remains a community estimate rather than an official syllabus.'
      :'No membership match was found in the frozen OpenJLPT N4/N5 snapshots; absence is not evidence of an official level.';
  return{
    lessonNumber,text,reading,meaning,group,
    type:typeOverrides.get(text)||(suruNouns.has(text)?'danh từ / động từ する':verbs.has(text)?'động từ':adjectives.has(text)?'tính từ い':adverbs.has(text)?'trạng từ':'danh từ'),
    reason:`${groups[group].reason} This word is used in the example and supports the linked lesson task.`,
    curriculum:{edition:'Minna no Nihongo Shokyu II, second edition; project functional alignment only',lessonNumber},
    role:'trọng tâm theo nhiệm vụ; chủ động nhận diện và vận dụng',
    example:{ja,reading:kana,vi},
    sourceReview:{
      entryId,senseIds:[`${entryId}-s${senseIndex}`],
      status:'Project-authored contextual Vietnamese meaning and example; selected JMdict sense; Irodori form/reading and coordinates checked; OpenJLPT membership compared; not independently reviewed',
      batchId:'n4-vocabulary-05',
      ...(openLevels.length?{openJlptJmdictId:entryId}:{}),
      openJlptMembership:{n4:openLevels.includes('N4'),n5:openLevels.includes('N5'),levels:openLevels},
      irodori:{
        sheet:'wordlist_all',book:irodoriBook,lesson:irodoriLesson,activity:irodoriActivity,
        exactForm:text,exactReading:reading,referenceVocabulary:irodoriReference
      },
      jmdict:{artifact:'.sources/edrdg-20261109/jmdict-eng.json',date:'2026-11-09',license:'CC BY-SA 4.0'},
      openJlpt:{artifact:'.sources/openjlpt-20261113/n4-vocab.json and n5-vocab.json',commit:'0d1d3410bec90bd4098a7c72de820543cb4f707c'},
      sourceComparison:{openJlptNote,irodoriNote:'Irodori records written form, reading and curriculum coordinate; it does not assign an N4 level.'},
      rationale:groups[group].reason
    }
  };
});

export function applyN4VocabularyBatch05(units){
  for(const item of n4VocabularyBatch05){
    const unit=units.find(candidate=>candidate.number===item.lessonNumber);
    if(!unit)throw Error(`Missing N4 lesson ${item.lessonNumber} for ${item.text}`);
    if(unit.words.some(word=>word.text===item.text&&word.reading===item.reading))throw Error(`N4 vocabulary batch duplicate ${item.text}/${item.reading}`);
    unit.words.push({...item});
  }
}
