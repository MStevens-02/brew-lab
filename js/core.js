/* Brew Lab — shared helpers, icons and the calculator form engine. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = {
  get(k, d) { try { const v = localStorage.getItem('bl.' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('bl.' + k, JSON.stringify(v)); } catch (e) { /* private mode */ } },
};
const fmt = (n, d = 1) => (isFinite(n) ? Number(n).toLocaleString('en-GB', { minimumFractionDigits: d, maximumFractionDigits: d }) : '—');
const sgf = n => (isFinite(n) ? Number(n).toFixed(3) : '—');
const stat = (l, v, u = '', s = '', cls = '') =>
  `<div class="stat ${cls}"><div class="stat-l">${l}</div><div class="stat-v">${v}${u ? `<small>${u}</small>` : ''}</div>${s ? `<div class="stat-s">${s}</div>` : ''}</div>`;
const today = () => new Date().toISOString().slice(0, 10);
const addDays = (iso, d) => { const t = new Date(iso + 'T12:00:00'); t.setDate(t.getDate() + d); return t.toISOString().slice(0, 10); };
const nice = iso => { try { return new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }); } catch (e) { return iso; } };
const daysBetween = (a, b) => Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 86400000);
function toast(msg) {
  $$('.toast').forEach(x => x.remove());
  const t = document.createElement('div'); t.className = 'toast fade-in'; t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 2400);
}
const DRINK = {
  beer:  { c: 'var(--amber)', em: '🍺', name: 'Beer' },
  wine:  { c: 'var(--wine)', em: '🍷', name: 'Wine' },
  cider: { c: 'var(--cider)', em: '🍏', name: 'Cider' },
  mead:  { c: 'var(--mead)', em: '🍯', name: 'Mead' },
  other: { c: 'var(--other)', em: '🫚', name: 'Other brews' },
  all:   { c: 'var(--hop)', em: '📘', name: 'All drinks' },
};

