# Xác minh theo PROJECT_BRIEF — 11/11/2026

## Ba kết quả tách biệt

1. Phần mềm: nhóm công cụ, viết nét, kho ghi âm, vòng N5 và dữ liệu đã có kiểm thực tế như dưới.
2. Học liệu: N5 có 25 bài tự soạn nhưng chưa nghiệm thu đầy đủ; N4 chỉ bản đồ, chưa bài/đánh giá hoạt động. Ngữ âm/học thuật chưa duyệt độc lập. Chưa đủ làm nguồn học duy nhất toàn 0–N4.
3. Người học: chưa đo năng lực thật; không tạo kết quả/nhận xét giả. QA dùng profile riêng với tên QA, không dữ liệu thật.

## Baseline và kiểm mã

Đầu lượt: 40 test/6 file; đọc docs/mã/scripts, Git status xác nhận không repo. Checkpoint source trước nhóm, không sửa study-room. Hiện npm.cmd test: **54 kiểm tra/10 file qua**. Build qua, vẫn cảnh báo JS >500 KB (lần cuối trước chốt docs khoảng 1,14 MB/gzip 249 KB). Không dùng số test làm kiểm học thuật. Asset Kanji kiểm SHA gốc và path/commit/license; audio kiểm tồn tại/metadata khớp, không nghe duyệt.

## Edge thật, dữ liệu QA

| Vòng | Kết quả | Artifact |
|---|---|---|
| Mở tự do | 10→3→25/reload, flashcard/đánh giá, hoàn thành chỉ bài 10 | .tmp-ui/open-access/report.json · 2026-11-11T14:54:53.942Z |
| Vòng học cũ | 1→2, dừng/tiếp tục, từ sai/ôn, audio, đổi ý/backup, 20/25/tổng hợp | .tmp-ui/learning-flow/report.json · 2026-11-11T14:55:27.956Z |
| Công cụ | tìm từ/ghi chú/gõ/flashcard một key, ngữ pháp ID chung, nghe/đọc/viết | .tmp-ui/study-tools/report.json · 2026-11-11T14:54:43.944Z |
| Kanji | source path động, chuột vẽ/undo/save/reload, backup nét/ghi chú | cùng report study-tools; tools-390.png/tools-1440.png |
| Ghi âm | MediaRecorder/IndexedDB/Blob phát thật, lưu/xóa/xuất/nhập, bỏ trùng, abort write khi lỗi | .tmp-ui/voice-storage/report.json · 2026-11-11T15:00:15.617Z |
| N5 nền | bảng tầng trong vòng, đoạn nghe mới, sai có lý do/lịch ôn, độ phủ tách năng lực | .tmp-ui/n5-foundation/report.json · 2026-11-11T14:48:44.619Z |

Mic dùng thiết bị giả của trình duyệt; **không giọng thật hoặc đánh giá nói**. Responsive 390/1440 px đã kiểm tràn ngang và xem ảnh; chưa điện thoại/cảm ứng/micro thật. Kho nhiều nhóm >5 bản chưa chạy thao tác đầy đủ; giới hạn batch được kiểm bằng mã và xuất/nhập một bản thật của mic giả.

## AI thật, mock và review riêng

