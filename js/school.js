/* Brew Lab — learning: Brew School course + quizzes + certificate, flashcards, fermentation simulator,
   problem doctor, flavour finder, extra beginner guides, Learn hub. */

/* =================== Brew School lessons =================== */
const LESSONS = [
{ id: 'l1', t: 'What is fermentation?', mins: 4, em: '🦠',
  body: `<p>Yeast is a tiny living fungus. Give it sugar dissolved in liquid and it eats the sugar, producing <b>alcohol</b> and <b>carbon dioxide (CO₂)</b>. That's all fermentation is, and it's how every beer, wine, cider and mead is made.</p>
  <p>The sugar comes from different places: <b>malted barley</b> for beer, <b>grapes or fruit</b> for wine, <b>apples</b> for cider and <b>honey</b> for mead. The yeast doesn't care; it just eats sugar.</p>
  <p>A fermentation goes through stages: a quiet <b>lag</b> (yeast waking up, 12–48 h), a busy <b>active</b> phase (foam, bubbles, heat, 2–7 days), a <b>slowdown</b>, and then <b>settling</b>, when yeast drops to the bottom and the drink clears.</p>`,
  keys: ['Yeast + sugar → alcohol + CO₂', 'The sugar source decides the drink', 'Lag → active → slowdown → settling'],
  links: [['#/guide/basics', 'Full guide: How fermentation works'], ['#/calc/sim', 'Try the fermentation simulator']],
  quiz: [
    { q: 'What does yeast turn sugar into?', o: ['Water and alcohol', 'Alcohol and carbon dioxide', 'Vinegar and gas', 'Sugar and oxygen'], a: 1, why: 'Yeast converts sugar into alcohol (ethanol) and CO₂, which is the bubbles you see.' },
    { q: 'Where does mead get its sugar from?', o: ['Barley', 'Grapes', 'Honey', 'Apples'], a: 2, why: 'Mead is fermented honey.' },
    { q: 'You added yeast 6 hours ago and nothing\'s happening. What should you do?', o: ['Throw it away', 'Add more sugar', 'Wait: the lag phase can take up to 48 hours', 'Shake it hard every hour'], a: 2, why: 'The lag phase is normal. Give it 2–3 days at a sensible temperature.' },
  ] },
{ id: 'l2', t: 'Clean & sanitise', mins: 3, em: '🧼',
  body: `<p><b>Cleaning</b> removes visible dirt. <b>Sanitising</b> kills the invisible bacteria and wild yeast that can turn your brew sour or vinegary. You must do both, in that order.</p>
  <p>Use an unscented cleaner (no washing-up liquid, which kills beer foam), rinse, then wet every surface with a <b>no-rinse sanitiser</b> like Star San. Leave it about a minute and <b>don't rinse it off</b>.</p>
  <p>Sanitise anything that touches your brew after the boil: fermenter, lid, airlock, spoon, syphon, hydrometer, bottles and caps. For juice, wine and mead (no boil), sanitise everything.</p>`,
  keys: ['Clean first, then sanitise', 'No-rinse sanitiser: don\'t rinse it off', 'Bad sanitation is the #1 cause of ruined batches'],
  links: [['#/guide/sanitation', 'Full guide: Cleaning & sanitising']],
  quiz: [
    { q: 'What\'s the difference between cleaning and sanitising?', o: ['They\'re the same thing', 'Cleaning removes dirt; sanitising kills microbes', 'Sanitising removes dirt; cleaning kills microbes', 'Cleaning is only for bottles'], a: 1, why: 'Sanitiser can\'t work through grime, so clean first, then sanitise.' },
    { q: 'After using a no-rinse sanitiser like Star San you should…', o: ['Rinse with tap water', 'Dry it with a tea towel', 'Leave it: no need to rinse', 'Rinse with boiling water'], a: 2, why: 'It\'s designed to be left on. Rinsing re-introduces microbes, and a tea towel adds lint and bacteria.' },
    { q: 'Why avoid washing-up liquid on beer equipment?', o: ['It\'s too expensive', 'Residue kills the foam on beer', 'It makes beer stronger', 'It turns beer green'], a: 1, why: 'Detergent residue destroys head retention.' },
  ] },
{ id: 'l3', t: 'Gravity, hydrometers & ABV', mins: 5, em: '🔬',
  body: `<p>Sugar makes liquid denser. A <b>hydrometer</b> floats in your sample and measures that density as <b>specific gravity (SG)</b>. Water is 1.000; sugary juice might be 1.050.</p>
  <p>Measure before fermenting (<b>OG</b>, original gravity) and after (<b>FG</b>, final gravity). As yeast eats sugar, the gravity drops. Alcohol is lighter than water, so a dry wine can read <b>below 1.000</b>.</p>
  <p><b>ABV ≈ (OG − FG) × 131.25</b>. So 1.050 → 1.010 is (0.040 × 131.25) ≈ 5.25%.</p>
  <p>It's finished when the gravity is the <b>same 3 days in a row</b>, not when the bubbling stops.</p>`,
  keys: ['OG before, FG after', 'ABV ≈ (OG − FG) × 131.25', 'Same reading 3 days running = finished'],
  links: [['#/calc/trainer', 'Practise reading a hydrometer'], ['#/calc/abv', 'ABV calculator']],
  quiz: [
    { q: 'OG 1.060, FG 1.010. Roughly what\'s the ABV?', o: ['3.5%', '5%', '6.6%', '10%'], a: 2, why: '(1.060 − 1.010) × 131.25 = 0.050 × 131.25 ≈ 6.6%.' },
    { q: 'Your cider reads 0.996. What does that mean?', o: ['The hydrometer is broken', 'It\'s fully fermented and dry: alcohol is lighter than water', 'It hasn\'t started', 'It\'s contaminated'], a: 1, why: 'A fully dry, alcoholic drink can read below 1.000.' },
    { q: 'How do you know fermentation has finished?', o: ['The airlock stops bubbling', 'It\'s been exactly a week', 'The gravity is the same 3 days in a row', 'It looks clear'], a: 2, why: 'The airlock is unreliable; stable gravity is the real test.' },
    { q: 'When reading a hydrometer you should read…', o: ['The top of the curve on the glass', 'The flat liquid surface', 'The bottom of the hydrometer', 'Wherever the bubbles are'], a: 1, why: 'Read where the flat surface crosses the scale, not the meniscus climbing the stem.' },
  ] },
{ id: 'l4', t: 'Yeast: picking & treating it right', mins: 5, em: '🍞',
  body: `<p>Different yeasts give different results. <b>Ale yeasts</b> leave body and some sweetness in beer. <b>Wine and champagne yeasts</b> eat every bit of sugar until they hit their <b>alcohol tolerance</b> (14–18%). <b>Cider yeasts</b> keep apple flavour. <b>Kveik</b> loves heat.</p>
  <p><b>Temperature</b> changes flavour more than anything: too warm gives fruity, then harsh "hot" solvent flavours; too cold and the yeast goes sleepy. Most like <b>17–22 °C</b>. Remember fermentation makes its own heat.</p>
  <p>Juice, wine and especially honey are low in <b>nitrogen</b>, which yeast needs. Add <b>yeast nutrient</b> to prevent eggy smells and stuck ferments.</p>`,
  keys: ['Wine/champagne yeasts ferment fully dry', 'Temperature controls flavour', 'Nutrient prevents eggy smells and stalls'],
  links: [['#/guide/yeast', 'The yeast guide'], ['#/calc/yeastpick', 'Yeast picker']],
  quiz: [
    { q: 'Which yeast would you choose to ferment something strong and bone dry?', o: ['Bread yeast', 'Champagne yeast (EC-1118)', 'Lager yeast', 'Any ale yeast'], a: 1, why: 'Champagne yeast tolerates ~18% and ferments everything.' },
    { q: 'Your mead smells like rotten eggs. The most likely reason is…', o: ['Too much honey', 'Not enough yeast nutrient', 'It\'s too cold', 'The airlock is dry'], a: 1, why: 'Honey has almost no nitrogen. Hungry yeast makes hydrogen sulphide.' },
    { q: 'Fermenting at 28 °C (too warm) usually gives…', o: ['Cleaner flavours', 'Harsh solvent-like "hot" flavours', 'A sweeter drink', 'More bubbles in the bottle'], a: 1, why: 'Warm, stressed yeast makes fusel alcohols and excess esters.' },
  ] },
{ id: 'l5', t: 'Your first brew, step by step', mins: 5, em: '🍏',
  body: `<p>The easiest first brew is <b>cider from supermarket apple juice</b>:</p>
  <ol><li>Buy 4.5 L of 100% apple juice with <b>no preservatives</b> (check for E202 sorbate / E211 benzoate).</li>
  <li>Sanitise a demijohn, funnel, bung and airlock.</li><li>Pour in the juice, take a gravity reading, add ½ tsp nutrient and a sachet of cider or wine yeast.</li>
  <li>Fit the airlock and leave at 16–20 °C for 2–3 weeks.</li><li>When stable, rack off the sediment, wait 2–4 weeks to clear, then bottle.</li></ol>
  <p>Total cost about £20 with equipment; it makes ~8 bottles of 6% cider.</p>`,
  keys: ['Shop juice = easiest start', 'No preservatives!', 'Rack off the sediment before bottling'],
  links: [['#/brew/turbo-cider', 'Brew along: Shop-juice cider'], ['#/calc/label', 'Check a juice label']],
  quiz: [
    { q: 'Which ingredient on a juice label means it won\'t ferment?', o: ['Ascorbic acid (vitamin C)', 'From concentrate', 'Potassium sorbate', 'Citric acid'], a: 2, why: 'Sorbate is a preservative that stops yeast. Vitamin C is fine.' },
    { q: 'What does "racking" mean?', o: ['Storing bottles on a rack', 'Syphoning the drink off its sediment', 'Shaking the fermenter', 'Adding sugar'], a: 1, why: 'Racking moves the clear liquid away from the yeast sludge.' },
    { q: 'Why leave headspace (a gap) at the top of a demijohn during fermentation?', o: ['For the foam', 'To let air in', 'It doesn\'t matter', 'So the yeast can breathe'], a: 0, why: 'Active fermentation foams. Without space it climbs into the airlock.' },
  ] },
{ id: 'l6', t: 'Bottling & bubbles', mins: 5, em: '🍾',
  body: `<p>To make a drink fizzy, add a <b>measured</b> amount of sugar at bottling (<b>priming</b>). The remaining yeast eats it inside the sealed bottle; the CO₂ can't escape, so it dissolves into the drink.</p>
  <p>Only prime when fermentation has <b>completely finished</b>. Leftover sugar plus priming sugar means too much gas, which means <b>gushers or exploding bottles</b>. Use bottles made for pressure (beer bottles, swing-tops, PET), never jars or wine bottles.</p>
  <p>Keep bottles at room temperature for 2 weeks to carbonate, then chill. A plastic bottle in the batch makes a handy squeeze-tester.</p>
  <p>Sweet and fizzy is tricky: yeast eats any sugar. Use a <b>non-fermentable sweetener</b> (like erythritol) or a keg.</p>`,
  keys: ['Prime only when fermentation is finished', 'Measure the sugar: use the calculator', 'Pressure-safe bottles only'],
  links: [['#/calc/bottlecheck', 'Ready to bottle?'], ['#/calc/priming', 'Priming calculator'], ['#/guide/bottling', 'Bottling guide']],
  quiz: [
    { q: 'Why must fermentation be finished before bottling with priming sugar?', o: ['It tastes better', 'Leftover sugar + priming sugar = over-carbonation and bottle bombs', 'Yeast dies in bottles', 'It clears faster'], a: 1, why: 'All the remaining sugar becomes gas in a sealed bottle.' },
    { q: 'Which is safe for a sparkling drink?', o: ['An old jam jar', 'A screw-top wine bottle', 'A swing-top bottle', 'A mason jar'], a: 2, why: 'Swing-tops, beer bottles and PET fizzy-drink bottles are built for pressure.' },
    { q: 'You want sweet AND fizzy cider. Easiest safe method?', o: ['Add lots of sugar before bottling', 'Add a non-fermentable sweetener plus priming sugar', 'Bottle it before it finishes', 'Add honey to each bottle'], a: 1, why: 'Yeast can\'t eat erythritol/sucralose, so it stays sweet while the priming sugar makes the fizz.' },
  ] },
{ id: 'l7', t: 'When things look (or taste) wrong', mins: 4, em: '🩺',
  body: `<p>Most "problems" are normal. Foam, yeast rafts, eggy smells, cloudiness and sediment all happen in healthy brews.</p>
  <p>Real problems: <b>fuzzy mould</b> (bin it if young and low-alcohol), a <b>vinegar</b> smell (air and bacteria got in; can't be fixed), and <b>gushing bottles</b> (chill them immediately, open with care).</p>
  <p>If it's <b>stuck</b> (gravity not dropping), warm it to 20–22 °C, swirl the yeast back up and add nutrient. Still stuck? Add champagne yeast.</p>
  <p>Young brews taste rough; most improve a lot with time. <b>Don't pour anything away in the first month.</b></p>`,
  keys: ['Smells like a brewery or bakery: fine', 'Vinegar or fuzzy mould: real problems', 'Stuck? Warm, rouse, nutrient'],
  links: [['#/calc/doctor', 'Problem Doctor'], ['#/calc/normal', 'Is this normal?'], ['#/guide/troubleshooting', 'Troubleshooting guide']],
  quiz: [
    { q: 'There\'s a thick beige foam on top of your beer on day 2. You should…', o: ['Skim it off', 'Leave it: that\'s healthy krausen', 'Bin the batch', 'Add more yeast'], a: 1, why: 'Krausen is the sign of vigorous fermentation.' },
    { q: 'Which of these is a genuine problem?', o: ['Eggy smell in cider', 'Cloudiness after a week', 'Fuzzy green spots on the surface', 'Sediment at the bottom'], a: 2, why: 'Fuzzy spots are mould. The others are normal.' },
    { q: 'Your bottles are gushing. First step?', o: ['Shake them to release gas', 'Chill all of them right away, then open carefully over a sink', 'Leave them somewhere warm', 'Add more caps'], a: 1, why: 'Cold slows the yeast and keeps CO₂ in solution. Wear eye protection.' },
  ] },
{ id: 'l8', t: 'Beer basics: malt, hops & yeast', mins: 6, em: '🍺',
  body: `<p>Beer = <b>malt</b> (sugar, colour, body), <b>hops</b> (bitterness, aroma), <b>yeast</b> and <b>water</b>.</p>
  <p>Brewers start with <b>kits</b> (hopped malt extract, no boil), move to <b>extract brewing</b> (boil spraymalt with your own hops) and then <b>all-grain</b>: soaking crushed malt at 64–68 °C (<b>mashing</b>) so enzymes turn starch into sugar. That sugary liquid is <b>wort</b>.</p>
  <p>Wort is boiled for 60 minutes. Hops added early give <b>bitterness</b> (IBU); hops added late or after fermentation (<b>dry hopping</b>) give <b>aroma</b>. Then it's chilled fast and the yeast is added.</p>`,
  keys: ['Malt = sugar, hops = bitterness & aroma', 'Mash at 64–68 °C', 'Early hops bitter, late hops aroma'],
  links: [['#/guide/beer-kit', 'Kit & extract guide'], ['#/guide/beer-biab', 'All-grain BIAB'], ['#/calc/recipe', 'Recipe designer']],
  quiz: [
    { q: 'What do hops added at the start of a 60-minute boil mainly give?', o: ['Aroma', 'Bitterness', 'Colour', 'Alcohol'], a: 1, why: 'Long boiling extracts bitterness; aroma boils away.' },
    { q: 'What is wort?', o: ['A type of hop', 'Unfermented beer: the sugary liquid from the mash', 'Beer yeast', 'The sediment'], a: 1, why: 'Wort becomes beer once fermented.' },
    { q: 'Which is the easiest way into beer?', o: ['All-grain lager', 'A beer kit', 'Water chemistry', 'Building a mash tun'], a: 1, why: 'Kits skip mashing and boiling.' },
  ] },
{ id: 'l9', t: 'Wine & mead basics', mins: 5, em: '🍷',
  body: `<p>Wine and mead don't need boiling. Their challenges are <b>balance</b> and <b>patience</b>.</p>
  <p>Country wines need <b>sugar</b> (fruit alone usually isn't sweet enough), <b>acid</b> (brightness), <b>tannin</b> (body/grip), <b>pectolase</b> (so it clears) and <b>nutrient</b>. Mead needs lots of nutrient, ideally in stages over the first few days.</p>
  <p>Both ferment fully dry with wine yeast. To make them sweet, <b>stabilise</b> (potassium sorbate + Campden tablet) and then back-sweeten. Both improve hugely with <b>months of ageing</b>.</p>`,
  keys: ['Sugar, acid, tannin, pectolase, nutrient', 'Stabilise before sweetening', 'Age for months'],
  links: [['#/guide/wine', 'Wine guide'], ['#/guide/mead', 'Mead guide'], ['#/calc/mead', 'Mead designer']],
  quiz: [
    { q: 'What does pectolase do?', o: ['Adds sweetness', 'Breaks down pectin so fruit wine clears', 'Kills yeast', 'Adds fizz'], a: 1, why: 'Pectin haze is the classic cause of cloudy fruit wine.' },
    { q: 'You want a sweet wine. Before adding sugar you must…', o: ['Shake it', 'Stabilise it with sorbate + Campden', 'Freeze it', 'Add more yeast'], a: 1, why: 'Otherwise the yeast restarts and eats your sugar (or explodes your bottles).' },
    { q: 'Roughly how long do most country wines and meads need to be at their best?', o: ['3 days', '2 weeks', '6–12 months', '10 years'], a: 2, why: 'Patience is an ingredient!' },
  ] },
{ id: 'l10', t: 'Tasting like a pro', mins: 4, em: '👃',
  body: `<p>Tasting properly helps you improve every batch. Use a clean glass, serve at the right temperature (not ice-cold), and judge in order:</p>
  <ol><li><b>Look</b>: colour, clarity, bubbles, head.</li><li><b>Smell</b>: swirl and sniff. Fruity, hoppy, honey, yeasty? Any faults?</li>
  <li><b>Taste</b>: sweet or dry, sour, bitter, balance, any off-flavours.</li><li><b>Mouthfeel</b>: thin or full, fizzy or flat, warming alcohol?</li><li><b>Overall</b>: would you brew it again? What would you change?</li></ol>
  <p>Write it in the batch's tasting notes. Your notes are how you get better.</p>`,
  keys: ['Look → smell → taste → mouthfeel → overall', 'Not too cold', 'Write notes every time'],
  links: [['#/calc/flavours', 'Flavour finder'], ['#/guide/tasting', 'Tasting guide']],
  quiz: [
    { q: 'Why not taste a brew ice-cold?', o: ['It\'s dangerous', 'Cold hides aroma and flavour', 'It goes flat', 'It changes the ABV'], a: 1, why: 'Aromas need some warmth to come through.' },
    { q: 'A buttery / butterscotch flavour in beer usually means…', o: ['Diacetyl: not enough time on the yeast', 'Too many hops', 'Too much sugar', 'Perfect beer'], a: 0, why: 'Yeast cleans up diacetyl if given a few extra days.' },
    { q: 'What\'s the best way to improve your next batch?', o: ['Guess', 'Write tasting notes and compare', 'Always add more sugar', 'Use more yeast'], a: 1, why: 'Notes let you repeat the good and fix the bad.' },
  ] },
];
const schoolState = () => store.get('school', {}); // { l1: {score, of, at} }
function lessonDone(id) { const s = schoolState()[id]; return s && s.score / s.of >= 0.66; }

