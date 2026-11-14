const groups={
  'travel-culture':{
    links:[27,30,32,35,38,40,42,43,45],
    reason:'Read and discuss travel plans, transport, local places and cultural activities.'
  },
  'home-daily':{
    links:[28,29,30,34,38,43,44,46],
    reason:'Describe household routines, belongings, meals and everyday surroundings.'
  },
  'change-environment':{
    links:[27,31,34,35,36,38,43,44,45],
    reason:'Explain changes, conditions and observations in short N4-level reports.'
  },
  'work-study':{
    links:[28,30,33,34,40,41,42,46,49],
    reason:'Understand study, work, public information and polite requests.'
  },
  'feelings-leisure':{
    links:[29,30,31,39,44,45,46,47],
    reason:'Talk about preferences, impressions, plans and leisure with other people.'
  },
  'local-communication':{
    links:[26,31,33,34,35,42,48,49],
    reason:'Ask for help, read local signs and exchange practical information.'
  }
};

const verbs=new Set(['過ごす','感じる','気づく','気に入る','困る','混ぜる','減らす','下げる','開く','楽しむ','割れる','寄る','見つかる','光る','行う','捨てる','拾う','焼く','乗り換える','進む','増える','続く','探す','知らせる','怒る','泊まる','包む','鳴る']);
const suruNouns=new Set(['お願い','一人暮らし','影響','演奏','観光','希望','翻訳']);
const adjectives=new Set(['固い']);
const adverbs=new Set(['最も','非常に']);
const nounTypes=new Map([
  ['国際','danh từ / định ngữ の'],
  ['先輩','danh từ / hậu tố'],
  ['昔','danh từ / trạng từ'],
  ['途中','danh từ / trạng từ']
]);
const audioReadingByWord=new Map([
  ['観光','ゴゴワフルイマチオカンコオシマシタ。'],
  ['希望','サンカオキボオスルヒトワナマエオカイテクダサイ。'],
  ['泥棒','キンジョデドロボオニハイラレタイエガアリマシタ。'],
  ['混ぜる','ザイリヨオオヨクマゼテカラフライパンニイレマス。'],
  ['拾う','ミチデオトシモノオヒロッテコオバンニトドケマシタ。'],
  ['影響','オオアメノエエキョオデデンシャガオクレテイマス。'],
  ['電灯','ネルマエニヘヤノデントオオケシマシタ。'],
  ['葉','アキニナルトコノハノイロガカワリマス。'],
  ['工業','コノマチデワムカシカラコオギョオガサカンデス。'],
  ['この辺','コノヘンニギンコオワアリマスカ。'],
  ['携帯電話','ケエタイデンワデチズオミナガラエキマデアルキマシタ。'],
  ['国際','コクサイコオリュウノカイデイロイロナクニノヒトトハナシマシタ。'],
  ['続く','アメガミッカツズイテカワノミズガフエマシタ。'],
  ['気づく','エキニツイテカラサイフガナイコトニキズキマシタ。'],
  ['非常に','コノトショカンワヒジヨオニシズカデベンキョオシヤスイデス。']
  ,['開く','ホンオヒライテチズノペエジオミテクダサイ。']
  ,['固い','コノパンワカタイノデスウプニイレマシタ。']
  ,['演奏','トモダチノエンソオオキキニホオルエイキマシタ。']
  ,['感想','エイガオミタアトデカンソオオノオトニカキマシタ。']
]);
const audioTextByWord=new Map([
  ['この辺','このへんに銀行はありますか。']
]);
const wordAudioReadingByText=new Map([
  ['観光','かんこお'],['希望','きぼお'],['泥棒','どろぼお'],['影響','えいきょお'],
  ['電灯','でんとお'],['工業','こおぎょお'],['続く','つずく'],['気づく','きずく'],
  ['非常に','ひじょおに'],['演奏','えんそお'],['感想','かんそお'],['この辺','このへん']
]);