- Local Qwen3 4B có sẵn, không tải model mới. 6 ca ×3 =18 phản hồi thật có nguồn/JSON; raw evaluation/grounded-ai-raw.json. Lộ đáp án khi xin gợi ý 3/3, ngoài nguồn được thừa nhận nhưng inScope vẫn true 3/3. Độ trễ 10.145–23.590 ms, trung vị 15.898 ms ở mẫu này, không cam kết tốc độ.
- Wrapper thử mới: 3 ca sinh ×3 =9 lời gọi thật, 2 guard ×3 =6 câu mã không gọi model. evaluation/explainer-wrapper-raw.json: có phản hồi Nhật ngoài nguồn bị giữ; vẫn có nghĩa Việt không được nguồn hỗ trợ (fresh-b/3, fresh-c/2). Candidate **không nối UI**, không vá riêng heldout để lấy pass. AI mức 2 chưa hoàn thiện.
- api/ps snapshot size=3.186.108.660 byte, VRAM=0/ctx4096; không phải đo peak RAM. Snapshot working set ghi sau runner hết hạn, chưa bắt đỉnh bộ nhớ tiến trình.
- Rà code ngữ cảnh mới: 9 lượt thử, 2 timeout; evaluation/tools-ai-review.json chỉ **AI review**, không duyệt độc lập. Nhiều báo sai bị bác bằng code/tests, một lỗi callback transaction được xác minh và sửa có fault injection.
- Hủy/timeout UI: mock transport và timer 60 giây rút 200ms, không mock thành phản hồi model đạt. .tmp-ui/ai-boundary/report.json · 2026-11-11T15:05:44.645Z; câu hỏi/bài giữ, học tiếp được. Không lấy mock làm latency/accuracy AI thật.

## Dữ liệu, quyền và phần thiếu

KEY/schema v1/ID cũ giữ; notes/evidence/SM2/vector optional defaults, legacy hoàn thành bài 17 được giữ. JSON tiến độ và archive ghi âm tách, import không ghi đè clip trùng, transaction nguyên tử; BACKUP_GUIDE.md nhắc xuất cả hai trước rollback. Checkpoint không phải sao lưu profile thật.

KanjiVG 46 chữ ghim commit/CC BY-SA 3.0, giữ gốc/attribution. TTS hiện 899 active, 4 retired giữ file, cộng 11 audio cũ; không suy từ số file sang đủ kỹ năng/ngữ âm. Không nhận dạng/chấm nét/ASR, không gửi dữ liệu riêng ra ngoài.

KNOWLEDGE_COVERAGE.md chỉ mẫu số N5 đang có, không danh mục JLPT chính thức/đủ cấp; N4 chưa chốt, không 0/0 giả. Thang giao tiếp tạm chọn theo ủy quyền của user, chưa hiệu lực thẩm định/không tự gán đạt lời nói. Thiếu chính: nội dung/đánh giá N5 đủ, học liệu N4, nhiều tình huống/bộ thi, AI giải thích/tương tác đạt phạm vi hợp lý, nghe duyệt và thiết bị/người học thật. NEXT_STEPS.md ghi điểm tiếp tục.

## Vòng sửa N5 12/11 — đang tiếp tục toàn phạm vi

61 test/12 file qua; build 724.30KB JS/gzip215.56KB (trước 1,141.92KB/gzip250.28KB), vẫn cảnh báo >500KB. Edge thật scripts/n5-repair-ui.mjs: audio index bị chặn→hiện lỗi/retry→tải được; vòng cuối bài1/7/14/25 có ví dụ/âm/câu hỏi lưu; làm bộ B/reload/validate backup; câu cũ giữ, bài chưa học không tự hoàn thành. .tmp-ui/n5-repair/report.json. AI bị chặn trong test UI, không đo năng lực người học. Rà AI học liệu riêng đang chạy, chưa kết luận.

## Nhóm N4/lexicon —12/11

Bài26–30 và bộ riêng nhóm có dữ liệu thật. 66test/13file và build799.61KB/gzip237.20KB qua (trước field toolLessonId); cần unit cuối vòng. Edge .tmp-ui/n4-foundation/report.json đã qua cả lỗi index/retry, vòng26/27/29/30, đánh giá mới, lọc từ đúng cấp, WAV30 phát hết/lưu nghe2câu, prompt26 nghe/gõ/lưu vai, reload chọn26, backup và bài chưa học không tự hoàn thành. Đây là QA máy Windows hiện tại/profile riêng, không kết quả học của người dùng, không ASR/duyệt phát âm.

