const reasons={
  'identity-contact':'M01-M03: identify people and exchange personal/contact information.',
  'food-orders':'M06/M08: name food and drink, state preferences and describe taste/temperature.',
  'shopping-payment':'M03/M11/M16: locate goods, ask about price, and choose everyday items or clothing.',
  'time-frequency':'M04/M11/M12: state time, schedule, weekday, and seasonal frequency.'
};

const rows=[
[1,'住所','じゅうしょ','địa chỉ','danh từ','住所を書きます。','じゅうしょをかきます。','Tôi ghi địa chỉ.','1334080',0,'identity-contact'],
[1,'国籍','こくせき','quốc tịch','danh từ','国籍はベトナムです。','こくせきはべとなむです。','Quốc tịch là Việt Nam.','1286780',0,'identity-contact'],
[1,'生年月日','せいねんがっぴ','ngày tháng năm sinh','danh từ','生年月日は五月一日です。','せいねんがっぴはごがつついたちです。','Ngày sinh là ngày 1 tháng 5.','1379410',0,'identity-contact'],
[1,'氏名','しめい','họ tên (mục ghi trên biểu mẫu)','danh từ','氏名をここに書きます。','しめいをここにかきます。','Tôi ghi họ tên ở đây.','1311060',0,'identity-contact'],
[1,'性別','せいべつ','giới tính','danh từ','性別を聞きます。','せいべつをききます。','Tôi hỏi giới tính.','1375520',0,'identity-contact'],
[1,'フリガナ','ふりがな','cách ghi cách đọc bằng kana trên biểu mẫu (thường là katakana)','danh từ','名前のフリガナを書きます。','なまえのふりがなをかきます。','Tôi ghi cách đọc kana của tên.','1361150',0,'identity-contact'],
[1,'メール','メール','thư điện tử; email','danh từ','メールはミンさんからです。','めーるはみんさんからです。','Email là từ bạn Minh gửi.','1132620',0,'identity-contact'],
[1,'連絡先','れんらくさき','thông tin liên lạc','danh từ','連絡先を教えてください。','れんらくさきをおしえてください。','Xin cho tôi thông tin liên lạc.','1559930',0,'identity-contact'],
[2,'文字','もじ','chữ/ký tự','danh từ','この文字を読んでください。','このもじをよんでください。','Hãy đọc chữ này.','1505390',0,'identity-contact'],
[1,'会話','かいわ','cuộc trò chuyện; hội thoại','danh từ','日本語で会話をします。','にほんごでかいわをします。','Tôi trò chuyện bằng tiếng Nhật.','1198880',0,'identity-contact'],
[3,'数字','すうじ','chữ số; ký số','danh từ','電話番号の数字を読みます。','でんわばんごうのすうじをよみます。','Tôi đọc các chữ số trong số điện thoại.','1373060',0,'identity-contact'],
[3,'何回','なんかい','mấy lần; bao nhiêu lần','từ hỏi số lần','何回読みましたか。','なんかいよみましたか。','Bạn đã đọc mấy lần?','1188650',0,'identity-contact'],
[1,'私たち','わたしたち','chúng tôi/chúng ta; tùy ngữ cảnh','đại từ','私たちは学生です。','わたしたちはがくせいです。','Chúng tôi là học sinh/sinh viên.','1311300',0,'identity-contact'],
[1,'相手','あいて','người đối thoại; người ở phía bên kia','danh từ','会話の相手はミンさんです。','かいわのあいてはみんさんです。','Người trò chuyện cùng là Minh.','1401000',1,'identity-contact'],
[1,'みなさん','みなさん','mọi người; các bạn','danh từ','みなさん、こんにちは。','みなさん、こんにちは。','Chào mọi người.','1202170',0,'identity-contact'],
[1,'お父さん','おとうさん','bố/cha của người khác; cách gọi lịch sự','danh từ','お父さんは会社員ですか。','おとうさんはかいしゃいんですか。','Bố bạn là nhân viên công ty phải không?','1002590',0,'identity-contact'],
[1,'お母さん','おかあさん','mẹ của người khác; cách gọi lịch sự','danh từ','お母さんは先生ですか。','おかあさんはせんせいですか。','Mẹ bạn là giáo viên phải không?','1002650',0,'identity-contact'],
[1,'お兄さん','おにいさん','anh trai của người khác; cách gọi lịch sự','danh từ','お兄さんは学生ですか。','おにいさんはがくせいですか。','Anh bạn là học sinh/sinh viên phải không?','1001830',0,'identity-contact'],
[1,'お姉さん','おねえさん','chị gái của người khác; cách gọi lịch sự','danh từ','お姉さんは学生ですか。','おねえさんはがくせいですか。','Chị bạn là học sinh/sinh viên phải không?','1001990',0,'identity-contact'],
[1,'おじいさん','おじいさん','ông của người khác; cách gọi lịch sự','danh từ','おじいさんは日本人ですか。','おじいさんはにほんじんですか。','Ông bạn là người Nhật phải không?','1002320',0,'identity-contact'],
[1,'恋人','こいびと','người yêu; bạn đời tình cảm','danh từ','恋人と映画を見ます。','こいびととえいがをみます。','Tôi xem phim cùng người yêu.','1558920',0,'identity-contact'],
[6,'食べ物','たべもの','thức ăn; đồ ăn','danh từ','好きな食べ物を教えてください。','すきなたべものをおしえてください。','Hãy cho biết món ăn bạn thích.','1358340',0,'food-orders'],
[6,'飲み物','のみもの','đồ uống','danh từ','飲み物はお茶です。','のみものはおちゃです。','Đồ uống là trà.','1600430',0,'food-orders'],
[6,'紅茶','こうちゃ','trà đen/trà pha kiểu phương Tây','danh từ','朝、紅茶を飲みます。','あさ、こうちゃをのみます。','Buổi sáng tôi uống trà đen.','1280770',0,'food-orders'],
[6,'コーラ','コーラ','nước cola','danh từ','コーラを飲みます。','こーらをのみます。','Tôi uống cola.','1049330',0,'food-orders'],
[6,'ミルク','ミルク','sữa','danh từ','ミルクを飲みます。','みるくをのみます。','Tôi uống sữa.','1131990',0,'food-orders'],
[6,'アイスクリーム','アイスクリーム','kem','danh từ','アイスクリームが好きです。','あいすくりーむがすきです。','Tôi thích kem.','1013980',0,'food-orders'],
[6,'アイスコーヒー','アイスコーヒー','cà phê đá/cà phê lạnh','danh từ','アイスコーヒーを飲みます。','あいすこーひーをのみます。','Tôi uống cà phê đá.','1610760',0,'food-orders'],
[6,'ヨーグルト','ヨーグルト','sữa chua','danh từ','朝ご飯にヨーグルトを食べます。','あさごはんにヨーグルトをたべます。','Tôi ăn sữa chua vào bữa sáng.','1137520',0,'food-orders'],
[6,'スープ','スープ','súp','danh từ','スープを飲みます。','すーぷをのみます。','Tôi ăn/uống súp.','1067040',0,'food-orders'],
[6,'ラーメン','ラーメン','mì ramen','danh từ','昼ご飯はラーメンです。','ひるごはんはラーメンです。','Bữa trưa là mì ramen.','1137720',0,'food-orders'],
[6,'うどん','うどん','mì udon','danh từ','うどんを食べます。','うどんをたべます。','Tôi ăn mì udon.','1574470',0,'food-orders'],
[6,'そば','そば','mì soba từ kiều mạch','danh từ','そばを食べます。','そばをたべます。','Tôi ăn mì soba.','1238460',1,'food-orders'],
[6,'カレー','カレー','cà ri','danh từ','カレーを食べます。','カレーをたべます。','Tôi ăn cà ri.','1039140',0,'food-orders'],
[6,'おにぎり','おにぎり','cơm nắm Nhật','danh từ','おにぎりを一つ買います。','おにぎりをひとつかいます。','Tôi mua một nắm cơm.','1001620',0,'food-orders'],
[6,'お菓子','おかし','bánh kẹo; đồ ăn vặt','danh từ','私はお菓子を買います。','わたしはおかしをかいます。','Tôi mua đồ ăn vặt.','1001710',0,'food-orders'],
[6,'チョコレート','チョコレート','sô-cô-la','danh từ','チョコレートを一つください。','チョコレートをひとつください。','Cho tôi một miếng sô-cô-la.','1078270',0,'food-orders'],
[6,'バナナ','バナナ','chuối','danh từ','バナナを二本買います。','バナナをにほんかいます。','Tôi mua hai quả chuối.','1099420',0,'food-orders'],
[6,'みかん','みかん','quýt Nhật','danh từ','みかんを三つ買います。','みかんをみっつかいます。','Tôi mua ba quả quýt.','1528410',0,'food-orders'],
[6,'ぶどう','ぶどう','nho','danh từ','ぶどうを食べます。','ぶどうをたべます。','Tôi ăn nho.','1499230',0,'food-orders'],
[6,'塩','しお','muối','danh từ','塩を使います。','しおをつかいます。','Tôi dùng muối.','1576630',0,'food-orders'],
[8,'すっぱい','すっぱい','chua (vị)','tính từ い','このみかんはすっぱいです。','このみかんはすっぱいです。','Quả quýt này chua.','1304280',0,'food-orders'],
[8,'苦い','にがい','đắng','tính từ い','このコーヒーは苦いです。','このコーヒーはにがいです。','Cà phê này đắng.','1244310',0,'food-orders'],
[8,'ぬるい','ぬるい','âm ấm; không đủ nóng/lạnh tùy ngữ cảnh','tính từ い','このお茶はぬるいです。','このおちゃはぬるいです。','Trà này âm ấm.','1183300',0,'food-orders'],
[6,'コップ','コップ','cốc/ly uống nước','danh từ','水はコップにあります。','みずはコップにあります。','Nước ở trong cốc.','1050390',0,'food-orders'],
[6,'カップ','カップ','cốc/tách; vật đựng dạng cup','danh từ','カップでコーヒーを飲みます。','カップでコーヒーをのみます。','Tôi uống cà phê bằng tách.','1037670',0,'food-orders'],
[8,'もっと','もっと','thêm nữa; hơn nữa','trạng từ','水をもっとください。','みずをもっとください。','Cho tôi thêm nước.','1012620',0,'food-orders'],
[3,'コンビニ','コンビニ','cửa hàng tiện lợi','danh từ','コンビニで水を買います。','コンビニでみずをかいます。','Tôi mua nước ở cửa hàng tiện lợi.','1053280',0,'shopping-payment'],
[3,'商店街','しょうてんがい','phố/khu phố có nhiều cửa hàng','danh từ','商店街に店があります。','しょうてんがいにみせがあります。','Có cửa hàng trong khu phố mua sắm.','1347190',0,'shopping-payment'],
[11,'商品','しょうひん','hàng hóa; sản phẩm bày bán','danh từ','その商品は三百円です。','そのしょうひんはさんびゃくえんです。','Món hàng đó giá 300 yên.','1347310',0,'shopping-payment'],
[11,'食品','しょくひん','thực phẩm; mặt hàng thực phẩm','danh từ','食品の売り場はどこですか。','しょくひんのうりばはどこですか。','Quầy thực phẩm ở đâu?','1358600',0,'shopping-payment'],
[16,'サイズ','サイズ','kích cỡ','danh từ','このサイズは小さいです。','このサイズはちいさいです。','Cỡ này nhỏ.','1055780',0,'shopping-payment'],
[3,'料金','りょうきん','phí; cước; giá dịch vụ','danh từ','料金はいくらですか。','りょうきんはいくらですか。','Phí là bao nhiêu?','1554280',0,'shopping-payment'],
[11,'半額','はんがく','nửa giá; giảm còn một nửa giá','danh từ','このケーキは半額です。','このケーキははんがくです。','Cái bánh này giảm còn nửa giá.','1479050',0,'shopping-payment'],
[11,'袋','ふくろ','túi; bao','danh từ','袋を一つください。','ふくろをひとつください。','Cho tôi một cái túi.','1411070',0,'shopping-payment'],
[11,'レジ','レジ','quầy/máy tính tiền','danh từ','レジはあちらです。','レジはあちらです。','Quầy tính tiền ở đằng kia.','1145130',0,'shopping-payment'],
[11,'レシート','レシート','hóa đơn/biên lai mua hàng','danh từ','レシートをください。','レシートをください。','Cho tôi xin hóa đơn.','1145060',0,'shopping-payment'],
[11,'店員','てんいん','nhân viên cửa hàng','danh từ','店員に料金を聞きます。','てんいんにりょうきんをききます。','Tôi hỏi nhân viên cửa hàng về phí.','1440670',0,'shopping-payment'],
[11,'コーナー','コーナー','khu/quầy hàng; góc trưng bày','danh từ','本のコーナーは二階です。','ほんのコーナーはにかいです。','Khu sách ở tầng hai.','1049110',2,'shopping-payment'],
[11,'カウンター','カウンター','quầy phục vụ ở quán/cửa hàng','danh từ','カウンターでコーヒーを飲みます。','カウンターでコーヒーをのみます。','Tôi uống cà phê ở quầy.','1036930',2,'shopping-payment'],
[11,'電池','でんち','pin; pin điện','danh từ','このカメラに電池を入れます。','このカメラにでんちをいれます。','Tôi lắp pin vào máy ảnh này.','1443620',0,'shopping-payment'],
[16,'服装','ふくそう','trang phục; cách ăn mặc','danh từ','この服装は夏にいいです。','このふくそうはなつにいいです。','Trang phục này hợp với mùa hè.','1500970',0,'shopping-payment'],
[2,'バッグ','バッグ','túi xách','danh từ','バッグはここです。','バッグはここです。','Túi xách ở đây.','1099100',0,'shopping-payment'],
[16,'帽子','ぼうし','mũ; nón','danh từ','白い帽子はこれです。','しろいぼうしはこれです。','Chiếc mũ trắng là cái này.','1519170',0,'shopping-payment'],
[16,'パンツ','パンツ','quần dài (nghĩa trong ngữ cảnh mua quần áo)','danh từ','黒いパンツを買います。','くろいパンツをかいます。','Tôi mua quần dài màu đen.','1103270',1,'shopping-payment'],
[16,'ジャケット','ジャケット','áo khoác ngắn/jacket','danh từ','ジャケットは黒です。','ジャケットはくろです。','Áo jacket màu đen.','1065170',0,'shopping-payment'],
[16,'コート','コート','áo khoác ngoài; coat','danh từ','今日は寒いです。コートを着ます。','きょうはさむいです。コートをきます。','Hôm nay trời lạnh. Tôi mặc áo khoác.','1049000',0,'shopping-payment'],
[11,'タオル','タオル','khăn tắm/khăn lau','danh từ','タオルはかばんの中です。','タオルはかばんのなかです。','Khăn ở trong túi.','1076170',0,'shopping-payment'],
[11,'歯ブラシ','はブラシ','bàn chải đánh răng','danh từ','歯ブラシはどこですか。','はブラシはどこですか。','Bàn chải đánh răng ở đâu?','1313070',0,'shopping-payment'],
[11,'シャンプー','シャンプー','dầu gội','danh từ','シャンプーを買います。','シャンプーをかいます。','Tôi mua dầu gội.','1061930',0,'shopping-payment'],
[11,'石けん','せっけん','xà phòng','danh từ','石けんを使います。','せっけんをつかいます。','Tôi dùng xà phòng.','1382590',0,'shopping-payment'],
[11,'トイレットペーパー','トイレットペーパー','giấy vệ sinh','danh từ','トイレットペーパーはどこですか。','トイレットペーパーはどこですか。','Giấy vệ sinh ở đâu?','1084870',0,'shopping-payment'],
[11,'カレンダー','カレンダー','lịch (tờ/quyển lịch)','danh từ','カレンダーで曜日を見ます。','カレンダーでようびをみます。','Tôi xem thứ trong tuần trên lịch.','1039220',0,'shopping-payment'],
[4,'一日中','いちにちじゅう','suốt cả ngày','trạng từ thời gian','日曜日は一日中ここにいます。','にちようびはいちにちじゅうここにいます。','Chủ nhật tôi ở đây suốt cả ngày.','1165500',0,'time-frequency'],
[12,'一年中','いちねんじゅう','suốt cả năm; quanh năm','trạng từ thời gian','一年中、日本語を勉強します。','いちねんじゅう、にほんごをべんきょうします。','Tôi học tiếng Nhật quanh năm.','1165600',0,'time-frequency'],
[4,'今晩','こんばん','tối nay','danh từ/trạng từ thời gian','今晩、友達と電話します。','こんばん、ともだちとでんわします。','Tối nay tôi gọi điện với bạn.','1289470',0,'time-frequency'],
[4,'夕方','ゆうがた','buổi chiều muộn; chập tối','danh từ thời gian','夕方、家に帰ります。','ゆうがた、いえにかえります。','Chiều muộn tôi về nhà.','1542790',0,'time-frequency'],
[4,'夜中','よなか','giữa đêm; đêm khuya','danh từ thời gian','夜中は静かです。','よなかはしずかです。','Đêm khuya thì yên tĩnh.','1536930',0,'time-frequency'],
[11,'昼休み','ひるやすみ','giờ nghỉ trưa','danh từ thời gian','昼休みに友達とご飯を食べます。','ひるやすみにともだちとごはんをたべます。','Tôi ăn cùng bạn vào giờ nghỉ trưa.','1426290',0,'time-frequency'],
[4,'曜日','ようび','thứ trong tuần','danh từ thời gian','何曜日に学校へ行きますか。','なんようびにがっこうへいきますか。','Bạn đi học vào thứ mấy?','1545770',0,'time-frequency']
];

