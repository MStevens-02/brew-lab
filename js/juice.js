/* Brew Lab — shop-bought juice brewing: juice data, difficulty ladder, wizard, label checker, yeast picker. */

DRINK.juice = { c: '#ff9f43', em: '🧃', name: 'Shop juice' };

/* ---------- Juices you can buy ---------- */
// sg = typical gravity, price = £/litre roughly, verdict: great | good | blend | avoid
Data.juices = [
  { id: 'apple', name: 'Apple juice (cloudy or clear)', sg: 1.046, price: 1.0, verdict: 'great', makes: 'Cider',
    tips: 'The classic. Cloudy juice has more flavour. Ferments bone dry (≈1.000) and sharp; tannin or a mug of strong tea adds body.' },
  { id: 'pear', name: 'Pear juice', sg: 1.050, price: 1.5, verdict: 'great', makes: 'Perry (pear cider)',
    tips: 'Contains sorbitol, which yeast can\'t eat, so it finishes slightly sweet (≈1.004) on its own. Delicate, so ferment cool.' },
  { id: 'wgrape', name: 'White grape juice', sg: 1.070, price: 1.4, verdict: 'great', makes: 'White wine',
    tips: 'Makes a simple white wine at ~9% with no sugar. Add ½–1 tsp citric/tartaric acid and ¼ tsp tannin per 4.5 L for a proper wine taste.' },
  { id: 'rgrape', name: 'Red grape juice', sg: 1.068, price: 1.5, verdict: 'great', makes: 'Red / rosé wine',
    tips: 'Often Concord grapes, which have a "grape sweet" (foxy) taste. Add tannin. Best as a light red or rosé, drunk young.' },
  { id: 'pineapple', name: 'Pineapple juice', sg: 1.055, price: 1.2, verdict: 'good', makes: 'Pineapple wine / tepache-style',
    tips: 'Tropical and fun. Can smell eggy (sulphur) mid-ferment: use nutrient and it fades. Great with ginger.' },
  { id: 'cherry', name: 'Cherry juice (100%)', sg: 1.060, price: 3.0, verdict: 'good', makes: 'Cherry wine / blend',
    tips: 'Deep colour, tart. Lovely blended 20–40% with apple for a cherry cider.' },
  { id: 'pomegranate', name: 'Pomegranate juice', sg: 1.060, price: 3.0, verdict: 'blend', makes: 'Blend',
    tips: 'Astringent on its own. Best as 20–30% of a blend with apple or grape.' },
  { id: 'cranberry', name: 'Cranberry juice drink', sg: 1.050, price: 1.2, verdict: 'blend', makes: 'Blend',
    tips: 'Very tart. Most cartons are "juice drink" with added sugar or sweetener. Check for preservatives. Blend ≤30% with apple.' },
  { id: 'mango', name: 'Tropical / mango blend', sg: 1.055, price: 1.3, verdict: 'blend', makes: 'Blend',
    tips: 'Thick and pulpy; mixes well with apple. Lots of sediment, so rack carefully.' },
  { id: 'orange', name: 'Orange juice', sg: 1.045, price: 1.0, verdict: 'blend', makes: 'Small blends only',
    tips: 'On its own it often turns bitter and odd. Use at most ~20% of a blend, or use the zest of an orange for flavour instead.' },
  { id: 'blackcurrant', name: 'Blackcurrant juice / squash', sg: 1.050, price: 2.0, verdict: 'avoid', makes: 'Flavour only',
    tips: 'Squash and cordial almost always contain preservatives (sorbate/benzoate) that stop yeast. Use frozen blackcurrants instead.' },
  { id: 'water', name: 'Water (to dilute)', sg: 1.000, price: 0, verdict: 'good', makes: '—',
    tips: 'Dilutes strength and cost. Use with sugar or honey to make up the gravity.' },
];
const juice = id => Data.juices.find(j => j.id === id);
const VERDICT = { great: ['Great alone', 'var(--ok)'], good: ['Good', 'var(--hop)'], blend: ['Blend only', 'var(--amber)'], avoid: ['Avoid', 'var(--danger)'] };

