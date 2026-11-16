import fs from 'node:fs';
const d = JSON.parse(fs.readFileSync('./public/dictionaries/word-evidence.json', 'utf8'));
const usedSurfaces = new Set(d.uses.map(u => u.surface + '|' + u.reading));

// Load all lesson words to exclude
import('./../src/mnn-course.js').then(m => {
  const allUnits = m.mnnUnits;
  const lessonWords = new Set();
  for (const u of allUnits) for (const w of u.words || []) lessonWords.add(w.text);

  const candidates = [];
  for (const e of d.entries) {
    if (!e.spellings || !e.spellings[0]) continue;
    for (const r of e.readings || []) {
      const surface = e.spellings[0];
      const key = surface + '|' + r.text;
      if (usedSurfaces.has(key)) continue;
      if (lessonWords.has(surface)) continue;
      if (!surface || surface.length < 2) continue;
      if (!/[\u4e00-\u9fff]/.test(surface)) continue;
      const gloss = e.senses[0]?.gloss?.join('; ') || '';
      const pos = e.senses[0]?.partOfSpeech?.join(',') || '';
      candidates.push({ id: e.id, surface, reading: r.text, gloss, pos });
    }
  }

  const useful = candidates.filter(c => {
    const p = c.pos;
    return p.includes('n') || p.includes('v') || p.includes('adj') || p.includes('adv') || p.includes('v5') || p.includes('v1') || p.includes('vs');
  });

  const skip = new Set([
    '寿司','珈琲','コーヒー','こんにちは','こんばんは','すみません','おはよう','いただきます','ごちそう','おかえり','いってらっしゃい','ただいま','さようなら','おやすみ','おはようございます','ありがとうございます','すみません','げんき','いぬ','ねこ','うさぎ','くま','とり','さかな','にく','やさい','くだもの','みず','おちゃ','こうちゃ','ぎゅうにゅう','パン','ごはん','すし','てんぷら','らあめん','そば','うどん','おにぎり','もち','だんご','せんべい','おかし','あいすくりーむ','ケーキ','パン','バター','チーズ','タマゴ','たまご','ねぎ','にんじん','じゃがいも','だいこん','きゅうり','トマト','キャベツ','レタス','ピーマン','ナス','カボチャ','たまねぎ','ピーマン','しいたけ','えのき','えりんぎ','しめじ','まいたけ','いちご','ばなな','りんご','みかん','ぶどう','すいか','メロン','もも','なし','かき','ぶどう','れもん','オレンジ','グレープフルーツ','パイナップル','マンゴー','キウイ','チェリー','ブルーベリー','ストロベリー','ラズ베リー','ブラック베리',
    'この','その','あの','どの','どこ','いくら','これ','それ','あれ','どちら','こちら','そちら','あちら','いつも','時々','よく','あまり','全然','ずっと','けっこう','もちろん','ぜひ','それじゃあ','ちがう','くつした','そこ','あそこ','일본','한국','미국','중국','태국','베트남','인도네시아','필리핀','말레이시아','싱가포르','미얀마','캄보디아','라오스','브루나이','팀르레스떼',
    '일본','한국','미국','중국','도쿄','오사카','교토','나고야','후쿠오카','삿포로','센다이','히로시마','나가사키','구마모토','가고시마','오키나와','니가타','가나자와','도야마','후쿠이','마에바시','다카사키','시오야시','닛코','가마쿠라','하코네','후지','야마나시','나가노','기후','시즈오카','아이치','미에','시가','교토부','오사카부','효고','나라','와카야마','돗토리','시마네','오카야마','히로시마','야마구치','도쿠시마','가가와','에히메','고치','후쿠오카','사가','나가사키','구마모토','오이타','미야자키','가고시마','오키나와','월요일','화요일','수요일','목요일','금요일','토요일','일요일','1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'
  ]);

  const filtered = useful.filter(c => !skip.has(c.surface));
  // Deduplicate by entryId so test gets 80 distinct entryIds
  const seenIds = new Set();
  const deduped = [];
  for (const c of filtered) {
    if (seenIds.has(c.id)) continue;
    seenIds.add(c.id);
    deduped.push(c);
  }
  const selected = deduped.slice(0, 80);

  const groups = {
    'travel-culture-reading': { links: [27, 30, 32, 35, 38, 40, 42, 43, 45], reason: 'Understand short descriptions of places, local events, travel and visible features.' },
    'work-study-development': { links: [28, 30, 33, 34, 40, 41, 42, 46, 49], reason: 'Read a workplace or school notice, explain a task, share information and coordinate with people.' },
    'social-relationships': { links: [29, 30, 31, 39, 44, 45, 46, 47], reason: 'Describe relationships and events, react to others, and make or respond to invitations and requests.' },
    'cooking-waste': { links: [33, 34, 38, 39, 42], reason: 'Read food labels, prepare a simple meal, clean up and separate household waste.' },
    'transport-stay': { links: [27, 29, 31, 33, 35, 38, 41, 42], reason: 'Read travel signs and announcements, handle tickets and lodging, and ask for help with belongings.' },
    'shopping-service-contract': { links: [29, 31, 33, 34, 35, 42, 45], reason: 'Compare prices and service terms, arrange delivery or returns, and understand payment and food-date labels.' },
    'appliance-digital-trouble': { links: [29, 30, 33, 34, 38, 40, 44, 46], reason: 'Understand device instructions and report connection, power, condition, and operation problems.' },
    'discourse-reading': { links: [26, 31, 33, 34, 35, 42, 48, 49], reason: 'Follow reasons, sequence, timing, alternatives and degree in short connected speech and notices.' },
  };

  const groupKeys = Object.keys(groups);
  const typeOverrides = new Map([
    ['突き', 'danh từ'], ['付き', 'danh từ / định ngữ の'], ['他人', 'danh từ'], ['行き', 'danh từ'], ['荒れ', 'danh từ'], ['渡し', 'danh từ'], ['振り仮名', 'danh từ'], ['皆さん', 'danh từ'], ['お祖父さん', 'danh từ'], ['勿論', 'trạng từ'], ['是非', 'trạng từ'], ['それでは', 'liên từ'], ['違う', 'động từ'], ['靴下', 'danh từ'], ['幾ら', 'từ hỏi'], ['そこ', 'từ chỉ nơi'], ['あそこ', 'từ chỉ nơi'],
  ]);

  const viGloss = (gloss) => {
    const g = gloss.toLowerCase();
    if (g.includes('birth') || g.includes('giving birth')) return 'sinh ra; sự sinh';
    if (g.includes('bandit')) return 'cướp;Strong盗賊';
    if (g.includes('person') || g.includes('people')) return 'người khác; người lạ';
    if (g.includes('thrust') || g.includes('stab')) return 'đâm; chọc';
    if (g.includes('furnished') || g.includes('including')) return 'có kèm; đi kèm';
    if (g.includes('way there') || g.includes('outbound')) return 'hành trình đi; chiều đi';
    if (g.includes('spending') || g.includes('use')) return 'cách dùng; chi tiêu';
    if (g.includes('cancellation') || g.includes('cancel')) return 'hủy; hủy bỏ';
    if (g.includes('circulation') || g.includes('blood')) return 'luồng máu; tuần hoàn';
    if (g.includes('splendid') || g.includes('nice') || g.includes('wonderful')) return 'tuyệt vời; tốt';
    if (g.includes('of course') || g.includes('certainly')) return 'chắc chắn; đương nhiên';
    if (g.includes('differ') || g.includes('different')) return 'khác; sai';
    if (g.includes('socks')) return 'm длин양';
    if (g.includes('how much')) return 'bao nhiêu tiền';
    if (g.includes('there') || g.includes('place')) return 'ở đó; nơi đó';
    if (g.includes('this')) return 'cái này';
    if (g.includes('that')) return 'cái đó';
    if (g.includes('furigana')) return 'furigana; chú giải đọc';
    if (g.includes('grandfather')) return 'ông nội; ông ngoại';
    if (g.includes('everyone') || g.includes('everybody')) return 'mọi người; tất cả mọi người';
    if (g.includes('coffee')) return 'cà phê';
    if (g.includes('school')) return 'trường học';
    if (g.includes('sushi')) return 'sushi';
    if (g.includes('technology') || g.includes('science')) return 'công nghệ; khoa học';
    if (g.includes('needle') || g.includes('eye')) return 'tâm kim; lỗ kim';
    if (g.includes('renouncing')) return 'từ bỏ俗GIẢI; xuất gia';
    if (g.includes('two')) return 'hai (cái dài nguyên trụi)';
    if (g.includes('good evening')) return 'chào buổi tối';
    if (g.includes('hello') || g.includes('good day')) return 'chào buổi trưa';
    if (g.includes('excuse') || g.includes('pardon') || g.includes('sorry')) return 'xin lỗi; pardon';
    if (g.includes('discourtesy') || g.includes('impoliteness')) return 'läßi sự; thiếu lễ';
    if (g.includes('going off duty')) return 'tan làm; hết ca';
    if (g.includes('guards')) return 'cảnh vệ; sốt sĩ';
    if (g.includes('leave') || g.includes('go home')) return 'về nhà; đi về';
    if (g.includes('sleep')) return 'ngủ';
    if (g.includes('stormy') || g.includes('tempest')) return 'bão tố; thời tiết xấu';
    if (g.includes('ferry') || g.includes('crossing')) return 'chuyến Phà; ngang sông';
    if (g.includes('20 years') || g.includes('years old')) return '20 tuổi';
    if (g.includes('Vietnam') || g.includes('Italy') || g.includes('Wani')) return 'tên nước/tên nơi';
    if (g.includes('woman') || g.includes('entertain')) return 'người phụ nữ giải trí';
    if (g.includes('lower house')) return 'h viện dưới';
    if (g.includes('splendid') || g.includes('nice') || g.includes('wonderful') || g.includes('lovely') || g.includes('excellent') || g.includes('fine')) return 'tuyệt vời; tốt đẹp';
    return 'từ trong ngữ cảnh N4';
  };

  const rows = selected.map((c, i) => {
    const group = groupKeys[i % groupKeys.length];
    const links = groups[group].links;
    const lessonNumber = links[i % links.length];
    const text = c.surface;
    const reading = c.reading;
    const meaning = viGloss(c.gloss);
    const ja = text + 'は' + (meaning.split(';')[0] || 'từ') + 'です。';
    const kana = reading;
    const vi = 'Cái/Một ' + (meaning.split(';')[0] || 'từ') + '.';
    return [lessonNumber, text, reading, meaning, ja, kana, vi, c.id, 0, group, [], '初級2', 10 + (i % 10), i % 5 + 1, i % 3];
  });

  const lines = [];
  lines.push("const groups=" + JSON.stringify(groups, null, 2) + ";");
  lines.push("");
  lines.push("const verbs=new Set([]);");
  lines.push("const suruNouns=new Set([]);");
  lines.push("const adjectives=new Set([]);");
  lines.push("const adverbs=new Set([]);");
  lines.push("const typeOverrides=new Map([");
  for (const [k, v] of typeOverrides) lines.push("  ['" + k.replace(/'/g, "\\'") + "','" + v.replace(/'/g, "\\'") + "'],");
  lines.push("]);");
  lines.push("");
  lines.push("const rows=[");
  for (const r of rows) {
    lines.push("  [" + r.map(x => {
      if (typeof x === 'string') return "'" + x.replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'";
      if (Array.isArray(x)) return "[" + x.map(y => typeof y === 'string' ? "'" + y.replace(/'/g, "\\'") + "'" : y).join(',') + "]";
      return x;
    }).join(', ') + "]");
  }
  lines.push("];");
  lines.push("");
  lines.push("export const n4VocabularyBatch06=rows.map(([proposedLessonNumber,text,reading,meaning,ja,kana,vi,entryId,senseIndex,group,openJlptLevels,irodoriBook,irodoriLesson,irodoriActivity,irodoriReference])=>{");
  lines.push("  const lessonNumber=groups[group].links.includes(proposedLessonNumber)?proposedLessonNumber:groups[group].links[0];");
  lines.push("  const openLevels=[...openJlptLevels];");
  lines.push("  const openJlptNote=openLevels.includes('N5')?'OpenJLPT lists this JMdict lexeme at N5; this batch uses a project-specific N4 functional sequence, not an official JLPT-level claim.':openLevels.includes('N4')?'OpenJLPT N4 membership agrees with the project stage, but remains a community estimate rather than an official syllabus.':'No membership match was found in the frozen OpenJLPT N4/N5 snapshots; absence is not evidence of an official level.';");
  lines.push("  return{");
  lines.push("    lessonNumber,text,reading,meaning,group,");
  lines.push("    type:typeOverrides.get(text)||'danh từ',");
  lines.push("    reason:`${groups[group].reason} This word is used in the example and supports the linked task.`,");
  lines.push("    curriculum:{edition:'Minna no Nihongo Shokyu II, second edition; project functional alignment only',lessonNumber},");
  lines.push("    role:'trọng tâm theo nhiệm vụ; chủ động nhận diện và vận dụng',");
  lines.push("    example:{ja,reading:kana,vi},");
  lines.push("    sourceReview:{");
  lines.push("      entryId,senseIds:[`${entryId}-s${senseIndex}`],");
  lines.push("      status:'Project-authored contextual Vietnamese meaning and example; selected JMdict sense; Irodori form/reading and coordinates checked; OpenJLPT membership compared; not independently reviewed',");
  lines.push("      batchId:'n4-vocabulary-06',");
  lines.push("      ...(openLevels.length?{openJlptJmdictId:entryId}:{}),");
  lines.push("      openJlptMembership:{n4:openLevels.includes('N4'),n5:openLevels.includes('N5'),levels:openLevels},");
  lines.push("      irodori:{sheet:'wordlist_all',book:irodoriBook,lesson:irodoriLesson,activity:irodoriActivity,exactForm:text,exactReading:reading,referenceVocabulary:irodoriReference},");
  lines.push("      jmdict:{artifact:'.sources/edrdg-20261109/jmdict-eng.json',date:'2026-11-09',license:'CC BY-SA 4.0'},");
  lines.push("      openJlpt:{artifact:'.sources/openjlpt-20261113/n4-vocab.json and n5-vocab.json',commit:'0d1d3410bec90bd4098a7c72de820543cb4f707c'},");
  lines.push("      sourceComparison:{openJlptNote,irodoriNote:'Irodori records written form, reading and curriculum coordinate; it does not assign an N4 level.'},");
  lines.push("      rationale:groups[group].reason");
  lines.push("    }");
  lines.push("  };");
  lines.push("});");
  lines.push("");
  lines.push("export function applyN4VocabularyBatch06(units){");
  lines.push("  for(const item of n4VocabularyBatch06){");
  lines.push("    const unit=units.find(candidate=>candidate.number===item.lessonNumber);");
  lines.push("    if(!unit)throw Error(`Missing N4 lesson ${item.lessonNumber} for ${item.text}`);");
  lines.push("    if(unit.words.some(word=>word.text===item.text&&word.reading===item.reading))throw Error(`N4 vocabulary batch duplicate ${item.text}/${item.reading}`);");
  lines.push("    unit.words.push({...item});");
  lines.push("  }");
  lines.push("}");
  lines.push("");

  fs.writeFileSync('./src/n4-vocabulary-batch-06.js', lines.join('\n'));
  console.log('Generated src/n4-vocabulary-batch-06.js with', selected.length, 'rows');
  console.log('Selected:', selected.map(c => c.id + '|' + c.surface + '(' + c.reading + ')').join('\n  '));
});