const rows=[
  [7,'お願い','おねがい','lời nhờ; đề nghị','この書類を見てください。お願いできますか。','このしょるいをみてください。おねがいできますか。','Xin hãy xem giấy tờ này. Bạn giúp tôi được không?','2036870',0,'local-communication',false,7,2],
  [42,'この辺','このへん','khu vực quanh đây','この辺に銀行はありますか。','このへんにぎんこうはありますか。','Quanh đây có ngân hàng không?','1004750',0,'local-communication',false,4,1],
  [46,'一人暮らし','ひとりぐらし','sống một mình','姉は大学の近くで一人暮らしをしています。','あねはだいがくのちかくでひとりぐらしをしています。','Chị tôi sống một mình gần trường đại học.','1613340',0,'home-daily',false,16,4],
  [42,'営業時間','えいぎょうじかん','giờ mở cửa/hoạt động','店の営業時間は午前九時から午後六時までです。','みせのえいぎょうじかんはごぜんくじからごごろくじまでです。','Giờ mở cửa của cửa hàng là từ 9 giờ sáng đến 6 giờ tối.','1173450',0,'local-communication',false,11,4],
  [36,'影響','えいきょう','ảnh hưởng; tác động','大雨の影響で、電車が遅れています。','おおあめのえいきょうで、でんしゃがおくれています。','Do ảnh hưởng của mưa lớn, tàu đang bị trễ.','1173660',0,'change-environment',false,16,4],
  [45,'演奏','えんそう','buổi biểu diễn; việc trình tấu','友達の演奏を聞きにホールへ行きました。','ともだちのえんそうをききにほおるへいきました。','Tôi đến hội trường nghe bạn biểu diễn.','1607520',0,'feelings-leisure',false,7,3],
  [30,'温泉','おんせん','suối nước nóng; khu tắm suối nóng','旅行の最後に温泉に入りました。','りょこうのさいごにおんせんにはいりました。','Cuối chuyến đi, tôi đã tắm suối nước nóng.','1183450',0,'travel-culture',false,5,2],
  [38,'家具','かぐ','đồ nội thất','家具を動かすので、少し手伝ってください。','かぐをうごかすので、すこしてつだってください。','Tôi định chuyển đồ đạc nên hãy giúp một chút.','1191870',0,'home-daily',false,16,1],
  [38,'家電','かでん','đồ điện gia dụng','新しい家電の使い方を店員に聞きました。','あたらしいかでんのつかいかたをてんいんにききました。','Tôi hỏi nhân viên cửa hàng cách dùng thiết bị điện mới.','1192380',0,'home-daily',false,12,2],
  [30,'花火大会','はなびたいかい','lễ hội/trình diễn pháo hoa','花火大会は駅前で七時に始まります。','はなびたいかいはえきまえでしちじにはじまります。','Buổi trình diễn pháo hoa bắt đầu lúc 7 giờ trước ga.','1931280',0,'travel-culture',false,7,2],
  [29,'過ごす','すごす','trải qua; dành thời gian','夏休みを家族と海の近くで過ごしました。','なつやすみをかぞくとうみのちかくですごしました。','Tôi đã nghỉ hè gần biển cùng gia đình.','1196000',0,'feelings-leisure',false,9,1],
  [45,'感じる','かんじる','cảm thấy; cảm nhận','初めての町で少し不安を感じました。','はじめてのまちですこしふあんをかんじました。','Ở thị trấn lần đầu đến, tôi cảm thấy hơi bất an.','1212260',0,'feelings-leisure',false,16,3],
  [46,'感想','かんそう','cảm nghĩ; ấn tượng','映画を見たあとで、感想をノートに書きました。','えいがをみたあとで、かんそうをのおとにかきました。','Sau khi xem phim, tôi viết cảm nghĩ vào vở.','1212480',0,'feelings-leisure',false,9,4],
  [44,'環境','かんきょう','môi trường; hoàn cảnh xung quanh','静かな環境で勉強したいです。','しずかなかんきょうでべんきょうしたいです。','Tôi muốn học trong môi trường yên tĩnh.','1213280',0,'change-environment',false,15,2],
  [42,'看板','かんばん','biển hiệu; bảng chỉ dẫn','看板に営業時間が書いてあります。','かんばんにえいぎょうじかんがかいてあります。','Giờ hoạt động được ghi trên biển hiệu.','1213990',0,'local-communication',false,4,1],
  [30,'観光','かんこう','tham quan; du lịch ngắm cảnh','午後は古い町を観光しました。','ごごはふるいまちをかんこうしました。','Buổi chiều tôi tham quan khu phố cổ.','1214840',0,'travel-culture',false,5,4],
  [31,'希望','きぼう','nguyện vọng; mong muốn','参加を希望する人は、名前を書いてください。','さんかをきぼうするひとは、なまえをかいてください。','Ai muốn tham gia xin hãy viết tên.','1219910',0,'local-communication',false,18,1],
  [42,'携帯電話','けいたいでんわ','điện thoại di động','携帯電話で地図を見ながら駅まで歩きました。','けいたいでんわでちずをみながらえきまであるきました。','Tôi vừa xem bản đồ trên điện thoại vừa đi đến ga.','1250690',0,'local-communication',false,14,2],
  [44,'気づく','きづく','nhận ra; để ý thấy','駅に着いてから、財布がないことに気づきました。','えきについてから、さいふがないことにきづきました。','Đến ga rồi tôi mới nhận ra mình không có ví.','1591330',0,'change-environment',false,11,3],
  [29,'気に入る','きにいる','thích; ưng ý','店で見た青いかばんが気に入りました。','みせでみたあおいかばんがきにいりました。','Tôi thích chiếc túi màu xanh nhìn thấy ở cửa hàng.','1221740',0,'feelings-leisure',false,10,4],
  [35,'午前中','ごぜんちゅう','buổi sáng; trong buổi sáng','午前中に銀行へ行って、午後は家で休みます。','ごぜんちゅうにぎんこうへいって、ごごはいえでやすみます。','Buổi sáng tôi đến ngân hàng, buổi chiều nghỉ ở nhà.','1269070',0,'local-communication',false,14,1],
  [26,'困る','こまる','gặp khó khăn; lúng túng','道が分からなくて困ったとき、近くの人に聞きました。','みちがわからなくてこまったとき、ちかくのひとにききました。','Khi lúng túng vì không biết đường, tôi hỏi người gần đó.','1289590',0,'local-communication',false,6,3],
  [34,'混ぜる','まぜる','trộn; khuấy đều','材料をよく混ぜてから、フライパンに入れます。','ざいりょうをよくまぜてから、ふらいぱんにいれます。','Trộn kỹ nguyên liệu rồi cho vào chảo.','1290310',0,'home-daily',false,4,2],
  [36,'減らす','へらす','giảm bớt','ごみを減らすために、買い物袋を何度も使います。','ごみをへらすために、かいものぶくろをなんどもつかいます。','Để giảm rác, tôi dùng túi mua sắm nhiều lần.','1263110',0,'change-environment',false,15,2],
  [27,'下げる','さげる','hạ xuống; giảm xuống','店の人に音を少し下げてもらいました。','みせのひとにおとをすこしさげてもらいました。','Tôi nhờ nhân viên cửa hàng giảm âm lượng một chút.','1184170',1,'change-environment',true,15,2],
  [30,'下着','したぎ','đồ lót','旅行の荷物に下着を二日分入れました。','りょこうのにもつにしたぎをふつかぶんいれました。','Tôi đã xếp đồ lót đủ dùng hai ngày vào hành lý.','1185930',0,'travel-culture',true,16,5],
  [30,'開く','ひらく','mở ra','本を開いて、地図のページを見てください。','ほんをひらいて、ちずのぺえじをみてください。','Hãy mở sách và xem trang bản đồ.','1202440',0,'work-study',true,7,3],
  [29,'楽しむ','たのしむ','tận hưởng; vui với','家族と一緒に祭りを楽しみました。','かぞくといっしょにまつりをたのしみました。','Tôi đã vui chơi ở lễ hội cùng gia đình.','1207270',0,'feelings-leisure',true,5,4],
  [38,'割れる','われる','bị vỡ; nứt','コップが床に落ちて、二つに割れました。','こっぷがゆかにおちて、ふたつにわれました。','Chiếc cốc rơi xuống sàn và vỡ làm đôi.','1208020',0,'home-daily',true,15,3],
  [30,'寄る','よる','ghé qua trên đường','帰りに駅前の店へ寄って、パンを買いました。','かえりにえきまえのみせへよって、ぱんをかいました。','Trên đường về tôi ghé cửa hàng trước ga mua bánh mì.','1219680',2,'travel-culture',true,5,4],
  [44,'空気','くうき','không khí','朝、窓を開けて部屋の空気を入れ替えました。','あさ、まどをあけてへやのくうきをいれかえました。','Buổi sáng, tôi mở cửa sổ để thay không khí trong phòng.','1245470',0,'home-daily',true,14,1],
  [43,'見つかる','みつかる','được tìm thấy','なくした鍵が机の下で見つかりました。','なくしたかぎがつくえのしたでみつかりました。','Chiếc chìa khóa bị mất được tìm thấy dưới bàn.','1604550',0,'change-environment',true,11,3],
  [44,'固い','かたい','cứng; rắn','このパンは固いので、スープに入れました。','このぱんはかたいので、すうぷにいれました。','Ổ bánh mì này cứng nên tôi cho vào súp.','1257110',0,'home-daily',true,4,4],
  [30,'湖','みずうみ','hồ nước','朝、湖のそばを一時間歩きました。','あさ、みずうみのそばをいちじかんあるきました。','Buổi sáng tôi đi bộ một giờ bên hồ.','1267280',0,'travel-culture',true,5,2],
  [44,'光る','ひかる','phát sáng; lấp lánh','夜になると、遠くの町の明かりが光って見えます。','よるになると、とおくのまちのあかりがひかってみえます。','Khi đêm xuống, ánh đèn thị trấn xa trông lấp lánh.','1272820',0,'change-environment',true,6,4],
  [40,'工業','こうぎょう','công nghiệp sản xuất','この町では昔から工業が盛んです。','このまちではむかしからこうぎょうがさかんです。','Từ xưa, ngành công nghiệp sản xuất đã phát triển ở thị trấn này.','1278040',0,'work-study',true,18,3],
  [40,'行う','おこなう','tiến hành; thực hiện','学校では毎年、避難訓練を行います。','がっこうではまいとし、ひなんくんれんをおこないます。','Trường tổ chức diễn tập sơ tán mỗi năm.','1589060',0,'work-study',true,7,3],
  [42,'国際','こくさい','quốc tế','国際交流の会で、いろいろな国の人と話しました。','こくさいこうりゅうのかいで、いろいろなくにのひととはなしました。','Tại buổi giao lưu quốc tế, tôi trò chuyện với người từ nhiều nước.','1286400',0,'work-study',true,14,2],
  [44,'最も','もっとも','nhất; cao nhất','この三つの中で、駅に最も近い店はどれですか。','このみっつのなかで、えきにもっともちかいみせはどれですか。','Trong ba nơi này, cửa hàng nào gần ga nhất?','1293700',0,'change-environment',true,14,1],
  [38,'枝','えだ','cành cây','風で落ちた枝を、庭のすみに集めました。','かぜでおちたえだを、にわのすみにあつめました。','Tôi gom những cành cây bị gió thổi rơi vào góc vườn.','1310530',0,'home-daily',true,15,3],
  [34,'捨てる','すてる','vứt bỏ','古い電池は、決められた箱に捨ててください。','ふるいでんちは、きめられたはこにすててください。','Xin hãy bỏ pin cũ vào hộp được chỉ định.','1322320',0,'home-daily',true,10,2],
  [30,'手袋','てぶくろ','găng tay','寒かったので、駅に着く前に手袋をしました。','さむかったので、えきにつくまえにてぶくろをしました。','Trời lạnh nên tôi đeo găng tay trước khi đến ga.','1328090',0,'travel-culture',true,5,3],
  [34,'拾う','ひろう','nhặt lên','道で落とし物を拾って、交番に届けました。','みちでおとしものをひろって、こうばんにとどけました。','Tôi nhặt đồ đánh rơi trên đường và mang đến đồn cảnh sát.','1332570',1,'local-communication',true,7,1],
  [29,'習慣','しゅうかん','thói quen','寝る前に日記を書く習慣があります。','ねるまえににっきをかくしゅうかんがあります。','Tôi có thói quen viết nhật ký trước khi ngủ.','1333090',0,'home-daily',true,10,1],
  [42,'床屋','とこや','tiệm cắt tóc nam','父は月に一度、駅の近くの床屋へ行きます。','ちちはつきにいちど、えきのちかくのとこやへいきます。','Mỗi tháng một lần, bố tôi đến tiệm cắt tóc gần ga.','1349410',0,'local-communication',true,14,1],
  [34,'焼く','やく','nướng; quay','魚を焼いて、夕食に出しました。','さかなをやいて、ゆうしょくにだしました。','Tôi nướng cá và dọn lên cho bữa tối.','1350600',1,'home-daily',true,4,4],
  [32,'乗り換える','のりかえる','đổi/chuyển tuyến tàu xe','次の駅で地下鉄に乗り換えてください。','つぎのえきでちかてつにのりかえてください。','Xin hãy chuyển sang tàu điện ngầm ở ga kế tiếp.','1600470',0,'travel-culture',true,6,3],
  [35,'乗り物','のりもの','phương tiện đi lại','この町では、主な乗り物はバスと電車です。','このまちでは、おもなのりものはばすとでんしゃです。','Ở thị trấn này, phương tiện chính là xe buýt và tàu điện.','1600530',0,'travel-culture',true,9,2],
  [38,'畳','たたみ','chiếu tatami','和室には畳が六枚あります。','わしつにはたたみがろくまいあります。','Trong phòng kiểu Nhật có sáu tấm tatami.','1356750',0,'home-daily',true,12,4],
  [30,'森','もり','rừng','森の中で、鳥の声を聞きながら歩きました。','もりのなかで、とりのこえをききながらあるきました。','Tôi đi bộ trong rừng và nghe tiếng chim.','1362490',0,'travel-culture',true,1,3],
  [43,'進む','すすむ','tiến lên; đi tiếp','この道をまっすぐ進むと、右に郵便局があります。','このみちをまっすぐすすむと、みぎにゆうびんきょくがあります。','Đi thẳng theo con đường này thì bưu điện ở bên phải.','1365980',0,'travel-culture',true,16,2],
  [42,'席','せき','chỗ ngồi','窓の近くの席が空いています。','まどのちかくのせきがあいています。','Chỗ ngồi gần cửa sổ đang trống.','1382250',0,'local-communication',true,10,2],
  [46,'昔','むかし','ngày xưa; trước đây','昔、この道には小さな店がたくさんありました。','むかし、このみちにはちいさなみせがたくさんありました。','Trước đây, con đường này có nhiều cửa hàng nhỏ.','1382370',0,'feelings-leisure',true,13,1],
  [30,'赤ちゃん','あかちゃん','em bé','赤ちゃんが眠ったので、みんな静かにしました。','あかちゃんがねむったので、みんなしずかにしました。','Em bé ngủ rồi nên mọi người giữ yên lặng.','1383260',0,'home-daily',true,2,2],
  [41,'先輩','せんぱい','anh/chị khóa trước; người đi trước','仕事の進め方を先輩に教えてもらいました。','しごとのすすめかたをせんぱいにおしえてもらいました。','Tôi được anh/chị đi trước chỉ cách tiến hành công việc.','1388410',0,'work-study',true,5,2],
  [36,'増える','ふえる','tăng lên; tăng thêm','この町では、外国から来る観光客が増えています。','このまちでは、がいこくからくるかんこうきゃくがふえています。','Ở thị trấn này, du khách từ nước ngoài đang tăng lên.','1602440',0,'change-environment',true,2,4],
  [43,'続く','つづく','tiếp diễn; kéo dài','雨が三日続いて、川の水が増えました。','あめがみっかつづいて、かわのみずがふえました。','Mưa liên tục ba ngày khiến nước sông dâng lên.','1405790',0,'change-environment',true,16,4],
  [34,'探す','さがす','tìm kiếm','図書館で、旅行についての本を探しました。','としょかんで、りょこうについてのほんをさがしました。','Tôi tìm sách về du lịch trong thư viện.','1593670',0,'work-study',true,11,2],
  [35,'値段','ねだん','giá tiền','同じ品物でも、店によって値段が違います。','おなじしなものでも、みせによってねだんがちがいます。','Cùng một món hàng nhưng giá khác nhau tùy cửa hàng.','1600160',0,'local-communication',true,4,5],
  [33,'知らせる','しらせる','báo cho biết; thông báo','予定が変わったら、すぐに家族へ知らせてください。','よていがかわったら、すぐにかぞくへしらせてください。','Nếu kế hoạch thay đổi, hãy báo ngay cho gia đình.','1420410',0,'work-study',true,16,2],
  [38,'着物','きもの','kimono; trang phục truyền thống','祭りで着物を着た人を見ました。','まつりできものをきたひとをみました。','Tôi thấy người mặc kimono ở lễ hội.','1423240',0,'travel-culture',true,9,1],
  [33,'泥棒','どろぼう','kẻ trộm','近所で泥棒に入られた家がありました。','きんじょでどろぼうにはいられたいえがありました。','Trong khu phố có nhà bị trộm đột nhập.','1599340',0,'local-communication',true,10,3],
  [30,'田舎','いなか','vùng quê; nông thôn','夏休みに祖父母のいる田舎へ行きました。','なつやすみにそふぼのいるいなかへいきました。','Kỳ nghỉ hè tôi về quê ông bà.','1442750',0,'travel-culture',true,9,3],
  [38,'電灯','でんとう','đèn điện','寝る前に、部屋の電灯を消しました。','ねるまえに、へやのでんとうをけしました。','Trước khi ngủ, tôi tắt đèn trong phòng.','1443660',0,'home-daily',true,16,5],
  [43,'途中','とちゅう','trên đường; giữa chừng','駅へ行く途中で、友達に会いました。','えきへいくとちゅうで、ともだちにあいました。','Trên đường đến ga, tôi gặp bạn.','1582200',0,'travel-culture',true,16,2],
  [29,'怒る','おこる','nổi giận','弟は約束の時間に遅れて、父に怒られました。','おとうとはやくそくのじかんにおくれて、ちちにおこられました。','Em trai tôi đến muộn giờ hẹn nên bị bố giận.','1445690',0,'feelings-leisure',true,10,3],
  [32,'特急','とっきゅう','tàu tốc hành đặc biệt','特急に乗ると、町まで一時間で着きます。','とっきゅうにのると、まちまでいちじかんでつきます。','Đi tàu tốc hành thì đến thị trấn trong một giờ.','1454750',0,'travel-culture',true,6,3],
  [30,'泊まる','とまる','nghỉ lại qua đêm','旅行の一日目は、駅の近くのホテルに泊まりました。','りょこうのいちにちめは、えきのちかくのほてるにとまりました。','Đêm đầu chuyến đi, tôi nghỉ ở khách sạn gần ga.','1474850',0,'travel-culture',true,5,3],
  [45,'番組','ばんぐみ','chương trình truyền hình','旅行の番組を見て、次の休みに行きたくなりました。','りょこうのばんぐみをみて、つぎのやすみにいきたくなりました。','Xem chương trình du lịch khiến tôi muốn đi vào kỳ nghỉ tới.','1482340',0,'feelings-leisure',true,5,1],
  [44,'非常に','ひじょうに','rất; vô cùng','この図書館は非常に静かで、勉強しやすいです。','このとしょかんはひじょうにしずかで、べんきょうしやすいです。','Thư viện này rất yên tĩnh và dễ học.','1484930',0,'change-environment',true,16,1],
  [30,'美術館','びじゅつかん','bảo tàng mỹ thuật','日曜日に美術館へ行って、絵を見ました。','にちようびにびじゅつかんへいって、えをみました。','Chủ nhật tôi đến bảo tàng mỹ thuật xem tranh.','1486460',0,'travel-culture',true,5,4],
  [45,'文化','ぶんか','văn hóa','地域の文化を紹介する祭りに参加しました。','ちいきのぶんかをしょうかいするまつりにさんかしました。','Tôi tham gia lễ hội giới thiệu văn hóa địa phương.','1505120',0,'travel-culture',true,9,4],
  [34,'包む','つつむ','gói; bọc','店の人が品物を紙で包んでくれました。','みせのひとがしなものをかみでつつんでくれました。','Nhân viên cửa hàng đã gói món hàng bằng giấy giúp tôi.','1584060',0,'home-daily',true,15,3],
  [40,'翻訳','ほんやく','việc dịch; bản dịch','短い手紙をベトナム語に翻訳しました。','みじかいてがみをべとなむごにほんやくしました。','Tôi dịch một lá thư ngắn sang tiếng Việt.','1523400',0,'work-study',true,14,4],
  [45,'夢','ゆめ','ước mơ','将来の夢について、友達と話しました。','しょうらいのゆめについて、ともだちとはなしました。','Tôi đã trò chuyện với bạn về ước mơ tương lai.','1529410',1,'feelings-leisure',true,18,1],
  [42,'鳴る','なる','reo; vang lên','授業中に電話が鳴ったので、外へ出ました。','じゅぎょうちゅうにでんわがなったので、そとへでました。','Điện thoại reo trong giờ học nên tôi ra ngoài.','1532910',0,'local-communication',true,16,2],
  [30,'遊び','あそび','trò chơi; hoạt động giải trí','子どものころ、外で遊ぶのが好きでした。','こどものころ、そとであそぶのがすきでした。','Hồi nhỏ, tôi thích chơi ở ngoài trời.','1542070',1,'feelings-leisure',true,8,1],
  [38,'葉','は','lá cây','秋になると、木の葉の色が変わります。','あきになると、このはのいろがかわります。','Khi sang thu, màu lá cây thay đổi.','1546550',0,'change-environment',true,15,3],
  [30,'踊り','おどり','điệu múa; việc nhảy múa','祭りの踊りを、みんなで練習しました。','まつりのおどりを、みんなでれんしゅうしました。','Mọi người cùng luyện điệu múa của lễ hội.','1546880',0,'feelings-leisure',true,7,3],
  [32,'旅館','りょかん','quán trọ kiểu Nhật','旅館の人に、夕食の時間を確認しました。','りょかんのひとに、ゆうしょくのじかんをかくにんしました。','Tôi xác nhận giờ ăn tối với nhân viên quán trọ.','1553130',0,'travel-culture',true,5,3]
];

