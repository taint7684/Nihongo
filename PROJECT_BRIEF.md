> Làm rõ ngày 13/11/2026: dự án tiếng Nhật là Desktop\Nihongo-Compass. study-room là dự án phòng học riêng, không phải bản gốc của dự án tiếng Nhật. Không chỉnh sửa hoặc chuyển dữ liệu giữa hai dự án.

<mission>
Tiếp tục trực tiếp trong: C:\Users\LENOVO\Desktop\Nihongo-Compass

Hoàn thiện website cá nhân để tôi, người Việt mới hoàn toàn và cam kết học nghiêm túc, tự học từ số 0 đến N5 rồi N4 với:
- Nền kiến thức chắc.
- Nghe hiểu và dùng được kiến thức đã học.
- Giao tiếp sơ cấp tự tin hơn, phản hồi linh hoạt hơn.
- Sự chuẩn bị vững chắc để thi đỗ JLPT N4.

Website phải đủ làm tài liệu học duy nhất của tôi trong hành trình này: tôi không phải tìm sách, video, app hay giáo trình khác để bù kiến thức thiết yếu còn thiếu. Bạn được nghiên cứu nguồn ngoài khi xây dựng, nhưng trải nghiệm học cốt lõi (giải thích, ví dụ, audio, luyện tập, phản hồi, ôn, đánh giá) phải nằm ngay trong website.

Hãy kiểm tra dự án, nghiên cứu khoảng trống, lập kế hoạch rồi trực tiếp triển khai và kiểm chứng. Kết quả là sản phẩm hoạt động, không phải kế hoạch hay giao diện mẫu.

Đầu mỗi phiên: đọc lại file này (lưu là PROJECT_BRIEF.md trong dự án) và NEXT_STEPS.md trước khi làm.
</mission>

<priorities>
Khi có đánh đổi, theo thứ tự:
1. Bảo toàn dữ liệu, ngân sách, quyền riêng tư.
2. Kiến thức đúng, nền tảng chắc.
3. Hiểu và tự áp dụng được.
4. Nhớ và dùng lại sau thời gian.
5. Dễ dùng, tiết kiệm thời gian.
6. Mở rộng nội dung và tính năng.

Tôi không gấp. "Nhanh" nghĩa là bớt học thừa, đúng thứ tự, thực hành hiệu quả, bù đúng điểm yếu; không bỏ nền hay nhồi kiến thức.

Không hứa đỗ 100%, không bịa xác suất đỗ, thời gian nhanh nhất hay điểm kaiwa N4 chính thức (JLPT không có bài thi nói).

Luôn tách ba kết quả: (a) website/chương trình hoàn thiện đến đâu; (b) nội dung và công cụ đã được xác minh đến đâu; (c) năng lực của tôi đã thực sự được đo đến đâu. Hoàn thành phần mềm không chứng minh tôi đạt trình độ.

Cân bằng hai phía: thà ít mục đã kiểm hơn nhiều mục chưa kiểm, nhưng mục chưa làm phải hiện đúng trạng thái "chưa biên soạn". Quy tắc phòng lỗi chỉ chặn đúng tác vụ hẹp bị lỗi, vì đóng cả công cụ làm tôi mất phương tiện học trong khi lỗi chỉ ở một chỗ.
</priorities>

<constraints>
- Website responsive trước; chưa app native, cloud, đăng nhập hay dịch vụ nền.
- Ngân sách 0 đồng, gồm cả AI. Không Premium, API trả phí, thẻ, trial bắt buộc. Hết tài nguyên thì giới hạn hoặc tạm dừng tác vụ liên quan, không tự chuyển đường trả phí.
- Giữ bản gốc study-room, ID bài, tiến độ, backup. Đổi schema phải có migration, kiểm tra và cách khôi phục.
- QA dùng hồ sơ riêng; không sửa dữ liệu học thật, không tạo thành tích hay dữ liệu học giả của tôi.
- Mọi nội dung đã có mở tự do; tiên quyết chỉ là gợi ý; học bài 10 không tự hoàn thành bài 1–9. Phân biệt "chưa biên soạn" với "bị khóa".
- Dữ liệu riêng không tự gửi ra ngoài. Tính năng xử lý ngoài thiết bị (ví dụ nhận dạng giọng nói của trình duyệt có thể gửi âm thanh lên máy chủ) phải nói rõ nơi xử lý và do tôi chủ động bật.
</constraints>

