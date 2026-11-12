# Ma trận yêu cầu → thao tác → bằng chứng

Baseline ở evaluation/baseline.json; các số test chỉ phản ánh kiểm phần mềm. Kết quả chương trình, xác minh học liệu và năng lực người học tách riêng.

| ID | Điều kiện/thao tác | Mong đợi | Cách kiểm/bằng chứng | Trạng thái | Giới hạn |
|---|---|---|---|---|---|
| BASE | Dự án hiện hữu → Đọc mã/docs/Git và chạy nền | Giữ bản gốc và biết trạng thái thật | Mã + CLI · evaluation/baseline.json | đạt | Không Git; dùng checkpoint, nền 40 test |
| NAV-01 | Profile mới chưa học → Mở 10→3→25/reload | Không khóa, không tự hoàn thành bài trước | Edge · scripts/open-access-ui.mjs / .tmp-ui/open-access/report.json | đạt | QA riêng, không dữ liệu học thật |
| WORD-01 | Từ cùng key → Gõ rồi flashcard/ghi chú | Một lịch, phân biệt kiểm gõ/tự báo cáo | Unit + Edge · .tmp-ui/study-tools/report.json | đạt | Sau xem học liệu có afterModel; không suy nhớ lâu |
| WORD-02 | Nhớ/nghe chép → Mở chế độ | Danh sách và tìm kiếm không lộ đáp án | Edge · .tmp-ui/study-tools/report.json | đạt | Nghe chép cần phát hết; chưa đo hiệu quả học |
| KANJI-01 | Dữ liệu source ghim → Tải nét, animate, vẽ/undo/reload/backup | Nguồn/license và bản viết được giữ | Unit/hash + Edge · public/kanji/manifest.json / .tmp-ui/study-tools/report.json | đạt | 46 source; không nhận dạng/chấm nét |
| KANJI-TOUCH | Thiết bị cảm ứng thật → Vẽ/chuyển chế độ | Cảm ứng dùng tốt | Thiết bị thật · Pointer events có trong mã; chưa máy thật | chưa kiểm tra | Responsive 390px không phải kiểm ngón tay thật |
| GRAM-01 | Ngữ pháp được chọn → Tìm, thử, về bài | Chung question ID/đáp án | Edge · .tmp-ui/study-tools/report.json | đạt | Chưa thẩm định toàn bộ ngữ pháp |
| VOICE-01 | Mic QA giả → Ghi/lưu/reload/phát/xuất/xóa/nhập | Blob giữ qua buổi, không trùng/ghi đè | MediaRecorder/IndexedDB thật, input giả · .tmp-ui/voice-storage/report.json | đạt | Không kết quả nói của người dùng |
| VOICE-FAULT | Transaction có lỗi → Ném lỗi sau queue write | Abort nguyên tử, dữ liệu cũ giữ | Fault injection Edge · .tmp-ui/voice-storage/report.json | đạt | Không thử phá kho thật |
| SRS-01 | Lịch từ cũ/mới → Đánh giá sớm/đến hạn/sai | SM-2 biến thể có tài liệu, giữ due cũ khi load | Unit + Edge · SRS.md / tools-state.test.js | đạt | Không bằng chứng thuật toán tối ưu cho người này |
| SCHEMA-01 | Backup v1 trước field mới → Xuất/nhập notes/vector/evidence | Không mất field cũ, field mới mặc định | Unit + Edge · tools-state.test.js / .tmp-ui/study-tools/report.json | đạt | Kho ghi âm xuất riêng, không Blob trong JSON tiến độ |
| N5-FND | Bài 3/4/5/11 → Mở bảng trong vòng và nghe ngữ liệu mới | Có nền tại chỗ, đáp án có lý do và lỗi vào ôn | Code + Edge · .tmp-ui/n5-foundation/report.json | đạt | Đạt vận hành; âm chưa nghe duyệt độc lập |
| AUDIO-ACA | TTS có file → Đối chiếu đọc và nghe duyệt | Tách kỹ thuật/ngữ âm | Nguồn + rà + người nghe · AUDIO_REVIEW.md | chưa đạt | Có so khớp kế hoạch; chưa người độc lập nghe duyệt |
| AI-REAL | 4B đã có → 6 ca ×3 + 3 ca mới ×3 | Giữ ý/nguồn, hỏi tiếp, gợi ý trước đáp án | LLM local thật · evaluation/grounded-ai-raw.json / explainer-wrapper-raw.json | chưa đạt | Còn lỗi nghĩa Việt và lộ đáp án; candidate không nối UI |
| AI-BOUND | Yêu cầu treo → Hủy/timeout/học tiếp | Không mất câu hỏi/bài | Mock transport/timer, Edge thật · .tmp-ui/ai-boundary/report.json | đạt | Không độ chính xác hoặc latency model |
| CAN-DO | Thang chưa được thẩm định → Chọn theo ủy quyền | Không điểm kaiwa chính thức/tự công nhận | Config + UI · communication-criteria.json | đạt | Chỉ thang thử nghiệm; chưa đo người học |
| N5-COVER | Danh mục hiện có → Đo liên kết và liệt kê thiếu | Không coi số lượng là đủ | Script + nguồn · KNOWLEDGE_COVERAGE.md | chưa đạt | Mẫu số dự thảo chưa đủ cấp; assessment riêng còn ít |
| N4-COVER | Mục tiêu mới N4 → Bản đồ Minna II/Can-do | Đủ học liệu cốt lõi trong website | Nguồn + dữ liệu · curriculum-map.json | chưa đạt | Có đề cương; chưa bài/từ/đánh giá N4 thực |
| LEARNER | Chưa có dữ liệu học thật → Đo sau nghỉ/tình huống mới | Bằng chứng năng lực thật | Người học thực · Chưa cung cấp | chưa kiểm tra | Không tạo lời nhận xét hoặc kết quả giả |


## 12/11 — nghiệm thu bổ sung

| Ca | Kết quả | Giới hạn |
|---|---|---|
| Bài46–50, manifest lỗi/thử lại, nghe49/đáp46 | Edge qua | Lấy mẫu chức năng, không thẩm định mọi câu |
| Tổng hợpN4A: sai→ôn, WAV/đáp, reload,390px | Edge qua | Ngữ liệu mới nhưng chưa đủ đề thi |
| Capstone: nghe→đáp→hỏi lại→WAV nhánh, điểm dừng/backup | Edge qua | Câu cố định, nói/phản hồi mở chưa chấm |
| Legacy414câu và backupv1 | Đối chiếu qua | Không thao tác profile học thật |
| Tách chunk công cụ/báo cáo | Build+test:tools qua | Học liệu vẫn tải chung; lỗi chunk có fallback, chưa mô phỏng mất mạng production |

Chưa nghiệm thu nguồn học duy nhất toànchặng, độ đủ học thuật, chuẩn phát âm hay kết quả học của người dùng.
