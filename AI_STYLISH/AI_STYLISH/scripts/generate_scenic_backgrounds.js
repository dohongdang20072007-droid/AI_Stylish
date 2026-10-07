import fs from 'fs';
import sharp from 'sharp';

// 1. Chốn Linh Thiêng (Chùa Thiên Mụ / Lồng Đèn Hội An)
const svgChonLinhThien = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <radialGradient id="moonGlow" cx="65%" cy="30%" r="45%">
      <stop offset="0%" stop-color="#fffbeb" stop-opacity="0.95" />
      <stop offset="25%" stop-color="#fef08a" stop-opacity="0.6" />
      <stop offset="60%" stop-color="#ca8a04" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#050714" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="nightSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#060919" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="80%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#0d1117" />
    </linearGradient>
    <radialGradient id="lanternRed" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#ff7b90" />
      <stop offset="60%" stop-color="#dc2626" />
      <stop offset="100%" stop-color="#7f1d1d" />
    </radialGradient>
    <radialGradient id="lanternGold" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="60%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#854d0e" />
    </radialGradient>
    <linearGradient id="templeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="50%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>
  </defs>

  <!-- Sky -->
  <rect width="1200" height="800" fill="url(#nightSky)" />

  <!-- Moon & Aura -->
  <circle cx="780" cy="220" r="160" fill="url(#moonGlow)" />
  <circle cx="780" cy="220" r="54" fill="#fef9c3" filter="drop-shadow(0 0 25px #fef08a)" />

  <!-- Distant Mountains & Mist -->
  <path d="M0 520 Q220 440 450 510 T900 480 Q1050 450 1200 520 L1200 800 L0 800 Z" fill="#0b1120" opacity="0.8" />
  <path d="M0 560 Q350 510 700 550 T1200 540 L1200 800 L0 800 Z" fill="#070b14" />

  <!-- Thien Mu Pagoda (Tháp Phước Duyên) Silhouette on Left -->
  <g transform="translate(140, 160)" opacity="0.95">
    <!-- Base to top tiers -->
    <path d="M40 380 L160 380 L150 330 L50 330 Z" fill="url(#templeGrad)" stroke="#ffd700" stroke-width="0.75" />
    <path d="M30 330 Q100 320 170 330 L160 320 Q100 315 40 320 Z" fill="#b45309" />
    <path d="M52 320 L148 320 L142 270 L58 270 Z" fill="url(#templeGrad)" stroke="#ffd700" stroke-width="0.75" />
    <path d="M38 270 Q100 260 162 270 L154 260 Q100 255 46 260 Z" fill="#b45309" />
    <path d="M60 260 L140 260 L134 210 L66 210 Z" fill="url(#templeGrad)" stroke="#ffd700" stroke-width="0.75" />
    <path d="M46 210 Q100 200 154 210 L146 200 Q100 195 54 200 Z" fill="#b45309" />
    <path d="M68 200 L132 200 L127 150 L73 150 Z" fill="url(#templeGrad)" />
    <path d="M56 150 Q100 140 144 150 L138 140 Q100 135 62 140 Z" fill="#b45309" />
    <path d="M75 140 L125 140 L120 95 L80 95 Z" fill="url(#templeGrad)" />
    <path d="M66 95 Q100 88 134 95 L128 88 Q100 82 72 88 Z" fill="#b45309" />
    <path d="M82 88 L118 88 L112 50 L88 50 Z" fill="url(#templeGrad)" />
    <!-- Spire -->
    <polygon points="100,10 94,50 106,50" fill="#ffd700" filter="drop-shadow(0 0 10px #ffd700)" />
    <!-- Tier lanterns -->
    <circle cx="36" cy="332" r="3.5" fill="#fde047" />
    <circle cx="164" cy="332" r="3.5" fill="#fde047" />
    <circle cx="44" cy="272" r="3" fill="#fde047" />
    <circle cx="156" cy="272" r="3" fill="#fde047" />
  </g>

  <!-- Ancient Courtyard & Paved Stone Ground -->
  <path d="M0 580 L1200 580 L1200 800 L0 800 Z" fill="#0a0e17" />
  <line x1="0" y1="640" x2="1200" y2="640" stroke="#1e293b" stroke-width="1.5" />
  <line x1="0" y1="710" x2="1200" y2="710" stroke="#1e293b" stroke-width="2" />

  <!-- Hoi An Lantern Tree Strings (Right) -->
  <path d="M800 0 Q980 90 1200 40" stroke="#78350f" stroke-width="2" fill="none" />
  <path d="M740 60 Q960 180 1200 130" stroke="#78350f" stroke-width="1.8" fill="none" />

  <!-- Hanging Glowing Lanterns -->
  <!-- Lantern 1 (Red) -->
  <g transform="translate(860, 80)">
    <line x1="0" y1="0" x2="0" y2="25" stroke="#ca8a04" stroke-width="1.5" />
    <ellipse cx="0" cy="50" rx="22" ry="28" fill="url(#lanternRed)" filter="drop-shadow(0 0 16px rgba(239,68,68,0.75))" />
    <rect x="-8" y="22" width="16" height="5" fill="#ffd700" />
    <rect x="-8" y="73" width="16" height="5" fill="#ffd700" />
    <path d="M0 78 L-5 110 M0 78 L0 115 M0 78 L5 110" stroke="#f43f5e" stroke-width="1.5" />
  </g>
  <!-- Lantern 2 (Gold) -->
  <g transform="translate(970, 110)">
    <line x1="0" y1="0" x2="0" y2="30" stroke="#ca8a04" stroke-width="1.5" />
    <ellipse cx="0" cy="58" rx="25" ry="32" fill="url(#lanternGold)" filter="drop-shadow(0 0 20px rgba(234,179,8,0.85))" />
    <rect x="-10" y="26" width="20" height="6" fill="#78350f" />
    <rect x="-10" y="84" width="20" height="6" fill="#78350f" />
    <path d="M0 90 L-6 125 M0 90 L0 130 M0 90 L6 125" stroke="#eab308" stroke-width="1.8" />
  </g>
  <!-- Lantern 3 (Pink) -->
  <g transform="translate(1080, 70)">
    <line x1="0" y1="0" x2="0" y2="20" stroke="#ca8a04" stroke-width="1.5" />
    <ellipse cx="0" cy="46" rx="20" ry="26" fill="url(#lanternRed)" filter="drop-shadow(0 0 15px rgba(244,63,94,0.75))" />
    <rect x="-7" y="20" width="14" height="4" fill="#ffd700" />
    <rect x="-7" y="68" width="14" height="4" fill="#ffd700" />
    <path d="M0 72 L0 102" stroke="#fda4af" stroke-width="1.5" />
  </g>

  <!-- Bonsai / Peach Blossom Silhouette Frame -->
  <path d="M0 320 Q60 280 110 320 T180 300 Q150 360 80 400 Z" fill="#090d16" opacity="0.7" />
  <!-- Delicate Blossoms -->
  <circle cx="110" cy="310" r="4.5" fill="#fda4af" />
  <circle cx="130" cy="295" r="4" fill="#fda4af" />
  <circle cx="160" cy="305" r="5" fill="#fb7185" />
  <circle cx="85" cy="335" r="4" fill="#fda4af" />