Nghe định dạng mới:69test/14file +build807.56KB/gzip239.30KB qua. Edge .tmp-ui/listening-formats/report.json: phát đủ3WAV tình huống và4WAV phản hồi (câu hỏi+3lựa chọn), không lộ chữ, cố ý sai→lời giải/ôn5phút, đúng có transcript→ghi trợ giúp, reload/validate backup giữ2lịch sử không tự hoàn thành bài. Không đo năng lực người học hoặc duyệt phát âm.

Nhóm31–35:70test/14file; build859.52KB/gzip253.18KB qua. .tmp-ui/n4-next/report.json Edge qua vòng31/33/34/35, bộ đánh giá mới/reload/backup, nghe33WAV+lưu2câu, nghe/gõđáp31lưu, chọnbài công cụ giữ. Không AI/ASR hoặc bằng chứng học thật. Thay đổi từ vựng/nguồn/audio còn chưa duyệt độc lập.

KanjiFocus:73test/15file/build870.23KB/gzip257.09KB qua. Edge .tmp-ui/kanji-focus/report.json: bài10/vocabulary→北, WAVtừ phát hết; che đọc/gõsaiひがし→lời giải/lịchwordReviews/afterModel, không hoàn thành bài; mở đúng北/nétanimate/vẽchuột/lưu/reload/validatebackup.137VGsource. Chưa cảmứng/micthật/duyệt học thuật/ngữ âm.

36–40:74test/15file/build924.31KB/gzip271.56KB; Edge .tmp-ui/n4-middle/report.json qua vòng/quiz36/37/39/40, WAV39lưu2câu, prompt36/gõđápgiữý, đánhgiámới/reload/backup/lọcN4. Đây làQA, khôngnănglựcngườihọc.


## Kiểm tra thực tế 2026-11-12 — bộ cuối N4 và hồi quy

85 kiểm thử / 16 file đã qua; build 1023.43 KB JS (298.40 KB gzip), cảnh báo chunk >500KB còn tồn tại. Đã kiểm lại sau sửa lời giải và tách chunk.

- Edge n4-final: vòng46/47/49/50, lỗi manifest/thử lại, bộ46–50, nghe49, đáp46, reload/backup/toolLessonId; qua.
- Edge n4-comprehensive: sai→lời giải→ôn, nghe trọn WAV mới, 2 câu không transcript, reload kết quả riêng, khung390px không tràn ngang; qua.
- Edge n4-capstone: prompt ẩn chữ, WAV thật, tự gõ đáp và hỏi lại chọn nhánh có WAV, lưu/rest48h/backup/chọn nhiệm vụ; qua. Không ASR, không chấm phát âm.
- test:access: mới chưa học mở10→3→25, flashcard/luyện/đánh giá, reload, hoàn thành riêng10; qua. Đã sửa script chờ timeOrigin mới sau reload để tránh đọc DOM cũ.
- test:ui: vòng1→2, nghe/đáp/hỏi tiếp, gõ sai→ôn, dừng/tiếp tục, xuất/nhập UI,390/1440px, bài20/25 và báo cáo cuối; qua. Đã bổ sung chờ audio index bất đồng bộ trong QA.
- test:ai-boundary qua: mock transport hủy và mock timer tăng tốc; không phải phản hồi AI thật. Review AI thật trước đó không tạo báo cáo hợp lệ; không gán duyệt.

Mọi profile kiểm tra tách riêng; không có bằng chứng người dùng đã học hoặc đạt N5/N4. Chưa kiểm mic/cảm ứng thật, chưa nghe duyệt ngữ âm độc lập, chưa thẩm định toàn khóa.

Đối chiếu checkpoint đầu vòng:414câu cũ giữ ID/choices/answer. Backup QA tạo bởi mã cũ giữ answers/completed/lessonId khi nhập mã mới. test:tools sau tách chunk qua tìm từ/ghi chú/ôn/chia sẻ ID/nghe/viết/nét/backup. Build cuối1023.43KB JS/gzip298.40KB; cảnh báo >500KB còn.


