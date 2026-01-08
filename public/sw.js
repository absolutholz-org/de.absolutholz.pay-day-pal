const CACHE_NAME = "payday-pal-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/styles.css", // Replace with your actual CSS file
  "/app.js", // Replace with your actual JS file
  "/web-app-manifest-192x192.png",
  "/web-app-manifest-512x512.png",
];

// 1. Install Event: Cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching all: app shell and content");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Activate Event: Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. Fetch Event: Serve from Cache, fall back to Network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }
      // Clone the request because it's a stream and can only be consumed once
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
