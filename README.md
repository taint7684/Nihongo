# La bàn Nhật ngữ — Nihongo Compass

Cập nhật 12/11: có 25 bài tham chiếu N5, 25 bài tham chiếu N4, bộ đánh giá lấy mẫu và thư viện tra cứu 2.999 Kanji/214 bộ thủ. Chưa nghiệm thu toàn bộ nội dung và đường liên kết luyện→đánh giá→ôn; đây chưa phải khóa học đã xác nhận đủ.


**Mục tiêu hiện hành: 0→N5→N4 theo PROJECT_BRIEF.md. Chưa đủ nội dung/đánh giá để làm nguồn học duy nhất toàn chặng.** Các nhóm công cụ mới đã chạy thật; không suy từ số bài hoặc test sang năng lực người học.

Dự án tại C:\Users\LENOVO\Desktop\Nihongo-Compass. Chỉ chạy cục bộ, không deploy/push, không PWA/native. Bản gốc study-room và dữ liệu trong hồ sơ trình duyệt thật không bị thao tác. Ngân sách tiền mặt 0 đồng; dùng máy, điện, mạng và công sức sẵn có. Không API trả phí, thẻ, trial hoặc nâng cấp tự động.

## Chạy trên Windows

Mở START-WEBSITE.cmd, hoặc trong PowerShell:

    cd C:\Users\LENOVO\Desktop\Nihongo-Compass
    npm.cmd start

Mở http://127.0.0.1:5175/ . Chỉ website, không khởi động AI: npm.cmd run dev. Node >=22.12; dependencies đã có. Nếu bản sao thiếu node_modules, npm.cmd ci cần mạng. Không đổi ExecutionPolicy toàn máy. Launcher có thể mở Ollama portable sẵn có; không tự tải thêm mô hình. AI không hoạt động thì vẫn học được. Không cần chạy VOICEVOX khi học: WAV đã tạo nằm trong public/audio/tts.

Nếu cổng có website này đang chạy, dùng địa chỉ đó; không dừng ứng dụng khác. Build: npm.cmd run build. Build tĩnh chưa có proxy AI production; dùng launcher để học cục bộ.

## Truy cập tự chọn

Mọi nội dung đã biên soạn đều mở: bài, flashcard, nghe/đọc/nói/viết, ôn nhóm và đánh giá. Không cần học trước hoặc làm kiểm tra đầu vào. Lộ trình/tiên quyết chỉ gợi ý, có giải thích nền xem nhanh. Chọn Lộ trình hoặc “Xem tất cả bài” để mở bài 10/3/25 tùy ý; “Tiếp tục bài đang học” giữ bài đã chọn qua tải lại. Mở bài không đánh dấu bài trước hoàn thành.

## Quá trình học đang hoạt động

Nhập môn chữ/âm học song song với câu giao tiếp sau ba bài đầu. Tuyến chính có học liệu tự soạn theo chức năng của 25 bài Minna no Nihongo Shokyu I bản 2 (ISBN 9784883196036), ôn sau từng nhóm 5 bài và bộ tổng hợp mới. Không sao chép bài tập/audio sách. Bốn bài cầu nối cũ giữ ID, ở khám phá để tránh bắt học trùng.

Mỗi bài tham chiếu đi từng phần: đích dùng → từ trong ngữ cảnh/nhớ lại → các vòng ví dụ–giải thích–thử ngay → nghe không nhìn chữ → tự đáp/hỏi lại → đọc/viết → nhiệm vụ đổi dữ kiện → tự kiểm/ôn. Học vài phần rồi lưu điểm dừng, không ép hoàn thành nói/viết mở mới tiếp bài. Công cụ học mở riêng; thư viện tra cứu không tự ghi nhận đã học.

