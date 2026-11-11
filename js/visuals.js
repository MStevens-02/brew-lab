/* Brew Lab: visual features. Live animated fermenters for every batch, recipe-card glasses,
   a tap-to-build flavour wheel (saved to tasting notes), a Scottish seasons wheel and an ingredient swaps finder. */

/* ---------- Colours ---------- */
function drinkCols(drink, srm) {
  if (srm != null && !isNaN(srm)) { const h = Calc.srmHex(Math.max(2, srm)); return [Calc.srmHex(Math.max(1, srm * .55)), h, Calc.srmHex(Math.min(40, srm * 1.4 + 1))]; }
  return ANIM.DR[drink] || ANIM.DR[{ juice: 'cider' }[drink]] || ANIM.DR.beer;
}

/* ---------- Recipe card glass ---------- */
function miniGlass(r) {
  const s = r.beer ? (typeof recipeStats === 'function' ? recipeStats(r) : {}) : {};
  const OV = { 'nettle-beer': ['#e9f5a8', '#c9d96a', '#9fb33f'], 'gorse-wine': ['#fff3a0', '#f5d742', '#d9b21a'], 'heather-ale': ['#ffd9a0', '#e5a046', '#b4691b'], 'rowan-wine': ['#ffb27a', '#e0662f', '#a8401a'], 'orkney-ale': ['#f6c37a', '#c98a3c', '#8f5a1d'], 'atholl-brose': ['#fff6e0', '#efdcb3', '#d9bf86'], 'wild-yeast-starter': ['#fbe7c8', '#e8c99a', '#cfa56b'] };
  const col = OV[r.id] || drinkCols(r.drink, r.beer ? s.srm : null), id = uid();
  return `<svg class="rc-glass" viewBox="340 0 120 160" aria-hidden="true">${ANIM.glass(ANIM.kindFor(r.drink), 400, col, id, 1, r.id.length)}</svg>`;
}

