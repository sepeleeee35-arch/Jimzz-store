// Jimzz Store cache reset worker
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', async () => {
  try {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
  } catch (e) {}
  await self.registration.unregister();
  const clients = await self.clients.matchAll({ type: 'window' });
  for (const client of clients) client.navigate(client.url);
});
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