<inspect_actual_project>
Máy: Windows 64-bit, i5-1135G7, RAM 24 GB, Intel Iris Xe. Kiểm tra phần mềm/mô hình đã có trước khi tải thêm.

Đọc mã, scripts, dữ liệu, trạng thái Git và README, COVERAGE, CONTENT_REVIEW, AUDIO_REVIEW, AI_QUALITY, VERIFICATION, NEXT_STEPS. Mở website và thao tác nếu môi trường cho phép. Tôi thấy web thiếu hoặc khó thấy Từ vựng, Flashcard, Kanji/viết, Ngữ pháp; hãy xác minh.

Xác định: chức năng chạy thật; có nhưng khó tìm; chỉ là giao diện/hướng dẫn; nội dung thiếu, sai, trùng hoặc vượt kiến thức tiên quyết; trở ngại với người mới tự học; phần tốt cần giữ.

Khi mâu thuẫn: yêu cầu hiện tại quyết định mục tiêu; mã, dữ liệu, phép thử quyết định trạng thái; nguồn chính thức quyết định thông tin về giáo trình, JLPT, giấy phép; báo cáo cũ chỉ là lịch sử. Nếu không truy cập được máy tôi, nêu giới hạn, làm phần có thể, chuẩn bị script cho bước bắt buộc, và không nhận đã kiểm thử trên máy tôi khi chưa làm.
</inspect_actual_project>

<research_and_curriculum>
Nghiên cứu chỉ để ra quyết định triển khai: Minna no Nihongo Sơ cấp I/II (phiên bản, phạm vi, trình tự); JLPT chính thức (cấp độ, cấu trúc, dạng nhiệm vụ); JF Standard/Can-do, Irodori; nhaikanji.com, phadaotiengnhat.com, Mazii, MochiKanji và các ảnh tham khảo tôi gửi.
Mỗi phát hiện: vấn đề của tôi → bằng chứng → quyết định áp dụng → cách kiểm tra. Phân biệt trực tiếp trải nghiệm / chỉ đọc giới thiệu / chưa xác minh; không truy cập được thì ghi giới hạn, không giả vờ đã khảo sát.

Chương trình: Nhập môn → nền N5 → ôn/đánh giá N5 → nền N4 → ôn/đánh giá N4. Bản đồ: mục tiêu sử dụng → kiến thức tiên quyết → bài → hoạt động → bằng chứng → ôn. Dùng Minna làm căn cứ tổ chức, không mặc định học hết sách là đủ; chủ động bổ sung chữ, âm, Kanji, nghe, nói, đọc, viết, kỹ năng làm bài.

JLPT không công bố danh sách từ/Kanji/ngữ pháp chính thức. Hãy lập "danh sách tham chiếu" có nguồn, phiên bản, giải thích lựa chọn; không gọi là danh mục chính thức.

Bản quyền: không sao chép giáo trình, đề, hình, audio khi chưa có quyền; "miễn phí" không đồng nghĩa được tái phân phối. Ưu tiên nội dung tự biên soạn hoặc dữ liệu mở có giấy phép rõ (ví dụ KanjiVG, KANJIDIC/JMdict, Tatoeba; kiểm giấy phép từng nguồn). Liên kết ngoài chỉ là bổ sung, không thay bài học thiết yếu. Mỗi tài nguyên giữ nguồn, quyền, phiên bản, trạng thái kiểm.
</research_and_curriculum>

<self_study_and_mastery>
Mỗi bài phải đủ để hiểu và làm mà không cần giáo viên.
Đầu bài: học để làm gì; kiến thức cần nắm; cuối bài tự nghe/đọc/nói/viết được việc gì; nhiệm vụ áp dụng.
Trong bài: ví dụ → giải thích tiếng Việt dễ hiểu → thử có hỗ trợ → tự dùng → phản hồi có lý do và cách tự sửa → tình huống mới. Có điểm dễ nhầm và lỗi người Việt hay mắc; giải thích thuật ngữ khi cần.
Cuối bài: kiến thức vừa học; việc đã thể hiện được với mức hỗ trợ nào; phần cần luyện hoặc chưa đủ dữ liệu; lịch ôn; bước tiếp theo.