function pageSchool(el) {
  const st = schoolState(); const done = LESSONS.filter(l => lessonDone(l.id)).length;
  el.innerHTML = `<a class="back" href="#/learn">${I.arrowL} Learn</a><div class="eyebrow">🎓 Brew School</div><h1>Learn to brew in 10 short lessons</h1>
    <p class="lead">Bite-size lessons (3–6 min) with a quick quiz after each one. Pass all 10 to earn your Brew Lab certificate.</p>
    <div class="ladder-top"><div class="ladder-prog"><div style="width:${done / LESSONS.length * 100}%"></div></div><span class="note">${done}/${LESSONS.length}</span></div>
    <div class="lessons">${LESSONS.map((l, i) => { const s = st[l.id]; const ok = lessonDone(l.id); const next = !ok && LESSONS.slice(0, i).every(x => lessonDone(x.id));
      return `<a class="lesson ${ok ? 'done' : ''} ${next ? 'next' : ''}" href="#/lesson/${l.id}"><span class="ln">${ok ? '✓' : i + 1}</span><span class="le">${l.em}</span><span class="lt"><b>${l.t}</b><small>${l.mins} min · ${l.quiz.length} questions${s ? ` · best ${s.score}/${s.of}` : ''}</small></span>${next ? '<span class="pill c" style="--c:var(--amber)">Next</span>' : ''}</a>`; }).join('')}</div>
    ${done === LESSONS.length ? `<div class="btns" style="margin-top:18px"><a class="btn pri" href="#/certificate">🎓 View your certificate</a></div>` : ''}
    <div class="grid" style="margin-top:22px">
      <a class="card" href="#/flashcards"><div class="ic">🃏</div><h3>Flashcards</h3><p>Learn the jargon. Cards you miss come back more often.</p></a>
      <a class="card" href="#/calc/sim"><div class="ic">📈</div><h3>Fermentation simulator</h3><p>See what temperature, sugar and yeast actually do.</p></a></div>`;
}
function pageLesson(el, id) {
  const i = LESSONS.findIndex(l => l.id === id); const l = LESSONS[i]; if (!l) return notFound(el);
  let ans = {};
  el.innerHTML = `<a class="back" href="#/school">${I.arrowL} Brew School</a>
    <div class="eyebrow">Lesson ${i + 1} of ${LESSONS.length} · ${l.mins} min</div><h1>${l.em} ${l.t}</h1>
    <article class="prose lesson-body">${l.body}</article>
    <div class="panel keypts"><div class="eyebrow">Remember</div><ul class="ticks">${l.keys.map(k => `<li>${k}</li>`).join('')}</ul>
      <div class="btns">${l.links.map(([h, t]) => `<a class="btn sm" href="${h}">${t}</a>`).join('')}</div></div>
    <h2>Quick quiz</h2><div id="qz"></div>`;
  const pr = $('.lesson-body', el); if (typeof glossarize === 'function') glossarize(pr);
  const draw = () => {
    const answered = Object.keys(ans).length, score = l.quiz.filter((q, k) => ans[k] === q.a).length;
    $('#qz', el).innerHTML = l.quiz.map((q, k) => `<div class="panel qq"><b>${k + 1}. ${q.q}</b><div class="qopts">${q.o.map((o, j) => {
      const picked = ans[k] === j, show = ans[k] != null; const cls = show ? (j === q.a ? 'right' : picked ? 'wrong' : 'dim') : '';
      return `<button class="qopt ${cls}" data-k="${k}" data-j="${j}" ${show ? 'disabled' : ''}>${o}</button>`; }).join('')}</div>
      ${ans[k] != null ? `<p class="note" style="margin-top:8px">${ans[k] === q.a ? '✅ ' : '❌ '}${q.why}</p>` : ''}</div>`).join('')
      + (answered === l.quiz.length ? `<div class="panel result ${score / l.quiz.length >= 0.66 ? 'pass' : ''}"><h3 style="margin:0">${score / l.quiz.length >= 0.66 ? '🎉 Passed!' : '📚 Nearly'} ${score}/${l.quiz.length}</h3>
        <div class="btns">${score < l.quiz.length ? '<button class="btn" id="retry">↺ Try again</button>' : ''}${LESSONS[i + 1] ? `<a class="btn pri" href="#/lesson/${LESSONS[i + 1].id}">Next lesson: ${LESSONS[i + 1].t} →</a>` : `<a class="btn pri" href="#/certificate">🎓 Get your certificate</a>`}<a class="btn ghost" href="#/school">All lessons</a></div></div>` : '');
  };
  el.addEventListener('click', e => {
    const b = e.target.closest('.qopt'); if (b && !b.disabled) {
      ans[+b.dataset.k] = +b.dataset.j; draw();
      if (Object.keys(ans).length === l.quiz.length) {
        const score = l.quiz.filter((q, k) => ans[k] === q.a).length; const s = schoolState();
        if (!s[l.id] || score >= s[l.id].score) { s[l.id] = { score, of: l.quiz.length, at: today() }; store.set('school', s); }
        if (LESSONS.every(x => lessonDone(x.id)) && !store.get('schoolDoneNote')) { store.set('schoolDoneNote', true); typeof pushInbox === 'function' && pushInbox({ t: '🎓 Brew School complete!', body: 'Your certificate is ready.', href: '#/certificate', kind: 'badge' }); }
      }
    }
    if (e.target.closest('#retry')) { ans = {}; draw(); $('#qz', el).scrollIntoView({ behavior: 'smooth' }); }
  });
  draw();
}
function pageCertificate(el) {
  const done = LESSONS.filter(l => lessonDone(l.id)).length;
  if (done < LESSONS.length) { el.innerHTML = `<a class="back" href="#/school">${I.arrowL} Brew School</a><div class="empty"><div class="big">🎓</div><p>Pass all 10 lessons to unlock your certificate. You've done ${done}.</p><a class="btn pri" href="#/school">Keep learning</a></div>`; return; }
  const s = schoolState(); const total = LESSONS.reduce((a, l) => a + s[l.id].score, 0), of = LESSONS.reduce((a, l) => a + s[l.id].of, 0);
  const name = store.get('certName', '');
  el.innerHTML = `<a class="back" href="#/school">${I.arrowL} Brew School</a>
    <div class="fields" style="max-width:420px;grid-template-columns:1fr"><div class="field"><label>Name on certificate</label><div class="inp"><input id="cn" type="text" value="${esc(name)}" placeholder="Your name"></div></div></div>
    <div class="cert" id="cert"><div class="cert-in"><div style="font-size:44px">🍺</div><div class="eyebrow">Brew Lab · Brew School</div>
      <h1 style="margin:10px 0 4px">Certificate of Brewing</h1><p>This certifies that</p><div class="cert-name" id="cnn">${esc(name || 'You')}</div>
      <p>has completed all ten Brew School lessons covering fermentation, sanitation, gravity &amp; ABV, yeast, bottling, troubleshooting, beer, wine, mead and tasting, scoring <b>${total}/${of}</b>.</p>
      <div class="cert-foot"><span>${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span><span>Brew Lab</span></div></div></div>
    <div class="btns" style="margin-top:14px"><button class="btn pri" id="cp">🖨 Print / save as PDF</button></div>`;
  $('#cn', el).oninput = e => { store.set('certName', e.target.value); $('#cnn', el).textContent = e.target.value || 'You'; };
  $('#cp', el).onclick = () => { document.body.classList.add('printing-cert'); window.print(); setTimeout(() => document.body.classList.remove('printing-cert'), 500); };
}

