import fs from 'node:fs';

let src = fs.readFileSync('./src/listening-content.js','utf8');

// Add format field to each task object
// Format types: 聴き取り (listening comprehension), 即時応答 (instant response), 題文理解 (text comprehension)

const replacements = [
  // Lesson 1
  ["vi:'Rất vui được gặp. Tôi là Linh, người Việt Nam, sinh viên đại học, 20 tuổi (nhân vật giả). Rất mong được làm quen.',questions:[Q('m01-listen-role'", "vi:'Rất vui được gặp. Tôi là Linh, người Việt Nam, sinh viên đại học, 20 tuổi (nhân vật giả). Rất mong được làm quen.',format:'聴き取り',questions:[Q('m01-listen-role'"],
  ["vi:'Nam là sinh viên à? Không, là nhân viên công ty. Hana cũng là nhân viên công ty.',questions:[Q('m01-listen-negative'", "vi:'Nam là sinh viên à? Không, là nhân viên công ty. Hana cũng là nhân viên công ty.',format:'聴き取り',questions:[Q('m01-listen-negative'"],
  // Lesson 2
  ["vi:'Đây là sách của Hana. Đó là vở của Linh.',questions:[Q('m02-listen-owner'", "vi:'Đây là sách của Hana. Đó là vở của Linh.',format:'聴き取り',questions:[Q('m02-listen-owner'"],
  // Lesson 3
  ["vi:'Tiếp tân ở tầng một. Phòng học ở tầng hai. Vở này giá 300 yên.',questions:[Q('m03-listen-floor'", "vi:'Tiếp tân ở tầng một. Phòng học ở tầng hai. Vở này giá 300 yên.',format:'聴き取り',questions:[Q('m03-listen-floor'"],
  // Lesson 4
  ["vi:'Thư viện mở từ 9 giờ sáng đến 5 giờ chiều; nghỉ Chủ nhật.',questions:[Q('m04-listen-start'", "vi:'Thư viện mở từ 9 giờ sáng đến 5 giờ chiều; nghỉ Chủ nhật.',format:'聴き取り',questions:[Q('m04-listen-start'"],
  // Lesson 5
  ["vi:'Tôi về ngày 20 tháng 4; đi tàu điện đến ga, cùng một người bạn.',questions:[Q('m05-listen-date'", "vi:'Tôi về ngày 20 tháng 4; đi tàu điện đến ga, cùng một người bạn.',format:'聴き取り',questions:[Q('m05-listen-date'"],
  // Lesson 6 - invitation = 即時応答
  ["vi:'Cùng uống trà nhé? Hay đấy. Gặp ở ga lúc 3 giờ nhé.',questions:[Q('m06-listen-time'", "vi:'Cùng uống trà nhé? Hay đấy. Gặp ở ga lúc 3 giờ nhé.',format:'即時応答',questions:[Q('m06-listen-time'"],
  // Lesson 7
  ["vi:'Tôi tặng Hana sách và nhận quà từ Linh.',questions:[Q('m07-listen-receive'", "vi:'Tôi tặng Hana sách và nhận quà từ Linh.',format:'聴き取り',questions:[Q('m07-listen-receive'"],
  // Lesson 8
  ["vi:'Phòng này nhỏ nhưng sạch/đẹp, rất yên tĩnh.',questions:[Q('m08-listen-size'", "vi:'Phòng này nhỏ nhưng sạch/đẹp, rất yên tĩnh.',format:'聴き取り',questions:[Q('m08-listen-size'"],
  // Lesson 9
  ["vi:'Tôi thích âm nhạc. Nhưng hôm nay không có thời gian nên không đi.',questions:[Q('m09-listen-like'", "vi:'Tôi thích âm nhạc. Nhưng hôm nay không có thời gian nên không đi.',format:'聴き取り',questions:[Q('m09-listen-like'"],
  // Lesson 10
  ["vi:'Sách ở trên bàn, mèo ở dưới ghế; Hana ở trong phòng.',questions:[Q('m10-listen-book'", "vi:'Sách ở trên bàn, mèo ở dưới ghế; Hana ở trong phòng.',format:'聴き取り',questions:[Q('m10-listen-book'"],
];

let count=0;
for(const [oldS,newS] of replacements){
  if(src.includes(oldS)){
    src=src.replace(oldS,newS);
    count++;
  } else {
    console.log('NOT FOUND:',oldS.substring(0,60));
  }
}
fs.writeFileSync('./src/listening-content.js',src);
console.log('Added format to',count,'tasks');

// Now verify
import('../src/listening-content.js').then(m=>{
  const lc=m.listeningContent;
  let total=0, fmtCounts={};
  for(const [n,tasks] of Object.entries(lc)){
    for(const t of tasks){
      total++;
      const f=t.format||'unspecified';
      fmtCounts[f]=(fmtCounts[f]||0)+1;
    }
  }
  console.log('Total tasks:',total);
  console.log('Format counts:',fmtCounts);
});
