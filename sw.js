const CACHE_NAME = 'a6-planner-v35'; // Bump Version
const TIMEOUT_MS = 1000; // 1 Second Timeout

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './Logo.png',
  './js/app.js',
  './js/data.js',
  './js/utils.js',
  './css/styles.css'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;
  const url = new URL(event.request.url);
  
  // FIX OLD PWA INSTALLS
  if (url.pathname.startsWith('/TT-planner/')) {
      const newUrl = event.request.url.replace('/TT-planner/', '/');
      event.respondWith(Response.redirect(newUrl, 301));
      return;
  }
  
  const isDataFile = url.pathname.endsWith('data.js');

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      
      // 1. Prepare CLEAN Request (For Cache Key)
      // We strip extra parameters so the cache always finds the file
      const cleanUrl = new URL(event.request.url);
      cleanUrl.search = '';
      const cleanRequest = new Request(cleanUrl);

      // 2. Network Promise (With Cache Buster & Crash Protection)
      const networkPromise = (async () => {
          try {
              let fetchReq;
              if (isDataFile) {
                  const networkUrl = new URL(event.request.url);
                  networkUrl.searchParams.set('sb', Date.now());
                  fetchReq = new Request(networkUrl, { cache: 'no-store' });
              } else {
                  fetchReq = event.request;
              }
              
              const response = await fetch(fetchReq);
              if (response && (response.ok || response.type === 'opaque')) {
                  return response;
              }
          } catch(e) { /* Ignore offline errors */ }
          return null;
      })();

      // 3. Timeout Promise
      const timeoutPromise = new Promise(resolve => 
          setTimeout(() => resolve('TIMEOUT'), TIMEOUT_MS)
      );

      // 4. Get Cache
      const cachedResponse = await cache.match(cleanRequest);

      // --- THE RACE ---
      let winner;
      try {
          if (!cachedResponse) {
              // FIRST VISIT: Must wait for network (No racing to avoid crash)
              winner = await networkPromise;
          } else {
              // RETURN VISIT: Race Network vs Timeout
              winner = await Promise.race([networkPromise, timeoutPromise]);
          }
      } catch (e) {
          winner = 'TIMEOUT';
      }

      // SCENARIO A: Network Won (Fresh Data!)
      if (winner && winner !== 'TIMEOUT') {
          await cache.put(cleanRequest, winner.clone());
          return winner;
      }

      // SCENARIO B: Timeout Won OR Network Failed -> Serve Cache
      if (cachedResponse) {
          // Update in background if it's the data file
          if (isDataFile) {
              event.waitUntil(
                  updateInBackground(networkPromise, cache, cleanRequest, cachedResponse)
              );
          }
          return cachedResponse;
      }
      
      // SCENARIO C: First Visit + Offline (Prevent Crash)
      const fallbackResponse = await networkPromise;
      if (fallbackResponse) return fallbackResponse;
      return new Response('Offline and no cache', { status: 503 });
    })()
  );
});

async function updateInBackground(networkPromise, cache, cleanRequest, oldResponse) {
    try {
        const networkResponse = await networkPromise;
        if (!networkResponse) return;
        
        const oldText = await oldResponse.text();
        const newText = await networkResponse.clone().text();

        // Update Cache
        await cache.put(cleanRequest, networkResponse.clone());

        // Notify if changed
        if (oldText !== newText) {
            console.log("[SW] Update Detected. Notifying clients...");
            notifyClients(newText);
        }
    } catch (err) { /* Silent fail */ }
}

async function notifyClients(newText) {
  // FIX: Include uncontrolled clients so "Rename Trick" works instantly
  const clients = await self.clients.matchAll({ includeUncontrolled: true, type: 'window' });
  clients.forEach(client => {
    client.postMessage({ type: 'UPDATE_AVAILABLE', payload: newText });
  });
}
