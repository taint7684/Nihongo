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
]);

const rows=[
  [27, '炒る', 'いる', 'từ trong ngữ cảnh N4', '炒るはtừ trong ngữ cảnh N4です。', 'いる', 'Cái/Một từ trong ngữ cảnh N4.', '1391500', 0, 'travel-culture-reading', [], '初級2', 10, 1, 0],
  [30, '入る', 'いる', 'từ trong ngữ cảnh N4', '入るはtừ trong ngữ cảnh N4です。', 'いる', 'Cái/Một từ trong ngữ cảnh N4.', '1465580', 0, 'work-study-development', [], '初級2', 11, 2, 1],
  [31, '要る', 'いる', 'từ trong ngữ cảnh N4', '要るはtừ trong ngữ cảnh N4です。', 'いる', 'Cái/Một từ trong ngữ cảnh N4.', '1546640', 0, 'social-relationships', ['N?'], '初級2', 12, 3, 2],
  [39, '居る', 'いる', 'từ trong ngữ cảnh N4', '居るはtừ trong ngữ cảnh N4です。', 'いる', 'Cái/Một từ trong ngữ cảnh N4.', '1577980', 0, 'cooking-waste', ['N?'], '初級2', 13, 4, 0],
  [35, '鋳る', 'いる', 'từ trong ngữ cảnh N4', '鋳るはtừ trong ngữ cảnh N4です。', 'いる', 'Cái/Một từ trong ngữ cảnh N4.', '1587780', 0, 'transport-stay', [], '初級2', 14, 5, 1],
  [42, '没る', 'いる', 'từ trong ngữ cảnh N4', '没るはtừ trong ngữ cảnh N4です。', 'いる', 'Cái/Một từ trong ngữ cảnh N4.', '2209310', 0, 'shopping-service-contract', [], '初級2', 15, 1, 2],
  [44, '癒る', 'いる', 'từ trong ngữ cảnh N4', '癒るはtừ trong ngữ cảnh N4です。', 'いる', 'Cái/Một từ trong ngữ cảnh N4.', '2729170', 0, 'appliance-digital-trouble', [], '初級2', 16, 2, 0],
  [49, '沃る', 'いる', 'cách dùng; chi tiêu', '沃るはcách dùngです。', 'いる', 'Cái/Một cách dùng.', '2851105', 0, 'discourse-reading', [], '初級2', 17, 3, 1],
  [45, '率る', 'いる', 'từ trong ngữ cảnh N4', '率るはtừ trong ngữ cảnh N4です。', 'いる', 'Cái/Một từ trong ngữ cảnh N4.', '2851106', 0, 'travel-culture-reading', [], '初級2', 18, 4, 2],
  [28, '入り口', 'いりぐち', 'từ trong ngữ cảnh N4', '入り口はtừ trong ngữ cảnh N4です。', 'いりぐち', 'Cái/Một từ trong ngữ cảnh N4.', '1582820', 0, 'work-study-development', ['N?'], '初級2', 19, 5, 0],
  [31, '布団', 'ふとん', 'từ trong ngữ cảnh N4', '布団はtừ trong ngữ cảnh N4です。', 'ふとん', 'Cái/Một từ trong ngữ cảnh N4.', '1496890', 0, 'social-relationships', ['N?'], '初級2', 10, 1, 1],
  [34, 'ゴミ箱', 'ごみばこ', 'từ trong ngữ cảnh N4', 'ゴミ箱はtừ trong ngữ cảnh N4です。', 'ごみばこ', 'Cái/Một từ trong ngữ cảnh N4.', '1005010', 0, 'cooking-waste', [], '初級2', 11, 2, 2],
  [35, '林檎', 'りんご', 'từ trong ngữ cảnh N4', '林檎はtừ trong ngữ cảnh N4です。', 'りんご', 'Cái/Một từ trong ngữ cảnh N4.', '1555480', 0, 'transport-stay', [], '初級2', 12, 3, 0],
  [45, '苹果', 'ひょうか', 'từ trong ngữ cảnh N4', '苹果はtừ trong ngữ cảnh N4です。', 'ひょうか', 'Cái/Một từ trong ngữ cảnh N4.', '2859671', 0, 'shopping-service-contract', [], '初級2', 13, 4, 1],
  [44, '葉書', 'はがき', 'từ trong ngữ cảnh N4', '葉書はtừ trong ngữ cảnh N4です。', 'はがき', 'Cái/Một từ trong ngữ cảnh N4.', '1546590', 0, 'appliance-digital-trouble', ['N?'], '初級2', 14, 5, 2],
  [49, '一ヶ月', 'いっかげつ', 'từ trong ngữ cảnh N4', '一ヶ月はtừ trong ngữ cảnh N4です。', 'いっかげつ', 'Cái/Một từ trong ngữ cảnh N4.', '1587410', 0, 'discourse-reading', [], '初級2', 15, 1, 0],
  [43, '架かる', 'かかる', 'từ trong ngữ cảnh N4', '架かるはtừ trong ngữ cảnh N4です。', 'かかる', 'Cái/Một từ trong ngữ cảnh N4.', '1193110', 0, 'travel-culture-reading', [], '初級2', 16, 2, 1],
  [49, '掛かる', 'かかる', 'từ trong ngữ cảnh N4', '掛かるはtừ trong ngữ cảnh N4です。', 'かかる', 'Cái/Một từ trong ngữ cảnh N4.', '1207590', 0, 'work-study-development', ['N?'], '初級2', 17, 3, 2],
  [31, '係る', 'かかる', 'từ trong ngữ cảnh N4', '係るはtừ trong ngữ cảnh N4です。', 'かかる', 'Cái/Một từ trong ngữ cảnh N4.', '1249300', 0, 'social-relationships', [], '初級2', 18, 4, 0],
  [42, '罹る', 'かかる', 'từ trong ngữ cảnh N4', '罹るはtừ trong ngữ cảnh N4です。', 'かかる', 'Cái/Một từ trong ngữ cảnh N4.', '1609500', 0, 'cooking-waste', [], '初級2', 19, 5, 1],
  [35, '斯かる', 'かかる', 'cái này', '斯かるはcái nàyです。', 'かかる', 'Cái/Một cái này.', '2076580', 0, 'transport-stay', [], '初級2', 10, 1, 2],
  [29, '皸る', 'かかる', 'từ trong ngữ cảnh N4', '皸るはtừ trong ngữ cảnh N4です。', 'かかる', 'Cái/Một từ trong ngữ cảnh N4.', '2841189', 0, 'shopping-service-contract', [], '初級2', 11, 2, 0],
  [44, '幾つ', 'いくつ', 'từ trong ngữ cảnh N4', '幾つはtừ trong ngữ cảnh N4です。', 'いくつ', 'Cái/Một từ trong ngữ cảnh N4.', '1219960', 0, 'appliance-digital-trouble', ['N?'], '初級2', 12, 3, 1],
  [49, '石鹸', 'せっけん', 'từ trong ngữ cảnh N4', '石鹸はtừ trong ngữ cảnh N4です。', 'せっけん', 'Cái/Một từ trong ngữ cảnh N4.', '1382590', 0, 'discourse-reading', [], '初級2', 13, 4, 2],
  [42, '一昨日', 'おととい', 'từ trong ngữ cảnh N4', '一昨日はtừ trong ngữ cảnh N4です。', 'おととい', 'Cái/Một từ trong ngữ cảnh N4.', '1576050', 0, 'travel-culture-reading', ['N?'], '初級2', 14, 5, 0],
  [46, '昨夜', 'ゆうべ', 'từ trong ngữ cảnh N4', '昨夜はtừ trong ngữ cảnh N4です。', 'ゆうべ', 'Cái/Một từ trong ngữ cảnh N4.', '1542640', 0, 'work-study-development', ['N?'], '初級2', 15, 1, 1],
  [31, '夕べ', 'ゆうべ', 'từ trong ngữ cảnh N4', '夕べはtừ trong ngữ cảnh N4です。', 'ゆうべ', 'Cái/Một từ trong ngữ cảnh N4.', '2863051', 0, 'social-relationships', [], '初級2', 16, 2, 2],
  [38, '曇る', 'くもる', 'từ trong ngữ cảnh N4', '曇るはtừ trong ngữ cảnh N4です。', 'くもる', 'Cái/Một từ trong ngữ cảnh N4.', '1457560', 0, 'cooking-waste', ['N?'], '初級2', 17, 3, 0],
  [35, '止む', 'やむ', 'từ trong ngữ cảnh N4', '止むはtừ trong ngữ cảnh N4です。', 'やむ', 'Cái/Một từ trong ngữ cảnh N4.', '1310640', 0, 'transport-stay', ['N?'], '初級2', 18, 4, 1],
  [31, '病む', 'やむ', 'từ trong ngữ cảnh N4', '病むはtừ trong ngữ cảnh N4です。', 'やむ', 'Cái/Một từ trong ngữ cảnh N4.', '1490210', 0, 'shopping-service-contract', [], '初級2', 19, 5, 2],
  [44, '泳ぐ', 'およぐ', 'từ trong ngữ cảnh N4', '泳ぐはtừ trong ngữ cảnh N4です。', 'およぐ', 'Cái/Một từ trong ngữ cảnh N4.', '1174340', 0, 'appliance-digital-trouble', ['N?'], '初級2', 10, 1, 0],
  [49, '遊ぶ', 'あそぶ', 'từ trong ngữ cảnh N4', '遊ぶはtừ trong ngữ cảnh N4です。', 'あそぶ', 'Cái/Một từ trong ngữ cảnh N4.', '1542160', 0, 'discourse-reading', ['N?'], '初級2', 11, 2, 1],
  [40, '入る', 'はいる', 'từ trong ngữ cảnh N4', '入るはtừ trong ngữ cảnh N4です。', 'はいる', 'Cái/Một từ trong ngữ cảnh N4.', '1465590', 0, 'travel-culture-reading', ['N?'], '初級2', 12, 3, 2],
  [42, '出る', 'でる', 'về nhà; đi về', '出るはvề nhàです。', 'でる', 'Cái/Một về nhà.', '1338240', 0, 'work-study-development', ['N?'], '初級2', 13, 4, 0],
  [31, 'お腹が空く', 'おなかがすく', 'từ trong ngữ cảnh N4', 'お腹が空くはtừ trong ngữ cảnh N4です。', 'おなかがすく', 'Cái/Một từ trong ngữ cảnh N4.', '2021520', 0, 'social-relationships', [], '初級2', 14, 5, 1],
  [33, '喉が渇く', 'のどがかわく', 'từ trong ngữ cảnh N4', '喉が渇くはtừ trong ngữ cảnh N4です。', 'のどがかわく', 'Cái/Một từ trong ngữ cảnh N4.', '1277350', 0, 'cooking-waste', [], '初級2', 15, 1, 2],
  [35, '何処か', 'どこか', 'từ trong ngữ cảnh N4', '何処かはtừ trong ngữ cảnh N4です。', 'どこか', 'Cái/Một từ trong ngữ cảnh N4.', '1189000', 0, 'transport-stay', [], '初級2', 16, 2, 0],
  [33, '待つ', 'まつ', 'từ trong ngữ cảnh N4', '待つはtừ trong ngữ cảnh N4です。', 'まつ', 'Cái/Một từ trong ngữ cảnh N4.', '1410590', 0, 'shopping-service-contract', ['N?'], '初級2', 17, 3, 1],
  [44, '持つ', 'もつ', 'từ trong ngữ cảnh N4', '持つはtừ trong ngữ cảnh N4です。', 'もつ', 'Cái/Một từ trong ngữ cảnh N4.', '1315720', 0, 'appliance-digital-trouble', ['N?'], '初級2', 18, 4, 2],
  [49, '取る', 'とる', 'từ trong ngữ cảnh N4', '取るはtừ trong ngữ cảnh N4です。', 'とる', 'Cái/Một từ trong ngữ cảnh N4.', '1326980', 0, 'discourse-reading', ['N?'], '初級2', 19, 5, 0],
  [38, '手伝う', 'てつだう', 'từ trong ngữ cảnh N4', '手伝うはtừ trong ngữ cảnh N4です。', 'てつだう', 'Cái/Một từ trong ngữ cảnh N4.', '1328190', 0, 'travel-culture-reading', ['N?'], '初級2', 10, 1, 1],
  [41, '呼ぶ', 'よぶ', 'từ trong ngữ cảnh N4', '呼ぶはtừ trong ngữ cảnh N4です。', 'よぶ', 'Cái/Một từ trong ngữ cảnh N4.', '1266440', 0, 'work-study-development', ['N?'], '初級2', 11, 2, 2],
  [31, '急ぐ', 'いそぐ', 'từ trong ngữ cảnh N4', '急ぐはtừ trong ngữ cảnh N4です。', 'いそぐ', 'Cái/Một từ trong ngữ cảnh N4.', '1228650', 0, 'social-relationships', ['N?'], '初級2', 12, 3, 0],
  [39, '教える', 'おしえる', 'từ trong ngữ cảnh N4', '教えるはtừ trong ngữ cảnh N4です。', 'おしえる', 'Cái/Một từ trong ngữ cảnh N4.', '1236900', 0, 'cooking-waste', ['N?'], '初級2', 13, 4, 1],
  [35, '開ける', 'あける', 'từ trong ngữ cảnh N4', '開けるはtừ trong ngữ cảnh N4です。', 'あける', 'Cái/Một từ trong ngữ cảnh N4.', '1202450', 0, 'transport-stay', ['N?'], '初級2', 14, 5, 2],
  [34, '閉める', 'しめる', 'từ trong ngữ cảnh N4', '閉めるはtừ trong ngữ cảnh N4です。', 'しめる', 'Cái/Một từ trong ngữ cảnh N4.', '1508590', 0, 'shopping-service-contract', ['N?'], '初級2', 15, 1, 0],
  [44, '座る', 'すわる', 'từ trong ngữ cảnh N4', '座るはtừ trong ngữ cảnh N4です。', 'すわる', 'Cái/Một từ trong ngữ cảnh N4.', '1291800', 0, 'appliance-digital-trouble', ['N?'], '初級2', 16, 2, 1],
  [49, '立つ', 'たつ', 'từ trong ngữ cảnh N4', '立つはtừ trong ngữ cảnh N4です。', 'たつ', 'Cái/Một từ trong ngữ cảnh N4.', '1597040', 0, 'discourse-reading', ['N?'], '初級2', 17, 3, 2],
  [35, '話す', 'はなす', 'từ trong ngữ cảnh N4', '話すはtừ trong ngữ cảnh N4です。', 'はなす', 'Cái/Một từ trong ngữ cảnh N4.', '1562350', 0, 'travel-culture-reading', ['N?'], '初級2', 18, 4, 0],
  [40, '言う', 'いう', 'từ trong ngữ cảnh N4', '言うはtừ trong ngữ cảnh N4です。', 'いう', 'Cái/Một từ trong ngữ cảnh N4.', '1587040', 0, 'work-study-development', ['N?'], '初級2', 19, 5, 1],
  [31, '就ける', 'つける', 'từ trong ngữ cảnh N4', '就けるはtừ trong ngữ cảnh N4です。', 'つける', 'Cái/Một từ trong ngữ cảnh N4.', '1331540', 0, 'social-relationships', [], '初級2', 10, 1, 2],
  [34, '漬ける', 'つける', 'từ trong ngữ cảnh N4', '漬けるはtừ trong ngữ cảnh N4です。', 'つける', 'Cái/Một từ trong ngữ cảnh N4.', '1433680', 0, 'cooking-waste', ['N?'], '初級2', 11, 2, 0],
  [35, '付ける', 'つける', 'từ trong ngữ cảnh N4', '付けるはtừ trong ngữ cảnh N4です。', 'つける', 'Cái/Một từ trong ngữ cảnh N4.', '1495770', 0, 'transport-stay', [], '初級2', 12, 3, 1],
  [35, '点ける', 'つける', 'từ trong ngữ cảnh N4', '点けるはtừ trong ngữ cảnh N4です。', 'つける', 'Cái/Một từ trong ngữ cảnh N4.', '1610400', 0, 'shopping-service-contract', ['N?'], '初級2', 13, 4, 2],
  [44, '尾ける', 'つける', 'từ trong ngữ cảnh N4', '尾けるはtừ trong ngữ cảnh N4です。', 'つける', 'Cái/Một từ trong ngữ cảnh N4.', '2100600', 0, 'appliance-digital-trouble', [], '初級2', 14, 5, 0],
  [49, '止める', 'とめる', 'từ trong ngữ cảnh N4', '止めるはtừ trong ngữ cảnh N4です。', 'とめる', 'Cái/Một từ trong ngữ cảnh N4.', '1310670', 0, 'discourse-reading', ['N?'], '初級2', 15, 1, 1],
  [32, '使う', 'つかう', 'cách dùng; chi tiêu', '使うはcách dùngです。', 'つかう', 'Cái/Một cách dùng.', '1305990', 0, 'travel-culture-reading', ['N?'], '初級2', 16, 2, 2],
  [34, '置く', 'おく', 'ở đó; nơi đó', '置くはở đóです。', 'おく', 'Cái/Một ở đó.', '1421850', 0, 'work-study-development', ['N?'], '初級2', 17, 3, 0],
  [31, '知る', 'しる', 'từ trong ngữ cảnh N4', '知るはtừ trong ngữ cảnh N4です。', 'しる', 'Cái/Một từ trong ngữ cảnh N4.', '1420470', 0, 'social-relationships', ['N?'], '初級2', 18, 4, 1],
  [42, '住む', 'すむ', 'từ trong ngữ cảnh N4', '住むはtừ trong ngữ cảnh N4です。', 'すむ', 'Cái/Một từ trong ngữ cảnh N4.', '1334040', 0, 'cooking-waste', ['N?'], '初級2', 19, 5, 2],
  [35, '結婚', 'けっこん', 'từ trong ngữ cảnh N4', '結婚はtừ trong ngữ cảnh N4です。', 'けっこん', 'Cái/Một từ trong ngữ cảnh N4.', '1254790', 0, 'transport-stay', ['N?'], '初級2', 10, 1, 0],
  [42, '撮る', 'とる', 'từ trong ngữ cảnh N4', '撮るはtừ trong ngữ cảnh N4です。', 'とる', 'Cái/Một từ trong ngữ cảnh N4.', '1298790', 0, 'shopping-service-contract', ['N?'], '初級2', 11, 2, 1],
  [44, '売る', 'うる', 'từ trong ngữ cảnh N4', '売るはtừ trong ngữ cảnh N4です。', 'うる', 'Cái/Một từ trong ngữ cảnh N4.', '1473950', 0, 'appliance-digital-trouble', ['N?'], '初級2', 12, 3, 2],
  [49, '朝ごはん', 'あさごはん', 'từ trong ngữ cảnh N4', '朝ごはんはtừ trong ngữ cảnh N4です。', 'あさごはん', 'Cái/Một từ trong ngữ cảnh N4.', '1586330', 0, 'discourse-reading', ['N?'], '初級2', 13, 4, 0],
  [30, '晩御飯', 'ばんごはん', 'từ trong ngữ cảnh N4', '晩御飯はtừ trong ngữ cảnh N4です。', 'ばんごはん', 'Cái/Một từ trong ngữ cảnh N4.', '1601340', 0, 'travel-culture-reading', ['N?'], '初級2', 14, 5, 1],
  [33, '浴びる', 'あびる', 'từ trong ngữ cảnh N4', '浴びるはtừ trong ngữ cảnh N4です。', 'あびる', 'Cái/Một từ trong ngữ cảnh N4.', '1547450', 0, 'work-study-development', ['N?'], '初級2', 15, 1, 2],
  [31, '乗る', 'のる', 'từ trong ngữ cảnh N4', '乗るはtừ trong ngữ cảnh N4です。', 'のる', 'Cái/Một từ trong ngữ cảnh N4.', '1355120', 0, 'social-relationships', ['N?'], '初級2', 16, 2, 0],
  [38, '降りる', 'おりる', 'từ trong ngữ cảnh N4', '降りるはtừ trong ngữ cảnh N4です。', 'おりる', 'Cái/Một từ trong ngữ cảnh N4.', '1589500', 0, 'cooking-waste', ['N?'], '初級2', 17, 3, 1],
  [35, '何の', 'どの', 'từ trong ngữ cảnh N4', '何のはtừ trong ngữ cảnh N4です。', 'どの', 'Cái/Một từ trong ngữ cảnh N4.', '1920240', 0, 'transport-stay', ['N?'], '初級2', 18, 4, 2],
  [45, '狭い', 'せまい', 'tuyệt vời; tốt đẹp', '狭いはtuyệt vờiです。', 'せまい', 'Cái/Một tuyệt vời.', '1237680', 0, 'shopping-service-contract', ['N?'], '初級2', 19, 5, 0],
  [44, '施米', 'せまい', 'từ trong ngữ cảnh N4', '施米はtừ trong ngữ cảnh N4です。', 'せまい', 'Cái/Một từ trong ngữ cảnh N4.', '1753400', 0, 'appliance-digital-trouble', [], '初級2', 10, 1, 1],
  [49, '汚い', 'きたない', 'từ trong ngữ cảnh N4', '汚いはtừ trong ngữ cảnh N4です。', 'きたない', 'Cái/Một từ trong ngữ cảnh N4.', '1178940', 0, 'discourse-reading', ['N?'], '初級2', 11, 2, 2],
  [27, '煩い', 'うるさい', 'từ trong ngữ cảnh N4', '煩いはtừ trong ngữ cảnh N4です。', 'うるさい', 'Cái/Một từ trong ngữ cảnh N4.', '1481920', 0, 'travel-culture-reading', ['N?'], '初級2', 12, 3, 0],
  [30, '可愛い', 'かわいい', 'tuyệt vời; tốt đẹp', '可愛いはtuyệt vờiです。', 'かわいい', 'Cái/Một tuyệt vời.', '1577200', 0, 'work-study-development', ['N?'], '初級2', 13, 4, 1],
  [31, '格好いい', 'かっこいい', 'từ trong ngữ cảnh N4', '格好いいはtừ trong ngữ cảnh N4です。', 'かっこいい', 'Cái/Một từ trong ngữ cảnh N4.', '1577490', 0, 'social-relationships', [], '初級2', 14, 5, 2],
  [33, '柔らかい', 'やわらかい', 'từ trong ngữ cảnh N4', '柔らかいはtừ trong ngữ cảnh N4です。', 'やわらかい', 'Cái/Một từ trong ngữ cảnh N4.', '1605630', 0, 'cooking-waste', ['N?'], '初級2', 15, 1, 0],
  [35, '忘れる', 'わすれる', 'về nhà; đi về', '忘れるはvề nhàです。', 'わすれる', 'Cái/Một về nhà.', '1519210', 0, 'transport-stay', ['N?'], '初級2', 16, 2, 1],
  [29, '無くす', 'なくす', 'từ trong ngữ cảnh N4', '無くすはtừ trong ngữ cảnh N4です。', 'なくす', 'Cái/Một từ trong ngữ cảnh N4.', '1529530', 0, 'shopping-service-contract', ['N?'], '初級2', 17, 3, 2],
  [44, '亡くす', 'なくす', 'từ trong ngữ cảnh N4', '亡くすはtừ trong ngữ cảnh N4です。', 'なくす', 'Cái/Một từ trong ngữ cảnh N4.', '2835808', 0, 'appliance-digital-trouble', [], '初級2', 18, 4, 0],
  [49, '返す', 'かえす', 'từ trong ngữ cảnh N4', '返すはtừ trong ngữ cảnh N4です。', 'かえす', 'Cái/Một từ trong ngữ cảnh N4.', '1512130', 0, 'discourse-reading', ['N?'], '初級2', 19, 5, 1]
];

export const n4VocabularyBatch08=rows.map(([proposedLessonNumber,text,reading,meaning,ja,kana,vi,entryId,senseIndex,group,openJlptLevels,irodoriBook,irodoriLesson,irodoriActivity,irodoriReference])=>{
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
      batchId:'n4-vocabulary-08',
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

export function applyN4VocabularyBatch08(units){
  for(const item of n4VocabularyBatch08){
    const unit=units.find(candidate=>candidate.number===item.lessonNumber);
    if(!unit)throw Error(`Missing N4 lesson ${item.lessonNumber} for ${item.text}`);
    if(unit.words.some(word=>word.text===item.text&&word.reading===item.reading))throw Error(`N4 vocabulary batch duplicate ${item.text}/${item.reading}`);
    unit.words.push({...item});
  }
}
