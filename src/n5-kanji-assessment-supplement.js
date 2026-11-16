const items = [
  [1, 'company-person', '会社員', ['会', '社'], 'ハナさんは会社員です。キムさんは学生です。', ['かいしゃいん', 'がくせい', 'せんせい']],
  [1, 'student-person', '学生', ['学', '生'], 'ミンさんは学生です。リーさんは会社員です。', ['がくせい', 'せんせい', 'かいしゃいん']],
  [1, 'teacher-person', '先生', ['先'], 'リーさんは先生です。リンさんは会社員です。', ['せんせい', 'がくせい', 'かいしゃいん']],
  [1, 'person-name', '名前', ['名', '前'], 'ミンさんの名前はミンです。ハナさんの名前はハナです。', ['なまえ', 'せんせい', 'だいがく']],
  [1, 'university-person', '大学', ['大'], 'ハナさんは大学の先生です。リンさんは会社員です。', ['だいがく', 'がくせい', 'せんせい']],
  [2, 'japanese-language', '日本語', ['語'], '日本語の先生はリンさんです。', ['にほんご', 'ほん', 'しんぶん']],
  [2, 'book-owner', '本', ['本'], 'リンさんの本はこの本です。キムさんの本はあの本です。', ['ほん', 'じしょ', 'しんぶん']],
  [3, 'hundred-yen', '百', ['百'], 'ノートは百円です。ペンは五百円です。', ['ひゃく', 'さんびゃく', 'せん']],
  [4, 'four-oclock', '四時', ['四', '時'], 'リンさん：四時ですか。ミンさん：いいえ、五時です。', ['よじ', 'ごじ', 'くじ']],
  [5, 'go-to-station', '行きます', ['行'], 'リンさんは日曜日に駅へ行きます。キムさんは月曜日に駅へ行きます。', ['いきます', 'きます', 'かえります']],
  [6, 'eat-bread', '食べます', ['食'], 'キムさんはパンを食べます。リンさんはお茶を飲みます。', ['たべます', 'のみます', 'みます']],
  [7, 'write-letter', '手紙', ['手'], 'リンさんは先生に手紙を書きます。キムさんは本を読みます。', ['てがみ', 'ほん', 'じしょ']],
  [7, 'write-name', '書きます', ['書'], 'リンさんは手紙を書きます。キムさんは名前を書きます。', ['かきます', 'よみます', 'のみます']],
  [14, 'teach-name', '教えます', ['教'], 'ハナさんは名前を教えます。キムさんは電話番号を教えます。', ['おしえます', 'まちます', 'あけます']],
  [8, 'new-bag', '新しい', ['新'], 'リンさんの新しいかばんは赤いです。キムさんのかばんは黒いです。', ['あたらしい', 'ふるい', 'ちいさい']],
  [9, 'like-books', '好き', ['好'], 'ミンさんは本が好きです。リンさんは映画が好きです。', ['すき', 'きらい', 'じょうず']],
];

export function kanjiAssessmentSupplementFor(n) {
  return items.filter(([lesson]) => lesson === n).map(([lesson, slug, wordKey, chars, passage, choices]) => {
    const sourceLessonId = 'mnn-' + String(lesson).padStart(2, '0');
    const id = 'n5-assessment-r1-' + String(lesson).padStart(2, '0') + '-kanji-' + slug;
    return {
      id,
      assessment: true,
      sourceLessonId,
      prompt: passage + '\nTrong đoạn, ' + wordKey + ' được đọc thế nào?',
      choices,
      answer: 0,
      explanation: 'Cách đọc trong từ đã học là ' + choices[0] + '. Câu mới chỉ kiểm tra nhận diện cách đọc trong ngữ cảnh; không chứng minh nhớ không nhìn, viết được chữ hoặc biết mọi âm đọc.',
      skill: 'đọc Kanji trong từ',
      assessesWords: [wordKey],
      assessesKanji: chars,
      wordEvidenceKind: 'kanji-reading',
      wordKey,
      usageId: sourceLessonId + ':' + wordKey,
      assessmentScope: 'Reading the linked taught word in a new written context; not meaning recall, handwriting, listening, all readings or delayed retention',
      validationStatus: 'project-authored context; target reading matches the existing lesson entry; no independent academic review',
    };
  });
}