/* =================== Flashcards (Leitner boxes) =================== */
function pageFlash(el) {
  const cards = Glossary.map(([t, d]) => ({ k: t, front: t, back: d }));
  const boxes = store.get('flash', {});
  let mode = store.get('flashMode', 'term'), deck = [], i = 0, flipped = false, right = 0;
  const newDeck = () => {
    deck = cards.slice().sort((a, b) => (boxes[a.k] || 0) - (boxes[b.k] || 0) || Math.random() - 0.5).slice(0, 12);
    i = 0; flipped = false; right = 0;
  };
  const mastered = () => cards.filter(c => (boxes[c.k] || 0) >= 3).length;
  const draw = () => {
    if (i >= deck.length) {
      el.innerHTML = `<a class="back" href="#/learn">${I.arrowL} Learn</a><h1>🃏 Round done!</h1><div class="panel" style="text-align:center"><div style="font-size:50px">${right >= 10 ? '🏆' : right >= 7 ? '👍' : '📚'}</div><h2>${right}/${deck.length} known</h2><p class="note">${mastered()} of ${cards.length} terms mastered overall.</p><div class="btns" style="justify-content:center"><button class="btn pri" id="again">Next round</button><a class="btn" href="#/school">Brew School</a></div></div>`;
      return;
    }
    const c = deck[i]; const front = mode === 'term' ? c.front : c.back, back = mode === 'term' ? c.back : c.front;
    el.innerHTML = `<a class="back" href="#/learn">${I.arrowL} Learn</a><div class="eyebrow">Flashcards · ${i + 1} of ${deck.length} · ${mastered()}/${cards.length} mastered</div><h1>🃏 Brewing jargon</h1>
      <div id="fm" style="margin-bottom:14px"></div>
      <button class="flash ${flipped ? 'flipped' : ''}" id="fc" aria-label="Flip card"><div class="fi"><div class="ff"><small>${mode === 'term' ? 'What does this mean?' : 'Which term is this?'}</small><span class="${mode === 'term' ? 'big' : ''}">${esc(front)}</span><small>Tap to flip</small></div>
        <div class="fb"><span class="${mode === 'term' ? '' : 'big'}">${esc(back)}</span></div></div></button>
      <div class="btns flash-btns">${flipped ? '<button class="btn" id="fno">↺ Still learning</button><button class="btn pri" id="fyes">✓ Knew it</button>' : '<button class="btn pri" id="flip">Flip card</button>'}</div>`;
    seg($('#fm', el), [['term', 'Term → meaning'], ['def', 'Meaning → term']], mode, v => { mode = v; store.set('flashMode', v); draw(); });
  };
  el.addEventListener('click', e => {
    if (e.target.closest('#fc, #flip')) { flipped = !flipped; draw(); }
    const c = deck[i];
    if (e.target.closest('#fyes')) { boxes[c.k] = Math.min(5, (boxes[c.k] || 0) + 1); right++; store.set('flash', boxes); i++; flipped = false; draw(); }
    if (e.target.closest('#fno')) { boxes[c.k] = 0; store.set('flash', boxes); i++; flipped = false; draw(); }
    if (e.target.closest('#again')) { newDeck(); draw(); }
  });
  newDeck(); draw();
}

