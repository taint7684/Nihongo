# DONE GATES

Sinh bằng `node scripts/done-gates.mjs` lúc 2026-11-14T01:49:29.146Z. Không sửa số bằng tay.

**Chưa hoàn thành; chưa sẵn sàng làm nguồn học duy nhất.** Audit mã/dữ liệu, không phải duyệt học thuật hoặc năng lực người học. Script này không chạy test/build/browser; kết quả kiểm thử riêng ghi trong NEXT_STEPS.md.

Trạng thái: `not-met` = có mắt xích thiếu; `unverified` = bằng chứng chưa đủ. Không có cổng nào tự được nâng thành đạt từ sự tồn tại của file.

| Cổng | Trạng thái | Bằng chứng/khoảng trống |
|---|---|---|
| G0 Nền an toàn | unverified | Git/baseline và 50 ID có bằng chứng; QA hiện hữu không được coi là đã chạy mới. Chưa chứng minh toàn bộ khôi phục/migration trên HEAD hiện tại. |
| G1 Chuẩn hóa mục từ | unverified | Có entry/writing/form/usage và adapter; báo cáo hiện có không tự chứng minh migration không mất mọi lịch sử. |
| G2 Đối chiếu nguồn 100% | met | 1339/1339 lượt từ lõi có sense JMdict; 6/6 ngoại lệ có nguồn riêng; 90/90 trường hợp mơ hồ được thu hẹp theo usage; 298/298 Kanji có hồ sơ KANJIDIC2 hợp lệ, 298 có nghĩa và 298 có cách đọc. Manifest, license file và attribution được kiểm. G2 chỉ xác nhận so sánh/truy vết nguồn theo từng mục; trạng thái review là của tác giả dự án, không phải đánh giá ngôn ngữ độc lập. Độ chính xác độc lập vẫn thuộc G4. |
| G3 Tập tham chiếu độc lập | not-met | Tập tham chiếu hiện chưa xác nhận đủ phạm vi: 450 mục từ vựng N5 và 222 mục từ vựng mới N4; nghiên cứu đề xuất thêm 322/345 bề mặt từ N5/N4 nhưng còn 19 yêu cầu chưa khớp bề mặt trong tập Irodori giới hạn (không đồng nghĩa thiếu JMdict). Kanji tham chiếu hiện có 105 N5/185 N4; N3 là đề xuất 399 chữ, trong đó 295 thuộc đề xuất lõi và 104 là mở rộng tùy chọn; 227 ứng viên cầu nối chưa được xếp cấp. Ngữ pháp có 144 N5/86 N4; chỉ 23/144 và 5/86 mục có trích dẫn nguồn gắn trực tiếp. N3 là nghiên cứu tùy chọn, không chặn N4 theo yêu cầu 13/11; inventory và phạm vi N5/N4 vẫn chưa đủ; không suy ra đạt từ mốc ước lượng. |
| G4 Độ chính xác độc lập ≤3% | unverified | Mẫu nguồn hiện có là authoring assistant/AI review; chưa có kiểm độc lập đúng quy trình và tỷ lệ tái kiểm cho mọi nhóm lớn. |
| G5 Chuỗi học khép kín 100% | not-met | Chưa đủ assessment riêng, liên kết ôn và mẫu số tham chiếu. Kiểm trùng câu chỉ là kiểm mã, không xác minh độ khó/ngữ nghĩa. |
| G6 Chất lượng mục/audio/nét | not-met | Chưa có bằng chứng toàn bộ mục đạt mọi skill_requirements, ngữ âm được kiểm, On/Kun/từ/nét/vùng viết và nhãn xác minh đầy đủ. |
| G7 Nghe đọc viết | unverified | Có ngữ liệu nhưng chưa chứng minh đủ lượng, mọi dạng và đầy đủ các công cụ theo yêu cầu. |
| G8 Giao tiếp | not-met | Task/variant có thật; không có assessment riêng theo từng task, rubric đầy đủ và chứng minh tình huống mới sau ≥48h cho N5/N4. |
| G9 JLPT | not-met | Dữ kiện chính thức được xác minh và ngưỡng đã nối vào UI, nhưng ngân hàng chưa chứng minh đủ mọi dạng N5/N4, nhiều ngữ liệu mới, lời giải, giới hạn giờ và phân tích sát điểm sàn. |
| G10 Kế hoạch tuần | unverified | Kế hoạch tuần đã được kiểm trên hồ sơ QA riêng; đối chiếu ghi âm kiểm bằng Blob TTS tổng hợp. Chưa kiểm đủ mọi phối hợp lỗi/ôn/trợ giúp/ngày thi trong cả tuần; không dùng QA làm bằng chứng hiệu quả học hoặc tạo kết quả cá nhân. |
| G11 AI | not-met | Tác vụ AI tương tác rộng chưa đạt bộ ngữ nghĩa mới ≥3 lần và held-out; FAQ/kịch bản không thay thế. |
| G12 Nghiệm thu | unverified | Unit tests, production build, open-access and targeted learning-flow browser QA are recorded separately and pass in isolated QA; the complete content and acceptance scope is not fully verified. |

## G5: từng mắt xích

Mẫu số là kho hiện có, chưa là tập tham chiếu đầy đủ. Kanji N3 là mở rộng tùy chọn theo yêu cầu13/11, không chặn lõiN4; JSON ghi not-required, không lấy0/0làmđạt. Mẫu số N5/N4 giữ nguyên. Chi tiết từng ID và câu trùng trong `evaluation/done-gates.json`.

