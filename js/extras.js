/* Brew Lab — calendar & reminders, notifications, shopping list, cellar, tasting notes,
   bottle labels, global search, app settings / install / backup. */

const getRems = () => store.get('reminders', []);
const setRems = r => store.set('reminders', r);
const uidStr = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
function addReminder(r) { const all = getRems(); all.push({ id: uidStr(), done: false, time: '', ...r }); setRems(all); updateDue(); }

/* ---------- All calendar events ---------- */
function calEvents() {
  const ev = [];
  for (const b of getBatches()) {
    if (b.status !== 'Finished') for (const m of milestones(b)) ev.push({ date: m.d, text: `${b.name}: ${m.t}`, kind: 'milestone', c: DRINK[b.drink]?.c || 'var(--amber)', href: '#/log/' + b.id });
    if (b.readyOn) ev.push({ date: b.readyOn, text: `${b.name}: ready to drink 🍻`, kind: 'ready', c: 'var(--ok)', href: '#/cellar' });
  }
  for (const r of getRems()) ev.push({ date: r.date, time: r.time, text: r.text, kind: 'reminder', c: 'var(--amber2)', id: r.id, done: r.done, href: r.batchId ? '#/log/' + r.batchId : '#/calendar' });
  return ev.sort((a, b) => (a.date + (a.time || '')).localeCompare(b.date + (b.time || '')));
}
function dueItems() {
  const t = today();
  return calEvents().filter(e => (e.kind === 'reminder' ? !e.done && e.date <= t : e.date === t));
}

