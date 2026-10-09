/**
 * Danh mục trang phục đồng bộ với tên file thực tế trong assets/images/items.
 */
const itemsData = [
  {
    id: 'female_ao_ba_ba',
    name: 'Áo Bà Ba',
    category: 'ao',
    era: 'Trang phục dân gian Nam Bộ',
    style: 'traditional',
    gender: 'nu',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_ao_ba_ba.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_ao_ba_ba.PNG',
    history: 'Áo bà ba gắn với đời sống thường nhật và vẻ đẹp mộc mạc của người dân Nam Bộ.',
    usage_context: 'Phối cùng quần dài hoặc phụ kiện hiện đại để tạo diện mạo gần gũi, linh hoạt.'
  },
  {
    id: 'female_ao_dai_truyen_thong',
    name: 'Áo Dài Truyền Thống',
    category: 'ao',
    era: 'Trang phục truyền thống Việt Nam',
    style: 'traditional',
    gender: 'nu',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_ao_dai_truyen_thong.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_ao_dai_truyen_thong.PNG',
    history: 'Áo dài là biểu tượng trang phục Việt Nam với phom áo dài ôm thân và hai tà mềm mại.',
    usage_context: 'Có thể kết hợp cùng giày hiện đại để đưa nét truyền thống vào đời sống thường nhật.'
  },
  {
    id: 'female_ao_tac_tay_thung',
    name: 'Áo Tấc Tay Thụng',
    category: 'ao',
    era: 'Triều Nguyễn (1802-1945)',
    style: 'traditional',
    gender: 'nu',
    isLocked: true,
    lockReason: 'Áo Tấc Tay Thụng đang chờ Tấm đọc tư liệu và vượt qua ải hỏi đáp lịch sử.',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_ao_tac_tay_thung.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_ao_tac_tay_thung.PNG',
    history: 'Áo Tấc với tay rộng là lễ phục trang trọng, thể hiện phong thái thanh tao và đĩnh đạc.',
    usage_context: 'Phối cùng quần hoặc giày đương đại để tạo phong cách Việt phục Remix.'
  },
  {
    id: 'female_ao_tu_than',
    name: 'Áo Tứ Thân',
    category: 'ao',
    era: 'Dân gian Bắc Bộ',
    style: 'traditional',
    gender: 'nu',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_ao_tu_than.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_ao_tu_than.PNG',
    history: 'Áo tứ thân là trang phục dân gian gắn với hình ảnh phụ nữ vùng đồng bằng Bắc Bộ.',
    usage_context: 'Kết hợp với trang phục đơn giản để làm nổi bật phom áo và nét duyên truyền thống.'
  },
  {
    id: 'female_ao_yem',
    name: 'Áo Yếm',
    category: 'ao',
    era: 'Dân gian Việt Nam',
    style: 'traditional',
    gender: 'nu',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_ao_yem.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_ao_yem.PNG',
    history: 'Áo yếm là trang phục truyền thống có lịch sử lâu đời, thường xuất hiện trong sinh hoạt dân gian.',
    usage_context: 'Phối cùng quần hoặc váy hiện đại theo phong cách giao thoa cổ truyền và đương đại.'
  },
  {
    id: 'male_ao_ngu_than',
    name: 'Áo Ngũ Thân',
    category: 'ao',
    era: 'Triều Nguyễn (1802-1945)',
    style: 'traditional',
    gender: 'nam',
    isLocked: true,
    lockReason: 'Áo ngũ thân nam là trang phục truyền thống cần vượt qua khảo thí điển chế để mở khóa.',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_ao_ngu_than.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_ao_ngu_than.PNG',
    history: 'Áo ngũ thân có cấu trúc năm thân áo, gắn với trang phục nam giới thời Nguyễn.',
    usage_context: 'Phối cùng quần sáng màu hoặc phụ kiện hiện đại để tạo bản phối giao thoa.'
  },
  {
    id: 'male_ao_tac',
    name: 'Áo Tấc',
    category: 'ao',
    era: 'Triều Nguyễn (1802-1945)',
    style: 'traditional',
    gender: 'nam',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_ao_tac.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_ao_tac.PNG',
    history: 'Áo Tấc là dạng áo ngũ thân tay thụng, thường được sử dụng trong những dịp lễ nghi trang trọng.',
    usage_context: 'Kết hợp với quần hiện đại để tạo điểm nhấn Việt phục trong phong cách thường ngày.'
  },
  {
    id: 'male_hoodie_cyber',
    name: 'Hoodie Cyber',
    category: 'ao',
    era: 'Đương đại',
    style: 'modern',
    gender: 'nam',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_hoodie_cyber.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_hoodie_cyber.PNG',
    history: 'Áo hoodie mang phom dáng streetwear đương đại, dành cho phong cách năng động.',
    usage_context: 'Phối với cargo jeans hoặc sneaker để tạo diện mạo dạo phố.'
  },
  {
    id: 'female_cargo_jean',
    name: 'Quần Cargo Jean',
    category: 'quan',
    era: 'Đương đại',
    style: 'modern',
    gender: 'nu',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_cargo_jean.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_cargo_jean.PNG',
    history: 'Quần cargo denim kết hợp chất liệu jean với các chi tiết túi tiện dụng.',
    usage_context: 'Phối cùng áo dài, áo yếm hoặc áo bà ba để tạo phong cách streetwear Việt phục.'
  },
  {
    id: 'female_quan_dai_den',
    name: 'Quần Dài Đen',
    category: 'quan',
    era: 'Trang phục truyền thống Việt Nam',
    style: 'traditional',
    gender: 'nu',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_quan_dai_den.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_quan_dai_den.PNG',
    history: 'Quần dài đen là lựa chọn nền nã, thường được phối cùng áo truyền thống.',
    usage_context: 'Kết hợp với áo dài, áo Tấc hoặc áo yếm.'
  },
  {
    id: 'female_quan_toc',
    name: 'Khăn Quấn Tóc',
    category: 'phukien',
    era: 'Trang phục truyền thống Việt Nam',
    style: 'traditional',
    gender: 'nu',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_quan_toc.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_quan_toc.PNG',
    history: 'Khăn quấn tóc là phụ kiện đội đầu giúp hoàn thiện diện mạo truyền thống.',
    usage_context: 'Phối cùng áo dài, áo tứ thân hoặc các bộ Việt phục trang trọng.'
  },
  {
    id: 'female_vay_xep_ly',
    name: 'Váy Xếp Ly',
    category: 'quan',
    era: 'Đương đại',
    style: 'modern',
    gender: 'nu',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_vay_xep_ly.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_vay_xep_ly.PNG',
    history: 'Váy xếp ly tạo chuyển động mềm mại với những nếp gấp đều và nhẹ.',
    usage_context: 'Phối cùng áo truyền thống cách tân hoặc áo hiện đại.'
  },
  {
    id: 'male_cargo_jean',
    name: 'Quần Cargo Jean',
    category: 'quan',
    era: 'Đương đại',
    style: 'modern',
    gender: 'nam',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_cargo_jean.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_cargo_jean.PNG',
    history: 'Quần cargo denim kết hợp chất liệu jean với các chi tiết túi tiện dụng.',
    usage_context: 'Phối cùng áo ngũ thân hoặc hoodie để tạo phong cách streetwear.'
  },
  {
    id: 'male_quan_lua_trang',
    name: 'Quần Lụa Trắng',
    category: 'quan',
    era: 'Trang phục truyền thống Việt Nam',
    style: 'traditional',
    gender: 'nam',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_quan_lua_trang.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_quan_lua_trang.PNG',
    history: 'Quần lụa trắng là trang phục nền thường phối cùng áo dài và áo ngũ thân.',
    usage_context: 'Kết hợp cùng áo Tấc hoặc áo ngũ thân trong bản phối trang trọng.'
  },
  {
    id: 'male_kinh_ram',
    name: 'Kính Râm',
    category: 'phukien',
    era: 'Đương đại',
    style: 'modern',
    gender: 'nam',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_kinh_ram.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_kinh_ram.PNG',
    history: 'Kính râm là phụ kiện hiện đại tạo điểm nhấn cá tính cho tổng thể trang phục.',
    usage_context: 'Phối với trang phục dạo phố hoặc các bản phối Việt phục đương đại.'
  },
  {
    id: 'female_dep_quai_thao',
    name: 'Dép Quai Thảo',
    category: 'giay',
    era: 'Trang phục truyền thống Việt Nam',
    style: 'traditional',
    gender: 'nu',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_dep_quai_thao.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_dep_quai_thao.PNG',
    history: 'Dép quai thảo gợi nhắc kiểu dáng dép truyền thống với quai ngang đặc trưng.',
    usage_context: 'Phối cùng trang phục truyền thống hoặc bản phối mang cảm hứng dân gian.'
  },
  {
    id: 'female_giay_den',
    name: 'Giày Đen',
    category: 'giay',
    era: 'Đương đại',
    style: 'modern',
    gender: 'nu',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_giay_den.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_giay_den.PNG',
    history: 'Giày đen có thiết kế linh hoạt, dễ kết hợp với nhiều phong cách.',
    usage_context: 'Phối cùng áo dài, áo Tấc hoặc trang phục thường ngày.'
  },
  {
    id: 'female_hai_theu',
    name: 'Hài Thêu',
    category: 'giay',
    era: 'Trang phục truyền thống Việt Nam',
    style: 'traditional',
    gender: 'nu',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_hai_theu.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_hai_theu.PNG',
    history: 'Hài thêu gợi nét trang trọng của phụ kiện giày dép truyền thống.',
    usage_context: 'Kết hợp với áo Tấc hoặc trang phục truyền thống trong dịp lễ hội.'
  },
  {
    id: 'female_sneaker',
    name: 'Sneaker',
    category: 'giay',
    era: 'Đương đại',
    style: 'modern',
    gender: 'nu',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_sneaker.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_sneaker.PNG',
    history: 'Sneaker mang lại sự thoải mái và tinh thần năng động cho bản phối.',
    usage_context: 'Tạo tương phản thú vị khi kết hợp với trang phục truyền thống.'
  },
  {
    id: 'male_sneaker',
    name: 'Sneaker',
    category: 'giay',
    era: 'Đương đại',
    style: 'modern',
    gender: 'nam',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_sneaker.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_sneaker.PNG',
    history: 'Sneaker mang lại sự thoải mái và tinh thần năng động cho bản phối.',
    usage_context: 'Tạo tương phản hiện đại khi kết hợp cùng Việt phục.'
  },
  {
    id: 'female_ao_cong_chua',
    name: 'Áo Công Chúa',
    category: 'ao',
    era: 'Thiết kế phục trang cách điệu',
    style: 'modern',
    gender: 'nu',
    isLocked: true,
    lockReason: 'Áo Công Chúa đang chờ Tấm đọc tư liệu và vượt qua ải hỏi đáp lịch sử.',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_ao_cong_chua.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_ao_cong_chua.PNG',
    history: 'Mẫu phục trang mang tên Áo Công Chúa trong thư viện hình ảnh; chưa có tư liệu xác định triều đại hay nguyên mẫu lịch sử.',
    usage_context: 'Dùng như phục trang trình diễn hoặc tạo hình; không xem là tư liệu phục dựng một phẩm phục cụ thể.'
  },
  {
    id: 'female_ao_croptop',
    name: 'Áo Croptop',
    category: 'ao',
    era: 'Đương đại',
    style: 'modern',
    gender: 'nu',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_ao_croptop.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_ao_croptop.PNG',
    history: 'Áo croptop là kiểu áo hiện đại có chiều dài thân áo ngắn; thư viện không ghi mốc năm hay nhà thiết kế của mẫu này.',
    usage_context: 'Phù hợp với trang phục dạo phố và các bản phối đương đại.'
  },
  {
    id: 'female_khan_vanh_day',
    name: 'Khăn Vành Dây',
    category: 'phukien',
    era: 'Phục trang truyền thống (theo tên mẫu)',
    style: 'traditional',
    gender: 'nu',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_khan_vanh_day.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_khan_vanh_day.PNG',
    history: 'Tên mẫu trong thư viện là Khăn Vành Dây; chưa có hồ sơ xác nhận niên đại hoặc vùng sử dụng riêng của hiện vật này.',
    usage_context: 'Dùng làm phụ kiện đội đầu cho bộ phục truyền thống hoặc phục trang trình diễn.'
  },
  {
    id: 'female_mu_luoi_trai',
    name: 'Mũ Lưỡi Trai',
    category: 'phukien',
    era: 'Đương đại',
    style: 'modern',
    gender: 'nu',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_mu_luoi_trai.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_mu_luoi_trai.PNG',
    history: 'Mũ lưỡi trai là phụ kiện thường ngày hiện đại; thư viện không ghi lịch sử riêng cho mẫu thiết kế này.',
    usage_context: 'Phối với áo croptop, cargo jean hoặc sneaker trong phong cách dạo phố.'
  },
  {
    id: 'female_non_la',
    name: 'Nón Lá',
    category: 'phukien',
    era: 'Phụ kiện truyền thống Việt Nam',
    style: 'traditional',
    gender: 'nu',
    isLocked: true,
    lockReason: 'Nón Lá đang chờ Tấm đọc tư liệu và vượt qua ải hỏi đáp lịch sử.',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_non_la.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_non_la.PNG',
    history: 'Nón lá là vật dụng che nắng mưa quen thuộc trong đời sống Việt; hình dáng và cách làm thay đổi theo địa phương.',
    usage_context: 'Có thể dùng cùng áo dài, áo bà ba hoặc phục trang dân gian.'
  },
  {
    id: 'female_non_quai_thao',
    name: 'Nón Quai Thao',
    category: 'phukien',
    era: 'Phụ kiện dân gian Bắc Bộ',
    style: 'traditional',
    gender: 'nu',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_non_quai_thao.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/female_non_quai_thao.PNG',
    history: 'Nón quai thao gắn với hình ảnh trang phục dân gian Bắc Bộ trong sinh hoạt và diễn xướng; mẫu trong thư viện là hình minh họa, không phải hiện vật được định danh.',
    usage_context: 'Phối cùng áo tứ thân trong tạo hình dân gian Bắc Bộ.'
  },
  {
    id: 'male_ao_linh_thoi_ly',
    name: 'Áo Lính Thời Lý',
    category: 'ao',
    era: 'Phục trang mô phỏng thời Lý',
    style: 'traditional',
    gender: 'nam',
    isLocked: true,
    lockReason: 'Áo Lính Thời Lý đang chờ Tấm đọc tư liệu và vượt qua ải hỏi đáp lịch sử.',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_ao_linh_thoi_ly.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_ao_linh_thoi_ly.PNG',
    history: 'Tên thiết kế mô phỏng trang phục người lính thời Lý; chưa có hồ sơ nguồn gốc hoặc căn cứ phục dựng riêng cho hình ảnh này.',
    usage_context: 'Dùng trong tạo hình lịch sử hoặc trình diễn, không xem là bản phục dựng đã được kiểm chứng.'
  },
  {
    id: 'male_ao_thoi_Tran',
    name: 'Áo Thời Trần',
    category: 'ao',
    era: 'Phục trang mô phỏng thời Trần',
    style: 'traditional',
    gender: 'nam',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_ao_thoi_Tran.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_ao_thoi_Tran.PNG',
    history: 'Tên tệp mô tả một mẫu áo mô phỏng thời Trần; thư viện chưa có tư liệu để xác định kiểu áo, địa vị hay niên đại cụ thể.',
    usage_context: 'Dùng làm phục trang tạo hình theo chủ đề thời Trần; thông tin nhận diện cần được đối chiếu với tư liệu chuyên môn.'
  },
  {
    id: 'male_ao_vua_nguyen',
    name: 'Áo Vua Triều Nguyễn',
    category: 'ao',
    era: 'Phục trang mô phỏng triều Nguyễn',
    style: 'traditional',
    gender: 'nam',
    isLocked: true,
    lockReason: 'Áo Vua Triều Nguyễn đang chờ Tấm đọc tư liệu và vượt qua ải hỏi đáp lịch sử.',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_ao_vua_nguyen.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_ao_vua_nguyen.PNG',
    history: 'Tên mẫu cho biết đây là phục trang mô phỏng vua triều Nguyễn; chưa đủ tư liệu để định danh phẩm phục hay nghi lễ cụ thể.',
    usage_context: 'Dùng trong tạo hình hoặc trình diễn theo chủ đề triều Nguyễn; không khẳng định đây là bản phục dựng chính xác.'
  },
  {
    id: 'male_giay_linh_thoi_Ly',
    name: 'Giày Lính Thời Lý',
    category: 'giay',
    era: 'Phục trang mô phỏng thời Lý',
    style: 'traditional',
    gender: 'nam',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_giay_linh_thoi_Ly.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_giay_linh_thoi_Ly.PNG',
    history: 'Tên mẫu mô tả giày dùng trong tạo hình người lính thời Lý; thư viện không ghi tư liệu xác nhận kiểu giày lịch sử này.',
    usage_context: 'Phối theo bộ phục mô phỏng thời Lý trong trình diễn hoặc tạo hình.'
  },
  {
    id: 'male_giay_vua_nguyen',
    name: 'Giày Vua Triều Nguyễn',
    category: 'giay',
    era: 'Phục trang mô phỏng triều Nguyễn',
    style: 'traditional',
    gender: 'nam',
    isLocked: true,
    lockReason: 'Giày Vua Triều Nguyễn đang chờ Tấm đọc tư liệu và vượt qua ải hỏi đáp lịch sử.',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_giay_vua_nguyen.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_giay_vua_nguyen.PNG',
    history: 'Tên thiết kế gắn với tạo hình vua triều Nguyễn; chưa có tư liệu xác nhận đây là kiểu giày của một phẩm phục hay nghi lễ cụ thể.',
    usage_context: 'Dùng đồng bộ với phục trang mô phỏng triều Nguyễn trong tạo hình hoặc trình diễn.'
  },
  {
    id: 'male_mu_linh_thoi_Ly',
    name: 'Mũ Lính Thời Lý',
    category: 'phukien',
    era: 'Phục trang mô phỏng thời Lý',
    style: 'traditional',
    gender: 'nam',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_mu_linh_thoi_Ly.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_mu_linh_thoi_Ly.PNG',
    history: 'Tên mẫu mô tả mũ trong tạo hình người lính thời Lý; không có hồ sơ xác nhận kiểu dáng cụ thể của hình ảnh.',
    usage_context: 'Phối theo bộ phục mô phỏng thời Lý trong trình diễn hoặc tạo hình.'
  },
  {
    id: 'male_mu_vua_nguyen',
    name: 'Mũ Vua Triều Nguyễn',
    category: 'phukien',
    era: 'Phục trang mô phỏng triều Nguyễn',
    style: 'traditional',
    gender: 'nam',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_mu_vua_nguyen.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_mu_vua_nguyen.PNG',
    history: 'Tên thiết kế gắn với tạo hình vua triều Nguyễn; thư viện chưa có dữ liệu để xác định phẩm phục hoặc nghi lễ cụ thể.',
    usage_context: 'Dùng đồng bộ với phục trang mô phỏng triều Nguyễn; không xem là hiện vật lịch sử đã được định danh.'
  },
  {
    id: 'male_non_la',
    name: 'Nón Lá',
    category: 'phukien',
    era: 'Phụ kiện truyền thống Việt Nam',
    style: 'traditional',
    gender: 'nam',
    image_url: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_non_la.PNG',
    thumbnail: 'https://raw.githubusercontent.com/dohongdang20072007-droid/AI_Stylish/main/AI_STYLISH/AI_STYLISH/assets/images/items/male_non_la.PNG',
    history: 'Nón lá là vật dụng che nắng mưa quen thuộc trong đời sống Việt; hình dáng và cách làm thay đổi theo địa phương.',
    usage_context: 'Có thể dùng với trang phục dân gian hoặc tạo hình lấy cảm hứng từ đời sống Việt.'
  }
];

