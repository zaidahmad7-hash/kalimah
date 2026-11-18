// MyQuranApp offline support.
// App page: network first, so updates arrive. Surah data, fonts and icons: cache first, so reading works offline.
const CACHE = 'kalimah-v16';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'apple-touch-icon.png?v=3', 'favicon.png?v=3', 'icon-192.png', 'data/1.json', 'fonts/amiri-quran.woff2', 'fonts/amiri.woff2', 'fonts/nastaliq.woff2', 'fonts/indopak.woff2', 'fonts/hafs.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const put = (req, res) => { if (res && (res.ok || res.type === 'opaque')) { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return res; };

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;

  // Audio streams straight from the reciter's server.
  if (req.destination === 'audio' || url.pathname.endsWith('.mp3')) return;

  if (sameOrigin && (req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('index.html'))) {
    e.respondWith(fetch(req, { cache: 'no-cache' }).then(r => put(req, r)).catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
    return;
  }

  if (sameOrigin || url.hostname.endsWith('googleapis.com') || url.hostname.endsWith('gstatic.com')) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => put(req, r))));
  }
});