"Học chắc" thể hiện bằng từng loại bằng chứng riêng: hiểu nghĩa/ngữ cảnh; phân biệt cách dễ nhầm; nhớ lại không nhìn mẫu; nghe nhận ra; tự diễn đạt; kết hợp kiến thức cũ; dùng lại sau khoảng nghỉ. Không ép mọi mục đạt mọi hình thức cùng lúc; cho học tiếp và bù đúng phần yếu, không bắt học lại cả cấp. Đúng sau khi xem mẫu hoặc kết quả cũ không tính là nhớ lâu.

Tách lộ trình chính / củng cố theo lỗi / khám phá thêm; giải thích nền thiết yếu nằm trong tuyến chính. Kết hợp chữ, âm và giao tiếp từ sớm với hỗ trợ vừa đủ; romaji nếu dùng thì tùy chọn và giảm dần; không bắt hoàn hảo kana mới được nói.
</self_study_and_mastery>

<learning_experience>
Hai cách dùng, chung nội dung, định danh kiến thức, lịch sử và lịch ôn:
A. Theo hướng dẫn: trang Hôm nay cho biết học gì, vì sao, khoảng bao lâu; buổi ngắn thật (chọn 10 phút phải ra phần việc vừa sức, không chỉ đổi nhãn); điểm dừng; tiếp tục bài dở; quay lại sau nghỉ.
B. Công cụ tự do, dễ thấy: Lộ trình, Từ vựng/Flashcard, Kanji/Luyện viết, Ngữ pháp, Nghe, Đọc, Kaiwa, Viết, Ôn, Luyện thi, Tiến bộ. Không giấu trong một trang bài dài; từ công cụ quay về bài gốc được.
Cùng một từ/kiến thức mở từ nhiều nơi dùng một lịch sử và một lịch ôn; theo dõi riêng từng loại kỹ năng (nhận ra nghĩa không bị gộp thành nói được).
Giao diện: sáng, hiện đại, chữ Việt/Nhật rõ, màu hài hòa, ít thao tác, có tìm kiếm, trạng thái tải/lỗi rõ, bàn phím và cảm ứng. Không quảng cáo, thanh toán, cộng đồng, xếp hạng.
Hiển thị trạng thái kiểm của nội dung ngay trên từng bài, từ, mẫu ngữ pháp (chưa kiểm / đã kiểm bằng mã / đã đối chiếu nguồn X / AI rà / chưa xác minh) để tôi biết chỗ cần thận trọng.
</learning_experience>

<functional_requirements>
1. Từ vựng: tìm/lọc theo bài/cấp/chủ đề; chữ, kana, nghĩa Việt theo ngữ cảnh, loại từ, audio từ, ví dụ, audio câu; hình khi hữu ích và có quyền; lưu từ khó, ghi chú, gõ nhớ, nghe chép, đặt câu.
2. Flashcard: theo bài và bộ cá nhân; hai chiều và nghe; nhớ trước khi lật; ôn cách quãng theo kết quả; phân biệt tự báo cáo với trả lời được kiểm tra.
3. Kanji: nghĩa, thành phần, thứ tự nét có nguồn, cách đọc trong từ, ví dụ/audio; tìm theo chữ/nghĩa/âm Hán Việt khi có dữ liệu. Vùng viết chuột/cảm ứng: mẫu động, tô theo, tự viết, hoàn tác/xóa, đối chiếu, lưu mục ôn. Phân biệt viết tự do, chấm nét, nhận dạng chữ; chỉ công bố khả năng thật. Không bắt thuộc mọi âm đọc hay viết đẹp mới học tiếp.
4. Ngữ pháp: thư viện theo bài/cấp/chức năng; nghĩa, cấu trúc, cách chia, ví dụ/audio, mẫu dễ nhầm, bài áp dụng có giải thích, liên kết tới nhiệm vụ sử dụng.
5. Nghe/Đọc: ngữ liệu tăng dần, kiểm soát kiến thức; transcript và furigana tùy chọn; tốc độ, lặp đoạn; tra và lưu từ tại chỗ; câu hỏi lấy thông tin và hiểu ý, không chỉ dịch từng câu.
6. Viết: từ câu đến đoạn ngắn; tự kiểm; phản hồi giữ ý; lưu phiên bản viết lại; chấp nhận nhiều cách diễn đạt đúng.
7. Ôn: lỗi dẫn tới hoạt động bù, nhớ lại, vận dụng; có ngữ liệu mới đo cùng mục tiêu.
8. Luyện thi: ngân hàng luyện và đánh giá tách nhau; nhiều bộ mới; điều kiện thời gian; phân tích phần yếu và xu hướng theo từng phần.
</functional_requirements>

