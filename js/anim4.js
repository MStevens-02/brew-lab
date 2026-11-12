/* Brew Lab: animation pack 4. Interactive and ambient animation:
   splash pour, tap-to-play scenes, tap-to-pour hero, cheers clink on ratings, Scottish festive effects,
   ambient background bubbles, bouncing nav, filling progress bars, animated empty states,
   and an Animations settings panel (Full / Calm / Off + toggles). */
(() => {
  const pref = () => store.get('anim', { level: 'full', ambient: true, festive: true });
  const off = () => pref().level === 'off' || matchMedia('(prefers-reduced-motion: reduce)').matches;
  const applyLevel = () => { const p = pref(); document.documentElement.dataset.anim = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'off' : p.level; };
  applyLevel();

  /* ---- Splash: a pint pours as the app opens (once per session) ---- */
  if (!off() && !sessionStorage.getItem('bl.splash')) {
    sessionStorage.setItem('bl.splash', '1');
    const sp = document.createElement('div'); sp.className = 'splash';
    sp.innerHTML = `<svg viewBox="0 0 120 160" class="sp-glass"><defs><linearGradient id="spg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd27a"/><stop offset="1" stop-color="#d9770a"/></linearGradient>
      <clipPath id="spc"><path d="M22 20h76l-8 124a8 8 0 0 1-8 7H38a8 8 0 0 1-8-7z"/></clipPath></defs>
      <path class="sp-stream" d="M60 -10 V120" stroke="#f0a020" stroke-width="7" stroke-linecap="round"/>
      <g clip-path="url(#spc)"><rect class="sp-fill" x="10" y="20" width="100" height="135" fill="url(#spg)"/><rect class="sp-foam" x="10" y="14" width="100" height="16" rx="6" fill="#fff8ea"/></g>
      <path d="M22 20h76l-8 124a8 8 0 0 1-8 7H38a8 8 0 0 1-8-7z" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="3"/></svg>
      <div class="sp-name">Brew <b>Lab</b></div>`;
    document.documentElement.appendChild(sp);
    setTimeout(() => sp.classList.add('out'), 1250);
    setTimeout(() => sp.remove(), 1700);
    sp.addEventListener('click', () => sp.remove());
  }

  /* ---- Tap a scene: bubble burst + the scene speeds up for a moment ---- */
  document.addEventListener('click', e => {
    const sc = e.target.closest('.scene'); if (!sc || off()) return;
    ANIM.burst(e.clientX, e.clientY, 18);
    sc.classList.remove('boost'); void sc.offsetWidth; sc.classList.add('boost');
    setTimeout(() => sc.classList.remove('boost'), 1800);
  });

  /* ---- Tap the hero glass to pour a fresh pint ---- */
  document.addEventListener('click', e => {
    const g = e.target.closest('.hero .glass'); if (!g || off()) return;
    g.classList.remove('pouring'); void g.offsetWidth; g.classList.add('pouring');
    const r = g.getBoundingClientRect(); setTimeout(() => ANIM.burst(r.left + r.width / 2, r.top + r.height * .25, 22), 900);
    const n = store.get('pints', 0) + 1; store.set('pints', n);
    if ([1, 10, 50, 100].includes(n)) setTimeout(() => toast(n === 1 ? '🍺 Cheers! Tap again for another.' : `🍺 That's ${n} virtual pints poured!`), 1000);
  });

  /* ---- Cheers clink when you rate a batch ---- */
  document.addEventListener('click', e => {
    const s = e.target.closest('[data-rate]'); if (!s || off()) return;
    if (+s.dataset.rate < 4) return;
    const c = document.createElement('div'); c.className = 'clink';
    c.innerHTML = '<span class="cl-l">🍺</span><span class="cl-r">🍺</span><span class="cl-t">Cheers!</span>';
    c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px';
    document.body.appendChild(c); setTimeout(() => c.remove(), 1500);
  }, true);

  /* ---- Ambient background bubbles ---- */
  function ambient() {
    $('.ambient')?.remove();
    if (off() || !pref().ambient || pref().level === 'calm') return;
    const a = document.createElement('div'); a.className = 'ambient'; a.setAttribute('aria-hidden', 'true');
    a.innerHTML = Array.from({ length: 16 }, (_, i) => `<i style="left:${(i * 61) % 100}%;width:${6 + (i * 7) % 16}px;height:${6 + (i * 7) % 16}px;animation-duration:${14 + (i * 5) % 16}s;animation-delay:-${(i * 3.7) % 20}s"></i>`).join('');
    document.body.prepend(a);
  }

  /* ---- Scottish festive effects ---- */
  const FESTIVE = () => {
    const d = new Date(), m = d.getMonth() + 1, day = d.getDate();
    if (m === 11 && day >= 28 || m === 12 && day <= 1) return { k: 'andrew', msg: '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Happy St Andrew\'s Day (30 November)!', items: ['🏴󠁧󠁢󠁳󠁣󠁴󠁿', '✨'] };
    if (m === 12 && day >= 30 || m === 1 && day <= 2) return { k: 'hogmanay', msg: '🎆 Happy Hogmanay! Lang may yer lum reek.', fireworks: true };
    if (m === 1 && day >= 23 && day <= 26) return { k: 'burns', msg: '🥃 Burns Night (25 January): slàinte mhath! Try an Atholl brose.', items: ['🥃', '📜', '🌹'], href: '#/recipe/atholl-brose' };
    if (m === 12) return { k: 'snow', msg: '❄️ Winter brewing season: time for a warming mead.', snow: true };
    if (m === 10 && day >= 28 || m === 11 && day <= 1) return { k: 'halloween', msg: '🎃 Samhain / Halloween: a good night for a spiced cider.', items: ['🦇', '🎃', '🍂'] };
    if (m === 11 && day >= 4 && day <= 6) return { k: 'bonfire', msg: '🎇 Bonfire Night!', fireworks: true };
    return null;
  };
  function festive(rebuild) {
    const f = FESTIVE();
    if (rebuild) { $('.festive')?.remove(); $('.fest-banner')?.remove(); }
    if (!f || off() || !pref().festive) { $('.festive')?.remove(); $('.fest-banner')?.remove(); return; }
    if ($('.festive')) return banner(f);
    const L = document.createElement('div'); L.className = 'festive'; L.setAttribute('aria-hidden', 'true');
    if (f.snow) L.innerHTML = Array.from({ length: 36 }, (_, i) => `<i class="fsnow" style="left:${(i * 37) % 100}%;animation-duration:${7 + (i * 3) % 9}s;animation-delay:-${(i * 1.3) % 12}s;--s:${2 + (i % 4)}px"></i>`).join('');
    else if (f.fireworks) L.innerHTML = Array.from({ length: 5 }, (_, i) => `<span class="fw" style="left:${15 + i * 17}%;top:${12 + (i % 3) * 12}%;animation-delay:${i * .9}s;--c:${['#f5a524', '#e5533d', '#7fd18b', '#5b8fd6', '#bb6bd9'][i]}">${Array.from({ length: 12 }, (_, k) => `<b style="--a:${k * 30}deg"></b>`).join('')}</span>`).join('');
    else L.innerHTML = Array.from({ length: 18 }, (_, i) => `<i class="ffall" style="left:${(i * 53) % 100}%;animation-duration:${8 + (i * 3) % 8}s;animation-delay:-${(i * 1.7) % 14}s">${f.items[i % f.items.length]}</i>`).join('');
    document.body.appendChild(L);
    banner(f);
  }
  function banner(f) {
    const hero = $('#view .hero');
    if (hero && !$('#view .fest-banner')) hero.insertAdjacentHTML('beforebegin', `<${f.href ? `a href="${f.href}"` : 'div'} class="fest-banner">${f.msg}</${f.href ? 'a' : 'div'}>`);
  }

  /* ---- Animated empty states ---- */
  function emptyStates(root) {
    if (off()) return;
    $$('.empty .big', root).forEach(b => {
      if (b.dataset.anim) return; b.dataset.anim = 1;
      if (/📒|🍺|🧪/.test(b.textContent) && typeof tankSVG === 'function') b.innerHTML = `<span class="empty-tank">${tankSVG({ id: 'empty', drink: 'beer', start: today(), status: 'Primary', readings: [] })}</span>`;
    });
  }

  /* ---- Progress bars fill from empty ---- */
  function fillBars(root) {
    if (off()) return;
    $$('.ladder-prog > div, .pbar i, .prog > div, .bar-fill', root).forEach(b => {
      if (b.dataset.filled) return; b.dataset.filled = 1;
      const w = b.style.width; if (!w) return;
      b.style.transition = 'none'; b.style.width = '0%'; void b.offsetWidth;
      b.style.transition = 'width .9s cubic-bezier(.2,.8,.3,1)'; requestAnimationFrame(() => b.style.width = w);
    });
  }

  /* ---- Animations settings panel ---- */
  const _pa = pageApp;
  pageApp = function (el) {
    _pa(el);
    const p = pref();
    const box = document.createElement('div'); box.className = 'panel'; box.style.marginTop = '16px';
    box.innerHTML = `<h3 style="margin-top:0">🫧 Animations</h3>
      <div id="alv"></div>
      <label class="tog"><input type="checkbox" id="aamb" ${p.ambient ? 'checked' : ''}> Background bubbles</label>
      <label class="tog"><input type="checkbox" id="afes" ${p.festive ? 'checked' : ''}> Festive effects (St Andrew's Day, Hogmanay, Burns Night, winter snow)</label>
      <p class="note">Full: everything moves. Calm: scenes and effects stay, but no background bubbles or slide-ins. Off: everything stays still (also automatic if your phone has "reduce motion" on).</p>`;
    el.appendChild(box);
    seg($('#alv', box), [['full', '✨ Full'], ['calm', '🌙 Calm'], ['off', '⏸ Off']], p.level, v => { const q = pref(); q.level = v; store.set('anim', q); applyLevel(); ambient(); festive(true); toast('Animations: ' + v); });
    $('#aamb', box).onchange = e => { const q = pref(); q.ambient = e.target.checked; store.set('anim', q); ambient(); };
    $('#afes', box).onchange = e => { const q = pref(); q.festive = e.target.checked; store.set('anim', q); festive(true); };
  };

  /* ---- Bounce the nav icon you tap ---- */
  document.addEventListener('click', e => {
    const a = e.target.closest('.bottom a, .navlink, .tb-icons a'); if (!a || off()) return;
    a.classList.remove('hop'); void a.offsetWidth; a.classList.add('hop');
  });

  const after = () => { const v = $('#view'); emptyStates(v); fillBars(v); festive(); };
  window.addEventListener('hashchange', () => setTimeout(after, 60));
  setTimeout(() => { ambient(); after(); }, 80);
  new MutationObserver(ms => { for (const m of ms) for (const n of m.addedNodes) if (n.nodeType === 1 && n.closest?.('#view')) { fillBars(n.parentElement || n); return; } })
    .observe(document.body, { childList: true, subtree: true });
})();
