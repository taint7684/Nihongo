# Quyết định tạm để xem lại — không chờ duyệt

| Quyết định | Lý do | Cách đổi |
|---|---|---|
| Chỉ ghép lịch私/わたし đã có căn cứ, không ghép mọi ứng viên từ điển | Tránh gộp sai đồng âm/nghĩa/dạng; giữ khóa backup cũ | Mở rộng spellingGroups sau rà nguồn+test xung đột |
| Mục có1ứng viên vẫn chưa duyệt nghĩa | Khớp chữ/kana không chứng minh dịch Việt/ví dụ đúng | Chọn sourceSense và lưu kết quả rà từng usage |
| 394N5+158N4mới=552ứng viên;70dạng chưa rõ riêng | Không đếm dạng chia thành từ mới hoặc giấu phần chưa chuẩn hóa | Giải quyết mục chưa rõ, kiểm lại, không xóa mục chỉ để đạt tỷ lệ |
| Vai trò chủ động/nhận biết hiện kế thừa nhãn cũ, mục chưa phân loại giữ rõ | Nhãn hỗ trợ không thể chứng minh mục tiêu đã đủ | Rà lại từng mục theo đích sử dụng ở bước3 |
| Ngưỡng kaiwa tạm vẫnN5≥3/N4≥4 tình huống mới và48h, các tiêu chí0–2 | Đã được ủy quyền, chưa chuẩn hóa hay đánh giá nói độc lập | communication-criteria.json; hiệu chỉnh bằng kết quả học thật |
| Tách cổ bộ thủ/classical radical khỏi thành phầnKanjiVG | Tránh bịa nghĩa/từ nguyên từ sơ đồ nét | Dữ liệu hai lớp, dẫn nguồn riêng |


## Quyết định nguồn12/11
Giữ mô hình chỉ trong tác vụ đã đạt; không dùng Qwen4B làm chuyên gia duyệt do phản hồi thật sai. Lượt nguồn là trạng thái đối chiếu, không phê duyệt toàn ví dụ. 6cụm/tên giữ khóa cũ nhưng không đếm thành đầu mục mới; có thể xem/thay phân loại trong compositional-word-reviews.js. Nhãn vai trò học cũ còn nhiều nhận biết/chưa phân loại, phải chọn lại khi chốt lõi bước3.


## Chọn bổ sung lõiN5 —12/11
Ưu tiên từ sinhhoạt có chỗ dùng:trường/nghề,địađiểm,tuầntháng,thứcăn,dụngcụ,tínhchất,sởthích,vịtrí,giađình,thờitiết,sứckhỏe,quầnáo. Đợt này63ngữcảnh/17câu áp dụng, nối lịch ôn hiện có. Vai active chỉ là ýđịnhchươngtrình,không phải đãthànhthạocủangườihọc. Có thể chỉnh danh sách/lesson ởn5-functional-lexicon.js; không đổiIDbài. 450mục dựthảo vẫn chưa đủ cơsở làm tài liệu duy nhất N5; phải tiếp tục rà nhu cầu và toàn bài.


## Audio nền và tối ưu dữ liệu
Chọn đọc biến thể đầu tiên khi bảng có nhiều biến thể đúng; ghi rõ trên giao diện, không yêu cầu thuộc cả bảng để học tiếp. Chỉ bật native audio khi có file; không tự ghi thành tích từ việc phát mẫu. Metadata nguồn dùng các bảng chuỗi dùng chung, khôi phục ra cùng656 bản ghi trước/sau; có hash đối chiếu. Không đổi ý nghĩa hay trạng thái duyệt.

## G2 — rà nghĩa và cách đọc sau khi đo độ phủ (12/11/2026)
Đã kiểm bằng mã: 791/791 mục từ điển N5/N4 có sense JMdict được chọn; 60/60 usage trong lõi có khớp nhiều ứng viên được thu hẹp còn một sense; 6/6 dòng không khớp thô được phân loại thành tên/cụm ngoài từ vựng với nguồn riêng; 298/298 Kanji N5/N4 phân biệt có hồ sơ KANJIDIC2. `src/dictionary-source.test.js` kiểm tra các liên kết và ngăn dòng chưa khớp bị đếm nhầm thành từ đã xác minh. Đây chưa phải rà độc lập ngữ nghĩa: vẫn cần xác minh nghĩa Việt theo ngữ cảnh, cách đọc trong từ/câu và ví dụ; không nâng G2 chỉ dựa vào số link hoặc đầu ra AI. Giữ trạng thái G2 `unverified`, sửa từng sai lệch có bằng chứng, không bổ sung mục mới trong lúc chưa kết thúc cổng.

## JLPT — facts and app thresholds (2026-11-12)
Đã đối chiếu ngày 2026-11-12 với [bảng thời lượng và dạng câu JLPT](https://www.jlpt.jp/e/guideline/testsections.html), [quy tắc điểm/đỗ](https://www.jlpt.jp/e/guideline/results.html), [FAQ](https://www.jlpt.jp/e/faq/) và [trang đề mẫu](https://www.jlpt.jp/e/samples/forlearners.html). N5 có ba phần 20/40/30 phút, tổng 180, ngưỡng tổng 80; N4 là 25/55/35 phút, tổng 180, ngưỡng tổng 90. Cả hai yêu cầu dự đủ phần và đạt đồng thời 38/120 cho nhóm kiến thức ngôn ngữ + đọc và 19/60 cho nghe. Có 14 dạng câu N5, 15 dạng N4; dạng cách dùng từ có ở N4, không có ở N5. Điểm JLPT là điểm chuẩn hóa; không quy đổi tỷ lệ đúng trong ứng dụng thành điểm hoặc kết luận đỗ. Các dữ kiện này hiện được dùng trực tiếp cho kiểm tra điểm và giới hạn nhập ở nhật ký đề mẫu. G9 vẫn chưa đạt: độ phủ, chất lượng và nhiều bộ đề song song chưa được chứng minh. PDF mục đích N4 đã nhận được dưới dạng PDF nhưng chưa trích xuất/đọc nội dung; không dùng nó làm bằng chứng chi tiết.
