/* Brew Lab — standard calculators. Each one: fields + compute(vals) -> results HTML. */
const servingOpts = Data.servings.map(s => [s.ml, s.name]);
const sugarOpts = Object.entries(Calc.SUGARS).map(([k, s]) => [k, s.name]);
const sweetLabel = fg => (Data.sweetness.slice().reverse().find(s => fg >= parseFloat(s.range) - 0.0005) || Data.sweetness[0]).name;

/* hydrometer gauge: shows OG → FG on a scale */
function gauge(og, fg) {
  const lo = Math.min(0.990, fg - 0.004), hi = Math.max(og + 0.006, 1.03);
  const y = sg => 180 - ((sg - lo) / (hi - lo)) * 160;
  const ticks = [];
  for (let s = Math.ceil(lo * 100) / 100; s <= hi; s += 0.01) ticks.push(s);
  return `<svg viewBox="0 0 260 200" style="width:100%;max-width:340px;display:block;margin:0 auto">
    <rect x="96" y="8" width="44" height="184" rx="22" fill="#1a1410" stroke="#4a3a2d"/>
    <rect x="102" y="${y(og)}" width="32" height="${Math.max(0, 186 - y(og))}" rx="6" fill="rgba(245,165,36,.18)"/>
    <rect x="102" y="${y(fg)}" width="32" height="${Math.max(0, 186 - y(fg))}" rx="6" fill="rgba(245,165,36,.5)"/>
    ${ticks.map(s => `<line x1="140" x2="150" y1="${y(s)}" y2="${y(s)}" stroke="#7d6e61"/><text x="155" y="${y(s) + 4}" font-size="10" fill="#7d6e61" font-family="monospace">${s.toFixed(3)}</text>`).join('')}
    <line x1="40" x2="140" y1="${y(og)}" y2="${y(og)}" stroke="#ffc861" stroke-dasharray="3 3"/><text x="4" y="${y(og) - 4}" font-size="11" fill="#ffc861" font-family="monospace">OG ${og.toFixed(3)}</text>
    <line x1="40" x2="140" y1="${y(fg)}" y2="${y(fg)}" stroke="#a3d468" stroke-dasharray="3 3"/><text x="4" y="${y(fg) + 14}" font-size="11" fill="#a3d468" font-family="monospace">FG ${fg.toFixed(3)}</text>
    <path d="M70 ${y(og) + 6} L70 ${y(fg) - 6}" stroke="#ab9b8c" marker-end="url(#ah)"/><defs><marker id="ah" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ab9b8c"/></marker></defs>
  </svg>`;
}

defCalc({
  id: 'abv', title: 'ABV & attenuation', icon: 'percent', group: 'Essentials',
  desc: 'Alcohol from your OG and FG, plus attenuation, calories and UK units.',
  fields: [
    { k: 'og', l: 'Original gravity', v: '1.050', step: 0.001 },
    { k: 'fg', l: 'Final / current gravity', v: '1.010', step: 0.001 },
    { k: 'ml', l: 'Serving', t: 'sel', v: 568, o: servingOpts, wide: true },
  ],
  compute: ({ og, fg, ml }) => {
    if (!(og > fg)) return `<div class="note">OG must be higher than FG.</div>`;
    const abv = Calc.abv(og, fg), simple = Calc.abvSimple(og, fg);
    const units = Calc.ukUnits(abv, +ml);
    return `<div class="stats">
      ${stat('Alcohol', fmt(abv, 1), '% ABV', og > 1.07 ? `High-gravity formula · simple formula ${fmt(simple, 1)}%` : `Simple formula · (OG−FG)×131.25`, 'big')}
      ${stat('Apparent att.', fmt(Calc.apparentAtt(og, fg), 0), '%')}
      ${stat('Real att.', fmt(Calc.realAtt(og, fg), 0), '%')}
      ${stat('ABW', fmt(Calc.abw(abv, fg), 1), '%')}
      ${stat('UK units', fmt(units, 1), '', `per ${ml} ml serving`)}
      ${stat('Calories', fmt(Calc.calories(og, fg, +ml), 0), 'kcal', 'approx, per serving')}
      ${stat('Sweetness', sweetLabel(fg), '', `FG ${sgf(fg)}`)}
    </div>${gauge(og, fg)}`;
  },
});