| Cấp | Nhóm | Tổng | Học | Luyện | Link đánh giá | Không trùng câu | Ôn có link | Khép kín | Thiếu học/luyện/đánh giá/ôn |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| N5 | words | 806 | 806 | 806 | 225 | 225 | 224 | 224 | 0/0/581/582 |
| N5 | kanji | 123 | 123 | 123 | 20 | 20 | 20 | 20 | 0/0/103/103 |
| N5 | grammar | 144 | 144 | 144 | 86 | 81 | 144 | 81 | 0/0/63/0 |
| N5 | tasks | 56 | 56 | 56 | 0 | 0 | 56 | 0 | 0/0/56/0 |
| N4 | words | 512 | 512 | 512 | 399 | 251 | 399 | 251 | 0/0/261/113 |
| N4 | kanji | 195 | 195 | 195 | 110 | 0 | 110 | 0 | 0/0/195/85 |
| N4 | grammar | 86 | 86 | 86 | 74 | 56 | 86 | 56 | 0/0/30/0 |
| N4 | tasks | 50 | 50 | 50 | 0 | 0 | 50 | 0 | 0/0/50/0 |
| N3 | words | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0/0/0/0 |
| N3 | kanji | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0/0/0/0 |
| N3 | grammar | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0/0/0/0 |
| N3 | tasks | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0/0/0/0 |

## G5: loại bằng chứng đánh giá

Bảng dưới đếm khoá học có ít nhất một đánh giá không trùng theo loại; các loại không tương đương và không chứng minh mọi năng lực của mục từ/Kanji. Chi tiết từng câu và phạm vi nằm trong `evaluation/done-gates.json`.

| Cấp | Nhóm | Loại đánh giá | Mục có bằng chứng |
|---|---|---|---:|
| N5 | words | từ theo ngữ cảnh | 211 |
| N5 | words | kanji-reading | 16 |
| N5 | kanji | kanji-reading | 20 |
| N4 | words | meaning | 251 |
| N4 | words | listening | 20 |

## Định nghĩa và giới hạn

lesson + real linked practice + explicit existing assessment ID + no normalized whole-prompt/Japanese-sentence overlap with training + common item review link; word/kanji require sentence context, not repeated target reading; for words/kanji this is a path-level count requiring at least one assessment mode, not complete skill coverage or mastery. Assessment evidence kinds and item scopes are reported separately.

Exact normalized text comparison catches duplicates, not paraphrase or semantic leakage; no-text assessment unverified. A different assessment flag/ID alone is insufficient.

Existing deduplicated surface inventory; only curated 私/わたし alias merged. Not a complete independent N5/N4/N3 target list.

Explicit q.wordKey + valid usageId is exercised via recordAnswer?checkedWord on isolated in-memory states for both correct/incorrect answers; successful scheduling counts as common word review. Generic capability alone remains unverified. Kanji reading link via an explicitly linked lesson word does not prove writing assessment.

## Kiểm số 0 / matcher

- The Kanji matcher previously recognized k.wordKey or the literal prefix wordKey+"?" only. Real lesson data such as 学 with inWord "学生（がくせい）" was missed; the replacement strips the parenthetical reading and requires exact whole-word equality. Regression cases cover that real form and reject substring matches.
- Old word/kanji zeros were partly counter omissions: explicit assessment questions within ordinary lessons and wordKey/usageId schedules now counted. Bare reading checks still do not establish separate new sentence material. Task IDs still lack explicit assessment links.
- Kanji library lookup is not teaching. Kanji practice counts now require a real word-reading link or a valid licensed KanjiVG stroke asset served by the self-practice tool; these modes are reported separately.
- Lessons have no assessment boolean, but individual questions do. Both assessment lesson IDs and explicitly flagged questions are inspected; flags alone never establish separation.
- Published structural counts are not a G5 pass: exact sentence deduplication is not semantic review and learner ability is not measured.

## G7 số ngữ liệu hiện có

```json
{
  "N5": {
    "readingPassages": 56,
    "listeningActivities": 42,
    "listeningByDeclaredFormat": {
      "nghe hiểu có hỗ trợ TTS": 30,
      "thông tin hẹn": 1,
      "vai người": 1,
      "phản hồi nhanh": 2,
      "phát ngôn": 2,
      "nghe nhiệm vụ": 2,
      "audio-choice": 4
    },
    "readingByDeclaredFormat": {
      "unspecified": 31,
      "short-original-scenario": 25
    },
    "writingPrompts": 59
  },
  "N4": {
    "readingPassages": 26,
    "listeningActivities": 41,
    "listeningByDeclaredFormat": {
      "unspecified": 41
    },
    "readingByDeclaredFormat": {
      "unspecified": 26
    },
    "writingPrompts": 26
  },
  "N3": {
    "readingPassages": 0,
    "listeningActivities": 0,
    "listeningByDeclaredFormat": {},
    "readingByDeclaredFormat": {},
    "writingPrompts": 0
  }
}
```

Danh sách bằng chứng, hash, Git HEAD và QA cũ có trong JSON. Script chỉ ghi hai báo cáo này; không đọc localStorage/profile học thật, không chạy UI, không commit.