/* =================== Fermentation simulator =================== */
defCalc({ id: 'sim', title: 'Fermentation simulator', icon: 'chart', group: 'Beginner',
  desc: 'Play with sugar, temperature, yeast and nutrients, then watch a 4-week fermentation unfold: gravity, ABV, bubbling and flavour.',
  render(el) {
    el.innerHTML = `<div class="calc"><div class="panel" id="sf"></div><div class="panel"><div id="so"></div></div></div>`;
    const yOpts = [['wine', 'Wine yeast (to 16%)'], ['champ', 'Champagne yeast (to 18%)'], ['cider', 'Cider yeast (to 12%)'], ['ale', 'Ale yeast (75% attenuation)'], ['kveik', 'Kveik (hot & fast)'], ['bread', 'Bread yeast (to 9%)']];
    const Y = { wine: { tol: 16, lo: 15, hi: 25 }, champ: { tol: 18, lo: 10, hi: 30 }, cider: { tol: 12, lo: 12, hi: 24 }, ale: { att: 75, lo: 16, hi: 22 }, kveik: { att: 78, lo: 25, hi: 38 }, bread: { tol: 9, lo: 20, hi: 30 } };
    mountForm('sim', $('#sf', el), $('#so', el), [
      { k: 'og', l: 'Starting gravity (sugar)', v: '1.060', step: 0.005, hint: 'Juice ≈1.045 · wine ≈1.085 · mead ≈1.100' },
      { k: 'temp', l: 'Temperature', v: 19, u: '°C', step: 1 },
      { k: 'yeast', l: 'Yeast', t: 'sel', v: 'wine', o: yOpts, wide: true },
      { k: 'nut', l: 'Yeast nutrient?', t: 'sel', v: 'yes', o: [['yes', 'Yes'], ['no', 'No']] },
      { k: 'pitch', l: 'Amount of yeast', t: 'sel', v: 'right', o: [['low', 'Too little'], ['right', 'About right'], ['high', 'Generous']] },
      { k: 'day', l: 'Drag through the days ⟶', t: 'range', v: 7, step: 1, min: 0, max: 28, wide: true },
    ], v => {
      const y = Y[v.yeast];
      const fg = y.att ? 1 + (v.og - 1) * (1 - y.att / 100) : Calc.fgFromTolerance(v.og, y.tol);
      let k = 0.3 * Math.pow(2, (v.temp - 20) / 10);
      if (v.temp < y.lo) k *= 0.45; if (v.temp > y.hi + 6) k *= 0.5;
      if (v.nut === 'no') k *= 0.6; k *= { low: 0.7, right: 1, high: 1.15 }[v.pitch];
      if (v.og > 1.09) k *= 0.85;
      let lag = 0.7 + (v.temp < y.lo ? 1.2 : 0) + (v.pitch === 'low' ? 0.8 : 0) + (v.nut === 'no' ? 0.3 : 0);
      const G = t => t < lag ? v.og : fg + (v.og - fg) * Math.exp(-k * (t - lag));
      const days = 28, d = Math.max(0, Math.min(days, Math.round(v.day || 0)));
      const done = (() => { for (let t = 0; t <= 90; t += 0.5) if (G(t) - fg < 0.0012) return Math.ceil(t); return 90; })();
      const W = 360, H = 190, P = 34;
      const X = t => P + t / days * (W - P - 8), Yg = g => 10 + (v.og + 0.004 - g) / (v.og + 0.004 - Math.min(fg, 0.996) + 0.002) * (H - 40);
      const pts = []; for (let t = 0; t <= days; t += 0.5) pts.push(`${X(t).toFixed(1)},${Yg(G(t)).toFixed(1)}`);
      const act = Math.max(0, -(G(d + 0.5) - G(d)) * 2000); // gravity points per day
      const bubbles = act > 6 ? '🫧🫧🫧🫧' : act > 3 ? '🫧🫧🫧' : act > 1 ? '🫧🫧' : act > 0.2 ? '🫧' : '—';
      const notes = [];
      if (d < lag) notes.push('😴 Lag phase: the yeast is waking up and multiplying. Nothing visible yet.');
      else if (act > 3) notes.push('🔥 Active fermentation: foam, lots of bubbles, the brew is warmer than the room.');
      else if (act > 0.3) notes.push('🐢 Slowing down: fewer bubbles, the yeast is cleaning up flavours.');
      else notes.push('😌 Basically finished: yeast settling, the drink starts to clear.');
      if (v.temp > y.hi + 3) notes.push('⚠️ Way too warm: expect harsh, solvent-like "hot" flavours.');
      else if (v.temp > y.hi) notes.push('🍌 A bit warm: more fruity esters.');
      else if (v.temp < y.lo) notes.push('🥶 Too cold for this yeast: slow, and it may stall.');
      else notes.push('✅ Temperature is in this yeast\'s happy range: clean flavours.');
      if (v.nut === 'no') notes.push('🥚 No nutrient: slower, and eggy smells are likely (especially juice and mead).');
      if (fg > 1.006) notes.push(`🍯 The yeast ${y.att ? 'can\'t eat all the sugars' : 'hits its alcohol limit'}, so it finishes <b>${sweetLabel(fg).toLowerCase()}</b>.`);
      if (v.pitch === 'low') notes.push('🐌 Under-pitched: longer lag, so there\'s more chance for wild bugs to get a foothold.');
      return `<svg viewBox="0 0 ${W} ${H}" style="width:100%">
          <polyline points="${pts.join(' ')}" fill="none" style="stroke:var(--amber)" stroke-width="3"/>
          <line x1="${X(d)}" x2="${X(d)}" y1="6" y2="${H - 26}" style="stroke:var(--hop)" stroke-dasharray="4 4"/>
          <circle cx="${X(d)}" cy="${Yg(G(d))}" r="6" style="fill:var(--hop)"/>
          <text x="${P}" y="${H - 8}" font-size="11" style="fill:var(--muted)" font-family="monospace">day 0</text><text x="${W - 10}" y="${H - 8}" font-size="11" text-anchor="end" style="fill:var(--muted)" font-family="monospace">day 28</text>
          <text x="4" y="${Yg(v.og) + 4}" font-size="10" style="fill:var(--muted)" font-family="monospace">${v.og.toFixed(3)}</text><text x="4" y="${Yg(fg) + 4}" font-size="10" style="fill:var(--muted)" font-family="monospace">${fg.toFixed(3)}</text></svg>
        <div class="stats">${stat(`Day ${d}`, sgf(G(d)), '', 'gravity', 'big')}${stat('ABV so far', fmt(Calc.abv(v.og, G(d)), 1), '%')}${stat('Bubbling', bubbles)}${stat('Finished around', 'day ' + done)}${stat('Final', fmt(Calc.abv(v.og, fg), 1), '%', sgf(fg))}</div>
        <div class="adds" style="margin-top:10px">${notes.map(n => `<div class="add" style="grid-template-columns:1fr">${n}</div>`).join('')}</div>
        <p class="note">A simplified teaching model: real brews vary, but the trends are right. Drag the day slider to move through time.</p>`;
    });
  } });

