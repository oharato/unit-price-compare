const CACHE_VERSION = 'v2';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.filter(n => n !== CACHE_VERSION).map(n => caches.delete(n))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", function (event) {});

