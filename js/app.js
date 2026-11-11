/* Brew Lab — pages and hash router. */
const NAV = [
  ['home', '#/', 'Home', I.home],
  ['guides', '#/learn', 'Learn', I.book],
  ['calcs', '#/calcs', 'Calculators', I.calc],
  ['recipes', '#/recipes', 'Recipes', I.flask],
  ['log', '#/log', 'Batch log', I.log],
  ['inbox', '#/inbox', 'Notifications', I.bell],
  ['calendar', '#/calendar', 'Calendar', I.cal],
  ['cellar', '#/cellar', 'Cellar', I.bottle],
  ['stats', '#/stats', 'Stats', I.chart],
  ['shop', '#/shop', 'Shopping list', I.cart],
  ['paths', '#/paths', 'Skill ladders', I.ladder],
  ['ref', '#/ref', 'Reference', I.library],
  ['search', '#/search', 'Search', I.ref],
  ['features', '#/features', 'Feature guide', I.help],
  ['whatsnew', '#/whatsnew', 'What\'s new', I.spark],
  ['app', '#/app', 'App & settings', I.gear],
];
const HUB = 'https://mstevens-02.github.io/tools/';

function shell() {
  document.body.innerHTML = `
  <header class="topbar"><a class="brand" href="#/">${LOGO()}<div><b>Brew Lab</b></div></a><span class="tb-icons"><a href="#/search" aria-label="Search">${I.ref}</a><a href="#/inbox" aria-label="Notifications" data-nav="inbox">${I.bell}</a><a href="#/calendar" aria-label="Calendar" data-nav="calendar">${I.cal}</a><a href="#/more" aria-label="More">${I.menu}</a></span></header>
  <div class="app">
    <aside class="side"><a class="brand" href="#/">${LOGO()}<div><b>Brew Lab</b><span>Ferment anything</span></div></a>
      ${NAV.map(([k, h, l, ic]) => `<a class="navlink" data-nav="${k}" href="${h}" title="${l}">${ic}<span>${l}</span></a>`).join('')}
      <div class="foot">Made by Michael Stevens<br><a href="${HUB}">← All my tools</a></div></aside>
    <main id="view"></main>
  </div>
  <nav class="bottom">${NAV.filter(n => ['home', 'guides', 'calcs', 'recipes', 'log'].includes(n[0])).map(([k, h, l, ic]) => `<a data-nav="${k}" href="${h}">${ic}<span>${l === 'Calculators' ? 'Calcs' : l === 'Batch log' ? 'Log' : l}</span></a>`).join('')}</nav>`;
}

/* ---------- Pages ---------- */
function heroGlass() {
  const bubbles = Array.from({ length: 14 }, (_, i) => {
    const x = 70 + (i * 37) % 80, r = 1.5 + (i % 3), d = 3 + (i % 5) * 0.9, delay = (i * 0.53) % 4;
    return `<circle class="bub" cx="${x}" cy="230" r="${r}" fill="#fff6e0" opacity=".0" style="animation-duration:${d}s;animation-delay:${delay}s"/>`;
  }).join('');
  return `<svg viewBox="0 0 220 280"><defs>
    <linearGradient id="beer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffcf6b"/><stop offset=".6" stop-color="#f19a1c"/><stop offset="1" stop-color="#c46a07"/></linearGradient>
    <linearGradient id="shine" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset=".5" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <clipPath id="gl"><path d="M50 60h120l-12 190a12 12 0 0 1-12 11H74a12 12 0 0 1-12-11z"/></clipPath></defs>
    <g clip-path="url(#gl)"><rect x="40" y="60" width="140" height="210" fill="url(#beer)"/>${bubbles}<rect x="70" y="60" width="26" height="210" fill="url(#shine)"/></g>
    <path d="M44 62c-4-18 12-30 28-24 6-14 30-18 42-6 12-12 38-8 42 10 16-4 28 10 22 22-2 6-8 8-14 8H58c-8 0-13-4-14-10z" fill="#fff7e8"/>
    <circle cx="80" cy="50" r="10" fill="#fffaf0"/><circle cx="130" cy="44" r="12" fill="#fffaf0"/><circle cx="160" cy="58" r="8" fill="#fffaf0"/>
    <path d="M50 60h120l-12 190a12 12 0 0 1-12 11H74a12 12 0 0 1-12-11z" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2"/>
  </svg>`;
}

