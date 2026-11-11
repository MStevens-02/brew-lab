/* Brew Lab — notifications inbox + preferences + background checks, daily coach,
   kit explained, glossary pop-ups, achievements, ready-to-bottle checker, tip of the day. */

/* =================== Notification inbox =================== */
const NPREFS_DEFAULT = { milestones: true, reminders: true, ready: true, tips: true, badges: true, hour: 8 };
const nprefs = () => ({ ...NPREFS_DEFAULT, ...store.get('nprefs', {}) });
const getInbox = () => store.get('inbox', []);
function pushInbox(item, { system = true } = {}) {
  const box = getInbox();
  box.unshift({ id: uidStr(), at: new Date().toISOString(), read: false, ...item });
  store.set('inbox', box.slice(0, 80));
  updateBell();
  const p = nprefs();
  if (system && store.get('notify', false) && 'Notification' in window && Notification.permission === 'granted' && new Date().getHours() >= p.hour) {
    showNote(item.t, item.body || '', item.href);
  }
}
// richer showNote: carries a link so tapping the notification opens the right page
showNote = async function (title, body, href = '#/inbox') {
  try {
    const reg = await navigator.serviceWorker?.getRegistration();
    const opts = { body, icon: 'icon-192.png', badge: 'icon-192.png', tag: 'bl-' + title.slice(0, 40), data: { href } };
    if (reg) reg.showNotification(title, opts); else new Notification(title, opts);
  } catch (e) { /* ignore */ }
};
function updateBell() {
  const n = getInbox().filter(x => !x.read).length;
  $$('[data-nav="inbox"]').forEach(a => a.dataset.badge = n || '');
}

/* Generate notifications for things due today (runs on open and every 10 minutes) */
const KIND_PREF = { milestone: 'milestones', reminder: 'reminders', ready: 'ready' };
notifyDue = async function () {
  const p = nprefs(), t = today();
  let sent = store.get('sentKeys', []);
  // merge anything the background worker already notified
  try { const c = await caches.open('brewlab-data'); const r = await c.match('notified.json'); if (r) sent = [...new Set([...sent, ...(await r.json())])]; } catch (e) { }
  for (const e of dueItems()) {
    if (!p[KIND_PREF[e.kind]]) continue;
    const key = `${e.date}|${e.text}`;
    if (sent.includes(key)) continue;
    sent.push(key);
    pushInbox({ t: e.kind === 'reminder' ? '⏰ ' + e.text : e.kind === 'ready' ? '🍻 ' + e.text : '📅 ' + e.text, body: e.kind === 'milestone' ? 'From your batch timeline' : e.date < t ? `Was due ${nice(e.date)}` : 'Due today', href: e.href, kind: e.kind });
  }
  if (p.tips && store.get('tipDay', '') !== t) { store.set('tipDay', t); const tip = tipOfDay(); pushInbox({ t: '💡 Tip of the day', body: tip, href: '#/inbox', kind: 'tip' }, { system: false }); }
  store.set('sentKeys', sent.slice(-300));
  // timed reminders later today, while the app stays open
  for (const r of getRems().filter(r => !r.done && r.date === t && r.time)) {
    const ms = new Date(`${r.date}T${r.time}:00`) - Date.now();
    if (ms > 0 && ms < 864e5 && !r._timer) { r._timer = 1; setTimeout(() => { showNote('⏰ ' + r.text, 'Brew Lab reminder', r.batchId ? '#/log/' + r.batchId : '#/calendar'); beep(3); }, ms); }
  }
  writeSchedule();
};
/* Hand the next 60 days of events to the service worker for background checks */
async function writeSchedule() {
  try {
    const p = nprefs();
    const ev = calEvents().filter(e => !e.done && e.date <= addDays(today(), 60) && p[KIND_PREF[e.kind]])
      .map(e => ({ key: `${e.date}|${e.text}`, date: e.date, time: e.time || '', text: e.text, href: e.href, kind: e.kind }));
    const c = await caches.open('brewlab-data');
    await c.put('schedule.json', new Response(JSON.stringify({ hour: p.hour, enabled: !!store.get('notify', false), events: ev })));
    await c.put('notified.json', new Response(JSON.stringify(store.get('sentKeys', []))));
  } catch (e) { /* cache unavailable */ }
}
async function registerBackground() {
  try {
    const reg = await navigator.serviceWorker?.getRegistration();
    if (!reg || !('periodicSync' in reg)) return 'unsupported';
    const st = await navigator.permissions.query({ name: 'periodic-background-sync' });
    if (st.state !== 'granted') return 'not-installed';
    await reg.periodicSync.register('brewlab-daily', { minInterval: 6 * 60 * 60 * 1000 });
    return 'on';
  } catch (e) { return 'unsupported'; }
}
setInterval(() => notifyDue(), 10 * 60 * 1000);

