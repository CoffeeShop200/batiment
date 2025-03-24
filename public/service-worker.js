
const CACHE_NAME = "pwa-assets-v2";
const CACHES_FILES = ["/pwa-pokemon/public/","/pwa-pokemon/styles/style.css",
  "/pwa-pokemon/src/app.js","/pwa-pokemon/src/db.js"
];

self.addEventListener('install', event => {
    console.log('Service Worker installé');
    // Ajouter ici la mise en cache des fichiers statiques
    caches.open(CACHE_NAME)
    .then(cache => {
      cache.addAll(CACHES_FILES);
    });
    
    
});

self.addEventListener('fetch', event => {
    console.log('Intercepting fetch request for:', event.request.url);
    // Ajouter ici une stratégie de mise en cache
    event.respondWith(
        caches.match(event.request)
        .then(cachedResponse => {
          // On met à jour le cache pour une future utilisation
            return cachedResponse || fetch(event.request);
        }
      )
     )   
});

self.addEventListener('push', event => {
    console.log('Notification push reçue');
    // Ajouter ici la gestion des notifications push
});
