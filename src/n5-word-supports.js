export const n5WordSupports=[
  [
    3,
    "ここ",
    "ここ",
    "chỗ này",
    "ここは受付です。",
    "ここはうけつけです。",
    "Đây là quầy tiếp tân."
  ],
  [
    6,
    "ちょっと",
    "ちょっと",
    "một chút; lời ngập ngừng tùy ngữ cảnh",
    "あしたはちょっと…。",
    "あしたはちょっと…。",
    "Ngày mai thì hơi khó… (từ chối nhẹ trong ngữ cảnh mời)."
  ],
  [
    8,
    "広い",
    "ひろい",
    "rộng",
    "この部屋は広いです。",
    "このへやはひろいです。",
    "Phòng này rộng."
  ],
  [
    11,
    "枚",
    "まい",
    "lượng từ cho vật phẳng",
    "切手を二枚買います。",
    "きってをにまいかいます。",
    "Tôi mua hai con tem."
  ],
  [
    11,
    "台",
    "だい",
    "lượng từ cho máy/xe",
    "パソコンが一台あります。",
    "ぱそこんがいちだいあります。",
    "Có một máy tính."
  ],
  [
    11,
    "冊",
    "さつ",
    "lượng từ cho sách",
    "本を二冊読みました。",
    "ほんをにさつよみました。",
    "Tôi đã đọc hai cuốn sách."
  ],
  [
    11,
    "回",
    "かい",
    "lần",
    "一週間に二回勉強します。",
    "いっしゅうかんににかいべんきょうします。",
    "Tôi học hai lần một tuần."
  ],
  [
    12,
    "三つ",
    "みっつ",
    "ba cái, lượng từ chung",
    "ここに店が三つあります。",
    "ここにみせがみっつあります。",
    "Ở đây có ba cửa hàng."
  ],
  [
    16,
    "広い",
    "ひろい",
    "rộng",
    "部屋は広くて明るいです。",
    "へやはひろくてあかるいです。",
    "Phòng rộng và sáng."
  ],
  [
    17,
    "金曜日",
    "きんようび",
    "thứ Sáu",
    "金曜日までに本を返します。",
    "きんようびまでにほんをかえします。",
    "Tôi trả sách chậm nhất thứ Sáu."
  ],
  [
    19,
    "去年",
    "きょねん",
    "năm ngoái",
    "去年、山に登りました。",
    "きょねん、やまにのぼりました。",
    "Năm ngoái tôi đã leo núi."
  ],
  [
    22,
    "用事",
    "ようじ",
    "việc cần làm",
    "あしたは用事があります。",
    "あしたはようじがあります。",
    "Ngày mai tôi có việc."
  ]
];
export function addN5Words(units){for(const[n,text,reading,meaning,ja,kana,vi]of n5WordSupports){const u=units.find(u=>u.number===n);if(!u.words.some(w=>w.text===text))u.words.push({text,reading,meaning,type:"từ hỗ trợ",role:"hỗ trợ hiểu ví dụ/cách dùng, không ép thuộc trước",example:{ja,reading:kana,vi}});}}
