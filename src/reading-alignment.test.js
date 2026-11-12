import{it,expect}from'vitest';import{alignReading}from'../scripts/reading-alignment.mjs';
const lex=new Map([['私','わたし'],['学生','がくせい'],['猫','ねこ'],['はい','はい'],['いす','いす'],['下','した'],['はじめまして','はじめまして'],['今日','きょう'],['勉強','べんきょう']]);
it('distinguishes a particle from the beginning of a word across boundaries',()=>{expect(alignReading('猫はいすの下にいます。','ねこはいすのしたにいます。',lex)).toBe('ネコワイスノシタニイマス');expect(alignReading('はじめまして。','はじめまして。',lex)).toBe('ハジメマシテ');});
it('keeps the kana of a kanji stem instead of turning its initial ha into a particle',()=>expect(alignReading('話してください。','はなしてください。',lex)).toBe('ハナシテクダサイ'));
it('applies declared lexical long vowels without collapsing unrelated word boundaries',()=>{expect(alignReading('私は学生です。','わたしはがくせいです。',lex)).toBe('ワタシワガクセエデス');expect(alignReading('今日は勉強しました。','きょうはべんきょうしました。',lex)).toBe('キョオワベンキョオシマシタ');});

it('preserves lexical readings after a numeric kanji run and at a new sentence',()=>{expect(alignReading('毎日二時間勉強します。','まいにちにじかんべんきょうします。',lex)).toBe('マイニチニジカンベンキョオシマス');expect(alignReading('学生ですか。はい、学生です。','がくせいですか。はい、がくせいです。',lex)).toBe('ガクセエデスカハイガクセエデス');});

it('does not pronounce the lexical は in はず as a topic particle',()=>{expect(alignReading('いるはずです。','いるはずです。',new Map())).toBe('イルハズデス');expect(alignReading('はさみです。','はさみです。',new Map([['はさみ','はさみ']]))).toBe('ハサミデス');expect(alignReading('会社へ行きます。','かいしゃへいきます。',new Map([['会社','かいしゃ'],['行きます','いきます']]))).toBe('カイシャエイキマス');});

it('retains the verified particle patterns in では, これは and ては',()=>{expect(alignReading('これは本です。','これはほんです。',new Map([['本','ほん']]))).toBe('コレワホンデス');expect(alignReading('先生ではありません。','せんせいではありません。',new Map([['先生','せんせい']]))).toBe('センセエデワアリマセン');expect(alignReading('撮ってはいけません。','とってはいけません。',new Map([['撮って','とって']]))).toBe('トッテワイケマセン');});

it('does not match lexical はず across the particle は plus ずっと',()=>{expect(alignReading('電車はずっと速いです。','でんしゃはずっとはやいです。',new Map([['電車','でんしゃ'],['速い','はやい']]))).toBe('デンシャワズットハヤイデス');});
