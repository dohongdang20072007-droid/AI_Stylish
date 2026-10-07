import fs from 'fs';
import path from 'path';

const dirs = [
  'assets/images',
  'assets/images/items',
  'assets/images/real_renders'
];
dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

function writeBoth(fileBase, content) {
  fs.writeFileSync(`${fileBase}.svg`, content, 'utf8');
  fs.writeFileSync(`${fileBase}.png`, content, 'utf8');
}

// 1. Mannequins
const maleMannequin = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
  <defs>
    <linearGradient id="maleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff2a55" />
      <stop offset="50%" stop-color="#e60039" />
      <stop offset="100%" stop-color="#990026" />
    </linearGradient>
    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <g filter="url(#neonGlow)">
    <ellipse cx="200" cy="85" rx="36" ry="46" fill="url(#maleGrad)" />
    <path d="M188 126 L212 126 L214 150 L186 150 Z" fill="url(#maleGrad)" />
    <path d="M135 152 Q200 142 265 152 L260 270 Q240 330 248 375 L152 375 Q160 330 140 270 Z" fill="url(#maleGrad)" />
    <path d="M135 152 Q115 220 112 300 Q108 360 102 420 Q106 430 114 425 Q122 360 126 300 Q135 235 145 180 Z" fill="url(#maleGrad)" />
    <path d="M265 152 Q285 220 288 300 Q292 360 298 420 Q294 430 286 425 Q278 360 274 300 Q265 235 255 180 Z" fill="url(#maleGrad)" />
    <path d="M152 375 L248 375 L252 460 Q245 560 236 670 L232 760 L208 760 L212 670 Q205 560 202 430 Q198 430 195 430 Q192 560 188 670 L192 760 L168 760 L164 670 Q155 560 148 460 Z" fill="url(#maleGrad)" />
  </g>
  <path d="M180 200 L220 200 M175 250 L225 250 M185 320 L215 320" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" stroke-dasharray="3,3" />
  <circle cx="200" cy="200" r="3" fill="#ffffff" />
</svg>`;

const femaleMannequin = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
  <defs>
    <linearGradient id="femGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff00a0" />
      <stop offset="50%" stop-color="#e0008b" />
      <stop offset="100%" stop-color="#990060" />
    </linearGradient>
    <filter id="neonFemGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <g filter="url(#neonFemGlow)">
    <ellipse cx="200" cy="85" rx="32" ry="42" fill="url(#femGrad)" />
    <path d="M165 75 Q200 45 235 75 Q240 120 230 135 L170 135 Q160 120 165 75 Z" fill="url(#femGrad)" opacity="0.95" />
    <path d="M190 125 L210 125 L212 150 L188 150 Z" fill="url(#femGrad)" />
    <path d="M148 155 Q200 148 252 155 Q246 220 238 245 Q226 270 232 290 Q240 330 242 365 L158 365 Q160 330 168 290 Q174 270 162 245 Q154 220 148 155 Z" fill="url(#femGrad)" />
    <path d="M148 155 Q130 220 125 300 Q120 370 115 425 Q120 432 126 428 Q135 370 140 300 Q148 235 158 180 Z" fill="url(#femGrad)" />
    <path d="M252 155 Q270 220 275 300 Q280 370 285 425 Q280 432 274 428 Q265 370 260 300 Q252 235 242 180 Z" fill="url(#femGrad)" />
    <path d="M158 365 Q152 420 160 480 Q168 570 174 670 L178 760 L195 760 L193 670 Q195 560 198 440 L202 440 Q205 560 207 670 L205 760 L222 760 L226 670 Q232 570 240 480 Q248 420 242 365 Z" fill="url(#femGrad)" />
  </g>
  <path d="M185 200 L215 200 M180 280 L220 280 M182 350 L218 350" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" stroke-dasharray="3,3" />
  <circle cx="200" cy="280" r="3" fill="#ffffff" />
</svg>`;

writeBoth('assets/images/model_male_slim', maleMannequin);
writeBoth('assets/images/model_female_slim', femaleMannequin);