<kaiwa_and_progress>
Tình huống tăng dần: giới thiệu, đồ vật/địa điểm, mua hàng/ăn uống, lịch hẹn/đi lại, nhờ giúp/xin phép, quy định, kể việc, lý do, mong muốn, trải nghiệm, kế hoạch.
Mỗi nhiệm vụ: vai/mục tiêu → nghe câu hỏi trước khi xem chữ → tự trả lời → phản hồi tiếp/hỏi lại → đổi dữ kiện → giảm hỗ trợ → thử tình huống mới sau nghỉ. Dạy xin nhắc lại, nói chậm hơn, xác nhận, sửa hiểu nhầm. Bài sau dùng chọn lọc kiến thức trước, có nhiệm vụ tích lũy, không chỉ đổi tên cùng kịch bản. Ưu tiên đúng ý và dễ hiểu rồi giảm thời gian chuẩn bị; tốc độ không là tiêu chí duy nhất. Hỗ trợ ghi âm, nghe lại, chủ động lưu/xóa, so sánh giữa các buổi.

Hai hồ sơ đánh giá riêng:
A. JLPT: kiến thức, đọc, nghe, độ phủ, kết quả mới, xu hướng từng phần; kết quả tổng không che phần yếu quan trọng; không quy đổi tỷ lệ đúng thành điểm thi hay xác suất đỗ.
B. Giao tiếp: hoàn thành mục đích, nghe hiểu, đáp/hỏi tiếp, dễ hiểu, chính xác phù hợp, xử lý khi không hiểu, mức hỗ trợ.

Ngưỡng giao tiếp: sau nghiên cứu, hãy đề xuất cho tôi duyệt (kèm lý do) số tình huống mới tối thiểu và mức tối thiểu từng tiêu chí để coi là "đạt" ở mỗi nhóm tình huống N5 và N4, có thử lại sau khoảng nghỉ. Ghi rõ đây là thang tạm thời của chương trình, hiệu chỉnh được, không phải chuẩn kaiwa N4 chính thức, không gán cứng N4 với một mức CEFR.
Báo "làm được việc gì, trong điều kiện nào". Phân biệt tự báo cáo / kiểm tra xác định / đánh giá độc lập. Chưa chấm được lời nói thì ghi đúng là tự kiểm. Đọc theo mẫu hoặc chọn câu có sẵn không được coi là tự giao tiếp.
</kaiwa_and_progress>

<ai_requirement>
AI là yêu cầu sản phẩm thật, không chỉ biểu tượng chat. Tôi muốn: hỏi bằng tiếng Việt về bài đang học; được giải thích lại ngắn/dễ hơn kèm ví dụ đúng trình độ; hỏi tiếp; gợi ý từng bước trước đáp án; phân tích câu, phân biệt mẫu dễ nhầm; góp ý bài viết giữ nguyên ý; hội thoại chữ; hội thoại giọng nói theo lượt khi phần cứng và chất lượng đáp ứng.

Phân biệt hai mức: (1) hội thoại hướng dẫn có nội dung kiểm soát; (2) hội thoại AI tiếp nhận câu người học tự tạo và phản hồi phù hợp. Mức 1 hữu ích nhưng không được coi là đã xong mức 2. Không đổi tên FAQ thành chatbot để coi hoàn thành.

Kiểm tra runtime, mô hình, lỗi benchmark cũ trước khi chọn; chọn công cụ theo từng tác vụ. Trước khi đóng một tác vụ AI vì chất lượng yếu: phân tích lỗi cụ thể; thử giới hạn phạm vi, cung cấp ngữ cảnh/nguồn, đầu ra có cấu trúc hoặc công cụ kiểm; so sánh ứng viên phù hợp tài nguyên; đo chất lượng, độ trễ, bộ nhớ. Chỉ mở phạm vi đạt tiêu chí đã đặt; chưa đạt thì báo rõ khoảng cách, giữ chế độ hướng dẫn, làm tiếp phần khác.

AI phải biết khi thiếu căn cứ, không tự sửa điểm/đáp án chuẩn/tiên quyết, không bịa nguồn. Dữ liệu xác định do mã hoặc kho nội dung xử lý. Có trạng thái đang xử lý, hủy, timeout, lỗi dễ hiểu. AI tắt không chặn nội dung học cốt lõi.
Giọng nói: ASR → tôi kiểm tra bản chép khi cần → phản hồi → TTS. Phân biệt lỗi nhận dạng với lỗi tiếng Nhật; ASR không phải chấm phát âm.
</ai_requirement>