- Từ có cách đọc, nghĩa, ví dụ và WAV từ/câu; gõ nhớ mục từ liên kết lịch flashcard chung, lưu vị trí mục đang học. Khớp mục từ không chứng minh dùng được trong câu.
- Nghe phải phát hết mới trả lời, transcript ẩn trước, ghi trợ giúp/lượt phát; có tốc độ và A–B. Sai có lời giải và vào lịch ôn.
- Hội thoại hướng dẫn có hai vai/dữ kiện mỗi hoạt động, câu hỏi audio ẩn chữ, thử trả lời rồi mới mở mẫu. Cách khác mẫu không bị coi sai. Có một nhánh hỏi lại soạn sẵn theo bài, phản hồi/audio nhân vật; không gọi là AI tự do.
- Lưu riêng câu khớp dữ kiện, lỗi ý, lỗi hình thức đã xác định, câu chưa tự xác nhận; tự báo cáo đã nói và câu hỏi lại không phải điểm nói.
- Đọc có cách đọc/nghĩa, ghi khi mở trợ giúp trong vòng học mới. Kho tra cứu có furigana/tra từ dữ liệu bài. Viết lưu ý định/bản hiện tại và tối đa 100 phiên bản chủ động lưu/bài.
- Nhiệm vụ đổi dữ kiện, ôn theo lỗi, kiểm sau nghỉ có thời điểm; dữ kiện từng gặp và mở gợi ý được ghi riêng. Ngân hàng vai còn nhỏ, không hứa mọi lần là ngữ liệu chưa gặp.
- Bộ tổng hợp có báo cáo riêng từ/chữ, ngữ pháp, đọc và hai đoạn nghe, đường về bài cần củng cố; bằng chứng tự dùng tách riêng. Có đồng hồ buổi luyện, không tự coi là đề thi đủ dạng/thời gian. Đồng hồ đặt lại khi tải trang; câu trả lời vẫn lưu.
- “Công cụ học → Thư viện Kanji / Bộ thủ” tra 2.136 Jōyō và 863 chữ ngoài Jōyō theo metadata KANJIDIC2; gồm 214 bộ Khang Hy. Mỗi chữ tách trạng thái tra cứu, nét, học liệu, luyện/ôn và đánh giá. Chỉ 297 chữ có nét KanjiVG trong tập tra cứu hiện tại; không nhận 2.999 mục là đã dạy.

## Phạm vi chưa hoàn thành

Có 25 bài N5 và 25 bài N4 cùng hoạt động chạy được KHÔNG có nghĩa khóa 0→N4 đã được xác nhận đủ. COVERAGE.md là ma trận từng bài; N5_READINESS_MAP.md/N4_READINESS_MAP.md ghi các khoảng trống. Chưa có thẩm định độc lập toàn bộ Việt–Nhật/ngữ âm; chưa có bằng chứng hiệu quả học của bạn. Bộ cuối chặng hiện lấy mẫu, chưa đủ suy mức sẵn sàng thi hoặc xác suất đỗ. Nói/viết mở, phát âm chưa được chấm độc lập.

Tập tham chiếu đang khóa ở `working-scope-2026-11-12-r1`; 450 mục N5 và 240 dòng N4 có nhiều mục ngữ pháp/chú giải và từ dùng lại. Tập này là lựa chọn chức năng, không phải danh sách chính thức hoặc chứng minh đủ cấp. Tại thời điểm cập nhật, bộ đếm cấu trúc còn 34/144 grammar N5 và 74/86 grammar N4 liên kết đủ học+luyện+đánh giá+ôn; ngân hàng đánh giá từ/Kanji/giao tiếp cũng chưa phủ hết. Xem MASTER_CHECKLIST.md và NEXT_STEPS.md; không mở rộng N3.

## Dữ liệu và backup

Giữ KEY nihongo:learning:v1, schema v1, toàn bộ ID cũ. Trường mới learning có mặc định khi nhập backup cũ, gồm điểm dừng, vị trí mục từ, trợ giúp đã mở, lượt đáp/đổi dữ kiện và lịch ôn áp dụng. Backup gồm tiến độ, câu sai, thẻ/từ lưu, ghi chú, ý định/bản viết, phiên bản, lịch sử nghe và checkpoint. Mở lại kết quả cũ không thành bằng chứng sau nghỉ; tạo lượt kiểm mới lưu lượt trước.

Xuất trong Cài đặt → giữ file gốc → chọn file để nhập → kiểm tra → xác nhận. localhost và 127.0.0.1 hoặc cổng khác là vùng lưu riêng. Đã thử backup cũ và mới bằng dữ liệu QA; không dùng profile thật của bạn. Xóa site data sẽ mất dữ liệu nếu chưa backup.

Chat chỉ ở phiên. Ghi âm tối đa 30 giây có bản nháp và nút chủ động lưu qua buổi vào IndexedDB; phải xuất kho âm riêng, không nằm trong JSON tiến độ. TXT/CSV nhập riêng không thay chương trình có sẵn; chưa PDF/OCR/cloud.

## Audio và AI