/* ---------- Batch fermenter ---------- */
function batchPhase(b) {
  const day = daysBetween(b.start, today()), st = b.status || '';
  const slowAt = ['wine', 'mead', 'wild', 'scot', 'potato', 'misc'].includes(b.drink) ? 12 : 6;
  if (st === 'Finished') return { k: 'done', act: 0, label: 'Finished', desc: 'All done. Cheers! 🍻' };
  if (st === 'Planned') return { k: 'plan', act: 0, label: 'Planned', desc: 'Not started yet.' };
  if (/Bottled|Conditioning/.test(st)) return { k: 'cond', act: .25, label: 'Conditioning', desc: 'Fizz is building in the bottles. Keep them room-warm for 2 weeks.' };
  if (/Ageing/.test(st)) return { k: 'age', act: .05, label: 'Ageing', desc: 'Patience: flavours are smoothing out.' };
  if (typeof isStable === 'function' && isStable(b)) return { k: 'clear', act: .1, label: 'Clearing', desc: 'Fermentation has finished. The yeast is dropping out and it\'s clearing.' };
  if (day < 1) return { k: 'lag', act: .3, label: 'Waking up', desc: 'Lag phase: the yeast is waking up and multiplying. Bubbles start within 12–48 hours.' };
  if (day <= slowAt) return { k: 'active', act: 1, label: 'Fermenting hard', desc: 'Active fermentation: lots of foam and airlock bubbles. Keep the temperature steady.' };
  return { k: 'slow', act: .5, label: 'Slowing down', desc: 'The yeast is finishing off the last sugars and cleaning up flavours.' };
}
function tankSVG(b, big) {
  const ph = batchPhase(b), id = uid(), col = drinkCols(b.drink, b.srm), a = ph.act;
  const n = Math.round(a * 14), clear = ['clear', 'cond', 'age', 'done'].includes(ph.k);
  const level = ph.k === 'plan' ? 0 : ph.k === 'done' ? 30 : 92;
  return `<svg class="tank ${big ? 'big' : ''}" viewBox="0 0 100 130" aria-hidden="true"><defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${col[0]}"/><stop offset=".6" stop-color="${col[1]}"/><stop offset="1" stop-color="${col[2]}"/></linearGradient>
    <clipPath id="${id}c"><rect x="16" y="32" width="68" height="94" rx="14"/></clipPath></defs>
    <g clip-path="url(#${id}c)">
      <rect x="10" y="${126 - level}" width="80" height="${level + 4}" fill="url(#${id})"/>
      ${clear ? '' : `<rect x="10" y="${126 - level}" width="80" height="${level}" fill="#fff" opacity="${.12 + a * .12}"/>`}
      ${a >= .8 ? `<rect class="krausen" x="10" y="${122 - level}" width="80" height="9" rx="4" fill="#fff6e0" opacity=".95"/>` : ''}
      ${level ? `<g style="--h:-${level - 10}px">${n ? ANIM.bubbles(n, 22, 78, 122, level - 10, '#fff8', b.id.length, 2.4) : ''}</g>` : ''}
      ${clear && level ? `<ellipse cx="50" cy="125" rx="30" ry="4" fill="#5c4326" opacity=".7"/>` : ''}
      <rect x="22" y="36" width="8" height="84" rx="4" fill="#fff" opacity=".14"/></g>
    <rect x="16" y="32" width="68" height="94" rx="14" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="2.5"/>
    <rect x="38" y="20" width="24" height="14" rx="3" fill="#8b5a2b"/>
    ${ph.k === 'plan' || ph.k === 'done' ? '' : `<path d="M47 20V10h6v10" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="2"/><rect x="42" y="0" width="16" height="11" rx="3" fill="rgba(255,255,255,.2)" stroke="rgba(255,255,255,.75)" stroke-width="1.6"/>
      ${a >= .25 ? `<circle class="blip" cx="50" cy="6" r="2.6" fill="#fff" style="animation-duration:${(3.2 - a * 2.2).toFixed(1)}s"/><circle class="blip b2" cx="50" cy="6" r="2" fill="#fff" style="animation-duration:${(3.2 - a * 2.2).toFixed(1)}s;animation-delay:${(1.6 - a * 1.1).toFixed(1)}s"/>` : ''}`}
    ${ph.k === 'done' ? `<text x="50" y="86" text-anchor="middle" font-size="26">🍻</text>` : ph.k === 'plan' ? `<text x="50" y="88" text-anchor="middle" font-size="24">📝</text>` : ''}
  </svg>`;
}
function tankMini(b) { return `<div class="tank-mini">${tankSVG(b)}</div>`; }
function progressRing(p, label, sub) {
  const r = 34, c = 2 * Math.PI * r, v = Math.max(0, Math.min(1, p));
  return `<svg class="pring" viewBox="0 0 90 90"><circle cx="45" cy="45" r="${r}" fill="none" stroke="var(--line)" stroke-width="8"/>
    <circle cx="45" cy="45" r="${r}" fill="none" stroke="var(--amber)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${(c * (1 - v)).toFixed(1)}" transform="rotate(-90 45 45)" class="ring-v"/>
    <text x="45" y="45" text-anchor="middle" font-size="17" font-weight="700" style="fill:var(--text)">${label}</text><text x="45" y="60" text-anchor="middle" font-size="9" style="fill:var(--muted)">${sub}</text></svg>`;
}
function tankHero(b) {
  const ph = batchPhase(b), day = Math.max(0, daysBetween(b.start, today()));
  const ms = typeof milestones === 'function' ? milestones(b) : [];
  const end = ms.length ? daysBetween(b.start, ms[ms.length - 1].d) : 30;
  const next = ms.find(m => m.d >= today());
  const nd = next ? daysBetween(today(), next.d) : null;
  return `<div class="panel tank-hero" style="--c:${DRINK[b.drink]?.c}">
    <div class="th-tank">${tankSVG(b, true)}</div>
    <div class="th-text"><div class="eyebrow">Right now</div><h2>${ph.label}</h2><p>${ph.desc}</p>
      ${next ? `<p class="th-next">⏭ <b>${esc(next.t)}</b> ${nd === 0 ? 'today' : `in ${nd} day${nd === 1 ? '' : 's'}`}</p>` : ''}</div>
    <div class="th-ring">${progressRing(day / Math.max(1, end), `${Math.min(100, Math.round(day / Math.max(1, end) * 100))}%`, `day ${day} of ~${end}`)}</div></div>`;
}

