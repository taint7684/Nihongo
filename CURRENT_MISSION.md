<mission>
Tiếp tục trực tiếp trong: C:\Users\LENOVO\Desktop\Nihongo-Compass

Hoàn thiện website để cá nhân tôi, người Việt chưa biết tiếng Nhật, tự học nghiêm túc, dùng làm tài liệu học xuyên suốt từ số 0 đến N5 rồi N4.

Kết quả cần đạt:
1. Nền từ vựng, Kanji, ngữ pháp và phát âm chắc.
2. Nghe hiểu, tự diễn đạt và giao tiếp sơ cấp linh hoạt hơn.
3. Chuẩn bị đầy đủ cho JLPT N4, có đánh giá để biết điểm yếu trước khi thi.
4. AI hỗ trợ giải thích và hội thoại trong phạm vi đã kiểm chứng.
5. Thư viện mở rộng ít nhất 2.500 Kanji và đủ 214 bộ thủ, tách khỏi yêu cầu học bắt buộc N4.

Đây là nhiệm vụ triển khai, không chỉ lập kế hoạch, bài mẫu hay cập nhật báo cáo. Website phải đủ làm tài liệu học duy nhất: tôi không phải tự tìm giáo trình khác cho kiến thức thiết yếu.
</mission>

<priorities>
Đúng và chắc → hiểu và dùng được → nhớ lâu → tiết kiệm thời gian → mở rộng.
"Nhanh" = giảm học thừa, đúng thứ tự, bù đúng điểm yếu; không bỏ nền, nhồi kiến thức hay luyện mẹo. Tôi không gấp.
Không hứa đỗ 100%, không bịa xác suất đỗ, thời gian nhanh nhất hay điểm kaiwa N4 chính thức (JLPT không có bài nói).
Tôi muốn tự tin nhờ làm được tình huống mới, không nhờ huy hiệu hay số bài hoàn thành.
Luôn tách ba kết quả: website hoàn thiện đến đâu; nội dung/công cụ đã xác minh đến đâu; năng lực của tôi đã đo đến đâu.
</priorities>

<constraints>
- Giữ bản gốc study-room, dữ liệu học, ID bài, tiến độ, backup. Đổi schema/định danh phải có migration, kiểm tương thích, cách khôi phục.
- Mọi nội dung đã có mở tự do; học bài 10 trước bài 1 được; không tự hoàn thành bài bị bỏ qua.
- Ngân sách 0 đồng, gồm cả AI. Không dịch vụ trả phí, thẻ, trial phụ thuộc lâu dài.
- Dữ liệu riêng không tự gửi ra ngoài; dịch vụ xử lý ngoài thiết bị phải nói rõ và do tôi chủ động bật.
- Responsive trước; chưa app native, cộng đồng, thanh toán.
- Tận dụng giao diện hiện tại; chỉ sửa điều hướng/bố cục khi thật sự giúp học dễ hơn.
- QA dùng hồ sơ riêng; không tạo thành tích hay phản hồi giả của tôi; không mở hay sửa dữ liệu học thật khi kiểm thử.
</constraints>

<verify_current_state>
Đọc PROJECT_BRIEF.md, EXECUTION_BRIEF.md, NEXT_STEPS.md, các bảng độ phủ, nguồn, hồ sơ rà nội dung/audio/AI, hướng dẫn dự án và mã liên quan.
Báo cáo gần nhất (dữ kiện lịch sử, cần xác minh lại): có bài 1–50 và công cụ học; từ vựng dùng chuỗi chữ làm khóa nên chưa chuẩn hóa theo mục từ/nghĩa/cách viết (ví dụ 私 và わたし thành hai mục); tập tham chiếu N5/N4 còn dự thảo (N5 388 từ/104 Kanji; N4 240 từ/186 Kanji; 99 từ N4 báo thiếu, 156 Kanji N4 chưa có mục học); chưa có thư viện ≥2.500 Kanji và 214 bộ thủ; AI sinh tự do chưa đạt; dự án chưa có Git.
Kiểm mã, dữ liệu và website thật. Phân biệt: đã có và đủ phạm vi / hoạt động nhưng thiếu / chưa có / chưa kiểm chứng.
Tạo một checklist tổng hợp duy nhất: yêu cầu → triển khai → tiêu chí kiểm → bằng chứng → trạng thái.
</verify_current_state>