/* ---------- Difficulty ladder ---------- */
Data.levels = [
  { n: 1, name: 'Bottle brew', time: '1–2 weeks', cost: '≈£5', em: '🥤',
    what: 'Add yeast straight into the juice bottle. No kit to buy, just juice, yeast and a balloon or a loose cap.',
    gear: ['Juice in a plastic bottle (1–2 L)', 'Sachet of wine or cider yeast', 'Balloon with a pin-prick, or a cap loosened a quarter turn', 'Funnel (optional)'],
    learn: 'How fermentation looks, smells and tastes.' },
  { n: 2, name: 'Demijohn cider', time: '4–6 weeks', cost: '≈£20 setup', em: '🫙',
    what: 'A proper 4.5 L glass demijohn with an airlock. Still, dry cider or wine that clears properly.',
    gear: ['4.5 L demijohn', 'Rubber bung + airlock', 'No-rinse sanitiser', 'Syphon tube', 'Funnel', 'Yeast nutrient', 'Bottles with screw caps or swing-tops'],
    learn: 'Sanitising, racking off sediment, patience.' },
  { n: 3, name: 'Stronger & flavoured', time: '4–8 weeks', cost: '+£15', em: '🧪',
    what: 'Measure gravity, add sugar or honey for a target strength, blend juices, add spices, tannin and acid.',
    gear: ['Hydrometer + trial jar', 'Digital scales', 'Measuring spoons', 'Second demijohn for racking', 'Tannin, citric acid, pectolase'],
    learn: 'Gravity, ABV, balancing a recipe.' },
  { n: 4, name: 'Sparkling', time: '6–8 weeks', cost: '+£10', em: '🫧',
    what: 'Bottle-condition with a measured dose of priming sugar for fizzy, dry cider or "juice champagne".',
    gear: ['Pressure-safe bottles (PET, swing-top or crown-cap beer bottles)', 'Bottling wand', 'Capper + caps if using crown caps', 'Priming sugar'],
    learn: 'Priming maths, carbonation, bottle safety.' },
  { n: 5, name: 'Sweet, sparkling & polished', time: '2–6 months', cost: '+£10–£100', em: '🏆',
    what: 'Sweet and sparkling (like shop cider), crystal clear, back-sweetened, oaked or aged. The hard stuff.',
    gear: ['Non-fermentable sweetener (erythritol/xylitol/sucralose) or a keg', 'Potassium sorbate + Campden tablets', 'Finings (kieselsol/chitosan)', 'Optional: oak chips, mini keg + CO₂'],
    learn: 'Stabilising, sweetening safely, clarity, ageing.' },
];

/* ---------- Label checker ---------- */
const LABEL_RULES = [
  { re: /sorbate|e\s?20[0-3]\b|sorbic/i, bad: true, t: 'Sorbate (E200–E203)', d: 'Stops yeast reproducing. The juice will not ferment properly.' },
  { re: /benzoate|benzoic|e\s?21[0-3]\b/i, bad: true, t: 'Benzoate (E210–E213)', d: 'Strong preservative. Will stop or badly stall fermentation.' },
  { re: /sulph?ite|sulf?ite|metabisulph|e\s?22[0-8]\b|sulphur dioxide|sulfur dioxide/i, bad: 'maybe', t: 'Sulphites (E220–E228)', d: 'Small amounts usually dissipate if you leave the juice open under a cloth for 24 h before adding yeast. Heavy doses can stall it.' },
  { re: /natamycin|e\s?235/i, bad: true, t: 'Natamycin (E235)', d: 'Anti-fungal preservative. Kills yeast.' },
  { re: /dimethyl dicarbonate|velcorin|e\s?242/i, bad: false, t: 'Dimethyl dicarbonate (E242)', d: 'Breaks down within hours of bottling; fine.' },
  { re: /preservative/i, bad: 'maybe', t: '"Preservative"', d: 'The label mentions a preservative. Check which one: sorbate/benzoate = no.' },
  { re: /ascorbic|vitamin c|e\s?300/i, bad: false, t: 'Ascorbic acid / Vitamin C (E300)', d: 'An antioxidant, not a preservative. Totally fine.' },
  { re: /citric acid|e\s?330/i, bad: false, t: 'Citric acid (E330)', d: 'Fine. Just adds tartness.' },
  { re: /aspartame|sucralose|acesulfame|saccharin|stevia|steviol|e\s?95[0-5]\b|e\s?960/i, bad: false, t: 'Artificial sweetener', d: 'Yeast can\'t eat it, so the drink will stay a bit sweet. Fine (and handy for sweet sparkling). There\'s less real sugar, so expect lower ABV.' },
  { re: /from concentrate/i, bad: false, t: 'From concentrate', d: 'Fine. Concentrate is just juice with water removed and re-added.' },
  { re: /pasteuri[sz]ed|long life|uht/i, bad: false, t: 'Pasteurised', d: 'Good. It\'s free of wild yeast and bacteria.' },
  { re: /calcium|vitamin d|added vitamins|fortified/i, bad: false, t: 'Added vitamins/calcium', d: 'Fine.' },
  { re: /\bpulp|bits|cloudy|pressed/i, bad: false, t: 'Pulp / cloudy', d: 'Fine, with more flavour. Expect more sediment; pectolase helps it clear.' },
  { re: /juice drink|nectar/i, bad: 'maybe', t: '"Juice drink" / "nectar"', d: 'Not 100% juice: watered down, often sweetened. Check the preservatives. It may need extra sugar.' },
];
function checkLabel(text) {
  const hits = LABEL_RULES.filter(r => r.re.test(text));
  const verdict = hits.some(h => h.bad === true) ? 'no' : hits.some(h => h.bad === 'maybe') ? 'maybe' : 'yes';
  return { hits, verdict };
}

