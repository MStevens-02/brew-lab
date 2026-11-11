/* Brew Lab: animation pack 3. Scenes for every calculator, guide and lesson, new scenes (barrels, soap,
   flashcards, quiz, trophy, search), scroll-reveal cards, page transitions, bubbly button ripples,
   a ringing bell for unread notifications and a celebration when you start a batch. */
(() => {
  const { svg, grad, bokeh, floaty, bubbles, R, glass, DR, S } = ANIM;
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- New scenes ---- */
  S.barrels = () => svg(`<defs>${grad('brl', '#141a2e', '#2a2348', '#3a2c4a')}</defs><rect width="800" height="160" fill="url(#brl)"/>
    ${Array.from({ length: 26 }, (_, i) => `<circle class="tw" cx="${R(0, 800, i, 5).toFixed(0)}" cy="${R(5, 80, i, 9).toFixed(0)}" r="${R(.6, 1.6, i).toFixed(1)}" fill="#fff" style="animation-delay:-${R(0, 4, i, 3).toFixed(1)}s"/>`).join('')}
    <circle cx="620" cy="36" r="16" fill="#f5f0d8"/>
    <path d="M0 132 C200 120 520 140 800 126 V160 H0Z" fill="#1d1830"/>
    <g class="roll-wrap"><g class="roll"><ellipse cx="0" cy="0" rx="22" ry="26" fill="#8b5a2b"/><path d="M-22 -8h44M-22 8h44" stroke="#3b2a1a" stroke-width="4"/><ellipse cx="0" cy="0" rx="22" ry="26" fill="none" stroke="#5c3b1c" stroke-width="3"/></g></g>
    <g transform="translate(300 98)"><path d="M0 0h70v36H0z" fill="#3a2f2a"/><path d="M-6 0 L35 -24 L76 0Z" fill="#2a2220"/><rect x="12" y="12" width="14" height="12" fill="#ffd27a" class="window"/></g>
    <g class="smoke" fill="#8a8aa0">${[0, 1, 2].map(i => `<circle cx="360" cy="74" r="${5 + i * 2}" style="animation-delay:${i * 1.1}s"/>`).join('')}</g>
    <g transform="translate(470 120)"><path d="M-14 -24 h28 v14 c10 4 14 10 14 22 a6 6 0 0 1 -6 6 h-44 a6 6 0 0 1 -6 -6 c0 -12 4 -18 14 -22z" fill="#c8743a"/><path d="M0 -24 v-10 q0 -10 12 -10 h34 l6 26" stroke="#c8743a" stroke-width="5" fill="none" stroke-linecap="round"/><circle class="drip" cx="52" cy="4" r="2.4" fill="#e8f4ff"/><g class="flame" ><path d="M-10 18c-3-7 4-9 2-15 6 4 5 9 9 11 1-5 4-7 3-11 6 6 8 12 5 15z" fill="#ff8a3d"/></g></g>
    ${floaty(230, 60, '🥃', 22, 1)}${floaty(560, 100, '🌾', 22, 2)}`);
  S.soap = () => svg(`<defs>${grad('sop', '#bfe8ff', '#8fd0f0', '#5fb3dd')}</defs><rect width="800" height="160" fill="url(#sop)"/>
    ${Array.from({ length: 26 }, (_, i) => `<circle class="soapb" cx="${R(60, 740, i, 3).toFixed(0)}" cy="170" r="${R(6, 22, i, 7).toFixed(0)}" fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.75)" stroke-width="1.5" style="animation-duration:${R(5, 10, i, 5).toFixed(1)}s;animation-delay:-${R(0, 10, i, 11).toFixed(1)}s;--sway:${R(-40, 40, i, 2).toFixed(0)}px"/>`).join('')}
    <g transform="translate(400 150)"><path d="M-30 0v-60c0-10 6-14 14-16v-14h32v14c8 2 14 6 14 16v60z" fill="#fff" opacity=".9"/><rect x="-22" y="-50" width="44" height="26" rx="4" fill="#5fb3dd"/><text y="-31" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">CLEAN</text></g>
    <g class="sparkle">${[[300, 50], [500, 40], [540, 110], [260, 120]].map(([x, y], i) => `<text x="${x}" y="${y}" font-size="20" style="animation-delay:${i * .6}s">✨</text>`).join('')}</g>`);
  S.cards = () => svg(`${bokeh(14, '#bb6bd933', 3)}
    <g transform="translate(400 80)"><g class="cardflip"><rect x="-70" y="-50" width="140" height="100" rx="12" fill="#fdf6ea"/><text class="front" y="8" text-anchor="middle" font-size="22" font-family="Georgia,serif" font-weight="700" fill="#2b2016">Krausen?</text></g></g>
    <g transform="translate(250 90) rotate(-10)"><rect x="-50" y="-36" width="100" height="72" rx="10" fill="#f1e6d3" opacity=".8"/></g>
    <g transform="translate(550 90) rotate(9)"><rect x="-50" y="-36" width="100" height="72" rx="10" fill="#f1e6d3" opacity=".8"/></g>
    ${floaty(190, 40, '🧠', 24, 1)}${floaty(620, 40, '💡', 24, 2)}${floaty(640, 130, '✅', 18, 0)}`);
  S.quiz = () => svg(`${bokeh(16, '#7fd18b33', 6)}
    ${glass('pint', 400, DR.beer, uid(), .9, 4)}
    <g class="qmarks" font-family="Georgia,serif" font-weight="800" fill="#f5a524">${[[300, 60, 34], [500, 50, 40], [270, 120, 26], [540, 125, 28], [600, 80, 22], [210, 80, 22]].map(([x, y, s], i) => `<text x="${x}" y="${y}" font-size="${s}" style="animation-delay:-${i * .7}s">?</text>`).join('')}</g>`);
  S.trophy = () => svg(`${bokeh(18, '#f2c94c44', 8)}
    <g transform="translate(400 0)"><g class="trophy"><path d="M-36 30h72v24c0 26-16 42-36 44-20-2-36-18-36-44z" fill="#f5c04a"/><path d="M-36 38c-22 0-22 30 2 30M36 38c22 0 22 30-2 30" fill="none" stroke="#f5c04a" stroke-width="6"/>
      <rect x="-8" y="96" width="16" height="22" fill="#e0a52a"/><rect x="-30" y="116" width="60" height="14" rx="3" fill="#c98a1a"/><text y="74" text-anchor="middle" font-size="26">🍺</text></g></g>
    <g transform="translate(400 70)"><g class="rays" stroke="#ffe08a" stroke-width="3" stroke-linecap="round">${Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="-70" x2="0" y2="-84" transform="rotate(${i * 30})"/>`).join('')}</g></g>
    <g class="confetti">${Array.from({ length: 22 }, (_, i) => `<rect x="400" y="40" width="6" height="10" rx="1.5" fill="${['#f5a524', '#e5533d', '#7fd18b', '#5b8fd6', '#bb6bd9', '#f2c94c'][i % 6]}" style="--x:${R(-260, 260, i, 3).toFixed(0)}px;--y:${R(-10, 120, i, 5).toFixed(0)}px;--r:${R(-360, 360, i, 7).toFixed(0)}deg;animation-delay:${(i % 4) * .05}s"/>`).join('')}</g>`);
  S.search = () => svg(`${bokeh(16, '#5b8fd633', 4)}
    <g class="scan">${['🍺', '🍷', '🍏', '🍯', '🌿', '🧪', '📖', '🦌'].map((e, i) => `<text x="${240 + i * 46}" y="${i % 2 ? 110 : 70}" font-size="26" text-anchor="middle">${e}</text>`).join('')}</g>
    <g class="lens"><circle cx="0" cy="0" r="30" fill="rgba(255,255,255,.12)" stroke="#fff" stroke-width="5"/><line x1="22" y1="22" x2="46" y2="46" stroke="#fff" stroke-width="9" stroke-linecap="round"/></g>`);

  /* ---- Route mapping: calculators by group, guides by topic, lessons ---- */
  const GUIDE_SCENE = { history: 'barrels', 'distilling-history': 'still', sanitation: 'soap', hydrometer: 'hydro', bottling: 'bottles', safety: 'soap', troubleshooting: 'lab', equipment: 'book', basics: 'lab', 'first-weeks': 'ferment', tasting: 'glasses', ageing: 'bottles', scaling: 'hydro', 'sweet-methods': 'glasses', 'flavours-add': 'glasses', starch: 'field', juice: 'pour', yeast: 'lab', beginner: 'quiz', survival: 'camp', 'survival-still': 'still', scotland: 'hills' };
  const CALC_SCENE = { timer: 'boil', still: 'still', planner: 'basket', forage: 'hedgerow', wheel: 'glasses', swap: 'book', juice: 'pour', yeastpick: 'lab', sim: 'ferment', doctor: 'lab', normal: 'quiz', trainer: 'hydro', labels: 'bottles', bottlecheck: 'bottles', priming: 'bottles', keg: 'bottles', flavours: 'glasses', start: 'quiz', hydrotemp: 'hydro', refrac: 'hydro', abv: 'hydro', sugar: 'hydro', convert: 'gears', units: 'gears', water: 'burn', dilute: 'hydro', mead: 'glasses', sweeten: 'glasses' };
  const GROUP_SCENE = { Beginner: 'quiz', 'Shop juice': 'pour', Essentials: 'hydro', Beer: 'boil', 'Wine, cider & mead': 'glasses', Packaging: 'bottles', 'Distilling (licensed / NZ)': 'still' };
  const run = k => (S[k] ? S[k]() : '');
  ANIM.routes.push(
    [/^\/calc\/([\w-]+)$/, m => { const c = (window.Calcs || []).find(x => x.id === m[1]); const k = CALC_SCENE[m[1]] || (c && GROUP_SCENE[c.group]); if (k) return run(k); return ''; }],
    [/^\/guide\/([\w-]+)$/, m => { const g = Guides.find(x => x.id === m[1]); if (!g) return ''; const k = GUIDE_SCENE[g.id]; if (k) return run(k); return g.drink && ANIM.DR[g.drink] ? ANIM.drinkScene(g.drink) : run('book'); }],
    [/^\/lesson\/(d\d)$/, () => run('still')],
    [/^\/lesson\/\w+$/, () => run('lab')],
    [/^\/flashcards$/, () => run('cards')],
    [/^\/start$/, () => run('quiz')],
    [/^\/more$/, () => run('trophy')],
    [/^\/search$/, () => run('search')],
    [/^\/brew\/[\w-]+$/, () => run('boil')],
    [/^\/log\/new$/, () => run('ferment')],
  );
  // guides/calcs that already have a specific route earlier keep it (earlier routes win)

  /* ---- Scroll reveal ---- */
  const io = 'IntersectionObserver' in window && !reduce() ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -40px 0px' }) : null;
  function reveal(root, quiet) {
    if (!io || !root) return;
    const els = $$('.card, .panel, .menu-item, .lesson, .rung, .stat, .sec-tile, .swap, .dg, .splant, .tool', root).filter(x => !x.closest('.gal, .tour, .scene') && !x.classList.contains('rv'));
    els.forEach((x, i) => {
      const r = x.getBoundingClientRect();
      if (r.top < innerHeight - 20) { x.classList.add('rv', 'in'); if (quiet) x.classList.add('q'); else x.style.animationDelay = Math.min(i, 10) * 35 + 'ms'; return; } // on screen: stagger on page load, no replay on redraws
      x.classList.add('rv'); io.observe(x);
    });
  }
  window.addEventListener('hashchange', () => setTimeout(() => reveal($('#view')), 40));
  setTimeout(() => reveal($('#view')), 60);
  // Content added later (filters, redraws) gets revealed too
  new MutationObserver(ms => { if (!io) return; for (const m of ms) for (const n of m.addedNodes) if (n.nodeType === 1 && n.closest && n.closest('#view')) { reveal(n.parentElement || n, true); return; } })
    .observe(document.body, { childList: true, subtree: true });

  /* ---- Bubbly ripple on buttons ---- */
  document.addEventListener('pointerdown', e => {
    if (reduce()) return;
    const b = e.target.closest('.btn, .chip, .quick a, .menu-item, .subnav a, .seg button, .mon-pick button'); if (!b) return;
    const r = b.getBoundingClientRect(), d = document.createElement('span'); d.className = 'ripple';
    d.style.left = (e.clientX - r.left) + 'px'; d.style.top = (e.clientY - r.top) + 'px';
    if (getComputedStyle(b).position === 'static') b.style.position = 'relative';
    b.style.overflow = 'hidden'; b.appendChild(d); setTimeout(() => d.remove(), 650);
  });

  /* ---- Bell rings when there's something unread ---- */
  setInterval(() => {
    const bell = $('.tb-icons a[data-nav="inbox"][data-badge]');
    if (!bell || reduce() || document.hidden) return;
    bell.classList.remove('ringing'); void bell.offsetWidth; bell.classList.add('ringing');
  }, 9000);

  /* ---- Celebrate a new batch ---- */
  window.addEventListener('hashchange', e => {
    if (/#\/log\/new/.test(e.oldURL || '') && /#\/log\/(?!new)[\w-]+$/.test(location.hash)) setTimeout(() => { ANIM.burst(innerWidth / 2, innerHeight * .35, 34); typeof toast === 'function' && toast('🎉 Batch started! Good luck, brewer.'); }, 250);
  });

  /* ---- Smooth page transitions ---- */
  window.addEventListener('hashchange', () => { const v = $('#view > div'); if (v && !reduce()) { v.classList.remove('pg-in'); void v.offsetWidth; v.classList.add('pg-in'); } });
})();
