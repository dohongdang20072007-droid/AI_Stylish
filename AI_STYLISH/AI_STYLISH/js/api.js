/**
 * js/api.js
 * Tích hợp AI Stylist Review (Gemini API & Cultural Fallback),
 * Strict Outfit Matching, Hiệu ứng Typewriter, Quét Laser 3s và Commit Hash Watermark
 * Hoạt động mượt mà Offline 100% kết hợp Server API Proxy
 */

class LookbookAPI {
  constructor() {
    this.isRendering = false;
    this.typewriterTimer = null;
    this.currentCommitHash = 'a7f9b2';

    // DOM Elements
    this.modalEl = document.getElementById('lookbook-modal');
    this.scannerViewEl = document.getElementById('laser-scanner-view');
    this.resultViewEl = document.getElementById('lookbook-result-view');
    this.progressBarEl = document.getElementById('scanner-progress-bar');
    this.counterEl = document.getElementById('scanner-counter');

    this.renderBgLayerEl = document.getElementById('render-bg-layer');
    this.renderRealPersonImgEl = document.getElementById('render-real-person-img');
    this.wmComboNameEl = document.getElementById('wm-combo-name');
    this.cardCommitHashEl = document.getElementById('card-commit-hash');
    this.cardEventBadgeEl = document.getElementById('card-event-badge');
    this.resultTitleEl = document.getElementById('result-title');
    this.resultTagsEl = document.getElementById('result-tags');
    this.aiReviewTextEl = document.getElementById('ai-review-text');
    this.lastSnapshotDataUri = '';

    this.bindModalEvents();
  }

  bindModalEvents() {
    const btnClose = document.getElementById('btn-close-lookbook');
    const btnReRemix = document.getElementById('btn-re-remix');
    const btnDownload = document.getElementById('btn-download-lookbook');
    const btnSaveWardrobe = document.getElementById('btn-save-to-wardrobe');

    if (btnClose) btnClose.addEventListener('click', () => this.closeModal());
    if (btnReRemix) btnReRemix.addEventListener('click', () => this.closeModal());
    if (btnDownload) btnDownload.addEventListener('click', () => this.downloadLookbook());
    if (btnSaveWardrobe) btnSaveWardrobe.addEventListener('click', () => this.handleSaveToWardrobe());
  }

  handleSaveToWardrobe() {
    if (window.__vietPhucApp && window.__vietPhucApp.ui) {
      window.__vietPhucApp.ui.openSaveOutfitDialog(this.lastMatchResult?.title || 'Bản phối Gấm Vóc Phồn Hoa');
    }
  }

  /**
   * Sinh mã Commit Hash ngẫu nhiên 6 ký tự
   */
  generateCommitHash() {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 6; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  }

