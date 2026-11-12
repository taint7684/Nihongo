# Điểm tiếp tục hiện hành — 12/11/2026

Mục tiêu vẫn là tài liệu tự học cá nhân 0 → N5 → N4. **Chưa hoàn thành toàn phạm vi và chưa đủ căn cứ làm nguồn học duy nhất.** Giữ schema/key v1, ID/thứ tự bài, dữ liệu học/backup, truy cập tự do, 0 đồng và QA bằng hồ sơ riêng. Không coi số bài, audio, test hoặc bản ghi tra cứu là bằng chứng người học thành thạo hay sẽ đỗ.

## Hoàn thành trong lượt gần nhất

- G0 commit mốc: `b16562cc5751b4f0220b7d233365dcd8a63edd2b` (174 file mã/tài liệu/nguồn). Đã loại dữ liệu học thật, `.tmp-ui`, build output, generated datasets và QA report khỏi commit. Sau commit còn 2.838 mục generated/working output chưa commit; giữ nguyên tại chỗ, không xóa.
- Xác minh sau commit: `npm.cmd test` — 22 file/111 test pass; `npm.cmd run test:access` — Edge mở tự do bài 10→3→25, reload/tiếp tục và chỉ hoàn thành bài đã làm; `npm.cmd run test:voice` — IndexedDB/backup export-restore/transaction lỗi qua trên QA riêng. Không dùng hồ sơ học thật.
- Chạy `npm.cmd run coverage`: số liệu cấu trúc hiện tại N5 từ 2/509, Kanji 0/123, grammar 34/144, nhiệm vụ 0/56; N4 từ 0/261, Kanji 0/195, grammar 74/86, nhiệm vụ 0/50. Script ghi rõ đây không phải tuyên bố đủ cấp.
- Hòa giải báo cáo inventory: 240 dòng N4 gồm 222 mục từ/cụm và 18 mục loại khác. 15 mục grammar và 3 thuật ngữ kính ngữ không phải 18 từ vựng thiếu ngữ cảnh. Inventory được sửa để đếm từ thiếu riêng; 15/3 hiện theo dõi thành nhóm grammar/glossary. Đây là phân loại trong working scope, không chứng nhận phạm vi cấp đủ.
- Kiểm tra hash `reference/working-scope-r1.json`; test đóng 61 ngữ cảnh từ R1 và 155 Kanji R1 qua. Danh sách khoảng trống đã được kiểm theo nghĩa/đọc nguồn, ví dụ, câu hỏi đọc; Kanji gắn từ thật và câu hỏi. Chưa có duyệt học thuật hoặc nghe độc lập.
- Tạo thư viện tra cứu 2.999 chữ: 2.136 Jōyō theo nguồn chính thức và 863 chữ ngoài Jōyō theo metadata KANJIDIC2 grade 9/10. Có 214 bộ Khang Hy từ Unicode CJKRadicals; nghĩa/Hán Việt/nét gắn với chữ tương đương nguồn, không phải giải thích từ nguyên.
- Thêm màn “Thư viện Kanji / Bộ thủ” trong Công cụ học, tìm kiếm/lọc, ví dụ liên kết ngược và ghi rõ tra cứu ≠ đã dạy. Năm lớp báo riêng: tra cứu 2.999, nét 297, có học liệu 296, luyện/ôn 296, có liên kết đánh giá 154. Không gán học liệu cho chữ chỉ vì nó có trong thư viện.
- Kiểm: `npm.cmd test` — 22 file/111 test qua; `npm.cmd run build` qua; `npm.cmd run test:tools` qua trên Edge thật, gồm tìm thư viện và đổi giữa Kanji/bộ thủ; `npm.cmd run test:access` và `npm.cmd run test:voice` qua. QA dùng profile riêng, không dùng thành tích người học thật.
- Build vẫn cảnh báo bundle chính 1.37 MB; chưa tối ưu vì còn thiếu nội dung cốt lõi. Không commit/push trong lượt này; working tree đã có các thay đổi chưa commit từ trước, được giữ nguyên.

## Tiếp tục từ đây — theo thứ tự mới, không đổi mẫu số trừ khi có gap cụ thể

1. **G1 chuẩn hóa mục từ:** kiểm kê code/data thật cho entry, writing, meaning/use, inflection; xác nhận migration `私/わたし` giữ schema 1, bằng chứng, lịch ôn và restore backup. Chỉ bổ sung migration nếu test hiện có phát hiện thiếu. Commit riêng sau test.
2. **G2 nguồn:** JMdict/KANJIDIC2 đã có dữ liệu dẫn xuất nhưng cần rà license/provenance, chạy mẫu so nghĩa/cách đọc và xử lý unresolved/ambiguous; không tuyên bố 100% trước khi đối chiếu mọi mục lõi. Commit riêng.
3. **G3 phạm vi độc lập:** đóng băng N5/N4 từ-ngữ pháp và Kanji N5/N4/N3 theo yêu cầu mới; dùng ≥2 nguồn khác xuất xứ, kiểm tra độc lập nguồn, ghi bất đồng và phần ngoài phạm vi. Giữ R1/hash cũ, chỉ mở nếu gap cụ thể. Không thêm từ N3 trừ từ cần dạy Kanji N3.
4. **G4/G5:** có script tái lập mẫu nội dung và bảng thiếu từng mắt xích; sau đó đóng chuỗi N5 trước, N4 tiếp theo, Kanji N3 riêng. Đánh giá phải dùng câu mới và script kiểm trùng câu với tập luyện. Cập nhật DONE_GATES trước/sau mỗi nhóm.
5. **G6–G11:** nội dung, nghe/đọc/viết, kaiwa, JLPT, AI và nghiệm thu theo DONE_GATES; không dùng audio/test/counts thay bằng chứng ngữ nghĩa hoặc năng lực.

## Giới hạn đã biết

- Chưa có người duyệt học thuật độc lập hoặc người nghe duyệt phát âm; TTS phát được không chứng minh chuẩn ngữ âm.
- `public/knowledge-coverage.json` là bộ đếm liên kết cấu trúc trên nội dung hiện có, không phải chuẩn độ phủ toàn khóa: N5 hiện có 34/144 grammar liên kết và 2/509 mục từ; N4 có 74/86 grammar, 0/261 mục từ và 0/195 Kanji đạt đủ điều kiện đánh giá riêng theo bộ đếm này. Đây là gap để xử lý, không phủ nhận các bài luyện/vòng ôn đang chạy.
- Người học chưa làm đánh giá thật trong phiên này; không có kết quả năng lực cá nhân, xác suất đỗ, hoặc dự đoán kaiwa.
- AI gia sư sinh tự do, đánh giá phát âm/viết tay tự động và xác nhận JLPT readiness vẫn chưa đạt.

Chạy tại thư mục dự án: `npm.cmd test`, `npm.cmd run build`, `npm.cmd run test:tools`. Trước rollback xuất JSON tiến độ và kho ghi âm riêng theo BACKUP_GUIDE.md. Xem MASTER_CHECKLIST.md làm checklist tổng; tài liệu này chỉ ghi trạng thái và điểm tiếp tục.