## 12/11 nhómđịnhdanh

91tests/17file, build qua. Edge .tmp-ui/word-identity/report.json: nguồnJMdict1311110, private aliasnote, gõwatashi ghi lịch私mới giữsnapshot cũ vàusageId; exportJSONthậtvalidatecũ+mới; KanjiReference nguồnOn/Kun/HánViệt/bộ phânloại; Progress552ứngviên. AIblocked, QAfixtures không bằng chứng người học. Chưa đủ mẫu rà nghĩa độc lập. Snapshot/Git không chứaprofile học thật.


## 12/11/2026 — nhóm định danh/nguồn
93tests/17files và production build qua. Edge QA word-identity qua: lịch/ghi chú cũわたし giữ nguyên, câu trả lời mới私 cóusageId, không tạo hoàn thành giả, exportbackupv1 thực và validate lại. study-tools qua: từ/flashcard/grammar/drawing/listen/read/write/backup trong QA riêng. Không dùng hồ sơ thật. Reports .tmp-ui/word-identity/report.json và .tmp-ui/study-tools/report.json (xem đường dẫn trong script).
Đối chiếu mẫu:0/30 lỗi nghĩa/cách đọc phát hiện ở30từ sau sửa;1/30 lỗi loại từあのđã sửa,privatepronoun bổ sung loại; Kanji0/15 sai trường dữ liệu nguồn sau thayHánViệt,1/15 thiếu mục học riêng(私); câu0/15 lỗi phát hiện trong phạm vi rà; grammar1/10 thiếu trường hợp chiaう→わ đã bổ sung. Các tỷ lệ chỉ mô tả mẫu, không chứng minh toàn kho đúng. Không nghe duyệt ngữ âm, không đánh giá năng lực người dùng. Chi tiết mẫu và nguồn được giữ trong evaluation/source-review. AI review thật không đạt; mock không được tính thay.


## Đợt N5 chức năng —12/11/2026
99tests/18files qua; build sau bổ sung qua (distindex07:46UTC). EdgeQA .tmp-ui/functional-gap/report.json:phátWAVtừ辛いvàcâu thực códuration/currentTime,khônglỗigiảimã; nguồn chỉ hiệnnghĩa cay đang học; gõnhớ/lịch ôn giữ khi reload;0bài tự hoànthành; câu nhờ bậtđèn mới xuất hiện trong vòng học14;390pxkhôngtràn. AIbịchặntrongQA,khôngđánhgiámôhình. MộtlầnQAđầu saischemafixture(at) đãsửa, khôngphảilỗidữliệungườidùng.
So414câu checkpointcũ với764câu hiện tại:0ID/choices/answer thayđổi. Reportevaluation/legacy-compatibility-20261112.json. Nănglựcthậtngườihọcchưađo. Audio1821tổng/1811active,113tài sảnmới; khôngđồngnghĩa1821mụcđãhọc hoặc duyệtngữâm.


## Rà ngữ pháp tiếp12/11 —100tests/18files
Đã đối chiếu trực tiếpTUFS067/069/045/049/072/083/084/086/093; thêm phạm vi nguồn cho18mục, tổng28mục grammar có phạm vi rà(23N5,5N4), không phê duyệt toàn230dòng. Sửa1lỗi giải thích bài16 bắt cùng chủ thể; thêm câu áp dụng riêng, hiện18câu chức năng mới. Bảng từng1–25trongCONTENT_REVIEW vàevaluation/n5-semantic-review-progress.json. Các bài chưa có lượt rà nguồn bổ sung được ghi rõ, không tự đánh hoàn thiện.
Edgeidentity+backup vàopen-access chạy lại sau đợt từ mới đều qua; xemreport riêng. Không truy cập dữ liệu học thật.
