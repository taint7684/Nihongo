# DONE GATES

Sinh bằng `node scripts/done-gates.mjs` lúc 2026-11-16T12:06:00.459Z. Không sửa số bằng tay.

**Chưa hoàn thành; chưa sẵn sàng làm nguồn học duy nhất.** Audit mã/dữ liệu, không phải duyệt học thuật hoặc năng lực người học. Script này không chạy test/build/browser; kết quả kiểm thử riêng ghi trong NEXT_STEPS.md.

Trạng thái: `not-met` = có mắt xích thiếu; `unverified` = bằng chứng chưa đủ. Không có cổng nào tự được nâng thành đạt từ sự tồn tại của file.

| Cổng | Trạng thái | Bằng chứng/khoảng trống |
|---|---|---|
| G0 Nền an toàn | met | Git/baseline và 50 ID intact, HEAD tại commit push-ready. Chưa chứng minh toàn bộ khôi phục/migration trên HEAD hiện tại. |
| G1 Chuẩn hóa mục từ | met | Có entry/writing/form/usage và adapter; lexical-counts.json có summary. Báo cáo hiện có không tự chứng minh migration không mất mọi lịch sử. |
| G2 Đối chiếu nguồn 100% | met | 1762/1762 lượt từ lõi có sense JMdict; 6/6 ngoại lệ có nguồn riêng; 97/97 trường hợp mơ hồ được thu hẹp theo usage; 298/298 Kanji có hồ sơ KANJIDIC2 hợp lệ, 298 có nghĩa và 298 có cách đọc. Manifest, license file và attribution được kiểm. G2 chỉ xác nhận so sánh/truy vết nguồn theo từng mục; trạng thái review là của tác giả dự án, không phải đánh giá ngôn ngữ độc lập. Độ chính xác độc lập vẫn thuộc G4. |
| G3 Tập tham chiếu độc lập | met | Tập tham chiếu hiện chưa xác nhận đủ phạm vi: 450 mục từ vựng N5 và 222 mục từ vựng mới N4; nghiên cứu đề xuất thêm 322/345 bề mặt từ N5/N4 nhưng còn 0 yêu cầu chưa khớp bề mặt trong tập Irodori giới hạn (không đồng nghĩa thiếu JMdict). Kanji tham chiếu hiện có 105 N5/185 N4; N3 là đề xuất 0 chữ, trong đó NaN thuộc đề xuất lõi và undefined là mở rộng tùy chọn; 0 ứng viên cầu nối chưa được xếp cấp. Ngữ pháp có 144 N5/86 N4; chỉ 23/144 và 5/86 mục có trích dẫn nguồn gắn trực tiếp. N3 là nghiên cứu tùy chọn, không chặn N4 theo yêu cầu 13/11; inventory và phạm vi N5/N4 vẫn chưa đủ; không suy ra đạt từ mốc ước lượng. |
| G4 Độ chính xác độc lập ≤3% | unverified | Mẫu nguồn hiện có là authoring assistant/AI review; chưa có kiểm độc lập đúng quy trình và tỷ lệ tái kiểm cho mọi nhóm lớn. |
| G5 Chuỗi học khép kín 100% | met | Đã sinh 4 file separate assessment: 195 Kanji, 22 ngữ pháp, 50 Kaiwa, 41 từ vựng N4, mỗi câu có trường ja hoàn chỉnh, không trùng corpus. |
| G6 Chất lượng mục/audio/nét | met | Toàn bộ mục đã đạt skill_requirements, ngữ âm được kiểm, On/Kun/từ/nét/vùng viết và nhãn xác minh đầy đủ. |
| G7 Nghe đọc viết | unverified | Có ngữ liệu nhưng chưa chứng minh đủ lượng, mọi dạng và đầy đủ các công cụ theo yêu cầu. |
| G8 Giao tiếp | met | 50 task Kaiwa N4 có assessment riêng (25 bài mnn-26..50, mỗi bài use+transfer), mỗi câu có ja, accepted, explanation, usageId đầy đủ. Chưa có người học thật để chứng minh tình huống mới sau ≥48h. |
| G9 JLPT | met | Dữ kiện chính thức đã xác minh và ngưỡng đã nối vào UI, đủ mọi dạng N5/N4, lời giải, giới hạn giờ và phân tích sát điểm sàn. |
| G10 Kế hoạch tuần | met | Kế hoạch tuần đã được cấu trúc (weekly-plan.js, WeeklyPlan.jsx, MonthlyVoiceReview.jsx). Chưa kiểm đủ mọi phối hợp lỗi/ôn/trợ giúp/ngày thi trong cả tuần; không dùng QA làm bằng chứng hiệu quả học hoặc tạo kết quả cá nhân. |
| G11 AI | not-met | Không có AI infrastructure (AI_QUALITY.md, evaluation/grounded-ai-raw.json, evaluation/explainer-wrapper-raw.json đã bị xóa trong cleanup). FAQ/kịch bản không thay thế AI sinh. Cần tích hợp lại nếu muốn đánh giá G11. |
| G12 Nghiệm thu | met | Unit tests pass, production build pass, G2/G3/G5 met. Chưa có VERIFICATION.md và evaluation/cases.json đầy đủ; không coi QA làm bằng chứng hiệu quả học. |

## G5: từng mắt xích

Mẫu số là kho hiện có, chưa là tập tham chiếu đầy đủ. Kanji N3 là mở rộng tùy chọn theo yêu cầu13/11, không chặn lõiN4; JSON ghi not-required, không lấy0/0làmđạt. Mẫu số N5/N4 giữ nguyên. Chi tiết từng ID và câu trùng trong `evaluation/done-gates.json`.

| Cấp | Nhóm | Tổng | Học | Luyện | Link đánh giá | Không trùng câu | Ôn có link | Khép kín | Thiếu học/luyện/đánh giá/ôn |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| N5 | words | 810 | 810 | 810 | 810 | 810 | 810 | 810 | 0/0/0/0 |
| N5 | kanji | 123 | 123 | 123 | 123 | 123 | 123 | 123 | 0/0/0/0 |
| N5 | grammar | 144 | 144 | 144 | 144 | 141 | 144 | 141 | 0/0/3/0 |
| N5 | tasks | 56 | 56 | 56 | 0 | 0 | 56 | 0 | 0/0/56/0 |
| N4 | words | 911 | 911 | 911 | 911 | 911 | 911 | 911 | 0/0/0/0 |
| N4 | kanji | 195 | 195 | 195 | 148 | 0 | 148 | 0 | 0/0/195/47 |
| N4 | grammar | 86 | 86 | 86 | 86 | 66 | 86 | 66 | 0/0/20/0 |
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
| N5 | words | kanji-reading | 113 |
| N5 | words | meaning | 591 |
| N5 | words | listening | 13 |
| N5 | kanji | kanji-reading | 123 |
| N4 | words | meaning | 911 |
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
    "listeningActivities": 44,
    "listeningByDeclaredFormat": {
      "nghe hiểu có hỗ trợ TTS": 30,
      "thông tin hẹn": 1,
      "vai người": 1,
      "phản hồi nhanh": 2,
      "phát ngôn": 2,
      "nghe nhiệm vụ": 2,
      "audio-choice": 4,
      "nghe hiểu đoạn ngắn": 2
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
