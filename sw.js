const CACHE_NAME = 'a6-planner-v5'; 
const TIMEOUT_MS = 3000; // 3 Seconds Timeout

const ASSETS = [
  './',
  './index.html',
  './timetable.js',
  './manifest.json',
  './Logo.png'
];

// 1. INSTALL
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 2. ACTIVATE (Cleanup)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
  self.clients.claim();
});

// 3. FETCH (The Race Logic)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Create a promise that rejects after 3 seconds
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Network timed out'));
    }, TIMEOUT_MS);
  });

  event.respondWith(
    // Race the Network vs The Timer
    Promise.race([fetch(event.request), timeoutPromise])
      .then((networkResponse) => {
        // NETWORK WON & IS GOOD
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return networkResponse;
      })
      .catch(() => {
        // NETWORK FAILED OR TIMED OUT -> USE CACHE
        console.log('[SW] Network failed or too slow, using Cache');
        return caches.match(event.request);
      })
  );
});