export const n5VocabularyBatch01=rows.map(([lessonNumber,text,reading,meaning,type,ja,kana,vi,entryId,senseIndex,group])=>({
  lessonNumber,text,reading,meaning,type,group,
  reason:`${reasons[group]} The item is needed for this lesson's named everyday task.`,
  curriculum:{edition:'Minna no Nihongo Shokyu I, second edition; project functional alignment only',lessonNumber},
  role:'trọng tâm theo nhiệm vụ; chủ động nhận diện và vận dụng',
  example:{ja,reading:kana,vi},
  sourceReview:{
    entryId,
    senseIds:[`${entryId}-s${senseIndex}`],
    status:'Vietnamese meaning authored in context; JMdict sense selected; not independently reviewed',
    batchId:'n5-vocabulary-01',
    rationale:text==='相手'
      ?'Use the “other party / addressee” sense for the M01 dialogue role; Irodori lists spouse in a separate context, so do not generalize that gloss.'
      :reasons[group]
  }
}));

export function applyN5VocabularyBatch01(units){
  for(const item of n5VocabularyBatch01){
    const unit=units.find(candidate=>candidate.number===item.lessonNumber);
    if(!unit)throw Error(`Missing N5 lesson ${item.lessonNumber} for ${item.text}`);
    const exists=unit.words.some(word=>word.text===item.text&&word.reading===item.reading);
    if(exists)throw Error(`Vocabulary batch duplicate ${item.text}/${item.reading} in lesson ${item.lessonNumber}`);
    const groupLinks={
      'identity-contact':[1,2,3],
      'food-orders':[6,8,9,12,13],
      'shopping-payment':[2,3,10,11,12,16],
      'time-frequency':[4,5,10,11,12,24]
    }[item.group];
    if(!groupLinks?.includes(item.lessonNumber))throw Error(`Lesson ${item.lessonNumber} is outside ${item.group} functional links`);
    unit.words.push({...item});
  }
}
