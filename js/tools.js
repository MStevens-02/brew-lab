/* Brew Lab — recipe designer, brew-day timer, batch log. */

/* =================== Recipe designer =================== */
const grain = id => Data.grains.find(g => g.id === id) || Data.grains[0];
const HOP_USE = [['boil', 'Boil'], ['whirlpool', 'Whirlpool'], ['flameout', 'Flameout'], ['dry', 'Dry hop']];
const defaultDesign = () => ({
  L: 23, eff: 72, mashC: 66, yeast: 'SafAle US-05', att: 80, style: 'American Pale Ale',
  grains: [{ id: 'mo', kg: 4.5 }, { id: 'c40', kg: 0.3 }],
  hops: [{ name: 'Magnum', g: 15, aa: 13, min: 60, use: 'boil' }, { name: 'Cascade', g: 40, aa: 6.5, min: 10, use: 'boil' }, { name: 'Cascade', g: 50, aa: 6.5, min: 4, use: 'dry' }],
});
function designFromRecipe(r) {
  const b = r.beer;
  return { L: b.L, eff: b.eff, mashC: b.mashC, yeast: b.yeast, att: b.att, style: r.style || '', name: r.name,
    grains: b.grains.map(([id, kg]) => ({ id, kg })),
    hops: b.hops.map(([name, g, aa, min, use]) => ({ name, g, aa, min, use })) };
}
function hopIBU(h, L, og) {
  if (h.use === 'dry') return 0;
  if (h.use === 'boil') return Calc.tinseth(h.g, h.aa, h.min, L, og);
  // whirlpool / flameout: hot but not boiling. Rough estimate = half the utilisation of an equal boil.
  const mins = h.use === 'flameout' ? Math.max(h.min, 5) : h.min;
  return Calc.tinseth(h.g, h.aa, mins, L, og) * 0.5;
}
function analyse(d) {
  const items = d.grains.map(r => { const g = grain(r.id); return { kg: +r.kg || 0, ppg: g.ppg, mash: g.mash, lov: g.lov }; });
  const og = Calc.ogFromGrist(items, d.L, d.eff);
  const att = Math.max(50, Math.min(95, d.att - (d.mashC - 66) * 1.5));
  const fg = 1 + (og - 1) * (1 - att / 100);
  const ibu = d.hops.reduce((a, h) => a + hopIBU(h, d.L, og), 0);
  const srm = Calc.srm(items, d.L);
  const kg = items.reduce((a, i) => a + i.kg, 0);
  return { og, fg, abv: Calc.abv(og, fg), ibu, srm, ebc: srm * 1.97, bugu: ibu / Math.max(1, Calc.pts(og)), kg, att };
}
function glassSVG(srm, size = 120) {
  const c = Calc.srmHex(srm), id = uid();
  return `<svg viewBox="0 0 60 80" width="${size}" style="max-width:100%"><defs><linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="${c}" stop-opacity=".85"/><stop offset=".5" stop-color="${c}"/><stop offset="1" stop-color="${c}" stop-opacity=".7"/></linearGradient></defs>
    <path d="M8 10h44l-4 64a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4z" fill="url(#${id})" stroke="rgba(255,255,255,.25)"/>
    <path d="M7 10c0-5 6-7 10-5 3-4 10-4 13 0 4-3 11-1 12 3 4-2 9 0 9 3z" fill="#f6ead7"/>
    <path d="M14 18l3 52" stroke="rgba(255,255,255,.25)" stroke-width="2.5" stroke-linecap="round"/></svg>`;
}
function rangeRow(label, val, [lo, hi], _a, _b, fmtFn) {
  const span = hi - lo, scaleLo = Math.min(lo, val) - span * 0.8, scaleHi = Math.max(hi, val) + span * 0.8;
  const pct = x => Math.max(0, Math.min(100, (x - scaleLo) / (scaleHi - scaleLo) * 100));
  const ok = val >= lo && val <= hi;
  return `<div class="range"><span class="lbl">${label}</span><div class="bar"><div class="band" style="left:${pct(lo)}%;width:${pct(hi) - pct(lo)}%"></div><div class="mk ${ok ? '' : 'bad'}" style="left:${pct(val)}%"></div></div><span class="val" style="color:${ok ? 'var(--ok)' : 'var(--danger)'}">${fmtFn(val)}</span></div>`;
}