function pageInbox(el) {
  const draw = () => {
    const box = getInbox();
    el.innerHTML = `<div class="eyebrow">Notifications</div><h1>Inbox</h1>
      <p class="lead">Everything Brew Lab has nudged you about: batch steps, reminders, bottles ready to drink, tips and achievements.</p>
      <div class="btns" style="margin:0 0 16px"><button class="btn" id="ir">✓ Mark all read</button><a class="btn ghost" href="#/app">🔔 Notification settings</a><button class="btn ghost" id="ic">Clear</button></div>
      ${store.get('notify', false) ? '' : `<div class="callout info"><b>Off</b><div>Phone notifications are off, so these only appear here. <a href="#/app">Turn them on →</a></div></div>`}
      <div class="adds">${box.map(n => `<a class="add inbox-i ${n.read ? '' : 'unread'}" href="${n.href || '#/inbox'}" data-iid="${n.id}" style="grid-template-columns:1fr auto;text-decoration:none;color:inherit">
        <span><b>${esc(n.t)}</b><br><span class="note">${esc(n.body || '')}</span></span><small>${timeAgo(n.at)}</small></a>`).join('') || '<div class="empty"><div class="big">🔕</div><p>No notifications yet. Start a batch and Brew Lab will tell you when to check it, rack it, bottle it and drink it.</p></div>'}</div>`;
  };
  el.addEventListener('click', e => {
    if (e.target.closest('#ir')) { store.set('inbox', getInbox().map(n => ({ ...n, read: true }))); updateBell(); draw(); }
    if (e.target.closest('#ic') && confirm('Clear all notifications?')) { store.set('inbox', []); updateBell(); draw(); }
    const i = e.target.closest('[data-iid]'); if (i) { store.set('inbox', getInbox().map(n => n.id === i.dataset.iid ? { ...n, read: true } : n)); updateBell(); }
  });
  draw();
}
function timeAgo(iso) {
  const s = (Date.now() - new Date(iso)) / 1000;
  if (s < 60) return 'now'; if (s < 3600) return Math.floor(s / 60) + 'm'; if (s < 86400) return Math.floor(s / 3600) + 'h';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/* Notification preferences: added to App & settings */
const _pageApp2 = pageApp;
pageApp = function (el) {
  _pageApp2(el);
  const p = nprefs();
  const box = document.createElement('div'); box.className = 'panel';
  box.innerHTML = `<h3 style="margin-top:0">📬 What to notify me about</h3>
    ${[['milestones', 'Batch timeline steps (check gravity, rack, bottle…)'], ['reminders', 'My own reminders'], ['ready', 'Bottles ready to drink'], ['badges', 'Achievements unlocked'], ['tips', 'Daily brewing tip (inbox only)']].map(([k, l]) => `<label class="add" style="grid-template-columns:30px 1fr;cursor:pointer;margin-bottom:6px"><input type="checkbox" data-np="${k}" ${p[k] ? 'checked' : ''} style="width:20px;height:20px;accent-color:#f5a524"><span>${l}</span></label>`).join('')}
    <div class="field" style="margin-top:10px"><label>Don't send phone notifications before</label><div class="inp"><select id="nph">${[6, 7, 8, 9, 10, 12].map(h => `<option value="${h}"${h === p.hour ? ' selected' : ''}>${h}:00</option>`).join('')}</select></div></div>
    <p class="note" id="bgs" style="margin-top:10px">Checking background notifications…</p>`;
  const grid = $('.grid', el); grid.insertBefore(box, grid.children[2] || null);
  box.addEventListener('change', e => {
    const q = nprefs();
    if (e.target.dataset.np) q[e.target.dataset.np] = e.target.checked;
    if (e.target.id === 'nph') q.hour = +e.target.value;
    store.set('nprefs', q); writeSchedule(); toast('Saved');
  });
  // background status line
  registerBackground().then(s => {
    const msg = {
      on: '✅ <b>Background notifications are on.</b> Your phone checks for due batch tasks a few times a day, even when Brew Lab is closed.',
      'not-installed': '📱 <b>Install the app</b> (Chrome on Android) to get notifications even when Brew Lab is closed. Until then they arrive when you open it.',
      unsupported: 'ℹ️ This browser can\'t notify when Brew Lab is closed (iPhone and desktop browsers can\'t). You\'ll get them when you open the app. For guaranteed alarms, <a href="#/calendar">export to your phone calendar</a>.',
    }[s];
    const n = $('#bgs', box); if (n) n.innerHTML = msg;
  });
  // when notifications get switched on, also try background
  $('#nt', el)?.addEventListener('change', () => setTimeout(() => { registerBackground(); writeSchedule(); }, 500));
};

/* =================== Tip of the day =================== */
const TIPS = [
  'Sanitise everything that touches your brew after the boil (or everything, for juice and wine). It\'s the #1 way to avoid ruined batches.',
  'Fermentation is finished when the gravity is the same 3 days in a row, not when the airlock stops.',
  'A fermenter runs 2–4 °C warmer than the room in the first few days. Pick a cool spot.',
  'Eggy smells from cider, juice and mead are normal. Yeast nutrient prevents most of it.',
  'Never tighten the cap on something that\'s still fermenting.',
  'Freeze fruit before making wine: ice crystals burst the cells and release more juice and colour.',
  'Top up after racking. Lots of air in a demijohn for months risks oxidation and vinegar.',
  'Young cider and wine taste harsh. Give them time before you judge them.',
  'Write down your starting gravity. Without it you can\'t work out the ABV.',
  'Hydrometers are calibrated at a set temperature (often 20 °C). Correct hot or cold readings.',
  'A balloon with a pin-prick makes a free airlock for a bottle brew.',
  'Check juice labels: potassium sorbate (E202) and sodium benzoate (E211) stop fermentation.',
  'Pectolase helps fruit wines clear. Add it before the yeast.',
  'One plastic bottle among your glass ones makes a perfect carbonation tester: squeeze it.',
  'Bread yeast works in an emergency, but a £1 wine yeast tastes far better.',
  'Bottle-conditioned drinks have a thin yeast layer. Pour gently and leave the last centimetre.',
  'Cold crashing (chilling before bottling) makes clearer beer and cider.',
  'Keep fermenting brews out of sunlight: UV makes hoppy beer smell "skunky".',
  'Stabilised (sorbate + Campden) drinks can\'t be bottle-carbonated. Choose sweet-still or dry-sparkling.',
  'Make two small batches with different yeasts: the fastest way to learn what yeast does.',
  'Add honey to mead must warm, not boiling. Boiling drives off its aroma.',
  'Rehydrating dry yeast in warm water for 15 minutes gives it a healthier start in strong brews.',
  'Taste at every gravity reading. You\'ll learn how flavours change as it ferments.',
  'Use the batch log: your notes are how you repeat a great batch.',
  'Most mistakes are fixable. Check "Is this normal?" before you pour anything away.',
  'Don\'t store bottles in a warm kitchen for months; a cool, dark cupboard keeps them fresh.',
  'Want it sweet and fizzy? Add erythritol with the priming sugar: yeast can\'t eat it.',
  'Rinse equipment straight after use. Dried yeast and foam are ten times harder to clean.',
];
const tipOfDay = () => TIPS[Math.floor(Date.now() / 864e5) % TIPS.length];

/* =================== Daily fermentation coach =================== */
const STAGES = [
  { from: 0, to: 0, t: 'Brew day', see: 'Nothing yet. That\'s normal! Yeast takes 12–48 hours to wake up.', todo: ['Log your starting gravity (OG)', 'Put it somewhere 17–22 °C, out of sunlight', 'Make sure the airlock has water or sanitiser in it'] },
  { from: 1, to: 3, t: 'Waking up', see: 'Bubbles in the airlock, foam on top, cloudy liquid, yeasty or eggy smells. All normal.', todo: ['Check the temperature isn\'t creeping above 22 °C', 'Leave the lid on. Don\'t peek', 'Mead: add nutrient & degas on days 1, 2, 3'] },
  { from: 4, to: 7, t: 'Peak fermentation', see: 'Steady bubbling, then foam starts falling back. Lots of yeast swirling around.', todo: ['Mostly leave it alone', 'Beer: add dry hops now if the recipe has them', 'Wine on fruit: stir daily, then strain around day 5–7'] },
  { from: 8, to: 14, t: 'Slowing down', see: 'Bubbles slow right down. A sediment layer forms; it may start clearing from the top.', todo: ['Take a gravity reading around day 10', 'Take another 3 days later. Same number means finished', 'Taste the sample: dry and a bit rough is normal'] },
  { from: 15, to: 28, t: 'Finishing & clearing', see: 'Little or no bubbling. It\'s getting clearer and the sediment is compacting.', todo: ['Confirm a stable gravity', 'Rack off the sediment, or bottle if it\'s a quick brew', 'Use the "Ready to bottle?" checker first'] },
  { from: 29, to: 9999, t: 'Conditioning & ageing', see: 'Clear (or clearing) and calm. Flavours are smoothing out.', todo: ['Bottle, or keep ageing with the airlock topped up', 'Taste every few weeks. It keeps improving', 'Wine & mead: patience pays, months not weeks'] },
];
function coachCard(b) {
  const day = Math.max(0, daysBetween(b.start, today()));
  const slow = ['wine', 'mead'].includes(b.drink) ? 1.6 : 1;
  const st = STAGES.find(s => day >= Math.round(s.from * (s.from > 7 ? slow : 1)) && day <= Math.round(s.to * (s.to > 7 && s.to < 9999 ? slow : 1))) || STAGES[STAGES.length - 1];
  const ck = (b.checkins || {})[today()];
  return `<div class="panel coach fade-in"><div class="eyebrow">🧑‍🏫 Your coach · day ${day}</div>
    <h3 style="margin:6px 0 4px;color:var(--text)">${st.t}</h3>
    <p><b>What you should see:</b> ${st.see}</p>
    <ul class="ticks">${st.todo.map(t => `<li>${t}</li>`).join('')}</ul>
    <div class="coach-check">${ck ? `<span>${ck === 'ok' ? '✅ Checked in today. Looks good!' : '🤔 You flagged something today.'}</span><a href="#/calc/normal">Is this normal? →</a>` : `<span>Does yours look like that?</span><button class="btn sm" data-ci="ok">✅ Yes</button><button class="btn sm ghost" data-ci="odd">🤔 Something's different</button>`}</div></div>`;
}
const _batchExtras2 = window.batchExtras;
window.batchExtras = (box, b, redraw) => {
  _batchExtras2(box, b, redraw);
  if (b.status === 'Finished') return;
  const c = document.createElement('div'); c.innerHTML = coachCard(b);
  // put the coach near the top of the batch page (before the chart grid)
  const host = box.closest('[id="lb"]') || box.parentElement;
  const anchor = host.querySelector('.grid.two');
  (anchor ? anchor.before(c.firstElementChild) : box.prepend(c.firstElementChild));
  host.querySelector('.coach').addEventListener('click', e => {
    const ci = e.target.closest('[data-ci]'); if (!ci) return;
    b.checkins = { ...(b.checkins || {}), [today()]: ci.dataset.ci }; saveBatch(b);
    if (ci.dataset.ci === 'odd') location.hash = '#/calc/normal'; else { toast('Nice. See you tomorrow 👋'); redraw(); }
  });
};

/* =================== Kit explained (illustrated) =================== */
const S = (inner) => `<svg viewBox="0 0 100 100" class="kit-svg" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
const KIT = [
  { n: 'Demijohn', em: S('<path d="M42 12h16v10c0 4 14 8 14 22v40a6 6 0 0 1-6 6H34a6 6 0 0 1-6-6V44c0-14 14-18 14-22z"/><path d="M30 60h40" stroke-dasharray="4 4"/><rect x="40" y="6" width="20" height="8" rx="2" fill="currentColor" fill-opacity=".25"/>'), price: '£8–£12', need: true,
    what: 'A 4.5 L (1 gallon) glass jar, the standard UK vessel for wine, cider and mead.', why: 'Glass doesn\'t scratch or hold smells, and you can watch the brew clear.', tip: 'Buy two: one to ferment in, one to rack into.' },
  { n: 'Bung & airlock', em: S('<path d="M38 70h24l-3 18H41z" fill="currentColor" fill-opacity=".2"/><path d="M50 70V52"/><path d="M40 52V24a10 10 0 0 1 20 0v28z"/><path d="M44 40h12"/><circle cx="50" cy="32" r="3"/>'), price: '£2–£4', need: true,
    what: 'A rubber stopper with a hole, plus a little water-filled valve.', why: 'Lets CO₂ bubble out while keeping air, flies and bugs out.', tip: 'Fill it to the line with sanitiser or cooled boiled water. A balloon works in a pinch.' },
  { n: 'Fermenting bucket', em: S('<path d="M18 26h64l-6 60a4 4 0 0 1-4 4H28a4 4 0 0 1-4-4z"/><path d="M14 22h72v6H14z"/><path d="M50 22v-8M46 10h8"/><path d="M30 50h40" stroke-dasharray="4 4"/>'), price: '£10–£15', need: false,
    what: 'A 25 L food-grade plastic bucket with a lid and airlock.', why: 'Needed for beer kits and big batches; the wide top makes fruit easy to stir.', tip: 'Never scrub with anything abrasive; scratches hide bacteria.' },
  { n: 'Hydrometer & trial jar', em: S('<rect x="22" y="20" width="22" height="70" rx="4"/><path d="M22 46h22" stroke-dasharray="3 3"/><path d="M64 8v40"/><path d="M64 48c-8 0-10 8-10 16s4 22 10 22 10-14 10-22-2-16-10-16z" fill="currentColor" fill-opacity=".2"/><path d="M60 16h8M60 24h8M60 32h8"/>'), price: '£6–£10', need: true,
    what: 'A glass float that measures how much sugar is in your liquid (gravity).', why: 'The only way to know when it\'s finished and how strong it is.', tip: 'Practise with the <a href="#/calc/trainer">hydrometer trainer</a>.' },
  { n: 'No-rinse sanitiser', em: S('<path d="M36 30h28v54a6 6 0 0 1-6 6H42a6 6 0 0 1-6-6z"/><path d="M42 30V18h16v12"/><path d="M58 20h14l4 6"/><path d="M80 30l6-3M80 36h7M80 42l6 3" stroke-width="2"/><path d="M42 56h16"/>'), price: '£8–£15', need: true,
    what: 'Star San, Chemsan or similar: kills microbes in about 1 minute.', why: 'Clean equipment can still carry wild yeast and bacteria.', tip: 'Keep some in a spray bottle. Don\'t rinse it off, and don\'t fear the foam.' },
  { n: 'Syphon / auto-syphon', em: S('<path d="M22 90V30a12 12 0 0 1 24 0v8"/><path d="M46 38c0 8 10 8 10 20v32"/><rect x="16" y="54" width="12" height="36" rx="3" fill="currentColor" fill-opacity=".2"/><path d="M70 90h16M78 80v10"/>'), price: '£5–£15', need: true,
    what: 'A tube (with a pump, for an auto-syphon) to move liquid without disturbing the sediment.', why: 'Racking off the sediment is how brews get clean and clear.', tip: 'Keep the tube end a couple of cm above the sediment layer.' },
  { n: 'Bottling wand', em: S('<path d="M50 8v70"/><rect x="44" y="8" width="12" height="70" rx="5"/><path d="M50 78v10"/><circle cx="50" cy="90" r="3" fill="currentColor"/><path d="M36 30h-8M36 40h-8" stroke-width="2"/>'), price: '£3–£5', need: false,
    what: 'A stiff tube with a spring valve that fills bottles from the bottom.', why: 'Less splashing (oxygen) and the perfect headspace every time.', tip: 'Fill to the brim; pulling the wand out leaves the right gap.' },
  { n: 'Bottles & capper', em: S('<path d="M30 12h12v14l6 8v52a4 4 0 0 1-4 4H28a4 4 0 0 1-4-4V34l6-8z"/><path d="M66 22h12v8l4 6v50a4 4 0 0 1-4 4H66a4 4 0 0 1-4-4V36l4-6z"/><path d="M64 18h16" stroke-width="5"/><path d="M26 56h20M64 56h18"/>'), price: '£10–£30', need: false,
    what: 'Crown-cap beer bottles plus a capper, or swing-top bottles (no capper needed).', why: 'Sparkling drinks need bottles designed for pressure.', tip: 'Never use jam jars or old wine bottles for fizzy drinks.' },
  { n: 'Thermometer strip', em: S('<rect x="38" y="10" width="24" height="80" rx="4"/><path d="M44 22h12M44 34h12M44 46h12M44 58h12M44 70h12" stroke-width="2"/><rect x="42" y="42" width="16" height="8" rx="2" fill="currentColor" fill-opacity=".4"/>'), price: '£2–£4', need: true,
    what: 'A stick-on strip that shows the temperature of the liquid inside.', why: 'Temperature is the biggest factor in how your brew tastes.', tip: 'Stick it on the side halfway up, away from the heater.' },
  { n: 'Funnel & spoon', em: S('<path d="M14 20h40L38 48v34"/><path d="M70 12v50"/><ellipse cx="70" cy="72" rx="8" ry="12"/>'), price: '£3–£6', need: true,
    what: 'A plastic funnel and a long spoon.', why: 'Getting juice into a demijohn without a funnel is a sticky mess.', tip: 'Sanitise them with everything else.' },
];
function pageKit(el) {
  el.innerHTML = `<div class="eyebrow">Beginner</div><h1>Kit explained</h1>
    <p class="lead">Every bit of equipment you'll hear about: what it looks like, what it does and whether you need it to start.</p>
    <div class="callout tip"><b>Essentials</b><div>For your first juice, cider or wine you only need the ones marked <b>Essential</b>, about £25–£40. Homebrew shops sell them together as a "demijohn starter kit".</div></div>
    <div class="grid two">${KIT.map(k => `<div class="card kit"><div class="kit-pic">${k.em}</div><div>
      <div class="meta" style="margin:0 0 6px">${k.need ? '<span class="pill c" style="--c:var(--ok)">Essential</span>' : '<span class="pill">Later</span>'}<span class="pill">${k.price}</span></div>
      <h3>${k.n}</h3><p>${k.what}</p><p class="note" style="margin-top:6px"><b>Why:</b> ${k.why}</p><p class="note"><b>Tip:</b> ${k.tip}</p></div></div>`).join('')}</div>
    <div class="btns" style="margin-top:18px"><button class="btn pri" id="kshop">${I.cart} Add the essentials to my shopping list</button><a class="btn" href="#/guide/equipment">Full equipment guide</a></div>`;
  $('#kshop', el).onclick = () => addToShop(KIT.filter(k => k.need).map(k => `${k.n} (${k.price})`), 'Starter kit');
}

/* =================== Glossary pop-ups in guides =================== */
function glossarize(root) {
  const defs = new Map();
  for (const [term, d] of Glossary) term.split(' / ').forEach(v => { const k = v.replace(/\s*\(.*?\)\s*/g, '').trim(); if (k.length > 1 && k !== 'Must') defs.set(k, { term, d }); });
  const keys = [...defs.keys()].sort((a, b) => b.length - a.length).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`\\b(${keys.join('|')})\\b`, 'i');
  const used = new Set();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement.closest('a, h1, h2, h3, code, abbr, th, button, .calc-link, .pill') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    let n = node, guard = 0;
    while (n && guard++ < 6) {
      const m = n.nodeValue.match(re); if (!m) break;
      const key = [...defs.keys()].find(k => k.toLowerCase() === m[1].toLowerCase());
      if (!key || used.has(key)) { // skip already-explained terms
        const rest = n.splitText(m.index + m[0].length); n = rest; continue;
      }
      used.add(key);
      const after = n.splitText(m.index); const rest = after.splitText(m[0].length);
      const ab = document.createElement('abbr'); ab.className = 'gl'; ab.tabIndex = 0; ab.textContent = after.nodeValue; ab.dataset.d = defs.get(key).d; ab.dataset.t = defs.get(key).term;
      after.replaceWith(ab); n = rest;
    }
  }
}
function showGloss(ab) {
  $('.gl-pop')?.remove();
  const p = document.createElement('div'); p.className = 'gl-pop fade-in';
  p.innerHTML = `<b>${esc(ab.dataset.t)}</b><div>${esc(ab.dataset.d)}</div>`;
  document.body.appendChild(p);
  const r = ab.getBoundingClientRect(), w = Math.min(300, innerWidth - 24);
  p.style.width = w + 'px';
  p.style.left = Math.max(12, Math.min(innerWidth - w - 12, r.left + r.width / 2 - w / 2)) + 'px';
  const top = r.bottom + 8 + p.offsetHeight > innerHeight ? r.top - p.offsetHeight - 8 : r.bottom + 8;
  p.style.top = (top + scrollY) + 'px';
}
document.addEventListener('click', e => {
  const ab = e.target.closest('abbr.gl');
  if (ab) { showGloss(ab); return; }
  if (!e.target.closest('.gl-pop')) $('.gl-pop')?.remove();
});
document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.matches?.('abbr.gl')) showGloss(e.target); if (e.key === 'Escape') $('.gl-pop')?.remove(); });

/* =================== Achievements =================== */
const BADGES = [
  { id: 'quiz', em: '🧭', n: 'Pathfinder', d: 'Took the first-brew quiz', ok: s => !!s.quiz.like },
  { id: 'first', em: '🌱', n: 'First brew', d: 'Started your first batch', ok: s => s.bs.length >= 1 },
  { id: 'reader', em: '🔬', n: 'Scientist', d: 'Logged 3+ gravity readings on one batch', ok: s => s.bs.some(b => (b.readings || []).length >= 3) },
  { id: 'bottled', em: '🍾', n: 'Bottled it', d: 'Bottled your first batch', ok: s => s.bs.some(b => b.bottledOn) },
  { id: 'five', em: '🖐️', n: 'High five', d: '5 batches brewed', ok: s => s.bs.length >= 5 },
  { id: 'ten', em: '🔟', n: 'Ten-batch brewer', d: '10 batches brewed', ok: s => s.bs.length >= 10 },
  { id: 'explorer', em: '🗺️', n: 'Explorer', d: 'Brewed 3 different types of drink', ok: s => new Set(s.bs.map(b => b.drink)).size >= 3 },
  { id: 'allround', em: '🌍', n: 'All-rounder', d: 'Brewed 5 different types of drink', ok: s => new Set(s.bs.map(b => b.drink)).size >= 5 },
  { id: 'critic', em: '⭐', n: 'Critic', d: 'Rated 3 batches', ok: s => s.bs.filter(b => b.rating).length >= 3 },
  { id: 'planner', em: '📅', n: 'Planner', d: 'Set 5 reminders', ok: s => s.rems.length >= 5 },
  { id: 'climber', em: '🪜', n: 'Climber', d: 'Ticked off 5 skill-ladder rungs', ok: s => s.ladder >= 5 },
  { id: 'expert', em: '🎓', n: 'Expert', d: 'Ticked off an expert rung', ok: s => Object.entries(store.get('ladder', {})).some(([k, v]) => v && k.endsWith('4')) },
  { id: 'hydro', em: '🎯', n: 'Sharp eye', d: 'Scored 8+ on the hydrometer trainer', ok: s => store.get('trainer.best', 0) >= 8 },
  { id: 'photo', em: '📸', n: 'Photographer', d: 'Added a batch photo', ok: s => s.bs.some(b => (b.photos || []).length) },
  { id: 'saver', em: '💷', n: 'Thrifty', d: 'Saved £50+ versus shop prices', ok: s => s.bs.reduce((a, b) => a + (b.cost ? Math.max(0, (b.shopPrice ?? 5.5) * b.L / 0.568 - b.cost) : 0), 0) >= 50 },
  { id: 'strong', em: '💪', n: 'Heavyweight', d: 'Brewed something 12%+', ok: s => s.bs.some(b => { const l = latest(b); return l && Calc.abv(b.og, l.sg) >= 12; }) },
  { id: 'cellar', em: '🏰', n: 'Cellar master', d: '30+ bottles in the cellar at once', ok: s => s.bs.reduce((a, b) => a + (b.bottles || 0), 0) >= 30 },
  { id: 'patient', em: '🧘', n: 'Patience', d: 'Kept a batch going 6+ months', ok: s => s.bs.some(b => daysBetween(b.start, today()) >= 180) },
];
function badgeState() { return { bs: getBatches(), rems: getRems(), quiz: store.get('quiz', {}), ladder: Object.values(store.get('ladder', {})).filter(Boolean).length }; }
function checkBadges() {
  const s = badgeState(); const have = store.get('badges', {});
  for (const b of BADGES) if (!have[b.id] && b.ok(s)) {
    have[b.id] = today(); store.set('badges', have);
    toast(`${b.em} Achievement unlocked: ${b.n}!`);
    if (nprefs().badges) pushInbox({ t: `${b.em} Achievement: ${b.n}`, body: b.d, href: '#/stats', kind: 'badge' });
  }
}
function badgesHTML() {
  const have = store.get('badges', {});
  return `<h2>Achievements · ${Object.keys(have).length}/${BADGES.length}</h2><div class="badges">${BADGES.map(b => `<div class="badge ${have[b.id] ? 'got' : ''}" title="${b.d}"><span>${b.em}</span><b>${b.n}</b><small>${have[b.id] ? 'Unlocked ' + nice(have[b.id]) : b.d}</small></div>`).join('')}</div>`;
}
const _pageStats = pageStats;
pageStats = function (el) { _pageStats(el); el.insertAdjacentHTML('beforeend', badgesHTML()); };

/* =================== Ready to bottle? =================== */
defCalc({ id: 'bottlecheck', title: 'Ready to bottle?', icon: 'bottle', group: 'Beginner',
  desc: 'A quick safety check before bottling, so you get perfect fizz and no exploding bottles.',
  render(el) {
    const Q = [
      ['stable', 'Has the gravity been the same for 3 days in a row?', true],
      ['low', 'Is the reading low enough? (beer ≈1.008–1.015, cider/wine ≈0.995–1.002)', true],
      ['time', 'Has it been fermenting for at least 10–14 days?', false],
      ['bottles', 'Are your bottles made for pressure (beer, swing-top or PET) and undamaged?', true],
      ['clean', 'Is everything cleaned and sanitised (bottles, caps, tubing)?', true],
      ['measured', 'Did you work out the priming sugar with the calculator (not a guess)?', true],
      ['stab', 'Have you added stabilisers (sorbate / Campden)?', false],
    ];
    const ans = store.get('bcheck', {});
    const draw = () => {
      const fizzy = ans.fizz !== 'no';
      const fails = Q.filter(([k, , must]) => must && ans[k] === 'no' && !(k === 'measured' && !fizzy) && !(k === 'bottles' && !fizzy));
      const unsure = Q.filter(([k]) => !ans[k] || ans[k] === '?');
      const stabFizz = fizzy && ans.stab === 'yes';
      let v;
      if (fails.length || stabFizz) v = ['❌ Not yet', 'var(--danger)', stabFizz ? 'Stabilised drinks won\'t carbonate in the bottle: the yeast can\'t eat the priming sugar. Bottle it still, or use a keg.' : 'Bottling now risks over-carbonation or exploding bottles. Fix the red items first.'];
      else if (unsure.length) v = ['⚠️ Almost', 'var(--amber)', 'Answer the remaining questions to be sure.'];
      else v = ['✅ Go for it!', 'var(--ok)', fizzy ? 'Bottle it, keep it warm for 2 weeks, then chill. Put one plastic bottle in as a tester.' : 'Bottle it still. Screw caps or corks are fine.'];
      el.innerHTML = `<div class="calc"><div class="panel">
        <div class="field"><label>Do you want it fizzy?</label><div class="seg" data-q="fizz">${[['yes', 'Yes, sparkling'], ['no', 'No, still']].map(([x, l]) => `<button class="${(ans.fizz || 'yes') === x ? 'on' : ''}" data-v="${x}">${l}</button>`).join('')}</div></div>
        <div class="adds" style="margin-top:14px">${Q.filter(([k]) => fizzy || !['measured', 'bottles'].includes(k)).map(([k, q, must]) => `<div class="add" style="grid-template-columns:1fr;gap:8px;${ans[k] === 'no' && must ? 'border-color:var(--danger)' : ans[k] === 'yes' && k !== 'stab' ? 'border-color:color-mix(in srgb,var(--ok) 50%,transparent)' : ''}">
          <span>${q}</span><div class="seg" data-q="${k}">${[['yes', 'Yes'], ['no', 'No'], ['?', 'Not sure']].map(([x, l]) => `<button class="${ans[k] === x ? 'on' : ''}" data-v="${x}">${l}</button>`).join('')}</div></div>`).join('')}</div></div>
        <div class="panel"><div class="stat big" style="border-color:${v[1]}"><div class="stat-v" style="color:${v[1]};font-family:var(--sans);font-size:28px">${v[0]}</div><div class="stat-s">${v[2]}</div></div>
          ${fails.map(([k]) => `<div class="callout warn"><b>Fix</b><div>${{ stable: 'Wait and take readings 3 days apart until they match. Bottling while fermenting = gushers or bombs.', low: 'It may be stuck. Warm it up, swirl the yeast and give it a week. See <a href="#/calc/normal">Is this normal?</a>', bottles: 'Use proper beer bottles, swing-tops or plastic fizzy-drink bottles. Never jars or wine bottles for fizz.', clean: 'Sanitise everything. Infections in bottles cause gushing and off-flavours.', measured: 'Use the <a href="#/calc/priming">priming calculator</a> for an exact, safe amount.' }[k]}</div></div>`).join('')}
          <div class="btns"><a class="btn" href="#/calc/priming">${I.bubbles} Priming calculator</a><a class="btn ghost" href="#/guide/bottling">Bottling guide</a><button class="btn ghost" id="breset">Reset</button></div></div></div>`;
    };
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-v]'), q = b?.closest('[data-q]');
      if (b && q) { ans[q.dataset.q] = b.dataset.v; store.set('bcheck', ans); draw(); }
      if (e.target.closest('#breset')) { for (const k in ans) delete ans[k]; store.set('bcheck', {}); draw(); }
    });
    draw();
  } });

/* =================== Hooks =================== */
function coachAfterRender() {
  const view = $('#view'); if (!view) return;
  const path = (location.hash.slice(1) || '/').split('?')[0];
  if (/^\/guide\//.test(path)) { const pr = $('.prose', view); if (pr) glossarize(pr); }
  if (path === '/' || path === '') {
    const anchor = $('#home-extra', view) || $('.hero', view);
    if (anchor && !$('.tipcard', view)) anchor.insertAdjacentHTML('afterend', `<div class="tipcard"><span>💡</span><div><b>Tip of the day</b><p>${tipOfDay()}</p></div></div>`);
  }
  checkBadges(); updateBell();
}
window.addEventListener('hashchange', () => { $('.gl-pop')?.remove(); setTimeout(coachAfterRender, 5); });
setTimeout(coachAfterRender, 5);