  /**
   * KẾT XUẤT BẢN PHỐI BẰNG AI VỚI STRICT OUTFIT MATCHING
   * Quét Laser 3s -> Khớp ID ra ảnh người thật tách nền -> Sinh review AI & đóng dấu Commit Hash
   */
  async generateAILookbook(currentOutfitIds, themeKey, currentOutfitItems = [], isConflict = false, conflictDetails = '') {
    if (this.isRendering) return;
    this.isRendering = true;

    // 1. Mở modal ở chế độ Quét Laser 3 giây
    this.openScanner();

    // 2. Sinh mã Commit Hash độc bản
    this.currentCommitHash = this.generateCommitHash();

    // 3. Khớp tổ hợp trang phục (Strict Outfit Matching)
    const matchResult = this.matchOutfitCombination(currentOutfitIds);
    this.lastMatchResult = matchResult;
    this.lastOutfitIds = currentOutfitIds;
    this.lastOutfitItems = currentOutfitItems;
    this.lastThemeKey = themeKey;
    this.lastSnapshotDataUri = await this.captureMannequinSnapshot();

    // 4. Chạy tiến trình quét laser chuẩn 3 giây (3000ms)
    await this.runLaserScanCountdown(3000);

    // 5. Giữ nguyên 100% background từ Scene 2 làm nền phía sau
    this.applyPreservedBackground(themeKey);

    // 6. Hiển thị ảnh người thật PNG tách nền & Clone Avatar chính xác
    if (this.renderRealPersonImgEl) {
      this.renderRealPersonImgEl.src = this.lastSnapshotDataUri || matchResult.real_render_url;
    }

    // 7. Cập nhật thông tin thẻ bài & Watermark với Commit Hash
    const commitTag = `COMMIT #${this.currentCommitHash.toUpperCase()}`;
    if (this.cardCommitHashEl) this.cardCommitHashEl.textContent = commitTag;

    let eventLabel = 'ĐI LỄ CHÙA / LỄ HỘI';
    if (themeKey === 'sang_trong' || themeKey === 'datiec') eventLabel = 'DẠ TIỆC ĐƯƠNG ĐẠI';
    if (themeKey === 'pha_cach' || themeKey === 'daopho') eventLabel = 'DẠO PHỐ NEON';
    if (this.cardEventBadgeEl) this.cardEventBadgeEl.textContent = eventLabel;

    if (this.wmComboNameEl) {
      this.wmComboNameEl.textContent = `${commitTag} - ${matchResult.combo_name.toUpperCase()}`;
    }
    if (this.resultTitleEl) this.resultTitleEl.textContent = matchResult.title;
    if (this.resultTagsEl) this.resultTagsEl.textContent = matchResult.tags;

    // 8. Chuyển sang Result View
    this.showResult();

    // 9. Tự động sinh AI Stylist Review với hiệu ứng Typewriter
    await this.fetchAndTypeAIReview(currentOutfitItems, themeKey, isConflict, conflictDetails);

    this.isRendering = false;
  }