Audio TTS tạo bằng VOICEVOX Engine 0.26.1 CPU, 四国めたん normal style 2, thư viện giọng 0.17.0; ghi công VOICEVOX:四国めたん. Không cần tài khoản/thẻ/API. Engine portable tải sẵn khoảng 1,9 GB; không đóng gói phát hành engine. Điều kiện nguồn/giọng và SHA-256/cách tạo/cách đọc ở public/audio/tts/catalog.json, SOURCES.md. File không khớp cách đọc bị giữ lại; lịch sử bị thay thế giữ file, đánh retired. So sánh kế hoạch TTS với cách đọc tự soạn và decode không thay duyệt nghe bản ngữ. Không dùng TTS chấm phát âm.

Giữ 11 audio gốc và ghi rõ mẫu kéo dài chỉ minh họa; không bắt chước độ dài ấy trong từ. Bổ sung cặp phân biệt dài/ngắn, ngắt, ghép/nhịp có audio TTS và câu hỏi; phần nghe toàn bộ nhập môn vẫn còn thiếu.

AI giữ kiểm soát cũ: trợ giúp theo nguồn/quy tắc; mô hình local chỉ tác vụ chọn nhánh đã được phê duyệt. 1.7B/4B không đạt chữa viết/đọc tự do, không mở lại; xem AI_QUALITY.md và báo cáo benchmark lịch sử. Không đánh đồng nội dung cố định/hội thoại hướng dẫn với phản hồi mô hình. Phiên này không đổi mô hình, không chạy lại benchmark AI; kiểm vòng học chặn mạng AI hoàn toàn, không mock câu trả lời.

## Kiểm tra

    npm.cmd test
    npm.cmd run build
    npm.cmd run test:ui

test:ui cần website cổng 5175 và Edge/Chrome. Tạo hồ sơ QA riêng .tmp-ui/learning-flow, không mở profile thật; phát WAV thật, mạng AI bị chặn. Fixture mở khóa chỉ phục vụ điều hướng, không là bằng chứng đã học. VERIFICATION.md ghi kết quả và giới hạn. Build hiện còn cảnh báo gói JS lớn; đã giảm metadata audio bằng chỉ mục gọn; chưa đo trên điện thoại thật.

## Công cụ trực tiếp và sao lưu mới

Chọn **Công cụ học** trong điều hướng: Từ vựng, Flashcard, Kanji/Luyện viết, Ngữ pháp, Nghe, Đọc, Kaiwa, Viết, Luyện thi. Tìm theo chữ/kana/nghĩa/bài/chủ đề; Hán Việt tìm có/không dấu. Ghi chú và lịch từ dùng chung với bài. Gõ/nghe/câu tự dùng có loại bằng chứng riêng; học sau xem mẫu không là nhớ dài hạn. SRS.md mô tả SM-2 biến thể và giới hạn.

Kanji dùng 46 source KanjiVG có giấy phép, có mẫu động/tô/tự viết/hoàn tác/đối chiếu và lưu nét vào backup. Không nhận dạng/chấm nét; nghĩa/cách đọc vẫn cần rà học thuật. Ghi âm có kho cục bộ, nghe lại/xóa/tải/xuất nhóm/nhập, không ASR hoặc gửi ngoài máy. Xem BACKUP_GUIDE.md; trước rollback phải xuất cả tiến độ và kho âm.

Bảng số/tầng/giờ/ngày và chú giải thuật ngữ đã đưa vào vòng học; thêm nghe theo ngữ cảnh bài 3/4/5/11. N4 hiện là bản đồ được xác minh nguồn, không phải khóa đã có. KNOWLEDGE_COVERAGE.md ghi mẫu số dự thảo, chưa danh sách N5/N4 đủ.

AI vẫn giữ phạm vi cũ. Đã thử nguồn+JSON+guard bằng phản hồi thật, nhưng còn suy diễn nghĩa Việt ở hỏi tiếp; candidate thử nghiệm không nối vào UI. Không gọi kho tĩnh/hội thoại hướng dẫn là AI mức 2 hoàn tất. Xem AI_QUALITY.md/evaluation.

Kiểm thêm: npm.cmd run test:tools; npm.cmd run test:voice; npm.cmd run test:foundation. test:access/test:ui giữ hồi quy. Mock hủy/timeout riêng: node scripts/ai-boundary-ui.mjs. Tất cả QA profile riêng; mic giả phải phân biệt với nói thật.