/* =================== Problem Doctor =================== */
const DOC = {
  start: { q: 'What\'s going on?', o: [['😶 It isn\'t fermenting', 'nf1'], ['🛑 It stopped too early', 'st1'], ['🤢 It smells or tastes wrong', 'fl'], ['☁️ It won\'t clear', 'cl1'], ['🫥 My bottles are flat', 'fb1'], ['💥 My bottles gush / feel rock hard', 'gush'], ['🍄 Something is growing on top', 'gr1']] },
  nf1: { q: 'How long since you added the yeast?', o: [['Less than 48 hours', 'r_wait'], ['More than 48 hours', 'nf2']] },
  nf2: { q: 'Has the gravity dropped since you started?', o: [['Yes, it\'s lower', 'r_leak'], ['No / I don\'t have a hydrometer', 'nf3']] },
  nf3: { q: 'How warm is it where it\'s fermenting?', o: [['Below 15 °C', 'r_cold'], ['15–25 °C', 'nf4'], ['Above 28 °C', 'r_hot']] },
  nf4: { q: 'Is it shop juice? Did the label list a preservative (sorbate E202 / benzoate E211)?', o: [['Yes', 'r_pres'], ['No / not juice', 'nf5'], ['Not sure', 'r_label']] },
  nf5: { q: 'Was the liquid hot (over ~35 °C) when you added the yeast?', o: [['Yes / maybe', 'r_dead'], ['No', 'r_repitch']] },
  st1: { q: 'What drink is it?', o: [['Beer', 'st2b'], ['Wine, cider, mead or juice', 'st2w']] },
  st2b: { q: 'What\'s the gravity, compared with what the recipe expected?', o: [['Within ~0.004 of the expected FG', 'r_done'], ['Well above it', 'st3']] },
  st2w: { q: 'What\'s the gravity now?', o: [['Below 1.002', 'r_done'], ['1.002–1.015', 'st3'], ['Above 1.015', 'st3']] },
  st3: { q: 'Is it cooler than 17 °C?', o: [['Yes', 'r_warmrouse'], ['No', 'r_stuck']] },
  fl: { q: 'What do you notice most?', o: [['Rotten eggs / sulphur', 'r_egg'], ['Vinegar', 'r_vin'], ['Nail-polish / solvent / "hot"', 'r_fusel'], ['Butter / butterscotch', 'r_dia'], ['Green apple / pumpkin', 'r_acet'], ['Wet cardboard / sherry', 'r_ox'], ['TCP / plasters / medicinal', 'r_phen'], ['Sour (not meant to be)', 'r_sour'], ['Yeasty / bready', 'r_yeasty'], ['Just harsh, thin or too dry', 'r_young']] },
  cl1: { q: 'What is it?', o: [['Fruit wine / cider', 'cl2'], ['Beer', 'r_beerclear'], ['Mead', 'r_meadclear']] },
  cl2: { q: 'Has it been more than 2 months since fermentation finished?', o: [['No', 'r_patience'], ['Yes', 'r_pectin']] },
  fb1: { q: 'How long have they been bottled, and where?', o: [['Under 2 weeks', 'r_waitcarb'], ['2+ weeks somewhere cold (under 16 °C)', 'r_warmcarb'], ['2+ weeks at room temperature', 'fb2']] },
  fb2: { q: 'Did you stabilise it (sorbate / Campden) before bottling?', o: [['Yes', 'r_stabflat'], ['No', 'r_flat']] },
  gr1: { q: 'What does it look like?', o: [['Thick beige or white foam, bubbly', 'r_krausen'], ['Fuzzy, raised spots (green, blue, black, white)', 'r_mould'], ['Thin white film or a wrinkly skin', 'r_pellicle'], ['Floating clumps / islands', 'r_rafts']] },
  // results: [verdict, title, body]
  r_wait: ['ok', 'Give it time', 'Yeast can take up to 48–72 hours to start, especially if it was cold or the yeast is old. Keep it at 18–22 °C and check again tomorrow.'],
  r_leak: ['ok', 'It IS fermenting', 'The gravity dropping means the yeast is working. Bucket lids often leak gas around the edge instead of through the airlock. Nothing to fix.'],
  r_cold: ['watch', 'Too cold', 'Move it somewhere 18–22 °C, or wrap it in a blanket. Gently swirl to wake the yeast. It should start within a day or two.'],
  r_hot: ['watch', 'Too hot', 'Above ~35–40 °C kills most yeasts. Cool it to 18–22 °C. If it hasn\'t started in 24 hours after cooling, add fresh yeast.'],
  r_pres: ['bad', 'The preservative is stopping it', 'Sorbate and benzoate prevent yeast growing, so it won\'t ferment properly. Start again with preservative-free juice. Check labels with the label checker.'],
  r_label: ['watch', 'Check the label', 'Look for potassium sorbate (E202) or sodium benzoate (E211). Use the <a href="#/calc/label">label checker</a>. If it\'s clean, pitch fresh yeast and add nutrient.'],
  r_dead: ['watch', 'The yeast probably died', 'Cool it to room temperature and add a fresh sachet of yeast. Rehydrating it in 35 °C water for 15 min first gives it a strong start.'],
  r_repitch: ['watch', 'Re-pitch fresh yeast', 'Old or damaged yeast can fail. Add a fresh sachet plus yeast nutrient and keep it at 18–22 °C.'],
  r_done: ['ok', 'It\'s probably finished!', 'That\'s a normal finishing gravity. Confirm it\'s the same over 3 days, then rack or bottle. Use the <a href="#/calc/bottlecheck">Ready to bottle?</a> checker.'],
  r_warmrouse: ['watch', 'Warm it and wake the yeast', 'Move it to 20–22 °C and gently swirl to get the yeast back into suspension. Check again in 3 days.'],
  r_stuck: ['watch', 'Stuck fermentation', '1) Swirl the yeast back up. 2) Wine/cider/mead: degas and add yeast nutrient. 3) Still stuck after a week: make a small starter with EC-1118 (champagne yeast) and add it. Beer from a hot mash may simply finish high.'],
  r_egg: ['ok', 'Sulphur: common and usually fades', 'Hungry or stressed yeast, very common with juice, cider, mead and lager. Next time add nutrient. It usually disappears within a few weeks; racking helps.'],
  r_vin: ['bad', 'Vinegar (acetobacter)', 'Air plus bacteria turned alcohol into vinegar. It can\'t be reversed. Next time: sanitise, keep headspace small, keep the airlock filled. (You could use it as vinegar!)'],
  r_fusel: ['watch', 'Fermented too warm', 'Harsh "hot" alcohols from warm or stressed fermentation. Time mellows it a bit. Next time keep it at 17–20 °C, especially in the first 3 days.'],
  r_dia: ['watch', 'Diacetyl', 'Usually packaged too early. Give it more time on the yeast (warm it to 20 °C for 2–3 days). It can also come from bacteria if it gets worse over time.'],
  r_acet: ['ok', 'Just young', 'Acetaldehyde: the yeast hasn\'t finished cleaning up. Leave it a few more days or weeks before judging.'],
  r_ox: ['watch', 'Oxidation', 'Too much air after fermentation. Can\'t be undone. Next time avoid splashing when racking or bottling, and minimise headspace.'],
  r_phen: ['watch', 'Chlorophenols', 'Chlorine from tap water or bleach residue. Next time use ½ a Campden tablet per 25 L of water (or filtered water) and avoid bleach.'],
  r_sour: ['watch', 'Bacterial infection', 'Lactic bacteria made it sour. Drink it soon if you like it, or bin it. Replace scratched plastic, and sanitise more carefully.'],
  r_yeasty: ['ok', 'Yeast still in suspension', 'Give it time or cold to settle. Pour bottles gently, leaving the sediment.'],
  r_young: ['ok', 'It\'s probably just young (or very dry)', 'Most brews taste rough for the first few weeks. Wait 4+ weeks. Too dry or sour? Back-sweeten (after stabilising) or blend.'],
  r_beerclear: ['ok', 'Cold & time', 'Cold-crash it (fridge for 2–3 days), use Protafloc in the boil next time, or gelatine finings. Some styles (wheat, hazy IPA) are meant to be cloudy.'],
  r_meadclear: ['ok', 'Mead clears slowly', 'Give it time (months), keep it cool, or use two-part finings (kieselsol + chitosan).'],
  r_patience: ['ok', 'Be patient', 'Wine and cider often take 1–3 months to clear. Keep it cool and still.'],
  r_pectin: ['watch', 'Probably pectin haze', 'Test: mix 1 part wine with 3 parts methylated spirit. Stringy clots mean pectin. Add pectolase (1 tsp per 4.5 L), wait 2 weeks, then use finings.'],
  r_waitcarb: ['ok', 'Wait a bit longer', 'Carbonation takes about 2 weeks at 18–22 °C, sometimes 3–4 for strong drinks. Turn the bottles gently and wait.'],
  r_warmcarb: ['watch', 'Too cold to carbonate', 'Move them somewhere 18–22 °C for 2 more weeks. Cold yeast barely works.'],
  r_stabflat: ['bad', 'Stabilised drinks can\'t carbonate', 'Sorbate stops the yeast eating the priming sugar. Enjoy it still, or force-carbonate in a keg / soda maker (carefully).'],
  r_flat: ['watch', 'Check the basics', 'Did you add priming sugar and mix it evenly? Are the caps sealing (try one: any hiss)? After very long ageing, the yeast may be too tired; a few grains of fresh yeast per bottle helps next time.'],
  gush: ['bad', 'Over-carbonated: act now', 'Chill <b>all</b> the bottles right away (fridge) to slow the yeast. Wear eye protection, open them over a sink to vent, and drink them soon. Cause: bottled before fermentation finished, too much sugar, or infection. Use the <a href="#/calc/bottlecheck">Ready to bottle?</a> check next time.'],
  r_krausen: ['ok', 'That\'s krausen: perfect!', 'Healthy fermentation foam. It drops back on its own after a few days.'],
  r_mould: ['bad', 'Mould', 'On a young, low-alcohol brew: throw it away. Cause: too much air or headspace, fruit sitting in air, poor sanitation.'],
  r_pellicle: ['watch', 'Pellicle (wild yeast/bacteria)', 'Not dangerous, but it changes the flavour. Taste from underneath. If you like it, rack from under the film and drink soon.'],
  r_rafts: ['ok', 'Yeast rafts', 'Clumps of yeast or fruit pulp. Normal. They usually sink.'],
};
defCalc({ id: 'doctor', title: 'Problem Doctor', icon: 'ref', group: 'Beginner',
  desc: 'Answer a few quick questions and get a diagnosis and fix for the most common brewing problems.',
  render(el) {
    let path = ['start'];
    const V = { ok: ['✅ Relax', 'var(--ok)'], watch: ['⚠️ Worth fixing', 'var(--amber)'], bad: ['❌ Problem', 'var(--danger)'] };
    const draw = () => {
      const n = DOC[path[path.length - 1]];
      el.innerHTML = `<div class="crumbs">${path.length > 1 ? `<button class="btn sm ghost" id="dback">← Back</button><button class="btn sm ghost" id="dre">↺ Start over</button>` : ''}</div>` + (Array.isArray(n)
        ? `<div class="panel dres fade-in" style="border-color:${V[n[0]][1]}"><span class="pill c" style="--c:${V[n[0]][1]}">${V[n[0]][0]}</span><h2 style="margin:10px 0 8px">${n[1]}</h2><p style="font-size:16px">${n[2]}</p>
            <div class="btns"><a class="btn" href="#/calc/normal">Is this normal?</a><a class="btn ghost" href="#/guide/troubleshooting">Troubleshooting guide</a></div></div>`
        : `<div class="panel fade-in"><h2 style="margin-top:0">${n.q}</h2><div class="quiz-grid" style="grid-template-columns:1fr">${n.o.map(([l, nx]) => `<button class="quiz-opt" data-nx="${nx}">${l}</button>`).join('')}</div></div>`);
    };
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-nx]'); if (b) { path.push(b.dataset.nx); draw(); }
      if (e.target.closest('#dback')) { path.pop(); draw(); }
      if (e.target.closest('#dre')) { path = ['start']; draw(); }
    });
    draw();
  } });

