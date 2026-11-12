# Bàn giao trạng thái hiện hành — 12/11/2026

**Chưa hoàn thành toàn khóa 0→N4; chưa đủ căn cứ dùng làm tài liệu học duy nhất đến N5/N4.** Các đợt dưới đây đã triển khai thật, không phải chỉ kế hoạch. Tiến độ/backup/schema1 và ID/thứ tự bài được giữ; không truy cập hồ sơ học thật.

## Chạy website

Mở START-WEBSITE.cmd trong dự án, hoặc chạy npm.cmd start. Xem README.md. Bài học mở tự do; AI tắt vẫn dùng bài, luyện, ôn và backup.

## Trước/sau các đợt định danh và N5 chức năng

| Phạm vi | Trước đối chiếu | Hiện tại | Cách hiểu |
|---|---:|---:|---|
| N5 ứng viên đầu mục JMdict |394 +50 dạng chưa rõ; sau rà nguồn441|503|Không là danh mục JLPT chính thức hoặc số từ đã biết|
| N4 mới so với N5 |158 trước rà; sau rà172|163|Giảm khi9 mục đã có ngữ cảnh N5 mới, không xóa nội dung|
| Tích lũy đầu mục ứng viên |552 +70 dạng chưa rõ; sau rà613|666|Loại trùng theoentry;6cụm/tên theo dõi riêng|
| Kanji có mục học/nét |158|159|N5:123,N4:40,36mới; thêm私|
| Hồ sơ KANJIDIC tra nguồn |297 đầu đợt|525|Không phải525chữ đã dạy hoặc đều mở như khóa học|
| Thư viện≥2500/214 bộ |Chưa có|Chưa có|Còn thiếu toàn yêu cầu mở rộng hợp lệ|
| Ngữ pháp |144 dòng N5+86 N4|Không tăng dòng|28phạm vi có rà nguồn; không tự đếm thành230mẫu độc lập|
| Audio catalog |1708tổng/1698active|1954tổng/1943active|11retired giữ file;246tài sản mới trong hai đợt|

## Dữ liệu / học liệu / luyện / ôn / đánh giá

- 63ngữ cảnh từ N5 bổ sung có chữ/kana/nghĩa Việt/ví dụ và tham chiếu audio từ+câu; dùng công cụ gõ nhớ/nghe chép/đặt câu và lịch ôn chung.18câu áp dụng mới vào đúng vòng học. Đây là bài luyện, không giả làm bộ đánh giá độc lập mới.
- 145dòng bảng số/giờ/ngày/trợ số từ có audio; không tăng số mục từ bằng các con số. Phát mẫu không ghi thành tích.
- Mỗi bài1–25 có bảng phần đã rà/thiếu trong CONTENT_REVIEW.md và evaluation/n5-semantic-review-progress.json. Tập N5 dự thảo450mục/105chữ có học liệu, nhưng phạm vi dự thảo chưa đủ căn cứ xác nhận đủ cấp. N4 còn61mục từ/cụm và155chữ mục tiêu thiếu mục học trong cấp; chức năng/ngữ liệu/đánh giá toàn khóa còn phải tiếp tục.

## Kiểm chứng và lỗi sửa

104tests/19files, build và EdgeQA riêng qua. Phát WAV thật/ghi nhớ/lịch ôn/reload/backup/di chuyển10→3→25 đều có bằng chứng; mobile390px không tràn ở các màn kiểm. So414câu cũ với765câu hiện tại:0đổiID/choices/answer. Kiểm schema/asset không là kiểm kiến thức đúng hay người dùng học được.

Lỗi đã sửa: matcherđuôiします; trườngkana từng chứa romaji; kanaさlọt bộ đếmKanji; khẳng định sai phải cùng chủ thể ở câu nối bài16; TTS辛い đọc nhầmつらい trong câu món ăn (giữからい); phân biệt1日lịch/khoảng. Mẫu nguồn30/15/15/10 ghi phạm vi và phát hiện trong evaluation/source-review; chưa người duyệt độc lập. Mic/thiết bị cảm ứng thật và nghe duyệt ngữ âm chưa xác minh.

## AI

Giữ source/FAQ/quy tắc, hội thoại hướng dẫn và tác vụ chọn câu hẹp. Qwen3:4bCPU review thật9yêu cầu:3JSONhợp lệ cùng bác saiはたち,6khôngJSON/bịcắt; không dùng kết quả đó để sửa câu đúng. Chưa có AI giải thích/chữa viết/kaiwa tự do đủ tin cậy, chưa hội thoại giọng nói linh hoạt được kiểm đạt. Không tải mô hình mới, không trả phí. Mocktransport không được tính là mô hình thật.

## Điểm tiếp tục và quyết định

Đang nhóm3: hoàn thiện lõiN5, rồiN4; tiếp luyện/ôn/đánh giá/giao tiếp, thư viện2500/214, AI có mục tiêu và nghiệm thu. Xem NEXT_STEPS.md hiện hành. Nguồn/giấy phép:SOURCES.md; quyết định tạm:REVIEW_QUEUE.md; kiểm:VERIFICATION.md. Các bản nguồn/cache/QA không chứa kết quả học thật và bịignore. JS ban đầu đã giảm1367,22→1169,37KB nhưng vẫn còn lớn; hash toàn656bản ghi metadata trước/sau giống nhau.