defCalc({
  id: 'sugar', title: 'Sugar for target ABV', icon: 'sugar', group: 'Wine, cider & mead',
  desc: 'How much sugar, honey or malt to add to juice, must or wort to reach a target strength.',
  fields: [
    { k: 'base', l: 'Starting liquid', t: 'sel', v: 'Supermarket apple juice', wide: true,
      o: [...Data.bases.map(b => [b.name, `${b.name} (≈${b.sg.toFixed(3)})`, { cur: b.sg.toFixed(3) }]), ['custom', 'Custom / measured']] },
    { k: 'L', l: 'Volume', v: 4.5, u: 'L', step: 0.1 },
    { k: 'cur', l: 'Current gravity', v: '1.048', step: 0.001, hint: 'Measure it if you can.' },
    { k: 'abv', l: 'Target ABV', v: 8, u: '%', step: 0.5 },
    { k: 'fg', l: 'Expected final gravity', t: 'sel', v: '0.998', o: Data.sweetness.map(s => [s.fg.toFixed(3), `${s.name} (${s.fg.toFixed(3)})`]) },
    { k: 'sugar', l: 'Sugar type', t: 'sel', v: 'sucrose', o: sugarOpts },
    { k: 'mode', l: 'How you add it', t: 'sel', v: 'dissolve', o: [['dissolve', 'Dissolve into the liquid (volume grows)'], ['topup', 'Top up to a fixed final volume']] },
  ],
  compute: ({ L, cur, abv, fg, sugar, mode }) => {
    fg = parseFloat(fg);
    const targetOG = fg + abv / 131.25;
    const natural = Calc.abvSimple(cur, fg);
    if (targetOG <= cur) return `<div class="stats">${stat('No sugar needed', fmt(natural, 1), '% potential', `Your liquid already reaches ${fmt(natural, 1)}% if it ferments to ${sgf(fg)}.`, 'big')}</div>`;
    const r = Calc.sugarToRaise(L, cur, targetOG, sugar, mode);
    const others = Object.keys(Calc.SUGARS).filter(k => k !== sugar).map(k => {
      const o = Calc.sugarToRaise(L, cur, targetOG, k, mode);
      return `<tr><td>${Calc.SUGARS[k].name}</td><td class="num">${fmt(o.kg * 1000, 0)} g</td></tr>`;
    }).join('');
    return `<div class="stats">
      ${stat('Add', r.kg >= 1 ? fmt(r.kg, 2) : fmt(r.kg * 1000, 0), r.kg >= 1 ? 'kg' : 'g', Calc.SUGARS[sugar].name, 'big')}
      ${stat('Target OG', sgf(targetOG))}
      ${stat('Final volume', fmt(r.finalL, 2), 'L')}
      ${stat('Without sugar', fmt(natural, 1), '% ABV')}
      ${stat('Sugar / litre', fmt(r.kg * 1000 / r.finalL, 0), 'g/L')}
    </div>
    <div class="tbl-wrap"><table class="tbl"><tr><th>Or use instead</th><th>Amount</th></tr>${others}</table></div>
    <p class="note">Add sugar dissolved in a little warm juice or water, then <b>measure the gravity</b> to confirm. Above ~8% cider starts to taste like apple wine; check your yeast's alcohol tolerance for anything over 12%.</p>`;
  },
});

defCalc({
  id: 'priming', title: 'Priming sugar', icon: 'bubbles', group: 'Packaging',
  desc: 'Sugar for bottle carbonation, accounting for CO₂ already in the beer.',
  fields: [
    { k: 'style', l: 'Style preset', t: 'sel', v: 'American pale / IPA', wide: true, o: Data.carbStyles.map(s => [s.name, `${s.name} — ${s.v} vols`, { vols: s.v }]) },
    { k: 'L', l: 'Volume being bottled', v: 20, u: 'L', step: 0.5 },
    { k: 'vols', l: 'Target carbonation', v: 2.4, u: 'vol', step: 0.1 },
    { k: 'temp', l: 'Warmest ferment temp', v: 20, u: '°C', step: 1, hint: 'Highest temperature it reached.' },
    { k: 'primer', l: 'Sugar', t: 'sel', v: 'sucrose', o: Object.entries(Calc.PRIMERS).map(([k, p]) => [k, p.name]) },
    { k: 'bottle', l: 'Bottle size', t: 'sel', v: 500, o: [[330, '330 ml'], [440, '440 ml'], [500, '500 ml'], [568, '568 ml (pint)'], [750, '750 ml'], [1000, '1 L swing-top'], [2000, '2 L PET']] },
  ],
  compute: ({ L, vols, temp, primer, bottle }) => {
    const r = Calc.primingSugar(L, vols, temp, primer);
    const n = Math.floor(L * 1000 / bottle);
    const per = r.grams / (L * 1000 / bottle);
    return `<div class="stats">
      ${stat('Total priming sugar', fmt(r.grams, 0), 'g', Calc.PRIMERS[primer].name + ' — boil in ~200 ml water', 'big')}
      ${stat('Per bottle', fmt(per, 1), 'g', `if dosing bottles individually (${bottle} ml)`)}
      ${stat('Bottles', n, '', `× ${bottle} ml`)}
      ${stat('Already dissolved', fmt(r.residual, 2), 'vol', `at ${temp} °C`)}
      ${stat('Sugar per litre', fmt(r.grams / L, 1), 'g/L')}
    </div>
    ${vols > 3 ? `<div class="callout warn"><b>Careful</b><div>${vols} volumes is above what standard beer bottles are designed for (≈3). Use heavy Belgian/champagne bottles or swing-tops rated for it.</div></div>` : ''}
    <p class="note">Only prime once the <b>gravity has been stable for 3 days</b>. Bottles need 2 weeks at 18–22 °C to carbonate.</p>`;
  },
});

