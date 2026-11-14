import{n4VocabularyBatch01}from'./n4-vocabulary-batch-01.js';
import{n4VocabularyBatch02}from'./n4-vocabulary-batch-02.js';
import{n4VocabularyBatch03}from'./n4-vocabulary-batch-03.js';
import{arrangeNewChoices}from'./new-choice-order.js';

const batches=[n4VocabularyBatch01,n4VocabularyBatch02,n4VocabularyBatch03];
const contexts=[
  ['01','public-procedures','市役所の窓口で手続きをします。市内の市立公共施設の申込書は無料ですが、本人が免許証、パスポート、ビザなどの書類を出し、係員と担当者に申し込みます。有料の部屋は金額と期間を確認し、変更や問い合わせは窓口へ。指定日に受け取る前に、申し込む人が申込内容を確認してください。','有料の部屋を申し込む人は、何を確認しますか。',['金額と期間','震度と震源','食後と睡眠'],'案内では、有料の部屋を申し込む場合に金額と期間を確認します。無料の施設と混同しません。'],
  ['01','medical-communication','健康診断の問診票には、症状としてせき、くしゃみ、鼻水、吐き気、下痢、腹痛、胃の痛み、だるさ、けがや傷を書きます。花粉症やアレルギー、インフルエンザ、ストレス、睡眠、食欲、食後の様子も伝えます。転んで骨をぶつけた人は、そのことも話します。レントゲン、予防接種、処方せん、かぜ薬については医療機関に確認し、手洗い、うがいも案内に従います。','この問診票は何のために使いますか。',['症状や健康診断で伝える情報をまとめる','旅行の金額を比べる','災害時の避難場所を決める'],'問診票は症状や既往の情報を医療機関へ伝えるための架空の学習文です。薬や検査の選択はこの設問では扱いません。'],
  ['01','emergency-safety','防災訓練では火災や災害の時、震源と震度、津波の情報を聞きます。煙が見えたらあわてず落ち着き、消防署の案内で非常口から屋外へ逃げ、必要なら救急車を呼びます。倒れた人を助ける時は安全を確かめ、ヘルメット、懐中電灯、ろうそく、毛布、容器を使う訓練もします。消火器の場所、優先する出口、立入禁止、通行止め、工事中の表示を確認します。','避難の時にまず従うものは何ですか。',['消防署などの案内と安全な出口','工事中の道へ入ること','煙の中で急いで走ること'],'案内と安全な出口を確認し、危険な場所を避けるのが本文の要点です。'],
  ['02','interaction-emotion','このあいだ、彼女は親との関係について話しました。気分が怖くて悲しい日もあるけれど、うれしいことや興味があることもあります。友達のおかげで少し元気になり、うそをつかずに気持ちを伝えました。具合が悪い時は遠慮せず相談します。決して一人で悩まないで、生きるために必要な助けを受けていいのです。','友達の助けを受けた後、彼女はどうしましたか。',['うそをつかず気持ちを伝えた','興味のあることを全部やめた','親との関係を決して話さなかった'],'本文では、おかげで元気になった後、うそをつかず気持ちを伝えたとあります。けれど／決しても文脈に沿って読みます。'],
  ['02','change-comparison','先月と比べると、店の値段が上がり、予定も変わりました。原因を調べると、古い機械が動かず、部品が折れたためでした。代わりの機械は簡単に使えますが、細かい設定は少しおかしいので、担当者が直す日が決まってから新しい方法に決めました。','新しい方法を決めた理由は何ですか。',['代わりの機械の設定を確認し、修理日も決まった','値段が下がり、予定が同じだった','比べる必要がなく、機械も動いた'],'予定が変わり、機械の不具合の原因を確認し、設定と修理日の情報を合わせて決めています。'],
  ['02','home-leisure','祭りの日、親戚がうちに集まりました。下宿から来た姉は米を炊き、ごちそうを作りました。赤ん坊がいるので、ガラスの皿を鏡のそばに置かず、紙を折って飾りを作りました。乾いた飾りは形を見て表に出します。料理はうまくでき、子どもたちはゲームで勝つために順番を決め、食べ物をよく噛みました。','赤ん坊がいるので、家族は何に気をつけましたか。',['ガラスの皿を安全な場所に置いた','飾りを赤ん坊のそばに置いた','米を食べずにゲームをした'],'赤ん坊の近くにガラスを置かないと本文にあります。家の中の物と祭りの準備を同じ場面で読み取ります。'],
  ['02','school-work','大学の研究室では、課長ではなく先生が講義と研究を担当します。アルバイトの客に新しい技術を説明する練習もします。公務員になる友人は一生懸命勉強し、研究の終わりに写真を写して記録しました。仕事は厳しいこともあり、競争や経済の話も出ます。','友人は研究の終わりに何をしましたか。',['写真を記録に写した','講義をやめて客になった','公務員を辞めてアルバイトをした'],'本文では、研究の終わりに写真を写して記録したとあります。役職や学業とアルバイトの関係を取り違えないでください。'],
  ['02','quantity-conditions','旅行の申込条件：参加費は一人三千円以上、八千円以下です。駅から五分以内の集合場所へ来てください。日曜日以外は受付します。','三千円の参加費は条件に合いますか。',['合う。以上はその金額を含む','合わない。以上はその金額を含まない','日曜日も受付すると書いてある'],'以上は基準の数を含む「少なくとも」、以下は上限を含む「まで」です。五分以内と日曜日以外も案内にあります。'],
  ['02','travel-community','近所の警察で道を聞き、ガソリンスタンドの前からオートバイで海岸へ行きました。交通が込んでいたので、急行バスに乗る代わりに郊外を通りました。運転手におつりを確認し、移った町の見物をして、お土産を買いました。','交通が込んだ時、旅行者はどうしましたか。',['急行バスの代わりに郊外を通った','警察からお土産を受け取った','海岸から近所へ移らなかった'],'交通量が多いため、予定を変えて郊外を通っています。移動手段、場所、見物を区別して読みます。'],
  ['03','local-communication','午前中、携帯電話が鳴ったので、この辺の床屋の席を予約しました。看板には営業時間と値段があります。泥棒のニュースを見て少し困りましたが、希望する時間を店にお願いしました。','店の営業時間と値段はどこで確認できますか。',['看板','携帯電話の着信音だけ','床屋の席'],'本文では営業時間と値段が看板に書いてあるとあります。電話は希望時間の予約に使いました。'],
  ['03','home-daily','一人暮らしの部屋で家具と家電を動かし、空気を入れ替えました。材料をよく混ぜて焼いたので、パンが固くなりました。食器を包み、枝を捨て、割れた物を拾います。畳の部屋では電灯を消す習慣を続けています。','部屋を片づけた後、何を続けていますか。',['電灯を消す習慣','割れた物を畳に置くこと','固い家具を焼くこと'],'本文は、寝る前などに電灯を消す習慣を続けていると述べます。片づけや料理の動作と取り違えません。'],
  ['03','change-environment','大雨の影響で川の水が増え、葉が光る森の道も変わりました。最も安全な道を選ぶため、環境に気づき、続く雨を確認します。ごみを減らし、音を下げるなど、非常に小さな行動も役に立ちます。','安全な道を選ぶため、何を確認しますか。',['環境と続く雨の変化','値段と営業時間だけ','森に入って光る葉を取ること'],'大雨の影響を受けているため、本文は環境と雨の継続を確認すると述べます。'],
  ['03','feelings-leisure','昔、家族と過ごした夏を思い出すと、祭りの踊りや番組を見た時の感想が出てきます。今は気に入った曲の演奏を楽しみ、将来の夢を感じながら、怒る前に相手の話を聞きます。','話し手が今楽しんでいることは何ですか。',['気に入った曲の演奏','昔の番組を消すこと','相手にすぐ怒ること'],'本文では、気に入った曲の演奏を楽しむとあります。昔の思い出と今の楽しみを区別します。'],
  ['03','travel-culture','旅行では特急に乗り換え、田舎の旅館に泊まりました。途中、湖と森を見て、道をまっすぐ進みます。温泉に入り、手袋や下着を荷物に入れ、花火大会と美術館を観光しました。帰りに着物や地域文化を紹介する店に寄ります。','本文では、旅の途中に何をしましたか。',['特急に乗り換え、途中で湖や森を見た','旅館を出てから初めて特急に乗った','美術館で下着を買った'],'本文では、特急への乗り換えと道中の景色が示されています。旅館、観光地、帰路の出来事と区別します。'],
  ['03','work-study','先輩に工業の仕事を聞き、国際交流の資料を開きました。学校で調査を行い、必要な情報を探します。内容を翻訳して知らせる前に、意味をもう一度確認します。','翻訳した情報はいつ知らせますか。',['意味をもう一度確認した後','資料を開く前','調査を行わずに'],'本文は、翻訳してから意味を再確認し、その後に知らせる順序です。']
];

