# Scope resolution R1/R2 — 13/11/2026

**G3 chưa đạt.** Script chạy: `node scripts/scope-resolution-r1.mjs`. Không thay mẫu số, R1 hash hoặc dữ liệu học.

## Quyết định

| Nguồn | Số yêu cầu | Phân loại |
|---|---:|---|
| R1 | 690 | reuse: 670; not-a-new-lexeme: 18; matcher-error: 2 |
| R2 | 686 | missing: 633; reuse: 38; matcher-error: 14; new-sense: 1 |
| unmatched-bounded-JF-request | 19 | reuse: 2; missing: 15; matcher-error: 2 |

Ứng viên entry đã loại trùng: N5 615; N4 trong chặng 516; N4 mới 484; tích lũy 1099. **Không phải số từ đã xác nhận đủ chương trình:** chưa chọn đủ nghĩa, loại trừ expression/grammar/glossary và trường hợp nhiều entry. Chưa đạt mục tiêu800/1500.

Các ca đa nghĩa rủi ro đã chọn nghĩa theo nhóm chức năng: そば = mì soba (1238460-s1), せき = ho (1204300-s0), ソース = nước xốt (1075270-s0), ビザ = thị thực (1104720-s0). Ngoài ra đã chọn rõ nghĩa cho ことば, 違う, 勉強, コピー, 案内, 切る, 始まる, 覚える, 最後 và dạng 覚えている. 案内 đọc thông báo là nghĩa mới s1; 案内します dẫn đường đang dạy s0 không thay thế. Đây là đối chiếu của AI biên soạn, không duyệt học thuật độc lập. Các nghĩa/source-code, chỗ ngồi, bên cạnh, Visa nhãn hiệu không tự trộn.

N4 のに giữ trong nhóm ngữ pháp: mục đích bài42 và nhượng bộ bài45 không được tự gom vào nghĩa nhượng bộ của một mục từ điển. Bốn alias đã rà (もういちど/もう一度, 受け付け/受付, 選ぶ/選びます, 終わる/終わります) tái sử dụng usage có thật; không tạo từ mới hoặc sửa lịch ôn.

Mỗi dòng JSON có quyết định, lý do, ID nguồn/các nghĩa ứng viên và usage thực tế. `missing` nghĩa thiếu usage khớp, không chứng minh mọi candidate là mục cần thêm. `sense-review-required` để mở thay vì giả là nghĩa mới hoặc đã có. Cờ placementNeedsEarlierSupport báo riêng khi target N5 mới chỉ có học liệu N4; không giả đã có học liệu đúng chặng. Hai nghĩa trong cùng entry có thể cần hai học liệu nhưng không được đếm hai headword.

Nguồn độc lập và giới hạn giữ từ báo cáo nghiên cứu: Minna/3A (phạm vi chức năng), JF Irodori (tọa độ/Can-do), EDRDG JMdict (định danh/nghĩa, không nhãn JLPT). Không sao chép giáo trình/đề/audio. Chỉ tệp mới này được ghi; nguồn và dữ liệu học không thay đổi.
