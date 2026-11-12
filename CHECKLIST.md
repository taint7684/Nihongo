# Kiểm tra triển khai — 11/11/2026

Mục tiêu toàn khóa 0→N5 **chưa được nghiệm thu đủ**. Không suy từ số đơn vị/test sang hiệu quả học.

- [x] Tiếp tục Desktop; giữ study-room, ID, KEY/schema v1, không deploy/push.
- [x] Giữ chi phí tiền mặt 0, không API/thẻ/trial/tự nâng cấp; AI không chặn học.
- [x] Bài chia phần ngắn, lưu điểm dừng/vị trí từ, học từ → nhớ → áp dụng, có học liệu tra cứu riêng.
- [x] Tự giới thiệu/hỏi thông tin bài 1 → nhận đồ/chủ sở hữu bài 2 có nối tình huống; không khóa bởi toàn bộ bảng chữ.
- [x] Bổ sung 1–10: từ hỗ trợ, ví dụ/cách đọc, bảng số/giờ/ngày/giá/tầng theo bài; chưa chứng nhận đầy đủ mọi trường hợp.
- [x] Biên soạn 11–25: kiến thức, ví dụ, thực hành/đáp án, đọc, nghe, nhiệm vụ tự dùng và đổi dữ kiện; chưa duyệt độc lập toàn bộ.
- [x] Từ trong bài và flashcard/sổ lỗi dùng chung lịch; gõ nhớ mục cụ thể có lịch ôn.
- [x] Nghe trước không hiện chữ, phát hết mới đáp; lưu transcript/lượt phát/đáp án và ôn.
- [x] Hai vai theo nhiệm vụ, câu khác mẫu chưa tự coi sai; tách lỗi ý với lỗi hình thức đã xác định.
- [x] Hỏi lại có nhánh đáp/audio soạn sẵn; ngoài nhánh báo chưa hỗ trợ, không giả AI tự do.
- [x] Tự báo cáo nói, mức hỗ trợ, dữ kiện đã gặp, làm sớm/sau nghỉ ghi riêng; không chấm phát âm.
- [x] Đọc/viết có hỗ trợ, ý định/bản hiện tại/phiên bản và tiêu chí tự kiểm; không ép nộp thông tin cá nhân.
- [x] Ôn nhóm 1–5, 6–10, 11–15, 16–20, 21–25 bằng câu/tình huống mới; checkpoint giữ lượt cũ.
- [x] Bộ tổng hợp lấy mẫu tách từ/chữ, ngữ pháp, đọc và nghe; đường về điểm yếu; không điểm JLPT giả.
- [x] TTS CPU cục bộ có ghi công/phiên bản/cách tạo/SHA, giữ mục cách đọc chưa khớp; audio cũ giữ nguyên.
- [x] Có đối chiếu âm dài/ngắn/ngắt/ghép bằng từ có audio và luyện nhịp; chưa đủ nghe nhập môn.
- [x] AI giữ scope/guard cũ, không thử thêm mô hình; chữa viết/đọc sinh tự do chưa mở lại.
- [x] Backup cũ/new fields có kiểm; không thao tác dữ liệu học thật.
- [ ] Ma trận độ phủ N5 đầy đủ và nhiều bộ đánh giá song song theo dạng chính thức.
- [ ] Duyệt độc lập toàn bộ Việt–Nhật, đáp án và nghe/ngữ âm; chưa được ghi chuyên gia duyệt.
- [ ] Ngân hàng tình huống/đổi dữ kiện đủ rộng, không lặp sớm; giao tiếp có đánh giá độc lập.
- [ ] Kiểm điện thoại/micro thật và một buổi học với người mới; có dữ liệu hiệu quả, chưa hứa kết quả.
- [ ] Nghiệm thu đủ khóa và sẵn sàng thi; hiện chưa đủ cơ sở.

Kết quả chạy và giới hạn: VERIFICATION.md. Thành phần từng bài: COVERAGE.md. Điểm tiếp tục: NEXT_STEPS.md.

## Bổ sung giữ bản để học thật

- [x] Bỏ khóa ở validate/completeLesson/điều hướng/UI, không chỉ thay biểu tượng.
- [x] Chọn và tiếp tục bài 10/3/25 trên profile mới, không tự hoàn thành 1–9; đã kiểm Edge.
- [x] Rà có hồ sơ cụ thể 1–25; chưa coi đầy đủ hoặc duyệt độc lập.
- [x] Bộ luyện và tự kiểm dạng mới riêng, sắp câu hoạt động thật và chấp nhận các thứ tự khai báo.
- [x] Mẫu audio cả từ nhập môn thêm, không giả mẫu âm đơn đã duyệt.
- [x] Chỉ mục audio gọn, catalog/checksum đầy đủ giữ riêng.

## PROJECT_BRIEF 0→N4 — lượt công cụ

- [x] Lưu brief, baseline/ma trận, checkpoint theo nhóm; không repo Git nên dùng backup.
- [x] Công cụ trực tiếp, từ/flashcard/lịch chung và ngữ pháp ID chung; gõ/nghe/tự dùng phân biệt.
- [x] Nét Kanji có nguồn/giấy phép, vẽ/undo/đối chiếu/save/ôn, không chấm giả.
- [x] Ghi âm qua buổi, riêng kho/backup, duplicate-safe/atomic và giới hạn xuất nhập nhất quán.
- [x] Nền số/giờ/ngày/thuật ngữ tại chỗ, nghe 3/4/5/11.
- [x] Bản đồ N5/N4 thật trạng thái; rubric tạm theo ủy quyền, không gán N4=CEFR.
- [x] Eval AI thật 3 lần/ca và fresh review; candidate sai không phát hành; mock boundary tách riêng.
- [ ] N5 đủ danh mục tham chiếu và đánh giá, N4 có học liệu/đánh giá thật.
- [ ] AI tương tác mức 2 đạt/được duyệt phạm vi hợp lý.
- [ ] Duyệt học thuật/ngữ âm độc lập, thiết bị thật và năng lực người học thật.


## 2026-11-12 — cập nhật triển khai

- [x] Nhóm46–50 có vòng học và bộ đánh giá riêng; Edge lấy mẫu qua.
- [x] Tổng hợpN4A mới, kết quả đọc/ngữ pháp/nghe tách; lỗi về ôn.
- [x] Bốn nhiệm vụ tích lũy, nhánh hỏi lại WAV, giữ điểm dừng/backup.
- [x] Bảng độ phủ1–50; trạng thái lộ trình không còn ghi N4 chưa biên soạn.
- [x] Hồi quy mở tự do/vòng1→2/backup và AI boundary mock qua.
- [ ] Đủ kiến thức và ngân hàng đánh giá toànN5/N4, nghe duyệt ngữ âm, thẩm định học thuật và năng lực người học: chưa đạt.

MASTER_CHECKLIST.md và NEXT_STEPS.md là trạng thái tổng hiện hành.
