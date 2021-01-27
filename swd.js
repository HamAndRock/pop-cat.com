importScripts('/cache-polyfill.js');

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('cat').then(cache => {
            return cache.addAll([
                `/`,
                `/index.html`,
                `/close.png`,
                `/open.png`,
                `/sound.mp3`,
            ])
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
