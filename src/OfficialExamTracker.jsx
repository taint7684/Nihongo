import React, { useState } from 'react';
import { jlptOfficialFacts as facts } from './jlpt-official-facts.js';
import { validateExamEntry, examEntrySummary, rawExamSections } from './exam-log.js';

const labels = {
  vocabulary: 'Từ vựng',
  grammarReading: 'Ngữ pháp và đọc',
  listening: 'Nghe',
  knowledgeReading: 'Kiến thức ngôn ngữ và đọc'
};

export default function OfficialExamTracker({ state, setState }) {
  const [level, setLevel] = useState('N4');
  const [kind, setKind] = useState('raw-practice');
  const [label, setLabel] = useState('');
  const [sections, setSections] = useState({});
  const [scaled, setScaled] = useState({});
  const [attended, setAttended] = useState(false);
  const [error, setError] = useState('');
  const currentFacts = facts.levels[level];

  function save(event) {
    event.preventDefault();
    try {
      if (
        kind === 'raw-practice' &&
        rawExamSections.some(section =>
          !String(sections[section]?.correct ?? '').trim() ||
          !String(sections[section]?.total ?? '').trim()
        )
      ) {
        throw Error('Nhập đủ số câu đúng và tổng từng phần; không tự xem ô trống là 0.');
      }

      const entry = validateExamEntry({
        id: 'exam-' + Date.now(),
        at: Date.now(),
        level,
        kind,
        label: label.trim() || 'Kết quả tự nhập',
        ...(kind === 'raw-practice'
          ? {
              sections: Object.fromEntries(
                rawExamSections.map(section => [
                  section,
                  {
                    correct: Number(sections[section]?.correct),
                    total: Number(sections[section]?.total)
                  }
                ])
              )
            }
          : {
              knowledgeReading: Number(scaled.knowledgeReading),
              listening: Number(scaled.listening),
              allSectionsAttended: attended
            })
      });

      if (
        kind === 'official-scaled' &&
        (!String(scaled.knowledgeReading ?? '').trim() || !String(scaled.listening ?? '').trim())
      ) {
        throw Error('Nhập đủ hai điểm quy đổi chính thức.');
      }

      setState(previous => ({
        ...previous,
        examLogs: [...(previous.examLogs || []), entry]
      }));
      setError('');
    } catch (saveError) {
      setError(saveError.message);
    }
  }

  return (
    <section className="card official-exam-tracker">
      <h2>Đề mẫu chính thức và kết quả theo phần</h2>
      <p>{facts.scoringNoteVi}</p>
      <label>
        Cấp
        <select value={level} onChange={event => setLevel(event.target.value)}>
          <option>N5</option>
          <option>N4</option>
        </select>
      </label>
      <p>
        Thời lượng tham chiếu: {currentFacts.timedSections
          .map(section => `${section.labelVi} ${section.minutes} phút`)
          .join(' · ')}. {facts.timingNoteVi}
      </p>
      <p>
        Điểm tổng cần đạt {currentFacts.overallPassMark}/{currentFacts.totalMaximum}, đồng thời{' '}
        {currentFacts.scoringSections
          .map(section => `${section.labelVi} ≥ ${section.passMark}/${section.maximum}`)
          .join(' và ')}. {facts.passRuleVi} Kiểm nguồn {facts.verifiedAt}:{' '}
        <a href={facts.sources.scoring} target="_blank" rel="noreferrer">Quy tắc JLPT</a>.
      </p>
      <p>
        <a href={facts.sources.samples} target="_blank" rel="noreferrer">Mở đề mẫu chính thức</a>.
        {' '}Tự làm trước khi xem đáp án, ghi điều kiện thời gian và số câu đúng từng phần.
        {' '}Đề mẫu không phải cam kết về đề thi thật.
      </p>
      <form onSubmit={save}>
        <label>
          Tên bộ/điều kiện làm
          <input value={label} maxLength={200} onChange={event => setLabel(event.target.value)} />
        </label>
        <label>
          Loại kết quả
          <select value={kind} onChange={event => setKind(event.target.value)}>
            <option value="raw-practice">Số câu luyện đúng/tổng — không quy điểm</option>
            <option value="official-scaled">Điểm quy đổi chính thức đã nhận</option>
          </select>
        </label>
        {kind === 'raw-practice'
          ? rawExamSections.map(section => (
              <div className="actions" key={section}>
                <strong>{labels[section]}</strong>
                <label>
                  Đúng
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={sections[section]?.correct ?? ''}
                    onChange={event => setSections(previous => ({
                      ...previous,
                      [section]: { ...previous[section], correct: event.target.value }
                    }))}
                  />
                </label>
                <label>
                  Tổng
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={sections[section]?.total ?? ''}
                    onChange={event => setSections(previous => ({
                      ...previous,
                      [section]: { ...previous[section], total: event.target.value }
                    }))}
                  />
                </label>
              </div>
            ))
          : currentFacts.scoringSections.map(section => (
              <label key={section.id}>
                {labels[section.id]}
                <input
                  type="number"
                  min={section.minimum}
                  max={section.maximum}
                  value={scaled[section.id] ?? ''}
                  onChange={event => setScaled(previous => ({
                    ...previous,
                    [section.id]: event.target.value
                  }))}
                />
              </label>
            ))}
        {kind === 'official-scaled' && (
          <label>
            <input
              type="checkbox"
              checked={attended}
              onChange={event => setAttended(event.target.checked)}
            />
            Tôi đã dự đủ các phần thi
          </label>
        )}
        {error && <p role="alert">{error}</p>}
        <button className="primary" disabled={(state.examLogs || []).length >= 300}>
          Lưu kết quả tự nhập
        </button>
      </form>
      {(state.examLogs || []).slice().reverse().map(entry => {
        const summary = examEntrySummary(entry);
        const entryFacts = facts.levels[entry.level];
        return (
          <div className="word-context" key={entry.id}>
            <h3>{entry.level} · {entry.label}</h3>
            <p>{new Date(entry.at).toLocaleDateString('vi-VN')} · {summary.note}</p>
            {summary.kind === 'raw-practice'
              ? (
                  <>
                    <p>Ưu tiên kiểm lại: {labels[summary.weakest]}. Không dùng số này kết luận đã qua sàn.</p>
                    <p>{summary.ranked.map(result =>
                      `${labels[result.section]}: ${result.correct}/${result.total}`
                    ).join(' · ')}</p>
                  </>
                )
              : (
                  <p>
                    {summary.total}/{entryFacts.totalMaximum} ·{' '}
                    {summary.officialPass
                      ? 'Số điểm nhập đáp ứng các ngưỡng chính thức.'
                      : 'Số điểm nhập/việc dự phần chưa đáp ứng tất cả điều kiện.'}
                    {summary.below.length
                      ? ' Dưới sàn: ' + summary.below.map(section => labels[section]).join(', ')
                      : ''}
                  </p>
                )}
            <button
              className="text-button"
              onClick={() => setState(previous => ({
                ...previous,
                examLogs: previous.examLogs.filter(item => item.id !== entry.id)
              }))}
            >
              Xóa mục tự nhập này
            </button>
          </div>
        );
      })}
    </section>
  );
}
