// N5 integrated assessment supplement, part 2.
// New project-authored assessment material for the remaining N5 lesson words.

const lessonId = (lesson) => `mnn-${String(lesson).padStart(2, '0')}`;

const link = (lesson, words, kind = 'meaning') =>
  words.map((wordKey) => ({ wordKey, usageId: `${lessonId(lesson)}:${wordKey}`, kind }));

const q = (id, lesson, prompt, choices, answer, explanation, words, skill = 'từ theo ngữ cảnh') => ({
  id,
  assessment: true,
  sourceLessonId: lessonId(lesson),
  validationStatus: 'N5 integrated assessment supplement 2; project-authored new sentences; not independently reviewed',
  prompt,
  choices,
  answer,
  explanation,
  skill,
  wordLinks: link(lesson, words),
  assessmentScope: 'Integrated reading/context items cover linked words in a new passage; not separate proof for every word or skill.',
});

const lesson = (n, title, goal, intro, questions, notes = []) => ({
  id: `n5-assessment-supp2-${String(n).padStart(2, '0')}`,
  number: `ĐÁNH GIÁ N5 ${String(n).padStart(2, '0')} B`,
  stage: 'Đánh giá N5',
  level: 'N5',
  track: 'assessment',
  chapter: 'Đánh giá tích hợp bổ sung 2',
  kind: 'assessment',
  assessmentFor: `mnn-${String(n).padStart(2, '0')}`,
  checkpoint: false,
  prerequisite: null,
  minutes: 12,
  glyph: '評',
  title,
  subtitle: 'Đọc ngữ liệu mới · liên kết mục từ đã học',
  goal,
  intro,
  cards: [],
  words: [],
  notes,
  activity: 'Đọc, trả lời, xem giải thích, rồi tự kiểm lại sau một buổi khác.',
  sources: [{ name: 'Học liệu đánh giá dự án tự soạn; không phải đề JLPT chính thức', url: 'https://www.jlpt.jp/e/samples/forlearners.html' }],
  questions,
  listeningTasks: [],
});

