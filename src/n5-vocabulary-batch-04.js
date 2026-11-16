const groups={
  'identity-contact':{links:[1,2,3],reason:'M01-M03: identify people and exchange personal/contact information.'},
  'interaction-repair':{links:[1,7,9,14,21],reason:'M01/M07/M09/M14/M21: handle greetings, clarification, and repetition in conversation.'},
  'time-frequency':{links:[4,5,10,11,12,24],reason:'M04/M05/M10/M11/M12/M24: state time, schedule, weekday, and seasonal frequency.'},
  'food-orders':{links:[6,8,9,12,13],reason:'M06/M08/M09/M12/M13: name food and drink, state preferences and describe taste/temperature.'},
  'shopping-payment':{links:[2,3,10,11,12,16],reason:'M02/M03/M10/M11/M12/M16: locate goods, ask about price, and choose everyday items or clothing.'},
  'home-facilities':{links:[10,14,15,16],reason:'M10/M14/M15/M16: describe rooms, appliances, and household items.'},
  'travel-directions':{links:[3,5,10,13,16,23],reason:'M03/M05/M10/M13/M16/M23: ask and give directions, talk about travel and places.'},
  'work-school-basics':{links:[1,4,6,7,11,14,17],reason:'M01/M04/M06/M07/M11/M14/M17: talk about work, school, study habits, and daily routine.'},
  'body-basic-needs':{links:[8,11,17,19,23,25],reason:'M08/M11/M17/M19/M23/M25: name body parts and express basic physical needs.'},
  'weather-describing':{links:[8,12,16,20],reason:'M08/M12/M16/M20: describe weather, physical appearance, and strength.'},
  'activities-leisure':{links:[6,9,13,18,19,24],reason:'M06/M09/M13/M18/M19/M24: talk about hobbies, entertainment, and free-time activities.'},
  'basic-modifiers':{links:[8,9,11,12,20,21],reason:'M08/M09/M11/M12/M20/M21: use adverbs and conjunctions to modify and connect ideas.'}
};

