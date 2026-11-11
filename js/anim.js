/* Brew Lab: animated scenes. Lightweight SVG + CSS animations, one per section of the app,
   plus small touches (bubble burst when you pass a quiz, bubbling logo). Respects reduced-motion. */
const ANIM = (() => {
  const R = (a, b, i, k = 1) => a + ((i * 9301 * k + 49297) % 233280) / 233280 * (b - a); // deterministic "random"
  const bubbles = (n, x0, x1, y, h, col = '#fff6e0', seed = 1, rMax = 4) => Array.from({ length: n }, (_, i) =>
    `<circle class="sb" cx="${R(x0, x1, i + seed).toFixed(1)}" cy="${y}" r="${R(1.2, rMax, i + seed, 3).toFixed(1)}" fill="${col}" style="--h:-${h}px;animation-duration:${R(2.2, 5, i + seed, 7).toFixed(2)}s;animation-delay:${R(0, 4, i + seed, 11).toFixed(2)}s"/>`).join('');
  const bokeh = (n, col, seed = 1) => Array.from({ length: n }, (_, i) =>
    `<circle class="bk" cx="${R(20, 780, i + seed).toFixed(0)}" cy="${R(15, 150, i + seed, 5).toFixed(0)}" r="${R(3, 14, i + seed, 2).toFixed(1)}" fill="${col}" style="animation-duration:${R(6, 12, i + seed, 3).toFixed(1)}s;animation-delay:-${R(0, 8, i + seed, 13).toFixed(1)}s"/>`).join('');
  const floaty = (x, y, t, s = 26, d = 0) => `<text class="fl" x="${x}" y="${y}" font-size="${s}" text-anchor="middle" style="animation-delay:-${d}s">${t}</text>`;
  const svg = (inner, defs = '', cls = '') => `<svg class="scene-svg ${cls}" viewBox="0 0 800 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${defs}</defs>${inner}</svg>`;
  const grad = (id, a, b, c) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".65" stop-color="${b}"/><stop offset="1" stop-color="${c || b}"/></linearGradient>`;

  /* ---- Glasses ---- */
  const DR = { beer: ['#ffd27a', '#f19a1c', '#b85f05'], wine: ['#c2384f', '#8c1730', '#5a0d1e'], cider: ['#fff0a8', '#f2c94c', '#d39b14'], mead: ['#ffe08a', '#f0a92a', '#c9780a'], other: ['#fff7cc', '#f4d35e', '#e0b23a'], scot: ['#b48cd9', '#7d4fb0', '#55307f'], bread: ['#d9a066', '#a8662d', '#7a4416'], potato: ['#f6edc9', '#e5d38f', '#cdb862'], rice: ['#fbf7ee', '#ece4d0', '#d8ccae'], grain: ['#ffe39a', '#f2b84a', '#cf8b1d'], misc: ['#ffd6a0', '#f4a15d', '#d9773a'], wild: ['#e8a6b8', '#b5536f', '#7d2f47'] };
  function glass(kind, x, col, id, scale = 1, seed = 1) {
    const [a, b, c] = col, t = `translate(${x} 0) scale(${scale}) translate(${-x} 0)`;
    const g = `<defs>${grad(id, a, b, c)}</defs>`;
    if (kind === 'wine' || kind === 'goblet') {
      const w = kind === 'goblet' ? 44 : 34;
      return `<g transform="${t}"><g class="gl">${g}<clipPath id="${id}c"><path d="M${x - w} 26h${w * 2}c0 42-14 62-${w} 64-${w - 0}-2-${w}-22-${w}-64z"/></clipPath>
        <g clip-path="url(#${id}c)"><rect class="slosh" x="${x - w - 10}" y="52" width="${w * 2 + 20}" height="60" fill="url(#${id})"/>${bubbles(6, x - w + 8, x + w - 8, 92, 40, '#fff4', seed, 2.5)}</g>
        <path d="M${x - w} 26h${w * 2}c0 42-14 62-${w} 64-${w}-2-${w}-22-${w}-64z" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="2"/>
        <rect x="${x - 2}" y="90" width="4" height="46" fill="rgba(255,255,255,.55)"/><ellipse cx="${x}" cy="138" rx="${w * .75}" ry="5" fill="rgba(255,255,255,.5)"/></g>`;
    }
    if (kind === 'tumbler') {
      return `<g transform="${t}"><g class="gl">${g}<clipPath id="${id}c"><path d="M${x - 32} 52h64l-6 88a6 6 0 0 1-6 6h-40a6 6 0 0 1-6-6z"/></clipPath>
        <g clip-path="url(#${id}c)"><rect x="${x - 40}" y="62" width="80" height="90" fill="url(#${id})"/>${bubbles(9, x - 26, x + 26, 146, 85, '#fff8', seed, 2.6)}</g>
        <path d="M${x - 32} 52h64l-6 88a6 6 0 0 1-6 6h-40a6 6 0 0 1-6-6z" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="2"/>
        <rect x="${x - 18}" y="58" width="9" height="80" rx="4" fill="#fff" opacity=".18"/></g></g>`;
    }
    // pint (default)
    return `<g transform="${t}"><g class="gl">${g}<clipPath id="${id}c"><path d="M${x - 38} 30h76l-8 112a8 8 0 0 1-8 7h-44a8 8 0 0 1-8-7z"/></clipPath>
      <g clip-path="url(#${id}c)"><rect x="${x - 45}" y="30" width="90" height="125" fill="url(#${id})"/>${bubbles(12, x - 30, x + 30, 148, 110, '#fff6e0', seed, 2.8)}<rect x="${x - 26}" y="30" width="12" height="120" fill="#fff" opacity=".16"/></g>
      <g class="foam"><path d="M${x - 42} 34c-3-12 8-20 19-16 5-9 21-11 28-3 9-7 25-4 27 8 10-1 14 9 9 14H${x - 37}c-3 0-5-1-5-3z" fill="#fff8ea"/>
      <circle cx="${x - 14}" cy="22" r="7" fill="#fffdf6"/><circle cx="${x + 12}" cy="18" r="8" fill="#fffdf6"/></g>
      <path d="M${x - 38} 30h76l-8 112a8 8 0 0 1-8 7h-44a8 8 0 0 1-8-7z" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="2"/></g></g>`;
  }
  const bee = id => `<g class="bee"><path id="${id}p" d="M180 90c60-70 140 40 220-20s140 50 220-10" fill="none"/>
    <g><text font-size="22" text-anchor="middle" dy="7">🐝</text><animateMotion dur="9s" repeatCount="indefinite" rotate="0"><mpath href="#${id}p"/></animateMotion></g></g>`;

  function drinkScene(k) {
    const id = uid(), col = DR[k] || DR.beer;
    const kind = { wine: 'wine', mead: 'goblet', cider: 'tumbler', other: 'tumbler', potato: 'wine', rice: 'tumbler', misc: 'tumbler', wild: 'wine', scot: 'pint' }[k] || 'pint';
    const deco = { beer: ['🌾', '🌿', '🌾', '🌿'], wine: ['🍇', '🍷', '🍇', '🍾'], cider: ['🍎', '🍏', '🍎', '🍐'], mead: ['🍯', '🌼', '🍯', '🌸'], other: ['🍋', '🫚', '🍋', '🧊'], bread: ['🍞', '🌾', '🥖', '🌾'], potato: ['🥔', '🌱', '🥔', '🌱'], rice: ['🍚', '🌾', '🍚', '🌾'], grain: ['🌽', '🌾', '🌽', '🌾'], misc: ['🍍', '🍵', '🍌', '🌳'], wild: ['🫐', '🍄', '🌿', '🫐'], scot: ['💜', '🌿', '🫐', '🦌'] }[k] || ['✨', '✨', '✨', '✨'];
    return svg(`${bokeh(16, col[0] + '33', 3)}
      ${glass(kind, 400, col, id, 1, 2)}
      ${floaty(240, 70, deco[0], 30, 0)}${floaty(300, 130, deco[1], 22, 2)}${floaty(520, 64, deco[2], 28, 1)}${floaty(570, 128, deco[3], 22, 3)}
      ${k === 'mead' ? bee(id + 'b') : ''}`);
  }

  /* ---- Scenes ---- */
  const S = {};
  S.glasses = () => { const id = uid(); return svg(`${bokeh(18, '#f5a52433', 5)}
    ${glass('pint', 250, DR.beer, id + 'a', .9, 1)}${glass('wine', 355, DR.wine, id + 'b', .9, 2)}${glass('tumbler', 455, DR.cider, id + 'c', .9, 3)}${glass('goblet', 560, DR.mead, id + 'd', .9, 4)}
    ${floaty(170, 60, '✨', 18, 1)}${floaty(640, 70, '✨', 18, 2)}`); };

  S.hydro = () => { const id = uid(); return svg(`${bokeh(14, '#7fd18b33', 2)}
    <defs>${grad(id, '#ffe39a', '#f2b84a', '#cf8b1d')}</defs>
    <rect x="360" y="14" width="80" height="140" rx="8" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.5)" stroke-width="2"/>
    <rect x="362" y="44" width="76" height="108" rx="6" fill="url(#${id})" opacity=".9"/>
    <g fill="rgba(255,255,255,.55)">${Array.from({ length: 8 }, (_, i) => `<rect x="364" y="${52 + i * 12}" width="${i % 2 ? 6 : 12}" height="1.5"/>`).join('')}</g>
    ${bubbles(8, 368, 432, 150, 100, '#fff8', 7, 2.4)}
    <g class="bob"><rect x="396" y="6" width="8" height="70" rx="4" fill="#fff" opacity=".85"/><ellipse cx="400" cy="92" rx="13" ry="20" fill="#fff" opacity=".9"/><circle cx="400" cy="104" r="7" fill="#9a6b3a"/>
      <g fill="#c2384f"><rect x="397" y="20" width="6" height="2"/><rect x="397" y="32" width="6" height="2"/><rect x="397" y="44" width="6" height="2"/></g></g>
    <g transform="translate(560 82)"><circle r="42" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.5)" stroke-width="2"/>
      <path d="M-30 12A32 32 0 0 1 30 12" fill="none" stroke="#7fd18b" stroke-width="5" stroke-linecap="round"/>
      <g class="needle"><rect x="-1.5" y="-30" width="3" height="32" rx="1.5" fill="#f5a524"/></g><circle r="5" fill="#f5a524"/></g>
    <g class="ticker" font-family="monospace" font-size="15" fill="rgba(255,255,255,.75)" text-anchor="middle">
      <text x="230" y="60">1.050</text><text x="260" y="120">ABV 5.2%</text><text x="200" y="95">OG</text></g>`); };

  S.ferment = () => { const id = uid(); return svg(`${bokeh(14, '#f5a52430', 9)}
    <defs>${grad(id, '#ffcf6b', '#e98f17', '#a85a06')}</defs>
    <g><clipPath id="${id}c"><path d="M336 150c-40 0-48-40-40-62 8-24 38-34 52-38v-14h44v14c14 4 44 14 52 38 8 22 0 62-40 62z"/></clipPath>
      <g clip-path="url(#${id}c)"><rect x="280" y="62" width="240" height="100" fill="url(#${id})"/><rect class="krausen" x="280" y="58" width="240" height="10" fill="#fff3d6"/>${bubbles(14, 300, 500, 150, 90, '#fff8', 3, 3)}</g>
      <path d="M336 150c-40 0-48-40-40-62 8-24 38-34 52-38v-14h44v14c14 4 44 14 52 38 8 22 0 62-40 62z" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="2.5"/>
      <rect x="344" y="26" width="52" height="10" rx="3" fill="#8b5a2b"/>
      <path d="M362 26v-10h16v10" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="2.5"/><rect x="358" y="2" width="24" height="16" rx="4" fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.7)" stroke-width="2"/>
      <circle class="blip" cx="370" cy="12" r="4" fill="#fff"/><circle class="blip b2" cx="370" cy="12" r="3" fill="#fff"/></g>
    <text class="bloop" x="420" y="22" font-size="14" font-family="monospace" fill="rgba(255,255,255,.8)">bloop!</text>
    <g transform="translate(560 40)"><rect x="0" y="10" width="90" height="100" rx="8" fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.5)" stroke-width="2"/>
      <rect x="-4" y="4" width="98" height="12" rx="4" fill="rgba(255,255,255,.3)"/><rect x="40" y="-8" width="10" height="12" rx="2" fill="rgba(255,255,255,.6)"/>
      <circle class="blip b3" cx="45" cy="-10" r="3" fill="#fff"/><rect x="8" y="44" width="74" height="60" rx="4" fill="#f2c94c" opacity=".55"/></g>
    ${floaty(210, 70, '🦠', 22, 1)}${floaty(250, 130, '🦠', 16, 3)}${floaty(690, 120, '🦠', 18, 2)}`); };

  S.lab = () => { const id = uid(); return svg(`${bokeh(16, '#a3d46833', 4)}
    <defs>${grad(id, '#d9f07a', '#a3d468', '#6f9e3a')}</defs>
    <clipPath id="${id}c"><path d="M382 20h36v40l40 78a8 8 0 0 1-7 12h-102a8 8 0 0 1-7-12l40-78z"/></clipPath>
    <g clip-path="url(#${id}c)"><rect class="slosh" x="330" y="86" width="140" height="70" fill="url(#${id})"/>${bubbles(14, 350, 450, 148, 70, '#fffb', 6, 3.2)}</g>
    <path d="M382 20h36v40l40 78a8 8 0 0 1-7 12h-102a8 8 0 0 1-7-12l40-78z" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="2.5"/>
    <rect x="378" y="14" width="44" height="8" rx="3" fill="rgba(255,255,255,.55)"/>
    <g class="steam"><path d="M392 10c-6-8 6-12 0-20" /><path d="M408 8c-6-8 6-12 0-20"/></g>
    <g class="cells">${[[240, 60, 12], [285, 115, 9], [530, 55, 11], [580, 112, 14], [190, 120, 7]].map(([x, y, r], i) => `<g class="cell" style="animation-delay:-${i * .9}s"><circle cx="${x}" cy="${y}" r="${r}" fill="#f4e3b5" opacity=".85"/><circle cx="${x + r * .9}" cy="${y - r * .6}" r="${r * .45}" fill="#f4e3b5" opacity=".85"/><circle cx="${x - r * .3}" cy="${y}" r="${r * .3}" fill="#c9a86a" opacity=".6"/></g>`).join('')}</g>
    ${floaty(640, 60, '🎓', 26, 1)}${floaty(150, 70, '✨', 16, 2)}${floaty(660, 130, '✨', 14, 0)}`); };

  S.hills = () => { const id = uid(); return svg(`
    <defs><linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4f86"/><stop offset=".6" stop-color="#d98a6a"/><stop offset="1" stop-color="#f3c58a"/></linearGradient></defs>
    <rect width="800" height="160" fill="url(#${id}s)"/>
    <circle cx="560" cy="70" r="22" fill="#ffe2a8" opacity=".9" class="sun"/>
    <g class="clouds"><g class="cl" style="animation-duration:60s"><ellipse cx="0" cy="34" rx="46" ry="10" fill="#fff" opacity=".55"/><ellipse cx="24" cy="28" rx="26" ry="10" fill="#fff" opacity=".55"/></g>
      <g class="cl" style="animation-duration:85s;animation-delay:-40s"><ellipse cx="0" cy="54" rx="60" ry="9" fill="#fff" opacity=".4"/></g>
      <g class="cl" style="animation-duration:70s;animation-delay:-20s"><ellipse cx="0" cy="22" rx="36" ry="8" fill="#fff" opacity=".45"/></g></g>
    <g class="birds" fill="none" stroke="#2b2440" stroke-width="1.6" stroke-linecap="round"><g class="bird"><path d="M0 0q5-5 10 0q5-5 10 0"/></g><g class="bird" style="animation-delay:-6s"><path d="M0 0q4-4 8 0q4-4 8 0"/></g></g>
    <path d="M0 110 L90 62 L170 96 L260 48 L360 100 L450 58 L540 92 L640 44 L730 88 L800 70 V160 H0Z" fill="#5d5582"/>
    <path d="M0 125 L120 88 L230 118 L330 84 L430 120 L540 90 L660 122 L800 96 V160 H0Z" fill="#6b4f8a"/>
    <rect class="mist" x="-200" y="104" width="1200" height="18" fill="#fff" opacity=".18" rx="9"/>
    <path d="M0 140 C140 122 260 136 400 128 S660 120 800 134 V160 H0Z" fill="#3f2f5c"/>
    <g fill="#3f2f5c">${[160, 178, 640, 662, 682].map((x, i) => `<path d="M${x} 136l7-22 7 22z" transform="scale(1 ${1 + (i % 2) * .3})" transform-origin="${x + 7} 136"/>`).join('')}</g>
    <g transform="translate(470 102)"><rect x="0" y="0" width="2" height="34" fill="#2b2440"/><g class="flag"><rect x="2" y="0" width="22" height="14" fill="#1f5fbf"/><path d="M2 0l22 14M24 0L2 14" stroke="#fff" stroke-width="2.6"/></g></g>
    <text x="300" y="120" font-size="20" class="fl">🦌</text>`, '', 'night-ok'); };

  S.still = () => { const id = uid(); return svg(`${bokeh(12, '#ff8a3d33', 6)}
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6b27a"/><stop offset=".5" stop-color="#c8743a"/><stop offset="1" stop-color="#8c4a1f"/></linearGradient></defs>
    <g transform="translate(300 150)"><g class="flame"><path d="M-26 0c-6-18 10-22 6-40 14 8 12 22 20 26 2-12 10-16 8-28 14 14 20 30 12 42z" fill="#ff8a3d"/><path d="M-12 0c-2-10 6-12 4-22 8 6 6 14 12 16 2-6 6-8 4-14 8 8 8 16 4 20z" fill="#ffd166"/></g></g>
    <path d="M250 112c0-34 22-56 50-56s50 22 50 56z" fill="url(#${id})" stroke="rgba(255,255,255,.4)" stroke-width="2"/>
    <rect x="246" y="108" width="108" height="10" rx="3" fill="#8c4a1f"/>
    <path d="M300 56V36c0-12 10-18 22-18h120c10 0 16 6 18 14l6 30" fill="none" stroke="url(#${id})" stroke-width="9" stroke-linecap="round"/>
    <g class="vapour" stroke="rgba(255,255,255,.55)" stroke-width="2" fill="none"><path d="M290 70c-4-6 4-10 0-16"/><path d="M308 74c-4-6 4-10 0-16"/></g>
    <rect x="430" y="58" width="80" height="62" rx="6" fill="rgba(120,190,255,.25)" stroke="rgba(255,255,255,.5)" stroke-width="2"/>
    <path d="M446 64c16 0 16 10 0 10s-16 10 0 10 16 10 0 10 -16 10 0 10" fill="none" stroke="#c8743a" stroke-width="4" transform="translate(24 0)"/>
    <path d="M500 112h40v8" fill="none" stroke="#c8743a" stroke-width="5" stroke-linecap="round"/>
    <circle class="drip" cx="540" cy="124" r="3.2" fill="#e8f4ff"/>
    <g transform="translate(524 128)"><rect x="0" y="0" width="34" height="28" rx="4" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.6)" stroke-width="2"/>
      <rect class="jarfill" x="2" y="2" width="30" height="24" rx="3" fill="#e8f4ff" opacity=".6"/></g>
    ${floaty(620, 70, '⚗️', 24, 1)}${floaty(180, 60, '✨', 14, 2)}`); };

  S.camp = () => { const id = uid(); return svg(`
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f1630"/><stop offset="1" stop-color="#2a2348"/></linearGradient></defs>
    <rect width="800" height="160" fill="url(#${id})"/>
    ${Array.from({ length: 34 }, (_, i) => `<circle class="tw" cx="${R(0, 800, i, 3).toFixed(0)}" cy="${R(5, 90, i, 7).toFixed(0)}" r="${R(.6, 1.8, i).toFixed(1)}" fill="#fff" style="animation-delay:-${R(0, 4, i, 5).toFixed(1)}s"/>`).join('')}
    <circle cx="640" cy="34" r="14" fill="#f5f0d8"/><circle cx="646" cy="30" r="13" fill="#0f1630"/>
    <g fill="#141a2e">${[120, 160, 200, 600, 650, 700, 740].map((x, i) => `<path d="M${x} 150l${18 + i % 3 * 4}-${60 + i % 2 * 20} ${18 + i % 3 * 4} ${60 + i % 2 * 20}z"/>`).join('')}</g>
    <path d="M0 150h800v10H0z" fill="#141a2e"/>
    <path d="M250 150l40-50 40 50z" fill="#3b4b7a"/><path d="M290 100l-12 50h24z" fill="#1d2440"/>
    <g stroke="#6b5a48" stroke-width="3"><path d="M370 150l30-62 30 62"/></g><path d="M400 90v16" stroke="#555" stroke-width="1.5"/>
    <path d="M386 106h28l-3 20h-22z" fill="#444"/>${bubbles(5, 390, 410, 106, 26, '#fff8', 4, 2)}
    <g transform="translate(400 152)"><g class="flame"><path d="M-22 0c-6-16 8-20 5-34 12 7 10 18 17 22 2-10 8-14 7-24 12 12 17 26 10 36z" fill="#ff8a3d"/><path d="M-10 0c-2-8 5-10 3-18 7 5 5 12 10 13 2-5 5-7 3-12 7 7 7 13 3 17z" fill="#ffd166"/></g></g>
    <g fill="#ffb347">${Array.from({ length: 8 }, (_, i) => `<circle class="ember" cx="${R(388, 412, i, 3).toFixed(0)}" cy="140" r="1.6" style="animation-delay:-${R(0, 3, i, 9).toFixed(1)}s;--dx:${R(-20, 20, i, 4).toFixed(0)}px"/>`).join('')}</g>`, '', 'night-ok'); };

  S.bottles = () => { const id = uid(); const cols = ['#5b3a1a', '#2f5d2a', '#7a1f2c', '#8a6a1a', '#3a2f5c'];
    return svg(`${bokeh(16, '#f5a52430', 8)}
      <defs><linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <clipPath id="${id}c">${cols.map((_, i) => { const x = 250 + i * 75; return `<path d="M${x - 6} 18h12v26c14 6 18 14 18 26v74a6 6 0 0 1-6 6h-36a6 6 0 0 1-6-6V70c0-12 4-20 18-26z"/>`; }).join('')}</clipPath></defs>
      ${cols.map((c, i) => { const x = 250 + i * 75; return `<path d="M${x - 6} 18h12v26c14 6 18 14 18 26v74a6 6 0 0 1-6 6h-36a6 6 0 0 1-6-6V70c0-12 4-20 18-26z" fill="${c}" stroke="rgba(255,255,255,.35)" stroke-width="2"/><rect x="${x - 7}" y="12" width="14" height="8" rx="2" fill="#d9b25a"/><rect x="${x - 16}" y="86" width="32" height="30" rx="3" fill="#f6ecd6" opacity=".9"/><text x="${x}" y="106" font-size="13" text-anchor="middle">${['🍺', '🍏', '🍷', '🍯', '🫐'][i]}</text>`; }).join('')}
      <g clip-path="url(#${id}c)"><rect class="shine" x="-60" y="0" width="60" height="160" fill="url(#${id})" transform="skewX(-15)"/></g>
      ${floaty(180, 60, '✨', 18, 1)}${floaty(640, 50, '✨', 16, 2)}`); };

  const ROUTES = [
    [/^\/recipes$|^\/paths$/, () => S.glasses()],
    [/^\/calcs$/, () => S.hydro()],
    [/^\/log$/, () => S.ferment()],
    [/^\/(learn|school)$/, () => S.lab()],
    [/^\/scotland$/, () => S.hills()],
    [/^\/scotland\/distilling$|^\/guide\/(survival-still|distilling-history)$|^\/calc\/still$/, () => S.still()],
    [/^\/drink\/wild$|^\/guide\/survival$|^\/scotland\/survival$/, () => S.camp()],
    [/^\/cellar$/, () => S.bottles()],
    [/^\/juice$/, () => drinkScene('cider')],
    [/^\/drink\/(\w+)$/, m => drinkScene(m[1])],
    [/^\/(whatsnew|features)$/, () => S.glasses()],
  ];
  function place() {
    const path = (location.hash.slice(1) || '/').split('?')[0];
    const page = $('#view > div'); if (!page || $('.scene', page)) return;
    const hit = ROUTES.find(([re]) => re.test(path)); if (!hit) return;
    const art = hit[1](path.match(hit[0]));
    const anchor = $('.lead', page) || $('h1', page); if (!anchor) return;
    const d = document.createElement('div'); d.className = 'scene fade-in'; d.innerHTML = art;
    anchor.after(d);
  }

  /* ---- Bubble burst (quiz passed, course done) ---- */
  function burst(x = innerWidth / 2, y = innerHeight / 2, n = 26) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const w = document.createElement('div'); w.className = 'burst'; w.style.left = x + 'px'; w.style.top = y + 'px';
    w.innerHTML = Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2, d = 60 + (i * 37) % 90, s = 6 + (i * 13) % 12;
      return `<i style="--x:${(Math.cos(a) * d).toFixed(0)}px;--y:${(Math.sin(a) * d - 40).toFixed(0)}px;width:${s}px;height:${s}px;animation-delay:${(i % 5) * 30}ms;background:${['#ffd27a', '#f5a524', '#fff6e0', '#a3d468', '#7fd18b'][i % 5]}"></i>`; }).join('');
    document.body.appendChild(w); setTimeout(() => w.remove(), 1600);
  }
  new MutationObserver(ms => {
    for (const m of ms) for (const n of m.addedNodes) {
      if (n.nodeType !== 1) continue;
      const r = n.matches?.('.result.pass') ? n : n.querySelector?.('.result.pass');
      if (r && !r.dataset.burst) { r.dataset.burst = 1; const b = r.getBoundingClientRect(); burst(b.left + b.width / 2, Math.min(innerHeight - 80, Math.max(80, b.top + 30))); }
    }
  }).observe(document.documentElement, { childList: true, subtree: true });

  document.addEventListener('click', e => { const b = e.target.closest('[data-done]'); if (b && b.classList.contains('ghost')) burst(e.clientX, e.clientY, 20); }, true);
  window.addEventListener('hashchange', () => setTimeout(place, 0));
  setTimeout(place, 0);
  const kindFor = k => ({ wine: 'wine', mead: 'goblet', cider: 'tumbler', other: 'tumbler', potato: 'wine', rice: 'tumbler', misc: 'tumbler', wild: 'wine', juice: 'tumbler' }[k] || 'pint');
  return { S, drinkScene, burst, glass, DR, kindFor, bubbles, svg, grad, bokeh, floaty, R, routes: ROUTES, place };
})();
