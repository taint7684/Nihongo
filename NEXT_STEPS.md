# Điểm tiếp tục hiện hành — 2026-11-12

Đọc PROJECT_BRIEF.md và EXECUTION_BRIEF.md trước khi làm. Mục tiêu vẫn là nguồn học cá nhân 0→N5→N4 đầy đủ; chưa đạt. Giữ bản gốc study-room, schema/key v1, ID/thứ tự bài cũ, tiến độ/backup, mở mọi nội dung, 0 đồng. Không sửa dữ liệu trình duyệt thật.

## Mã đã nối và kiểm

- N5: 25 vòng sửa thiếu cách dùng, bộ B 32 câu riêng, 2 dạng nghe nhiều audio/hình trong bộ luyện và tự kiểm riêng; từ ngữ cảnh và 104 Kanji của tập mục tiêu dự thảo. KanjiFocus gõ cách đọc dùng chung lịch từ, mở đúng nguồn nét.
- N4: 26–50 có vòng kiến thức/ví dụ/luyện/nghe/đọc/nói/viết, 4 vai và 2 tình huống chuyển riêng mỗi bài. Tham chiếu Minna II bản 2, không sao chép sách. 5 bộ đánh giá nhóm riêng, bộ tổng hợp A và 4 nhiệm vụ tích lũy có nhánh hỏi lại. Các bài mới vẫn mở tự do.
- Độ phủ: COVERAGE.md + website hiện cả 1–50; REFERENCE_INVENTORY.md theo tập mục tiêu độc lập. N5 388/388 từ có ngữ cảnh và 104/104 Kanji có mục học; N4 141/240 và 30/186. Đây không phải danh mục JLPT chính thức, không chứng minh đủ hoặc đúng toàn cấp. Matcher cùng cấp có thể báo thiếu từ N5 đã học; phải rà tái sử dụng/nghĩa mới trước khi thêm trùng.
- Audio: 1708 tài sản catalog, 1698 active, 10 retired; held 0 lần tạo cuối. Đối chiếu kế hoạch cách đọc, không phải nghe duyệt ngữ âm. Đã sửa lỗi 三十分 thành 三10分, cách đọc 降り/方/軽い và xử lý はず; hồi quy có kiểm.
- Tải theo nhu cầu: audio index và coverage không nằm trong JS khởi tạo; WAV preload none. JS cuối ~1023 KB trước gzip, còn lớn.
- AI: không mở thêm sinh tự do. Review học liệu mới có 2 timeout và 10 phản hồi không tạo được báo cáo hợp lệ; không tính là duyệt. Candidate grounded vẫn tắt; xem evaluation/grounded-ai-review.json và wrapper raw.

## Tiếp tục ưu tiên nội dung, không tăng số bài

1. Rà N5 1–25 từng mục trong CONTENT_REVIEW: kiến thức/cách dùng, từ hỗ trợ và tiên quyết, câu/đáp án/đọc; ghi cụ thể đã đối chiếu gì. 388/104 là tập chọn dự thảo, không đủ cấp. Bù liên kết đánh giá từ/chữ còn rất ít, không suy đủ từ nguồn hoặc cấu trúc.
2. Bù dạng N5_READINESS_MAP và N4_READINESS_MAP bằng bộ mới, riêng luyện/đánh giá. N4 còn thiếu từ/chữ độc lập, sắp câu, liên kết văn bản, đọc bảng/tìm thông tin và nhiều dạng nghe; tổng hợp A mới lấy mẫu ý nghĩa.
3. N4: rà 99 từ đang báo thiếu, tách từ nền N5 được dùng lại với nghĩa/cách dùng mới; bổ sung ngữ cảnh cần thiết. 156 Kanji mục tiêu chưa có mục học, không bịa nghĩa/bộ phận. Nguồn từ điển phải kiểm giấy phép; chưa tải KANJIDIC2. Có KanjiVG 158 nguồn nét trong cache, không đồng nghĩa đủ chương trình Kanji N4.
4. Giao tiếp: nhánh mới còn hẹp. Thêm mục đích/ý định khác nhau và cách đáp đúng; giữ câu ngoài kho là chưa xác nhận. Phản hồi mở cuối nhánh và lời nói chưa chấm độc lập. Không tạo kết quả học thay người dùng.
5. Audio: nghe duyệt mẫu nguy cơ, âm nhập môn, số/giờ/trợ từ; tách dữ liệu cách đọc khỏi duyệt ngữ âm. Không dùng TTS làm chuẩn chấm phát âm. Kiểm mic/cảm ứng trên thiết bị thật chưa làm.
6. Tách thêm UI/học liệu theo nhu cầu khi có kiểm hồi quy; không xóa audio cũ còn được backup tham chiếu.

## Bằng chứng và lệnh

85 tests / 16 files và build cuối đã qua sau sửa lời giải/tách chunk. Edge: .tmp-ui/n4-final/report.json, n4-comprehensive/report.json, n4-capstone/report.json, open-access/report.json, learning-flow/report.json (xem đúng thư mục script dùng), ai-boundary/report.json. AI boundary là mock transport/timer; các bài UI khác chặn AI, không chứng minh mô hình.

Lệnh: npm.cmd test; npm.cmd run build; npm.cmd run test:access; npm.cmd run test:ui; node scripts/n4-final-ui.mjs; node scripts/n4-comprehensive-ui.mjs; node scripts/n4-capstone-ui.mjs. Dùng QA profile riêng, port 5175. Tạo audio bằng node scripts/generate-course-audio.mjs --all chỉ khi engine cục bộ 50021 đã chạy. Không tải thêm model.

Website: START-WEBSITE.cmd hoặc npm.cmd start. Trước rollback xuất cả JSON tiến độ và kho ghi âm riêng (BACKUP_GUIDE.md). Checkpoint mã mới: .tmp-ui/checkpoint-n4-final-passed; không chứa dữ liệu học thật hoặc toàn bộ WAV. Không tự nhận hoàn thành nhiệm vụ tổng.

Tối ưu cuối vòng: công cụ, coverage, knowledge report và curriculum tải chunk khi mở; có biên lỗi giữ menu nếu tải thất bại. test:tools sau đổi qua. JS khởi tạo1023.43KB/gzip298.40KB; học liệu vẫn tải chung. Đã so414câu cũ với checkpoint: ID/thứ tự lựa chọn/đáp án giữ nguyên, backup schema-v1 cũ qua; report .tmp-ui/full-scope/legacy-question-compatibility.json.
