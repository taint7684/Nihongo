const reasons={
  'time-frequency':'M04/M12: ask about dates, frequency, duration, and daily schedules.',
  'home-facilities':'M10: locate rooms, furnishings, and household equipment using existence/location language.',
  'travel-directions':'M03/M05: navigate stations, exits, transport, and public facilities.',
  'work-school-basics':'M01/M07/M11: identify study/work settings and talk about language learning.'
};
const links={
  'time-frequency':[4,5,10,11,12,24],
  'home-facilities':[10,14,15,16],
  'travel-directions':[3,5,10,13,16,23],
  'work-school-basics':[1,4,6,7,11,14,17]
};
const adverbs=new Set(['いつも','ときどき','たいてい','すぐに','はじめて','あと']);
const rows=[
[4,'あさって','あさって','ngày kia','あさって、友達に会います。','あさって、ともだちにあいます。','Ngày kia tôi gặp bạn.','1584640',0,'time-frequency'],
[12,'おととい','おととい','hôm kia','おととい、学校へ行きました。','おととい、がっこうへいきました。','Hôm kia tôi đã đi học.','1576050',0,'time-frequency'],
[12,'ゆうべ','ゆうべ','tối qua; đêm qua','ゆうべ、映画を見ました。','ゆうべ、えいがをみました。','Tối qua tôi đã xem phim.','1542640',0,'time-frequency'],
[11,'週','しゅう','tuần','週に三回、日本語を勉強します。','しゅうにさんかい、にほんごをべんきょうします。','Mỗi tuần tôi học tiếng Nhật ba lần.','1333450',0,'time-frequency'],
[12,'半年','はんとし','nửa năm; sáu tháng','日本語を半年勉強しました。','にほんごをはんとしべんきょうしました。','Tôi đã học tiếng Nhật nửa năm.','1583190',0,'time-frequency'],
[4,'いつも','いつも','luôn luôn; lúc nào cũng','いつも七時に起きます。','いつもしちじにおきます。','Tôi luôn thức dậy lúc bảy giờ.','1188890',0,'time-frequency'],
[4,'ときどき','ときどき','thỉnh thoảng','ときどきコーヒーを飲みます。','ときどきコーヒーをのみます。','Thỉnh thoảng tôi uống cà phê.','1598680',0,'time-frequency'],
[4,'たいてい','たいてい','thường; phần lớn các lần','たいてい家で昼ご飯を食べます。','たいていいえでひるごはんをたべます。','Tôi thường ăn trưa ở nhà.','1414580',0,'time-frequency'],
[4,'すぐに','すぐに','ngay lập tức','すぐに帰ります。','すぐにかえります。','Tôi sẽ về ngay.','1430620',0,'time-frequency'],
[5,'はじめて','はじめて','lần đầu tiên','日本へはじめて行きます。','にほんへはじめていきます。','Tôi lần đầu đi Nhật.','1342550',0,'time-frequency'],
[4,'そして','そして','và sau đó; rồi','朝ご飯を食べます。そして、学校へ行きます。','あさごはんをたべます。そして、がっこうへいきます。','Tôi ăn sáng. Sau đó, tôi đi học.','1006730',0,'time-frequency'],
[4,'あと','あと','còn; thêm nữa (khoảng thời gian/số lượng)','バスはあと五分で来ます。','バスはあとごふんできます。','Xe buýt sẽ đến sau năm phút nữa.','1269320',3,'time-frequency'],
[12,'夏休み','なつやすみ','kỳ nghỉ hè','夏休みに旅行します。','なつやすみにりょこうします。','Tôi đi du lịch vào kỳ nghỉ hè.','1191420',0,'time-frequency'],
[12,'連休','れんきゅう','kỳ nghỉ liên tiếp nhiều ngày','連休は家で休みます。','れんきゅうはいえでやすみます。','Trong kỳ nghỉ nhiều ngày, tôi nghỉ ở nhà.','1559380',0,'time-frequency'],
[12,'土日','どにち','thứ Bảy và Chủ nhật; cuối tuần','土日は図書館で勉強します。','どにちはとしょかんでべんきょうします。','Cuối tuần tôi học ở thư viện.','1898600',0,'time-frequency'],
[4,'日時','にちじ','ngày giờ; thời điểm cụ thể','会議の日時はいつですか。','かいぎのにちじはいつですか。','Cuộc họp diễn ra ngày giờ nào?','1464110',0,'time-frequency'],
[10,'アパート','アパート','căn hộ/chung cư kiểu thường (đối lập cách gọi với マンション)','アパートは駅の近くです。','アパートはえきのちかくです。','Căn hộ ở gần nhà ga.','1017760',1,'home-facilities'],
[15,'マンション','マンション','căn hộ/chung cư (không phải “biệt thự” theo nghĩa tiếng Anh)','マンションに住んでいます。','マンションにすんでいます。','Tôi sống trong căn hộ chung cư.','1130040',0,'home-facilities'],
[10,'寮','りょう','ký túc xá; khu nhà ở tập thể','私の寮は学校の近くです。','わたしのりょうはがっこうのちかくです。','Ký túc xá của tôi ở gần trường.','1554230',0,'home-facilities'],
[10,'一戸建て','いっこだて','nhà riêng độc lập; nhà không chung vách','家は一戸建てです。','いえはいっこだてです。','Nhà là nhà riêng độc lập.','1162320',0,'home-facilities'],
[10,'居間','いま','phòng sinh hoạt/phòng khách kiểu Nhật','居間にテーブルがあります。','いまにテーブルがあります。','Có một chiếc bàn trong phòng khách.','1231720',0,'home-facilities'],
[10,'台所','だいどころ','nhà bếp; gian bếp','台所に冷蔵庫があります。','だいどころにれいぞうこがあります。','Có tủ lạnh trong bếp.','1412640',0,'home-facilities'],
[10,'キッチン','キッチン','nhà bếp/khu bếp','キッチンにテーブルがあります。','キッチンにテーブルがあります。','Có bàn trong khu bếp.','1041150',0,'home-facilities'],
[10,'玄関','げんかん','lối vào/tiền sảnh của nhà Nhật','玄関に靴があります。','げんかんにくつがあります。','Có giày ở lối vào nhà.','1263400',0,'home-facilities'],
[10,'ベランダ','ベランダ','ban công/hiên có mái (cách dùng phổ biến)','ベランダに花があります。','ベランダにはながあります。','Có hoa ở ban công.','1119940',0,'home-facilities'],
[10,'バルコニー','バルコニー','ban công','バルコニーに椅子があります。','バルコニーにいすがあります。','Có ghế ở ban công.','1099900',0,'home-facilities'],
[10,'お風呂','おふろ','bồn/phòng tắm; việc tắm','毎晩お風呂に入ります。','まいばんおふろにはいります。','Tối nào tôi cũng tắm.','2220600',0,'home-facilities'],
[10,'入口','いりぐち','lối vào; cửa vào','入口はあそこです。','いりぐちはあそこです。','Lối vào ở đằng kia.','1582820',0,'home-facilities'],
[10,'出口','でぐち','lối ra; cửa ra','出口は右です。','でぐちはみぎです。','Lối ra ở bên phải.','1338850',0,'home-facilities'],
[10,'エアコン','エアコン','máy điều hòa không khí','部屋にエアコンがあります。','へやにエアコンがあります。','Trong phòng có máy điều hòa.','1027180',0,'home-facilities'],
[10,'冷房','れいぼう','chế độ làm mát/điều hòa mát','夏は冷房を使います。','なつはれいぼうをつかいます。','Mùa hè tôi dùng chế độ làm mát.','1557290',0,'home-facilities','なつわれえぼおおつかいます。'],
[10,'暖房','だんぼう','hệ thống/chế độ sưởi ấm','冬は暖房を使います。','ふゆはだんぼうをつかいます。','Mùa đông tôi dùng chế độ sưởi.','1419860',0,'home-facilities'],
[10,'洗濯機','せんたくき','máy giặt','洗濯機はここです。','せんたくきはここです。','Máy giặt ở đây.','1390990',0,'home-facilities'],
[10,'掃除機','そうじき','máy hút bụi','掃除機を使います。','そうじきをつかいます。','Tôi dùng máy hút bụi.','1596390',0,'home-facilities'],
[10,'炊飯器','すいはんき','nồi cơm điện','炊飯器でご飯を作ります。','すいはんきでごはんをつくります。','Tôi nấu cơm bằng nồi cơm điện.','1372360',0,'home-facilities'],
[10,'リモコン','リモコン','điều khiển từ xa','リモコンはテーブルの上です。','リモコンはテーブルのうえです。','Điều khiển ở trên bàn.','1143120',0,'home-facilities'],
[10,'コピー機','コピーき','máy photocopy/máy sao chụp','コピー機は事務室にあります。','コピーきはじむしつにあります。','Máy photocopy ở trong phòng hành chính.','2136860',0,'home-facilities'],
[10,'テーブル','テーブル','bàn (kiểu bàn có chân)','テーブルの上に本があります。','テーブルのうえにほんがあります。','Có sách trên bàn.','1078630',0,'home-facilities'],
[10,'棚','たな','kệ; giá để đồ','本は棚にあります。','ほんはたなにあります。','Sách ở trên kệ.','1416700',0,'home-facilities'],
[10,'壁','かべ','tường; vách','壁に時計があります。','かべにとけいがあります。','Có đồng hồ treo trên tường.','1509290',0,'home-facilities'],
[10,'扉','とびら','cánh cửa; cửa ra vào','扉を開けてください。','とびらをあけてください。','Xin hãy mở cửa.','1483380',0,'home-facilities'],
[10,'ふとん','ふとん','chăn/nệm kiểu futon Nhật','ふとんで寝ます。','ふとんでねます。','Tôi ngủ trên futon.','1496890',0,'home-facilities'],
[10,'温度','おんど','nhiệt độ','部屋の温度は高いです。','へやのおんどはたかいです。','Nhiệt độ trong phòng cao.','1183510',0,'home-facilities'],
[3,'駅前','えきまえ','khu vực/phía trước nhà ga','駅前にバス停があります。','えきまえにバスていがあります。','Có trạm xe buýt trước nhà ga.','1175170',0,'travel-directions'],
[5,'バス停','バスてい','trạm xe buýt','バス停は駅の前です。','バスていはえきのまえです。','Trạm xe buýt ở phía trước nhà ga.','1098580',0,'travel-directions'],
[5,'空港','くうこう','sân bay','空港へ行きます。','くうこうへいきます。','Tôi đi đến sân bay.','1245570',0,'travel-directions'],
[5,'新幹線','しんかんせん','tàu Shinkansen/tàu cao tốc Nhật','新幹線で東京へ行きます。','しんかんせんでとうきょうへいきます。','Tôi đi Tokyo bằng Shinkansen.','1361590',0,'travel-directions'],
[5,'改札','かいさつ','cổng soát vé; khu cổng soát vé','改札はどこですか。','かいさつはどこですか。','Cổng soát vé ở đâu?','1200840',1,'travel-directions'],
[5,'快速','かいそく','tàu chạy nhanh/rapid-service train','快速に乗ります。','かいそくにのります。','Tôi lên tàu nhanh.','1200080',1,'travel-directions'],
[5,'終点','しゅうてん','ga/điểm cuối của tuyến','この電車の終点は新宿です。','このでんしゃのしゅうてんはしんじゅくです。','Điểm cuối của tàu này là Shinjuku.','1332950',0,'travel-directions'],
[3,'北口','きたぐち','cửa/lối ra phía bắc','北口で会いましょう。','きたぐちであいましょう。','Hẹn gặp ở cửa phía bắc nhé.','1520970',0,'travel-directions'],
[3,'南口','みなみぐち','cửa/lối ra phía nam','南口はあちらです。','みなみぐちはあちらです。','Cửa phía nam ở đằng kia.','1460280',0,'travel-directions'],
[3,'東口','ひがしぐち','cửa/lối ra phía đông','東口に店があります。','ひがしぐちにみせがあります。','Có cửa hàng ở cửa phía đông.','1447790',0,'travel-directions'],
[3,'西口','にしぐち','cửa/lối ra phía tây','西口はどこですか。','にしぐちはどこですか。','Cửa phía tây ở đâu?','1380950',0,'travel-directions'],
[5,'上り','のぼり','tàu hướng về đầu tuyến/trung tâm tuyến','上りの電車に乗ります。','のぼりのでんしゃにのります。','Tôi lên tàu theo hướng lên tuyến.','1352510',1,'travel-directions'],
[5,'下り','くだり','tàu hướng về cuối tuyến','下りの電車は次です。','くだりのでんしゃはつぎです。','Tàu hướng xuống tuyến là chuyến kế tiếp.','1184370',0,'travel-directions'],
[3,'右側','みぎがわ','phía bên phải','右側の出口を使います。','みぎがわのでぐちをつかいます。','Tôi dùng lối ra phía bên phải.','1576400',0,'travel-directions'],
[3,'反対側','はんたいがわ','phía đối diện; bên kia','駅の反対側にバス停があります。','えきのはんたいがわにバスていがあります。','Có trạm xe buýt ở phía đối diện nhà ga.','1480720',0,'travel-directions'],
[3,'横','よこ','bên cạnh; phía cạnh (trong ngữ cảnh vị trí)','駅の横にコンビニがあります。','えきのよこにコンビニがあります。','Có cửa hàng tiện lợi bên cạnh nhà ga.','1180570',3,'travel-directions'],
[3,'奥','おく','phía trong/sâu bên trong','部屋の奥にいすがあります。','へやのおくにいすがあります。','Có ghế ở phía trong phòng.','1179320',0,'travel-directions'],
[3,'場所','ばしょ','địa điểm; nơi chốn','会う場所は駅です。','あうばしょはえきです。','Địa điểm gặp là nhà ga.','1355850',0,'travel-directions'],
[3,'広場','ひろば','quảng trường; khoảng sân rộng công cộng','広場で友達に会います。','ひろばでともだちにあいます。','Tôi gặp bạn ở quảng trường.','1278590',0,'travel-directions'],
[3,'エレベーター','エレベーター','thang máy','エレベーターで二階へ行きます。','エレベーターでにかいへいきます。','Tôi đi lên tầng hai bằng thang máy.','1030630',0,'travel-directions'],
[3,'エスカレーター','エスカレーター','thang cuốn','エスカレーターはあちらです。','エスカレーターはあちらです。','Thang cuốn ở đằng kia.','1028580',0,'travel-directions'],
[5,'駐車場','ちゅうしゃじょう','bãi đỗ xe','駐車場に車があります。','ちゅうしゃじょうにくるまがあります。','Có ô tô ở bãi đỗ xe.','1426920',0,'travel-directions'],
[5,'バイク','バイク','xe máy (không phải xe đạp trong ví dụ này)','バイクで駅へ行きます。','バイクでえきへいきます。','Tôi đi xe máy đến ga.','1097810',0,'travel-directions'],
[5,'コインロッカー','コインロッカー','tủ khóa gửi đồ trả phí','コインロッカーは駅にあります。','コインロッカーはえきにあります。','Tủ khóa gửi đồ có ở nhà ga.','1049900',0,'travel-directions'],
[3,'更衣室','こういしつ','phòng thay đồ','更衣室はどこですか。','こういしつはどこですか。','Phòng thay đồ ở đâu?','1279330',0,'travel-directions'],
[3,'待合室','まちあいしつ','phòng chờ','待合室で待ちます。','まちあいしつでまちます。','Tôi đợi ở phòng chờ.','1410630',0,'travel-directions'],
[3,'どれ','どれ','cái nào (chọn trong từ ba vật trở lên)','この中で、どれが私の本ですか。','このなかで、どれがわたしのほんですか。','Trong số này, quyển nào là sách của tôi?','1009290',0,'travel-directions'],
[1,'クラス','クラス','lớp học; nhóm học sinh trong một lớp','私のクラスは二十人です。','わたしのクラスはにじゅうにんです。','Lớp tôi có hai mươi người.','1044070',0,'work-school-basics'],
[1,'高校','こうこう','trường trung học phổ thông; bậc THPT','高校は駅の近くです。','こうこうはえきのちかくです。','Trường THPT ở gần nhà ga.','1283500',0,'work-school-basics'],
[1,'小学校','しょうがっこう','trường tiểu học','小学校はあそこです。','しょうがっこうはあそこです。','Trường tiểu học ở đằng kia.','1347870',0,'work-school-basics'],
[1,'中学校','ちゅうがっこう','trường trung học cơ sở','中学校へ行きます。','ちゅうがっこうへいきます。','Tôi đi đến trường trung học cơ sở.','1423650',0,'work-school-basics'],
[11,'事務室','じむしつ','phòng hành chính/văn phòng','事務室は三階です。','じむしつはさんがいです。','Phòng hành chính ở tầng ba.','1314380',0,'work-school-basics'],
[11,'工場','こうじょう','nhà máy; xưởng sản xuất','工場は町の外です。','こうじょうはまちのそとです。','Nhà máy ở ngoài thị trấn.','1578700',0,'work-school-basics'],
[11,'体育館','たいいくかん','nhà thi đấu; phòng tập thể dục lớn','体育館でバスケットボールをします。','たいいくかんでバスケットボールをします。','Tôi chơi bóng rổ trong nhà thi đấu.','1409230',0,'work-school-basics'],
[11,'公民館','こうみんかん','nhà sinh hoạt cộng đồng/hội trường công cộng','公民館はどこですか。','こうみんかんはどこですか。','Nhà sinh hoạt cộng đồng ở đâu?','1274780',0,'work-school-basics'],
[7,'発音','はつおん','cách phát âm; phát âm','日本語の発音を練習します。','にほんごのはつおんをれんしゅうします。','Tôi luyện phát âm tiếng Nhật.','1477170',0,'work-school-basics'],
[7,'文法','ぶんぽう','ngữ pháp','文法を勉強します。','ぶんぽうをべんきょうします。','Tôi học ngữ pháp.','1505600',0,'work-school-basics']
];