/* ---------- ICS export (real phone alarms) ---------- */
function icsEvent(e) {
  const d = e.date.replace(/-/g, '');
  const start = e.time ? `DTSTART:${d}T${e.time.replace(':', '')}00` : `DTSTART;VALUE=DATE:${d}`;
  const clean = s => s.replace(/[\\;,]/g, ' ').replace(/\n/g, ' ');
  return ['BEGIN:VEVENT', `UID:${(e.id || uidStr())}-${d}@brewlab`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`, start,
    `SUMMARY:🍺 ${clean(e.text)}`, 'DESCRIPTION:From Brew Lab', 'BEGIN:VALARM', `TRIGGER:${e.time ? '-PT0M' : 'PT9H'}`, 'ACTION:DISPLAY', `DESCRIPTION:${clean(e.text)}`, 'END:VALARM', 'END:VEVENT'].join('\r\n');
}
function downloadIcs(events, name = 'brew-lab.ics') {
  const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Brew Lab//EN', 'CALSCALE:GREGORIAN', ...events.map(icsEvent), 'END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([body], { type: 'text/calendar' })); a.download = name; a.click();
  toast('Calendar file downloaded. Open it to add to your calendar');
}

/* ---------- Due banner, app badge, notifications ---------- */
function updateDue() {
  const due = dueItems();
  try { if ('setAppBadge' in navigator) due.length ? navigator.setAppBadge(due.length) : navigator.clearAppBadge(); } catch (e) { /* unsupported */ }
  const view = $('#view'); if (!view) return;
  $('.due-bar', view)?.remove();
  if (due.length && !location.hash.startsWith('#/calendar')) {
    view.insertAdjacentHTML('afterbegin', `<a class="due-bar fade-in" href="#/calendar">🔔 <b>${due.length} thing${due.length > 1 ? 's' : ''} due</b><span>${esc(due[0].text)}${due.length > 1 ? ` + ${due.length - 1} more` : ''}</span><span>→</span></a>`);
  }
  const navCal = $$('[data-nav="calendar"]'); navCal.forEach(n => n.dataset.badge = due.length || '');
}
async function notifyDue() {
  if (!store.get('notify', false) || !('Notification' in window) || Notification.permission !== 'granted') return;
  const due = dueItems(); const t = today();
  if (due.length && store.get('notified', '') !== t) {
    store.set('notified', t);
    const body = due.slice(0, 3).map(d => '• ' + d.text).join('\n') + (due.length > 3 ? `\n+${due.length - 3} more` : '');
    showNote(`Brew Lab: ${due.length} thing${due.length > 1 ? 's' : ''} to do today`, body);
  }
  // timed reminders later today, while the app stays open
  for (const r of getRems().filter(r => !r.done && r.date === t && r.time)) {
    const ms = new Date(`${r.date}T${r.time}:00`) - Date.now();
    if (ms > 0 && ms < 864e5) setTimeout(() => { showNote('Brew Lab reminder', r.text); beep(3); }, ms);
  }
}
async function showNote(title, body) {
  try {
    const reg = await navigator.serviceWorker?.getRegistration();
    if (reg) reg.showNotification(title, { body, icon: 'icon-192.png', badge: 'icon-192.png', tag: 'brewlab-' + today() });
    else new Notification(title, { body, icon: 'icon-192.png' });
  } catch (e) { /* ignore */ }
}

/* ---------- Calendar page ---------- */
function pageCalendar(el) {
  let cur = new Date(); cur.setDate(1);
  let sel = today();
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  el.innerHTML = `<div class="eyebrow">Plan</div><h1>Brew calendar</h1>
    <p class="lead">Every batch milestone and reminder in one place. Add them to your phone's calendar to get real alarms.</p>
    <div class="btns" style="margin:0 0 16px"><button class="btn pri" id="cadd">${I.plus} Add reminder</button><button class="btn" id="cics">📅 Export all to phone calendar</button><a class="btn ghost" href="#/app">🔔 Notification settings</a></div>
    <div id="cform"></div>
    <div class="calwrap"><div class="panel"><div class="cal-head"><button class="btn sm ghost" data-m="-1">‹</button><b id="cm"></b><button class="btn sm ghost" data-m="1">›</button></div>
      <div class="cal-grid" id="cg"></div></div>
      <div class="panel"><h3 id="dh" style="margin-top:0"></h3><div id="dl" class="adds"></div></div></div>
    <h2>Coming up (next 30 days)</h2><div id="up" class="adds"></div>`;
  const evRow = e => `<div class="add ev ${e.done ? 'done' : ''}" style="grid-template-columns:14px 1fr auto"><span class="dot" style="background:${e.c}"></span>
    <span><a href="${e.href}" style="color:inherit;text-decoration:none">${esc(e.text)}</a><br><small>${nice(e.date)}${e.time ? ' · ' + e.time : ''} · ${{ milestone: 'batch timeline', reminder: 'reminder', ready: 'cellar' }[e.kind]}</small></span>
    <span style="display:flex;gap:6px">${e.kind === 'reminder' ? `<button class="x" title="Done" data-tick="${e.id}" style="width:34px;height:34px">${e.done ? '↺' : '✓'}</button><button class="x" title="Delete" data-rdel="${e.id}" style="width:34px;height:34px">×</button>` : ''}<button class="x" title="Add to phone calendar" data-one="${esc(JSON.stringify(e))}" style="width:34px;height:34px">📅</button></span></div>`;
  const draw = () => {
    const ev = calEvents();
    const y = cur.getFullYear(), m = cur.getMonth();
    $('#cm', el).textContent = `${MONTHS[m]} ${y}`;
    const first = (new Date(y, m, 1).getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
    let cells = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => `<div class="cal-dow">${d}</div>`).join('');
    for (let i = 0; i < first; i++) cells += '<div></div>';
    for (let d = 1; d <= days; d++) {
      const iso = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const es = ev.filter(e => e.date === iso);
      cells += `<button class="cal-day ${iso === today() ? 'today' : ''} ${iso === sel ? 'sel' : ''}" data-d="${iso}"><span>${d}</span><span class="dots">${es.slice(0, 4).map(e => `<i style="background:${e.c}"></i>`).join('')}</span></button>`;
    }
    $('#cg', el).innerHTML = cells;
    const se = ev.filter(e => e.date === sel);
    $('#dh', el).textContent = nice(sel);
    $('#dl', el).innerHTML = se.map(evRow).join('') || `<p class="note">Nothing planned. <a href="#" data-addon="${sel}">Add a reminder for this day</a></p>`;
    const end = addDays(today(), 30);
    const up = ev.filter(e => e.date >= today() && e.date <= end && !e.done);
    const overdue = ev.filter(e => e.kind === 'reminder' && !e.done && e.date < today());
    $('#up', el).innerHTML = (overdue.length ? `<p class="note" style="color:var(--danger)">Overdue</p>${overdue.map(evRow).join('')}` : '') + (up.map(evRow).join('') || `<div class="empty">Nothing coming up. Start a batch in the <a href="#/log">log</a> and its timeline appears here automatically.</div>`);
  };
  const form = date => {
    $('#cform', el).innerHTML = `<div class="panel fade-in" style="margin-bottom:16px"><h3 style="margin-top:0">New reminder</h3><div class="fields">
      <div class="field wide"><label>What</label><div class="inp"><input id="rt" type="text" placeholder="e.g. Check cider gravity"></div></div>
      <div class="field"><label>Date</label><div class="inp"><input id="rd" type="date" value="${date || sel}"></div></div>
      <div class="field"><label>Time (optional)</label><div class="inp"><input id="rh" type="time"></div></div>
      <div class="field wide"><label>Batch (optional)</label><div class="inp"><select id="rb"><option value="">—</option>${getBatches().map(b => `<option value="${b.id}">${esc(b.name)}</option>`).join('')}</select></div></div></div>
      <div class="btns">${['Check gravity', 'Rack off sediment', 'Add nutrient', 'Bottle it', 'Taste test', 'Buy ingredients'].map(t => `<button class="btn sm ghost" data-preset="${t}">${t}</button>`).join('')}</div>
      <div class="btns"><button class="btn pri" id="rsave">Save reminder</button><button class="btn ghost" id="rcancel">Cancel</button></div></div>`;
    $('#rt', el).focus();
  };
  el.addEventListener('click', e => {
    const t = e.target;
    const mb = t.closest('[data-m]'); if (mb) { cur.setMonth(cur.getMonth() + +mb.dataset.m); draw(); }
    const d = t.closest('[data-d]'); if (d) { sel = d.dataset.d; draw(); }
    if (t.closest('#cadd')) form();
    const ao = t.closest('[data-addon]'); if (ao) { e.preventDefault(); form(ao.dataset.addon); window.scrollTo(0, 0); }
    const pr = t.closest('[data-preset]'); if (pr) $('#rt', el).value = pr.dataset.preset;
    if (t.closest('#rcancel')) $('#cform', el).innerHTML = '';
    if (t.closest('#rsave')) {
      const text = $('#rt', el).value.trim(); if (!text) { toast('Write what to do'); return; }
      const b = batchById($('#rb', el).value);
      addReminder({ date: $('#rd', el).value || today(), time: $('#rh', el).value, text: b ? `${b.name}: ${text}` : text, batchId: b?.id || '' });
      $('#cform', el).innerHTML = ''; sel = $('#rd', el)?.value || sel; draw(); toast('Reminder saved');
    }
    const tk = t.closest('[data-tick]'); if (tk) { const all = getRems(); const r = all.find(x => x.id === tk.dataset.tick); r.done = !r.done; setRems(all); updateDue(); draw(); }
    const rd = t.closest('[data-rdel]'); if (rd) { setRems(getRems().filter(x => x.id !== rd.dataset.rdel)); updateDue(); draw(); }
    const one = t.closest('[data-one]'); if (one) downloadIcs([JSON.parse(one.dataset.one)], 'brew-reminder.ics');
    if (t.closest('#cics')) { const ev = calEvents().filter(x => x.date >= today() && !x.done); ev.length ? downloadIcs(ev) : toast('Nothing upcoming to export'); }
  });
  draw();
}

/* ---------- Batch extras: packaging/cellar, reminders, tasting notes ---------- */
window.batchExtras = (box, b, redraw) => {
  const rems = getRems().filter(r => r.batchId === b.id).sort((x, y) => x.date.localeCompare(y.date));
  const stars = (n, attr) => [1, 2, 3, 4, 5].map(i => `<button class="star ${i <= n ? 'on' : ''}" ${attr}="${i}">★</button>`).join('');
  const tn = b.tasting || {};
  box.innerHTML = `
    <h2>Reminders</h2>
    <div class="adds">${rems.map(r => `<div class="add ${r.done ? 'done' : ''}" style="grid-template-columns:1fr auto"><span>${esc(r.text.replace(b.name + ': ', ''))}<br><small>${nice(r.date)}${r.time ? ' · ' + r.time : ''}</small></span><span style="display:flex;gap:6px"><button class="x" data-btick="${r.id}" style="width:34px;height:34px">${r.done ? '↺' : '✓'}</button><button class="x" data-bdel="${r.id}" style="width:34px;height:34px">×</button></span></div>`).join('') || '<p class="note">No reminders yet.</p>'}</div>
    <div class="btns">${[[3, 'Check gravity'], [7, 'Rack off sediment'], [14, 'Bottle it'], [28, 'Taste test']].map(([d, t]) => `<button class="btn sm" data-quick="${d}|${t}">+${d}d: ${t}</button>`).join('')}<a class="btn sm ghost" href="#/calendar">Custom…</a>
      <button class="btn sm ghost" data-bics>📅 Add timeline to phone calendar</button></div>
    <h2>Bottles & cellar</h2>
    <div class="panel"><div class="fields">
      <div class="field"><label>Bottles / servings</label><div class="inp"><input data-pk="bottles" type="number" min="0" inputmode="numeric" value="${b.bottles ?? ''}" placeholder="e.g. 9"></div></div>
      <div class="field"><label>Bottle size</label><div class="inp"><select data-pk="bottleMl">${[330, 500, 568, 750, 1000].map(v => `<option${(b.bottleMl || 500) == v ? ' selected' : ''}>${v}</option>`).join('')}</select><span class="u">ml</span></div></div>
      <div class="field"><label>Bottled / packaged on</label><div class="inp"><input data-pk="bottledOn" type="date" value="${b.bottledOn || ''}"></div></div>
      <div class="field"><label>Ready after</label><div class="inp"><select data-pk="condWeeks">${[0, 1, 2, 3, 4, 6, 8, 12, 26].map(w => `<option value="${w}"${(b.condWeeks ?? 2) == w ? ' selected' : ''}>${w ? w + ' weeks' : 'Straight away'}</option>`).join('')}</select></div></div>
    </div>${b.readyOn ? `<p class="note" style="margin-top:10px">${b.readyOn <= today() ? '✅ Ready to drink since' : '⏳ Conditioning, ready on'} <b>${nice(b.readyOn)}</b>. ${b.bottles ? `${b.bottles} left in the <a href="#/cellar">cellar</a>.` : ''}</p>` : '<p class="note" style="margin-top:10px">Fill this in when you bottle: it adds the batch to your cellar and a "ready to drink" date to the calendar.</p>'}</div>
    <h2>Tasting notes</h2>
    <div class="panel"><div class="stars">${stars(b.rating || 0, 'data-rate')}</div>
      <div class="fields" style="margin-top:10px">
        ${[['look', 'Appearance', 'Colour, clarity, head…'], ['smell', 'Aroma', 'Fruity, hoppy, yeasty…'], ['taste', 'Taste & mouthfeel', 'Sweet/dry, bitter, body…'], ['next', 'Next time I\'d…', 'Ferment cooler, more hops…']].map(([k, l, p]) => `<div class="field"><label>${l}</label><textarea data-tn="${k}" placeholder="${p}" style="min-height:64px">${esc(tn[k] || '')}</textarea></div>`).join('')}
      </div></div>`;
  const save = () => saveBatch(b);
  box.onclick = e => {
    const t = e.target;
    const q = t.closest('[data-quick]'); if (q) { const [d, txt] = q.dataset.quick.split('|'); addReminder({ date: addDays(today(), +d), text: `${b.name}: ${txt}`, batchId: b.id }); toast('Reminder added'); redraw(); }
    const tk = t.closest('[data-btick]'); if (tk) { const all = getRems(); const r = all.find(x => x.id === tk.dataset.btick); r.done = !r.done; setRems(all); updateDue(); redraw(); }
    const dl = t.closest('[data-bdel]'); if (dl) { setRems(getRems().filter(x => x.id !== dl.dataset.bdel)); updateDue(); redraw(); }
    if (t.closest('[data-bics]')) downloadIcs([...milestones(b).filter(m => m.d >= today()).map(m => ({ date: m.d, text: `${b.name}: ${m.t}` })), ...rems.filter(r => !r.done && r.date >= today())], `${b.name.replace(/\W+/g, '-')}.ics`);
    const rt = t.closest('[data-rate]'); if (rt) { b.rating = +rt.dataset.rate === b.rating ? 0 : +rt.dataset.rate; save(); redraw(); }
  };
  box.onchange = e => {
    const k = e.target.dataset.pk; if (!k) return;
    b[k] = ['bottles', 'condWeeks', 'bottleMl'].includes(k) ? +e.target.value : e.target.value;
    if (b.bottledOn) { b.readyOn = addDays(b.bottledOn, (b.condWeeks ?? 2) * 7); if (['Primary', 'Secondary', 'Conditioning'].includes(b.status)) b.status = 'Bottled / kegged'; }
    save(); updateDue(); redraw();
  };
  box.oninput = e => { const k = e.target.dataset.tn; if (k) { b.tasting = { ...(b.tasting || {}), [k]: e.target.value }; save(); } };
};

/* ---------- Cellar ---------- */
function pageCellar(el) {
  const draw = () => {
    const bs = getBatches().filter(b => b.bottles > 0 || b.bottledOn);
    const total = bs.reduce((a, b) => a + (b.bottles || 0), 0);
    const ready = bs.filter(b => b.bottles > 0 && (!b.readyOn || b.readyOn <= today()));
    el.innerHTML = `<div class="eyebrow">Drink</div><h1>Your cellar</h1><p class="lead">What's bottled, what's ready, and what's still conditioning.</p>
      <div class="stats">${stat('Bottles', total, '', 'across all batches', 'big')}${stat('Ready now', ready.reduce((a, b) => a + b.bottles, 0))}${stat('Litres', fmt(bs.reduce((a, b) => a + (b.bottles || 0) * (b.bottleMl || 500), 0) / 1000, 1), 'L')}${stat('Batches', bs.filter(b => b.bottles > 0).length)}</div>
      <div class="grid two" style="margin-top:16px">${bs.map(b => {
        const isReady = !b.readyOn || b.readyOn <= today(); const l = latest(b); const abv = Calc.abv(b.og, l ? l.sg : b.og);
        return `<div class="card" style="--c:${DRINK[b.drink]?.c}">
          <div class="meta" style="margin:0 0 8px"><span class="pill c" style="--c:${isReady ? 'var(--ok)' : 'var(--amber)'}">${isReady ? '✅ Ready' : '⏳ Ready ' + nice(b.readyOn)}</span><span class="pill">${fmt(abv, 1)}%</span><span class="pill">${b.bottleMl || 500} ml</span></div>
          <h3><a href="#/log/${b.id}" style="color:inherit">${DRINK[b.drink]?.em} ${esc(b.name)}</a></h3>
          <p>${b.rating ? '★'.repeat(b.rating) + '☆'.repeat(5 - b.rating) + ' · ' : ''}Bottled ${b.bottledOn ? nice(b.bottledOn) : '—'} · ${fmt(Calc.ukUnits(abv, b.bottleMl || 500), 1)} units each</p>
          <div class="cellar-count"><button class="btn" data-dec="${b.id}">🍺 Drank one</button><b>${b.bottles || 0}</b><span class="note">left</span><button class="x" data-inc="${b.id}" title="Add one">+</button></div></div>`;
      }).join('') || `<div class="empty"><div class="big">🍾</div><p>Nothing in the cellar yet. When you bottle a batch, open it in the <a href="#/log">batch log</a> and fill in "Bottles & cellar".</p></div>`}</div>`;
  };
  el.addEventListener('click', e => {
    const d = e.target.closest('[data-dec], [data-inc]'); if (!d) return;
    const b = batchById(d.dataset.dec || d.dataset.inc);
    b.bottles = Math.max(0, (b.bottles || 0) + (d.dataset.dec ? -1 : 1));
    if (d.dataset.dec && b.bottles === 0) { b.status = 'Finished'; toast('Last one! Batch marked finished. Time to brew again 🍻'); }
    else if (d.dataset.dec) toast('Cheers! 🍻');
    saveBatch(b); draw();
  });
  draw();
}

/* ---------- Shopping list ---------- */
const getShop = () => store.get('shop', []);
const setShop = s => store.set('shop', s);
function addToShop(items, from) {
  const s = getShop(); items.forEach(t => s.push({ id: uidStr(), t, from, done: false })); setShop(s);
  toast(`${items.length} item${items.length > 1 ? 's' : ''} added to your shopping list`);
}
function recipeLines(r, L) {
  const k = L / r.baseL;
  return [
    ...(r.beer ? r.beer.grains.map(([gid, kg]) => `${kg * k >= 1 ? fmt(kg * k, 2) + ' kg' : fmt(kg * k * 1000, 0) + ' g'} ${grain(gid).name}`) : []),
    ...(r.beer ? r.beer.hops.map(([n, g]) => `${fmt(g * k, 0)} g ${n} hops`) : []),
    ...r.ingredients.map(i => `${i.fixed ? i.q : +(i.q * k).toFixed(2)} ${i.u} ${i.n}`.replace(/\s+/g, ' ')),
  ];
}
function pageShop(el) {
  const draw = () => {
    const s = getShop(), open = s.filter(x => !x.done), done = s.filter(x => x.done);
    const groups = [...new Set(open.map(x => x.from || 'Other'))];
    el.innerHTML = `<div class="eyebrow">Buy</div><h1>Shopping list</h1><p class="lead">Add ingredients from any recipe or the juice wizard with one tap, then tick them off in the shop.</p>
      <div class="fields" style="grid-template-columns:1fr auto;max-width:640px"><div class="field"><div class="inp"><input id="si" type="text" placeholder="Add an item, e.g. Campden tablets"></div></div><button class="btn pri" id="sa">${I.plus}</button></div>
      <div class="btns">${['No-rinse sanitiser', 'Yeast nutrient', 'Campden tablets', 'Pectolase', 'Priming sugar', 'Bottle caps', 'Wine yeast sachet'].map(t => `<button class="btn sm ghost" data-q="${t}">+ ${t}</button>`).join('')}</div>
      ${groups.map(g => `<h3>${esc(g)}</h3><div class="adds">${open.filter(x => (x.from || 'Other') === g).map(x => `<label class="add shopi" style="grid-template-columns:30px 1fr auto"><input type="checkbox" data-sd="${x.id}"><span>${esc(x.t)}</span><button class="x" data-sx="${x.id}" style="width:32px;height:32px">×</button></label>`).join('')}</div>`).join('') || '<div class="empty" style="margin-top:16px"><div class="big">🛒</div><p>Your list is empty. Open a recipe and tap "Add to shopping list".</p><a class="btn" href="#/recipes">Browse recipes</a></div>'}
      ${done.length ? `<h3>Got it (${done.length})</h3><div class="adds">${done.map(x => `<label class="add done" style="grid-template-columns:30px 1fr auto"><input type="checkbox" checked data-sd="${x.id}"><span>${esc(x.t)}</span><button class="x" data-sx="${x.id}" style="width:32px;height:32px">×</button></label>`).join('')}</div>` : ''}
      ${s.length ? `<div class="btns" style="margin-top:20px"><button class="btn" id="ss">📤 Share / copy list</button>${done.length ? '<button class="btn ghost" id="sc">Clear ticked</button>' : ''}<button class="btn danger" id="sall">Clear all</button></div>` : ''}`;
  };
  el.addEventListener('click', async e => {
    const t = e.target;
    if (t.closest('#sa')) { const v = $('#si', el).value.trim(); if (v) { addToShop([v], 'Added by me'); draw(); $('#si', el).focus(); } }
    const q = t.closest('[data-q]'); if (q) { addToShop([q.dataset.q], 'Added by me'); draw(); }
    const x = t.closest('[data-sx]'); if (x) { e.preventDefault(); setShop(getShop().filter(i => i.id !== x.dataset.sx)); draw(); }
    if (t.closest('#sc')) { setShop(getShop().filter(i => !i.done)); draw(); }
    if (t.closest('#sall') && confirm('Clear the whole list?')) { setShop([]); draw(); }
    if (t.closest('#ss')) {
      const text = '🛒 Brew shopping list\n' + getShop().filter(i => !i.done).map(i => '☐ ' + i.t).join('\n');
      if (navigator.share) navigator.share({ title: 'Brew shopping list', text }).catch(() => {});
      else { await navigator.clipboard?.writeText(text); toast('List copied'); }
    }
  });
  el.addEventListener('change', e => { const d = e.target.dataset.sd; if (d) { const s = getShop(); const i = s.find(x => x.id === d); i.done = e.target.checked; setShop(s); setTimeout(draw, 150); } });
  el.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.id === 'si') $('#sa', el).click(); });
  draw();
}

/* ---------- Bottle label maker ---------- */
defCalc({ id: 'labels', title: 'Bottle label maker', icon: 'log', group: 'Packaging',
  desc: 'Design labels with name, ABV, date and style, then print a sheet of 10 on A4 paper.',
  render(el) {
    const bs = getBatches();
    const THEMES = { amber: ['#f5a524', '#1a1208'], wine: ['#8e1f45', '#fff3f6'], hop: ['#4c7a26', '#f4ffe9'], cider: ['#d9921a', '#1a1208'], mead: ['#e6b422', '#1a1208'], slate: ['#2b2f36', '#f5ece2'], cream: ['#f3ead9', '#2b1d10'] };
    const st = store.get('label', { name: 'Best Bitter', type: 'Best Bitter', abv: '4.2', date: today(), em: '🍺', theme: 'amber', tag: 'Homebrewed with care', by: '' });
    el.innerHTML = `<div class="calc"><div class="panel"><div class="fields">
      ${bs.length ? `<div class="field wide"><label>Fill from a batch</label><div class="inp"><select id="lb"><option value="">—</option>${bs.map(b => `<option value="${b.id}">${esc(b.name)}</option>`).join('')}</select></div></div>` : ''}
      ${[['name', 'Name', 'text'], ['type', 'Style / type', 'text'], ['abv', 'ABV %', 'text'], ['date', 'Date', 'date'], ['em', 'Emoji', 'text'], ['tag', 'Tagline', 'text'], ['by', 'Brewed by', 'text']].map(([k, l, t]) => `<div class="field"><label>${l}</label><div class="inp"><input data-l="${k}" type="${t}" value="${esc(st[k])}"></div></div>`).join('')}
      <div class="field"><label>Colour</label><div class="inp"><select data-l="theme">${Object.keys(THEMES).map(k => `<option${k === st.theme ? ' selected' : ''}>${k}</option>`).join('')}</select></div></div></div>
      <div class="btns"><button class="btn pri" id="lp">🖨 Print sheet of 10</button></div>
      <p class="note">Print on plain paper and stick on with milk (a classic trick: it washes off easily), or use A4 sticker paper.</p></div>
      <div class="panel"><div id="lprev" style="display:flex;justify-content:center"></div></div></div>
      <div id="print-sheet"></div>`;
    const label = () => {
      const [bg, fg] = THEMES[st.theme] || THEMES.amber;
      return `<div class="blabel" style="--lbg:${bg};--lfg:${fg}"><div class="bl-em">${esc(st.em)}</div><div class="bl-main"><div class="bl-name">${esc(st.name)}</div><div class="bl-type">${esc(st.type)}</div>
        <div class="bl-row"><span>${esc(st.abv)}% ABV</span><span>${st.date ? new Date(st.date + 'T12:00').toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : ''}</span></div>
        <div class="bl-tag">${esc(st.tag)}${st.by ? ' · ' + esc(st.by) : ''}</div></div></div>`;
    };
    const draw = () => { store.set('label', st); $('#lprev', el).innerHTML = label(); $('#print-sheet', el).innerHTML = Array(10).fill(label()).join(''); };
    el.addEventListener('input', e => { const k = e.target.dataset.l; if (k) { st[k] = e.target.value; draw(); } });
    el.addEventListener('change', e => {
      if (e.target.id !== 'lb') return; const b = batchById(e.target.value); if (!b) return;
      const l = latest(b); st.name = b.name; st.type = DRINK[b.drink]?.name || ''; st.abv = fmt(Calc.abv(b.og, l ? l.sg : b.og), 1); st.date = b.bottledOn || b.start;
      st.em = DRINK[b.drink]?.em || '🍺'; st.theme = { beer: 'amber', wine: 'wine', cider: 'cider', mead: 'mead', juice: 'cider' }[b.drink] || 'slate';
      $$('[data-l]', el).forEach(i => { i.value = st[i.dataset.l]; }); draw();
    });
    $('#lp', el).onclick = () => { document.body.classList.add('printing'); window.print(); setTimeout(() => document.body.classList.remove('printing'), 500); };
    draw();
  } });

/* ---------- Global search ---------- */
function searchIndex() {
  const strip = h => h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  return [
    ...Guides.map(g => ({ t: g.title, d: g.summary, body: strip(g.html), href: '#/guide/' + g.id, kind: 'Guide', em: '📘' })),
    ...Recipes.map(r => ({ t: r.name, d: r.desc, body: r.ingredients.map(i => i.n).join(' ') + ' ' + r.steps.join(' '), href: '#/recipe/' + r.id, kind: 'Recipe', em: DRINK[r.drink]?.em })),
    ...Calcs.map(c => ({ t: c.title, d: c.desc, body: '', href: '#/calc/' + c.id, kind: 'Tool', em: '🧮' })),
    ...Glossary.map(([t, d]) => ({ t, d, body: '', href: '#/ref', kind: 'Glossary', em: '🔤' })),
    ...NORMAL.map(n => ({ t: n.q, d: n.a, body: '', href: '#/calc/normal', kind: 'Is this normal?', em: '🤔' })),
    ...Object.entries(Paths).flatMap(([k, ps]) => ps.map((p, i) => ({ t: `${p.name} (${TIERS[i].name})`, d: p.what, body: p.need.join(' '), href: k === 'juice' ? '#/juice' : '#/drink/' + k, kind: 'Skill ladder', em: DRINK[k]?.em }))),
    ...Data.yeasts.map(y => ({ t: y.name, d: y.notes, body: y.uses.join(' '), href: '#/ref', kind: 'Yeast', em: '🦠' })),
    ...Data.juices.map(j => ({ t: j.name, d: j.tips, body: j.makes, href: '#/juice', kind: 'Juice', em: '🧃' })),
    ...getBatches().map(b => ({ t: b.name, d: `${DRINK[b.drink]?.name} batch · ${b.status}`, body: b.notes || '', href: '#/log/' + b.id, kind: 'Your batch', em: '📒' })),
  ];
}
function pageSearch(el) {
  const idx = searchIndex();
  el.innerHTML = `<div class="eyebrow">Find</div><h1>Search</h1>
    <div class="inp search"><input id="sq" type="search" placeholder="Try: sulphur smell, cherry, priming, mould, honey…" value="${esc(store.get('lastq', ''))}" autofocus></div><div id="sr"></div>`;
  const go = q => {
    store.set('lastq', q); q = q.trim().toLowerCase();
    if (q.length < 2) { $('#sr', el).innerHTML = `<p class="note">Search guides, recipes, tools, the glossary, yeasts, juices and your own batches.</p>`; return; }
    const words = q.split(/\s+/);
    const res = idx.map(x => {
      const T = x.t.toLowerCase(), D = (x.d || '').toLowerCase(), B = x.body.toLowerCase();
      let s = 0; for (const w of words) { if (T.includes(w)) s += 5; if (D.includes(w)) s += 2; if (B.includes(w)) s += 1; if (!T.includes(w) && !D.includes(w) && !B.includes(w)) s -= 4; }
      return { x, s };
    }).filter(r => r.s > 0).sort((a, b) => b.s - a.s).slice(0, 30);
    $('#sr', el).innerHTML = res.length ? `<div class="adds">${res.map(({ x }) => `<a class="add" href="${x.href}" style="grid-template-columns:34px 1fr;text-decoration:none;color:inherit"><span style="font-size:20px">${x.em || '•'}</span><span><b>${esc(x.t)}</b> <span class="pill" style="margin-left:4px">${x.kind}</span><br><span class="note">${esc((x.d || '').slice(0, 140))}${(x.d || '').length > 140 ? '…' : ''}</span></span></a>`).join('')}</div>` : '<div class="empty">No results. Try a simpler word.</div>';
  };
  $('#sq', el).addEventListener('input', e => go(e.target.value));
  go($('#sq', el).value); setTimeout(() => $('#sq', el)?.focus(), 50);
}

/* ---------- App & settings ---------- */
let installEvt = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; $$('.install-btn').forEach(b => b.hidden = false); });
function pageApp(el) {
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const size = (() => { let n = 0; try { for (const k in localStorage) if (k.startsWith('bl.')) n += (localStorage[k] || '').length; } catch (e) { } return n; })();
  const perm = 'Notification' in window ? Notification.permission : 'unsupported';
  el.innerHTML = `<div class="eyebrow">App</div><h1>App & settings</h1>
    <div class="grid two">
      <div class="panel"><h3 style="margin-top:0">📱 Install as an app</h3>
        ${standalone ? '<p>✅ You\'re using Brew Lab as an installed app. It works offline.</p>' : `<p>Install Brew Lab on your home screen: it opens full-screen like a normal app, works offline in the garage on brew day, and shows a badge when things are due.</p>
        <button class="btn pri install-btn" ${installEvt ? '' : 'hidden'}>⬇ Install Brew Lab</button>
        <p class="note">${ios ? '<b>iPhone/iPad:</b> tap the Share button in Safari → <b>Add to Home Screen</b>.' : '<b>Android/Chrome:</b> use the button above, or the ⋮ menu → <b>Install app</b> / <b>Add to Home screen</b>.'}</p>`}
        <p class="note">Status: ${navigator.onLine ? '🟢 Online' : '🟠 Offline (everything still works)'}</p></div>
      <div class="panel"><h3 style="margin-top:0">🔔 Reminders & notifications</h3>
        <label class="add" style="grid-template-columns:30px 1fr;cursor:pointer"><input type="checkbox" id="nt" ${store.get('notify', false) && perm === 'granted' ? 'checked' : ''} style="width:22px;height:22px;accent-color:#f5a524"><span>Notify me about due batch tasks and reminders</span></label>
        <p class="note">Browser permission: <b>${perm}</b>. Web apps can only notify reliably when Brew Lab is open or recently opened, so <b>for guaranteed alarms, export to your phone calendar</b>, which works even when the app is closed.</p>
        <div class="btns"><a class="btn" href="#/calendar">📅 Open calendar</a><button class="btn ghost" id="ntest">Send test notification</button></div></div>
      <div class="panel"><h3 style="margin-top:0">💾 Backup & restore</h3>
        <p>Your batches, reminders, shopping list, cellar, ladder progress and settings are saved <b>on this device only</b>. Back up to move them to a new phone or keep them safe.</p>
        <div class="btns"><button class="btn pri" id="bk">⬇ Download backup</button><label class="btn">⬆ Restore backup<input type="file" id="rs" accept=".json" hidden></label></div>
        <p class="note">Using ${fmt(size / 1024, 1)} KB. ${getBatches().length} batches, ${getRems().length} reminders, ${getShop().length} shopping items.</p></div>
      <div class="panel"><h3 style="margin-top:0">🔗 Share Brew Lab</h3><p>Send the app to a friend; it works on any phone.</p>
        <div class="btns"><button class="btn" data-share="${esc(location.origin + location.pathname)}" data-title="Brew Lab">📤 Share</button></div>
        <h3>⚠️ Reset</h3><p class="note">Deletes everything Brew Lab has saved on this device.</p><button class="btn danger" id="wipe">Erase all data</button></div>
    </div>
    <p class="note" style="margin-top:20px">Brew Lab · made by Michael Stevens · <a href="${HUB}">more tools</a></p>`;
  el.addEventListener('click', async e => {
    const t = e.target;
    if (t.closest('.install-btn') && installEvt) { installEvt.prompt(); const r = await installEvt.userChoice; if (r.outcome === 'accepted') toast('Installed! 🎉'); installEvt = null; }
    if (t.closest('#ntest')) { if (Notification?.permission === 'granted') showNote('Brew Lab', 'Notifications are working 🍺'); else toast('Turn notifications on first'); }
    if (t.closest('#bk')) {
      const data = {}; for (const k in localStorage) if (k.startsWith('bl.')) data[k] = localStorage[k];
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify({ app: 'brew-lab', v: 2, saved: new Date().toISOString(), data }, null, 1)], { type: 'application/json' })); a.download = `brew-lab-backup-${today()}.json`; a.click();
    }
    if (t.closest('#wipe') && confirm('Erase ALL Brew Lab data on this device? Download a backup first if unsure.')) { for (const k of Object.keys(localStorage)) if (k.startsWith('bl.')) localStorage.removeItem(k); toast('All data erased'); location.hash = '#/'; }
  });
  el.addEventListener('change', async e => {
    if (e.target.id === 'nt') {
      if (e.target.checked) {
        if (!('Notification' in window)) { toast('Notifications aren\'t supported in this browser'); e.target.checked = false; return; }
        const p = await Notification.requestPermission();
        if (p !== 'granted') { toast('Permission not granted'); e.target.checked = false; store.set('notify', false); return; }
        store.set('notify', true); store.set('notified', ''); notifyDue(); toast('Notifications on');
      } else store.set('notify', false);
    }
    if (e.target.id === 'rs') {
      try {
        const j = JSON.parse(await e.target.files[0].text());
        if (j.app !== 'brew-lab' || !j.data) throw 0;
        if (!confirm('Restore this backup? It replaces matching data on this device.')) return;
        for (const [k, v] of Object.entries(j.data)) if (k.startsWith('bl.')) localStorage.setItem(k, v);
        toast('Backup restored'); updateDue(); pageApp(el);
      } catch (err) { toast('That isn\'t a Brew Lab backup file'); }
    }
  });
}

/* ---------- "More" page (everything, for phones) ---------- */
function pageMore(el) {
  const items = [
    ['#/inbox', '🔔', 'Notifications', 'Inbox of batch nudges, reminders, tips'],
    ['#/kit', '🧰', 'Kit explained', 'What every bit of equipment is for'],
    ['#/calc/bottlecheck', '✅', 'Ready to bottle?', 'Safety check before bottling'],
    ['#/calendar', '📅', 'Calendar & reminders', 'Batch timelines, reminders, phone-calendar export'],
    ['#/cellar', '🍾', 'Cellar', 'Bottles ready to drink, conditioning, "drank one"'],
    ['#/shop', '🛒', 'Shopping list', 'Ingredients from recipes, tick off in the shop'],
    ['#/start', '🌱', 'Find your first brew', '5-question beginner quiz'],
    ['#/paths', '🪜', 'Skill ladders', 'Every drink, super easy → expert'],
    ['#/juice', '🧃', 'Shop-juice brewing', 'Juice wizard, label checker, levels'],
    ['#/stats', '📊', 'Your stats', 'Litres brewed, ratings, money saved'],
    ['#/calc/labels', '🏷️', 'Bottle labels', 'Design & print a sheet of labels'],
    ['#/calc/normal', '🤔', 'Is this normal?', 'Weird foam, smells, film, flat bottles'],
    ['#/calc/timer', '⏱', 'Brew-day timer', 'Mash & boil with hop alarms'],
    ['#/search', '🔍', 'Search', 'Everything in the app'],
    ['#/ref', '📚', 'Reference', 'Styles, malts, hops, yeasts, glossary'],
    ['#/app', '⚙️', 'App & settings', 'Install, notifications, backup'],
  ];
  el.innerHTML = `<div class="eyebrow">Everything</div><h1>More</h1><div class="grid">${items.map(([h, em, t, d]) => `<a class="card" href="${h}"><div style="font-size:28px;margin-bottom:8px">${em}</div><h3>${t}</h3><p>${d}</p></a>`).join('')}</div>`;
}

/* ---------- Global handlers ---------- */
document.addEventListener('click', async e => {
  const s = e.target.closest('[data-share]');
  if (s) {
    const url = s.dataset.share, title = s.dataset.title || 'Brew Lab';
    if (navigator.share) navigator.share({ title, url }).catch(() => {});
    else { await navigator.clipboard?.writeText(url); toast('Link copied'); }
  }
  const a = e.target.closest('[data-addshop]');
  if (a) { const r = Recipes.find(x => x.id === a.dataset.addshop); addToShop(recipeLines(r, store.get('scale.' + r.id, r.baseL)), r.name); }
  const al = e.target.closest('[data-addlist]');
  if (al) addToShop(JSON.parse(al.dataset.addlist), al.dataset.from || 'Juice wizard');
});
window.addEventListener('hashchange', () => setTimeout(updateDue, 0));
window.addEventListener('online', () => toast('Back online'));
window.addEventListener('offline', () => toast('Offline. Brew Lab still works'));
setTimeout(() => { updateDue(); notifyDue(); }, 0);