<capabilities_and_quality>
Chỉ dẫn không tạo ra năng lực: mỗi yêu cầu phải có dữ liệu, công cụ, logic thực thi tương ứng (nét Kanji: dữ liệu nét có quyền + canvas; ôn: thuật toán có tài liệu như SM-2/FSRS + lịch sử thật; chấm đáp án xác định: mã; audio: nguồn/bộ tạo tiếng Nhật + quy trình kiểm; giải thích AI: ngữ cảnh có nguồn + bộ đánh giá).
Audio kiểm riêng về file/phát, cách đọc theo ngữ cảnh (số/giờ/ngày, trợ từ, từ đa âm) và ngữ âm. TTS phát được không đồng nghĩa phát âm chuẩn; chưa kiểm không dùng làm chuẩn chấm.

Nhãn xác minh, dùng đúng nghĩa: đã kiểm bằng mã / đã đối chiếu nguồn cụ thể / đã được AI rà riêng / đã có người đủ năng lực duyệt độc lập / chưa xác minh. Một agent hay mô hình khác rà lại chỉ là "AI review", không phải duyệt học thuật độc lập. Tôi chưa có người duyệt; đừng giả định có. Chủ động đối chiếu và sửa lỗi; phần chưa xác minh ghi đúng giới hạn; không dùng cảnh báo chung thay cho khắc phục lỗi đã biết.
</capabilities_and_quality>

<data_contracts>
Định nghĩa hoặc hoàn thiện schema (mở rộng cái hiện có, tránh thiết kế lại toàn bộ) cho: bài, kiến thức, từ, Kanji, ngữ pháp, ví dụ, audio, nhiệm vụ giao tiếp, hoạt động đánh giá, mục ôn, bằng chứng học; có ID ổn định, liên kết, nguồn/quyền/phiên bản, trạng thái kiểm.
Viết bộ kiểm tra tự động: schema, ID trùng, liên kết gãy, file asset tồn tại, trường bắt buộc, đáp án, migration và khôi phục backup. Tách kiểm cú pháp/cấu trúc khỏi xác minh ý nghĩa; không tuyên bố mã đã xác nhận cách đọc, furigana hay ngữ pháp đúng nếu chỉ kiểm được định dạng hoặc so khớp một danh sách.
</data_contracts>

<evaluation_first>
Trước khi sửa lớn, tạo kết quả nền và bộ kiểm tra, lưu vào file trong dự án.
Mỗi ca: ID yêu cầu | điều kiện | thao tác | kết quả mong đợi | phương pháp kiểm | bằng chứng | đạt / chưa đạt / chưa kiểm tra.
A. Cơ bản (phải luôn đạt): tìm bài/từ/ngữ pháp/Kanji; nghe; viết nét; flashcard; làm bài; lưu; dừng/reload/tiếp tục.
B. Dễ sai: hồ sơ mới mở bài 10→3→25 không tự hoàn thành bài trước; buổi 10 phút chia việc thật; cùng từ dùng chung lịch sử; đúng sau xem mẫu không thành "tự làm"; câu phủ định không bị sửa đổi nghĩa; câu vốn đúng và nhiều cách nói đúng đều được chấp nhận; backup cũ không mất dữ liệu; bài sau thật sự dùng lại kiến thức trước; AI hiểu một câu tự tạo trong phạm vi, không chỉ nhận từ khóa kịch bản.
C. Giới hạn: AI tắt/timeout/hủy; thiếu audio hoặc nét; câu hỏi thiếu nguồn thì nói rõ thay vì bịa; bài nói chưa chấm được thì không tạo phản hồi giả; nội dung chưa có hiển thị đúng trạng thái.
Dùng mã cho quy tắc xác định, trình duyệt cho tương tác, nguồn và rà nội dung cho học thuật. Ca có AI: chạy lặp (ít nhất 3 lần) vì kết quả dao động, gồm câu đúng, sai, ngoài phạm vi, nhiều lượt. Giữ một tập đánh giá riêng không dùng để sửa từng câu trả lời, tránh tối ưu cho vừa bộ test đã biết.
</evaluation_first>

