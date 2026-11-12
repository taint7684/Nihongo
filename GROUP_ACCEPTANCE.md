# Tiêu chí đóng nhóm — bản làm việc R1

Áp dụng chỉ đạo mới ngày12/11/2026: đóng phần triển khai có thể kiểm, ghi riêng điều chưa xác minh; không đợi duyệt học thuật toàn khóa mới làm nhóm sau. Không thay mục tiêu0→N4 thành đạt một danh sách nhỏ.

Phạm vi cố định: reference/working-scope-r1.json và hash đi kèm; nguồn và đối chiếu từng mục tại public/curriculum-source-comparison.json. Không lấy kho hiện có làm mẫu số. Chỉ mở rộng qua SCOPE_CHANGES.md khi có khoảng trống cụ thể, không vì số đếm chưa đẹp.

| Nhóm | Điều kiện đóng triển khai | Mã xác định được | Nội dung phải đối chiếu | Ghi riêng, không chặn nhóm sau |
|---|---|---|---|---|
| Định danh/nguồn | Adapter và backup giữ, nguồn/giấy phép rõ, lỗi có sửa | ID/schema/hash/alias/khôi phục | Nghĩa/cách đọc đúng ngữ cảnh ở phạm vi đã rà | Người duyệt độc lập |
| N5 lõi R1 | Mọi mục có nghĩa/kana/ví dụ/audio; luyện nhớ/dùng và lịch ôn; mỗi mục tiêu có bài áp dụng và đánh giá xác định hoặc rubric mở | Trường/liên kết/file/vòng học/đánh giá/ôn không mồ côi | Phạm vi50mục tiêu chính, ví dụ/đáp án, phân biệt phủ định/hướng lợi ích/thì | Duyệt ngữ âm và học thuật độc lập; hiệu quả thực tế |
| N4 từ/Kanji R1 | Đóng danh sách thiếu đã kiểm lại; mỗi Kanji có nguồn, từ thật/ví dụ, nét hoặc ghi thiếu rõ, luyện/ôn/đánh giá đọc trong từ | So snapshot; không đếm metadata là học; asset/wordKey/test/backup | Chọn đúng nghĩa/cách đọc; không lấy nghĩa toàn từ làm nghĩa riêng của chữ | Không chứng nhận mọi âm đọc hoặc viết tay đúng |
| Ngữ pháp/liên kết | Mẫu chính/biến thể có nguồn, giải thích, ví dụ, luyện có giải, áp dụng mở, đánh giá và ôn liên kết | Mọi mục có đường đi; ID cũ giữ | Quy tắc và đáp án; không sửa câu đúng thành khác ý | Tự kiểm không là chấm độc lập |
| Giao tiếp/đánh giá | Phủ các mục tiêu và dạng tác vụ; luyện tách đánh giá; ngữ liệu mới/sau nghỉ; hỗ trợ được ghi | Không trùng ID/ngữ liệu; thời gian và lịch sử; không đổi ra điểmJLPT | Tình huống/đáp án/rubric | Chưa chấm lời nói độc lập |
| Thư viện/bộ thủ | ≥2500 phân loại nguồn,214bộ có tra/tìm/liên kết;5lớp độ phủ riêng | Tập hợp/Jōyō/IDs/license/tìm/filter/backup | Đối chiếu danh sách chính thức, nghĩa/tên/cách đọc nguồn | Thư viện tra không là2500chữ đã dạy |
| AI | Đánh giá thật theo từng tác vụ3lần và held-out; lỗi có ngăn/phản hồi đúng | Hủy/timeout/không mất bài; log thật/mock tách | Giữ nghĩa/câu đúng/ngoài phạm vi/nhiều lượt | Tác vụ chưa đạt ghi thiếu,không đóng bằngFAQ |

Đóng một nhóm chỉ khi hàng đó có bằng chứng kiểm cụ thể. Các khoảng trống nội dung thực vẫn phải mở; thiếu người duyệt độc lập không phải lý do giữ toàn bộ ở N5.
