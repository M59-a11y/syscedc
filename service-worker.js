const CACHE_NAME = 'syscedc-v1';
const FILES = [
  './syscedc_laudos_v0_3_9_12_corrigido.html',
  './extrator_cadsus_definitivo_v3_corrigido.html',
  './index_principal_cedc_final_v3_corrigido.html',
  './financeiro.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './cedc.ico'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(FILES);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE_NAME; })
            .map(function(k){ return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request).then(function(cached){
      return cached || fetch(e.request);
    })
  );
});
