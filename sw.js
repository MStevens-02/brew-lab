// Brew Lab service worker: network first, cache fallback so it works offline (e.g. in the garage on brew day).
const CACHE = 'brew-lab-v11';
const FILES = ['./', 'index.html', 'css/style.css', 'icon.svg', 'manifest.webmanifest',
  'js/calc.js', 'js/data.js', 'js/guides.js', 'js/recipes.js', 'js/core.js', 'js/calcs.js', 'js/tools.js', 'js/juice.js', 'js/paths.js', 'js/beginner.js', 'js/extras.js', 'js/more.js', 'js/coach.js', 'js/school.js', 'js/starch.js', 'js/history.js', 'js/distilhist.js', 'js/planner.js', 'js/app.js', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== 'brewlab-data').map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r;
  }).catch(() => caches.match(e.request)));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const href = (e.notification.data && e.notification.data.href) || '#/inbox';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    for (const c of cs) { if ('focus' in c) { c.navigate('./' + href); return c.focus(); } }
    return self.clients.openWindow('./' + href);
  }));
});

// Background check (Chrome on Android, installed app): notify about batch tasks due today,
// using the schedule the app saved into the cache.
async function backgroundCheck() {
  const c = await caches.open('brewlab-data');
  const sr = await c.match('schedule.json'); if (!sr) return;
  const sched = await sr.json(); if (!sched.enabled) return;
  const now = new Date(); if (now.getHours() < (sched.hour || 8)) return;
  const today = now.toISOString().slice(0, 10);
  const nr = await c.match('notified.json'); const sent = nr ? await nr.json() : [];
  const due = sched.events.filter(e => e.date <= today && !sent.includes(e.key));
  for (const e of due.slice(0, 4)) {
    await self.registration.showNotification(e.kind === 'reminder' ? '⏰ ' + e.text : e.kind === 'ready' ? '🍻 ' + e.text : '📅 ' + e.text,
      { body: 'Brew Lab', icon: 'icon-192.png', badge: 'icon-192.png', tag: e.key, data: { href: e.href || '#/calendar' } });
    sent.push(e.key);
  }
  if (due.length > 4) await self.registration.showNotification(`Brew Lab: ${due.length - 4} more things due`, { icon: 'icon-192.png', data: { href: '#/calendar' } });
  due.forEach(e => { if (!sent.includes(e.key)) sent.push(e.key); });
  await c.put('notified.json', new Response(JSON.stringify(sent.slice(-300))));
}
self.addEventListener('periodicsync', e => { if (e.tag === 'brewlab-daily') e.waitUntil(backgroundCheck()); });