function calcCard(c) {
  return `<a class="card" href="#/calc/${c.id}"><div class="ic">${I[c.icon] || I.calc}</div><h3>${c.title}</h3><p>${c.desc}</p></a>`;
}
function guideCard(g) {
  const d = DRINK[g.drink];
  return `<a class="card" href="#/guide/${g.id}" style="--c:${d.c}"><div class="meta" style="margin:0 0 10px"><span class="pill c" style="--c:${d.c}">${d.em} ${d.name}</span><span class="pill">${g.mins} min read</span></div><h3>${g.title}</h3><p>${g.summary}</p><div class="meta"><span class="pill">${g.level}</span></div></a>`;
}
function recipeStats(r) {
  if (r.beer) { const a = analyse(designFromRecipe(r)); return { og: a.og, fg: a.fg, abv: fmt(a.abv, 1) + '%', ibu: Math.round(a.ibu), srm: a.srm }; }
  return { og: r.og, fg: r.fg, abv: r.abv };
}
function recipeCard(r) {
  const d = DRINK[r.drink], s = recipeStats(r);
  return `<a class="card" href="#/recipe/${r.id}" style="--c:${d.c}"><div class="meta" style="margin:0 0 10px"><span class="pill c" style="--c:${d.c}">${d.em} ${d.name}</span><span class="pill"><span style="color:var(--amber2)">${'★'.repeat(r.level)}</span><span style="opacity:.3">${'★'.repeat(3 - r.level)}</span></span></div>
    <h3>${r.name}</h3><p>${r.desc}</p><div class="meta"><span class="pill">${s.abv}</span>${s.ibu != null ? `<span class="pill">${s.ibu} IBU</span>` : ''}<span class="pill">${r.baseL} L</span><span class="pill">${r.time}</span></div></a>`;
}

