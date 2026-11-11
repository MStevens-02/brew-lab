/* Brew Lab — appearance (theme, text size), favourites, recently viewed, welcome card,
   brewing stats, batch photos/cost/brew-again, keyboard shortcuts. Hooks in after each page render. */

/* ---------- Appearance ---------- */
function applyAppearance() {
  let t = store.get('theme', 'auto');
  if (t === 'auto') t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  document.documentElement.dataset.theme = t;
  $('meta[name="theme-color"]')?.setAttribute('content', t === 'light' ? '#f6f0e7' : '#110d0a');
  const s = store.get('textsize', 'm');
  document.documentElement.classList.remove('ts-l', 'ts-xl');
  if (s !== 'm') document.documentElement.classList.add('ts-' + s);
}
matchMedia('(prefers-color-scheme: light)').addEventListener?.('change', () => { if (store.get('theme', 'auto') === 'auto') applyAppearance(); });
applyAppearance();

const _pageApp = pageApp;
pageApp = function (el) {
  _pageApp(el);
  const box = document.createElement('div');
  box.className = 'panel';
  box.innerHTML = `<h3 style="margin-top:0">🎨 Appearance</h3>
    <div class="field"><label>Theme</label><div id="thm"></div></div>
    <div class="field" style="margin-top:12px"><label>Text size</label><div id="tsz"></div></div>
    <p class="note" style="margin-top:10px">"Auto" follows your phone or computer's light/dark setting.</p>`;
  $('.grid', el).prepend(box);
  seg($('#thm', box), [['auto', '🌗 Auto'], ['dark', '🌙 Dark'], ['light', '☀️ Light']], store.get('theme', 'auto'), v => { store.set('theme', v); applyAppearance(); });
  seg($('#tsz', box), [['m', 'A'], ['l', 'A+'], ['xl', 'A++']], store.get('textsize', 'm'), v => { store.set('textsize', v); applyAppearance(); });
};

