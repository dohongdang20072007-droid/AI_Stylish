/**
 * data/feed.js
 * Dữ liệu Sàn Giao Lưu Thế Giới (The Nexus Feed)
 * Chứa các bản phối mẫu từ cộng đồng sinh viên UET & các nhà thiết kế số
 */
const initialNexusFeed = [
  {
    id: "post_1",
    author: {
      name: "Trần Minh",
      username: "@minhtran_uet",
      avatar: "👨‍💻",
      badge: "AI Architect · UET",
      gender: "nam"
    },
    title: "Cyber-Warrior: Áo Tấc Ngũ Thân x Cargo Techwear",
    caption: "Khi phong thái nho nhã của áo tấc tay thụng gặp gỡ form túi hộp thô ráp của techwear tương lai. Bản phối tạo cảm giác như một hiệp sĩ xuyên không về chốn phồn hoa đô hội.",
    theme: "pha_cach",
    themeLabel: "DẠO PHỐ NEON",
    timestamp: "15 phút trước",
    image: "assets/images/real_renders/real_render_aotac_cargo.png",
    likes: 128,
    likedByMe: false,
    outfitConfig: {
      ao: "ao_tac",
      quan: "quan_cargo",
      phukien: "kinh_cyberpunk_neon",
      giay: "sneaker_chunky_ham_ho",
      theme: "pha_cach",
      colors: { ao: "original", quan: "original", phukien: "indigo", giay: "original" }
    },
    tags: ["#AoTac", "#CargoTechwear", "#GenZRemix", "#UET_Hackathon"],
    comments: [
      { id: "c1", user: "Hà My UET", text: "Phối màu đỉnh quá anh ơi, nẹp áo tấc đứng form cực kỳ!", time: "10 phút trước" },
      { id: "c2", user: "Đăng Visual", text: "Remix ngay đi dạo phố Tạ Hiện cuối tuần này!", time: "5 phút trước" }
    ]
  },
  {
    id: "post_2",
    author: {
      name: "Nguyễn Hà My",
      username: "@hamy_stylist",
      avatar: "👩‍🎨",
      badge: "Thủ Khoa Hệ Thống Thông Tin",
      gender: "nu"
    },
    title: "High-Low Heritage: Áo Dài Truyền Thống x Sneaker",
    caption: "Phá bỏ định kiến cổ phục chỉ đóng khung trong bảo tàng. Áo dài truyền thống kết hợp giày sneaker cho bước đi tự tin giữa dạ tiệc đương đại.",
    theme: "sang_trong",
    themeLabel: "DẠ TIỆC ĐƯƠNG ĐẠI",
    timestamp: "1 giờ trước",
    image: "assets/images/real_renders/real_render_nhatbinh_sneaker.png",
    likes: 256,
    likedByMe: true,
    outfitConfig: {
      ao: "female_ao_dai_truyen_thong",
      quan: "female_vay_xep_ly",
      phukien: null,
      giay: "female_sneaker",
      theme: "sang_trong",
      colors: { ao: "gold", quan: "original", phukien: "original", giay: "original" }
    },
    tags: ["#NhatBinh", "#SneakerChunky", "#HighLowFusion", "#RoyalGlow"],
    comments: [
      { id: "c3", user: "Quốc Bảo", text: "Tà áo thêu phượng hoàng nhìn quyền lực dã man!", time: "45 phút trước" },
      { id: "c4", user: "Lê Lan", text: "Đã thử remix và thêm hoa tai bạc, kết quả mê mẩn!", time: "30 phút trước" }
    ]
  },
  {
    id: "post_3",
    author: {
      name: "Trần Đăng",
      username: "@dang_heritage",
      avatar: "🧑‍🎨",
      badge: "Lead Visual Director",
      gender: "nam"
    },
    title: "Cyber-Warrior: Áo Tấc x Cargo Techwear",
    caption: "Áo Tấc truyền thống kết hợp cùng cargo jean và phụ kiện hiện đại, tạo nên bản phối Việt phục mang tinh thần dạo phố đương đại.",
    theme: "trang_nghiem",
    themeLabel: "ĐI LỄ CHÙA / LỄ HỘI",
    timestamp: "3 giờ trước",
    image: "assets/images/real_renders/real_render_aotac_cargo.png",
    likes: 194,
    likedByMe: false,
    outfitConfig: {
      ao: "ao_tac",
      quan: "quan_cargo",
      phukien: "kinh_cyberpunk_neon",
      giay: "sneaker_chunky_ham_ho",
      theme: "trang_nghiem",
      colors: { ao: "emerald", quan: "original", phukien: "original", giay: "original" }
    },
    tags: ["#GiaoLinh", "#CombatBoots", "#SiPhuDaiViet", "#CyberZen"],
    comments: [
      { id: "c5", user: "Minh Thư", text: "Trang nghiêm mà vẫn rất điện ảnh!", time: "2 giờ trước" }
    ]
  },
  {
    id: "post_4",
    author: {
      name: "Hải An",
      username: "@haian_y2k",
      avatar: "✨",
      badge: "Gen Z Fashionista",
      gender: "nu"
    },
    title: "Y2K Bắc Bộ: Áo Yếm Lụa Đào x Denim Rách Cạp Trễ",
    caption: "Mảnh yếm thắm bờ ngực tròn trịa của thiếu nữ Kinh Bắc xưa, remix cùng quần jeans wash bạc bụi bặm. Nét duyên thầm thôn dã nay trở thành biểu tượng quyến rũ tự do!",
    theme: "pha_cach",
    themeLabel: "DẠO PHỐ NEON",
    timestamp: "5 giờ trước",
    image: "assets/images/real_renders/real_render_aoyem_jeans.png",
    likes: 312,
    likedByMe: false,
    outfitConfig: {
      ao: "ao_yem",
      quan: "female_cargo_jean",
      phukien: null,
      giay: "female_sneaker",
      theme: "pha_cach",
      colors: { ao: "crimson", quan: "original", phukien: "original", giay: "original" }
    },
    tags: ["#AoYem", "#JeansRach", "#Y2KHeritage", "#ThoiTrangViet"],
    comments: [
      { id: "c6", user: "Hoàng Long", text: "Tương phản thị giác quá xuất sắc, nhìn là muốn thử ngay!", time: "4 giờ trước" }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.initialNexusFeed = initialNexusFeed;
}