/* =================== Flavour finder =================== */
const FLAVOURS = [
  ['Fruity', '🍌', 'Banana / bubblegum', 'Esters from warm fermentation.', 'Wanted in wheat beer; otherwise ferment cooler.'],
  ['Fruity', '🍐', 'Pear drops / fruity', 'Esters (ethyl/isoamyl acetate).', 'Normal in English ales and young cider. Cooler ferment = fewer.'],
  ['Fruity', '🍏', 'Green apple / fresh pumpkin', 'Acetaldehyde: young brew.', 'Give it more time on the yeast.'],
  ['Fruity', '🍊', 'Citrus / tropical', 'Hops (Citra, Mosaic) or kveik yeast.', 'Great in IPAs, and nice in hopped cider.'],
  ['Sweet', '🧈', 'Butter / butterscotch', 'Diacetyl.', 'More time at 20 °C before packaging; sanitation if it worsens.'],
  ['Sweet', '🍯', 'Honey', 'Honey or residual sweetness.', 'Normal in mead. Unwanted in beer? It finished high.'],
  ['Sweet', '🌽', 'Cooked sweetcorn', 'DMS (beer).', 'Rolling boil with the lid off; chill fast.'],
  ['Sharp', '🍋', 'Sour / tart', 'Acid from fruit, or bacteria.', 'Normal in cider. Unexpectedly sour beer = infection.'],
  ['Sharp', '🫗', 'Vinegar', 'Acetobacter (air + bacteria).', 'Can\'t fix. Limit air; sanitise.'],
  ['Sharp', '🥴', 'Hot, solvent, nail-polish', 'Fusel alcohols: too warm.', 'Ferment at 17–20 °C; ageing helps a bit.'],
  ['Funky', '🥚', 'Rotten eggs / struck match', 'Hydrogen sulphide: hungry yeast.', 'Nutrient; time; racking. Common in cider and mead.'],
  ['Funky', '🩹', 'Plasters / TCP / smoky', 'Phenols: chlorine or wild yeast.', 'Campden in water, no bleach. (Clove-like is normal in wheat beer.)'],
  ['Funky', '📦', 'Wet cardboard / sherry', 'Oxidation.', 'Avoid splashing after fermentation; less headspace.'],
  ['Funky', '🦨', 'Skunky', 'Light-struck hops.', 'Brown bottles; keep out of light.'],
  ['Funky', '🍞', 'Bready / yeasty', 'Yeast in suspension or bread yeast.', 'Time and cold; pour off the sediment.'],
  ['Funky', '🌸', 'Geraniums', 'Sorbate + bacteria.', 'Always use Campden with sorbate.'],
  ['Texture', '💧', 'Thin / watery', 'Fully dry; low body (juice ciders).', 'Add tannin, back-sweeten slightly, or use juice with more body.'],
  ['Texture', '🧽', 'Astringent / drying / tea-like', 'Tannins (skins, stems, over-squeezed grain).', 'Fine in red wine; mellows with age.'],
];
defCalc({ id: 'flavours', title: 'Flavour finder', icon: 'drop', group: 'Beginner',
  desc: 'Taste something odd (or nice)? Tap the flavour to find out what causes it and what to do about it.',
  render(el) {
    const groups = [...new Set(FLAVOURS.map(f => f[0]))];
    el.innerHTML = groups.map(g => `<h3>${g}</h3><div class="flav">${FLAVOURS.filter(f => f[0] === g).map((f, i) => `<button class="flav-b" data-f="${FLAVOURS.indexOf(f)}"><span>${f[1]}</span>${f[2]}</button>`).join('')}</div>`).join('') + `<div id="fo"></div>`;
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-f]'); if (!b) return;
      $$('.flav-b', el).forEach(x => x.classList.toggle('on', x === b));
      const f = FLAVOURS[+b.dataset.f];
      const out = document.createElement('div'); out.className = 'panel flav-out fade-in';
      out.innerHTML = `<div style="font-size:36px">${f[1]}</div><h3 style="margin:6px 0">${f[2]}</h3><p><b>Cause:</b> ${f[3]}</p><p><b>What to do:</b> ${f[4]}</p>`;
      $('.flav-out', el)?.remove(); b.closest('.flav').after(out);
    });
  } });