defCalc({
  id: 'keg', title: 'Keg carbonation', icon: 'keg', group: 'Packaging',
  desc: 'Regulator pressure to force-carbonate a keg at your fridge temperature.',
  fields: [
    { k: 'vols', l: 'Target carbonation', v: 2.4, u: 'vol', step: 0.1 },
    { k: 'temp', l: 'Beer temperature', v: 4, u: '°C', step: 0.5 },
  ],
  compute: ({ vols, temp }) => {
    const psi = Calc.kegPSI(vols, temp);
    const rows = [1, 2, 4, 6, 8, 10, 12].map(t => {
      const p = Calc.kegPSI(vols, t);
      return `<tr><td class="num">${t} °C</td><td class="num">${fmt(Math.max(0, p), 1)} psi</td><td class="num">${fmt(Math.max(0, p) * 0.0689476, 2)} bar</td></tr>`;
    }).join('');
    return `<div class="stats">
      ${stat('Set regulator to', fmt(Math.max(0, psi), 1), 'psi', `${fmt(Math.max(0, psi) * 0.0689476, 2)} bar · ${vols} vols at ${temp} °C`, 'big')}
    </div>
    <div class="tbl-wrap"><table class="tbl"><tr><th>Temp</th><th>PSI</th><th>Bar</th></tr>${rows}</table></div>
    <p class="note">Set-and-forget takes about 7–14 days. Burst carbonating at 30 psi for 24–36 h then dropping to this pressure is quicker. Use about 3 m of 3/16" beer line to balance a typical setup.</p>`;
  },
});

defCalc({
  id: 'hydrotemp', title: 'Hydrometer temperature correction', icon: 'therm', group: 'Essentials',
  desc: 'Correct a reading taken at the wrong temperature.',
  fields: [
    { k: 'sg', l: 'Reading', v: '1.050', step: 0.001 },
    { k: 't', l: 'Sample temperature', v: 30, u: '°C', step: 0.5 },
    { k: 'cal', l: 'Hydrometer calibrated at', t: 'sel', v: 20, o: [[20, '20 °C (most UK/EU)'], [15.6, '15.6 °C / 60 °F'], [15, '15 °C']], wide: true },
  ],
  compute: ({ sg, t, cal }) => {
    const c = Calc.hydroCorrect(sg, t, +cal);
    return `<div class="stats">${stat('Corrected gravity', sgf(c), '', `${c >= sg ? '+' : ''}${fmt((c - sg) * 1000, 1)} points`, 'big')}</div>
    <p class="note">Corrections are reliable within about ±15 °C of calibration. For accuracy, cool the sample to near ${cal} °C. Hot wort also evaporates and can crack glass hydrometers.</p>`;
  },
});

defCalc({
  id: 'refrac', title: 'Refractometer', icon: 'prism', group: 'Essentials',
  desc: 'Convert Brix to gravity, including the correction once alcohol is present.',
  fields: [
    { k: 'ob', l: 'Original Brix', v: 12, u: '°Bx', step: 0.1 },
    { k: 'fb', l: 'Current Brix (optional)', v: 6.4, u: '°Bx', step: 0.1, hint: 'Leave at 0 for an unfermented reading.' },
    { k: 'wcf', l: 'Wort correction factor', v: 1.04, step: 0.01, hint: '1.04 for wort; 1.00 for juice/must.' },
  ],
  compute: ({ ob, fb, wcf }) => {
    const og = Calc.refracOG(ob, wcf);
    if (!fb) return `<div class="stats">${stat('Gravity', sgf(og), '', `${fmt(ob / wcf, 1)} °Plato`, 'big')}</div>`;
    const fg = Calc.refracFG(ob, fb, wcf);
    return `<div class="stats">
      ${stat('Current gravity', sgf(fg), '', 'alcohol-corrected (Terrill)', 'big')}
      ${stat('OG', sgf(og))}
      ${stat('ABV so far', fmt(Calc.abv(og, fg), 1), '%')}
      ${stat('Apparent att.', fmt(Calc.apparentAtt(og, fg), 0), '%')}
      ${stat('Uncorrected (wrong)', sgf(Calc.brixToSg(fb / wcf)), '', 'what the raw reading suggests')}
    </div>`;
  },
});

