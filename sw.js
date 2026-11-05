// Bump this whenever css/js/html change in a way that must reach users
// right away — it busts the precache and drops old runtime entries.
const CACHE_VERSION = "v2";
const SHELL_CACHE = `culto-amigo-shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `culto-amigo-runtime-${CACHE_VERSION}`;

const SHELL_FILES = [
  "/index.html",
  "/louvores.html",
  "/player.html",
  "/tema.html",
  "/pregacao.html",
  "/convite.html",
  "/css/style.css",
  "/css/tokens.css",
  "/data/conteudo.js",
  "/js/nav.js",
  "/js/reveal.js",
  "/js/home.js",
  "/js/louvores.js",
  "/js/player.js",
  "/js/pagina-conteudo.js",
  "/js/disc.js",
  "/js/pwa.js",
  "/manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== SHELL_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== location.origin) return;

  // app shell (html/css/js/data): stale-while-revalidate, so updates reach
  // users on the next load without ever leaving them with nothing offline
  if (SHELL_FILES.includes(url.pathname) || url.pathname === "/") {
    event.respondWith(staleWhileRevalidate(request, SHELL_CACHE));
    return;
  }

  // hymn audio, covers, icons: cache on first listen/view, then offline
  if (
    url.pathname.startsWith("/assets/audio/") ||
    url.pathname.startsWith("/assets/img/") ||
    url.pathname.startsWith("/assets/icons/")
  ) {
    event.respondWith(cacheFirst(request, RUNTIME_CACHE));
  }
});

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);
  return cached || network;
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (e) {
    return cached;
  }
}
