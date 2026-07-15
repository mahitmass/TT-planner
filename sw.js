const CACHE_NAME = 'a6-planner-v32'; // Bump Version
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
  const url = new URL(event.request.url);
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
              const networkUrl = new URL(event.request.url);
              // Force fresh data from Vercel
              if (isDataFile) networkUrl.searchParams.set('sb', Date.now()); 
              
              const response = await fetch(networkUrl, { cache: 'no-store' });
              if (response && response.status === 200) {
                  return response;
              }
          } catch(e) { /* Ignore offline errors */ }
          throw new Error("Network Failed");
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
      if (winner !== 'TIMEOUT') {
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
      return networkPromise;
    })()
  );
});

async function updateInBackground(networkPromise, cache, cleanRequest, oldResponse) {
    try {
        const networkResponse = await networkPromise;
        
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
