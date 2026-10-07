/**
 * Quy tắc cảnh báo phối phục trang theo ngữ cảnh và niên đại mô phỏng.
 * Các cảnh báo là gợi ý cho bản phối muốn tái hiện lịch sử, không khẳng định
 * mọi cách phối sáng tạo đều là điều cấm kỵ trong văn hóa.
 */
const rulesData = [
  {
    id: 'rule_ao_ba_ba_quai_thao',
    name: 'Lệch bối cảnh vùng miền',
    items: ['female_ao_ba_ba', 'female_non_quai_thao'],
    severity: 'warning',
    title: 'Cảnh báo: Áo bà ba Nam Bộ và nón quai thao Bắc Bộ khác bối cảnh vùng miền.',
    description: 'Nếu muốn tạo hình dân gian theo vùng, áo bà ba gắn với Nam Bộ còn nón quai thao thường xuất hiện trong hình ảnh phụ nữ Bắc Bộ; kết hợp hai món làm bản phục dựng pha trộn vùng miền.',
    historical_lesson: 'Để tránh gán sai vùng miền, hãy bỏ nón quai thao hoặc đổi sang áo tứ thân; Bảo tàng Lịch sử Quốc gia minh họa áo tứ thân cùng nón quai thao. Đây là gợi ý cho tạo hình theo vùng, không phải điều cấm phối cách tân.',
    sources: [
      'https://baotanglichsu.vn/vi/Articles/3096/18397/net-djep-van-hoa-trong-ta-ao-dai-cua-phu-nu-viet.html',
      'https://vietnamtourism.gov.vn/printer/51467?type=1'
    ]
  },
  {
    id: 'rule_aotac_muluoitrai',
    name: 'Lệch niên đại trang phục mô phỏng',
    items: ['ao_tac', 'male_mu_luoi_trai'],
    severity: 'warning',
    title: 'Cảnh báo: Mũ lưỡi trai hiện đại lệch thời kỳ mô phỏng của áo Tấc.',
    description: 'Mũ lưỡi trai là món đương đại trong danh mục, trong khi áo Tấc được bộ sưu tập gắn nhãn triều Nguyễn. Cặp này không phù hợp nếu mục tiêu là tạo hình phục dựng cùng thời kỳ.',
    historical_lesson: 'Bỏ mũ lưỡi trai để giữ tạo hình cổ phục; nếu muốn phối streetwear, hãy đổi áo Tấc sang hoodie.',
    sources: [
      'https://baotanglichsu.vn/vi/Articles/3096/18397/net-djep-van-hoa-trong-ta-ao-dai-cua-phu-nu-viet.html'
    ]
  },
  {
    id: 'rule_aonguthan_muluoitrai',
    name: 'Lệch niên đại trang phục mô phỏng',
    items: ['ao_ngu_than', 'male_mu_luoi_trai'],
    severity: 'warning',
    title: 'Cảnh báo: Mũ lưỡi trai hiện đại lệch thời kỳ mô phỏng của áo Ngũ Thân.',
    description: 'Mũ lưỡi trai thuộc phong cách hiện đại; áo Ngũ Thân trong thư viện được gắn nhãn trang phục nam thời Nguyễn. Hai món làm lệch niên đại nếu bản phối hướng tới phục dựng.',
    historical_lesson: 'Bỏ mũ lưỡi trai khi dựng cổ phục, hoặc chủ động chuyển toàn bộ bản phối sang phong cách hiện đại.',
    sources: [
      'https://baotanglichsu.vn/vi/Articles/3096/18397/net-djep-van-hoa-trong-ta-ao-dai-cua-phu-nu-viet.html'
    ]
  },
  {
    id: 'rule_aovua_muluoitrai',
    name: 'Lệch niên đại trang phục mô phỏng',
    items: ['male_ao_vua_nguyen', 'male_mu_luoi_trai'],
    severity: 'warning',
    title: 'Cảnh báo: Mũ lưỡi trai hiện đại lệch bối cảnh phục trang vua triều Nguyễn.',
    description: 'Mũ lưỡi trai là phụ kiện hiện đại, không thuộc tạo hình phục trang triều Nguyễn được nêu trong tên mẫu. Cảnh báo này áp dụng khi muốn thể hiện một tạo hình lịch sử nhất quán.',
    historical_lesson: 'Bỏ mũ lưỡi trai; thư viện có mẫu Mũ Vua Triều Nguyễn để thử, nhưng hình ảnh đó cũng chỉ là phục trang mô phỏng chưa được xác thực.',
    sources: [
      'https://hueworldheritage.org.vn/'
    ]
  },
  {
    id: 'rule_aolinhly_muvua',
    name: 'Lệch thời kỳ phục trang mô phỏng',
    items: ['male_ao_linh_thoi_ly', 'male_mu_vua_nguyen'],
    severity: 'warning',
    title: 'Cảnh báo: Phục trang mô phỏng thời Lý không cùng thời kỳ với mũ vua triều Nguyễn.',
    description: 'Tên hai mẫu lần lượt chỉ thời Lý và triều Nguyễn; ghép chúng tạo ra bản phối chéo thời kỳ, không phù hợp nếu đang dựng một nhân vật lịch sử nhất quán.',
    historical_lesson: 'Đổi sang Mũ Lính Thời Lý để giữ cùng chủ đề thời Lý; mẫu trong kho vẫn là phục trang mô phỏng, chưa xác minh độ chính xác của hình ảnh.',
    sources: [
      'https://baotanglichsu.vn/vi/Articles/3096/18397/net-djep-van-hoa-trong-ta-ao-dai-cua-phu-nu-viet.html',
      'https://hueworldheritage.org.vn/'
    ]
  },
  {
    id: 'rule_aotran_mulinly',
    name: 'Lệch thời kỳ phục trang mô phỏng',
    items: ['male_ao_thoi_Tran', 'male_mu_linh_thoi_Ly'],
    severity: 'warning',
    title: 'Cảnh báo: Phục trang mô phỏng thời Trần không cùng thời kỳ với mũ lính thời Lý.',
    description: 'Tên hai mẫu gắn với hai triều đại khác nhau. Ghép chúng làm sai lệch bối cảnh nếu bản phối được dùng để tái hiện một thời kỳ cụ thể.',
    historical_lesson: 'Chọn phụ kiện cùng thời kỳ với chủ đề áo; thư viện chưa có mũ thời Trần được xác định nên không nên khẳng định phụ kiện cụ thể.',
    sources: [
      'https://baotanglichsu.vn/vi/Articles/3096/18397/net-djep-van-hoa-trong-ta-ao-dai-cua-phu-nu-viet.html'
    ]
  },
  {
    id: 'rule_aovua_mulinly',
    name: 'Lệch thời kỳ phục trang mô phỏng',
    items: ['male_ao_vua_nguyen', 'male_mu_linh_thoi_Ly'],
    severity: 'warning',
    title: 'Cảnh báo: Phục trang mô phỏng triều Nguyễn không cùng thời kỳ với mũ lính thời Lý.',
    description: 'Tên hai mẫu gắn với hai triều đại khác nhau. Ghép chúng làm sai lệch bối cảnh nếu bản phối được dùng để tái hiện một thời kỳ cụ thể.',
    historical_lesson: 'Đổi sang Mũ Vua Triều Nguyễn để đồng bộ chủ đề, lưu ý mẫu trong thư viện vẫn chưa có hồ sơ xác minh phục dựng.',
    sources: [
      'https://baotanglichsu.vn/vi/Articles/3096/18397/net-djep-van-hoa-trong-ta-ao-dai-cua-phu-nu-viet.html',
      'https://hueworldheritage.org.vn/'
    ]
  },
  {
    id: 'rule_aotac_giayly',
    name: 'Lệch thời kỳ phục trang mô phỏng',
    items: ['ao_tac', 'male_giay_linh_thoi_Ly'],
    severity: 'warning',
    title: 'Cảnh báo: Giày mô phỏng thời Lý không cùng thời kỳ với áo Tấc triều Nguyễn.',
    description: 'Tên mẫu gắn áo Tấc với triều Nguyễn và giày với thời Lý. Ghép hai mẫu làm chéo thời kỳ nếu bản phối hướng tới tái hiện lịch sử.',
    historical_lesson: 'Đổi sang Giày Đen để tránh ghép hai nhãn thời kỳ khác nhau; đây là gợi ý phối theo bộ sưu tập, không xác nhận độ chính xác lịch sử của mẫu.',
    sources: [
      'https://baotanglichsu.vn/vi/Articles/3096/18397/net-djep-van-hoa-trong-ta-ao-dai-cua-phu-nu-viet.html'
    ]
  },
  {
    id: 'rule_aonguthan_giayly',
    name: 'Lệch thời kỳ phục trang mô phỏng',
    items: ['ao_ngu_than', 'male_giay_linh_thoi_Ly'],
    severity: 'warning',
    title: 'Cảnh báo: Giày mô phỏng thời Lý không cùng thời kỳ với áo Ngũ Thân triều Nguyễn.',
    description: 'Tên mẫu gắn áo Ngũ Thân với triều Nguyễn và giày với thời Lý. Ghép hai mẫu làm chéo thời kỳ nếu bản phối hướng tới tái hiện lịch sử.',
    historical_lesson: 'Đổi sang Giày Đen để tránh ghép hai nhãn thời kỳ khác nhau; đây là gợi ý phối theo bộ sưu tập, không xác nhận độ chính xác lịch sử của mẫu.',
    sources: [
      'https://baotanglichsu.vn/vi/Articles/3096/18397/net-djep-van-hoa-trong-ta-ao-dai-cua-phu-nu-viet.html'
    ]
  },
  {
    id: 'rule_aovua_giayly',
    name: 'Lệch thời kỳ phục trang mô phỏng',
    items: ['male_ao_vua_nguyen', 'male_giay_linh_thoi_Ly'],
    severity: 'warning',
    title: 'Cảnh báo: Giày mô phỏng thời Lý không cùng thời kỳ với phục trang vua triều Nguyễn.',
    description: 'Tên mẫu gắn phục trang vua với triều Nguyễn và giày với thời Lý. Ghép hai mẫu làm chéo thời kỳ nếu bản phối hướng tới tái hiện lịch sử.',
    historical_lesson: 'Chọn giày cùng chủ đề triều Nguyễn nếu muốn bộ phục đồng nhất; mẫu trong kho vẫn chưa được xác minh là phục dựng chuẩn.',
    sources: [
      'https://hueworldheritage.org.vn/'
    ]
  },
  {
    id: 'rule_aolinhly_giayvua',
    name: 'Lệch thời kỳ phục trang mô phỏng',
    items: ['male_ao_linh_thoi_ly', 'male_giay_vua_nguyen'],
    severity: 'warning',
    title: 'Cảnh báo: Giày mô phỏng triều Nguyễn không cùng thời kỳ với áo lính thời Lý.',
    description: 'Tên mẫu gắn áo với thời Lý và giày với triều Nguyễn. Ghép hai mẫu làm chéo thời kỳ nếu bản phối hướng tới tái hiện lịch sử.',
    historical_lesson: 'Đổi sang Giày Lính Thời Lý để giữ cùng chủ đề; mẫu này chỉ là phục trang mô phỏng, chưa xác minh kiểu dáng lịch sử.',
    sources: [
      'https://baotanglichsu.vn/vi/Articles/3096/18397/net-djep-van-hoa-trong-ta-ao-dai-cua-phu-nu-viet.html',
      'https://hueworldheritage.org.vn/'
    ]
  },
  {
    id: 'rule_aotran_giayvua',
    name: 'Lệch thời kỳ phục trang mô phỏng',
    items: ['male_ao_thoi_Tran', 'male_giay_vua_nguyen'],
    severity: 'warning',
    title: 'Cảnh báo: Giày mô phỏng triều Nguyễn không cùng thời kỳ với áo thời Trần.',
    description: 'Tên mẫu gắn áo với thời Trần và giày với triều Nguyễn. Ghép hai mẫu làm chéo thời kỳ nếu bản phối hướng tới tái hiện lịch sử.',
    historical_lesson: 'Chọn giày cùng chủ đề thời Trần nếu có tư liệu xác minh; hiện thư viện chưa có mẫu để khẳng định lựa chọn phù hợp.',
    sources: [
      'https://baotanglichsu.vn/vi/Articles/3096/18397/net-djep-van-hoa-trong-ta-ao-dai-cua-phu-nu-viet.html',
      'https://hueworldheritage.org.vn/'
    ]
  }
];

if (typeof window !== 'undefined') {
  window.rulesData = rulesData;
}
