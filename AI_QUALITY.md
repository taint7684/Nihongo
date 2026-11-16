# AI_QUALITY.md — Tiêu chí chất lượng AI (local-only, $0)

## Phạm vi

Dự án Nihongo-Compass không dùng mô hình AI trả phí, không tải mô hình AI từ cloud. Hệ thống AI_helper chỉ chạy cục bộ qua Ollama (nếu người dùng cài đặt local) hoặc fallback quy tắc (rule-based) khi Ollama không có sẵn.

## Thành phần

| File | Mục đích |
|------|----------|
| `src/ai-helper.js` | Giao diện AI gọi Ollama `/api/generate` qua proxy `/ollama`; fallback rule-based khi Ollama không phản hồi |
| `evaluation/ai-grounding.json` | Dữ liệu grounding (câu hỏi/thời gian/đáp án mẫu) để kiểm hallucination |
| `evaluation/explainer-wrapper.json` | Wrapper dữ liệu cho giải thích ngữ pháp, từ vựng, kanji |

## Nguyên tắc

1. **Không gửi dữ liệu cá nhân** ra ngoài máy tính người dùng.
2. **Không gọi API trả phí** (OpenAI, Anthropic, Google, ...). Mộtमात्र endpoint là `http://127.0.0.1:11434` qua proxy `/ollama`.
3. **Fallback quy tắc**: Nếu Ollama không chạy, AI_helper trả về câu trả lời dựa trên quy tắc/domain knowledge đã có trong dự án.
4. **Không thay thế đánh giá học giả**: AI không được dùng làm bằng chứng độc lập cho G4 (độ chính xác độc lập).

## Quy trình đánh giá G11

- AI_helper phản hồi đúng dữ liệu grounding ≥ 3 lần trên tập held-out (câu hỏi chưa thấy trong training).
- FAQ/kịch bản không được coi là thay thế cho AI sinh.
- Nếu Ollama không có, hệ thống vẫn hoạt động bình thường bằng fallback rule-based.

## Ghi chú

Hệ thống AI là tùy chọn, không bắt buộc để dùng trang web. Tất cả tính năng chính (học ngữ pháp, từ vựng, kanji, nghe/đọc/viết) hoạt động hoàn toàn không cần AI.
