# Quyết định và hồi quy

## NAV/WORD/KANJI — 11/11/2026
- Lỗi gốc: từ/ngữ pháp có nhưng khó tìm, Kanji không có vùng viết; nhớ lại công cụ có thể lộ đáp án qua danh sách.
- Nguyên nhân: toàn bộ học liệu nằm trong drawer bài, chưa có danh mục công cụ; bố cục hai cột vẫn hiện chữ lúc kiểm.
- Sửa: route tools dùng dữ liệu/ID/schedule cũ; ẩn danh sách lúc gõ/nghe; bước sau học được gắn afterModel, không gọi là nhớ lâu.
- Nét: nhập KanjiVG ghim commit, giữ SVG/license, chỉ render path đã lọc; không nhận dạng/chấm nét. Parser từng lỗi escaping backspace, đã sửa và kiểm toàn asset.
- Hồi quy: study-tools-ui, tools-state.test, baseline open-access. Xem xét lại khi thêm từ đồng hình khác nghĩa hoặc có đánh giá viết đáng tin; không tự gộp homograph.

## VOICE/AI-review — 11/11/2026
- Rà AI ngữ cảnh mới bằng 4B có báo sai: đòi chấm nét dù yêu cầu không chấm, không thấy fallback dù có, cho rằng optional chaining không có default dù dùng ||2.5. Đã bác bỏ bằng source và tests, không áp dụng lời khuyên trái brief. Đây chỉ là AI review.
- Báo về callback transaction có ngoại lệ được kiểm tra lại: executor Promise có thể reject nhưng transaction vẫn còn lượt ghi đang chờ. Đã thêm abort chủ động trong catch và ca fault injection QA; nhập kho dùng transaction nguyên tử, base64 phải đúng độ dài.
- Điều kiện xem xét lại: phiên bản schema kho mới hoặc nhiều tab đồng thời; luôn giữ không ghi đè duplicate ID.

## N5-FOUNDATION — 11/11/2026
- Lỗi gốc: bảng số/giờ/ngày nằm sâu trong tra cứu, người mới có thể bỏ qua; ánh xạ mới từng nhầm chỉ số bảng giá/tầng.
- Sửa: đưa nhóm 6 dòng trong đúng vòng; cả tháng và ngày ở bài 5; nghe mới có câu hỏi phân biệt cùng kiến thức ở dữ kiện khác. Sửa so khớp trường âm 水曜日 theo từ, không nới lỏng toàn cục.
- Hồi quy: n5-foundation-ui + contracts.test; kết quả file/đọc theo dữ liệu khác nghe duyệt ngữ âm.

## VOICE-BACKUP-SIZE — 11/11/2026
- Lỗi tiềm tàng xác minh bằng giới hạn: xuất toàn kho 100 bản có thể tạo JSON vượt giới hạn nhập 20 MB dù từng bản hợp lệ.
- Sửa: lưu tối đa 2 MB/bản, xuất nhóm tối đa 5 bản do người dùng chọn; mỗi archive dưới 20 MB; import trùng ID vẫn bỏ qua và transaction nguyên tử. Không tự xóa hoặc tự gửi file đi.
- Hồi quy: voice-storage-ui và validator, tiếp tục kiểm kho nhiều nhóm khi có dữ liệu QA phù hợp.

## AI-NARROW-EXPLAINER — 11/11/2026
- Lỗi gốc: model có thể đảo ý/không giữ ý, không tôn trọng gợi ý trước đáp án; kho tĩnh không đáp ứng AI mức 2.
- Thử: 4B có sẵn, nguồn + JSON + lịch sử ngắn, ba lần mỗi ca, heldout riêng. Tiếp tục thử guard hẹp và tập mới.
- Kết quả: guard có thể chặn Nhật ngoài nguồn/gợi ý lộ đáp án, nhưng nghĩa Việt còn suy diễn sai không bị cấu trúc phát hiện. Không đưa candidate vào production, không gọi là đã làm xong AI tương tác.
- Xem xét lại: có bộ eval ngữ nghĩa mới và phương án/công cụ thực sự cải thiện; không sửa riêng đáp án theo heldout để lấy pass. Raw/latency/memory ở evaluation. Học không AI vẫn chạy.