function renderDesigner(el) {
  const qp = qparams();
  let d = store.get('design', null) || defaultDesign();
  if (qp.r) { const r = Recipes.find(x => x.id === qp.r && x.beer); if (r) { d = designFromRecipe(r); store.set('design', d); history.replaceState(null, '', '#/calc/recipe'); } }
  const save = () => store.set('design', d);
  const grainOpts = sel => {
    const types = [...new Set(Data.grains.map(g => g.type))];
    return types.map(t => `<optgroup label="${t}">${Data.grains.filter(g => g.type === t).map(g => `<option value="${g.id}"${g.id === sel ? ' selected' : ''}>${esc(g.name)}</option>`).join('')}</optgroup>`).join('');
  };
  const hopOpts = sel => Data.hops.map(h => `<option${h.name === sel ? ' selected' : ''}>${esc(h.name)}</option>`).join('') + (Data.hops.some(h => h.name === sel) ? '' : `<option selected>${esc(sel)}</option>`);
  const beerYeasts = Data.yeasts.filter(y => y.kind === 'beer');
  el.innerHTML = `
  <div class="mini" id="mini"></div>
  <div class="calc">
    <div>
      <div class="panel"><h3>Setup</h3><div class="fields">
        <div class="field"><label>Batch into fermenter</label><div class="inp"><input data-s="L" type="number" step="0.5" inputmode="decimal" value="${d.L}" class="has-u"><span class="u">L</span></div></div>
        <div class="field"><label>Brewhouse efficiency</label><div class="inp"><input data-s="eff" type="number" step="1" inputmode="decimal" value="${d.eff}" class="has-u"><span class="u">%</span></div></div>
        <div class="field"><label>Mash temperature</label><div class="inp"><input data-s="mashC" type="number" step="0.5" inputmode="decimal" value="${d.mashC}" class="has-u"><span class="u">°C</span></div></div>
        <div class="field"><label>Yeast attenuation</label><div class="inp"><input data-s="att" type="number" step="1" inputmode="decimal" value="${d.att}" class="has-u"><span class="u">%</span></div></div>
        <div class="field wide"><label>Yeast</label><div class="inp"><select data-s="yeast">${beerYeasts.map(y => `<option${y.name === d.yeast ? ' selected' : ''}>${y.name}</option>`).join('')}</select></div><div class="hint" id="yn"></div></div>
        <div class="field wide"><label>Target style</label><div class="inp"><select data-s="style"><option value="">— none —</option>${Data.beerStyles.map(s => `<option${s.name === d.style ? ' selected' : ''}>${s.name}</option>`).join('')}</select></div></div>
      </div></div>
      <div class="panel" style="margin-top:14px"><h3>Fermentables</h3><div class="rows" id="gr"></div><div class="btns"><button class="btn sm" id="addg">${I.plus} Add fermentable</button></div></div>
      <div class="panel" style="margin-top:14px"><h3>Hops</h3><div class="rows" id="hr"></div><div class="btns"><button class="btn sm" id="addh">${I.plus} Add hop</button></div></div>
    </div>
    <div style="position:sticky;top:80px">
      <div class="panel"><div id="res"></div>
        <div class="btns">
          <a class="btn pri" id="tolog">${I.log} Start batch</a>
          <a class="btn" id="towater">${I.pot} Water plan</a>
          <a class="btn" href="#/calc/timer">${I.timer} Brew-day timer</a>
        </div>
        <div class="btns"><select class="inp-plain" id="load" style="flex:1"><option value="">Load a recipe…</option>${Recipes.filter(r => r.beer).map(r => `<option value="${r.id}">${esc(r.name)}</option>`).join('')}<option value="__new">Blank / default</option></select></div>
      </div>
    </div>
  </div>`;

  const drawRows = () => {
    $('#gr', el).innerHTML = d.grains.map((r, i) => `<div class="rowx g" data-i="${i}">
      <div class="field"><label>Fermentable</label><div class="inp"><select data-g="id">${grainOpts(r.id)}</select></div></div>
      <div class="field"><label>kg</label><div class="inp"><input data-g="kg" type="number" step="0.05" inputmode="decimal" value="${r.kg}"></div></div>
      <button class="x" data-del="g" title="Remove">×</button></div>`).join('') || `<p class="note">No fermentables yet.</p>`;
    $('#hr', el).innerHTML = d.hops.map((h, i) => `<div class="rowx h" data-i="${i}">
      <div class="field hn"><label>Hop</label><div class="inp"><select data-h="name">${hopOpts(h.name)}</select></div></div>
      <div class="field hg"><label>Grams</label><div class="inp"><input data-h="g" type="number" step="1" inputmode="decimal" value="${h.g}"></div></div>
      <div class="field ha"><label>Alpha acid %</label><div class="inp"><input data-h="aa" type="number" step="0.1" inputmode="decimal" value="${h.aa}"></div></div>
      <div class="field hm"><label>${h.use === 'dry' ? 'Days' : h.use === 'boil' ? 'Minutes left' : 'Steep min'}</label><div class="inp"><input data-h="min" type="number" step="1" inputmode="decimal" value="${h.min}"></div></div>
      <button class="x" data-del="h" title="Remove">×</button>
      <div class="field use"><label>Use</label><div class="inp"><select data-h="use">${HOP_USE.map(([v, l]) => `<option value="${v}"${v === h.use ? ' selected' : ''}>${l}</option>`).join('')}</select></div></div></div>`).join('') || `<p class="note">No hops yet.</p>`;
  };
  const results = () => {
    const a = analyse(d);
    const y = Data.yeasts.find(x => x.name === d.yeast);
    $('#yn', el).textContent = y ? `${y.notes} ${y.temp} °C.` : '';
    const st = Data.beerStyles.find(s => s.name === d.style);
    const gbill = d.grains.map(r => `${fmt(r.kg / Math.max(0.001, a.kg) * 100, 0)}% ${grain(r.id).name}`).join(' · ');
    $('#res', el).innerHTML = `
      <div class="colour-row">${glassSVG(a.srm, 90)}<div style="flex:1">
        <div class="eyebrow">${esc(d.name || 'Your recipe')}</div>
        <div style="font:700 40px/1.1 var(--mono);color:var(--amber2);margin:6px 0">${fmt(a.abv, 1)}<small style="font-size:16px">% ABV</small></div>
        <div class="note">${fmt(a.kg, 2)} kg grist · est. attenuation ${fmt(a.att, 0)}%</div></div></div>
      <div class="stats" style="margin-top:14px">
        ${stat('OG', sgf(a.og))}${stat('FG', sgf(a.fg))}${stat('IBU', fmt(a.ibu, 0), '', 'Tinseth')}
        ${stat('Colour', fmt(a.ebc, 0), 'EBC', `${fmt(a.srm, 1)} SRM`)}${stat('BU:GU', fmt(a.bugu, 2), '', a.bugu < 0.45 ? 'malty' : a.bugu < 0.75 ? 'balanced' : 'bitter')}
      </div>
      ${st ? `<h3 style="margin:16px 0 8px;font-size:16px">vs ${st.name}</h3><div style="display:flex;flex-direction:column;gap:9px">
        ${rangeRow('OG', a.og, st.og, 1.025, 1.13, sgf)}${rangeRow('FG', a.fg, st.fg, 0.998, 1.04, sgf)}
        ${rangeRow('ABV', a.abv, st.abv, 2, 12, x => fmt(x, 1) + '%')}${rangeRow('IBU', a.ibu, st.ibu, 0, 110, x => fmt(x, 0))}
        ${rangeRow('SRM', a.srm, st.srm, 0, 40, x => fmt(x, 0))}</div>` : ''}
      <p class="note" style="margin-top:12px">${esc(gbill)}</p>`;
    $('#mini', el).innerHTML = `<span style="display:inline-block;width:14px;height:22px;border-radius:3px;background:${Calc.srmHex(a.srm)}"></span><span><small>OG</small> ${sgf(a.og)}</span><span><small>ABV</small> ${fmt(a.abv, 1)}%</span><span><small>IBU</small> ${fmt(a.ibu, 0)}</span><span><small>EBC</small> ${fmt(a.ebc, 0)}</span>`;
    $('#tolog', el).href = `#/log/new?name=${encodeURIComponent(d.name || d.style || 'New beer')}&drink=beer&og=${a.og.toFixed(3)}&L=${d.L}&yeast=${encodeURIComponent(d.yeast)}`;
    $('#towater', el).href = `#/calc/water?L=${d.L}&kg=${a.kg.toFixed(2)}&og=${a.og.toFixed(3)}&mt=${d.mashC}`;
    save();
  };
  el.addEventListener('input', e => {
    const t = e.target, row = t.closest('[data-i]');
    if (t.dataset.s) { d[t.dataset.s] = ['yeast', 'style'].includes(t.dataset.s) ? t.value : parseFloat(t.value) || 0; }
    if (t.dataset.g) d.grains[row.dataset.i][t.dataset.g] = t.dataset.g === 'id' ? t.value : parseFloat(t.value) || 0;
    if (t.dataset.h) {
      const h = d.hops[row.dataset.i];
      h[t.dataset.h] = ['name', 'use'].includes(t.dataset.h) ? t.value : parseFloat(t.value) || 0;
      if (t.dataset.h === 'name') { const hp = Data.hops.find(x => x.name === t.value); if (hp) { h.aa = hp.aa; $('[data-h="aa"]', row).value = hp.aa; } }
      if (t.dataset.h === 'use') { if (t.value === 'dry') h.min = 4; if (t.value === 'flameout') h.min = 0; if (t.value === 'whirlpool' && !h.min) h.min = 20; drawRows(); }
    }
    if (t.dataset.s === 'yeast') { const y = Data.yeasts.find(x => x.name === t.value); if (y) { d.att = y.att; $('[data-s="att"]', el).value = y.att; } }
    delete d.name;
    results();
  });
  el.addEventListener('click', e => {
    const del = e.target.closest('[data-del]');
    if (del) { const i = +del.closest('[data-i]').dataset.i; (del.dataset.del === 'g' ? d.grains : d.hops).splice(i, 1); drawRows(); results(); }
    if (e.target.closest('#addg')) { d.grains.push({ id: 'c40', kg: 0.2 }); drawRows(); results(); }
    if (e.target.closest('#addh')) { d.hops.push({ name: 'Cascade', g: 25, aa: 6.5, min: 15, use: 'boil' }); drawRows(); results(); }
  });
  $('#load', el).addEventListener('change', e => {
    const v = e.target.value; if (!v) return;
    d = v === '__new' ? defaultDesign() : designFromRecipe(Recipes.find(r => r.id === v));
    save();
    const fresh = el.cloneNode(false); el.replaceWith(fresh); renderDesigner(fresh);
  });
  drawRows(); results();
}
defCalc({ id: 'recipe', title: 'Beer recipe designer', icon: 'flask', group: 'Beer', wide: true,
  desc: 'Build a grain bill and hop schedule. Live OG, FG, ABV, IBU, colour and style match.', render: renderDesigner });

