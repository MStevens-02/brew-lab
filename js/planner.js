/* Brew Lab — batch shopping planner (quantities → packs → cost → shopping list),
   What's new, first-time feature tour, feature guide, footer back to tools. */

/* =================== Batch shopping planner =================== */
// Pack sizes and rough UK prices (2026). Prices vary; they're just for budgeting.
const PACK = {
  juice: { size: 1, unit: 'L', name: '1 L carton' },
  sugar: { size: 1, unit: 'kg', name: '1 kg bag', price: 1.0 },
  honey: { size: 0.34, unit: 'kg', name: '340 g jar', price: 2.5 },
  dme: { size: 0.5, unit: 'kg', name: '500 g bag spraymalt', price: 5.0 },
  fruit: { size: 0.5, unit: 'kg', name: '500 g bag (frozen)', price: 2.5 },
  raisins: { size: 0.5, unit: 'kg', name: '500 g bag', price: 1.8 },
  potatoes: { size: 2.5, unit: 'kg', name: '2.5 kg bag', price: 1.6 },
  bread: { size: 0.8, unit: 'kg', name: 'rye loaf (~800 g)', price: 2.0 },
  lemons: { size: 1, unit: '', name: 'lemon', price: 0.35 },
  oranges: { size: 1, unit: '', name: 'orange', price: 0.4 },
  ginger: { size: 0.1, unit: 'kg', name: '100 g root', price: 0.5 },
  tea: { size: 80, unit: 'bags', name: 'box of 80', price: 1.5 },
  hops: { size: 100, unit: 'g', name: '100 g pack', price: 5 },
  kit: { size: 1, unit: '', name: 'beer kit tin', price: 22 },
  enhancer: { size: 1, unit: 'kg', name: '1 kg brew enhancer', price: 5 },
  wineyeast: { size: 1, unit: '', name: 'wine/cider yeast sachet', price: 1.5 },
  beeryeast: { size: 1, unit: '', name: 'beer yeast sachet', price: 3.5 },
  breadyeast: { size: 1, unit: '', name: 'bread yeast (pack of sachets)', price: 1 },
  nutrient: { size: 100, unit: 'g', name: '100 g tub nutrient', price: 3 },
  pectolase: { size: 50, unit: 'g', name: '50 g tub pectolase', price: 3 },
  campden: { size: 50, unit: 'tabs', name: 'tub of 50 Campden tablets', price: 3 },
  sorbate: { size: 50, unit: 'g', name: '50 g potassium sorbate', price: 3 },
  tannin: { size: 50, unit: 'g', name: '50 g wine tannin', price: 3 },
  acid: { size: 100, unit: 'g', name: '100 g citric acid', price: 2 },
  erythritol: { size: 500, unit: 'g', name: '500 g erythritol', price: 5 },
};
const BASES = {
  cider: { n: '🍏 Cider from shop juice', juice: 'apple', fg: 0.998, yeast: 'wine', def: 6 },
  perry: { n: '🍐 Perry from pear juice', juice: 'pear', fg: 1.004, yeast: 'wine', def: 6 },
  juicewine: { n: '🍇 Wine from grape juice', juice: 'wgrape', fg: 0.996, yeast: 'wine', def: 11, extras: ['acid', 'tannin'] },
  redwine: { n: '🍷 Red wine from grape juice', juice: 'rgrape', fg: 0.996, yeast: 'wine', def: 11, extras: ['acid', 'tannin'] },
  fruitwine: { n: '🫐 Country wine from fruit', fruitPerL: 0.33, fg: 0.996, yeast: 'wine', def: 12, extras: ['pectolase', 'campden'] },
  mead: { n: '🍯 Mead (honey + water)', honey: true, fg: 0.998, yeast: 'wine', def: 13 },
  cyser: { n: '🍏🍯 Cyser (apple juice + honey)', juice: 'apple', honey: true, fg: 0.998, yeast: 'wine', def: 10 },
  teawine: { n: '🫖 Tea wine', tea: true, raisinsPerL: 0.055, fg: 0.996, yeast: 'wine', def: 12, citrus: 'lemons' },
  potato: { n: '🥔 Potato wine', potatoPerL: 0.22, raisinsPerL: 0.055, fg: 0.998, yeast: 'wine', def: 12, citrus: 'oranges', extras: ['pectolase'] },
  ginger: { n: '🫚 Alcoholic ginger beer', gingerPerL: 0.03, fg: 0.998, yeast: 'wine', def: 6, citrus: 'lemons' },
  lemonade: { n: '🍋 Hard lemonade', lemonsPerL: 1.8, fg: 0.998, yeast: 'wine', def: 6 },
  kvass: { n: '🍞 Kvass (bread)', breadPerL: 0.16, fg: 1.012, yeast: 'bread', def: 1.5, maxAbv: 5 },
  beerkit: { n: '🍺 Beer from a kit', kit: true, fg: 1.010, yeast: 'beer', def: 4.5 },
  extract: { n: '🍺 Extract beer (spraymalt + hops)', dme: true, fg: 1.012, yeast: 'beer', def: 5 },
};
function planBatch(v) {
  const B = BASES[v.base], L = v.L, out = [], notes = [];
  const sweetFg = { dry: B.fg, medium: Math.max(B.fg, 1.010), sweet: Math.max(B.fg, 1.020) }[v.sweet];
  let abv = Math.min(v.abv, B.maxAbv || 20);
  const targetOG = B.fg + abv / 131.25;
  const add = (key, qty, why, unitLabel) => {
    const p = PACK[key]; const packs = Math.max(1, Math.ceil(qty / p.size - 1e-9));
    out.push({ key, need: qty, unitLabel: unitLabel || p.unit, packs, packName: p.name, cost: packs * (p.price ?? 0), why });
  };
  let pts = 0; // gravity points × litres supplied so far
  if (B.kit) {
    const kits = Math.max(1, Math.round(L / 23 * 2) / 2);
    add('kit', Math.ceil(kits), 'one tin makes 23 L (40 pints)', ''); add('enhancer', Math.ceil(kits), 'instead of plain sugar', 'kg');
    add('beeryeast', 1, 'usually included in the kit; a better one is worth it', '');
    notes.push('Kits set their own strength (≈4–5%). The target ABV is ignored.');
    return { out, og: 1.044, abv: 4.5, notes, extraL: 0 };
  }
  if (B.juice) {
    const j = juice(B.juice);
    const juiceL = B.honey ? L * 0.88 : L;
    out.push({ key: 'juice', need: juiceL, unitLabel: 'L', packs: Math.ceil(juiceL), packName: `1 L carton ${j.name.toLowerCase()}`, cost: Math.ceil(juiceL) * j.price, why: 'no preservatives! Check the label' });
    pts += juiceL * Calc.pts(j.sg);
  }
  if (B.fruitPerL) { const kg = L * B.fruitPerL; add('fruit', kg, 'blackberries, mixed berries, plums…', 'kg'); pts += kg * 30; }
  if (B.potatoPerL) { add('potatoes', L * B.potatoPerL, 'not green or sprouting', 'kg'); pts += L * B.potatoPerL * 25; }
  if (B.raisinsPerL) { const kg = L * B.raisinsPerL; add('raisins', kg, 'body and nutrients', 'kg'); pts += kg * 250; }
  if (B.breadPerL) { const kg = L * B.breadPerL; add('bread', kg, 'dark rye, toasted', 'kg'); pts += kg * 25; }
  if (B.tea) add('tea', Math.ceil(L / 4.5 * 8), 'for tannin and colour', 'bags');
  if (B.gingerPerL) add('ginger', L * B.gingerPerL, 'grated', 'kg');
  if (B.lemonsPerL) add('lemons', Math.ceil(L * B.lemonsPerL), 'juice', '');
  if (B.citrus) add(B.citrus, Math.ceil(L / 4.5 * 2), 'zest + juice', '');
  const need = Math.max(0, Calc.pts(targetOG) * L - pts);
  let og = 1 + pts / L / 1000;
  if (B.dme) {
    const kg = Calc.pts(targetOG) * L / Calc.SUGARS.dme.pkl; add('dme', kg, 'light spraymalt', 'kg'); og = targetOG;
    add('hops', Math.round(L * 3), 'e.g. Cascade or Goldings, split across the boil', 'g');
  } else if (need > 0) {
    if (B.honey) { const kg = need / Calc.SUGARS.honey.pkl; add('honey', kg, 'any runny honey', 'kg'); }
    else { const kg = need / Calc.SUGARS.sucrose.pkl; add('sugar', kg, 'table sugar, dissolved first', 'kg'); }
    og = targetOG;
  } else {
    abv = Calc.abvSimple(og, B.fg);
    notes.push(`Your ${B.juice ? 'juice' : 'base'} alone reaches ≈${fmt(abv, 1)}%, so no extra sugar is needed for that target.`);
  }
  // yeast & additives
  const sachets = Math.max(1, Math.ceil(L / 23));
  add(B.yeast === 'beer' ? 'beeryeast' : B.yeast === 'bread' ? 'breadyeast' : 'wineyeast', sachets, B.yeast === 'bread' ? 'a pinch is enough' : abv > 12 ? 'pick a high-tolerance one (EC-1118 / K1-V1116)' : 'see the yeast picker', '');
  if (B.yeast === 'wine') add('nutrient', Math.max(2.5, L * (B.honey ? 1.2 : 0.55)), B.honey ? 'honey needs plenty; split over 3 days' : '½ tsp per 4.5 L', 'g');
  (B.extras || []).forEach(x => add(x, { pectolase: L / 4.5 * 3, campden: Math.ceil(L / 4.5), acid: L / 4.5 * 4, tannin: L / 4.5 * 1 }[x], { pectolase: 'helps fruit clear', campden: 'sterilise the fruit first', acid: 'brightens grape juice', tannin: 'body and grip' }[x], { pectolase: 'g', campden: 'tabs', acid: 'g', tannin: 'g' }[x]));
  // sweetness & fizz
  if (v.sweet !== 'dry' && !v.fizzy) {
    add('sorbate', L * 0.2, 'stabilise before sweetening', 'g'); add('campden', Math.ceil(L / 4.5), 'stabilise before sweetening', 'tabs');
    const g = Calc.sweetenGrams(L, B.fg, sweetFg, B.honey ? 'honey' : 'sucrose');
    if (B.honey) add('honey', g / 1000, 'to back-sweeten', 'kg'); else add('sugar', g / 1000, 'to back-sweeten', 'kg');
  }
  if (v.fizzy) {
    const p = Calc.primingSugar(L * 0.95, B.yeast === 'beer' ? 2.3 : 2.6, 20, 'sucrose');
    add('sugar', p.grams / 1000, `priming for fizz (${fmt(p.grams, 0)} g)`, 'kg');
    if (v.sweet !== 'dry') add('erythritol', L * (v.sweet === 'sweet' ? 40 : 22), 'non-fermentable sweetener, so it stays sweet in the bottle', 'g');
  }
  // merge duplicate keys (e.g. sugar for strength + priming)
  const merged = [];
  for (const it of out) { const m = merged.find(x => x.key === it.key && x.key !== 'juice'); if (m) { m.need += it.need; m.why += ' + ' + it.why; m.packs = Math.max(1, Math.ceil(m.need / PACK[m.key].size - 1e-9)); m.cost = m.packs * (PACK[m.key].price ?? 0); } else merged.push({ ...it }); }
  if (B.juice && v.base === 'cider' && abv > 8.5) notes.push('Over ~8% apple tastes more like apple wine than cider.');
  return { out: merged, og, abv, notes };
}
const fmtNeed = it => it.unitLabel === 'kg' ? (it.need < 1 ? fmt(it.need * 1000, 0) + ' g' : fmt(it.need, 2) + ' kg') : it.unitLabel === 'L' ? fmt(it.need, 1) + ' L' : it.unitLabel === 'g' ? fmt(it.need, it.need < 10 ? 1 : 0) + ' g' : `${Math.ceil(it.need)}${it.unitLabel ? ' ' + it.unitLabel : ''}`;
const PNAMES = { juice: 'Juice', sugar: 'Sugar', honey: 'Honey', dme: 'Spraymalt (DME)', fruit: 'Fruit', raisins: 'Raisins / sultanas', potatoes: 'Potatoes', bread: 'Rye bread', lemons: 'Lemons', oranges: 'Oranges', ginger: 'Fresh ginger', tea: 'Tea bags', hops: 'Hops', kit: 'Beer kit', enhancer: 'Brew enhancer', wineyeast: 'Wine / cider yeast', beeryeast: 'Beer yeast', breadyeast: 'Bread yeast', nutrient: 'Yeast nutrient', pectolase: 'Pectolase', campden: 'Campden tablets', sorbate: 'Potassium sorbate', tannin: 'Wine tannin', acid: 'Citric acid', erythritol: 'Erythritol' };