export const n5AssessmentSupplement2 = [
  lesson(
    1,
    'Thông tin liên lạc và biểu cảm hội thoại',
    'Hiểu hội thoại điện thoại và các biểu cảm thường ngày.',
    'Đọc hai đoạn hội thoại mới. Chú ý もしもし/ええ/えーと và các mức lịch sự.',
    [
      q(
        'n5s201-phone',
        1,
        'Đọc hội thoại mới:\n学生「もしもし、田中です。お姉さんですか。」\n姉「ええ、そうです。どうなさいましたか。」\n学生「えーと、明日の電話番号と連絡先をメールで送ってください。お願いします。」\n姉「ごめん、ちょっと待ってください。……はい、送りました。」\n学生「それはどういう意味ですか。」\n姉「同じクラスの友達です。」\n学生「なるほど、分かりました。本当に助かりました。」\n\n学生は姉に何をしてもらいましたか。',
        ['電話番号と連絡先をメールで送ることです。', 'パソコンを買うことです。', '一緒に学校へ行くことです。'],
        0,
        '学生は「電話番号と連絡先をメールで送ってください」と頼みました。',
        ['もしもし', 'ええ', 'えーと', 'ごめん', 'どういう', '同じ', 'なるほど', '本当に', '電話番号', 'メール', '連絡先', 'お願いします', 'よろしくお願いします', 'お姉さん']
      ),
      q(
        'n5s201-family-pc',
        1,
        'Đọc đoạn mới:\nおじいさんはパソコンでニュースを見ます。姉は学校から帰ります。帰りは七時です。私は「どうもありがとうございます」と言いました。姉は「どうぞ、入ってください」と言いました。\n\nおじいさんは何でニュースを見ますか。',
        ['パソコンです。', 'テレビです。', 'ラジオです。'],
        0,
        '「おじいさんはパソコンでニュースを見ます」と述べられています。',
        ['おじいさん', 'パソコン', '帰り', 'どうも', 'どうぞ', 'ありがとうございます']
      ),
      q(
        'n5s201-politeness',
        1,
        'Đọc các câu mới:\n「けっこうです。これで十分です。」「もちろん行きますよ。」「ぜひ来てくださいね。」「それでは、これで終わります。」「じゃあ、明日学校で。」\n\n「それでは」の次に何と言いましたか。',
        ['これで終わります。', 'お願いします。', 'すみません。'],
        0,
        '「それでは、また」と続く別れの挨拶です。',
        ['けっこう', 'もちろん', 'ぜひ', 'それでは', 'じゃあ']
      ),
    ],
    ['Hội thoại điện thoại là ngữ liệu đánh giá; không kết luận phát âm hoặc phản xạ nói.']
  ),

  lesson(
    2,
    'Đồ vật và chỉ định',
    'Hiểu hội thoại chỉ đồ vật và vị trí.',
    'Đọc đoạn mới về đồ vật trên bàn.',
    [
      q(
        'n5s202-necktie',
        2,
        'Đọc đoạn mới:\n学生「これは何ですか。」\n先生「それはネクタイです。」\n学生「へえ、いいですね。」\n\n先生は何と言いましたか。',
        ['それはネクタイです。', 'これはくつ下です。', 'あれはカメラです。'],
        0,
        '先生は「それはネクタイです」と答えました。',
        ['ネクタイ']
      ),
    ]
  ),

  lesson(
    3,
    'Số, tầng và phương hướng',
    'Đọc chỉ dẫn trong cửa hàng và phân biệt số tiền, tầng.',
    'Đọc đoạn mới về trung tâm mua sắm.',
    [
      q(
        'n5s203-floors',
        3,
        'Đọc đoạn mới:\nここは駅前のデパートです。一階は食料品、二階は服、三階は本です。トイレは何階ですか。「あちらです。」「どちらの階段ですか。」「そちらの階段を上がって、右です。」「あそこですね。」「はい、その階段です。」\n\nトイレは何階ですか。',
        ['三階です。', '一階です。', '二階です。'],
        0,
        '「三階は本です」と述べられ、トイレは「あちら」＝三階です。会話の流れから三階と分かります。',
        ['そこ', 'あそこ', 'どこ', 'どちら', 'そちら', 'あちら', '何階', 'ここ', 'こちら']
      ),
      q(
        'n5s203-price',
        3,
        'Đọc tiếp:\n「これはいくらですか。」「どれがいいですか。」「こちらは千六百円、あちらは七千八百円です。」「日本では高いですね。」「何回も来ましたか。」「いいえ、はじめてです。」\n\nこちらの商品はいくらですか。',
        ['千六百円です。', '七千八百円です。', '一万円です。'],
        0,
        '「こちらは千六百円、あちらは七千八百円です」と述べられています。',
        ['千', '万', '六', '七', '八', '日本', '何回', 'どれ']
      ),
    ]
  ),

  lesson(
    4,
    'Thời gian và trình tự',
    'Hiểu trình tự thời gian và các trạng từ thời gian.',
    'Đọc đoạn mới về lịch sinh hoạt.',
    [
      q(
        'n5s204-schedule',
        4,
        'Đọc đoạn mới:\n今晩、七時に夕方のパーティーがあります。あさって、友達と会います。夜中まで勉強します。一日中、日本語を話します。ときどき休みます。五分休みます。すぐに終わります。そして、あとで本を読みます。はじめに、名前と日付を書きます。それから、日時を確認します。これから出かけます。来年、日本へ行きます。今度、また会いましょう。\n\nパーティーはいつですか。',
        ['今晩です。', 'あさってです。', '来年です。'],
        0,
        '「今晩、七時に夕方のパーティーがあります」と述べられています。',
        ['今晩', '夕方', '夜中', '一日中', 'ときどき', '五分', 'すぐに', 'そして', 'あと', 'はじめに', 'それから', '日時', 'これから', '来年', '今度', 'あさって']
      ),
      q(
        'n5s204-first-step',
        4,
        'Đọc lại và trả lời:\nはじめに、名前と日付を書きます。それから、日時を確認します。これから出かけます。\n\nまず何をしますか。',
        ['名前を書きます。', '日時を確認します。', '出かけます。'],
        0,
        '「はじめに名前を書きます」と述べられています。',
        ['はじめに', 'それから', 'これから']
      ),
    ]
  ),

  lesson(
    5,
    'Đi lại và thời gian di chuyển',
    'Hiểu phương tiện và tần suất đi lại.',
    'Đọc đoạn mới về đi lại.',
    [
      q(
        'n5s205-transport',
        5,
        'Đọc đoạn mới:\n駅まで歩いて行きます。いつ行きますか。「何日にしますか。」「毎月、日本語の試験を受けます。毎年、故郷に帰ります。はじめて電車に乗ります。終点まで行きます。バイクで行きますか。」\n\n駅まで何で行きますか。',
        ['歩いて行きます。', 'バイクで行きます。', '電車で行きます。'],
        0,
        '「駅まで歩いて行きます」と述べられています。',
        ['歩いて', 'いつ', '何日', '毎月', '毎年', 'はじめて', '終点', 'バイク']
      ),
      q(
        'n5s205-frequency',
        5,
        'Đọc lại và trả lời:\n毎月、日本語の試験を受けます。毎年、故郷に帰ります。\n\n日本語の試験はどのぐらい受けますか。',
        ['毎月です。', '毎年です。', '一度だけです。'],
        0,
        '「毎月、日本語の試験を受けます」と述べられています。',
        ['毎月', '毎年']
      ),
    ]
  ),

  lesson(
    6,
    'Bữa ăn và đồ uống',
    'Hiểu các món ăn, đồ uống và lời cảm ơn sau bữa ăn.',
    'Đọc đoạn mới về bữa ăn trong ngày.',
    [
      q(
        'n5s206-meals',
        6,
        'Đọc đoạn mới:\n朝、コーヒーを飲みます。昼、サラダとすしを食べます。夜、ケーキを食べます。「ごちそうさまでした」と言います。家でアニメを見ます。お弁当を持って学校へ行きます。\n\n朝、何を飲みますか。',
        ['コーヒーです。', 'お茶です。', '牛乳です。'],
        0,
        '「朝、コーヒーを飲みます」と述べられています。',
        ['コーヒー', 'サラダ', 'すし', 'ケーキ', 'ごちそうさまでした', 'アニメ', 'お弁当']
      ),
      q(
        'n5s206-thanks',
        6,
        'Đọc lại và trả lời:\n夜、ケーキを食べました。それから「どうもごちそうさまでした」と言いました。\n\nご飯の後、何と言いましたか。',
        ['どうもごちそうさまでした。', 'いただきます。', 'おやすみなさい。'],
        0,
        '「どうもごちそうさまでした」と言いました。',
        ['ごちそうさまでした']
      ),
    ]
  ),

  lesson(
    8,
    'Miêu tả và sức khỏe',
    'Hiểu mô tả phòng và lời khuyên sức khỏe.',
    'Đọc đoạn mới về nhà thuốc và phòng ở.',
    [
      q(
        'n5s208-pharmacy',
        8,
        'Đọc đoạn mới:\n薬局で風邪薬を買います。風邪をひかないように、気をつけてください。お大事に。この部屋はとても広いです。目は大きいですが、耳と口は小さいです。\n\n薬はどこで買いますか。',
        ['薬局です。', '病院です。', 'スーパーです。'],
        0,
        '「薬局で薬を買います」と述べられています。',
        ['薬局', '気をつける', 'お大事に', '広い', '目', '耳', '口']
      ),
    ]
  ),

  lesson(
    11,
    'Đồ dùng và thời gian trong ngày',
    'Hiểu danh sách đồ dùng và thời gian nghỉ.',
    'Đọc danh sách mới và giờ nghỉ.',
    [
      q(
        'n5s211-household',
        11,
        'Đọc đoạn mới:\n店でタオルと歯ブラシとシャンプーと石けんとトイレットペーパーを買います。カレンダーは受付にあります。昼休みは十二時から一時までです。\n\n店で何をたくさん買いましたか。',
        ['タオル、歯ブラシ、シャンプー、石けん、トイレットペーパーです。', '本とノートとペンです。', 'パンと牛乳と卵です。'],
        0,
        'Câu đầu liệt kê các đồ dùng đã mua.',
        ['タオル', '歯ブラシ', 'シャンプー', '石けん', 'トイレットペーパー', 'カレンダー', '昼休み']
      ),
    ]
  ),

  lesson(
    12,
    'Thời tiết',
    'Hiểu diễn biến thời tiết trong ngày.',
    'Đọc đoạn mới về thời tiết buổi sáng và chiều.',
    [
      q(
        'n5s212-weather-change',
        12,
        'Đọc đoạn mới:\n朝はくもりますが、午後から晴れます。夕方、またくもるかもしれません。\n\n午後からどうなりますか。',
        ['晴れます。', '雨が降ります。', '雪が降ります。'],
        0,
        '「午後から晴れます」と述べられています。',
        ['くもる', '晴れる']
      ),
    ]
  ),

  lesson(
    16,
    'Mô tả người',
    'Hiểu mô tả thói quen buổi sáng và ngoại hình.',
    'Đọc đoạn mới về buổi sáng và tóc.',
    [
      q(
        'n5s216-morning',
        16,
        'Đọc đoạn mới:\n朝シャワーを浴びます。髪は短いです。それから服を着ます。\n\n朝、まず何をしますか。',
        ['朝シャワーを浴びます。', '髪を洗います。', '服を着ます。'],
        0,
        '「朝、シャワーを浴びます」と述べられています。',
        ['浴びます', '短い']
      ),
    ]
  ),

  lesson(
    21,
    'Nhận xét và lợi ích',
    'Hiểu nhận xét về công dụng của đồ vật.',
    'Đọc câu mới về từ điển.',
    [
      q(
        'n5s221-dictionary',
        21,
        'Đọc câu mới:\nこの辞書は本当に役に立ちます。毎日使います。\n\nこの辞書はどうですか。',
        ['本当に役に立ちます。', 'あまり役に立ちません。', '高くないです。'],
        0,
        '「この辞書は本当に役に立ちます」と述べられています。',
        ['本当', '役に立ちます']
      ),
    ]
  ),

  lesson(
    22,
    'Hẹn gặp và quần áo',
    'Hiểu lý do hẹn gặp và màu quần áo.',
    'Đọc đoạn mới về cuộc hẹn và mua quần áo.',
    [
      q(
        'n5s222-appointment',
        22,
        'Đọc đoạn mới:\n友達と約束があります。用事で行きます。赤い服と青いズボン、スカートを買います。\n\n友達と何をしましたか。',
        ['約束をしました。', '買い物をしました。', '旅行をしました。'],
        0,
        '「友達と約束があります」と述べられています。',
        ['約束', '用事', '赤い', '青い', '服', 'ズボン', 'スカート']
      ),
    ]
  ),

  lesson(
    23,
    'Đường đi và nút bấm',
    'Hiểu chỉ dẫn đường đi và hành động với nút bấm.',
    'Đọc chỉ dẫn mới.',
    [
      q(
        'n5s223-directions',
        23,
        'Đọc đoạn mới:\nこの道をまっすぐ行きます。橋を渡って、信号を右に曲がります。ボタンを押して、ドアを開けます。電気を消して、部屋を出ます。\n\nどの道を行きますか。',
        ['まっすぐ行きます。', '左に曲がります。', '橋を渡りません。'],
        0,
        '「この道をまっすぐ行きます」と述べられています。',
        ['道', 'まっすぐ', '橋', '信号', '押します', 'ボタン', '開きます', '電気', '消します']
      ),
    ]
  ),

  lesson(
    24,
    'Gửi và cảm ơn',
    'Hiểu việc gửi tin nhắn và bày tỏ cảm ơn.',
    'Đọc đoạn mới về liên lạc với thầy cô.',
    [
      q(
        'n5s224-send',
        24,
        'Đọc đoạn mới:\n先生にメールを送ります。感謝を伝えます。\n\n先生に何を送りますか。',
        ['メールです。', '手紙です。', '荷物です。'],
        0,
        '「先生にメールを送ります」と述べられています。',
        ['送ります', '感謝']
      ),
    ]
  ),
];