# Checklist tổng hiện hành — CURRENT_MISSION.md

Giữ dữ liệu/ID/bản gốc, mở tự do, 0 đồng. Chỉ một checklist tổng; tài liệu khác là bằng chứng hoặc lịch sử. Chạy theo thứ tự mới.

| Bước/yêu cầu | Triển khai | Tiêu chí kiểm | Bằng chứng | Trạng thái |
|---|---|---|---|---|
| 0 Git/mốc | Repo local, ignore cache/runtime/QA/exports | Có commit, không user profile | git log; .gitignore | Đạt mốc f4a3756 |
| 1 Định danh | lexical-register, word-identity, usageId, read adapter | Tách entry/writing/form/meaning; không gán giả sense; backup cũ giữ; alias dùng lịch chung |91 tests; .tmp-ui/word-identity/report.json; WORD_IDENTITY_MIGRATION | Khung+adapter đạt; ứng viên còn chờ đối chiếu nghĩa bước2 |
| 2 Nguồn/rà | JMdict/KANJIDIC2 đã nạp và UI nguồn | Rà toàn kho, mẫu30/15/15/10, sửa nhóm lỗi | evaluation/dictionary-alignment.json; public/dictionaries | Đã đối chiếu kho và đủ mẫu; chưa duyệt độc lập, không chứng nhận mọi ví dụ |
| 3 Tham chiếu+lõiN5/N4 | Tập cũ chức năng; 25+25 bài | Ít nhất2nguồn thực sự độc lập; bù thiết yếu, không chỉ số lượng | reference-targets, CONTENT_REVIEW | Đang làm: đối chiếu hai xuất xứ và thêm đợtN5; toàn lõi chưa đủ |
| 4 Luyện/ôn/đánh giá/kaiwa | Vòng học, bộ riêng, nhiệm vụ tích lũy | Đủ mục tiêu/dạng; giữ nghĩa; dữ kiện mới sau nghỉ; tự kiểm riêng | readiness maps; QA vòng học | Hoạt động nhưng chưa đủ phạm vi |
| 5 Thư viện/bộ thủ |525 mục KANJIDIC tra nguồn;159 mục học/nét | ≥2500 gồm Jōyō kiểm nguồn chính thức,214bộ; không nhận là đã dạy | source manifest; KanjiReference | Chưa đủ thư viện; bộ214 chưa có |
| 6 AI | Nguồn/quy tắc và chọn câu cố định; candidate tắt | Bộ ngữ nghĩa mới3lần, heldout; không giả AI tự do | AI_QUALITY/evaluation | Thiếu AI tương tác |
| 7 Nghiệm thu | Lưu/backup/open access hoạt động | Chức năng/nội dung/chất lượng/năng lực tách | VERIFICATION | Chưa đủ toàn phạm vi |