/* =================== Brew-day timer =================== */
let timerTick = null, audioCtx = null, wakeLock = null;
function beep(times = 3) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    for (let i = 0; i < times; i++) {
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = 'square'; o.frequency.value = 880; o.connect(g); g.connect(audioCtx.destination);
      const t0 = audioCtx.currentTime + i * 0.35;
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.25, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.25);
      o.start(t0); o.stop(t0 + 0.3);
    }
  } catch (e) { /* no audio */ }
  if (navigator.vibrate) navigator.vibrate([300, 150, 300, 150, 300]);
}
function timerAdditions() {
  const d = store.get('design', null);
  const adds = [];
  if (d) for (const h of d.hops) {
    if (h.use === 'boil') adds.push({ min: h.min, label: `${h.g} g ${h.name}` });
    else if (h.use === 'flameout' || h.use === 'whirlpool') adds.push({ min: 0, label: `${h.g} g ${h.name} (${h.use}${h.use === 'whirlpool' ? `, ${h.min} min steep` : ''})` });
  }
  adds.push({ min: 15, label: '½ Protafloc / Whirlfloc tablet' });
  adds.push({ min: 15, label: 'Immersion chiller in (to sanitise)' });
  return adds.sort((a, b) => b.min - a.min);
}
function renderTimer(el) {
  let s = store.get('timer', null);
  if (!s) s = { phase: 'idle', mashMin: 60, boilMin: 60, endAt: 0, left: 0, running: false, adds: timerAdditions(), alerted: [] };
  if (s.phase === 'idle' && !s.custom) s.adds = timerAdditions();
  const save = () => store.set('timer', s);
  const phaseLen = () => (s.phase === 'mash' ? s.mashMin : s.boilMin) * 60000;
  const remaining = () => (s.running ? Math.max(0, s.endAt - Date.now()) : s.left);
  el.innerHTML = `<div class="timer">
    <div class="panel"><div class="ring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="none" style="stroke:var(--panel2)" stroke-width="8"/><circle id="arc" cx="60" cy="60" r="54" fill="none" stroke="#f5a524" stroke-width="8" stroke-linecap="round" stroke-dasharray="339.3" stroke-dashoffset="0"/></svg>
      <div class="c"><div class="p" id="ph"></div><div class="t" id="tt">00:00</div><div class="n" id="nx"></div></div></div>
      <div class="btns" style="justify-content:center" id="ctl"></div>
      <div class="fields" style="margin-top:14px">
        <div class="field"><label>Mash length</label><div class="inp"><input id="mm" type="number" value="${s.mashMin}" class="has-u" inputmode="numeric"><span class="u">min</span></div></div>
        <div class="field"><label>Boil length</label><div class="inp"><input id="bm" type="number" value="${s.boilMin}" class="has-u" inputmode="numeric"><span class="u">min</span></div></div>
      </div></div>
    <div><div class="panel"><h3>Boil additions</h3><p class="note">Times are minutes <b>left</b> in the boil. Pulled from your recipe designer, so <a href="#/calc/recipe">edit hops there</a> and press "Reload".</p>
      <div class="adds" id="adds"></div>
      <div class="fields" style="margin-top:12px;grid-template-columns:90px 1fr auto">
        <div class="field"><div class="inp"><input id="am" type="number" placeholder="min" inputmode="numeric"></div></div>
        <div class="field"><div class="inp"><input id="al" type="text" placeholder="e.g. 1 tsp yeast nutrient"></div></div>
        <button class="btn" id="aadd">${I.plus}</button></div>
      <div class="btns"><button class="btn sm ghost" id="reload">Reload from recipe</button></div></div>
      <div class="callout tip"><b>Tip</b><div>Keep this screen open: it asks your phone to stay awake. Alarms beep and vibrate at each addition. Tap Start once first so your browser allows sound.</div></div></div>
  </div>`;
  const drawAdds = () => {
    const rem = s.phase === 'boil' ? remaining() / 60000 : Infinity;
    const next = s.phase === 'boil' ? s.adds.find(a => a.min < rem + 1e-9 && !s.alerted.includes(a.min + a.label)) : null;
    $('#adds', el).innerHTML = s.adds.map((a, i) => {
      const done = s.alerted.includes(a.min + a.label);
      return `<div class="add ${done ? 'done' : ''} ${a === next ? 'next' : ''}" data-ai="${i}"><span class="at">${a.min === 0 ? 'Flame' : a.min + ' min'}</span><span>${esc(a.label)}</span><button class="x" data-adel="${i}" style="height:32px;width:32px">×</button></div>`;
    }).join('') || '<p class="note">No additions.</p>';
  };
  const controls = () => {
    const b = [];
    if (s.phase === 'idle') b.push(`<button class="btn pri" data-a="mash">Start mash</button><button class="btn" data-a="boil">Skip to boil</button>`);
    else if (s.phase === 'mashdone') b.push(`<button class="btn pri" data-a="boil">Start boil</button>`);
    else if (s.phase === 'done') b.push(`<button class="btn pri" data-a="reset">New brew day</button>`);
    else b.push(s.running ? `<button class="btn" data-a="pause">Pause</button>` : `<button class="btn pri" data-a="resume">Resume</button>`, `<button class="btn" data-a="plus">+1 min</button>`);
    if (!['idle', 'done'].includes(s.phase)) b.push(`<button class="btn danger" data-a="reset">Reset</button>`);
    $('#ctl', el).innerHTML = b.join('');
  };
  const draw = () => {
    const rem = remaining();
    const m = Math.floor(rem / 60000), sec = Math.floor(rem % 60000 / 1000);
    $('#tt', el).textContent = ['mash', 'boil'].includes(s.phase) ? `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}` : s.phase === 'mashdone' ? '✓' : s.phase === 'done' ? '🍺' : `${s.mashMin}:00`;
    $('#ph', el).textContent = { idle: 'Ready', mash: 'Mashing', mashdone: 'Mash done', boil: 'Boiling', done: 'Finished' }[s.phase];
    const frac = ['mash', 'boil'].includes(s.phase) ? rem / phaseLen() : s.phase === 'idle' ? 1 : 0;
    $('#arc', el).style.strokeDashoffset = 339.3 * (1 - frac);
    $('#arc', el).style.stroke = s.phase === 'boil' ? '#ff8a3d' : '#f5a524';
    let n = '';
    if (s.phase === 'mash') n = 'Hold 64–68 °C. Stir once halfway.';
    if (s.phase === 'mashdone') n = 'Lift the bag, drain, take a pre-boil reading, bring to the boil.';
    if (s.phase === 'boil') { const nx = s.adds.find(a => !s.alerted.includes(a.min + a.label)); n = nx ? `Next: ${nx.label} at ${nx.min === 0 ? 'flameout' : nx.min + ' min'}` : 'All additions done.'; }
    if (s.phase === 'done') n = 'Flameout! Chill fast, sanitise everything, pitch yeast.';
    $('#nx', el).textContent = n;
  };
  const check = () => {
    if (!s.running) return;
    const rem = remaining();
    if (s.phase === 'boil') {
      for (const a of s.adds) {
        const key = a.min + a.label;
        if (!s.alerted.includes(key) && rem <= a.min * 60000 + 500) {
          s.alerted.push(key); save(); beep(); toast(`Add: ${a.label}`);
          drawAdds(); const row = $$('.add', el).find(r => r.textContent.includes(a.label)); if (row) row.classList.add('flash');
        }
      }
    }
    if (rem <= 0) {
      s.running = false; s.left = 0;
      s.phase = s.phase === 'mash' ? 'mashdone' : 'done';
      beep(5); save(); controls(); drawAdds();
    }
  };
  const start = phase => {
    s.phase = phase; s.running = true; s.endAt = Date.now() + (phase === 'mash' ? s.mashMin : s.boilMin) * 60000;
    if (phase === 'boil') s.alerted = [];
    // additions longer than the boil happen immediately
    save(); beep(1); controls(); drawAdds();
    if ('wakeLock' in navigator) navigator.wakeLock.request('screen').then(l => { wakeLock = l; }).catch(() => {});
  };
  el.addEventListener('click', e => {
    const a = e.target.closest('[data-a]')?.dataset.a;
    if (a === 'mash' || a === 'boil') start(a);
    if (a === 'pause') { s.left = remaining(); s.running = false; }
    if (a === 'resume') { s.endAt = Date.now() + s.left; s.running = true; }
    if (a === 'plus') { if (s.running) s.endAt += 60000; else s.left += 60000; }
    if (a === 'reset') { if (!confirmReset()) return; s.phase = 'idle'; s.running = false; s.left = 0; s.alerted = []; }
    if (a) { save(); controls(); drawAdds(); draw(); }
    const del = e.target.closest('[data-adel]');
    if (del) { s.adds.splice(+del.dataset.adel, 1); save(); drawAdds(); }
    if (e.target.closest('#aadd')) {
      const m = parseFloat($('#am', el).value), l = $('#al', el).value.trim();
      if (isFinite(m) && l) { s.custom = true; s.adds.push({ min: m, label: l }); s.adds.sort((x, y) => y.min - x.min); save(); drawAdds(); $('#am', el).value = ''; $('#al', el).value = ''; }
    }
    if (e.target.closest('#reload')) { s.adds = timerAdditions(); s.alerted = []; s.custom = false; save(); drawAdds(); toast('Additions reloaded from recipe'); }
  });
  const confirmReset = () => s.phase === 'idle' || s.phase === 'done' || window.confirm('Reset the timer?');
  el.addEventListener('change', e => {
    if (e.target.id === 'mm') s.mashMin = Math.max(1, +e.target.value || 60);
    if (e.target.id === 'bm') s.boilMin = Math.max(1, +e.target.value || 60);
    save(); draw();
  });
  clearInterval(timerTick);
  timerTick = setInterval(() => { if (!document.body.contains(el)) { clearInterval(timerTick); return; } check(); draw(); }, 250);
  controls(); drawAdds(); draw();
}
defCalc({ id: 'timer', title: 'Brew-day timer', icon: 'timer', group: 'Beer', wide: true,
  desc: 'Mash and boil countdown with beeping, vibrating hop-addition alarms.', render: renderTimer });

