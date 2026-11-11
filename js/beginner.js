/* Brew Lab — beginner features: start quiz, brew-along mode, "is this normal?", hydrometer trainer, recipe metadata. */

// gear: 0 nothing, 1 demijohn (~£20), 2 bucket kit (~£50), 3 big pot / BIAB (£100+)
const META = {
  'bottle-cider': { gear: 0, weeks: 2, taste: ['cider', 'fruity', 'dry'] },
  'ginger-bug': { gear: 0, weeks: 2, taste: ['fizzy', 'sweet', 'spiced', 'light'] },
  'turbo-cider': { gear: 1, weeks: 5, taste: ['cider', 'dry', 'fruity'] },
  'spiced-cider': { gear: 1, weeks: 6, taste: ['cider', 'spiced', 'fruity'] },
  'hopped-cider': { gear: 1, weeks: 5, taste: ['cider', 'hoppy', 'fizzy'] },
  'cherry-cider': { gear: 1, weeks: 5, taste: ['cider', 'fruity', 'sweet', 'fizzy'] },
  'juice-perry': { gear: 1, weeks: 7, taste: ['cider', 'fruity', 'sweet'] },
  'apple-blackcurrant': { gear: 1, weeks: 7, taste: ['cider', 'fruity', 'fizzy', 'sweet'] },
  'pineapple-ginger': { gear: 1, weeks: 5, taste: ['fruity', 'spiced', 'fizzy'] },
  'ginger-beer': { gear: 1, weeks: 4, taste: ['spiced', 'fizzy', 'sweet'] },
  'hard-lemonade': { gear: 1, weeks: 4, taste: ['fizzy', 'sweet', 'fruity'] },
  'hard-seltzer': { gear: 1, weeks: 5, taste: ['fizzy', 'light'] },
  'carton-white': { gear: 1, weeks: 10, taste: ['wine', 'dry'] },
  'carton-red': { gear: 1, weeks: 12, taste: ['wine'] },
  'berry-rose': { gear: 1, weeks: 12, taste: ['wine', 'fruity'] },
  'elderflower-wine': { gear: 1, weeks: 20, taste: ['wine', 'floral'] },
  'rhubarb-wine': { gear: 1, weeks: 26, taste: ['wine', 'dry'] },
  'blackberry-wine': { gear: 1, weeks: 30, taste: ['wine', 'fruity'] },
  'orange-mead': { gear: 1, weeks: 9, taste: ['mead', 'sweet', 'spiced'] },
  'session-mead': { gear: 1, weeks: 5, taste: ['mead', 'fizzy', 'light'] },
  'quick-cyser': { gear: 1, weeks: 10, taste: ['mead', 'cider', 'fruity'] },
  'trad-mead': { gear: 1, weeks: 16, taste: ['mead', 'sweet'] },
  'vanilla-mead': { gear: 1, weeks: 20, taste: ['mead', 'sweet', 'spiced'] },
  'blackberry-melomel': { gear: 1, weeks: 30, taste: ['mead', 'fruity', 'sweet'] },
  'small-batch-pale': { gear: 1, weeks: 5, taste: ['beer', 'hoppy'] },
  'lager-kit-upgrade': { gear: 2, weeks: 7, taste: ['beer', 'light'] },
  'extract-pale': { gear: 2, weeks: 5, taste: ['beer', 'hoppy'] },
  'kveik-ipa': { gear: 2, weeks: 3, taste: ['beer', 'hoppy'] },
  'extract-stout': { gear: 2, weeks: 6, taste: ['beer', 'dark'] },
  'extract-wheat': { gear: 2, weeks: 4, taste: ['beer', 'light', 'fruity'] },
  'best-bitter': { gear: 3, weeks: 5, taste: ['beer', 'malty'] },
  'dry-stout': { gear: 3, weeks: 5, taste: ['beer', 'dark'] },
  'hazy-ipa': { gear: 3, weeks: 4, taste: ['beer', 'hoppy'] },
};
const GEAR = [
  { name: 'Nothing (use the juice bottle)', cost: '≈£0–£3', items: ['A sachet of wine/cider yeast', 'A balloon or just a loose cap'] },
  { name: 'Demijohn starter set', cost: '≈£20–£30', items: ['4.5 L glass demijohn + bored bung + airlock (often sold together)', 'No-rinse sanitiser (Star San / Chemsan)', 'Syphon tube', 'Funnel', 'Hydrometer + trial jar (≈£8, hugely useful)', 'Bottles: swing-tops or saved screw-cap/beer bottles'] },
  { name: 'Beer starter kit', cost: '≈£50–£70', items: ['25 L fermenting bucket with lid + airlock', 'Bottling bucket with tap (or a little bottler)', 'Hydrometer, thermometer, long spoon, sanitiser', '40 bottles, caps and a capper', 'Most UK shops sell all of this as one "starter kit"'] },
  { name: 'All-grain setup', cost: '≈£100–£300', items: ['30–35 L pot + strong heat source (or an all-in-one electric brewer)', 'Grain bag', 'Immersion chiller', 'Digital scales + good thermometer', 'Everything from the beer starter kit'] },
];
const metaOf = r => META[r.id] || { gear: r.drink === 'beer' ? 2 : 1, weeks: 8, taste: [r.drink] };
const recipeWeeks = r => metaOf(r).weeks;

