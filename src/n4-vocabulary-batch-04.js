const groups={
  'transport-stay':{
    links:[27,29,31,33,35,38,41,42],
    reason:'Read travel signs and announcements, handle tickets and lodging, and ask for help with belongings.'
  },
  'shopping-service-contract':{
    links:[29,31,33,34,35,42,45],
    reason:'Compare prices and service terms, arrange delivery or returns, and understand payment and food-date labels.'
  },
  'appliance-digital-trouble':{
    links:[29,30,33,34,38,40,44,46],
    reason:'Understand device instructions and report connection, power, condition, and operation problems.'
  },
  'cooking-waste':{
    links:[33,34,38,39,42],
    reason:'Read ingredient information and follow short cooking instructions in everyday situations.'
  }
};

const verbs=new Set(['預かる','預ける','配送','返却','貸し出し','販売','募集','日帰り','充電','点検','動かす','消える','はずす','取り出す','戻す','つながる','つまる']);
const suruNouns=new Set(['アナウンス','日帰り','配送','返却','貸し出し','販売','募集','充電','点検','予算']);
const adjectives=new Set(['くわしい']);
const nounTypes=new Map([
  ['海外','danh từ / định ngữ の'],
  ['年中無休','danh từ / định ngữ の'],
  ['税込','danh từ / định ngữ の'],
  ['最新','danh từ / định ngữ の'],
  ['ワイヤレス','danh từ / định ngữ の'],
  ['両面','danh từ / định ngữ の'],
  ['白黒','danh từ / định ngữ の'],
  ['機能','danh từ / động từ する']
]);

