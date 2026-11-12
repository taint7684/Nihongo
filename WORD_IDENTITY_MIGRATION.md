# Định danh và tương thích v1 — 12/11/2026

Bốn lớp: entry ID ứng viên JMdict / cách viết / dạng chia / nghĩa sử dụng theo bài. Định danh ngữ cảnh là lessonId:surface; nghĩa nguồn chưa chọn giữ null. Không coi khớp duy nhất trong từ điển là đã kiểm ví dụ/nghĩa Việt.

Chuyển tiếp riêng 私/わたし: cùng JMdict1311110, readingわたし, nghĩa I/me. wordReviewKey chọn私 cho lượt mới. Không xóa/ghi đè snapshotわたし, ghi chú, savedWords hoặc lượt luyện cũ. Khi chưa có lịch canonical mới hơn mọi alias, dùng hạn sớm hơn để tránh bỏ ôn. Sau lần ôn mới, lịch canonical mới nhất thay lịch hiển thị của nhóm; snapshot cũ vẫn còn trong backup.

wordEvidenceFor kết hợp hiển thị, không tạo lượt. Lượt mới có usageId tùy chọn. validate schema1 giữ field này; lượt cũ không có field tiếp tục là không xác định ngữ cảnh, không chia giả cho các nghĩa. Các bài/câu hỏi không đổi ID.

Không gộp橋/箸 theo cách đọc; không tự gộp mọi ứng viên biến hình. Các ID từ điển trong kiểm kê là ứng viên, không phải khóa viết lại toàn bộ lịch người dùng.

Khôi phục: xuất JSON tiến độ và kho ghi âm riêng trước rollback. Snapshot mã trước lớp này: .tmp-ui/checkpoint-reference-baseline. Sau khi phát sinh usageId, mã cũ có thể bỏ field mới khi nhập/lưu; giữ file JSON mới nguyên vẹn và kiểm bản cũ ở QA. Không mở hồ sơ thật để thử rollback.