<execution_order>
Thứ tự bắt buộc, không đảo:
0. Khởi tạo Git, commit trạng thái hiện tại làm mốc (không đưa dữ liệu học thật vào repo).
1. Chuẩn hóa mục từ và định danh: phân biệt mục từ / cách viết / nghĩa-cách dùng / dạng chia; xử lý 私/わたし mà giữ tiến độ và lịch ôn; migration có kiểm khôi phục; đếm lại có loại trùng. CHƯA thêm nội dung mới trước khi xong bước này.
2. Tích hợp JMdict và KANJIDIC2 (kiểm giấy phép, ghi nguồn), đối chiếu nghĩa và cách đọc toàn bộ mục hiện có, sửa lỗi lệch. Chạy mẫu kiểm độc lập tối thiểu: 30 từ, 15 Kanji, 15 câu ví dụ, 10 mẫu ngữ pháp, báo tỷ lệ lỗi. Tỷ lệ lỗi cao thì mở rộng mẫu và sửa nguyên nhân hệ thống trước khi nạp thêm.
3. Chốt tập tham chiếu N5/N4 độc lập với kho hiện có (mục curriculum_and_reference), rồi hoàn thiện lõi N5, sau đó lõi N4.
4. Luyện, ôn, đánh giá và giao tiếp.
5. Thư viện ≥2.500 Kanji và 214 bộ thủ.
6. Xử lý khoảng trống AI có mục tiêu.
7. Nghiệm thu tổng thể.

Mỗi nhóm phải qua kiểm tra rồi mới sang nhóm sau; sau mỗi nhóm commit, lưu checkpoint và cập nhật checklist/NEXT_STEPS ngay. Phần độc lập có thể làm khi phần khác bị chặn. Không dừng sau vài mục, một bài mẫu hay một lần tăng số test; không chỉ cập nhật NEXT_STEPS khi vẫn làm tiếp được. Chạm giới hạn phiên/công cụ thì lưu trạng thái chính xác, nêu lý do dừng, và tiếp tục từ đó ở phiên sau. Không hạ mục tiêu thành demo hay tuyên bố hoàn tất giả.
Quyết định thông thường (ngưỡng kaiwa ban đầu, chọn nguồn, thứ tự học) tự quyết, nhưng ghi vào REVIEW_QUEUE.md kèm lý do và cách đổi để tôi xem lại sau; không dừng chờ tôi duyệt.
</execution_order>

<curriculum_and_reference>
Chương trình: Nhập môn → N5 → ôn/đánh giá N5 → N4 → ôn/đánh giá N4. Xác minh phiên bản Minna no Nihongo Sơ cấp I/II dùng để tổ chức; đối chiếu mô tả cấp độ và dạng nhiệm vụ JLPT chính thức, JF Standard/Can-do, Irodori. Website phải có đủ giải thích, ví dụ, audio, luyện, phản hồi, ôn cho kiến thức thiết yếu; liên kết ngoài chỉ bổ sung.

Tập tham chiếu từ/Kanji/ngữ pháp:
- Lập độc lập với kho đang có; không dùng danh sách hiện có để tự xác nhận đủ cấp.
- Đối chiếu ít nhất hai nguồn có xuất xứ xác định; kiểm tra chúng có thật sự độc lập hay sao chép cùng một danh sách. Ghi phiên bản, xuất xứ, điều kiện sử dụng, chỗ bất đồng, lý do chọn.
- Không mặc định JMdict/KANJIDIC có nhãn JLPT chính thức; không gọi tập tham chiếu là danh mục JLPT chính thức.
- Mốc cộng đồng (N5 khoảng 800 từ/100 Kanji; N4 khoảng 1.500 từ/300 Kanji tích lũy) chỉ để phát hiện kho quá nhỏ. Không dừng khi vừa đạt một con số nếu bài học hoặc mục tiêu giao tiếp vẫn thiếu; không thêm từ ít liên quan chỉ để đủ số. Từ cần cho tình huống nhưng ngoài danh sách thì thêm, đánh dấu "bổ sung theo tình huống".
- Báo riêng N5, phần mới N4, tổng tích lũy đã loại trùng.
Không sao chép nội dung, mã, hình, audio khi chưa có quyền; "miễn phí" không đồng nghĩa được tái phân phối. Ưu tiên nội dung tự biên soạn hoặc dữ liệu mở có giấy phép rõ (KANJIDIC2, JMdict, KanjiVG, Tatoeba: kiểm từng giấy phép, ghi nguồn, tuân thủ điều kiện chia sẻ tương tự).
Chỉ nghiên cứu nhaikanji.com, phadaotiengnhat.com, Mazii, MochiKanji và ảnh tham khảo khi cần quyết định UX; mỗi phát hiện dẫn tới một quyết định triển khai.
</curriculum_and_reference>