/* ---------- Flavour wheel ---------- */
const WHEEL = [
  ['Fruity', '#f2994a', ['Citrus', 'Apple', 'Pear', 'Berry', 'Stone fruit', 'Tropical', 'Dried fruit']],
  ['Floral & herbal', '#bb6bd9', ['Floral', 'Honey', 'Herbal', 'Grassy', 'Heather', 'Spicy']],
  ['Malty & sweet', '#c98a3c', ['Bread', 'Biscuit', 'Caramel', 'Toffee', 'Chocolate', 'Coffee', 'Roasty']],
  ['Hoppy & bitter', '#6fbf73', ['Pine', 'Resin', 'Earthy', 'Bitter', 'Grapefruit']],
  ['Yeast & tart', '#56b4d3', ['Banana', 'Clove', 'Yeasty', 'Tart', 'Funky', 'Dry', 'Oaky']],
  ['Faults', '#eb5757', ['Vinegar', 'Sulphur', 'Solvent', 'Butter', 'Cardboard', 'Medicinal']],
];
const FAULT_FIX = { Vinegar: 'Air got in and acetobacter turned alcohol into vinegar. Keep vessels full and sealed.', Sulphur: 'Stressed yeast (often lacking nutrient). Usually fades with time; copper or degassing helps.', Solvent: 'Fermented too warm. Keep it cooler next time.', Butter: 'Diacetyl: give it a few more days on the yeast before packaging.', Cardboard: 'Oxidation: splashing or air after fermentation. Siphon gently.', Medicinal: 'Chlorine in water or wild yeast. Use Campden-treated water and sanitise well.' };
function wheelSVG(sel) {
  const total = WHEEL.reduce((a, c) => a + c[2].length, 0), step = 360 / total;
  const P = (r, a) => { const t = (a - 90) * Math.PI / 180; return [(r * Math.cos(t)).toFixed(2), (r * Math.sin(t)).toFixed(2)]; };
  const arc = (r0, r1, a0, a1) => { const [x0, y0] = P(r1, a0), [x1, y1] = P(r1, a1), [x2, y2] = P(r0, a1), [x3, y3] = P(r0, a0), L = a1 - a0 > 180 ? 1 : 0;
    return `M${x0} ${y0}A${r1} ${r1} 0 ${L} 1 ${x1} ${y1}L${x2} ${y2}A${r0} ${r0} 0 ${L} 0 ${x3} ${y3}Z`; };
  let a = 0, inner = '', outer = '';
  for (const [cat, col, fl] of WHEEL) {
    const a0 = a, a1 = a + fl.length * step, mid = (a0 + a1) / 2, [tx, ty] = P(64, mid);
    const rot = mid > 90 && mid < 270 ? mid + 90 : mid - 90;
    inner += `<path d="${arc(30, 96, a0, a1)}" fill="${col}" stroke="var(--panel)" stroke-width="2"/><text x="${tx}" y="${ty}" text-anchor="middle" dy="4" font-size="10.5" font-weight="700" fill="#1b130c">${cat.split(' & ')[0]}</text>`;
    fl.forEach((f, i) => {
      const b0 = a + i * step, b1 = b0 + step, m = (b0 + b1) / 2, on = sel.includes(f), [lx, ly] = P(126, m);
      const r2 = m > 180 ? m + 90 : m - 90;
      outer += `<g class="wf ${on ? 'on' : ''}" data-f="${f}"><path d="${arc(98, 158, b0, b1)}" fill="${col}" fill-opacity="${on ? 1 : .32}" stroke="var(--panel)" stroke-width="1.5"/>
        <text x="${lx}" y="${ly}" transform="rotate(${r2} ${lx} ${ly})" text-anchor="middle" dy="3.5" font-size="9.5" font-weight="${on ? 700 : 500}" style="fill:${on ? '#1b130c' : 'var(--text)'}">${f}</text></g>`;
    });
    a = a1;
  }
  return `<svg class="wheel" viewBox="-162 -162 324 324">${inner}${outer}<circle r="28" style="fill:var(--panel)"/><text text-anchor="middle" dy="5" font-size="20">👃</text></svg>`;
}
function mountWheel(el, sel, onChange) {
  const draw = () => {
    const prof = WHEEL.map(([c, col, fl]) => [c, col, fl.filter(f => sel.includes(f)).length]);
    const faults = sel.filter(f => FAULT_FIX[f]);
    el.innerHTML = `<div class="wheel-wrap"><div class="wheel-box">${wheelSVG(sel)}</div>
      <div class="wheel-side"><div class="eyebrow">Taste profile</div>
        ${prof.map(([c, col, n]) => `<div class="pbar"><span>${c}</span><div><i style="width:${Math.min(100, n * 25)}%;background:${col}"></i></div><b>${n}</b></div>`).join('')}
        <div class="tagcloud" style="margin-top:12px">${sel.length ? sel.map(f => `<button class="chip" data-f="${f}">${f} ✕</button>`).join('') : '<span class="note">Tap the outer ring to pick what you can taste and smell.</span>'}</div>
        ${faults.length ? `<div class="callout warn" style="margin-top:12px"><b>Faults</b><div>${faults.map(f => `<p style="margin:0 0 6px"><b>${f}:</b> ${FAULT_FIX[f]}</p>`).join('')}<a href="#/calc/flavours">Flavour finder →</a></div></div>` : ''}
        ${sel.length ? '<button class="btn sm ghost" data-clear="1" style="margin-top:10px">Clear all</button>' : ''}</div></div>`;
  };
  el.addEventListener('click', e => {
    const f = e.target.closest('[data-f]');
    if (f) { const k = f.dataset.f; const i = sel.indexOf(k); i >= 0 ? sel.splice(i, 1) : sel.push(k); onChange(sel); draw(); }
    if (e.target.closest('[data-clear]')) { sel.splice(0); onChange(sel); draw(); }
  });
  draw();
}
defCalc({ id: 'wheel', title: 'Flavour wheel', icon: 'spark', group: 'Essentials',
  desc: 'Tap what you can taste and smell to build a tasting profile. Spots faults and tells you how to fix them, and saves to any batch.',
  render(el) {
    const sel = store.get('wheel.sel', []);
    const bs = getBatches();
    el.innerHTML = `<div class="panel" id="wh"></div>
      ${bs.length ? `<div class="panel" style="margin-top:14px"><h3 style="margin-top:0">Save to a batch</h3><div class="btns"><div class="inp" style="max-width:320px"><select id="wb">${bs.map(b => `<option value="${b.id}">${esc(b.name)}</option>`).join('')}</select></div><button class="btn pri" id="ws">Save tasting</button></div></div>` : ''}`;
    mountWheel($('#wh', el), sel, s => store.set('wheel.sel', s));
    $('#ws', el)?.addEventListener('click', () => { const b = batchById($('#wb', el).value); b.tasting = { ...(b.tasting || {}), flav: [...sel] }; saveBatch(b); toast('Saved to ' + b.name); ANIM.burst(innerWidth / 2, innerHeight / 2, 18); });
  } });
