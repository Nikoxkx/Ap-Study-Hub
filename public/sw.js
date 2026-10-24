/* AP Study Hub offline worker. Same-origin pages and assets only; opt-in video and sync requests bypass this worker. */
const PAGES = "aps-study-pages-v2";
const ASSETS = "aps-study-assets-v2";
const CORE = ["/", "/study", "/manifest.webmanifest", "/pwa-icon/192", "/pwa-icon/512", "/og-image.png", "/social-preview.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(PAGES).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith("aps-study-") && ![PAGES, ASSETS].includes(key)).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

async function networkFirst(request) {
  const cache = await caches.open(PAGES);
  try {
    const response = await fetch(request);
    if (response.ok && response.type === "basic") await cache.put(request, response.clone());
    return response;
  } catch {
    const exact = await cache.match(request);
    if (exact) return exact;
    const url = new URL(request.url);
    const pathMatch = await cache.match(url.pathname);
    if (pathMatch) return pathMatch;
    if (request.mode === "navigate") {
      const home = await cache.match("/");
      if (home) return home;
    }
    return new Response("This page is not in the offline pack yet.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(ASSETS);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok && response.type === "basic") await cache.put(request, response.clone());
  return response;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/") || url.pathname === "/sw.js") return;
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/fonts/") || url.pathname.startsWith("/pwa-icon/") || url.pathname === "/icon" || url.pathname === "/apple-icon" || url.pathname === "/og-image.png" || url.pathname === "/social-preview.png") {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});