/* ---------- Favourites & recently viewed ---------- */
const getFavs = () => store.get('favs', []);
const isFav = k => getFavs().some(f => f.k === k);
function toggleFav(item) {
  let f = getFavs();
  if (f.some(x => x.k === item.k)) { f = f.filter(x => x.k !== item.k); toast('Removed from favourites'); }
  else { f.unshift(item); toast('Saved to favourites ♥'); }
  store.set('favs', f.slice(0, 40));
}
function pageInfo() {
  const path = (location.hash.slice(1) || '/').split('?')[0];
  let m;
  if ((m = path.match(/^\/recipe\/([\w-]+)$/))) { const r = Recipes.find(x => x.id === m[1]); return r && { k: 'r:' + r.id, t: r.name, h: '#/recipe/' + r.id, em: DRINK[r.drink]?.em || '🍺', kind: 'Recipe' }; }
  if ((m = path.match(/^\/guide\/([\w-]+)$/))) { const g = Guides.find(x => x.id === m[1]); return g && { k: 'g:' + g.id, t: g.title, h: '#/guide/' + g.id, em: '📘', kind: 'Guide' }; }
  if ((m = path.match(/^\/calc\/([\w-]+)$/))) { const c = Calcs.find(x => x.id === m[1]); return c && c.id !== 'start' && { k: 'c:' + c.id, t: c.title, h: '#/calc/' + c.id, em: '🧮', kind: 'Tool' }; }
  return null;
}
function afterRender() {
  const view = $('#view'); if (!view) return;
  const info = pageInfo();
  if (info) {
    // recently viewed
    const rec = store.get('recent', []).filter(x => x.k !== info.k); rec.unshift(info); store.set('recent', rec.slice(0, 8));
    // favourite heart next to the title
    const h1 = $('h1', view);
    if (h1 && !$('.fav', h1)) {
      h1.insertAdjacentHTML('beforeend', ` <button class="fav ${isFav(info.k) ? 'on' : ''}" aria-label="Favourite" title="Save to favourites">${isFav(info.k) ? '♥' : '♡'}</button>`);
      $('.fav', h1).onclick = e => { toggleFav(info); e.currentTarget.classList.toggle('on'); e.currentTarget.textContent = isFav(info.k) ? '♥' : '♡'; };
    }
  }
  const path = (location.hash.slice(1) || '/').split('?')[0];
  if (path === '/' || path === '') homeExtras(view);
}
function chipList(items) {
  return `<div class="chips">${items.map(x => `<a class="chip" href="${x.h}"><span>${x.em}</span><span>${esc(x.t)}</span><small>${x.kind}</small></a>`).join('')}</div>`;
}
function homeExtras(view) {
  const hero = $('.hero', view); if (!hero || $('#home-extra', view)) return;
  const favs = getFavs(), rec = store.get('recent', []);
  let html = '';
  if (!store.get('welcomed', false)) {
    html += `<div class="welcome panel fade-in"><button class="x" id="wclose" aria-label="Dismiss" style="position:absolute;top:10px;right:10px;width:34px;height:34px">×</button>
      <div class="eyebrow">👋 Welcome to Brew Lab</div><h2 style="margin:8px 0 6px">Never brewed before? Start here.</h2>
      <div class="welcome-steps">
        <a href="#/start"><b>1</b><span><strong>Take the 1-minute quiz</strong><br><small>Get the perfect first recipe + shopping list</small></span></a>
        <a href="#/recipe/bottle-cider"><b>2</b><span><strong>Or just try bottle cider</strong><br><small>Apple juice + yeast. About £3, no equipment</small></span></a>
        <a href="#/app"><b>3</b><span><strong>Install the app</strong><br><small>Works offline, with reminders and a calendar</small></span></a>
      </div></div>`;
  }
  if (favs.length) html += `<div class="section-h"><h2>♥ Your favourites</h2></div>${chipList(favs.slice(0, 10))}`;
  if (rec.length) html += `<div class="section-h"><h2>Jump back in</h2></div>${chipList(rec.slice(0, 6))}`;
  const wrap = document.createElement('div'); wrap.id = 'home-extra'; wrap.innerHTML = html;
  ($('.quick', view) || hero).after(wrap);
  $('#wclose', wrap)?.addEventListener('click', () => { store.set('welcomed', true); $('.welcome', wrap).remove(); });
}
window.addEventListener('hashchange', () => setTimeout(afterRender, 0));
setTimeout(afterRender, 0);

/* ---------- Keyboard shortcuts (desktop) ---------- */
document.addEventListener('keydown', e => {
  if (e.target.matches('input, textarea, select') || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key === '/') { e.preventDefault(); location.hash = '#/search'; }
  const map = { h: '#/', g: '#/guides', c: '#/calcs', r: '#/recipes', l: '#/log', k: '#/calendar' };
  if (map[e.key]) location.hash = map[e.key];
});

