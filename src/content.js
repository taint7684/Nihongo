import{wordSourceTypes}from './word-source-types.js';
import{grammarSourceReviews}from './grammar-source-reviews.js';
import{wordMeaningReviews}from './word-meaning-reviews.js';
import{sourceWordReviews}from './source-review-overrides.js';
import{kanjiHanViet}from './kanji-hanviet-source.js';
import{n4CapstoneLesson}from './n4-capstone.js';
import{buildN4Comprehensive}from './n4-comprehensive.js';
import{buildN4Assessment,buildN4SecondAssessment,buildN4MiddleAssessment,buildN4LaterAssessment,buildN4LastAssessment}from './n4-assessment.js';
import{buildReadinessB}from './readiness-bank.js';
import{buildAssessmentExpansion}from './assessment-expansion.js';
import{buildFinalReviews}from './final-review.js';
import{buildAdditionalReviews}from './group-reviews.js';
import{buildMnn,buildGroupReview}from './mnn-course.js';
import{buildIntro,buildN5}from './intro-course.js';
export const sources = [
  { name: 'TUFS · Nguyên âm tiếng Nhật', url: 'https://www.coelang.tufs.ac.jp/ja/en/pmod/practical/01-07-01.php' },
  { name: 'Kyoto University · Nhóm あ', url: 'https://www.samidori.k.kyoto-u.ac.jp/study/exam?id=41' },
];
const q = (id, prompt, choices, answer, explanation, skill) => ({ id, prompt, choices, answer, explanation, skill });
export const lessons = [
  {
    id: 'hira-1', number: '01', title: 'Ba chữ đầu tiên', subtitle: 'Làm quen あ・い・う', minutes: 15, glyph: 'あ', prerequisite: null,
    goal: 'Nhận diện あ・い・う và nối với ký hiệu a, i, u khi thay đổi thứ tự.',
    intro: 'Bạn không cần thuộc cả bảng chữ hôm nay. Bắt đầu với ba hình chữ, thử nhớ lại, rồi quay lại vào buổi sau.',
    cards: [{ kana: 'あ', latin: 'a' }, { kana: 'い', latin: 'i' }, { kana: 'う', latin: 'u' }],
    notes: ['Hiragana là một hệ chữ ghi âm của tiếng Nhật. Bài này chỉ học ba chữ đầu.', 'a, i, u là ký hiệu Latin hỗ trợ ghi âm, không phải nghĩa của các chữ.', 'Ký hiệu u không có nghĩa phát âm y hệt “u” tiếng Việt. Bài chữ này chưa chứng minh khả năng phát âm.'],
    activity: 'Nhìn từng chữ và ký hiệu. Che ký hiệu bằng nút bên dưới rồi tự nhớ. Sau đó đọc lại theo thứ tự う → あ → い. Không cần đo tốc độ.',
    questions: [
      q('h1-1', 'Chữ nào nối với ký hiệu i?', ['あ', 'う', 'い'], 2, 'い nối với i. Đừng chỉ nhớ vị trí của chữ trong bảng.', 'い'),
      q('h1-2', 'う nối với ký hiệu nào?', ['u', 'a', 'i'], 0, 'う nối với u. Đây là nhận diện chữ, chưa phải đánh giá phát âm.', 'う'),
      q('h1-3', 'Chữ nào nối với ký hiệu a?', ['い', 'あ', 'う'], 1, 'あ nối với a.', 'あ'),
      q('h1-4', 'Chuỗi うい tương ứng với?', ['i–u', 'u–i', 'a–i'], 1, 'Đọc từng chữ theo thứ tự: う → u, い → i. Đây là chuỗi luyện, không gán nghĩa từ.', 'う'),
      q('h1-5', 'Nhận diện đúng chữ đã chứng minh phát âm đúng chưa?', ['Đã chứng minh', 'Chưa chứng minh'], 1, 'Chữ, nghe và phát âm cần những bằng chứng riêng.', 'nhận diện'),
    ],
  },
  {
    id: 'hira-2', number: '02', title: 'Trọn nhóm nguyên âm', subtitle: 'Thêm え・お, gặp lại chữ cũ', minutes: 15, glyph: 'え', prerequisite: 'hira-1',
    goal: 'Phân biệt え・お và nhận diện cả năm chữ あ・い・う・え・お.',
    intro: 'Thêm hai chữ mới, dùng lại ba chữ cũ. Nếu còn nhầm, giảm chữ mới và xem lại lời giải; không có cuộc đua hoàn thành.',
    cards: [{ kana: 'え', latin: 'e' }, { kana: 'お', latin: 'o' }, { kana: 'あ', latin: 'a' }, { kana: 'い', latin: 'i' }, { kana: 'う', latin: 'u' }],
    notes: ['え nối với e; お nối với o. Năm chữ này ghi các nguyên âm cơ bản.', 'Quan sát toàn bộ hình chữ. あ và お có thể dễ nhầm khi mới học, hãy đối chiếu cạnh nhau.', 'Không cần viết tay đẹp hoặc biết từ vựng mới để hoàn thành bài nhận diện này.'],
    activity: 'Che ký hiệu, thử đọc お → え → あ → う → い. Sau đó chọn hai chữ khó nhất để xem lại. Hoạt động này là tự luyện, không tự chấm phát âm.',
    questions: [
      q('h2-1', 'Chữ nào nối với e?', ['お', 'え', 'あ'], 1, 'え nối với e; お nối với o.', 'え'),
      q('h2-2', 'お nối với ký hiệu nào?', ['a', 'e', 'o'], 2, 'お nối với o. So sánh lại với あ → a nếu bạn nhầm.', 'お'),
      q('h2-3', 'Chọn chuỗi e–o.', ['おえ', 'えお', 'あお'], 1, 'え → e, お → o, nên e–o là えお.', 'え'),
      q('h2-4', 'Chọn chuỗi u–a.', ['うあ', 'あう', 'いあ'], 0, 'う → u rồi あ → a. Nhóm chữ cũ vẫn xuất hiện trong bài mới.', 'あ'),
      q('h2-5', 'いえ tương ứng với chuỗi ký hiệu nào?', ['e–i', 'a–e', 'i–e'], 2, 'い → i, え → e. Ở đây ta chỉ kiểm tra cách nối chữ.', 'い'),
    ],
  },
  {
    id: 'hira-3', number: '03', title: 'Đọc khi đổi thứ tự', subtitle: 'Nhớ lại và gõ năm chữ đã học', minutes: 15, glyph: 'お', prerequisite: 'hira-2',
    goal: 'Nối các chữ đã học theo thứ tự mới; hiểu cách bắt đầu gõ Hiragana.',
    intro: 'Hôm nay không thêm chữ. Bạn dùng lại năm chữ trong chuỗi mới và làm quen thao tác gõ trên Windows.',
    cards: [{ kana: 'お', latin: 'o' }, { kana: 'い', latin: 'i' }, { kana: 'え', latin: 'e' }, { kana: 'あ', latin: 'a' }, { kana: 'う', latin: 'u' }],
    notes: ['Chuỗi trong bài là bài tập ghép chữ. Không tự suy ra nghĩa từ chỉ từ hình chữ.', 'Trên Windows, thêm bàn phím Japanese trong Settings → Time & language → Language & region. Chọn Microsoft IME, chế độ Hiragana (あ). Nhãn có thể khác theo phiên bản Windows.', 'Ở chế độ nhập Romaji của IME, gõ a, i, u, e, o rồi Enter để xác nhận kana. Nếu chưa cài bộ gõ, dùng bàn phím hỗ trợ trong bài; hai cách đều được, không chấm là kỹ năng gõ máy thật.'],
    activity: 'Thử tự gõ おい trong ô luyện bên dưới, hoặc dùng các phím hỗ trợ. Xóa rồi thử lại không nhìn ký hiệu. Chưa cần Kanji, từ vựng hoặc ngữ pháp.',
    questions: [
      q('h3-1', 'Chọn chuỗi o–i–a.', ['おいあ', 'あいお', 'おうあ'], 0, 'お → o, い → i, あ → a.', 'お'),
      q('h3-2', 'えう tương ứng với?', ['u–e', 'e–u', 'i–u'], 1, 'え → e rồi う → u.', 'う'),
      q('h3-3', 'Chọn chuỗi a–e–o.', ['えあお', 'あおえ', 'あえお'], 2, 'あ → a, え → e, お → o.', 'え'),
      q('h3-4', 'Để biết mình còn nhớ sau vài ngày, nên làm gì?', ['Chỉ xem lại bảng', 'Tự trả lời trước khi mở đáp án'], 1, 'Nhớ lại trước khi xem cho bằng chứng khác với việc nhận thấy chữ quen.', 'tự học'),
      q('h3-5', 'Bàn phím hỗ trợ trong bài chứng minh bạn đã dùng được IME Windows chưa?', ['Có', 'Chưa'], 1, 'Chọn chữ bằng phím hỗ trợ không chứng minh thao tác IME thật.', 'tự học'),
    ],
  },
];
lessons.push({id:'n5-intro',number:'04',title:'Một câu giới thiệu',subtitle:'Bước mở đầu N5 · Nです',minutes:15,glyph:'名',prerequisite:'hira-3',goal:'Hiểu câu giới thiệu tên rất ngắn và phân biệt khẳng định với phủ định có hỗ trợ cách đọc.',intro:'Bài cầu nối có hỗ trợ đọc. Chưa phải toàn bộ nền kana hoặc khóa N5. Học mẫu trong ngữ cảnh trước, không suy rộng mọi cách dùng của です.',cards:[{kana:'アンです。',latin:'An desu · Tôi là An.'},{kana:'学生です。',latin:'Gakusei desu · (Tôi) là học sinh/sinh viên.'}],notes:['N là danh từ. Trong ngữ cảnh giới thiệu bản thân, tên + です có thể dùng để nói mình là ai; thông tin đã rõ có thể được lược bỏ.','学生（がくせい） nghĩa là học sinh/sinh viên. です tạo cách nói lịch sự trong khung câu đang học. Không coi です là bản dịch một-một của “là” trong mọi câu.','Nではありません là dạng phủ định lịch sự trong khung này. 学生ではありません。: (Tôi) không phải học sinh/sinh viên. Bài này chưa yêu cầu tự chia động từ.'],activity:'Tưởng tượng bạn được hỏi tên. Dùng mẫu tên + です。 rồi tự viết lại trong sổ tay. Đây là hoạt động tự luyện; không tự chấm câu mở là đúng.',sources:[{name:'TUFS · Nです／Nではありません',url:'https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/explanation/001.html'}],questions:[q('n5-1','Trong ngữ cảnh giới thiệu, アンです。 nghĩa là gì?',['Tôi là An.','Tôi không phải An.','An ở đâu?'],0,'Tên + です có thể dùng giới thiệu bản thân; ở đây người nói là An.','Nです'),q('n5-2','Chọn cách nói phủ định của 学生です。',['学生です。','学生ではありません。','アンです。'],1,'Trong khung danh từ này, ではありません diễn đạt phủ định lịch sự.','Nではありません'),q('n5-3','Nhận định nào đúng?',['です luôn dịch là “là” trong mọi câu.','Đúng ba câu này nghĩa là đã đạt N5.','Bài này chỉ luyện một khung danh từ trong ngữ cảnh.'],2,'Không suy rộng mẫu câu hoặc kết quả một bài ngắn thành toàn bộ năng lực.','giới hạn')]});
lessons.push(...buildIntro(),...buildN5());
lessons.push({id:'kana-confusions',number:'CỦNG CỐ',track:'reinforcement',stage:'Củng cố',chapter:'Chữ dễ nhầm',kind:'kana',title:'Chữ giống nhau, nhìn kỹ toàn hình',subtitle:'Tự chọn, không khóa tuyến chính',minutes:10,glyph:'シ',prerequisite:null,goal:'Phân biệt シ/ツ, ソ/ン, ぬ/め và ね/れ/わ trong chữ và từ.',intro:'Chỉ cần mở khi có lỗi nhận diện hoặc muốn tự kiểm. Không phải điều kiện hoàn thành lộ trình chính.',cards:[{kana:'シ / ツ',latin:'shi / tsu'},{kana:'ソ / ン',latin:'so / n'},{kana:'ぬ / め',latin:'nu / me'},{kana:'ね / れ / わ',latin:'ne / re / wa'}],notes:['Đối chiếu toàn bộ hình chữ và hướng các nét trong mẫu font đang dùng; không đoán từ một chấm.','Chữ in và chữ viết tay có biến thể. Bài này không dùng ảnh tự vẽ làm chuẩn nét viết.','Gõ ねこ (neko): con mèo. Đừng đổi ね thành れ hoặc わ chỉ vì hình giống.'],words:[{text:'ねこ',reading:'neko',meaning:'con mèo'}],activity:'Che một nửa cặp, gõ chữ ứng với ký hiệu, rồi thử trong từ. Nếu sai, quay lại nhóm tương ứng thay vì học lại tất cả.',sources:[{name:'Japan Foundation · tài liệu nhập môn',url:'https://www.irodori.jpf.go.jp/en/starter/pdf.html'}],questions:[{id:'cf-1',kind:'recall',accepted:['シ'],prompt:'Tự nhớ: gõ shi bằng Katakana.',choices:['シ','Chưa khớp'],answer:0,explanation:'シ ghi shi; ツ ghi tsu.',skill:'シ/ツ'},{id:'cf-2',kind:'recall',accepted:['ン'],prompt:'Tự nhớ: gõ n bằng Katakana.',choices:['ン','Chưa khớp'],answer:0,explanation:'ン ghi n; ソ ghi so.',skill:'ソ/ン'},{id:'cf-3',kind:'recall',accepted:['ねこ'],prompt:'Gõ từ con mèo theo mẫu đã học (Hiragana).',choices:['ねこ','Chưa khớp'],answer:0,explanation:'ねこ ghi neko, không phải れこ hoặc わこ.',skill:'ね/れ/わ'}]});
const voiced=lessons.find(l=>l.id==='sound-voiced');voiced.notes.push('Bảng đối chiếu đầy đủ: がぎぐげご (ga gi gu ge go); ざじずぜぞ (za ji zu ze zo); だぢづでど (da ji zu de do); ばびぶべぼ (ba bi bu be bo). Katakana: ガギグゲゴ／ザジズゼゾ／ダヂヅデド／バビブベボ. じ/ぢ, ず/づ không tự tráo cách viết từ.');
const glide=lessons.find(l=>l.id==='sound-glide');glide.notes.push('Các nhóm thường gặp khác: にゃにゅにょ (nya nyu nyo), ひゃひゅひょ (hya hyu hyo), みゃみゅみょ (mya myu myo), りゃりゅりょ (rya ryu ryo), ぎゃぎゅぎょ (gya gyu gyo), じゃじゅじょ (ja ju jo), びゃびゅびょ (bya byu byo), ぴゃぴゅぴょ (pya pyu pyo). Áp dụng chữ nhỏ tương ứng trong Katakana.');
lessons.push(...buildMnn(),buildGroupReview(),...buildAdditionalReviews(),...buildFinalReviews(),...buildAssessmentExpansion(),buildReadinessB(),buildN4Assessment(),buildN4SecondAssessment(),buildN4MiddleAssessment(),buildN4LaterAssessment(),buildN4LastAssessment(),buildN4Comprehensive(),n4CapstoneLesson);
for(const l of lessons)if(l.id.startsWith('n5-')&&!l.id.startsWith('n5-assessment-')&&!l.id.startsWith('n5-practice-'))l.track='explore';
for(const l of lessons)for(const k of l.kanji||[])if(kanjiHanViet[k.char]?.length){k.hanViet=kanjiHanViet[k.char].join(' · ');k.hanVietSource='KANJIDIC2 / EDRDG CC BY-SA 4.0; source date 2026-11-12';}
for(const l of lessons)for(const w of l.words||[]){const r=sourceWordReviews[l.id+':'+w.text];if(r){w.type=r.type;w.sourceReview=r;}else if(['この','その','あの','どの'].includes(w.text)){w.type='từ chỉ định trước danh từ (連体詞)';w.typeSource='JMdict/TUFS: chỉ sửa loại từ, chưa rà toàn nghĩa/ví dụ';}}
for(const l of lessons)for(const w of l.words||[]){if(!w.sourceReview){const r=wordMeaningReviews[w.text+'|'+w.reading+'|'+w.meaning];if(r)w.sourceReview=r;}if(/^[a-zA-Zāīūēōūō -]+$/.test(w.reading||'')&&/^[ぁ-ゖァ-ヶー]+$/.test(w.text)){w.romaji=w.reading;w.reading=w.text;w.readingCorrection='Tách romaji khỏi trường kana; giữ khóa mục từ và dữ liệu cũ';}}
for(const l of lessons)for(const[g,i]of(l.grammar||[]).map((g,i)=>[g,i])){const r=grammarSourceReviews[l.id+'-g'+i];if(r)g.sourceReview={...r,date:'2026-11-12',status:'Đối chiếu nguồn trong phạm vi ghi rõ; AI biên soạn rà, chưa người duyệt độc lập'};if(l.id==='mnn-37'&&i===0&&!g.explanation.includes('う→わ'))g.explanation+=' Nhóm1 cóう→わ: 買う→買われる. 来る→来られる đọcこられる trong mẫu bị động; する→される.';}
for(const l of lessons)for(const w of l.words||[]){if(!w.sourceReview){const r=wordMeaningReviews[w.text+'|'+w.reading+'|'+w.meaning];if(r)w.sourceReview=r;}}
for(const l of lessons)for(const w of l.words||[]){const t=wordSourceTypes[l.id+':'+w.text];if(t&&t!=='loại từ chưa đối chiếu đầy đủ'){w.type=t;w.typeSource='JMdict selected sense POS; labels translated by project, not independent academic review';}}
export const allQuestions = lessons.flatMap(l => l.questions.map(q => ({ ...q, lessonId: l.id })));
export const questionById = id => allQuestions.find(q => q.id === id);