const rows=[
  [1,'電話番号','でんわばんごう','số điện thoại','danh từ','電話番号を教えてください。','でんわばんごうをおしえてください。','Xin cho tôi số điện thoại.','1443940',0,'identity-contact'],
  [4,'先月','せんげつ','tháng trước','danh từ','先月は日本に行きました。','せんげつはにほんにいきました。','Tháng trước tôi đi Nhật Bản.','1387500',0,'time-frequency'],
  [4,'来月','らいげつ','tháng sau','danh từ','来月は休みです。','らいげつはやすみです。','Tháng sau tôi nghỉ.','1547900',0,'time-frequency'],
  [4,'来年','らいねん','năm sau','danh từ','来年は日本に来ます。','らいねんはにほんにきます。','Năm sau tôi đến Nhật Bản.','1548220',0,'time-frequency'],
  [4,'毎週','まいしゅう','mỗi tuần','trạng từ','毎週日本語を勉強します。','まいしゅうにほんごをべんきょうします。','Mỗi tuần tôi học tiếng Nhật.','1524690',0,'time-frequency'],
  [4,'今度','こんど','lần sau; lần này','trạng từ','今度会いましょう。','こんどあいましょう。','Hẹn gặp lại lần sau.','1289370',0,'time-frequency'],
  [6,'すし','すし','sushi','danh từ','すしが好きです。','すしがすきです。','Tôi thích sushi.','1595650',0,'food-orders'],
  [6,'お弁当','おべんとう','cơm hộp','danh từ','お弁当を買います。','おべんとうをかいます。','Tôi mua cơm hộp.','1513065',0,'food-orders'],
  [6,'ケーキ','ケーキ','bánh ケーキ','danh từ','ケーキを食べます。','けーきをたべます。','Tôi ăn bánh ケーキ.','1047860',0,'food-orders'],
  [2,'ネクタイ','ネクタイ','cà vạt','danh từ','ネクタイをします。','ネクタイをします。','Tôi đeo cà vạt.','1092820',0,'shopping-payment'],
  [10,'部屋','へや','phòng','danh từ','部屋がきれいです。','へやがきれいです。','Phòng sạch đẹp.','1499320',0,'home-facilities'],
  [10,'冷蔵庫','れいぞうこ','tủ lạnh','danh từ','冷蔵庫に水があります。','れいぞうこにみずがあります。','Có nước trong tủ lạnh.','1557110',0,'home-facilities'],
  [3,'あちら','あちら','bên kia; phía đó (lành lạnh)','đại từ','あちらがトイレです。','あちらがといれです。','Bên kia là nhà vệ sinh.','1483185',0,'travel-directions'],
  [3,'そちら','そちら','bên đó; phía đó (gần hơn)','đại từ','そちらの方は先生ですか。','そちらのかたはせんせいですか。','Bên đó là giáo viên phải không?','1006780',0,'travel-directions'],
  [1,'図書館','としょかん','thư viện','danh từ','図書館で本を読みます。','としょかんでほんをよみます。','Tôi đọc sách ở thư viện.','1370420',0,'work-school-basics'],
  [1,'質問','しつもん','câu hỏi','danh từ / động từ する','質問があります。','しつもんがあります。','Tôi có câu hỏi.','1320760',0,'work-school-basics'],
  [1,'休み','やすみ','nghỉ phép; ngày nghỉ','danh từ','土日は休みです。','どにちはやすみです。','Cuối tuần nghỉ.','1227500',0,'work-school-basics'],
  [1,'帰り','かえり','về; camino về','danh từ','帰りは遅いです。','かえりはおそいです。','Về muộn.','1221250',0,'work-school-basics'],
  [1,'パソコン','パソコン','máy tính cá nhân','danh từ','パソコンを使います。','パソコンをつかいます。','Tôi dùng máy tính.','1101570',0,'work-school-basics'],
  [8,'目','め','mắt','danh từ','目が大きいです。','めがおおきいです。','Mắt to.','1604890',0,'body-basic-needs'],
  [8,'耳','みみ','tai','danh từ','耳がいいです。','みみがいいです。','Tai tốt.','1317170',0,'body-basic-needs'],
  [8,'口','くち','miệng','danh từ','口を閉じてください。','くちをとじてください。','Hãy đóng miệng.','1275640',0,'body-basic-needs'],
  [8,'川','かわ','sông','danh từ','川が長いです。','かわがながいです。','Sông dài.','1390020',0,'weather-describing'],
  [8,'広い','ひろい','rộng; rộng lớn','tính từ い','部屋が広いです。','へやがひろいです。','Phòng rộng.','1278410',0,'weather-describing'],
  [8,'強い','つよい','mạnh; mạnh mẽ','tính từ い','コーヒーが強いです。','こーひーがつよいです。','Cà phê đậm.','1236070',0,'weather-describing'],
  [6,'アニメ','アニメ','phim hoạt hình Nhật Bản','danh từ','アニメを見ます。','アニメをみます。','Tôi xem phim hoạt hình Nhật Bản.','1017590',0,'activities-leisure'],
  [8,'あまり','あまり','không quá; ít (thường dùng với否 định)','trạng từ','あまり飲みません。','あまりのみません。','Tôi không uống nhiều.','1584930',0,'basic-modifiers'],
  [8,'とても','とても','rất; rất nhiều','trạng từ','とても好きです。','とてもすきです。','Tôi thích rất nhiều.','1008630',0,'basic-modifiers'],
  [8,'まだ','まだ','vẫn; chưa','trạng từ','まだ学生です。','まだがくせいです。','Tôi vẫn là học sinh.','1527110',0,'basic-modifiers'],
  [8,'でも','でも','nhưng; tuy nhiên','liên từ','でも、行きます。','でも、いきます。','Nhưng tôi sẽ đi.','1008460',0,'basic-modifiers']
];

export const n5VocabularyBatch04=rows.map(([proposedLessonNumber,text,reading,meaning,type,ja,kana,vi,entryId,senseIndex,group])=>{
  const lessonNumber=groups[group].links.includes(proposedLessonNumber)?proposedLessonNumber:groups[group].links[0];
  return{
    lessonNumber,text,reading,meaning,type,group,
    reason:`${groups[group].reason} This word is used in the example and supports the linked lesson task.`,
    example:{ja,reading:kana,vi},
    sourceReview:{
      entryId,senseIds:[`${entryId}-s${senseIndex}`],
      status:'Project-authored contextual Vietnamese meaning and example; selected JMdict sense; Irodori form/reading and coordinates checked; OpenJLPT membership compared; not independently reviewed',
      batchId:'n5-vocabulary-04',
      jmdict:{artifact:'.sources/edrdg-20261109/jmdict-eng.json',date:'2026-11-09',license:'CC BY-SA 4.0'},
      sourceComparison:{openJlptNote:'No membership match was found in the frozen OpenJLPT N4/N5 snapshots; absence is not evidence of an official level.',irodoriNote:'Irodori records written form, reading and curriculum coordinate; it does not assign an N5 level.'},
      rationale:groups[group].reason
    }
  };
});

export function applyN5VocabularyBatch04(units){
  for(const item of n5VocabularyBatch04){
    const unit=units.find(candidate=>candidate.number===item.lessonNumber);
    if(!unit)throw Error('Missing N5 lesson ' + item.lessonNumber + ' for ' + item.text);
    const exists=unit.words.some(word=>word.text===item.text&&word.reading===item.reading);
    if(!exists)unit.words.push({...item});
  }
}