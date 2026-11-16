const groups={
  "travel-culture-reading": {
    "links": [
      27,
      30,
      32,
      35,
      38,
      40,
      42,
      43,
      45
    ],
    "reason": "Understand short descriptions of places, local events, travel and visible features."
  },
  "work-study-development": {
    "links": [
      28,
      30,
      33,
      34,
      40,
      41,
      42,
      46,
      49
    ],
    "reason": "Read a workplace or school notice, explain a task, share information and coordinate with people."
  },
  "social-relationships": {
    "links": [
      29,
      30,
      31,
      39,
      44,
      45,
      46,
      47
    ],
    "reason": "Describe relationships and events, react to others, and make or respond to invitations and requests."
  },
  "cooking-waste": {
    "links": [
      33,
      34,
      38,
      39,
      42
    ],
    "reason": "Read food labels, prepare a simple meal, clean up and separate household waste."
  },
  "transport-stay": {
    "links": [
      27,
      29,
      31,
      33,
      35,
      38,
      41,
      42
    ],
    "reason": "Read travel signs and announcements, handle tickets and lodging, and ask for help with belongings."
  },
  "shopping-service-contract": {
    "links": [
      29,
      31,
      33,
      34,
      35,
      42,
      45
    ],
    "reason": "Compare prices and service terms, arrange delivery or returns, and understand payment and food-date labels."
  },
  "appliance-digital-trouble": {
    "links": [
      29,
      30,
      33,
      34,
      38,
      40,
      44,
      46
    ],
    "reason": "Understand device instructions and report connection, power, condition, and operation problems."
  },
  "discourse-reading": {
    "links": [
      26,
      31,
      33,
      34,
      35,
      42,
      48,
      49
    ],
    "reason": "Follow reasons, sequence, timing, alternatives and degree in short connected speech and notices."
  }
};

const verbs=new Set([]);
const suruNouns=new Set([]);
const adjectives=new Set([]);
const adverbs=new Set([]);
const typeOverrides=new Map([
  ['突き','danh từ'],
  ['付き','danh từ / định ngữ の'],
  ['他人','danh từ'],
  ['行き','danh từ'],
  ['荒れ','danh từ'],
  ['渡し','danh từ'],
  ['振り仮名','danh từ'],
  ['皆さん','danh từ'],
  ['お祖父さん','danh từ'],
  ['勿論','trạng từ'],
  ['是非','trạng từ'],
  ['それでは','liên từ'],
  ['違う','động từ'],
  ['靴下','danh từ'],
  ['幾ら','từ hỏi'],
  ['そこ','từ chỉ nơi'],
  ['あそこ','từ chỉ nơi'],
]);