/* =================== Start quiz =================== */
const QUIZ = [
  { k: 'like', q: 'What do you enjoy drinking?', hint: 'Pick the closest.', o: [
    ['cider', '🍏', 'Cider'], ['fruity', '🍓', 'Fruity & fizzy (alcopop-ish)'], ['wine', '🍷', 'Wine'], ['light', '🍺', 'Lager / light beer'],
    ['hoppy', '🌿', 'Hoppy IPA / pale ale'], ['dark', '☕', 'Stout / dark beer'], ['mead', '🍯', 'Something sweet & honeyed'], ['spiced', '🫚', 'Ginger / spiced'], ['any', '🤷', 'Not sure, surprise me']] },
  { k: 'gear', q: 'How much do you want to spend on equipment?', hint: 'Ingredients are extra (usually £3–£30).', o: [
    [0, '🪙', 'As little as possible (£0–£5)'], [1, '💷', 'About £20–£30'], [2, '💰', 'About £50–£70'], [3, '🏦', '£100+, I\'m all in']] },
  { k: 'wait', q: 'How patient are you?', hint: 'Time until it\'s ready to drink.', o: [
    [3, '⚡', 'Want it in 2–3 weeks'], [6, '📅', 'A month or so is fine'], [12, '🗓️', 'A couple of months'], [99, '🧘', 'Happy to wait for something great']] },
  { k: 'temp', q: 'Where will it ferment?', hint: 'Room temperature matters to yeast.', o: [
    ['warm', '🔥', 'Warm flat, 22 °C+'], ['normal', '🏠', 'Normal room, 17–22 °C'], ['cold', '❄️', 'Cool room or garage, under 16 °C']] },
  { k: 'exp', q: 'Have you brewed before?', hint: '', o: [
    [0, '🌱', 'Never, complete beginner'], [1, '🌿', 'Once or twice'], [2, '🌳', 'Yes, I know the basics']] },
];
function quizRank(a) {
  return Recipes.map(r => {
    const m = metaOf(r); let s = 0; const why = [];
    if (a.like === 'any') { s += r.level === 1 ? 3 : 0; } else if (m.taste.includes(a.like)) { s += 6; why.push('matches what you like'); }
    if (a.like === 'fruity') s += ['fizzy', 'sweet'].filter(t => m.taste.includes(t)).length;
    if (a.like === 'light' && m.taste.includes('beer') && m.taste.includes('light')) s += 2;
    if (m.gear > a.gear) s -= 8 * (m.gear - a.gear); else { s += 1; why.push(['no equipment needed', 'fits a ~£20 demijohn set', 'fits a beer starter kit', 'uses full all-grain kit'][m.gear]); }
    if (m.weeks > a.wait) s -= Math.min(8, (m.weeks - a.wait) / 2); else why.push(`ready in about ${m.weeks} weeks`);
    s += [[3, 1, -4], [2, 2, -1], [0, 1, 1]][a.exp][r.level - 1];
    if (r.level === 1 && a.exp === 0) why.push('beginner-proof');
    if (a.temp === 'warm' && r.id === 'kveik-ipa') { s += 4; why.push('Kveik yeast loves warm rooms'); }
    if (a.temp === 'cold' && r.id === 'lager-kit-upgrade') { s += 3; why.push('a cool room is perfect for lager yeast'); }
    if (a.temp === 'warm' && r.id === 'lager-kit-upgrade') s -= 3;
    return { r, s, why };
  }).sort((x, y) => y.s - x.s);
}
function pageStart(el) {
  let a = store.get('quiz', {}), step = 0;
  const draw = () => {
    if (step >= QUIZ.length) return result();
    const q = QUIZ[step];
    el.innerHTML = `<a class="back" href="#/">${I.arrowL} Home</a>
      <div class="eyebrow">Find your first brew · ${step + 1} of ${QUIZ.length}</div>
      <div class="ladder-prog" style="margin:10px 0 18px"><div style="width:${step / QUIZ.length * 100}%"></div></div>
      <h1>${q.q}</h1><p class="lead">${q.hint}</p>
      <div class="quiz-grid">${q.o.map(([v, em, l]) => `<button class="quiz-opt ${String(a[q.k]) === String(v) ? 'on' : ''}" data-v="${v}"><span class="em">${em}</span><span>${l}</span></button>`).join('')}</div>
      ${step > 0 ? `<div class="btns"><button class="btn ghost" data-back>← Back</button></div>` : ''}`;
  };
  const result = () => {
    store.set('quiz', a);
    const ranked = quizRank(a), top = ranked[0], alts = ranked.slice(1, 4);
    const m = metaOf(top.r), g = GEAR[m.gear];
    const tempTip = { warm: 'Your warm room speeds fermentation up but can make harsh flavours. Ferment somewhere cool-ish like a hallway floor, or use Kveik yeast for beer.', normal: 'Perfect. 17–22 °C suits almost every yeast. Keep it out of direct sunlight.', cold: 'Cool is good for clean flavours, but below ~15 °C wine and ale yeasts get sluggish. Wrap the fermenter in a blanket or move it indoors for the first week.' }[a.temp];
    el.innerHTML = `<div class="eyebrow">Your first brew</div><h1>Start with: ${esc(top.r.name)}</h1>
      <p class="lead">${top.r.desc}</p>
      <div class="calc"><div class="panel">
        <div class="stats">${stat('Strength', esc(typeof top.r.abv === 'string' ? top.r.abv : ''), '', '', 'big')}${stat('Ready in', '~' + m.weeks, 'weeks')}${stat('Difficulty', '★'.repeat(top.r.level) + '☆'.repeat(3 - top.r.level))}${stat('Batch', top.r.baseL, 'L')}</div>
        <p class="note" style="margin-top:12px"><b>Why:</b> ${[...new Set(top.why)].join(' · ')}</p>
        <div class="btns"><a class="btn pri" href="#/brew/${top.r.id}">${I.timer} Brew along step by step</a><a class="btn" href="#/recipe/${top.r.id}">Full recipe</a></div>
      </div>
      <div class="panel"><h3>What to buy: ${g.name} (${g.cost})</h3><ul class="ticks">${g.items.map(i => `<li>${i}</li>`).join('')}</ul>
        <h3>Ingredients</h3><ul class="ticks">${top.r.ingredients.map(i => `<li>${i.q} ${i.u} ${esc(i.n)}</li>`).join('')}${top.r.beer ? top.r.beer.grains.map(([id, kg]) => `<li>${kg} kg ${grain(id).name}</li>`).join('') + top.r.beer.hops.map(h => `<li>${h[1]} g ${h[0]} hops</li>`).join('') : ''}</ul></div></div>
      <div class="callout info"><b>Your room</b><div>${tempTip}</div></div>
      <h2>Also good for you</h2><div class="grid">${alts.map(x => recipeCard(x.r)).join('')}</div>
      <h2>Before you start</h2><div class="grid">
        <a class="card" href="#/guide/beginner"><div class="ic">${I.book}</div><h3>Beginner FAQ & 10 mistakes</h3><p>Five minutes that save your first batch.</p></a>
        <a class="card" href="#/guide/sanitation"><div class="ic">${I.drop}</div><h3>Cleaning & sanitising</h3><p>The #1 reason first brews go wrong.</p></a>
        <a class="card" href="#/calc/normal"><div class="ic">${I.ref}</div><h3>Is this normal?</h3><p>Bookmark it for when something looks weird.</p></a></div>
      <div class="btns"><button class="btn ghost" data-redo>↺ Retake the quiz</button></div>`;
  };
  el.addEventListener('click', e => {
    const o = e.target.closest('.quiz-opt');
    if (o) { const q = QUIZ[step]; a[q.k] = isNaN(+o.dataset.v) ? o.dataset.v : +o.dataset.v; step++; draw(); window.scrollTo(0, 0); }
    if (e.target.closest('[data-back]')) { step--; draw(); }
    if (e.target.closest('[data-redo]')) { a = {}; step = 0; draw(); }
  });
  draw();
}