/* Icons (stroke, 24px) */
const I = {};
const ico = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
Object.assign(I, {
  home: ico('<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>'),
  book: ico('<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>'),
  calc: ico('<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15v3M8 18h4"/>'),
  flask: ico('<path d="M9 2h6M10 2v6L4.5 18.5A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.8-2.5L14 8V2"/><path d="M7 15h10"/>'),
  log: ico('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>'),
  ref: ico('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),
  drop: ico('<path d="M12 2.7l5.7 5.6a8 8 0 1 1-11.3 0z"/>'),
  percent: ico('<path d="M19 5L5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>'),
  sugar: ico('<rect x="4" y="9" width="8" height="8" rx="1"/><rect x="12" y="5" width="8" height="8" rx="1"/><path d="M8 17v4h8"/>'),
  bubbles: ico('<circle cx="8" cy="16" r="4"/><circle cx="16" cy="8" r="3"/><circle cx="17" cy="17" r="2"/><circle cx="9" cy="5" r="1.5"/>'),
  keg: ico('<rect x="5" y="3" width="14" height="18" rx="3"/><path d="M5 8h14M5 16h14M10 3V1h4v2"/>'),
  therm: ico('<path d="M14 14.8V4a2 2 0 0 0-4 0v10.8a4 4 0 1 0 4 0z"/>'),
  prism: ico('<path d="M12 3l9 16H3z"/><path d="M12 3v16"/>'),
  hop: ico('<path d="M12 2c3 2 5 5 5 9s-2 8-5 11c-3-3-5-7-5-11s2-7 5-9z"/><path d="M7 9c2 1 8 1 10 0M7 14c2 1 8 1 10 0"/>'),
  pot: ico('<path d="M3 8h18M5 8v10a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8"/><path d="M8 4c0 1 1 1 1 2M12 3c0 1 1 1 1 2M16 4c0 1 1 1 1 2"/>'),
  yeast: ico('<circle cx="9" cy="10" r="5"/><circle cx="16" cy="15" r="4"/><circle cx="17.5" cy="6" r="2"/>'),
  mix: ico('<path d="M6 3v6l-3 9a2 2 0 0 0 2 3h4l1-3M18 3v6l3 9a2 2 0 0 1-2 3h-4l-1-3"/><path d="M5 3h4M15 3h4"/>'),
  honey: ico('<path d="M12 2l4 2.5v5L12 12 8 9.5v-5z"/><path d="M8 12l4 2.5v5L8 22l-4-2.5v-5zM16 12l4 2.5v5L16 22l-4-2.5"/>'),
  candy: ico('<path d="M9 9l6 6"/><rect x="7" y="7" width="10" height="10" rx="5" transform="rotate(45 12 12)"/><path d="M4 4l2 4-2 0zM20 20l-2-4 2 0z"/>'),
  swap: ico('<path d="M7 3L3 7l4 4M3 7h14M17 21l4-4-4-4M21 17H7"/>'),
  pint: ico('<path d="M6 3h12l-1.5 17a1.5 1.5 0 0 1-1.5 1.5H9a1.5 1.5 0 0 1-1.5-1.5z"/><path d="M6.4 8h11.2"/>'),
  timer: ico('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/>'),
  ladder: ico('<path d="M7 2v20M17 2v20M7 6h10M7 11h10M7 16h10"/>'),
  cal: ico('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
  cart: ico('<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12h11L21 7H6.2"/>'),
  bottle: ico('<path d="M10 2h4v4l2 3v12a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9l2-3z"/><path d="M8 13h8"/>'),
  gear: ico('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>'),
  menu: ico('<path d="M4 6h16M4 12h16M4 18h16"/>'),
  chart: ico('<path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/>'),
  library: ico('<path d="M4 4h4v16H4zM10 4h4v16h-4z"/><path d="M16.5 4.5l3.8 1-4 15-3.8-1z"/>'),
  bell: ico('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>'),
  plus: ico('<path d="M12 5v14M5 12h14"/>'),
  trash: ico('<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/>'),
  arrowL: ico('<path d="M15 18l-6-6 6-6"/>'),
});
let _uid = 0; const uid = () => 'u' + (++_uid);
const LOGO = () => { const g = uid(); return `<svg viewBox="0 0 40 40"><defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd27a"/><stop offset="1" stop-color="#e08a10"/></linearGradient></defs>
<path d="M11 7h18l-2.4 26.5A3 3 0 0 1 23.6 36h-7.2a3 3 0 0 1-3-2.5z" fill="url(#${g})"/><path d="M10 6.5c1-3 4-4 6-3 1.5-2.5 6-2.5 7.5 0 2-1 5.5 0 6 3 .3 1.6-.7 3-2.3 3H12.3c-1.6 0-2.7-1.4-2.3-3z" fill="#fff6e6"/>
<circle cx="18" cy="22" r="1.4" fill="#fff6e6" opacity=".8"/><circle cx="22.5" cy="27" r="1" fill="#fff6e6" opacity=".7"/><circle cx="20" cy="16" r=".9" fill="#fff6e6" opacity=".7"/></svg>`; };

/* ---------- Calculator registry & form engine ----------
   Field spec: { k, l, t:'num'|'sel'|'date'|'text', v, step, min, u, o:[[value,label,setObj?]], show:(vals)=>bool, hint, wide } */
window.Calcs = [];
const defCalc = o => window.Calcs.push(o);
const qparams = () => Object.fromEntries(new URLSearchParams((location.hash.split('?')[1] || '')));

function fieldHTML(f, val) {
  const id = 'f_' + f.k;
  let input;
  if (f.t === 'sel') {
    input = `<select id="${id}" data-k="${f.k}">${f.o.map(([v, l]) => `<option value="${esc(v)}"${String(v) === String(val) ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select>`;
  } else {
    const type = f.t === 'date' ? 'date' : f.t === 'text' ? 'text' : 'number';
    input = `<input id="${id}" data-k="${f.k}" type="${type}" ${type === 'number' ? `inputmode="decimal" step="${f.step ?? 'any'}"` : ''} ${f.min != null ? `min="${f.min}"` : ''} value="${esc(val)}" class="${f.u ? 'has-u' : ''}">`;
  }
  return `<div class="field ${f.wide ? 'wide' : ''}" data-f="${f.k}"><label for="${id}">${f.l}</label><div class="inp">${input}${f.u ? `<span class="u">${f.u}</span>` : ''}</div>${f.hint ? `<div class="hint">${f.hint}</div>` : ''}</div>`;
}

/* Renders inputs into `formEl`, results into `outEl`. Remembers values per calculator. */
function mountForm(id, formEl, outEl, fields, compute) {
  const saved = store.get('calc.' + id, {});
  const qp = qparams();
  const vals = {};
  for (const f of fields) vals[f.k] = qp[f.k] ?? saved[f.k] ?? f.v;
  formEl.innerHTML = `<div class="fields">${fields.map(f => fieldHTML(f, vals[f.k])).join('')}</div>`;
  const read = () => {
    const v = {};
    for (const f of fields) {
      const el = formEl.querySelector(`[data-k="${f.k}"]`);
      v[f.k] = (f.t === 'num' || !f.t) ? parseFloat(el.value) : el.value;
    }
    return v;
  };
  const update = () => {
    const v = read();
    for (const f of fields) if (f.show) formEl.querySelector(`[data-f="${f.k}"]`).style.display = f.show(v) ? '' : 'none';
    const raw = {}; for (const f of fields) raw[f.k] = formEl.querySelector(`[data-k="${f.k}"]`).value;
    store.set('calc.' + id, raw);
    try { outEl.innerHTML = compute(v); } catch (e) { outEl.innerHTML = `<div class="note">Check your inputs.</div>`; console.error(e); }
  };
  formEl.addEventListener('input', update);
  formEl.addEventListener('change', e => {
    const f = fields.find(x => x.k === e.target.dataset.k);
    if (f && f.t === 'sel') {
      const opt = f.o.find(o => String(o[0]) === e.target.value);
      if (opt && opt[2]) for (const [k, v] of Object.entries(opt[2])) { const el = formEl.querySelector(`[data-k="${k}"]`); if (el) el.value = v; }
    }
    update();
  });
  update();
  return { read, update };
}

/* simple segmented control */
function seg(el, options, value, onChange) {
  el.innerHTML = `<div class="seg">${options.map(([v, l]) => `<button type="button" data-v="${v}" class="${v === value ? 'on' : ''}">${l}</button>`).join('')}</div>`;
  el.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', el).forEach(x => x.classList.toggle('on', x === b));
    onChange(b.dataset.v);
  });
}