const audioReadingByWord=new Map([
  ['貴重品','キチョオヒン'],['状態','ジョオタイ'],['入場券','ニュウジョオケン'],
  ['観光客','カンコオキャク'],['店長','テンチョオ'],['横断歩道','オオダンホドウ'],
  ['消費期限','ショオヒキゲン'],['賞味期限','ショオミキゲン'],['両面','リョオメン'],
  ['材料','ザイリョオ'],['調味料','チョウミリョオ'],['豆腐','トオフ'],
  ['交差点','コオサテン'],['方角','ホオガク'],['動画','ドオガ'],
  ['送料','ソオリョオ'],['配送','ハイソオ'],['消費税','ショオヒゼイ'],['機能','キノオ']
]);
const audioReadingByExampleText=new Map([
  ['貴重品は、部屋の金庫に入れてください。','キチョオヒンワヘヤノキンコニイレテクダサイ'],
  ['使えなくなった電気製品を、店に持って行きました。','ツカエナクナッタデンキセエヒンオミセニモッテイキマシタ'],
  ['機械の状態を、説明書で確認しました。','キカイノジョオタイオセツメエショデカクニンシマシタ'],
  ['入場券は、入口の近くで買えます。','ニュウジョオケンワイリグチノチカクデカエマス'],
  ['この町には、海外から観光客が来ます。','コノマチニワカイガイカラカンコオキャクガキマス'],
  ['この店の定休日は、毎週水曜日です。','コノミセノテエキュウビワマイシュウスイヨオビデス'],
  ['分からないことを、店長に聞きました。','ワカラナイコトオテンチョオニキキマシタ'],
  ['最新の情報は、店のウェブサイトで見られます。','サイシンノジョオホオワミセノウェブサイトデミラレマス'],
  ['横断歩道を渡る前に、信号を確認します。','オオダンホドオオワタルマエニシンゴオオカクニンシマス'],
  ['食べる前に、消費期限を確認してください。','タベルマエニショオヒキゲンオカクニンシテクダサイ'],
  ['この食品の賞味期限は、来月までです。','コノショクヒンノショオミキゲンワライゲツマデデス'],
  ['乳製品が入っているか、表示を読みました。','ニュウセエヒンガハイッテイルカヒョオジオヨミマシタ'],
  ['紙の両面に、名前を書いてください。','カミノリョオメンニナマエオカイテクダサイ'],
  ['料理の材料を、買い物の前に確認しました。','リョオリノザイリョオオカイモノノマエニカクニンシマシタ'],
  ['豆腐を切って、みそ汁に入れました。','トオフオキッテミソシルニイレマシタ'],
  ['次の交差点を左に曲がると、銀行があります。','ツギノコオサテンオヒダリニマガルトギンコオガアリマス'],
  ['駅はこの方角にありますか。','エキワコノホオガクニアリマスカ'],
  ['休みの日に、日本語の動画を見ました。','ヤスミノヒニニホンゴノドオガオミマシタ'],
  ['この商品は、五千円以上なら送料が無料です。','コノショオヒンワゴセンエンイジョオナラソオリョオガムリョオデス'],
  ['商品の配送は、来週の月曜日です。','ショオヒンノハイソオワライシュウノゲツヨオビデス'],
  ['この店では、旅行用の自転車を貸し出しています。','コノミセデワリョコオヨオノジテンシャオカシダシテイマス'],
  ['会計のとき、クーポンを見せると安くなります。','カイケエノトキクウポンオミセルトヤスクナリマス'],
  ['レシートには、消費税も書いてあります。','レシイトニワショオヒゼエモカイテアリマス'],
  ['この表示価格は、税込の金額です。','コノヒョオジカカクワゼエコミノキンガクデス'],
  ['この機械では、紙幣を使えません。','コノキカイデワシヘイオツカエマセン'],
  ['このメーカーの製品は、説明が分かりやすいです。','コノメエカアノセエヒンワセツメエガワカリヤスイデス'],
  ['このカメラには、便利な機能がいくつかあります。','コノカメラニワベンリナキノオガイクツカアリマス'],
  ['プリンターに紙がつまったので、電源を切りました。','プリンタアニカミガツマッタノデデンゲンオキリマシタ'],
  ['コンサートのチケットを、二枚予約しました。','コンサアトノチケットオニマイヨヤクシマシタ'],
  ['ピーナッツが入っているか、店員に聞きました。','ピイナッツガハイッテイルカテンインニキキマシタ'],
  ['このプリンターは、白黒で印刷できます。','コノプリンタアワシロクロデインサツデキマス'],
  ['使う調味料を、先にテーブルに並べます。','ツカウチョウミリョオオサキニテエブルニナラベマス']
]);
const kanaOnlyAudio=new Set([
  'プリンターに紙がつまったので、電源を切りました。',
  'コンサートのチケットを、二枚予約しました。',
  'ピーナッツが入っているか、店員に聞きました。',
  'このプリンターは、白黒で印刷できます。',
  '使う調味料を、先にテーブルに並べます。',
  '駅はこの方角にありますか。',
  '料理の材料を、買い物の前に確認しました。',
  '休みの日に、日本語の動画を見ました。',
  'この商品は、五千円以上なら送料が無料です。',
  'この機械では、紙幣を使えません。'
]);