// 2. Backgrounds
const bgCungDinh = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <radialGradient id="throneGlow" cx="50%" cy="60%" r="50%">
      <stop offset="0%" stop-color="#ffd700" stop-opacity="0.35" />
      <stop offset="40%" stop-color="#ff007f" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#0a0510" stop-opacity="1" />
    </radialGradient>
    <linearGradient id="pillarGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#593b00" />
      <stop offset="40%" stop-color="#ffd700" />
      <stop offset="70%" stop-color="#b8860b" />
      <stop offset="100%" stop-color="#382400" />
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="#08030c" />
  <rect width="1200" height="800" fill="url(#throneGlow)" />
  <path d="M0 0 L600 240 L1200 0 Z" fill="#140718" stroke="#ffd700" stroke-width="1" opacity="0.8" />
  <line x1="150" y1="0" x2="600" y2="240" stroke="#ff007f" stroke-width="2" opacity="0.6" />
  <line x1="300" y1="0" x2="600" y2="240" stroke="#ffd700" stroke-width="1.5" opacity="0.6" />
  <line x1="900" y1="0" x2="600" y2="240" stroke="#ffd700" stroke-width="1.5" opacity="0.6" />
  <line x1="1050" y1="0" x2="600" y2="240" stroke="#ff007f" stroke-width="2" opacity="0.6" />
  <path d="M420 600 L420 320 Q600 250 780 320 L780 600 Z" fill="#15081b" stroke="#ffd700" stroke-width="4" />
  <rect x="440" y="340" width="320" height="260" fill="none" stroke="#ff007f" stroke-width="2" stroke-dasharray="6,4" />
  <rect x="60" y="40" width="110" height="760" fill="url(#pillarGold)" rx="10" />
  <rect x="230" y="120" width="90" height="680" fill="url(#pillarGold)" rx="8" opacity="0.9" />
  <rect x="880" y="120" width="90" height="680" fill="url(#pillarGold)" rx="8" opacity="0.9" />
  <rect x="1030" y="40" width="110" height="760" fill="url(#pillarGold)" rx="10" />
  <g>
    <line x1="275" y1="0" x2="275" y2="200" stroke="#ff007f" stroke-width="2" />
    <rect x="245" y="200" width="60" height="90" rx="8" fill="#ff007f" opacity="0.85" />
    <line x1="925" y1="0" x2="925" y2="200" stroke="#ff007f" stroke-width="2" />
    <rect x="895" y="200" width="60" height="90" rx="8" fill="#ff007f" opacity="0.85" />
  </g>
  <rect x="0" y="620" width="1200" height="180" fill="#0b0410" opacity="0.9" />
  <ellipse cx="600" cy="720" rx="420" ry="60" fill="#ffd700" opacity="0.08" />
  <text x="600" y="780" fill="#ffd700" font-family="'Cinzel', serif, sans-serif" font-size="16" letter-spacing="8" text-anchor="middle" opacity="0.7">ĐIỆN THÁI HÒA · HOÀNG THÀNH HUẾ</text>
</svg>`;

const bgDanGian = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#14281f" />
      <stop offset="50%" stop-color="#1f3d30" />
      <stop offset="100%" stop-color="#3d5a45" />
    </linearGradient>
    <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1c3a2e" />
      <stop offset="100%" stop-color="#0a1a14" />
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#skyGrad)" />
  <g transform="translate(480, 220)">
    <path d="M60 220 L60 80 Q120 40 180 80 L180 220 Z" fill="#2c1a11" stroke="#a3e635" stroke-width="2" />
    <path d="M40 80 Q120 20 200 80 L180 95 Q120 45 60 95 Z" fill="#78350f" />
    <path d="M90 220 L90 140 Q120 120 150 140 L150 220 Z" fill="#0a1510" stroke="#4ade80" stroke-width="1.5" />
  </g>
  <path d="M0 0 Q220 150 180 800 L0 800 Z" fill="#1b120c" />
  <path d="M80 0 Q280 280 140 800" stroke="#4ade80" stroke-width="3" fill="none" opacity="0.8" />
  <path d="M120 0 Q320 320 220 800" stroke="#a3e635" stroke-width="2" fill="none" opacity="0.7" />
  <ellipse cx="140" cy="120" rx="200" ry="140" fill="#132a1d" opacity="0.9" />
  <ellipse cx="260" cy="90" rx="140" ry="100" fill="#1c3827" opacity="0.85" />
  <rect x="0" y="520" width="1200" height="280" fill="url(#waterGrad)" />
  <ellipse cx="750" cy="640" rx="90" ry="25" fill="#166534" opacity="0.7" />
  <ellipse cx="900" cy="690" rx="110" ry="30" fill="#166534" opacity="0.8" />
  <circle cx="880" cy="675" r="10" fill="#f472b6" />
  <path d="M180 800 L500 520 L700 520 L620 800 Z" fill="#292015" />
  <path d="M180 800 L500 520" stroke="#84cc16" stroke-width="3" stroke-dasharray="8,6" />
  <path d="M620 800 L700 520" stroke="#84cc16" stroke-width="3" stroke-dasharray="8,6" />
  <text x="600" y="780" fill="#a3e635" font-family="'Cinzel', serif, sans-serif" font-size="16" letter-spacing="8" text-anchor="middle" opacity="0.75">BẾN NƯỚC SÂN ĐÌNH · KINH BẮC</text>
</svg>`;