  /**
   * BỘ QUY TẮC PHỐI ĐỒ CHÍNH XÁC (STRICT OUTFIT MATCHING)
   * Duyệt mảng currentOutfitIds và trả về ảnh người thật tương ứng
   */
  matchOutfitCombination(outfitIds) {
    const ids = Array.isArray(outfitIds) ? outfitIds : [];

    // TỔ HỢP 1: Nhật Bình + Sneaker Chunky (Streetwear Remix)
    if (ids.includes('ao_nhat_binh') && ids.includes('sneaker_chunky_ham_ho')) {
      return {
        real_render_url: 'assets/images/real_renders/real_render_nhatbinh_sneaker.png',
        combo_name: 'Nhật Bình Cung Đình x Chunky Sneaker',
        title: 'HIGH-LOW FUSION: HOÀNG GIA CHÂU Á & ĐƯỜNG PHỐ',
        tags: 'Áo Nhật Bình · Quần Lụa Trắng · Sneaker Chunky Dạ Quang'
      };
    }

    // TỔ HỢP 2: Áo Tấc + Quần Cargo Techwear
    if (ids.includes('ao_tac') && ids.includes('quan_cargo')) {
      return {
        real_render_url: 'assets/images/real_renders/real_render_aotac_cargo.png',
        combo_name: 'Áo Tấc Ngũ Thân x Cargo Techwear',
        title: 'CYBER-WARRIOR: NHO NHÃ HOÀNG TỘC & CHIẾN BINH TƯƠNG LAI',
        tags: 'Áo Tấc Tay Thụng · Quần Cargo Túi Hộp · Tech Straps'
      };
    }

    // TỔ HỢP 3: Áo Tấc + Quần Jeans Rách
    if (ids.includes('ao_tac') && ids.includes('quan_jeans_rach')) {
      return {
        real_render_url: 'assets/images/real_renders/real_render_aotac_jeans.png',
        combo_name: 'Áo Tấc Tay Thụng x Jeans Rách Streetwear',
        title: 'NEO-HERITAGE: QUYỀN QUÝ CỔ ĐIỂN & NỔI LOẠN GRUNGE',
        tags: 'Áo Tấc Tím Huế · Quần Jeans Wash Rách · Giày Da Cổ Thấp'
      };
    }

    // TỔ HỢP 4: Áo Giao Lĩnh + Combat Boots
    if (ids.includes('ao_giao_linh') && ids.includes('combat_boots_da_den')) {
      return {
        real_render_url: 'assets/images/real_renders/real_render_giaolinh_boots.png',
        combo_name: 'Áo Giao Lĩnh Cổ Chéo x Combat Boots Chiến Binh',
        title: 'AVANT-GARDE: SĨ PHU ĐẠI VIỆT TRONG DÁNG HÌNH HIỆP KHÁCH',
        tags: 'Áo Giao Lĩnh Xanh Rêu · Dải Lưng Đỏ · Bốt Da Chiến Binh'
      };
    }

    // TỔ HỢP 5: Áo Yếm + Quần Jeans / Cargo / Váy
    if (ids.includes('ao_yem') && (
      ids.includes('quan_jeans_rach') ||
      ids.includes('quan_cargo') ||
      ids.includes('female_cargo_jean') ||
      ids.includes('vay_dup_to_tam')
    )) {
      return {
        real_render_url: 'assets/images/real_renders/real_render_aoyem_jeans.png',
        combo_name: 'Áo Yếm Cánh Sen Lụa Tơ x Quần Jeans Rách',
        title: 'Y2K FUSION: QUYẾN RŨ DÂN GIAN & THỜI TRANG ĐƯỜNG PHỐ',
        tags: 'Áo Yếm Lụa Đào · Quần Denim Cạp Trễ · Guốc Gỗ Mộc'
      };
    }

    // TỔ HỢP 6: Áo Ngũ Thân + Kính Cyberpunk
    if (ids.includes('ao_ngu_than') && (ids.includes('kinh_cyberpunk_neon') || ids.includes('sneaker_chunky_ham_ho'))) {
      return {
        real_render_url: 'assets/images/real_renders/real_render_nguthan_cyberpunk.png',
        combo_name: 'Áo Ngũ Thân Khăn Đóng x Kính Cyber HUD Neon',
        title: 'RETRO-FUTURISM: LỮ KHÁCH THỜI GIAN THẾ KỶ 22',
        tags: 'Áo Ngũ Thân Vàng Hoàng Gia · Khăn Đóng · Kính Râm HUD Cyberpunk'
      };
    }

    // TỔ HỢP 7: Nhật Bình Hoàng Gia Nguyên Bản
    if (ids.includes('ao_nhat_binh')) {
      return {
        real_render_url: 'assets/images/real_renders/real_render_nhatbinh.png',
        combo_name: 'Đại Lễ Phục Nhật Bình Triều Nguyễn',
        title: 'IMPERIAL HERITAGE: BẢN NGUYÊN SANG TRỌNG HOÀNG TỘC',
        tags: 'Áo Nhật Bình Chỉ Kim · Quần Lụa Trắng · Hài Thêu Phượng Hoàng'
      };
    }

    // TỔ HỢP 8: Áo Tấc chuẩn chỉ
    if (ids.includes('ao_tac')) {
      return {
        real_render_url: 'assets/images/real_renders/real_render_aotac_jeans.png',
        combo_name: 'Đại Lễ Phục Áo Tấc Tay Thụng',
        title: 'TRANG NGHIÊM NHO NHÃ: ĐẠI LỄ PHỤC CỔ TRUYỀN',
        tags: 'Áo Tấc Ngũ Thân · Quần Lụa · Phong Thái Ung Dung'
      };
    }

    // TỔ HỢP DỰ PHÒNG
    return {
      real_render_url: 'assets/images/real_renders/real_render_aotac_cargo.png',
      combo_name: 'Việt Phục Giao Thoa Đương Đại',
      title: 'HERITAGE REMIX: TỔNG HÒA BẢN SẮC & HƠI THỞ THỜI ĐẠI',
      tags: 'Cổ Phục Việt Nam · Phụ Kiện Tương Phản · Phong Cách Tự Do'
    };
  }