function pageHome(el) {
  const active = getBatches().filter(b => b.status !== 'Finished').slice(0, 3);
  const featured = ['juice', 'yeastpick', 'abv', 'recipe', 'mead', 'timer'].map(id => Calcs.find(c => c.id === id));
  el.innerHTML = `
  <section class="hero">
    <div><div class="eyebrow">Home brewing, worked out</div>
      <h1>Make <em>beer, wine, cider & mead</em> that you're proud of.</h1>
      <p class="lead">In-depth guides, ${Calcs.length} calculators, tested recipes and a batch log that tracks every gravity reading, all in your browser.</p>
      <div class="btns"><a class="btn pri" href="#/start">🌱 Complete beginner? Find your first brew</a><a class="btn" href="#/calcs">Open calculators</a></div></div>
    <div class="glass">${heroGlass()}</div>
  </section>
  <h2>What are you making?</h2>
  <div class="drinks">
    ${['juice', 'beer', 'wine', 'cider', 'mead', 'other'].map(k => `<a class="drink ${k === 'juice' ? 'feat' : ''}" href="${k === 'juice' ? '#/juice' : '#/drink/' + k}" style="--c:${DRINK[k].c}"><div class="em">${DRINK[k].em}</div><b>${DRINK[k].name}</b><span>${{ juice: 'Easiest start: apple, grape, pear… from the supermarket', beer: 'Kits, extract, all-grain', wine: 'Kits, juice, hedgerow', cider: 'Juice or pressed apples', mead: 'Honey wine, any style', other: 'Ginger beer, hard lemonade, seltzer, sake' }[k]}</span></a>`).join('')}
  </div>
  <h3 style="margin:22px 0 10px;color:var(--text)">…or from bread, potatoes, rice & more</h3>
  <div class="drinks drinks5">${['bread', 'potato', 'rice', 'grain', 'misc', 'wild'].map(k => `<a class="drink" href="#/drink/${k}" style="--c:${DRINK[k].c}"><div class="em">${DRINK[k].em}</div><b>${DRINK[k].name}</b><span>${{ bread: 'Kvass to bread beer', potato: 'Potato wine to potato ale', rice: 'Jiuniang, makgeolli, sake', grain: 'Gluten-free, corn beer, chicha', misc: 'Tepache, tea wine, kombucha, birch sap', wild: 'No shops: wild yeast, foraging, survival' }[k]}</span></a>`).join('')}</div>
  <a class="card" href="#/paths" style="margin-top:12px;display:flex;gap:14px;align-items:center;--c:#7fd18b"><div class="ic" style="margin:0">${I.ladder}</div><div><h3>Skill ladders</h3><p>Every drink, five ways: super easy → easy → medium → hard → expert. Tick them off as you level up.</p></div></a>
  <div class="section-h"><h2>Your brewery</h2><a href="#/more">Everything →</a></div>
  <div class="grid">
    <a class="card" href="#/calendar"><div class="ic">${I.cal}</div><h3>Calendar & reminders</h3><p>Every batch step on a calendar, plus your own reminders. Export to your phone for real alarms.</p></a>
    <a class="card" href="#/cellar"><div class="ic">${I.bottle}</div><h3>Cellar</h3><p>Bottles ready to drink, what's still conditioning, and a "drank one" counter.</p></a>
    <a class="card" href="#/shop"><div class="ic">${I.cart}</div><h3>Shopping list</h3><p>Add any recipe's ingredients in one tap. Tick off in the shop, share with someone.</p></a>
    <a class="card" href="#/stats"><div class="ic">${I.chart}</div><h3>Your stats</h3><p>Litres brewed, favourite drinks, best-rated batch and money saved.</p></a>
  </div>
  <a class="card school-hero" href="#/learn" style="margin-top:28px"><div><div class="eyebrow">🎓 New: Brew School</div><h2 style="margin:8px 0 6px">Learn to brew in 10 short lessons</h2><p>Bite-size lessons with quizzes, flashcards, a fermentation simulator and a certificate at the end.</p></div><span class="sh-em">🎓</span></a>
  <div class="section-h"><h2>Beginner toolkit</h2><a href="#/guide/beginner">Beginner FAQ →</a></div>
  <div class="grid">
    <a class="card" href="#/start" style="--c:#7fd18b"><div class="ic">${I.flask}</div><h3>Find your first brew</h3><p>A 5-question quiz that picks a recipe for your taste, budget and patience, and tells you exactly what to buy.</p></a>
    <a class="card" href="#/calc/normal" style="--c:#7fd18b"><div class="ic">${I.ref}</div><h3>Is this normal?</h3><p>Foam, smells, film, no bubbles: relax, keep an eye on it, or act.</p></a>
    <a class="card" href="#/kit" style="--c:#7fd18b"><div class="ic">${I.flask}</div><h3>Kit explained</h3><p>Pictures of every bit of equipment: what it is, what it's for and whether you need it yet.</p></a>
    <a class="card" href="#/calc/bottlecheck" style="--c:#7fd18b"><div class="ic">${I.bottle}</div><h3>Ready to bottle?</h3><p>A 30-second safety check before bottling. No flat beer, no exploding bottles.</p></a>
    <a class="card" href="#/calc/trainer" style="--c:#7fd18b"><div class="ic">${I.therm}</div><h3>Hydrometer trainer</h3><p>Practise reading the scale before brew day. 10 rounds.</p></a>
    <a class="card" href="#/recipes?f=easy" style="--c:#7fd18b"><div class="ic">${I.timer}</div><h3>Brew along, step by step</h3><p>Every recipe has a guided mode: one step at a time, with ticks, timers and calendar reminders.</p></a>
  </div>
  <div class="section-h"><h2>Quick ABV</h2><a href="#/calc/abv">Full calculator →</a></div>
  <div class="panel"><div class="quick">
    <div class="field"><label>OG</label><div class="inp"><input id="qog" type="number" step="0.001" inputmode="decimal" value="1.050"></div></div>
    <div class="field"><label>FG</label><div class="inp"><input id="qfg" type="number" step="0.001" inputmode="decimal" value="1.010"></div></div>
    <div id="qout"></div></div></div>
  ${active.length ? `<div class="section-h"><h2>On the go</h2><a href="#/log">Batch log →</a></div><div class="grid two">${active.map(b => {
    const l = latest(b); const sg = l ? l.sg : b.og;
    return `<a class="card batch" href="#/log/${b.id}" style="--c:${DRINK[b.drink]?.c}"><div class="strip"></div><div><h3>${DRINK[b.drink]?.em} ${esc(b.name)}</h3><div class="meta"><span class="status">${esc(b.status)}</span><span class="pill">Day ${Math.max(0, daysBetween(b.start, today()))}</span></div></div><div class="r"><b>${fmt(Calc.abv(b.og, sg), 1)}%</b><small>${sgf(sg)}</small></div></a>`;
  }).join('')}</div>` : ''}
  <div class="section-h"><h2>Popular tools</h2><a href="#/calcs">All ${Calcs.length} →</a></div>
  <div class="grid">${featured.map(calcCard).join('')}</div>
  <div class="section-h"><h2>Try a recipe</h2><a href="#/recipes">All recipes →</a></div>
  <div class="grid">${Recipes.slice(0, 3).map(recipeCard).join('')}</div>
  <div class="callout info" style="margin-top:28px"><b>UK law</b><div>Brewing beer, wine, cider and mead for your own use is legal. Selling it, or distilling at all, needs HMRC approval. <a href="#/guide/safety">Safety & law →</a></div></div>`;
  const q = () => {
    const og = parseFloat($('#qog', el).value), fg = parseFloat($('#qfg', el).value);
    $('#qout', el).innerHTML = og > fg ? stat('ABV', fmt(Calc.abv(og, fg), 1), '%', `${fmt(Calc.ukUnits(Calc.abv(og, fg), 568), 1)} units / pint`) : stat('ABV', '—');
  };
  el.addEventListener('input', q); q();
}