<vocabulary>
Kiểm lại các mục từng báo thiếu, phân loại: từ cũ dùng lại / nghĩa mới / thực sự thiếu / matcher sai. Sửa matcher nếu sai; không thêm trùng để làm đẹp số liệu. Bổ sung toàn bộ khoảng trống của tập tham chiếu đã điều chỉnh, không chỉ danh sách thiếu cũ.
Báo riêng: N5; phần mới N4; tổng tích lũy đã loại trùng; mục chủ động sử dụng / nhận biết / chỉ chú giải.
Mỗi mục lõi: chữ, kana, loại từ, nghĩa Việt theo ngữ cảnh, ví dụ kèm nghĩa Việt, audio từ và câu, liên kết bài/chủ đề, luyện nhớ và dùng, ôn, trạng thái kiểm. Nghĩa Việt tự soạn ghi đúng cách đối chiếu ("tự soạn, đối chiếu nghĩa Anh trong JMdict"); không tự gắn nhãn đã duyệt chuyên gia.
</vocabulary>

<kanji_and_radicals>
A. Kanji lõi N5/N4 theo tập tham chiếu đã xác minh: nghĩa, cách đọc có nguồn, cách đọc trong từ thật, từ/câu ví dụ, liên kết bài, nét và thứ tự nét (KanjiVG khi cho phép), luyện, ôn, đánh giá. Âm Hán Việt chỉ khi có nguồn đáng tin. Phân biệt bộ thủ phân loại với thành phần cấu tạo; không bịa nghĩa thành phần hay lịch sử chữ.
B. Thư viện ≥2.500 Kanji: gồm Jōyō hiện hành (xác minh nguồn chính thức), cộng chữ ngoài Jōyō theo tiêu chí công khai; phân biệt Jōyō / chữ dùng trong tên / chữ bổ sung. Không gọi 2.500 là số chính thức hay yêu cầu N4.
C. Đủ 214 bộ thủ Khang Hy: số thứ tự, hình, nghĩa/tên có nguồn, số nét, biến thể, ví dụ, tìm kiếm, liên kết ngược tới Kanji. Gợi ý sớm nhóm bộ hữu ích; không bắt học hết 214 để học tiếp.
Theo dõi riêng từng chữ: có dữ liệu tra cứu / có nét / có học liệu-ví dụ / có luyện-ôn / có đánh giá. Nạp bản ghi không phải là đã dạy. Thư viện mở rộng phải hoàn thành nhưng không chặn việc học lõi.
Viết thật: mẫu động, tô theo, tự viết chuột/cảm ứng, hoàn tác, xóa, đối chiếu, lưu. Nhận dạng/chấm nét chỉ công bố khi thật sự có và kiểm đạt.
</kanji_and_radicals>

<grammar>
Hoàn thiện danh mục ngữ pháp N5/N4 có nguồn, đối chiếu Minna I/II; phân biệt mẫu chính / biến thể / cách dùng để không đếm trùng hay che thiếu.
Mỗi mẫu: chức năng và hoàn cảnh; cấu trúc và cách chia; giải thích Việt dễ hiểu; ví dụ, nghĩa Việt, audio; điểm dễ nhầm và lỗi người Việt; bài từ có hướng dẫn tới tự tạo câu; đáp án, lý do và cách trả lời hợp lệ khác; liên kết bài, giao tiếp, ôn. Rà ý nghĩa và cách dùng, không chỉ kiểm schema. Khi chữa, giữ ý người học; không đổi phủ định thành khẳng định rồi gọi là sửa đúng.
</grammar>

<learning_and_personalization>
Mỗi bài: đích đến → kiến thức nhỏ → ví dụ → hiểu → thử có hỗ trợ → tự dùng → phản hồi có lý do → tình huống mới → tổng kết → ôn.
"Học chắc" qua từng loại bằng chứng riêng: hiểu ngữ cảnh, phân biệt dễ nhầm, nhớ lại, nghe nhận ra, tự diễn đạt, kết hợp kiến thức cũ, dùng lại sau nghỉ. Xem bài, đúng sau gợi ý, hoàn thành một lần không tính là thành thạo. Không ép mọi mục đạt mọi hình thức cùng lúc; bù đúng phần yếu, không bắt học lại cả cấp.
Tách lộ trình chính / củng cố theo lỗi (lấy từ kết quả thật của tôi) / khám phá thêm. Cho đổi thời lượng, buổi ngắn có việc và điểm dừng thật, tiếp tục bài dở, quay lại sau nghỉ, học tự do. Bài mới dùng chọn lọc kiến thức trước, có nhiệm vụ tích lũy. Không chờ thuộc hoàn hảo kana mới được giao tiếp; hỗ trợ vừa đủ, romaji (nếu có) tùy chọn và giảm dần.
</learning_and_personalization>