/* ---------- Batch: cost, brew again, photos ---------- */
function shrinkImage(file, max = 900, q = 0.72) {
  return new Promise((res, rej) => {
    const img = new Image(); const url = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url); res(c.toDataURL('image/jpeg', q));
    };
    img.onerror = rej; img.src = url;
  });
}
const _batchExtras = window.batchExtras;
window.batchExtras = (box, b, redraw) => {
  _batchExtras(box, b, redraw);
  const L = b.L || 0, pints = L / 0.568, bottles = b.bottles || Math.floor(L * 1000 / (b.bottleMl || 500));
  const extra = document.createElement('div');
  extra.innerHTML = `
    <h2>Photos</h2>
    <div class="photos">${(b.photos || []).map((p, i) => `<div class="ph"><img src="${p}" alt="Batch photo ${i + 1}" loading="lazy"><button class="x" data-pdel="${i}" aria-label="Delete photo">×</button></div>`).join('')}
      ${(b.photos || []).length < 4 ? `<label class="ph add-ph"><input type="file" accept="image/*" id="pin" hidden><span>📷<br>Add photo</span></label>` : ''}</div>
    <p class="note">Up to 4 photos, shrunk to save space on your phone. Great for tracking colour and clarity.</p>
    <h2>Cost</h2>
    <div class="panel"><div class="fields">
      <div class="field"><label>Ingredients cost</label><div class="inp"><input id="bcost" type="number" step="0.5" inputmode="decimal" value="${b.cost ?? ''}" placeholder="e.g. 12" class="has-u"><span class="u">£</span></div></div>
      <div class="field"><label>Shop price to compare (per pint)</label><div class="inp"><input id="bshop" type="number" step="0.1" inputmode="decimal" value="${b.shopPrice ?? 5.5}" class="has-u"><span class="u">£</span></div></div>
    </div>${b.cost ? `<div class="stats" style="margin-top:12px">${stat('Per pint', '£' + fmt(b.cost / pints, 2))}${stat('Per bottle', '£' + fmt(b.cost / Math.max(1, bottles), 2), '', `${bottles} bottles`)}${stat('Saved vs shop', '£' + fmt(Math.max(0, (b.shopPrice ?? 5.5) * pints - b.cost), 0), '', `on ${fmt(pints, 0)} pints`)}</div>` : ''}</div>
    <div class="btns" style="margin-top:18px"><a class="btn" href="#/log/new?name=${encodeURIComponent(b.name + ' (again)')}&drink=${b.drink}&og=${(b.og || 1.05).toFixed(3)}&L=${b.L}&yeast=${encodeURIComponent(b.yeast || '')}">🔁 Brew this again</a>
      <a class="btn ghost" href="#/calc/labels">🏷️ Make labels</a></div>`;
  box.appendChild(extra);
  extra.addEventListener('change', async e => {
    if (e.target.id === 'bcost' || e.target.id === 'bshop') {
      b[e.target.id === 'bcost' ? 'cost' : 'shopPrice'] = parseFloat(e.target.value) || 0; saveBatch(b); redraw();
    }
    if (e.target.id === 'pin' && e.target.files[0]) {
      try {
        const data = await shrinkImage(e.target.files[0]);
        const before = b.photos ? [...b.photos] : [];
        b.photos = [...before, data];
        try { localStorage.setItem('bl.test', data); localStorage.removeItem('bl.test'); saveBatch(b); toast('Photo added'); }
        catch (err) { b.photos = before; toast('Phone storage is full. Delete an old photo first'); }
        redraw();
      } catch (err) { toast('Couldn\'t read that image'); }
    }
  });
  extra.addEventListener('click', e => {
    const d = e.target.closest('[data-pdel]'); if (d && confirm('Delete this photo?')) { b.photos.splice(+d.dataset.pdel, 1); saveBatch(b); redraw(); }
    const img = e.target.closest('.ph img'); if (img) { const w = window.open(); if (w) w.document.write(`<body style="margin:0;background:#000;display:grid;place-items:center;min-height:100vh"><img src="${img.src}" style="max-width:100%;max-height:100vh">`); }
  });
};