function pageDrink(el, k) {
  if (k === 'juice') return pageJuice(el);
  const d = DRINK[k]; if (!d) return notFound(el);
  const intro = {
    beer: 'Beer is the most technical of the four and the most rewarding to design. Start with a kit or extract brew, then move to Brew in a Bag once you\'re hooked.',
    wine: 'From a weekend wine kit to foraged blackberry wine. Wine is easy to make but rewards patience: most of the magic happens in the months of ageing.',
    cider: 'The easiest place to start. Good supermarket juice and a packet of yeast makes a crisp, dry cider in a few weeks.',
    mead: 'Honey, water and yeast. Modern staggered-nutrient methods mean great mead in months, not years. Endlessly customisable with fruit and spice.',
    other: 'Ginger beer, hard lemonade, hard seltzer, wild ginger-bug ferments and even sake-style rice wine. Same yeast science, different ingredients.',
    bread: 'Stale bread makes kvass, a tangy, barely alcoholic Eastern European classic, and it can even go into beer. Bread is starch, so it needs a little help: see the starch guide.',
    potato: 'Potato wine is a traditional British country wine, and potatoes can be mashed with malt into a light ale. Never use green or sprouting potatoes.',
    rice: 'From sweet Chinese jiuniang in 2 days to milky Korean makgeolli and Japanese sake. Rice needs moulds (yeast balls, nuruk or koji) to turn its starch into sugar.',
    grain: 'Gluten-free sorghum beer, oat ales, corn beer and Andean chicha, right up to malting your own grain.',
    misc: 'Tepache from pineapple peel, thrifty tea wine, hard kombucha, rich banana wine and springtime birch sap wine.',
    wild: 'No shops, no internet: how to brew with foraged sugar, wild yeast you catch and keep yourself, home-made vessels and airlocks, and how strong you can really get without a still.',
  }[k];
  const calcs = { beer: ['recipe', 'water', 'timer', 'yeast', 'yeastpick', 'priming', 'keg', 'abv'], wine: ['juice', 'sugar', 'sweeten', 'yeastpick', 'abv', 'hydrotemp', 'dilute'], cider: ['juice', 'label', 'sugar', 'priming', 'sweeten', 'yeastpick', 'abv'], mead: ['mead', 'yeastpick', 'sweeten', 'priming', 'abv'], other: ['yeastpick', 'sugar', 'sweeten', 'priming', 'keg', 'abv'], bread: ['planner', 'priming', 'abv', 'normal'], potato: ['planner', 'sugar', 'sweeten', 'abv'], rice: ['planner', 'abv', 'normal', 'doctor'], grain: ['recipe', 'planner', 'water', 'priming'], misc: ['planner', 'sugar', 'sweeten', 'priming'], wild: ['normal', 'doctor', 'flavours', 'abv'] }[k];
  el.innerHTML = `<a class="back" href="#/">${I.arrowL} Home</a>
    <div class="eyebrow" style="color:${d.c}">${d.em} ${d.name}</div><h1>${d.name}</h1><p class="lead">${intro}</p>
    <h2>Ways to make it: super easy to expert</h2><div id="dl"></div>
    <h2>Guides</h2><div class="grid two">${Guides.filter(g => g.drink === k || g.drink === 'all' || (k === 'other' && g.id === 'yeast')).sort((a, b) => (b.id === 'starch' || b.id === 'survival') - (a.id === 'starch' || a.id === 'survival')).sort((a, b) => (b.drink === k) - (a.drink === k)).map(guideCard).join('')}</div>
    <h2>Recipes</h2><div class="grid">${Recipes.filter(r => r.drink === k).map(recipeCard).join('') || '<p class="muted">Use the calculators to design your own.</p>'}</div>
    <h2>Calculators</h2><div class="grid">${calcs.map(id => calcCard(Calcs.find(c => c.id === id))).join('')}</div>`;
  ladder($('#dl', el), k);
}

function pageGuides(el) {
  const order = ['all', 'juice', 'beer', 'wine', 'cider', 'mead'];
  el.innerHTML = `<div class="eyebrow">Learn</div><h1>Guides</h1><p class="lead">Everything from your first cider to all-grain brew days. Start with the first three if you're new.</p>
    ${order.map(k => { const gs = Guides.filter(g => g.drink === k); return gs.length ? `<h2>${k === 'all' ? 'Fundamentals' : DRINK[k].em + ' ' + DRINK[k].name}</h2><div class="grid two">${gs.map(guideCard).join('')}</div>` : ''; }).join('')}
    <h2>Reference</h2><div class="grid two"><a class="card" href="#/ref"><div class="ic">${I.ref}</div><h3>Styles, ingredients & glossary</h3><p>Beer style ranges, hop and yeast tables, sweetness and carbonation levels, and a searchable A–Z.</p></a></div>`;
}

