# Cập nhật mới — N4 vocabulary batch 03 và bài đánh giá tích hợp

- Đo lại bằng `scripts/n4-vocabulary-batch-03-audit.mjs`: trước → sau batch03, N5 800/800; N4 mới, loại trùng 388→468; tích lũy 1.188→1.268 JMdict candidate lexemes. Lô thêm đúng 80 ID entry mới. Surface count riêng: N4 mới 393→473; tích lũy 1.209→1.289; không cộng surface/cách chia vào lexeme count.
- 80/80 có spelling+reading khớp snapshot Irodori Elementary 2; 56/80 có JMdict entry-ID trong OpenJLPT N4, 51/80 exact spelling+reading. OpenJLPT là danh sách cộng đồng, không phải inventory JLPT chính thức. Minna II bản 2 chỉ là mapping chức năng; exact wordlist Minna chưa đối chiếu. 24 mục thiếu OpenJLPT match không bị coi là sai chỉ vì vắng mặt.
- Mỗi từ có nghĩa Việt theo ngữ cảnh, ví dụ tự soạn, lý do dùng, liên kết bài, JMdict entry/sense và lịch ôn chung. 160/160 asset từ/câu của batch có WAV; thêm 4 bài nghe tích hợp. VOICEVOX local 0.26.1 và analyzer báo 0 held/khớp metadata; chưa có nghe duyệt hay QA ngữ âm.
- Assessment `n4-vocabulary-assessment-01-03`: 15 câu đọc tình huống mới gắn đủ 251 lexeme của batch01–03; 4 nhiệm vụ nghe gắn 20 liên kết mục↔nhiệm vụ. Câu đọc/nghe lưu lịch dùng chung, trả lời sai/đúng đã kiểm riêng; bài viết lưu bản nháp và phiên bản cùng rubric tự kiểm, không tự chấm ngữ nghĩa. Không tính dữ liệu này là năng lực người học.
- Browser QA bằng hồ sơ riêng trên production build: câu đọc đúng nối 27 mục vào lịch và còn sau reload; WAV nghe được, lượt không transcript được lưu riêng; một lượt mở transcript ghi trợ giúp; bản viết và phiên bản lưu được; màn đánh giá không tràn ngang ở 390px. Không dùng AI hoặc hồ sơ học thật. Đây là kiểm phần mềm, không kiểm phát âm/đọc hiểu độc lập.
- QA reload vòng cuối trên profile riêng phát hiện validator v1 từ chối `wordEvidence.kind === 'listening'`, khiến bản lưu có bằng chứng nghe không đọc lại được. Đã cho phép loại này và thêm hồi quy: lượt nghe có/không transcript đều round-trip; browser QA sau sửa giữ câu trả lời, lượt nghe và bản viết sau reload, không hiện storage alert.
- `node scripts/done-gates.mjs`: N4 hiện có 512 usage; 251 có assessment tách biệt/không trùng câu và lịch chung, còn 261 thiếu assessment tách biệt; N5 words 224/806; N4 Kanji 0/195; ngữ pháp N4 56/86; kaiwa N5/N4 0/56 và 0/50. G5 vẫn `not-met`; mẫu số hiện có không chứng nhận độ đủ toàn cấp. G4 còn `unverified`; báo cáo mẫu batch03 là đối chiếu của tác giả dự án, chưa phải duyệt độc lập.
- `npx vitest run src --maxWorkers=2`: 48/49 file và 212/213 test qua; test lỗi còn lại là assertion không khớp ngôn ngữ trạng thái trong `src/dictionary-source.test.js:29`, ngoài nhóm này. Production build qua; bundle chính 1,733.57 kB (gzip 473.85 kB), chưa đạt mục tiêu lazy-load <800 kB. Chưa commit nhóm này.
- **Tiếp tục ngay:** vẫn ở ưu tiên từ vựng; tích lũy 1.268, thiếu ít nhất 232 lexeme phù hợp. Tiếp tục các lô N4 ≥80 từ, đối chiếu ID và nguồn; tối thiểu ba lô nữa theo count thực tế (không giả định mọi mục đều mới), cập nhật assessment sau mỗi hai lô. Sau khi count tái lập đạt ≥1.500 mới chuyển sang Kaiwa.