// In every batch: a flavour wheel in the tasting notes
{
  const _be = window.batchExtras;
  window.batchExtras = (box, b, redraw) => {
    _be(box, b, redraw);
    const host = box.closest('[id="lb"]') || box.parentElement;
    if (!$('.tank-hero', host)) { const st = $('.stats', host); if (st) st.insertAdjacentHTML('beforebegin', tankHero(b)); }
    const flav = (b.tasting && b.tasting.flav) || [];
    const p = document.createElement('div'); p.className = 'panel'; p.style.marginTop = '16px';
    p.innerHTML = `<h3 style="margin-top:0">🎡 Flavour wheel</h3><p class="note">${flav.length ? 'Tasted: ' + flav.join(', ') : 'Tap what you can taste to build a profile for this batch.'}</p><button class="btn sm" data-ow="1">${flav.length ? 'Edit' : 'Open'} flavour wheel</button><div class="fw"></div>`;
    box.appendChild(p);
    p.addEventListener('click', e => {
      if (!e.target.closest('[data-ow]')) return;
      e.target.closest('[data-ow]').remove();
      const sel = [...flav];
      mountWheel($('.fw', p), sel, s => { b.tasting = { ...(b.tasting || {}), flav: [...s] }; saveBatch(b); $('.note', p).textContent = s.length ? 'Tasted: ' + s.join(', ') : 'Tap what you can taste.'; });
    });
  };
}