function pageGuide(el, id) {
  const g = Guides.find(x => x.id === id); if (!g) return notFound(el);
  const i = Guides.indexOf(g), prev = Guides[i - 1], next = Guides[i + 1];
  const d = DRINK[g.drink];
  el.innerHTML = `<a class="back" href="#/guides">${I.arrowL} Guides</a>
    <div class="eyebrow" style="color:${d.c}">${d.em} ${d.name} · ${g.level} · ${g.mins} min</div>
    <h1>${g.title}</h1><p class="lead">${g.summary}</p>
    <article class="prose">${g.html}</article>
    <div class="hr"></div>
    <div class="grid two">${prev ? `<a class="card" href="#/guide/${prev.id}"><p>← Previous</p><h3>${prev.title}</h3></a>` : '<div></div>'}${next ? `<a class="card" href="#/guide/${next.id}" style="text-align:right"><p>Next →</p><h3>${next.title}</h3></a>` : ''}</div>`;
}

function pageCalcs(el) {
  const groups = ['Beginner', 'Shop juice', 'Essentials', 'Beer', 'Wine, cider & mead', 'Packaging'];
  el.innerHTML = `<div class="eyebrow">Tools</div><h1>Calculators</h1><p class="lead">Every number you need, from first gravity reading to the last bottle. Your inputs are remembered.</p>
    ${groups.map(g => `<h2>${g}</h2><div class="grid">${Calcs.filter(c => c.group === g).map(calcCard).join('')}</div>`).join('')}`;
}

function pageCalc(el, id) {
  const c = Calcs.find(x => x.id === id); if (!c) return notFound(el);
  el.innerHTML = `<a class="back" href="#/calcs">${I.arrowL} Calculators</a>
    <div class="eyebrow">${c.group}</div><h1>${c.title}</h1><p class="lead">${c.desc}</p><div id="cbody"></div>`;
  const body = $('#cbody', el);
  if (c.render) { c.render(body); return; }
  body.innerHTML = `<div class="calc"><div class="panel" id="cf"></div><div class="panel"><div class="out" id="co"></div></div></div>`;
  mountForm(c.id, $('#cf', body), $('#co', body), c.fields, c.compute);
}

function pageRecipes(el) {
  const f = store.get('rfilter', { d: 'all', lvl: 0, quick: false, q: '' });
  if (qparams().f === 'easy') { f.lvl = 1; f.d = 'all'; f.q = ''; f.quick = false; }
  el.innerHTML = `<div class="eyebrow">Brew</div><h1>Recipes</h1><p class="lead">${Recipes.length} tested recipes that scale to any batch size. Every one has a step-by-step brew-along mode. Not sure? <a href="#/start">Take the quiz</a>.</p>
    <div class="inp search"><input id="rq" type="text" placeholder="Search recipes: cherry, stout, honey…" value="${esc(f.q)}"></div>
    <div class="filters"><div id="fd"></div><div id="fl"></div><label class="pill" style="cursor:pointer;padding:9px 12px"><input type="checkbox" id="fq" ${f.quick ? 'checked' : ''} style="accent-color:#f5a524"> Ready in ≤ 6 weeks</label></div>
    <div id="rlist"></div>`;
  const draw = () => {
    store.set('rfilter', f);
    const q = f.q.toLowerCase();
    const list = Recipes.filter(r => (f.d === 'all' || (f.d === 'juice' ? r.juice : f.d === 'starch' ? ['bread', 'potato', 'rice', 'grain', 'misc', 'wild'].includes(r.drink) : r.drink === f.d)) && (!f.lvl || r.level === f.lvl) && (!f.quick || recipeWeeks(r) <= 6)
      && (r.name + r.desc + r.ingredients.map(i => i.n).join(' ')).toLowerCase().includes(q))
      .sort((a, b) => a.level - b.level || recipeWeeks(a) - recipeWeeks(b));
    $('#rlist', el).innerHTML = `<p class="note">${list.length} recipe${list.length === 1 ? '' : 's'}</p><div class="grid">${list.map(recipeCard).join('')}</div>` + (list.length ? '' : '<div class="empty">No matches. Try clearing a filter.</div>');
  };
  seg($('#fd', el), [['all', 'All'], ['juice', '🧃 Juice'], ['cider', '🍏 Cider'], ['wine', '🍷 Wine'], ['mead', '🍯 Mead'], ['beer', '🍺 Beer'], ['other', '🫚 Other'], ['starch', '🍞 Bread, rice & more']], f.d, v => { f.d = v; draw(); });
  seg($('#fl', el), [['0', 'Any level'], ['1', '★ Beginner'], ['2', '★★'], ['3', '★★★']], String(f.lvl), v => { f.lvl = +v; draw(); });
  $('#rq', el).addEventListener('input', e => { f.q = e.target.value; draw(); });
  $('#fq', el).addEventListener('change', e => { f.quick = e.target.checked; draw(); });
  draw();
}