  async captureMannequinSnapshot() {
    const compositor = document.getElementById('mannequin-compositor');
    if (!compositor) return '';

    try {
      if (typeof window.html2canvas === 'function') {
        const canvas = await window.html2canvas(compositor, {
          backgroundColor: null,
          scale: Math.min(2, window.devicePixelRatio || 1),
          useCORS: true,
          logging: false,
          onclone: clonedDocument => {
            clonedDocument.querySelectorAll('.mannequin-floor-shadow, #stage-laser-scanner').forEach(el => el.remove());
          }
        });
        return canvas.toDataURL('image/png');
      }
    } catch (error) {
      console.warn('[LookbookAPI] Không thể chụp snapshot mannequin bằng html2canvas:', error);
    }

    const canvas = document.createElement('canvas');
    const width = Math.max(1, compositor.clientWidth);
    const height = Math.max(1, compositor.clientHeight);
    canvas.width = width * 2;
    canvas.height = height * 2;
    const context = canvas.getContext('2d');
    if (!context) return '';
    context.scale(2, 2);
    compositor.querySelectorAll('img.mannequin-layer:not(.hidden)').forEach(layer => {
      if (layer.complete && layer.naturalWidth) context.drawImage(layer, 0, 0, width, height);
    });
    return canvas.toDataURL('image/png');
  }

  /**
   * Sinh nội dung nhận xét AI Stylist chi tiết 3-4 dòng theo chuẩn yêu cầu
   * @param {Array|Object} currentOutfit - Mảng hoặc object các món đồ người dùng đang mặc
   * @param {string} themeKey - Khóa sự kiện (trang_nghiem, sang_trong, pha_cach)
   * @returns {string} Đoạn nhận xét hoàn chỉnh, sâu sắc
   */
  generateAIReview(currentOutfit, themeKey = 'trang_nghiem') {
    let items = [];
    if (Array.isArray(currentOutfit)) {
      items = currentOutfit.filter(Boolean);
    } else if (currentOutfit && typeof currentOutfit === 'object') {
      items = Object.values(currentOutfit).filter(Boolean);
    }

    const aoItem = items.find(i => i.category === 'ao');
    const quanItem = items.find(i => i.category === 'quan');
    const phukienItem = items.find(i => i.category === 'phukien');
    const giayItem = items.find(i => i.category === 'giay');

    const tenAo = aoItem ? aoItem.name : 'Áo Tấc Cổ Phục';
    const tenQuan = quanItem ? quanItem.name : (giayItem ? giayItem.name : 'Quần Lụa Trắng Ống Rộng');
    const tenPhuKien = phukienItem ? phukienItem.name : '';

    // 1. Câu khen ngợi tổng thể
    const praiseSentence = 'Bản phối thể hiện tư duy đột phá và gu thẩm mỹ sắc bén khi kết hợp chuẩn mực di sản với tinh thần đương đại đầy kiêu hãnh.';

    // 2. Câu phân tích sự kết hợp giữa Áo và Quần/Phụ kiện
    let comboSentence = '';
    if (tenPhuKien) {
      comboSentence = `Sự kết hợp tinh tế giữa ${tenAo} truyền thống với ${tenQuan}, điểm xuyết cùng ${tenPhuKien}, tạo nên một cấu trúc thị giác phân tầng vừa uy nghiêm vừa giàu năng lượng sáng tạo.`;
    } else {
      comboSentence = `Bản phối thể hiện tư duy đột phá khi kết hợp ${tenAo} truyền thống với ${tenQuan}. Sự va chạm giữa phom dáng tôn nghiêm và phong cách hiện đại tạo ra nét tương phản thị giác bùng nổ, phá vỡ định kiến cũ.`;
    }

    // 3. Câu đánh giá về tính ứng dụng trong bối cảnh thực tế
    let contextSentence = '';
    if (themeKey === 'sang_trong' || themeKey === 'datiec') {
      contextSentence = 'Sự tương phản này tạo ra một góc nhìn Haute Couture Á Đông lộng lẫy, cực kỳ phù hợp cho các buổi dạ tiệc nghệ thuật đương đại mà vẫn giữ vững cốt cách hoàng gia.';
    } else if (themeKey === 'pha_cach' || themeKey === 'daopho') {
      contextSentence = 'Sự tương phản này tạo ra một góc nhìn Cyberpunk cực kỳ ấn tượng, rất phù hợp cho những sự kiện đương đại hay dạo phố đêm nhưng vẫn giữ được hệ gen di sản Đại Việt ngàn năm.';
    } else {
      contextSentence = 'Thiết kế vừa tôn trọng tuyệt đối đạo lý và điển chế truyền thống, vừa mang lại sự tự tin, phóng khoáng lý tưởng cho các lễ hội văn hóa thiêng liêng.';
    }

    return `${praiseSentence} ${comboSentence} ${contextSentence}`;
  }