defCalc({ id: 'planner', title: 'Batch shopping planner', icon: 'cart', group: 'Beginner',
  desc: 'Choose what, how much, how strong, how sweet and fizzy or still. Get exact amounts, how many packs to buy, the cost, then add it all to your shopping list.',
  render(el) {
    el.innerHTML = `<div class="calc"><div class="panel" id="pf"></div><div class="panel"><div id="po"></div></div></div><div id="pt"></div>`;
    let last = null;
    mountForm('planner', $('#pf', el), $('#po', el), [
      { k: 'base', l: 'What are you making?', t: 'sel', v: 'cider', wide: true, o: Object.entries(BASES).map(([k, b]) => [k, b.n, { abv: b.def }]) },
      { k: 'L', l: 'How much?', v: 4.5, u: 'L', step: 0.5, hint: '4.5 L = 1 demijohn ≈ 8 bottles' },
      { k: 'abv', l: 'Target strength', v: 6, u: '%', step: 0.5 },
      { k: 'sweet', l: 'Sweetness', t: 'sel', v: 'dry', o: [['dry', 'Dry'], ['medium', 'Medium'], ['sweet', 'Sweet']] },
      { k: 'fizzy', l: 'Fizzy?', t: 'sel', v: '', o: [['', 'Still'], ['1', 'Sparkling']] },
      { k: 'have', l: 'Already own equipment?', t: 'sel', v: '', o: [['', 'No, list it too'], ['1', 'Yes, ingredients only']], wide: true },
    ], v => {
      v.fizzy = !!v.fizzy;
      const r = planBatch(v); last = { r, v };
      const B = BASES[v.base];
      const gear = [];
      if (!v.have) {
        const dj = Math.ceil(v.L / 4.6);
        if (B.kit || B.dme || v.L > 9) gear.push(['25 L fermenting bucket + airlock', Math.ceil(v.L / 23), 12]);
        else if (v.L <= 2) gear.push(['Nothing! Use the juice bottle + a balloon', 1, 0]);
        else gear.push(['Demijohn + bung + airlock', dj, 12]);
        gear.push(['No-rinse sanitiser', 1, 9], ['Hydrometer + trial jar', 1, 8]);
        if (v.L > 2) gear.push(['Syphon tube', 1, 5]);
        if (B.dme) gear.push(['Big stock pot (15 L+)', 1, 25]);
        const bottles = Math.ceil(v.L * 0.92 / 0.5);
        gear.push([v.fizzy ? 'Pressure-safe 500 ml bottles (swing-top / beer / PET)' : '500 ml bottles (screw-cap or swing-top)', bottles, v.fizzy ? 1.2 : 0.6]);
        if (v.fizzy && !B.kit) gear.push(['Crown caps + capper (if using beer bottles)', 1, 15]);
      }
      r.gear = gear;
      const ingCost = r.out.reduce((a, i) => a + i.cost, 0), gearCost = gear.reduce((a, g) => a + g[1] * g[2], 0);
      const pints = v.L / 0.568;
      return `<div class="stats">${stat('Strength', fmt(r.abv, 1), '%', `starting gravity ≈${sgf(r.og)}`, 'big')}
        ${stat('Ingredients', '£' + fmt(ingCost, 2), '', `≈£${fmt(ingCost / pints, 2)} a pint`)}${!v.have ? stat('Equipment', '£' + fmt(gearCost, 0), '', 'one-off') : ''}
        ${stat('Makes', Math.floor(v.L * 0.92 / 0.5), '× 500 ml', `${fmt(pints, 0)} pints`)}</div>
        ${r.notes.map(n => `<div class="callout info"><b>Note</b><div>${n}</div></div>`).join('')}
        <div class="btns"><button class="btn pri" id="padd">${I.cart} Add everything to my shopping list</button><a class="btn" href="#/shop">View list</a></div>`;
    });
    const drawTable = () => {
      if (!last) return; const { r } = last;
      $('#pt', el).innerHTML = `<h2>What to buy</h2><div class="tbl-wrap"><table class="tbl"><tr><th>Item</th><th>You need</th><th>Buy</th><th>≈£</th></tr>
        ${r.out.map(i => `<tr><td><b>${PNAMES[i.key] || i.key}</b><br><small>${i.why}</small></td><td class="num">${fmtNeed(i)}</td><td>${i.packs} × ${i.packName}</td><td class="num">${fmt(i.cost, 2)}</td></tr>`).join('')}
        ${r.gear.map(([n, c, p]) => `<tr><td><b>${n}</b><br><small>equipment (reusable)</small></td><td class="num">${c}</td><td>${c} ×</td><td class="num">${fmt(c * p, 2)}</td></tr>`).join('')}</table></div>
        <p class="note">Prices are rough UK supermarket and homebrew-shop guides. Tubs of nutrient, pectolase, sorbate and so on last for many batches.</p>`;
    };
    el.addEventListener('input', () => setTimeout(drawTable, 0)); el.addEventListener('change', () => setTimeout(drawTable, 0)); drawTable();
    el.addEventListener('click', e => {
      if (!e.target.closest('#padd') || !last) return;
      const { r, v } = last;
      const items = r.out.map(i => `${PNAMES[i.key] || i.key}: ${i.packs} × ${i.packName} (need ${fmtNeed(i)})`).concat(r.gear.filter(g => g[2]).map(([n, c]) => `${n} × ${c}`));
      addToShop(items, `${BASES[v.base].n.replace(/^\S+\s/, '')} · ${v.L} L`);
    });
  } });