</svg>`;

// 2. Dạ Tiệc Đương Đại (Sảnh Tiệc Sang Trọng Ánh Vàng)
const svgDaTiecDuongDai = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <radialGradient id="galaCenterGlow" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#ffd700" stop-opacity="0.4" />
      <stop offset="35%" stop-color="#f59e0b" stop-opacity="0.2" />
      <stop offset="70%" stop-color="#701a75" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#050308" stop-opacity="1" />
    </radialGradient>
    <linearGradient id="goldPillar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#451a03" />
      <stop offset="30%" stop-color="#d97706" />
      <stop offset="50%" stop-color="#fef08a" />
      <stop offset="70%" stop-color="#b45309" />
      <stop offset="100%" stop-color="#291102" />
    </linearGradient>
    <linearGradient id="marbleFloor" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#180d22" />
      <stop offset="40%" stop-color="#0f0717" />
      <stop offset="100%" stop-color="#050208" />
    </linearGradient>
  </defs>

  <!-- Background Void & Core Lighting -->
  <rect width="1200" height="800" fill="#08030b" />
  <rect width="1200" height="800" fill="url(#galaCenterGlow)" />

  <!-- Symmetrical Grand Archway -->
  <path d="M220 0 L980 0 L980 480 Q600 360 220 480 Z" fill="#120619" stroke="#ffd700" stroke-width="1.5" opacity="0.85" />
  <path d="M300 0 L900 0 L900 440 Q600 340 300 440 Z" fill="#190a23" stroke="#f59e0b" stroke-width="1" opacity="0.6" />

  <!-- Central Imperial Lotus Halo -->
  <circle cx="600" cy="340" r="140" fill="none" stroke="#ffd700" stroke-width="2" stroke-dasharray="8,5" opacity="0.65" />
  <circle cx="600" cy="340" r="90" fill="none" stroke="#f43f5e" stroke-width="1.5" opacity="0.75" />
  <circle cx="600" cy="340" r="40" fill="#ffd700" opacity="0.15" filter="drop-shadow(0 0 25px #ffd700)" />

  <!-- Grand Pillars (Left & Right) -->
  <rect x="70" y="20" width="85" height="780" fill="url(#goldPillar)" rx="8" />
  <rect x="180" y="80" width="65" height="720" fill="url(#goldPillar)" rx="6" opacity="0.8" />
  <rect x="955" y="80" width="65" height="720" fill="url(#goldPillar)" rx="6" opacity="0.8" />
  <rect x="1045" y="20" width="85" height="780" fill="url(#goldPillar)" rx="8" />

  <!-- Gilded Dragon / Floral Vines on Pillars -->
  <path d="M112 60 Q130 180 95 300 T120 540" stroke="#fef08a" stroke-width="2.5" fill="none" opacity="0.7" />
  <path d="M1088 60 Q1070 180 1105 300 T1080 540" stroke="#fef08a" stroke-width="2.5" fill="none" opacity="0.7" />

  <!-- Chandelier Centerpiece at Top -->
  <g transform="translate(600, 40)">
    <line x1="0" y1="-40" x2="0" y2="40" stroke="#ffd700" stroke-width="3" />
    <path d="M-90 40 Q0 80 90 40 L60 100 Q0 130 -60 100 Z" fill="#b45309" stroke="#ffd700" stroke-width="2" />
    <!-- Crystal Droplets -->
    <circle cx="-70" cy="70" r="6" fill="#fef08a" filter="drop-shadow(0 0 8px #ffd700)" />
    <circle cx="-35" cy="100" r="7" fill="#fef08a" filter="drop-shadow(0 0 10px #ffd700)" />
    <circle cx="0" cy="120" r="9" fill="#ffffff" filter="drop-shadow(0 0 14px #ffd700)" />
    <circle cx="35" cy="100" r="7" fill="#fef08a" filter="drop-shadow(0 0 10px #ffd700)" />
    <circle cx="70" cy="70" r="6" fill="#fef08a" filter="drop-shadow(0 0 8px #ffd700)" />
  </g>

  <!-- Mirror Marble Floor with Reflections -->
  <path d="M0 550 L1200 550 L1200 800 L0 800 Z" fill="url(#marbleFloor)" />
  <!-- Perspective Floor Lines -->
  <line x1="0" y1="800" x2="480" y2="550" stroke="#ffd700" stroke-width="0.8" opacity="0.25" />
  <line x1="1200" y1="800" x2="720" y2="550" stroke="#ffd700" stroke-width="0.8" opacity="0.25" />
  <line x1="300" y1="800" x2="540" y2="550" stroke="#f59e0b" stroke-width="0.8" opacity="0.2" />
  <line x1="900" y1="800" x2="660" y2="550" stroke="#f59e0b" stroke-width="0.8" opacity="0.2" />

  <!-- Floor Glow Halo -->
  <ellipse cx="600" cy="650" rx="340" ry="70" fill="#ffd700" opacity="0.08" filter="blur(20px)" />
</svg>`;

