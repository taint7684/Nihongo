// Original integrated assessment contexts; no copied textbook exercises.
const data=[
  {
    "range": "06-10",
    "end": 10,
    "title": "Một lời mời sau giờ học",
    "text": "土曜日、友達と公園で昼ごはんを食べます。公園は静かですが、駅から遠いです。わたしは料理が好きですから、お弁当を作ります。友達はペンで手紙を書きます。本はかばんの中にあります。",
    "reading": "どようび、ともだちとこうえんでひるごはんをたべます。こうえんはしずかですが、えきからとおいです。わたしはりょうりがすきですから、おべんとうをつくります。ともだちはぺんでてがみをかきます。ほんはかばんのなかにあります。",
    "vi": "Thứ Bảy ăn trưa cùng bạn ở công viên. Công viên yên tĩnh nhưng xa ga. Vì thích nấu ăn, người nói làm cơm hộp. Bạn viết thư bằng bút. Sách ở trong túi. お弁当: cơm hộp; 作ります: làm, hai từ hỗ trợ có trong đoạn.",
    "questions": [
      {
        "id": "mr610-1",
        "prompt": "Bữa trưa diễn ra ở đâu?",
        "choices": [
          "công viên",
          "ga",
          "trong túi"
        ],
        "answer": 0,
        "explanation": "公園で nêu nơi diễn ra ăn trưa.",
        "skill": "で",
        "standalone": true
      },
      {
        "id": "mr610-2",
        "prompt": "Vì sao người nói làm cơm?",
        "choices": [
          "vì thích nấu ăn",
          "vì không có tiền",
          "vì ghét công viên"
        ],
        "answer": 0,
        "explanation": "料理が好きですから nêu lý do, không suy lý do khác.",
        "skill": "から",
        "standalone": true
      },
      {
        "id": "mr610-3",
        "prompt": "Công viên ra sao?",
        "choices": [
          "yên tĩnh nhưng xa ga",
          "nhộn nhịp và gần ga",
          "nhỏ và rẻ"
        ],
        "answer": 0,
        "explanation": "静かですが、駅から遠いです.",
        "skill": "tính từ",
        "standalone": true
      },
      {
        "id": "mr610-4",
        "prompt": "ペンで chỉ gì?",
        "choices": [
          "công cụ viết",
          "nơi viết",
          "người nhận"
        ],
        "answer": 0,
        "explanation": "で sau công cụ trong mẫu đã học.",
        "skill": "công cụ",
        "standalone": true
      },
      {
        "id": "mr610-5",
        "prompt": "Sách ở đâu?",
        "choices": [
          "trong túi",
          "trên bàn",
          "dưới ghế"
        ],
        "answer": 0,
        "explanation": "かばんの中にあります.",
        "skill": "vị trí",
        "standalone": true
      },
      {
        "id": "mr610-6",
        "prompt": "Gõ trợ từ: 友達＿公園へ行きます。 (đi cùng bạn)",
        "kind": "recall",
        "accepted": [
          "と"
        ],
        "choices": [
          "と",
          "Chưa khớp"
        ],
        "answer": 0,
        "explanation": "と chỉ người cùng thực hiện.",
        "skill": "と"
      },
      {
        "id": "mr610-7",
        "prompt": "Rủ bạn ăn trưa, câu phù hợp?",
        "choices": [
          "一緒に昼ごはんを食べませんか。",
          "昼ごはんを食べました。",
          "昼ごはんがありません。"
        ],
        "answer": 0,
        "explanation": "ませんか dùng làm lời mời trong ngữ cảnh.",
        "skill": "lời mời",
        "standalone": true
      },
      {
        "id": "mr610-8",
        "prompt": "Hana ở trong phòng. Câu nào giữ ý?",
        "choices": [
          "部屋にハナさんがいます。",
          "部屋にハナさんがあります。",
          "部屋にハナさんがいません。"
        ],
        "answer": 0,
        "explanation": "Người dùng います; いません đổi nghĩa phủ định.",
        "skill": "người/vật",
        "standalone": true
      }
    ]
  },
  {
    "range": "11-15",
    "end": 15,
    "title": "Lựa chọn cho ngày nghỉ",
    "text": "きのう、ノートを二冊買いました。本より安かったです。日曜日は図書館へ本を借りに行きたいです。今、友達に手紙を書いています。図書館で本を読んでもいいですが、写真を撮ってはいけません。",
    "reading": "きのう、のーとをにさつかいました。ほんよりやすかったです。にちようびはとしょかんへほんをかりにいきたいです。いま、ともだちにてがみをかいています。としょかんでほんをよんでもいいですが、しゃしんをとってはいけません。",
    "vi": "Hôm qua mua hai quyển vở, rẻ hơn sách. Chủ nhật muốn đi thư viện mượn sách. Hiện đang viết thư cho bạn. Ở thư viện được đọc nhưng không được chụp ảnh. 借ります: mượn, từ hỗ trợ.",
    "questions": [
      {
        "id": "mr1115-1",
        "prompt": "Đã mua gì và bao nhiêu?",
        "choices": [
          "hai quyển vở",
          "hai cuốn sách",
          "ba quyển vở"
        ],
        "answer": 0,
        "explanation": "ノートを二冊買いました.",
        "skill": "trợ số từ",
        "standalone": true
      },
      {
        "id": "mr1115-2",
        "prompt": "Vật nào rẻ hơn?",
        "choices": [
          "vở",
          "sách",
          "không rõ"
        ],
        "answer": 0,
        "explanation": "Chủ đề lược là vở: 本より安かった.",
        "skill": "so sánh",
        "standalone": true
      },
      {
        "id": "mr1115-3",
        "prompt": "Mục đích đến thư viện?",
        "choices": [
          "mượn sách",
          "chụp ảnh",
          "viết thư chắc chắn"
        ],
        "answer": 0,
        "explanation": "本を借りに chỉ mục đích chuyến đi.",
        "skill": "mục đích",
        "standalone": true
      },
      {
        "id": "mr1115-4",
        "prompt": "Người nói đang làm gì?",
        "choices": [
          "viết thư",
          "mua vở",
          "đọc sách"
        ],
        "answer": 0,
        "explanation": "今…書いています chỉ hành động đang diễn ra.",
        "skill": "tiếp diễn",
        "standalone": true
      },
      {
        "id": "mr1115-5",
        "prompt": "Có được chụp ảnh theo quy định này?",
        "choices": [
          "không",
          "có",
          "không bắt buộc"
        ],
        "answer": 0,
        "explanation": "てはいけません là cấm, không phải không cần.",
        "skill": "cấm/cho phép",
        "standalone": true
      },
      {
        "id": "mr1115-6",
        "prompt": "Gõ thể て của 書きます (Hiragana).",
        "kind": "recall",
        "accepted": [
          "かいて"
        ],
        "choices": [
          "かいて",
          "Chưa khớp"
        ],
        "answer": 0,
        "explanation": "書きます → 書いて, nhóm 1 き→いて.",
        "skill": "thể て"
      },
      {
        "id": "mr1115-7",
        "prompt": "Muốn có từ điển: chọn hai trợ từ trong 辞書＿欲しいです。",
        "choices": [
          "が",
          "を",
          "で"
        ],
        "answer": 0,
        "explanation": "Danh từ chỉ đối tượng mong muốn trong mẫu 欲しい dùng が.",
        "skill": "mong muốn",
        "standalone": true
      },
      {
        "id": "mr1115-8",
        "prompt": "Hôm qua yên tĩnh: chọn câu.",
        "choices": [
          "静かでした。",
          "静かかったです。",
          "静かです。"
        ],
        "answer": 0,
        "explanation": "Nhóm な dùng でした ở quá khứ lịch sự.",
        "skill": "quá khứ",
        "standalone": true
      }
    ]
  },
  {
    "range": "16-20",
    "end": 20,
    "title": "Chuẩn bị một buổi gặp",
    "text": "日曜日、友達と会う前に、部屋を掃除します。三時までに駅へ行かなければなりません。友達は日本語で歌うことができます。日本へ行ったことはありません。夜は音楽を聞いたり、本を読んだりします。",
    "reading": "にちようび、ともだちとあうまえに、へやをそうじします。さんじまでにえきへいかなければなりません。ともだちはにほんごでうたうことができます。にほんへいったことはありません。よるはおんがくをきいたり、ほんをよんだりします。",
    "vi": "Chủ nhật dọn phòng trước khi gặp bạn. Phải đến ga chậm nhất lúc 3 giờ. Bạn hát được bằng tiếng Nhật nhưng chưa từng đến Nhật. Buổi tối có các hoạt động như nghe nhạc, đọc sách.",
    "questions": [
      {
        "id": "mr1620-1",
        "prompt": "Dọn phòng lúc nào?",
        "choices": [
          "trước khi gặp bạn",
          "sau khi gặp bạn",
          "không xác định"
        ],
        "answer": 0,
        "explanation": "会う前に chỉ trước khi gặp.",
        "skill": "前に",
        "standalone": true
      },
      {
        "id": "mr1620-2",
        "prompt": "Phải đến ga khi nào?",
        "choices": [
          "chậm nhất lúc 3 giờ",
          "từ 3 giờ trở đi",
          "đến lúc nào cũng được"
        ],
        "answer": 0,
        "explanation": "までに là hạn chót, khác まで diễn tả kéo dài.",
        "skill": "hạn chót",
        "standalone": true
      },
      {
        "id": "mr1620-3",
        "prompt": "Bạn đã từng đến Nhật chưa?",
        "choices": [
          "chưa",
          "rồi",
          "không rõ"
        ],
        "answer": 0,
        "explanation": "行ったことはありません phủ định trải nghiệm.",
        "skill": "trải nghiệm",
        "standalone": true
      },
      {
        "id": "mr1620-4",
        "prompt": "Có thể khẳng định người bạn không hát được tiếng Nhật không?",
        "choices": [
          "không, đoạn nói hát được",
          "có"
        ],
        "answer": 0,
        "explanation": "歌うことができます là khả năng, không suy từ việc chưa đến Nhật.",
        "skill": "khả năng",
        "standalone": true
      },
      {
        "id": "mr1620-5",
        "prompt": "たり…たり có bắt buộc đúng thứ tự không?",
        "choices": [
          "không",
          "có"
        ],
        "answer": 0,
        "explanation": "Đây là liệt kê hoạt động tiêu biểu, không phải trình tự てから.",
        "skill": "たり",
        "standalone": true
      },
      {
        "id": "mr1620-6",
        "prompt": "Gõ thể từ điển của 来ます (Hiragana).",
        "kind": "recall",
        "accepted": [
          "くる"
        ],
        "choices": [
          "くる",
          "Chưa khớp"
        ],
        "answer": 0,
        "explanation": "来ます → 来る（くる）, bất quy tắc.",
        "skill": "từ điển"
      },
      {
        "id": "mr1620-7",
        "prompt": "Gõ thể thường quá khứ phủ định của 食べます.",
        "kind": "recall",
        "accepted": [
          "たべなかった",
          "食べなかった"
        ],
        "choices": [
          "たべなかった",
          "Chưa khớp"
        ],
        "answer": 0,
        "explanation": "食べる → 食べない → 食べなかった.",
        "skill": "thể thường"
      },
      {
        "id": "mr1620-8",
        "prompt": "Đổi 学生ではありません sang 学生だ có giữ ý không?",
        "choices": [
          "không, phủ định đã thành khẳng định",
          "có, chỉ đổi lịch sự"
        ],
        "answer": 0,
        "explanation": "Dạng thường phủ định là 学生ではない／学生じゃない.",
        "skill": "giữ ý",
        "standalone": true
      }
    ]
  }
];
export function buildAdditionalReviews(){return data.map(d=>({id:'mnn-review-'+d.range,number:'ÔN '+d.range,stage:'Hướng N5',chapter:'Ôn nhóm '+d.range,kind:'checkpoint',checkpoint:true,waitFor:'mnn-'+d.end,prerequisite:'mnn-'+d.end,title:d.title,subtitle:'Ngữ liệu mới · kiến thức/đọc · chưa có audio',minutes:20,glyph:'復',goal:'Kết hợp các chức năng đã học trong tình huống mới; ghi lượt làm sớm/sau nghỉ.',intro:'Làm không xem nghĩa trước. Đây là kiểm tra đọc/kiến thức tự soạn, chưa đo nghe/nói hoặc dự báo đỗ N5.',cards:[],words:[],notes:['Nghĩa Việt là trợ giúp; tự tránh mở trước khi đáp.','Chờ ít nhất 24 giờ sau bài cuối nhóm để kiểm tra nhớ sau khoảng nghỉ.','Câu sai vào lịch ôn chung. Không quy kết điểm này thành năng lực giao tiếp.'],activity:'Đọc, trả lời rồi tự viết một kế hoạch tương tự với dữ kiện khác.',reading:{text:d.text,reading:d.reading,vi:d.vi},application:{situation:d.title,speaking:'Tự nói lại thông tin chính rồi thay một dữ kiện; tự kiểm, chưa chấm nói.',writing:'Viết lại 3–4 câu cùng ý cho vai khác; ghi ý định tiếng Việt để giữ nghĩa.',criteria:['Đúng trình tự và dữ kiện.','Không đổi khẳng định/phủ định.','Đúng trợ từ theo vai trò.','Cách diễn đạt mở chưa được chấm độc lập.']},tasks:{speaking:'Kể lại không nhìn văn bản.',writing:'Viết tình huống đổi dữ kiện.'},sources:[{name:'3A bản 2 · phạm vi chức năng, không sao chép',url:'https://www.3anet.co.jp/np/resrcs/230000/'},{name:'TUFS · đối chiếu ngữ pháp',url:'https://www.coelang.tufs.ac.jp/mt/ja/gmod/steplist.html'}],questions:d.questions}));}
