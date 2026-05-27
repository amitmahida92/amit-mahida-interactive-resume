const CACHE_NAME = "amit-mahida-resume-2026-05-27";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./Amit_Mahida_FullStack_Architect.pdf",
  "./amit-mahida-profile.jpeg",
  "./favicon.svg",
  "./pwa-icon-192.png",
  "./pwa-icon-512.png",
];

const scopedUrl = (path) => new URL(path, self.registration.scope).toString();

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS.map(scopedUrl)))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(scopedUrl("./"), copy);
          });
          return response;
        })
        .catch(async () => {
          const cachedRequest = await caches.match(request);
          const cachedShell = await caches.match(scopedUrl("./"));
          const cachedIndex = await caches.match(scopedUrl("./index.html"));
          return cachedRequest || cachedShell || cachedIndex;
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const fresh = fetch(request)
        .then((response) => {
          if (response.ok || response.type === "opaque") {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, copy);
            });
          }
          return response;
        })
        .catch(() => cached);

      return cached || fresh;
    })
  );
});