<tools_and_navigation>
Công cụ mở trực tiếp, không giấu trong bài dài: Lộ trình, Từ vựng/Flashcard, Kanji/Viết, Bộ thủ, Ngữ pháp, Nghe, Đọc, Kaiwa, Viết, Ôn, Luyện thi, Tiến bộ. Dùng chung định danh, lịch sử, lịch ôn; theo dõi kỹ năng riêng, không gộp "nhận ra nghĩa" thành "nói được".
Nghe: transcript tùy chọn, tốc độ, lặp đoạn, câu hỏi. Đọc: furigana tùy chọn, tra/lưu từ, hiểu ý. Viết: tự kiểm, lịch sử viết lại. Ghi âm: chủ động lưu/xóa/xuất/nhập.
Hiển thị trạng thái kiểm nội dung (chưa kiểm / kiểm bằng mã / đối chiếu nguồn / AI review / chưa xác minh) ngay trên bài, từ, mẫu ngữ pháp.
</tools_and_navigation>

<kaiwa_and_jlpt>
Hai hồ sơ riêng trên nền kiến thức chung.
A. JLPT: độ phủ nhiệm vụ N5/N4 theo cấu trúc đã xác minh; bộ luyện tách bộ đánh giá; nhiều ngữ liệu mới, lời giải, điều kiện thời gian, phân tích phần yếu; không quy đổi % đúng thành điểm JLPT hay xác suất đỗ.
B. Giao tiếp: tình huống theo chặng (giới thiệu, đồ vật/địa điểm, mua hàng/ăn uống, lịch hẹn/đi lại, nhờ giúp/xin phép, quy định, kể việc, lý do, mong muốn, trải nghiệm, kế hoạch). Mỗi nhiệm vụ: vai/mục tiêu → nghe trước khi xem chữ → tự đáp → hỏi/phản hồi tiếp → đổi dữ kiện/ý định → giảm hỗ trợ → thử tình huống mới sau nghỉ; có xin nhắc lại, xác nhận, sửa hiểu nhầm.
Rubric: hoàn thành ý, nghe hiểu, tương tác, dễ hiểu, chính xác phù hợp, xử lý khi không hiểu, mức hỗ trợ. Tự đặt ngưỡng ban đầu (số tình huống mới tối thiểu và mức tối thiểu từng tiêu chí, có thử lại sau nghỉ) kèm lý do, ghi tạm thời để hiệu chỉnh, không gọi là chuẩn kaiwa N4 chính thức. Ưu tiên đúng ý/dễ hiểu rồi cải thiện tốc độ. Phân biệt tự kiểm / kiểm xác định / đánh giá độc lập; chưa chấm được lời nói thì ghi là tự kiểm.
</kaiwa_and_jlpt>

<ai_and_audio>
AI là yêu cầu thật: chat tiếng Việt theo bài, hỏi tiếp, giải thích lại, gợi ý trước đáp án, hỗ trợ đọc, chữa viết giữ ý, hội thoại văn bản; hội thoại giọng nói theo lượt khi công cụ và chất lượng đáp ứng. Phân biệt FAQ/nội dung nguồn / quy tắc / hội thoại hướng dẫn / AI sinh. Vài câu cố định không phải hội thoại AI linh hoạt; không đổi tên FAQ thành chatbot.
Máy: Windows, i5-1135G7, RAM 24 GB, Iris Xe. Kiểm runtime/mô hình hiện có (Ollama, Qwen3 đã có manifest; hiện dịch vụ không phản hồi) trước khi tải thêm; chọn theo tác vụ và tài nguyên, không thử hàng loạt.
Lỗi AI: xác định lỗi → thử ngữ cảnh/nguồn/công cụ/đầu ra có cấu trúc → kiểm lại ngữ nghĩa trên bộ mới (JSON đúng không chứng minh nghĩa đúng). Mô hình đã từng đổi câu đúng thành phủ định, nên bộ kiểm phải có câu đúng, câu sai, ngoài phạm vi, nhiều lượt, và chạy lặp ít nhất 3 lần. Giữ tập đánh giá riêng không dùng để tinh chỉnh. Tác vụ chưa đạt ghi rõ thiếu, giới hạn đúng mức. Không để thử AI chặn nội dung; AI tắt vẫn học được.
Audio: kiểm file/phát, cách đọc theo ngữ cảnh và ngữ âm riêng (số/giờ/ngày, trợ từ, từ đa âm, trường âm, âm ngắt). TTS phát được không đồng nghĩa chuẩn; ASR không phải chấm phát âm; không tự nhận nghe duyệt độc lập.
</ai_and_audio>