/* =================== What's new =================== */
const APP_VERSION = '3.0';
const CHANGELOG = [
  ['3.0', '2026-11-11', '⚗️ Survival distilling (licensed / NZ)', ['New guide: how a pot still works, safe vs unsafe materials, three improvised builds, preparing the wash, safe setup, running the cuts, troubleshooting and the non-negotiable safety rules', 'New calculator: still run planner (foreshots to discard, expected yield, pot fill, dilution to drinking strength)']],
  ['2.9', '2026-11-11', '🏕️ Off-grid & survival brewing', ['New guide: brewing with no shops or internet: foraged sugar by season, catching and drying your own yeast, home-made vessels and airlocks, measuring without a hydrometer, maximum strength without a still, vinegar, safety', 'New skill ladder: wild-fruit wine → wild mead & sap wine → keep your own yeast → grow & malt grain → maximum strength', 'Recipes: wild-yeast hedgerow wine and a wild yeast starter']],
  ['2.8', '2026-11-11', '⚗️ History of distilling & New Zealand\'s Hokonui moonshine', ['New guide: alchemists and the alembic, aqua vitae, Friar John Cor (1494), how old pot stills and smugglers\' stills worked, the column still, gin, rum, brandy, vodka, tequila and more', 'New Zealand chapter: Mary McRae, Hokonui moonshine, the 1996 law change and the museum in Gore', 'History guide updated with the 2026 US court rulings']],
  ['2.7', '2026-11-11', '📜 History of booze, bans & bootleggers', ['New guide: from 9,000-year-old rice wine to Scottish whisky smugglers, US Prohibition, moonshine runners and NASCAR', 'Timeline of brewing in Britain, including the 1963 end of home-brew licences', 'Myth vs fact, and Prohibition around the world']],
  ['2.6', '2026-11-11', '🛒 Shopping planner, 🍞 bread, potatoes & rice', ['Batch shopping planner: exact amounts → packs to buy → cost → shopping list', 'New drink families with full skill ladders: bread & kvass, potato, rice wine, corn & grains, unusual ferments', '12 new recipes: kvass, potato wine, jiuniang, makgeolli, tepache, tea wine, hard kombucha, banana wine, birch sap wine, sorghum & corn beers', 'Guide: brewing from starch (malt, koji, nuruk, yeast balls, enzymes)', 'Feature tour for first-time users, this What\'s new page, and a link back to all my tools on every page']],
  ['2.5', '2026-11-11', '🎓 Learn hub & Brew School', ['10-lesson course with quizzes and a certificate', 'Flashcards, fermentation simulator, Problem Doctor, flavour finder', '6 new beginner guides']],
  ['2.4', '2026-11-11', '🔔 Notifications & coaching', ['Notification inbox with preferences and Android background checks', 'Daily fermentation coach, Kit explained, tap-to-explain jargon, achievements, Ready to bottle?']],
  ['2.3', '2026-11-11', '🎨 Looks great everywhere', ['Light/dark/auto theme and text size', 'Tablet layout, small-phone fixes', 'Favourites, stats dashboard, batch photos & costs']],
  ['2.2', '2026-11-11', '📅 Calendar & your brewery', ['Calendar with reminders and phone-calendar export', 'Cellar, shopping list, bottle labels, search, installable app']],
  ['2.1', '2026-11-11', '🌱 Beginner toolkit', ['First-brew quiz, brew-along mode, Is this normal?, hydrometer trainer', '18 more recipes with filters']],
  ['2.0', '2026-11-11', '🪜 Skill ladders & shop juice', ['Five ways to make every drink, from super easy to expert', 'Juice wizard, label checker, yeast guide & picker']],
  ['1.0', '2026-11-11', '🍺 Brew Lab launches', ['Guides, 15 calculators, recipe designer, brew-day timer and batch log']],
];
function pageWhatsNew(el) {
  store.set('seenVersion', APP_VERSION); $$('[data-new]').forEach(x => x.removeAttribute('data-new'));
  el.innerHTML = `<div class="eyebrow">Updates</div><h1>What's new</h1><p class="lead">Everything that's been added to Brew Lab, newest first.</p>
    <div class="timeline">${CHANGELOG.map(([v, d, t, items], i) => `<div class="tl-item ${i === 0 ? 'latest' : ''}"><div class="tl-dot"></div><div class="panel">
      <div class="meta" style="margin:0 0 6px"><span class="pill c" style="--c:var(--amber)">v${v}</span><span class="pill">${nice(d)}</span>${i === 0 ? '<span class="pill c" style="--c:var(--ok)">Latest</span>' : ''}</div>
      <h3 style="margin:4px 0 8px;color:var(--text)">${t}</h3><ul class="ticks">${items.map(x => `<li>${x}</li>`).join('')}</ul></div></div>`).join('')}</div>
    <div class="btns"><a class="btn" href="#/features">📖 Feature guide</a><button class="btn ghost" onclick="startTour()">▶ Take the tour</button></div>`;
}