defCalc({
  id: 'water', title: 'Mash water & strike temp', icon: 'pot', group: 'Beer',
  desc: 'Water volumes for BIAB or a mash tun, strike temperature and whether it fits your pot.',
  fields: [
    { k: 'method', l: 'Method', t: 'sel', v: 'biab', wide: true, o: [['biab', 'Full-volume BIAB (no sparge)'], ['tun', 'Mash tun + sparge']] },
    { k: 'L', l: 'Into fermenter', v: 23, u: 'L', step: 0.5 },
    { k: 'kg', l: 'Grain weight', v: 4.5, u: 'kg', step: 0.1 },
    { k: 'boil', l: 'Boil time', v: 60, u: 'min', step: 5 },
    { k: 'off', l: 'Boil-off rate', v: 3, u: 'L/h', step: 0.5, hint: 'Measure yours. 2–4 L/h typical.' },
    { k: 'trub', l: 'Kettle/trub loss', v: 1.5, u: 'L', step: 0.5 },
    { k: 'abs', l: 'Grain absorption', v: 0.8, u: 'L/kg', step: 0.1, hint: 'BIAB squeezed ≈0.6–0.8, tun ≈1.0' },
    { k: 'ratio', l: 'Mash thickness', v: 2.7, u: 'L/kg', step: 0.1, show: v => v.method === 'tun' },
    { k: 'gt', l: 'Grain temperature', v: 18, u: '°C', step: 1 },
    { k: 'mt', l: 'Mash target', v: 66, u: '°C', step: 0.5 },
    { k: 'pot', l: 'Pot size', v: 35, u: 'L', step: 1 },
    { k: 'og', l: 'Target OG (optional)', v: '1.050', step: 0.001 },
  ],
  compute: v => {
    const p = Calc.waterPlan({ batchL: v.L, grainKg: v.kg, boilMin: v.boil, boilOffLph: v.off, trubL: v.trub, absorbLpkg: v.abs });
    const mashWater = v.method === 'biab' ? p.total : v.kg * v.ratio;
    const sparge = p.total - mashWater;
    const ratio = mashWater / v.kg;
    const strike = Calc.strikeTemp(ratio, v.gt, v.mt);
    const mashVol = mashWater + v.kg * 0.67;
    const fill = mashVol / v.pot * 100;
    const pre = v.og > 1 ? 1 + (v.og - 1) * p.postBoil / p.preBoil : NaN;
    return `<div class="stats">
      ${stat(v.method === 'biab' ? 'Total water' : 'Mash water', fmt(mashWater, 1), 'L', v.method === 'biab' ? 'all in the pot from the start' : `${fmt(ratio, 1)} L/kg`, 'big')}
      ${stat('Strike temp', fmt(strike, 1), '°C', `to settle at ${v.mt} °C`)}
      ${v.method === 'tun' ? stat('Sparge water', fmt(sparge, 1), 'L', 'at 75–77 °C') : stat('Total water', fmt(p.total, 1), 'L')}
      ${stat('Pre-boil volume', fmt(p.preBoil, 1), 'L')}
      ${stat('Post-boil (hot)', fmt(p.postBoil, 1), 'L')}
      ${stat('Grain absorbs', fmt(p.absorb, 1), 'L')}
      ${isFinite(pre) ? stat('Pre-boil gravity', sgf(pre), '', 'check with a cooled sample') : ''}
      ${stat('Mash volume', fmt(mashVol, 1), 'L', `${fmt(fill, 0)}% of your pot`)}
    </div>
    <div class="range"><span class="lbl">Pot</span><div class="bar"><div class="band" style="left:0;width:${Math.min(100, fill)}%;background:${fill > 95 ? 'rgba(255,107,91,.45)' : 'rgba(245,165,36,.35)'}"></div></div><span class="val">${fmt(fill, 0)}%</span></div>
    ${fill > 95 ? `<div class="callout warn"><b>Won't fit</b><div>Grain plus water is bigger than your pot. Hold back some water and add it as a "dunk sparge" or top-up, or brew a smaller batch.</div></div>` : ''}
    <p class="note">Assumes 4% cooling shrinkage and 0.67 L of volume per kg of grain. Once you've brewed, tweak boil-off and absorption to match reality.</p>`;
  },
});

