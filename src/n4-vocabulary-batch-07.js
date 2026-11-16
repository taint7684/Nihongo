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
  [27, '来る', 'くる', 'từ trong ngữ cảnh N4', '来るはtừ trong ngữ cảnh N4です。', 'くる', 'Cái/Một từ trong ngữ cảnh N4.', '1547720', 0, 'travel-culture-reading', ['N5'], '初級2', 10, 1, 0],
  [30, '帰る', 'かえる', 'về nhà; đi về', '帰るはvề nhàです。', 'かえる', 'Cái/Một về nhà.', '1221270', 0, 'work-study-development', ['N5'], '初級2', 11, 2, 1],
  [31, '歩く', 'あるく', 'từ trong ngữ cảnh N4', '歩くはtừ trong ngữ cảnh N4です。', 'あるく', 'Cái/Một từ trong ngữ cảnh N4.', '1514320', 0, 'social-relationships', ['N5'], '初級2', 12, 3, 2],
  [39, '凍つ', 'いつ', 'từ trong ngữ cảnh N4', '凍つはtừ trong ngữ cảnh N4です。', 'いつ', 'Cái/Một từ trong ngữ cảnh N4.', '2837668', 0, 'cooking-waste', [], '初級2', 13, 4, 0],
  [35, '初めて', 'はじめて', 'từ trong ngữ cảnh N4', '初めてはtừ trong ngữ cảnh N4です。', 'はじめて', 'Cái/Một từ trong ngữ cảnh N4.', '1342550', 0, 'transport-stay', ['N5'], '初級2', 14, 5, 1],
  [42, 'どの位', 'どのくらい', 'bao nhiêu tiền', 'どの位はbao nhiêu tiềnです。', 'どのくらい', 'Cái/Một bao nhiêu tiền.', '1009250', 0, 'shopping-service-contract', [], '初級2', 15, 1, 2],
  [44, '食べる', 'たべる', 'từ trong ngữ cảnh N4', '食べるはtừ trong ngữ cảnh N4です。', 'たべる', 'Cái/Một từ trong ngữ cảnh N4.', '1358280', 0, 'appliance-digital-trouble', ['N5'], '初級2', 16, 2, 0],
  [49, '飲む', 'のむ', 'từ trong ngữ cảnh N4', '飲むはtừ trong ngữ cảnh N4です。', 'のむ', 'Cái/Một từ trong ngữ cảnh N4.', '1169870', 0, 'discourse-reading', ['N5'], '初級2', 17, 3, 1],
  [45, '読む', 'よむ', 'từ trong ngữ cảnh N4', '読むはtừ trong ngữ cảnh N4です。', 'よむ', 'Cái/Một từ trong ngữ cảnh N4.', '1456360', 0, 'travel-culture-reading', ['N5'], '初級2', 18, 4, 2],
  [28, '買う', 'かう', 'từ trong ngữ cảnh N4', '買うはtừ trong ngữ cảnh N4です。', 'かう', 'Cái/Một từ trong ngữ cảnh N4.', '1473740', 0, 'work-study-development', ['N5'], '初級2', 19, 5, 0],
  [31, '見る', 'みる', 'từ trong ngữ cảnh N4', '見るはtừ trong ngữ cảnh N4です。', 'みる', 'Cái/Một từ trong ngữ cảnh N4.', '1259290', 0, 'social-relationships', ['N5'], '初級2', 10, 1, 1],
  [34, '為る', 'する', 'từ trong ngữ cảnh N4', '為るはtừ trong ngữ cảnh N4です。', 'する', 'Cái/Một từ trong ngữ cảnh N4.', '1157170', 0, 'cooking-waste', ['N5'], '初級2', 11, 2, 2],
  [35, '刷る', 'する', 'từ trong ngữ cảnh N4', '刷るはtừ trong ngữ cảnh N4です。', 'する', 'Cái/Một từ trong ngữ cảnh N4.', '1298670', 0, 'transport-stay', [], '初級2', 12, 3, 0],
  [45, '掏る', 'する', 'từ trong ngữ cảnh N4', '掏るはtừ trong ngữ cảnh N4です。', 'する', 'Cái/Một từ trong ngữ cảnh N4.', '1567440', 0, 'shopping-service-contract', [], '初級2', 13, 4, 1],
  [44, '剃る', 'そる', 'từ trong ngữ cảnh N4', '剃るはtừ trong ngữ cảnh N4です。', 'そる', 'Cái/Một từ trong ngữ cảnh N4.', '1581900', 0, 'appliance-digital-trouble', [], '初級2', 14, 5, 2],
  [49, '擦る', 'する', 'từ trong ngữ cảnh N4', '擦るはtừ trong ngữ cảnh N4です。', 'する', 'Cái/Một từ trong ngữ cảnh N4.', '1595910', 0, 'discourse-reading', [], '初級2', 15, 1, 0],
  [43, '会う', 'あう', 'từ trong ngữ cảnh N4', '会うはtừ trong ngữ cảnh N4です。', 'あう', 'Cái/Một từ trong ngữ cảnh N4.', '1198180', 0, 'travel-culture-reading', ['N5'], '初級2', 16, 2, 1],
  [49, '一寸', 'ちょっと', 'từ trong ngữ cảnh N4', '一寸はtừ trong ngữ cảnh N4です。', 'ちょっと', 'Cái/Một từ trong ngữ cảnh N4.', '1163940', 0, 'work-study-development', ['N5'], '初級2', 17, 3, 2],
  [31, '聞く', 'きく', 'từ trong ngữ cảnh N4', '聞くはtừ trong ngữ cảnh N4です。', 'きく', 'Cái/Một từ trong ngữ cảnh N4.', '1591110', 0, 'social-relationships', ['N5'], '初級2', 18, 4, 0],
  [42, '麦酒', 'ばくしゅ', 'từ trong ngữ cảnh N4', '麦酒はtừ trong ngữ cảnh N4です。', 'ばくしゅ', 'Cái/Một từ trong ngữ cảnh N4.', '1104550', 0, 'cooking-waste', [], '初級2', 19, 5, 1],
  [35, '拉麺', 'ラーメン', 'từ trong ngữ cảnh N4', '拉麺はtừ trong ngữ cảnh N4です。', 'ラーメン', 'Cái/Một từ trong ngữ cảnh N4.', '1137720', 0, 'transport-stay', [], '初級2', 10, 1, 2],
  [29, '饂飩', 'うどん', 'từ trong ngữ cảnh N4', '饂飩はtừ trong ngữ cảnh N4です。', 'うどん', 'Cái/Một từ trong ngữ cảnh N4.', '1574470', 0, 'shopping-service-contract', [], '初級2', 11, 2, 0],
  [44, '蕎麦', 'そば', 'từ trong ngữ cảnh N4', '蕎麦はtừ trong ngữ cảnh N4です。', 'そば', 'Cái/Một từ trong ngữ cảnh N4.', '1238460', 0, 'appliance-digital-trouble', [], '初級2', 12, 3, 1],
  [49, '咖哩', 'カレー', 'từ trong ngữ cảnh N4', '咖哩はtừ trong ngữ cảnh N4です。', 'カレー', 'Cái/Một từ trong ngữ cảnh N4.', '1039140', 0, 'discourse-reading', ['N5'], '初級2', 13, 4, 2],
  [42, 'お握り', 'おにぎり', 'từ trong ngữ cảnh N4', 'お握りはtừ trong ngữ cảnh N4です。', 'おにぎり', 'Cái/Một từ trong ngữ cảnh N4.', '1001620', 0, 'travel-culture-reading', [], '初級2', 14, 5, 0],
  [46, '未刊', 'みかん', 'từ trong ngữ cảnh N4', '未刊はtừ trong ngữ cảnh N4です。', 'みかん', 'Cái/Một từ trong ngữ cảnh N4.', '1527270', 0, 'work-study-development', [], '初級2', 15, 1, 1],
  [31, '未完', 'みかん', 'từ trong ngữ cảnh N4', '未完はtừ trong ngữ cảnh N4です。', 'みかん', 'Cái/Một từ trong ngữ cảnh N4.', '1527290', 0, 'social-relationships', [], '初級2', 16, 2, 2],
  [38, '蜜柑', 'みかん', 'từ trong ngữ cảnh N4', '蜜柑はtừ trong ngữ cảnh N4です。', 'みかん', 'Cái/Một từ trong ngữ cảnh N4.', '1528410', 0, 'cooking-waste', [], '初級2', 17, 3, 0],
  [35, '武道', 'ぶどう', 'từ trong ngữ cảnh N4', '武道はtừ trong ngữ cảnh N4です。', 'ぶどう', 'Cái/Một từ trong ngữ cảnh N4.', '1498880', 0, 'transport-stay', [], '初級2', 18, 4, 1],
  [31, '葡萄', 'ぶどう', 'từ trong ngữ cảnh N4', '葡萄はtừ trong ngữ cảnh N4です。', 'ぶどう', 'Cái/Một từ trong ngữ cảnh N4.', '1499230', 0, 'shopping-service-contract', ['N4'], '初級2', 19, 5, 2],
  [44, '無道', 'むどう', 'từ trong ngữ cảnh N4', '無道はtừ trong ngữ cảnh N4です。', 'むどう', 'Cái/Một từ trong ngữ cảnh N4.', '1673240', 0, 'appliance-digital-trouble', [], '初級2', 10, 1, 0],
  [49, '不道', 'ふどう', 'từ trong ngữ cảnh N4', '不道はtừ trong ngữ cảnh N4です。', 'ふどう', 'Cái/Một từ trong ngữ cảnh N4.', '2194390', 0, 'discourse-reading', [], '初級2', 11, 2, 1],
  [40, '洋杯', 'コップ', 'từ trong ngữ cảnh N4', '洋杯はtừ trong ngữ cảnh N4です。', 'コップ', 'Cái/Một từ trong ngữ cảnh N4.', '1050390', 0, 'travel-culture-reading', ['N5'], '初級2', 12, 3, 2],
  [42, '書く', 'かく', 'từ trong ngữ cảnh N4', '書くはtừ trong ngữ cảnh N4です。', 'かく', 'Cái/Một từ trong ngữ cảnh N4.', '1343950', 0, 'work-study-development', ['N5'], '初級2', 13, 4, 0],
  [31, '上げる', 'あげる', 'từ trong ngữ cảnh N4', '上げるはtừ trong ngữ cảnh N4です。', 'あげる', 'Cái/Một từ trong ngữ cảnh N4.', '1352320', 0, 'social-relationships', ['N5'], '初級2', 14, 5, 1],
  [33, '揚げる', 'あげる', 'từ trong ngữ cảnh N4', '揚げるはtừ trong ngữ cảnh N4です。', 'あげる', 'Cái/Một từ trong ngữ cảnh N4.', '2864817', 0, 'cooking-waste', [], '初級2', 15, 1, 2],
  [35, '挙げる', 'あげる', 'từ trong ngữ cảnh N4', '挙げるはtừ trong ngữ cảnh N4です。', 'あげる', 'Cái/Một từ trong ngữ cảnh N4.', '2864818', 0, 'transport-stay', [], '初級2', 16, 2, 0],
  [33, '貰う', 'もらう', 'từ trong ngữ cảnh N4', '貰うはtừ trong ngữ cảnh N4です。', 'もらう', 'Cái/Một từ trong ngữ cảnh N4.', '1535910', 0, 'shopping-service-contract', ['N4'], '初級2', 17, 3, 1],
  [44, '未だ', 'まだ', 'từ trong ngữ cảnh N4', '未だはtừ trong ngữ cảnh N4です。', 'まだ', 'Cái/Một từ trong ngữ cảnh N4.', '1527110', 0, 'appliance-digital-trouble', ['N5'], '初級2', 18, 4, 2],
  [49, '切る', 'きる', 'từ trong ngữ cảnh N4', '切るはtừ trong ngữ cảnh N4です。', 'きる', 'Cái/Một từ trong ngữ cảnh N4.', '1384830', 0, 'discourse-reading', ['N5'], '初級2', 19, 5, 0],
  [38, '挟み', 'はさみ', 'từ trong ngữ cảnh N4', '挟みはtừ trong ngữ cảnh N4です。', 'はさみ', 'Cái/Một từ trong ngữ cảnh N4.', '2867133', 0, 'travel-culture-reading', [], '初級2', 10, 1, 1],
  [41, '習う', 'ならう', 'từ trong ngữ cảnh N4', '習うはtừ trong ngữ cảnh N4です。', 'ならう', 'Cái/Một từ trong ngữ cảnh N4.', '1333070', 0, 'work-study-development', ['N5'], '初級2', 11, 2, 2],
  [31, '貸す', 'かす', 'từ trong ngữ cảnh N4', '貸すはtừ trong ngữ cảnh N4です。', 'かす', 'Cái/Một từ trong ngữ cảnh N4.', '1411160', 0, 'social-relationships', ['N5'], '初級2', 12, 3, 0],
  [39, '借りる', 'かりる', 'từ trong ngữ cảnh N4', '借りるはtừ trong ngữ cảnh N4です。', 'かりる', 'Cái/Một từ trong ngữ cảnh N4.', '1323560', 0, 'cooking-waste', ['N5'], '初級2', 13, 4, 1],
  [35, '借る', 'かる', 'từ trong ngữ cảnh N4', '借るはtừ trong ngữ cảnh N4です。', 'かる', 'Cái/Một từ trong ngữ cảnh N4.', '1323900', 0, 'transport-stay', [], '初級2', 14, 5, 2],
  [34, '賑やか', 'にぎやか', 'từ trong ngữ cảnh N4', '賑やかはtừ trong ngữ cảnh N4です。', 'にぎやか', 'Cái/Một từ trong ngữ cảnh N4.', '1463480', 0, 'shopping-service-contract', ['N5'], '初級2', 15, 1, 0],
  [44, '綺麗', 'きれい', 'tuyệt vời; tốt đẹp', '綺麗はtuyệt vờiです。', 'きれい', 'Cái/Một tuyệt vời.', '1591900', 0, 'appliance-digital-trouble', ['N5'], '初級2', 16, 2, 1],
  [49, '迚も', 'とても', 'từ trong ngữ cảnh N4', '迚もはtừ trong ngữ cảnh N4です。', 'とても', 'Cái/Một từ trong ngữ cảnh N4.', '1008630', 0, 'discourse-reading', ['N5'], '初級2', 17, 3, 2],
  [35, '余り', 'あまり', 'từ trong ngữ cảnh N4', '余りはtừ trong ngữ cảnh N4です。', 'あまり', 'Cái/Một từ trong ngữ cảnh N4.', '1584930', 0, 'travel-culture-reading', ['N5'], '初級2', 18, 4, 0],
  [40, '怡々', 'いい', 'từ trong ngữ cảnh N4', '怡々はtừ trong ngữ cảnh N4です。', 'いい', 'Cái/Một từ trong ngữ cảnh N4.', '2571360', 0, 'work-study-development', [], '初級2', 19, 5, 1],
  [31, '易々', 'いい', 'từ trong ngữ cảnh N4', '易々はtừ trong ngữ cảnh N4です。', 'いい', 'Cái/Một từ trong ngữ cảnh N4.', '2672320', 0, 'social-relationships', [], '初級2', 10, 1, 2],
  [34, '唯々', 'いい', 'từ trong ngữ cảnh N4', '唯々はtừ trong ngữ cảnh N4です。', 'いい', 'Cái/Một từ trong ngữ cảnh N4.', '2672330', 0, 'cooking-waste', [], '初級2', 11, 2, 0],
  [35, '委蛇', 'いい', 'từ trong ngữ cảnh N4', '委蛇はtừ trong ngữ cảnh N4です。', 'いい', 'Cái/Một từ trong ngữ cảnh N4.', '2846378', 0, 'transport-stay', [], '初級2', 12, 3, 1],
  [35, '依々', 'いい', 'từ trong ngữ cảnh N4', '依々はtừ trong ngữ cảnh N4です。', 'いい', 'Cái/Một từ trong ngữ cảnh N4.', '2846386', 0, 'shopping-service-contract', [], '初級2', 13, 4, 2],
  [44, '如何', 'どう', 'từ trong ngữ cảnh N4', '如何はtừ trong ngữ cảnh N4です。', 'どう', 'Cái/Một từ trong ngữ cảnh N4.', '1008910', 0, 'appliance-digital-trouble', ['N5'], '初級2', 14, 5, 0],
  [49, '美味しい', 'おいしい', 'tuyệt vời; tốt', '美味しいはtuyệt vờiです。', 'おいしい', 'Cái/Một tuyệt vời.', '1486650', 0, 'discourse-reading', ['N5'], '初級2', 15, 1, 1],
  [32, '不味い', 'まずい', 'từ trong ngữ cảnh N4', '不味いはtừ trong ngữ cảnh N4です。', 'まずい', 'Cái/Một từ trong ngữ cảnh N4.', '1495000', 0, 'travel-culture-reading', ['N5'], '初級2', 16, 2, 2],
  [34, '詰らない', 'つまらない', 'từ trong ngữ cảnh N4', '詰らないはtừ trong ngữ cảnh N4です。', 'つまらない', 'Cái/Một từ trong ngữ cảnh N4.', '1008190', 0, 'work-study-development', ['N5'], '初級2', 17, 3, 0],
  [31, '酸っぱい', 'すっぱい', 'từ trong ngữ cảnh N4', '酸っぱいはtừ trong ngữ cảnh N4です。', 'すっぱい', 'Cái/Một từ trong ngữ cảnh N4.', '1304280', 0, 'social-relationships', [], '初級2', 18, 4, 1],
  [42, '温い', 'ぬるい', 'từ trong ngữ cảnh N4', '温いはtừ trong ngữ cảnh N4です。', 'ぬるい', 'Cái/Một từ trong ngữ cảnh N4.', '1183300', 0, 'cooking-waste', ['N5'], '初級2', 19, 5, 2],
  [35, '痒い', 'かゆい', 'từ trong ngữ cảnh N4', '痒いはtừ trong ngữ cảnh N4です。', 'かゆい', 'Cái/Một từ trong ngữ cảnh N4.', '1569570', 0, 'transport-stay', [], '初級2', 10, 1, 0],
  [42, '酷い', 'ひどい', 'từ trong ngữ cảnh N4', '酷いはtừ trong ngữ cảnh N4です。', 'ひどい', 'Cái/Một từ trong ngữ cảnh N4.', '1602060', 0, 'shopping-service-contract', ['N4'], '初級2', 11, 2, 1],
  [44, '分かる', 'わかる', 'từ trong ngữ cảnh N4', '分かるはtừ trong ngữ cảnh N4です。', 'わかる', 'Cái/Một từ trong ngữ cảnh N4.', '1606560', 0, 'appliance-digital-trouble', ['N5'], '初級2', 12, 3, 2],
  [49, '良く', 'よく', 'tuyệt vời; tốt', '良くはtuyệt vờiです。', 'よく', 'Cái/Một tuyệt vời.', '1605870', 0, 'discourse-reading', ['N5'], '初級2', 13, 4, 0],
  [30, '如何して', 'どうして', 'từ trong ngữ cảnh N4', '如何してはtừ trong ngữ cảnh N4です。', 'どうして', 'Cái/Một từ trong ngữ cảnh N4.', '1466940', 0, 'travel-culture-reading', ['N5'], '初級2', 14, 5, 1],
  [33, '大体', 'だいたい', 'từ trong ngữ cảnh N4', '大体はtừ trong ngữ cảnh N4です。', 'だいたい', 'Cái/Một từ trong ngữ cảnh N4.', '1414470', 0, 'work-study-development', ['N4'], '初級2', 15, 1, 2],
  [31, '大隊', 'だいたい', 'từ trong ngữ cảnh N4', '大隊はtừ trong ngữ cảnh N4です。', 'だいたい', 'Cái/Một từ trong ngữ cảnh N4.', '1414480', 0, 'social-relationships', [], '初級2', 16, 2, 0],
  [38, '代替', 'だいたい', 'từ trong ngữ cảnh N4', '代替はtừ trong ngữ cảnh N4です。', 'だいたい', 'Cái/Một từ trong ngữ cảnh N4.', '1581470', 0, 'cooking-waste', [], '初級2', 17, 3, 1],
  [35, '大腿', 'だいたい', 'từ trong ngữ cảnh N4', '大腿はtừ trong ngữ cảnh N4です。', 'だいたい', 'Cái/Một từ trong ngữ cảnh N4.', '1786990', 0, 'transport-stay', [], '初級2', 18, 4, 2],
  [45, '平仮名', 'ひらがな', 'cách dùng; chi tiêu', '平仮名はcách dùngです。', 'ひらがな', 'Cái/Một cách dùng.', '1507090', 0, 'shopping-service-contract', [], '初級2', 19, 5, 0],
  [44, '片仮名', 'カタカナ', 'cách dùng; chi tiêu', '片仮名はcách dùngです。', 'カタカナ', 'Cái/Một cách dùng.', '1511600', 0, 'appliance-digital-trouble', [], '初級2', 10, 1, 1],
  [49, '漫画', 'まんが', 'từ trong ngữ cảnh N4', '漫画はtừ trong ngữ cảnh N4です。', 'まんが', 'Cái/Một từ trong ngữ cảnh N4.', '1526920', 0, 'discourse-reading', ['N4'], '初級2', 11, 2, 2],
  [27, '空オケ', 'カラオケ', 'từ trong ngữ cảnh N4', '空オケはtừ trong ngữ cảnh N4です。', 'カラオケ', 'Cái/Một từ trong ngữ cảnh N4.', '1038660', 0, 'travel-culture-reading', [], '初級2', 12, 3, 0],
  [30, '釣り', 'つり', 'từ trong ngữ cảnh N4', '釣りはtừ trong ngữ cảnh N4です。', 'つり', 'Cái/Một từ trong ngữ cảnh N4.', '1434040', 0, 'work-study-development', [], '初級2', 13, 4, 1],
  [31, '吊り', 'つり', 'cách dùng; chi tiêu', '吊りはcách dùngです。', 'つり', 'Cái/Một cách dùng.', '2136970', 0, 'social-relationships', [], '初級2', 14, 5, 2],
  [33, '椅子', 'いす', 'từ trong ngữ cảnh N4', '椅子はtừ trong ngữ cảnh N4です。', 'いす', 'Cái/Một từ trong ngữ cảnh N4.', '1157070', 0, 'cooking-waste', ['N5'], '初級2', 15, 1, 0],
  [35, '有る', 'ある', 'từ trong ngữ cảnh N4', '有るはtừ trong ngữ cảnh N4です。', 'ある', 'Cái/Một từ trong ngữ cảnh N4.', '1296400', 0, 'transport-stay', ['N5'], '初級2', 16, 2, 1],
  [29, '或る', 'ある', 'từ trong ngữ cảnh N4', '或るはtừ trong ngữ cảnh N4です。', 'ある', 'Cái/Một từ trong ngữ cảnh N4.', '1586840', 0, 'shopping-service-contract', [], '初級2', 17, 3, 2],
  [44, '在す', 'います', 'từ trong ngữ cảnh N4', '在すはtừ trong ngữ cảnh N4です。', 'います', 'Cái/Một từ trong ngữ cảnh N4.', '2785190', 0, 'appliance-digital-trouble', [], '初級2', 18, 4, 0],
  [49, '射る', 'いる', 'từ trong ngữ cảnh N4', '射るはtừ trong ngữ cảnh N4です。', 'いる', 'Cái/Một từ trong ngữ cảnh N4.', '1322180', 0, 'discourse-reading', [], '初級2', 19, 5, 1]
];

export const n4VocabularyBatch07=rows.map(([proposedLessonNumber,text,reading,meaning,ja,kana,vi,entryId,senseIndex,group,openJlptLevels,irodoriBook,irodoriLesson,irodoriActivity,irodoriReference])=>{
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
      batchId:'n4-vocabulary-07',
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

export function applyN4VocabularyBatch07(units){
  for(const item of n4VocabularyBatch07){
    const unit=units.find(candidate=>candidate.number===item.lessonNumber);
    if(!unit)throw Error(`Missing N4 lesson ${item.lessonNumber} for ${item.text}`);
    if(unit.words.some(word=>word.text===item.text&&word.reading===item.reading))throw Error(`N4 vocabulary batch duplicate ${item.text}/${item.reading}`);
    unit.words.push({...item});
  }
}
