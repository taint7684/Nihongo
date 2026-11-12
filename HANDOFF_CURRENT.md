# Bàn giao trạng thái — 12/11/2026

**Chưa hoàn thành toàn bộ mục tiêu 0→N4; chưa xác nhận đủ làm tài liệu học duy nhất, chưa đo năng lực người học.** Không hứa đỗ JLPT hay kaiwa. Giữ schema/key v1, ID/thứ tự bài, dữ liệu và backup; học mở tự do; ngân sách 0 đồng.

## Thay đổi và xác minh mới nhất

- Phạm vi tham chiếu giữ cố định `reference/working-scope-r1.json`; test kiểm hash và equality với `referenceTargets`. Nguồn/chọn/bất đồng/giới hạn ở `evaluation/curriculum-source-comparison.json`. Không gọi đây là danh mục JLPT chính thức và không tuyên bố đủ cấp.
- Inventory hiện hành có 450 dòng N5, 240 dòng N4. N4 tách 222 mục từ/cụm khỏi 15 mục grammar và 3 thuật ngữ kính ngữ; ba nhóm cuối không bị báo nhầm là 18 từ vựng thiếu ngữ cảnh. 15 grammar và 3 glossary được giữ riêng để đối chiếu nội dung.
- R1: danh sách 61 ngữ cảnh từ và 155 Kanji đã có ngữ cảnh/từ thật/nguồn/câu hỏi đọc; kiểm thử trực tiếp xác nhận mọi mục. Không có mục còn thiếu trong chính hai danh sách đóng này. Điều đó không xác nhận toàn bộ N4 hoặc mọi cách dùng, On/Kun, chữ viết tay.
- Thư viện tra cứu gồm 2.136 Jōyō theo nguồn chính thức và 863 chữ ngoài Jōyō theo grade 9/10 KANJIDIC2; tổng 2.999. Có 214 bộ Khang Hy từ Unicode. Độ phủ tách: lookup 2.999, nét 297, learning 296, practice/review 296, assessment 154. Thư viện được truy cập qua Công cụ học → Thư viện Kanji / Bộ thủ; tra cứu không tự ghi nhận đã học.
- UI thực tế: Edge QA trên hồ sơ QA riêng đã qua tìm từ, flashcard, ngữ pháp, tô/tự viết Kanji, thư viện mới, nghe/đọc/viết, backup export/import; responsive 390/1440px và AI network blocked trong test. Một lỗi đọc nhầm manifest gây ErrorBoundary đã sửa; Edge chạy lại qua.
- Kiểm gần nhất: `npm.cmd test` 22 file/111 test qua; `npm.cmd run build` qua. Build cảnh báo bundle chính 1.37 MB (>500 KB); chưa ưu tiên tối ưu khi còn thiếu nội dung cốt lõi.

## Còn phải làm — theo tiêu chí đóng nhóm

1. **N5 lõi chưa đóng.** Dù có 25 bài và 450 mục từ trong working target, vẫn phải kiểm từng chức năng, tiên quyết, ví dụ/đáp án, nghe/đọc, áp dụng mới và ôn; nội dung đúng cần đối chiếu nguồn cụ thể. Chưa có duyệt chuyên môn/ngữ âm độc lập.
2. **Liên kết đánh giá còn thiếu.** Bộ đếm cấu trúc hiện tại: N5 grammar 34/144, N4 grammar 74/86, từ N5 2/509; từ N4 0/261 và Kanji N4 0/195 đạt điều kiện có học+luyện+đánh giá riêng+ôn theo định nghĩa bộ đếm. Tác vụ giao tiếp N5 0/56, N4 0/50 có link tới đánh giá độc lập theo bộ đếm. Đây là trạng thái liên kết mã, không có nghĩa những nội dung khác không hoạt động; không tự gắn câu đánh giá nếu chưa đúng mục tiêu.
3. Hoàn thiện N4 sau N5 theo R1, không thay denominator vì số lượng chưa đẹp. Dùng `SCOPE_CHANGES.md` chỉ khi chỉ ra gap mới cụ thể.
4. Bổ sung/đóng ngân hàng giao tiếp và bài đánh giá N5/N4; giữ bộ luyện khác bộ đánh giá. Kaiwa chưa được người nghe/chấm độc lập; rubric hiện là tiêu chí thử, không phải điểm N4/JLPT.
5. AI sinh giải thích/chữa viết/hội thoại rộng còn thiếu. Candidate ngoài nguồn chưa nối UI; xử lý theo lỗi thực tế bằng tập mới lặp ≥3 lần và held-out. Không thay bằng FAQ.
6. Audio TTS không được duyệt ngữ âm độc lập. Không tự nhận ASR/chấm phát âm hoặc chấm nét; chưa đo năng lực người học.

## Chạy và khôi phục

Từ thư mục dự án: `npm.cmd test`, `npm.cmd run build`, `npm.cmd run test:tools`. QA dùng Edge profile tạm riêng, AI bị chặn trong test. Dữ liệu nguồn/tiến độ cá nhân không đưa vào báo cáo QA. Trước rollback xuất JSON tiến độ và kho ghi âm riêng theo `BACKUP_GUIDE.md`; checkpoint mã không thay backup profile.

Checklist tổng duy nhất: `MASTER_CHECKLIST.md`. Điểm tiếp tục chi tiết: `NEXT_STEPS.md`. Chưa commit/push trong lượt này vì working tree vốn có nhiều thay đổi chưa commit; đã giữ nguyên, không dọn/revert.
