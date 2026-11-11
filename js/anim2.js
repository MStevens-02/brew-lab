/* Brew Lab: more animated scenes (one for nearly every page), seasonal weather on the Scotland month page,
   a pouring glass on recipes, count-up numbers and wiggling icons. */
(() => {
  const { svg, grad, bokeh, floaty, bubbles, R, glass, DR } = ANIM;
  const S = ANIM.S;
  const drops = (n, cls, x0, x1, seed, col = '#bfe3ff', w = 1.6, len = 9) => Array.from({ length: n }, (_, i) =>
    `<line class="${cls}" x1="${R(x0, x1, i + seed).toFixed(0)}" y1="-10" x2="${(R(x0, x1, i + seed) - 3).toFixed(0)}" y2="${-10 + len}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" style="animation-duration:${R(.6, 1.1, i + seed, 3).toFixed(2)}s;animation-delay:-${R(0, 2, i + seed, 7).toFixed(2)}s"/>`).join('');
  const fall = (n, ch, seed, size = 14, dur = [6, 11]) => Array.from({ length: n }, (_, i) =>
    `<text class="fall" x="${R(10, 790, i + seed).toFixed(0)}" y="-12" font-size="${R(size * .6, size, i + seed, 3).toFixed(0)}" style="animation-duration:${R(dur[0], dur[1], i + seed, 5).toFixed(1)}s;animation-delay:-${R(0, 10, i + seed, 9).toFixed(1)}s;--sway:${R(-40, 40, i + seed, 4).toFixed(0)}px">${Array.isArray(ch) ? ch[i % ch.length] : ch}</text>`).join('');

  /* ---- Juice: carton pouring into a demijohn ---- */
  S.pour = () => { const id = uid(); return svg(`${bokeh(14, '#f2c94c33', 4)}
    <defs>${grad(id, '#fff0a8', '#f2c94c', '#d39b14')}</defs>
    <g transform="rotate(-38 330 40)"><g class="carton"><rect x="300" y="10" width="54" height="80" rx="4" fill="#e85d3a"/><path d="M300 10l27-14 27 14z" fill="#ff7a52"/><rect x="306" y="34" width="42" height="30" rx="3" fill="#fff"/><text x="327" y="55" font-size="18" text-anchor="middle">🍎</text></g></g>
    <path class="stream" d="M372 44 C380 70 392 80 398 96" stroke="#f2c94c" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray="10 8"/>
    <clipPath id="${id}c"><path d="M372 156c-34 0-42-32-34-52 7-18 30-26 42-30v-12h36v12c12 4 35 12 42 30 8 20 0 52-34 52z"/></clipPath>
    <g clip-path="url(#${id}c)"><rect class="fillup" x="330" y="70" width="140" height="90" fill="url(#${id})"/>${bubbles(10, 350, 450, 150, 50, '#fff9', 2, 2.6)}</g>
    <path d="M372 156c-34 0-42-32-34-52 7-18 30-26 42-30v-12h36v12c12 4 35 12 42 30 8 20 0 52-34 52z" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="2.5"/>
    ${floaty(560, 60, '🍏', 26, 1)}${floaty(610, 120, '🍐', 22, 2)}${floaty(220, 110, '🍎', 22, 3)}${floaty(560, 130, '✨', 14, 0)}`); };

  /* ---- Calendar: pages flipping + moon ---- */
  S.calendar = () => svg(`${bokeh(14, '#5b8fd633', 6)}
    <g transform="translate(330 22)"><rect width="140" height="120" rx="10" fill="#fdf6ea"/><rect width="140" height="30" rx="10" fill="#e5533d"/><rect y="20" width="140" height="10" fill="#e5533d"/>
      <circle cx="35" cy="0" r="5" fill="#555"/><circle cx="105" cy="0" r="5" fill="#555"/>
      <g class="calnum" font-family="Georgia,serif" font-weight="700" fill="#2b2016" text-anchor="middle">${[11, 12, 13, 14].map((n, i) => `<text x="70" y="98" font-size="56" style="animation-delay:${i * 2}s">${n}</text>`).join('')}</g>
      <g class="flip"><rect y="30" width="140" height="90" rx="0" fill="#f1e6d3"/></g></g>
    <g transform="translate(560 70)" class="moon"><circle r="22" fill="#f5f0d8"/><circle class="shadow" r="22" fill="#2a1a0e"/></g>
    ${floaty(240, 60, '🔔', 24, 1)}${floaty(270, 125, '🍺', 20, 2)}${floaty(620, 130, '📅', 20, 0)}`);

  /* ---- Shopping: items dropping into a basket ---- */
  S.basket = () => svg(`${bokeh(14, '#7fd18b33', 3)}
    <g class="drops-in">${['🍎', '🍯', '🍋', '🍺', '🫐', '🧂'].map((e, i) => `<text class="dropin" x="${370 + (i % 3) * 30}" y="0" font-size="24" text-anchor="middle" style="animation-delay:${i * .7}s">${e}</text>`).join('')}</g>
    <path d="M330 92h140l-14 56a8 8 0 0 1-8 6H352a8 8 0 0 1-8-6z" fill="#c98a3c"/><path d="M330 92h140" stroke="#8f5a1d" stroke-width="6" stroke-linecap="round"/>
    <g stroke="#8f5a1d" stroke-width="2" opacity=".6">${[0, 1, 2, 3, 4, 5].map(i => `<line x1="${352 + i * 20}" y1="96" x2="${356 + i * 18}" y2="150"/>`).join('')}<line x1="336" y1="116" x2="464" y2="116"/><line x1="342" y1="136" x2="458" y2="136"/></g>
    <path d="M352 92c0-40 96-40 96 0" fill="none" stroke="#8f5a1d" stroke-width="6"/>
    <g class="ticks" font-size="20">${[0, 1, 2].map(i => `<text x="${560}" y="${50 + i * 34}" style="animation-delay:${i * .8}s">✅</text>`).join('')}</g>
    <g fill="rgba(255,255,255,.7)">${[0, 1, 2].map(i => `<rect x="590" y="${36 + i * 34}" width="${60 - i * 12}" height="8" rx="4"/>`).join('')}</g>`);

  /* ---- Stats: growing bars + filling pint ---- */
  S.stats = () => { const id = uid(); return svg(`${bokeh(14, '#f5a52433', 2)}
    <g transform="translate(250 150)">${[40, 70, 55, 95, 80, 120].map((h, i) => `<rect class="sbar" x="${i * 26}" y="-${h}" width="18" height="${h}" rx="4" fill="${['#f5a524', '#e9a63a', '#f2c94c', '#f5a524', '#e07b39', '#7fd18b'][i]}" style="animation-delay:${i * .12}s"/>`).join('')}
      <path class="trend" d="M9 -48 L35 -78 L61 -63 L87 -103 L113 -88 L139 -128" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></g>
    ${glass('pint', 540, DR.beer, id, .85, 5)}
    ${floaty(470, 50, '🏆', 24, 1)}${floaty(640, 60, '⭐', 18, 2)}${floaty(200, 50, '📈', 20, 0)}`); };

  /* ---- Inbox: ringing bell ---- */
  S.bell = () => svg(`${bokeh(14, '#f5a52433', 7)}
    <g transform="translate(400 30)"><g class="ring-bell"><path d="M-34 70c6-8 8-18 8-34 0-20 12-34 26-36 14 2 26 16 26 36 0 16 2 26 8 34z" fill="#f5c04a"/><rect x="-40" y="66" width="80" height="10" rx="5" fill="#e0a52a"/><circle cy="-3" r="5" fill="#e0a52a"/></g>
      <circle class="clapper" cy="84" r="8" fill="#c98a1a"/></g>
    <g class="waves" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><path d="M340 60q-12 20 0 40"/><path d="M322 52q-18 28 0 56"/><path d="M460 60q12 20 0 40"/><path d="M478 52q18 28 0 56"/></g>
    <g class="pops">${[['560', '50', '🍺'], ['600', '100', '📅'], ['230', '60', '🧪'], ['200', '115', '💡']].map(([x, y, e], i) => `<g class="pop" style="animation-delay:${i * .9}s"><circle cx="${x}" cy="${y}" r="17" fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.4)"/><text x="${x}" y="${+y + 7}" font-size="18" text-anchor="middle">${e}</text></g>`).join('')}</g>
    <g transform="translate(424 36)"><circle class="badge-pulse" r="11" fill="#e5533d"/><text y="5" font-size="13" text-anchor="middle" fill="#fff" font-weight="700">3</text></g>`);

  /* ---- Reference / guides: book with flipping pages ---- */
  S.book = () => svg(`${bokeh(14, '#bb6bd933', 5)}
    <g transform="translate(400 132)"><path d="M-120 0c40-14 80-14 120 0c40-14 80-14 120 0v-92c-40-14-80-14-120 0c-40-14-80-14-120 0z" fill="#7a4416"/>
      <path d="M-112 -6c36-12 74-12 112 0v-86c-38-12-76-12-112 0z" fill="#fdf6ea"/><path d="M112 -6c-36-12-74-12-112 0v-86c38-12 76-12 112 0z" fill="#fdf6ea"/>
      <g fill="#c9b79a">${[0, 1, 2, 3, 4].map(i => `<rect x="-96" y="${-78 + i * 13}" width="${70 - (i % 2) * 14}" height="3" rx="1.5"/><rect x="20" y="${-78 + i * 13}" width="${74 - (i % 3) * 12}" height="3" rx="1.5"/>`).join('')}</g>
      <g class="page"><path d="M0 -6c38-12 76-12 112 0v-86c-36-12-74-12-112 0z" fill="#f4ead8" stroke="#e2d3b8"/></g></g>
    ${floaty(230, 60, '🌿', 26, 1)}${floaty(570, 52, '🌾', 26, 2)}${floaty(620, 125, '🍇', 22, 3)}${floaty(190, 125, '🍯', 22, 0)}`);

  /* ---- App & settings: gears + phone ---- */
  const gear = (r, teeth) => { let d = ''; for (let i = 0; i < teeth; i++) { const a = i / teeth * Math.PI * 2, b = (i + .5) / teeth * Math.PI * 2; d += `${i ? 'L' : 'M'}${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}L${(Math.cos(a) * (r + 8)).toFixed(1)} ${(Math.sin(a) * (r + 8)).toFixed(1)}L${(Math.cos(b) * (r + 8)).toFixed(1)} ${(Math.sin(b) * (r + 8)).toFixed(1)}L${(Math.cos(b) * r).toFixed(1)} ${(Math.sin(b) * r).toFixed(1)}`; } return d + 'Z'; };
  S.gears = () => svg(`${bokeh(14, '#56b4d333', 8)}
    <g transform="translate(330 84)"><g class="spin"><path d="${gear(30, 10)}" fill="#f5a524"/><circle r="11" fill="#2a1a0e"/></g></g>
    <g transform="translate(386 44)"><g class="spin rev"><path d="${gear(18, 8)}" fill="#e0a52a"/><circle r="7" fill="#2a1a0e"/></g></g>
    <g transform="translate(470 22)"><rect width="66" height="120" rx="12" fill="#1b1b1f" stroke="rgba(255,255,255,.5)" stroke-width="2"/><rect x="6" y="14" width="54" height="92" rx="4" fill="#2a1a0e"/>
      <g transform="translate(33 56) scale(.9)"><path d="M-12 -18h24l-3 34a4 4 0 0 1-4 3h-10a4 4 0 0 1-4-3z" fill="#f5a524"/><circle class="lb" cx="-3" cy="10" r="2" fill="#fff"/><circle class="lb" cx="4" cy="12" r="1.6" fill="#fff" style="animation-delay:-1s"/></g>
      <rect class="install" x="14" y="88" width="38" height="10" rx="5" fill="#7fd18b"/></g>
    ${floaty(620, 60, '🌙', 22, 1)}${floaty(220, 110, '🔔', 22, 2)}${floaty(200, 55, '💾', 20, 0)}`);

  /* ---- What's new / features: champagne cork pop ---- */
  S.cork = () => svg(`${bokeh(16, '#f2c94c33', 9)}
    <g transform="rotate(-20 400 110)"><path d="M385 150v-60c0-14 8-20 8-30v-22h14v22c0 10 8 16 8 30v60a6 6 0 0 1-6 6h-18a6 6 0 0 1-6-6z" fill="#2f5d2a"/><rect x="391" y="40" width="18" height="18" fill="#d9b25a"/><rect x="388" y="98" width="24" height="26" rx="2" fill="#f6ecd6"/></g>
    <g class="cork"><rect x="378" y="10" width="12" height="14" rx="3" fill="#c98a3c"/></g>
    <g class="confetti">${Array.from({ length: 22 }, (_, i) => `<rect x="380" y="30" width="6" height="10" rx="1.5" fill="${['#f5a524', '#e5533d', '#7fd18b', '#5b8fd6', '#bb6bd9', '#f2c94c'][i % 6]}" style="--x:${R(-220, 220, i, 3).toFixed(0)}px;--y:${R(-20, 110, i, 5).toFixed(0)}px;--r:${R(-360, 360, i, 7).toFixed(0)}deg;animation-delay:${(i % 4) * .05}s"/>`).join('')}</g>
    ${bubbles(10, 384, 410, 60, 70, '#fff9', 3, 3)}
    <text class="newbadge" x="560" y="80" font-size="26" font-weight="800" fill="#f5a524" font-family="Georgia,serif">NEW!</text>`);

  /* ---- Skill ladders: climbing ---- */
  S.ladder = () => svg(`${bokeh(14, '#7fd18b33', 6)}
    <g stroke="#c98a3c" stroke-width="6" stroke-linecap="round"><line x1="360" y1="152" x2="380" y2="12"/><line x1="440" y1="152" x2="420" y2="12"/>${[0, 1, 2, 3, 4].map(i => `<line x1="${363 + i * 3.6}" y1="${130 - i * 28}" x2="${437 - i * 3.6}" y2="${130 - i * 28}"/>`).join('')}</g>
    <g class="climber"><text x="400" y="128" font-size="26" text-anchor="middle">🍺</text></g>
    <g font-size="12" font-family="monospace" fill="rgba(255,255,255,.8)">${['Super easy', 'Easy', 'Medium', 'Hard', 'Expert'].map((t, i) => `<text x="460" y="${134 - i * 28}">${'★'.repeat(i + 1)} ${t}</text>`).join('')}</g>
    ${floaty(250, 50, '🏆', 28, 1)}${floaty(260, 120, '✨', 16, 2)}`);

  /* ---- Brew-day: boiling pot ---- */
  S.boil = () => svg(`${bokeh(12, '#ff8a3d33', 3)}
    <g transform="translate(400 152)"><g class="flame"><path d="M-40 0c-8-16 10-20 6-34 14 8 12 18 20 22 2-10 8-14 6-24 14 12 18 26 12 36z" fill="#ff8a3d"/><path d="M10 0c-6-14 8-18 5-30 12 7 10 16 17 20 2-9 7-12 5-21 12 11 16 23 10 31z" fill="#ff8a3d"/></g></g>
    <path d="M330 62h140l-8 76a8 8 0 0 1-8 7H346a8 8 0 0 1-8-7z" fill="#9aa3ad"/><rect x="322" y="56" width="156" height="10" rx="4" fill="#c4ccd4"/>
    <rect x="300" y="70" width="24" height="8" rx="4" fill="#6b737c"/><rect x="476" y="70" width="24" height="8" rx="4" fill="#6b737c"/>
    <ellipse cx="400" cy="62" rx="70" ry="6" fill="#d9a54a"/>${bubbles(14, 340, 460, 66, 14, '#fff', 8, 4)}
    <g class="steam big">${[360, 385, 410, 435].map((x, i) => `<path d="M${x} 50c-8-10 8-16 0-26s8-16 0-24" style="animation-delay:${i * .5}s"/>`).join('')}</g>
    ${floaty(560, 60, '🌿', 26, 1)}${floaty(230, 70, '⏱', 26, 2)}${floaty(600, 125, '🌾', 20, 0)}`);

  /* ---- Scotland section scenes ---- */
  S.burn = () => { const id = uid(); return svg(`<defs><linearGradient id="${id}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#9fd0e8"/><stop offset="1" stop-color="#e6f2e0"/></linearGradient></defs>
    <rect width="800" height="160" fill="url(#${id})"/>
    <path d="M0 70 L120 30 L240 62 L360 20 L480 58 L620 24 L800 60 V160 H0Z" fill="#6b8f5a"/>
    <path d="M0 110 C200 90 300 130 420 112 S700 96 800 118 V160 H0Z" fill="#4f7344"/>
    <path d="M380 58 C390 80 360 96 380 114 S420 140 400 160 H470 C480 140 450 120 470 104 S440 76 430 58Z" fill="#5aa9d6"/>
    <g class="flow" stroke="#e8f6ff" stroke-width="2.4" stroke-linecap="round" fill="none">${[0, 1, 2, 3, 4].map(i => `<path d="M${398 + (i % 2) * 22} ${70 + i * 18}q8 4 16 0" style="animation-delay:-${i * .4}s"/>`).join('')}</g>
    <g class="fish"><text x="0" y="0" font-size="18">🐟</text></g>
    <g transform="translate(560 108)"><path d="M0 0h24v-20a12 12 0 0 0-24 0z" fill="#5c4326"/><g transform="translate(12 6)"><g class="flame"><path d="M-8 0c-3-7 4-9 2-15 6 4 5 9 9 11 1-5 4-7 3-11 6 6 8 12 5 15z" fill="#ff8a3d"/></g></g></g>
    <g class="steam" transform="translate(186 40)"><path d="M0 0c-6-8 6-12 0-20"/><path d="M14 0c-6-8 6-12 0-20"/></g>
    <g transform="translate(170 74)"><rect width="34" height="28" rx="4" fill="#3a3f45"/><rect x="-4" y="-4" width="42" height="6" rx="3" fill="#555"/></g>
    ${floaty(270, 40, '💧', 22, 1)}`); };
  S.bothy = () => svg(`<defs>${grad('bth', '#26324f', '#45577f', '#6b7aa0')}</defs><rect width="800" height="160" fill="url(#bth)"/>
    <path d="M0 96 L150 40 L300 90 L450 30 L600 84 L800 42 V160 H0Z" fill="#e9eef7"/><path d="M0 130 C200 112 500 140 800 120 V160 H0Z" fill="#f4f7fb"/>
    <g transform="translate(340 72)"><rect x="0" y="22" width="120" height="50" fill="#7a7f87"/><path d="M-10 26 L60 -8 L130 26Z" fill="#3b3f46"/><path d="M-10 26 L60 -8 L130 26" stroke="#fff" stroke-width="4" fill="none"/>
      <rect x="90" y="-10" width="14" height="26" fill="#5b5f66"/><rect x="18" y="40" width="22" height="18" fill="#ffd27a" class="window"/><rect x="74" y="36" width="24" height="36" fill="#4a3424"/></g>
    <g class="smoke" fill="#cfd6e3">${[0, 1, 2, 3].map(i => `<circle cx="437" cy="56" r="${6 + i * 2}" style="animation-delay:${i * .9}s"/>`).join('')}</g>
    ${Array.from({ length: 40 }, (_, i) => `<circle class="snow" cx="${R(0, 800, i, 3).toFixed(0)}" cy="-6" r="${R(1, 2.6, i, 5).toFixed(1)}" fill="#fff" style="animation-duration:${R(5, 10, i, 7).toFixed(1)}s;animation-delay:-${R(0, 10, i, 11).toFixed(1)}s;--sway:${R(-30, 30, i, 4).toFixed(0)}px"/>`).join('')}
    ${floaty(580, 120, '🦌', 22, 1)}`);
  S.storm = () => svg(`<defs>${grad('stm', '#1d2233', '#39415c', '#59617d')}</defs><rect width="800" height="160" fill="url(#stm)"/><rect class="lightning-flash" width="800" height="160" fill="#fff"/>
    <g fill="#5a6280">${[[260, 30, 70], [400, 22, 90], [540, 34, 70]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="26"/>`).join('')}</g>
    <path class="bolt" d="M410 40 L392 82 L410 82 L396 120 L432 70 L414 70 L428 40Z" fill="#ffe066"/>
    <g>${drops(50, 'rain', 160, 680, 3)}</g>
    <path d="M0 140 C200 128 500 150 800 132 V160 H0Z" fill="#2b3044"/>
    ${floaty(200, 128, '🦟', 14, 1)}${floaty(620, 120, '🕷️', 14, 2)}`);
  S.field = () => svg(`<defs>${grad('fld', '#bfe3f2', '#e8f2d6', '#d6e6b0')}</defs><rect width="800" height="160" fill="url(#fld)"/>
    <circle cx="640" cy="34" r="20" fill="#ffe08a" class="sun"/>
    <path d="M0 110 C200 96 600 120 800 104 V160 H0Z" fill="#7a9a4a"/>
    ${Array.from({ length: 22 }, (_, i) => { const x = 160 + i * 22; return `<g class="sway" style="animation-delay:-${(i % 5) * .4}s"><path d="M${x} 150 Q${x + 2} 120 ${x} 96" stroke="#c9a24a" stroke-width="2" fill="none"/><ellipse cx="${x}" cy="94" rx="3" ry="8" fill="#e0b85a"/></g>`; }).join('')}
    ${floaty(220, 70, '🥔', 24, 1)}${floaty(580, 80, '🥬', 24, 2)}${floaty(400, 50, '🐝', 18, 0)}`);
  S.printer = () => svg(`${bokeh(14, '#5b8fd633', 4)}
    <rect x="330" y="60" width="140" height="56" rx="10" fill="#d8dde3"/><rect x="345" y="40" width="110" height="24" rx="4" fill="#fff"/><rect x="350" y="104" width="100" height="6" rx="3" fill="#6b737c"/>
    <circle cx="450" cy="76" r="4" fill="#7fd18b" class="sun"/>
    <g class="paper"><rect x="352" y="108" width="96" height="70" fill="#fff"/><g fill="#c9d1db"><rect x="362" y="120" width="60" height="4"/><rect x="362" y="130" width="76" height="4"/><rect x="362" y="140" width="50" height="4"/></g><text x="430" y="128" font-size="12">🦌</text></g>
    ${floaty(230, 70, '🗺️', 26, 1)}${floaty(580, 70, '🎒', 26, 2)}${floaty(600, 130, '🧭', 20, 0)}`);
  S.scales = () => svg(`${bokeh(14, '#f2c94c33', 2)}
    <rect x="396" y="40" width="8" height="100" fill="#c9a24a"/><rect x="360" y="136" width="80" height="10" rx="4" fill="#c9a24a"/>
    <g class="tilt"><rect x="300" y="36" width="200" height="6" rx="3" fill="#d9b25a"/>
      <g class="hang"><line x1="310" y1="40" x2="310" y2="80" stroke="#d9b25a" stroke-width="2"/><path d="M286 80h48a24 12 0 0 1-48 0z" fill="#d9b25a"/><text x="310" y="78" font-size="18" text-anchor="middle">🌿</text></g>
      <g class="hang"><line x1="490" y1="40" x2="490" y2="80" stroke="#d9b25a" stroke-width="2"/><path d="M466 80h48a24 12 0 0 1-48 0z" fill="#d9b25a"/><text x="490" y="78" font-size="18" text-anchor="middle">🏴󠁧󠁢󠁳󠁣󠁴󠁿</text></g></g>
    <circle cx="400" cy="38" r="7" fill="#f5c04a"/>${floaty(220, 60, '⛺', 24, 1)}${floaty(600, 110, '🎣', 22, 2)}`);
  S.hedgerow = () => svg(`<defs>${grad('hdg', '#cfe6c4', '#a9cf8f', '#7fae66')}</defs><rect width="800" height="160" fill="url(#hdg)"/>
    <path d="M0 120 C120 70 220 110 320 80 S520 60 640 96 S760 80 800 90 V160 H0Z" fill="#4f7a3a"/>
    ${Array.from({ length: 16 }, (_, i) => { const x = 140 + i * 34, y = 90 + R(-15, 15, i); return `<g class="sway" style="animation-delay:-${(i % 4) * .5}s"><text x="${x}" y="${y.toFixed(0)}" font-size="${R(18, 26, i, 3).toFixed(0)}" text-anchor="middle">${['🫐', '🌿', '🍓', '🌼', '💜', '🍄', '🌹', '🍃'][i % 8]}</text></g>`; }).join('')}
    <g class="bird"><text font-size="16">🐦</text></g>${floaty(400, 40, '🦋', 20, 1)}`);
  S.danger = () => svg(`<defs>${grad('dng', '#2a1c1c', '#3d2424', '#4a2a2a')}</defs><rect width="800" height="160" fill="url(#dng)"/>
    ${Array.from({ length: 9 }, (_, i) => { const x = 180 + i * 55; return `<g class="sway" style="animation-delay:-${i * .3}s"><path d="M${x} 160 Q${x + 4} 110 ${x} 70" stroke="#5e7a4a" stroke-width="3" fill="none"/>${[0, 1, 2, 3, 4].map(k => `<circle cx="${x + Math.cos(k * 1.26) * 13}" cy="${68 + Math.sin(k * 1.26) * 5}" r="4" fill="#f3efe6"/>`).join('')}</g>`; }).join('')}
    <g transform="translate(400 50)"><g class="warn-pulse"><path d="M0 -30 L32 26 H-32Z" fill="#f5c04a" stroke="#2a1c1c" stroke-width="3"/><text y="20" font-size="28" text-anchor="middle" font-weight="800" fill="#2a1c1c">!</text></g></g>
    ${floaty(230, 40, '☠️', 22, 1)}${floaty(600, 40, '🍄', 22, 2)}`);
  S.haybox = () => { const id = uid(); return svg(`${bokeh(12, '#f2c94c33', 5)}
    <rect x="300" y="60" width="200" height="90" rx="6" fill="#a8743a"/><g stroke="#e6c27a" stroke-width="2" opacity=".8">${Array.from({ length: 30 }, (_, i) => `<line x1="${306 + i * 6.4}" y1="${64 + (i % 3) * 3}" x2="${300 + i * 6.6}" y2="${80 + (i % 4) * 4}"/>`).join('')}</g>
    <defs>${grad(id, '#ffcf6b', '#e98f17', '#a85a06')}</defs>
    <rect x="360" y="40" width="80" height="100" rx="10" fill="url(#${id})" stroke="rgba(255,255,255,.6)" stroke-width="2"/>${bubbles(10, 368, 432, 134, 80, '#fff8', 4, 2.6)}
    <rect x="388" y="26" width="24" height="16" rx="3" fill="#8b5a2b"/><circle class="blip" cx="400" cy="20" r="3" fill="#fff"/>
    <g class="heat" stroke="#ff8a3d" stroke-width="2.4" fill="none" stroke-linecap="round">${[320, 345, 455, 480].map((x, i) => `<path d="M${x} 56c-6-6 6-10 0-16s6-10 0-16" style="animation-delay:${i * .4}s"/>`).join('')}</g>
    ${floaty(230, 60, '❄️', 24, 1)}${floaty(600, 60, '🔥', 24, 2)}${floaty(620, 125, '🌡️', 20, 0)}`); };

  /* ---- Seasonal weather for any month ---- */
  S.season = m => {
    const sky = { w: ['#24324f', '#4a5c86'], sp: ['#9fd0e8', '#dff0d0'], su: ['#7cc0ea', '#ffe6a8'], au: ['#d98a5a', '#f3c58a'] };
    const k = [12, 1, 2].includes(m) ? 'w' : [3, 4, 5].includes(m) ? 'sp' : [6, 7, 8].includes(m) ? 'su' : 'au';
    const land = { w: ['#e9eef7', '#cfd8e6'], sp: ['#7fae66', '#5d8f4a'], su: ['#8a7fb0', '#6b4f8a'], au: ['#b5653a', '#7a4428'] }[k];
    const fx = { w: Array.from({ length: 50 }, (_, i) => `<circle class="snow" cx="${R(0, 800, i, 3).toFixed(0)}" cy="-6" r="${R(1, 2.8, i, 5).toFixed(1)}" fill="#fff" style="animation-duration:${R(5, 10, i, 7).toFixed(1)}s;animation-delay:-${R(0, 10, i, 11).toFixed(1)}s;--sway:${R(-30, 30, i, 4).toFixed(0)}px"/>`).join(''),
      sp: fall(18, ['🌸', '🌼', '🍃'], 3, 16), su: `<circle cx="600" cy="40" r="26" fill="#ffe08a" class="sun"/>${fall(10, ['✨', '🦋', '🐝'], 5, 16, [9, 14])}`,
      au: fall(22, ['🍂', '🍁', '🍂'], 7, 18) }[k];
    const extra = [3, 10, 11].includes(m) ? `<g>${drops(30, 'rain', 0, 800, m)}</g>` : '';
    return svg(`<defs>${grad('sea' + m, sky[k][0], sky[k][1])}</defs><rect width="800" height="160" fill="url(#sea${m})"/>
      <path d="M0 104 L110 56 L220 92 L340 44 L460 88 L590 50 L700 86 L800 62 V160 H0Z" fill="${land[1]}"/>
      <path d="M0 132 C200 112 500 146 800 122 V160 H0Z" fill="${land[0]}"/>
      ${fx}${extra}<text x="400" y="138" text-anchor="middle" font-size="22" font-family="Georgia,serif" font-weight="700" fill="#fff" class="mtitle">${MONTH[m - 1]}</text>`);
  };

  /* ---- Recipe: glass that pours full ---- */
  S.pourGlass = r => {
    const id = uid(), s = r.beer && typeof recipeStats === 'function' ? recipeStats(r) : {};
    const OV = { 'nettle-beer': ['#e9f5a8', '#c9d96a', '#9fb33f'], 'gorse-wine': ['#fff3a0', '#f5d742', '#d9b21a'], 'heather-ale': ['#ffd9a0', '#e5a046', '#b4691b'], 'rowan-wine': ['#ffb27a', '#e0662f', '#a8401a'], 'atholl-brose': ['#fff6e0', '#efdcb3', '#d9bf86'] };
    const col = OV[r.id] || (typeof drinkCols === 'function' ? drinkCols(r.drink, r.beer ? s.srm : null) : DR.beer);
    return svg(`${bokeh(14, col[0] + '33', 2)}
      <g class="poured">${glass(ANIM.kindFor(r.drink), 400, col, id, 1, 3)}</g>
      <path class="pourstream" d="M470 -4 C470 30 430 20 410 40" stroke="${col[1]}" stroke-width="6" fill="none" stroke-linecap="round"/>
      ${floaty(240, 60, DRINK[r.drink]?.em || '✨', 28, 1)}${floaty(560, 70, '✨', 18, 2)}${floaty(600, 125, '🥂', 22, 0)}`);
  };

  /* ---- Register routes (most specific first) ---- */
  ANIM.routes.unshift(
    [/^\/juice$/, () => S.pour()],
    [/^\/calendar$/, () => S.calendar()],
    [/^\/shop$|^\/calc\/planner$/, () => S.basket()],
    [/^\/stats$/, () => S.stats()],
    [/^\/inbox$/, () => S.bell()],
    [/^\/(ref|guides|kit)$/, () => S.book()],
    [/^\/app$/, () => S.gears()],
    [/^\/(whatsnew|features)$/, () => S.cork()],
    [/^\/paths$/, () => S.ladder()],
    [/^\/calc\/timer$/, () => S.boil()],
    [/^\/scotland\/water$/, () => S.burn()],
    [/^\/scotland\/shelter$/, () => S.bothy()],
    [/^\/scotland\/hazards$/, () => S.storm()],
    [/^\/scotland\/living$/, () => S.field()],
    [/^\/scotland\/handbook$/, () => S.printer()],
    [/^\/scotland\/law$/, () => S.scales()],
    [/^\/scotland\/plants$/, () => S.hedgerow()],
    [/^\/scotland\/danger$/, () => S.danger()],
    [/^\/scotland\/brewing$/, () => S.haybox()],
    [/^\/scotland\/month$/, () => S.season(store.get('scot.month', new Date().getMonth() + 1))],
    [/^\/recipe\/([\w-]+)$/, m => { const r = Recipes.find(x => x.id === m[1]); return r ? S.pourGlass(r) : ''; }],
  );
  // Month buttons: swap the weather
  document.addEventListener('click', e => {
    const b = e.target.closest('.mon-pick [data-m]'); if (!b) return;
    setTimeout(() => { const sc = $('#view .scene'); if (sc) sc.innerHTML = S.season(+b.dataset.m); }, 0);
  });

  /* ---- Count-up numbers on stat tiles ---- */
  function countUp(root) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    $$('.stat-v', root).forEach(v => {
      const t = v.firstChild; if (!t || t.nodeType !== 3) return;
      const raw = t.textContent.trim(), m = raw.match(/^(-?)(\d+(?:\.\d+)?)$/); if (!m) return;
      const target = parseFloat(raw), dec = (m[2].split('.')[1] || '').length;
      if (target === 0 || (dec === 3 && target > .9 && target < 1.2)) return; // leave gravities alone
      const t0 = performance.now(), dur = 700;
      const step = now => { const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3); t.textContent = (target * e).toFixed(dec); if (k < 1) requestAnimationFrame(step); else t.textContent = raw; };
      requestAnimationFrame(step);
    });
  }
  window.addEventListener('hashchange', () => setTimeout(() => countUp($('#view')), 30));
  setTimeout(() => { ANIM.place(); countUp($('#view')); }, 30);
})();
