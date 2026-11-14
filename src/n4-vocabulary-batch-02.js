const groups={
  'interaction-emotion':{
    links:[26,28,29,33,39,40,41,45,46,47,48,49],
    reason:'Use vocabulary to greet, explain a situation, express a reaction, ask respectfully, and maintain everyday relationships.'
  },
  'change-comparison':{
    links:[27,28,29,31,34,36,38,43,44],
    reason:'Describe changes, compare options, state a decision, and talk about ordinary actions and conditions.'
  },
  'travel-community':{
    links:[27,30,32,34,35,40,42,43,45],
    reason:'Understand local transport, community places, travel, public information, and everyday movement.'
  },
  'school-work':{
    links:[28,29,34,40,41,42,46,49],
    reason:'Discuss work and study routines, roles, interests, and familiar school or workplace situations.'
  },
  'home-leisure':{
    links:[29,30,34,38,43,44,46],
    reason:'Describe home, food, leisure, family, and events with vocabulary used in everyday narratives.'
  },
  'quantity-conditions':{
    links:[35,36,45],
    reason:'Read quantities and limits in instructions, notices, prices, and simple explanations.'
  }
};

const verbs=new Set(['集まる','生きる','動く','写す','移る','思い出す','折る','折れる','変える','勝つ','かまう','噛む','乾く','変わる','比べる','込む']);
const suruNouns=new Set(['挨拶','アルバイト','遠慮','関係','競争','下宿','原因','研究','見物','講義','交通','ごちそう']);
const adjectives=new Set(['うまい','うれしい','おかしい','悲しい','厳しい','怖い','細かい']);
const adverbs=new Set(['決して','このあいだ','このごろ']);
const adverbialNa=new Set(['一生懸命']);
const rows=[
  [49,'挨拶','あいさつ','lời chào; chào hỏi (thường dùng với する)','朝、先生にあいさつしてから教室に入ります。','あさ、せんせいにあいさつしてからきょうしつにはいります。','Buổi sáng, tôi chào giáo viên rồi mới vào lớp.','1151120','interaction-emotion',0],
  [29,'合う','あう','hợp; khớp; phù hợp','友達と休みの日が合いました。','ともだちとやすみのひがあいました。','Ngày nghỉ của tôi trùng với bạn.','1284430','change-comparison',1],
  [43,'上がる','あがる','tăng; đi lên','最近、野菜の値段が上がりました。','さいきん、やさいのねだんがあがりました。','Gần đây giá rau đã tăng.','1352290','change-comparison',0],
  [30,'赤ん坊','あかんぼう','em bé; trẻ sơ sinh','近所に赤ん坊が生まれました。','きんじょにあかんぼうがうまれました。','Ở gần nhà có em bé mới sinh.','1383310','home-leisure',0],
  [30,'集まる','あつまる','tập trung; tụ họp','駅の前に友達が集まります。','えきのまえにともだちがあつまります。','Bạn bè tụ họp trước nhà ga.','1333550','home-leisure',0],
  [28,'アルバイト','アルバイト','việc làm thêm','大学のあとでアルバイトをします。','だいがくのあとであるばいとをします。','Sau giờ đại học, tôi làm thêm.','1019420','school-work',0],
  [35,'以下','いか','trở xuống; không quá','参加者は十人以下です。','さんかしゃはじゅうにんいかです。','Số người tham gia là mười người trở xuống.','1155060','quantity-conditions',0],
  [35,'以外','いがい','ngoài; ngoại trừ','日曜日以外は毎日働きます。','にちようびいがいはまいにちはたらきます。','Ngoài Chủ nhật ra, ngày nào tôi cũng làm việc.','1155090','quantity-conditions',0],
  [35,'以上','いじょう','trở lên; ít nhất','会議には十人以上が来ました。','かいぎにはじゅうにんいじょうがきました。','Có ít nhất mười người đã đến cuộc họp.','1155120','quantity-conditions',0,'かいぎにわじゅうにんいじょおがきました。','会議には十人以上が来ました。'],
  [28,'一生懸命','いっしょうけんめい','hết sức; chăm chỉ','毎日、一生懸命日本語を勉強しています。','まいにち、いっしょうけんめいにほんごをべんきょうしています。','Ngày nào tôi cũng chăm chỉ học tiếng Nhật.','1164010','school-work',0,'まいにちいっしょおけんめえにほんごおべんきょおしています。','毎日、一生懸命日本語を勉強しています。'],
  [35,'以内','いない','trong vòng; không quá','駅から五分以内に着きます。','えきからごふんいないにつきます。','Tôi sẽ đến nơi trong vòng năm phút từ nhà ga.','1155180','quantity-conditions',0],
  [28,'生きる','いきる','sống; tồn tại','生きるために、水と食べ物が必要です。','いきるために、みずとたべものがひつようです。','Để sống, cần có nước và thức ăn.','1378520','interaction-emotion',0],
  [28,'動く','うごく','di chuyển; hoạt động','この時計は動きません。','このとけいはうごきません。','Chiếc đồng hồ này không chạy.','1451210','change-comparison',0],
  [26,'うそ','うそ','lời nói dối; điều không đúng','うそをつかないでください。','うそをつかないでください。','Xin đừng nói dối.','1172400','interaction-emotion',0],
  [34,'うち','うち','nhà mình; bên mình (tùy ngữ cảnh)','うちの近所に新しい公園ができました。','うちのきんじょにあたらしいこうえんができました。','Gần nhà tôi có công viên mới.','1457730','home-leisure',6],
  [34,'写す','うつす','chép lại; sao lại','住所を紙に写します。','じゅうしょをかみにうつします。','Tôi chép địa chỉ lên giấy.','1588320','school-work',0],
  [43,'移る','うつる','chuyển đến; chuyển sang','来月、別の町に移ります。','らいげつ、べつのまちにうつります。','Tháng sau tôi chuyển đến một thị trấn khác.','1158210','travel-community',0],
  [29,'うまい','うまい','ngon (thân mật); giỏi (tùy ngữ cảnh)','この店のラーメンはうまいです。','このみせのらあめんはうまいです。','Mì ramen ở quán này ngon.','1310460','home-leisure',1],
  [29,'うれしい','うれしい','vui; mừng','友達から手紙をもらって、うれしかったです。','ともだちからてがみをもらって、うれしかったです。','Tôi vui vì nhận được thư từ bạn.','1219510','interaction-emotion',0],
  [42,'運転手','うんてんしゅ','tài xế','バスの運転手に道を聞きました。','ばすのうんてんしゅにみちをききました。','Tôi đã hỏi đường tài xế xe buýt.','1172870','travel-community',0],
  [33,'遠慮','えんりょ','ngại; giữ ý; từ chối khéo','遠慮しないで、質問してください。','えんりょしないで、しつもんしてください。','Đừng ngại, xin hãy đặt câu hỏi.','1178450','interaction-emotion',1],
  [26,'おかげ','おかげ','nhờ vào; nhờ có','友達のおかげで、駅までの道が分かりました。','ともだちのおかげで、えきまでのみちがわかりました。','Nhờ bạn mà tôi biết đường đến nhà ga.','1001640','interaction-emotion',1],
  [29,'おかしい','おかしい','lạ; kỳ lạ; buồn cười tùy ngữ cảnh','この時計は少しおかしいです。','このとけいはすこしおかしいです。','Chiếc đồng hồ này hơi không bình thường.','1190860','change-comparison',1],
  [27,'おつり','おつり','tiền thừa; tiền trả lại','千円を出したら、おつりをもらいました。','せんえんをだしたら、おつりをもらいました。','Tôi đưa một nghìn yên rồi nhận lại tiền thừa.','1270550','travel-community',0],
  [30,'お祭り','おまつり','lễ hội','町のお祭りに家族と行きます。','まちのおまつりにかぞくといきます。','Tôi đi lễ hội của thị trấn cùng gia đình.','1604135','home-leisure',0],
  [30,'お土産','おみやげ','quà mang về sau chuyến đi','旅行のお土産を家族に買いました。','りょこうのおみやげをかぞくにかいました。','Tôi mua quà chuyến đi cho gia đình.','1002500','travel-community',0],
  [46,'思い出す','おもいだす','nhớ lại; hồi tưởng','昔の友達の名前を思い出しました。','むかしのともだちのなまえをおもいだしました。','Tôi đã nhớ lại tên một người bạn cũ.','1309260','interaction-emotion',0],
  [38,'表','おもて','mặt trước; mặt ngoài','紙の表に名前を書いてください。','かみのおもてになまえをかいてください。','Xin hãy viết tên ở mặt trước tờ giấy.','1489340','home-leisure',1,'かみのおもてになまえおかいてください。','かみのおもてになまえをかいてください。'],
  [41,'親','おや','cha mẹ; phụ huynh','親に電話で相談しました。','おやにでんわでそうだんしました。','Tôi đã gọi điện hỏi ý kiến cha mẹ.','1365040','interaction-emotion',0],
  [34,'折る','おる','gấp; bẻ','紙を半分に折ります。','かみをはんぶんにおります。','Tôi gấp tờ giấy làm đôi.','1385910','home-leisure',1],
  [38,'折れる','おれる','bị gãy; bị gấp','この枝はすぐ折れます。','このえだはすぐおれます。','Cành cây này dễ gãy.','1385920','change-comparison',0],
  [46,'終わり','おわり','kết thúc; phần cuối','授業の終わりに質問しました。','じゅぎょうのおわりにしつもんしました。','Tôi đã đặt câu hỏi vào cuối buổi học.','1589590','school-work',0],
  [42,'オートバイ','オートバイ','xe mô tô; xe máy','オートバイで海岸まで行きました。','おおとばいでかいがんまでいきました。','Tôi đã đi xe máy đến bờ biển.','1032030','travel-community',0],
  [42,'海岸','かいがん','bờ biển','海岸を散歩しました。','かいがんをさんぽしました。','Tôi đã đi dạo dọc bờ biển.','1201280','travel-community',0],
  [43,'変える','かえる','thay đổi; đổi','予定を明日に変えました。','よていをあしたにかえました。','Tôi đã đổi kế hoạch sang ngày mai.','1510650','change-comparison',0],
  [38,'鏡','かがみ','gương','鏡で髪を見ます。','かがみでかみをみます。','Tôi soi tóc trong gương.','1238550','home-leisure',0],
  [30,'飾る','かざる','trang trí; bày','部屋に花を飾ります。','へやにはなをかざります。','Tôi cắm hoa trang trí phòng.','1357210','home-leisure',0],
  [42,'ガソリンスタンド','ガソリンスタンド','trạm xăng','ガソリンスタンドで車にガソリンを入れます。','がそりんすたんどでくるまにがそりんをいれます。','Tôi đổ xăng cho xe ở trạm xăng.','1040260','travel-community',0],
  [44,'形','かたち','hình dạng; hình thức','この箱は四角い形です。','このはこはしかくいかたちです。','Chiếc hộp này có hình vuông.','1250220','home-leisure',0,'このはこわしかくいかたちです。','この箱わしかくいかたちです。'],
  [49,'課長','かちょう','trưởng phòng; quản lý bộ phận','課長に予定の変更を報告しました。','かちょうによていのへんこうをほうこくしました。','Tôi đã báo với trưởng phòng về thay đổi kế hoạch.','1195840','school-work',0],
  [29,'勝つ','かつ','thắng; giành chiến thắng','次の試合に勝ちたいです。','つぎのしあいにかちたいです。','Tôi muốn thắng trận đấu tiếp theo.','1346150','home-leisure',0],
  [29,'悲しい','かなしい','buồn; đau buồn','友達が帰って、少し悲しかったです。','ともだちがかえって、すこしかなしかったです。','Tôi hơi buồn khi bạn về.','1483190','interaction-emotion',0],
  [41,'彼女','かのじょ','cô ấy; bạn gái tùy ngữ cảnh','彼女は同じ会社で働いています。','かのじょはおなじかいしゃではたらいています。','Cô ấy làm việc ở cùng công ty.','1483150','interaction-emotion',0],
  [48,'かまう','かまう','bận tâm; để ý; phiền','少し窓を開けてもかまいませんか。','すこしまどをあけてもかまいませんか。','Tôi mở cửa sổ một chút có phiền không?','1279680','interaction-emotion',0],
  [44,'噛む','かむ','nhai; cắn','食べ物をよく噛んでください。','たべものをよくかんでください。','Xin hãy nhai kỹ thức ăn.','1209240','home-leisure',1],
  [38,'ガラス','ガラス','kính; thủy tinh','窓のガラスをきれいに拭きます。','まどのがらすをきれいにふきます。','Tôi lau sạch kính cửa sổ.','1040380','home-leisure',0],
  [38,'乾く','かわく','khô; trở nên khô','洗濯物が早く乾きました。','せんたくものがはやくかわきました。','Quần áo giặt đã khô nhanh.','1209650','home-leisure',0],
  [43,'代わり','かわり','thay thế; thay cho','砂糖の代わりに、はちみつを使います。','さとうのかわりに、はちみつをつかいます。','Tôi dùng mật ong thay cho đường.','1590770','change-comparison',0,'さとおのかわりにはちみつおつかいます。','砂糖の代わりに、はちみつを使います。'],
  [43,'変わる','かわる','thay đổi; trở nên khác','来月から、営業時間が変わります。','らいげつから、えいぎょうじかんがかわります。','Từ tháng sau, giờ làm việc sẽ thay đổi.','1510790','change-comparison',0,'らいげつからええぎょおじかんがかわります。','らいげつからええぎょおじかんがかわります。'],
  [45,'関係','かんけい','mối quan hệ; sự liên quan','仕事と生活の関係について話しました。','しごととせいかつのかんけいについてはなしました。','Chúng tôi đã nói về mối liên hệ giữa công việc và cuộc sống.','1215810','interaction-emotion',0],
  [44,'簡単','かんたん','đơn giản; dễ','この問題は簡単です。','このもんだいはかんたんです。','Câu hỏi này đơn giản.','1214330','change-comparison',0],
  [40,'技術','ぎじゅつ','kỹ thuật; công nghệ','新しい技術を勉強しています。','あたらしいぎじゅつをべんきょうしています。','Tôi đang học công nghệ mới.','1225130','school-work',0],
  [29,'厳しい','きびしい','nghiêm khắc; khắc nghiệt','この学校の規則は厳しいです。','このがっこうのきそくはきびしいです。','Nội quy của trường này nghiêm khắc.','1262530','school-work',0],
  [29,'気分','きぶん','tâm trạng; cảm giác','散歩したら、気分がよくなりました。','さんぽしたら、きぶんがよくなりました。','Sau khi đi dạo, tôi cảm thấy dễ chịu hơn.','1222590','interaction-emotion',0],
  [31,'決まる','きまる','được quyết định; được ấn định','旅行の日は来週に決まりました。','りょこうのひはらいしゅうにきまりました。','Ngày đi du lịch đã được quyết định là tuần sau.','1591420','change-comparison',0],
  [31,'決める','きめる','quyết định; chọn','昼ごはんはカレーに決めました。','ひるごはんはかれえにきめました。','Tôi đã chọn cà ri cho bữa trưa.','1254180','change-comparison',0,'ひるごはんわかれえにきめました。','昼ごはんはカレーに決めました。'],
  [29,'気持ち','きもち','cảm xúc; cảm giác','ありがとうと言われて、うれしい気持ちになりました。','ありがとうといわれて、うれしいきもちになりました。','Nghe lời cảm ơn khiến tôi cảm thấy vui.','1591430','interaction-emotion',0,'ありがとおといわれて、うれしいきもちになりました。','ありがとうと言われて、うれしい気持ちになりました。'],
  [49,'客','きゃく','khách; khách hàng tùy ngữ cảnh','店に客がたくさんいます。','みせにきゃくがたくさんいます。','Có nhiều khách trong cửa hàng.','1226630','school-work',1],
  [32,'急','きゅう','đột ngột; khẩn cấp tùy ngữ cảnh','急な雨で、服がぬれました。','きゅうなあめで、ふくがぬれました。','Quần áo bị ướt vì cơn mưa bất chợt.','1228560','travel-community',0],
  [42,'急行','きゅうこう','tàu tốc hành','急行に乗ると、早く着きます。','きゅうこうにのると、はやくつきます。','Đi tàu tốc hành thì sẽ đến nhanh.','1228690','travel-community',1],
  [29,'競争','きょうそう','cuộc cạnh tranh; thi đua','二人は一番になるために競争しています。','ふたりはいちばんになるためにきょうそうしています。','Hai người đang thi đua để trở thành người đứng đầu.','1234140','school-work',0],
  [29,'興味','きょうみ','sự quan tâm; hứng thú','日本の歴史に興味があります。','にほんのれきしにきょうみがあります。','Tôi quan tâm đến lịch sử Nhật Bản.','1238410','interaction-emotion',0],
  [34,'近所','きんじょ','khu lân cận; hàng xóm','近所に新しい店ができました。','きんじょにあたらしいみせができました。','Một cửa hàng mới đã mở ở gần nhà.','1242350','travel-community',0],
  [40,'具合','ぐあい','tình trạng; sức khỏe (tùy ngữ cảnh)','今日は体の具合がよくありません。','きょうはからだのぐあいがよくありません。','Hôm nay sức khỏe tôi không được tốt.','1592500','interaction-emotion',1],
  [29,'比べる','くらべる','so sánh','二つの店の値段を比べます。','ふたつのみせのねだんをくらべます。','Tôi so sánh giá của hai cửa hàng.','1483540','change-comparison',0],
  [42,'経済','けいざい','kinh tế','新聞で経済の記事を読みます。','しんぶんでけいざいのきじをよみます。','Tôi đọc bài viết về kinh tế trên báo.','1251320','school-work',0],
  [45,'警察','けいさつ','cảnh sát; cơ quan cảnh sát','道に迷ったので、警察に聞きました。','みちにまよったので、けいさつにききました。','Tôi bị lạc đường nên đã hỏi cảnh sát.','1252390','travel-community',0],
  [34,'下宿','げしゅく','nhà trọ; ở trọ','大学の近くで下宿しています。','だいがくのちかくでげしゅくしています。','Tôi đang ở trọ gần trường đại học.','1185290','home-leisure',0],
  [26,'決して','けっして','không bao giờ (thường đi với phủ định)','私はその約束を決して忘れません。','わたしはそのやくそくをけっしてわすれません。','Tôi sẽ không bao giờ quên lời hứa đó.','1254130','interaction-emotion',0],
  [39,'けれど','けれど','nhưng; tuy vậy','駅は近いけれど、道が分かりません。','えきはちかいけれど、みちがわかりません。','Nhà ga ở gần nhưng tôi không biết đường.','2853889','interaction-emotion',0],
  [36,'原因','げんいん','nguyên nhân','遅れた原因を説明しました。','おくれたげんいんをせつめいしました。','Tôi đã giải thích nguyên nhân đến muộn.','1261190','change-comparison',0],
  [28,'研究','けんきゅう','nghiên cứu','大学で環境について研究しています。','だいがくでかんきょうについてけんきゅうしています。','Tôi đang nghiên cứu về môi trường ở trường đại học.','1258520','school-work',0],
  [28,'研究室','けんきゅうしつ','phòng nghiên cứu; phòng làm việc của giáo sư','先生は研究室にいます。','せんせいはけんきゅうしつにいます。','Giáo viên đang ở phòng làm việc.','1258570','school-work',0],
  [42,'見物','けんぶつ','tham quan; ngắm xem','旅行で古いお寺を見物しました。','りょこうでふるいおてらをけんぶつしました。','Trong chuyến đi, tôi đã tham quan một ngôi chùa cổ.','1260000','travel-community',0],
  [42,'郊外','こうがい','ngoại ô','郊外に大きな公園があります。','こうがいにおおきなこうえんがあります。','Có một công viên lớn ở ngoại ô.','1282490','travel-community',0],
  [28,'講義','こうぎ','bài giảng; buổi giảng','午前中に日本語の講義があります。','ごぜんちゅうににほんごのこうぎがあります。','Buổi sáng có bài giảng tiếng Nhật.','1282260','school-work',0],
  [42,'交通','こうつう','giao thông; đi lại','この町は交通が便利です。','このまちはこうつうがべんりです。','Việc đi lại ở thị trấn này thuận tiện.','1272280','travel-community',0],
  [49,'公務員','こうむいん','công chức; nhân viên nhà nước','姉は市役所で働く公務員です。','あねはしやくしょではたらくこうむいんです。','Chị tôi là công chức làm việc ở tòa thị chính.','1274820','school-work',0],
  [33,'心','こころ','lòng; tâm trí; trái tim','友達の言葉が心に残りました。','ともだちのことばがこころにのこりました。','Lời nói của bạn vẫn đọng lại trong lòng tôi.','1360480','interaction-emotion',0],
  [30,'ごちそう','ごちそう','bữa ăn thịnh soạn; được mời ăn','友達が昼ごはんをごちそうしてくれました。','ともだちがひるごはんをごちそうしてくれました。','Bạn đã mời tôi ăn trưa.','1593590','home-leisure',0],
  [46,'このあいだ','このあいだ','hôm nọ; gần đây','このあいだ、駅で先生に会いました。','このあいだ、えきでせんせいにあいました。','Hôm nọ, tôi đã gặp giáo viên ở nhà ga.','1004690','interaction-emotion',0],
  [47,'このごろ','このごろ','dạo này; gần đây','このごろ、毎日歩いています。','このごろ、まいにちあるいています。','Dạo này, ngày nào tôi cũng đi bộ.','1004710','interaction-emotion',0],
  [44,'細かい','こまかい','nhỏ; chi tiết; tỉ mỉ','細かい字は読みにくいです。','こまかいじはよみにくいです。','Chữ nhỏ thì khó đọc.','1295530','change-comparison',1],
  [32,'込む','こむ','đông; chật kín','朝の電車はとても込んでいます。','あさのでんしゃはとてもこんでいます。','Tàu buổi sáng rất đông.','1593410','travel-community',0],
  [30,'米','こめ','gạo','米を洗ってから、ご飯を炊きます。','こめをあらってから、ごはんをたきます。','Tôi vo gạo rồi nấu cơm.','1508750','home-leisure',0],
  [29,'怖い','こわい','đáng sợ; sợ hãi','暗い道は少し怖いです。','くらいみちはすこしこわいです。','Con đường tối hơi đáng sợ.','1593480','interaction-emotion',0]
];