function linkedItems(batchId,group){
  return batches.flat().filter(item=>item.sourceReview?.batchId===`n4-vocabulary-${batchId}`&&item.group===group);
}
const makeLinks=(items,kind='meaning')=>[...new Map(items.map(item=>[item.text,{
  wordKey:item.text,
  usageId:`mnn-${String(item.lessonNumber).padStart(2,'0')}:${item.text}`,
  kind
}])).values()];

const listening=[
  {id:'n4v-listen-public',title:'Nghe hướng dẫn tại quầy',transcript:'市役所の窓口です。申込書と本人の書類を出してください。受け取る期間は申込書に書いてあります。',reading:'しやくしょのまどぐちです。もうしこみしょとほんにんのしょるいをだしてください。うけとるきかんはもうしこみしょにかいてあります。',vi:'Đây là quầy ở tòa thị chính. Xin nộp đơn và giấy tờ của chính người đăng ký. Thời gian nhận được ghi trên đơn.',group:['01','public-procedures'],prompt:'Người nghe cần nộp gì?',choices:['đơn và giấy tờ của người đăng ký','hóa đơn tiền thuốc','vé tàu và quà lưu niệm'],explanation:'申込書と本人の書類を出してください là yêu cầu được nghe.'},
  {id:'n4v-listen-medical',title:'Nghe mô tả triệu chứng',transcript:'せきが出て、食欲がありません。健康診断の時に先生へ話してください。薬は処方せんを確認してから受け取ります。',reading:'せきがでて、しょくよくがありません。けんこうしんだんのときにせんせいへはなしてください。くすりはしょほうせんをかくにんしてからうけとります。',vi:'Bị ho và không muốn ăn. Hãy nói với bác sĩ lúc khám sức khỏe. Nhận thuốc sau khi kiểm tra đơn kê.',group:['01','medical-communication'],prompt:'Khi nào cần nói với bác sĩ?',choices:['lúc khám sức khỏe','sau khi đi du lịch','trước khi nhận quà'],explanation:'健康診断の時に先生へ話してください là thời điểm được nêu.'},
  {id:'n4v-listen-safety',title:'Nghe thông báo sơ tán',transcript:'火災です。煙があります。あわてずに非常口から屋外へ逃げてください。消防署の案内を聞いてください。',reading:'かさいです。けむりがあります。あわてずにひじょうぐちからおくがいへにげてください。しょうぼうしょのあんないをきいてください。',vi:'Có hỏa hoạn và khói. Xin bình tĩnh sơ tán ra ngoài qua lối thoát hiểm. Hãy nghe hướng dẫn của sở cứu hỏa.',group:['01','emergency-safety'],prompt:'Nên làm gì?',choices:['bình tĩnh đi ra ngoài qua lối thoát hiểm','đi vào nơi có biển cấm','đứng lại trong khói'],explanation:'非常口から屋外へ逃げて、消防署の案内を聞く đúng thông báo.'},
  {id:'n4v-listen-travel',title:'Nghe đổi phương tiện',transcript:'交通が込んでいます。急行に乗らず、次の駅で電車に乗り換えてください。',reading:'こうつうがこんでいます。きゅうこうにのらず、つぎのえきででんしゃにのりかえてください。',vi:'Đường đang đông. Đừng đi tàu tốc hành; hãy đổi sang tàu điện ở ga kế tiếp.',group:['02','travel-community'],prompt:'Người nghe cần làm gì?',choices:['đổi sang tàu điện ở ga kế tiếp','đi xe máy ra biển','mua quà ở ngoại ô'],explanation:'次の駅で電車に乗り換えてください là chỉ dẫn chính.'}
].map((task,index)=>{
  const [batchId,group]=task.group;
  const words=linkedItems(batchId,group).filter(item=>task.transcript.includes(item.text)||task.transcript.includes(item.example?.ja||''));
  const questionId=task.id+'-q';
  return{
    id:task.id,title:task.title,transcript:task.transcript,reading:task.reading,vi:task.vi,
    questions:[arrangeNewChoices({id:questionId,prompt:task.prompt,choices:task.choices,answer:0,explanation:task.explanation,assessment:true,wordLinks:makeLinks(words,'listening')},index+1)]
  };
});