/* =================== Extra beginner guides =================== */
window.Guides.push(
{ id: 'first-weeks', title: 'Your first 6 weeks, day by day', drink: 'all', mins: 6, level: 'Start here',
  summary: 'Exactly what happens and what to do, from brew day to your first glass, using a simple cider as the example.',
  html: `<p>Here's the whole journey for a 4.5 L demijohn of shop-juice cider, the most common first brew. Other drinks follow the same pattern with different timings.</p>
<table class="tbl"><tr><th>When</th><th>What you'll see</th><th>What to do</th></tr>
<tr><td><b>Day 0</b></td><td>Nothing yet.</td><td>Sanitise, pour the juice, take the OG, add nutrient + yeast, fit the airlock. Put it somewhere 16–20 °C. <a href="#/brew/turbo-cider">Brew along</a></td></tr>
<tr><td><b>Days 1–3</b></td><td>Bubbles start, foam on top, cloudy, maybe an eggy smell.</td><td>Nothing! Don't open it. Check the temperature.</td></tr>
<tr><td><b>Days 4–10</b></td><td>Steady bubbling that slowly calms. Sediment starts to form.</td><td>Leave it. This is when most of the flavour is made.</td></tr>
<tr><td><b>Days 10–14</b></td><td>Bubbles slow right down; it may start clearing from the top.</td><td>Take a gravity reading. Again 3 days later.</td></tr>
<tr><td><b>Days 14–21</b></td><td>Readings match (≈0.998–1.000). It's finished.</td><td>Rack it off the sediment into a clean demijohn. Top up the gap.</td></tr>
<tr><td><b>Weeks 3–5</b></td><td>It clears; a thin new sediment forms.</td><td>Patience. Taste it: dry and sharp is normal.</td></tr>
<tr><td><b>Week 5</b></td><td>Clear-ish and calm.</td><td>Bottle: still, or prime for fizz. Run the <a href="#/calc/bottlecheck">Ready to bottle?</a> check.</td></tr>
<tr><td><b>Weeks 5–7</b></td><td>Sparkling bottles carbonate.</td><td>Keep them at room temperature for 2 weeks, then chill.</td></tr>
<tr><td><b>Week 7+</b></td><td>🍻</td><td>Drink one, rate it in your batch log, and keep a few: it gets better for months.</td></tr></table>
${tip('Start a batch in the <a href="#/log">batch log</a> on day 0. Brew Lab then reminds you of every step and shows a daily coach card.')}` },
{ id: 'tasting', title: 'How to taste & judge your brew', drink: 'all', mins: 5, level: 'Beginner',
  summary: 'Taste like a judge: what to look for, the words to use, and how to turn notes into a better next batch.',
  html: `<h3>Set up</h3><ul><li>A clean, unscented glass (a wine glass is perfect for aroma).</li><li>Serve at the right temperature: lager and cider 6–8 °C, ales 10–13 °C, wine and mead 10–16 °C. Too cold hides flavour.</li><li>Pour gently, leaving the yeast sediment in the bottle.</li></ul>
<h3>The five steps</h3><ol class="steps"><li><b>Look.</b> Colour, clarity (brilliant, hazy, cloudy), bubbles, foam and how long it lasts.</li><li><b>Smell.</b> Swirl, then short sniffs. Fruit? Honey? Hops? Bread? Anything off (eggs, vinegar, cardboard, solvent)?</li><li><b>Taste.</b> Let it cover your tongue. Sweet ↔ dry, sour, bitter, alcohol warmth. Is it balanced, or does one thing dominate?</li><li><b>Mouthfeel.</b> Thin or full? Fizzy, soft or flat? Drying (tannin)?</li><li><b>Overall.</b> Would you happily drink a pint? What one change would make it better?</li></ol>
${calc('flavours', 'Flavour finder: what does that taste mean?')}
<h3>Turn notes into improvements</h3><table class="tbl"><tr><th>If it's…</th><th>Next time try…</th></tr>
<tr><td>Too dry / thin</td><td>Leave some sweetness (stabilise + back-sweeten), add tannin, or use a less attenuative yeast.</td></tr>
<tr><td>Too sweet</td><td>A higher-tolerance yeast, or less sugar.</td></tr><tr><td>Too strong / boozy</td><td>Less sugar; a cooler ferment.</td></tr>
<tr><td>Flat flavour</td><td>A little acid (cider/wine), more hops (beer), or blend in a characterful juice.</td></tr>
<tr><td>Harsh</td><td>Time! Then ferment cooler next batch.</td></tr></table>` },
{ id: 'sweet-methods', title: 'Making it sweet: every method compared', drink: 'all', mins: 5, level: 'Beginner → Intermediate',
  summary: 'The #1 beginner question: "why is mine so dry?" Here\'s every way to get sweetness, safely.',
  html: `<p>Yeast eats sugar. Leave it alone and wine, cider and mead ferment bone dry. To get sweetness you have to stop the yeast, outlast it, or use sugar it can't eat.</p>
<table class="tbl"><tr><th>Method</th><th>Still or fizzy?</th><th>Difficulty</th><th>How</th></tr>
<tr><td><b>Sweeten in the glass</b></td><td>Both</td><td>★☆☆</td><td>Add a splash of juice, cordial or sugar syrup when you pour. Zero risk.</td></tr>
<tr><td><b>Non-fermentable sweetener</b></td><td>Both</td><td>★☆☆</td><td>Erythritol, xylitol, stevia or sucralose at bottling. Yeast ignores it. (Xylitol is toxic to dogs.)</td></tr>
<tr><td><b>Stabilise & back-sweeten</b></td><td>Still only</td><td>★★☆</td><td>Sorbate + Campden, wait 48 h, add sugar or honey. <a href="#/calc/sweeten">Calculator</a></td></tr>
<tr><td><b>Outlast the yeast</b></td><td>Still</td><td>★★☆</td><td>Start with more sugar than the yeast can handle (e.g. a 1.130 mead with 71B). Still stabilise to be safe.</td></tr>
<tr><td><b>Use the right yeast</b></td><td>Both</td><td>★★☆</td><td>Perry stays slightly sweet naturally; ale yeasts leave more body than wine yeasts.</td></tr>
<tr><td><b>Keg</b></td><td>Fizzy</td><td>★★★</td><td>Stabilise, sweeten, force-carbonate with CO₂.</td></tr>
<tr><td><b>Pasteurise bottles</b></td><td>Fizzy</td><td>★★★★</td><td>Heat-kill the yeast once carbonated. Real explosion risk; experienced brewers only.</td></tr>
<tr><td><b>Keeving</b></td><td>Fizzy</td><td>★★★★</td><td>Traditional nutrient-starving cider method. See the cider skill ladder.</td></tr></table>
${warn('Never add sugar to a sealed bottle of unstabilised drink "to sweeten it". That\'s exactly how bottle bombs happen.')}` },
{ id: 'flavours-add', title: 'Fruit, spice & flavour additions', drink: 'all', mins: 5, level: 'Beginner → Intermediate',
  summary: 'How and when to add fruit, spices, herbs, hops, oak, vanilla and more, with amounts that work.',
  html: `<h3>When to add</h3><ul><li><b>Primary</b> (at the start): flavours blend in and some aroma ferments away. Best for fruit you want for colour and body.</li><li><b>Secondary</b> (after fermentation): brighter, fresher aroma. Best for spices, hops, vanilla, oak and delicate fruit.</li></ul>
<h3>Amounts per 4.5 L (start low; you can always add more)</h3>
<table class="tbl"><tr><th>Addition</th><th>Amount</th><th>Time</th><th>Notes</th></tr>
<tr><td>Berries / cherries</td><td>300 g–1 kg</td><td>Primary or secondary</td><td>Freeze first. Use a straining bag. Adds sugar and colour.</td></tr>
<tr><td>Cinnamon stick</td><td>1</td><td>3–10 days</td><td>Strong fast. Taste every 2–3 days.</td></tr>
<tr><td>Cloves</td><td>2–3</td><td>3–7 days</td><td>Very strong. Fewer is more.</td></tr>
<tr><td>Vanilla pod</td><td>½–1, split</td><td>1–3 weeks</td><td>Lovely in mead and stout.</td></tr>
<tr><td>Fresh ginger</td><td>20–60 g</td><td>Simmer in, or secondary</td><td>Grate for more heat.</td></tr>
<tr><td>Citrus zest</td><td>1 fruit</td><td>Primary or secondary</td><td>Zest only; the white pith is bitter.</td></tr>
<tr><td>Dry hops</td><td>10–25 g</td><td>3–5 days</td><td>Longer gets grassy. Citra, Mosaic and Nelson are great in cider.</td></tr>
<tr><td>Oak chips</td><td>10–20 g</td><td>1–4 weeks</td><td>Toasted oak adds vanilla and structure. Steam or boil briefly first.</td></tr>
<tr><td>Tea</td><td>1–2 strong bags</td><td>Primary</td><td>Cheap tannin and body for cider and country wine.</td></tr>
<tr><td>Chilli</td><td>½–1, split</td><td>1–3 days</td><td>Taste daily: it escalates!</td></tr></table>
${tip('Sanitise additions: a quick dip in boiling water, or soak spices in a splash of vodka for a day. Use a sanitised mesh bag so they\'re easy to remove.')}` },
{ id: 'ageing', title: 'Storing, ageing & serving', drink: 'all', mins: 4, level: 'Beginner',
  summary: 'How long each drink keeps, where to store it and how to serve it at its best.',
  html: `<table class="tbl"><tr><th>Drink</th><th>Ready after</th><th>Best within</th><th>Serve at</th></tr>
<tr><td>Hoppy beer (IPA, pale)</td><td>2–3 weeks in bottle</td><td>2–3 months</td><td>6–10 °C</td></tr>
<tr><td>Malty / dark beer</td><td>3–4 weeks</td><td>6–12 months</td><td>10–13 °C</td></tr>
<tr><td>Cider / perry</td><td>4–8 weeks</td><td>1–2 years</td><td>6–10 °C</td></tr>
<tr><td>Carton / kit wine</td><td>1–3 months</td><td>1–2 years</td><td>white 8–10 °C, red 14–16 °C</td></tr>
<tr><td>Country wine</td><td>6 months</td><td>1–5 years</td><td>8–16 °C</td></tr>
<tr><td>Mead</td><td>3–6 months</td><td>years</td><td>10–16 °C</td></tr>
<tr><td>Ginger beer / seltzer</td><td>2 weeks</td><td>2–3 months</td><td>ice-cold</td></tr></table>
<h3>Storage rules</h3><ul><li><b>Cool, dark and steady</b>: a cupboard away from the boiler, under the stairs or a garage that doesn't freeze. Light and heat age drinks fast.</li><li>Store crown-capped and screw-cap bottles <b>upright</b> (yeast stays at the bottom). Corked wine can lie down.</li><li>Label everything with the name and date. The <a href="#/calc/labels">label maker</a> helps.</li><li>Track what's ready in your <a href="#/cellar">cellar</a>.</li></ul>
<h3>Serving bottle-conditioned drinks</h3><p>Chill upright for a day, then pour in one smooth motion, stopping when the yeast reaches the neck. You'll leave about 1 cm behind.</p>` },
{ id: 'scaling', title: 'Scaling recipes & UK vs US units', drink: 'all', mins: 3, level: 'Reference',
  summary: 'Turn any recipe into the batch size you want, and decode American recipes.',
  html: `<h3>Scaling</h3><p>Multiply every ingredient by <b>new volume ÷ recipe volume</b>. A 23 L recipe made at 4.5 L: × 0.196 (roughly ÷ 5). Every recipe in Brew Lab has a batch-size box that does this for you.</p>
<p>Don't scale <b>yeast</b> down too far: half a sachet is fine for 5–10 L, and one sachet covers 4.5–23 L of wine or cider. <b>Boil-off</b> doesn't scale: a small pot still loses 1–2 L an hour.</p>
<h3>Gallons are confusing</h3><table class="tbl"><tr><th>Unit</th><th>Litres</th><th>Notes</th></tr>
<tr><td>UK (imperial) gallon</td><td>4.546</td><td>The demijohn size. Older UK recipes.</td></tr><tr><td>US gallon</td><td>3.785</td><td>American recipes: "5 gallons" = 19 L.</td></tr>
<tr><td>UK pint</td><td>0.568</td><td>20 fl oz</td></tr><tr><td>US pint</td><td>0.473</td><td>16 fl oz</td></tr></table>
<p>Other American terms: <b>corn sugar</b> = dextrose / brewing sugar; <b>DME</b> = spraymalt; <b>°F</b>: 68 °F = 20 °C; <b>lb</b> = 0.454 kg; <b>oz</b> = 28 g.</p>
${calc('convert', 'Unit converter')}` },
);