defCalc({
  id: 'yeast', title: 'Yeast pitch rate', icon: 'yeast', group: 'Beer',
  desc: 'How many sachets or packs to pitch for a healthy fermentation.',
  fields: [
    { k: 'L', l: 'Batch volume', v: 23, u: 'L', step: 0.5 },
    { k: 'og', l: 'Original gravity', v: '1.050', step: 0.001 },
    { k: 'rate', l: 'Beer type', t: 'sel', v: 0.75, wide: true, o: [[0.75, 'Ale (0.75 M cells/ml/°P)'], [1.0, 'Strong ale over 1.060 (1.0)'], [1.5, 'Lager (1.5)'], [2.0, 'Strong lager (2.0)']] },
    { k: 'form', l: 'Yeast form', t: 'sel', v: 'dry', o: [['dry', 'Dry sachet'], ['liquid', 'Liquid pack/vial']] },
    { k: 'g', l: 'Sachet size', v: 11.5, u: 'g', step: 0.5, show: v => v.form === 'dry' },
    { k: 'cpg', l: 'Cells per gram', v: 10, u: 'B', step: 1, show: v => v.form === 'dry', hint: '6–20 B/g depending on strain.' },
    { k: 'age', l: 'Days since made', v: 30, u: 'days', step: 1, show: v => v.form === 'liquid' },
    { k: 'pack', l: 'Cells when fresh', v: 100, u: 'B', step: 10, show: v => v.form === 'liquid' },
  ],
  compute: v => {
    const need = Calc.cellsNeeded(v.L, v.og, +v.rate);
    let per, label;
    if (v.form === 'dry') { per = v.g * v.cpg; label = 'sachets'; } else { per = v.pack * Calc.liquidViability(v.age) / 100; label = 'packs'; }
    const n = need / per;
    return `<div class="stats">
      ${stat('Pitch', Math.max(1, Math.ceil(n - 0.15)), label, `${fmt(n, 2)} exactly`, 'big')}
      ${stat('Cells needed', fmt(need, 0), 'billion')}
      ${stat(v.form === 'dry' ? 'Per sachet' : 'Per pack now', fmt(per, 0), 'billion', v.form === 'liquid' ? `${fmt(Calc.liquidViability(v.age), 0)}% viable` : '')}
    </div>
    <p class="note">Under-pitching causes long lag times, off-flavours and stuck ferments. Over-pitching slightly is rarely a problem with dry yeast. For liquid yeast, a <b>starter</b> (1–2 L of 1.036 wort on a stir plate) multiplies cells cheaply.</p>`;
  },
});

defCalc({
  id: 'dilute', title: 'Dilute, concentrate & blend', icon: 'mix', group: 'Essentials',
  desc: 'Hit a target gravity with water or boiling, or blend two batches.',
  fields: [
    { k: 'mode', l: 'Mode', t: 'sel', v: 'adjust', wide: true, o: [['adjust', 'Adjust gravity (water / boil-off)'], ['blend', 'Blend two liquids']] },
    { k: 'L', l: 'Current volume', v: 20, u: 'L', step: 0.5, show: v => v.mode === 'adjust' },
    { k: 'sg', l: 'Current gravity', v: '1.058', step: 0.001, show: v => v.mode === 'adjust' },
    { k: 'tsg', l: 'Target gravity', v: '1.050', step: 0.001, show: v => v.mode === 'adjust' },
    { k: 'l1', l: 'A: volume', v: 10, u: 'L', step: 0.5, show: v => v.mode === 'blend' },
    { k: 'g1', l: 'A: gravity', v: '1.010', step: 0.001, show: v => v.mode === 'blend' },
    { k: 'a1', l: 'A: ABV', v: 6, u: '%', step: 0.1, show: v => v.mode === 'blend' },
    { k: 'l2', l: 'B: volume', v: 5, u: 'L', step: 0.5, show: v => v.mode === 'blend' },
    { k: 'g2', l: 'B: gravity', v: '1.000', step: 0.001, show: v => v.mode === 'blend' },
    { k: 'a2', l: 'B: ABV', v: 12, u: '%', step: 0.1, show: v => v.mode === 'blend' },
  ],
  compute: v => {
    if (v.mode === 'blend') {
      const b = Calc.blend([{ l: v.l1, sg: v.g1, abv: v.a1 }, { l: v.l2, sg: v.g2, abv: v.a2 }]);
      return `<div class="stats">${stat('Blend ABV', fmt(b.abv, 1), '%', '', 'big')}${stat('Gravity', sgf(b.sg))}${stat('Volume', fmt(b.l, 1), 'L')}</div>
      <p class="note">Blending is the easiest way to fix a batch that came out too sweet, too dry, too strong or too sharp. Try small ratios in a glass first.</p>`;
    }
    const r = Calc.dilute(v.L, v.sg, v.tsg);
    const add = r.changeL >= 0;
    return `<div class="stats">${stat(add ? 'Add water' : 'Boil off', fmt(Math.abs(r.changeL), 2), 'L', add ? 'use boiled & cooled or sterile water post-boil' : 'or add extract/sugar instead', 'big')}${stat('Final volume', fmt(r.finalL, 2), 'L')}</div>
    <p class="note">Gravity points × volume stays constant: ${fmt(Calc.pts(v.sg), 0)} pts × ${v.L} L = ${fmt(Calc.pts(v.tsg), 0)} pts × ${fmt(r.finalL, 2)} L.</p>`;
  },
});