# Quyết định tạm để xem lại — không chờ duyệt

| Quyết định | Lý do | Cách đổi |
|---|---|---|
| Chỉ ghép lịch私/わたし đã có căn cứ, không ghép mọi ứng viên từ điển | Tránh gộp sai đồng âm/nghĩa/dạng; giữ khóa backup cũ | Mở rộng spellingGroups sau rà nguồn+test xung đột |
| Mục có1ứng viên vẫn chưa duyệt nghĩa | Khớp chữ/kana không chứng minh dịch Việt/ví dụ đúng | Chọn sourceSense và lưu kết quả rà từng usage |
| 394N5+158N4mới=552ứng viên;70dạng chưa rõ riêng | Không đếm dạng chia thành từ mới hoặc giấu phần chưa chuẩn hóa | Giải quyết mục chưa rõ, kiểm lại, không xóa mục chỉ để đạt tỷ lệ |
| Vai trò chủ động/nhận biết hiện kế thừa nhãn cũ, mục chưa phân loại giữ rõ | Nhãn hỗ trợ không thể chứng minh mục tiêu đã đủ | Rà lại từng mục theo đích sử dụng ở bước3 |
| Ngưỡng kaiwa tạm vẫnN5≥3/N4≥4 tình huống mới và48h, các tiêu chí0–2 | Đã được ủy quyền, chưa chuẩn hóa hay đánh giá nói độc lập | communication-criteria.json; hiệu chỉnh bằng kết quả học thật |
| Tách cổ bộ thủ/classical radical khỏi thành phầnKanjiVG | Tránh bịa nghĩa/từ nguyên từ sơ đồ nét | Dữ liệu hai lớp, dẫn nguồn riêng |


## Quyết định nguồn12/11
Giữ mô hình chỉ trong tác vụ đã đạt; không dùng Qwen4B làm chuyên gia duyệt do phản hồi thật sai. Lượt nguồn là trạng thái đối chiếu, không phê duyệt toàn ví dụ. 6cụm/tên giữ khóa cũ nhưng không đếm thành đầu mục mới; có thể xem/thay phân loại trong compositional-word-reviews.js. Nhãn vai trò học cũ còn nhiều nhận biết/chưa phân loại, phải chọn lại khi chốt lõi bước3.


## Chọn bổ sung lõiN5 —12/11
Ưu tiên từ sinhhoạt có chỗ dùng:trường/nghề,địađiểm,tuầntháng,thứcăn,dụngcụ,tínhchất,sởthích,vịtrí,giađình,thờitiết,sứckhỏe,quầnáo. Đợt này63ngữcảnh/17câu áp dụng, nối lịch ôn hiện có. Vai active chỉ là ýđịnhchươngtrình,không phải đãthànhthạocủangườihọc. Có thể chỉnh danh sách/lesson ởn5-functional-lexicon.js; không đổiIDbài. 450mục dựthảo vẫn chưa đủ cơsở làm tài liệu duy nhất N5; phải tiếp tục rà nhu cầu và toàn bài.


## Audio nền và tối ưu dữ liệu
Chọn đọc biến thể đầu tiên khi bảng có nhiều biến thể đúng; ghi rõ trên giao diện, không yêu cầu thuộc cả bảng để học tiếp. Chỉ bật native audio khi có file; không tự ghi thành tích từ việc phát mẫu. Metadata nguồn dùng các bảng chuỗi dùng chung, khôi phục ra cùng656 bản ghi trước/sau; có hash đối chiếu. Không đổi ý nghĩa hay trạng thái duyệt.

## G2 — đối chiếu nghĩa và cách đọc theo nguồn (12/11/2026)
Trạng thái script: `met` cho đối chiếu nguồn. Có 797 lượt từ/cụm lõi: 791 lượt có sense JMdict được chọn, 6 ngoại lệ tên/cụm có nguồn riêng; 60/60 usage mơ hồ được thu hẹp theo usage; 298/298 Kanji N5/N4 có hồ sơ KANJIDIC2, nghĩa và ít nhất một cách đọc. Manifest ghi giấy phép dữ liệu dẫn xuất CC BY-SA 4.0; hồi quy kiểm tra license, tên nguồn và nhãn đối chiếu; toàn suite 24 file/130 test pass. Đây là trạng thái đối chiếu/truy vết nguồn của tác giả dự án, không phải duyệt ngôn ngữ độc lập hoặc xác nhận toàn bộ nghĩa Việt/ví dụ/ngữ âm; G4 vẫn `unverified`.

