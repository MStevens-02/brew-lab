// Brew Lab service worker: network first, cache fallback so it works offline (e.g. in the garage on brew day).
const CACHE = 'brew-lab-v5';
const FILES = ['./', 'index.html', 'css/style.css', 'icon.svg', 'manifest.webmanifest',
  'js/calc.js', 'js/data.js', 'js/guides.js', 'js/recipes.js', 'js/core.js', 'js/calcs.js', 'js/tools.js', 'js/juice.js', 'js/paths.js', 'js/beginner.js', 'js/extras.js', 'js/app.js', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
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
  e.waitUntil(self.clients.matchAll({ type: 'window' }).then(cs => {
    for (const c of cs) { if ('focus' in c) { c.navigate('./#/calendar'); return c.focus(); } }
    return self.clients.openWindow('./#/calendar');
  }));
});
