/* AP Study Hub offline worker. Same-origin pages and assets only; YouTube thumbnails, opt-in player frames, and sync requests bypass this worker. */
const PAGES = "aps-study-pages-v7";
const ASSETS = "aps-study-assets-v7";
const CORE = ["/", "/study", "/videos", "/integrations", "/manifest.webmanifest", "/pwa-icon/192", "/pwa-icon/512", "/og-image.png", "/social-preview.png"];

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

/**
 * Stale-while-revalidate for artwork.
 *
 * Marks and wallpapers are redrawn from time to time. Serving them cache-first
 * meant a student who had visited before kept the old drawing forever; this
 * returns the cached copy immediately and refreshes it for the next visit.
 */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(ASSETS);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok && response.type === "basic") cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);
  return cached ?? network;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/") || url.pathname === "/sw.js") return;
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(networkFirst(request));
  } else if (url.pathname.startsWith("/fonts/") || url.pathname.startsWith("/icons/") || url.pathname.startsWith("/bg-") || url.pathname.startsWith("/pwa-icon/") || url.pathname === "/icon" || url.pathname === "/apple-icon" || url.pathname === "/og-image.png" || url.pathname === "/social-preview.png") {
    event.respondWith(staleWhileRevalidate(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});
