# Kiểm soát chất lượng AI — 11/11/2026

## Lỗi thật và cách đọc benchmark

Đã đọc lại real-ai.json, real-ai-context.json; giữ bản trước thay đổi trong .tmp-ui/history. Ví dụ lịch sử có yêu cầu người nói MUỐN khẳng định nhưng đã viết phủ định: đổi 学生ではありません sang 学生です trong trường hợp ấy là sửa khớp ý định, không phải bằng chứng hai câu đồng nghĩa. Khi đề không yêu cầu đổi ý, đảo phủ định là sai.

Bộ mới .tmp-ui/quality-evaluation.json: 10 tình huống cho mỗi mô hình, gồm câu vốn đúng, ý định khác câu viết, ý định phủ định, hai cách phủ định hợp lệ, đọc giới thiệu và bốn nhánh kaiwa. Không tự cho điểm chữa viết bằng keyword rồi gọi là độ chính xác.

Lỗi 1.7B cụ thể ở lần chạy mới:
- Với 学生です vốn đúng, đưa 学生ではありません dưới tiêu đề “Câu đúng và tự nhiên hơn”, dù cuối đáp án lại công nhận câu gốc đúng. Trộn sửa lỗi với đổi nghĩa.
- Khi người học muốn nói mình là học sinh nhưng viết phủ định: phản hồi tự mâu thuẫn, cuối cùng lại bảo dùng 学生ではありません để nói ý khẳng định.
- Đọc アンです đúng ý chính nhưng gọi です là cách nói trong “câu hỏi” dù đây là câu giới thiệu.

4B được thử như một ứng viên lớn hơn (~2,50 GB model layers Q4_K_M), không giả định chắc tốt hơn. Với prompt/ngữ cảnh ban đầu, sinh suy luận tiếng Anh dài và có lượt timeout 60 giây; bốn kaiwa trả dữ liệu bài thay mã lượt. Không đạt cho gia sư/đọc/chữa tự do.

Nguyên nhân có thể kiểm tra: instruction chưa tách loại phản hồi/ý định, đưa cả dữ liệu bài vào tác vụ chọn lượt khiến model lặp ngữ cảnh, đầu ra suy luận bị giới hạn token. Không kết luận đây là mọi nguyên nhân hoặc chỉ tăng RAM sẽ giải quyết. Đã thử prompt ngắn, /no_think và JSON enum, bỏ dữ liệu bài khỏi chọn lượt.

Retest 4B schema: .tmp-ui/quality-schema-retest.json. Chào/hỏi tên/xin nhắc lại qua 3 tình huống; đáp tên chọn nhầm greet thay acknowledge (1 thất bại). Lượt đo ~1,7–3,0 giây ở tập nhỏ sau nạp, không cam kết tốc độ và không suy ra 75% đúng trong sử dụng chung. CPU Windows i5-1135G7/RAM khoảng 24GiB; Iris Xe chưa đo.

## Cơ chế đang áp dụng

| Tác vụ | Mở thực tế | Kiểm soát |
|---|---|---|
| Hỏi bài | Nội dung bài có nguồn; chưa duyệt độc lập toàn bộ | Không gọi model, ghi đúng nhãn |
| Đọc | Vài câu Student/An đã đối chiếu | Không phân tích mở, không nhận nhầm câu hỏi hay một phần danh từ dài |
| Viết | Khung Student khẳng định/phủ định | Không đảo ý trừ khi ý định nêu rõ; tiếp nhận làm rõ ở lượt sau; ngoài khung hỏi lại, chưa đánh giá |
| Kaiwa 4B | Chào, hỏi tên, xin nhắc lại | Schema chỉ mã, so với ý định hỗ trợ; sai thì bỏ; chỉ hiển thị câu kho cố định |
| Đáp tên / model khác | Kịch bản | Không gọi nhánh mô hình chưa đạt |
| Voice/đoạn viết tự do | Chưa mở | Không giả là đã đáng tin |

Đây là giới hạn thực thi trong src/ai.js và src/ai-policy.js, không chỉ cảnh báo. Các phản hồi theo quy tắc không được tính là AI sinh; nội dung tự soạn không được gắn “chuyên gia duyệt”. Không dùng AI quyết định đạt bài/cấp độ.

Các unit test có căn cứ: giữ câu đúng, giữ ý phủ định, đổi theo ý định rõ ràng, hai cách phủ định cùng nghĩa, câu khác nghĩa, câu hỏi, danh từ dài và hội thoại làm rõ; dùng chặn mạng để xác nhận không gọi model ở phần nguồn/quy tắc. Không dùng test này để chứng minh năng lực mô hình. Edge QA gọi 4B thật, hủy thật và giữ dữ liệu; raw retest/benchmark riêng ở trên.

## Đánh giá lại theo PROJECT_BRIEF — 11/11/2026

Giữ hai mô hình đã có, không tải mới. Thử 4B với nguồn hẹp, đầu ra JSON và hỏi tiếp, 6 ca × 3 lần = 18 phản hồi thật, có tập phát triển/heldout tách; raw evaluation/grounded-ai-raw.json. Cấu trúc 18/18 không phải độ đúng. Độ trễ 10145–23590 ms, trung vị 15898 ms ở máy/mẫu này. api/ps báo size 3.186.108.660 byte, VRAM 0, ctx4096; đây không phải đo RAM đỉnh.

Lỗi cụ thể: gợi ý bị lộ đáp án 3/3; ngoài nguồn được thừa nhận trong lời nhưng cờ inScope vẫn true 3/3. Không tự công bố độ chính xác từ keyword. Nguồn+JSON cải thiện giữ ý ở các ca câu đúng nhưng chưa đủ mở gia sư sinh tự do.

Vòng giới hạn tiếp theo: grounded-explainer.js thử bộ mới, gợi ý/out-of-source được mã chặn trước, ví dụ Nhật bị giới hạn nguồn. 3 ca sinh ×3 lần =9 cuộc gọi thật; 2 ca guard ×3 =6 phản hồi mã, không giả thành AI. Raw evaluation/explainer-wrapper-raw.json. Đã giữ lại một phản hồi có Nhật ngoài nguồn; tuy nhiên còn thêm phân biệt học sinh/sinh viên không có căn cứ và yêu cầu chủ ngữ/động từ phủ định không được nguồn hỗ trợ. Bộ kiểm cấu trúc không phát hiện hết nghĩa Việt sai. Candidate KHÔNG ĐƯỢC GẮN UI, EXPLAINER_CANDIDATE_APPROVED=false. Không vá riêng câu heldout để cho qua.

Mức AI tương tác nhận câu tự tạo vẫn chưa hoàn thành; kho nguồn/hội thoại hướng dẫn tiếp tục dùng được, không đóng toàn bộ công cụ. Nhánh chọn lượt chào cũ giữ guard. Không gọi FAQ là AI tự do. Điểm tiếp tục: lập bộ kiểm ngữ nghĩa/tác vụ rộng hợp lý hơn, thử công cụ/ứng viên phù hợp chỉ sau kiểm tài nguyên, không để đổi mô hình chặn nội dung học.

Rà code bằng ngữ cảnh mới: evaluation/tools-ai-review.json, 3 nhóm ×3 lần, 2 timeout. Đây chỉ AI review, không độc lập học thuật. Nhiều báo sai đã bác bằng mã/tests (đòi chấm nét, phủ nhận fallback/optional chaining); vấn đề callback transaction xác minh được đã sửa abort và có fault test.