export const n5VocabularyBatch02=rows.map(([lessonNumber,text,reading,meaning,ja,kana,vi,entryId,senseIndex,group,audioKana])=>({
  lessonNumber,text,reading,meaning,
  type:text==='そして'?'liên từ':adverbs.has(text)?'trạng từ':'danh từ',
  group,
  reason:`${reasons[group]} The item supports the specific everyday action in its example.`,
  curriculum:{edition:'Minna no Nihongo Shokyu I, second edition; project functional alignment only',lessonNumber},
  role:'trọng tâm theo nhiệm vụ; chủ động nhận diện và vận dụng',
  example:{ja,reading:kana,...(audioKana?{audioReading:audioKana}:{}),vi},
  sourceReview:{
    entryId,
    senseIds:[`${entryId}-s${senseIndex}`],
    status:'Vietnamese meaning authored in context; JMdict sense selected; not independently reviewed',
    batchId:'n5-vocabulary-02',
    rationale:reasons[group]
  }
}));

export function applyN5VocabularyBatch02(units){
  for(const item of n5VocabularyBatch02){
    const unit=units.find(candidate=>candidate.number===item.lessonNumber);
    if(!unit)throw Error(`Missing N5 lesson ${item.lessonNumber} for ${item.text}`);
    if(unit.words.some(word=>word.text===item.text&&word.reading===item.reading))throw Error(`Vocabulary batch duplicate ${item.text}/${item.reading}`);
    if(!links[item.group]?.includes(item.lessonNumber))throw Error(`Lesson ${item.lessonNumber} is outside ${item.group} functional links`);
    unit.words.push({...item});
  }
}