defCalc({
  id: 'mead', title: 'Mead designer', icon: 'honey', group: 'Wine, cider & mead',
  desc: 'Honey for your target strength, predicted sweetness from yeast tolerance, and a dated nutrient schedule.',
  fields: [
    { k: 'L', l: 'Batch volume', v: 4.5, u: 'L', step: 0.5 },
    { k: 'base', l: 'Liquid', t: 'sel', v: 'water', o: [['water', 'Water (traditional)'], ['apple', 'Apple juice (cyser)'], ['grape', 'Grape juice (pyment)']] },
    { k: 'og', l: 'Target OG', v: '1.100', step: 0.005, hint: '1.060 session · 1.100 standard · 1.130 sack' },
    { k: 'yeast', l: 'Yeast', t: 'sel', v: 'Lalvin 71B', wide: true, o: Data.yeasts.filter(y => y.kind === 'wine').map(y => [y.name, `${y.name} — tolerates ~${y.tol}%`, { tol: y.tol }]).concat([['custom', 'Other (set tolerance)']]) },
    { k: 'tol', l: 'Yeast alcohol tolerance', v: 14, u: '%', step: 0.5 },
    { k: 'demand', l: 'Yeast nitrogen need', t: 'sel', v: 'medium', o: [['low', 'Low (EC-1118, QA23, K1-V1116)'], ['medium', 'Medium (71B, D47)'], ['high', 'High (some ale yeasts)']] },
    { k: 'date', l: 'Pitch date', t: 'date', v: today(), wide: true },
  ],
  compute: v => {
    const baseSg = { water: 1.0, apple: 1.048, grape: 1.070 }[v.base];
    if (v.og <= baseSg) return `<div class="note">Target OG must be above your liquid's gravity (${sgf(baseSg)}).</div>`;
    const honey = (Calc.pts(v.og) - Calc.pts(baseSg)) * v.L / Calc.SUGARS.honey.pkl;
    const liquid = v.L - honey * Calc.SUGARS.honey.lpkg;
    const fg = Calc.fgFromTolerance(v.og, v.tol);
    const abv = Calc.abv(v.og, fg);
    const t = Calc.tosna(v.L, v.og, v.demand);
    const third = v.og - (v.og - fg) / 3;
    const sched = [
      ['24 hours', addDays(v.date, 1)], ['48 hours', addDays(v.date, 2)], ['72 hours', addDays(v.date, 3)],
      [`⅓ sugar break (≈${sgf(third)})`, addDays(v.date, 6) + ' (approx)'],
    ];
    return `<div class="stats">
      ${stat('Honey', fmt(honey, 2), 'kg', `then ${v.base === 'water' ? 'water' : 'juice'} to ${v.L} L (≈${fmt(liquid, 1)} L)`, 'big')}
      ${stat('Predicted ABV', fmt(abv, 1), '%')}
      ${stat('Predicted FG', sgf(fg), '', sweetLabel(fg))}
      ${stat('Potential if fully dry', fmt(Calc.abv(v.og, 0.996), 1), '%')}
      ${stat('Starting Brix', fmt(t.brix, 1), '°Bx')}
      ${stat('Nitrogen target', fmt(t.yan, 0), 'ppm YAN')}
    </div>
    ${fg > 1.002 ? `<div class="callout info"><b>Sweet</b><div>Your yeast should stop at ~${fmt(v.tol, 0)}%, leaving it <b>${sweetLabel(fg).toLowerCase()}</b>. Still stabilise before bottling: tolerance is approximate, and a happy yeast often goes further.</div></div>` : ''}
    <h3 style="margin:6px 0 0">Nutrient schedule (TOSNA)</h3>
    <div class="tbl-wrap"><table class="tbl"><tr><th>When</th><th>Date</th><th>Fermaid-O</th></tr>
    ${sched.map(([w, d]) => `<tr><td>${w}</td><td>${d.includes('approx') ? nice(d.split(' ')[0]) + ' approx' : nice(d)}</td><td class="num">${fmt(t.dose, 1)} g</td></tr>`).join('')}
    <tr><td><b>Total</b></td><td></td><td class="num"><b>${fmt(t.fermaidO, 1)} g</b></td></tr></table></div>
    <p class="note">Degas before each addition, then add slowly (it foams). Using a different nutrient? Follow its pack dose but keep the same 4-step timing. TOSNA figures are a well-tested community guideline, not exact science.</p>`;
  },
});

