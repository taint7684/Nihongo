# Điểm tiếp tục hiện hành — 12/11/2026

Mục tiêu vẫn là tài liệu tự học cá nhân 0 → N5 → N4. **Chưa hoàn thành toàn phạm vi và chưa đủ căn cứ làm nguồn học duy nhất.** Giữ schema/key v1, ID/thứ tự bài, dữ liệu học/backup, truy cập tự do, 0 đồng và QA bằng hồ sơ riêng. Không coi số bài, audio, test hoặc bản ghi tra cứu là bằng chứng người học thành thạo hay sẽ đỗ.

## Hoàn thành trong lượt gần nhất

- Hòa giải báo cáo inventory: 240 dòng N4 gồm 222 mục từ/cụm và 18 mục loại khác. 15 mục grammar và 3 thuật ngữ kính ngữ không phải 18 từ vựng thiếu ngữ cảnh. Inventory được sửa để đếm từ thiếu riêng; 15/3 hiện theo dõi thành nhóm grammar/glossary. Đây là phân loại trong working scope, không chứng nhận phạm vi cấp đủ.
- Kiểm tra hash `reference/working-scope-r1.json`; test đóng 61 ngữ cảnh từ R1 và 155 Kanji R1 qua. Danh sách khoảng trống đã được kiểm theo nghĩa/đọc nguồn, ví dụ, câu hỏi đọc; Kanji gắn từ thật và câu hỏi. Chưa có duyệt học thuật hoặc nghe độc lập.
- Tạo thư viện tra cứu 2.999 chữ: 2.136 Jōyō theo nguồn chính thức và 863 chữ ngoài Jōyō theo metadata KANJIDIC2 grade 9/10. Có 214 bộ Khang Hy từ Unicode CJKRadicals; nghĩa/Hán Việt/nét gắn với chữ tương đương nguồn, không phải giải thích từ nguyên.
- Thêm màn “Thư viện Kanji / Bộ thủ” trong Công cụ học, tìm kiếm/lọc, ví dụ liên kết ngược và ghi rõ tra cứu ≠ đã dạy. Năm lớp báo riêng: tra cứu 2.999, nét 297, có học liệu 296, luyện/ôn 296, có liên kết đánh giá 154. Không gán học liệu cho chữ chỉ vì nó có trong thư viện.
- Kiểm: `npm.cmd test` — 22 file/111 test qua; `npm.cmd run build` qua; `node scripts/study-tools-ui.mjs` qua trên Edge thật, gồm tìm thư viện và đổi giữa Kanji/bộ thủ. QA dùng profile riêng, không dùng thành tích người học thật.
- Build vẫn cảnh báo bundle chính 1.37 MB; chưa tối ưu vì còn thiếu nội dung cốt lõi. Không commit/push trong lượt này; working tree đã có các thay đổi chưa commit từ trước, được giữ nguyên.

## Tiếp tục từ đây — không đổi mẫu số trừ khi có gap cụ thể

1. **Đóng lõi N5 theo working scope hiện hành**, không thêm mục để tăng số. Duyệt từng chức năng/bài: giải thích, ví dụ/đáp án, học liệu phụ thuộc, nghe/đọc, áp dụng mới, luyện riêng đánh giá và đường ôn. Kiểm bằng mã liên kết/ID/asset/backup; nội dung cần đối chiếu TUFS/Irodori/JLPT theo phạm vi cụ thể. Chưa được gọi hoàn tất chỉ vì có 25 bài/450 mục từ/105 Kanji.
2. **Khép liên kết grammar → áp dụng → đánh giá → ôn.** Snapshot hiện báo 34/144 grammar N5 và 74/86 grammar N4 có học+luyện+đánh giá riêng+ôn theo định nghĩa cấu trúc; phải xem đây là báo thiếu liên kết, không tự động gắn câu không phù hợp để tăng tỷ lệ. Xây/bổ sung ngân hàng đánh giá tách khỏi luyện, rồi đối chiếu nghĩa/đáp án.
3. Hoàn thiện N4 sau khi N5 lõi qua tiêu chí triển khai; giữ R1 cố định. Các 15 grammar và 3 glossary trong inventory là nhóm nội dung riêng, cần đối chiếu trong grammar coverage, không quay lại đếm là thiếu từ vựng.
4. Mở rộng kaiwa/đánh giá ở nơi còn thiếu: nhiệm vụ mới theo mục tiêu, đổi vai/dữ kiện, hỏi lại/xác nhận/sửa hiểu nhầm, thử sau nghỉ; bộ JLPT và kaiwa riêng. Chưa chấm lời nói độc lập; không đổi rubric tạm thành điểm JLPT.
5. Thư viện tra cứu đã đạt ngưỡng đếm, nhưng ghi rõ giới hạn nguồn/giấy phép, biến thể và từng lớp phủ; chưa duyệt độc lập nghĩa/tên. Không chặn học N4 vì thiếu duyệt này.
6. AI: xử lý tác vụ lỗi cụ thể bằng bộ ngữ nghĩa mới lặp ≥3 lần và held-out. Candidate giải thích/chữa viết rộng vẫn chưa đạt và không nối UI; không thay bằng FAQ/kịch bản để đóng.
7. Nghiệm thu sau mỗi nhóm: unit test phù hợp, build, Edge/browser cho thay đổi UI, kiểm bảo toàn dữ liệu/backup. Ghi riêng nội dung chưa xác minh và tình trạng năng lực người học chưa đo.

## Giới hạn đã biết

- Chưa có người duyệt học thuật độc lập hoặc người nghe duyệt phát âm; TTS phát được không chứng minh chuẩn ngữ âm.
- `public/knowledge-coverage.json` là bộ đếm liên kết cấu trúc trên nội dung hiện có, không phải chuẩn độ phủ toàn khóa: N5 hiện có 34/144 grammar liên kết và 2/509 mục từ; N4 có 74/86 grammar, 0/261 mục từ và 0/195 Kanji đạt đủ điều kiện đánh giá riêng theo bộ đếm này. Đây là gap để xử lý, không phủ nhận các bài luyện/vòng ôn đang chạy.
- Người học chưa làm đánh giá thật trong phiên này; không có kết quả năng lực cá nhân, xác suất đỗ, hoặc dự đoán kaiwa.
- AI gia sư sinh tự do, đánh giá phát âm/viết tay tự động và xác nhận JLPT readiness vẫn chưa đạt.

Chạy tại thư mục dự án: `npm.cmd test`, `npm.cmd run build`, `npm.cmd run test:tools`. Trước rollback xuất JSON tiến độ và kho ghi âm riêng theo BACKUP_GUIDE.md. Xem MASTER_CHECKLIST.md làm checklist tổng; tài liệu này chỉ ghi trạng thái và điểm tiếp tục.