/* ---------- Juice wizard ---------- */
const STYLES = [
  ['still-dry', 'Still & dry (easiest)', 1],
  ['sparkling-dry', 'Sparkling & dry', 4],
  ['still-sweet', 'Still & sweet / medium', 3],
  ['sparkling-sweet', 'Sparkling & sweet (like shop cider)', 5],
];
function juiceYeast(mainId, abv, style) {
  if (abv > 12) return 'Lalvin EC-1118 (champagne yeast). It handles high strength.';
  if (['wgrape', 'rgrape', 'cherry'].includes(mainId)) return mainId === 'rgrape' ? 'Lalvin RC212 or K1-V1116 (wine yeast)' : 'Lalvin QA23 or K1-V1116 (wine yeast)';
  if (mainId === 'pineapple' || mainId === 'mango') return 'Lalvin 71B or K1-V1116';
  return 'Mangrove Jack M02 / SafCider AB-1 (cider yeast), or any wine yeast';
}
function renderWizard(el) {
  const st = store.get('wizard', { rows: [{ id: 'apple', L: 4.5 }], level: 2, style: 'still-dry', abv: 0, start: today() });
  const save = () => store.set('wizard', st);
  const ql = +qparams().lvl;
  if (ql >= 1 && ql <= 5) {
    st.level = ql; st.style = ['still-dry', 'still-dry', 'still-dry', 'sparkling-dry', 'sparkling-sweet'][ql - 1];
    if (ql === 1) st.rows = [{ id: 'apple', L: 1.5 }]; else if (st.rows.reduce((a, r) => a + r.L, 0) < 3) st.rows = [{ id: 'apple', L: 4.5 }];
    if (ql === 3 && !st.abv) st.abv = 8;
    save(); history.replaceState(null, '', '#/calc/juice');
  }
  el.innerHTML = `<div class="calc"><div>
    <div class="panel"><h3>1. Your juice</h3><div class="rows" id="wr"></div>
      <div class="btns"><button class="btn sm" id="wadd">${I.plus} Add another juice</button></div></div>
    <div class="panel" style="margin-top:14px"><h3>2. What you want</h3><div class="fields">
      <div class="field wide"><label>Style</label><div class="inp"><select id="wstyle">${STYLES.map(([v, l]) => `<option value="${v}"${v === st.style ? ' selected' : ''}>${l}</option>`).join('')}</select></div></div>
      <div class="field"><label>Your level</label><div class="inp"><select id="wlevel">${Data.levels.map(l => `<option value="${l.n}"${l.n == st.level ? ' selected' : ''}>${l.n}. ${l.name}</option>`).join('')}</select></div></div>
      <div class="field"><label>Target strength</label><div class="inp"><select id="wabv"><option value="0">Natural (no sugar)</option>${[6, 7, 8, 9, 10, 11, 12, 13, 14].map(a => `<option value="${a}"${a == st.abv ? ' selected' : ''}>${a}% ABV</option>`).join('')}</select></div></div>
      <div class="field wide"><label>Start date</label><div class="inp"><input id="wstart" type="date" value="${st.start}"></div></div>
    </div></div></div>
    <div><div class="panel"><div id="wout"></div></div></div></div>
    <div id="wplan"></div>`;
  const rows = () => {
    $('#wr', el).innerHTML = st.rows.map((r, i) => `<div class="rowx g" data-i="${i}">
      <div class="field"><label>Juice</label><div class="inp"><select data-w="id">${Data.juices.map(j => `<option value="${j.id}"${j.id === r.id ? ' selected' : ''}>${j.name}</option>`).join('')}</select></div></div>
      <div class="field"><label>Litres</label><div class="inp"><input data-w="L" type="number" step="0.5" inputmode="decimal" value="${r.L}"></div></div>
      <button class="x" data-wdel="${i}">×</button></div>`).join('');
  };
  const draw = () => {
    const rs = st.rows.filter(r => r.L > 0);
    const L = rs.reduce((a, r) => a + r.L, 0) || 1;
    const og0 = 1 + rs.reduce((a, r) => a + r.L * Calc.pts(juice(r.id).sg), 0) / L / 1000;
    const pearShare = rs.filter(r => r.id === 'pear').reduce((a, r) => a + r.L, 0) / L;
    const main = rs.slice().sort((a, b) => b.L - a.L)[0]?.id || 'apple';
    const req = STYLES.find(s => s[0] === st.style)[2];
    const level = Math.max(+st.level, req, +st.abv > 0 ? 3 : 1, L > 2.5 && +st.level === 1 ? 2 : 1);
    const sweet = st.style.includes('sweet'), sparkling = st.style.includes('sparkling');
    const fgDry = 0.998 + pearShare * 0.006;
    let sugarG = 0, og = og0, finalL = L;
    if (+st.abv > 0) {
      const targetOG = fgDry + st.abv / 131.25;
      if (targetOG > og0) { const r = Calc.sugarToRaise(L, og0, targetOG, 'sucrose'); sugarG = r.kg * 1000; og = targetOG; finalL = r.finalL; }
    }
    const abv = Calc.abv(og, fgDry);
    const units = Math.ceil(finalL / 4.5);
    const warnings = [];
    if (level > st.level) warnings.push(`Bumped up to <b>level ${level}</b>: ${level === 5 ? 'sweet and sparkling together needs stabilising know-how or non-fermentable sweetener' : level === 4 ? 'sparkling needs priming and pressure-safe bottles' : +st.abv > 0 ? 'adding sugar for a target ABV needs a hydrometer' : sweet ? 'sweet needs stabilising and a hydrometer' : 'more than 2.5 L won\'t fit in juice bottles; use a demijohn'}.`);
    const orange = rs.filter(r => r.id === 'orange').reduce((a, r) => a + r.L, 0) / L;
    if (orange > 0.25) warnings.push('More than 25% orange juice often turns bitter and strange. Try ≤20%.');
    rs.filter(r => juice(r.id).verdict === 'avoid').forEach(r => warnings.push(`${juice(r.id).name}: ${juice(r.id).tips}`));
    rs.filter(r => juice(r.id).verdict === 'blend' && r.L / L > 0.5).forEach(r => warnings.push(`${juice(r.id).name} works best as under half of a blend.`));
    if (level >= 2 && finalL > 4.3) warnings.push(`${fmt(finalL, 1)} L is more than one 4.5 L demijohn holds with headspace. Use ${Math.ceil(finalL / 4.2)} demijohns or a 10–25 L fermenting bucket.`);
    if (abv > 8 && main === 'apple') warnings.push('Over ~8% apple starts tasting like apple wine. That\'s nice, but not cider.');

    // shopping list
    const shop = rs.filter(r => r.id !== 'water').map(r => [`${juice(r.id).name}`, `${fmt(r.L, 1)} L`, r.L * juice(r.id).price, '100% juice, no preservatives. Run the label checker.']);
    if (sugarG) shop.push(['Table sugar', `${fmt(sugarG, 0)} g`, sugarG / 1000 * 1.0, 'For your target strength']);
    shop.push(['Yeast', `${units > 5 ? 2 : 1} sachet`, 2, juiceYeast(main, abv, st.style)]);
    if (level >= 2) shop.push(['Yeast nutrient', `${fmt(units * 2.5, 1)} g (≈½ tsp per 4.5 L)`, 3, 'Prevents eggy smells and stuck ferments']);
    if (level >= 3 && ['apple', 'pear', 'wgrape', 'rgrape'].includes(main)) shop.push(['Wine tannin (or strong tea)', `${fmt(units * 0.25, 2)} tsp`, 3, 'Adds body and grip']);
    if (level >= 3 && main === 'wgrape') shop.push(['Citric or tartaric acid', `${fmt(units * 0.75, 2)} tsp`, 2, 'Brightens grape juice into wine']);
    if (level >= 3 && rs.some(r => ['mango', 'pineapple', 'cherry'].includes(r.id))) shop.push(['Pectolase', `${units} tsp`, 3, 'Helps pulpy juice clear']);
    if (sparkling) { const p = Calc.primingSugar(finalL * 0.95, 2.6, 20, 'sucrose'); shop.push(['Priming sugar', `${fmt(p.grams, 0)} g`, 0.2, 'For ≈2.6 volumes of fizz']); }
    if (sweet && !sparkling) shop.push(['Potassium sorbate + Campden tablets', `${fmt(finalL * 0.2, 1)} g + ${fmt(finalL / 4.5, 1)} tabs`, 6, 'Stabilise before sweetening']);
    if (sweet && !sparkling) shop.push(['Sugar to back-sweeten', `≈${fmt(Calc.sweetenGrams(finalL, 0.998, 1.012), 0)} g to taste`, 0.5, 'Medium ≈1.012']);
    if (sweet && sparkling) shop.push(['Non-fermentable sweetener', `start ≈${fmt(finalL * 30, 0)} g erythritol (or sucralose to taste)`, 6, 'Stays sweet in the bottle. Note: xylitol is toxic to dogs']);
    const total = shop.reduce((a, s) => a + s[2], 0);
    const gear = Data.levels.filter(l => l.n <= level).flatMap(l => l.gear.map(g => [l.n, g]))
      .filter(([n, g]) => !(level >= 2 && n === 1 && /balloon|plastic bottle|funnel|sachet/i.test(g)));
    const checks = store.get('wizcheck', {});

    $('#wout', el).innerHTML = `<div class="stats">
      ${stat('Expected ABV', fmt(abv, 1), '%', `${fmt(finalL, 1)} L · ${Math.floor(finalL * 0.92 / 0.5)} × 500 ml bottles`, 'big')}
      ${stat('Starting gravity', sgf(og), '', sugarG ? `juice alone ${sgf(og0)}` : 'measure to confirm')}
      ${stat('Finish', sgf(sweet ? 1.012 : fgDry), '', sweet ? 'sweetened' : pearShare > 0.3 ? 'pear stays a touch sweet' : 'bone dry')}
      ${stat('Level', `${Data.levels[level - 1].em} ${level}`, '', Data.levels[level - 1].name)}
      ${stat('Units / 500 ml', fmt(Calc.ukUnits(abv, 500), 1))}
      ${stat('Ingredients', '£' + fmt(total, 2), '', '≈£' + fmt(total / (finalL / 0.5), 2) + ' per 500 ml')}
    </div>
    ${warnings.map(w => `<div class="callout info"><b>Note</b><div>${w}</div></div>`).join('')}
    <div class="btns"><a class="btn pri" href="#/log/new?name=${encodeURIComponent(rs.map(r => juice(r.id).name.split(' ')[0]).join(' & ') + ' brew')}&drink=juice&og=${og.toFixed(3)}&L=${fmt(finalL, 1)}">${I.log} Start this batch</a><a class="btn" href="#/calc/label">Check a label</a></div>`;

    $('#wplan', el).innerHTML = `
      <div class="section-h"><h2>Shopping list</h2><button class="btn sm" data-addlist="${esc(JSON.stringify(shop.map(s => s[0] + ': ' + s[1])))}" data-from="Juice wizard">${I.cart} Add all to my shopping list</button></div>
      <div class="tbl-wrap"><table class="tbl"><tr><th>Item</th><th>Amount</th><th>≈£</th><th>Why</th></tr>
      ${shop.map(s => `<tr><td><b>${s[0]}</b></td><td>${s[1]}</td><td class="num">${s[2] ? fmt(s[2], 2) : ''}</td><td class="muted">${s[3]}</td></tr>`).join('')}</table></div>
      <h2>Equipment</h2><p class="note">Tick off what you have. Saved on this device.</p>
      <div class="adds">${gear.map(([n, g]) => `<label class="add" style="grid-template-columns:28px 1fr auto;cursor:pointer"><input type="checkbox" data-chk="${esc(g)}" ${checks[g] ? 'checked' : ''} style="width:20px;height:20px;accent-color:#f5a524"><span>${esc(g)}</span><span class="pill">L${n}</span></label>`).join('')}</div>
      <h2>Your plan</h2>
      <ol class="steps prose">${planSteps(level, st.style, main, sugarG, finalL).map(([d, t]) => `<li><b>${d === null ? '' : nice(addDays(st.start, d)) + ' — '}</b>${t}</li>`).join('')}</ol>`;
  };
  el.addEventListener('input', e => {
    const t = e.target, row = t.closest('[data-i]');
    if (t.dataset.w) st.rows[row.dataset.i][t.dataset.w] = t.dataset.w === 'id' ? t.value : parseFloat(t.value) || 0;
    if (t.id === 'wstyle') st.style = t.value;
    if (t.id === 'wlevel') st.level = +t.value;
    if (t.id === 'wabv') st.abv = +t.value;
    if (t.id === 'wstart') st.start = t.value || today();
    if (t.dataset.chk) { const c = store.get('wizcheck', {}); c[t.dataset.chk] = t.checked; store.set('wizcheck', c); return; }
    save(); draw();
  });
  el.addEventListener('click', e => {
    if (e.target.closest('#wadd')) { st.rows.push({ id: 'cherry', L: 1 }); save(); rows(); draw(); }
    const d = e.target.closest('[data-wdel]');
    if (d && st.rows.length > 1) { st.rows.splice(+d.dataset.wdel, 1); save(); rows(); draw(); }
  });
  rows(); draw();
}
function planSteps(level, style, main, sugarG, L) {
  const sweet = style.includes('sweet'), sparkling = style.includes('sparkling');
  const s = [];
  if (level === 1) {
    s.push([0, 'Pour out about a mugful of juice so there\'s room for foam (drink it!).']);
    s.push([0, 'Sprinkle in about ¼ of a sachet of yeast per litre (the rest keeps in the fridge, folded shut). Put the cap back on <b>loosely</b>, or stretch a balloon with a pin-prick over the neck.']);
    s.push([0, 'Stand it on a tray somewhere at 18–22 °C, out of sunlight. It will fizz and foam within a day or two.']);
    s.push([5, 'Swirl gently, give it a sniff and a little taste. It gets less sweet each day.']);
    s.push([10, 'When the fizzing has basically stopped and it tastes dry, put it in the fridge for 2–3 days. The yeast drops to the bottom.']);
    s.push([13, 'Pour gently into a glass, leaving the sediment behind. It\'s young and rough but proper cider/wine. Drink within a week.']);
    s.push([null, '⚠️ <b>Never screw the cap tight while it\'s still fermenting.</b> Pressure builds fast and bottles can burst. Ready for more? Try level 2.']);
    return s;
  }
  s.push([0, 'Clean and sanitise the demijohn, funnel, bung, airlock and spoon.']);
  if (sugarG) s.push([0, `Warm ~500 ml of the juice and dissolve <b>${fmt(sugarG, 0)} g sugar</b> in it, then pour everything into the demijohn.`]);
  else s.push([0, 'Pour the juice in, leaving about 10% headspace (up to the shoulder).']);
  if (level >= 3) s.push([0, 'Take a hydrometer reading (OG) and log it. Add nutrient, plus tannin/acid/pectolase if on your list.']);
  else s.push([0, 'Add ½ tsp yeast nutrient.']);
  s.push([0, 'Add the yeast, fit the bung and airlock (filled with sanitiser or cooled boiled water). Keep at 15–20 °C for the best flavour.']);
  s.push([3, 'Bubbling should be steady. A sulphur/eggy smell is common with juice and fades.']);
  s.push([level >= 3 ? 14 : 18, level >= 3 ? 'Take a reading; repeat 3 days later. When it\'s the same twice (≈0.998–1.000), fermentation is finished.' : 'When the airlock has stopped and the juice has started to clear from the top down, it\'s done.']);
  s.push([level >= 3 ? 17 : 21, 'Syphon (rack) it off the sediment into a clean demijohn or bucket. Top up headspace if leaving it more than a couple of weeks.']);
  if (level >= 5) s.push([24, 'Optional: add finings (kieselsol, then chitosan a day later) for crystal-clear results in about a week.']);
  if (sweet && !sparkling) {
    s.push([28, 'Stabilise: add potassium sorbate and a crushed Campden tablet, stir gently, wait 48 h.']);
    s.push([30, 'Back-sweeten to taste (dissolve sugar in a little cider first), then bottle. It stays still; it <b>cannot</b> be carbonated now.']);
    s.push([60, 'Better after a month or two in the bottle.']);
  } else if (sparkling) {
    s.push([28, `Bottle: dissolve the priming sugar in a splash of boiled water, mix into the cider gently${sweet ? ', along with your non-fermentable sweetener (taste and adjust first)' : ''}, fill and cap pressure-safe bottles. Include one plastic bottle as a tester.`]);
    s.push([28, 'Keep the bottles at room temperature, in a closed box, for 2 weeks.']);
    s.push([42, 'When the plastic tester is rock hard, move everything somewhere cool. Chill before opening.']);
    s.push([56, 'Ready, and noticeably better after another month.']);
  } else {
    s.push([28, 'Bottle it still (screw caps or swing-tops are fine) or leave it in the demijohn with an airlock to age.']);
    s.push([level >= 3 ? 60 : 42, 'Drinkable now and much smoother after 2–3 months.']);
  }
  if (main === 'wgrape' || main === 'rgrape') s.push([null, 'Grape-juice wine keeps improving for 3–6 months. Hide a couple of bottles.']);
  return s;
}

