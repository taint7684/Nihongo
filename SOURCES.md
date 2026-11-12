# Nguồn và quyền sử dụng — cập nhật 11/11/2026

Trạng thái hiện hành: có học liệu tự soạn cho 25 bài tham chiếu và TTS từ/câu/đoạn; chi tiết số lượng theo catalog/COVERAGE.md. Các số 10 bài hoặc 11 audio trong phần lịch sử bên dưới mô tả mốc cũ, không phải tổng hiện tại.

# Nguồn, quyền và trạng thái — 11/11/2026

## Chương trình

- Minna no Nihongo Shokyu I Second Edition Main Text, ISBN 9784883196036, 25 bài: [3A chính thức](https://www.3anet.co.jp/np/books/2300/); [syllabus bản 2](https://plus.3anet.co.jp/mnc/minnanonihongoclubtop/). Đã xác minh bản 2; không trộn bản 3. Chỉ tham khảo phạm vi/thứ tự khái niệm; không chép sách, bài tập, ví dụ, hội thoại, hình hoặc audio; không yêu cầu mua sách để học nội dung ứng dụng.
- [JLPT mô tả cấp độ](https://www.jlpt.jp/e/about/levelsummary.html), [câu hỏi mẫu chính thức](https://www.jlpt.jp/e/samples/forlearners.html), [FAQ](https://www.jlpt.jp/e/faq/): tham chiếu năng lực/dạng thi, không đóng gói đề hoặc tự gọi danh mục kiến thức dự án là danh mục N5 chính thức. Chưa có bài đánh giá sẵn sàng N5.
- [Irodori Starter](https://www.irodori.jpf.go.jp/en/starter/pdf.html), [điều kiện nguồn](https://www.irodori.jpf.go.jp/en/privacy.html): tham khảo cấu trúc/chủ đề, dẫn liên kết, không đóng gói giáo trình. [Marugoto chỉ mục Việt](https://marugoto.jpf.go.jp/assets/docs/download/starter_c/MarugotoStarterCompetencesVocabularyIndex_VN.pdf): đối chiếu mục từ thông dụng, không sao chép/đóng gói PDF hoặc toàn danh sách.

## Đối chiếu kiến thức

- [TUFS Nです/Nではありません](https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/explanation/001.html): khung danh từ, khẳng định/phủ định; không chép bài tập.
- [TUFS mora](https://www.coelang.tufs.ac.jp/ja/en/pmod/practical/01-10-01.php), [trường âm](https://www.coelang.tufs.ac.jp/ja/en/pmod/practical/02-02-01.php), [nguyên âm](https://www.coelang.tufs.ac.jp/ja/en/pmod/practical/01-07-01.php); [Kyoto kana](https://www.samidori.k.kyoto-u.ac.jp/study/exam?id=41): đối chiếu chức năng/quan hệ chữ–âm, dẫn liên kết. Không lấy media của các trường.
- [TUFS mục lục chức năng ngữ pháp](https://www.coelang.tufs.ac.jp/mt/ja/gmod/steplist.html): nguồn kiểm tra chéo cho phạm vi 1–10. Theo bài 6–10 có liên kết chi tiết trong src/mnn-next.js: [を](https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/card/027.html), [lời mời](https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/card/062.html), [cho nhận](https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/card/085.html), [tính từ い](https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/card/030.html), [sở thích](https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/card/070.html), [tồn tại](https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/card/006.html), [Kyoto tồn tại](https://www.samidori.k.kyoto-u.ac.jp/study/exam?id=144). Chỉ đối chiếu chức năng; ví dụ/đoạn đọc/giải thích Việt/bài tập do dự án tự soạn.

Ba trạng thái tách biệt: (1) chức năng/quan hệ chữ có nguồn đã đối chiếu; (2) ví dụ, nghĩa Việt, đáp án do dự án soạn với trợ lý AI, chưa người duyệt độc lập; (3) phản hồi runtime AI theo nhãn riêng. Không mặc định mọi từ, câu, nghĩa Việt đã được kiểm định chỉ vì có link nguồn. Build/test xác nhận tính nhất quán dữ liệu và vận hành, không chứng minh toàn bộ kiến thức đúng.

## Audio được đóng gói

public/audio/catalog.json và src/audio-catalog.json là danh mục hiện hành: tác giả, trang file, quyền, SHA-256, loại sử dụng/trạng thái kiểm tra. manifest.json giữ nguyên năm file gốc để đối chiếu lịch sử.

- 9 mẫu kana Public domain theo metadata Commons, giữ nguyên file; mẫu kéo dài chỉ minh họa, không đưa vào chấm thời lượng. Các file あ/い/え dài khoảng 2,48/2,73/2,69 giây; không bắt chước độ dài ấy trong từ.
- [なまえ](https://commons.wikimedia.org/wiki/File:Ja-namae.ogg), [いぬ](https://commons.wikimedia.org/wiki/File:Ja-inu-anglonative.oga): FreeMediaKid!, [CC0](https://creativecommons.org/publicdomain/zero/1.0/), giữ nguyên. Metadata ghi người đọc không phải bản ngữ; UI nêu rõ, chưa kiểm định ngữ âm độc lập. Không coi là chuẩn phát âm.
- 11 file được kiểm checksum và giải mã Ogg bằng trình duyệt; điều này không thay duyệt phát âm. Chưa có audio đủ cho mọi kana/từ/câu/bài. Nguồn tải có HTTP429 nên dừng, không lách giới hạn. Không lấy audio Minna hay TTS tiếng Anh để lấp thiếu.

## Phần mềm / dữ liệu khác

React/Vite/Vitest/plugin React MIT (LICENSE trong dependencies). [Ollama](https://github.com/ollama/ollama) MIT, portable v0.40.16 được đối chiếu digest asset chính thức trước chạy; .runtime/verified-release.json. [Qwen3 1.7B](https://ollama.com/library/qwen3:1.7b), [Qwen3 4B](https://ollama.com/library/qwen3:4b), [Qwen chính thức](https://huggingface.co/Qwen/Qwen3-4B): Apache-2.0, tải model không đồng nghĩa hạ tầng miễn phí. Ở đây chạy CPU/phần cứng sẵn có, không API trả phí/thẻ/trial. Mỗi blob đối chiếu SHA-256 manifest. Thử 4B do lỗi thật 1.7B, không tải nhiều ứng viên. AI_QUALITY.md ghi rõ thất bại.

[EDRDG](https://www.edrdg.org/edrdg/licence.html): ứng viên từ điển CC BY-SA, CHƯA tích hợp JMdict/Kanjidic; tra tại chỗ hiện chỉ dùng mục từ dự án đã biên soạn, không tự nhận là từ điển đầy đủ.

Khảo sát trải nghiệm trước đây: [Dũng Mori](https://online.dungmori.com/), [Riki](https://help.riki.edu.vn/huong-dan-vao-hoc-online/nhung-cau-hoi-thuong-gap), [Mazii](https://mazii.net/vi-VN), [MochiKanji](https://mochidemy.com/kanji/). Chỉ tham khảo mô tả chính thức; chưa trực tiếp trải nghiệm toàn bộ, không coi quảng cáo là bằng chứng hiệu quả, không sao chép nội dung.

## Bổ sung vòng học và bài 11–25 (11/11/2026)

- [3A tài nguyên bản 2](https://www.3anet.co.jp/np/resrcs/230000/), [syllabus chính thức](https://www.3anet.co.jp/np/secure/0-0001-03-230000/0-0001-03-230000-1.pdf): tham khảo phạm vi/thứ tự/chức năng, không đóng gói sách, danh sách từ nguyên bản, câu ví dụ hay audio. Từ, giải thích Việt, ví dụ, đọc, hội thoại và câu hỏi ứng dụng do dự án soạn với trợ lý AI; chưa người duyệt độc lập. Không tự ghi đã chuyên gia duyệt.
- [TUFS mục lục ngữ pháp](https://www.coelang.tufs.ac.jp/mt/ja/gmod/steplist.html): đối chiếu trợ số từ, quá khứ tính từ, thể て/ない/từ điển/た, thứ tự, khả năng, trải nghiệm, thể thường. Bài 21–25 kiểm cụ thể: [ý kiến](https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/card/077.html), [bổ nghĩa danh từ](https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/card/079.html), [とき](https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/card/093.html), [điều kiện](https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/card/083.html), [hướng lợi ích](https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/card/086.html), [nhượng bộ](https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/card/084.html). Chỉ dùng căn cứ chức năng/cấu trúc, không sao chép bài tập/media. Chưa kiểm độc lập toàn bộ cách dùng của từng câu do dự án soạn.
- Âm/nhịp: TUFS trường âm/ngắt đã dẫn; đối chiếu thêm cặp 病院／美容院 qua [Japan Foundation Manila, Moji Exercise Book](https://jfmo.org.ph/wp-content/uploads/2017/07/Moji-Exercise-Book_010615.pdf) và [Bunka, tài liệu đời sống](https://www.bunka.go.jp/seisaku/kokugo_nihongo/kyoiku/china_kikokusha/pdf/seikatsu/seikatsu_all.pdf). Không lấy nguyên bài/media. Giải thích mora và hoạt động đối chiếu là tự soạn.
- [JLPT cấu trúc/dạng/thời gian](https://www.jlpt.jp/e/guideline/testsections.html), [mô tả N5](https://www.jlpt.jp/e/about/levelsummary.html): mục tiêu tham chiếu, không lấy đề có bản quyền làm kho riêng. Bộ cuối chặng do dự án viết, chưa phủ đủ dạng, không quy điểm phần trăm sang JLPT. Ma trận N5_READINESS_MAP.md ghi phần thiếu.

## TTS đã tạo và quyền tích hợp

[VOICEVOX điều khoản phần mềm](https://voicevox.hiroshiba.jp/term/) cho dùng audio theo điều khoản thư viện giọng và yêu cầu ghi công; không tự cho phép phân phối lại toàn bộ engine. [Điều khoản giọng 四国めたん](https://zunko.jp/con_ongen_kiyaku.html) yêu cầu ghi công và tuân điều kiện dùng chung. App này ghi VOICEVOX:四国めたん ở audio và tài liệu, không dùng hình nhân vật, không bán gói/khóa hoặc nội dung trả phí. Khi chia sẻ audio phải kèm điều kiện nguồn và ghi công; không tự coi audio là CC0/PD.

Engine [0.26.1 chính thức](https://github.com/VOICEVOX/voicevox_engine/releases/tag/0.26.1), Windows CPU, thư viện giọng 0.17.0, style 2 normal. Digest gói theo .runtime/voicevox/release.json. Engine portable không nằm trong sản phẩm phát hành. CPU thử trên môi trường Windows đang thao tác; không đo GPU Iris Xe, không cam kết tốc độ nhiều người.

Metadata từng file: src/generated-audio.json và public/audio/tts/catalog.json có nguồn, điều khoản, giọng/phiên bản, synthesisText, chỉ định cách đọc, SHA-256, trạng thái và kế hoạch cách đọc đã so khớp. scripts/generate-course-audio.mjs đối chiếu nguồn tự soạn trước khi tổng hợp, giữ mục không khớp thay vì ép chấp nhận. Đã sửa đọc 角 thành かど ở ngữ cảnh đường, 開きます thành あきます ở cửa, 二十歳はたち, 日本にほん và ranh giới 毎日、本. Metadata ghi khi có thay đầu vào. Cách đọc theo ngữ cảnh vẫn cần người đủ năng lực nghe; chưa có duyệt độc lập trọng âm, ngữ điệu, tự nhiên hội thoại hoặc toàn bộ nội dung. Không dùng audio chấm phát âm người học.

Báo cáo pilot và truy vấn thật ở .tmp-ui/tts-pilot, .tmp-ui/tts-course. Đó là kiểm tra kỹ thuật/kế hoạch cách đọc, không phải benchmark phát âm do người bản ngữ chấm. Audio bị thay thế vẫn giữ file và cờ retired; UI không dùng mục retired.

## Rà và bổ sung lúc mở truy cập tự chọn — 11/11/2026

- CONTENT_REVIEW.md ghi rõ mục đã đọc/rà nội bộ từng bài 1–25 và mục chưa kiểm. Không thay chứng nhận học thuật độc lập. Bài 15 sửa nhãn mẫu trạng thái; bài 17 bổ sung ngoại lệ ある→ない theo [NINJAL Basic Verb Bank](https://www2.ninjal.ac.jp/basicverbbank/single_headwords/%E3%81%82%E3%82%8B-%E5%9C%A8%E3%82%8B%E3%83%BB%E6%9C%89%E3%82%8B.html), không sao chép ví dụ/bảng nguồn.
- assessment-expansion.js: bộ luyện và đánh giá riêng tự soạn, tham khảo phân loại dạng [JLPT chính thức](https://www.jlpt.jp/e/guideline/testsections.html), không sao chép đề. Sắp câu chấp nhận nhiều trật tự đúng trong phạm vi đã khai báo.
- intro-audio-content.js: từ trong các nhóm kana và đối chiếu âm đục/bán đục/nhịp. Mẫu cả từ, không tự coi thành mẫu âm đơn hoặc duyệt ngữ âm. Tạo cùng VOICEVOX/điều khoản đã ghi trên; metadata đầy đủ ở catalog công khai.
- src/audio-index.json chỉ giữ trường UI cần. Metadata/SHA/cách tạo đầy đủ không mất, vẫn ở src/generated-audio.json và public/audio/tts/catalog.json.

## PROJECT_BRIEF 0→N4 — 11/11/2026

[3A Minna II bản 2](https://www.3anet.co.jp/np/books/2400/) và [syllabus I/II](https://www.3anet.co.jp/np/resrcs/240000/) xác minh trình tự/chức năng, không cho mặc định sao chép sách/media. Bản đồ N4 là đề cương tự soạn, chưa học liệu. [JLPT](https://www.jlpt.jp/e/guideline/testsections.html), [JF Standard](https://www.jfstandard.jpf.go.jp/summaryen/ja/render.do) và [Irodori](https://www.irodori.jpf.go.jp/en/about.html) làm căn cứ phân biệt đích thi và Can-do, không quy N4 cứng sang CEFR. RESEARCH_DECISIONS.md phân biệt đọc giới thiệu/không truy cập/đã kiểm công cụ, không giả đã trải nghiệm app thương mại.

[KanjiVG](https://kanjivg.tagaini.net/) / Ulrich Apel và contributors: dữ liệu nét **CC BY-SA 3.0**, commit 610091ce618cf757ed1357a8954cd65283e015d6. Giữ SVG nguyên bản/copyright ở public/kanji/source, COPYING ở LICENSE.txt; JSON path/thành phần là bản chuyển đổi cùng giấy phép, manifest có nguồn/commit/SHA. UI ghi công và link nguồn. Không gọi dữ liệu nguồn thành đánh giá nét tự động.

Giải thích thuật ngữ/bảng và nghe mới tự biên soạn, không sao chép câu/đề. TTS cùng giọng/phiên bản/điều khoản đã ghi; kế hoạch đọc có kiểm, ngữ âm chưa duyệt độc lập. SM-2 biến thể triển khai theo [mô tả Wozniak](https://super-memory.com/english/ol/sm2.htm), không sao chép code hoặc hứa hiệu quả; SRS.md ghi điều chỉnh.

Chưa tích hợp JMdict/KANJIDIC/Tatoeba; chưa được xem nguồn mở nào cũng tự động tái phân phối. Nghĩa/đọc từ hiện vẫn là dữ liệu dự án theo bài, chưa danh mục từ điển đầy đủ.

Ngưỡng giao tiếp được chọn tạm theo ủy quyền “tôi chưa biết nhưng cứ làm tốt nhất giúp tôi”, không phải duyệt chuyên môn. communication-criteria.json không có automaticSpeechPass; không dùng tự báo cáo hoặc keyword để chứng minh đạt.

## Đối chiếu vòng cách dùng 12/11

TUFS card 017 lượng từ; 029 thời điểm; 064 nhận/từ chối lời mời; 085 cho nhận; 034 mức độ; 093 とき; 083 điều kiện; 039 nhóm động từ. Đã mở tài liệu chính thức, chỉ tham khảo chức năng; ví dụ/bài tập mới tự soạn, không sao chép/đóng gói trang. Link dạng https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/card/017.html (đổi số tương ứng). Phần nguồn còn lại của từng bài không tự xác minh mọi câu mới.

## Nhóm N4 26–30 và danh mục mục tiêu 12/11

3A Minna II bản2 https://www.3anet.co.jp/np/books/2400/ và syllabus https://www.3anet.co.jp/np/resrcs/240000/ đã mở. Chỉ tham khảo trình tự/chức năng; không chép bài/ví dụ/audio sách. TUFS card074 khả năng,046てあります,088ておく/てみる đã mở để đối chiếu cấu trúc. reference-targets.js là lựa chọn mục tiêu chức năng do dự án biên soạn, không danh sách từ/Kanji chính thức hoặc được nhà xuất bản chứng nhận. KanjiVG thêm8chữ, cùng commit/license,54source nét tổng.

Hình tình huống public/learning-images/borrow-umbrella.svg vàstamp-counter.svg do dự án tự vẽ, không dùng hình đề JLPT. Nội dung lời nghe tự soạn, audioVOICEVOX như điều khoản đã ghi; không sao chép câu/audio đề.

36–40: đã mởTUFS card080 Vこと/Vの,081lýdo; đối chiếu phạmvi với3AIIbản2. Ví dụ/từ/đápán tựsoạn, không chépvídụnguồn. Trước nhóm41+ đã mởTUFS092kínhngữ,082nghịchnối,086cho/nhậnhànhđộng. Không lấynguồnchức năngthànhchứngnhậntoàncâutựsoạn.


## Nguồn đối chiếu bổ sung 2026-11-12

- Bài26–50: https://www.3anet.co.jp/np/books/2400/ , syllabus https://www.3anet.co.jp/np/resrcs/240000/ ; chỉ dùng khung phạm vi/thứ tự. Từ/ví dụ/đọc/nghe/nhiệm vụ và đánh giá dự án tự soạn; không đóng gói sách/audio Minna.
- Bài49–50: Cơ quan Văn hóa Nhật, phân loại敬語 https://www.bunka.go.jp/seisaku/kokugo_nihongo/kokugo_shisaku/keigo/chapter2/detail.html và phân biệt hướng敬意 https://www.bunka.go.jp/seisaku/kokugo_nihongo/kokugo_shisaku/keigo/chapter6/detail.html . Đối chiếu尊敬/謙譲I/謙譲II, không sao chép bài tập; giải thích Việt tự soạn. Chưa duyệt độc lập.
- Bộ tổng hợp và capstone: ngữ liệu, tình huống dự án tự soạn. Dẫn JLPT chỉ để phân biệt cấu trúc/dạng, không coi là đề chính thức hoặc chuẩn nói.
- KANJIDIC2 mới khảo sát, chưa tải/tích hợp; không tuyên bố có từ điển On/Kun đầy đủ. KanjiVG là nguồn nét, không nguồn toàn bộ nghĩa/âm.


## 12/11 — dữ liệu từ điển thực tế đã tích hợp

JMdict English ngày2026-11-09,219040entries; JSON conversion scriptin/jmdict-simplified release3.6.2+20261109214828. KANJIDIC2 lấy trực tiếpEDRDG, ngày2026-11-12,version2026-316,13108chữ; chỉ tríchEnglish/Japanese/Vietnamese/classical radical/stroke/grade/nanori; không tái phân phốiSKIP/mã chỉ mục đặc biệt. Giấy phépCC BY-SA4.0,James William Breen/EDRDG và contributors. public/dictionaries/licenses/edrdg.html và jmdict-conversion.md giữ điều kiện/nguồn. CácJSON dẫn xuất theoCC BY-SA4.0. Không coi dictionary có cấpJLPT hiện hành.
Dữ liệu nguồn có SHA và URL tại public/dictionaries/source-manifest.json; raw cache ngoàiGit. Không tự gắn nhãn nghĩa Việt đã đối chiếu nếu chưa chọn sense/kiểm nghĩa. UI tra nguồn tải tại chỗ, không gửi câu hỏi người dùng.
Irodori wordlist_all/sentence_patterns_list/kanji_list XLSX: lấy chính thứcJF12/11, so sánh nội bộ, không đóng gói nguyên workbook/đáp án/dịch vào app. MinnaI/IIsyllabus là cùngfile, không tính2nguồn độc lập. Irodori khác nhà biên soạn/phương pháp vớiMinna; JMdict/KANJIDIC là nguồn định nghĩa, không thay danh mục trình độ. Tanos không truy cập thành công ở vòng này, không giả đã đối chiếu.