<build_evaluate_repair>
Làm theo nhóm mục tiêu, mỗi nhóm một vòng:
1. XÂY/SỬA một phần hoạt động hoàn chỉnh, gắn mã yêu cầu.
2. ĐÁNH GIÁ bằng ca liên quan, script kiểm tra và một lượt rà nội dung tách khỏi lượt tạo (ngữ cảnh mới, chỉ nhận tiêu chí và nội dung cần rà); ghi vi phạm cụ thể kèm bằng chứng; so với kết quả nền. Nhãn "AI review".
3. SỬA CÓ MỤC TIÊU các vi phạm đã báo, chạy lại ca liên quan và hồi quy.
Không cần hệ nhiều agent nếu chưa có lợi ích rõ.
Mỗi thay đổi phòng lỗi quan trọng ghi vào DECISIONS.md: lỗi gốc → nguyên nhân → sửa gì → ca hồi quy → điều kiện xem xét lại. Định kỳ rà quy tắc cũ có gây né tránh quá mức không. Vòng sửa không cải thiện thì đổi cách/công cụ hoặc ghi blocker cụ thể và làm tiếp phần độc lập; không lặp vô hạn.
Commit hoặc backup sau mỗi nhóm đã qua kiểm tra.
</build_evaluate_repair>

<execution_order>
1. Xác minh dự án và baseline.
2. Chốt phạm vi N5/N4, danh sách tham chiếu, ngưỡng giao tiếp (đề xuất để tôi duyệt), tiêu chí nghiệm thu.
3. Sửa điều hướng; hoàn thiện Từ vựng/Flashcard, Kanji/Viết, Ngữ pháp.
4. Kết nối vòng học; hoàn thiện và củng cố N5.
5. Đánh giá AI song song trong phạm vi tài nguyên, không chặn khóa học.
6. Mở rộng N4 cùng chuẩn.
7. Hoàn thiện đánh giá, tiến bộ, hồi quy.

Chủ động làm lựa chọn kỹ thuật thông thường; chỉ hỏi khi thiếu thông tin thật sự chặn việc hoặc có thao tác phá hủy ngoài phạm vi. Tiếp tục trong khả năng phiên; mỗi nhóm phải qua kiểm tra rồi mới sang nhóm khác, và cập nhật NEXT_STEPS (đã làm / chưa làm / điểm tiếp tục chính xác) ngay sau mỗi nhóm đã kiểm, không chờ chạm giới hạn. Không dừng ở bản kế hoạch hay bài mẫu; không âm thầm giảm mục tiêu thành demo.
</execution_order>

<completion_and_handoff>
Tiêu chí hoàn thành:
- Chương trình xuyên 0→N5→N4 theo bản đồ tham chiếu đã giải thích.
- Không có kiến thức thiết yếu chỉ ghi "tự tìm tài liệu ngoài".
- Công cụ và hoạt động chạy thật, dùng chung tiến độ.
- Có nhiệm vụ tích lũy và đánh giá riêng JLPT/giao tiếp.
- AI đạt đến phạm vi đã kiểm và được công bố trung thực.
- Backup/migration hoạt động; phần học vẫn chạy khi AI lỗi.
- Độ phủ đo được: mỗi cấp báo số mục (từ, Kanji, ngữ pháp, nhiệm vụ giao tiếp) có đủ bài học + luyện tập + đánh giá + lịch ôn, trên tổng số mục trong danh sách tham chiếu; mục chưa đủ hiện "chưa biên soạn". Bảng phản ánh nội dung thật, không chỉ tiêu đề.
Chưa đủ nội dung thiết yếu thì không gọi chương trình là sẵn sàng làm nguồn học duy nhất; có thể bàn giao từng phần đã dùng được và giữ mục tiêu tổng thể.

Tài liệu tối thiểu trong dự án: kế hoạch và ma trận yêu cầu→triển khai→kiểm tra; bản đồ chương trình và độ phủ; nguồn/giấy phép; hồ sơ kiểm nội dung/audio/AI; DECISIONS.md; hướng dẫn chạy/backup; NEXT_STEPS.

Báo cáo cuối:
1. Đã triển khai và cách dùng.
2. Phạm vi nội dung thật N5/N4.
3. Kiểm tra đã chạy: thật / mock / chưa chạy.
4. AI làm được và chưa làm được gì.
5. Giới hạn học thuật, audio, đánh giá.
6. Phần thiếu, blocker, điểm tiếp tục.
Không dùng số bài, audio hay test để tự chứng minh tôi sẽ đỗ hoặc giao tiếp tốt.

Bắt đầu bằng kiểm tra dự án và baseline, sau đó trực tiếp triển khai.
</completion_and_handoff>