/* ---------- Yeast picker ---------- */
const PRIORITIES = [
  ['forgiving', 'Easy & forgiving (beginner)'], ['clean', 'Clean: let the fruit/malt shine'], ['fruity', 'Extra fruity'],
  ['sweet', 'Leave some natural sweetness'], ['strong', 'Maximum strength'], ['fast', 'Fast'], ['cheap', 'Cheap & easy to find'], ['body', 'Fuller body'],
];
function rankYeasts({ drink, temp, priority, og }) {
  const use = drink === 'juice' ? ['juice', 'cider', 'wine'] : [drink];
  return Data.yeasts.filter(y => y.uses.some(u => use.includes(u))).map(y => {
    const [lo, hi] = y.temp.split('–').map(Number);
    let score = 0; const why = [];
    if (temp >= lo && temp <= hi) { score += 3; why.push(`happy at ${temp} °C`); }
    else { score -= Math.min(6, Math.abs(temp < lo ? lo - temp : temp - hi)); why.push(`prefers ${y.temp} °C`); }
    if (y.tags.includes(priority)) { score += 5; why.push(PRIORITIES.find(p => p[0] === priority)[1].toLowerCase()); }
    if (priority === 'sweet') { const fg = Calc.fgFromTolerance(og, y.tol); if (fg > 1.004) { score += 4; why.push(`stops ≈${sgf(fg)}`); } else score -= 2; }
    if (priority === 'strong') score += (y.tol - 12) / 2;
    if (y.kind === 'other') score -= 4;
    if (y.uses[0] === drink || (drink === 'juice' && y.uses.includes('juice'))) score += 1.5;
    if (y.tags.includes('forgiving')) score += 0.5;
    const fg = y.kind === 'beer' && drink === 'beer' ? 1 + (og - 1) * (1 - y.att / 100) : Calc.fgFromTolerance(og, y.tol);
    return { y, score, why, fg, abv: Calc.abv(og, fg) };
  }).sort((a, b) => b.score - a.score);
}
function renderPicker(el) {
  el.innerHTML = `<div class="calc"><div class="panel" id="pf"></div><div class="panel"><div class="out" id="po"></div></div></div>`;
  mountForm('yeastpick', $('#pf', el), $('#po', el), [
    { k: 'drink', l: 'Making', t: 'sel', v: 'juice', o: [['juice', '🧃 Shop-juice brew'], ['cider', '🍏 Cider'], ['wine', '🍷 Wine'], ['mead', '🍯 Mead'], ['beer', '🍺 Beer']] },
    { k: 'temp', l: 'Room temperature', v: 19, u: '°C', step: 1, hint: 'Where it will ferment.' },
    { k: 'priority', l: 'What matters most', t: 'sel', v: 'forgiving', o: PRIORITIES, wide: true },
    { k: 'og', l: 'Starting gravity', v: '1.050', step: 0.005, hint: 'Juice ≈1.045–1.070' },
  ], v => {
    const r = rankYeasts(v).slice(0, 5);
    return r.map((x, i) => `<div class="card" style="${i === 0 ? 'border-color:var(--amber);background:rgba(245,165,36,.07)' : ''}">
      <div class="meta" style="margin:0 0 8px">${i === 0 ? '<span class="pill c" style="--c:var(--amber)">Top pick</span>' : ''}<span class="pill">${x.y.temp} °C</span><span class="pill">to ${x.y.tol}%</span><span class="pill">settles: ${x.y.floc.toLowerCase()}</span></div>
      <h3>${x.y.name}</h3><p>${x.y.notes}</p>
      <p class="note" style="margin-top:8px">✓ ${x.why.join(' · ')} · predicted <b>${fmt(x.abv, 1)}%</b>, finishing ≈${sgf(x.fg)} (${sweetLabel(x.fg).toLowerCase()})</p></div>`).join('')
      + `<p class="note">Predictions assume a healthy ferment with nutrients. Real yeast often goes 1–2% past its "tolerance".</p>`;
  });
}

