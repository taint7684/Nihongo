export function normalizeReading(s){s=s.normalize('NFKC').replace(/[ぁ-ゖ]/g,c=>String.fromCharCode(c.charCodeAt(0)+0x60)).replace(/[^ァ-ヶー]/g,'');const rows=[['アカサタナハマヤラワガザダバパァャヵ','ア'],['イキシチニヒミリギジヂビピィ','イ'],['ウクスツヌフムユルグズヅブプゥュヴ','ウ'],['エケセテネヘメレゲゼデベペェヶ','エ'],['オコソトノホモヨロゴゾドボポォョ','オ']];let out='';for(const c of s)out+=c==='ー'?(rows.find(([letters])=>letters.includes(out.at(-1)))?.[1]||'ー'):c;return out;}

export const lexicalPronunciations=new Map([['教室','きょおしつ'],['学生','がくせえ'],['先生','せんせえ'],['学校','がっこお'],['勉強します','べんきょおします'],['勉強','べんきょお'],['料理','りょおり'],['今日','きょお'],['きょう','きょお'],['そうです','そおです'],['食堂','しょくどお'],['日曜日','にちよおび'],['何曜日','なんよおび'],['電話番号','でんわばんごお'],['誕生日','たんじょおび'],['公園','こおえん'],['もう','もお'],['英語','ええご'],['どう','どお'],['どうして','どおして'],['上手','じょおず'],['昨日','きのお'],['きのう','きのお']]);

for(const [word,reading] of [['両親','りょおしん'],['弟','おとおと'],['妹','いもおと'],['もう一度','もおいちど'],['大丈夫','だいじょおぶ'],['経験','けえけん'],['掃除します','そおじします'],['掃除','そおじ'],['趣味','しゅみ'],['上手','じょおず'],['最近','さいきん']])lexicalPronunciations.set(word,reading);

for(const [word,reading] of [['もうすぐ','もおすぐ'],['お弁当','おべんとお'],['ほう','ほお'],['そう','そお'],['ましょう','ましょお']])lexicalPronunciations.set(word,reading);

for(const [word,reading] of [['賛成','さんせえ'],['本当','ほんとお'],['でしょう','でしょお'],['説明します','せつめえします'],['説明','せつめえ'],['紹介します','しょおかいします'],['紹介','しょおかい'],['頑張ります','がんばります']])lexicalPronunciations.set(word,reading);

lexicalPronunciations.set('水曜日','すいよおび');

// Curated lexical long vowels; not a blanket ou/ei replacement.
for(const[w,r]of [['八日','よおか'],['金曜日','きんよおび'],['用事','よおじ']])lexicalPronunciations.set(w,r);

for(const[w,r]of [['授業','じゅぎょお'],['利用します','りよおします'],['利用','りよお'],['予定','よてえ'],['資料','しりょお'],['片づけます','かたずけます']])lexicalPronunciations.set(w,r);

for(const[w,r]of [['手帳','てちょお'],['名刺','めえし'],['時計','とけえ'],['飛行機','ひこおき'],['映画','ええが'],['有名','ゆうめえ'],['封筒','ふうとお'],['病院','びょおいん'],['自動車','じどおしゃ'],['動物','どおぶつ'],['どうしたの','どおしたの'],['信号','しんごお']])lexicalPronunciations.set(w,r);

lexicalPronunciations.set('旅行','りょこお');

for(const[w,r]of [['行こう','いこお'],['続け','つずけ'],['続けます','つずけます'],['続けよう','つずけよお'],['将来','しょおらい'],['計画','けえかく'],['予報','よほお'],['天気予報','てんきよほお'],['説明','せつめえ'],['説明書','せつめえしょ'],['条件','じょおけん'],['相談します','そおだんします'],['相談','そおだん']])lexicalPronunciations.set(w,r);

for(const[w,r]of [['撮影','さつええ'],['砂糖','さとお'],['向こう','むこお']])lexicalPronunciations.set(w,r);

for(const[w,r]of [['月曜日','げつよおび'],['火曜日','かよおび'],['木曜日','もくよおび'],['土曜日','どよおび']])lexicalPronunciations.set(w,r);

for(const[w,r]of [['目標','もくひょお'],['生活','せえかつ'],['招待します','しょおたいします'],['招待','しょおたい'],['整理します','せえりします'],['整理','せえり'],['到着します','とおちゃくします'],['到着','とおちゃく']])lexicalPronunciations.set(w,r);

lexicalPronunciations.set('ように','よおに');

for(const[w,r]of [['お礼','おれえ'],['費用','ひよお'],['道具','どおぐ'],['必要','ひつよお'],['教育','きょおいく'],['量','りょお'],['故障','こしょお']])lexicalPronunciations.set(w,r);

for(const[w,r]of [['ちょうど','ちょおど'],['申します','もおします'],['自己紹介','じこしょおかい'],['少々','しょおしょお']])lexicalPronunciations.set(w,r);

lexicalPronunciations.set('ようです','よおです');

for(const[w,r]of [['変更','へんこお'],['ご用','ごよお']])lexicalPronunciations.set(w,r);

// Explicit lexical readings for N5 functional gap batch; spelling remains unchanged in lessons.
for(const[w,r]of [['高校生','こおこおせえ'],['留学生','りゅうがくせえ'],['教科書','きょおかしょ'],['銀行','ぎんこお'],['東京','とおきょお'],['冷蔵庫','れえぞおこ'],['兄弟','きょおだい']])lexicalPronunciations.set(w,r);

// Calendar 8th: spellingようか, long-o synthesis plan; separate from duration八日間.
lexicalPronunciations.set('8日','よおか');

// R1 N4 lexical long vowels; not global ou/ei replacement.
for(const[w,r]of [["出張","しゅっちょお"],["卒業","そつぎょお"],["卒業します","そつぎょおします"],["運動","うんどお"],["醤油","しょおゆ"],["健康","けんこお"],["調子","ちょおし"],["方法","ほおほお"],["社長","しゃちょお"],["部長","ぶちょお"],["ご説明","ごせつめえ"],["尊敬語","そんけえご"],["謙譲語","けんじょおご"],["丁寧語","てえねえご"]])lexicalPronunciations.set(w,r);
