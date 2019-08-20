self.addEventListener('install', function(event) {
  console.log('[Servise Worker] Installing Service Worker', event);
  event.waitUntil(
    caches.open('static')
      .then(function(cache) { // make cache
        console.log('[Service Worker} Precaching');
        cache.addAll([
          '/',
          '/index.html',
          '/manifest.json',
          '/icons/144x144.png',
          '/icons/favicon.ico'
        ])
      })
  )

});

self.addEventListener('activate', function(event) {
  console.log('[Servise Worker] Activating Service Worker', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if(response) {
          return response; // get cache from Cache storage
        } else {
          return fetch(event.request) // or get request from network if Cache storage is empty
        }
      })
  );
});