/* ---------- Register calculators ---------- */
defCalc({ id: 'juice', title: 'Juice brew wizard', icon: 'drop', group: 'Shop juice', wide: true,
  desc: 'Pick any shop juices and a difficulty level. Get ABV, a shopping list, an equipment checklist and a dated plan.', render: renderWizard });
defCalc({ id: 'label', title: 'Juice label checker', icon: 'ref', group: 'Shop juice',
  desc: 'Paste or type the ingredients from a carton. It tells you if the juice will ferment.',
  render(el) {
    el.innerHTML = `<div class="calc"><div class="panel"><div class="field"><label>Ingredients from the label</label>
      <textarea id="lt" placeholder="e.g. Apple juice from concentrate, antioxidant (ascorbic acid)">${esc(store.get('labeltext', ''))}</textarea>
      <div class="hint">Or tap a common example:</div></div>
      <div class="btns">${[['Pure apple', 'Apple juice from concentrate, antioxidant (ascorbic acid).'], ['Squash', 'Water, blackcurrant juice from concentrate (5%), acid (citric acid), preservatives (potassium sorbate, sodium metabisulphite), sweeteners (sucralose).'], ['Juice drink', 'Water, cranberry juice from concentrate (25%), sugar, acidity regulator (sodium citrate), vitamin C.'], ['No added sugar', 'Apple juice (50%), water, sweetener (sucralose, acesulfame K), preservative (dimethyl dicarbonate).']].map(([l, t]) => `<button class="btn sm" data-ex="${esc(t)}">${l}</button>`).join('')}</div></div>
      <div class="panel"><div id="lo"></div></div></div>`;
    const go = () => {
      const t = $('#lt', el).value; store.set('labeltext', t);
      if (!t.trim()) { $('#lo', el).innerHTML = `<p class="note">Type or paste the ingredients list. The bit that matters is any <b>preservative</b>.</p>`; return; }
      const { hits, verdict } = checkLabel(t);
      const V = { yes: ['✅ Good to brew', 'var(--ok)', 'No fermentation-stopping preservatives found.'], maybe: ['⚠️ Probably OK; check', 'var(--amber)', 'Something here might slow the yeast. See below.'], no: ['❌ Won\'t ferment well', 'var(--danger)', 'Contains a preservative that stops yeast. Pick a different juice.'] }[verdict];
      $('#lo', el).innerHTML = `<div class="stat big" style="border-color:${V[1]}"><div class="stat-v" style="color:${V[1]};font-size:26px;font-family:var(--sans)">${V[0]}</div><div class="stat-s">${V[2]}</div></div>
        <div class="adds" style="margin-top:12px">${hits.map(h => `<div class="add" style="grid-template-columns:24px 1fr"><span>${h.bad === true ? '❌' : h.bad === 'maybe' ? '⚠️' : '✓'}</span><span><b>${h.t}</b><br><span class="note">${h.d}</span></span></div>`).join('') || '<p class="note">Nothing flagged.</p>'}</div>`;
    };
    el.addEventListener('input', go);
    el.addEventListener('click', e => { const b = e.target.closest('[data-ex]'); if (b) { $('#lt', el).value = b.dataset.ex; go(); } });
    go();
  } });