<evaluation_and_repair>
Vòng: ghi baseline → xây/sửa một phần hoàn chỉnh → đánh giá theo tiêu chí có trước → ghi lỗi cụ thể kèm bằng chứng → sửa có mục tiêu → kiểm lại và hồi quy cần thiết.
Bộ kiểm: ca cơ bản (tìm/học từ, flashcard, ngữ pháp, viết Kanji, nghe, lưu/reload); ca dễ sai (mở bài 10→3→25 không tự hoàn thành bài trước, buổi 10 phút chia việc thật, cùng từ dùng chung lịch ôn, đúng sau xem mẫu không thành "tự làm", phủ định không bị đổi nghĩa, nhiều cách nói đúng đều chấp nhận, backup cũ không mất dữ liệu, bài sau thật sự dùng kiến thức trước); ca giới hạn (AI tắt/timeout/hủy, thiếu audio/nét/căn cứ, bài nói chưa chấm được, nội dung chưa biên soạn).
Mã kiểm: schema, ID trùng, liên kết gãy, asset, so danh sách nguồn, lịch ôn, migration, backup. Trình duyệt kiểm tương tác. Nguồn và rà nội dung kiểm nghĩa, cách đọc, ví dụ, ngữ pháp, đáp án. Mã không xác nhận được cách đọc hay ngữ pháp đúng; phần đó ghi "chưa xác minh" hoặc đối chiếu nguồn cụ thể.
Tách lượt tạo và lượt rà (ngữ cảnh mới, chỉ nhận tiêu chí và nội dung cần rà); AI rà vẫn chỉ là "AI review", không phải người duyệt độc lập; tôi chưa có người duyệt, đừng giả định và đừng chờ.
Rà từng mục bổ sung; lấy mẫu ngẫu nhiên kết hợp mục rủi ro. Phát hiện lỗi lặp thì mở rộng kiểm nhóm ảnh hưởng và sửa nguyên nhân. Không dùng mẫu nhỏ để chứng nhận toàn kho.
Mỗi quy tắc phòng lỗi mới ghi DECISIONS.md (lỗi gốc → nguyên nhân → sửa gì → ca hồi quy → điều kiện xem lại); quy tắc chỉ chặn đúng tác vụ hẹp bị lỗi. Chỉ chạy lại kiểm liên quan và hồi quy cần thiết.
</evaluation_and_repair>

<acceptance_and_handoff>
Chỉ gọi hoàn thành toàn phạm vi khi: phạm vi tham chiếu có căn cứ và khoảng trống thiết yếu đã xử lý; nội dung N5/N4 có học liệu, luyện, ôn, đánh giá; công cụ chạy thật, dùng chung dữ liệu, backup bảo toàn; thư viện ≥2.500 Kanji và 214 bộ thủ hợp lệ, phân biệt tra cứu với đã dạy; AI báo đúng mức đã kiểm; mọi giới hạn học thuật/audio/thiết bị ghi đúng. Không lấy số bài, audio, test làm bằng chứng tôi sẽ đỗ hay giao tiếp tốt.
Bàn giao: 1) cách chạy; 2) bảng trước/sau: N5, phần mới N4, tích lũy loại trùng, Kanji mở rộng, bộ thủ, ngữ pháp; 3) độ phủ dữ liệu / học liệu / luyện / ôn / đánh giá; 4) kiểm thật / mock / chưa kiểm, lỗi đã sửa, tỷ lệ lỗi mẫu kiểm độc lập; 5) AI làm được gì; 6) phần chưa xác minh hoặc bị chặn, nguyên nhân, điểm tiếp tục; 7) nội dung trong REVIEW_QUEUE.md.

BẮT ĐẦU KIỂM TRA DỰ ÁN VÀ TRIỂN KHAI NGAY từ bước 0. Không chỉ trả lời xác nhận hay bản kế hoạch.
</acceptance_and_handoff>