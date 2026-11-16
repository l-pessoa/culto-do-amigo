// Bump this whenever css/js/html change in a way that must reach users
// right away — it busts the precache and drops old runtime entries.
const CACHE_VERSION = "v3";
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
  "/css/convite.css",
  "/data/conteudo.js",
  "/js/nav.js",
  "/js/reveal.js",
  "/js/home.js",
  "/js/louvores.js",
  "/js/player.js",
  "/js/pagina-conteudo.js",
  "/js/convite-carrossel.js",
  "/js/convite-musica.js",
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

  // app shell (html/css/js/data): network-first, so updates reach users on
  // the first open; the cache only answers when offline or the net is slow
  if (SHELL_FILES.includes(url.pathname) || url.pathname === "/") {
    event.respondWith(networkFirst(request, url));
    return;
  }

  // hymn audio: cache-first with Range support (needed offline and on iOS)
  if (url.pathname.startsWith("/assets/audio/")) {
    event.respondWith(audioResponse(request, event, url));
    return;
  }

  // covers, icons: cache on first view, then offline
  if (
    url.pathname.startsWith("/assets/img/") ||
    url.pathname.startsWith("/assets/icons/")
  ) {
    event.respondWith(cacheFirst(request, RUNTIME_CACHE));
  }
});

const NETWORK_TIMEOUT_MS = 3000;

// cached under the bare pathname, so player.html?hino=x all share one entry
function shellKey(url) {
  return url.pathname === "/" ? "/index.html" : url.pathname;
}

async function networkFirst(request, url) {
  const cache = await caches.open(SHELL_CACHE);
  const key = shellKey(url);
  const cached = await cache.match(key);

  // no-cache: revalidate, so the browser HTTP cache can't hand back a stale copy
  const network = fetch(request, { cache: "no-cache" }).then((response) => {
    if (response.status === 200) cache.put(key, response.clone());
    return response;
  });

  if (!cached) return network;
  const timeout = new Promise((resolve) => setTimeout(() => resolve(cached), NETWORK_TIMEOUT_MS));
  // a failed or slow fetch falls back to the cache; a late response still refreshes it
  return Promise.race([network.catch(() => cached), timeout]);
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  // partial (206) responses can't go in the Cache API: put() throws TypeError
  if (response.status === 200) cache.put(request, response.clone());
  return response;
}

const audioFetching = new Set();

async function audioResponse(request, event, url) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(url.pathname);
  const range = request.headers.get("range");

  if (cached) return range ? sliceResponse(cached, range) : cached;

  // not cached yet: let the browser stream it as usual, and meanwhile fetch the
  // whole file (no Range) so the next listen — and offline — works
  const saveData = navigator.connection && navigator.connection.saveData;
  if (!audioFetching.has(url.pathname) && !saveData) {
    audioFetching.add(url.pathname);
    event.waitUntil(
      fetch(url.pathname)
        .then((response) => {
          if (response.status === 200) return cache.put(url.pathname, response);
        })
        .catch(() => {})
        .finally(() => audioFetching.delete(url.pathname))
    );
  }
  return fetch(request);
}

async function sliceResponse(cached, rangeHeader) {
  const buffer = await cached.arrayBuffer();
  const size = buffer.byteLength;
  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim());
  let start;
  let end;
  if (match && (match[1] || match[2])) {
    if (match[1]) {
      start = Number(match[1]);
      end = match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
    } else {
      start = Math.max(0, size - Number(match[2]));
      end = size - 1;
    }
  }
  if (start === undefined || start >= size || start > end) {
    return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
  }
  return new Response(buffer.slice(start, end + 1), {
    status: 206,
    headers: {
      "Content-Type": cached.headers.get("Content-Type") || "audio/mpeg",
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Length": String(end - start + 1),
      "Accept-Ranges": "bytes",
    },
  });
}
