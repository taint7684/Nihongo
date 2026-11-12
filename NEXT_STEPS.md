# Điểm tiếp tục hiện hành — 12/11/2026

Mục tiêu vẫn là tài liệu tự học cá nhân 0 → N5 → N4 theo CURRENT_MISSION.md. **Chưa hoàn thành toàn phạm vi.** Giữ nguyên bản gốc study-room, ID/thứ tự bài, schema/key v1, tiến độ/backup, truy cập tự do và ngân sách 0 đồng. QA luôn dùng hồ sơ riêng.

## Trạng thái có bằng chứng

- Git đã có baseline f4a3756; định danh/adapter dac4ae5; đối chiếu nguồn e2b7c7d; đợt N5 chức năng 91e46d4. Không push, không đưa dữ liệu học thật/runtime/cache vào Git.
- JMdict/KANJIDIC2 đã có nguồn và giấy phép. Tách mục từ/cách viết/dạng chia/nghĩa theo bài; adapter 私/わたし giữ lịch sử cũ. Mẫu 30 từ/15 Kanji/15 câu/10 ngữ pháp được ghi đúng giới hạn; chưa có người duyệt độc lập. AI review thật bác sai はたち, nên không dùng làm bộ duyệt.
- 63 ngữ cảnh từ N5 bổ sung, 18 câu áp dụng mới và Kanji 私 (7 nét). N5 có503 ứng viên mục từ; phần mới N4 có163; tích lũy666 theo entry đã loại trùng, không phải số từ đã thành thạo hoặc đủ cấp.
- Đã đối chiếu thêm TUFS cho18 mục ngữ pháp; tổng28 phạm vi rà (23 N5,5 N4). Sửa bài16: không bắt mọi vế nốiくて/で có cùng chủ thể. Xem CONTENT_REVIEW.md và evaluation/n5-semantic-review-progress.json để biết từng bài đã rà gì.
- Audio bảng nền đã có cho145 dòng ở bài3/4/5/11, dùng133 tài sản mới; 1日 lịch và khoảng một ngày có file riêng. TTS có kiểm kế hoạch đọc, chưa nghe duyệt ngữ âm độc lập. Catalog1954 tổng,1943 active,11 giữ lịch sử. Không dùng làm chuẩn chấm phát âm.
- Metadata nguồn656 bản ghi đã giảm từ295446 xuống87653 byte, so hash mọi trường trước/sau giống nhau. JS khởi tạo giảm1367,22KB xuống1169,37KB; gzip342,22KB xuống338,41KB, vẫn còn lớn.
- 104tests/19files và build qua. Edge QA: word-identity/backup, open-access, functional-gap, foundation-audio qua. So414 câu cũ với765 câu hiện tại: không đổi ID/lựa chọn/đáp án. Không tạo kết quả học thật.

## Tiếp tục đúng thứ tự nhóm3

1. Chốt tiếp phạm vi độc lập và hoàn thiện lõi N5; 450 mục từ/cụm và105 chữ trong tập dự thảo đã có ngữ cảnh, **không chứng minh đủ N5**. Rà cả đáp án, từ hỗ trợ, tiên quyết, nghe/đọc và nhiệm vụ mới; không chỉ thêm số lượng.
2. Bảng1–25 nêu cụ thể phần đã rà nguồn và phần chưa xác minh. Chưa được gán duyệt học thuật toàn bài. Phân vai từ chủ động/nhận biết/chú giải còn nhiều mục chưa phân loại.
3. Sau lõi N5, tiếp N4: tập cũ240 mục gồm222 mục từ/cụm,15 cấu trúc và3 thuật ngữ. Sau bỏ thiếu giả/dùng lại, còn61 mục từ/cụm thiếu ngữ cảnh và155 Kanji mục tiêu chưa có bài. Tập này vẫn chưa xác lập đủ N4. Không gộpそうです đồng ý vớiそう truyền văn,やすい dễ với安い rẻ.
4. Sau đó hoàn thiện luyện/ôn/đánh giá/kaiwa, rồi thư viện≥2500 Kanji/214 bộ thủ, xử lý AI có mục tiêu và nghiệm thu toàn thể. Thư viện hiện có159 chữ học/nét;525 hồ sơ tra nguồn không phải525 chữ đã dạy. Chưa có thư viện2500/214 hợp lệ.
5. AI sinh giải thích/chữa viết/hội thoại linh hoạt vẫn thiếu/chưa đạt; giữ tác vụ hẹp đã kiểm, nguồn/quy tắc và hội thoại hướng dẫn gọi đúng tên. Không đổi mô hình hàng loạt hoặc dùng AI làm điều kiện học.

## Cách kiểm và khôi phục

Chạy START-WEBSITE.cmd hoặc npm.cmd start. Kiểm: npm.cmd test; npm.cmd run build; node scripts/word-identity-ui.mjs; node scripts/open-access-ui.mjs; node scripts/functional-gap-ui.mjs; node scripts/foundation-audio-ui.mjs. QA port5175, hồ sơ riêng. Tạo audio bảng: node scripts/generate-course-audio.mjs --foundation (engine VOICEVOX cục bộ50021); không chạy test đọc catalog giữa lúc script đang ghi catalog/index.

Checkpoint mã đã kiểm ở .tmp-ui/checkpoint-n5-functional-passed; checkpoint mới theo commit sau đợt audio. Không coi checkpoint mã là backup dữ liệu học. Trước rollback xuất JSON tiến độ và kho ghi âm riêng theo BACKUP_GUIDE.md. Xem MASTER_CHECKLIST.md, SOURCES.md, VERIFICATION.md, REVIEW_QUEUE.md và HANDOFF_CURRENT.md.
