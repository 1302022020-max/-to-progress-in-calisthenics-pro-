// Service worker: guarda la app para que abra sin internet.
// Si cambias archivos de la app, sube el número de versión para que los celulares se actualicen.
const VERSION = "estaticos-v9";
const SHELL = ["./", "index.html", "data.js", "poses.js", "muscles.js", "config.js", "fotos.js", "persona.json", "persona.bin", "manifest.webmanifest",
               "icons/icon-192.png", "icons/apple-touch-icon.png", "icons/icon-512.png", "icons/icon-maskable-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(hit => {
      const net = fetch(e.request).then(res => {
        if (res && (res.ok || res.type === "opaque")) {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || net;   // si ya está guardado se muestra al instante y se actualiza en segundo plano
    })
  );
});
