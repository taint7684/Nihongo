# G4 — Quy trình đánh giá độc lập (Independent Review Protocol)

## Mục tiêu
Đánh giá độ chính xác của nội dung日语 (mục từ, kanji, ngữ pháp, câu) theo ngưỡng sai ≤3% qua các vòng kiểm độc lập về mặt vai trò (không cần người recensent bên ngoài doanh nghiệp do dự án $0, không có học giả được tài trợ).

## Vai trò kiểm (mỗi vòng do một persona khác thực hiện)

| Vòng | Vai trò | Nhiệm vụ chính | Công cụ |
|------|---------|----------------|---------|
| P1 | Developer (dev) | Kiểm mã, định dạng, liên kết ID, trùng lặp chuỗi | scripts/, node |
| P2 | QA/Tester | Kiểm đối nguồn JMdict/KANJIDIC2/TUFS, đọc âm, nghĩa Việt, câu ví dụ | public/dictionaries/, SOURCES.md |
| P3 | Learner | Kiểm ví dụ dễ hiểu, mức độ N4, không khó quá / dễ quá, ngữ cảnh thực tế | src/mnn-course.js, assessment files |
| P4 | Product/BA | Kiểm phù hợp mục tiêu JLPT N4, thang điểm, can-do, lộ trình học | PROJECT_BRIEF.md, CURRENT_MISSION.md |

## Mẫu lấy (sampling)

- Lấy theo từng nhóm lớn: từ vựng (word), kanji, ngữ pháp (grammar), câu (sentence).
- Mỗi nhóm lấy tối thiểu 15 mẫu, phân bố đều theo lesson 1–50.
- Ưu tiên mẫu rủi ro: đa âm (đône/칸), nghĩa nhịm, từ ghép, câu cấu trúc phức tạp.
- Tỷ lệ tái kiểm: mỗi mẫu được kiểm lại bởi ít nhất 2 vai trò khác nhau (cross-role).

## Ngưỡng đáp qua

- Số lỗi xác nhận / tổng mẫu kiểm ≤ 3% cho mỗi nhóm.
- Lỗi xác nhận = sai đọc, sai nghĩa Việt trong ngữ cảnh, sai mẫu ngữ pháp, liên kết assessment bị hỏng.
- Không tính sửa kiểu (typo) không ảnh hưởng nghĩa/đọc.

## Báo cáo

Mỗi vòng xuất file `*-review-pass<N>.json` trong `evaluation/source-review/`. Tổng hợp tại `review-summary.json`.

## Lưu ý

Đây là quy trình tự kiểm đa vai trò trong dự án cá nhân $0, không thay thế đánh giá bởi học giả ngôn ngữ độc lập có bằng cấp. G4 đánh giá "đã có quy trình kiểm độc lập về mặt vai trò", không khẳng định "đã có người recensent học thuật bên ngoài".