defCalc({ id: 'yeastpick', title: 'Yeast picker', icon: 'yeast', group: 'Essentials',
  desc: 'Tell it what you\'re making, how warm your room is and what you want. It ranks the yeasts and predicts the result.', render: renderPicker });

/* ---------- Juice landing page ---------- */
function pageJuice(el) {
  el.innerHTML = `<a class="back" href="#/">${I.arrowL} Home</a>
  <div class="eyebrow" style="color:${DRINK.juice.c}">🧃 Shop juice</div><h1>Brew from shop-bought juice</h1>
  <p class="lead">The cheapest, easiest way into home brewing. Supermarket juice already has everything yeast needs. Start with a bottle and a balloon, finish with sparkling sweet cider that rivals the shop stuff.</p>
  <div class="btns" style="margin-bottom:8px"><a class="btn pri" href="#/calc/juice">${I.drop} Open the juice wizard</a><a class="btn" href="#/calc/label">${I.ref} Check a label</a><a class="btn" href="#/guide/juice">Read the full guide</a></div>
  <h2>Skill ladder: super easy to expert</h2>
  <div id="jl"></div>
  <div style="display:none">${Data.levels.map(l => `<a class="card" href="#/calc/juice" style="--c:${DRINK.juice.c}" data-lvl="${l.n}">
    <div class="meta" style="margin:0 0 8px"><span class="pill c" style="--c:${DRINK.juice.c}">Level ${l.n}</span><span class="pill">${l.time}</span><span class="pill">${l.cost}</span></div>
    <h3>${l.em} ${l.name}</h3><p>${l.what}</p><p class="note" style="margin-top:8px"><b>You need:</b> ${l.gear.join(' · ')}</p><p class="note"><b>You'll learn:</b> ${l.learn}</p></a>`).join('')}</div>
  <h2>Which juices work?</h2>
  <div class="grid two">${Data.juices.filter(j => j.id !== 'water').map(j => `<div class="card" style="--c:${VERDICT[j.verdict][1]}">
    <div class="meta" style="margin:0 0 8px"><span class="pill c" style="--c:${VERDICT[j.verdict][1]}">${VERDICT[j.verdict][0]}</span><span class="pill">SG ${j.sg.toFixed(3)}</span><span class="pill">≈${fmt(Calc.abv(j.sg, 0.998), 1)}% natural</span></div>
    <h3>${j.name}</h3><p class="note" style="margin-bottom:6px">Makes: <b>${j.makes}</b></p><p>${j.tips}</p></div>`).join('')}</div>
  <div class="callout warn"><b>Rule 1</b><div>Buy <b>100% juice with no preservatives</b>. Potassium sorbate (E202) and sodium benzoate (E211) stop yeast dead. Vitamin C (ascorbic acid) is fine. <a href="#/calc/label">Label checker →</a></div></div>
  <h2>Juice recipes</h2><div class="grid">${Recipes.filter(r => r.juice).map(recipeCard).join('')}</div>
  <h2>Handy tools</h2><div class="grid">${['juice', 'label', 'yeastpick', 'sugar', 'priming', 'sweeten'].map(id => calcCard(Calcs.find(c => c.id === id))).join('')}</div>`;
  ladder($('#jl', el), 'juice');
  el.addEventListener('click', e => { const c = e.target.closest('[data-lvl]'); if (c) { const w = store.get('wizard', null) || { rows: [{ id: 'apple', L: 4.5 }], style: 'still-dry', abv: 0, start: today() }; w.level = +c.dataset.lvl; if (w.level === 1) w.rows = [{ id: 'apple', L: 1.5 }]; store.set('wizard', w); } });
}
