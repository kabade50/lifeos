// Life OS — self-destructing service worker.
// Purpose: permanently remove old cached builds so the latest deploy always runs.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((c) => { try { c.navigate(c.url); } catch (_) {} });
    } catch (_) {}
  })());
});
// Always go to network; never serve a cached app shell.
self.addEventListener('fetch', () => {});