/* =================== Brew-along mode =================== */
let alongTimer = null;
function icsFor(title, isoDate) {
  const d = isoDate.replace(/-/g, '');
  const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Brew Lab//EN', 'BEGIN:VEVENT', `UID:${Date.now()}@brewlab`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART;VALUE=DATE:${d}`, `SUMMARY:🍺 ${title.replace(/[,;]/g, ' ')}`, 'BEGIN:VALARM', 'TRIGGER:PT9H', 'ACTION:DISPLAY', 'DESCRIPTION:Brew Lab reminder', 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([body], { type: 'text/calendar' })); a.download = 'brew-reminder.ics'; a.click();
}
function pageBrew(el, id) {
  const r = Recipes.find(x => x.id === id); if (!r) return notFound(el);
  const L = store.get('scale.' + id, r.baseL), k = L / r.baseL;
  const ings = [
    ...(r.beer ? r.beer.grains.map(([gid, kg]) => `${kg * k >= 1 ? fmt(kg * k, 2) + ' kg' : fmt(kg * k * 1000, 0) + ' g'} ${grain(gid).name}`) : []),
    ...(r.beer ? r.beer.hops.map(([n, g, aa, min, use]) => `${fmt(g * k, 0)} g ${n} (${use === 'boil' ? min + ' min' : use === 'dry' ? 'dry hop' : use})`) : []),
    ...r.ingredients.map(i => `${i.fixed ? i.q : +(i.q * k).toFixed(2)} ${i.u} ${i.n}`),
  ];
  const steps = [
    { t: `<b>Gather everything.</b> Tick off each ingredient as you set it out (scaled for ${L} L).`, ing: true },
    { t: '<b>Clean, then sanitise</b> everything that will touch your brew: fermenter, bung, airlock, spoon, funnel, hydrometer. Wet every surface with no-rinse sanitiser; don\'t rinse it off.', link: ['#/guide/sanitation', 'How to sanitise'] },
    ...r.steps.map(t => ({ t })),
    { t: '<b>Log it!</b> Write down your starting gravity and date so you can track it and work out the ABV.', log: true },
  ];
  let st = store.get('along.' + id, { i: 0, done: [], ings: [], start: today() });
  const save = () => store.set('along.' + id, st);
  const draw = () => {
    const s = steps[st.i];
    const mins = (s.t.match(/(\d+)\s*(?:min|minutes)\b/) || [])[1];
    const later = s.t.match(/(\d+)(?:–\d+)?\s*(h|hours?|days?|weeks?)\b/);
    const nDone = st.done.filter(Boolean).length;
    el.innerHTML = `<a class="back" href="#/recipe/${id}">${I.arrowL} ${esc(r.name)}</a>
      <div class="eyebrow">Brew-along · step ${st.i + 1} of ${steps.length}</div>
      <div class="ladder-prog" style="margin:10px 0 16px"><div style="width:${nDone / steps.length * 100}%"></div></div>
      <div class="panel along fade-in">
        <div class="along-n">${st.i + 1}</div>
        <div class="along-t">${s.t}</div>
        ${s.ing ? `<div class="adds" style="margin-top:14px">${ings.map((x, i) => `<label class="add" style="grid-template-columns:28px 1fr;cursor:pointer"><input type="checkbox" data-ing="${i}" ${st.ings[i] ? 'checked' : ''} style="width:22px;height:22px;accent-color:#f5a524"><span>${esc(x)}</span></label>`).join('')}</div>` : ''}
        ${mins && +mins <= 120 ? `<div class="along-timer"><span id="atd">${mins}:00</span><button class="btn" data-tm="${mins}">${I.timer} Start ${mins}-min timer</button></div>` : ''}
        ${later ? `<button class="btn sm ghost" data-ics="${later[1].startsWith('h') ? Math.ceil(+later[1] / 24) : later[1].startsWith('w') ? +later[1] * 7 : +later[1]}">📅 Add a calendar reminder for ${later[0]} from now</button>` : ''}
        ${s.link ? `<div class="btns"><a class="btn sm" href="${s.link[0]}">${s.link[1]}</a></div>` : ''}
        ${s.log ? `<div class="btns"><a class="btn pri" href="#/log/new?name=${encodeURIComponent(r.name)}&drink=${r.juice ? 'juice' : r.drink}&og=${typeof r.og === 'number' ? r.og.toFixed(3) : ''}&L=${L}">${I.log} Start a batch log</a></div>` : ''}
        <div class="along-nav">
          <button class="btn ghost" data-nav="-1" ${st.i === 0 ? 'disabled' : ''}>← Back</button>
          <button class="btn pri big" data-ok>${st.done[st.i] ? '✓ Done' : 'Done'} ${st.i < steps.length - 1 ? '→ Next' : '🎉'}</button>
        </div>
      </div>
      <h2>All steps</h2>
      <div class="adds">${steps.map((x, i) => `<button class="add ${st.done[i] ? 'done' : ''} ${i === st.i ? 'next' : ''}" data-go="${i}" style="text-align:left;font:inherit;color:inherit;cursor:pointer"><span class="at">${st.done[i] ? '✓' : i + 1}</span><span>${x.t.replace(/<[^>]+>/g, '').slice(0, 110)}${x.t.length > 110 ? '…' : ''}</span><span></span></button>`).join('')}</div>
      <div class="btns"><button class="btn sm danger" data-reset>Start over</button></div>`;
  };
  el.addEventListener('click', e => {
    const t = e.target;
    if (t.closest('[data-ok]')) {
      st.done[st.i] = true;
      if (st.i < steps.length - 1) st.i++; else toast('Brew complete! 🎉 Now be patient…');
      save(); draw(); window.scrollTo(0, 0);
    }
    const n = t.closest('[data-nav]'); if (n && !n.disabled) { st.i = Math.max(0, st.i + +n.dataset.nav); save(); draw(); }
    const g = t.closest('[data-go]'); if (g) { st.i = +g.dataset.go; save(); draw(); window.scrollTo(0, 0); }
    const ic = t.closest('[data-ics]'); if (ic) icsFor(`${r.name}: next step`, addDays(today(), +ic.dataset.ics));
    if (t.closest('[data-reset]') && confirm('Reset your progress on this brew-along?')) { st = { i: 0, done: [], ings: [], start: today() }; save(); draw(); }
    const tm = t.closest('[data-tm]');
    if (tm) {
      clearInterval(alongTimer); beep(1);
      if ('wakeLock' in navigator) navigator.wakeLock.request('screen').catch(() => {});
      const end = Date.now() + +tm.dataset.tm * 60000;
      tm.textContent = 'Running…';
      alongTimer = setInterval(() => {
        const d = $('#atd', el); if (!d) { clearInterval(alongTimer); return; }
        const left = Math.max(0, end - Date.now());
        d.textContent = `${Math.floor(left / 60000)}:${String(Math.floor(left % 60000 / 1000)).padStart(2, '0')}`;
        if (!left) { clearInterval(alongTimer); beep(5); toast('⏰ Time\'s up!'); }
      }, 250);
    }
  });
  el.addEventListener('change', e => { if (e.target.dataset.ing != null) { st.ings[+e.target.dataset.ing] = e.target.checked; save(); } });
  draw();
}