/* =================== Feature guide page =================== */
const FEATURES = [
  ['Getting started', [['🧭', 'Find your first brew', 'A 5-question quiz that picks a recipe and tells you what to buy.', '#/start'], ['🎓', 'Brew School', '10 short lessons with quizzes and a certificate.', '#/school'], ['🧰', 'Kit explained', 'What every piece of equipment is for.', '#/kit'], ['🪜', 'Skill ladders', 'Every drink from super easy to expert.', '#/paths']]],
  ['Planning & buying', [['🛒', 'Batch shopping planner', 'Exact amounts → packs to buy → cost.', '#/calc/planner'], ['🧃', 'Juice wizard', 'Plan any shop-juice brew by level.', '#/calc/juice'], ['🏷️', 'Label checker', 'Will this juice ferment?', '#/calc/label'], ['📝', 'Shopping list', 'Tick off in the shop, share it.', '#/shop']]],
  ['Brewing', [['📖', 'Recipes + brew-along', 'Step-by-step mode with timers and reminders.', '#/recipes'], ['🧮', 'Calculators', 'ABV, sugar, priming, mead, water, yeast…', '#/calcs'], ['🍺', 'Recipe designer', 'Design beers with live stats.', '#/calc/recipe'], ['⏱', 'Brew-day timer', 'Mash & boil with hop alarms.', '#/calc/timer']]],
  ['Tracking', [['📒', 'Batch log', 'Readings, curve, ABV, coach, photos, costs.', '#/log'], ['📅', 'Calendar', 'Timelines & reminders; export to your phone.', '#/calendar'], ['🔔', 'Notifications', 'Inbox and phone alerts.', '#/inbox'], ['🍾', 'Cellar & stats', 'Bottles ready, ratings, money saved.', '#/cellar']]],
  ['When something\'s off', [['🤔', 'Is this normal?', '23 common worries answered.', '#/calc/normal'], ['🩺', 'Problem Doctor', 'Step-by-step diagnosis.', '#/calc/doctor'], ['👃', 'Flavour finder', 'What causes that taste?', '#/calc/flavours'], ['✅', 'Ready to bottle?', 'Safety check before bottling.', '#/calc/bottlecheck']]],
  ['Make it yours', [['⚙️', 'App & settings', 'Install, theme, text size, notifications, backup.', '#/app'], ['♥', 'Favourites', 'Tap the heart on any recipe, guide or tool.', '#/'], ['🔍', 'Search', 'Find anything (or press / on a computer).', '#/search'], ['🆕', 'What\'s new', 'Latest updates.', '#/whatsnew']]],
];
function pageFeatures(el) {
  el.innerHTML = `<div class="eyebrow">Help</div><h1>Feature guide</h1><p class="lead">Everything Brew Lab can do, in one place. New here? Take the 1-minute tour.</p>
    <div class="btns" style="margin:0 0 10px"><button class="btn pri" onclick="startTour()">▶ Take the tour</button><a class="btn" href="#/whatsnew">🆕 What's new</a><a class="btn ghost" href="${HUB}">← All my tools</a></div>
    ${FEATURES.map(([g, items]) => `<h2>${g}</h2><div class="grid">${items.map(([em, t, d, h]) => `<a class="card" href="${h}"><div style="font-size:28px;margin-bottom:6px">${em}</div><h3>${t}</h3><p>${d}</p></a>`).join('')}</div>`).join('')}`;
}