function pageRecipe(el, id) {
  const r = Recipes.find(x => x.id === id); if (!r) return notFound(el);
  const d = DRINK[r.drink];
  let L = store.get('scale.' + id, r.baseL);
  el.innerHTML = `<a class="back" href="#/recipes">${I.arrowL} Recipes</a>
    <div class="eyebrow" style="color:${d.c}">${d.em} ${d.name}${r.style ? ' · ' + r.style : ''} · ${r.time}</div><h1>${r.name}</h1><p class="lead">${r.desc}</p>
    <div class="calc"><div>
      <div class="panel"><div class="fields"><div class="field"><label>Batch size</label><div class="inp"><input id="scale" type="number" step="0.5" inputmode="decimal" value="${L}" class="has-u"><span class="u">L</span></div><div class="hint">Original: ${r.baseL} L</div></div></div>
      <h3>Ingredients</h3><div id="ing"></div></div>
    </div><div><div class="panel"><div id="rstats"></div><div class="btns" id="ract"></div></div></div></div>
    <h2>Method</h2><ol class="steps prose">${r.steps.map(s => `<li>${s}</li>`).join('')}</ol>`;
  const draw = () => {
    const k = L / r.baseL;
    let rows = '';
    if (r.beer) {
      const b = r.beer;
      rows += b.grains.map(([gid, kg]) => `<tr><td class="num">${kg * k >= 1 ? fmt(kg * k, 2) + ' kg' : fmt(kg * k * 1000, 0) + ' g'}</td><td>${grain(gid).name}</td></tr>`).join('');
      rows += b.hops.map(([n, g, aa, min, use]) => `<tr><td class="num">${fmt(g * k, 0)} g</td><td>${n} <small>(${aa}% AA) — ${use === 'boil' ? min + ' min' : use === 'dry' ? 'dry hop' : use === 'whirlpool' ? `whirlpool ${min} min` : 'flameout'}</small></td></tr>`).join('');
    }
    rows += r.ingredients.map(i => {
      const q = i.fixed ? i.q : i.q * k;
      const nq = x => (x >= 20 ? fmt(x, 0) : String(+x.toFixed(2)));
      const qs = i.u === 'kg' && q < 1 ? fmt(q * 1000, 0) + ' g' : `${nq(q)}${i.u ? ' ' + i.u : ''}`;
      return `<tr><td class="num">${qs}</td><td>${esc(i.n)}</td></tr>`;
    }).join('');
    $('#ing', el).innerHTML = `<div class="tbl-wrap"><table class="tbl">${rows}</table></div>`;
    const s = recipeStats(r);
    $('#rstats', el).innerHTML = `<div class="stats">${stat('ABV', s.abv, '', '', 'big')}${stat('OG', sgf(s.og))}${stat('FG', sgf(s.fg))}${s.ibu != null ? stat('IBU', s.ibu) : ''}${s.srm != null ? stat('Colour', fmt(s.srm * 1.97, 0), 'EBC') : ''}</div>
      ${s.srm != null ? `<div style="display:flex;justify-content:center;margin-top:10px">${glassSVG(s.srm, 70)}</div>` : ''}`;
    const ogStr = typeof s.og === 'number' ? s.og.toFixed(3) : s.og;
    $('#ract', el).innerHTML = `<a class="btn pri" href="#/brew/${r.id}">${I.timer} Brew along step by step</a><a class="btn" href="#/log/new?name=${encodeURIComponent(r.name)}&drink=${r.drink}&og=${ogStr}&L=${L}">${I.log} Start this batch</a>
      <button class="btn" data-addshop="${r.id}">${I.cart} Add to shopping list</button><button class="btn" data-share="${location.origin + location.pathname}#/recipe/${r.id}" data-title="${esc(r.name)}">📤 Share</button>
      ${r.beer ? `<a class="btn" href="#/calc/recipe?r=${r.id}">${I.flask} Open in designer</a>` : ''}
      ${r.drink === 'mead' ? `<a class="btn" href="#/calc/mead?L=${L}">${I.honey} Nutrient schedule</a>` : ''}
      ${!r.beer ? `<a class="btn" href="#/calc/priming?L=${L}">${I.bubbles} Priming</a>` : ''}`;
  };
  $('#scale', el).addEventListener('input', e => { L = parseFloat(e.target.value) || r.baseL; store.set('scale.' + id, L); draw(); });
  draw();
}