/* =================== Is this normal? =================== */
const NORMAL = [
  { s: 'Day 1–3', q: 'Nothing is happening after 24 hours', v: 'normal', a: 'Yeast often takes 12–72 hours to get going, especially if it was cold. Give it 3 days somewhere 18–22 °C before worrying.' },
  { s: 'Day 1–3', q: 'Thick foam on top (beige, brown or white)', v: 'normal', a: 'That\'s krausen, the sign of a healthy, vigorous fermentation. It falls back after a few days.' },
  { s: 'Day 1–3', q: 'Foam is coming out of the airlock', v: 'watch', a: 'Too little headspace. Swap the airlock for a clean one, or fit a tube into a jar of sanitiser (a "blow-off"). Wipe up and sanitise. The brew is fine.' },
  { s: 'Day 1–3', q: 'My bucket airlock isn\'t bubbling, but there\'s foam', v: 'normal', a: 'Bucket lids often leak gas around the edge. Foam or a gravity drop means it\'s fermenting fine.' },
  { s: 'Any time', q: 'Smells like rotten eggs / struck matches', v: 'normal', a: 'Very common with cider, juice, mead and lager. It\'s hungry yeast. Next time add nutrient; it usually fades within weeks.' },
  { s: 'Any time', q: 'Smells yeasty, bready or like sulphur and fruit', v: 'normal', a: 'Fermentation smells strong. Your house will smell like a brewery for a few days.' },
  { s: 'Any time', q: 'Smells like nail-polish remover / solvent', v: 'watch', a: 'Usually fermented too warm. It can mellow with age, but next time keep it cooler (17–20 °C) for the first 3 days.' },
  { s: 'Any time', q: 'Smells or tastes like vinegar', v: 'problem', a: 'Acetobacter got in with air. It can\'t be fixed. Next time: sanitise, keep headspace small and keep the airlock topped up.' },
  { s: 'Any time', q: 'Fuzzy spots on the surface (green, blue, black or white)', v: 'problem', a: 'That\'s mould. On a young, low-alcohol brew, bin it. Common causes: too much headspace, fruit floating in air, poor sanitation.' },
  { s: 'Any time', q: 'Thin white film or wrinkly skin on top', v: 'watch', a: 'Probably a wild yeast or bacteria "pellicle". Not dangerous, but it changes the flavour. Taste it: if it\'s nice, rack from underneath and drink soon.' },
  { s: 'Any time', q: 'Clumps or islands of yeast floating on top', v: 'normal', a: 'Yeast rafts are normal, especially with some cider and wine yeasts. They usually drop.' },
  { s: 'Any time', q: 'Thick layer of sludge at the bottom', v: 'normal', a: 'That\'s lees/trub: dead and sleeping yeast. Leave it behind when you syphon. It\'s why you rack.' },
  { s: 'Any time', q: 'The liquid in the airlock sucked back into the brew', v: 'watch', a: 'Happens when it cools or you move it. A little sanitiser or boiled water won\'t hurt. Use a 3-piece airlock or fill it with sanitiser to be safe.' },
  { s: 'Any time', q: 'It got really warm (over 26 °C) for a day', v: 'watch', a: 'Expect some fruity or boozy flavours, but it\'s rarely ruined. Move it somewhere cooler and give it extra time.' },
  { s: '1–3 weeks', q: 'Airlock stopped bubbling', v: 'normal', a: 'Fermentation slows down and stops. Check the gravity: if it\'s the same over 3 days, it\'s finished. If it\'s still high, it might be stuck.' },
  { s: '1–3 weeks', q: 'Gravity stuck high (e.g. 1.020 for a week)', v: 'watch', a: 'Warm it to 20–22 °C and swirl the yeast back up. Add nutrient (wine/cider/mead). Still stuck? Add a sachet of EC-1118.' },
  { s: '1–3 weeks', q: 'It\'s cloudy', v: 'normal', a: 'Almost everything is cloudy at first. Give it time; cold helps. Fruit wine that won\'t clear needs pectolase.' },
  { s: '1–3 weeks', q: 'It tastes harsh, sour, yeasty or "green"', v: 'normal', a: 'Young brews taste rough. Most improve hugely after a few more weeks. Don\'t judge until it\'s been conditioned.' },
  { s: '1–3 weeks', q: 'Cider or wine is reading below 1.000 (like 0.996)', v: 'normal', a: 'Alcohol is lighter than water, so fully dry drinks read under 1.000. That means it\'s finished.' },
  { s: 'Bottles', q: 'Bottles are flat after a week', v: 'normal', a: 'Carbonation takes about 2 weeks warm (18–22 °C). Cold bottles carbonate very slowly. Turn them gently and wait.' },
  { s: 'Bottles', q: 'Bottles still flat after 4 weeks', v: 'watch', a: 'Forgot the priming sugar, caps not sealing, or the yeast was too tired (common after long ageing or with stabilised wine/cider).' },
  { s: 'Bottles', q: 'Every bottle gushes or the plastic tester is rock hard early', v: 'problem', a: 'Over-carbonated: bottled before it finished, too much sugar, or infection. Chill ALL bottles right away to slow it, vent them carefully over a sink with eye protection, and drink soon.' },
  { s: 'Bottles', q: 'Sediment in the bottom of bottles', v: 'normal', a: 'Bottle-conditioned drinks always have a thin yeast layer. Pour gently and leave the last centimetre.' },
];
defCalc({ id: 'normal', title: 'Is this normal?', icon: 'ref', group: 'Beginner',
  desc: 'Weird foam, eggy smells, no bubbles, white film? Look it up and find out whether to relax, keep an eye on it, or act.',
  render(el) {
    let filt = 'All', q = '';
    const V = { normal: ['✅ Normal', 'var(--ok)'], watch: ['⚠️ Keep an eye on it', 'var(--amber)'], problem: ['❌ Problem', 'var(--danger)'] };
    el.innerHTML = `<div class="inp search"><input id="nq" type="text" placeholder="Search: foam, smell, mould, flat…"></div><div id="nf" style="margin-bottom:14px"></div><div id="nl" class="grid two"></div>`;
    const draw = () => {
      const items = NORMAL.filter(n => (filt === 'All' || n.s === filt) && (n.q + n.a).toLowerCase().includes(q));
      $('#nl', el).innerHTML = items.map(n => `<details class="card nq" style="--c:${V[n.v][1]}"><summary><span class="pill c" style="--c:${V[n.v][1]}">${V[n.v][0]}</span><h3 style="margin:8px 0 0">${n.q}</h3></summary><p style="margin-top:10px">${n.a}</p></details>`).join('') || '<p class="note">Nothing matched. Try the troubleshooting guide.</p>';
    };
    seg($('#nf', el), ['All', 'Day 1–3', 'Any time', '1–3 weeks', 'Bottles'].map(x => [x, x]), 'All', v => { filt = v; draw(); });
    $('#nq', el).addEventListener('input', e => { q = e.target.value.toLowerCase(); draw(); });
    draw();
    el.insertAdjacentHTML('beforeend', `<div class="callout tip"><b>Rule of thumb</b><div>If it smells like a brewery, a bakery or eggs, relax. Vinegar or fuzzy mould are the real problems. When in doubt, check the gravity: if it\'s dropping, the yeast is working. <a href="#/guide/troubleshooting">Full troubleshooting guide →</a></div></div>`);
  } });

