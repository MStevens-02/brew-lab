/* Brew Lab — pure brewing maths. No DOM here so it can be unit-tested in Node.
   Gravity "points" = (SG - 1) * 1000.  PKL = gravity points per kg per litre. */
(function (root) {
  const C = {};

  C.PPG_TO_PKL = 8.3454; // points/lb/US gal  ->  points/kg/L
  C.pts = sg => (sg - 1) * 1000;
  C.sg = pts => 1 + pts / 1000;
  C.FtoC = f => (f - 32) * 5 / 9;
  C.CtoF = c => c * 9 / 5 + 32;

  /* ---------- Gravity scales ---------- */
  C.sgToPlato = sg => -616.868 + 1111.14 * sg - 630.272 * sg * sg + 135.997 * sg * sg * sg;
  C.platoToSg = p => 1 + p / (258.6 - (p / 258.2) * 227.1);
  C.brixToSg = C.platoToSg; // close enough for brewing (Brix ≈ °Plato)
  C.sgToBrix = C.sgToPlato;

  /* ---------- Alcohol ---------- */
  C.abvSimple = (og, fg) => (og - fg) * 131.25;
  // Better at high gravity (wine, mead, barley wine)
  C.abvAlt = (og, fg) => (76.08 * (og - fg) / (1.775 - og)) * (fg / 0.794);
  C.abv = (og, fg) => (og > 1.07 ? C.abvAlt(og, fg) : C.abvSimple(og, fg));
  C.abw = (abv, fg) => (0.79336 * abv) / fg;
  C.apparentAtt = (og, fg) => (og - fg) / (og - 1) * 100;
  C.realAtt = (og, fg) => {
    const oe = C.sgToPlato(og), ae = C.sgToPlato(fg);
    const re = 0.1808 * oe + 0.8192 * ae;
    return (1 - re / oe) * 100;
  };
  // kcal per given mL (ASBC-style formula, scaled from 12 US fl oz)
  C.calories = (og, fg, ml) => {
    const oe = C.sgToPlato(og), ae = C.sgToPlato(fg);
    const re = 0.1808 * oe + 0.8192 * ae;
    const abw = (oe - re) / (2.0665 - 0.010665 * oe);
    const per355 = (6.9 * abw + 4.0 * (re - 0.1)) * fg * 3.55;
    return Math.max(0, per355 * ml / 355);
  };
  C.ukUnits = (abv, ml) => abv * ml / 1000;
  // Gravity left when yeast hits its alcohol tolerance
  C.fgFromTolerance = (og, tolAbv, floor = 0.996) => {
    if (C.abv(og, floor) <= tolAbv) return floor;
    // solve numerically on the accurate formula
    let lo = floor, hi = og;
    for (let i = 0; i < 60; i++) {
      const mid = (lo + hi) / 2;
      if (C.abv(og, mid) > tolAbv) lo = mid; else hi = mid;
    }
    return (lo + hi) / 2;
  };

  /* ---------- Hydrometer & refractometer ---------- */
  // Temperature correction. Temps in °C, inputs converted to °F for the polynomial.
  C.hydroCorrect = (sg, readC, calC = 20) => {
    const f = t => 1.00130346 - 0.000134722124 * t + 0.00000204052596 * t * t - 0.00000000232820948 * t * t * t;
    const tr = C.CtoF(readC), tc = C.CtoF(calC);
    return sg * (f(tr) / f(tc));
  };
  // Terrill cubic: final gravity from original & current Brix readings (alcohol present)
  C.refracFG = (obx, fbx, wcf = 1.04) => {
    const ob = obx / wcf, fb = fbx / wcf;
    return 1.0 - 0.0044993 * ob + 0.011774 * fb + 0.00027581 * ob * ob - 0.0012717 * fb * fb
      - 0.00000728 * ob * ob * ob + 0.000063293 * fb * fb * fb;
  };
  C.refracOG = (obx, wcf = 1.04) => C.brixToSg(obx / wcf);

  /* ---------- Carbonation ---------- */
  // Dissolved CO2 left after fermentation at the warmest temp reached (°C)
  C.residualCO2 = c => { const t = C.CtoF(c); return 3.0378 - 0.050062 * t + 0.00026555 * t * t; };
  // grams of priming sugar per litre per volume of CO2
  C.PRIMERS = {
    sucrose:  { name: 'Table sugar (sucrose)', gpl: 3.82 },
    dextrose: { name: 'Brewing sugar / dextrose', gpl: 4.18 },
    dme:      { name: 'Dried malt extract', gpl: 5.33 },
    honey:    { name: 'Honey', gpl: 4.85 },
    maple:    { name: 'Maple syrup', gpl: 5.6 },
  };
  C.primingSugar = (litres, targetVols, maxTempC, primer = 'sucrose') => {
    const resid = C.residualCO2(maxTempC);
    const need = Math.max(0, targetVols - resid);
    return { grams: need * litres * C.PRIMERS[primer].gpl, residual: resid, need };
  };
  // Forced carbonation regulator pressure (PSI) for a keg at temp °C
  C.kegPSI = (vols, c) => {
    const t = C.CtoF(c);
    return -16.6999 - 0.0101059 * t + 0.00116512 * t * t + 0.173354 * t * vols + 4.24267 * vols - 0.0684226 * vols * vols;
  };

  /* ---------- Fermentables ---------- */
  C.SUGARS = {
    sucrose:  { name: 'Table sugar (sucrose)', pkl: 384, lpkg: 0.63 },
    dextrose: { name: 'Brewing sugar (dextrose)', pkl: 350, lpkg: 0.65 },
    honey:    { name: 'Honey', pkl: 292, lpkg: 0.70 },
    dme:      { name: 'Dried malt extract', pkl: 367, lpkg: 0.65 },
    lme:      { name: 'Liquid malt extract', pkl: 300, lpkg: 0.70 },
  };
  // kg of sugar to raise `litres` from curSg to targetSg.
  // mode 'dissolve' = the sugar's own volume adds to the batch; 'topup' = final volume is fixed.
  C.sugarToRaise = (litres, curSg, targetSg, sugar = 'sucrose', mode = 'dissolve') => {
    const s = C.SUGARS[sugar], pc = C.pts(curSg), pt = C.pts(targetSg);
    if (pt <= pc) return { kg: 0, finalL: litres };
    let kg;
    if (mode === 'topup') kg = (pt - pc) * litres / s.pkl;
    else kg = ((pt - pc) * litres) / (s.pkl - s.lpkg * pt);
    return { kg, finalL: mode === 'topup' ? litres : litres + kg * s.lpkg };
  };
  // Back-sweetening: grams to lift gravity by a little (volume change ignored)
  C.sweetenGrams = (litres, curSg, targetSg, sugar = 'sucrose') =>
    Math.max(0, (C.pts(targetSg) - C.pts(curSg)) * litres / C.SUGARS[sugar].pkl * 1000);

  /* ---------- Dilution & blending ---------- */
  C.dilute = (litres, sg, targetSg) => {
    const v2 = litres * C.pts(sg) / C.pts(targetSg);
    return { finalL: v2, changeL: v2 - litres };
  };
  C.blend = (parts) => { // [{l, sg, abv}]
    const L = parts.reduce((a, p) => a + p.l, 0);
    if (!L) return { l: 0, sg: 1, abv: 0 };
    return {
      l: L,
      sg: 1 + parts.reduce((a, p) => a + p.l * C.pts(p.sg), 0) / L / 1000,
      abv: parts.reduce((a, p) => a + p.l * p.abv, 0) / L,
    };
  };

  /* ---------- Recipe maths ---------- */
  // items: [{kg, ppg, mash:boolean}] -> OG
  C.ogFromGrist = (items, litres, eff) => {
    let pts = 0;
    for (const it of items) pts += it.kg * it.ppg * C.PPG_TO_PKL * (it.mash ? eff / 100 : 1);
    return C.sg(pts / litres);
  };
  // Tinseth IBU for one addition
  C.tinseth = (grams, aa, minutes, litres, boilSg, pellet = true) => {
    const bigness = 1.65 * Math.pow(0.000125, boilSg - 1);
    const timeF = (1 - Math.exp(-0.04 * minutes)) / 4.15;
    const util = bigness * timeF * (pellet ? 1.1 : 1);
    return util * (aa / 100) * grams * 1000 / litres;
  };
  // Morey colour; items [{kg, lov}]
  C.srm = (items, litres) => {
    const mcu = items.reduce((a, it) => a + it.kg * 2.20462 * it.lov, 0) / (litres / 3.78541);
    return mcu <= 0 ? 0 : 1.4922 * Math.pow(mcu, 0.6859);
  };
  C.srmToEbc = s => s * 1.97;
  C.ebcToSrm = e => e / 1.97;
  const SRM_HEX = ['#FFE699', '#FFE699', '#FFD878', '#FFCA5A', '#FFBF42', '#FBB123', '#F8A600', '#F39C00', '#EA8F00', '#E58500',
    '#DE7C00', '#D77200', '#CF6900', '#CB6200', '#C35900', '#BB5100', '#B54C00', '#B04500', '#A63E00', '#A13700',
    '#9B3200', '#952D00', '#8E2900', '#882300', '#821E00', '#7B1A00', '#771900', '#701400', '#6A0E00', '#660D00',
    '#5E0B00', '#5A0A02', '#600903', '#520907', '#4C0505', '#470606', '#440607', '#3F0708', '#3B0607', '#3A070B', '#36080A'];
  C.srmHex = s => SRM_HEX[Math.max(0, Math.min(40, Math.round(s)))];

  /* ---------- Mash & water ---------- */
  // Strike water temp (°C). ratio = litres per kg grain
  C.strikeTemp = (ratio, grainC, targetC) => (0.41 / ratio) * (targetC - grainC) + targetC;
  C.waterPlan = ({ batchL, grainKg, boilMin, boilOffLph, trubL, absorbLpkg, shrink = 0.04 }) => {
    const postBoil = (batchL + trubL) / (1 - shrink);
    const preBoil = postBoil + boilOffLph * boilMin / 60;
    const absorb = grainKg * absorbLpkg;
    const total = preBoil + absorb;
    return { postBoil, preBoil, absorb, total, mashVol: total + grainKg * 0.67 };
  };

  /* ---------- Yeast ---------- */
  // billions of cells needed. rate in million cells / mL / °P
  C.cellsNeeded = (litres, sg, rate) => rate * litres * C.sgToPlato(sg);
  C.liquidViability = (daysOld) => Math.max(0, 100 - daysOld * 0.7);

  /* ---------- Mead nutrients (TOSNA-style) ---------- */
  C.tosna = (litres, sg, demand = 'medium') => {
    const f = { low: 0.75, medium: 0.9, high: 1.25 }[demand];
    const brix = C.sgToBrix(sg);
    const yan = brix * 10 * f; // ppm needed
    const fermaidO = yan * litres / 160; // grams, Fermaid O counted at 4x efficiency
    return { brix, yan, fermaidO, dose: fermaidO / 4 };
  };

  /* ---------- Formatting helpers ---------- */
  C.fmtSg = sg => (isFinite(sg) ? sg.toFixed(3) : '—');
  C.round = (n, d = 1) => (isFinite(n) ? Number(n.toFixed(d)) : 0);

  if (typeof module !== 'undefined' && module.exports) module.exports = C;
  else root.Calc = C;
})(this);
