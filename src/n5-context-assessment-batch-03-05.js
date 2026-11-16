// Original authored MC assessments for selected existing lesson words.
// Lexical senses source-compared 2026-11-13 against the project's frozen JMdict records.
// No independent academic approval; no listening, speech, unaided recall or whole-lesson sufficiency claim.
const rows = [
[3,'classroom-location','教室','この学校の教室は一階です。会社の会議室は三階です。','Theo thông tin này, phòng học của trường ở tầng nào?',['tầng một','tầng ba','chưa nói vị trí phòng học'],0,'教室 là phòng học: この学校の教室は一階です nêu tầng một. 三階 ở câu sau là vị trí phòng họp của công ty, không phải phòng học.','1237150'],
[3,'meeting-not-class','会議室','ここは会社の会議室です。学校の教室ではありません。','Nơi người nói đang chỉ được giới thiệu là gì?',['phòng học của trường','phòng họp của công ty','nhà ăn của công ty'],1,'会議室 là phòng họp. 会社の cho biết thuộc công ty; 教室ではありません phủ định việc đó là phòng học, không phủ định câu giới thiệu trước.','1198380'],
[3,'stairs-direction','階段','このデパートの階段はあちらです。トイレはこちらです。','Người muốn tìm cầu thang được chỉ hướng nào?',['phía/chỗ này: こちら','chưa có chỉ dẫn','phía/chỗ kia: あちら'],2,'階段 chỉ cầu thang bộ. Câu đầu gắn cầu thang với あちら, phía kia; こちら ở câu sau chỉ nhà vệ sinh. Không đổi hai địa điểm.','1203090'],
[3,'sales-section','売り場','ここは靴の売り場です。かばんの売り場は二階です。','売り場 trong hai câu chỉ loại nơi nào?',['khu/quầy bán hàng','phòng học','nhà vệ sinh'],0,'売り場 là khu/quầy bán hàng; 靴の売り場 là khu bán giày. Khu bán cặp được nói ở tầng hai, không phải chỗ được chỉ bằng ここ.','1588550'],
[3,'post-office-not-bank','郵便局','あそこは日本の郵便局です。銀行ではありません。','Nơi được chỉ phía xa là cơ sở nào?',['ngân hàng','bưu điện','nhà ga'],1,'郵便局 là bưu điện. 銀行ではありません nói không phải ngân hàng. Không suy thêm địa chỉ, giờ mở cửa hoặc dịch vụ cụ thể.','1542430'],
[3,'bank-floor','銀行','この銀行の受付は一階です。郵便局の受付は二階です。','Người đến quầy tiếp nhận của ngân hàng cần tìm tầng nào?',['tầng hai','tầng ba','tầng một'],2,'銀行 là ngân hàng; この銀行の受付は一階です chỉ quầy tiếp nhận của ngân hàng ở tầng một. 二階 thuộc quầy tiếp nhận bưu điện, không phải quầy ngân hàng.','1243490'],
[4,'wake-action','起きます','私は毎朝五時半に起きます。ミンさんは六時に起きます。','Người kể làm gì lúc 5 giờ rưỡi mỗi sáng?',['thức dậy','đi ngủ','làm việc'],0,'起きます trong lịch sinh hoạt này là thức dậy. 五時半に là lúc 5 giờ rưỡi; 六時 thuộc lịch của Minh, không phải người kể.','1223640'],
[4,'sleep-at-night','寝ます','私は夜十一時に寝ます。日曜日は午前八時に起きます。','Hoạt động người kể nêu lúc 11 giờ đêm là gì?',['thức dậy','đi ngủ','đi làm'],1,'寝ます ở đây chỉ đi ngủ. 起きます ở câu sau là thức dậy vào sáng Chủ nhật; không đảo hai hoạt động hoặc lấy 8 giờ làm giờ ngủ.','1360010'],
[4,'work-and-negative','働きます','土曜日は午前九時から午後一時まで働きます。日曜日は働きません。','Thông tin nào giữ đúng lịch và nghĩa phủ định?',['không làm cả thứ Bảy lẫn Chủ nhật','làm cả thứ Bảy lẫn Chủ nhật','làm thứ Bảy, không làm Chủ nhật'],2,'働きます là làm việc; から…まで nêu khoảng 9 giờ sáng đến 1 giờ chiều thứ Bảy. 働きません chỉ phủ định làm việc Chủ nhật, không khẳng định sẽ làm gì khác.','1451150'],
[4,'yesterday-versus-today','昨日','昨日の午後は勉強しました。今日の午後は勉強しません。','Việc học được nêu là đã diễn ra vào ngày nào?',['hôm qua','hôm nay','ngày mai'],0,'昨日 là hôm qua và 勉強しました là đã học. 今日は勉強しません nói hôm nay không học; không có dữ kiện về ngày mai.','1579260'],
[4,'night-frequency','毎晩','毎晩、午後十時に寝ます。毎朝、午前六時に起きます。','毎晩 trong câu đầu cho biết việc đi ngủ lúc 10 giờ lặp lại thế nào?',['mỗi sáng','mỗi tối','chỉ một tối hôm qua'],1,'毎晩 là mỗi tối/đêm. 毎朝 ở câu sau là mỗi sáng và gắn với thức dậy; không đồng nhất hai thời điểm hoặc đổi sang chỉ một lần.','1524730'],
[4,'next-week-saturday','来週','今週の土曜日は休みです。来週の土曜日は午前九時から働きます。','Buổi làm bắt đầu lúc 9 giờ sáng thuộc thứ Bảy nào?',['thứ Bảy tuần này','thứ Bảy tuần trước','thứ Bảy tuần sau'],2,'来週 là tuần sau; 来週の土曜日 gắn với buổi làm từ 9 giờ sáng. 今週の土曜日 được nói là ngày nghỉ, không phải buổi làm ấy.','1548010'],
[5,'bicycle-leg','自転車','銀行から学校まで自転車で行きます。学校から駅までバスで行きます。','Chặng ngân hàng đến trường đi bằng phương tiện nào?',['xe đạp','xe buýt','tàu điện'],0,'自転車 là xe đạp, gắn với chặng 銀行から学校まで. バス là xe buýt của chặng sau từ trường đến ga; không dùng đáp án chặng sau cho chặng đầu.','1318290'],
[5,'flight-then-train','飛行機','私は飛行機で日本へ行きます。日本の駅から学校まで電車で行きます。','Phương tiện người kể dùng để đi đến Nhật trong câu đầu là gì?',['tàu điện','máy bay','tàu thủy'],1,'飛行機 là máy bay. 電車 ở câu sau chỉ chặng từ ga đến trường tại Nhật; không phủ định hay thay thế phương tiện của chặng đến Nhật.','1485470'],
[5,'ship-traveler','船','先生は船で日本へ行きました。学生は飛行機で日本へ行きました。','Ai được nói là đã đi đến Nhật bằng tàu/thuyền đường thủy?',['người đang đi học','cả hai','giáo viên'],2,'船 chỉ tàu/thuyền đường thủy trong câu này; chủ đề 先生は là giáo viên. 学生は gắn với 飛行機, máy bay, không phải cùng phương tiện.','1602800'],
[5,'return-not-outbound','帰ります','今日は会社から帰ります。明日は学校へ行きます。','帰ります trong câu đầu diễn tả hành động nào?',['trở về','đến trường vào ngày mai','đón một người đến công ty'],0,'帰ります là trở về; 会社から nêu nơi rời đi. Câu không nêu cụ thể điểm về. Câu sau là kế hoạch đi đến trường ngày mai, một hành động khác.','1221270'],
[5,'alone-day','一人で','月曜日は一人で学校へ行きます。火曜日は先生と学校へ行きます。','Ngày nào người kể đi đến trường không có người đi cùng?',['thứ Ba','thứ Hai','cả hai ngày'],1,'一人で là một mình, gắn với thứ Hai. 先生と ở câu sau cho biết thứ Ba đi cùng giáo viên; không phải cả hai ngày đều một mình.','1163700'],
[5,'friend-companion','友達','日曜日に友達と銀行へ行きます。月曜日は一人で会社へ行きます。','Theo đoạn này, người kể đi với bạn vào dịp nào?',['thứ Hai đi công ty','cả hai ngày đều đi cùng bạn','Chủ nhật đi ngân hàng'],2,'友達 là bạn bè; 友達と gắn với đi ngân hàng Chủ nhật. 一人で ở câu thứ hai nói đi một mình đến công ty thứ Hai.','1540170'],
];
export function contextualBatchFor(n){return rows.filter(r=>r[0]===n).map(([lesson,key,word,passage,prompt,choices,answer,explanation,entryId])=>({
 id:'n5-assessment-r1-'+String(lesson).padStart(2,'0')+'-context-b-'+key,
 assessment:true,sourceLessonId:'mnn-'+String(lesson).padStart(2,'0'),
 prompt:passage+'\n'+prompt,choices:[...choices],answer,explanation,
 skill:'từ theo ngữ cảnh',assessesWords:[word],wordKey:word,
 usageId:'mnn-'+String(lesson).padStart(2,'0')+':'+word,
 sourceEvidence:{dictionary:'JMdict',entryId,senseIds:[entryId+'-s0'],reviewedAt:'2026-11-13',scope:'Existing selected English lexical sense compared; context authored/reviewed by AI, not independent academic approval'},
 validationStatus:'source-compared lexical meaning; authoring AI context review only',
 assessmentScope:'Meaning recognition in a new written context only; not listening, unaided recall, speech, delayed retention, every sense or JLPT score',
}));}