/* =================== First-time tour =================== */
const TOUR = [
  { sel: null, t: 'Welcome to Brew Lab 👋', d: 'A 1-minute tour of the main things you can do. You can skip it any time, and replay it from the Feature guide.' },
  { sel: '[data-nav="guides"]', t: '🎓 Learn', d: 'Brew School lessons, guides, flashcards and tools like the Problem Doctor. Start here if you\'re new.' },
  { sel: '[data-nav="recipes"]', t: '📖 Recipes', d: 'Dozens of recipes from 3-day kvass to all-grain beer. Every one has a step-by-step brew-along mode.' },
  { sel: '[data-nav="calcs"]', t: '🧮 Calculators', d: 'ABV, sugar, priming, the shopping planner, the juice wizard and more. They remember your numbers.' },
  { sel: '[data-nav="log"]', t: '📒 Batch log', d: 'Log each brew: gravity readings, live ABV, a daily coach, reminders, photos and tasting notes.' },
  { sel: '[data-nav="inbox"]', t: '🔔 Notifications', d: 'Brew Lab nudges you when it\'s time to check, rack, bottle or drink.' },
  { sel: '[data-nav="calendar"]', t: '📅 Calendar', d: 'Every batch step and reminder. Export to your phone calendar for real alarms.' },
  { sel: '.tb-icons a[href="#/more"], .navlink[data-nav="app"]', t: '☰ Everything else', d: 'Cellar, shopping list, stats, settings (install, theme, backup) and a link back to all my tools.' },
  { sel: null, t: 'You\'re ready! 🍻', d: 'Not sure what to brew? The quiz picks a first recipe for you.', cta: ['🧭 Find my first brew', '#/start'] },
];
let tourI = 0;
function visible(sel) { if (!sel) return null; return $$(sel).find(e => e.offsetParent !== null && e.getBoundingClientRect().width > 0) || null; }
function startTour() { tourI = 0; location.hash = location.hash || '#/'; setTimeout(drawTour, 50); }
function endTour() { $('.tour')?.remove(); store.set('toured', true); }
function drawTour() {
  $('.tour')?.remove();
  const s = TOUR[tourI]; const el = visible(s.sel);
  const wrap = document.createElement('div'); wrap.className = 'tour';
  let hole = '';
  if (el) { const r = el.getBoundingClientRect(); hole = `<div class="tour-hole" style="left:${r.left - 6}px;top:${r.top - 6}px;width:${r.width + 12}px;height:${r.height + 12}px"></div>`; }
  wrap.innerHTML = `${hole || '<div class="tour-dim"></div>'}<div class="tour-card fade-in"><div class="eyebrow">${tourI + 1} / ${TOUR.length}</div><h3>${s.t}</h3><p>${s.d}</p>
    <div class="btns">${tourI > 0 ? '<button class="btn sm ghost" data-t="-1">Back</button>' : '<button class="btn sm ghost" data-t="skip">Skip</button>'}
    ${s.cta ? `<a class="btn sm" href="${s.cta[1]}" data-t="end">${s.cta[0]}</a>` : ''}<button class="btn sm pri" data-t="${tourI < TOUR.length - 1 ? '1' : 'end'}">${tourI < TOUR.length - 1 ? 'Next →' : 'Done'}</button></div></div>`;
  document.body.appendChild(wrap);
  const card = $('.tour-card', wrap);
  if (el) {
    const r = el.getBoundingClientRect(), cw = Math.min(320, innerWidth - 24);
    card.style.width = cw + 'px';
    card.style.left = Math.max(12, Math.min(innerWidth - cw - 12, r.left + r.width / 2 - cw / 2)) + 'px';
    const below = r.bottom + 14, ch = card.offsetHeight;
    card.style.top = (below + ch < innerHeight ? below : Math.max(12, r.top - ch - 14)) + 'px';
    if (el.closest('.side')) { card.style.left = (r.right + 16) + 'px'; card.style.top = Math.max(12, Math.min(innerHeight - ch - 12, r.top - 10)) + 'px'; }
  } else { card.classList.add('center'); }
  wrap.addEventListener('click', e => {
    const b = e.target.closest('[data-t]'); if (!b) return;
    const t = b.dataset.t;
    if (t === 'skip' || t === 'end') { endTour(); return; }
    tourI = Math.max(0, Math.min(TOUR.length - 1, tourI + +t)); drawTour();
  });
}
window.addEventListener('resize', () => { if ($('.tour')) drawTour(); });

