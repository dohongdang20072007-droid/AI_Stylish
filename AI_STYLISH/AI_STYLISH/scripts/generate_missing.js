import fs from 'fs';
import sharp from 'sharp';

const missingOrSvgItems = {
  non_quai_thao: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <defs>
      <radialGradient id="nqtGrad" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="65%" stop-color="#ca8a04" />
        <stop offset="100%" stop-color="#713f12" />
      </radialGradient>
    </defs>
    <ellipse cx="200" cy="58" rx="118" ry="34" fill="url(#nqtGrad)" stroke="#fde047" stroke-width="2.5" />
    <ellipse cx="200" cy="54" rx="46" ry="14" fill="#78350f" stroke="#facc15" stroke-width="1.5" />
    <path d="M120 68 Q112 150 126 240 Q132 320 122 395" stroke="#e11d48" stroke-width="5" fill="none" stroke-linecap="round" />
    <path d="M280 68 Q288 150 274 240 Q268 320 278 395" stroke="#e11d48" stroke-width="5" fill="none" stroke-linecap="round" />
    <circle cx="122" cy="395" r="5" fill="#fbbf24" />
    <circle cx="278" cy="395" r="5" fill="#fbbf24" />
  </svg>`,

  quan_cargo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <defs>
      <linearGradient id="cargoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#27272a" />
        <stop offset="50%" stop-color="#18181b" />
        <stop offset="100%" stop-color="#09090b" />
      </linearGradient>
    </defs>
    <path d="M150 360 L250 360 L264 520 L252 755 L210 755 L203 465 L197 465 L190 755 L148 755 L136 520 Z" fill="url(#cargoGrad)" stroke="#52525b" stroke-width="2" />
    <rect x="150" y="360" width="100" height="16" fill="#09090b" stroke="#00f0ff" stroke-width="1" />
    <rect x="132" y="475" width="32" height="48" fill="#27272a" stroke="#00f0ff" stroke-width="1.5" rx="4" />
    <line x1="132" y1="496" x2="164" y2="496" stroke="#ff007f" stroke-width="2.5" />
    <rect x="236" y="475" width="32" height="48" fill="#27272a" stroke="#00f0ff" stroke-width="1.5" rx="4" />
    <line x1="236" y1="496" x2="268" y2="496" stroke="#ff007f" stroke-width="2.5" />
    <path d="M145 523 Q130 570 148 615" stroke="#00f0ff" stroke-width="2" fill="none" />
    <path d="M255 523 Q270 570 252 615" stroke="#00f0ff" stroke-width="2" fill="none" />
    <circle cx="148" cy="496" r="3.5" fill="#ffffff" />
    <circle cx="252" cy="496" r="3.5" fill="#ffffff" />
  </svg>`,

  quan_lua_bach: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <defs>
      <linearGradient id="silkWhite" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="60%" stop-color="#f1f5f9" />
        <stop offset="100%" stop-color="#cbd5e1" />
      </linearGradient>
    </defs>
    <path d="M152 360 L248 360 L264 525 L274 760 L206 760 L201 460 L199 460 L194 760 L126 760 L136 525 Z" fill="url(#silkWhite)" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="168" y1="380" x2="158" y2="750" stroke="#cbd5e1" stroke-width="1.5" />
    <line x1="232" y1="380" x2="242" y2="750" stroke="#cbd5e1" stroke-width="1.5" />
  </svg>`,

  quan_jeans_rach: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <defs>
      <linearGradient id="denimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2563eb" />
        <stop offset="50%" stop-color="#1d4ed8" />
        <stop offset="100%" stop-color="#1e3a8a" />
      </linearGradient>
    </defs>
    <path d="M154 362 L246 362 L254 500 L246 752 L210 752 L203 460 L197 460 L190 752 L154 752 L146 500 Z" fill="url(#denimGrad)" stroke="#60a5fa" stroke-width="1.8" />
    <rect x="162" y="555" width="26" height="8" fill="#f8fafc" rx="3" />
    <rect x="165" y="570" width="20" height="5" fill="#bfdbfe" rx="2" />
    <rect x="212" y="525" width="26" height="8" fill="#f8fafc" rx="3" />
    <rect x="215" y="540" width="20" height="5" fill="#bfdbfe" rx="2" />
    <line x1="154" y1="375" x2="246" y2="375" stroke="#f59e0b" stroke-width="2" />
  </svg>`,

  vay_dup_to_tam: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <defs>
      <linearGradient id="dupGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#27272a" />
        <stop offset="100%" stop-color="#09090b" />
      </linearGradient>
    </defs>
    <path d="M155 360 L245 360 L274 540 L288 715 L112 715 L126 540 Z" fill="url(#dupGrad)" stroke="#52525b" stroke-width="1.8" />
    <rect x="150" y="354" width="100" height="14" fill="#16a34a" stroke="#4ade80" stroke-width="1" rx="3" />
    <path d="M185 366 L178 470 L192 470 L196 366 Z" fill="#22c55e" />
    <line x1="170" y1="380" x2="145" y2="705" stroke="#3f3f46" stroke-width="1.5" />
    <line x1="200" y1="380" x2="200" y2="705" stroke="#3f3f46" stroke-width="1.5" />
    <line x1="230" y1="380" x2="255" y2="705" stroke="#3f3f46" stroke-width="1.5" />
  </svg>`,

  quan_tay_linh_nam: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <defs>
      <linearGradient id="woolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#374151" />
        <stop offset="100%" stop-color="#111827" />
      </linearGradient>
    </defs>
    <path d="M154 360 L246 360 L252 520 L246 760 L210 760 L203 460 L197 460 L190 760 L154 760 L148 520 Z" fill="url(#woolGrad)" stroke="#6b7280" stroke-width="1.8" />
    <rect x="154" y="360" width="92" height="12" fill="#1f2937" stroke="#9ca3af" stroke-width="1" />
    <line x1="174" y1="374" x2="171" y2="752" stroke="#9ca3af" stroke-width="1.2" opacity="0.6" />
    <line x1="226" y1="374" x2="229" y2="752" stroke="#9ca3af" stroke-width="1.2" opacity="0.6" />
  </svg>`,

  quat_tram_huong: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <g transform="translate(92, 345) rotate(-22)">
      <path d="M55 95 L0 10 Q55 -25 110 10 Z" fill="#92400e" stroke="#ffd700" stroke-width="2.5" />
      <path d="M55 95 L18 4 M55 95 L36 0 M55 95 L55 -4 M55 95 L74 0 M55 95 L92 4" stroke="#fde047" stroke-width="1.4" />
      <circle cx="55" cy="95" r="5" fill="#dc2626" stroke="#ffd700" stroke-width="1.5" />
      <path d="M55 100 Q50 130 62 148" stroke="#ef4444" stroke-width="3" fill="none" />
    </g>
  </svg>`,

  sneaker_chunky_ham_ho: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
    <g>
      <path d="M156 748 L195 748 L200 784 L142 784 Q140 764 156 748 Z" fill="#18181b" stroke="#00f0ff" stroke-width="2.2" />
      <rect x="140" y="778" width="62" height="10" rx="4" fill="#00f0ff" />
      <line x1="154" y1="764" x2="188" y2="764" stroke="#ff007f" stroke-width="2.5" />
      <path d="M205 748 L244 748 Q260 764 258 784 L200 784 Z" fill="#18181b" stroke="#00f0ff" stroke-width="2.2" />
      <rect x="198" y="778" width="62" height="10" rx="4" fill="#00f0ff" />
      <line x1="212" y1="764" x2="246" y2="764" stroke="#ff007f" stroke-width="2.5" />
    </g>
  </svg>`
};