/* ---------- Scottish seasons wheel ---------- */
function seasonWheel() {
  if (typeof SCOT_PLANTS === 'undefined') return '';
  const cur = new Date().getMonth() + 1;
  const P = (r, a) => { const t = (a - 90) * Math.PI / 180; return [(r * Math.cos(t)).toFixed(2), (r * Math.sin(t)).toFixed(2)]; };
  const arc = (r0, r1, a0, a1) => { const [x0, y0] = P(r1, a0), [x1, y1] = P(r1, a1), [x2, y2] = P(r0, a1), [x3, y3] = P(r0, a0);
    return `M${x0} ${y0}A${r1} ${r1} 0 0 1 ${x1} ${y1}L${x2} ${y2}A${r0} ${r0} 0 0 0 ${x3} ${y3}Z`; };
  const SEA = ['#5b8fd6', '#5b8fd6', '#6fbf73', '#6fbf73', '#6fbf73', '#f2c94c', '#f2c94c', '#f2c94c', '#e07b39', '#e07b39', '#e07b39', '#5b8fd6'];
  const segs = MON.map((m, i) => {
    const a0 = i * 30, a1 = a0 + 30, mid = a0 + 15, list = SCOT_PLANTS.filter(p => p.m.includes(i + 1) && p.m.length < 12 && p.use !== 'food');
    const [tx, ty] = P(132, mid), [ex, ey] = P(96, mid), [cx, cy] = P(60, mid);
    return `<a href="#/scotland/month" data-sm="${i + 1}" class="sw-seg ${i + 1 === cur ? 'cur' : ''}"><path d="${arc(40, 150, a0 + .8, a1 - .8)}" fill="${SEA[i]}" fill-opacity="${.25 + Math.min(.7, list.length * .07)}"/>
      <text x="${tx}" y="${ty}" text-anchor="middle" dy="4" font-size="12" font-weight="700" style="fill:var(--text)">${m}</text>
      <text x="${ex}" y="${ey}" text-anchor="middle" dy="6" font-size="17">${(list.find(p => p.use === 'sugar' && p.risk < 2) || list.find(p => p.risk < 2) || list[0] || { em: '❄️' }).em}</text>
      <text x="${cx}" y="${cy}" text-anchor="middle" dy="4" font-size="11" font-weight="700" style="fill:var(--text)">${list.length}</text></a>`;
  }).join('');
  const [hx, hy] = P(150, (cur - 1) * 30 + 15);
  return `<div class="panel season-wheel"><div><div class="eyebrow">Year at a glance</div><h2 style="margin:6px 0">The Scottish forager's year</h2>
      <p class="note">Each slice shows a month's star plant and how many brewing plants are in season. Darker = more to pick. Tap a month to open it.</p>
      <div class="sw-key"><span style="--c:#5b8fd6">Winter</span><span style="--c:#6fbf73">Spring</span><span style="--c:#f2c94c">Summer</span><span style="--c:#e07b39">Autumn</span></div></div>
    <svg class="sw" viewBox="-160 -160 320 320">${segs}<circle class="sw-now" cx="${hx}" cy="${hy}" r="6" fill="var(--amber)"/><circle r="36" style="fill:var(--panel)"/><text text-anchor="middle" dy="7" font-size="22">🦌</text></svg></div>`;
}
document.addEventListener('click', e => { const s = e.target.closest('[data-sm]'); if (s) store.set('scot.month', +s.dataset.sm); });