/* =================== Hydrometer trainer =================== */
defCalc({ id: 'trainer', title: 'Hydrometer reading trainer', icon: 'therm', group: 'Beginner',
  desc: 'Practise reading a hydrometer scale (meniscus and all) before you do it for real. 10 rounds, see how you score.',
  render(el) {
    let round = 0, score = 0, target = 0, answered = false;
    const pick = () => { target = Math.round((0.994 + Math.random() * 0.106) * 1000) / 1000; answered = false; };
    const svg = sg => {
      const y = v => 150 + (v - sg) * 1000 * 22; // higher gravity = lower down the stem
      const ticks = []; for (let v = Math.round((sg - 0.008) * 1000); v <= Math.round((sg + 0.008) * 1000); v++) ticks.push(v / 1000);
      const off = (Math.random() - 0.5) * 6; // slight realism
      return `<svg viewBox="0 0 320 300" style="width:100%;max-width:360px;display:block;margin:0 auto">
        <defs><clipPath id="hc"><rect x="0" y="0" width="320" height="300" rx="16"/></clipPath><linearGradient id="liq" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#f5a524" stop-opacity=".35"/><stop offset="1" stop-color="#c46a07" stop-opacity=".55"/></linearGradient></defs>
        <g clip-path="url(#hc)"><rect width="320" height="300" fill="#16110d"/>
        <rect x="0" y="${150 + off}" width="320" height="200" fill="url(#liq)"/>
        <rect x="95" y="-10" width="130" height="320" rx="8" fill="#f3ead9" stroke="#bfae96"/>
        ${ticks.map(v => { const big = Math.round(v * 1000) % 5 === 0; return `<line x1="95" x2="${big ? 135 : 115}" y1="${y(v)}" y2="${y(v)}" stroke="#3a2b1d" stroke-width="${big ? 2 : 1.2}"/>${big ? `<text x="140" y="${y(v) + 5}" font-size="15" font-family="monospace" fill="#3a2b1d" font-weight="700">${v.toFixed(3)}</text>` : ''}`; }).join('')}
        <path d="M0 ${150 + off} L79 ${150 + off} Q91 ${150 + off} 95 ${138 + off} L95 ${150 + off} Z M225 ${138 + off} Q229 ${150 + off} 241 ${150 + off} L320 ${150 + off} L225 ${150 + off}Z" fill="rgba(245,165,36,.45)"/>
        <line x1="0" x2="320" y1="${150 + off}" y2="${150 + off}" stroke="#ffc861" stroke-width="1.5"/></g></svg>`;
    };
    const draw = () => {
      if (round >= 10) {
        const best = Math.max(score, store.get('trainer.best', 0)); store.set('trainer.best', best);
        el.innerHTML = `<div class="panel" style="text-align:center"><div style="font-size:54px">${score >= 9 ? '🏆' : score >= 6 ? '👍' : '📚'}</div><h2>${score} / 10</h2><p class="note">Best: ${best}/10. ${score >= 8 ? 'You\'re ready for the real thing.' : 'Remember: read the flat surface, not the curve climbing the glass, and count the small ticks from the nearest labelled line.'}</p><div class="btns" style="justify-content:center"><button class="btn pri" data-again>Play again</button><a class="btn" href="#/guide/hydrometer">Hydrometer guide</a></div></div>`;
        return;
      }
      el.innerHTML = `<div class="calc"><div class="panel">${svg(target)}</div><div class="panel">
        <div class="eyebrow">Round ${round + 1} of 10 · Score ${score}</div>
        <h3 style="margin:10px 0">What does the hydrometer read?</h3>
        <p class="note">Each small tick = 0.001. Read where the <b>flat liquid surface</b> crosses the scale, not the little curve (meniscus) climbing up the stem.</p>
        <div class="fields" style="grid-template-columns:1fr auto;margin-top:12px"><div class="field"><div class="inp"><input id="ta" type="number" step="0.001" inputmode="decimal" placeholder="e.g. 1.046"></div></div><button class="btn pri" data-check>Check</button></div>
        <div id="tf" style="margin-top:12px"></div></div></div>`;
      $('#ta', el).focus();
    };
    const check = () => {
      if (answered) { round++; pick(); draw(); return; }
      const v = parseFloat($('#ta', el).value); if (!isFinite(v)) return;
      answered = true;
      const ok = Math.abs(v - target) < 0.0006, close = Math.abs(v - target) < 0.0021;
      if (ok) score++;
      $('#tf', el).innerHTML = `<div class="callout ${ok ? 'tip' : 'warn'}"><b>${ok ? 'Correct' : close ? 'Close' : 'Not quite'}</b><div>It reads <b>${target.toFixed(3)}</b>${ok ? '. Nice!' : `. You said ${v.toFixed(3)}.`} That's ${target < 1.004 ? 'a finished, dry brew' : target < 1.02 ? 'nearly finished, or a sweet finish' : target < 1.065 ? 'a typical starting gravity for beer or cider' : 'a strong wine or mead must'} (≈${fmt(Calc.abvSimple(target, 1.0), 1)}% potential if fermented to 1.000).</div></div>
        <button class="btn" data-check>Next →</button>`;
    };
    el.addEventListener('click', e => { if (e.target.closest('[data-check]')) check(); if (e.target.closest('[data-again]')) { round = 0; score = 0; pick(); draw(); } });
    el.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
    pick(); draw();
  } });

