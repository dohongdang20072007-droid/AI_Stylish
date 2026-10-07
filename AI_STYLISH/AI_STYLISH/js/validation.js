/**
 * js/validation.js
 * Hệ thống Thước Đo Hòa Hợp Văn Hóa (Cultural Harmony Engine) & Kiểm tra Xung đột Điển chế
 * Hoạt động Offline 100% không phụ thuộc Fetch / CORS
 */

class CulturalValidator {
  constructor() {
    this.rules = [];
    this.isLoaded = false;

    // Trọng số bản sắc theo danh mục (giúp Áo Chủ Đạo + Món Phụ tạo tỉ lệ vàng 65% | 35%)
    this.categoryWeights = {
      ao: 65,
      quan: 35,
      phukien: 35,
      giay: 35
    };

    // Tập hợp các vật phẩm thuộc nhóm Dân Gian (để phân biệt với Cung Đình khi cần)
    this.folkItemIds = new Set([
      'ao_yem',
      'vay_dup_to_tam',
      'non_quai_thao',
      'guoc_moc_quai_da'
    ]);
  }

  /**
   * Tải rules trực tiếp từ biến toàn cục rulesData (từ data/rules.js)
   */
  init() {
    if (typeof rulesData !== 'undefined' && Array.isArray(rulesData)) {
      this.rules = rulesData;
    } else if (typeof window !== 'undefined' && window.rulesData && Array.isArray(window.rulesData)) {
      this.rules = window.rulesData;
    } else {
      this.rules = [
        {
          id: 'rule_nhatbinh_quaithao',
          items: ['ao_nhat_binh', 'non_quai_thao'],
          severity: 'critical',
          title: 'Cảnh báo: Áo Nhật Bình Triều Nguyễn không đi kèm phụ kiện bình dân.',
          description: 'Nhật Bình là lễ phục hoàng gia triều Nguyễn (Huế). Nón Quai Thao là phụ kiện dân gian Bắc Bộ. Hai vật phẩm này xung đột điển chế hoàng cung!',
          historical_lesson: 'Phụ nữ hoàng gia khi mặc Nhật Bình chỉ đội khăn vành dây vàng hoặc búi tóc cài trâm phượng hoàng.'
        }
      ];
    }
    this.isLoaded = true;
    console.log(`[CulturalValidator] Đã nạp ${this.rules.length} quy tắc văn hóa.`);
  }

  /**
   * Kiểm tra mảng các ID món đồ đang được trang bị
   * @param {Array<string>} currentOutfitIds Mảng id các items
   * @returns {Object|null} Trả về rule vi phạm đầu tiên hoặc null
   */
  validateOutfit(currentOutfitIds) {
    return this.validateOutfitAll(currentOutfitIds)[0] || null;
  }

  /**
   * Trả về tất cả quy tắc xung đột khớp với bản phối để Stylist có thể hướng dẫn đầy đủ.
   * @param {Array<string>} currentOutfitIds Mảng id các items
   * @returns {Array<Object>} Danh sách các quy tắc đang bị vi phạm
   */
  validateOutfitAll(currentOutfitIds) {
    if (!currentOutfitIds || currentOutfitIds.length < 2) {
      return [];
    }

    // Suppress speculative advisory pairs; keep only the explicit regional mix rule.
    const highConfidenceRuleIds = new Set(['rule_ao_ba_ba_quai_thao']);
    return this.rules.filter(rule =>
      highConfidenceRuleIds.has(rule.id) &&
      rule.items.every(itemId => currentOutfitIds.includes(itemId))
    );
  }

