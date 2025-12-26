const CACHE_NAME = "tt-cache-v1";
// List all files you want to work offline (HTML, CSS, JS, Images)
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/timetable_data.json" 
];

// 1. Install Event: Caches the files when the site is first visited
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching assets...");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Fetch Event: The "Offline First" Logic
self.addEventListener("fetch", (event) => {
  event.respondWith(
    // Check if the requested file is in the cache
    caches.match(event.request).then((cachedResponse) => {
      // If found in cache, return it (No Internet Needed!)
      if (cachedResponse) {
        return cachedResponse;
      }
      // If not in cache, try to get it from the internet
      return fetch(event.request);
    })
  );
});