/* ---------- Ingredient swaps ---------- */
const SWAPS = [
  ['🦠', 'Wine yeast', [['Champagne / EC-1118 type', 'best'], ['Ale yeast (lower strength, fruitier)', 'ok'], ['Bread yeast (works, can taste bready; ~10–12%)', 'ok'], ['Wild yeast starter', 'ok']], 'Bread yeast is fine for first cider and mead; let it settle fully.'],
  ['🍺', 'Ale yeast', [['Any dry ale yeast (US-05, S-04, Nottingham)', 'best'], ['Kveik (warm-tolerant, fast)', 'best'], ['Wine yeast (very dry, no malt character)', 'ok'], ['Bread yeast', 'last']], 'Bread yeast in beer tends to taste bready and murky.'],
  ['🧂', 'Yeast nutrient', [['Raisins or sultanas (10–20 per 4.5 L)', 'ok'], ['A pinch of Marmite / yeast extract', 'ok'], ['Boiled dead bread yeast (½ tsp)', 'ok'], ['Pollen (mead)', 'ok']], 'Mead and sugar washes need nutrient most; fruit and malt have their own.'],
  ['🍋', 'Acid blend / citric acid', [['Lemon juice (1 lemon ≈ 1 tsp acid)', 'best'], ['Cream of tartar (tartaric)', 'ok'], ['Sharp apples or crab apples', 'ok']], 'Add a little, taste, add more. It\'s easy to overdo.'],
  ['🍵', 'Wine tannin', [['A strong black tea bag (per 4.5 L)', 'best'], ['A few oak chips', 'ok'], ['Grape or blackberry skins', 'ok']], 'Tannin gives body and "grip" to thin fruit wines.'],
  ['🍏', 'Pectolase', [['Skip it (wine may stay hazy, still drinkable)', 'ok'], ['Time: hazes sometimes clear in months', 'ok']], 'Never boil fruit for wine: heat sets pectin haze.'],
  ['🧪', 'Campden tablets', [['Boil the water/juice and cool (for sterilising)', 'ok'], ['Leave out and rely on cleanliness + fast-starting yeast', 'ok']], 'Campden also stops yeast before sweetening; without it, use pasteurising or drink dry.'],
  ['🫧', 'Star San / sanitiser', [['Unscented thin bleach, then rinse thoroughly', 'ok'], ['Boiling water / steam', 'best'], ['Oven 140 °C for glass (not plastic)', 'ok'], ['Campden + citric acid solution', 'ok']], 'Clean first, always. Sanitiser can\'t work through grime.'],
  ['🍬', 'Brewing sugar (dextrose)', [['Table sugar (sucrose): use ~10% less for priming', 'best'], ['Honey: use ~25% more', 'ok'], ['Golden syrup', 'ok']], 'Sugar adds alcohol, not body. Use malt for body in beer.'],
  ['🍯', 'Honey', [['Sugar + a few raisins (not true mead)', 'ok'], ['Golden syrup', 'ok'], ['Maple or birch syrup', 'ok']], 'Heather honey makes the most Scottish mead of all.'],
  ['🌾', 'Malt extract', [['Mash pale malt (BIAB)', 'best'], ['Home-malted barley or oats', 'ok'], ['Sugar (thin, cidery: last resort)', 'last']], 'Extract is the easiest way to keep beer full-bodied.'],
  ['🌿', 'Hops', [['Bog myrtle, yarrow, heather (gruit)', 'ok'], ['Nettles', 'ok'], ['Spruce tips', 'ok']], 'Hops also preserve beer; gruit ales don\'t keep as long, drink them fresh.'],
  ['🫙', 'Demijohn', [['Glass bottles with narrow necks', 'best'], ['A 5 L water bottle (food-grade PET)', 'ok'], ['A large jar with a cloth (early ferment only)', 'ok']], 'For long ageing, glass is best: PET lets a little oxygen in.'],
  ['💨', 'Airlock', [['Balloon with a pinhole', 'ok'], ['Tube from the lid into a cup of water', 'best'], ['Foil or cling film held loosely', 'ok']], 'Never seal a fermenting vessel shut: gas must escape.'],
  ['📏', 'Hydrometer', [['Weigh sugar and calculate (17 g/L ≈ 1%)', 'ok'], ['Refractometer (before fermentation)', 'best'], ['Taste: dry and steady for a week = done', 'ok']], 'Without one, bottle only in plastic and check firmness.'],
  ['🍾', 'Swing-top bottles', [['Plastic fizzy-drink bottles (safest for beginners)', 'best'], ['Crown-cap beer bottles + capper', 'best'], ['Screw-top wine bottles (still wine only)', 'ok']], 'Never use thin decorative bottles for fizzy drinks.'],
  ['🧯', 'Potassium sorbate', [['Pasteurise bottles (care!) to stop yeast', 'ok'], ['Cold-crash and drink fast from the fridge', 'ok'], ['Non-fermentable sweeteners (xylitol, stevia)', 'best']], 'Sweetening without stopping the yeast = bottle bombs.'],
  ['🪵', 'Oak chips', [['Toasted oak spirals or cubes', 'best'], ['An old whisky barrel stave (shaved)', 'ok']], 'A little goes a long way: taste weekly.'],
];
defCalc({ id: 'swap', title: 'What can I use instead?', icon: 'swap', group: 'Beginner',
  desc: 'Missing something? Swaps for yeast, nutrient, acid, tannin, sanitiser, sugar, airlocks, hydrometers and more, rated from best to last resort.',
  render(el) {
    el.innerHTML = `<div class="inp search" style="margin-bottom:14px"><input id="sq" type="search" placeholder="What are you missing? e.g. nutrient, airlock, hops"></div><div id="sl" class="swaps"></div>
      <p class="note">✅ best swap · 👍 works · ⚠️ last resort</p>`;
    const draw = q => { q = (q || '').toLowerCase();
      $('#sl', el).innerHTML = SWAPS.filter(([, n, o, t]) => !q || (n + o.map(x => x[0]).join(' ') + t).toLowerCase().includes(q)).map(([em, n, o, t]) => `<div class="panel swap"><div class="sw-h"><span>${em}</span><h3>No ${n.toLowerCase()}?</h3></div>
        <ul>${o.map(([x, r]) => `<li class="r-${r}"><span>${{ best: '✅', ok: '👍', last: '⚠️' }[r]}</span>${x}</li>`).join('')}</ul><p class="note">${t}</p></div>`).join('') || '<div class="empty">No swaps found. Try a simpler word.</div>'; };
    $('#sq', el).addEventListener('input', e => draw(e.target.value)); draw('');
  } });