const rows=[
  [27, '突き', 'つき', 'đâm; chọc', '突きはđâmです。', 'つき', 'Cái/Một đâm.', '1456590', 0, 'travel-culture-reading', [], '初級2', 10, 1, 0],
  [30, '付き', 'つき', 'có kèm; đi kèm', '付きはcó kèmです。', 'つき', 'Cái/Một có kèm.', '1583630', 0, 'work-study-development', [], '初級2', 11, 2, 1],
  [31, '往ぬ', 'いぬ', 'về nhà; đi về', '往ぬはvề nhàです。', 'いぬ', 'Cái/Một về nhà.', '2146060', 0, 'social-relationships', [], '初級2', 12, 3, 2],
  [39, '寝ぬ', 'いぬ', 'ngủ', '寝ぬはngủです。', 'いぬ', 'Cái/Một ngủ.', '2863156', 0, 'cooking-waste', [], '初級2', 13, 4, 0],
  [35, '匪徒', 'ひと', 'cướp;Strong盗賊', '匪徒はcướpです。', 'ひと', 'Cái/Một cướp.', '1482640', 0, 'transport-stay', [], '初級2', 14, 5, 1],
  [42, '他人', 'たにん', 'người khác; người lạ', '他人はngười khácです。', 'たにん', 'Cái/Một người khác.', '1581400', 0, 'shopping-service-contract', [], '初級2', 15, 1, 2],
  [44, '非と', 'ひと', 'từ trong ngữ cảnh N4', '非とはtừ trong ngữ cảnh N4です。', 'ひと', 'Cái/Một từ trong ngữ cảnh N4.', '1617160', 0, 'appliance-digital-trouble', [], '初級2', 16, 2, 0],
  [49, '費途', 'ひと', 'cách dùng; chi tiêu', '費途はcách dùngです。', 'ひと', 'Cái/Một cách dùng.', '1689490', 0, 'discourse-reading', [], '初級2', 17, 3, 1],
  [45, '生み', 'うみ', 'sinh ra; sự sinh', '生みはsinh raです。', 'うみ', 'Cái/Một sinh ra.', '1854850', 0, 'travel-culture-reading', [], '初級2', 18, 4, 2],
  [28, '行き', 'いき', 'hành trình đi; chiều đi', '行きはhành trình điです。', 'いき', 'Cái/Một hành trình đi.', '1578790', 0, 'work-study-development', [], '初級2', 19, 5, 0],
  [31, '和邇', 'わに', 'từ trong ngữ cảnh N4', '和邇はtừ trong ngữ cảnh N4です。', 'わに', 'Cái/Một từ trong ngữ cảnh N4.', '5718277', 0, 'social-relationships', [], '初級2', 10, 1, 1],
  [34, '伊太利', 'イタリア', 'từ trong ngữ cảnh N4', '伊太利はtừ trong ngữ cảnh N4です。', 'イタリア', 'Cái/Một từ trong ngữ cảnh N4.', '1021360', 0, 'cooking-waste', [], '初級2', 11, 2, 2],
  [35, '歌妓', 'かぎ', 'người phụ nữ giải trí', '歌妓はngười phụ nữ giải tríです。', 'かぎ', 'Cái/Một người phụ nữ giải trí.', '2565420', 0, 'transport-stay', [], '初級2', 12, 3, 0],
  [45, '下議', 'かぎ', 'cách dùng; chi tiêu', '下議はcách dùngです。', 'かぎ', 'Cái/Một cách dùng.', '2842817', 0, 'shopping-service-contract', [], '初級2', 13, 4, 1],
  [44, '科技', 'かぎ', 'công nghệ; khoa học', '科技はcông nghệです。', 'かぎ', 'Cái/Một công nghệ.', '2862748', 0, 'appliance-digital-trouble', [], '初級2', 14, 5, 2],
  [49, '針孔', 'みず', 'tâm kim; lỗ kim', '針孔はtâm kimです。', 'みず', 'Cái/Một tâm kim.', '2854165', 0, 'discourse-reading', [], '初級2', 15, 1, 0],
  [43, '捨身', 'しゃしん', 'từ bỏ俗GIẢI; xuất gia', '捨身はtừ bỏ俗GIẢIです。', 'しゃしん', 'Cái/Một từ bỏ俗GIẢI.', '1655080', 0, 'travel-culture-reading', [], '初級2', 16, 2, 1],
  [49, '楽校', 'がっこう', 'trường học', '楽校はtrường họcです。', 'がっこう', 'Cái/Một trường học.', '2850879', 0, 'work-study-development', [], '初級2', 17, 3, 2],
  [31, '二本', 'にほん', 'hai (cái dài nguyên trụi)', '二本はhai (cái dài nguyên trụi)です。', 'にほん', 'Cái/Một hai (cái dài nguyên trụi).', '2005520', 0, 'social-relationships', [], '初級2', 18, 4, 0],
  [42, '此れ', 'これ', 'cái này', '此れはcái nàyです。', 'これ', 'Cái/Một cái này.', '1628530', 0, 'cooking-waste', ['N5'], '初級2', 19, 5, 1],
  [35, '其れ', 'それ', 'cái đó', '其れはcái đóです。', 'それ', 'Cái/Một cái đó.', '1006970', 0, 'transport-stay', ['N5'], '初級2', 10, 1, 2],
  [29, '荒れ', 'あれ', 'bão tố; thời tiết xấu', '荒れはbão tốです。', 'あれ', 'Cái/Một bão tố.', '1857320', 0, 'shopping-service-contract', [], '初級2', 11, 2, 0],
  [44, '渡し', 'わたし', 'chuyến Phà; ngang sông', '渡しはchuyến Phàです。', 'わたし', 'Cái/Một chuyến Phà.', '1855000', 0, 'appliance-digital-trouble', [], '初級2', 12, 3, 1],
  [49, '２０歳', 'はたち', '20 tuổi', '２０歳は20 tuổiです。', 'はたち', 'Cái/Một 20 tuổi.', '1600790', 0, 'discourse-reading', ['N5'], '初級2', 13, 4, 2],
  [42, '越南', 'えつなん', 'từ trong ngữ cảnh N4', '越南はtừ trong ngữ cảnh N4です。', 'えつなん', 'Cái/Một từ trong ngữ cảnh N4.', '1119720', 0, 'travel-culture-reading', [], '初級2', 14, 5, 0],
  [46, '振り仮名', 'ふりがな', 'furigana; chú giải đọc', '振り仮名はfuriganaです。', 'ふりがな', 'Cái/Một furigana.', '1361150', 0, 'work-study-development', [], '初級2', 15, 1, 1],
  [31, '皆さん', 'みなさん', 'mọi người; tất cả mọi người', '皆さんはmọi ngườiです。', 'みなさん', 'Cái/Một mọi người.', '1202170', 0, 'social-relationships', ['N5'], '初級2', 16, 2, 2],
  [38, 'お祖父さん', 'おじいさん', 'ông nội; ông ngoại', 'お祖父さんはông nộiです。', 'おじいさん', 'Cái/Một ông nội.', '1002320', 0, 'cooking-waste', ['N5'], '初級2', 17, 3, 0],
  [35, '今日は', 'こんにちは', 'chào buổi trưa', '今日ははchào buổi trưaです。', 'こんにちは', 'Cái/Một chào buổi trưa.', '1289400', 0, 'transport-stay', ['N5'], '初級2', 18, 4, 1],
  [31, '今晩は', 'こんばんは', 'chào buổi tối', '今晩ははchào buổi tốiです。', 'こんばんは', 'Cái/Một chào buổi tối.', '1289480', 0, 'shopping-service-contract', ['N5'], '初級2', 19, 5, 2],
  [44, '済みません', 'すみません', 'cách dùng; chi tiêu', '済みませんはcách dùngです。', 'すみません', 'Cái/Một cách dùng.', '1295060', 0, 'appliance-digital-trouble', ['N5'], '初級2', 10, 1, 0],
  [49, '失礼', 'しつれい', 'läßi sự; thiếu lễ', '失礼はläßi sựです。', 'しつれい', 'Cái/Một läßi sự.', '1320230', 0, 'discourse-reading', [], '初級2', 11, 2, 1],
  [40, '御免', 'ごめん', 'cách dùng; chi tiêu', '御免はcách dùngです。', 'ごめん', 'Cái/Một cách dùng.', '1270670', 0, 'travel-culture-reading', [], '初級2', 12, 3, 2],
  [42, 'どう言う', 'どういう', 'từ trong ngữ cảnh N4', 'どう言うはtừ trong ngữ cảnh N4です。', 'どういう', 'Cái/Một từ trong ngữ cảnh N4.', '1008920', 0, 'work-study-development', [], '初級2', 13, 4, 0],
  [31, '成る程', 'なるほど', 'cái đó', '成る程はcái đóです。', 'なるほど', 'Cái/Một cái đó.', '1375820', 0, 'social-relationships', ['N4'], '初級2', 14, 5, 1],
  [33, '欠航', 'けっこう', 'hủy; hủy bỏ', '欠航はhủyです。', 'けっこう', 'Cái/Một hủy.', '1253980', 0, 'cooking-waste', [], '初級2', 15, 1, 2],
  [35, '決行', 'けっこう', 'từ trong ngữ cảnh N4', '決行はtừ trong ngữ cảnh N4です。', 'けっこう', 'Cái/Một từ trong ngữ cảnh N4.', '1254250', 0, 'transport-stay', [], '初級2', 16, 2, 0],
  [33, '結構', 'けっこう', 'tuyệt vời; tốt', '結構はtuyệt vờiです。', 'けっこう', 'Cái/Một tuyệt vời.', '1254760', 0, 'shopping-service-contract', ['N5'], '初級2', 17, 3, 1],
  [44, '血行', 'けっこう', 'luồng máu; tuần hoàn', '血行はluồng máuです。', 'けっこう', 'Cái/Một luồng máu.', '1255230', 0, 'appliance-digital-trouble', [], '初級2', 18, 4, 2],
  [49, '欠講', 'けっこう', 'hủy; hủy bỏ', '欠講はhủyです。', 'けっこう', 'Cái/Một hủy.', '1833980', 0, 'discourse-reading', [], '初級2', 19, 5, 0],
  [38, '頡頏', 'けっこう', 'từ trong ngữ cảnh N4', '頡頏はtừ trong ngữ cảnh N4です。', 'けっこう', 'Cái/Một từ trong ngữ cảnh N4.', '2856206', 0, 'travel-culture-reading', [], '初級2', 10, 1, 1],
  [41, '勿論', 'もちろん', 'chắc chắn; đương nhiên', '勿論はchắc chắnです。', 'もちろん', 'Cái/Một chắc chắn.', '1535780', 0, 'work-study-development', ['N4'], '初級2', 11, 2, 2],
  [31, '是非', 'ぜひ', 'chắc chắn; đương nhiên', '是非はchắc chắnです。', 'ぜひ', 'Cái/Một chắc chắn.', '1374530', 0, 'social-relationships', ['N4'], '初級2', 12, 3, 0],
  [39, '其れでは', 'それでは', 'từ trong ngữ cảnh N4', '其れでははtừ trong ngữ cảnh N4です。', 'それでは', 'Cái/Một từ trong ngữ cảnh N4.', '1406050', 0, 'cooking-waste', ['N5'], '初級2', 13, 4, 1],
  [35, '下番', 'かばん', 'tan làm; hết ca', '下番はtan làmです。', 'かばん', 'Cái/Một tan làm.', '1186150', 0, 'transport-stay', [], '初級2', 14, 5, 2],
  [34, '加番', 'かばん', 'cảnh vệ; sốt sĩ', '加番はcảnh vệです。', 'かばん', 'Cái/Một cảnh vệ.', '2856280', 0, 'shopping-service-contract', [], '初級2', 15, 1, 0],
  [44, '此の', 'この', 'cái này', '此のはcái nàyです。', 'この', 'Cái/Một cái này.', '1582920', 0, 'appliance-digital-trouble', ['N5'], '初級2', 16, 2, 1],
  [49, '其の', 'その', 'cái đó', '其のはcái đóです。', 'その', 'Cái/Một cái đó.', '1006830', 0, 'discourse-reading', ['N5'], '初級2', 17, 3, 2],
  [35, '彼の', 'あの', 'cái đó', '彼のはcái đóです。', 'あの', 'Cái/Một cái đó.', '1000420', 0, 'travel-culture-reading', ['N5'], '初級2', 18, 4, 0],
  [40, '違う', 'ちがう', 'khác; sai', '違うはkhácです。', 'ちがう', 'Cái/Một khác.', '1158880', 0, 'work-study-development', ['N5'], '初級2', 19, 5, 1],
  [31, '靴下', 'くつした', 'm длин양', '靴下はm длин양です。', 'くつした', 'Cái/Một m длин양.', '1246740', 0, 'social-relationships', ['N5'], '初級2', 10, 1, 2],
  [34, '幾ら', 'いくら', 'bao nhiêu tiền', '幾らはbao nhiêu tiềnです。', 'いくら', 'Cái/Một bao nhiêu tiền.', '1219980', 0, 'cooking-waste', ['N5'], '初級2', 11, 2, 0],
  [35, '其処', 'そこ', 'ở đó; nơi đó', '其処はở đóです。', 'そこ', 'Cái/Một ở đó.', '1006670', 0, 'transport-stay', ['N5'], '初級2', 12, 3, 1],
  [35, '彼処', 'あそこ', 'ở đó; nơi đó', '彼処はở đóです。', 'あそこ', 'Cái/Một ở đó.', '1000320', 0, 'shopping-service-contract', ['N5'], '初級2', 13, 4, 2],
  [44, '何処', 'どこ', 'ở đó; nơi đó', '何処はở đóです。', 'どこ', 'Cái/Một ở đó.', '1577140', 0, 'appliance-digital-trouble', ['N5'], '初級2', 14, 5, 0],
  [49, '何方', 'どちら', 'từ trong ngữ cảnh N4', '何方はtừ trong ngữ cảnh N4です。', 'どちら', 'Cái/Một từ trong ngữ cảnh N4.', '1189360', 0, 'discourse-reading', ['N5'], '初級2', 15, 1, 1],
  [32, '其方', 'そちら', 'cái đó', '其方はcái đóです。', 'そちら', 'Cái/Một cái đó.', '1006780', 0, 'travel-culture-reading', ['N5'], '初級2', 16, 2, 2],
  [34, '彼方', 'あちら', 'ở đó; nơi đó', '彼方はở đóです。', 'あちら', 'Cái/Một ở đó.', '1483185', 0, 'work-study-development', ['N5'], '初級2', 17, 3, 0],
  [31, '此処', 'ここ', 'ở đó; nơi đó', '此処はở đóです。', 'ここ', 'Cái/Một ở đó.', '1288810', 0, 'social-relationships', ['N5'], '初級2', 18, 4, 1],
  [42, '個々', 'ここ', 'từ trong ngữ cảnh N4', '個々はtừ trong ngữ cảnh N4です。', 'ここ', 'Cái/Một từ trong ngữ cảnh N4.', '1593190', 0, 'cooking-waste', [], '初級2', 19, 5, 2],
  [35, '戸戸', 'ここ', 'cách dùng; chi tiêu', '戸戸はcách dùngです。', 'ここ', 'Cái/Một cách dùng.', '1639930', 0, 'transport-stay', [], '初級2', 10, 1, 0],
  [42, '呱々', 'ここ', 'sinh ra; sự sinh', '呱々はsinh raです。', 'ここ', 'Cái/Một sinh ra.', '1955390', 0, 'shopping-service-contract', [], '初級2', 11, 2, 1],
  [44, '此方', 'こちら', 'cái này', '此方はcái nàyです。', 'こちら', 'Cái/Một cái này.', '1004500', 0, 'appliance-digital-trouble', ['N5'], '初級2', 12, 3, 2],
  [49, '何れ', 'どれ', 'từ trong ngữ cảnh N4', '何れはtừ trong ngữ cảnh N4です。', 'どれ', 'Cái/Một từ trong ngữ cảnh N4.', '1009290', 0, 'discourse-reading', ['N5'], '初級2', 13, 4, 0],
  [30, '４時', 'よじ', 'từ trong ngữ cảnh N4', '４時はtừ trong ngữ cảnh N4です。', 'よじ', 'Cái/Một từ trong ngữ cảnh N4.', '1307230', 0, 'travel-culture-reading', [], '初級2', 14, 5, 1],
  [33, '９時', 'くじ', 'từ trong ngữ cảnh N4', '９時はtừ trong ngữ cảnh N4です。', 'くじ', 'Cái/Một từ trong ngữ cảnh N4.', '2845349', 0, 'work-study-development', [], '初級2', 15, 1, 2],
  [31, '勉強', 'べんきょう', 'từ trong ngữ cảnh N4', '勉強はtừ trong ngữ cảnh N4です。', 'べんきょう', 'Cái/Một từ trong ngữ cảnh N4.', '1512670', 0, 'social-relationships', ['N5'], '初級2', 16, 2, 0],
  [38, '休む', 'やすむ', 'từ trong ngữ cảnh N4', '休むはtừ trong ngữ cảnh N4です。', 'やすむ', 'Cái/Một từ trong ngữ cảnh N4.', '1227560', 0, 'cooking-waste', ['N5'], '初級2', 17, 3, 1],
  [35, '起きる', 'おきる', 'từ trong ngữ cảnh N4', '起きるはtừ trong ngữ cảnh N4です。', 'おきる', 'Cái/Một từ trong ngữ cảnh N4.', '1223640', 0, 'transport-stay', ['N5'], '初級2', 18, 4, 2],
  [45, '寝る', 'ねる', 'ngủ', '寝るはngủです。', 'ねる', 'Cái/Một ngủ.', '1360010', 0, 'shopping-service-contract', ['N5'], '初級2', 19, 5, 0],
  [44, '働く', 'はたらく', 'từ trong ngữ cảnh N4', '働くはtừ trong ngữ cảnh N4です。', 'はたらく', 'Cái/Một từ trong ngữ cảnh N4.', '1451150', 0, 'appliance-digital-trouble', ['N5'], '初級2', 10, 1, 1],
  [49, '５分', 'ごふん', 'từ trong ngữ cảnh N4', '５分はtừ trong ngữ cảnh N4です。', 'ごふん', 'Cái/Một từ trong ngữ cảnh N4.', '2039350', 0, 'discourse-reading', [], '初級2', 11, 2, 2],
  [27, '明後日', 'あさって', 'từ trong ngữ cảnh N4', '明後日はtừ trong ngữ cảnh N4です。', 'あさって', 'Cái/Một từ trong ngữ cảnh N4.', '1584640', 0, 'travel-culture-reading', ['N5'], '初級2', 12, 3, 0],
  [30, '何時も', 'いつも', 'từ trong ngữ cảnh N4', '何時もはtừ trong ngữ cảnh N4です。', 'いつも', 'Cái/Một từ trong ngữ cảnh N4.', '1188890', 0, 'work-study-development', ['N5'], '初級2', 13, 4, 1],
  [31, '大抵', 'たいてい', 'từ trong ngữ cảnh N4', '大抵はtừ trong ngữ cảnh N4です。', 'たいてい', 'Cái/Một từ trong ngữ cảnh N4.', '1414580', 0, 'social-relationships', ['N4'], '初級2', 14, 5, 2],
  [33, '退廷', 'たいてい', 'từ trong ngữ cảnh N4', '退廷はtừ trong ngữ cảnh N4です。', 'たいてい', 'Cái/Một từ trong ngữ cảnh N4.', '1779160', 0, 'cooking-waste', [], '初級2', 15, 1, 0],
  [35, '大帝', 'たいてい', 'từ trong ngữ cảnh N4', '大帝はtừ trong ngữ cảnh N4です。', 'たいてい', 'Cái/Một từ trong ngữ cảnh N4.', '1786140', 0, 'transport-stay', [], '初級2', 16, 2, 1],
  [29, '直ぐに', 'すぐに', 'từ trong ngữ cảnh N4', '直ぐにはtừ trong ngữ cảnh N4です。', 'すぐに', 'Cái/Một từ trong ngữ cảnh N4.', '1430620', 0, 'shopping-service-contract', ['N5'], '初級2', 17, 3, 2],
  [44, '而して', 'そして', 'từ trong ngữ cảnh N4', '而してはtừ trong ngữ cảnh N4です。', 'そして', 'Cái/Một từ trong ngữ cảnh N4.', '1006730', 0, 'appliance-digital-trouble', [], '初級2', 18, 4, 0],
  [49, '行く', 'いく', 'về nhà; đi về', '行くはvề nhàです。', 'いく', 'Cái/Một về nhà.', '1578850', 0, 'discourse-reading', ['N5'], '初級2', 19, 5, 1],
];

