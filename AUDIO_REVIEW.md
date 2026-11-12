# Rà rủi ro audio — 11/11/2026

Ba việc khác nhau: (1) đối chiếu cách đọc dự kiến trong metadata TTS; (2) phát/giải mã file; (3) nghe duyệt phát âm, trọng âm, nhịp và ngữ điệu. Hiện có (1), kiểm phát lấy mẫu ở (2); **chưa có người độc lập làm (3)**.

| Mục/rủi ro | Việc đã kiểm/sửa | Chưa xác minh |
|---|---|---|
| 二十歳 | Đầu vào はたち trong ngữ cảnh tuổi, metadata có forcedReading; không tự bác mọi biến thể hợp lệ | Trọng âm/ngữ điệu câu |
| 角 trong đường đi | Chỉ định かど, giữ lỗi カク không cho làm mẫu đã khớp | Nghe duyệt các câu chỉ đường |
| ドアが開きます | Chọn あきます theo cửa mở, khác cách đọc ひらく hợp ngữ cảnh khác | Không có đối chiếu nghe độc lập |
| 毎日本… | Ranh giới 毎日、本, không để máy ghép 毎/日本 | Chưa duyệt ngữ điệu ở ranh giới |
| 学生/先生/勉強/日曜日/きょう | So khớp trường âm theo từ, không đổi mọi ou/ei một cách toàn cục | Độ dài âm thực tế/trọng âm chưa được nghe duyệt |
| は/へ/を và はい/はじめまして | Có kiểm phân biệt trợ từ với phần của từ, không sửa はい thành ワイ | Không chứng minh mọi câu đã đọc tự nhiên |
| Giờ/ngày/giá/trợ số từ | Có dữ liệu đọc và kiểm TTS theo mục được tạo; 十分 được chỉ định theo thời lượng | Chưa đủ mọi tổ hợp số hoặc nhiều giọng |
| おばさん/おばあさん, ビル/ビール, さか/さっか, 病院/美容院 | Có mẫu trong từ và câu nhận diện; mora có chú giải | Không dùng để chấm thời lượng/phát âm của người học |
| Mẫu nguyên âm cũ kéo dài | Giữ tách nhãn minh họa, không dùng như độ dài bắt chước trong từ | Chưa có bộ âm đơn ngắn được duyệt độc lập |
| Mẫu từ Hiragana/Katakana mới | Có audio cả từ và nhận diện chữ; kế hoạch cách đọc đã so khớp | Không bao phủ từng âm đơn. Từ kana đa nghĩa như はな/かき cần kiểm trọng âm theo nghĩa cụ thể; hiện không kiểm/chấm trọng âm |

Metadata đầy đủ/cách tạo/SHA ở public/audio/tts/catalog.json. src/audio-index.json chỉ phục vụ UI, không thay hồ sơ nguồn. Một file có cách đọc kế hoạch khớp vẫn không tự thành mẫu bản ngữ được duyệt. Những mục cần kiểm trên không được tự chuyển thành bằng chứng phát âm đúng.

Bổ sung PROJECT_BRIEF: bốn đoạn nghe số/tầng/giờ/ngày/người/tần suất ở bài 3/4/5/11 đã được tạo bằng CPU. 水曜日 cần so khớp trường âm theo từ; đã sửa và tạo file. Zero held của lần chạy chỉ nghĩa mọi job yêu cầu lần ấy khớp kế hoạch, không đủ âm toàn chương trình và không phải nghe duyệt. Người dùng ghi âm qua IndexedDB không có ASR/phát âm score; dữ liệu không tự ra ngoài.

## Audio vòng sửa 12/11

Tạo 41 file mới từ catalog 903→944 tổng, các file cũ giữ. Bảy job đầu bị giữ vì 何の本/八日/金曜日/用事: chỉ định なんの cho đúng câu; đối chiếu trường âm từ riêng よおか/きんよおび/よおじ. Chạy lại held=0. Đây là so kế hoạch đọc, không nghe duyệt ngữ âm. Chỉ mục local /audio/tts/index.json tải khi có hoạt động audio, lỗi có retry; WAV không preload.

Nhóm N4/lexicon12/11: catalog hiện1209tổng/1199active. Đã giữ và sửa từng trường âm 手帳/名刺/時計/飛行機/映画/有名/封筒/病院/自動車/動物/どうしたの/信号 và旅行; ngữ cảnh ドアが開いています chỉ định あいて. Phân biệt 片づけます cách viết với cách đối chiếu âmず trongTTS. Lần cuối held0, chưa nghe duyệt độc lập. Không chấm phát âm theo các file.

Nhóm31–35: giữ8job khác kế hoạch rồi sửa từ riêng撮影/砂糖/向こう, đọcなんと trong câuHana/Nam truyền lời. Catalog1328tổng/1323active,held0. Đây là kiểm kế hoạch, không nghe duyệt. KanjiVG thêm8source nét cùngcommit,62tổng.

KanjiFocus/vocab:1372tổng/1367active,held0 sau sửa trườngâm thứ月火木土.137sourceKanjiVG cùngcommit; nghĩa/cáchđọc không được KanjiVG chứng nhận. TTS chưa ngheduyệt độc lập.

36–40:1489tổng/1484active,held0 sauđốichiếucụmように→よおに, lexical目標/生活/招待/整理/到着.145VGsource,khôngduyệtnghĩa/ngữâm.


## 2026-11-12: kiểm kế hoạch TTS và tài sản mới

Catalog1708, active1698, retired10; held0 lần cuối. Thêm nghe nhóm46–50, tổng hợpA, prompt/nhánh capstone. Có engine/style/phiên bản/hash/credit và synthesisText trong metadata.
Sửa lỗi thay bare十分 làm hỏng三十分: hiện chỉ đổi10phút độc lập, có test10/20/30. Đối chiếu các cụm降り,方,軽い,何 vàはず. Không áp đổi ou/ei toàn cục; thêm変更/ご用 theo từ cụ thể. Ghi nguyên cách viết kana học tập riêng với kế hoạch âm kéo dài.
Kiểm WAV phát trọn trong Edge chứng minh khả năng phát/lưu hoạt động, không chứng minh trọng âm/phát âm chuẩn. Chưa nghe duyệt độc lập và không dùng làm chuẩn chấm phát âm.