/* =================== Hooks: footer, welcome/tour, new badge =================== */
function plannerAfterRender() {
  const view = $('#view'); if (!view) return;
  if (!store.get('seenVersion', '')) store.set('seenVersion', (store.get('welcomed', false) || getBatches().length || store.get('recent', []).length) ? '2.5' : APP_VERSION);
  const page = view.lastElementChild;
  if (page && !$('.site-foot', view)) page.insertAdjacentHTML('beforeend', `<footer class="site-foot"><a class="btn" href="${HUB}">← All my tools</a>
    <span><a href="#/whatsnew">What's new</a> · <a href="#/features">Feature guide</a> · <a href="#/app">Settings</a></span><small>Brew Lab v${APP_VERSION} · made by Michael Stevens</small></footer>`);
  const path = (location.hash.slice(1) || '/').split('?')[0];
  if (path === '/' || path === '') {
    const w = $('.welcome', view);
    if (w && !$('#tourbtn', w)) $('.welcome-steps', w)?.insertAdjacentHTML('afterend', `<div class="btns"><button class="btn sm pri" id="tourbtn" onclick="startTour()">▶ Take the 1-minute tour</button><a class="btn sm ghost" href="#/features">Feature guide</a></div>`);
    if (store.get('seenVersion', '') && store.get('seenVersion', '') !== APP_VERSION && !$('.newbar', view)) {
      const c = CHANGELOG[0];
      view.querySelector('.hero')?.insertAdjacentHTML('beforebegin', `<a class="newbar fade-in" href="#/whatsnew">🆕 <b>New in v${c[0]}:</b> <span>${c[2]}</span> →</a>`);
    }
    if (!store.get('toured', false) && !store.get('tourOffered', false)) { store.set('tourOffered', true); setTimeout(startTour, 900); }
  }
  $$('.tb-icons a[href="#/more"], .navlink[data-nav="whatsnew"]').forEach(a => { if (store.get('seenVersion', '') !== APP_VERSION) a.dataset.new = '1'; });
}
window.addEventListener('hashchange', () => setTimeout(plannerAfterRender, 10));
setTimeout(plannerAfterRender, 10);