## Vòng N5/PERF 12/11

Lỗi: mốc rubric48h nhưng code24h. Sửa lượt mới có restHours48, báo sau nghỉ tính timestamp48h; backup không field giữ nghĩa24h. Test giữ lịch sử cũ và không biến lượt24h thành đạt48h. Không viết lại due cũ.
Audio index/coverage từng đóng gói vào bundle. Chuyển JSON local tải theo nhu cầu, dùng chung một request, lỗi không lặp vô hạn và có retry. Test concurrent/failure/retry/off-device URL; Edge chặn manifest rồi khôi phục, học và đáp án vẫn giữ.
Câu mới đầu soạn vị trí đáp án thiên về A: cân bằng cố định trước phát hành, chỉ ID mới, không áp vào câu cũ. Không shuffle lại mỗi lượt làm vì backup lưu index.

N4 transfer bản chưa nghiệm thu ban đầu xoay lại vai trong communication: điều đó không phải ngữ liệu mới. Đã thay bằng nhiệm vụ chuyển mục đích/bối cảnh riêng (phòng nóng/máy tính, điều kiện nhìn-nghe, từ chối có nghĩa vụ, quên đồ biết nơi, chuẩn bị chuyến đi). Thêm scenarioKey/kiểm đã gặp xuyên activity để không đổi ID rồi giả mới. Backup cũ không field vẫn dùng kiểm cùng activity như trước.

Rà Kanji phát hiện một số metadata cũ đặt nghĩa cả từ (学生/ベトナム人/理由/計画) trong trường meaning của một chữ. Đã tách nghĩa gợi nhớ chữ và wordMeaning, giữ inWord/cách đọc theo cả từ. Hán Việt không phải âm Nhật và không suy nghĩa ghép cơ học. Không xóa ID/tiến độ; bài gõ đọc chỉ chấm cách viết kana của cả từ, không chấm phát âm hoặc nét.


## 12/11 — định danh/nguồn, nhóm1

- Lỗi gốc:私/わたし chia lịch; dữ liệu chỉ khóa chữ không tách nghĩa. Sửa read adapter giữ snapshot cũ, lịch canonical cho lượt mới, usageId tùy chọn; backupv1 không đổi. Hồi quy alias-only, hai lịch xung đột, old/new evidence,橋/箸, UI export thật. Không mở ghép tự động cho mọi từ.
- Lỗi có nguy cơ: alias snapshot cũ quá hạn làm từ đến hạn mãi. Lịch canonical mới nhất bao phủ snapshot cũ; dữ liệu cũ vẫn giữ. Test xác nhận due hiển thị cập nhật.
- Lỗi nguồn: Excel itertext cộngrPh (furigana phụ) vào chữ/tên cột. Bộ đọc chỉt/r-t; fixture名前+rPh trả名前. Rà lại cả3workbook.
- Lỗi kiểm kê:さ trong高さ bị đếm Kanji. LọcScript=Han, KANJIDIC đối chiếu; giữ高さ mục từ, ghi exclusion.185KanjiN4thay186, không hạ tiêu chí học.
- Bộ đếm mới tách ứng viên và chưa rõ; không dùng match duy nhất để duyệt ngữ nghĩa.


## Sửa nguyên nhân hệ thống 12/11
- Suy đuôiします chỉ nhận gốc danh từ có POSvs; ngănなくします→なく/泣く. Kính ngữ bất quy tắc có ánh xạ riêng, vẫn giữ nghĩa/cách dùng theo bài.
- Trường reading nhập môn từng chứa romaji: chuyển kana vào reading, giữ romaji riêng, không đổi khóa học/lịch sử.
- Script=Han gồm々; bộ chọn chữ tra dùng Unified_Ideograph, không đếm dấu lặp là Kanji riêng. Kanaさlọt từ高さ đã bỏ khỏi target chữ.
- AI bácはたち sai; nguồn JMdict1600790 được ưu tiên. Không đổi câu theo AI và không gọi đây là duyệt độc lập.
- 私 có từ vựng và hồ sơ KANJIDIC mới, chưa có mục Kanji học/nét trong158chữ. Ghi thiếu để xử lý ở lõi N5, không che bằng số hồ sơ tra.
