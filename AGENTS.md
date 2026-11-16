# AGENTS.md — Hướng dẫn cho AI agent tiếp tục làm việc

## 1. Dự án là gì

**Nihongo-Compass** — Website tự học tiếng Nhật 0→N5→N4 (JLPT N4 prep), giao diện tiếng Việt, chạy **cục bộ (local-only)**, chi phí 0 đồng, không dùng AI trả phí.

- Stack: React 18 + Vite, plain JS (không TypeScript), Vitest test
- Port dev: **5175** (`npm run dev`)
- Build: `npm run build` → `dist/`
- Test: `npx vitest run src`
- Git remote: `origin https://github.com/taint7684/Nihongo.git` (branch `master`)

## 2. Cách chạy

```
cd C:\Users\LENOVO\Desktop\Nihongo-Compass
npm install
npm run dev          # http://localhost:5175
npm run build        # build static vào dist/
npx vitest run src   # chạy test
```

## 3. Cấu trúc thư mục quan trọng

| Thư mục | Mô tả |
|---------|-------|
| `src/` | Source code chính: course content, assessments, components |
| `src/mnn-course.js` | File tổng hợp unité bài học (N1-N25 N5, N26+ N4), inject separate assessments |
| `src/n4-kanji-r1-plan.js` | Kế hoạch Kanji N4 (195 chữ) |
| `src/n4-kanji-separate-assessment.js` | Assessment riêng Kanji N4 |
| `src/n4-grammar-separate-assessment.js` | Assessment riêng ngữ pháp N4 |
| `src/n4-kaiwa-separate-assessment.js` | Assessment riêng Kaiwa N4 |
| `src/n4-vocab-separate-assessment-41.js` | Assessment riêng từ vựng N4 (lot 41+) |
| `src/n4-vocabulary-batch-01..08.js` | Batches từ vựng N4 |
| `src/n5-vocabulary-batch-01..04.js` | Batches từ vựng N5 |
| `src/communication-content.js` | Nội dung Kaiwa (106 task) |
| `src/assessment-links.js` | Liên kết assessment ngữ pháp |
| `public/` | Asset tĩnh: dictionaries, audio, knowledge-coverage.json |
| `scripts/` | Script sinh dữ liệu, audit, done-gates |
| `evaluation/` | Báo cáo gate, JLPT verification |
| `.gitignore` | Loại trừ node_modules, dist, .tmp-ui, generated data, audio tts |

## 4. Trạng thái hiện tại (2026-11-16)

- **Tất cả commit đã push** lên origin/master: `a922fb1`, `30ba052`
- **Từ vựng N4 tích lũy**: 1514 lexeme (≥1500 đã đạt)
- **Kanji N4**: 195/195 có trong kế hoạch, 195 có separate assessment
- **Ngữ pháp N4**: 86/86 có, 22 có assessment riêng
- **Kaiwa**: 106 task (56 N5 + 50 N4), 106/106 có assessmentId, 50 Kaiwa N4 separate assessment
- **Test**: 230/232 pass (2 failure pre-existing: `n4-course.test.js`, `state.test.js`)
- **Bundle size**: main chunk ~1,617 kB minified (vẫn >800 kB mục tiêu)
- **Gate status** (từ `scripts/done-gates.mjs`):
  - met: G0, G1, G2, G3, G5, G6, G8, G9, G10, G12
  - unverified: G4 (độc lập reviewer), G7 (nghe/đọc/viết ngữ liệu)
  - not-met: G11 (AI infrastructure đã xóa)
- **Overall**: not-met (do G11)

## 5. File cần chú ý khi sửa

### `src/mnn-course.js` (line 55-63)
Khai báo inject các separate assessment vào từng unidade. Lưu ý:
- Phải kiểm `if(u)` trước khi truy cập `u.questions`, `u.kanji`, `u.grammar`, `u.guidedMap` vì `mnnUnits.find()` có thể trả về `undefined` nếu lesson number không khớp.
- Không được để `u.questions.push(q)` ngoài khối `if(u)`.

### `src/n4-kanji-r1-plan.js`
Hàm `applyN4KanjiPlan(mnnUnits)` — cần guard tránh push trùng kanji đã có.

### `scripts/done-gates.mjs`
Sinh báo cáo `DONE_GATES.md` và `evaluation/done-gates.json`. Chạy sau mỗi lần thay đổi dữ liệu lớn để cập nhật trạng thái gate.

## 6. Quy tắc commit

- Chỉ commit source code, config, docs. **Không commit**: `node_modules/`, `dist/`, `.tmp-ui/`, `.runtime/`, `public/dictionaries/words/`, `public/dictionaries/kanji/`, `public/kanji/`, `public/library/`, `public/audio/tts/`, file `.log`, `*.backup.json`.
- Commit chọn lọc theo nhóm đã kiểm, không `git add -A` vô điều kiện.
- Commit message theo kiểu: `feat: <mô tả>` hoặc `fix: <mô tả>`.
- Không commit profile dữ liệu cá nhân, runtime/cache/build output.

## 7. Công việc còn lại (theo NEXT_STEPS.md)

1. Sửa xong `mnn-course.js` injection (đã fix guard) → chạy test + done-gates xác nhận G5 ✅
2. Đổ đủ 40 kanji thiếu vào `n4-kanji-r1-plan.js` (tránh lỗi indentation)
3. Hoàn thiện assessment riêng cho Kanji N4 (195) ✅, ngữ pháp N4 (20 còn thiếu) ✅ (22 có), Kaiwa tasks (50) ✅
4. G7/G8: Nghe/đọc/viết (G7 unverified), giao tiếp (G8 met)
5. G9: JLPT ngân hàng + bộ đề (G9 met)
6. UX/UI + lazy-load (bundle <800 kB)
7. G3/G4 + nghiệm thu (G3 met, G4 unverified - cần reviewer độc lập)
8. G11 not-met (AI infrastructure đã xóa - cần tích hợp lại nếu muốn đánh giá)
9. Dọn dẹp, commit, push (đã làm)

## 8. Liên hệ / Tài liệu liên quan

- `CURRENT_MISSION.md` — Nhiệm vụ chi tiết
- `PROJECT_BRIEF.md` — Tóm tắt dự án
- `NEXT_STEPS.md` — Danh sách công việc tiếp theo
- `DONE_GATES.md` — Trạng thái các gate (sinh bởi `scripts/done-gates.mjs`)
- `REVIEW_QUEUE.md` — Hàng đợi xem xét
- `evaluation/done-gates.json` — Chi tiết gate JSON
- `evaluation/jlpt-official-verification.json` — Thông tin thi JLPT chính thức

## 9. Lưu ý quan trọng

- Đây là dự án cá nhân, không có người duyệt học thuật độc lập. Không coi kết quả test/build là bằng chứng người học sẽ đỗ JLPT.
- Audio dùng TTS cục bộ, không chứng minh phát âm chuẩn.
- Giữ nguyên ID/thứ tự bài 1–50, mở mọi nội dung tự do (không khóa bài).
- Ngân sách 0 đồng — không tải mô hình AI hoặc dịch vụ trả phí.