const realRenders = {
  real_render_nhatbinh_sneaker: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 850" width="500" height="850">
    <defs>
      <linearGradient id="skinFem" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffe4e6" />
        <stop offset="100%" stop-color="#fecdd3" />
      </linearGradient>
      <linearGradient id="nbRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#dc2626" />
        <stop offset="100%" stop-color="#7f1d1d" />
      </linearGradient>
    </defs>
    <g>
      <!-- Hair & Royal Headpiece -->
      <ellipse cx="250" cy="68" rx="54" ry="26" fill="#ffd700" stroke="#b45309" stroke-width="2.5" />
      <path d="M202 88 Q250 38 298 88 Q305 145 285 162 L215 162 Q195 145 202 88 Z" fill="#09090b" />
      <!-- Neck & Face -->
      <rect x="236" y="125" width="28" height="32" fill="url(#skinFem)" />
      <ellipse cx="250" cy="96" rx="35" ry="44" fill="url(#skinFem)" />
      <!-- Facial Features -->
      <path d="M230 88 Q237 84 243 88" stroke="#18181b" stroke-width="2" fill="none" />
      <path d="M257 88 Q263 84 270 88" stroke="#18181b" stroke-width="2" fill="none" />
      <circle cx="237" cy="94" r="3" fill="#18181b" />
      <circle cx="263" cy="94" r="3" fill="#18181b" />
      <path d="M244 116 Q250 121 256 116" stroke="#e11d48" stroke-width="2.5" fill="none" />
      <!-- Nhat Binh Robe -->
      <path d="M172 158 L228 144 L272 144 L328 158 L348 420 L358 645 L142 645 L152 420 Z" fill="url(#nbRed)" stroke="#facc15" stroke-width="2.5" />
      <rect x="218" y="144" width="64" height="242" fill="#ffd700" stroke="#92400e" stroke-width="2" />
      <circle cx="250" cy="235" r="18" fill="#dc2626" stroke="#ffffff" stroke-width="2" />
      <g transform="translate(128, 360)">
        <rect x="0" y="0" width="46" height="11" fill="#2563eb" />
        <rect x="0" y="11" width="46" height="11" fill="#facc15" />
        <rect x="0" y="22" width="46" height="11" fill="#ffffff" />
        <rect x="0" y="33" width="46" height="11" fill="#dc2626" />
        <rect x="0" y="44" width="46" height="11" fill="#16a34a" />
      </g>
      <g transform="translate(326, 360)">
        <rect x="0" y="0" width="46" height="11" fill="#2563eb" />
        <rect x="0" y="11" width="46" height="11" fill="#facc15" />
        <rect x="0" y="22" width="46" height="11" fill="#ffffff" />
        <rect x="0" y="33" width="46" height="11" fill="#dc2626" />
        <rect x="0" y="44" width="46" height="11" fill="#16a34a" />
      </g>
      <!-- Silk Trousers -->
      <path d="M192 645 L308 645 L318 762 L260 762 L250 672 L240 762 L182 762 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
      <!-- Chunky Sneakers -->
      <path d="M172 762 L222 762 L226 798 L158 798 Z" fill="#09090b" stroke="#00f0ff" stroke-width="3" />
      <rect x="158" y="792" width="68" height="10" rx="3" fill="#00f0ff" />
      <path d="M278 762 L328 762 L342 798 L274 798 Z" fill="#09090b" stroke="#00f0ff" stroke-width="3" />
      <rect x="274" y="792" width="68" height="10" rx="3" fill="#00f0ff" />
    </g>
  </svg>`,

  real_render_aotac_cargo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 850" width="500" height="850">
    <defs>
      <linearGradient id="skinMale" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#fde68a" />
        <stop offset="100%" stop-color="#f59e0b" />
      </linearGradient>
      <linearGradient id="aoTacRoyal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e40af" />
        <stop offset="100%" stop-color="#172554" />
      </linearGradient>
    </defs>
    <g>
      <!-- Khan Dong & Hair -->
      <ellipse cx="250" cy="70" rx="48" ry="24" fill="#09090b" stroke="#ffd700" stroke-width="2.5" />
      <rect x="235" y="126" width="30" height="30" fill="url(#skinMale)" />
      <ellipse cx="250" cy="96" rx="36" ry="45" fill="url(#skinMale)" />
      <!-- Cyber Visor & Face -->
      <polygon points="212,86 288,86 282,106 218,106" fill="rgba(0,240,255,0.8)" stroke="#ff007f" stroke-width="2" />
      <path d="M242 118 L258 118" stroke="#78350f" stroke-width="2.5" stroke-linecap="round" />
      <!-- Ao Tac -->
      <path d="M178 158 L228 140 L272 140 L322 158 L338 345 L348 565 L152 565 L162 345 Z" fill="url(#aoTacRoyal)" stroke="#ffd700" stroke-width="2.5" />
      <path d="M178 158 Q116 250 86 422 L158 412 Q175 280 190 200 Z" fill="url(#aoTacRoyal)" stroke="#ffd700" stroke-width="2" />
      <path d="M322 158 Q384 250 414 422 L342 412 Q325 280 310 200 Z" fill="url(#aoTacRoyal)" stroke="#ffd700" stroke-width="2" />
      <circle cx="252" cy="165" r="4.5" fill="#ffd700" />
      <circle cx="270" cy="195" r="4.5" fill="#ffd700" />
      <circle cx="278" cy="230" r="4.5" fill="#ffd700" />
      <!-- Techwear Cargo -->
      <path d="M188 565 L312 565 L326 765 L268 765 L252 642 L236 765 L174 765 Z" fill="#09090b" stroke="#00f0ff" stroke-width="1.8" />
      <rect x="158" y="620" width="32" height="46" fill="#18181b" stroke="#00f0ff" stroke-width="1.5" rx="4" />
      <line x1="158" y1="642" x2="190" y2="642" stroke="#ff007f" stroke-width="2.5" />
      <rect x="310" y="620" width="32" height="46" fill="#18181b" stroke="#00f0ff" stroke-width="1.5" rx="4" />
      <line x1="310" y1="642" x2="342" y2="642" stroke="#ff007f" stroke-width="2.5" />
      <!-- Boots -->
      <rect x="168" y="762" width="48" height="36" fill="#18181b" stroke="#00f0ff" stroke-width="1.5" rx="5" />
      <rect x="284" y="762" width="48" height="36" fill="#18181b" stroke="#00f0ff" stroke-width="1.5" rx="5" />
    </g>
  </svg>`,

  real_render_aotac_jeans: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 850" width="500" height="850">
    <g>
      <ellipse cx="250" cy="95" rx="36" ry="46" fill="#fde68a" />
      <path d="M212 82 Q250 42 288 82 L282 130 L218 130 Z" fill="#171717" />
      <path d="M180 160 L230 142 L270 142 L320 160 L335 340 L345 560 L155 560 L165 340 Z" fill="#581c87" stroke="#fbbf24" stroke-width="2.5" />
      <path d="M180 160 Q120 250 90 420 L160 410 Q175 280 190 200 Z" fill="#581c87" stroke="#fbbf24" stroke-width="2" />
      <path d="M320 160 Q380 250 410 420 L340 410 Q325 280 310 200 Z" fill="#581c87" stroke="#fbbf24" stroke-width="2" />
      <path d="M195 560 L305 560 L315 765 L265 765 L252 640 L239 765 L185 765 Z" fill="#2563eb" stroke="#60a5fa" stroke-width="2" />
      <rect x="200" y="660" width="24" height="8" fill="#f8fafc" rx="2" />
      <rect x="275" y="630" width="28" height="8" fill="#f8fafc" rx="2" />
      <path d="M180 765 L225 765 L225 795 L175 795 Z" fill="#09090b" stroke="#00f0ff" stroke-width="2" />
      <path d="M275 765 L320 765 L325 795 L270 795 Z" fill="#09090b" stroke="#00f0ff" stroke-width="2" />
    </g>
  </svg>`,

  real_render_giaolinh_boots: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 850" width="500" height="850">
    <g>
      <ellipse cx="250" cy="95" rx="36" ry="46" fill="#fde68a" />
      <path d="M212 82 Q250 40 288 82 L282 132 L218 132 Z" fill="#09090b" />
      <path d="M175 160 L230 142 L270 142 L325 160 L345 420 L355 640 L145 640 L155 420 Z" fill="#14532d" stroke="#4ade80" stroke-width="2" />
      <path d="M225 142 L290 280 L275 295 L210 150 Z" fill="#991b1b" stroke="#facc15" stroke-width="2" />
      <rect x="185" y="320" width="130" height="22" fill="#dc2626" stroke="#ffd700" stroke-width="1.5" rx="4" />
      <path d="M190 640 L235 640 L240 795 L180 795 Z" fill="#18181b" stroke="#a1a1aa" stroke-width="2.5" />
      <path d="M265 640 L310 640 L320 795 L260 795 Z" fill="#18181b" stroke="#a1a1aa" stroke-width="2.5" />
    </g>
  </svg>`,

  real_render_aoyem_jeans: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 850" width="500" height="850">
    <g>
      <ellipse cx="250" cy="95" rx="34" ry="44" fill="#ffe4e6" />
      <path d="M214 84 Q250 42 286 84 L280 135 L220 135 Z" fill="#18181b" />
      <path d="M235 130 L220 160 M265 130 L280 160" stroke="#f43f5e" stroke-width="3.5" />
      <path d="M250 160 L308 232 L250 382 L192 232 Z" fill="#e11d48" stroke="#ffe4e6" stroke-width="2.5" />
      <circle cx="250" cy="252" r="18" fill="none" stroke="#fecdd3" stroke-width="2.5" />
      <path d="M195 382 L305 382 L325 580 L335 770 L275 770 L252 500 L229 770 L165 770 L175 580 Z" fill="#1d4ed8" stroke="#60a5fa" stroke-width="2" />
      <path d="M172 770 L212 770 L208 796 L168 796 Z" fill="#09090b" stroke="#00f0ff" stroke-width="2" />
      <path d="M288 770 L328 770 L332 796 L292 796 Z" fill="#09090b" stroke="#00f0ff" stroke-width="2" />
    </g>
  </svg>`,

  real_render_nguthan_cyberpunk: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 850" width="500" height="850">
    <g>
      <ellipse cx="250" cy="95" rx="36" ry="46" fill="#fde68a" />
      <ellipse cx="250" cy="70" rx="48" ry="24" fill="#09090b" stroke="#ffd700" stroke-width="2.5" />
      <polygon points="212,88 288,88 282,110 218,110" fill="#00f0ff" stroke="#ff007f" stroke-width="2.5" />
      <path d="M180 160 L230 142 L270 142 L320 160 L330 360 L340 580 L160 580 L170 360 Z" fill="#d97706" stroke="#fde047" stroke-width="2.5" />
      <circle cx="250" cy="162" r="4.5" fill="#ffd700" />
      <circle cx="270" cy="192" r="4.5" fill="#ffd700" />
      <path d="M190 580 L310 580 L320 770 L268 770 L252 640 L236 770 L180 770 Z" fill="#1e1b4b" stroke="#00f0ff" stroke-width="2" />
      <path d="M180 770 L225 770 L225 796 L175 796 Z" fill="#09090b" stroke="#ffd700" stroke-width="2" />
      <path d="M275 770 L320 770 L325 796 L270 796 Z" fill="#09090b" stroke="#ffd700" stroke-width="2" />
    </g>
  </svg>`,

  real_render_nhatbinh: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 850" width="500" height="850">
    <g>
      <ellipse cx="250" cy="95" rx="36" ry="46" fill="#ffe4e6" />
      <ellipse cx="250" cy="68" rx="52" ry="25" fill="#ffd700" stroke="#b45309" stroke-width="2.5" />
      <path d="M175 160 L230 145 L270 145 L325 160 L345 420 L355 640 L145 640 L155 420 Z" fill="#b91c1c" stroke="#facc15" stroke-width="2.5" />
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
      <path d="M185 765 L225 765 L220 790 L175 790 Q170 775 185 765 Z" fill="#9d174d" stroke="#ffd700" stroke-width="2" />
      <path d="M275 765 L315 765 Q330 775 325 790 L280 790 Z" fill="#9d174d" stroke="#ffd700" stroke-width="2" />
    </g>
  </svg>`
};

async function buildAll() {
  const dirs = ['assets/images', 'assets/images/items', 'assets/images/real_renders'];
  dirs.forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  });

  for (const [id, svg] of Object.entries(missingOrSvgItems)) {
    fs.writeFileSync(`assets/images/items/${id}.svg`, svg, 'utf8');
    await sharp(Buffer.from(svg)).png().toFile(`assets/images/items/${id}.png`);
    await sharp(Buffer.from(svg)).png().toFile(`assets/images/${id}.png`);
    console.log(`[Sharp PNG Created] items/${id}.png`);
  }

  for (const [id, svg] of Object.entries(realRenders)) {
    fs.writeFileSync(`assets/images/real_renders/${id}.svg`, svg, 'utf8');
    await sharp(Buffer.from(svg)).png().toFile(`assets/images/real_renders/${id}.png`);
    console.log(`[Sharp PNG Created] real_renders/${id}.png`);
  }

  console.log('ALL PNG ASSETS CONVERTED VIA SHARP SUCCESSFULLY!');
}

buildAll().catch(console.error);