  /**
   * Tính toán Thước Đo Bản Sắc (Cultural Harmony Meter)
   * Trả về % Cung Đình (hoặc Dân Gian) vs % Streetwear kèm nhãn trạng thái
   * @param {Array<Object>} equippedItems Danh sách object item đang mặc
   */
  calculateHarmony(equippedItems = []) {
    const validItems = (equippedItems || []).filter(Boolean);

    if (validItems.length === 0) {
      return {
        tradPercent: 0,
        modernPercent: 0,
        tradLabel: 'Cung Đình',
        modernLabel: 'Streetwear',
        summaryText: '0% Cung Đình | 0% Streetwear',
        statusBadge: 'CHƯA CHỌN ĐỒ',
        isEmpty: true
      };
    }

    let tradScore = 0;
    let modernScore = 0;
    let folkCount = 0;
    let imperialCount = 0;

    validItems.forEach(item => {
      const w = this.categoryWeights[item.category] || 35;
      if (item.style === 'traditional') {
        tradScore += w;
        if (this.folkItemIds.has(item.id)) {
          folkCount++;
        } else {
          imperialCount++;
        }
      } else if (item.style === 'fusion') {
        // Món giao thoa đóng góp cả 2 bên (60% truyền thống, 40% đương đại)
        tradScore += w * 0.6;
        modernScore += w * 0.4;
        imperialCount++;
      } else {
        modernScore += w;
      }
    });

    const total = tradScore + modernScore;
    const tradPercent = total > 0 ? Math.round((tradScore / total) * 100) : 0;
    const modernPercent = 100 - tradPercent;

    // Nhãn di sản: Ưu tiên "Cung Đình" theo chuẩn thiết kế, hoặc "Dân Gian" nếu thuần dân gian
    const tradLabel = (folkCount > 0 && imperialCount === 0) ? 'Dân Gian' : 'Cung Đình';
    const modernLabel = 'Streetwear';

    const ids = validItems.map(i => i.id);
    const conflicts = this.validateOutfitAll(ids);
    const conflict = conflicts[0] || null;

    let statusBadge = 'GIAO THOA CÂN BẰNG';
    if (conflict) {
      statusBadge = 'XUNG ĐỘT ĐIỂN CHẾ';
    } else if (tradPercent === 100) {
      statusBadge = 'THUẦN VIỆT ĐIỂN CHẾ';
    } else if (modernPercent === 100) {
      statusBadge = 'STREETWEAR ĐƯƠNG ĐẠI';
    } else if (tradPercent >= 55 && tradPercent <= 75) {
      statusBadge = 'TỈ LỆ VÀNG NEO-HERITAGE';
    }

    return {
      tradPercent,
      modernPercent,
      tradLabel,
      modernLabel,
      summaryText: `${tradPercent}% ${tradLabel} | ${modernPercent}% ${modernLabel}`,
      statusBadge,
      hasConflict: Boolean(conflict),
      conflict,
      isEmpty: false
    };
  }