export const n4VocabularyBatch02=rows.map(([lessonNumber,text,reading,meaning,ja,kana,vi,entryId,group,senseIndex=0,audioReading,audioText])=>({
  lessonNumber,text,reading,meaning,group,
  type:suruNouns.has(text)?'danh từ / động từ する':verbs.has(text)?'động từ':text==='簡単'?'danh từ / tính từ な':text==='急'?'tính từ な':adverbialNa.has(text)?'danh từ / tính từ な / trạng từ':adjectives.has(text)?'tính từ い':adverbs.has(text)?'trạng từ':text==='けれど'?'liên từ':'danh từ',
  reason:`${groups[group].reason} This item supports the action or distinction in its example.`,
  curriculum:{edition:'Minna no Nihongo Shokyu II, second edition; project functional alignment only',lessonNumber},
  role:'trọng tâm theo nhiệm vụ; chủ động nhận diện và vận dụng',
  example:{ja,reading:kana,vi,...(audioReading?{audioReading,audioText}:{})},
  sourceReview:{
    entryId,senseIds:[`${entryId}-s${senseIndex}`],
    status:'Vietnamese meaning authored in context; selected JMdict sense; OpenJLPT list membership cross-checked; not independently reviewed',
    batchId:'n4-vocabulary-02',openJlptJmdictId:entryId,rationale:groups[group].reason
  }
}));

export function applyN4VocabularyBatch02(units){
  for(const item of n4VocabularyBatch02){
    const unit=units.find(candidate=>candidate.number===item.lessonNumber);
    if(!unit)throw Error(`Missing N4 lesson ${item.lessonNumber} for ${item.text}`);
    if(unit.words.some(word=>word.text===item.text&&word.reading===item.reading))throw Error(`N4 vocabulary batch duplicate ${item.text}/${item.reading}`);
    if(!groups[item.group]?.links.includes(item.lessonNumber))throw Error(`Lesson ${item.lessonNumber} is outside ${item.group} functional links`);
    unit.words.push({...item});
  }
}