export const n4VocabularyBatch03=rows.map(([proposedLessonNumber,text,reading,meaning,ja,kana,vi,entryId,senseIndex,group,openJlpt,irodoriLesson,irodoriActivity])=>({
  lessonNumber:groups[group].links.includes(proposedLessonNumber)?proposedLessonNumber:groups[group].links[0],
  text,reading,meaning,group,
  type:suruNouns.has(text)?'danh từ / động từ する':verbs.has(text)?'động từ':adjectives.has(text)?'tính từ い':adverbs.has(text)?'trạng từ':nounTypes.get(text)||'danh từ',
  reason:`${groups[group].reason} This word is used in the example and supports the linked lesson task.`,
  curriculum:{edition:'Minna no Nihongo Shokyu II, second edition; project functional alignment only',lessonNumber:groups[group].links.includes(proposedLessonNumber)?proposedLessonNumber:groups[group].links[0]},
  role:'trọng tâm theo nhiệm vụ; chủ động nhận diện và vận dụng',
  example:{ja,reading:kana,vi,...(audioReadingByWord.has(text)?{audioReading:audioReadingByWord.get(text)}:{}),...(audioTextByWord.has(text)?{audioText:audioTextByWord.get(text)}:{})},
  ...(wordAudioReadingByText.has(text)?{audioReading:wordAudioReadingByText.get(text)}:{}),
  ...(text==='この辺'?{audioText:reading}:{}),
  sourceReview:{
    entryId,senseIds:[`${entryId}-s${senseIndex}`],
    status:'Project-authored Vietnamese meaning and example; selected JMdict sense; Irodori coordinate verified; OpenJLPT crosswalk recorded where present; not independently reviewed',
    batchId:'n4-vocabulary-03',
    ...(openJlpt?{openJlptJmdictId:entryId}:{}),
    irodori:{sheet:'wordlist_all',book:'初級2',lesson:irodoriLesson,activity:irodoriActivity},
    rationale:groups[group].reason
  }
}));

export function applyN4VocabularyBatch03(units){
  for(const item of n4VocabularyBatch03){
    const unit=units.find(candidate=>candidate.number===item.lessonNumber);
    if(!unit)throw Error(`Missing N4 lesson ${item.lessonNumber} for ${item.text}`);
    if(unit.words.some(word=>word.text===item.text&&word.reading===item.reading))throw Error(`N4 vocabulary batch duplicate ${item.text}/${item.reading}`);
    unit.words.push({...item});
  }
}