  /**
   * THƯỚC ĐO VẬN MỆNH (ĐÁNH GIÁ MỨC ĐỘ CỘNG HƯỞNG CỦA CÁC MÓN ĐỒ)
   * Đánh giá mức độ cộng hưởng của các món đồ: Độ cộng hưởng Y Linh [Thấp / Trung Bình / Hoàn Hảo]
   * @param {Array<Object>} equippedItems Mảng các vật phẩm đang trang bị
   * @param {string} themeKey Sự kiện ứng dụng hiện tại ('trang_nghiem', 'sang_trong', 'pha_cach')
   */
  evaluateStylistOutfit(equippedItems = [], themeKey = 'trang_nghiem') {
    const validItems = (equippedItems || []).filter(Boolean);
    const count = validItems.length;

    if (count === 0) {
      return {
        historyScore: 0,
        creativeScore: 0,
        totalScore: 0,
        resonanceLevel: 'Thấp',
        resonanceStatusText: 'Độ cộng hưởng Y Linh: Thấp',
        critiqueText: 'Bản phối chưa có áo và quần/váy. Hãy chọn đủ hai món để Y Linh có thể đánh giá tổng thể.',
        hasConflict: false,
        conflict: null,
        conflicts: []
      };
    }

    const ids = validItems.map(i => i.id);
    const conflicts = this.validateOutfitAll(ids);
    const conflict = conflicts[0] || null;
    const hasTrad = validItems.some(i => i.style === 'traditional' || i.style === 'fusion');
    const hasModern = validItems.some(i => i.style === 'modern' || i.style === 'fusion');
    const hasTop = validItems.some(i => i.category === 'ao');
    const hasBottom = validItems.some(i => i.category === 'quan');

    let historyScore = 0;
    let creativeScore = 0;
    let critiqueText = '';

    if (conflict) {
      // A configured rule matched the equipped items, so reduce the heritage score.
      historyScore = Math.max(35, Math.min(50, 40 + count * 2));
      creativeScore = Math.min(95, 80 + count * 3);
      critiqueText = `Cảnh báo xung đột bối cảnh phối đồ! ${conflicts.map(rule => rule.title || 'Có món đồ chưa phù hợp với bối cảnh').join(' ')}`;
    } else {
      if (hasTrad && hasModern) {
        // Tỉ lệ vàng giao thoa Neo-Heritage (Áo cổ phục + Quần/Giày hiện đại hoặc ngược lại)
        historyScore = Math.min(95, 78 + (hasTop ? 8 : 0) + count * 3);
        creativeScore = Math.min(98, 85 + count * 3);

        if (themeKey === 'pha_cach') {
          historyScore = Math.min(92, historyScore + 2);
          creativeScore = Math.min(98, creativeScore + 4);
          critiqueText = 'Giao thoa xuất sắc! Sự kết hợp giữa tà áo cổ truyền và tinh thần cách tân đương đại tạo nên hào quang rực rỡ, đưa di sản bước vào dòng chảy mới.';
        } else if (themeKey === 'sang_trong') {
          critiqueText = 'Một diện mạo thanh tao quý phái! Điểm xuyết chi tiết đương đại tinh tế giúp tôn vinh cốt cách hoàng tộc của Y Linh.';
        } else {
          critiqueText = 'Giao thoa huyền diệu giữa di sản ngàn năm và hơi thở thời đại mới, giữ trọn nét tôn nghiêm mà không hề câu nệ.';
        }
      } else if (hasTrad && !hasModern) {
        // Thuần cổ truyền điển chế
        historyScore = Math.min(100, 86 + count * 4);
        creativeScore = Math.min(80, 65 + count * 3);

        if (themeKey === 'trang_nghiem') {
          historyScore = Math.min(100, historyScore + 5);
          critiqueText = 'Chân khí ngút ngàn! Từng đường kim mũi chỉ toát lên sự tôn nghiêm, trang nhã hoàn hảo cho chốn linh thiêng.';
        } else {
          critiqueText = 'Bộ cổ phục giữ trọn hồn cốt Đại Việt với phom dáng chuẩn mực, thể hiện sự trân trọng sâu sắc với di sản tiền nhân.';
        }
      } else {
        // Thuần Streetwear đương đại
        historyScore = Math.max(30, Math.min(55, 35 + count * 3));
        creativeScore = Math.min(90, 75 + count * 4);
        critiqueText = 'Bộ trang phục mang hơi thở đường phố năng động, nhưng đang thiếu vắng linh hồn cổ phục Đại Việt. Hãy thử kết hợp thêm một tà Áo Tấc hoặc Nhật Bình!';
      }
    }

    if (!hasTop || !hasBottom) {
      if (!hasTop && !hasBottom) {
        critiqueText = 'Bản phối chưa có áo và quần/váy. Hãy chọn đủ hai món để Y Linh có thể đánh giá tổng thể.';
      } else if (!hasTop) {
        critiqueText = 'Bản phối đang thiếu áo. Hãy chọn thêm áo để hoàn thiện tổng thể.';
      } else {
        critiqueText = 'Bản phối đang thiếu quần/váy. Hãy chọn thêm một món mặc dưới để hoàn thiện tổng thể.';
      }
    }

    const totalScore = Math.round(historyScore * 0.5 + creativeScore * 0.5);

    let resonanceLevel = 'Thấp';
    if (conflict) {
      resonanceLevel = 'Thấp';
    } else if (totalScore >= 80 && count >= 2 && hasTop && hasBottom) {
      resonanceLevel = 'Hoàn Hảo';
    } else if (totalScore >= 50 && count >= 2 && hasTop && hasBottom) {
      resonanceLevel = 'Trung Bình';
    } else {
      resonanceLevel = 'Thấp';
    }

    return {
      historyScore,
      creativeScore,
      totalScore,
      resonanceLevel,
      resonanceStatusText: `Độ cộng hưởng Y Linh: ${resonanceLevel}`,
      critiqueText,
      hasConflict: Boolean(conflict),
      conflict,
      conflicts
    };
  }
}

if (typeof window !== 'undefined') {
  window.CulturalValidator = CulturalValidator;
}
