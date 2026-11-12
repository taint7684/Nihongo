import { jlptOfficialFacts } from './jlpt-official-facts.js';

export const rawExamSections = ['vocabulary', 'grammarReading', 'listening'];

export function validateExamEntry(entry) {
  if (
    !entry ||
    typeof entry.id !== 'string' ||
    entry.id.length > 100 ||
    !['N5', 'N4'].includes(entry.level) ||
    !Number.isFinite(entry.at) ||
    !['raw-practice', 'official-scaled'].includes(entry.kind) ||
    typeof entry.label !== 'string' ||
    entry.label.length > 200
  ) {
    throw Error('Kết quả thi không hợp lệ.');
  }

  if (entry.kind === 'raw-practice') {
    const completeSections = entry.sections &&
      rawExamSections.every(section => {
        const result = entry.sections[section];
        return result &&
          Number.isInteger(result.correct) &&
          Number.isInteger(result.total) &&
          result.total > 0 &&
          result.total <= 500 &&
          result.correct >= 0 &&
          result.correct <= result.total;
      });
    if (!completeSections) {
      throw Error('Nhập số câu đúng/tổng của đủ ba phần, không dùng điểm quy đổi giả.');
    }

    return {
      id: entry.id,
      level: entry.level,
      at: entry.at,
      kind: entry.kind,
      label: entry.label,
      sections: Object.fromEntries(
        rawExamSections.map(section => [
          section,
          {
            correct: entry.sections[section].correct,
            total: entry.sections[section].total
          }
        ])
      )
    };
  }

  const level = jlptOfficialFacts.levels[entry.level];
  const bounds = Object.fromEntries(
    level.scoringSections.map(section => [
      section.id,
      { minimum: section.minimum, maximum: section.maximum }
    ])
  );
  if (
    !Number.isInteger(entry.knowledgeReading) ||
    entry.knowledgeReading < bounds.knowledgeReading.minimum ||
    entry.knowledgeReading > bounds.knowledgeReading.maximum ||
    !Number.isInteger(entry.listening) ||
    entry.listening < bounds.listening.minimum ||
    entry.listening > bounds.listening.maximum ||
    typeof entry.allSectionsAttended !== 'boolean'
  ) {
    throw Error('Điểm chính thức phải nằm trong giới hạn hai nhóm điểm và ghi việc dự đủ phần.');
  }

  return {
    id: entry.id,
    level: entry.level,
    at: entry.at,
    kind: entry.kind,
    label: entry.label,
    knowledgeReading: entry.knowledgeReading,
    listening: entry.listening,
    allSectionsAttended: entry.allSectionsAttended
  };
}

export function validateExamLog(value, result) {
  if (value.examLogs === undefined) return;
  if (!Array.isArray(value.examLogs) || value.examLogs.length > 300) {
    throw Error('Nhật ký thi không hợp lệ.');
  }
  result.examLogs = value.examLogs.map(validateExamEntry);
}

export function examEntrySummary(entry) {
  const validated = validateExamEntry(entry);
  const level = jlptOfficialFacts.levels[validated.level];
  if (validated.kind === 'raw-practice') {
    const ranked = rawExamSections
      .map(section => ({
        section,
        ...validated.sections[section],
        ratio: validated.sections[section].correct / validated.sections[section].total
      }))
      .sort((a, b) => a.ratio - b.ratio);

    return {
      kind: validated.kind,
      weakest: ranked[0].section,
      ranked,
      scaledScore: null,
      officialPass: null,
      note: 'Kết quả luyện nhập tay; chỉ ưu tiên phần yếu, chưa xác định đạt điểm sàn JLPT.'
    };
  }

  const scores = {
    knowledgeReading: validated.knowledgeReading,
    listening: validated.listening
  };
  const below = level.scoringSections
    .filter(section => scores[section.id] < section.passMark)
    .map(section => section.id);
  const total = validated.knowledgeReading + validated.listening;

  return {
    kind: validated.kind,
    total,
    totalMaximum: level.totalMaximum,
    below,
    officialPass: validated.allSectionsAttended &&
      total >= level.overallPassMark &&
      below.length === 0,
    note: 'Đối chiếu số điểm quy đổi chính thức do bạn nhập, chưa xác minh chứng nhận; không suy từ tỷ lệ đúng.'
  };
}