// 3. Phố Thị Neon (Tạ Hiện / Nguyễn Huệ Cyberpunk)
const svgPhoThiNeon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <radialGradient id="cyberSky" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#081426" />
      <stop offset="45%" stop-color="#040711" />
      <stop offset="100%" stop-color="#020307" />
    </radialGradient>
    <linearGradient id="wetRoad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#090f1d" />
      <stop offset="50%" stop-color="#050811" />
      <stop offset="100%" stop-color="#020306" />
    </linearGradient>
  </defs>

  <!-- Dark Midnight Sky -->
  <rect width="1200" height="800" fill="url(#cyberSky)" />

  <!-- Distant Skyscrapers & Hanoi Skyline with Neon Beacons -->
  <rect x="380" y="140" width="80" height="420" fill="#080e1a" stroke="#00f0ff" stroke-width="0.75" opacity="0.6" />
  <rect x="480" y="80" width="110" height="480" fill="#0c1322" stroke="#ff007f" stroke-width="0.75" opacity="0.7" />
  <line x1="535" y1="20" x2="535" y2="80" stroke="#ff007f" stroke-width="2" />
  <circle cx="535" cy="20" r="4" fill="#ff007f" filter="drop-shadow(0 0 8px #ff007f)" />
  <rect x="610" y="110" width="90" height="450" fill="#080e1a" stroke="#00f0ff" stroke-width="0.75" opacity="0.6" />
  <rect x="720" y="160" width="80" height="400" fill="#050a14" opacity="0.8" />

  <!-- Classical Hanoi / Saigon Shophouses (French & Tube House Architecture) -->
  <!-- Left Shophouse -->
  <path d="M0 240 L260 270 L260 580 L0 580 Z" fill="#090e17" stroke="#1e293b" stroke-width="1.5" />
  <!-- Traditional Curved Tile Roof Edge -->
  <path d="M-10 240 Q130 220 270 270 L260 285 Q130 235 -10 255 Z" fill="#78350f" stroke="#00f0ff" stroke-width="1" />

  <!-- Right Shophouse -->
  <path d="M940 270 L1200 230 L1200 580 L940 580 Z" fill="#090e17" stroke="#1e293b" stroke-width="1.5" />
  <path d="M930 270 Q1070 220 1210 230 L1210 245 Q1070 235 930 285 Z" fill="#78350f" stroke="#ff007f" stroke-width="1" />

  <!-- High-Voltage Overhead City Cables -->
  <path d="M0 120 Q300 240 600 220 T1200 140" stroke="#182234" stroke-width="2" fill="none" />
  <path d="M0 160 Q400 270 800 250 T1200 180" stroke="#182234" stroke-width="1.8" fill="none" />
  <path d="M260 270 Q600 340 940 270" stroke="#182234" stroke-width="1.5" fill="none" />

  <!-- GLOWING NEON BILLBOARDS & STREET SIGNS (Vietnamese Cyberpunk) -->
  <!-- Sign 1: TẠ HIỆN 2077 (Left Vertical Cyan Neon) -->
  <g transform="translate(60, 290)">
    <rect x="0" y="0" width="70" height="230" fill="#05070e" stroke="#00f0ff" stroke-width="2.5" rx="4" filter="drop-shadow(0 0 14px #00f0ff)" />
    <text x="35" y="38" fill="#00f0ff" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="900" text-anchor="middle">T</text>
    <text x="35" y="68" fill="#00f0ff" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="900" text-anchor="middle">Ạ</text>
    <text x="35" y="112" fill="#00f0ff" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="900" text-anchor="middle">H</text>
    <text x="35" y="142" fill="#00f0ff" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="900" text-anchor="middle">I</text>
    <text x="35" y="172" fill="#00f0ff" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="900" text-anchor="middle">Ệ</text>
    <text x="35" y="202" fill="#00f0ff" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="900" text-anchor="middle">N</text>
  </g>

  <!-- Sign 2: GẤM VÓC PHỒN HOA (Horizontal Top Center Holographic Billboard) -->
  <g transform="translate(430, 220)">
    <rect x="0" y="0" width="340" height="60" fill="#070914" stroke="#ff007f" stroke-width="2.5" rx="6" filter="drop-shadow(0 0 20px #ff007f)" />
    <text x="170" y="38" fill="#ffffff" font-family="'Montserrat', sans-serif" font-size="20" font-weight="900" letter-spacing="3" text-anchor="middle">GẤM VÓC PHỒN HOA</text>
    <line x1="20" y1="48" x2="320" y2="48" stroke="#00f0ff" stroke-width="2" />
  </g>

  <!-- Sign 3: TRÀ ĐÁ CYBER (Right Vertical Pink Neon) -->
  <g transform="translate(1070, 280)">
    <rect x="0" y="0" width="70" height="200" fill="#05070e" stroke="#ff007f" stroke-width="2.5" rx="4" filter="drop-shadow(0 0 16px #ff007f)" />
    <text x="35" y="40" fill="#ff007f" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="900" text-anchor="middle">T</text>
    <text x="35" y="70" fill="#ff007f" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="900" text-anchor="middle">R</text>
    <text x="35" y="100" fill="#ff007f" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="900" text-anchor="middle">À</text>
    <text x="35" y="145" fill="#00f0ff" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="900" text-anchor="middle">Đ</text>
    <text x="35" y="175" fill="#00f0ff" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="900" text-anchor="middle">Á</text>
  </g>

  <!-- Wet Asphalt Street with Mirrored Neon Reflections -->
  <path d="M0 560 L1200 560 L1200 800 L0 800 Z" fill="url(#wetRoad)" />
  <!-- Cyan Reflection Streaks -->
  <ellipse cx="180" cy="650" rx="90" ry="12" fill="#00f0ff" opacity="0.3" filter="blur(8px)" />
  <ellipse cx="500" cy="680" rx="140" ry="16" fill="#00f0ff" opacity="0.25" filter="blur(10px)" />
  <!-- Pink & Amber Reflection Streaks -->
  <ellipse cx="700" cy="670" rx="160" ry="18" fill="#ff007f" opacity="0.35" filter="blur(10px)" />
  <ellipse cx="1060" cy="650" rx="80" ry="12" fill="#ff007f" opacity="0.3" filter="blur(8px)" />
</svg>`;

async function generate() {
  const list = [
    { id: 'bg_dan_gian', svg: svgChonLinhThien },
    { id: 'bg_cung_dinh', svg: svgDaTiecDuongDai },
    { id: 'bg_gen_z', svg: svgPhoThiNeon }
  ];

  for (const item of list) {
    fs.writeFileSync(`assets/images/${item.id}.svg`, item.svg, 'utf8');
    fs.writeFileSync(`assets/images/items/${item.id}.svg`, item.svg, 'utf8');
    await sharp(Buffer.from(item.svg)).png().toFile(`assets/images/${item.id}.png`);
    await sharp(Buffer.from(item.svg)).png().toFile(`assets/images/items/${item.id}.png`);
    console.log(`[Generated] assets/images/${item.id}.png`);
  }
}

generate().catch(console.error);
