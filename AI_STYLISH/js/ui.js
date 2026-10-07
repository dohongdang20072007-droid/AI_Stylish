let currentDialogueIndex = 0;
let isTyping = false;
const scene1Dialogues = [
  {
    speaker: 'TẤM',
    text: 'Huhu... Trống đình làng giục giã, ai cũng xúng xính yếm lụa đào đi trẩy hội. Thân con áo vá víu, lấm lem bùn đất thế này, lấy gì mà mặc đi xem hội đây...',
    video: 'assets/videos/camkhoc.mp4',
    characterClass: 'scene1-dialogue-tam'
  },
  {
    speaker: 'ÔNG BỤT',
    text: 'Làm sao con khóc? Hỡi người con gái thảo hiền, ta đã rẽ mây mở ra \'Huyễn cảnh dệt mộng\' cho con rồi. Hãy lau nước mắt, bước vào ướm thử gấm vóc phồn hoa và tự tay dệt nên phép màu đêm nay!',
    video: 'assets/videos/ongbut.mp4',
    characterClass: 'scene1-dialogue-but'
  }
];

/**
 * js/ui.js
 * Quản lý giao diện, luồng chuyển Scene 1 -> 2 -> 3,
 * Auto-Snap Ma-nơ-canh, Video Background động, Bộ chọn Tông da, Nhuộm màu trang phục,
 * Smart Lore Tooltip và Bắt xung đột văn hóa (Time Paradox Glitch)
 * Hoạt động Offline 100% bằng Vanilla JS thuần
 */

class AudioManager {
  constructor(onBlocked) {
    this.audio = new Audio();
    this.audio.loop = true;
    this.audio.preload = 'none';
    this.audio.volume = 0.35;
    this.audio.muted = true;
    this.currentSrc = '';
    this.onBlocked = onBlocked;
  }

  switchTrack(src) {
    if (this.currentSrc === src) return false;
    this.audio.pause();
    this.audio.currentTime = 0;
    this.currentSrc = src;
    this.audio.src = src;
    this.audio.load();
    return true;
  }

  play() {
    const playPromise = this.audio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(error => {
        if (error.name !== 'AbortError' && typeof this.onBlocked === 'function') {
          this.onBlocked(error);
        }
      });
    }
    return playPromise;
  }

  pause() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}

class UIManager {
  constructor(culturalValidator) {
    this.validator = culturalValidator;
    this.items = [];
    this.currentCategory = 'ao';
    this.currentSubFilter = 'all';
    this.currentHistoryCategory = 'all';
    this.currentHistoryStyle = 'all';

    // State trang phục đang mặc
    this.currentOutfit = {
      ao: null,
      quan: null,
      phukien: null,
      giay: null
    };

    // State màu sắc cho từng lớp trang phục (Dynamic Hue-Rotate)
    this.colors = {
      ao: 'original',
      quan: 'original',
      phukien: 'original',
      giay: 'original'
    };

    this.activeColorTarget = 'ao'; // 'ao', 'quan', 'phukien', 'giay'
    this.currentSkinTone = 'fair'; // 'fair', 'natural', 'tanned', 'deep'
    this.isWardrobeOpen = false; // Trạng thái mở/đóng tủ đồ

    // State sự kiện & giới tính
    this.currentTheme = 'trang_nghiem'; // 'trang_nghiem' (lễ hội), 'sang_trong' (dạ tiệc), 'pha_cach' (dạo phố)
    this.currentGender = 'nam'; // 'nam' hoặc 'nu'
    this.soundEnabled = true;
    this.audioUnlocked = false;

    // DOM Caching
    this.gridEl = document.getElementById('wardrobe-grid');
    this.alertBoxEl = document.getElementById('cultural-alert-box');
    this.alertTitleEl = document.getElementById('alert-title');
    this.alertDescEl = document.getElementById('alert-desc');
    this.equippedCountEl = document.getElementById('equipped-count');

    // AI Stylist Scoring & Critique Widget DOM
    this.statHistoryScoreEl = document.getElementById('stat-history-score');
    this.statCreativeScoreEl = document.getElementById('stat-creative-score');
    this.statTotalScoreEl = document.getElementById('stat-total-score');
    this.barHistoryEl = document.getElementById('bar-history');
    this.barCreativeEl = document.getElementById('bar-creative');
    this.widgetCritiqueTextEl = document.getElementById('widget-critique-text');

    // Tooltip DOM
    this.tooltipEl = document.getElementById('lore-tooltip');
    this.tooltipTitleEl = document.getElementById('tooltip-title');
    this.tooltipEraEl = document.getElementById('tooltip-era');
    this.tooltipHistoryEl = document.getElementById('tooltip-history');
    this.tooltipUsageEl = document.getElementById('tooltip-usage');

    // NPC Y Linh Mini DOM (Hệ thống Thông tin & Cảnh báo)
    this.miniYlinhEl = document.getElementById('mini-but');
    this.ylinhSpeechTextEl = document.getElementById('ylinh-speech-text');
    this.ylinhStatusTextEl = document.getElementById('ylinh-status-text');
    this.ylinhChibiAvatarEl = document.getElementById('ylinh-chibi-avatar');
    this.ylinhDialogueBubbleEl = document.getElementById('ylinh-dialogue-bubble');

    // Layers DOM
    this.compositorEl = document.getElementById('mannequin-compositor');
    this.mannequinBaseEl = document.getElementById('mannequin-base-img');
    this.layerAoEl = document.getElementById('layer-ao');
    this.layerQuanEl = document.getElementById('layer-quan');
    this.layerPhukienEl = document.getElementById('layer-phukien');
    this.layerGiayEl = document.getElementById('layer-giay');

    // Video Background DOM
    this.dynamicBgVideo = document.getElementById('dynamic-bg');
    this.stageBackdropEl = document.getElementById('stage-backdrop');
    this.ambientCanvas = document.getElementById('ambient-fx-canvas');
    this.ambientCtx = null;
    this.ambientAnimationId = null;
    this.ambientParticles = [];
    this.ambientTime = 0;

    // Lookbook API Reference
    this.lookbookAPI = null;

    // 1. User Authentication State (LỖI 1 FIX: CHƯA ĐĂNG NHẬP THÌ NULL, KHÔNG HIỆN THÔNG TIN Ở SCENE 1)
    const storedUser = localStorage.getItem('vietphuc_current_user');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    this.currentGender = this.currentUser?.gender || 'nam';
    this.currentTerminalSlide = 1;
    this.themeAudio = null;
    this.audioManager = null;
    this.audioBlocked = false;
    this.audioInteractionHandler = null;
    this.synthIntervalId = null;

    // 2. Gamification: The Heritage Vault State (Requirement 4)
    const storedUnlocked = localStorage.getItem('vietphuc_unlocked_items');
    this.unlockedItems = new Set(storedUnlocked ? JSON.parse(storedUnlocked) : []);
    this.vaultActiveItem = null;
    this.vaultCurrentQuestion = null;
    this.vaultQuizQuestions = [];
    this.vaultQuizQuestionIndex = 0;
    this.vaultQuizCorrectCount = 0;
    this.vaultConfettiAnimationId = null;

    // 3. Wardrobe Collection State (Requirement 3)
    this.savedOutfits = [];
    this.loadSavedOutfits();

    // 4. Nexus Feed State (Requirement 5)
    this.nexusPosts = [];
    this.currentNexusFilter = 'all';
    this.loadNexusPosts();

    // 5. Unified Navigation & Scene Timers
    this.isTransitioning = false;
    this.scene1Timer = null;
    this.npcHistoryTimer = null;
    this.npcHistoryTypewriterTimer = null;
    this.ylinhSpeechTimer = null;
    this.ylinhSpeechSource = null;
    this.lastStylistSpeech = null;
    this.scene1IntroRun = 0;
    this.scene1DialogueIndex = 0;
    this.scene1Typing = false;
    this.scene1CurrentText = '';
    this.scene1SkipRequested = false;
    this.scene1Dialogues = scene1Dialogues;
    this.butSpeechRun = 0;
  }