defCalc({
  id: 'sweeten', title: 'Stabilise & back-sweeten', icon: 'candy', group: 'Wine, cider & mead',
  desc: 'Sorbate + Campden doses and how much sugar or honey to reach your sweetness.',
  fields: [
    { k: 'L', l: 'Volume', v: 4.5, u: 'L', step: 0.5 },
    { k: 'cur', l: 'Current gravity', v: '0.996', step: 0.001 },
    { k: 'target', l: 'Target sweetness', t: 'sel', v: '1.010', wide: true, o: Data.sweetness.map(s => [s.fg.toFixed(3), `${s.name} (${s.range})`, { tsg: s.fg.toFixed(3) }]) },
    { k: 'tsg', l: 'Target gravity', v: '1.010', step: 0.001 },
    { k: 'sugar', l: 'Sweeten with', t: 'sel', v: 'sucrose', o: sugarOpts.filter(([k]) => k !== 'lme') },
  ],
  compute: v => {
    const g = Calc.sweetenGrams(v.L, v.cur, v.tsg, v.sugar);
    const campden = v.L / 4.5;
    return `<div class="stats">
      ${stat('Add', fmt(g, 0), 'g', `${Calc.SUGARS[v.sugar].name} → ${sgf(v.tsg)}`, 'big')}
      ${stat('Potassium sorbate', fmt(v.L * 0.2, 1), 'g', '≈0.2 g per litre')}
      ${stat('Campden tablets', fmt(campden, 1), '', `or ${fmt(v.L * 0.1, 2)} g potassium metabisulphite`)}
    </div>
    <div class="callout tip"><b>Order</b><div>1) Make sure fermentation has finished and the drink is racked off the lees. 2) Add sorbate + crushed Campden, stir gently. 3) Wait 24–48 h. 4) Add about ¾ of the sugar, taste, then adjust. Dissolve sugar in a little of the drink first.</div></div>
    <p class="note">Stabilised drinks <b>cannot</b> be bottle-carbonated: the yeast won't eat priming sugar. For sweet <i>and</i> sparkling, use a non-fermentable sweetener or a keg.</p>`;
  },
});

defCalc({
  id: 'units', title: 'Units, calories & cost', icon: 'pint', group: 'Essentials',
  desc: 'UK alcohol units per serving and what a pint of your homebrew really costs.',
  fields: [
    { k: 'abv', l: 'ABV', v: 5, u: '%', step: 0.1 },
    { k: 'ml', l: 'Serving', t: 'sel', v: 568, o: servingOpts },
    { k: 'cost', l: 'Batch ingredient cost', v: 30, u: '£', step: 1 },
    { k: 'L', l: 'Batch volume', v: 23, u: 'L', step: 0.5 },
    { k: 'shop', l: 'Shop/pub price per serving', v: 5.5, u: '£', step: 0.1, wide: true },
  ],
  compute: v => {
    const units = Calc.ukUnits(v.abv, +v.ml);
    const per = v.cost / (v.L * 1000 / v.ml);
    const n = Math.floor(v.L * 1000 / v.ml);
    const kcalAlc = v.ml * v.abv / 100 * 0.789 * 7;
    return `<div class="stats">
      ${stat('Units', fmt(units, 1), '', `per ${v.ml} ml`, 'big')}
      ${stat('Servings = 14 units', fmt(14 / units, 1), '', 'the weekly low-risk guideline')}
      ${stat('Calories from alcohol', fmt(kcalAlc, 0), 'kcal', 'plus residual sugar')}
      ${stat('Cost per serving', '£' + fmt(per, 2))}
      ${stat('Servings per batch', n)}
      ${stat('Saving vs shop', '£' + fmt((v.shop - per) * n, 0), '', `£${fmt(v.shop - per, 2)} each`)}
    </div>
    <p class="note">UK guidance: no more than <b>14 units a week</b>, spread over three or more days.</p>`;
  },
});