export const n4VocabularyBatch06=rows.map(([proposedLessonNumber,text,reading,meaning,ja,kana,vi,entryId,senseIndex,group,openJlptLevels,irodoriBook,irodoriLesson,irodoriActivity,irodoriReference])=>{
  const lessonNumber=groups[group].links.includes(proposedLessonNumber)?proposedLessonNumber:groups[group].links[0];
  const openLevels=[...openJlptLevels];
  const openJlptNote=openLevels.includes('N5')?'OpenJLPT lists this JMdict lexeme at N5; this batch uses a project-specific N4 functional sequence, not an official JLPT-level claim.':openLevels.includes('N4')?'OpenJLPT N4 membership agrees with the project stage, but remains a community estimate rather than an official syllabus.':'No membership match was found in the frozen OpenJLPT N4/N5 snapshots; absence is not evidence of an official level.';
  return{
    lessonNumber,text,reading,meaning,group,
    type:typeOverrides.get(text)||'danh từ',
    reason:`${groups[group].reason} This word is used in the example and supports the linked task.`,
    curriculum:{edition:'Minna no Nihongo Shokyu II, second edition; project functional alignment only',lessonNumber},
    role:'trọng tâm theo nhiệm vụ; chủ động nhận diện và vận dụng',
    example:{ja,reading:kana,vi},
    sourceReview:{
      entryId,senseIds:[`${entryId}-s${senseIndex}`],
      status:'Project-authored contextual Vietnamese meaning and example; selected JMdict sense; Irodori form/reading and coordinates checked; OpenJLPT membership compared; not independently reviewed',
      batchId:'n4-vocabulary-06',
      ...(openLevels.length?{openJlptJmdictId:entryId}:{}),
      openJlptMembership:{n4:openLevels.includes('N4'),n5:openLevels.includes('N5'),levels:openLevels},
      irodori:{sheet:'wordlist_all',book:irodoriBook,lesson:irodoriLesson,activity:irodoriActivity,exactForm:text,exactReading:reading,referenceVocabulary:irodoriReference},
      jmdict:{artifact:'.sources/edrdg-20261109/jmdict-eng.json',date:'2026-11-09',license:'CC BY-SA 4.0'},
      openJlpt:{artifact:'.sources/openjlpt-20261113/n4-vocab.json and n5-vocab.json',commit:'0d1d3410bec90bd4098a7c72de820543cb4f707c'},
      sourceComparison:{openJlptNote,irodoriNote:'Irodori records written form, reading and curriculum coordinate; it does not assign an N4 level.'},
      rationale:groups[group].reason
    }
  };
});

export function applyN4VocabularyBatch06(units){
  for(const item of n4VocabularyBatch06){
    const unit=units.find(candidate=>candidate.number===item.lessonNumber);
    if(!unit)throw Error(`Missing N4 lesson ${item.lessonNumber} for ${item.text}`);
    if(unit.words.some(word=>word.text===item.text&&word.reading===item.reading))throw Error(`N4 vocabulary batch duplicate ${item.text}/${item.reading}`);
    unit.words.push({...item});
  }
}