/* =================== Start-quiz calculator card (links to page) =================== */
defCalc({ id: 'start', title: 'Find your first brew (quiz)', icon: 'flask', group: 'Beginner',
  desc: 'Five quick questions. Get the best recipe for your taste, budget, patience and room, plus exactly what to buy.',
  render(el) { location.replace('#/start'); } });

/* =================== Beginner guide =================== */
window.Guides.splice(1, 0, {
  id: 'beginner', title: 'Beginner FAQ & the 10 classic mistakes', drink: 'all', mins: 7, level: 'Start here',
  summary: 'The questions every first-timer asks, and the mistakes that ruin first batches, so you can skip them.',
  html: `
${calc('start', 'Not sure what to make? Take the 1-minute quiz')}
<h3>Quick answers</h3>
<table class="tbl">
<tr><th>Question</th><th>Answer</th></tr>
<tr><td>Is it legal?</td><td>Yes, in the UK, for your own use. You can't sell it, and you can't distil. <a href="#/guide/safety">Details</a></td></tr>
<tr><td>Is it safe? Can it make me ill or blind?</td><td>Fermented drinks made with normal hygiene are safe. Harmful bacteria can't survive in alcohol plus acid. Methanol is only a real risk if you distil, which you won't. The worst a bad batch usually does is taste awful.</td></tr>
<tr><td>What's the cheapest way to try?</td><td><a href="#/recipe/bottle-cider">Bottle cider</a>: a bottle of apple juice and £1–£3 of yeast.</td></tr>
<tr><td>Where do I buy yeast and kit?</td><td>Local homebrew shops, online homebrew retailers, and some supermarkets and Amazon. Search "wine yeast sachet", "demijohn bung airlock".</td></tr>
<tr><td>Can I use bread yeast?</td><td>Yes, in an emergency. It works but tastes bready and stays cloudy. A proper wine/cider yeast costs about £1 more and is far better.</td></tr>
<tr><td>How do I know how strong it is?</td><td>Measure gravity with a hydrometer before and after; the <a href="#/calc/abv">ABV calculator</a> does the maths. Practise with the <a href="#/calc/trainer">hydrometer trainer</a>.</td></tr>
<tr><td>How do I know it's finished?</td><td>The same hydrometer reading 3 days apart. The airlock alone is not reliable.</td></tr>
<tr><td>Why is my cider so dry and sour?</td><td>Yeast eats all the sugar. That's normal! See <a href="#/calc/sweeten">back-sweetening</a> or add a non-fermentable sweetener.</td></tr>
<tr><td>Can I make it fizzy?</td><td>Yes: add a measured amount of sugar at bottling. Use the <a href="#/calc/priming">priming calculator</a> and pressure-safe bottles.</td></tr>
<tr><td>Something looks weird. Is it ruined?</td><td>Almost certainly not. Check <a href="#/calc/normal">Is this normal?</a></td></tr>
<tr><td>How long until I can drink it?</td><td>Cider and kit beer: 4–6 weeks. Juice wine: 2–3 months. Country wine and mead: 6+ months for the best results.</td></tr>
</table>
<h3>The 10 classic first-batch mistakes</h3>
<ol class="steps">
<li><b>Skipping sanitising.</b> Sanitise everything that touches the brew after the boil (or everything, for juice/wine). It takes 2 minutes.</li>
<li><b>Buying juice with preservatives.</b> Sorbate (E202) or benzoate (E211) means no fermentation. Use the <a href="#/calc/label">label checker</a>.</li>
<li><b>Adding yeast to hot liquid.</b> Over ~35–40 °C kills it. Always cool to room temperature first.</li>
<li><b>Fermenting too warm.</b> A fermenter next to a radiator or in the sun makes harsh, solvent-like flavours. Aim for 17–20 °C.</li>
<li><b>Trusting the airlock.</b> No bubbles doesn't mean nothing is happening; bubbles don't mean it's still fermenting. Use a hydrometer.</li>
<li><b>Bottling too early.</b> Bottling with sugar still left leads to gushers and exploding bottles. Wait for a stable gravity.</li>
<li><b>Tightening the cap on a fermenting bottle.</b> Gas has to escape. Loose cap, balloon or airlock only.</li>
<li><b>Too much headspace for too long.</b> A half-empty demijohn left for months means oxidation and vinegar risk. Top up after racking.</li>
<li><b>Drinking it too young.</b> Week-3 cider tastes rough; week-8 cider tastes great. Patience is an ingredient.</li>
<li><b>Not writing anything down.</b> Use the <a href="#/log">batch log</a>: date, gravity, what you did. That's how you repeat good batches and fix bad ones.</li>
</ol>
${tip('Make two small batches at once (for example, two demijohns of cider with different yeasts). You learn twice as fast, and you always have something to drink while the next one ferments.')}`
});