function pageRef(el) {
  el.innerHTML = `<div class="eyebrow">Reference</div><h1>Styles, ingredients & glossary</h1>
  <div id="rtabs" style="margin:10px 0 18px"></div><div id="rbody"></div>`;
  const tabs = {
    styles: () => `<p class="lead">Typical ranges for common beer styles (based on BJCP-style guidelines). The recipe designer checks your beer against these.</p>
      <div class="tbl-wrap"><table class="tbl"><tr><th>Style</th><th>OG</th><th>FG</th><th>ABV</th><th>IBU</th><th>Colour</th></tr>
      ${Data.beerStyles.map(s => `<tr><td>${s.name}</td><td class="num">${s.og[0].toFixed(3)}–${s.og[1].toFixed(3)}</td><td class="num">${s.fg[0].toFixed(3)}–${s.fg[1].toFixed(3)}</td><td class="num">${s.abv[0]}–${s.abv[1]}%</td><td class="num">${s.ibu[0]}–${s.ibu[1]}</td>
      <td><span style="display:inline-block;width:14px;height:14px;border-radius:3px;background:${Calc.srmHex(s.srm[0])};vertical-align:middle"></span><span style="display:inline-block;width:14px;height:14px;border-radius:3px;background:${Calc.srmHex(s.srm[1])};vertical-align:middle;margin-left:2px"></span> <span class="num">${Math.round(s.srm[0] * 1.97)}–${Math.round(s.srm[1] * 1.97)} EBC</span></td></tr>`).join('')}</table></div>
      <h2>Wine, cider & mead sweetness</h2><div class="tbl-wrap"><table class="tbl"><tr><th>Level</th><th>Final gravity</th></tr>${Data.sweetness.map(s => `<tr><td>${s.name}</td><td class="num">${s.range}</td></tr>`).join('')}</table></div>
      <h2>Carbonation</h2><div class="tbl-wrap"><table class="tbl"><tr><th>Style</th><th>Volumes CO₂</th></tr>${Data.carbStyles.map(s => `<tr><td>${s.name}</td><td class="num">${s.v}</td></tr>`).join('')}</table></div>`,
    malts: () => `<p class="lead">Potential extract (gravity points per lb per US gallon, ×8.35 for per kg per litre) and colour.</p>
      <div class="tbl-wrap"><table class="tbl"><tr><th>Fermentable</th><th>Type</th><th>PPG</th><th>Colour</th><th>Mash?</th></tr>
      ${Data.grains.map(g => `<tr><td>${g.name}</td><td>${g.type}</td><td class="num">${g.ppg}</td><td><span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${Calc.srmHex(Math.min(40, g.lov))};vertical-align:middle"></span> <span class="num">${g.lov} °L / ${Math.round(g.lov * 2.6)} EBC</span></td><td>${g.mash ? 'Mash/steep' : 'Add to boil'}</td></tr>`).join('')}</table></div>`,
    hops: () => `<p class="lead">Typical alpha acids; check the packet, since it varies by harvest.</p>
      <div class="tbl-wrap"><table class="tbl"><tr><th>Hop</th><th>Origin</th><th>AA%</th><th>Character</th></tr>${Data.hops.map(h => `<tr><td>${h.name}</td><td>${h.origin}</td><td class="num">${h.aa}</td><td>${h.notes}</td></tr>`).join('')}</table></div>`,
    yeast: () => `<p class="lead">Popular dry yeasts available in the UK. Attenuation and tolerance are typical figures. <a href="#/guide/yeast">Yeast guide</a> · <a href="#/calc/yeastpick">Yeast picker</a></p>
      <div class="tbl-wrap"><table class="tbl"><tr><th>Yeast</th><th>Good for</th><th>Atten.</th><th>Tolerance</th><th>Temp</th><th>Settles</th><th>Notes</th></tr>${Data.yeasts.map(y => `<tr><td><b>${y.name}</b></td><td>${y.uses.join(', ')}</td><td class="num">${y.att}%</td><td class="num">${y.tol}%</td><td class="num">${y.temp} °C</td><td>${y.floc}</td><td>${y.notes}</td></tr>`).join('')}</table></div>`,
    glossary: () => `<div class="inp search"><input id="gq" type="text" placeholder="Search ${Glossary.length} terms…"></div><div id="gl"></div>`,
  };
  const show = k => {
    $('#rbody', el).innerHTML = tabs[k]();
    if (k === 'glossary') {
      const draw = q => { $('#gl', el).innerHTML = `<div class="tbl-wrap"><table class="tbl">${Glossary.filter(([t, d]) => (t + d).toLowerCase().includes(q.toLowerCase())).map(([t, d]) => `<tr><td style="white-space:nowrap"><b>${t}</b></td><td>${d}</td></tr>`).join('') || '<tr><td>No matches</td></tr>'}</table></div>`; };
      $('#gq', el).addEventListener('input', e => draw(e.target.value)); draw('');
    }
  };
  seg($('#rtabs', el), [['styles', 'Styles'], ['malts', 'Malts & sugars'], ['hops', 'Hops'], ['yeast', 'Yeast'], ['glossary', 'Glossary']], 'styles', show);
  show('styles');
}