## G3 — phạm vi tham chiếu (12/11/2026)
Đã quyết định cách phân loại đề xuất Kanji N3 nhưng chưa xác lập đủ inventory: 81 chữ consensus + 214 chữ community-selection = 295 chữ trong working-core proposal; 104 chữ functional-extension để riêng, không dùng chỉ để đạt mốc xấp xỉ; 227 bridge candidates giữ riêng, chưa tự động xếp N3/N4. Chấp nhận mirror Tanos ghim hash làm bằng chứng nghiên cứu membership có ghi công, không coi là parity với artifact gốc hoặc giấy phép Creative Commons. Đề xuất mới 295 thấp hơn mốc cảnh báo ~350 là -55; không tự thêm/bớt chữ để khớp số. Còn 19 yêu cầu từ chưa khớp, đề xuất từ N5/N4 chưa nhập vào reference inventory, và trích dẫn nguồn trực tiếp hiện có ở 23/144 mẫu ngữ pháp N5, 5/86 N4. G3 vẫn `not-met`; tài liệu này không phải danh mục JLPT chính thức hay học liệu người dùng.

## Lô từ vựng N5 01 — 13/11/2026
Thêm 80 mục từ/cách đọc/lexeme riêng vào các bài N5 hiện có; không đổi ID hoặc thứ tự bài. Lý do theo nhóm: thông tin cá nhân, gọi món, mua sắm/quần áo, thời gian/lịch. Nghĩa Việt và ví dụ do dự án tự soạn; 80/80 có entry+sense JMdict được ghim. Báo cáo sinh từ dữ liệu: `evaluation/vocabulary-expansion-batch-01.json`.

Baseline được chạy lại từ mã trước lô bằng `scripts/lexical-register.mjs`; đếm `candidateLexemes` là entry JMdict đã chọn, không phải danh mục JLPT:

| Phạm vi | Trước (surface / lexeme) | Sau (surface / lexeme) |
|---|---:|---:|
| N5 | 516 / 510 | 596 / 590 |
| N4 mới, loại trùng với N5 | 222 / 217 | 222 / 217 |
| N5 + N4 tích lũy, loại trùng | 748 / 727 | 828 / 807 |

Lô tăng đúng 80 lexeme mới. Còn thiếu 210 lexeme để chạm mốc N5 800 và 693 lexeme để chạm mốc tích lũy N4 1.500; chưa được tuyên bố đủ chương trình.

Nguồn/giới hạn: Irodori Starter/Elementary 1–2, wordlist snapshot ngày 12/11 (SHA-256 trong báo cáo), quyền “All rights reserved”; chỉ dùng để xác nhận membership/cách đọc, không chép bản dịch, audio, bài tập hay hình. Minna no Nihongo I/II bản 2 chỉ làm căn cứ chức năng/thứ tự; research hiện không có exact vocabulary list để audit membership. JMdict 09/11, EDRDG, CC BY-SA 4.0, dùng để kiểm dạng và chọn sense; không gán cấp JLPT. Do đó có hai họ nguồn độc lập cho membership/dạng từ và nghĩa, nhưng yêu cầu “hai danh sách từ vựng chương trình độc lập” vẫn `not-met`; không mô tả Minna là danh sách đã đối chiếu.

G4: mẫu phân tầng xác định trước 30/80 (8 identity/contact, 8 food, 8 shopping, 6 time); không dùng ngưỡng lỗi 3%. Không thấy lỗi nội dung đã xác nhận trong mẫu. Một bất đồng nghĩa được xử lý: Irodori ghi `相手` theo nghĩa “spouse” ở tọa độ đó; lô chọn JMdict `1401000-s1` “other party/addressee” cho bạn đối thoại, đúng ví dụ riêng. Đây là rà nguồn của tác giả dự án, không phải duyệt học thuật độc lập/toàn kho.