/* ---------- Converter (custom render) ---------- */
defCalc({
  id: 'convert', title: 'Unit & gravity converter', icon: 'swap', group: 'Essentials',
  desc: 'SG ⇄ Plato ⇄ Brix, °C ⇄ °F, litres ⇄ gallons, kg ⇄ lb.',
  render(el) {
    el.innerHTML = `<div class="grid two">
      <div class="panel"><h3>Gravity</h3><div class="fields">
        <div class="field"><label>Specific gravity</label><div class="inp"><input id="cv-sg" type="number" step="0.001" inputmode="decimal" value="1.048"></div></div>
        <div class="field"><label>°Plato / °Brix</label><div class="inp"><input id="cv-p" type="number" step="0.1" inputmode="decimal"></div></div>
      </div><p class="note" id="cv-sgn"></p></div>
      <div class="panel"><h3>Temperature</h3><div class="fields">
        <div class="field"><label>Celsius</label><div class="inp"><input id="cv-c" type="number" step="0.5" inputmode="decimal" value="20" class="has-u"><span class="u">°C</span></div></div>
        <div class="field"><label>Fahrenheit</label><div class="inp"><input id="cv-f" type="number" step="0.5" inputmode="decimal" class="has-u"><span class="u">°F</span></div></div>
      </div></div>
      <div class="panel"><h3>Volume</h3><div class="fields">
        <div class="field"><label>Litres</label><div class="inp"><input id="cv-l" type="number" step="0.1" inputmode="decimal" value="23" class="has-u"><span class="u">L</span></div></div>
        <div class="field"><label>UK gallons</label><div class="inp"><input id="cv-ukg" type="number" step="0.1" inputmode="decimal" class="has-u"><span class="u">gal</span></div></div>
        <div class="field"><label>US gallons</label><div class="inp"><input id="cv-usg" type="number" step="0.1" inputmode="decimal" class="has-u"><span class="u">gal</span></div></div>
        <div class="field"><label>UK pints</label><div class="inp"><input id="cv-pt" type="number" step="1" inputmode="decimal" class="has-u"><span class="u">pt</span></div></div>
      </div></div>
      <div class="panel"><h3>Weight</h3><div class="fields">
        <div class="field"><label>Kilograms</label><div class="inp"><input id="cv-kg" type="number" step="0.01" inputmode="decimal" value="1" class="has-u"><span class="u">kg</span></div></div>
        <div class="field"><label>Pounds</label><div class="inp"><input id="cv-lb" type="number" step="0.01" inputmode="decimal" class="has-u"><span class="u">lb</span></div></div>
        <div class="field"><label>Grams</label><div class="inp"><input id="cv-g" type="number" step="1" inputmode="decimal" class="has-u"><span class="u">g</span></div></div>
        <div class="field"><label>Ounces</label><div class="inp"><input id="cv-oz" type="number" step="0.1" inputmode="decimal" class="has-u"><span class="u">oz</span></div></div>
      </div></div></div>`;
    const set = (id, v, d) => { const e = $('#' + id, el); if (document.activeElement !== e) e.value = isFinite(v) ? Number(v.toFixed(d)) : ''; };
    const groups = {
      'cv-sg': x => { set('cv-p', Calc.sgToPlato(x), 1); note(x); }, 'cv-p': x => { set('cv-sg', Calc.platoToSg(x), 3); note(Calc.platoToSg(x)); },
      'cv-c': x => set('cv-f', Calc.CtoF(x), 1), 'cv-f': x => set('cv-c', Calc.FtoC(x), 1),
      'cv-l': x => { set('cv-ukg', x / 4.54609, 2); set('cv-usg', x / 3.78541, 2); set('cv-pt', x / 0.568261, 1); },
      'cv-ukg': x => groups['cv-l'](x * 4.54609, set('cv-l', x * 4.54609, 2)),
      'cv-usg': x => groups['cv-l'](x * 3.78541, set('cv-l', x * 3.78541, 2)),
      'cv-pt': x => groups['cv-l'](x * 0.568261, set('cv-l', x * 0.568261, 2)),
      'cv-kg': x => { set('cv-lb', x * 2.20462, 2); set('cv-g', x * 1000, 0); set('cv-oz', x * 35.274, 1); },
      'cv-lb': x => groups['cv-kg'](x / 2.20462, set('cv-kg', x / 2.20462, 3)),
      'cv-g': x => groups['cv-kg'](x / 1000, set('cv-kg', x / 1000, 3)),
      'cv-oz': x => groups['cv-kg'](x / 35.274, set('cv-kg', x / 35.274, 3)),
    };
    const note = sg => { $('#cv-sgn', el).textContent = `${fmt(Calc.pts(sg), 0)} gravity points · potential ${fmt(Calc.abvSimple(sg, 1.0), 1)}% ABV if fermented to 1.000`; };
    el.addEventListener('input', e => { const f = groups[e.target.id]; if (f) f(parseFloat(e.target.value)); });
    ['cv-sg', 'cv-c', 'cv-l', 'cv-kg'].forEach(id => groups[id](parseFloat($('#' + id, el).value)));
  },
});
