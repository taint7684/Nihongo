export function kanjiUseMatchesWord(kanji, wordKey) {
  const inWord = String(kanji.inWord || '')
    .split(/[（(]/u, 1)[0]
    .split(/[?？]/u, 1)[0]
    .trim();
  return kanji.wordKey === wordKey || inWord === wordKey;
}

export function kanjiWordForLesson(lesson, kanji) {
  return lesson.words.find(word => word.text === (kanji.wordKey || ''))
    || lesson.words.find(word => word.text.includes(kanji.char));
}

export function hasKanjiStrokePractice(asset, char) {
  return asset?.char === char
    && Array.isArray(asset.paths)
    && asset.paths.length > 0
    && asset.paths.every(path => typeof path === 'string' && path.length > 0)
    && Boolean(asset.credit && asset.license);
}