const bgGenZ = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <linearGradient id="cyberSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#050714" />
      <stop offset="60%" stop-color="#0b1736" />
      <stop offset="100%" stop-color="#162c64" />
    </linearGradient>
    <linearGradient id="chromePillar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="50%" stop-color="#e2e8f0" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#cyberSky)" />
  <line x1="200" y1="0" x2="200" y2="800" stroke="#00f0ff" stroke-width="1.5" opacity="0.4" />
  <line x1="400" y1="0" x2="400" y2="800" stroke="#00f0ff" stroke-width="1.5" opacity="0.4" />
  <line x1="800" y1="0" x2="800" y2="800" stroke="#00f0ff" stroke-width="1.5" opacity="0.4" />
  <line x1="1000" y1="0" x2="1000" y2="800" stroke="#00f0ff" stroke-width="1.5" opacity="0.4" />
  <polygon points="120,480 120,320 180,320 180,480" fill="#0f1d40" />
  <polygon points="220,520 220,280 270,280 270,520" fill="#132450" />
  <polygon points="840,510 840,290 890,290 890,510" fill="#132450" />
  <polygon points="980,500 1020,310 1060,500" fill="none" stroke="#ff007f" stroke-width="2" opacity="0.6" />
  <rect x="280" y="80" width="40" height="650" fill="url(#chromePillar)" transform="rotate(-6 300 400)" />
  <rect x="330" y="100" width="10" height="610" fill="#ff007f" opacity="0.9" transform="rotate(-6 300 400)" />
  <rect x="880" y="80" width="40" height="650" fill="url(#chromePillar)" transform="rotate(6 900 400)" />
  <rect x="860" y="100" width="10" height="610" fill="#00f0ff" opacity="0.9" transform="rotate(6 900 400)" />
  <rect x="480" y="240" width="240" height="280" rx="12" fill="#0a122a" stroke="#ff007f" stroke-width="2" opacity="0.9" />
  <text x="600" y="370" fill="#00f0ff" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="bold" letter-spacing="4" text-anchor="middle">VIỆT NAM</text>
  <text x="600" y="410" fill="#ff007f" font-family="'JetBrains Mono', monospace" font-size="16" letter-spacing="6" text-anchor="middle">2088 CYBER ATRIUM</text>
  <rect x="0" y="600" width="1200" height="200" fill="#060c1d" opacity="0.95" />
  <line x1="0" y1="600" x2="1200" y2="600" stroke="#00f0ff" stroke-width="3" opacity="0.7" />
  <text x="600" y="780" fill="#00f0ff" font-family="'JetBrains Mono', monospace" font-size="14" letter-spacing="8" text-anchor="middle" opacity="0.8">HANOI CYBER ATRIUM · GEN Z FUSION HUB</text>
