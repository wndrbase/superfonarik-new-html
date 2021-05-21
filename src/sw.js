const CACHE = 'v1';

console.log(CACHE);

self.addEventListener('install', event => {
  console.log('!!! Установлен');
  event.waitUntil(
    onInstall(event)
     .then( () => self.skipWaiting() )
  );
  //skipWaiting вызовет activate немедленно.
});

self.addEventListener('activate', event => {
  console.log('activate, удаляем старый кеш ', CACHE);
  event.waitUntil(
    onActivate(event)
     .then( () => self.clients.claim() )
  );
  // clients.claim включит сервис-воркер немедленно.
});

// при событии fetch, используем кэш, и только потом обновляем его данным с сервера
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const method = event.request.method;
   // при каких условиях используем кеш
  if (
        method === 'GET' &&
        url.origin === self.location.origin &&
        /js|css|otf|woff2|jpg|webp|png|svg/i.test(url.pathname) === true
    ) {

      console.log(CACHE, url.pathname);

      // Мы используем `respondWith()`, чтобы мгновенно ответить без ожидания ответа с сервера.
      event.respondWith(onCache(event.request));
      // `waitUntil()` нужен, чтобы предотвратить прекращение работы worker'a до того как кэш обновиться.
      event.waitUntil(onUpdate(event.request));

    }

});

const onInstall = () => {
    return caches.open(CACHE)
      .then(cache => cache.addAll([
        '/fonts/Hermes.otf',
        '/img/logo.svg'
      ])
    );
}

const onActivate = () => {
    return caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key =>  key !== CACHE)
            .map(key => caches.delete(key))
      );
    })
}

const onCache = request => {
    const acceptHeader = request.headers.get('Accept');
    let resourceType = 'static';
    if (acceptHeader.indexOf('text/html') !== -1) {
      resourceType = 'content';
    } else if (acceptHeader.indexOf('image') !== -1) {
      resourceType = 'image';
    }
    return caches.match(request).then((resp) => {
      return resp || fetch(request).then((response) => {
        return caches.open(CACHE).then((cache) => {
          if (response.ok) { // в данном случае он и так всгда оk
            cache.put(request, response.clone());
          }
          return response;
        });
      });
    });
}

const onUpdate = request => {
    return caches.open(CACHE).then((cache) =>
        fetch(request).then((response) => {
          if (response.ok) {
            cache.put(request, response);
          }
          else if (response.status === 404){
            cache.delete(response.url);
          }
        })
    );
}