Audio: đủ 80 từ + 80 câu có WAV phát được; local VOICEVOX Engine 0.26.1 và kana analyzer khai báo khớp. Chưa nghe duyệt ngữ âm; không coi là xác nhận phát âm chuẩn.

## Lô từ vựng N5 02 — 13/11/2026
Thêm 80 mục từ theo nhóm lịch/tần suất, thiết bị và tiện nghi, đi lại/định hướng, trường học/công việc; mỗi mục có lý do sử dụng, nghĩa Việt theo ngữ cảnh, ví dụ tự soạn và liên kết bài hiện có. Không đổi ID/thứ tự bài. Báo cáo kiểm nguồn, mẫu G4 và audio được sinh tại `evaluation/vocabulary-expansion-batch-02.json`.

| Phạm vi | Trước (surface / lexeme) | Sau (surface / lexeme) |
|---|---:|---:|
| N5 | 596 / 590 | 676 / 670 |
| N4 mới, loại trùng với N5 | 222 / 217 | 222 / 217 |
| N5 + N4 tích lũy, loại trùng | 828 / 807 | 908 / 887 |

Baseline trước lô 02 được đo lại sau lô 01 bằng `scripts/lexical-register.mjs`; lô 02 tăng 80 candidate lexemes N5 và tích lũy. Còn thiếu 130 lexeme để chạm mốc N5 800 và 613 lexeme để chạm mốc tích lũy N4 1.500; chưa đủ chương trình.

G4: mẫu phân tầng xác định trước 30/80 (8 lịch/tần suất, 8 tiện nghi, 8 đi lại, 6 học tập/công việc). Đối chiếu tọa độ/chữ/cách đọc Irodori, sense JMdict đã ghim, nghĩa Việt và ví dụ theo ngữ cảnh; không thấy lỗi nội dung đã xác nhận trong mẫu. Đây là rà của tác giả dự án, không phải duyệt học thuật độc lập/toàn kho.

Audio: đủ 80 từ + 80 câu với WAV phát được; 32 mismatch đọc kana trong lần chạy đầu đã được xử lý bằng quy tắc phát âm do analyzer báo và một `audioReading` riêng cho câu 夏は冷房を使います để giữ furigana chuẩn khỏi biến thể analyzer. Câu いつも七時に起きます dùng しちじ thống nhất với output. Kana analyzer/TTS khớp sau cùng; chưa nghe duyệt ngữ âm.

Nguồn và giới hạn như lô 01: Irodori xác nhận membership/cách đọc, JMdict xác nhận dạng/sense được chọn, Minna no Nihongo I/II bản 2 chỉ là căn cứ chức năng/thứ tự bài. Yêu cầu hai danh sách từ vựng chương trình độc lập vẫn `not-met`; không coi candidate count là danh mục JLPT hoặc chứng nhận N5.

## Lô từ vựng N5 03 — 13/11/2026
Thêm 130 lexeme candidate duy nhất vào bài N5 hiện có, phủ nhu cầu sức khỏe, mô tả/thời tiết, sở thích, giao tiếp, lịch, trường/làm việc và đồ dùng. Mỗi mục có nghĩa Việt theo ngữ cảnh, ví dụ tự soạn, lý do dùng, liên kết bài, JMdict entry/sense và tọa độ Irodori; không đổi ID/thứ tự bài. Báo cáo sinh dữ liệu: `evaluation/vocabulary-expansion-batch-03.json`.

| Phạm vi | Trước (surface / lexeme) | Sau (surface / lexeme) |
|---|---:|---:|
| N5 | 676 / 670 | 806 / 800 |
| N4 mới, loại trùng với N5 | 222 / 217 | 222 / 217 |
| N5 + N4 tích lũy, loại trùng | 908 / 887 | 1.038 / 1.017 |

Đợt tăng 130 candidate JMdict lexemes ở N5. Mốc N5 800 vừa đạt; đây không phải danh mục JLPT chính thức hay bằng chứng chương trình đã đủ. Tích lũy còn thiếu 483 lexeme để chạm 1.500; phần mới N4 hiện vẫn 217.

