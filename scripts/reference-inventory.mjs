import { referenceGapDecisions as gap } from '../src/reference-gap-decisions.js';
import fs from 'node:fs';
import { referenceTargets } from '../src/reference-targets.js';
import { lessons } from '../src/content.js';
import { communication, transfer } from '../src/communication-content.js';

export function writeReferenceInventory() {
  const levels = {};

  for (const [level, target] of Object.entries(referenceTargets.levels)) {
    const refs = lessons.filter(
      lesson => lesson.referenceLesson && (lesson.level || 'N5') === level
    );
    const wordSet = new Map();

    for (const group of target.vocabulary) {
      for (const text of group.words) {
        if (!wordSet.has(text)) {
          wordSet.set(text, {
            id: `${level}:word:${text}`,
            text,
            recommendedLessons: [],
            lessonIds: [],
            hasContext: false
          });
        }
        wordSet.get(text).recommendedLessons.push(group.referenceLesson);
      }
    }

    for (const entry of wordSet.values()) {
      const hits = refs.filter(lesson => lesson.words.some(word => word.text === entry.text));
      entry.lessonIds = hits.map(lesson => lesson.id);
      entry.hasContext = hits.some(lesson =>
        lesson.words.some(word =>
          word.text === entry.text &&
          word.reading &&
          word.meaning &&
          word.example?.ja &&
          word.example?.reading &&
          word.example?.vi
        )
      );
      entry.sameLevelContext = entry.hasContext;

      const reuse = level === 'N4' && (gap.reuse[entry.text] || gap.matcher[entry.text]);
      entry.unitKind = level === 'N4' && gap.grammar.includes(entry.text)
        ? 'grammar-use'
        : level === 'N4' && gap.glossary.includes(entry.text)
          ? 'metalinguistic-glossary'
          : 'lexical-target';
      entry.gapClass = entry.hasContext
        ? 'same-level-context'
        : reuse
          ? gap.reuse[entry.text]
            ? 'prior-knowledge-reused'
            : 'matcher-form-difference'
          : entry.unitKind === 'grammar-use'
            ? 'grammar-not-new-lexeme'
            : entry.unitKind === 'metalinguistic-glossary'
              ? 'explanation-term'
              : 'missing-context';

      if (reuse) {
        const lesson = lessons.find(item => item.id === reuse[0]);
        const word = lesson?.words.find(item => item.text === reuse[1]);
        if (!word) throw Error(`Invalid reviewed reference reuse ${entry.text}`);
        entry.reusedFrom = {
          lessonId: lesson.id,
          word: word.text,
          meaning: word.meaning,
          reading: word.reading
        };
        entry.hasContext = !!(word.example?.ja && word.example?.reading && word.example?.vi);
        if (entry.hasContext) entry.lessonIds = [...new Set([...entry.lessonIds, lesson.id])];
      }

      entry.status = entry.gapClass === 'prior-knowledge-reused'
        ? 'Có từ nền dùng lại; chưa tự xác nhận nhiệm vụ N4 đủ'
        : entry.gapClass === 'matcher-form-difference'
          ? 'Có dạng liên quan trong bài; sửa báo thiếu giả'
          : entry.unitKind !== 'lexical-target'
            ? 'Theo dõi trong ngữ pháp/chú giải, không tính đầu mục mới'
            : entry.hasContext
              ? 'Có ngữ cảnh, chưa chứng nhận đủ học thuật'
              : 'Chưa biên soạn đủ mục từ';
    }

    const kanji = target.kanji.map(char => ({
      id: `${level}:kanji:${char}`,
      char,
      lessonIds: refs
        .filter(lesson => (lesson.kanji || []).some(item => item.char === char))
        .map(lesson => lesson.id),
      hasSourceStroke: fs.existsSync(
        `public/kanji/${char.codePointAt(0).toString(16).padStart(5, '0')}.json`
      )
    }));

    const units = target.vocabulary.map(group => {
      const lesson = refs.find(item => item.referenceLesson === group.referenceLesson);
      return {
        number: group.referenceLesson,
        lessonId: lesson?.id || null,
        status: lesson ? 'Có học liệu; không tự suy đủ phạm vi' : 'Chưa biên soạn',
        requiredFunctions: target.functions[
          group.referenceLesson - (level === 'N4' ? 26 : 1)
        ].split(/[|/]/),
        functionAudit: 'Chưa rà từng chức năng độc lập; không tự đánh đủ vì bài tồn tại',
        grammar: lesson?.grammar.map((item, index) => ({
          id: `${lesson.id}-g${index}`,
          pattern: item.pattern,
          practiceIds: lesson.guidedMap?.[index] || []
        })) || [],
        guidedTasks: (communication[lesson?.id] || []).map(item => item.id),
        transfer: transfer[lesson?.id]?.id || null
      };
    });

    const missingLexical = [...wordSet.values()].filter(
      item => item.unitKind === 'lexical-target' && !item.hasContext
    );
    const missingGrammar = [...wordSet.values()].filter(
      item => item.unitKind === 'grammar-use' && !item.hasContext
    );
    const missingGlossary = [...wordSet.values()].filter(
      item => item.unitKind === 'metalinguistic-glossary' && !item.hasContext
    );
    const gapClasses = [...new Set([...wordSet.values()].map(item => item.gapClass))]
      .map(className => [
        className,
        [...wordSet.values()].filter(item => item.gapClass === className).length
      ]);

    levels[level] = {
      vocabulary: [...wordSet.values()],
      kanji,
      units,
      summary: {
        plannedWords: wordSet.size,
        plannedLexicalTargets: [...wordSet.values()].filter(
          item => item.unitKind === 'lexical-target'
        ).length,
        missingLexicalContexts: missingLexical.length,
        missingWords: missingLexical.length,
        uncontextualizedGrammarTargets: missingGrammar.length,
        uncontextualizedGlossaryTargets: missingGlossary.length,
        gapClasses: Object.fromEntries(gapClasses),
        contextWords: [...wordSet.values()].filter(
          item => item.unitKind === 'lexical-target' && item.hasContext
        ).length,
        plannedKanji: kanji.length,
        kanjiWithLesson: kanji.filter(item => item.lessonIds.length).length,
        publishedUnits: refs.length,
        plannedUnits: 25
      }
    };
  }

  const result = {
    ...referenceTargets,
    levels,
    meaning: 'Finite program selection is independent of current implementation; even 100% here would not certify exam coverage or content correctness'
  };
  fs.writeFileSync('public/reference-inventory.json', JSON.stringify(result, null, 2));

  let markdown = '# Danh mục mục tiêu tham chiếu và khoảng trống\n\n';
  markdown += `Tập mục tiêu tự chọn theo chức năng, phiên bản ${referenceTargets.version}. `;
  markdown += 'Không danh mục JLPT chính thức; không lấy kho đang có làm mẫu số. ';
  markdown += 'Chưa xác lập rằng tập này đủ toàn N5/N4. ';
  markdown += 'Minna khoảng1000 từ/mỗi sách là mốc cảnh báo độ rộng tham chiếu, không danh sách được sao chép hoặc tiêu chuẩn đỗ.\n\n';

  for (const [level, data] of Object.entries(levels)) {
    const lexicalGaps = data.vocabulary.filter(
      item => item.unitKind === 'lexical-target' && !item.hasContext
    );
    const grammarTargets = data.vocabulary.filter(item => item.unitKind === 'grammar-use');
    const glossaryTargets = data.vocabulary.filter(
      item => item.unitKind === 'metalinguistic-glossary'
    );

    markdown += `## ${level}\n\n${JSON.stringify(data.summary)}\n\n`;
    markdown += `Từ vựng thiếu ngữ cảnh: ${lexicalGaps.map(
      item => `${item.text} (gợi ý bài ${item.recommendedLessons.join('/')})`
    ).join('、')}\n\n`;
    markdown += `Mục ngữ pháp theo dõi riêng, không tính là từ vựng thiếu: ${grammarTargets.map(
      item => item.text
    ).join('、')}\n\n`;
    markdown += `Thuật ngữ chú giải theo dõi riêng: ${glossaryTargets.map(
      item => item.text
    ).join('、')}\n\n`;
    markdown += `Kanji chưa có bài: ${data.kanji.filter(
      item => !item.lessonIds.length
    ).map(item => item.char).join(' ')}\n\n`;
    markdown += `Bài chưa biên soạn: ${data.units.filter(
      item => !item.lessonId
    ).map(item => item.number).join(', ')}\n\n`;
  }

  markdown += 'Dữ liệu từng mục/ID/liên kết: public/reference-inventory.json. ';
  markdown += 'Có ngữ cảnh ≠ có luyện/đánh giá/ôn đủ; không trộn với KNOWLEDGE_COVERAGE đo liên kết cấu trúc. ';
  markdown += `Nguồn: ${referenceTargets.sources.join(' · ')}\n`;
  fs.writeFileSync('REFERENCE_INVENTORY.md', markdown);
  return result;
}