const rows=[
  [31,'行き先','いきさき','điểm đến','旅行の行き先を、先に決めました。','りょこうのいきさきを、さきにきめました。','Tôi đã quyết định trước điểm đến của chuyến đi.','1281720',0,'transport-stay',false,5,2],
  [29,'アナウンス','アナウンス','thông báo qua loa','駅のアナウンスで、電車の遅れを知りました。','えきのあなうんすで、でんしゃのおくれをしりました。','Tôi biết tàu bị trễ qua thông báo ở nhà ga.','1017340',0,'transport-stay',false,6,3],
  [29,'遅れ','おくれ','sự chậm trễ','電車に遅れが出ているので、駅で待ちます。','でんしゃにおくれがでているので、えきでまちます。','Tàu đang bị chậm nên tôi sẽ chờ ở ga.','1422020',0,'transport-stay',false,6,1],
  [35,'つきあたり','つきあたり','cuối đường hoặc hành lang','この道のつきあたりを、右に曲がってください。','このみちのつきあたりを、みぎにまがってください。','Xin hãy rẽ phải ở cuối con đường này.','1456770',0,'transport-stay',false,8,2],
  [35,'交差点','こうさてん','ngã tư; giao lộ','次の交差点を左に曲がると、銀行があります。','つぎのこうさてんをひだりにまがると、ぎんこうがあります。','Rẽ trái ở giao lộ tiếp theo thì có ngân hàng.','1592970',0,'transport-stay',false,6,1],
  [33,'横断歩道','おうだんほどう','vạch sang đường','横断歩道を渡る前に、信号を確認します。','おうだんほどうをわたるまえに、しんごうをかくにんします。','Trước khi qua vạch sang đường, tôi kiểm tra đèn tín hiệu.','1180910',0,'transport-stay',false,6,1],
  [35,'方角','ほうがく','phương hướng','駅はこの方角にありますか。','えきはこのほうがくにありますか。','Nhà ga có ở hướng này không?','1516950',0,'transport-stay',false,1,3],
  [31,'海外','かいがい','nước ngoài; ở nước ngoài','来年、海外へ旅行する予定です。','らいねん、かいがいへりょこうするよていです。','Năm sau tôi dự định đi du lịch nước ngoài.','1201260',0,'transport-stay',false,5,1],
  [31,'ホテル','ホテル','khách sạn','ホテルの予約を、電話で確認しました。','ほてるのよやくを、でんわでかくにんしました。','Tôi đã xác nhận đặt phòng khách sạn qua điện thoại.','1122650',0,'transport-stay',false,1,3],
  [31,'宿','やど','chỗ trọ; nhà trọ','駅の近くに宿を取って、二泊しました。','えきのちかくにやどをとって、にはくしました。','Tôi tìm chỗ trọ gần ga và ở hai đêm.','1337190',0,'transport-stay',false,5,3],
  [31,'民宿','みんしゅく','nhà trọ tư nhân','旅行のとき、海の近くの民宿に泊まりました。','りょこうのとき、うみのちかくのみんしゅくにとまりました。','Trong chuyến đi, tôi nghỉ tại nhà trọ gần biển.','1528950',0,'transport-stay',false,5,3],
  [31,'日帰り','ひがえり','chuyến đi về trong ngày','日帰りの旅行なので、荷物は少しだけです。','ひがえりのりょこうなので、にもつはすこしだけです。','Vì đi về trong ngày nên hành lý chỉ có một ít.','1463920',0,'transport-stay',false,5,4],
  [31,'入場券','にゅうじょうけん','vé vào cửa','入場券は、入口の近くで買えます。','にゅうじょうけんは、いりぐちのちかくでかえます。','Có thể mua vé vào cửa gần lối vào.','1466380',0,'transport-stay',false,7,3],
  [31,'チケット','チケット','vé','コンサートのチケットを、二枚予約しました。','こんさあとのちけっとを、にまいよやくしました。','Tôi đã đặt hai vé xem hòa nhạc.','1077720',0,'transport-stay',false,17,4],
  [31,'パンフレット','パンフレット','sách giới thiệu; tờ gấp thông tin','受付でパンフレットをもらい、地図を見ました。','うけつけでぱんふれっとをもらい、ちずをみました。','Tôi nhận tờ giới thiệu ở quầy tiếp tân rồi xem bản đồ.','1103450',0,'transport-stay',false,13,1],
  [31,'観光客','かんこうきゃく','khách du lịch','この町には、海外から観光客が来ます。','このまちには、かいがいからかんこうきゃくがきます。','Khách du lịch từ nước ngoài đến thị trấn này.','1214870',0,'transport-stay',false,1,3],
  [41,'預かる','あずかる','giữ hộ; trông nom','ホテルで、荷物を夕方まで預かってもらいました。','ほてるで、にもつをゆうがたまであずかってもらいました。','Tôi nhờ khách sạn giữ hành lý đến chiều.','1544970',0,'transport-stay',false,14,3],
  [41,'預ける','あずける','gửi; giao cho giữ hộ','出かける前に、フロントに荷物を預けました。','でかけるまえに、ふろんとににもつをあずけました。','Trước khi ra ngoài, tôi gửi hành lý ở quầy tiếp tân.','1544990',0,'transport-stay',false,13,5],
  [29,'貴重品','きちょうひん','đồ vật có giá trị','貴重品は、部屋の金庫に入れてください。','きちょうひんは、へやのきんこにいれてください。','Xin hãy để đồ có giá trị vào két trong phòng.','1223530',0,'transport-stay',false,16,5],
  [29,'落とし物','おとしもの','đồ thất lạc; đồ đánh rơi','駅で落とし物を見つけて、係の人に渡しました。','えきでおとしものをみつけて、かかりのひとにわたしました。','Tôi tìm thấy đồ thất lạc ở ga và đưa cho nhân viên phụ trách.','1589250',0,'transport-stay',false,11,4],
  [31,'ロビー','ロビー','sảnh chờ','ロビーで友達を待っています。','ろびーでともだちをまっています。','Tôi đang chờ bạn ở sảnh.','1147800',0,'transport-stay',false,8,4],
  [42,'価格','かかく','giá cả','二つの店の価格を比べてから、買います。','ふたつのみせのかかくをくらべてから、かいます。','Tôi sẽ so giá ở hai cửa hàng rồi mới mua.','1189500',0,'shopping-service-contract',false,12,2],
  [31,'定休日','ていきゅうび','ngày nghỉ cố định của cửa hàng','この店の定休日は、毎週水曜日です。','このみせのていきゅうびは、まいしゅうすいようびです。','Ngày nghỉ cố định của cửa hàng này là thứ Tư hằng tuần.','1435540',0,'shopping-service-contract',false,14,4],
  [31,'年中無休','ねんじゅうむきゅう','mở cửa quanh năm','この店は年中無休ですが、夜は早く閉まります。','このみせはねんじゅうむきゅうですが、よるははやくしまります。','Cửa hàng này mở quanh năm nhưng buổi tối đóng cửa sớm.','1731000',0,'shopping-service-contract',false,14,4],
  [42,'送料','そうりょう','phí vận chuyển','この商品は、五千円以上なら送料が無料です。','このしょうひんは、ごせんえんいじょうならそうりょうがむりょうです。','Món hàng này được miễn phí vận chuyển nếu giá từ 5.000 yên trở lên.','1402870',0,'shopping-service-contract',false,12,1],
  [42,'配送','はいそう','việc giao hàng','商品の配送は、来週の月曜日です。','しょうひんのはいそうは、らいしゅうのげつようびです。','Hàng sẽ được giao vào thứ Hai tuần sau.','1473120',0,'shopping-service-contract',false,12,4],
  [42,'宅配便','たくはいびん','dịch vụ giao hàng tận nhà','荷物を宅配便で、実家に送りました。','にもつをたくはいびんで、じっかにおくりました。','Tôi gửi hành lý về nhà bố mẹ bằng dịch vụ giao hàng tận nhà.','1415790',0,'shopping-service-contract',false,14,1],
  [29,'返却','へんきゃく','việc trả lại đồ đã mượn','図書館の本は、金曜日までに返却してください。','としょかんのほんは、きんようびまでにへんきゃくしてください。','Xin hãy trả sách thư viện trước thứ Sáu.','1512180',0,'shopping-service-contract',false,13,3],
  [42,'貸し出し','かしだし','việc cho mượn','この店では、旅行用の自転車を貸し出しています。','このみせでは、りょこうようのじてんしゃをかしだしています。','Cửa hàng này cho thuê xe đạp dùng khi đi du lịch.','1590240',0,'shopping-service-contract',false,7,1],
  [42,'販売','はんばい','việc bán hàng','駅の売店で、地元のお菓子を販売しています。','えきのばいてんで、じもとのおかしをはんばいしています。','Quầy hàng ở ga bán bánh kẹo địa phương.','1481800',0,'shopping-service-contract',false,8,4],
  [31,'募集','ぼしゅう','tuyển; nhận đăng ký','店は、週末に働く人を募集しています。','みせは、しゅうまつにはたらくひとをぼしゅうしています。','Cửa hàng đang tuyển người làm vào cuối tuần.','1514830',0,'shopping-service-contract',false,18,2],
  [42,'セール','セール','đợt giảm giá','来週、この店で夏のセールがあります。','らいしゅう、このみせでなつのせーるがあります。','Tuần sau cửa hàng này có đợt giảm giá mùa hè.','1074330',0,'shopping-service-contract',false,16,5],
  [42,'クーポン','クーポン','phiếu giảm giá','会計のとき、クーポンを見せると安くなります。','かいけいのとき、くーぽんをみせるとやすくなります。','Khi thanh toán, đưa phiếu giảm giá thì giá sẽ rẻ hơn.','1043290',0,'shopping-service-contract',false,3,3],
  [42,'消費税','しょうひぜい','thuế tiêu dùng','レシートには、消費税も書いてあります。','れしーとには、しょうひぜいもかいてあります。','Trên hóa đơn cũng có ghi thuế tiêu dùng.','1350320',0,'shopping-service-contract',false,12,4],
  [42,'税込','ぜいこみ','đã gồm thuế','この表示価格は、税込の金額です。','このひょうじかかくは、ぜいこみのきんがくです。','Giá được niêm yết này là số tiền đã gồm thuế.','1596250',0,'shopping-service-contract',false,16,5],
  [42,'キャッシュカード','キャッシュカード','thẻ ngân hàng dùng rút tiền','キャッシュカードで、お金を引き出しました。','きゃっしゅかーどで、おかねをひきだしました。','Tôi rút tiền bằng thẻ ngân hàng.','1041430',0,'shopping-service-contract',false,14,1],
  [42,'紙幣','しへい','tiền giấy','この機械では、紙幣を使えません。','このきかいでは、しへいをつかえません。','Máy này không dùng được tiền giấy.','1311600',0,'shopping-service-contract',false,14,1],
  [42,'ポイント','ポイント','điểm tích lũy khi mua hàng','買い物をすると、ポイントがたまります。','かいものをすると、ぽいんとがたまります。','Khi mua sắm, điểm tích lũy sẽ được cộng.','1124860',3,'shopping-service-contract',false,16,3],
  [33,'消費期限','しょうひきげん','hạn sử dụng an toàn của thực phẩm','食べる前に、消費期限を確認してください。','たべるまえに、しょうひきげんをかくにんしてください。','Trước khi ăn, xin hãy kiểm tra hạn sử dụng.','2233960',0,'shopping-service-contract',false,11,3],
  [33,'賞味期限','しょうみきげん','hạn dùng ngon nhất; hạn chất lượng','この食品の賞味期限は、来月までです。','このしょくひんのしょうみきげんは、らいげつまでです。','Hạn dùng ngon nhất của thực phẩm này là đến tháng sau.','1351980',0,'shopping-service-contract',false,11,4],
  [31,'店長','てんちょう','quản lý cửa hàng','分からないことを、店長に聞きました。','わからないことを、てんちょうにききました。','Tôi đã hỏi quản lý cửa hàng điều mình chưa rõ.','1440730',0,'shopping-service-contract',false,10,3],
  [42,'メーカー','メーカー','nhà sản xuất','このメーカーの製品は、説明が分かりやすいです。','このめーかーのせいひんは、せつめいがわかりやすいです。','Sản phẩm của nhà sản xuất này có hướng dẫn dễ hiểu.','1132420',0,'shopping-service-contract',false,12,1],
  [42,'機種','きしゅ','mẫu; dòng máy','店で、二つのスマホの機種を比べました。','みせで、ふたつのすまほのきしゅをくらべました。','Ở cửa hàng, tôi đã so sánh mẫu của hai chiếc điện thoại.','1220980',0,'shopping-service-contract',false,11,3],
  [42,'機能','きのう','chức năng','このカメラには、便利な機能がいくつかあります。','このかめらには、べんりなきのうがいくつかあります。','Máy ảnh này có một vài chức năng tiện lợi.','1221130',0,'shopping-service-contract',false,12,4],
  [31,'最新','さいしん','mới nhất','最新の情報は、店のウェブサイトで見られます。','さいしんのじょうほうは、みせのうぇぶさいとでみられます。','Có thể xem thông tin mới nhất trên trang web cửa hàng.','1294090',0,'shopping-service-contract',false,16,1],
  [42,'予算','よさん','ngân sách; dự toán','旅行の予算を決めてから、ホテルを選びます。','りょこうのよさんをきめてから、ほてるをえらびます。','Tôi sẽ quyết định ngân sách chuyến đi rồi chọn khách sạn.','1543000',0,'shopping-service-contract',false,18,2],
  [29,'電気製品','でんきせいひん','đồ điện; thiết bị điện','使えなくなった電気製品を、店に持って行きました。','つかえなくなったでんきせいひんを、みせにもっていきました。','Tôi mang thiết bị điện không còn dùng được đến cửa hàng.','1443090',0,'appliance-digital-trouble',false,12,1],
  [29,'ガス','ガス','khí gas dùng làm nhiên liệu','料理が終わったら、ガスを止めてください。','りょうりがおわったら、がすをとめてください。','Nấu xong thì xin hãy khóa gas.','1040060',0,'appliance-digital-trouble',true,7,2],
  [29,'充電','じゅうでん','việc sạc điện','出かける前に、スマホを充電しました。','でかけるまえに、すまほをじゅうでんしました。','Trước khi ra ngoài, tôi đã sạc điện thoại.','1334390',0,'appliance-digital-trouble',false,12,3],
  [29,'乾電池','かんでんち','pin khô; pin rời','リモコンの乾電池を、新しいものに替えました。','りもこんのかんでんちを、あたらしいものにかえました。','Tôi đã thay pin điều khiển từ xa bằng pin mới.','1210100',0,'appliance-digital-trouble',false,15,3],
  [29,'スマホ','スマホ','điện thoại thông minh','スマホの画面が暗くて、文字が読めません。','すまほのがめんがくらくて、もじがよめません。','Màn hình điện thoại tối nên tôi không đọc được chữ.','2641300',0,'appliance-digital-trouble',false,2,3],
  [29,'インターネット','インターネット','mạng Internet','ホテルの部屋で、インターネットが使えません。','ほてるのへやで、いんたーねっとがつかえません。','Tôi không dùng được Internet trong phòng khách sạn.','1022880',0,'appliance-digital-trouble',false,13,2],
  [38,'動画','どうが','video; đoạn phim','休みの日に、日本語の動画を見ました。','やすみのひに、にほんごのどうがをみました。','Vào ngày nghỉ, tôi đã xem video tiếng Nhật.','1451290',0,'appliance-digital-trouble',false,18,3],
  [29,'イヤホン','イヤホン','tai nghe','電車の中では、イヤホンで音楽を聞きます。','でんしゃのなかでは、いやほんでおんがくをききます。','Trên tàu, tôi nghe nhạc bằng tai nghe.','1021880',0,'appliance-digital-trouble',false,12,1],
  [29,'ワイヤレス','ワイヤレス','không dây','このワイヤレスのイヤホンは、軽くて便利です。','このわいやれすのいやほんは、かるくてべんりです。','Tai nghe không dây này nhẹ và tiện lợi.','1148810',0,'appliance-digital-trouble',false,12,1],
  [29,'マナーモード','マナーモード','chế độ im lặng của điện thoại','図書館に入る前に、スマホをマナーモードにしました。','としょかんにはいるまえに、すまほをまなーもーどにしました。','Trước khi vào thư viện, tôi chuyển điện thoại sang chế độ im lặng.','2027290',0,'appliance-digital-trouble',false,8,4],
  [44,'ボリューム','ボリューム','âm lượng','テレビのボリュームを、少し下げてください。','てれびのぼりゅーむを、すこしさげてください。','Xin hãy giảm âm lượng ti-vi một chút.','1124310',0,'appliance-digital-trouble',false,4,5],
  [29,'点検','てんけん','việc kiểm tra; kiểm định','故障かどうか、店で点検してもらいました。','こしょうかどうか、みせでてんけんしてもらいました。','Tôi nhờ cửa hàng kiểm tra xem máy có hỏng không.','1441540',0,'appliance-digital-trouble',false,7,2],
  [29,'状態','じょうたい','trạng thái; tình trạng','機械の状態を、説明書で確認しました。','きかいのじょうたいを、せつめいしょでかくにんしました。','Tôi kiểm tra tình trạng máy trong sách hướng dẫn.','1356730',0,'appliance-digital-trouble',false,12,2],
  [29,'汚れ','よごれ','vết bẩn; bụi bẩn','画面の汚れを、柔らかい布で拭きました。','がめんのよごれを、やわらかいぬのでふきました。','Tôi lau vết bẩn trên màn hình bằng khăn mềm.','1612200',0,'appliance-digital-trouble',false,12,2],
  [29,'動かす','うごかす','di chuyển; làm cho chạy','修理の前に、機械を動かさないでください。','しゅうりのまえに、きかいをうごかさないでください。','Trước khi sửa, xin đừng cho máy chạy.','1451170',0,'appliance-digital-trouble',false,12,4],
  [29,'消える','きえる','tắt; biến mất','使っている途中で、画面が消えてしまいました。','つかっているとちゅうで、がめんがきえてしまいました。','Đang sử dụng thì màn hình bị tắt mất.','1350040',1,'appliance-digital-trouble',false,16,2],
  [30,'はずす','はずす','tháo; gỡ ra','掃除する前に、カバーをはずしてください。','そうじするまえに、かばあをはずしてください。','Trước khi vệ sinh, xin hãy tháo nắp bảo vệ.','1203270',0,'appliance-digital-trouble',false,14,1],
  [30,'取り出す','とりだす','lấy ra','乾電池を取り出してから、ふたを閉めます。','かんでんちをとりだしてから、ふたをしめます。','Sau khi lấy pin ra, tôi đóng nắp lại.','1326770',0,'appliance-digital-trouble',false,12,4],
  [30,'戻す','もどす','đưa về; đặt lại','使った道具は、元の場所に戻してください。','つかったどうぐは、もとのばしょにもどしてください。','Xin hãy đặt dụng cụ đã dùng về chỗ cũ.','1535850',0,'appliance-digital-trouble',false,13,4],
  [34,'やり方','やりかた','cách làm; phương pháp','説明書を読んでも、やり方が分かりません。','せつめいしょをよんでも、やりかたがわかりません。','Dù đọc sách hướng dẫn, tôi vẫn không hiểu cách làm.','1012960',0,'appliance-digital-trouble',false,13,2],
  [44,'くわしい','くわしい','chi tiết; am hiểu','この機械の使い方を、店員がくわしく説明しました。','このきかいのつかいかたを、てんいんがくわしくせつめいしました。','Nhân viên đã giải thích chi tiết cách dùng máy này.','1351730',0,'appliance-digital-trouble',false,5,3],
  [29,'つながる','つながる','được kết nối; kết nối được','スマホがインターネットにつながりません。','すまほがいんたあねっとにつながりません。','Điện thoại không kết nối được Internet.','1251880',1,'appliance-digital-trouble',false,11,3],
  [29,'つまる','つまる','bị kẹt; bị tắc','プリンターに紙がつまったので、電源を切りました。','ぷりんたあにかみがつまったので、でんげんをきりました。','Giấy bị kẹt trong máy in nên tôi đã tắt nguồn.','1226480',1,'appliance-digital-trouble',false,10,2],
  [34,'フタ','フタ','nắp','コーヒーを入れた後、カップのフタを閉めました。','こーひーをいれたあと、かっぷのふたをしめました。','Sau khi cho cà phê vào, tôi đậy nắp cốc lại.','1204540',0,'appliance-digital-trouble',false,12,4],
  [30,'カバー','カバー','nắp; vỏ bọc','スマホのカバーを外して、画面を掃除しました。','すまほのかばーをはずして、がめんをそうじしました。','Tôi tháo vỏ điện thoại rồi lau màn hình.','1037960',0,'appliance-digital-trouble',false,11,3],
  [34,'両面','りょうめん','cả hai mặt','紙の両面に、名前を書いてください。','かみのりょうめんに、なまえをかいてください。','Xin hãy viết tên lên cả hai mặt tờ giấy.','1554030',0,'appliance-digital-trouble',false,13,3],
  [34,'白黒','しろくろ','đen trắng','このプリンターは、白黒で印刷できます。','このぷりんたあは、しろくろでいんさつできます。','Máy in này có thể in trắng đen.','1475160',0,'appliance-digital-trouble',false,13,3],
  [34,'材料','ざいりょう','nguyên liệu; thành phần','料理の材料を、買い物の前に確認しました。','りょうりのざいりょうを、かいもののまえにかくにんしました。','Tôi kiểm tra nguyên liệu nấu ăn trước khi đi mua sắm.','1296670',0,'cooking-waste',false,11,3],
  [34,'調味料','ちょうみりょう','gia vị','使う調味料を、先にテーブルに並べます。','つかうちょうみりょうを、さきにてえぶるにならべます。','Tôi bày sẵn các gia vị cần dùng lên bàn.','1429290',0,'cooking-waste',false,17,2],
  [33,'小麦','こむぎ','lúa mì','このパンには、小麦が使われています。','このぱんには、こむぎがつかわれています。','Bánh mì này có sử dụng lúa mì.','1348630',0,'cooking-waste',false,11,3],
  [34,'小麦粉','こむぎこ','bột mì','小麦粉を少しずつ入れて、よく混ぜます。','こむぎこをすこしずついれて、よくまぜます。','Tôi cho bột mì vào từng chút rồi trộn đều.','1348650',0,'cooking-waste',false,11,3],
  [33,'乳製品','にゅうせいひん','sản phẩm từ sữa','乳製品が入っているか、表示を読みました。','にゅうせいひんがはいっているか、ひょうじをよみました。','Tôi đọc nhãn xem có thành phần từ sữa hay không.','1465260',0,'cooking-waste',false,11,3],
  [33,'ピーナッツ','ピーナッツ','đậu phộng; lạc','ピーナッツが入っているか、店員に聞きました。','ぴいなっつがはいっているか、てんいんにききました。','Tôi hỏi nhân viên xem món ăn có đậu phộng hay không.','1106260',0,'cooking-waste',false,11,3],
  [34,'豆腐','とうふ','đậu phụ; đậu hũ','豆腐を切って、みそ汁に入れました。','とうふをきって、みそしるにいれました。','Tôi cắt đậu phụ rồi cho vào canh miso.','1450070',0,'cooking-waste',false,3,2]
];

