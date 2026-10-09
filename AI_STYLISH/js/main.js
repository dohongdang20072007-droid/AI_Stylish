/**
 * js/main.js
 * Điểm khởi chạy của ứng dụng Gấm Vóc Phồn Hoa (Vanilla JS thuần)
 * Điều phối CulturalValidator, UIManager và quản lý chuyển cảnh Scene Router
 */

/**
 * Hàm khởi tạo toàn bộ ứng dụng (Scene 1 Terminal Intro hiển thị mặc định)
 */
function initApp() {
  console.log('[Gấm Vóc Phồn Hoa] Bắt đầu khởi tạo hệ thống (initApp)...');

  try {
    // 1. Đảm bảo cấu trúc viewport & ẩn các overlay khẩn cấp
    const blackoutOverlay = document.getElementById('quantum-blackout-overlay');
    if (blackoutOverlay) {
      blackoutOverlay.classList.remove('active');
      blackoutOverlay.classList.add('hidden');
    }

    const crtOverlay = document.getElementById('crt-shred-overlay');
    if (crtOverlay) {
      crtOverlay.classList.remove('active');
      crtOverlay.classList.add('hidden');
    }

    // 2. Khởi tạo CulturalValidator an toàn
    let validator = null;
    try {
      if (typeof CulturalValidator !== 'undefined') {
        validator = new CulturalValidator();
        validator.init();
        console.log('[Gấm Vóc Phồn Hoa] CulturalValidator đã sẵn sàng.');
      } else {
        console.warn('[Gấm Vóc Phồn Hoa] CulturalValidator chưa được định nghĩa.');
      }
    } catch (valErr) {
      console.error('[Gấm Vóc Phồn Hoa] Lỗi khi khởi tạo CulturalValidator:', valErr);
    }

    // 3. Khởi tạo UIManager an toàn
    let ui = null;
    try {
      if (typeof UIManager !== 'undefined') {
        ui = new UIManager(validator);
        ui.init();
        console.log('[Gấm Vóc Phồn Hoa] UIManager đã khởi tạo thành công.');
      } else {
        console.error('[Gấm Vóc Phồn Hoa] UIManager chưa được định nghĩa!');
      }
    } catch (uiErr) {
      console.error('[Gấm Vóc Phồn Hoa] Lỗi khi khởi tạo UIManager:', uiErr);
    }

    // 4. Kích hoạt hiển thị Scene 1 (Lời Gọi Y Linh) dưới thanh Navbar
    if (ui && typeof ui.executeSceneSwitch === 'function') {
      ui.executeSceneSwitch('scene-1');
    } else if (ui && typeof ui.goToScene === 'function') {
      ui.goToScene(1);
    } else {
      // Fallback DOM trực tiếp nếu UI manager có sự cố
      console.warn('[Gấm Vóc Phồn Hoa] Sử dụng Scene Router DOM fallback cho Scene 1');
      const allScenes = document.querySelectorAll('.scene');
      allScenes.forEach(scene => {
        scene.classList.remove('active-scene');
        scene.style.setProperty('display', 'none', 'important');
      });

      const scene1 = document.getElementById('scene-1');
      if (scene1) {
        scene1.classList.add('active-scene');
        scene1.classList.remove('hidden');
        scene1.style.setProperty('display', 'flex', 'important');
      }
    }

    // 5. Lưu instance vào window để tiện debug và tương tác
    window.__vietPhucApp = {
      validator,
      ui,
      initApp
    };

    window.navigateToScene = function(targetSceneId) {
      if (ui && typeof ui.navigateToScene === 'function') {
        return ui.navigateToScene(targetSceneId);
      }
    };

    console.log('[Gấm Vóc Phồn Hoa] Hệ thống đã sẵn sàng 100%! Màn hình Scene 1 đã hiển thị.');
  } catch (globalErr) {
    console.error('[Gấm Vóc Phồn Hoa] Lỗi ngoại lệ trong initApp:', globalErr);
  }
}

// Gán initApp ra phạm vi toàn cục
window.initApp = initApp;

// Bắt sự kiện DOMContentLoaded hoặc chạy ngay nếu DOM đã sẵn sàng
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