/* ---------- Stats dashboard ---------- */
function pageStats(el) {
  const bs = getBatches();
  if (!bs.length) {
    el.innerHTML = `<div class="eyebrow">Stats</div><h1>Your brewing stats</h1><div class="empty"><div class="big">📊</div><p>Log your first batch and your stats appear here: litres brewed, favourite drinks, money saved and more.</p><a class="btn pri" href="#/log/new">Start a batch</a></div>`;
    return;
  }
  const abvOf = b => { const l = latest(b); return Calc.abv(b.og, l ? l.sg : b.og); };
  const litres = bs.reduce((a, b) => a + (b.L || 0), 0);
  const rated = bs.filter(b => b.rating);
  const costed = bs.filter(b => b.cost);
  const saved = costed.reduce((a, b) => a + Math.max(0, (b.shopPrice ?? 5.5) * (b.L / 0.568) - b.cost), 0);
  const byDrink = {}; bs.forEach(b => { byDrink[b.drink] = (byDrink[b.drink] || 0) + (b.L || 0); });
  const readings = bs.reduce((a, b) => a + (b.readings || []).length, 0);
  const best = rated.slice().sort((a, b) => b.rating - a.rating)[0];
  const strongest = bs.slice().sort((a, b) => abvOf(b) - abvOf(a))[0];
  const ladderDone = Object.values(store.get('ladder', {})).filter(Boolean).length;
  // litres per month, last 12 months
  const months = []; const d0 = new Date(); d0.setDate(1);
  for (let i = 11; i >= 0; i--) { const d = new Date(d0); d.setMonth(d.getMonth() - i); months.push(d.toISOString().slice(0, 7)); }
  const perM = months.map(m => bs.filter(b => (b.start || '').startsWith(m)).reduce((a, b) => a + (b.L || 0), 0));
  const maxM = Math.max(1, ...perM);
  const total = Object.values(byDrink).reduce((a, v) => a + v, 0) || 1;
  el.innerHTML = `<div class="eyebrow">Stats</div><h1>Your brewing stats</h1><p class="lead">Everything you've brewed with Brew Lab on this device.</p>
    <div class="stats">
      ${stat('Brewed', fmt(litres, 1), 'L', `≈ ${fmt(litres / 0.568, 0)} pints`, 'big')}
      ${stat('Batches', bs.length, '', `${bs.filter(b => b.status !== 'Finished').length} on the go`)}
      ${stat('Average ABV', fmt(bs.reduce((a, b) => a + abvOf(b), 0) / bs.length, 1), '%')}
      ${stat('Gravity readings', readings)}
      ${stat('Average rating', rated.length ? fmt(rated.reduce((a, b) => a + b.rating, 0) / rated.length, 1) + '★' : '—', '', `${rated.length} rated`)}
      ${stat('Saved vs shop', costed.length ? '£' + fmt(saved, 0) : '—', '', costed.length ? `${costed.length} batches costed` : 'add costs on batch pages')}
      ${stat('In the cellar', bs.reduce((a, b) => a + (b.bottles || 0), 0), 'bottles')}
      ${stat('Skill rungs done', ladderDone, '', '<a href="#/paths">ladders →</a>')}
    </div>
    <div class="grid two" style="margin-top:18px">
      <div class="panel"><h3 style="margin-top:0">Litres per month</h3>
        <div class="bars">${perM.map((v, i) => `<div class="bar-col"><div class="bar" style="height:${v / maxM * 100}%" title="${fmt(v, 1)} L"></div><span>${new Date(months[i] + '-01').toLocaleDateString('en-GB', { month: 'narrow' })}</span></div>`).join('')}</div></div>
      <div class="panel"><h3 style="margin-top:0">What you brew</h3>
        <div class="stack">${Object.entries(byDrink).map(([k, v]) => `<div style="flex:${v};background:${DRINK[k]?.c}" title="${DRINK[k]?.name}: ${fmt(v, 1)} L"></div>`).join('')}</div>
        <div class="adds" style="margin-top:12px">${Object.entries(byDrink).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<div class="add" style="grid-template-columns:28px 1fr auto"><span>${DRINK[k]?.em}</span><span>${DRINK[k]?.name}</span><span class="num">${fmt(v, 1)} L · ${fmt(v / total * 100, 0)}%</span></div>`).join('')}</div></div>
    </div>
    <div class="grid two" style="margin-top:16px">
      ${best ? `<a class="card" href="#/log/${best.id}"><div class="eyebrow">🏆 Best rated</div><h3 style="margin-top:8px">${esc(best.name)}</h3><p>${'★'.repeat(best.rating)}${'☆'.repeat(5 - best.rating)}</p></a>` : ''}
      <a class="card" href="#/log/${strongest.id}"><div class="eyebrow">💪 Strongest</div><h3 style="margin-top:8px">${esc(strongest.name)}</h3><p>${fmt(abvOf(strongest), 1)}% ABV</p></a>
    </div>`;
}