  playIntroVideo() {
    const introVideo = document.getElementById('scene1-intro-video');
    const introScene = document.getElementById('scene-1');
    if (!introVideo || !introScene?.classList.contains('active-scene')) return;

    introVideo.muted = true;
    introVideo.playsInline = true;
    const playPromise = introVideo.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(error => {
        console.warn('[UIManager] Không thể tự phát video intro:', error);
      });
    }
  }

  /**
   * Khởi tạo: Nạp dữ liệu items từ data/items.js
   */
  init() {
    try {
      if (typeof itemsData !== 'undefined' && Array.isArray(itemsData)) {
        this.items = itemsData;
      } else if (typeof window !== 'undefined' && window.itemsData && Array.isArray(window.itemsData)) {
        this.items = window.itemsData;
      } else {
        this.items = [];
      }
      console.log(`[UIManager] Đã nạp thành công ${this.items.length} vật phẩm tủ đồ.`);
    } catch (e) {
      console.error('[UIManager] Lỗi nạp itemsData:', e);
      this.items = [];
    }

    try {
      if (window.LookbookAPI) {
        this.lookbookAPI = new window.LookbookAPI();
      }
    } catch (e) {
      console.warn('[UIManager] Không thể nạp LookbookAPI:', e);
    }

    // Gán hàm điều hướng chung ra toàn cục window.navigateToScene
    if (typeof window !== 'undefined') {
      window.navigateToScene = (target) => this.navigateToScene(target);
    }

    // Helper an toàn bọc từng phân hệ để không bao giờ làm sập DOM
    const safeExec = (label, fn) => {
      try {
        fn();
      } catch (err) {
        console.error(`[UIManager] Lỗi khi chạy ${label}:`, err);
      }
    };

    safeExec('initAudioPlayer', () => this.initAudioPlayer());
    safeExec('initAmbientFx', () => this.initAmbientFx());
    safeExec('bindScene1Events', () => this.bindScene1Events());
    safeExec('bindScene2Events', () => this.bindScene2Events());
    safeExec('bindScene3Events', () => this.bindScene3Events());
    safeExec('bindYlinhDrag', () => this.bindYlinhDrag());
    safeExec('bindCustomizationEvents', () => this.bindCustomizationEvents());
    safeExec('bindTopNavEvents', () => this.bindTopNavEvents());
    safeExec('bindTooltipEvents', () => this.bindTooltipEvents());

    // Cập nhật các phân hệ mới
    safeExec('initAuthHub', () => this.initAuthHub());
    safeExec('initHeritageVault', () => this.initHeritageVault());
    safeExec('initWardrobeView', () => this.initWardrobeView());
    safeExec('initNexusView', () => this.initNexusView());
    safeExec('updateUserHeaderUI', () => this.updateUserHeaderUI());
    safeExec('updateWardrobeCountBadge', () => this.updateWardrobeCountBadge());

    // Khởi tạo trạng thái ban đầu
    safeExec('applyGender', () => this.applyGender(this.currentGender, false));
    safeExec('applyTheme', () => this.applyTheme(this.currentTheme, false));
    safeExec('applySkinTone', () => this.applySkinTone(this.currentSkinTone));
    safeExec('updateColorTargetLabel', () => this.updateColorTargetLabel());
    safeExec('renderWardrobe', () => this.renderWardrobe());
    safeExec('initHistoryView', () => this.initHistoryView());
    safeExec('updateAutoCheckAndScoring', () => this.updateAutoCheckAndScoring(false));

    // Đảm bảo kích hoạt hiển thị Scene 1 ngay lập tức khi khởi tạo (không chạy transition)
    safeExec('executeSceneSwitch(scene-1)', () => this.executeSceneSwitch('scene-1'));
    safeExec('playIntroVideo', () => this.playIntroVideo());
  }

  /* ========================================================================
     1. SCENE 1: CINEMATIC DARK FANTASY INTRO — LỜI GỌI Y LINH
     ======================================================================== */
  bindScene1Events() {
    const actionButton = document.getElementById('scene1-action');
    if (actionButton) {
      actionButton.addEventListener('click', () => this.exitScene1ToRegistration());
    }

    document.getElementById('scene-1')?.addEventListener('click', event => {
      if (event.target.closest('button')) return;
      this.finishScene1Typing();
    });

    document.body.addEventListener('click', event => {
      const button = event.target.closest('#scene1-next, .btn-next');
      if (!button) return;
      event.preventDefault();
      console.log('ĐÃ BẮT ĐƯỢC CLICK NÚT TIẾP THEO!');
      if (this.scene1Typing || isTyping) {
        this.finishScene1Typing();
        return;
      }
      this.advanceScene1Intro();
    });
    document.getElementById('scene1-back')?.addEventListener('click', () => this.goBackScene1Intro());

    const btnBackToIntro = document.getElementById('btn-auth-back-to-scene-1');
    if (btnBackToIntro) {
      btnBackToIntro.addEventListener('click', () => {
        this.navigateToScene('scene-1');
      });
    }
  }

  waitScene1(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  waitForScene1Video(video) {
    if (!video || !video.readyState) return Promise.resolve();
    return new Promise(resolve => {
      const onReady = () => {
        video.removeEventListener('canplay', onReady);
        resolve();
      };
      video.addEventListener('canplay', onReady, { once: true });
      setTimeout(onReady, 1500);
    });
  }

  finishScene1Typing() {
    if (!this.scene1Typing && !isTyping) return;
    const textEl = document.getElementById('scene1-dialogue-text');
    const cursorEl = document.querySelector('.scene1-typewriter-cursor');
    if (textEl) textEl.textContent = this.scene1CurrentText;
    if (cursorEl) cursorEl.style.display = 'none';
    this.scene1SkipRequested = true;
  }

  async typeScene1Text(text, runId) {
    const textEl = document.getElementById('scene1-dialogue-text');
    const cursorEl = document.querySelector('.scene1-typewriter-cursor');
    if (!textEl) return false;

    this.scene1CurrentText = text;
    this.scene1SkipRequested = false;
    this.scene1Typing = true;
    isTyping = true;
    textEl.textContent = '';
    if (cursorEl) cursorEl.style.display = 'inline-block';
    for (const character of text) {
      if (runId !== this.scene1IntroRun) {
        this.scene1Typing = false;
        isTyping = false;
        return false;
      }
      if (this.scene1SkipRequested) {
        textEl.textContent = text;
        if (cursorEl) cursorEl.style.display = 'none';
        this.scene1SkipRequested = false;
        this.scene1Typing = false;
        isTyping = false;
        return true;
      }
      textEl.textContent += character;
      await this.waitScene1(character === ' ' ? 16 : 34);
    }
    if (cursorEl) cursorEl.style.display = 'none';
    this.scene1Typing = false;
    isTyping = false;
    return runId === this.scene1IntroRun;
  }

  async switchScene1Video(videoSource, runId) {
    const video = document.getElementById('scene1-intro-video');
    const mist = document.getElementById('scene1-mist-overlay');
    const dialogue = document.getElementById('scene1-dialogue');
    if (!video || !mist || !dialogue) return false;

    mist.classList.add('scene1-mist-cover');
    await this.waitScene1(900);
    if (runId !== this.scene1IntroRun) return false;

    video.pause();
    video.src = videoSource;
    video.load();
    dialogue.classList.remove('scene1-dialogue-visible', 'scene1-dialogue-but');
    await this.waitForScene1Video(video);
    video.play().catch(() => {});
    await this.waitScene1(120);
    mist.classList.remove('scene1-mist-cover');
    return true;
  }

  async runScene1Intro() {
    const runId = ++this.scene1IntroRun;
    this.scene1DialogueIndex = 0;
    currentDialogueIndex = 0;
    isTyping = false;
    const video = document.getElementById('scene1-intro-video');
    const dialogue = document.getElementById('scene1-dialogue');
    const actionButton = document.getElementById('scene1-action');
    const nextButton = document.getElementById('scene1-next');
    const backButton = document.getElementById('scene1-back');
    const textEl = document.getElementById('scene1-dialogue-text');
    const speaker = document.querySelector('.scene1-dialogue-kicker');
    if (!video || !dialogue || !textEl) return;

    actionButton?.setAttribute('hidden', '');
    actionButton?.classList.remove('scene1-action-visible');
    document.querySelector('.scene1-dialogue-controls')?.removeAttribute('hidden');
    if (speaker) speaker.textContent = this.scene1Dialogues[0].speaker;
    nextButton?.removeAttribute('hidden');
    if (nextButton) nextButton.textContent = '[ TIẾP THEO ❯ ]';
    if (backButton) backButton.disabled = true;
    dialogue.className = `scene1-dialogue ${this.scene1Dialogues[0].characterClass}`;
    textEl.textContent = '';
    video.src = 'assets/videos/camkhoc.mp4';
    video.load();
    video.play().catch(() => {});
    await this.waitScene1(300);
    if (runId !== this.scene1IntroRun) return;
    dialogue.classList.add('scene1-dialogue-visible');
    nextButton?.removeAttribute('hidden');

    await this.typeScene1Text(this.scene1Dialogues[0].text, runId);
  }

  async advanceScene1Intro() {
    try {
      console.log('1. Đã nhận click. Index hiện tại:', currentDialogueIndex);
      const nextButton = document.getElementById('scene1-next');
      if (!nextButton) {
        console.error('LỖI CHÍ MẠNG: Không tìm thấy #scene1-next.');
        return;
      }
      if (nextButton.hasAttribute('hidden')) return;

      if (isTyping || this.scene1Typing) {
        this.finishScene1Typing();
        return;
      }

      currentDialogueIndex += 1;
      console.log('2. Index mới sau khi tăng:', currentDialogueIndex);

      if (currentDialogueIndex === 1) {
        console.log('3. Bắt đầu chuyển cảnh sang Ông Bụt');
        const videoEl = document.querySelector('#scene1-intro-video');
        const speakerEl = document.querySelector('.scene1-dialogue-kicker');
        const textEl = document.querySelector('#scene1-dialogue-text');
        const mistEl = document.querySelector('#scene1-mist-overlay');

        if (!videoEl || !speakerEl || !textEl || !mistEl) {
          console.error('LỖI CHÍ MẠNG: DOM bị null. Hãy đối chiếu lại file HTML!');
          return;
        }

        videoEl.pause();
        speakerEl.textContent = this.scene1Dialogues[1].speaker;
        console.log('4. Đã xác nhận DOM. Bắt đầu đổi video và chạy Typewriter.');
        await this.showScene1Dialogue(1);
        console.log('4. Đã đổi video và tên. Bắt đầu chạy Typewriter.');
        return;
      }

      if (currentDialogueIndex > 1) {
        this.scene1DialogueIndex = currentDialogueIndex;
        const actionButton = document.getElementById('scene1-action');
        actionButton?.removeAttribute('hidden');
        actionButton?.classList.add('scene1-action-visible');
        nextButton.setAttribute('hidden', '');
      }
    } catch (error) {
      console.error('5. LỖI RUNTIME TRONG HÀM CLICK:', error);
    }
  }

  async goBackScene1Intro() {
    if (this.scene1Typing || this.scene1DialogueIndex === 0) return;
    currentDialogueIndex = Math.max(0, currentDialogueIndex - 1);
    await this.showScene1Dialogue(currentDialogueIndex);
  }

  async showScene1Dialogue(index) {
    const entry = this.scene1Dialogues[index];
    if (!entry) return;
    const runId = ++this.scene1IntroRun;
    const previousEntry = this.scene1Dialogues[this.scene1DialogueIndex];
    const nextButton = document.getElementById('scene1-next');
    const actionButton = document.getElementById('scene1-action');
    const speaker = document.querySelector('.scene1-dialogue-kicker');
    const dialogue = document.getElementById('scene1-dialogue');
    const backButton = document.getElementById('scene1-back');
    if (!dialogue || !nextButton) return;

    this.scene1DialogueIndex = index;
    currentDialogueIndex = index;
    actionButton?.setAttribute('hidden', '');
    actionButton?.classList.remove('scene1-action-visible');
    document.querySelector('.scene1-dialogue-controls')?.removeAttribute('hidden');
    if (speaker) speaker.textContent = entry.speaker;
    nextButton.removeAttribute('hidden');
    nextButton.textContent = '[ TIẾP THEO ❯ ]';
    if (backButton) backButton.disabled = index === 0;

    if (entry.video !== previousEntry?.video) {
      nextButton.setAttribute('hidden', '');
      if (!(await this.switchScene1Video(entry.video, runId))) return;
    }
    if (runId !== this.scene1IntroRun) return;
    nextButton.removeAttribute('hidden');
    dialogue.className = `scene1-dialogue ${entry.characterClass} scene1-dialogue-visible`;
    await this.typeScene1Text(entry.text, runId);
    if (index === 1 && runId === this.scene1IntroRun) {
      document.querySelector('.scene1-dialogue-controls')?.removeAttribute('hidden');
      nextButton.setAttribute('hidden', '');
      actionButton?.removeAttribute('hidden');
      actionButton?.classList.add('scene1-action-visible');
    }
  }

  async exitScene1ToRegistration() {
    if (this.isTransitioning) return;
    ++this.scene1IntroRun;
    const video = document.getElementById('scene1-intro-video');
    const mist = document.getElementById('scene1-mist-overlay');
    const dialogue = document.getElementById('scene1-dialogue');
    const actionButton = document.getElementById('scene1-action');
    actionButton?.setAttribute('hidden', '');
    dialogue?.classList.remove('scene1-dialogue-visible');
    mist?.classList.add('scene1-mist-cover');
    await this.waitScene1(900);
    video?.pause();
    this.navigateToScene('scene-1-5');
  }

  /**
   * Legacy entry point retained for scene-router calls from the existing app.
   */
  initDestinySparksCanvas() {
    const canvas = document.getElementById('destiny-sparks-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Mảng hạt tàn đóm đỏ & bụi vàng linh khí
    const sparks = [];
    const maxSparks = 45;

    for (let i = 0; i < maxSparks; i++) {
      sparks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        speedY: Math.random() * 0.7 + 0.25,
        speedX: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        color: Math.random() > 0.4 ? 'rgba(255, 30, 70, ' : 'rgba(255, 215, 0, ',
        phase: Math.random() * Math.PI * 2
      });
    }

    let isRunning = true;
    const renderSparks = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      sparks.forEach(s => {
        s.y -= s.speedY;
        s.x += Math.sin(s.phase) * s.speedX;
        s.phase += 0.02;

        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${s.alpha})`;
        ctx.shadowColor = s.color.includes('255, 30') ? '#ff1744' : '#ffd700';
        ctx.shadowBlur = 6;
        ctx.fill();
      });

      requestAnimationFrame(renderSparks);
    };

    renderSparks();
  }

  /**
   * Điều khiển hiển thị Khung thoại đám mây Cảnh 1 (đợi 3 giây mây mới hiện)
   * @param {boolean} forceImmediate Nếu true, hiện ngay lập tức không cần đợi
   */
  scheduleScene1Intro(forceImmediate = false) {
    this.runScene1Intro();
  }

  /**
   * Hiệu ứng gõ chữ (Typewriter Effect) Lời Dẫn Của Y Linh
   * @param {boolean} forceImmediate Nếu true, hiện ngay toàn bộ text và nút hành động
   */
  startDestinyTypewriter(forceImmediate = false) {
    if (forceImmediate) {
      const textEl = document.getElementById('scene1-dialogue-text');
      if (textEl) textEl.textContent = 'Làm sao con khóc? Quần áo rách rưới thì có gì phải lo. Ta đã tạo ra một Huyễn Cảnh Dệt Mộng. Hỡi người được chọn, hãy bước vào, cầm kim lên và giúp Tấm dệt nên lụa là gấm vóc lộng lẫy nhất trần gian!';
    } else {
      this.runScene1Intro();
    }
  }

  /**
   * HÀM ĐIỀU HƯỚNG CHUNG (UNIFIED SCENE & VIEW ROUTER WITH CLOUD TRANSITION WIPE)
   * Phủ kín mây từ hai bên (~1.4s), chuyển scene/view, quản lý nền mây toàn cục,
   * kích hoạt NPC Y Linh khi vào 'tu-lieu-lich-su', rồi mở mây ra.
   * @param {string|number} targetSceneId
   */
  navigateToScene(targetSceneId) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.playBeepSound();

    const target = String(targetSceneId || '').toLowerCase().trim();
    const returnsToIntro = ['1', 'intro', 'loi-goi-y-linh', 'scene1', 'scene-1'].includes(target);
    const introScene = document.getElementById('scene-1');
    if (introScene?.classList.contains('active-scene') && !returnsToIntro) {
      introScene.style.setProperty('opacity', '0', 'important');
    }

    const cloudScreen = document.getElementById('cloud-transition-screen') || document.getElementById('cloud-transition-overlay');

    if (!cloudScreen) {
      this.executeSceneSwitch(targetSceneId);
      this.isTransitioning = false;
      return;
    }

    // 1. Kích hoạt màn mây chuyển cảnh toàn màn hình
    cloudScreen.classList.remove('hidden');
    cloudScreen.style.opacity = '1';

    const transitionVideo = document.getElementById('cloud-transition-video');
    if (transitionVideo) {
      try {
        transitionVideo.currentTime = 0;
        const playPromise = transitionVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } catch (e) {}
    }

    console.log(`[navigateToScene] Bắt đầu màn mây phủ kín chuyển sang: ${targetSceneId}...`);

    const cloudCoverDuration = 600;
    const cloudRevealDuration = 400;
    const cloudCleanupDuration = 200;

    // Tổng thời gian hiệu ứng mây phủ, lộ cảnh và dọn overlay là 1,2 giây.
    setTimeout(() => {
      // Thực hiện tráo đổi class .active của các Scene ẩn phía dưới lúc mây phủ kín 100%
      this.executeSceneSwitch(targetSceneId);

      // 3. Sau khi mây bắt đầu tan ra, đợi mây tan hết rồi gỡ lớp overlay hoàn toàn
      setTimeout(() => {
        cloudScreen.style.opacity = '0';
        setTimeout(() => {
          cloudScreen.classList.add('hidden');
          cloudScreen.style.opacity = '';
          if (transitionVideo) {
            try {
              transitionVideo.pause();
              transitionVideo.currentTime = 0;
            } catch (e) {}
          }
          this.isTransitioning = false;
          console.log(`[navigateToScene] Chuyển cảnh hoàn tất sang: ${targetSceneId}`);
        }, cloudCleanupDuration);
      }, cloudRevealDuration);
    }, cloudCoverDuration);
  }

  /**
   * Thực hiện chuyển đổi DOM thực tế và cập nhật trạng thái
   */
  executeSceneSwitch(targetSceneId) {
    let target = String(targetSceneId || '').toLowerCase().trim();

    // Chuẩn hóa alias
    if (target === '1' || target === 'intro' || target === 'loi-goi-y-linh' || target === 'scene1') target = 'scene-1';
    if (target === '1-5' || target === '1.5' || target === 'auth' || target === 'nexus-id' || target === 'scene1-5') target = 'scene-1-5';
    if (target === '2' || target === 'theme' || target === 'events' || target === 'boi-canh' || target === 'scene2') target = 'scene-2';
    if (target === '3' || target === 'sandbox' || target === 'phong-thu-do' || target === 'huyen-canh' || target === 'scene3') target = 'sandbox';
    if (target === 'wardrobe' || target === 'bo-suu-tap') target = 'wardrobe';
    if (target === 'nexus' || target === 'san-giao-luu' || target === 'feed') target = 'nexus';
    if (target === 'tu-lieu-lich-su' || target === 'history' || target === 'tu-lieu' || target === 'view-history') target = 'tu-lieu-lich-su';
    if (target === 'about' || target === 'gioi-thieu') target = 'about';

    const appReady = target !== 'scene-1';
    document.body.classList.toggle('app-ready', appReady);
    const appHeader = document.querySelector('.app-header');
    if (appHeader) {
      if (appReady) {
        appHeader.style.opacity = '0';
        setTimeout(() => {
          if (document.body.classList.contains('app-ready')) {
            appHeader.style.removeProperty('opacity');
          }
        }, 20);
      } else {
        appHeader.style.removeProperty('opacity');
      }
    }

    if (this.miniYlinhEl) {
      this.miniYlinhEl.style.display = target === 'sandbox' ? 'flex' : 'none';
    }
    document.body.classList.toggle(
      'sandbox-wardrobe-open',
      target === 'sandbox' && Boolean(document.getElementById('view-sandbox')?.classList.contains('wardrobe-open'))
    );

    // 1. NỀN MÂY ĐỘNG TOÀN CỤC (GLOBAL CLOUD BACKGROUND)
    // Logic: BẮT BUỘC hiện ở: Scene 1, Bộ sưu tập, Sàn giao lưu, Tư liệu lịch sử, Giới thiệu.
    // KHI BƯỚC VÀO Huyễn Cảnh (Phòng thử đồ / Sandbox): Ẩn đi vì phòng thử có 3 nền riêng.
    const globalCloudBg = document.getElementById('global-cloud-bg');
    const loginBgVideo = document.getElementById('login-bg-video');
    const isLoginScene = target === 'scene-1-5';

    if (loginBgVideo) {
      loginBgVideo.style.display = isLoginScene ? 'block' : 'none';
      loginBgVideo.style.opacity = isLoginScene ? '1' : '0';
      if (isLoginScene) {
        const playPromise = loginBgVideo.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(error => console.warn('[UIManager] Không thể phát video nền đăng nhập:', error));
        }
      } else {
        loginBgVideo.pause();
      }
    }

    const globalBgVideo = document.getElementById('global-bg-video');
    const wardrobeBgVideo = document.getElementById('wardrobe-bg-video');
    const showGlobalBg = target !== 'sandbox' && target !== 'wardrobe';

    if (globalBgVideo) {
      const backgroundSource = target === 'nexus'
        ? 'assets/videos/bg_sangiaoluu.mp4'
        : 'assets/videos/bg_chung.mp4';
      const currentBackgroundSource = globalBgVideo.getAttribute('src')
        || globalBgVideo.querySelector('source')?.getAttribute('src');
      if (currentBackgroundSource !== backgroundSource) {
        globalBgVideo.pause();
        globalBgVideo.src = backgroundSource;
        globalBgVideo.load();
      }
      globalBgVideo.style.display = showGlobalBg ? 'block' : 'none';
      globalBgVideo.style.opacity = showGlobalBg ? '1' : '0';
      if (showGlobalBg) {
        const playPromise = globalBgVideo.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(error => {
            console.warn('[UIManager] Không thể phát video nền chung:', error);
          });
        }
      } else {
        globalBgVideo.pause();
      }
    }

    if (wardrobeBgVideo) {
      wardrobeBgVideo.style.display = target === 'wardrobe' ? 'block' : 'none';
      if (target === 'wardrobe') {
        const playPromise = wardrobeBgVideo.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(error => {
            console.warn('[UIManager] Không thể phát video nền Bộ sưu tập:', error);
          });
        }
      } else {
        wardrobeBgVideo.pause();
      }
    }

    if (globalCloudBg) {
      if (target === 'sandbox') {
        globalCloudBg.classList.add('cloud-bg-hidden');
      } else {
        globalCloudBg.classList.remove('cloud-bg-hidden');
      }
    }

    if (
      target !== 'sandbox'
      && document.getElementById('view-sandbox')?.classList.contains('active')
      && Object.values(this.currentOutfit).some(Boolean)
      && this.lookbookAPI
    ) {
      this.nexusPreviewSnapshotPromise = this.lookbookAPI.captureMannequinSnapshot()
        .then(snapshot => {
          if (snapshot) this.nexusPreviewSnapshotDataUri = snapshot;
          return snapshot;
        })
        .catch(error => {
          console.error('[UIManager] Không thể lưu ảnh ma-nơ-canh trước khi mở Sàn Giao Lưu:', error);
          return '';
        });
    }

    // 2. Ẩn tất cả các Section scene chính
    const allScenes = document.querySelectorAll('.scene');
    allScenes.forEach(s => {
      s.classList.remove('active-scene');
      s.style.setProperty('display', 'none', 'important');
    });
    const introScene = document.getElementById('scene-1');
    if (introScene) introScene.style.removeProperty('opacity');

    // 3. Ẩn tất cả các workspace view bên trong Scene 3
    const allSubviews = document.querySelectorAll('.workspace-view, .wardrobe-view, .nexus-view, .history-view, .about-view');
    allSubviews.forEach(v => v.classList.remove('active'));

    // 4. Reset NPC History mini nếu chuyển đi nơi khác
    const npcHistory = document.getElementById('npc-history');
    if (npcHistory && target !== 'tu-lieu-lich-su') {
      npcHistory.classList.remove('npc-mini-visible');
      const npcText = document.getElementById('npc-history-text');
      if (npcText) npcText.textContent = '';
      if (this.npcHistoryTimer) clearTimeout(this.npcHistoryTimer);
      if (this.npcHistoryTypewriterTimer) clearInterval(this.npcHistoryTypewriterTimer);
    }

    // 5. Cập nhật active tab trên Workspace Navigation
    const wsTabs = document.querySelectorAll('.workspace-tab');
    wsTabs.forEach(t => {
      const view = t.dataset.view;
      if (
        (target === 'sandbox' && view === 'sandbox') ||
        (target === 'wardrobe' && view === 'wardrobe') ||
        (target === 'nexus' && view === 'nexus') ||
        (target === 'tu-lieu-lich-su' && view === 'history') ||
        (target === 'about' && view === 'about')
      ) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    // 6. Kích hoạt giao diện đích
    if (target === 'scene-1') {
      const s1 = document.getElementById('scene-1');
      if (s1) {
        s1.classList.add('active-scene');
        s1.classList.remove('hidden');
        s1.style.setProperty('display', 'flex', 'important');
      }
      this.scheduleScene1Intro(false);
    } else if (target === 'scene-1-5') {
      const s15 = document.getElementById('scene-1-5');
      if (s15) {
        s15.classList.add('active-scene');
        s15.classList.remove('hidden');
        s15.style.setProperty('display', 'flex', 'important');
      }
    } else if (target === 'scene-2') {
      const s2 = document.getElementById('scene-2');
      if (s2) {
        s2.classList.add('active-scene');
        s2.classList.remove('hidden');
        s2.style.setProperty('display', 'flex', 'important');
      }
    } else {
      // Các màn hình thuộc Scene 3 (Huyễn Cảnh, Bộ sưu tập, Sàn giao lưu, Tư liệu, Giới thiệu)
      const s3 = document.getElementById('scene-3');
      if (s3) {
        s3.classList.add('active-scene');
        s3.classList.remove('hidden');
        s3.style.setProperty('display', 'flex', 'important');
        s3.style.setProperty('opacity', '0', 'important');
        s3.getBoundingClientRect();
        setTimeout(() => {
          if (s3.classList.contains('active-scene')) {
            s3.style.removeProperty('opacity');
          }
        }, 20);
      }

      if (target === 'wardrobe') {
        const wardEl = document.getElementById('wardrobe-view');
        if (wardEl) wardEl.classList.add('active');
        this.renderWardrobeView();
      } else if (target === 'nexus') {
        const nexEl = document.getElementById('nexus-view');
        if (nexEl) nexEl.classList.add('active');
        this.renderNexusFeed(this.currentNexusFilter || 'all');
      } else if (target === 'tu-lieu-lich-su') {
        const histEl = document.getElementById('history-view');
        if (histEl) histEl.classList.add('active');
        // KÍCH HOẠT NPC Y LINH TẠI “TƯ LIỆU LỊCH SỬ”
        this.triggerNpcHistoryDialogue();
      } else if (target === 'about') {
        const aboutEl = document.getElementById('about-view');
        if (aboutEl) aboutEl.classList.add('active');
      } else {
        // Mặc định: 'sandbox' (HUYỄN CẢNH DỆT MỘNG - Phòng thử đồ)
        const sandEl = document.getElementById('view-sandbox');
        if (sandEl) sandEl.classList.add('active');
        this.updateAutoCheckAndScoring();
      }
    }

    // 7. Đồng bộ hiển thị nút [ RỜI KHỎI HUYỄN CẢNH ] trên Navbar: chỉ hiện trong các phòng
    const btnLeaveSanctum = document.getElementById('btn-leave-sanctum');
    if (btnLeaveSanctum) {
      if (target === 'scene-1' || target === 'scene-1-5') {
        btnLeaveSanctum.style.display = 'none';
      } else {
        btnLeaveSanctum.style.display = 'inline-flex';
      }
    }
  }

  /**
  * KÍCH HOẠT ÔNG BỤT TẠI “TƯ LIỆU LỊCH SỬ”
   */
  triggerNpcHistoryDialogue() {
    const npcHistory = document.getElementById('npc-history');
    const npcText = document.getElementById('npc-history-text');
    const cursorEl = document.getElementById('npc-history-cursor');
    if (!npcHistory || !npcText) return;

    const dialogueToggle = document.getElementById('btn-toggle-history-dialogue');
    npcHistory.classList.remove('history-dialogue-hidden');
    if (dialogueToggle) {
      dialogueToggle.setAttribute('aria-expanded', 'true');
      dialogueToggle.setAttribute('aria-label', 'Ẩn lời thoại của Ông Bụt');
      dialogueToggle.title = 'Ẩn lời thoại của Ông Bụt';
    }

    if (this.npcHistoryTimer) {
      clearTimeout(this.npcHistoryTimer);
      this.npcHistoryTimer = null;
    }
    if (this.npcHistoryTypewriterTimer) {
      clearInterval(this.npcHistoryTypewriterTimer);
      this.npcHistoryTypewriterTimer = null;
    }

    npcHistory.classList.remove('npc-mini-visible');
    npcText.textContent = '';
    if (cursorEl) cursorEl.style.display = 'inline-block';

    const dialogue = 'Tấm ơi, chọn một hiện vật để xem tư liệu. Thông tin nào chưa có căn cứ sẽ được ghi là “Chưa xác định”.';

    // Đợi thêm 1 giây (đợi đám mây của hiệu ứng chuyển cảnh tan hết)
    this.npcHistoryTimer = setTimeout(() => {
      // Ông Bụt mini trượt từ dưới lên (CSS transform: translateY(0))
      npcHistory.classList.add('npc-mini-visible');

      let idx = 0;
      this.npcHistoryTypewriterTimer = setInterval(() => {
        if (idx < dialogue.length) {
          npcText.textContent += dialogue[idx];
          idx++;
        } else {
          clearInterval(this.npcHistoryTypewriterTimer);
          this.npcHistoryTypewriterTimer = null;
          if (cursorEl) cursorEl.style.display = 'none';
        }
      }, 18);
    }, 1000);
  }

  /**
   * Hiệu ứng chuyển cảnh đám mây (Backward compatibility wrapper)
   */
  triggerCloudTransition(targetSceneId = 3) {
    this.navigateToScene(targetSceneId);
  }

  switchTerminalSlide(slideNumber) {
    // Phương thức tương thích ngược
    if (slideNumber === 3 || slideNumber === '3') {
      this.startDestinyTypewriter(true);
    }
  }

  /* ========================================================================
     AUTHENTICATION SYSTEM: ĐĂNG KÝ & ĐĂNG NHẬP KỲ ẢO & ĐĂNG XUẤT RỜI KHỎI HUYỄN CẢNH
     ======================================================================== */
  initAuthHub() {
    let selectedGender = 'nam';

    // 1. Tích hợp 2 tab chuyển đổi mượt mà: [ Lập Giao Ước (Đăng ký) ] & [ Nối Chỉ Đỏ (Đăng nhập) ]
    const tabRegister = document.getElementById('tab-auth-register');
    const tabLogin = document.getElementById('tab-auth-login');
    const formRegister = document.getElementById('form-auth-register');
    const formLogin = document.getElementById('form-auth-login');
    const cardTitle = document.getElementById('auth-card-title');
    const cardSub = document.getElementById('auth-card-sub');

    const switchAuthMode = (mode) => {
      this.playBeepSound();
      if (mode === 'register') {
        if (tabRegister) {
          tabRegister.classList.add('active');
          tabRegister.setAttribute('aria-selected', 'true');
        }
        if (tabLogin) {
          tabLogin.classList.remove('active');
          tabLogin.setAttribute('aria-selected', 'false');
        }
        if (formRegister) formRegister.classList.add('active');
        if (formLogin) formLogin.classList.remove('active');
        if (cardTitle) cardTitle.textContent = 'GHI DANH CHO TẤM';
        if (cardSub) cardSub.textContent = 'Chọn dáng người và ghi tên để bước vào Huyễn Cảnh Dệt Mộng.';
      } else {
        if (tabLogin) {
          tabLogin.classList.add('active');
          tabLogin.setAttribute('aria-selected', 'true');
        }
        if (tabRegister) {
          tabRegister.classList.remove('active');
          tabRegister.setAttribute('aria-selected', 'false');
        }
        if (formLogin) formLogin.classList.add('active');
        if (formRegister) formRegister.classList.remove('active');
        if (cardTitle) cardTitle.textContent = 'TẤM VÀO HỘI';
        if (cardSub) cardSub.textContent = 'Nhập tên và mật khẩu đã ghi danh để bước vào Huyễn Cảnh.';
      }
    };

    if (tabRegister) tabRegister.addEventListener('click', () => switchAuthMode('register'));
    if (tabLogin) tabLogin.addEventListener('click', () => switchAuthMode('login'));

    // 2. Chọn hệ gen Avatar trên thẻ Đăng ký
    const cardNam = document.getElementById('auth-gender-card-nam');
    const cardNu = document.getElementById('auth-gender-card-nu');

    if (cardNam && cardNu) {
      cardNam.addEventListener('click', (e) => {
        e.preventDefault();
        cardNam.classList.add('active');
        cardNu.classList.remove('active');
        selectedGender = 'nam';
        this.applyGender('nam', false);
        this.playBeepSound();
      });

      cardNu.addEventListener('click', (e) => {
        e.preventDefault();
        cardNu.classList.add('active');
        cardNam.classList.remove('active');
        selectedGender = 'nu';
        this.applyGender('nu', false);
        this.playBeepSound();
      });
    }

    // 3. Xử lý Submit Đăng Ký (Lập Giao Ước): [ KHỞI TẠO VẬN MỆNH ]
    const btnSubmitRegister = document.getElementById('btn-submit-register');
    const handleRegisterAction = (e) => {
      if (e) e.preventDefault();
      const nameInput = document.getElementById('register-username');
      const passInput = document.getElementById('register-password');
      const confirmInput = document.getElementById('register-confirm-password');

      const username = nameInput ? nameInput.value.trim() : '';
      const password = passInput ? passInput.value.trim() : '';
      const confirmPassword = confirmInput ? confirmInput.value.trim() : '';

      if (!username) {
        this.showToast('Tấm ơi, con hãy nhập danh xưng của mình!', 'warning');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!password) {
        this.showToast('Vui lòng nhập Mật chú bảo mật!', 'warning');
        if (passInput) passInput.focus();
        return;
      }

      if (password !== confirmPassword) {
        this.showToast('Mật chú xác nhận không trùng khớp!', 'error');
        if (confirmInput) confirmInput.focus();
        return;
      }

      const user = {
        id: 'u_' + Date.now(),
        name: username,
        gender: selectedGender,
        createdAt: new Date().toISOString()
      };

      // Lưu tài khoản vào danh sách đã lập ước
      try {
        const rawAccounts = localStorage.getItem('vietphuc_accounts');
        const accounts = rawAccounts ? JSON.parse(rawAccounts) : [];
        accounts.push({ username, password, gender: selectedGender, id: user.id });
        localStorage.setItem('vietphuc_accounts', JSON.stringify(accounts));
      } catch (err) {
        console.warn('[Auth] Không thể lưu tài khoản vào danh sách:', err);
      }

      this.showToast(`Lập giao ước thành công! Khởi tạo hành trình cho Tấm ${username}...`, 'success');
      this.loginUser(user);
    };

    if (formRegister) formRegister.addEventListener('submit', handleRegisterAction);
    if (btnSubmitRegister) btnSubmitRegister.addEventListener('click', handleRegisterAction);

    // 4. Xử lý Submit Đăng Nhập (Nối Chỉ Đỏ): [ MỞ KẾT GIỚI ]
    const btnSubmitLogin = document.getElementById('btn-submit-login');
    const handleLoginAction = (e) => {
      if (e) e.preventDefault();
      const nameInput = document.getElementById('login-username') || document.getElementById('login-email');
      const passInput = document.getElementById('login-password');

      const username = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Tấm';
      const password = passInput ? passInput.value.trim() : '';

      if (!username) {
        this.showToast('Tấm ơi, con hãy nhập danh xưng của mình!', 'warning');
        if (nameInput) nameInput.focus();
        return;
      }

      // Tìm thông tin tài khoản đã đăng ký (nếu có)
      let userGender = selectedGender;
      try {
        const rawAccounts = localStorage.getItem('vietphuc_accounts');
        if (rawAccounts) {
          const accounts = JSON.parse(rawAccounts);
          const found = accounts.find(a => a.username.toLowerCase() === username.toLowerCase());
          if (found && found.gender) {
            userGender = found.gender;
          }
        }
      } catch (err) {}

      const user = {
        id: 'u_' + Date.now(),
        name: username,
        gender: userGender
      };

      this.showToast(`Vào hội thành công! Chào mừng Tấm ${username}...`, 'success');
      this.loginUser(user);
    };

    if (formLogin) formLogin.addEventListener('submit', handleLoginAction);
    if (btnSubmitLogin) btnSubmitLogin.addEventListener('click', handleLoginAction);

    // 5. Nút quay lại từ Scene 1.5 về Scene 1
    const btnBackToIntro = document.getElementById('btn-auth-back-to-scene-1');
    if (btnBackToIntro) {
      btnBackToIntro.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateToScene('scene-1');
      });
    }

    // 6. Nút Đăng Xuất trên Navbar: [ RỜI KHỎI HUYỄN CẢNH ]
    const btnLeaveSanctum = document.getElementById('btn-leave-sanctum');
    if (btnLeaveSanctum) {
      btnLeaveSanctum.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.logoutUser();
      });
    }

    // 7. Nút Đăng Xuất nhỏ trên Header User Pill
    const btnLogout = document.getElementById('btn-header-logout');
    if (btnLogout) {
      btnLogout.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.logoutUser();
      });
    }
  }

  /**
   * Đăng nhập thành công: Kích hoạt mây chuyển cảnh đưa vào Scene 3 (Phòng thử đồ)
   * @param {Object} user 
   */
  loginUser(user) {
    this.currentUser = user;
    localStorage.setItem('vietphuc_current_user', JSON.stringify(user));
    this.applyGender(user.gender, false);
    this.updateUserHeaderUI();
    this.loadSavedOutfits();
    this.updateWardrobeCountBadge();
    this.playBeepSound();

    this.showToast(`Chào mừng Tấm ${user.name} bước vào Huyễn Cảnh!`, 'success');

    // Nút Submit: [ BƯỚC VÀO HUYỄN CẢNH ]. Khi submit, kích hoạt hiệu ứng đám mây và đưa vào Scene 3 (Phòng thử đồ).
    this.navigateToScene('sandbox');
  }

  /**
   * Đăng xuất: Kích hoạt lại hiệu ứng mây che toàn màn hình, xóa dữ liệu session và đưa người dùng quay ngược trở lại Scene 1 (Intro ban đầu).
   */
  logoutUser() {
    this.playBeepSound();
    // 1. Kích hoạt hiệu ứng mây che toàn màn hình quay lại Scene 1
    this.navigateToScene('scene-1');

    // 2. Xóa dữ liệu session hiện tại
    this.currentUser = null;
    localStorage.removeItem('vietphuc_current_user');

    // 3. Ẩn pill trên header
    this.updateUserHeaderUI();

    // 4. Khởi động lại kịch bản dẫn truyện Scene 1
    this.scheduleScene1Intro(false);

    this.showToast('Đã rời khỏi Huyễn Cảnh và đăng xuất thành công.', 'info');
  }

  updateUserHeaderUI() {
    try {
      const pill = document.getElementById('header-user-pill');
      const nameEl = document.getElementById('header-user-name');
      const genderEl = document.getElementById('header-user-gender');
      const avatarEl = document.getElementById('header-user-avatar');

      if (!this.currentUser) {
        if (pill) pill.classList.add('hidden');
        return;
      }

      if (pill) pill.classList.remove('hidden');
      if (nameEl) nameEl.textContent = this.currentUser.name || 'Nhà Thiết Kế';
      if (genderEl) genderEl.textContent = this.currentUser.gender === 'nam' ? '♂ NAM' : '♀ NỮ';
      if (avatarEl) avatarEl.textContent = this.currentUser.gender === 'nam' ? '👨‍💻' : '👩‍🎨';
    } catch (err) {
      console.error('[UIManager] Lỗi khi cập nhật Header User UI:', err);
    }
  }

  initMatrixCanvas() {
    const canvases = [document.getElementById('matrix-canvas')].filter(Boolean);

    if (canvases.length === 0) return;

    canvases.forEach(canvas => {
      const ctx = canvas.getContext('2d');
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener('resize', resize);

      const katakana = '012345678901010101ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const fontSize = 14;
      let columns = Math.floor(window.innerWidth / fontSize);
      let drops = Array(columns).fill(1);

      const draw = () => {
        ctx.fillStyle = 'rgba(4, 5, 8, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff66';
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = katakana.charAt(Math.floor(Math.random() * katakana.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      };

      setInterval(draw, 40);
    });
  }

  /* ========================================================================
     2. SCENE 2: THEME & EVENT SELECTION
     ======================================================================== */
  bindScene2Events() {
    const themeCards = document.querySelectorAll('.theme-card');
    themeCards.forEach(card => {
      card.addEventListener('click', () => {
        themeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const theme = card.dataset.theme;
        this.applyTheme(theme);
        this.playBeepSound();
      });
    });

    const themeAudioToggle = document.getElementById('btn-theme-audio-toggle');
    if (themeAudioToggle) {
      themeAudioToggle.addEventListener('click', () => {
        this.setSoundEnabled(!this.soundEnabled);
      });
    }

    const btnBackTo1 = document.getElementById('btn-back-to-scene-1');
    if (btnBackTo1) {
      btnBackTo1.addEventListener('click', () => {
        this.navigateToScene('scene-1');
      });
    }

    const btnConfirmTheme = document.getElementById('btn-confirm-theme');
    if (btnConfirmTheme) {
      btnConfirmTheme.addEventListener('click', () => {
        this.navigateToScene('sandbox');
      });
    }
  }

  /* ========================================================================
     3. SCENE 3: SANDBOX WORKSPACE & WARDROBE
     ======================================================================== */
  bindScene3Events() {
    // Back to Scene 2
    const btnBackTo2 = document.getElementById('btn-back-to-scene-2');
    if (btnBackTo2) {
      btnBackTo2.addEventListener('click', () => {
        this.navigateToScene('scene-2');
        this.playBeepSound();
      });
    }

    // Reset outfit button
    const btnReset = document.getElementById('btn-reset-outfit');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        this.resetOutfit();
        this.playBeepSound();
      });
    }

    // Dismiss alert button
    const btnDismissAlert = document.getElementById('btn-dismiss-alert');
    if (btnDismissAlert) {
      btnDismissAlert.addEventListener('click', () => {
        this.hideAlert();
      });
    }

    // Category Selection via Vertical Nav Bar (Menu Dọc Bên Phải)
    const vCatBtns = document.querySelectorAll('.v-cat-btn');
    vCatBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.cat;
        if (this.isWardrobeOpen && this.currentCategory === cat) {
          // Bấm lại danh mục đang mở -> Đóng tủ đồ, trả ma-nơ-canh về giữa
          this.closeWardrobeDrawer();
        } else {
          // Mở tủ đồ danh mục này -> Đẩy ma-nơ-canh sang bên trái
          this.openWardrobeCategory(cat);
        }
        this.playBeepSound();
      });
    });

    // Close Wardrobe Drawer Button (✕)
    const btnCloseDrawer = document.getElementById('btn-close-wardrobe-drawer');
    if (btnCloseDrawer) {
      btnCloseDrawer.addEventListener('click', () => {
        this.closeWardrobeDrawer();
        this.playBeepSound();
      });
    }

    // Sub-filters (Tất cả / Cổ truyền / Đương đại)
    const subBtns = document.querySelectorAll('.sub-filter-bar .sub-btn');
    subBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        subBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentSubFilter = btn.dataset.filter;
        this.renderWardrobe();
        this.playBeepSound();
      });
    });

    // Quick Event Pills on Top Stage Bar
    const eventPills = document.querySelectorAll('#event-quick-pills .event-pill-btn');
    eventPills.forEach(pill => {
      pill.addEventListener('click', () => {
        eventPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const eventKey = pill.dataset.event;
        this.applyTheme(eventKey);
        this.playBeepSound();
      });
    });

    // Quick Presets
    const presetBtns = document.querySelectorAll('.preset-combo-btn');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const presetKey = btn.dataset.preset;
        this.applyPreset(presetKey);
        this.playBeepSound();
      });
    });

    // Primary CTA: COMMIT BẢN PHỐI
    const btnRenderAI = document.getElementById('btn-render-ai');
    if (btnRenderAI) {
      btnRenderAI.addEventListener('click', () => {
        this.handleCommitOutfit();
      });
    }

    // Top Mannequin Gender Switch: [ Nam ] | [ Nữ ]
    const btnGenderNam = document.getElementById('btn-mannequin-gender-nam');
    const btnGenderNu = document.getElementById('btn-mannequin-gender-nu');

    if (btnGenderNam) {
      btnGenderNam.addEventListener('click', () => {
        if (btnGenderNam) btnGenderNam.classList.add('active');
        if (btnGenderNu) btnGenderNu.classList.remove('active');
        this.applyGender('nam');
        this.playBeepSound();
      });
    }

    if (btnGenderNu) {
      btnGenderNu.addEventListener('click', () => {
        if (btnGenderNu) btnGenderNu.classList.add('active');
        if (btnGenderNam) btnGenderNam.classList.remove('active');
        this.applyGender('nu');
        this.playBeepSound();
      });
    }
  }

  /**
   * Mở tủ đồ danh mục tương ứng & Đẩy ma-nơ-canh mượt mà sang bên trái
   * @param {string} category 'ao' | 'quan' | 'phukien' | 'giay'
   */
  openWardrobeCategory(category) {
    this.currentCategory = category;
    this.activeColorTarget = category;
    this.isWardrobeOpen = true;

    const sandboxView = document.getElementById('view-sandbox');
    if (sandboxView) {
      sandboxView.classList.remove('wardrobe-closed');
      sandboxView.classList.add('wardrobe-open');
    }
    document.body.classList.add('sandbox-wardrobe-open');

    // Cập nhật trạng thái active trên các button menu dọc
    const vCatBtns = document.querySelectorAll('.v-cat-btn');
    vCatBtns.forEach(btn => {
      if (btn.dataset.cat === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Cập nhật tiêu đề ngăn kéo tủ đồ
    const catTitles = {
      ao: 'DANH MỤC: ÁO',
      quan: 'DANH MỤC: QUẦN / VÁY',
      phukien: 'DANH MỤC: PHỤ KIỆN',
      giay: 'DANH MỤC: GIÀY DÉP'
    };
    const catIcons = {
      ao: '👘',
      quan: '👖',
      phukien: '👑',
      giay: '👞'
    };

    const drawerTitleEl = document.getElementById('drawer-category-title');
    const drawerIconEl = document.getElementById('drawer-cat-icon');
    if (drawerTitleEl) drawerTitleEl.textContent = catTitles[category] || 'DANH MỤC: TRANG PHỤC';
    if (drawerIconEl) drawerIconEl.textContent = catIcons[category] || '👘';

    this.updateColorTargetLabel();
    this.renderWardrobe();
  }

  /**
   * Đóng tủ đồ & Đưa ma-nơ-canh mượt mà trở lại chính giữa màn hình
   */
  closeWardrobeDrawer() {
    this.isWardrobeOpen = false;
    const sandboxView = document.getElementById('view-sandbox');
    if (sandboxView) {
      sandboxView.classList.remove('wardrobe-open');
      sandboxView.classList.add('wardrobe-closed');
    }
    document.body.classList.remove('sandbox-wardrobe-open');

    const vCatBtns = document.querySelectorAll('.v-cat-btn');
    vCatBtns.forEach(btn => btn.classList.remove('active'));
  }

  bindYlinhDrag() {
    const storageKey = 'vietphuc_ylinh_positions';
    let savedPositions = {};
    try {
      savedPositions = JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch (error) {}

    ['mini-but', 'npc-history'].forEach(id => {
      const element = document.getElementById(id);
      if (!element) return;

      if (element.parentElement !== document.body) {
        // Keep fixed drag coordinates relative to the viewport and above workspace stacking contexts.
        document.body.appendChild(element);
      }

      const saved = savedPositions[id];
      if (saved && Number.isFinite(saved.left) && Number.isFinite(saved.top)) {
        const left = Math.min(Math.max(0, saved.left), Math.max(0, window.innerWidth - element.offsetWidth));
        const top = Math.min(Math.max(0, saved.top), Math.max(0, window.innerHeight - element.offsetHeight));
        element.style.setProperty('left', `${left}px`, 'important');
        element.style.setProperty('top', `${top}px`, 'important');
        element.style.setProperty('right', 'auto', 'important');
        element.style.setProperty('bottom', 'auto', 'important');
      }

      const setHorizontalLayout = clientX => {
        if (id !== 'mini-but') return;
        element.classList.toggle('is-left-side', clientX < window.innerWidth / 2);
      };
      if (id === 'mini-but') {
        const initialLeft = saved && Number.isFinite(saved.left)
          ? Math.min(Math.max(0, saved.left), Math.max(0, window.innerWidth - element.offsetWidth))
          : window.innerWidth - 80 - element.offsetWidth;
        setHorizontalLayout(initialLeft + element.offsetWidth / 2);
      }

      let dragging = false;
      let dragMoved = false;
      let offsetX = 0;
      let offsetY = 0;
      let dragStartX = 0;
      let dragStartY = 0;
      let suppressNextClick = false;
      let suppressClickTimer = null;

      const getPoint = event => event.touches?.[0] || event.changedTouches?.[0] || event;
      const startDrag = event => {
        const point = getPoint(event);
        const rect = element.getBoundingClientRect();
        offsetX = point.clientX - rect.left;
        offsetY = point.clientY - rect.top;
        dragStartX = point.clientX;
        dragStartY = point.clientY;
        dragMoved = false;
        element.style.setProperty('left', `${rect.left}px`, 'important');
        element.style.setProperty('top', `${rect.top}px`, 'important');
        element.style.setProperty('right', 'auto', 'important');
        element.style.setProperty('bottom', 'auto', 'important');
        dragging = true;
        element.classList.add('is-dragging');
      };
      const moveDrag = event => {
        if (!dragging) return;
        const point = getPoint(event);
        if (Math.abs(point.clientX - dragStartX) > 4 ||
            Math.abs(point.clientY - dragStartY) > 4) {
          dragMoved = true;
        }
        if (dragMoved) setHorizontalLayout(point.clientX);
        if (dragMoved) event.preventDefault();
        const left = Math.min(Math.max(0, point.clientX - offsetX), Math.max(0, window.innerWidth - element.offsetWidth));
        const top = Math.min(Math.max(0, point.clientY - offsetY), Math.max(0, window.innerHeight - element.offsetHeight));
        element.style.setProperty('left', `${left}px`, 'important');
        element.style.setProperty('top', `${top}px`, 'important');
        element.style.setProperty('right', 'auto', 'important');
        element.style.setProperty('bottom', 'auto', 'important');
        event.preventDefault();
      };
      const endDrag = () => {
        if (!dragging) return;
        dragging = false;
        element.classList.remove('is-dragging');
        savedPositions[id] = {
          left: Number.parseFloat(element.style.left),
          top: Number.parseFloat(element.style.top)
        };
        localStorage.setItem(storageKey, JSON.stringify(savedPositions));
        if (dragMoved) {
          suppressNextClick = true;
          clearTimeout(suppressClickTimer);
          suppressClickTimer = setTimeout(() => {
            suppressNextClick = false;
          }, 350);
        }
      };

      element.addEventListener('click', event => {
        if (!suppressNextClick) return;
        suppressNextClick = false;
        clearTimeout(suppressClickTimer);
        event.preventDefault();
        event.stopImmediatePropagation();
      }, true);
      element.addEventListener('mousedown', startDrag);
      element.addEventListener('touchstart', startDrag, { passive: false });
      window.addEventListener('mousemove', moveDrag, { passive: false });
      window.addEventListener('touchmove', moveDrag, { passive: false });
      window.addEventListener('mouseup', endDrag);
      window.addEventListener('touchend', endDrag);

      if (id === 'mini-but' && this.ylinhChibiAvatarEl) {
        this.ylinhChibiAvatarEl.addEventListener('click', () => {
          if (dragMoved) {
            dragMoved = false;
            return;
          }
          this.toggleYlinhSpeech();
        });
      }
    });
  }

  /* ========================================================================
     4. CUSTOMIZATION: SKIN TONE, HUE SLIDER & DYNAMIC COLOR SWAP
     ======================================================================== */
  bindCustomizationEvents() {
    // 1. Skin Tone Selector: Bắt sự kiện click trên .skin-swatch (và .skin-swatch-btn)
    const skinSwatches = document.querySelectorAll('.skin-swatch, .skin-swatch-btn');
    skinSwatches.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        skinSwatches.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tone = btn.dataset.tone || 'fair';
        this.applySkinTone(tone);
        this.playBeepSound();
      });
    });

    const skinColorPicker = document.getElementById('skin-color-picker');
    if (skinColorPicker) {
      skinColorPicker.addEventListener('input', () => {
        skinSwatches.forEach(btn => btn.classList.remove('active'));
        this.applySkinTone(skinColorPicker.value);
      });
    }

    // 2. Custom garment color picker
    const garmentColorPicker = document.getElementById('garment-color-picker');
    if (garmentColorPicker) {
      garmentColorPicker.addEventListener('input', () => {
        this.applyGarmentColor(this.activeColorTarget, garmentColorPicker.value);
      });
    }
  }

  normalizeColor(color) {
    const presets = {
      gold: '#ffd700',
      crimson: '#ef4444',
      emerald: '#10b981',
      indigo: '#3b82f6',
      purple: '#a855f7',
      obsidian: '#18181b'
    };
    const value = presets[color] || color;
    const hex = String(value || '').trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (hex) {
      const digits = hex[1].length === 3
        ? [...hex[1]].map(character => character + character).join('')
        : hex[1];
      return `#${digits.toLowerCase()}`;
    }

    const hsl = String(value || '').match(/^hsl\(\s*(-?[\d.]+)(?:deg)?(?:\s*,\s*|\s+)([\d.]+)%(?:\s*,\s*|\s+)([\d.]+)%\s*\)$/i);
    if (hsl) return this.hslToHex(Number(hsl[1]), Number(hsl[2]), Number(hsl[3]));
    return null;
  }

  hslToHex(hue, saturation, lightness) {
    const h = ((hue % 360) + 360) % 360;
    const s = Math.min(100, Math.max(0, saturation)) / 100;
    const l = Math.min(100, Math.max(0, lightness)) / 100;
    const chroma = (1 - Math.abs(2 * l - 1)) * s;
    const segment = h / 60;
    const x = chroma * (1 - Math.abs((segment % 2) - 1));
    const rgb = segment < 1 ? [chroma, x, 0]
      : segment < 2 ? [x, chroma, 0]
        : segment < 3 ? [0, chroma, x]
          : segment < 4 ? [0, x, chroma]
            : segment < 5 ? [x, 0, chroma]
              : [chroma, 0, x];
    const offset = l - chroma / 2;
    return `#${rgb.map(channel => Math.round((channel + offset) * 255)
      .toString(16).padStart(2, '0')).join('')}`;
  }

  getHueFromHex(color) {
    const hex = this.normalizeColor(color);
    if (!hex) return 0;
    const red = parseInt(hex.slice(1, 3), 16) / 255;
    const green = parseInt(hex.slice(3, 5), 16) / 255;
    const blue = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;
    if (!delta) return 0;
    if (max === red) return Math.round((60 * (((green - blue) / delta) % 6) + 360) % 360);
    if (max === green) return Math.round(60 * ((blue - red) / delta + 2));
    return Math.round(60 * ((red - green) / delta + 4));
  }

  applyExactTint(element, color) {
    const normalized = this.normalizeColor(color);
    if (!element) return;
    if (!normalized) {
      element.style.filter = '';
      return;
    }

    const id = `color-filter-${element.id}`;
    let svg = document.getElementById('mannequin-color-filters');
    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.id = 'mannequin-color-filters';
      svg.setAttribute('aria-hidden', 'true');
      svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      svg.appendChild(defs);
      document.body.appendChild(svg);
    }

    let filter = document.getElementById(id);
    if (!filter) {
      filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      filter.id = id;
      filter.setAttribute('color-interpolation-filters', 'sRGB');
      const matrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
      matrix.setAttribute('type', 'matrix');
      filter.appendChild(matrix);
      svg.querySelector('defs').appendChild(filter);
    }

    const channels = normalized.slice(1).match(/.{2}/g).map(channel => parseInt(channel, 16) / 255);
    const luminance = [0.2126, 0.7152, 0.0722];
    const rows = channels.map(channel => [...luminance.map(weight => weight * channel), 0, 0]);
    rows.push([0, 0, 0, 1, 0]);
    filter.querySelector('feColorMatrix').setAttribute('values', rows.flat().join(' '));
    const shadow = element.id === 'mannequin-base-img'
      ? ' drop-shadow(0 15px 25px rgba(0, 0, 0, 0.6))'
      : '';
    element.style.filter = `url("#${id}")${shadow}`;
  }

  applySkinTone(tone) {
    this.currentSkinTone = tone;
    const mannequinImg = this.mannequinBaseEl;
    if (!mannequinImg) {
      console.error('[UIManager] Không tìm thấy mannequin để áp dụng màu da.');
      return;
    }

    const toneColors = {
      fair: '#fff0e6',
      rosy: '#fdf0ed',
      natural: '#fde68a',
      tanned: '#a16207',
      deep: '#7c3f24'
    };
    const color = toneColors[tone] || this.normalizeColor(tone) || toneColors.fair;
    const picker = document.getElementById('skin-color-picker');
    if (picker) picker.value = color;
    this.applyExactTint(mannequinImg, color);
  }

  applyHueToGarments(deg) {
    this.applyGarmentColor(this.activeColorTarget, this.hslToHex(Number(deg), 100, 50));
  }

  applyGarmentColor(category, color) {
    const normalized = color === 'original' ? 'original' : this.normalizeColor(color);
    if (!normalized) {
      console.error(`[UIManager] Mã màu trang phục không hợp lệ: ${color}`);
      return;
    }
    this.colors[category] = normalized;
    const targetLayer = this.getLayerElement(category);
    if (!targetLayer) return;

    if (normalized === 'original') {
      targetLayer.style.filter = '';
    } else {
      this.applyExactTint(targetLayer, normalized);
    }

    const picker = document.getElementById('garment-color-picker');
    if (category === this.activeColorTarget) {
      const slider = document.getElementById('hue-slider');
      const label = document.getElementById('hue-degree-text');
      if (picker) picker.value = normalized === 'original' ? '#ffffff' : normalized;
      if (slider) slider.value = normalized === 'original' ? '0' : String(this.getHueFromHex(normalized));
      if (label) label.textContent = normalized === 'original' ? '#ffffff' : normalized;
    }
  }

  updateColorTargetLabel() {
    const label = document.getElementById('color-target-label');
    if (!label) return;
    const map = {
      ao: 'ÁO',
      quan: 'QUẦN/VÁY',
      phukien: 'PHỤ KIỆN',
      giay: 'GIÀY'
    };
    label.textContent = map[this.activeColorTarget] || 'ÁO';

    const color = this.colors[this.activeColorTarget] || 'original';
    const picker = document.getElementById('garment-color-picker');
    const slider = document.getElementById('hue-slider');
    const degreeText = document.getElementById('hue-degree-text');
    const normalized = this.normalizeColor(color);
    if (picker && normalized) picker.value = normalized;
    if (degreeText) degreeText.textContent = normalized || '#ffffff';

    document.querySelectorAll('.color-swatch-btn').forEach(button => {
      const swatchColor = button.dataset.color || button.dataset.hue;
      const normalizedSwatch = swatchColor === 'original'
        ? 'original'
        : this.normalizeColor(swatchColor);
      button.classList.toggle('active', normalizedSwatch === color);
    });
    if (slider) slider.value = normalized ? String(this.getHueFromHex(normalized)) : '0';
  }

  /* ========================================================================
     5. TOP NAVIGATION & WORKSPACE VIEWS
     ======================================================================== */
  bindTopNavEvents() {
    const brandTrigger = document.getElementById('brand-home-trigger');
    if (brandTrigger) {
      brandTrigger.addEventListener('click', () => {
        this.goToScene(1);
        this.switchTerminalSlide(1);
      });
    }

    // Gender Switch in Top Bar
    const headerNam = document.getElementById('header-gender-nam');
    const headerNu = document.getElementById('header-gender-nu');

    if (headerNam) {
      headerNam.addEventListener('click', () => {
        this.applyGender('nam');
        this.playBeepSound();
      });
    }
    if (headerNu) {
      headerNu.addEventListener('click', () => {
        this.applyGender('nu');
        this.playBeepSound();
      });
    }

    // Sound toggle
    const soundToggle = document.getElementById('btn-sound-toggle');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        if (this.audioBlocked || !this.soundEnabled) {
          this.audioBlocked = false;
          this.audioUnlocked = true;
          this.setSoundEnabled(true);
        } else {
          this.setSoundEnabled(false);
        }
      });
    }

    // Restart app
    const btnRestart = document.getElementById('btn-restart-app');
    if (btnRestart) {
      btnRestart.addEventListener('click', () => {
        this.resetOutfit();
        this.navigateToScene('scene-1');
      });
    }

    // Workspace View Tabs (Sandbox, Wardrobe, Nexus, History, About)
    const wsTabs = document.querySelectorAll('.workspace-tab');
    wsTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const view = tab.dataset.view;
        const target = view === 'history' ? 'tu-lieu-lich-su' : view;
        this.navigateToScene(target);
      });
    });

    // Close buttons from sub-views
    const btnCloseHistory = document.getElementById('btn-close-history');
    if (btnCloseHistory) {
      btnCloseHistory.addEventListener('click', () => {
        this.navigateToScene('sandbox');
      });
    }

    const btnCloseAbout = document.getElementById('btn-close-about');
    if (btnCloseAbout) {
      btnCloseAbout.addEventListener('click', () => {
        this.navigateToScene('sandbox');
      });
    }

    const btnCloseNexus = document.getElementById('btn-close-nexus');
    if (btnCloseNexus) {
      btnCloseNexus.addEventListener('click', () => {
        this.navigateToScene('sandbox');
      });
    }

    // User Profile Pill in Header -> Click to open Wardrobe
    const userPill = document.getElementById('header-user-pill');
    if (userPill) {
      userPill.addEventListener('click', () => {
        this.navigateToScene('wardrobe');
      });
    }
  }

  switchWorkspaceView(viewName) {
    const target = viewName === 'history' ? 'tu-lieu-lich-su' : viewName;
    this.navigateToScene(target);
  }

  /* ========================================================================
     6. SMART LORE TOOLTIP (Hover Floating Card - Max 3 Lines)
     ======================================================================== */
  bindTooltipEvents() {
    window.addEventListener('mousemove', (e) => {
      if (this.tooltipEl && !this.tooltipEl.classList.contains('hidden')) {
        const offset = 18;
        let x = e.clientX + offset;
        let y = e.clientY + offset;

        const rect = this.tooltipEl.getBoundingClientRect();
        if (x + rect.width > window.innerWidth - 10) {
          x = e.clientX - rect.width - offset;
        }
        if (y + rect.height > window.innerHeight - 10) {
          y = e.clientY - rect.height - offset;
        }

        this.tooltipEl.style.left = `${Math.max(10, x)}px`;
        this.tooltipEl.style.top = `${Math.max(10, y)}px`;
      }
    });
  }

  showTooltip(item, mouseEvent) {
    if (!item) return;

    const isLocked = Boolean(item.isLocked && !this.unlockedItems.has(item.id));

    const stylistSpeechIsVisible =
      this.ylinhSpeechSource === 'stylist' &&
      this.ylinhDialogueBubbleEl?.classList.contains('is-visible');
    if (!stylistSpeechIsVisible) {
      const history = isLocked
        ? `${item.name}: ${item.lockReason || 'Bảo vật cần vượt qua khảo thí để mở khóa.'}`
        : `${item.name} (${item.era || 'Cổ truyền'}): ${item.history || 'Trang phục di sản cổ truyền Đại Việt.'}${item.usage_context ? ` Hoàn cảnh: ${item.usage_context}` : ''}`;
      this.yLinhSpeak(
        history,
        isLocked ? 'BẢO VẬT KHÓA' : (item.era || 'DI SẢN'),
        'lore'
      );
    }

    // Vẫn cập nhật tooltip dự phòng nếu người dùng cần
    if (this.tooltipEl) {
      if (this.tooltipTitleEl) {
        this.tooltipTitleEl.textContent = isLocked ? `🔒 ${item.name} (BẢO VẬT CÓ KHÓA)` : item.name;
      }
      if (this.tooltipEraEl) {
        this.tooltipEraEl.textContent = item.era || 'Cổ truyền Đại Việt';
      }
      if (this.tooltipHistoryEl) {
        if (isLocked) {
          this.tooltipHistoryEl.textContent = item.lockReason || 'Bảo vật Hạng Nhất triều đình, cần khảo thí để mở khóa.';
        } else {
          let text = item.history || 'Trang phục di sản cổ truyền.';
          if (text.length > 130) text = text.substring(0, 128) + '...';
          this.tooltipHistoryEl.textContent = text;
        }
      }
      if (this.tooltipUsageEl) {
        if (isLocked) {
          this.tooltipUsageEl.textContent = '💡 Nhấp chuột để mở The Heritage Vault và tham gia khảo thí!';
        } else {
          let usage = item.usage_context || 'Thích hợp cho nhiều không gian văn hóa.';
          if (usage.length > 100) usage = usage.substring(0, 98) + '...';
          this.tooltipUsageEl.textContent = usage;
        }
      }
      this.tooltipEl.classList.remove('hidden');

      if (mouseEvent) {
        const offset = 18;
        this.tooltipEl.style.left = `${mouseEvent.clientX + offset}px`;
        this.tooltipEl.style.top = `${mouseEvent.clientY + offset}px`;
      }
    }
  }

  hideTooltip() {
    if (this.tooltipEl) {
      this.tooltipEl.classList.add('hidden');
    }
  }

  /* ========================================================================
     7. THEME & GENDER ENGINE
     ======================================================================== */
  applyTheme(themeKey, shouldSpeak = true) {
    this.currentTheme = themeKey;

    // Normalizing aliases
    let canonical = themeKey;
    if (themeKey === 'cungdinh') canonical = 'sang_trong';
    if (themeKey === 'dangiang') canonical = 'trang_nghiem';
    if (themeKey === 'genz') canonical = 'pha_cach';

    // Body Theme Class
    document.body.classList.remove(
      'theme-trang_nghiem', 'theme-lehoi', 'theme-dangiang',
      'theme-sang_trong', 'theme-datiec', 'theme-cungdinh',
      'theme-pha_cach', 'theme-daopho', 'theme-genz'
    );
    document.body.classList.add(`theme-${canonical}`);

    // Update Top Event Badge
    let videoSrc = 'assets/videos/bg_lehoi.mp4';
    let posterImg = 'assets/images/bg_dan_gian.png';

    if (canonical === 'sang_trong' || canonical === 'datiec') {
      videoSrc = 'assets/videos/bg_datiec.mp4';
      posterImg = 'assets/images/bg_cung_dinh.png';
    } else if (canonical === 'pha_cach' || canonical === 'daopho') {
      videoSrc = 'assets/videos/bg_daopho.mp4';
      posterImg = 'assets/images/bg_gen_z.png';
    }

    // Dynamic Looping Video Background switching
    if (this.dynamicBgVideo) {
      this.dynamicBgVideo.poster = posterImg;
      const source = this.dynamicBgVideo.querySelector('source');
      if (source) {
        source.src = videoSrc;
      } else {
        this.dynamicBgVideo.src = videoSrc;
      }
      try {
        if (typeof this.dynamicBgVideo.load === 'function') {
          this.dynamicBgVideo.load();
        }
        if (typeof this.dynamicBgVideo.play === 'function') {
          const playPromise = this.dynamicBgVideo.play();
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {});
          }
        }
      } catch (videoErr) {
        console.warn('[UIManager] Không thể phát video nền tự động:', videoErr);
      }
    }

    // Update quick event pills
    const pills = document.querySelectorAll('#event-quick-pills .event-pill-btn');
    pills.forEach(p => {
      if (p.dataset.event === canonical) p.classList.add('active');
      else p.classList.remove('active');
    });

    // Start Live Ambient Effects (Cánh hoa đào rơi / Bụi vàng Bokeh / Mưa Cyberpunk)
    this.startAmbientFx(canonical);

    this.setThemeAudioTrack(canonical);

    // Auto-check and update live scoring for new event context
    this.updateAutoCheckAndScoring(shouldSpeak);
  }

  initAudioPlayer() {
    this.audioManager = new AudioManager((error) => {
      this.audioBlocked = true;
      console.warn('[AudioManager] Trình duyệt chặn phát nhạc nền:', error);
      this.updateAudioControls();
    });
    this.themeAudio = this.audioManager.audio;

    this.audioInteractionHandler = () => {
      document.removeEventListener('pointerdown', this.audioInteractionHandler, true);
      document.removeEventListener('keydown', this.audioInteractionHandler, true);
      this.audioInteractionHandler = null;
      this.audioUnlocked = true;
      this.updateAudioControls();
      this.playIntroVideo();
      if (this.soundEnabled) this.playThemeAudio();
    };

    document.addEventListener('pointerdown', this.audioInteractionHandler, {
      capture: true,
      once: true
    });
    document.addEventListener('keydown', this.audioInteractionHandler, {
      capture: true,
      once: true
    });
    this.updateAudioControls();
  }

  setThemeAudioTrack(theme) {
    if (!this.audioManager) return;

    const tracks = {
      trang_nghiem: {
        src: 'assets/audio/audio_lehoi.mp3',
        label: 'ÂM THANH: CHỐN LINH THIÊNG (SÁO TRÚC DÂN GIAN)'
      },
      sang_trong: {
        src: 'assets/audio/audio_datiec.mp3',
        label: 'ÂM THANH: DẠ TIỆC ĐƯƠNG ĐẠI'
      },
      pha_cach: {
        src: 'assets/audio/audio_daopho.mp3',
        label: 'ÂM THANH: PHỐ THỊ NEON'
      }
    };
    const track = tracks[theme] || tracks.trang_nghiem;
    const trackName = document.getElementById('scene2-audio-track-name');
    if (trackName) trackName.textContent = track.label;

    const changed = this.audioManager.switchTrack(track.src);
    if (!changed) return;
    this.audioBlocked = false;
    if (this.audioUnlocked && this.soundEnabled) this.playThemeAudio();
  }

  playThemeAudio() {
    if (!this.audioManager || !this.audioUnlocked || !this.soundEnabled) return;

    this.audioManager.audio.muted = false;
    this.audioManager.play();
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
    this.audioBlocked = false;
    if (this.audioManager) {
      this.audioManager.audio.muted = !enabled || !this.audioUnlocked;
      if (enabled && this.audioUnlocked) {
        this.playThemeAudio();
      } else {
        this.audioManager.pause();
      }
    }
    this.updateAudioControls();
  }

  updateAudioControls() {
    const soundToggle = document.getElementById('btn-sound-toggle');
    if (soundToggle) {
      soundToggle.textContent = this.soundEnabled && !this.audioBlocked ? '🔊' : '🔇';
      soundToggle.setAttribute('aria-pressed', String(this.soundEnabled));
      soundToggle.setAttribute(
        'aria-label',
        this.soundEnabled ? 'Tắt nhạc nền bối cảnh' : 'Bật nhạc nền bối cảnh'
      );
      soundToggle.title = this.audioBlocked
        ? 'Trình duyệt đã chặn âm thanh. Nhấp để bật lại.'
        : this.soundEnabled
        ? (this.audioUnlocked ? 'Tắt nhạc nền bối cảnh' : 'Nhạc nền sẽ phát sau tương tác đầu tiên')
        : 'Bật nhạc nền bối cảnh';
    }

    const themeToggle = document.getElementById('btn-theme-audio-toggle');
    if (themeToggle) {
      const icon = document.getElementById('theme-audio-icon');
      const label = document.getElementById('theme-audio-label');
      themeToggle.classList.toggle('muted', !this.soundEnabled || !this.audioUnlocked || this.audioBlocked);
      themeToggle.setAttribute('aria-pressed', String(this.soundEnabled));
      themeToggle.title = this.soundEnabled ? 'Tắt nhạc nền bối cảnh' : 'Bật nhạc nền bối cảnh';
      if (icon) icon.textContent = this.soundEnabled && !this.audioBlocked ? '🔊' : '🔇';
      if (label) label.textContent = this.soundEnabled ? 'TẮT' : 'BẬT';
    }

    const equalizer = document.getElementById('audio-eq-bars');
    if (equalizer) {
      equalizer.classList.toggle('muted', !this.soundEnabled || !this.audioUnlocked);
    }
  }

  /* ========================================================================
     LIVE AMBIENT EFFECTS ENGINE (CANVAS DYNAMIC PARTICLES)
     ======================================================================== */
  initAmbientFx() {
    if (!this.ambientCanvas) return;
    this.ambientCtx = this.ambientCanvas.getContext('2d');

    const resize = () => {
      if (!this.ambientCanvas) return;
      const w = this.stageBackdropEl?.clientWidth || window.innerWidth;
      const h = this.stageBackdropEl?.clientHeight || window.innerHeight;
      this.ambientCanvas.width = w;
      this.ambientCanvas.height = h;
    };

    resize();
    window.addEventListener('resize', resize);
  }

  startAmbientFx(themeKey) {
    if (!this.ambientCanvas || !this.ambientCtx) return;
    if (this.ambientAnimationId) {
      cancelAnimationFrame(this.ambientAnimationId);
      this.ambientAnimationId = null;
    }

    const width = this.ambientCanvas.width || 600;
    const height = this.ambientCanvas.height || 800;

    this.ambientParticles = [];
    this.ambientTime = 0;

    if (themeKey === 'trang_nghiem' || themeKey === 'lehoi') {
      // BỐI CẢNH 1: CÁNH HOA MAI & HOA ĐÀO RƠI LÁC ĐÁC + LỒNG ĐÈN TỎA SÁNG
      const count = 30;
      for (let i = 0; i < count; i++) {
        this.ambientParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 3.5 + Math.random() * 4.5,
          speedY: 0.6 + Math.random() * 1.2,
          speedX: (Math.random() - 0.5) * 0.4,
          swayAmp: 1.2 + Math.random() * 2,
          swaySpeed: 0.015 + Math.random() * 0.02,
          swayOffset: Math.random() * Math.PI * 2,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.03,
          isPeach: Math.random() > 0.4, // Peach blossom or Apricot
          alpha: 0.6 + Math.random() * 0.35
        });
      }
    } else if (themeKey === 'sang_trong' || themeKey === 'datiec') {
      // BỐI CẢNH 2: BỤI VÀNG (GOLD BOKEH) BAY LƠ LỬNG LẤP LÁNH SANG TRỌNG
      const count = 42;
      for (let i = 0; i < count; i++) {
        this.ambientParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 2 + Math.random() * 6.5,
          speedY: 0.25 + Math.random() * 0.8,
          speedX: (Math.random() - 0.5) * 0.35,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          pulseOffset: Math.random() * Math.PI * 2,
          baseAlpha: 0.25 + Math.random() * 0.55
        });
      }
    } else {
      // BỐI CẢNH 3: PHỐ THỊ NEON (MƯA PHÙN LẤT PHẤT & ĐÈN CHỚP NHÁY)
      const count = 75;
      for (let i = 0; i < count; i++) {
        this.ambientParticles.push({
          x: Math.random() * (width + 100),
          y: Math.random() * height,
          length: 12 + Math.random() * 22,
          speedY: 10 + Math.random() * 14,
          speedX: -2.5 - Math.random() * 1.5,
          isCyan: Math.random() > 0.35,
          alpha: 0.3 + Math.random() * 0.45
        });
      }
    }

    const renderLoop = () => {
      if (!this.ambientCtx || !this.ambientCanvas) return;
      this.ambientTime++;

      const w = this.ambientCanvas.width;
      const h = this.ambientCanvas.height;
      this.ambientCtx.clearRect(0, 0, w, h);

      if (themeKey === 'trang_nghiem' || themeKey === 'lehoi') {
        // Render Lantern Breathing Glow (Top Right)
        const pulse = 0.5 + Math.sin(this.ambientTime * 0.03) * 0.15;
        const grad = this.ambientCtx.createRadialGradient(w * 0.82, h * 0.12, 10, w * 0.82, h * 0.12, 140);
        grad.addColorStop(0, `rgba(234, 179, 8, ${pulse * 0.35})`);
        grad.addColorStop(0.5, `rgba(225, 29, 72, ${pulse * 0.18})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        this.ambientCtx.fillStyle = grad;
        this.ambientCtx.fillRect(w * 0.5, 0, w * 0.5, h * 0.4);

        // Render Flower Petals
        for (const p of this.ambientParticles) {
          p.y += p.speedY;
          p.x += Math.sin(this.ambientTime * p.swaySpeed + p.swayOffset) * p.swayAmp + p.speedX;
          p.rotation += p.rotSpeed;

          if (p.y > h + 20) {
            p.y = -20;
            p.x = Math.random() * w;
          }
          if (p.x < -20) p.x = w + 20;
          if (p.x > w + 20) p.x = -20;

          this.ambientCtx.save();
          this.ambientCtx.translate(p.x, p.y);
          this.ambientCtx.rotate(p.rotation);

          this.ambientCtx.beginPath();
          // Petal organic teardrop shape
          this.ambientCtx.moveTo(0, -p.radius * 1.2);
          this.ambientCtx.quadraticCurveTo(p.radius * 1.1, -p.radius * 0.4, p.radius * 0.4, p.radius);
          this.ambientCtx.quadraticCurveTo(0, p.radius * 1.3, -p.radius * 0.4, p.radius);
          this.ambientCtx.quadraticCurveTo(-p.radius * 1.1, -p.radius * 0.4, 0, -p.radius * 1.2);

          if (p.isPeach) {
            this.ambientCtx.fillStyle = `rgba(251, 113, 133, ${p.alpha})`; // Pink đào
          } else {
            this.ambientCtx.fillStyle = `rgba(253, 224, 71, ${p.alpha})`; // Vàng mai
          }
          this.ambientCtx.fill();
          this.ambientCtx.restore();
        }
      } else if (themeKey === 'sang_trong' || themeKey === 'datiec') {
        // Render Floating Gold Bokeh Dust
        for (const p of this.ambientParticles) {
          p.y -= p.speedY;
          p.x += p.speedX;

          if (p.y < -30) {
            p.y = h + 30;
            p.x = Math.random() * w;
          }

          const currentAlpha = p.baseAlpha * (0.6 + Math.sin(this.ambientTime * p.pulseSpeed + p.pulseOffset) * 0.4);

          const bokehGrad = this.ambientCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
          bokehGrad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha})`);
          bokehGrad.addColorStop(0.3, `rgba(254, 240, 138, ${currentAlpha * 0.85})`);
          bokehGrad.addColorStop(0.7, `rgba(245, 158, 11, ${currentAlpha * 0.4})`);
          bokehGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');

          this.ambientCtx.fillStyle = bokehGrad;
          this.ambientCtx.beginPath();
          this.ambientCtx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
          this.ambientCtx.fill();
        }
      } else {
        // Render Cyberpunk Drizzle Rain & Ambient Neon Pulse
        const neonPulse = 0.5 + Math.sin(this.ambientTime * 0.05) * 0.15;
        this.ambientCtx.strokeStyle = `rgba(0, 240, 255, ${neonPulse * 0.08})`;
        this.ambientCtx.lineWidth = 1;

        for (const p of this.ambientParticles) {
          p.x += p.speedX;
          p.y += p.speedY;

          if (p.y > h + 30 || p.x < -30) {
            p.y = -30;
            p.x = Math.random() * (w + 100);
          }

          this.ambientCtx.beginPath();
          this.ambientCtx.moveTo(p.x, p.y);
          this.ambientCtx.lineTo(p.x + p.speedX * 1.5, p.y + p.length);

          if (p.isCyan) {
            this.ambientCtx.strokeStyle = `rgba(0, 240, 255, ${p.alpha})`;
          } else {
            this.ambientCtx.strokeStyle = `rgba(255, 0, 127, ${p.alpha})`;
          }
          this.ambientCtx.lineWidth = 1.2;
          this.ambientCtx.stroke();
        }
      }

      this.ambientAnimationId = requestAnimationFrame(renderLoop);
    };

    this.ambientAnimationId = requestAnimationFrame(renderLoop);
  }

  applyGender(gender, shouldSpeak = true) {
    this.currentGender = gender;
    let removedIncompatibleOutfit = false;

    // Update Header Gender Buttons
    const headerNam = document.getElementById('header-gender-nam');
    const headerNu = document.getElementById('header-gender-nu');

    // Update Stage Top Mannequin Gender Switch Buttons
    const stageNam = document.getElementById('btn-mannequin-gender-nam');
    const stageNu = document.getElementById('btn-mannequin-gender-nu');

    if (gender === 'nam') {
      if (headerNam) headerNam.classList.add('active');
      if (headerNu) headerNu.classList.remove('active');
      if (stageNam) stageNam.classList.add('active');
      if (stageNu) stageNu.classList.remove('active');
      if (stageNam) stageNam.setAttribute('aria-pressed', 'true');
      if (stageNu) stageNu.setAttribute('aria-pressed', 'false');
      if (this.mannequinBaseEl) {
        this.mannequinBaseEl.src = 'assets/images/model_male_slim.png';
        this.mannequinBaseEl.alt = 'Ma-nơ-canh nam';
      }
    } else {
      if (headerNam) headerNam.classList.remove('active');
      if (headerNu) headerNu.classList.add('active');
      if (stageNam) stageNam.classList.remove('active');
      if (stageNu) stageNu.classList.add('active');
      if (stageNam) stageNam.setAttribute('aria-pressed', 'false');
      if (stageNu) stageNu.setAttribute('aria-pressed', 'true');
      if (this.mannequinBaseEl) {
        this.mannequinBaseEl.src = 'assets/images/model_female_slim.png';
        this.mannequinBaseEl.alt = 'Ma-nơ-canh nữ';
      }
    }

    Object.entries(this.currentOutfit).forEach(([category, item]) => {
      if (item && this.getItemGenderRestriction(item) &&
          this.getItemGenderRestriction(item) !== gender) {
        this.currentOutfit[category] = null;
        const layer = this.getLayerElement(category);
        if (layer) {
          layer.removeAttribute('src');
          layer.classList.add('hidden');
        }
        removedIncompatibleOutfit = true;
      }
    });

    // Re-render Wardrobe for Gender Compatibility
    this.renderWardrobe();
    if (removedIncompatibleOutfit) this.updateEquippedCount();
    this.updateAutoCheckAndScoring(shouldSpeak);
  }

  getItemGenderRestriction(item) {
    if (!item) return null;
    if (item.presetGenderNeutral === true) return null;

    const sources = [item.id, item.image_url, item.thumbnail].filter(Boolean);
    for (const source of sources) {
      const fileName = source.split(/[\\/]/).pop() || '';
      const genderPrefix = fileName.match(/^(female|male)(?:_|$)/i);
      if (genderPrefix) return genderPrefix[1].toLowerCase() === 'male' ? 'nam' : 'nu';
    }

    return item.gender === 'nam' || item.gender === 'nu' ? item.gender : null;
  }

  getItemDisplayName(item) {
    if (item?.name) return item.name;

    const source = item?.image_url || item?.thumbnail || item?.id || '';
    const stem = (source.split(/[\\/]/).pop() || '')
      .replace(/\.[^.]+$/, '')
      .replace(/^(male|female)_?/i, '')
      .replace(/_/g, ' ');
    return stem.replace(/\b[a-z]/g, letter => letter.toUpperCase());
  }

  goToScene(sceneIdentifier) {
    this.navigateToScene(sceneIdentifier);
  }

  showScene(sceneIdentifier) {
    this.navigateToScene(sceneIdentifier);
  }

  /* ========================================================================
     8. WARDROBE CATALOG & ITEM EQUIPPING
     ======================================================================== */
  renderWardrobe() {
    try {
      if (!this.gridEl) return;
      this.gridEl.innerHTML = '';

      if (!Array.isArray(this.items) || this.items.length === 0) {
        this.gridEl.innerHTML = `<div class="empty-wardrobe">Đang nạp dữ liệu tủ đồ di sản...</div>`;
        return;
      }

      // Filter by Category, Style and Gender
      const filtered = this.items.filter(item => {
        if (!item || !item.id) return false;
        const matchCat = item.category === this.currentCategory;
        const matchSub = this.currentSubFilter === 'all' || item.style === this.currentSubFilter;
        const itemGender = this.getItemGenderRestriction(item);
        const matchGender = !itemGender || itemGender === this.currentGender;
        return matchCat && matchSub && matchGender;
      });

      if (filtered.length === 0) {
        this.gridEl.innerHTML = `<div class="empty-wardrobe">Không tìm thấy vật phẩm phù hợp trong danh mục này.</div>`;
        return;
      }

      filtered.forEach(item => {
        const isEquipped = this.currentOutfit[item.category]?.id === item.id;
        const isLocked = Boolean(item.isLocked && !this.unlockedItems.has(item.id));
        const displayName = this.getItemDisplayName(item);

        // Trang phục nằm trong 1 button bao gồm hình ảnh trang phục và phía dưới là tên trang phục
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `wardrobe-item-btn ${isEquipped ? 'equipped' : ''} ${isLocked ? 'item-locked' : ''}`;
        btn.dataset.id = item.id;
        btn.title = displayName;

        btn.innerHTML = `
          <div class="item-thumb-box">
            <img src="${item.image_url}" alt="${displayName}" class="item-thumb-img" loading="lazy">
            ${isLocked ? '<span class="lock-badge-overlay">🔒 KHÓA</span>' : (isEquipped ? '<span class="equipped-tag">✓ ĐANG MẶC</span>' : '')}
          </div>
          <div class="item-meta-box">
            <span class="item-name-text">${displayName}</span>
            <span class="item-era-text">${isLocked ? '🔒 Cần mở khóa' : (item.era || 'Cổ truyền')}</span>
          </div>
        `;

        // Click to Equip or Unlock (Heritage Vault)
        btn.addEventListener('click', () => {
          this.hideTooltip();
          if (isLocked) {
            this.openHeritageVaultModal(item);
            return;
          }
          this.toggleItem(item);
          this.playBeepSound();
        });

        // Hover for Smart Tooltip
        btn.addEventListener('mouseenter', (e) => {
          this.showTooltip(item, e);
        });
        btn.addEventListener('mouseleave', () => {
          this.hideTooltip();
        });

        this.gridEl.appendChild(btn);
      });
    } catch (err) {
      console.error('[UIManager] Lỗi khi renderWardrobe:', err);
    }
  }

  toggleItem(item) {
    const cat = item.category;
    const itemGender = this.getItemGenderRestriction(item);
    if (itemGender && itemGender !== this.currentGender) return;

    if (this.currentOutfit[cat]?.id === item.id) {
      // Unequip
      this.currentOutfit[cat] = null;
      const layer = this.getLayerElement(cat);
      if (layer) {
        layer.src = '';
        layer.classList.add('hidden');
      }
    } else {
      // Equip (Auto-Snapped 100%)
      this.currentOutfit[cat] = item;
      const layer = this.getLayerElement(cat);
      if (layer) {
        layer.src = item.image_url;
        layer.classList.remove('hidden');

        // Áp dụng góc xoay Hue nếu thanh trượt Y Linh đang hoạt động
        const hueSlider = document.getElementById('hue-slider');
        if (hueSlider && Number(hueSlider.value) !== 0) {
          hueSlider.value = '0';
        }
        this.applyGarmentColor(cat, this.colors[cat] || 'original');
      }
      this.activeColorTarget = cat;
      this.updateColorTargetLabel();
    }

    this.updateEquippedCount();
    this.renderWardrobe();
    this.updateAutoCheckAndScoring();
  }

  getLayerElement(category) {
    switch (category) {
      case 'ao': return this.layerAoEl;
      case 'quan': return this.layerQuanEl;
      case 'phukien': return this.layerPhukienEl;
      case 'giay': return this.layerGiayEl;
      default: return null;
    }
  }

  updateEquippedCount() {
    if (!this.equippedCountEl) return;
    const count = Object.values(this.currentOutfit).filter(Boolean).length;
    this.equippedCountEl.textContent = `ĐANG MẶC: ${count} MÓN`;
  }

  resetOutfit() {
    ['ao', 'quan', 'phukien', 'giay'].forEach(cat => {
      this.currentOutfit[cat] = null;
      const layer = this.getLayerElement(cat);
      if (layer) {
        layer.src = '';
        layer.classList.add('hidden');
        layer.style.filter = 'none';
      }
      this.colors[cat] = 'original';
    });

    this.updateEquippedCount();
    this.renderWardrobe();
    this.updateAutoCheckAndScoring();
  }

  applyPreset(presetKey) {
    this.resetOutfit();

    const findItem = (id) => this.items.find(i => i.id === id);
    const equipByGender = (maleId, femaleId, femaleItemGenderNeutral = false) => {
      let item = findItem(this.currentGender === 'nam' ? maleId : femaleId);
      if (item && femaleItemGenderNeutral && this.currentGender === 'nu') {
        item = { ...item, presetGenderNeutral: true };
      }
      if (item) this.toggleItem(item);
    };

    switch (presetKey) {
      case 'lehoi_standard': // Chuẩn mực Lễ hội
        this.applyTheme('trang_nghiem');
        equipByGender('ao_tac', 'female_ao_tac_tay_thung');
        equipByGender('quan_lua_bach', 'female_quan_dai_den');
        equipByGender('male_giay_den', 'female_dep_quai_thao');
        if (this.currentGender === 'nu') equipByGender('female_quan_toc', 'female_quan_toc');
        break;

      case 'royal_gala': // Dạ tiệc Hoàng gia
        this.applyTheme('sang_trong');
        equipByGender('male_ao_vua_nguyen', 'female_ao_cong_chua');
        equipByGender('quan_lua_bach', 'quan_lua_bach', true);
        equipByGender('male_mu_vua_nguyen', 'female_khan_vanh_day');
        equipByGender('male_giay_vua_nguyen', 'female_hai_theu');
        break;

      case 'street_cyber': // Dạo phố Phá cách
        this.applyTheme('pha_cach');
        equipByGender('male_hoodie_cyber', 'female_ao_croptop');
        equipByGender('quan_cargo', 'female_cargo_jean');
        equipByGender('sneaker_chunky_ham_ho', 'female_sneaker');
        equipByGender('male_mu_luoi_trai', 'female_mu_luoi_trai');
        break;
    }
  }

  /* ========================================================================
     9. AUTO-VALIDATION & AI STYLIST SCORING ENGINE (AUTO-CHECK)
     ======================================================================== */
  updateAutoCheckAndScoring(shouldSpeak = true) {
    const equippedItems = Object.values(this.currentOutfit).filter(Boolean);
    const equippedIds = equippedItems.map(i => i.id);
    const hasTop = Boolean(this.currentOutfit.ao);
    const hasBottom = Boolean(this.currentOutfit.quan);
    const configuredViolations = this.validator
      ? (typeof this.validator.validateOutfitAll === 'function'
        ? this.validator.validateOutfitAll(equippedIds)
        : [this.validator.validateOutfit(equippedIds)].filter(Boolean))
      : [];
    const outfitConflicts = this.checkOutfitConflicts(equippedItems, this.currentTheme);
    const violations = [...configuredViolations, ...outfitConflicts];
    const violation = violations[0] || null;
    const stylistIssues = [];

    if (!hasTop && !hasBottom) {
      stylistIssues.push({
        title: 'Bản phối còn trống',
          advice: 'Tấm ơi, ma-nơ-canh còn đang diện nguyên set “không khí” đó! Mặc thêm áo với quần/váy rồi ta cùng chấm gu nhé 😄'
      });
    } else {
      if (!hasBottom) {
        stylistIssues.push({
          title: 'Thiếu quần/váy',
          advice: "Tấm ơi, quần/váy của con đâu rồi? Đừng đi hội theo kiểu 'nửa kín nửa mở' này nhé! 😳"
        });
      }
      if (!hasTop) {
        stylistIssues.push({
          title: 'Thiếu áo',
          advice: 'Tấm ơi, áo đâu rồi? Gió hội làng đang chờ con khoác thêm một lớp áo đó! 🥶'
        });
      }
    }

    violations.forEach(rule => {
      stylistIssues.push({
        title: '',
        advice: rule.dialogue || this.getCulturalWarningDialogue(rule)
      });
    });

    this.hideAlert();

    if (stylistIssues.length > 0) {
      const issueMessage = stylistIssues
        .map(issue => issue.advice)
        .join('\n\n');
      const hasViolation = violations.length > 0;
      if (this.compositorEl) this.compositorEl.classList.remove('time-paradox-glitch');
      this.miniYlinhEl?.classList.toggle('bounce-alert', hasViolation);
      this.miniYlinhEl?.classList.toggle(
        'conflict-shocked',
        hasViolation && !outfitConflicts.some(rule => rule.expression === 'laughing')
      );
      this.miniYlinhEl?.classList.toggle(
        'conflict-laughing',
        hasViolation && outfitConflicts.some(rule => rule.expression === 'laughing')
      );
      if (shouldSpeak) {
        this.yLinhSpeak(
          issueMessage,
          hasViolation ? 'CẢNH BÁO VI PHẠM' : 'GỢI Ý PHỐI ĐỒ',
          'stylist'
        );
      }
    } else {
      if (this.miniYlinhEl) this.miniYlinhEl.classList.remove('bounce-alert');
      this.miniYlinhEl?.classList.remove('conflict-shocked', 'conflict-laughing');
      if (this.compositorEl) this.compositorEl.classList.remove('time-paradox-glitch');

      const guidance = this.getOutfitGuidance(equippedItems);
      if (shouldSpeak) this.yLinhSpeak(guidance, 'GỢI Ý PHỐI ĐỒ', 'stylist');
    }

    // 2. Chấm Điểm & Nhận Xét Tự Động (AI Stylist Widget)
    if (this.validator && typeof this.validator.evaluateStylistOutfit === 'function') {
      const evaluation = this.validator.evaluateStylistOutfit(equippedItems, this.currentTheme);
      if (outfitConflicts.length > 0) {
        evaluation.hasConflict = true;
        evaluation.conflict = evaluation.conflict || outfitConflicts[0];
        evaluation.conflicts = [...(evaluation.conflicts || []), ...outfitConflicts];
        evaluation.critiqueText = outfitConflicts.map(rule => rule.dialogue).join(' ');
      }
      this.lastOutfitEvaluation = evaluation;
      const quickScoreEl = document.getElementById('quick-outfit-score-value');
      const quickFitEl = document.getElementById('quick-outfit-fit');
      if (quickScoreEl) quickScoreEl.textContent = `${evaluation.totalScore}/100 Điểm`;
      if (quickFitEl) {
        quickFitEl.textContent = !hasTop || !hasBottom
          ? 'Hãy chọn áo và quần để ta xem duyên hội làng.'
          : evaluation.hasConflict
            ? 'Bản phối còn lệch cảnh, Tấm thử đổi một món nhé.'
            : evaluation.totalScore >= 90
              ? 'Rất chuẩn phong vị trẩy hội làng.'
              : evaluation.totalScore >= 75
                ? 'Khá hợp duyên hội làng, chỉ cần điểm thêm một nét riêng.'
                : 'Đã có dáng rồi, Tấm thử đổi màu hoặc thêm món cổ phục nhé.';
                    }

      if (this.statHistoryScoreEl) {
        this.statHistoryScoreEl.textContent = `${evaluation.historyScore}/100`;
      }
      if (this.statCreativeScoreEl) {
        this.statCreativeScoreEl.textContent = `${evaluation.creativeScore}/100`;
      }
      if (this.statTotalScoreEl) {
        this.statTotalScoreEl.textContent = `${evaluation.totalScore}`;
      }
      if (this.barHistoryEl) {
        this.barHistoryEl.style.width = `${evaluation.historyScore}%`;
      }
      if (this.barCreativeEl) {
        this.barCreativeEl.style.width = `${evaluation.creativeScore}%`;
      }
      if (this.widgetCritiqueTextEl) {
        this.widgetCritiqueTextEl.textContent =
          !evaluation.hasConflict && hasTop && hasBottom
            ? this.getOutfitGuidance(equippedItems)
            : evaluation.critiqueText;
      }
    }

    return violation;
  }

  getOutfitGuidance(equippedItems) {
    const wornNames = equippedItems.map(item => this.getItemDisplayName(item));
    const recommendationIds = {
      female_ao_dai_truyen_thong: ['female_quan_dai_den', 'female_hai_theu'],
      female_ao_tac_tay_thung: ['female_quan_dai_den', 'female_hai_theu'],
      female_ao_tu_than: ['female_non_quai_thao', 'female_hai_theu'],
      female_ao_ba_ba: ['female_quan_dai_den', 'female_sneaker'],
      ao_tac: ['quan_lua_bach', 'male_giay_den'],
      ao_ngu_than: ['quan_lua_bach', 'male_giay_den'],
      male_hoodie_cyber: ['quan_cargo', 'sneaker_chunky_ham_ho']
    };
    const wornIds = new Set(equippedItems.map(item => item.id));
    const suggestions = (recommendationIds[this.currentOutfit.ao?.id] || [])
      .map(id => this.items.find(item => item.id === id))
      .filter(item => item &&
        !wornIds.has(item.id) &&
        item.gender === this.currentGender &&
        !this.currentOutfit[item.category] &&
        !(this.validator?.validateOutfitAll([...wornIds, item.id]) || []).length);

    if (suggestions.length > 0) {
      return `Bản phối hiện tại gồm ${wornNames.join(', ')}. Gợi ý bổ sung ${this.getItemDisplayName(suggestions[0])} để hoàn thiện tổng thể.`;
    }

    return `Bản phối hiện tại gồm ${wornNames.join(', ')}. Chưa có cảnh báo xung đột văn hóa theo các quy tắc đang có.`;
  }

  getButOutfitJudgement(evaluation, equippedItems) {
    const topName = this.currentOutfit.ao ? this.getItemDisplayName(this.currentOutfit.ao) : 'chưa có áo';
    const bottomName = this.currentOutfit.quan ? this.getItemDisplayName(this.currentOutfit.quan) : 'chưa có quần hoặc váy';
    const shoeName = this.currentOutfit.giay ? this.getItemDisplayName(this.currentOutfit.giay) : '';
    const accessoryName = this.currentOutfit.phukien ? this.getItemDisplayName(this.currentOutfit.phukien) : '';
    const score = evaluation.totalScore;
    const opening = score >= 90
      ? 'Tuyệt trần, Tấm ơi!'
      : score >= 75
        ? 'Khá duyên dáng, Tấm ơi!'
        : 'Ta thấy bản phối này còn có thể đẹp hơn nữa, Tấm ạ.';
    const harmony = `${topName} đi cùng ${bottomName}${shoeName ? ` và ${shoeName}` : ''} ${evaluation.hasConflict ? 'chưa thật hòa hợp với nhau trong cùng một bối cảnh.' : 'tạo thành một dáng vẻ hài hòa, hợp bước chân đi hội.'}`;
    const detail = shoeName
      ? ` ${shoeName} làm phần chân gọn gàng hơn${topName.toLowerCase().includes('tứ thân') ? ', nhưng hài thêu sẽ hợp với áo tứ thân hơn giày kiểu mới' : ''}.`
      : ' Con có thể thêm một đôi hài thêu để dáng đi thêm mềm mại.';
    const suggestion = evaluation.hasConflict
      ? ' Con thử đổi một món đang lệch cảnh để màu sắc và nếp áo cùng kể một câu chuyện.'
      : score >= 85
        ? ` ${accessoryName ? `${accessoryName} đã làm điểm nhấn vừa đủ.` : 'Nếu thêm một món nhỏ, con hãy chọn màu dịu để không lấn át tà áo.'}`
        : ' Con nên chọn màu trầm hơn hoặc thêm một món cổ phục làm điểm nhấn.';
    return `${opening} Bản phối này đạt ${score}/100 điểm. ${harmony}${detail}${suggestion}`;
  }

  checkOutfitConflicts(currentOutfit, currentEvent) {
    const items = (Array.isArray(currentOutfit) ? currentOutfit : [])
      .filter(Boolean);
    if (items.length === 0) return [];

    const normalize = value => String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '');
    const describe = item => normalize(`${item.id || ''} ${item.name || ''}`);
    const hasAny = (patterns, list = items) =>
      list.some(item => patterns.some(pattern => pattern.test(describe(item))));
    const hasEra = era =>
      items.some(item => normalize(`${item.era || ''} ${item.id || ''} ${item.name || ''}`).includes(era));
    const conflicts = [];
    const addConflict = (id, name, dialogue, expression = 'shocked') => {
      conflicts.push({ id, name, title: name, dialogue, expression });
    };

    const royalItems = [/ao_vua/, /ao_cong_chua/, /mu_vua/];
    const folkItems = [/ao_ba_ba/, /dep_quai_thao/, /non_quai_thao/];
    if (hasAny(royalItems) && hasAny(folkItems)) {
      addConflict(
        'RULE_ROYAL_PEASANT',
        'Hoàng gia và dân gian đang lẫn bối cảnh',
        'Tấm ơi, áo vua vừa gặp dép quai thảo là câu chuyện cung đình rẽ ngang ra bến đò rồi! Chọn một phong vị thôi nhé.',
        'laughing'
      );
    }

    if (hasEra('nguyen') && hasEra('thoi_ly')) {
      addConflict(
        'RULE_CROSS_DYNASTY',
        'Trang phục khác triều đại',
        'Khoan đã Tấm, triều Nguyễn vừa bắt tay triều Lý mà chưa qua cổng thời gian kìa! Mình chọn cùng một thời kỳ cho đồng bộ nhé.'
      );
    }

    const ceremonialItems = [/ao_tac/, /ao_ngu_than/];
    const streetwearItems = [/hoodie_cyber/, /quan_cargo/, /mu_luoi_trai/];
    if (hasAny(ceremonialItems) && hasAny(streetwearItems)) {
      addConflict(
        'RULE_ANACHRONISM',
        'Lễ phục và streetwear lệch thời',
        'Áo Tấc gặp hoodie là “xuyên không collab” hơi mạnh tay rồi đó Tấm! Đổi một món để bản phối kể cùng một câu chuyện nha.'
      );
    }

    const headwear = items.filter(item => /khan_vanh_day|non_la|non_quai_thao/.test(describe(item)));
    if (headwear.length > 1) {
      addConflict(
        'RULE_HEADWEAR_OVERLAP',
        'Chồng phụ kiện đội đầu',
        'Khăn và nón cùng lên sóng thì Y Linh không biết nhìn món nào trước luôn! Chọn một phụ kiện đầu làm điểm nhấn thôi nha.',
        'laughing'
      );
    }

    if (hasAny(ceremonialItems)) {
      const hasSilkTrousers = hasAny([/quan_lua_bach/, /quan_lua_trang/, /quan_lua/]);
      if (!hasSilkTrousers) {
        addConflict(
          'RULE_IMPROPER_CEREMONY',
          'Lễ phục thiếu quần lụa phù hợp',
          'Áo lễ đã chỉnh tề mà quần lụa còn vắng mặt rồi Tấm ơi! Thêm quần lụa trắng để bộ lễ phục trọn vẹn nhé.'
        );
      }
    }

    const event = normalize(currentEvent);
    const isFestival = ['le_hoi', 'lehoi', 'trang_nghiem'].includes(event);
    const isStreet = ['dao_pho', 'daopho', 'pha_cach'].includes(event);
    const allModern = items.length >= 2 &&
      items.every(item => item.style === 'modern' || /hoodie_cyber|quan_cargo|mu_luoi_trai/.test(describe(item)));
    if (isFestival && allModern) {
      addConflict(
        'RULE_EVENT_MISMATCH',
        'Bản phối đương đại lệch sự kiện lễ hội',
        'Tấm ơi, mình đang đi lễ hội mà cả set như vừa bước xuống phố neon! Thêm một món truyền thống để hợp không khí nhé.'
      );
    } else if (
      isStreet &&
      hasAny([/ao_vua/]) &&
      hasAny([/mu_vua/]) &&
      (hasAny([/giay_vua/]) || hasAny([/quan_lua_bach/, /quan_lua_trang/]))
    ) {
      addConflict(
        'RULE_EVENT_MISMATCH',
        'Hoàng bào không hợp bối cảnh dạo phố',
        'Hoàng bào, mũ vua đủ set rồi mà mình đang dạo phố đó Tấm! Bộ này lên phố là spotlight chiếm hết cả con đường luôn.'
      );
    }

    return conflicts;
  }

  getCulturalWarningDialogue(rule) {
    const title = rule.title || `Cảnh báo: ${rule.name || 'cặp trang phục này'} chưa phù hợp bối cảnh.`;
    const details = rule.description || '';
    const advice = rule.historical_lesson || 'Hãy đổi một món để đồng bộ bối cảnh trang phục.';
    return `${title} ${details} ${advice}`;
  }

  yLinhSpeak(message, status = 'STYLIST AI', source = 'stylist') {
    if (!this.ylinhSpeechTextEl || !this.ylinhDialogueBubbleEl) return;

    if (this.ylinhSpeechTimer) clearTimeout(this.ylinhSpeechTimer);

    this.ylinhSpeechSource = source;
    if (source === 'stylist') {
      this.lastStylistSpeech = { message, status };
    }
    this.ylinhSpeechTextEl.textContent = '';
    if (this.ylinhStatusTextEl) this.ylinhStatusTextEl.textContent = status;
    this.ylinhDialogueBubbleEl.classList.remove('is-visible');
    this.ylinhDialogueBubbleEl.getBoundingClientRect();
    this.ylinhDialogueBubbleEl.classList.add('is-visible');

    const speechRun = ++this.butSpeechRun;
    [...String(message)].forEach((character, index) => {
      window.setTimeout(() => {
        if (speechRun === this.butSpeechRun && this.ylinhSpeechTextEl) {
          this.ylinhSpeechTextEl.textContent += character;
        }
      }, index * 24);
    });

    if (source !== 'stylist') {
      this.ylinhSpeechTimer = setTimeout(() => {
        this.ylinhDialogueBubbleEl?.classList.remove('is-visible');
        this.ylinhSpeechSource = null;
        this.ylinhSpeechTimer = null;
      }, 6000);
    } else {
      this.ylinhSpeechTimer = null;
    }
  }

  toggleYlinhSpeech() {
    if (!this.ylinhDialogueBubbleEl) return;

    if (this.ylinhDialogueBubbleEl.classList.contains('is-visible')) {
      this.ylinhDialogueBubbleEl.classList.remove('is-visible');
      return;
    }

    if (this.lastStylistSpeech) {
      this.yLinhSpeak(
        this.lastStylistSpeech.message,
        this.lastStylistSpeech.status,
        'stylist'
      );
    }
  }

  checkCulturalConflict() {
    return this.updateAutoCheckAndScoring();
  }

  showAlert(title, desc) {
    if (!this.alertBoxEl) return;
    if (this.alertTitleEl) this.alertTitleEl.textContent = title;
    if (this.alertDescEl) this.alertDescEl.textContent = desc;
    this.alertBoxEl.classList.remove('hidden');
  }

  hideAlert() {
    if (this.alertBoxEl) {
      this.alertBoxEl.classList.add('hidden');
    }
    if (this.miniYlinhEl) {
      this.miniYlinhEl.classList.remove('bounce-alert');
    }
  }

  /* ========================================================================
     10. COMMIT LOOKBOOK
     ======================================================================== */
  handleCommitOutfit() {
    const equippedItems = Object.values(this.currentOutfit).filter(Boolean);
    const equippedIds = equippedItems.map(i => i.id);

    if (equippedItems.length === 0) {
      this.hideAlert();
      this.yLinhSpeak(
        'Tấm ơi, con hãy chọn ít nhất một món đồ trước nhé! Tủ đồ đang chờ con lên một bộ thật đẹp đó ✨',
        'STYLIST NHẮC NHỞ',
        'stylist'
      );
      return;
    }

    const violation = this.checkCulturalConflict();
    const isConflict = Boolean(violation);
    const conflictDetails = violation ? (violation.description || violation.title) : '';
    const evaluation = this.lastOutfitEvaluation || this.validator?.evaluateStylistOutfit(equippedItems, this.currentTheme);
    if (evaluation) {
      this.yLinhSpeak(
        this.getButOutfitJudgement(evaluation, equippedItems),
        'ÔNG BỤT · GIÁM KHẢO',
        'stylist'
      );
    }

    if (this.lookbookAPI) {
      this.lookbookAPI.generateAILookbook(
        equippedIds,
        this.currentTheme,
        equippedItems,
        isConflict,
        conflictDetails
      );
    }
  }

  /* ========================================================================
     11. HISTORY VIEW INITIALIZATION
     ======================================================================== */
  initHistoryView() {
    const listEl = document.getElementById('history-list');
    const detailEl = document.getElementById('history-detail');
    if (!listEl || !detailEl) return;

    const historyNpc = document.getElementById('npc-history');
    const dialogueToggle = document.getElementById('btn-toggle-history-dialogue');
    if (historyNpc && dialogueToggle) {
      dialogueToggle.addEventListener('click', () => {
        const isHidden = historyNpc.classList.toggle('history-dialogue-hidden');
        dialogueToggle.setAttribute('aria-expanded', String(!isHidden));
        dialogueToggle.setAttribute(
          'aria-label',
          isHidden ? 'Hiện lời thoại của Ông Bụt' : 'Ẩn lời thoại của Ông Bụt'
        );
        dialogueToggle.title = isHidden
          ? 'Hiện lời thoại của Ông Bụt'
          : 'Ẩn lời thoại của Ông Bụt';
      });
    }

    const countEl = document.getElementById('history-stats-count');
    const historyItems = this.getUniqueHistoryItems();
    if (countEl) countEl.textContent = `${historyItems.length} MẪU TRANG PHỤC`;

    const catTabs = document.querySelectorAll('.history-category-tab');
    catTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        catTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.filterHistoryList(tab.dataset.cat, this.currentHistoryStyle);
      });
    });

    const styleTabs = document.querySelectorAll('.history-sub-btn');
    styleTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        styleTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.filterHistoryList(this.currentHistoryCategory, tab.dataset.filter);
      });
    });

    this.filterHistoryList(this.currentHistoryCategory, this.currentHistoryStyle);
  }

  filterHistoryList(cat, sub) {
    const listEl = document.getElementById('history-list');
    if (!listEl) return;
    this.currentHistoryCategory = cat;
    this.currentHistoryStyle = sub;
    listEl.innerHTML = '';

    const filtered = this.getUniqueHistoryItems().filter(item => {
      const matchCat = cat === 'all' || item.category === cat;
      const matchSub = sub === 'all' || item.style === sub;
      return matchCat && matchSub;
    });

    filtered.forEach((item, idx) => {
      const displayName = this.getItemDisplayName(item);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `history-item-btn ${idx === 0 ? 'active' : ''}`;
      btn.dataset.id = item.id;
      btn.title = displayName;

      btn.innerHTML = `
        <div class="history-thumb-box">
          <img src="${item.image_url}" alt="${displayName}" class="history-thumb-img" loading="lazy">
        </div>
        <div class="history-meta-box">
          <span class="history-name-text">${displayName}</span>
          <span class="history-era-text">${item.era || 'Chưa xác định'}</span>
        </div>
      `;

      btn.addEventListener('click', () => {
        document.querySelectorAll('.history-item-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderHistoryDetail(item);
      });

      listEl.appendChild(btn);
    });

    if (filtered.length > 0) {
      this.renderHistoryDetail(filtered[0]);
    } else {
      document.getElementById('history-detail').innerHTML =
        '<div class="empty-wardrobe">Không có trang phục trong bộ lọc này.</div>';
    }
  }

  getUniqueHistoryItems() {
    const seen = new Set();
    return this.items.filter(item => {
      const name = String(item.name || '').normalize('NFC').trim().toLocaleLowerCase('vi');
      const key = `${item.category}:${name}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  renderHistoryDetail(item) {
    const detailEl = document.getElementById('history-detail');
    if (!detailEl || !item) return;
    const displayName = this.getItemDisplayName(item);

    detailEl.innerHTML = `
      <div class="detail-card">
        <div class="detail-hero">
          <img src="${item.image_url}" alt="${displayName}" class="detail-img">
        </div>
        <div class="detail-content">
          <div class="heritage-profile-kicker">
            ${item.isHeritage ? '<span class="heritage-badge">DI SẢN / VĂN HÓA</span>' : item.style === 'modern' ? '<span class="heritage-badge contemporary">ĐƯƠNG ĐẠI</span>' : '<span class="heritage-badge">TRANG PHỤC / PHỤ KIỆN</span>'}
            <span class="detail-era-pill">${item.era || 'Chưa xác định niên đại'}</span>
          </div>
          <h3 class="detail-title">${displayName}</h3>
          ${item.heritageTitle ? `<p class="heritage-title">${item.heritageTitle}</p>` : ''}
          <div class="heritage-meta-grid">
            <div><span class="heritage-meta-label">THỜI KỲ / PHÂN LOẠI</span><p class="detail-text">${item.timeOfOrigin || item.era || 'Chưa có thông tin tư liệu.'}</p></div>
            <div><span class="heritage-meta-label">CÁCH SỬ DỤNG / PHỐI</span><p class="detail-text">${item.usageContext || item.usage_context || 'Chưa có thông tin tư liệu.'}</p></div>
          </div>
          <div class="detail-section">
            <h4 class="detail-sec-title">LỊCH SỬ / GHI CHÚ TƯ LIỆU</h4>
            <p class="detail-text">${item.detailedHistory || item.history || 'Chưa có thông tin tư liệu.'}</p>
          </div>

          <div class="detail-section">
            <h4 class="detail-sec-title">GỢI Ý PHỐI ĐỒ</h4>
            <p class="detail-text">${item.stylingSuggestions || 'Phối cùng phụ kiện cân bằng tỷ lệ và màu sắc của bộ phục.'}</p>
          </div>

          <button class="btn-detail-try" id="btn-try-this-item">THỬ NGAY TRÊN MA-NƠ-CANH ▶</button>
        </div>
      </div>
    `;

    const btnTry = document.getElementById('btn-try-this-item');
    if (btnTry) {
      btnTry.addEventListener('click', () => {
        if (item.isLocked && !this.unlockedItems.has(item.id)) {
          this.openHeritageVaultModal(item);
          return;
        }
        const itemGender = this.getItemGenderRestriction(item);
        if (itemGender) this.applyGender(itemGender, false);
        this.toggleItem(item);
        this.switchWorkspaceView('sandbox');
      });
    }
  }

  /* ========================================================================
     12. THE HERITAGE VAULT (GAMIFICATION QUIZ & UNLOCK ENGINE - REQUIREMENT 4)
     ======================================================================== */
  initHeritageVault() {
    const btnClose = document.getElementById('btn-close-vault');
    const btnStartQuiz = document.getElementById('btn-vault-start-quiz');
    const btnBackLore = document.getElementById('btn-vault-back-lore');
    const btnReloadQ = document.getElementById('btn-vault-change-question');
    const btnEquipNow = document.getElementById('btn-vault-equip-now');
    const modal = document.getElementById('heritage-vault-modal');

    if (btnClose) {
      btnClose.addEventListener('click', () => {
        this.closeHeritageVaultModal();
      });
    }

    if (btnStartQuiz) {
      btnStartQuiz.addEventListener('click', () => {
        this.startVaultQuiz();
      });
    }

    if (btnBackLore) {
      btnBackLore.addEventListener('click', () => {
        this.showVaultStep('lore');
      });
    }

    if (btnReloadQ) {
      btnReloadQ.addEventListener('click', () => {
        this.loadRandomVaultQuestion();
      });
    }

    if (btnEquipNow) {
      btnEquipNow.addEventListener('click', () => {
        if (this.vaultActiveItem) {
          this.closeHeritageVaultModal();
          this.renderWardrobe();
          this.toggleItem(this.vaultActiveItem);
          this.switchWorkspaceView('sandbox');
          this.showToast(`Đã mở khóa và trang bị ${this.vaultActiveItem.name} thành công!`, 'success');
        }
      });
    }
  }

  getVaultLore(item) {
    const loreByItem = {
      female_ao_cong_chua: 'Áo Công Chúa trong kho này là mẫu phục trang sân khấu lấy cảm hứng từ hình ảnh công chúa Việt, không phải một phẩm áo đã được xác nhận của riêng một triều đại. Khi dựng hình, áo thường dùng gấm, lụa hoặc vải có độ rủ, thêm màu sáng và hoa văn nổi để tạo vẻ vui tươi. Món này hợp với cảnh hội, diễn xướng và những dịp chụp hình hơn là mặc trong nghi lễ thật. Tấm nên phối cùng màu nền dịu, giày hoặc hài đơn giản để tà áo giữ được nét mềm mại. Điểm nhận ra là phần tay, cổ và hoa văn được làm nổi bật theo lối kể chuyện cổ tích.',
      female_ao_tac_tay_thung: 'Áo Tấc Tay Thụng thường được xếp vào nhóm áo ngũ thân tay rộng dùng trong bối cảnh lễ nghi, đặc biệt gắn với nếp mặc trang trọng thời Nguyễn. Áo thường may bằng the, lụa, gấm hoặc vải dệt chắc, có cổ đứng, hàng khuy và tay buông rộng tạo dáng khoan thai. Người mặc có thể dùng áo trong dịp tế lễ, cưới hỏi, tiếp khách hoặc những buổi hội cần vẻ nền nã. Tấm nên đi cùng quần dài sáng màu, hài thêu và màu phụ kiện vừa phải. Dấu hiệu dễ nhận là thân áo dài, năm thân và ống tay rộng khiến cử chỉ trở nên chậm rãi, đoan trang.',
      female_non_la: 'Nón lá là vật dụng che nắng mưa quen thuộc của nhiều vùng Việt Nam, hình dáng thay đổi theo nơi làm và cách dùng. Nón thường làm từ lá đã chọn, tre chẻ mảnh và sợi buộc; người thợ tạo khung chóp rồi ép nhiều lớp lá cho nhẹ mà bền. Nón có thể đi cùng áo dài, áo bà ba, áo tứ thân trong ngày thường, hội làng hoặc các buổi diễn xướng. Ý nghĩa của nón nằm ở sự cần cù và vẻ duyên dáng mộc mạc. Tấm nên chọn nón đơn sắc khi áo đã nhiều hoa văn để khuôn mặt và tà áo được nhìn rõ hơn.',
      male_ao_linh_thoi_ly: 'Áo Lính Thời Lý trong kho là mẫu mô phỏng phục trang quân lính, vì hình ảnh còn thiếu hồ sơ đủ để khẳng định một kiểu áo duy nhất. Khi dựng trang phục thời Lý, người làm thường tham khảo áo cổ giao, vải dệt từ sợi tự nhiên và màu bền, thuận cho việc di chuyển. Mẫu này hợp với cảnh diễn xướng, hội làng theo chủ đề lịch sử hoặc tạo hình sân khấu; không nên xem là bản phục dựng hoàn toàn chính xác. Tấm có thể nhận ra dáng áo gọn, ít trang sức và màu trầm. Phối cùng quần đơn sắc để giữ cảm giác khỏe khoắn, ngay ngắn.',
      male_ao_vua_nguyen: 'Áo Vua Triều Nguyễn trong kho là mẫu mô phỏng hình ảnh quân vương, còn phẩm phục và nghi lễ cụ thể chưa được định danh từ tệp hình. Trang phục cung đình Nguyễn thường dùng gấm, lụa, màu nổi và hoa văn biểu trưng quyền bính; mỗi màu, hình thêu và món đi kèm có quy định riêng. Mẫu này hợp cho tạo hình sân khấu, ngày hội văn hóa hoặc bộ ảnh kể chuyện, không nên mặc lẫn với áo dân gian thường ngày. Dấu hiệu nhận ra là dáng áo bề thế, màu trang trọng và họa tiết dày. Tấm hãy tiết chế phụ kiện để áo giữ vị trí chính.',
      male_mu_vua_nguyen: 'Mũ Vua Triều Nguyễn trong kho là mẫu mô phỏng phụ kiện cung đình, chưa đủ tư liệu để xác nhận nó thuộc một phẩm mũ hay nghi lễ cụ thể. Mũ vua thường được làm từ nền cứng, vải phủ, kim loại, ngọc hoặc vật liệu trang trí tùy loại và thường đi cùng bộ áo có quy định riêng. Phụ kiện này hợp với sân khấu, ngày hội văn hóa và tạo hình lịch sử hơn là mặc trong đời thường. Điểm nhận ra là dáng cao, đường nét cân xứng và chi tiết trang trí gợi quyền bính. Tấm nên dùng áo cùng tông, tránh ghép với món quá hiện đại.'
    };
    return loreByItem[item.id] || item.history || 'Tư liệu về món đồ này đang được gìn giữ. Con hãy đọc kỹ tên, chất liệu, cách dùng và dấu hiệu nhận biết trước khi bắt đầu thử thách.';
  }

  openHeritageVaultModal(item) {
    this.vaultActiveItem = item;
    const modal = document.getElementById('heritage-vault-modal');
    if (!modal) return;

    const imgEl = document.getElementById('vault-item-img');
    const titleEl = document.getElementById('vault-item-title');
    const eraEl = document.getElementById('vault-item-era');
    const reasonEl = document.getElementById('vault-item-reason');
    const loreEl = document.getElementById('vault-item-lore');

    if (imgEl) imgEl.src = item.image_url;
    if (titleEl) titleEl.textContent = item.name;
    if (eraEl) eraEl.textContent = item.era || 'Triều đại Việt Nam';
    if (reasonEl) reasonEl.textContent = item.lockReason || 'Bảo vật Hạng Nhất triều đình.';
    if (loreEl) loreEl.textContent = this.getVaultLore(item);

    this.showVaultStep('lore');
    modal.classList.remove('hidden');
    this.playBeepSound();
  }

  closeHeritageVaultModal() {
    const modal = document.getElementById('heritage-vault-modal');
    if (modal) modal.classList.add('hidden');
    this.stopVaultConfetti();
  }

  showVaultStep(stepName) {
    const stepLore = document.getElementById('vault-step-lore');
    const stepQuiz = document.getElementById('vault-step-quiz');
    const stepSuccess = document.getElementById('vault-step-success');

    [stepLore, stepQuiz, stepSuccess].forEach(s => s && s.classList.add('hidden'));

    if (stepName === 'lore' && stepLore) stepLore.classList.remove('hidden');
    if (stepName === 'quiz' && stepQuiz) stepQuiz.classList.remove('hidden');
    if (stepName === 'success' && stepSuccess) stepSuccess.classList.remove('hidden');
  }

  startVaultQuiz() {
    const pool = window.heritageQuizPool && window.heritageQuizPool.length > 0
      ? [...window.heritageQuizPool]
      : [];
    this.vaultQuizQuestions = pool.sort(() => Math.random() - 0.5).slice(0, 5);
    this.vaultQuizQuestionIndex = 0;
    this.vaultQuizCorrectCount = 0;
    this.showVaultStep('quiz');
    this.loadRandomVaultQuestion();
  }

  loadRandomVaultQuestion() {
    const pool = (window.heritageQuizPool && window.heritageQuizPool.length > 0)
      ? window.heritageQuizPool
      : [
          {
            id: "q1",
            question: "Dải viền ngũ sắc trên cổ tay áo Nhật Bình triều Nguyễn biểu trưng cho triết lý văn hóa nào?",
            options: [
              { key: "A", text: "Ngũ hành tương sinh (Kim - Mộc - Thủy - Hỏa - Thổ)" },
              { key: "B", text: "Năm phẩm trật cao quý của cung tần mỹ nữ" },
              { key: "C", text: "Năm phương hướng bảo hộ kinh thành Huế" },
              { key: "D", text: "Năm triều đại rực rỡ nhất trong lịch sử Đại Việt" }
            ],
            correct: "A"
          }
        ];

    if (this.vaultQuizQuestions.length === 0) {
      this.vaultQuizQuestions = [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
    }
    const q = this.vaultQuizQuestions[this.vaultQuizQuestionIndex];
    if (!q) return;
    this.vaultCurrentQuestion = q;

    const qTitle = document.getElementById('vault-quiz-question');
    const qNumber = document.getElementById('vault-quiz-number');
    const optionsGrid = document.getElementById('vault-quiz-options');
    const feedbackBox = document.getElementById('vault-quiz-feedback');

    if (feedbackBox) feedbackBox.classList.add('hidden');
    if (qNumber) qNumber.textContent = `CÂU HỎI ${this.vaultQuizQuestionIndex + 1}/5`;
    if (qTitle) qTitle.textContent = q.question;

    if (optionsGrid) {
      optionsGrid.innerHTML = '';
      q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'vault-option-btn';
        btn.innerHTML = `
          <span class="option-key-badge">${opt.key}</span>
          <span class="option-text">${opt.text}</span>
        `;

        btn.addEventListener('click', () => {
          this.handleVaultQuizAnswer(opt.key, btn);
        });

        optionsGrid.appendChild(btn);
      });
    }
  }

  handleVaultQuizAnswer(selectedKey, btnEl) {
    if (!this.vaultCurrentQuestion) return;
    document.querySelectorAll('#vault-quiz-options .vault-option-btn').forEach(button => {
      button.disabled = true;
    });
    const isCorrect = selectedKey === this.vaultCurrentQuestion.correct;
    const feedbackBox = document.getElementById('vault-quiz-feedback');
    const feedbackIcon = document.getElementById('vault-feedback-icon');
    const feedbackText = document.getElementById('vault-feedback-text');

    if (isCorrect) {
      this.vaultQuizCorrectCount += 1;
      btnEl.classList.add('correct-choice');
      if (feedbackBox) {
        feedbackBox.className = 'vault-quiz-feedback success';
        if (feedbackIcon) feedbackIcon.textContent = '✨';
        if (feedbackText) feedbackText.textContent = 'Mở khóa trang phục thành công!';
        feedbackBox.classList.remove('hidden');
      }

      this.playBeepSound();
      this.unlockVaultItemAfterQuiz();
    } else {
      btnEl.classList.add('wrong-choice');
      if (feedbackBox) {
        feedbackBox.className = 'vault-quiz-feedback error';
        if (feedbackIcon) feedbackIcon.textContent = '⚠️';
        if (feedbackText) feedbackText.textContent = 'Câu này chưa đúng. Con hãy đọc kỹ tư liệu; vẫn còn các câu sau để thử sức.';
        feedbackBox.classList.remove('hidden');
      }

      setTimeout(() => {
        this.vaultQuizQuestionIndex += 1;
        if (this.vaultQuizQuestionIndex < 5) {
          this.loadRandomVaultQuestion();
        } else if (this.vaultQuizCorrectCount >= 1) {
          this.unlockVaultItemAfterQuiz();
        } else {
          this.showVaultQuizFailure();
        }
      }, 1500);
    }
  }

  unlockVaultItemAfterQuiz() {
    if (this.vaultActiveItem) {
      this.unlockedItems.add(this.vaultActiveItem.id);
      localStorage.setItem('vietphuc_unlocked_items', JSON.stringify([...this.unlockedItems]));
    }
    this.startVaultConfetti();
    const successItemTitle = document.getElementById('vault-success-item-name');
    const successDescription = document.querySelector('.vault-success-desc');
    if (successItemTitle && this.vaultActiveItem) {
      successItemTitle.textContent = this.vaultActiveItem.name.toUpperCase();
    }
    if (successDescription) {
      successDescription.textContent = `Mở khóa trang phục thành công! ${this.vaultActiveItem?.name || 'Trang phục'} đã sẵn sàng để mặc vào bản phối.`;
    }
    this.showVaultStep('success');
  }

  showVaultQuizFailure() {
    const feedbackBox = document.getElementById('vault-quiz-feedback');
    const feedbackIcon = document.getElementById('vault-feedback-icon');
    const feedbackText = document.getElementById('vault-feedback-text');
    if (feedbackBox) {
      feedbackBox.className = 'vault-quiz-feedback error';
      if (feedbackIcon) feedbackIcon.textContent = '📜';
      if (feedbackText) feedbackText.textContent = 'Bạn đã mở khóa trang phục thất bại. Hãy đọc lại tư liệu rồi bắt đầu thử thách lần nữa nhé.';
      feedbackBox.classList.remove('hidden');
    }
  }

  startVaultConfetti() {
    const canvas = document.getElementById('vault-confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const colors = ['#ffd700', '#00f0ff', '#ff007f', '#10b981', '#ffffff'];
    const particles = [];
    for (let i = 0; i < 65; i++) {
      particles.push({
        x: canvas.width * 0.5,
        y: canvas.height * 0.4,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.7) * 12,
        size: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        alpha: 1
      });
    }

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.vx *= 0.98;
        p.rotation += p.vRot;
        p.alpha -= 0.012;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
          ctx.restore();
        }
      });

      if (alive) {
        this.vaultConfettiAnimationId = requestAnimationFrame(loop);
      }
    };

    loop();
  }

  stopVaultConfetti() {
    if (this.vaultConfettiAnimationId) {
      cancelAnimationFrame(this.vaultConfettiAnimationId);
      this.vaultConfettiAnimationId = null;
    }
    const canvas = document.getElementById('vault-confetti-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  /* ========================================================================
     13. WARDROBE COLLECTION ENGINE (REQUIREMENT 3: SAVE, EDIT, EXPORT)
     ======================================================================== */
  initWardrobeView() {
    this.initWardrobeManagement();
  }

  initWardrobeManagement() {
    const btnCloseSave = document.getElementById('btn-close-save-dialog');
    const btnCancelSave = document.getElementById('btn-cancel-save-outfit');
    const btnConfirmSave = document.getElementById('btn-confirm-save-outfit');
    const modalSave = document.getElementById('save-outfit-modal');

    if (btnCloseSave && modalSave) {
      btnCloseSave.addEventListener('click', () => modalSave.classList.add('hidden'));
    }
    if (btnCancelSave && modalSave) {
      btnCancelSave.addEventListener('click', () => modalSave.classList.add('hidden'));
    }
    if (btnConfirmSave && modalSave) {
      btnConfirmSave.addEventListener('click', () => {
        const nameInput = document.getElementById('save-outfit-name-input');
        const customName = nameInput ? nameInput.value.trim() : '';
        this.saveCurrentOutfitToWardrobe(customName || 'Bản phối Gấm Vóc Phồn Hoa');
        modalSave.classList.add('hidden');
      });
    }
  }

  loadSavedOutfits() {
    const key = 'vietphuc_wardrobe_' + (this.currentUser?.id || 'default');
    const stored = localStorage.getItem(key);
    this.savedOutfits = stored ? JSON.parse(stored) : [];
  }

  saveOutfitsToStorage() {
    const key = 'vietphuc_wardrobe_' + (this.currentUser?.id || 'default');
    localStorage.setItem(key, JSON.stringify(this.savedOutfits));
    this.updateWardrobeCountBadge();
  }

  updateWardrobeCountBadge() {
    const badge = document.getElementById('wardrobe-count-badge');
    if (badge) {
      badge.textContent = this.savedOutfits.length;
    }
  }

  openSaveOutfitDialog(defaultName = '') {
    const modal = document.getElementById('save-outfit-modal');
    const nameInput = document.getElementById('save-outfit-name-input');
    const summaryBox = document.getElementById('dialog-save-summary');

    if (!modal) return;
    if (nameInput) nameInput.value = defaultName;

    const equipped = Object.values(this.currentOutfit).filter(Boolean);
    if (summaryBox) {
      summaryBox.innerHTML = `
        <div style="font-size: 0.78rem; color: #a1a1c0; line-height: 1.4;">
          <strong>Trang phục:</strong> ${equipped.map(i => i.name).join(' · ') || 'Chưa chọn'}<br>
          <strong>Bối cảnh:</strong> ${this.currentTheme.toUpperCase()}
        </div>
      `;
    }

    modal.classList.remove('hidden');
  }

  saveCurrentOutfitToWardrobe(customName) {
    const equipped = Object.values(this.currentOutfit).filter(Boolean);
    if (equipped.length === 0) {
      this.showToast('Vui lòng mặc ít nhất 1 món đồ trước khi lưu!', 'error');
      return;
    }

    const outfitEntry = {
      id: 'outfit_' + Date.now(),
      title: customName || 'Bản phối Gấm Vóc Phồn Hoa',
      theme: this.currentTheme,
      colors: { ...this.colors },
      outfitIds: {
        ao: this.currentOutfit.ao?.id || null,
        quan: this.currentOutfit.quan?.id || null,
        phukien: this.currentOutfit.phukien?.id || null,
        giay: this.currentOutfit.giay?.id || null
      },
      itemNames: equipped.map(i => i.name),
      previewImg: this.lookbookAPI?.lastSnapshotDataUri || this.currentOutfit.ao?.image_url || 'assets/images/items/male_ao_tac.PNG',
      createdAt: new Date().toLocaleDateString('vi-VN')
    };

    this.savedOutfits.unshift(outfitEntry);
    this.saveOutfitsToStorage();
    this.showToast(`Đã lưu "${outfitEntry.title}" vào Bộ sưu tập cá nhân!`, 'success');
  }

  saveOutfitSilently(defaultTitle, previewDataUri) {
    const equipped = Object.values(this.currentOutfit).filter(Boolean);
    if (equipped.length === 0) return;

    const outfitEntry = {
      id: 'outfit_' + Date.now(),
      title: defaultTitle || 'Bản phối Gấm Vóc Phồn Hoa',
      theme: this.currentTheme,
      colors: { ...this.colors },
      outfitIds: {
        ao: this.currentOutfit.ao?.id || null,
        quan: this.currentOutfit.quan?.id || null,
        phukien: this.currentOutfit.phukien?.id || null,
        giay: this.currentOutfit.giay?.id || null
      },
      itemNames: equipped.map(i => i.name),
      previewImg: previewDataUri || this.lookbookAPI?.lastSnapshotDataUri || this.currentOutfit.ao?.image_url || 'assets/images/items/male_ao_tac.PNG',
      createdAt: new Date().toLocaleDateString('vi-VN')
    };

    this.savedOutfits.unshift(outfitEntry);
    this.saveOutfitsToStorage();
    this.showToast('Đã tự động lưu bản phối vào Bộ sưu tập cá nhân!', 'success');
  }

  renderWardrobeView() {
    const grid = document.getElementById('wardrobe-saved-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (this.savedOutfits.length === 0) {
      grid.innerHTML = `
        <div class="empty-wardrobe-hero">
          <div class="empty-hero-icon">👘</div>
          <h3 class="empty-hero-text">Chưa có bản phối nào trong Bộ sưu tập của bạn</h3>
          <button type="button" class="btn-theme-primary" id="btn-empty-goto-studio">VÀO PHÒNG THỬ ĐỒ NGAY ▶</button>
        </div>
      `;
      const btnGo = document.getElementById('btn-empty-goto-studio');
      if (btnGo) btnGo.addEventListener('click', () => this.switchWorkspaceView('sandbox'));
      return;
    }

    this.savedOutfits.forEach(outfit => {
      const card = document.createElement('div');
      card.className = 'saved-outfit-card';

      let themeLabel = 'LỄ HỘI';
      if (outfit.theme === 'sang_trong' || outfit.theme === 'datiec') themeLabel = 'DẠ TIỆC';
      if (outfit.theme === 'pha_cach' || outfit.theme === 'daopho') themeLabel = 'DẠO PHỐ';

      card.innerHTML = `
        <div class="saved-card-preview-box">
          <img src="${outfit.previewImg}" alt="${outfit.title}" class="saved-card-img" loading="lazy">
          <span class="saved-card-theme-tag">${themeLabel}</span>
          <span class="saved-card-date">${outfit.createdAt}</span>
        </div>
        <div class="saved-card-body">
          <h4 class="saved-card-title">${outfit.title}</h4>
          <p class="saved-card-tags">${outfit.itemNames.join(' · ')}</p>
          <div class="saved-card-actions">
            <button type="button" class="btn-saved-edit" data-id="${outfit.id}">✏️ Mở lại &amp; Chỉnh sửa</button>
            <button type="button" class="btn-saved-share" data-id="${outfit.id}" title="Chia sẻ lên Sàn Giao Lưu Thế Giới">📤 Sàn</button>
            <button type="button" class="btn-saved-delete" data-id="${outfit.id}" title="Xóa khỏi bộ sưu tập">🗑️</button>
          </div>
        </div>
      `;

      // Button: Edit in Studio (Khôi phục bản phối)
      const btnEdit = card.querySelector('.btn-saved-edit');
      if (btnEdit) {
        btnEdit.addEventListener('click', () => {
          this.loadOutfitIntoSandbox(outfit);
        });
      }

      // Button: Share to Nexus Feed
      const btnShare = card.querySelector('.btn-saved-share');
      if (btnShare) {
        btnShare.addEventListener('click', () => {
          this.openShareNexusDialog(outfit);
        });
      }

      // Button: Delete
      const btnDel = card.querySelector('.btn-saved-delete');
      if (btnDel) {
        btnDel.addEventListener('click', () => {
          this.deleteSavedOutfit(outfit.id);
        });
      }

      grid.appendChild(card);
    });
  }

  loadOutfitIntoSandbox(outfit) {
    this.resetOutfit();

    // 1. Áp dụng Theme
    if (outfit.theme) {
      this.applyTheme(outfit.theme);
    }

    // 2. Mặc lại các món trang phục
    if (outfit.outfitIds) {
      ['ao', 'quan', 'phukien', 'giay'].forEach(cat => {
        const id = outfit.outfitIds[cat];
        if (id) {
          const item = this.items.find(i => i.id === id);
          if (item) {
            this.toggleItem(item);
          }
        }
      });
    }

    // 3. Áp dụng màu sắc đã lưu
    if (outfit.colors) {
      ['ao', 'quan', 'phukien', 'giay'].forEach(cat => {
        const hue = outfit.colors[cat];
        if (hue) {
          this.colors[cat] = hue;
          this.applyGarmentColor(cat, hue);
        }
      });
    }

    this.switchWorkspaceView('sandbox');
    this.showToast(`Đã mở lại bản phối "${outfit.title}" trong Phòng thử đồ!`, 'success');
  }

  deleteSavedOutfit(id) {
    this.savedOutfits = this.savedOutfits.filter(o => o.id !== id);
    this.saveOutfitsToStorage();
    this.renderWardrobeView();
    this.showToast('Đã xóa bản phối khỏi Bộ sưu tập cá nhân.', 'info');
  }

  /* ========================================================================
     14. THE NEXUS FEED / WORLD CHAT (REQUIREMENT 5: SOCIAL HUB & REMIX)
     ======================================================================== */
  initNexusView() {
    this.loadNexusPosts();

    // Filter pills
    const pills = document.querySelectorAll('#nexus-filter-pills .nexus-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentNexusFilter = pill.dataset.filter;
        this.renderNexusFeed(this.currentNexusFilter);
        this.playBeepSound();
      });
    });

    // Share current outfit button
    const btnOpenShare = document.getElementById('btn-nexus-open-share');
    const modalShare = document.getElementById('share-nexus-modal');
    const btnCloseShare = document.getElementById('btn-close-share-dialog');
    const btnCancelShare = document.getElementById('btn-cancel-share-nexus');
    const btnConfirmShare = document.getElementById('btn-confirm-share-nexus');

    if (btnOpenShare) {
      btnOpenShare.addEventListener('click', () => {
        const equipped = Object.values(this.currentOutfit).filter(Boolean);
        if (equipped.length === 0) {
          this.showToast('Vui lòng mặc ít nhất 1 món đồ trước khi chia sẻ!', 'error');
          return;
        }
        this.openShareNexusDialog();
      });
    }

    if (btnCloseShare && modalShare) {
      btnCloseShare.addEventListener('click', () => modalShare.classList.add('hidden'));
    }
    if (btnCancelShare && modalShare) {
      btnCancelShare.addEventListener('click', () => modalShare.classList.add('hidden'));
    }

    if (btnConfirmShare && modalShare) {
      btnConfirmShare.addEventListener('click', async () => {
        const captionInput = document.getElementById('share-caption-input');
        const caption = captionInput ? captionInput.value.trim() : '';
        btnConfirmShare.disabled = true;
        try {
          await this.publishCurrentOutfitToNexus(caption);
          modalShare.classList.add('hidden');
        } catch (error) {
          console.error('[UIManager] Không thể đăng bản phối lên Sàn Giao Lưu:', error);
          this.showToast('Không thể tạo ảnh bản phối để đăng. Vui lòng thử lại.', 'error');
        } finally {
          btnConfirmShare.disabled = false;
        }
      });
    }
  }

  loadNexusPosts() {
    const stored = localStorage.getItem('vietphuc_nexus_feed');
    if (stored) {
      try {
        this.nexusPosts = JSON.parse(stored);
      } catch (e) {
        this.nexusPosts = window.initialNexusFeed || [];
      }
    } else {
      this.nexusPosts = window.initialNexusFeed || [];
    }
  }

  saveNexusPostsToStorage() {
    localStorage.setItem('vietphuc_nexus_feed', JSON.stringify(this.nexusPosts));
  }

  openShareNexusDialog(outfitObj = null) {
    const modal = document.getElementById('share-nexus-modal');
    if (modal) modal.classList.remove('hidden');
    this.outfitToShare = outfitObj;
  }

  async publishCurrentOutfitToNexus(caption) {
    const equipped = Object.values(this.currentOutfit).filter(Boolean);
    const postTitle = this.lookbookAPI?.lastMatchResult?.title || (equipped[0]?.name + ' Remix');
    let previewImg = this.nexusPreviewSnapshotDataUri || '';
    if (this.nexusPreviewSnapshotPromise) {
      previewImg = await this.nexusPreviewSnapshotPromise || previewImg;
      this.nexusPreviewSnapshotPromise = null;
      this.nexusPreviewSnapshotDataUri = '';
    } else if (!previewImg && this.lookbookAPI) {
      previewImg = await this.lookbookAPI.captureMannequinSnapshot();
    }
    previewImg = previewImg
      || this.lookbookAPI?.lastSnapshotDataUri
      || this.currentOutfit.ao?.image_url
      || 'assets/images/model_male_slim.png';

    const newPost = {
      id: 'post_' + Date.now(),
      author: {
        name: this.currentUser?.name || 'Nhà Thiết Kế Số',
        username: '@' + (this.currentUser?.email ? this.currentUser.email.split('@')[0] : 'vietphuc_designer'),
        avatar: this.currentUser?.gender === 'nam' ? '👨‍💻' : '👩‍🎨',
        badge: 'UET Fashion Pioneer',
        gender: this.currentUser?.gender || 'nam'
      },
      title: postTitle,
      caption: caption || 'Một bản phối giao thoa di sản độc bản được kết xuất từ Phòng Thử Đồ.',
      theme: this.currentTheme,
      themeLabel: this.currentTheme === 'sang_trong' ? 'DẠ TIỆC' : (this.currentTheme === 'pha_cach' ? 'DẠO PHỐ' : 'LỄ HỘI'),
      timestamp: 'Vừa xong',
      image: previewImg,
      likes: 1,
      likedByMe: true,
      outfitConfig: {
        ao: this.currentOutfit.ao?.id || null,
        quan: this.currentOutfit.quan?.id || null,
        phukien: this.currentOutfit.phukien?.id || null,
        giay: this.currentOutfit.giay?.id || null,
        theme: this.currentTheme,
        colors: { ...this.colors }
      },
      tags: equipped.map(i => '#' + i.id.replace(/_/g, '')),
      comments: []
    };

    this.nexusPosts.unshift(newPost);
    this.saveNexusPostsToStorage();
    this.switchWorkspaceView('nexus');
    this.showToast('Đã xuất bản bản phối lên Sàn Giao Lưu Thế Giới!', 'success');
  }

  renderNexusFeed(filter = 'all') {
    const stream = document.getElementById('nexus-posts-stream');
    const countBadge = document.getElementById('nexus-feed-count');
    if (!stream) return;
    stream.innerHTML = '';

    let filtered = this.nexusPosts;
    if (filter === 'trending') {
      filtered = [...this.nexusPosts].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else if (filter !== 'all') {
      filtered = this.nexusPosts.filter(p => p.theme === filter);
    }

    if (countBadge) {
      countBadge.textContent = `${filtered.length} BẢN PHỐI ĐÃ CHIA SẺ`;
    }

    if (filtered.length === 0) {
      stream.innerHTML = `<div class="empty-wardrobe" style="grid-column: 1 / -1;">Chưa có bản phối nào trong chủ đề này. Hãy là người đầu tiên đăng bài!</div>`;
      return;
    }

    filtered.forEach(post => {
      const card = document.createElement('article');
      card.className = 'nexus-post-card';
      card.id = `card-${post.id}`;

      card.innerHTML = `
        <header class="nexus-post-header">
          <div class="nexus-author-meta">
            <div class="nexus-author-avatar">${post.author.avatar || '👤'}</div>
            <div class="nexus-author-details">
              <span class="nexus-author-name">${post.author.name}</span>
              <span class="nexus-author-badge">${post.author.badge || 'Gen Z Stylist'}</span>
            </div>
          </div>
          <span class="nexus-post-time">${post.timestamp}</span>
        </header>

        <div class="nexus-lookbook-frame">
          <img src="${post.image}" alt="${post.title}" class="nexus-lookbook-img" loading="lazy">
          <span class="nexus-event-tag">${post.themeLabel || 'VIỆT PHỤC'}</span>
        </div>

        <div class="nexus-post-content">
          <h3 class="nexus-post-title">${post.title}</h3>
          <p class="nexus-post-caption">${post.caption}</p>
        </div>

        <div class="nexus-tags-row">
          ${(post.tags || []).map(t => `<span class="nexus-tag-item">${t}</span>`).join('')}
        </div>

        <div class="nexus-post-actions">
          <div class="nexus-social-btns">
            <button type="button" class="btn-nexus-like ${post.likedByMe ? 'liked' : ''}" data-post-id="${post.id}">
              <span class="like-heart">${post.likedByMe ? '❤️' : '🤍'}</span>
              <span class="like-count">${post.likes || 0}</span>
            </button>
            <button type="button" class="btn-nexus-comment-toggle" data-post-id="${post.id}">
              💬 <span class="comment-count">${(post.comments || []).length}</span>
            </button>
          </div>

          <!-- KILLER FEATURE: REMIX NẠP BẢN PHỐI VÀO PHÒNG THỬ ĐỒ -->
          <button type="button" class="btn-nexus-remix" data-post-id="${post.id}" title="Copy bản phối này vào phòng thử đồ của bạn để tiếp tục biến tấu">
            <span class="remix-icon">⚡</span>
            <span class="remix-text">[ LƯU &amp; BIẾN TẤU ]</span>
          </button>
        </div>

        <!-- Collapsible Comments Thread -->
        <div class="nexus-comments-pane hidden" id="comments-pane-${post.id}">
          <div class="nexus-comments-list" id="comments-list-${post.id}">
            ${(post.comments || []).map(c => `
              <div class="nexus-comment-bubble">
                <div class="comment-user-row">
                  <span class="comment-user-name">${c.user}</span>
                  <span class="comment-time">${c.time || ''}</span>
                </div>
                <p class="comment-text">${c.text}</p>
              </div>
            `).join('')}
          </div>

          <div class="nexus-comment-input-row">
            <input type="text" class="comment-input" placeholder="Viết bình luận văn hóa..." id="input-comment-${post.id}">
            <button type="button" class="btn-send-comment" data-post-id="${post.id}">Gửi</button>
          </div>
        </div>
      `;

      // Event: Like Button
      const btnLike = card.querySelector('.btn-nexus-like');
      if (btnLike) {
        btnLike.addEventListener('click', () => {
          this.handleLikeNexusPost(post.id);
        });
      }

      // Event: Comment Toggle
      const btnCommentToggle = card.querySelector('.btn-nexus-comment-toggle');
      if (btnCommentToggle) {
        btnCommentToggle.addEventListener('click', () => {
          const pane = card.querySelector(`#comments-pane-${post.id}`);
          if (pane) pane.classList.toggle('hidden');
        });
      }

      // Event: Send Comment
      const btnSend = card.querySelector('.btn-send-comment');
      if (btnSend) {
        btnSend.addEventListener('click', () => {
          const input = card.querySelector(`#input-comment-${post.id}`);
          const text = input ? input.value.trim() : '';
          if (text) {
            this.handleAddNexusComment(post.id, text);
            if (input) input.value = '';
          }
        });
      }

      // Event: KILLER FEATURE REMIX
      const btnRemix = card.querySelector('.btn-nexus-remix');
      if (btnRemix) {
        btnRemix.addEventListener('click', () => {
          this.remixOutfitFromFeed(post.outfitConfig, post.author.name);
        });
      }

      stream.appendChild(card);
    });
  }

  handleLikeNexusPost(postId) {
    const post = this.nexusPosts.find(p => p.id === postId);
    if (!post) return;

    post.likedByMe = !post.likedByMe;
    post.likes = (post.likes || 0) + (post.likedByMe ? 1 : -1);
    this.saveNexusPostsToStorage();
    this.renderNexusFeed(this.currentNexusFilter);
    this.playBeepSound();
  }

  handleAddNexusComment(postId, commentText) {
    const post = this.nexusPosts.find(p => p.id === postId);
    if (!post) return;

    if (!post.comments) post.comments = [];
    post.comments.push({
      id: 'c_' + Date.now(),
      user: this.currentUser?.name || 'Nhà Thiết Kế Số',
      text: commentText,
      time: 'Vừa xong'
    });

    this.saveNexusPostsToStorage();
    this.renderNexusFeed(this.currentNexusFilter);
    this.showToast('Đã gửi bình luận văn hóa!', 'success');
  }

  remixOutfitFromFeed(outfitConfig, authorName) {
    if (!outfitConfig) return;

    this.resetOutfit();

    // 1. Áp dụng Theme sự kiện
    if (outfitConfig.theme) {
      this.applyTheme(outfitConfig.theme);
    }

    // 2. Mặc trang phục
    ['ao', 'quan', 'phukien', 'giay'].forEach(cat => {
      const id = outfitConfig[cat];
      if (id) {
        // Cho phép trải nghiệm món đồ trong chế độ Remix
        if (id === 'ao_ngu_than') {
          this.unlockedItems.add(id);
          localStorage.setItem('vietphuc_unlocked_items', JSON.stringify([...this.unlockedItems]));
        }

        const item = this.items.find(i => i.id === id);
        if (item) {
          this.toggleItem(item);
        }
      }
    });

    // 3. Áp dụng màu sắc
    if (outfitConfig.colors) {
      ['ao', 'quan', 'phukien', 'giay'].forEach(cat => {
        const hue = outfitConfig.colors[cat];
        if (hue) {
          this.colors[cat] = hue;
          this.applyGarmentColor(cat, hue);
        }
      });
    }

    // 4. Chuyển ngay về Phòng Thử Đồ
    this.switchWorkspaceView('sandbox');
    this.showToast(`Đã nạp bản phối của ${authorName} vào Phòng Thử Đồ! Hãy thỏa sức biến tấu phong cách của bạn.`, 'success');
  }

  /* ========================================================================
     15. APP TOAST NOTIFICATIONS
     ======================================================================== */
  showToast(message, type = 'info') {
    const container = document.getElementById('app-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `app-toast toast-${type}`;
    let icon = '✦';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '✕';

    toast.innerHTML = `
      <span style="font-size: 1.1rem; color: ${type === 'success' ? '#10b981' : (type === 'error' ? '#ef4444' : 'var(--neon-current)')}">${icon}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px) scale(0.95)';
      setTimeout(() => toast.remove(), 350);
    }, 3800);
  }

  playBeepSound() {
    if (!this.soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {}
  }
}

if (typeof window !== 'undefined') {
  window.UIManager = UIManager;
}