function pageLog(el, id) {
  const head = t => `<div class="eyebrow">Track</div><h1>${t}</h1>`;
  if (!id) { el.innerHTML = head('Batch log') + '<p class="lead">Every brew, every reading. Live ABV, fermentation curves and a timeline of what to do next.</p><div id="lb"></div>'; renderLogList($('#lb', el)); return; }
  if (id === 'new') { el.innerHTML = `<a class="back" href="#/log">${I.arrowL} Batch log</a>` + head('New batch') + '<div id="lb"></div>'; renderLogNew($('#lb', el)); return; }
  el.innerHTML = `<a class="back" href="#/log">${I.arrowL} Batch log</a><div id="lb"></div>`; renderLogDetail($('#lb', el), id);
}

function notFound(el) { el.innerHTML = `<div class="empty"><div class="big">🤔</div><p>Page not found.</p><a class="btn" href="#/">Home</a></div>`; }

/* ---------- Router ---------- */
const ROUTES = [
  [/^\/?$/, pageHome, 'home'],
  [/^\/guides$/, pageGuides, 'guides'],
  [/^\/guide\/([\w-]+)$/, pageGuide, 'guides'],
  [/^\/drink\/(\w+)$/, pageDrink, 'home'],
  [/^\/calcs$/, pageCalcs, 'calcs'],
  [/^\/calc\/([\w-]+)$/, pageCalc, 'calcs'],
  [/^\/recipes$/, pageRecipes, 'recipes'],
  [/^\/recipe\/([\w-]+)$/, pageRecipe, 'recipes'],
  [/^\/log(?:\/([\w-]+))?$/, pageLog, 'log'],
  [/^\/ref$/, pageRef, 'ref'],
  [/^\/juice$/, pageJuice, 'home'],
  [/^\/paths$/, pagePaths, 'paths'],
  [/^\/start$/, pageStart, 'home'],
  [/^\/calendar$/, pageCalendar, 'calendar'],
  [/^\/cellar$/, pageCellar, 'cellar'],
  [/^\/shop$/, pageShop, 'shop'],
  [/^\/search$/, pageSearch, 'search'],
  [/^\/app$/, pageApp, 'app'],
  [/^\/more$/, pageMore, 'more'],
  [/^\/stats$/, pageStats, 'stats'],
  [/^\/whatsnew$/, pageWhatsNew, 'whatsnew'],
  [/^\/features$/, pageFeatures, 'features'],
  [/^\/inbox$/, pageInbox, 'inbox'],
  [/^\/learn$/, pageLearn, 'guides'],
  [/^\/school$/, pageSchool, 'guides'],
  [/^\/lesson\/(\w+)$/, pageLesson, 'guides'],
  [/^\/certificate$/, pageCertificate, 'guides'],
  [/^\/flashcards$/, pageFlash, 'guides'],
  [/^\/kit$/, pageKit, 'home'],
  [/^\/brew\/([\w-]+)$/, pageBrew, 'recipes'],
];
const TITLES = { home: 'Brew Lab', guides: 'Guides', calcs: 'Calculators', recipes: 'Recipes', log: 'Batch log', ref: 'Reference' };
function route() {
  const path = (location.hash.slice(1) || '/').split('?')[0];
  const view = $('#view');
  const page = document.createElement('div'); page.className = 'fade-in';
  view.replaceChildren(page);
  let nav = 'home';
  const hit = ROUTES.find(([re]) => re.test(path));
  if (hit) { nav = hit[2]; hit[1](page, ...(path.match(hit[0]).slice(1))); } else notFound(page);
  $$('[data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === nav));
  const h1 = $('h1', page);
  document.title = (h1 && nav !== 'home' ? h1.textContent + ' · ' : '') + 'Brew Lab';
  window.scrollTo(0, 0);
}
shell();
window.addEventListener('hashchange', route);
route();
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