export function buildN4VocabularyAssessment(){
  const questions=contexts.map(([batchId,group,text,prompt,choices,explanation],index)=>{
    const items=linkedItems(batchId,group);
    if(!items.length)throw Error(`Missing N4 vocabulary group ${batchId}/${group}`);
    return arrangeNewChoices({
      id:`n4v-${batchId}-${group}`,skill:'đọc hiểu tích hợp từ vựng',
      prompt:`Đọc tình huống mới:\n${text}\n\n${prompt}`,
      choices,answer:0,explanation,assessment:true,
      wordLinks:makeLinks(items)
    },index+1);
  });
  return{
    id:'n4-vocabulary-assessment-01-03',number:'TỰ KIỂM TỪ VỰNG N4 01–03',
    stage:'Hướng N4',level:'N4',track:'assessment',chapter:'Đánh giá tích hợp từ vựng',
    kind:'checkpoint',checkpoint:true,waitFor:'mnn-50',prerequisite:null,minutes:45,glyph:'語',
    title:'Dùng từ trong tình huống mới',
    subtitle:'Đọc/nghe tích hợp các lô N4 01–03; chưa đại diện toàn bộ N4',
    goal:'Hiểu thông tin trong tình huống hành chính, sức khỏe, an toàn, gia đình, công việc, đi lại và sinh hoạt; từ liên kết được đưa vào lịch ôn chung.',
    intro:'Bài mở tự do. Mỗi câu nhóm một cụm từ trong văn bản mới; đáp án và lý do được lưu. Nghe trước khi mở transcript nếu muốn đo lượt nghe có ít trợ giúp. Kết quả không quy đổi thành điểm JLPT và không chứng minh mọi từ đã nhớ.',
    cards:[],words:[],notes:[
      'Các mục được gắn với câu hỏi tích hợp theo nhóm chức năng; một đáp án đúng không chứng minh đã thành thạo riêng từng từ.',
      'Nhiệm vụ nghe lưu số lượt phát và việc mở transcript; từ nghe được nối lịch ôn nhưng không được dùng làm bằng chứng nghe độc lập nếu có trợ giúp.',
      'Phần viết là bản nháp tự lưu, có phiên bản và rubric tự kiểm; chưa được máy chấm ngữ nghĩa hoặc tính vào điểm khách quan.',
      'Bài không khóa tuyến học. Câu sai được đưa vào lịch ôn; từ còn thiếu nghĩa riêng cần tiếp tục luyện trong ngữ cảnh khác.'
    ],
    activity:'Làm câu đọc trước, nghe từng thông báo trước transcript, rồi viết ngắn và tự kiểm theo rubric.',
    sources:[{name:'JLPT · cấu trúc/dạng tham khảo; ngữ liệu dự án tự soạn',url:'https://www.jlpt.jp/e/guideline/testsections.html'}],
    questions,listeningTasks:listening,
    reading:{text:contexts.map(([, ,text])=>text).join('\n\n'),reading:'',lookupWordKeys:[...new Set(batches.flat().map(item=>item.text))],vi:'Phần đọc kiểm tra tìm thông tin, không yêu cầu suy ra nghĩa chưa được cung cấp.'},
    application:{
      situation:'Chọn một tình huống vừa đọc/nghe và viết tin nhắn ngắn cho người liên quan.',
      speaking:'Tự tóm tắt một thông tin cần thiết; phần nói không được chấm tự động.',
      writing:'Viết 3–5 câu mới, nêu ý định tiếng Việt trước, dùng ít nhất ba từ trong nhóm phù hợp; sau đó viết lại để giữ nguyên ý và sửa thông tin sai.',
      criteria:['Thông tin thời gian/địa điểm/số lượng khớp tình huống.','Từ được chọn phù hợp nghĩa và vai giao tiếp.','Giữ đúng phủ định, trình tự và người thực hiện.','Câu viết lại không đổi ý định ban đầu.']
    }
  };
}