  /**
   * Gọi hiển thị nhận xét AI Stylist vào thẻ chứa của khung Lookbook
   */
  async fetchAndTypeAIReview(currentOutfitItems, themeKey, isConflict = false, conflictDetails = '') {
    const reviewEl = this.aiReviewTextEl || document.getElementById('ai-review-text');
    if (!reviewEl) return;

    if (this.typewriterTimer) {
      clearInterval(this.typewriterTimer);
      this.typewriterTimer = null;
    }

    // Sinh lời nhận xét chi tiết 3-4 dòng
    const reviewText = this.generateAIReview(currentOutfitItems, themeKey);

    // Render trực tiếp vào phần tử thẻ chứa của khung AI Stylist
    reviewEl.textContent = reviewText;
    reviewEl.classList.remove('typing');
  }

  /**
   * Giữ nguyên 100% Background của sự kiện làm nền phía sau ảnh người thật
   */
  applyPreservedBackground(themeKey) {
    if (!this.renderBgLayerEl) return;
    let bgFile = 'bg_dan_gian.png';
    if (themeKey === 'sang_trong' || themeKey === 'datiec' || themeKey === 'cungdinh') {
      bgFile = 'bg_cung_dinh.png';
    } else if (themeKey === 'pha_cach' || themeKey === 'daopho' || themeKey === 'genz') {
      bgFile = 'bg_gen_z.png';
    }
    this.renderBgLayerEl.style.backgroundImage = `url('assets/images/${bgFile}')`;
  }

  /**
   * Clone avatar-container từ phòng thử đồ vào modal và diệt toàn bộ chữ rác/watermark
   */
  cloneAvatarToModal() {
    const sourceAvatar = document.querySelector('.avatar-container') || document.getElementById('avatar-container');
    const targetStage = document.getElementById('render-export-frame') || document.querySelector('.modal-left-column') || document.querySelector('.collector-card-stage');

    if (!sourceAvatar || !targetStage) return;

    // Tìm hoặc tạo wrapper cho bản clone
    let cloneWrap = targetStage.querySelector('.modal-avatar-clone-wrap');
    if (!cloneWrap) {
      cloneWrap = document.createElement('div');
      cloneWrap.className = 'modal-avatar-clone-wrap';
      targetStage.appendChild(cloneWrap);
    }
    cloneWrap.innerHTML = '';

    // Clone sâu phần tử .avatar-container
    const avatarClone = sourceAvatar.cloneNode(true);
    avatarClone.id = 'modal-avatar-clone';

    // Bổ sung lệnh tìm và xóa (remove) thẻ sinh ra chữ "GẤM VÓC PHỒN HOA" / watermark / title
    const junkElements = avatarClone.querySelectorAll('[class*="title"], [class*="watermark"], .wm-title, .render-watermark, .stage-laser-scanner, .stage-laser-hud, #stage-laser-scanner');
    junkElements.forEach(el => el.remove());

    // Cũng dọn dẹp các thẻ watermark thừa trực tiếp trong targetStage
    const targetJunk = targetStage.querySelectorAll('.render-watermark, .collector-card-footer, [class*="watermark"], .collector-card-topbar, .card-event-badge');
    targetJunk.forEach(el => el.remove());

    cloneWrap.appendChild(avatarClone);
  }

