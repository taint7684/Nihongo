import fs from 'node:fs';

let src = fs.readFileSync('./src/listening-content.js','utf8');

// Add format to remaining lessons 11-25 and pushed tasks
const replacements = [
  // Lesson 11
  ["vi:'Có bốn sinh viên. Họ học hai giờ mỗi ngày và đến thư viện ba lần mỗi tuần.',questions:[Q('m11-listen-people'", "vi:'Có bốn sinh viên. Họ học hai giờ mỗi ngày và đến thư viện ba lần mỗi tuần.',format:'聴き取り',questions:[Q('m11-listen-people'"],
  // Lesson 12
  ["vi:'Hôm qua trời lạnh. Tàu điện nhanh hơn xe buýt, nhưng xe buýt rẻ hơn.',questions:[Q('m12-listen-weather'", "vi:'Hôm qua trời lạnh. Tàu điện nhanh hơn xe buýt, nhưng xe buýt rẻ hơn.',format:'聴き取り',questions:[Q('m12-listen-weather'"],
  // Lesson 13
  ["vi:'Cuối tuần muốn đi công viên dạo, cũng muốn có sách mới; hôm nay không muốn đi đâu.',questions:[Q('m13-listen-purpose'", "vi:'Cuối tuần muốn đi công viên dạo, cũng muốn có sách mới; hôm nay không muốn đi đâu.',format:'聴き取り',questions:[Q('m13-listen-purpose'"],
  // Lesson 14
  ["vi:'Tôi đang viết thư. Xin đợi một chút. Lát nữa tôi giúp.',questions:[Q('m14-listen-now'", "vi:'Tôi đang viết thư. Xin đợi một chút. Lát nữa tôi giúp.',format:'聴き取り',questions:[Q('m14-listen-now'"],
  // Lesson 15
  ["vi:'Ở đây được đọc sách, không được chụp ảnh và được dùng máy tính.',questions:[Q('m15-listen-photo'", "vi:'Ở đây được đọc sách, không được chụp ảnh và được dùng máy tính.',format:'聴き取り',questions:[Q('m15-listen-photo'"],
  // Lesson 16
  ["vi:'Ăn sáng xong mới đến trường. Trường lớn và yên tĩnh.',questions:[Q('m16-listen-first'", "vi:'Ăn sáng xong mới đến trường. Trường lớn và yên tĩnh.',format:'聴き取り',questions:[Q('m16-listen-first'"],
  // Lesson 17
  ["vi:'Ngày mai phải đến lúc 7 giờ. Đừng quên sách. Không cần mang cơm hộp. お弁当: cơm hộp; 持って来ます: mang đến, cụm hỗ trợ.',questions:[Q('m17-listen-time'", "vi:'Ngày mai phải đến lúc 7 giờ. Đừng quên sách. Không cần mang cơm hộp. お弁当: cơm hộp; 持って来ます: mang đến, cụm hỗ trợ.',format:'聴き取り',questions:[Q('m17-listen-time'"],
  // Lesson 18
  ["vi:'Sở thích là nghe nhạc. Cũng hát được bằng tiếng Nhật. Trước khi ngủ đọc sách.',questions:[Q('m18-listen-ability'", "vi:'Sở thích là nghe nhạc. Cũng hát được bằng tiếng Nhật. Trước khi ngủ đọc sách.',format:'聴き取り',questions:[Q('m18-listen-ability'"],
  // Lesson 19
  ["vi:'Đã từng đến Nhật. Chủ nhật thường đọc sách, đi dạo và có thể việc khác. Gần đây trời đã ấm lên. 最近: gần đây, từ hỗ trợ.',questions:[Q('m19-listen-experience-q'", "vi:'Đã từng đến Nhật. Chủ nhật thường đọc sách, đi dạo và có thể việc khác. Gần đây trời đã ấm lên. 最近: gần đây, từ hỗ trợ.',format:'聴き取り',questions:[Q('m19-listen-experience-q'"],
  // Lesson 20 - instant response
  ["vi:'Ngày mai đi thư viện không? Có. Hôm nay bận nhưng mai rảnh. Vậy 3 giờ ở ga nhé. Câu cuối lược ý gặp nhau trong ngữ cảnh.',questions:[Q('m20-listen-when'", "vi:'Ngày mai đi thư viện không? Có. Hôm nay bận nhưng mai rảnh. Vậy 3 giờ ở ga nhé. Câu cuối lược ý gặp nhau trong ngữ cảnh.',format:'即時応答',questions:[Q('m20-listen-when'"],
  // Lesson 21
  ["vi:'Người nói thấy thị trấn tiện vì gần ga. Hana nói mai đi thư viện. Người nói dự đoán mưa.',questions:[Q('m21-listen-reason'", "vi:'Người nói thấy thị trấn tiện vì gần ga. Hana nói mai đi thư viện. Người nói dự đoán mưa.',format:'聴き取り',questions:[Q('m21-listen-reason'"],
  // Lesson 22
  ["vi:'Người mặc áo trắng là Hana. Sách Hana mua ở trên bàn. Người nói sẽ đọc sách ấy ngày mai.',questions:[Q('m22-listen-person'", "vi:'Người mặc áo trắng là Hana. Sách Hana mua ở trên bàn. Người nói sẽ đọc sách ấy ngày mai.',format:'聴き取り',questions:[Q('m22-listen-person'"],
  // Lesson 23
  ["vi:'Đi thẳng đường này. Rẽ trái ở góc tiếp thì có trường. Trường cạnh ga.',questions:[Q('m23-listen-turn'", "vi:'Đi thẳng đường này. Rẽ trái ở góc tiếp thì có trường. Trường cạnh ga.',format:'聴き取り',questions:[Q('m23-listen-turn'"],
  // Lesson 24
  ["vi:'Hana cho người nói sách và dạy tiếng Nhật cho người nói; người nói nấu ăn cho Hana.',questions:[Q('m24-listen-teach'", "vi:'Hana cho người nói sách và dạy tiếng Nhật cho người nói; người nói nấu ăn cho Hana.',format:'聴き取り',questions:[Q('m24-listen-teach'"],
  // Lesson 25
  ["vi:'Mưa thì đọc ở nhà, không mưa đi công viên. Bạn dù bận vẫn học chút; học xong cùng uống trà.',questions:[Q('m25-listen-rain'", "vi:'Mưa thì đọc ở nhà, không mưa đi công viên. Bạn dù bận vẫn học chút; học xong cùng uống trà.',format:'聴き取り',questions:[Q('m25-listen-rain'"],
  // Pushed tasks
  ["vi:'Quầy tiếp nhận ở tầng 4, phòng học tầng 6; vở 600 yên, túi 8000 yên.',questions:[Q('m03-lp-floor'", "vi:'Quầy tiếp nhận ở tầng 4, phòng học tầng 6; vở 600 yên, túi 8000 yên.',format:'聴き取り',questions:[Q('m03-lp-floor'"],
  ["vi:'Thư viện mở từ 9:15 sáng đến 5:30 chiều, nghỉ thứ Tư. Người nói đi lúc 10 giờ.',questions:[Q('m04-lh-end'", "vi:'Thư viện mở từ 9:15 sáng đến 5:30 chiều, nghỉ thứ Tư. Người nói đi lúc 10 giờ.',format:'聴き取り',questions:[Q('m04-lh-end'"],
  ["vi:'Người nói về nước ngày 14 tháng 5, đi tàu cùng bạn. Hana về ngày 20 tháng 4 một mình.',questions:[Q('m05-ld-date'", "vi:'Người nói về nước ngày 14 tháng 5, đi tàu cùng bạn. Hana về ngày 20 tháng 4 một mình.',format:'聴き取り',questions:[Q('m05-ld-date'"],
  ["vi:'Gia đình bốn người, có một chị gái. Mỗi ngày học tiếng Nhật 30 phút, một tuần đi thư viện hai lần.',questions:[Q('m11-lc-people'", "vi:'Gia đình bốn người, có một chị gái. Mỗi ngày học tiếng Nhật 30 phút, một tuần đi thư viện hai lần.',format:'聴き取り',questions:[Q('m11-lc-people'"],
];

let count=0;
for(const [oldS,newS] of replacements){
  if(src.includes(oldS)){
    src=src.replace(oldS,newS);
    count++;
  } else {
    console.log('NOT FOUND:',oldS.substring(0,70));
  }
}
fs.writeFileSync('./src/listening-content.js',src);
console.log('Added format to',count,'more tasks');