const itemHistoryDetails = {
  female_ao_ba_ba: {
    era: 'Khoảng thế kỷ 19; Nam Bộ',
    heritageTitle: 'Biểu tượng Văn hóa Phi vật thể đặc trưng của vùng sông nước Nam Bộ',
    history: 'Áo Bà Ba xuất hiện vào khoảng thế kỷ 19 ở Nam Bộ, trong bối cảnh giao thoa văn hóa giữa trang phục người Việt, người Khmer và đời sống thương hồ sông nước Tây Nam Bộ. Dáng áo ngắn, xẻ hai bên hông, không cổ hoặc có cổ tròn/cổ xẻ vương, cài cúc phía trước. Chất liệu truyền thống được mô tả gồm vải ú, vải nâu nhuộm từ vỏ cây xơ dừa hoặc mủ bàng; tính thoáng mát và mau khô phù hợp với công việc trên đồng ruộng, sông nước. Áo gắn với hình ảnh người dân Nam Bộ trong thời kỳ mở đất và kháng chiến.'
  },
  female_ao_dai_truyen_thong: {
    era: 'Định hình từ năm 1744; cải tiến trong thập niên 1930; phom hiện đại từ thập niên 1960',
    heritageTitle: 'Quốc phục Việt Nam; đang trong lộ trình lập hồ sơ đệ trình UNESCO công nhận là Di sản Văn hóa Phi vật thể đại diện của nhân loại',
    history: 'Áo dài có quá trình định hình lâu dài: cốt lõi được gắn với cải cách trang phục dưới thời chúa Nguyễn Phúc Khoát năm 1744 qua dáng áo ngũ thân; kiểu áo tiếp tục được cải tiến thành áo dài tân thời trong thập niên 1930, gắn với Lemur và Lê Thị Điểm, rồi hoàn thiện phom dáng thắt eo hiện đại từ thập niên 1960. Dáng áo gồm hai tà xẻ từ eo xuống, thường mặc cùng quần lụa ống rộng. Thiết kế thể hiện sự kín đáo, trang nhã và mềm mại. Áo dài trở thành một hình ảnh nhận diện văn hóa Việt Nam trên trường quốc tế.'
  },
  female_ao_tac_tay_thung: {
    era: 'Triều Nguyễn (1802–1945)',
    heritageTitle: 'Thuộc Quần thể Di tích Cố đô Huế (Di sản Văn hóa Thế giới được UNESCO công nhận năm 1993)',
    history: 'Áo Tấc, còn gọi là áo tay thụng hoặc áo lễ, được mô tả là lễ phục phổ biến thời Nguyễn, dành cho nhiều tầng lớp từ vua chúa, quan lại, nho sĩ đến dân thường. Áo có dáng ngũ thân, cổ đứng, cài cúc bên phải; đặc điểm nổi bật là ống tay rộng và dài. Khi người mặc chắp tay, tay áo rủ xuống, tạo phong thái trang nghiêm và khiêm nhường phù hợp với nghi lễ chịu ảnh hưởng Nho giáo.'
  },
  female_ao_tu_than: {
    era: 'Từ thời Lý–Trần; phát triển tại đồng bằng Bắc Bộ trong khoảng thế kỷ 12–20',
    heritageTitle: 'Gắn với Không gian Văn hóa Dân ca Quan họ Bắc Ninh (Di sản Văn hóa Phi vật thể Đại diện của Nhân loại - UNESCO 2009)',
    history: 'Áo Tứ Thân gồm bốn vạt: hai vạt sau khâu liền thành sống lưng, được tư liệu cung cấp diễn giải là tượng trưng cho cha mẹ đẻ; hai vạt trước có thể buông hoặc buộc thắt phía trước. Áo không có cúc, thường gài bằng thắt lưng. Khi mặc, áo có thể kết hợp với áo yếm bên trong và váy đen dài. Trang phục gắn với đời sống phụ nữ nông thôn Bắc Bộ, đồng thời hiện diện trong không gian diễn xướng Quan họ và các sinh hoạt lễ hội dân gian.'
  },
  female_ao_yem: {
    era: 'Từ thế kỷ 12; phổ biến qua các triều Lê–Nguyễn đến đầu thế kỷ 20',
    heritageTitle: 'Trang phục nội y truyền thống độc đáo của văn hóa trang phục Việt Nam',
    history: 'Áo Yếm là tấm vải hình vuông hoặc hình trám che phần ngực, có dây buộc sau cổ và sau lưng. Các dạng được tư liệu nêu gồm yếm cổ xây dành cho người bình dân, yếm cổ xẻ và yếm đào nhuộm màu thắm. Yếm vừa là lớp mặc bên trong, vừa thể hiện thẩm mỹ trang phục của phụ nữ Việt trong nhiều bối cảnh sinh hoạt. Mẫu yếm cụ thể trong ứng dụng không có thông tin riêng về niên đại hoặc xuất xứ.'
  },
  ao_yem: {
    era: 'Từ thế kỷ 12; phổ biến qua các triều Lê–Nguyễn đến đầu thế kỷ 20',
    heritageTitle: 'Trang phục nội y truyền thống độc đáo của văn hóa trang phục Việt Nam',
    history: 'Áo Yếm là tấm vải hình vuông hoặc hình trám che phần ngực, có dây buộc sau cổ và sau lưng. Các dạng được tư liệu nêu gồm yếm cổ xây dành cho người bình dân, yếm cổ xẻ và yếm đào nhuộm màu thắm. Yếm vừa là lớp mặc bên trong, vừa thể hiện thẩm mỹ trang phục của phụ nữ Việt trong nhiều bối cảnh sinh hoạt. Mẫu yếm cụ thể trong ứng dụng không có thông tin riêng về niên đại hoặc xuất xứ.'
  },
  male_ao_ngu_than: {
    era: 'Định hình năm 1744; được áp dụng rộng rãi thời Nguyễn',
    heritageTitle: 'Nằm trong Đề án Di sản Văn hóa Phi vật thể Quốc gia “Huế - Kinh đô Áo dài”',
    history: 'Áo Ngũ Thân được tư liệu cung cấp ghi nhận định hình chuẩn mực từ năm 1744 dưới thời Võ Vương Nguyễn Phúc Khoát và được ban hành áp dụng toàn quốc thời vua Minh Mạng. Cấu trúc gồm năm vạt: bốn vạt ngoài được diễn giải là tượng trưng cho tứ thân phụ mẫu, vạt con giấu bên trong tượng trưng cho người mặc. Áo có năm cúc, gắn với Ngũ thường (Nhân, Lễ, Nghĩa, Trí, Tín) và Ngũ luân. Dáng áo may thẳng, kín đáo, thể hiện vẻ lịch thiệp và tôn nghiêm.'
  },
  ao_ngu_than: {
    era: 'Định hình năm 1744; được áp dụng rộng rãi thời Nguyễn',
    heritageTitle: 'Nằm trong Đề án Di sản Văn hóa Phi vật thể Quốc gia “Huế - Kinh đô Áo dài”',
    history: 'Áo Ngũ Thân được tư liệu cung cấp ghi nhận định hình chuẩn mực từ năm 1744 dưới thời Võ Vương Nguyễn Phúc Khoát và được ban hành áp dụng toàn quốc thời vua Minh Mạng. Cấu trúc gồm năm vạt: bốn vạt ngoài được diễn giải là tượng trưng cho tứ thân phụ mẫu, vạt con giấu bên trong tượng trưng cho người mặc. Áo có năm cúc, gắn với Ngũ thường (Nhân, Lễ, Nghĩa, Trí, Tín) và Ngũ luân. Dáng áo may thẳng, kín đáo, thể hiện vẻ lịch thiệp và tôn nghiêm.'
  },
  male_ao_tac: {
    era: 'Triều Nguyễn (1802–1945); chuẩn hóa từ năm 1744',
    heritageTitle: 'Quần thể Di tích Cố đô Huế (UNESCO công nhận năm 1993)',
    history: 'Áo Tấc, còn gọi là áo tay thụng, áo lễ hoặc lễ phục ngũ thân, là loại lễ phục quan trọng trong hệ thống trang phục Việt Nam thời Nguyễn (1802–1945), được sử dụng ở nhiều tầng lớp. Kiểu áo phát triển từ áo ngũ thân cổ đứng, được tư liệu cung cấp ghi nhận chuẩn hóa từ thời Võ Vương Nguyễn Phúc Khoát năm 1744 và ban hành dưới triều Minh Mạng. Tên “áo Tấc” được giải thích trong tư liệu bằng chi tiết phần viền tay áo rộng một tấc hoặc tà áo thụng dài phủ qua gối. Áo gắn với văn hóa trang phục Cố đô Huế và phong trào phục dựng cổ phục.'
  },
  ao_tac: {
    era: 'Triều Nguyễn (1802–1945); chuẩn hóa từ năm 1744',
    heritageTitle: 'Quần thể Di tích Cố đô Huế (UNESCO công nhận năm 1993)',
    history: 'Áo Tấc, còn gọi là áo tay thụng, áo lễ hoặc lễ phục ngũ thân, là loại lễ phục quan trọng trong hệ thống trang phục Việt Nam thời Nguyễn (1802–1945), được sử dụng ở nhiều tầng lớp. Kiểu áo phát triển từ áo ngũ thân cổ đứng, được tư liệu cung cấp ghi nhận chuẩn hóa từ thời Võ Vương Nguyễn Phúc Khoát năm 1744 và ban hành dưới triều Minh Mạng. Tên “áo Tấc” được giải thích trong tư liệu bằng chi tiết phần viền tay áo rộng một tấc hoặc tà áo thụng dài phủ qua gối. Áo gắn với văn hóa trang phục Cố đô Huế và phong trào phục dựng cổ phục.'
  },
  male_hoodie_cyber: {
    era: 'Thời trang đương đại thế kỷ 21',
    history: 'Hoodie Cyber là thiết kế áo nỉ có mũ theo phong cách Cyberpunk/Streetwear. Mẫu trong ứng dụng được mô tả với họa tiết đèn LED và tạo hình viễn tưởng; không có thêm thông tin về nhà thiết kế hoặc thời điểm ra mắt cụ thể.'
  },
  male_cargo_jean: {
    era: 'Đương đại; biến tấu từ trang phục quân đội giữa thế kỷ 20',
    history: 'Quần Cargo Jean kết hợp chất liệu jean với các túi hộp tiện dụng. Tư liệu cung cấp mô tả đây là biến tấu đương đại từ trang phục quân đội giữa thế kỷ 20, với phom dáng năng động, phù hợp cho hoạt động ngoài trời.'
  },
  female_cargo_jean: {
    era: 'Đương đại; biến tấu từ trang phục quân đội giữa thế kỷ 20',
    history: 'Quần Cargo Jean kết hợp chất liệu jean với các túi hộp tiện dụng. Tư liệu cung cấp mô tả đây là biến tấu đương đại từ trang phục quân đội giữa thế kỷ 20, với phom dáng năng động, phù hợp cho hoạt động ngoài trời.'
  },
  quan_cargo: {
    era: 'Đương đại; biến tấu từ trang phục quân đội giữa thế kỷ 20',
    history: 'Quần Cargo Jean kết hợp chất liệu jean với các túi hộp tiện dụng. Tư liệu cung cấp mô tả đây là biến tấu đương đại từ trang phục quân đội giữa thế kỷ 20, với phom dáng năng động, phù hợp cho hoạt động ngoài trời.'
  },
  female_quan_dai_den: {
    era: 'Từ thời Lê–Nguyễn đến nay',
    history: 'Quần dài đen được tư liệu mô tả là dạng quần ống rộng, có thể may bằng lụa, gấm hoặc vải thô màu đen. Đây là trang phục phối cùng áo Bà Ba, áo Ngũ Thân và áo Dài. Chưa có thông tin riêng để xác định niên đại của mẫu quần trong ứng dụng.'
  },
  female_quan_toc: {
    era: 'Thời Lê–Nguyễn (thế kỷ 15–20)',
    history: 'Tục búi tóc và quấn khăn được tư liệu cung cấp mô tả là nét văn hóa lâu đời của người Việt. Khăn vấn nữ giúp tóc gọn gàng; khăn xếp nam thời Nguyễn gồm nhiều vòng xếp nếp. Mẫu ứng dụng được đặt tên “Khăn Quấn Tóc”; chưa có thông tin để xác định riêng kỹ thuật hoặc niên đại của chính hình ảnh này.'
  },
  female_vay_xep_ly: {
    era: 'Đương đại',
    history: 'Váy Xếp Ly là thiết kế chân váy có nhiều nếp gấp, tạo độ xòe nhẹ và vẻ trẻ trung, năng động. Tư liệu cung cấp cho biết kiểu váy lấy cảm hứng từ váy đổng cổ truyền Bắc Bộ; chưa có thông tin về nhà thiết kế hay thời điểm ra đời của mẫu cụ thể.'
  },
  male_quan_lua_trang: {
    era: 'Triều Nguyễn đến nay',
    history: 'Quần Lụa Trắng được tư liệu mô tả là trang phục phối cùng áo cổ truyền, làm từ lụa tơ tằm Hà Đông hoặc lụa Tân Châu. Chất liệu lụa mềm mại góp phần tạo vẻ dịu dàng cho tổng thể trang phục. Chưa có thông tin xác nhận chất liệu thực tế của mẫu quần trong ứng dụng.'
  },
  quan_lua_bach: {
    era: 'Triều Nguyễn đến nay',
    history: 'Quần Lụa Trắng được tư liệu mô tả là trang phục phối cùng áo cổ truyền, làm từ lụa tơ tằm Hà Đông hoặc lụa Tân Châu. Chất liệu lụa mềm mại góp phần tạo vẻ dịu dàng cho tổng thể trang phục. Chưa có thông tin xác nhận chất liệu thực tế của mẫu quần trong ứng dụng.'
  },
  male_kinh_ram: {
    era: 'Đương đại',
    history: 'Kính Râm là phụ kiện thời trang mắt kính đương đại, có thể tạo điểm nhấn phá cách cho bản phối Việt phục theo hướng Modern Heritage. Chưa có thông tin về lịch sử riêng, nhãn hiệu hoặc năm sản xuất của mẫu trong ứng dụng.'
  },
  kinh_cyberpunk_neon: {
    era: 'Đương đại',
    history: 'Kính Râm là phụ kiện thời trang mắt kính đương đại, có thể tạo điểm nhấn phá cách cho bản phối Việt phục theo hướng Modern Heritage. Chưa có thông tin về lịch sử riêng, nhãn hiệu hoặc năm sản xuất của mẫu trong ứng dụng.'
  },
  female_dep_quai_thao: {
    era: 'Dân gian Việt Nam',
    history: 'Dép Quai Thảo được tư liệu mô tả là dép thủ công, có thể đan từ xơ dừa, đay, cói hoặc da cây, gắn với hình ảnh cư dân làng quê Việt Nam. Chưa có thông tin để xác định chất liệu cụ thể hoặc niên đại của mẫu trong ứng dụng.'
  },
  female_giay_den: {
    era: 'Đương đại',
    history: 'Giày Đen được tư liệu mô tả là giày da nam thanh lịch, thường phối với áo Ngũ Thân nam cách tân khi đi làm hoặc dự sự kiện. Chưa có thông tin riêng về kiểu giày hoặc thời điểm sản xuất của mẫu trong ứng dụng.'
  },
  male_giay_den: {
    era: 'Đương đại',
    history: 'Giày Đen được tư liệu mô tả là giày da nam thanh lịch, thường phối với áo Ngũ Thân nam cách tân khi đi làm hoặc dự sự kiện. Chưa có thông tin riêng về kiểu giày hoặc thời điểm sản xuất của mẫu trong ứng dụng.'
  },
  female_hai_theu: {
    era: 'Triều Lê–Nguyễn (thế kỷ 15–20)',
    history: 'Hài Thêu là loại hài vải được tư liệu mô tả với các họa tiết thêu tay như mây ngũ sắc, hoa sen và chim phụng. Hài gắn với tạo hình giày dép trang trọng của phụ nữ quý tộc, tiểu thư và mệnh phụ thời xưa. Chưa có thông tin xác định kỹ thuật hoặc niên đại riêng của mẫu trong ứng dụng.'
  },
  female_sneaker: {
    era: 'Đương đại',
    history: 'Sneaker là giày thể thao đương đại, phù hợp với các bản phối streetwear hoặc kết hợp tương phản cùng cổ phục. Chưa có thông tin về nhãn hiệu, nhà thiết kế hoặc năm sản xuất của mẫu trong ứng dụng.'
  },
  male_sneaker: {
    era: 'Đương đại',
    history: 'Sneaker là giày thể thao đương đại, phù hợp với các bản phối streetwear hoặc kết hợp tương phản cùng cổ phục. Chưa có thông tin về nhãn hiệu, nhà thiết kế hoặc năm sản xuất của mẫu trong ứng dụng.'
  },
  sneaker_chunky_ham_ho: {
    era: 'Đương đại',
    history: 'Sneaker là giày thể thao đương đại, phù hợp với các bản phối streetwear hoặc kết hợp tương phản cùng cổ phục. Chưa có thông tin về nhãn hiệu, nhà thiết kế hoặc năm sản xuất của mẫu trong ứng dụng.'
  },
  female_ao_cong_chua: {
    era: 'Triều Nguyễn (1802–1945)',
    heritageTitle: 'Thuộc Di sản Cung đình Huế (Nghệ thuật Thêu thùa & Trang phục Hoàng gia Huế)',
    history: 'Áo Công Chúa/Mệnh Phụ Phục được tư liệu cung cấp mô tả là lễ phục dành cho công chúa, mệnh phụ hoàng gia thời Nguyễn trong các đại lễ. Áo có thể dùng gấm hoặc nhiễu cao cấp, thêu hình phượng, mây ngũ sắc và hoa sen bằng chỉ vàng, chỉ ngũ sắc. Đây là mô tả trong tư liệu được cung cấp; chưa có thông tin xác nhận hình ảnh cụ thể trong ứng dụng là hiện vật hoặc bản phục dựng của một phẩm phục xác định.'
  },
  female_ao_croptop: {
    era: 'Đương đại',
    history: 'Áo Croptop là kiểu áo dáng ngắn, tôn phần eo và thường được dùng trong trang phục dạo phố. Chưa có thông tin về nhà thiết kế hoặc thời điểm ra đời của mẫu trong ứng dụng.'
  },
  female_khan_vanh_day: {
    era: 'Triều Nguyễn (thế kỷ 19–20)',
    history: 'Khăn Vành Dây được tư liệu mô tả là khăn quấn đầu lớn nhiều vòng, làm bằng vải nhiễu xanh hoặc vàng lợt. Đây là phụ kiện đội đầu dành cho hoàng phi, mệnh phụ và cô dâu trong những dịp trọng đại thời Nguyễn. Chưa có thông tin xác nhận chất liệu hoặc kiểu dáng của mẫu trong ứng dụng.'
  },
  female_mu_luoi_trai: {
    era: 'Đương đại',
    history: 'Mũ Lưỡi Trai là nón thể thao dùng trong trang phục dạo phố. Chưa có thông tin về lịch sử riêng hoặc năm sản xuất của mẫu trong ứng dụng.'
  },
  male_mu_luoi_trai: {
    era: 'Đương đại',
    history: 'Mũ Lưỡi Trai là nón thể thao dùng trong trang phục dạo phố. Chưa có thông tin về lịch sử riêng hoặc năm sản xuất của mẫu trong ứng dụng.'
  },
  female_non_la: {
    era: 'Tư liệu nhắc đến hình ảnh trên trống đồng Đông Sơn Ngọc Lũ (thế kỷ 3–2 trước Công nguyên); niên đại mẫu chưa xác định',
    heritageTitle: 'Biểu tượng Văn hóa Quốc gia (Nghề làm nón lá Làng Chuông, Nón lá Huế)',
    history: 'Nón Lá được tư liệu mô tả là vật dụng đan từ lá nón, lá cọ và nan trúc, vừa che nắng mưa vừa được xem như phụ kiện tôn lên vẻ e ấp, dịu dàng. Tư liệu cung cấp nhắc đến hình ảnh nón lá trên trống đồng Đông Sơn Ngọc Lũ, niên đại thế kỷ 3–2 trước Công nguyên; thông tin này không xác định niên đại của mẫu nón trong ứng dụng.'
  },
  male_non_la: {
    era: 'Tư liệu nhắc đến hình ảnh trên trống đồng Đông Sơn Ngọc Lũ (thế kỷ 3–2 trước Công nguyên); niên đại mẫu chưa xác định',
    heritageTitle: 'Biểu tượng Văn hóa Quốc gia (Nghề làm nón lá Làng Chuông, Nón lá Huế)',
    history: 'Nón Lá được tư liệu mô tả là vật dụng đan từ lá nón, lá cọ và nan trúc, vừa che nắng mưa vừa được xem như phụ kiện tôn lên vẻ e ấp, dịu dàng. Tư liệu cung cấp nhắc đến hình ảnh nón lá trên trống đồng Đông Sơn Ngọc Lũ, niên đại thế kỷ 3–2 trước Công nguyên; thông tin này không xác định niên đại của mẫu nón trong ứng dụng.'
  },
  female_non_quai_thao: {
    era: 'Thời Trần–Lê–Nguyễn (thế kỷ 13–20)',
    heritageTitle: 'Gắn liền với Di sản Dân ca Quan họ Bắc Ninh (UNESCO 2009)',
    history: 'Nón Quai Thao được tư liệu mô tả có dạng đĩa tròn lớn, mặt trên lợp lá cọ phẳng; quai làm bằng dây thao dệt chỉ gấm, rủ hai chùm tua rua. Nón gắn với hình ảnh liền chị Quan họ khi trẩy hội xuân, biểu diễn dân ca và trong một số nghi lễ cưới hỏi dân gian Bắc Bộ.'
  },
  male_ao_linh_thoi_ly: {
    era: 'Triều Lý (1009–1225)',
    history: 'Áo Lính Thời Lý là phục trang mô phỏng, được tư liệu cung cấp mô tả là lấy cảm hứng từ tượng điêu khắc và hoa văn thời Lý. Họa tiết được nhắc đến gồm lá đề và mây cuộn, gắn với giai đoạn Phật giáo phát triển. Chưa có thông tin xác nhận mẫu áo trong ứng dụng là bản phục dựng dựa trên hiện vật cụ thể.'
  },
  male_ao_thoi_Tran: {
    era: 'Triều Trần (1225–1400)',
    history: 'Áo Thời Trần là phục trang mô phỏng tinh thần “Hào khí Đông A”. Tư liệu cung cấp mô tả áo vạt rộng, chất liệu thô gấm và hoa văn rồng thời Trần. Chưa có thông tin xác nhận mẫu áo trong ứng dụng tái hiện một kiểu áo hoặc hiện vật cụ thể.'
  },
  male_ao_vua_nguyen: {
    era: 'Triều Nguyễn (1802–1945)',
    heritageTitle: 'Thuộc Quần thể Di tích Cố đô Huế',
    history: 'Áo Vua Triều Nguyễn (Hoàng Bào/Ngự Phục) được tư liệu cung cấp mô tả là áo gấm vàng, thêu rồng năm móng, họa tiết tam sơn hải hạc và mây ngũ sắc. Tư liệu gắn loại áo này với các dịp đại lễ, tế Nam Giao và ngự triều tại điện Cần Chánh. Chưa có thông tin xác nhận mẫu trong ứng dụng tương ứng với một phẩm phục cụ thể hoặc đúng vật liệu được mô tả.'
  },
  male_giay_linh_thoi_Ly: {
    history: 'Giày Lính Thời Lý được tư liệu cung cấp mô tả là giày mũi cong nhọn, chạm hoa văn, mô phỏng trang phục thị vệ hoặc tướng lĩnh triều Lý. Chưa có thông tin khác để xác định niên đại, chất liệu hoặc căn cứ phục dựng của mẫu trong ứng dụng.'
  },
  male_giay_vua_nguyen: {
    history: 'Giày Vua Triều Nguyễn được tư liệu cung cấp mô tả là giày gấm thêu rồng, trang trí mạ vàng và gắn với tạo hình hoàng đế triều Nguyễn. Chưa có thông tin khác để xác định niên đại, nghi lễ hoặc căn cứ phục dựng của mẫu trong ứng dụng.'
  },
  male_mu_linh_thoi_Ly: {
    history: 'Mũ Lính Thời Lý được tư liệu cung cấp mô tả là mũ mô phỏng ngự lâm quân thời Lý, có họa tiết lá đề. Chưa có thông tin khác để xác định niên đại, kiểu mũ cụ thể hoặc căn cứ phục dựng của mẫu trong ứng dụng.'
  },
  male_mu_vua_nguyen: {
    history: 'Mũ Vua Triều Nguyễn, còn được tư liệu gọi là mũ bó cổ/mũ miện, được mô tả là mũ hoàng đế triều Nguyễn đính vàng và ngọc bích, dùng trong các dịp đại lễ. Chưa có thông tin khác để xác định kiểu mũ cụ thể, niên đại hoặc căn cứ phục dựng của mẫu trong ứng dụng.'
  }
};

itemsData.forEach(item => {
  const historyDetail = itemHistoryDetails[item.id];
  item.gender = getGenderFromItemPrefix(item) || item.gender;
  item.isHeritage = Boolean(historyDetail?.heritageTitle);
  item.heritageTitle = historyDetail?.heritageTitle || '';
  item.era = historyDetail?.era || 'Chưa xác định';
  item.timeOfOrigin = item.era;
  item.history = historyDetail?.history || 'Chưa xác định.';
  item.detailedHistory = item.history;
  item.usageContext = item.usage_context;
  item.stylingSuggestions = item.usage_context;
});

function getGenderFromItemPrefix(item) {
  const sources = [item.id, item.image_url, item.thumbnail].filter(Boolean);
  for (const source of sources) {
    const fileName = source.split(/[\\/]/).pop() || '';
    const prefix = fileName.match(/^(female|male)(?:_|$)/i);
    if (prefix) return prefix[1].toLowerCase() === 'female' ? 'nu' : 'nam';
  }
  return null;
}