/* =================== Learn hub =================== */
function pageLearn(el) {
  const done = LESSONS.filter(l => lessonDone(l.id)).length;
  const next = LESSONS.find(l => !lessonDone(l.id));
  const tool = (h, em, t, d) => `<a class="card" href="${h}"><div style="font-size:30px;margin-bottom:8px">${em}</div><h3>${t}</h3><p>${d}</p></a>`;
  el.innerHTML = `<div class="eyebrow">Learn</div><h1>Learn to brew</h1><p class="lead">Short lessons, interactive tools and in-depth guides, from "what is yeast?" to all-grain beer.</p>
    <a class="card school-hero" href="${next ? '#/lesson/' + next.id : '#/certificate'}"><div><div class="eyebrow">🎓 Brew School · ${done}/${LESSONS.length} lessons</div>
      <h2 style="margin:8px 0 6px">${next ? (done ? 'Continue: ' : 'Start: ') + next.t : 'Course complete! View your certificate'}</h2><p>10 bite-size lessons with quizzes. About 45 minutes in total.</p>
      <div class="ladder-prog" style="margin-top:12px"><div style="width:${done / LESSONS.length * 100}%"></div></div></div><span class="sh-em">${next ? next.em : '🎓'}</span></a>
    <div class="btns" style="margin:10px 0 0"><a class="btn" href="#/school">All lessons</a></div>
    <h2>Interactive learning</h2><div class="grid">
      ${tool('#/calc/sim', '📈', 'Fermentation simulator', 'Change temperature, sugar and yeast and see what happens over 4 weeks.')}
      ${tool('#/flashcards', '🃏', 'Flashcards', 'Learn the jargon. Missed cards come back more often.')}
      ${tool('#/calc/trainer', '🎯', 'Hydrometer trainer', 'Practise reading the scale.')}
      ${tool('#/calc/doctor', '🩺', 'Problem Doctor', 'Answer a few questions, get a diagnosis.')}
      ${tool('#/calc/flavours', '👃', 'Flavour finder', 'What causes that taste?')}
      ${tool('#/calc/normal', '🤔', 'Is this normal?', '23 common worries answered.')}
      ${tool('#/kit', '🧰', 'Kit explained', 'Every bit of equipment, illustrated.')}
      ${tool('#/start', '🧭', 'Find your first brew', 'A 5-question quiz.')}
      ${tool('#/paths', '🪜', 'Skill ladders', 'Super easy → expert for every drink.')}
    </div>
    <h2>Guides</h2><div id="lg"></div>`;
  const g = document.createElement('div'); pageGuides(g); g.querySelector('.eyebrow')?.remove(); g.querySelector('h1')?.remove(); g.querySelector('.lead')?.remove();
  $('#lg', el).appendChild(g);
}