  /**
   * Hiệu ứng Laser Scan 3 giây (3000ms) kèm thanh tiến trình
   */
  runLaserScanCountdown(durationMs) {
    return new Promise((resolve) => {
      const startTime = performance.now();
      const interval = 30;

      const timer = setInterval(() => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(Math.round((elapsed / durationMs) * 100), 100);

        if (this.progressBarEl) this.progressBarEl.style.width = `${progress}%`;
        if (this.counterEl) this.counterEl.textContent = `${progress}%`;

        if (progress >= 100) {
          clearInterval(timer);
          setTimeout(resolve, 200);
        }
      }, interval);
    });
  }

  openScanner() {
    document.body.classList.add('lookbook-active');
    this.modalEl.classList.remove('hidden');
    this.scannerViewEl.classList.remove('hidden');
    this.resultViewEl.classList.add('hidden');
    if (this.progressBarEl) this.progressBarEl.style.width = '0%';
    if (this.counterEl) this.counterEl.textContent = '0%';
  }

  showResult() {
    this.scannerViewEl.classList.add('hidden');
    this.resultViewEl.classList.remove('hidden');
  }

  closeModal() {
    this.modalEl.classList.add('hidden');
    document.body.classList.remove('lookbook-active');
    this.scannerViewEl.classList.remove('hidden');
    this.resultViewEl.classList.add('hidden');
    if (this.typewriterTimer) clearInterval(this.typewriterTimer);
  }

  /**
   * Tải ảnh Lookbook về máy kèm Watermark bằng HTML2Canvas
   */
  async downloadLookbook() {
    const exportFrame = document.getElementById('render-export-frame');
    if (!exportFrame) return;

    const btn = document.getElementById('btn-download-lookbook');
    const originalText = btn ? btn.textContent : '';
    if (btn) btn.textContent = '⏳ ĐANG KẾT XUẤT ẢNH...';

    try {
      if (window.html2canvas) {
        const canvas = await window.html2canvas(exportFrame, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#07070b'
        });

        const link = document.createElement('a');
        const imgDataUri = canvas.toDataURL('image/png');
        link.download = `GamVocPhonHoa_Commit_${this.currentCommitHash}_${Date.now()}.png`;
        link.href = imgDataUri;
        link.click();

        // Ngầm lưu bản phối vào database cá nhân (Requirement 3)
        if (window.__vietPhucApp && window.__vietPhucApp.ui) {
          window.__vietPhucApp.ui.saveOutfitSilently(
            this.lastMatchResult?.title || 'Bản phối Gấm Vóc Phồn Hoa',
            imgDataUri
          );
        }
      } else {
        // Fallback canvas creation
        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1440;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#07070b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 36px serif';
        ctx.fillText('GẤM VÓC PHỒN HOA', 60, 100);
        ctx.font = '24px monospace';
        ctx.fillText(`COMMIT #${this.currentCommitHash.toUpperCase()}`, 60, 150);

        const link = document.createElement('a');
        link.download = `GamVocPhonHoa_Commit_${this.currentCommitHash}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }

      if (btn) btn.textContent = '✓ TẢI VỀ THÀNH CÔNG!';
      setTimeout(() => {
        if (btn) btn.textContent = originalText;
      }, 2000);
    } catch (err) {
      console.error('[LookbookAPI] Lỗi xuất ảnh:', err);
      if (btn) btn.textContent = '❌ LỖI XUẤT ẢNH';
      setTimeout(() => {
        if (btn) btn.textContent = originalText;
      }, 2000);
    }
  }
}

if (typeof window !== 'undefined') {
  window.LookbookAPI = LookbookAPI;
  window.generateAIReview = function(currentOutfit, themeKey) {
    const api = (window.__vietPhucApp && window.__vietPhucApp.ui && window.__vietPhucApp.ui.lookbookAPI) || new LookbookAPI();
    return api.generateAIReview(currentOutfit, themeKey);
  };
}
