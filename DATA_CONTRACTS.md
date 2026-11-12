# Hợp đồng dữ liệu — mở rộng schema v1

## Định danh và liên kết

- Bài: ID cũ hira/kata/sound/mnn-01..25/checkpoint giữ nguyên. N4 chưa có ID bài hoạt động; không dùng placeholder như bài hoàn chỉnh.
- Từ: key legacy là chữ mục từ w.text, dùng chung wordReviews/savedWords/wordNotes/wordEvidence; manifest ID word: + key. wordPool ưu tiên ví dụ đầy đủ khi cùng key, không tạo lịch thứ hai. Chưa tự gộp các cách viết hoặc tách đa nghĩa; cần migration riêng nếu làm sau.
- Kanji: ID kanji: + chữ Unicode; bản viết theo chữ, khác mục từ. Nét SVG có nguồn KanjiVG/commit/license/SHA; không bản nhận dạng/chấm nét.
- Ngữ pháp: ID l.id-g + chỉ số hiện hữu, không được tái sắp khi chưa migration; guided-links.js/l.guidedMap liên kết câu hỏi.
- Ví dụ: thuộc mục từ/mẫu, có ja/reading/vi; không tự coi có đủ trường là kiến thức đúng.
- Audio: ID hash giữ nguyên, kind/text/reading/path/credit/engine; full catalog có nguồn/quyền/phiên bản/kiểm đọc/SHA. Chỉ mục gọn giữ trường UI, retired không phát hành nhưng file lịch sử giữ.
- Giao tiếp: task ID cũ, lessonId, variant, ý định/card/accepted/rejected, prompt và đọc. Phản hồi ngoài danh sách là unassessed, không tự sai. responseMs từ lần hết audio gần nhất tới lưu, gồm gõ/thao tác, không điểm tốc độ.
- Đánh giá: question ID cũ, choices/answer hoặc accepted/orderTokens; practice/assessment tách ID/ngữ liệu. Không điểm JLPT quy đổi.
- Ôn: wordReviews chung lịch (SRS.md), reviews theo question ID, listeningActivities theo task, Kanji tự lưu, learning.evidence theo nhiệm vụ. Có lịch khả dụng không phải đã ôn thật.

## Dữ liệu mới trong backup JSON tiến độ

toolSection, toolKanji (tùy chọn); wordNotes[key] ≤2000 ký tự; wordEvidence[key][] gồm kind recall/dictation/use, response, at, correct khi kiểm mục xác định, afterModel khi đã xem học liệu. kanjiDrafts[char] là mảng tối đa 100 nét, 1000 điểm/nét, tọa độ 0..109; kanjiReviews là tự kiểm at/due. Trường cũ vắng các trường mới nhận mặc định rỗng. Không tính lại due khi load.

Kho ghi âm dùng IndexedDB nihongo:voice:v1/clips, format archive nihongo-voice-v1 riêng, không tự nhét Blob vào localStorage/backup tiến độ. Chủ động lưu/xóa/xuất/nhập, nhập trùng ID bỏ qua, transaction nguyên tử. File sao lưu nhóm tối đa 5 bản, 2 MB/bản mới; import file tối đa 20 MB. JSON tiến độ không mất khi kho ghi âm lỗi, và ngược lại.

## Kiểm tra

state.test/tools-state.test/voice-store.test/contracts.test kiểm schema, ID/link/asset và compatibility. Edge kiểm thao tác+backup thật qua UI với profile QA. Tất cả chỉ là kiểm cấu trúc/vận hành; nghĩa, cách đọc, furigana/âm và ngữ pháp cần hồ sơ nguồn/rà riêng. Chưa có người đủ năng lực duyệt độc lập.

Field tùy chọn toolLessonId: bài tham chiếu có thật trong công cụ; giữ qua backup/reload, không tự đổi completed hay lessonId tuyến chính. scenarioKey ghi tình huống ổn định, kiểm lặp xuyên activity; lượt cũ không field vẫn kiểm cùng activity. restHours48 cho lượt mới, lịch sử không field giữ nghĩa24h.