G4: mẫu phân tầng xác định trước 33/130 (4 sức khỏe, 5 mô tả/thời tiết, 5 sở thích, 4 từ bổ nghĩa, 2 nhận diện, 5 tương tác, 2 thời gian, và 1 mỗi nhóm ăn uống/mua sắm/nhà cửa/định hướng cộng 2 trường việc). Đối chiếu Irodori, sense JMdict, nghĩa Việt và ví dụ; không thấy lỗi nội dung đã xác nhận trong mẫu. Đây là rà của tác giả dự án, không phải duyệt độc lập/toàn kho.

Audio: đủ 130 từ + 130 câu có WAV phát được; sửa các bất đồng kana của VOICEVOX bằng mapping đọc có ghi trong `scripts/tts-readings.mjs` và `audioReading` riêng khi câu có cách đọc TTS khác. Không nghe duyệt ngữ âm; “khớp” chỉ là analyzer output khớp metadata, không phải chuẩn phát âm.

Nguồn tiếp tục như các lô trước: Irodori xác nhận spelling/reading/membership và JMdict xác nhận dạng/sense; Minna bản 2 chỉ được dùng cho liên kết chức năng. Yêu cầu hai danh sách từ vựng chương trình độc lập vẫn `not-met`.

## JLPT — facts and app thresholds (2026-11-12)
Đã đối chiếu ngày 2026-11-12 với [bảng thời lượng và dạng câu JLPT](https://www.jlpt.jp/e/guideline/testsections.html), [quy tắc điểm/đỗ](https://www.jlpt.jp/e/guideline/results.html), [FAQ](https://www.jlpt.jp/e/faq/) và [trang đề mẫu](https://www.jlpt.jp/e/samples/forlearners.html). N5 có ba phần 20/40/30 phút, tổng 180, ngưỡng tổng 80; N4 là 25/55/35 phút, tổng 180, ngưỡng tổng 90. Cả hai yêu cầu dự đủ phần và đạt đồng thời 38/120 cho nhóm kiến thức ngôn ngữ + đọc và 19/60 cho nghe. Có 14 dạng câu N5, 15 dạng N4; dạng cách dùng từ có ở N4, không có ở N5. Điểm JLPT là điểm chuẩn hóa; không quy đổi tỷ lệ đúng trong ứng dụng thành điểm hoặc kết luận đỗ. Các dữ kiện này hiện được dùng trực tiếp cho kiểm tra điểm và giới hạn nhập ở nhật ký đề mẫu. G9 vẫn chưa đạt: độ phủ, chất lượng và nhiều bộ đề song song chưa được chứng minh. PDF mục đích N4 đã nhận được dưới dạng PDF nhưng chưa trích xuất/đọc nội dung; không dùng nó làm bằng chứng chi tiết.

## N4 từ vựng — lô 01, 13/11/2026

Thêm 85 lexeme mới vào bài 26–50 theo ba nhu cầu dùng được ngay: thủ tục/cơ sở công cộng, mô tả triệu chứng/giao tiếp thường ngày với cơ sở y tế, và biển báo/phòng chống thiên tai. Mỗi mục có nghĩa Việt theo ngữ cảnh, ví dụ tự soạn, lý do dùng, Minna II bản 2 liên kết theo chức năng, JMdict entry/sense và tọa độ Irodori Starter/Elementary 1–2. Không đổi ID/thứ tự bài. Báo cáo sinh: `evaluation/vocabulary-expansion-n4-batch-01.json`.

| Phạm vi | Trước (surface / lexeme) | Sau (surface / lexeme) |
|---|---:|---:|
| N5 | 806 / 800 | 806 / 800 |
| N4 mới, loại trùng với N5 | 222 / 217 | 307 / 302 |
| N5 + N4 tích lũy, loại trùng | 1.038 / 1.017 | 1.123 / 1.102 |

Baseline đo lại bằng `scripts/lexical-register.mjs`. Lô tăng đúng 85 JMdict candidate lexemes N4 mới; hiện còn 398 để đạt mốc chương trình tích lũy 1.500. Đây là ngưỡng chương trình, không là danh mục JLPT chính thức hay bằng chứng đủ chương trình.

### Nguồn tham chiếu và bất đồng

- Irodori Starter/Elementary 1–2: membership/cách đọc và tọa độ; snapshot `.sources/irodori-20261112/wordlist_all.json`, SHA-256 `c4584bd546ad7897f04aec7d3b51193ee946350f75e71321b4ed16b89e02e563`, quyền All rights reserved. Không chép nghĩa, ví dụ, bài tập/audio/hình.
- Danh sách cộng đồng OpenJLPT ghim commit `0d1d3410bec90bd4098a7c72de820543cb4f707c`; N4 snapshot có 630 dòng, SHA-256 `B38512A6DC1E06A3615F377B3E58184C4A85B6F769C2E3F58F2A4EF0E1810927`; CC BY-SA 4.0, có ghi công và giữ điều khoản share-alike. Danh sách dựa trên Waller/JMdict/KANJIDIC2/Tatoeba và chỉ là ước lượng cộng đồng, không phải chuẩn JLPT. Lô này trùng chính xác spelling+reading với 4/85 từ; 81 mục không có trong N4 snapshot. Không lấy vắng mặt làm lý do tự động loại, cũng không coi Minna là danh mục từ chính xác đã xác minh.
- JMdict 09/11, CC BY-SA 4.0, được dùng để ghim entry/sense, không chứng nhận dịch Việt hoặc cấp N4. Minna no Nihongo Shokyu II, bản 2, chỉ dùng cho mục đích bài và thứ tự/chức năng; exact wordlist Minna chưa có trong research. Đối chiếu được hai họ danh sách từ vựng độc lập (Irodori và Waller/OpenJLPT), nhưng bất đồng lớn và phạm vi Minna chính xác còn chưa xác minh.
- Sửa false match cụ thể: R2 gán `うがい` vào JMdict 1172200 (鵜飼い/cormorant fishing) do trùng kana; nội dung lô dùng entry 1577660, sense “gargling/rinsing one's mouth”. Giữ lại dấu vết matcher và lý do sửa ở `src/n4-vocabulary-batch-01.js`; không đổi raw snapshot.

### G4 và audio

Mẫu phân tầng xác định trước 30/85 (10 thủ tục, 10 sức khỏe, 10 an toàn). Đối chiếu tọa độ Irodori, reading, JMdict sense, nghĩa Việt, câu ví dụ, liên kết bài và asset. Không phát hiện thêm lỗi nghiêm trọng trong mẫu sau khi sửa false match nêu trên. Đây là kiểm mẫu do tác giả dự án thực hiện, không phải duyệt học thuật độc lập/toàn kho; ngưỡng 3% không dùng để chứng nhận toàn bộ dữ liệu.

Audio có 170/170 WAV từ VOICEVOX local Engine 0.26.1; batch analyzer khớp reading khai báo, 0 tác vụ bị giữ sau mapping âm dài/đọc kana và audio-only input cho một từ mà TTS đọc sai. Không có người nghe duyệt; khớp analyzer không chứng minh ngữ âm chuẩn.

## N4 từ vựng — lô 02, 13/11/2026

Thêm 86 lexeme N4 mới theo nhu cầu giao tiếp cảm xúc/quan hệ, thay đổi và lựa chọn, đi lại/cộng đồng, học tập/công việc, nhà cửa/giải trí, số lượng/điều kiện. Mỗi mục có nghĩa Việt theo ngữ cảnh, ví dụ tự soạn, lý do dùng, liên kết chức năng bài 26–50, entry/sense JMdict, source crosswalk và audio. Không đổi ID/thứ tự bài. Báo cáo tái lập: `evaluation/vocabulary-expansion-n4-batch-02.json`; audit: `scripts/n4-vocabulary-batch-02-audit.mjs`.

| Phạm vi | Trước (surface / lexeme) | Sau (surface / lexeme) |
|---|---:|---:|
| N5 | 806 / 800 | 806 / 800 |
| N4 mới, loại trùng với N5 | 307 / 302 | 393 / 388 |
| N5 + N4 tích lũy, loại trùng | 1.123 / 1.102 | 1.209 / 1.188 |

Baseline trước lô được tái lập từ lexical register hiện hành bằng cách loại đúng 86 usage của batch này; không dùng số lịch sử làm baseline. Mục tiêu chương trình N5 800 đã đạt theo candidate lexeme count; N4 tích lũy còn thiếu 312 để chạm 1.500. Các count là entry từ điển được phân loại, không phải danh mục JLPT hoặc chứng nhận đủ chương trình. Surface keys và lexeme IDs được báo riêng, không dùng biến thể/hình thức chia để tăng số.

### Nguồn tham chiếu và bất đồng

- OpenJLPT N4 tại commit `0d1d3410bec90bd4098a7c72de820543cb4f707c`, 630 dòng, SHA-256 `B38512A6DC1E06A3615F377B3E58184C4A85B6F769C2E3F58F2A4EF0E1810927`, CC BY-SA 4.0: 86/86 entry ID có mặt, 85/86 trùng exact spelling+reading. Ngoại lệ `挨拶` đối chiếu entry JMdict 1151120 với dạng OpenJLPT `あいさつする`; giữ `挨拶` làm danh từ kết hợp する và lưu khác biệt, không coi là exact surface.
- Irodori Starter/Elementary 1–2 snapshot ngày 12/11, SHA-256 `c4584bd546ad7897f04aec7d3b51193ee946350f75e71321b4ed16b89e02e563`, quyền All rights reserved: 23/86 exact spelling+reading; 27/86 sau crosswalk theo entry JMdict; 59/86 không có crosswalk Irodori trong snapshot/phạm vi này. Vắng mặt được ghi là bất đồng phạm vi, không tự động loại hoặc chứng minh mục cần thiết. Không sao chép nghĩa, ví dụ, audio, bài tập hoặc hình.
- JMdict 09/11, EDRDG, CC BY-SA 4.0: 86/86 có entry/sense đã chọn; dữ liệu từ điển kiểm tra dạng và gloss tiếng Anh, không xác nhận nghĩa Việt hoặc cấp N4. OpenJLPT sử dụng JMdict cho lexical identity nên không tính là một phiếu chương trình độc lập với JMdict.
- Minna no Nihongo Shokyu II bản 2 chỉ dùng làm mapping chức năng; exact wordlist Minna chưa có để đối chiếu. Do đó nguồn hai danh sách độc lập hiện được cân nhắc ở cấp crosswalk/lô; 59 mục thiếu crosswalk Irodori vẫn cần ưu tiên rà nguồn khác ở các đợt tiếp, không tuyên bố đồng thuận hai danh sách cho từng mục.

### G4, audio và review schedule

Mẫu G4 phân tầng deterministic 30/86: 6 tương tác/cảm xúc, 5 mỗi nhóm thay đổi, nhà/giải trí, học/công việc, đi lại/cộng đồng, và cả 4 mục lượng/điều kiện. Mẫu phát hiện `うち` chọn nhầm JMdict sense s0 “inside/within” cho ví dụ nói về nhà; đã sửa sang s6 “one’s home/family” và thêm hồi quy. Không phát hiện lỗi nghiêm trọng khác trong 29 mục còn lại. Đây không phải duyệt độc lập/toàn kho.

Audio có 172/172 WAV cho từ/câu; local VOICEVOX Engine 0.26.1, analyzer 0 tác vụ held sau các mapping/override chỉ dùng cho synthesis, furigana hiển thị giữ nguyên. Chưa nghe duyệt ngữ âm; metadata khớp không xác nhận phát âm tự nhiên. Từ được tích hợp vào word pool và dùng chung lịch ôn SM-2; test kiểm tra word pool/lịch đến hạn không ghi kết quả học của người thật.

Kiểm tra: `vitest run src/n4-vocabulary-batch-02.test.js` — 1 file/5 test qua; `node scripts/n4-vocabulary-batch-02-audit.mjs` — qua; `npm run build` — qua, nhưng entry chunk 1,683.86 kB (gzip 455.88 kB), chưa đạt mục tiêu <800 kB. Chưa browser QA luồng đánh giá từ/Kaiwa; các assessment riêng chưa được bổ sung. Gate được tái sinh bằng `node scripts/done-gates.mjs`, giữ nguyên mẫu số thực đo: G2 met, G3 not-met, G4 unverified, G5 not-met. Chưa commit khi ưu tiên từ vựng N4 còn thiếu 312 candidate lexeme.
