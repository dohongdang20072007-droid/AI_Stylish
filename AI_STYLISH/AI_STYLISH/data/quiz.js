/**
 * data/quiz.js
 * Ngân hàng câu hỏi Khảo thí Di sản Đại Việt (The Heritage Vault)
 * Dành cho tính năng Gamification mở khóa bảo vật triều đình
 */
const heritageQuizPool = [
  {
    id: "q1",
    question: "Dải viền ngũ sắc trên cổ tay áo Nhật Bình triều Nguyễn biểu trưng cho triết lý văn hóa nào?",
    options: [
      { key: "A", text: "Ngũ hành tương sinh (Kim - Mộc - Thủy - Hỏa - Thổ)" },
      { key: "B", text: "Năm phẩm trật cao quý của cung tần mỹ nữ" },
      { key: "C", text: "Năm phương hướng bảo hộ kinh thành Huế" },
      { key: "D", text: "Năm triều đại rực rỡ nhất trong lịch sử Đại Việt" }
    ],
    correct: "A",
    explanation: "Dải ngũ sắc gồm 5 màu vàng, xanh, đỏ, trắng, đen tượng trưng cho Ngũ hành tương sinh, cầu mong sự thái bình và vạn vật sinh sôi."
  },
  {
    id: "q2",
    question: "Tên gọi 'Áo Tấc' (dạng áo ngũ thân tay thụng thời Nguyễn) bắt nguồn từ đặc điểm kích thước nào?",
    options: [
      { key: "A", text: "Vạt áo cách mặt đất đúng một tấc cổ" },
      { key: "B", text: "Ống tay áo buông rộng đo đúng một tấc (khoảng 10-12cm khi may biên)" },
      { key: "C", text: "Độ rộng của cổ áo dựng cao một tấc" },
      { key: "D", text: "Mỗi đường may nối thân cách nhau đúng một tấc" }
    ],
    correct: "B",
    explanation: "Áo Tấc có phần thụng tay rộng một tấc đo cổ, khi chắp tay trước ngực tạo nên thế đứng nghiêm trang đĩnh đạc của bậc trí giả."
  },
  {
    id: "q3",
    question: "Áo Giao Lĩnh (cổ vạt chéo) là trang phục cổ xưa nhất của người Việt, phát triển rực rỡ qua các triều đại nào?",
    options: [
      { key: "A", text: "Triều Nguyễn (1802 - 1945)" },
      { key: "B", text: "Thời Pháp thuộc (1884 - 1945)" },
      { key: "C", text: "Thời Lý - Trần - Hậu Lê (TK 11 - TK 18)" },
      { key: "D", text: "Thời kỳ Tây Sơn (1778 - 1802)" }
    ],
    correct: "C",
    explanation: "Áo Giao Lĩnh với hai vạt giao nhau trước ngực thịnh hành từ thời Lý, Trần kéo dài qua thời Lê, là dấu ấn trang phục cổ kính bậc nhất."
  },
  {
    id: "q4",
    question: "Năm chiếc khuy cài trên Áo Ngũ Thân truyền thống biểu đạt trọn vẹn cho giá trị đạo lý nào?",
    options: [
      { key: "A", text: "Ngũ thường Nho giáo: Nhân - Lễ - Nghĩa - Trí - Tín" },
      { key: "B", text: "Ngũ tạng trong cơ thể con người: Tâm - Can - Tỳ - Phế - Thận" },
      { key: "C", text: "Năm ngọn núi Ngũ Hành Sơn linh thiêng" },
      { key: "D", text: "Năm đức tính của người phụ nữ công dung ngôn hạnh" }
    ],
    correct: "A",
    explanation: "Năm hạt cúc áo ngũ thân nhắc nhở người mặc luôn giữ tròn Ngũ thường: Nhân, Lễ, Nghĩa, Trí, Tín khi đối nhân xử thế."
  },
  {
    id: "q5",
    question: "Đại lễ phục Nhật Bình triều Nguyễn quy định màu vàng chính sắc (chính hoàng) độc quyền cho ai?",
    options: [
      { key: "A", text: "Hoàng Thái Hậu và Hoàng Hậu" },
      { key: "B", text: "Tất cả các Công chúa ruột của Hoàng đế" },
      { key: "C", text: "Các vị Nữ quan Chánh nhất phẩm" },
      { key: "D", text: "Vợ của các vị Hoàng thân quốc thích" }
    ],
    correct: "A",
    explanation: "Chính hoàng (vàng tươi chính sắc) chỉ dành riêng cho bậc Mẫu nghi thiên hạ (Hoàng Thái Hậu, Hoàng Hậu). Công chúa mặc sắc đỏ, mệnh phụ mặc tím huế hoặc lam."
  },
  {
    id: "q6",
    question: "Nếp quấn phía trước của Khăn Đóng (khăn xếp) truyền thống nam giới thường tạo thành hình chữ gì?",
    options: [
      { key: "A", text: "Chữ Nhất (一) hoặc chữ Nhân (人)" },
      { key: "B", text: "Chữ Thọ (壽) cầu bình an" },
      { key: "C", text: "Chữ Phúc (福) đón tài lộc" },
      { key: "D", text: "Chữ Vương (王) của bậc quân vương" }
    ],
    correct: "A",
    explanation: "Khăn đóng nam giới tạo hình chữ Nhất thể hiện sự ngay thẳng, hoặc chữ Nhân thể hiện lòng nhân hậu của người trượng phu."
  },
  {
    id: "q7",
    question: "Nón Lá Bài Thơ - tuyệt phẩm gắn liền với xứ Huế - có đặc điểm chế tác độc nhất vô nhị nào?",
    options: [
      { key: "A", text: "Được đan bằng sợi tơ tằm óng ánh vàng" },
      { key: "B", text: "Khi soi dưới ánh sáng mặt trời sẽ hiện lên những bài thơ và tranh phong cảnh Cố Đô" },
      { key: "C", text: "Có thể gập gọn lại như chiếc quạt giấy" },
      { key: "D", text: "Được tẩm hương hoa hồi thơm suốt nhiều năm" }
    ],
    correct: "B",
    explanation: "Nghệ nhân xứ Huế khéo léo chèn giữa hai lớp lá kè những bài thơ chữ Hán/Nôm hoặc tranh phong cảnh chùa Thiên Mụ, soi ra sáng mới thấy."
  },
  {
    id: "q8",
    question: "Tại sao Áo Ngũ Thân lại được cấu tạo từ đúng 5 thân vải ghép lại?",
    options: [
      { key: "A", text: "Để tiết kiệm khổ vải lụa dệt hẹp thời xưa" },
      { key: "B", text: "Tượng trưng cho Tứ thân phụ mẫu (cha mẹ đôi bên) và một thân con mặc trong" },
      { key: "C", text: "Biểu trưng cho 5 vùng địa lý của nước Đại Nam" },
      { key: "D", text: "Cả đáp án A và B đều đúng" }
    ],
    correct: "D",
    explanation: "Khổ vải dệt thủ công xưa chỉ rộng 35-40cm nên phải ghép 5 thân, đồng thời mang hàm ý triết lý sâu sắc: tứ thân ngoài bao bọc thân con bên trong, tượng trưng cho tình phụ mẫu."
  },
  {
    id: "q9",
    question: "Đại lễ Tế Giao tại Đàn Nam Giao triều Nguyễn có ý nghĩa thiêng liêng nào đối với đất nước?",
    options: [
      { key: "A", text: "Thi tuyển chọn trạng nguyên và tiến sĩ cả nước" },
      { key: "B", text: "Hoàng đế đại diện thần dân tế lễ Trời Đất cầu mưa thuận gió hòa, quốc thái dân an" },
      { key: "C", text: "Lễ duyệt binh thị uy sức mạnh quân đội hoàng gia" },
      { key: "D", text: "Lễ tấn phong tước vị cho hoàng thân quốc thích" }
    ],
    correct: "B",
    explanation: "Lễ Tế Giao là đại điển tối thượng hàng đầu của triều đình, nơi Hoàng đế thay mặt toàn dân kính tế Trời Đất (Thiên - Địa) để cầu thái bình thịnh trị."
  },
  {
    id: "q10",
    question: "Mũ Cánh Chuồn (Mũ Ô Sa) với hai cánh chuồn xòe ngang là phụ kiện phẩm phục đặc trưng của ai?",
    options: [
      { key: "A", text: "Các vị quan văn, quan võ triều đình khi bái yết Hoàng đế tại đại triều" },
      { key: "B", text: "Chỉ dành riêng cho Hoàng Thái Hậu trong nội cung" },
      { key: "C", text: "Tầng lớp nông dân Bắc Bộ khi biểu diễn chèo" },
      { key: "D", text: "Thương nhân ngoại quốc khi buôn bán tại thương cảng Phố Hiến" }
    ],
    correct: "A",
    explanation: "Mũ Cánh Chuồn làm bằng lông đuôi ngựa hoặc kim loại phủ the đen, gắn hai cánh chuồn ngang nghiêm trang, là biểu trưng quyền uy của quan lại bái yết triều đình."
  }
];

if (typeof window !== 'undefined') {
  window.heritageQuizPool = heritageQuizPool;
}
