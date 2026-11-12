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
- G1 định danh mục từ: registry N5/N4 có 797/797 usage với `lexemeId`, writing, reading, form, meaning, reviewKey; 0 unresolved forms. `npm.cmd test` — 22 file/111 test pass; `node scripts/word-identity-ui.mjs` — QA Edge xác nhận alias `私/わたし`, giữ lịch/bằng chứng/note/saved key và backup schema 1. Adapter là read-through, không phá key cũ hoặc tạo thành tích; không cần schema migration. 158 intended roles vẫn chưa phân loại và được giữ thành khoảng trống học liệu, không phải lỗi định danh.
- Đo G2 nguồn và thêm hồi quy: 797 lượt từ/cụm lõi được phân loại (791 có sense JMdict, 6 ngoại lệ có nguồn riêng); 60/60 usage mơ hồ được thu hẹp còn sense cụ thể; 298/298 Kanji N5/N4 có hồ sơ KANJIDIC2 chứa nghĩa và ít nhất một cách đọc. `src/dictionary-source.test.js` 10/10; toàn suite 24 file/130 test pass. Đây là bằng chứng đối chiếu/độ phủ nguồn, chưa xác nhận độc lập toàn bộ nghĩa Việt/ví dụ; G2 vẫn `unverified`, không sửa nội dung học hay dữ liệu người học.
- Xác minh dữ kiện JLPT trực tiếp ngày 2026-11-12 từ `testsections.html`, `results.html`, FAQ và trang mẫu chính thức: N5 20/40/30 phút, tổng 80; N4 25/55/35 phút, tổng 90; cả hai 180 điểm tối đa, sàn nhóm kiến thức+đọc 38/120 và nghe 19/60, phải dự đủ phần. N5 có 14 dạng câu, N4 có 15; dạng cách dùng từ chỉ có ở N4. PDF mục đích N4 đã nhận dưới dạng PDF nhưng chưa trích xuất văn bản; ghi rõ trong `evaluation/jlpt-official-verification.json` và `REVIEW_QUEUE.md`.
- Nhật ký đề mẫu nay đọc ngưỡng/tối đa từ `jlpt-official-facts.js`, không hardcode; UI hiển thị đúng ba thời lượng thi và hai nhóm điểm, từ chối điểm ngoài giới hạn và không biến % đúng thành điểm JLPT. Test mục tiêu 3/3, toàn suite 24 file/130 test pass (`npm.cmd test -- --maxWorkers=2`), build pass (`npm.cmd run build`; vẫn có cảnh báo bundle 1.42 MB), Edge QA riêng pass nhập điểm, cảnh báo thiếu sàn khi tổng cao, reload/backup: `.tmp-ui/n4-exam-tracker/report.json`. Không dùng hồ sơ hoặc thành tích người học thật.
- Chạy lại `node scripts/done-gates.mjs`: overall `not-met`; G2 còn `unverified`, G9 `not-met`, G12 `unverified`, có ghi lại QA mục “Luyện thi” vừa chạy. Test harness đợi lazy section và retry có giới hạn khi Windows khóa tạm `DevToolsActivePort`; quyết định/hồi quy ghi trong `DECISIONS.md`.

## Tiếp tục từ đây — theo thứ tự mới, không đổi mẫu số trừ khi có gap cụ thể

1. **G2 nguồn:** provenance/license đã có; cấu trúc hiện đủ 791/791 sense từ điển, 60/60 khớp nhiều ứng viên trong lõi được thu hẹp theo usage, 6/6 dòng không khớp thô được phân loại thành ngoại lệ có nguồn và 298/298 Kanji N5/N4 có hồ sơ KANJIDIC2. Cần rà bằng chứng nghĩa/đọc/ví dụ và xử lý sai lệch; không coi link hoặc AI review là duyệt độc lập. Giữ `unverified` đến khi có bằng chứng nội dung đủ mạnh.
2. **G3 phạm vi độc lập:** đóng băng N5/N4 từ-ngữ pháp và Kanji N5/N4/N3 theo yêu cầu mới; dùng ≥2 nguồn khác xuất xứ, kiểm tra độc lập nguồn, ghi bất đồng và phần ngoài phạm vi. Giữ R1/hash cũ, chỉ mở nếu gap cụ thể. Không thêm từ N3 trừ từ cần dạy Kanji N3.
3. **G4/G5:** có script tái lập mẫu nội dung và bảng thiếu từng mắt xích; sau đó đóng chuỗi N5 trước, N4 tiếp theo, Kanji N3 riêng. Đánh giá phải dùng câu mới và script kiểm trùng câu với tập luyện. Cập nhật DONE_GATES trước/sau mỗi nhóm.
4. **G6–G11:** nội dung, nghe/đọc/viết, kaiwa, JLPT, AI và nghiệm thu theo DONE_GATES; không dùng audio/test/counts thay bằng chứng ngữ nghĩa hoặc năng lực.

## Giới hạn đã biết

- Chưa có người duyệt học thuật độc lập hoặc người nghe duyệt phát âm; TTS phát được không chứng minh chuẩn ngữ âm.
- `public/knowledge-coverage.json` là bộ đếm liên kết cấu trúc trên nội dung hiện có, không phải chuẩn độ phủ toàn khóa: N5 hiện có 34/144 grammar liên kết và 2/509 mục từ; N4 có 74/86 grammar, 0/261 mục từ và 0/195 Kanji đạt đủ điều kiện đánh giá riêng theo bộ đếm này. Đây là gap để xử lý, không phủ nhận các bài luyện/vòng ôn đang chạy.
- Người học chưa làm đánh giá thật trong phiên này; không có kết quả năng lực cá nhân, xác suất đỗ, hoặc dự đoán kaiwa.
- AI gia sư sinh tự do, đánh giá phát âm/viết tay tự động và xác nhận JLPT readiness vẫn chưa đạt.

Chạy tại thư mục dự án: `npm.cmd test`, `npm.cmd run build`, `npm.cmd run test:tools`. Trước rollback xuất JSON tiến độ và kho ghi âm riêng theo BACKUP_GUIDE.md. Xem MASTER_CHECKLIST.md làm checklist tổng; tài liệu này chỉ ghi trạng thái và điểm tiếp tục.