export const n4VocabularyBatch04=rows.map(([proposedLessonNumber,text,reading,meaning,ja,kana,vi,entryId,senseIndex,group,openJlpt,irodoriLesson,irodoriActivity])=>{
  const lessonNumber=groups[group].links.includes(proposedLessonNumber)?proposedLessonNumber:groups[group].links[0];
  return{
    lessonNumber,text,reading,meaning,group,
    type:suruNouns.has(text)?'danh từ / động từ する':verbs.has(text)?'động từ':adjectives.has(text)?'tính từ い':nounTypes.get(text)||'danh từ',
    reason:`${groups[group].reason} This word is used in the example and supports the linked lesson task.`,
    curriculum:{edition:'Minna no Nihongo Shokyu II, second edition; project functional alignment only',lessonNumber},
    role:'trọng tâm theo nhiệm vụ; chủ động nhận diện và vận dụng',
    example:{
      ja,reading:kana,vi,
      ...(audioReadingByExampleText.has(ja)?{audioReading:audioReadingByExampleText.get(ja)}:{}),
      ...(kanaOnlyAudio.has(ja)?{audioText:kana}:{} )
    },
    ...(audioReadingByWord.has(text)?{audioReading:audioReadingByWord.get(text)}:{}),
    sourceReview:{
      entryId,senseIds:[`${entryId}-s${senseIndex}`],
      status:'Project-authored Vietnamese meaning and example; selected JMdict sense; Irodori coordinate verified; OpenJLPT crosswalk recorded where present; not independently reviewed',
      batchId:'n4-vocabulary-04',
      ...(openJlpt?{openJlptJmdictId:entryId}:{}),
      irodori:{sheet:'wordlist_all',book:'初級2',lesson:irodoriLesson,activity:irodoriActivity},
      rationale:groups[group].reason
    }
  };
});

export function applyN4VocabularyBatch04(units){
  for(const item of n4VocabularyBatch04){
    const unit=units.find(candidate=>candidate.number===item.lessonNumber);
    if(!unit)throw Error(`Missing N4 lesson ${item.lessonNumber} for ${item.text}`);
    if(unit.words.some(word=>word.text===item.text&&word.reading===item.reading))throw Error(`N4 vocabulary batch duplicate ${item.text}/${item.reading}`);
    unit.words.push({...item});
  }
}