</svg>`;

writeBoth('assets/images/bg_cung_dinh', bgCungDinh);
writeBoth('assets/images/bg_dan_gian', bgDanGian);
writeBoth('assets/images/bg_gen_z', bgGenZ);

// 3. Wardrobe Items
const items = {
  ao_tac: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <path d="M184 135 L216 135 L218 152 L182 152 Z" fill="#ffd700" stroke="#b8860b" stroke-width="1" />
    <path d="M142 150 L184 135 L216 135 L258 150 L275 350 L285 580 L115 580 L125 350 Z" fill="#1e3a8a" />
    <path d="M184 135 Q220 180 235 240 L235 580 L215 580 L215 240 Q205 180 184 135 Z" fill="rgba(255,215,0,0.15)" stroke="#ffd700" stroke-width="2" />
    <circle cx="205" cy="155" r="3.5" fill="#ffd700" />
    <circle cx="220" cy="180" r="3.5" fill="#ffd700" />
    <circle cx="228" cy="210" r="3.5" fill="#ffd700" />
    <circle cx="232" cy="245" r="3.5" fill="#ffd700" />
    <circle cx="234" cy="285" r="3.5" fill="#ffd700" />
    <path d="M142 150 Q110 210 85 290 Q70 380 65 480 L115 470 Q125 380 135 280 L145 180 Z" fill="#1e3a8a" stroke="#ffd700" stroke-width="1.5" />
    <rect x="65" y="460" width="50" height="15" fill="#ffd700" />
    <path d="M258 150 Q290 210 315 290 Q330 380 335 480 L285 470 Q275 380 265 280 L255 180 Z" fill="#1e3a8a" stroke="#ffd700" stroke-width="1.5" />
    <rect x="285" y="460" width="50" height="15" fill="#ffd700" />
    <line x1="115" y1="580" x2="285" y2="580" stroke="#ffd700" stroke-width="4" />
  </svg>`,

  ao_nhat_binh: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <path d="M140 152 L185 140 L215 140 L260 152 L275 360 L282 590 L118 590 L125 360 Z" fill="#b91c1c" />
    <path d="M175 140 L225 140 L225 380 L175 380 Z" fill="#ffd700" stroke="#78350f" stroke-width="2" />
    <circle cx="200" cy="220" r="16" fill="#dc2626" stroke="#ffffff" stroke-width="2" />
    <path d="M190 220 Q200 205 210 220 Q200 235 190 220 Z" fill="#ffd700" />
    <line x1="182" y1="140" x2="182" y2="380" stroke="#2563eb" stroke-width="2" />
    <line x1="190" y1="140" x2="190" y2="380" stroke="#16a34a" stroke-width="2" />
    <line x1="210" y1="140" x2="210" y2="380" stroke="#16a34a" stroke-width="2" />
    <line x1="218" y1="140" x2="218" y2="380" stroke="#2563eb" stroke-width="2" />
    <path d="M140 152 Q120 220 100 320 L135 320 Q145 230 155 180 Z" fill="#b91c1c" />
    <g transform="translate(95, 320)">
      <rect x="0" y="0" width="40" height="12" fill="#2563eb" />
      <rect x="0" y="12" width="40" height="12" fill="#facc15" />
      <rect x="0" y="24" width="40" height="12" fill="#ffffff" />
      <rect x="0" y="36" width="40" height="12" fill="#dc2626" />
      <rect x="0" y="48" width="40" height="12" fill="#16a34a" />
    </g>
    <path d="M260 152 Q280 220 300 320 L265 320 Q255 230 245 180 Z" fill="#b91c1c" />
    <g transform="translate(265, 320)">
      <rect x="0" y="0" width="40" height="12" fill="#2563eb" />
      <rect x="0" y="12" width="40" height="12" fill="#facc15" />
      <rect x="0" y="24" width="40" height="12" fill="#ffffff" />
      <rect x="0" y="36" width="40" height="12" fill="#dc2626" />
      <rect x="0" y="48" width="40" height="12" fill="#16a34a" />
    </g>
    <line x1="118" y1="590" x2="282" y2="590" stroke="#ffd700" stroke-width="5" />
  </svg>`,

  ao_giao_linh: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <path d="M140 155 L180 138 L220 138 L260 155 L280 400 L290 620 L110 620 L120 400 Z" fill="#1e3a2b" />
    <path d="M175 138 L240 280 L230 295 L165 145 Z" fill="#991b1b" stroke="#facc15" stroke-width="1.5" />
    <path d="M225 138 L160 280 L170 295 L235 145 Z" fill="#78350f" opacity="0.6" />
    <path d="M140 155 Q105 240 85 360 L125 360 Q140 260 152 180 Z" fill="#1e3a2b" stroke="#16a34a" stroke-width="1" />
    <path d="M260 155 Q295 240 315 360 L275 360 Q260 260 248 180 Z" fill="#1e3a2b" stroke="#16a34a" stroke-width="1" />
    <rect x="145" y="320" width="110" height="18" fill="#b91c1c" rx="4" />
    <path d="M210 338 L215 460 L195 460 L200 338 Z" fill="#b91c1c" />
  </svg>`,

  ao_ngu_than: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <path d="M185 132 L215 132 L216 150 L184 150 Z" fill="#d97706" stroke="#451a03" stroke-width="1" />
    <path d="M142 150 L185 132 L215 132 L258 150 L268 350 L274 560 L126 560 L132 350 Z" fill="#b45309" />
    <path d="M185 132 Q225 180 235 240 L235 560" stroke="#fcd34d" stroke-width="2" fill="none" />
    <circle cx="200" cy="150" r="3" fill="#fcd34d" />
    <circle cx="218" cy="175" r="3" fill="#fcd34d" />
    <circle cx="228" cy="205" r="3" fill="#fcd34d" />
    <circle cx="233" cy="240" r="3" fill="#fcd34d" />
    <circle cx="235" cy="280" r="3" fill="#fcd34d" />
    <path d="M142 150 Q122 220 115 320 Q110 380 106 430 L124 430 Q128 380 134 320 L152 180 Z" fill="#b45309" />
    <path d="M258 150 Q278 220 285 320 Q290 380 294 430 L276 430 Q272 380 266 320 L248 180 Z" fill="#b45309" />
  </svg>`,

  ao_yem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <path d="M188 126 L175 160 M212 126 L225 160" stroke="#fda4af" stroke-width="2" />
    <path d="M200 160 L245 220 L200 360 L155 220 Z" fill="#f43f5e" stroke="#ffffff" stroke-width="1.5" />
    <circle cx="200" cy="240" r="12" fill="none" stroke="#fecdd3" stroke-width="2" />
    <path d="M195 240 Q200 230 205 240 Q200 250 195 240 Z" fill="#ffe4e6" />
    <line x1="155" y1="220" x2="135" y2="240" stroke="#fda4af" stroke-width="2" />
    <line x1="245" y1="220" x2="265" y2="240" stroke="#fda4af" stroke-width="2" />
  </svg>`,

  ao_hoodie_cyber: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <path d="M165 125 Q200 110 235 125 Q245 160 200 170 Q155 160 165 125 Z" fill="#27272a" stroke="#00f0ff" stroke-width="1" />
    <path d="M130 155 L165 135 L235 135 L270 155 L268 385 L132 385 Z" fill="#18181b" stroke="#3f3f46" stroke-width="1.5" />
    <path d="M155 290 L245 290 L235 365 L165 365 Z" fill="#27272a" stroke="#00f0ff" stroke-width="1" />
    <path d="M200 210 L185 245 L200 240 L215 245 Z" fill="#00f0ff" />
    <line x1="175" y1="250" x2="225" y2="250" stroke="#ff007f" stroke-width="2" />
    <path d="M130 155 Q100 230 95 340 L125 340 Q130 250 145 180 Z" fill="#18181b" />
    <path d="M270 155 Q300 230 305 340 L275 340 Q270 250 255 180 Z" fill="#18181b" />
  </svg>`,

  ao_croptop_gam: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <path d="M152 155 L186 142 L214 142 L248 155 L242 270 L158 270 Z" fill="#ffd700" stroke="#fef08a" stroke-width="1.5" />
    <path d="M170 180 L230 180 M175 220 L225 220" stroke="#ffffff" stroke-width="1" stroke-dasharray="4,3" />
    <path d="M152 155 L135 190 L158 200 Z" fill="#ffd700" />
    <path d="M248 155 L265 190 L242 200 Z" fill="#ffd700" />
  </svg>`,

  ao_bomber_dongson: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <path d="M132 152 L175 140 L225 140 L268 152 L262 380 L138 380 Z" fill="#1e293b" stroke="#00f0ff" stroke-width="1.5" />
    <rect x="175" y="135" width="50" height="12" fill="#0f172a" rx="4" />
    <rect x="138" y="370" width="124" height="16" fill="#0f172a" rx="4" />
    <circle cx="200" cy="250" r="32" fill="none" stroke="#f59e0b" stroke-width="2" />
    <polygon points="200,238 204,248 214,250 206,256 208,266 200,260 192,266 194,256 186,250 196,248" fill="#f59e0b" />
    <path d="M132 152 Q105 240 100 350 L128 350 Q135 250 148 180 Z" fill="#334155" />
    <path d="M268 152 Q295 240 300 350 L272 350 Q265 250 252 180 Z" fill="#334155" />
  </svg>`,

  quan_lua_bach: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <path d="M152 360 L248 360 L260 520 L270 760 L208 760 L202 460 L198 460 L192 760 L130 760 L140 520 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
    <line x1="165" y1="380" x2="160" y2="750" stroke="#cbd5e1" stroke-width="1" />
    <line x1="235" y1="380" x2="240" y2="750" stroke="#cbd5e1" stroke-width="1" />
  </svg>`,

  quan_jeans_rach: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <path d="M155 365 L245 365 L252 500 L245 750 L212 750 L204 460 L196 460 L188 750 L155 750 L148 500 Z" fill="#1d4ed8" stroke="#60a5fa" stroke-width="1.5" />
    <rect x="165" y="560" width="22" height="6" fill="#f8fafc" rx="2" />
    <rect x="215" y="530" width="24" height="7" fill="#f8fafc" rx="2" />
    <line x1="155" y1="375" x2="245" y2="375" stroke="#f97316" stroke-width="1.5" />
  </svg>`,

  quan_cargo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <path d="M152 360 L248 360 L260 520 L250 755 L212 755 L204 460 L196 460 L188 755 L150 755 L140 520 Z" fill="#09090b" stroke="#27272a" stroke-width="2" />
    <rect x="135" y="480" width="28" height="40" fill="#18181b" stroke="#00f0ff" stroke-width="1" rx="3" />
    <line x1="135" y1="500" x2="163" y2="500" stroke="#ff007f" stroke-width="2" />
    <rect x="237" y="480" width="28" height="40" fill="#18181b" stroke="#00f0ff" stroke-width="1" rx="3" />
    <line x1="237" y1="500" x2="265" y2="500" stroke="#ff007f" stroke-width="2" />
    <circle cx="149" cy="500" r="3" fill="#ffffff" />
    <circle cx="251" cy="500" r="3" fill="#ffffff" />
  </svg>`,

  vay_dup_to_tam: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <path d="M156 360 L244 360 L270 540 L285 710 L115 710 L130 540 Z" fill="#171717" stroke="#262626" stroke-width="1.5" />
    <rect x="150" y="355" width="100" height="12" fill="#16a34a" rx="2" />
    <path d="M185 365 L180 460 L192 460 L195 365 Z" fill="#22c55e" />
  </svg>`,

  chan_vay_xoe_xep_ly: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <path d="M158 355 L242 355 L275 520 L125 520 Z" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" />
    <g stroke="#38bdf8" stroke-width="1">
      <line x1="170" y1="355" x2="150" y2="520" />
      <line x1="185" y1="355" x2="175" y2="520" />
      <line x1="200" y1="355" x2="200" y2="520" />
      <line x1="215" y1="355" x2="225" y2="520" />
    </g>
  </svg>`,

  quan_tay_linh_nam: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <path d="M154 360 L246 360 L252 520 L246 760 L212 760 L204 460 L196 460 L188 760 L154 760 L148 520 Z" fill="#1f2937" stroke="#374151" stroke-width="1.5" />
    <line x1="175" y1="370" x2="172" y2="750" stroke="#4b5563" stroke-width="1" />
    <line x1="225" y1="370" x2="228" y2="750" stroke="#4b5563" stroke-width="1" />
  </svg>`,

  non_la_dat_vang: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <polygon points="200,10 295,95 105,95" fill="#fef08a" stroke="#ca8a04" stroke-width="2" />
    <line x1="105" y1="95" x2="295" y2="95" stroke="#facc15" stroke-width="4" />
    <path d="M125 75 Q200 65 275 75" fill="none" stroke="#eab308" stroke-width="1.5" />
    <path d="M150 50 Q200 42 250 50" fill="none" stroke="#eab308" stroke-width="1.5" />
  </svg>`,

  non_quai_thao: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <ellipse cx="200" cy="55" rx="115" ry="32" fill="#fef9c3" stroke="#854d0e" stroke-width="2.5" />
    <ellipse cx="200" cy="52" rx="42" ry="12" fill="#ca8a04" opacity="0.4" />
    <path d="M120 65 Q115 150 125 240 Q130 320 120 400" stroke="#e11d48" stroke-width="4" fill="none" />
    <path d="M280 65 Q285 150 275 240 Q270 320 280 400" stroke="#e11d48" stroke-width="4" fill="none" />
  </svg>`,

  khan_dong_ngu_than: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <ellipse cx="200" cy="65" rx="48" ry="24" fill="#09090b" stroke="#ffd700" stroke-width="2" />
    <path d="M175 62 L200 78 L225 62" stroke="#ffd700" stroke-width="2.5" fill="none" />
  </svg>`,

  kinh_cyberpunk_neon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <polygon points="160,82 240,82 235,102 165,102" fill="rgba(0,240,255,0.7)" stroke="#ff007f" stroke-width="2" />
    <line x1="168" y1="92" x2="232" y2="92" stroke="#ffffff" stroke-width="1" stroke-dasharray="3,2" />
  </svg>`,

  day_chuyen_xich_bac: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <path d="M165 150 Q200 210 235 150" fill="none" stroke="#e2e8f0" stroke-width="5" stroke-dasharray="6,3" />
    <circle cx="200" cy="195" r="9" fill="#94a3b8" stroke="#f8fafc" stroke-width="2" />
  </svg>`,

  quat_tram_huong: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <g transform="translate(100, 360) rotate(-25)">
      <path d="M40 80 L0 0 Q40 -20 80 0 Z" fill="#78350f" stroke="#ffd700" stroke-width="1.5" />
      <line x1="40" y1="80" x2="40" y2="0" stroke="#fcd34d" stroke-width="1" />
      <circle cx="40" cy="80" r="4" fill="#dc2626" />
    </g>
  </svg>`,

  sneaker_chunky_ham_ho: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <path d="M160 755 L195 755 L198 785 L145 785 Q145 770 160 755 Z" fill="#09090b" stroke="#00f0ff" stroke-width="2" />
    <rect x="145" y="780" width="53" height="8" fill="#00f0ff" />
    <path d="M205 755 L240 755 Q255 770 255 785 L202 785 Z" fill="#09090b" stroke="#00f0ff" stroke-width="2" />
    <rect x="202" y="780" width="53" height="8" fill="#00f0ff" />
  </svg>`,

  guoc_moc_quai_da: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <path d="M165 758 L194 758 L194 772 L165 772 Z" fill="#b45309" stroke="#78350f" stroke-width="1" />
    <path d="M170 758 Q180 750 190 758" stroke="#dc2626" stroke-width="3" fill="none" />
    <path d="M206 758 L235 758 L235 772 L206 772 Z" fill="#b45309" stroke="#78350f" stroke-width="1" />
    <path d="M210 758 Q220 750 230 758" stroke="#dc2626" stroke-width="3" fill="none" />
  </svg>`,

  combat_boots_da_den: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <path d="M160 670 L195 670 L198 780 L148 780 L155 740 Z" fill="#18181b" stroke="#52525b" stroke-width="2" />
    <path d="M205 670 L240 670 L245 740 L252 780 L202 780 Z" fill="#18181b" stroke="#52525b" stroke-width="2" />
    <rect x="145" y="776" width="55" height="10" fill="#09090b" stroke="#71717a" stroke-width="1" />
    <rect x="200" y="776" width="55" height="10" fill="#09090b" stroke="#71717a" stroke-width="1" />
  </svg>`,

  hai_theu_phuong_hoang: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <path d="M165 756 L195 756 L195 772 L160 772 Q156 765 165 756 Z" fill="#831843" stroke="#ffd700" stroke-width="1.5" />
    <path d="M205 756 L235 756 Q244 765 240 772 L205 772 Z" fill="#831843" stroke="#ffd700" stroke-width="1.5" />
    <circle cx="160" cy="762" r="2.5" fill="#ffd700" />
    <circle cx="240" cy="762" r="2.5" fill="#ffd700" />
  </svg>`
};

Object.entries(items).forEach(([id, svg]) => {
  writeBoth(`assets/images/items/${id}`, svg);
});

// 4. Real Renders
const realRenders = {
  real_render_nhatbinh_sneaker: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 850" width="500" height="850">
    <g>
      <ellipse cx="250" cy="95" rx="36" ry="46" fill="#fbcfe8" />
      <path d="M210 90 Q250 40 290 90 Q295 140 280 150 L220 150 Z" fill="#18181b" />
      <circle cx="285" cy="85" r="5" fill="#ffd700" />
      <path d="M175 160 L230 145 L270 145 L325 160 L345 420 L355 640 L145 640 L155 420 Z" fill="#dc2626" stroke="#991b1b" stroke-width="2" />
      <rect x="220" y="145" width="60" height="240" fill="#ffd700" stroke="#92400e" stroke-width="2" />
      <line x1="230" y1="145" x2="230" y2="385" stroke="#2563eb" stroke-width="3" />
      <line x1="240" y1="145" x2="240" y2="385" stroke="#16a34a" stroke-width="3" />
      <line x1="260" y1="145" x2="260" y2="385" stroke="#16a34a" stroke-width="3" />
      <line x1="270" y1="145" x2="270" y2="385" stroke="#2563eb" stroke-width="3" />
      <g transform="translate(130, 360)">
        <rect x="0" y="0" width="45" height="10" fill="#2563eb" />
        <rect x="0" y="10" width="45" height="10" fill="#facc15" />
        <rect x="0" y="20" width="45" height="10" fill="#ffffff" />
        <rect x="0" y="30" width="45" height="10" fill="#dc2626" />
        <rect x="0" y="40" width="45" height="10" fill="#16a34a" />
      </g>
      <g transform="translate(325, 360)">
        <rect x="0" y="0" width="45" height="10" fill="#2563eb" />
        <rect x="0" y="10" width="45" height="10" fill="#facc15" />
        <rect x="0" y="20" width="45" height="10" fill="#ffffff" />
        <rect x="0" y="30" width="45" height="10" fill="#dc2626" />
        <rect x="0" y="40" width="45" height="10" fill="#16a34a" />
      </g>
      <path d="M195 640 L305 640 L315 760 L260 760 L250 670 L240 760 L185 760 Z" fill="#f8fafc" opacity="0.9" />
      <path d="M175 760 L220 760 L225 795 L160 795 Z" fill="#09090b" stroke="#00f0ff" stroke-width="3" />
      <rect x="160" y="790" width="65" height="10" fill="#00f0ff" />
      <path d="M280 760 L325 760 L340 795 L275 795 Z" fill="#09090b" stroke="#00f0ff" stroke-width="3" />
      <rect x="275" y="790" width="65" height="10" fill="#00f0ff" />
    </g>
  </svg>`,

  real_render_aotac_cargo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 850" width="500" height="850">
    <g>
      <ellipse cx="250" cy="95" rx="36" ry="46" fill="#fcd34d" opacity="0.9" />
      <path d="M214 85 Q250 45 286 85 L280 135 L220 135 Z" fill="#18181b" />
      <path d="M180 160 L230 142 L270 142 L320 160 L335 340 L345 560 L155 560 L165 340 Z" fill="#1e3a8a" stroke="#ffd700" stroke-width="2" />
      <path d="M180 160 Q120 250 90 420 L160 410 Q175 280 190 200 Z" fill="#1e3a8a" stroke="#ffd700" stroke-width="2" />
      <path d="M320 160 Q380 250 410 420 L340 410 Q325 280 310 200 Z" fill="#1e3a8a" stroke="#ffd700" stroke-width="2" />
      <circle cx="255" cy="165" r="4" fill="#ffd700" />
      <circle cx="270" cy="195" r="4" fill="#ffd700" />
      <path d="M190 560 L310 560 L325 765 L268 765 L252 640 L236 765 L175 765 Z" fill="#09090b" stroke="#3b82f6" stroke-width="1.5" />
      <rect x="160" y="620" width="30" height="45" fill="#18181b" stroke="#00f0ff" stroke-width="1.5" rx="3" />
      <line x1="160" y1="642" x2="190" y2="642" stroke="#ff007f" stroke-width="2" />
      <rect x="310" y="620" width="30" height="45" fill="#18181b" stroke="#00f0ff" stroke-width="1.5" rx="3" />
      <line x1="310" y1="642" x2="340" y2="642" stroke="#ff007f" stroke-width="2" />
      <rect x="170" y="760" width="45" height="35" fill="#18181b" stroke="#ffffff" stroke-width="1" rx="4" />
      <rect x="285" y="760" width="45" height="35" fill="#18181b" stroke="#ffffff" stroke-width="1" rx="4" />
    </g>
  </svg>`,

  real_render_aotac_jeans: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 850" width="500" height="850">
    <g>
      <ellipse cx="250" cy="95" rx="36" ry="46" fill="#fde047" opacity="0.85" />
      <path d="M214 85 Q250 50 286 85 L280 135 L220 135 Z" fill="#171717" />
      <path d="M180 160 L230 142 L270 142 L320 160 L335 340 L345 560 L155 560 L165 340 Z" fill="#581c87" stroke="#fbbf24" stroke-width="2" />
      <path d="M180 160 Q120 250 90 420 L160 410 Q175 280 190 200 Z" fill="#581c87" stroke="#fbbf24" stroke-width="1.5" />
      <path d="M320 160 Q380 250 410 420 L340 410 Q325 280 310 200 Z" fill="#581c87" stroke="#fbbf24" stroke-width="1.5" />
      <path d="M195 560 L305 560 L315 765 L265 765 L252 640 L239 765 L185 765 Z" fill="#2563eb" stroke="#60a5fa" stroke-width="2" />
      <rect x="200" y="660" width="24" height="8" fill="#f8fafc" rx="2" />
      <rect x="275" y="630" width="28" height="8" fill="#f8fafc" rx="2" />
      <path d="M180 765 L225 765 L225 795 L175 795 Z" fill="#09090b" stroke="#ffffff" stroke-width="2" />
      <path d="M275 765 L320 765 L325 795 L270 795 Z" fill="#09090b" stroke="#ffffff" stroke-width="2" />
    </g>
  </svg>`,

  real_render_giaolinh_boots: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 850" width="500" height="850">
    <g>
      <ellipse cx="250" cy="95" rx="36" ry="46" fill="#fbcfe8" />
      <path d="M214 85 Q250 45 286 85 L280 135 L220 135 Z" fill="#09090b" />
      <path d="M175 160 L230 142 L270 142 L325 160 L345 420 L355 640 L145 640 L155 420 Z" fill="#14532d" stroke="#86efac" stroke-width="1.5" />
      <path d="M225 142 L290 280 L275 295 L210 150 Z" fill="#991b1b" stroke="#facc15" stroke-width="2" />
      <path d="M275 142 L210 280 L225 295 L290 150 Z" fill="#166534" opacity="0.6" />
      <rect x="185" y="320" width="130" height="20" fill="#dc2626" rx="4" />
      <path d="M190 640 L235 640 L240 790 L180 790 Z" fill="#18181b" stroke="#71717a" stroke-width="2" />
      <path d="M265 640 L310 640 L320 790 L260 790 Z" fill="#18181b" stroke="#71717a" stroke-width="2" />
    </g>
  </svg>`,

  real_render_aoyem_jeans: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 850" width="500" height="850">
    <g>
      <ellipse cx="250" cy="95" rx="34" ry="44" fill="#fecdd3" />
      <path d="M215 85 Q250 45 285 85 L280 135 L220 135 Z" fill="#18181b" />
      <path d="M280 90 Q340 70 330 180" stroke="#18181b" stroke-width="12" fill="none" />
      <path d="M235 130 L220 160 M265 130 L280 160" stroke="#f43f5e" stroke-width="3" />
      <path d="M250 160 L305 230 L250 380 L195 230 Z" fill="#e11d48" stroke="#ffe4e6" stroke-width="2" />
      <circle cx="250" cy="250" r="16" fill="none" stroke="#fecdd3" stroke-width="2" />
      <path d="M195 380 L305 380 L325 580 L335 770 L275 770 L252 500 L229 770 L165 770 L175 580 Z" fill="#1d4ed8" stroke="#60a5fa" stroke-width="2" />
      <line x1="195" y1="395" x2="305" y2="395" stroke="#f97316" stroke-width="2" />
      <path d="M175 770 L210 770 L205 795 L170 795 Z" fill="#09090b" />
      <path d="M290 770 L325 770 L330 795 L295 795 Z" fill="#09090b" />
    </g>
  </svg>`,

  real_render_nguthan_cyberpunk: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 850" width="500" height="850">
    <g>
      <ellipse cx="250" cy="95" rx="36" ry="46" fill="#fde047" opacity="0.85" />
      <ellipse cx="250" cy="72" rx="46" ry="24" fill="#09090b" stroke="#ffd700" stroke-width="2" />
      <polygon points="215,92 285,92 280,112 220,112" fill="#00f0ff" stroke="#ff007f" stroke-width="2" />
      <path d="M180 160 L230 142 L270 142 L320 160 L330 360 L340 580 L160 580 L170 360 Z" fill="#d97706" stroke="#fbbf24" stroke-width="2" />
      <circle cx="250" cy="160" r="4" fill="#ffd700" />
      <circle cx="270" cy="190" r="4" fill="#ffd700" />
      <path d="M190 580 L310 580 L320 770 L268 770 L252 640 L236 770 L180 770 Z" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.5" />
      <path d="M180 770 L225 770 L225 795 L175 795 Z" fill="#09090b" stroke="#ffd700" stroke-width="1.5" />
      <path d="M275 770 L320 770 L325 795 L270 795 Z" fill="#09090b" stroke="#ffd700" stroke-width="1.5" />
    </g>
  </svg>`,

  real_render_nhatbinh: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 850" width="500" height="850">
    <g>
      <ellipse cx="250" cy="95" rx="36" ry="46" fill="#fbcfe8" />
      <ellipse cx="250" cy="70" rx="48" ry="24" fill="#ffd700" stroke="#b45309" stroke-width="2" />
      <path d="M175 160 L230 145 L270 145 L325 160 L345 420 L355 640 L145 640 L155 420 Z" fill="#b91c1c" stroke="#facc15" stroke-width="2" />
      <rect x="220" y="145" width="60" height="240" fill="#ffd700" stroke="#78350f" stroke-width="2" />
      <g transform="translate(130, 360)">
        <rect x="0" y="0" width="45" height="10" fill="#2563eb" />
        <rect x="0" y="10" width="45" height="10" fill="#facc15" />
        <rect x="0" y="20" width="45" height="10" fill="#ffffff" />
        <rect x="0" y="30" width="45" height="10" fill="#dc2626" />
        <rect x="0" y="40" width="45" height="10" fill="#16a34a" />
      </g>
      <g transform="translate(325, 360)">
        <rect x="0" y="0" width="45" height="10" fill="#2563eb" />
        <rect x="0" y="10" width="45" height="10" fill="#facc15" />
        <rect x="0" y="20" width="45" height="10" fill="#ffffff" />
        <rect x="0" y="30" width="45" height="10" fill="#dc2626" />
        <rect x="0" y="40" width="45" height="10" fill="#16a34a" />
      </g>
      <path d="M195 640 L305 640 L315 765 L260 765 L250 670 L240 765 L185 765 Z" fill="#f8fafc" />
      <path d="M185 765 L225 765 L220 788 L175 788 Q170 775 185 765 Z" fill="#9d174d" stroke="#ffd700" stroke-width="1.5" />
      <path d="M275 765 L315 765 Q330 775 325 788 L280 788 Z" fill="#9d174d" stroke="#ffd700" stroke-width="1.5" />
    </g>
  </svg>`
};

Object.entries(realRenders).forEach(([name, svg]) => {
  writeBoth(`assets/images/real_renders/${name}`, svg);
});

console.log('[Assets] Hoàn tất tạo toàn bộ assets SVG và PNG!');