/* =================== Batch log =================== */
const STATUSES = ['Planned', 'Primary', 'Secondary', 'Conditioning', 'Bottled / kegged', 'Ageing', 'Finished'];
const getBatches = () => store.get('batches', []);
const setBatches = b => store.set('batches', b);
const batchById = id => getBatches().find(b => b.id === id);
function saveBatch(b) { const all = getBatches(); const i = all.findIndex(x => x.id === b.id); if (i >= 0) all[i] = b; else all.unshift(b); setBatches(all); }
function latest(b) {
  const r = [...(b.readings || [])].sort((x, y) => x.d.localeCompare(y.d));
  return r.length ? r[r.length - 1] : null;
}
function isStable(b) {
  const r = [...(b.readings || [])].sort((x, y) => x.d.localeCompare(y.d));
  if (r.length < 2) return false;
  const last = r.slice(-3);
  return daysBetween(last[0].d, last[last.length - 1].d) >= 2 && Math.max(...last.map(x => x.sg)) - Math.min(...last.map(x => x.sg)) <= 0.001;
}
function milestones(b) {
  const p = {
    beer: [[0, 'Pitch yeast, log OG'], [4, 'Dry hop (if the recipe has one)'], [10, 'Check gravity, then again 2–3 days later'], [14, 'Cold crash & package'], [28, 'Carbonated: move bottles somewhere cool'], [42, 'Peak drinking for most ales']],
    cider: [[0, 'Pitch yeast, log OG'], [10, 'Check gravity'], [21, 'Rack off the lees once stable'], [42, 'Bottle / prime'], [90, 'Much better from here']],
    wine: [[0, 'Pitch yeast, log OG'], [6, 'Strain fruit / move to demijohn'], [21, 'Check gravity'], [35, 'First racking'], [100, 'Second racking, check clarity'], [180, 'Stabilise, sweeten & bottle'], [365, 'Peak for most country wines']],
    mead: [[1, 'Nutrient dose 1 + degas'], [2, 'Nutrient dose 2 + degas'], [3, 'Nutrient dose 3 + degas'], [6, '⅓ sugar break: final nutrient dose'], [30, 'Rack once stable'], [90, 'Rack again, check clarity'], [180, 'Stabilise, sweeten & bottle'], [365, 'Peak']],
    other: [[0, 'Pitch yeast, log OG'], [10, 'Check gravity'], [21, 'Bottle / prime'], [35, 'Ready']],
  }[{ juice: 'cider', bread: 'other', rice: 'other', potato: 'wine', misc: 'wine', grain: 'beer' }[b.drink] || b.drink] || [];
  return p.map(([d, t]) => ({ d: addDays(b.start, d), t }));
}
function gravityChart(b) {
  const pts = [...(b.readings || [])].sort((x, y) => x.d.localeCompare(y.d)).map(r => ({ x: daysBetween(b.start, r.d), y: r.sg }));
  if (b.og && !pts.some(p => p.x === 0)) pts.unshift({ x: 0, y: b.og });
  if (pts.length < 2) return `<p class="note">Add at least two gravity readings to see the fermentation curve.</p>`;
  const W = 400, H = 200, P = 46;
  const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
  const xmax = Math.max(7, ...xs), ymin = Math.min(...ys) - 0.003, ymax = Math.max(...ys) + 0.003;
  const X = x => P + (x / xmax) * (W - P - 14), Y = y => 12 + (ymax - y) / (ymax - ymin) * (H - P - 12);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${X(p.x).toFixed(1)} ${Y(p.y).toFixed(1)}`).join(' ');
  const yt = []; const step = (ymax - ymin) > 0.04 ? 0.01 : 0.005;
  for (let v = Math.ceil(ymin / step) * step; v <= ymax; v += step) yt.push(v);
  return `<svg viewBox="0 0 ${W} ${H}">
    ${yt.map(v => `<line x1="${P}" x2="${W - 10}" y1="${Y(v)}" y2="${Y(v)}" style="stroke:var(--line)"/><text x="${P - 6}" y="${Y(v) + 4}" text-anchor="end" font-size="12" style="fill:var(--muted)" font-family="monospace">${v.toFixed(3)}</text>`).join('')}
    <text x="${W - 10}" y="${H - 8}" text-anchor="end" font-size="11" fill="#7d6e61" font-family="monospace">day ${xmax}</text><text x="${P}" y="${H - 8}" font-size="11" fill="#7d6e61" font-family="monospace">day 0</text>
    <path d="${line} L${X(pts[pts.length - 1].x)} ${H - P + 4} L${X(0)} ${H - P + 4}Z" fill="rgba(245,165,36,.1)"/>
    <path d="${line}" fill="none" stroke="#f5a524" stroke-width="2.5" stroke-linejoin="round"/>
    ${pts.map(p => `<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="4.5" style="fill:var(--panel);stroke:var(--amber)" stroke-width="2.5"><title>Day ${p.x}: ${p.y.toFixed(3)}</title></circle>`).join('')}
  </svg>`;
}

function renderLogList(el) {
  const all = getBatches();
  const active = all.filter(b => b.status !== 'Finished'), done = all.filter(b => b.status === 'Finished');
  const card = b => {
    const l = latest(b), sg = l ? l.sg : b.og;
    const abv = b.og && sg ? Calc.abv(b.og, sg) : 0;
    return `<a class="card batch" href="#/log/${b.id}" style="--c:${DRINK[b.drink]?.c}"><div class="strip"></div>
      <div><h3>${DRINK[b.drink]?.em || ''} ${esc(b.name)}</h3><div class="meta"><span class="status">${esc(b.status)}</span><span class="pill">Day ${Math.max(0, daysBetween(b.start, today()))}</span>${isStable(b) ? '<span class="pill c" style="--c:var(--ok)">Stable</span>' : ''}</div></div>
      <div class="r"><b>${fmt(abv, 1)}%</b><small>${sgf(sg)}</small></div></a>`;
  };
  el.innerHTML = `
    <div class="btns" style="margin:0 0 18px"><a class="btn pri" href="#/log/new">${I.plus} New batch</a><button class="btn" id="exp">Export</button><label class="btn">Import<input type="file" id="imp" accept=".json,application/json" hidden></label></div>
    ${all.length ? '' : `<div class="empty"><div class="big">🫙</div><p>No batches yet. Log your first brew to track gravity readings, ABV and a fermentation timeline.</p><a class="btn pri" href="#/log/new">Start a batch</a></div>`}
    ${active.length ? `<h2>On the go</h2><div class="grid two">${active.map(card).join('')}</div>` : ''}
    ${done.length ? `<h2>Finished</h2><div class="grid two">${done.map(card).join('')}</div>` : ''}
    <p class="note" style="margin-top:24px">Batches are saved in this browser only. Use Export now and then to back them up or move them to another device.</p>`;
  $('#exp', el).onclick = () => {
    const blob = new Blob([JSON.stringify({ app: 'brew-lab', v: 1, batches: getBatches() }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `brew-lab-batches-${today()}.json`; a.click();
  };
  $('#imp', el).onchange = async e => {
    try {
      const data = JSON.parse(await e.target.files[0].text());
      const incoming = Array.isArray(data) ? data : data.batches;
      if (!Array.isArray(incoming)) throw 0;
      const map = new Map(getBatches().map(b => [b.id, b]));
      incoming.forEach(b => b && b.id && map.set(b.id, b));
      setBatches([...map.values()]); toast(`Imported ${incoming.length} batches`); renderLogList(el);
    } catch (err) { toast('That file doesn\'t look like a Brew Lab export'); }
  };
}

function renderLogNew(el) {
  const q = qparams();
  el.innerHTML = `<div class="panel" style="max-width:640px"><div id="nf"></div><div class="btns"><button class="btn pri" id="create">Create batch</button><a class="btn ghost" href="#/log">Cancel</a></div></div>`;
  const yeastOpts = [['', '—'], ...Data.yeasts.map(y => [y.name, y.name])];
  if (q.yeast && !yeastOpts.some(o => o[0] === q.yeast)) yeastOpts.push([q.yeast, q.yeast]);
  const fields = [
    { k: 'name', l: 'Name', t: 'text', v: q.name || '', wide: true },
    { k: 'drink', l: 'Type', t: 'sel', v: q.drink || 'beer', o: Object.entries(DRINK).filter(([k]) => k !== 'all').map(([k, d]) => [k, `${d.em} ${d.name}`]) },
    { k: 'start', l: 'Start date', t: 'date', v: today() },
    { k: 'L', l: 'Volume', v: q.L || 23, u: 'L', step: 0.5 },
    { k: 'og', l: 'Original gravity', v: q.og || '1.050', step: 0.001 },
    { k: 'yeast', l: 'Yeast', t: 'sel', v: q.yeast || '', o: yeastOpts, wide: true },
  ];
  // don't remember these between visits
  store.set('calc.newbatch', {});
  const f = mountForm('newbatch', $('#nf', el), document.createElement('div'), fields, () => '');
  $('#create', el).onclick = () => {
    const v = f.read();
    const b = { id: Date.now().toString(36), name: v.name || 'Untitled brew', drink: v.drink, start: v.start || today(), L: v.L, og: v.og,
      yeast: v.yeast, status: 'Primary', notes: '', readings: [{ d: v.start || today(), sg: v.og, t: '', n: 'OG' }] };
    saveBatch(b); store.set('calc.newbatch', {}); location.hash = '#/log/' + b.id;
  };
}

function renderLogDetail(el, id) {
  const b = batchById(id);
  if (!b) { el.innerHTML = `<div class="empty">Batch not found. <a href="#/log">Back to log</a></div>`; return; }
  const draw = () => {
    const l = latest(b), sg = l ? l.sg : b.og;
    const abv = Calc.abv(b.og, sg), day = daysBetween(b.start, today());
    const ms = milestones(b);
    const stable = isStable(b);
    const rs = [...(b.readings || [])].map((r, i) => ({ ...r, i })).sort((x, y) => y.d.localeCompare(x.d));
    el.innerHTML = `
    <div class="eyebrow" style="color:${DRINK[b.drink]?.c}">${DRINK[b.drink]?.em} ${DRINK[b.drink]?.name} · started ${nice(b.start)}</div>
    <h1 style="margin-top:8px">${esc(b.name)}</h1>
    <div class="btns" style="margin:4px 0 18px"><div class="inp" style="max-width:240px"><select id="st">${STATUSES.map(s => `<option${s === b.status ? ' selected' : ''}>${s}</option>`).join('')}</select></div></div>
    <div class="stats">
      ${stat('ABV now', fmt(abv, 1), '%', `OG ${sgf(b.og)} → ${sgf(sg)}`, 'big')}
      ${stat('Day', Math.max(0, day))}
      ${stat('Latest SG', sgf(sg), '', l ? nice(l.d) : '')}
      ${stat('Attenuation', fmt(Calc.apparentAtt(b.og, sg), 0), '%')}
      ${stat('Volume', fmt(b.L, 1), 'L')}
      ${stat('Units / pint', fmt(Calc.ukUnits(abv, 568), 1))}
    </div>
    ${stable ? `<div class="callout tip"><b>Stable</b><div>Gravity hasn't moved over your last readings, so fermentation looks finished. Safe to rack, stabilise or package.</div></div>` : ''}
    ${b.yeast ? `<p class="note">Yeast: <b>${esc(b.yeast)}</b></p>` : ''}
    <div class="grid two" style="margin-top:16px">
      <div class="panel"><h3>Fermentation curve</h3><div class="chart">${gravityChart(b)}</div></div>
      <div class="panel"><h3>Add a reading</h3><div class="fields">
        <div class="field"><label>Date</label><div class="inp"><input id="rd" type="date" value="${today()}"></div></div>
        <div class="field"><label>Gravity</label><div class="inp"><input id="rs" type="number" step="0.001" inputmode="decimal" placeholder="${sgf(sg)}"></div></div>
        <div class="field"><label>Temp (optional)</label><div class="inp"><input id="rt" type="number" step="0.5" inputmode="decimal" class="has-u"><span class="u">°C</span></div></div>
        <div class="field"><label>Note</label><div class="inp"><input id="rn" type="text" placeholder="e.g. dry hopped"></div></div>
      </div><div class="btns"><button class="btn pri" id="radd">${I.plus} Add reading</button></div></div>
    </div>
    <h2>Readings</h2>
    <div class="tbl-wrap"><table class="tbl"><tr><th>Date</th><th>Day</th><th>SG</th><th>ABV</th><th>Temp</th><th>Note</th><th></th></tr>
    ${rs.map(r => `<tr><td style="white-space:nowrap">${nice(r.d).replace(/^\w+ /, '')}</td><td class="num">${daysBetween(b.start, r.d)}</td><td class="num">${sgf(r.sg)}</td><td class="num">${fmt(Calc.abv(b.og, r.sg), 1)}%</td><td class="num">${r.t !== '' && r.t != null && isFinite(r.t) ? r.t + ' °C' : ''}</td><td>${esc(r.n || '')}</td><td><button class="x" data-rdel="${r.i}" style="height:30px;width:30px">×</button></td></tr>`).join('')}
    </table></div>
    <h2>Timeline</h2>
    <div class="adds">${ms.map(m => { const past = m.d < today(); return `<div class="add ${past ? 'done' : ''}"><span class="at" style="font-size:13px">${nice(m.d).replace(/^\w+ /, '')}</span><span>${m.t}</span><span class="pill">${daysBetween(today(), m.d) > 0 ? 'in ' + daysBetween(today(), m.d) + 'd' : daysBetween(today(), m.d) === 0 ? 'today' : 'done'}</span></div>`; }).join('')}</div>
    <p class="note">A rough guide. Always go by gravity readings and taste, not the calendar.</p>
    <h2>Notes</h2>
    <textarea id="notes" placeholder="Recipe tweaks, tasting notes, what you'd change next time…">${esc(b.notes || '')}</textarea>
    <div id="bx"></div>
    <div class="btns" style="margin-top:24px"><button class="btn danger" id="del">${I.trash} Delete batch</button></div>`;
    if (window.batchExtras) batchExtras($('#bx', el), b, draw);
  };
  draw();
  el.addEventListener('click', e => {
    if (e.target.closest('#radd')) {
      const sg = parseFloat($('#rs', el).value);
      if (!(sg > 0.98 && sg < 1.2)) { toast('Enter a gravity like 1.012'); return; }
      const t = parseFloat($('#rt', el).value);
      b.readings.push({ d: $('#rd', el).value || today(), sg, t: isFinite(t) ? t : '', n: $('#rn', el).value.trim() });
      saveBatch(b); draw(); toast('Reading added');
    }
    const rd = e.target.closest('[data-rdel]');
    if (rd) { b.readings.splice(+rd.dataset.rdel, 1); saveBatch(b); draw(); }
    if (e.target.closest('#del') && confirm(`Delete "${b.name}"? This can't be undone.`)) {
      setBatches(getBatches().filter(x => x.id !== b.id)); location.hash = '#/log';
    }
  });
  el.addEventListener('change', e => { if (e.target.id === 'st') { b.status = e.target.value; saveBatch(b); } });
  el.addEventListener('input', e => { if (e.target.id === 'notes') { b.notes = e.target.value; saveBatch(b); } });
}
