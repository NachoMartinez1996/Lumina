const VERSION_CACHE = '4.295.042';
const CACHE_SHELL = `lumina-shell-${VERSION_CACHE}`;
const CACHE_RUNTIME = `lumina-runtime-${VERSION_CACHE}`;
const APP_SHELL = './index.html';

const archivosShell = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './firebase-config.js',
  './Favicon/favicon.ico',
  './Favicon/favicon-32x32.png',
  './Favicon/favicon-16x16.png',
  './Favicon/apple-icon-180x180.png',
  './Favicon/android-icon-192x192.png',
  './Favicon/ms-icon-310x310.png',
  './manifest.json'
];

function esRecursoActualizable(request) {
  const url = new URL(request.url);
  const path = url.pathname.toLowerCase();

  return (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'document' ||
    path.endsWith('/index.html') ||
    path.endsWith('/script.js') ||
    path.endsWith('/firebase-config.js') ||
    path.endsWith('/style.css') ||
    path.endsWith('/manifest.json') ||
    path.endsWith('/biblia_catolica_completa.json') ||
    path.endsWith('/catena_aurea_completa.json') ||
    path.endsWith('/agustin_salmos.json')
  );
}

function obtenerCacheDestino(request) {
  const url = new URL(request.url);
  const path = url.pathname.toLowerCase();

  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'document' ||
    path.endsWith('/index.html') ||
    path.endsWith('/script.js') ||
    path.endsWith('/firebase-config.js') ||
    path.endsWith('/style.css') ||
    path.endsWith('/manifest.json')
  ) {
    return CACHE_SHELL;
  }

  return CACHE_RUNTIME;
}

function esSolicitudHttp(request) {
  const url = new URL(request.url);
  return url.protocol === 'http:' || url.protocol === 'https:';
}

function esRespuestaCacheable(response) {
  return !!response && (response.ok || response.type === 'opaque');
}

async function guardarRespuesta(cacheName, request, response) {
  if (!esRespuestaCacheable(response)) return response;

  const cache = await caches.open(cacheName);
  await cache.put(request, response.clone());
  return response;
}

async function obtenerShellOffline() {
  return (
    await caches.match(APP_SHELL, { ignoreSearch: true }) ||
    await caches.match('./', { ignoreSearch: true })
  );
}

function crearRespuestaOfflineFallback() {
  return new Response(
    `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Lumina sin conexión</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #fcfaf7;
      color: #231b13;
      font-family: Georgia, serif;
      padding: 24px;
      text-align: center;
    }
    main {
      max-width: 28rem;
      padding: 24px;
      border-radius: 20px;
      border: 1px solid rgba(184, 134, 11, 0.22);
      background: rgba(255, 255, 255, 0.88);
      box-shadow: 0 18px 34px rgba(78, 60, 33, 0.08);
    }
    h1 {
      margin: 0 0 12px;
      color: #b8860b;
      font-size: 1.6rem;
    }
    p {
      margin: 0;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <main>
    <h1>Lumina</h1>
    <p>Esta vez no encontramos una copia local completa para abrir sin internet. Volvé a entrar una vez con conexión para guardar los archivos esenciales en este dispositivo.</p>
  </main>
</body>
</html>`,
    {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store'
      }
    }
  );
}

self.addEventListener('install', evento => {
  evento.waitUntil(
    caches.open(CACHE_SHELL)
      .then(cache => cache.addAll(archivosShell))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('message', evento => {
  if (evento.data && evento.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', evento => {
  evento.waitUntil(
    caches.keys()
      .then(nombres => Promise.all(
        nombres.map(nombre => {
          const esCacheLumina = nombre.startsWith('lumina-');
          const esCacheActual = nombre === CACHE_SHELL || nombre === CACHE_RUNTIME;
          if (esCacheLumina && !esCacheActual) {
            return caches.delete(nombre);
          }
          return Promise.resolve(false);
        })
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', evento => {
  const { request } = evento;

  if (request.method !== 'GET' || !esSolicitudHttp(request)) {
    return;
  }

  if (request.mode === 'navigate') {
    evento.respondWith((async () => {
      try {
        const respuestaRed = await fetch(request);
        await guardarRespuesta(CACHE_SHELL, APP_SHELL, respuestaRed.clone());
        return respuestaRed;
      } catch (error) {
        const shellOffline = await obtenerShellOffline();
        return shellOffline || crearRespuestaOfflineFallback();
      }
    })());
    return;
  }

  if (request.headers.has('range')) {
    return;
  }

  evento.respondWith((async () => {
    if (esRecursoActualizable(request)) {
      try {
        const respuestaRed = await fetch(request);
        await guardarRespuesta(obtenerCacheDestino(request), request, respuestaRed.clone());
        return respuestaRed;
      } catch (error) {
        const respuestaCache = await caches.match(request, { ignoreSearch: true });
        return respuestaCache || Response.error();
      }
    }

    const respuestaCache = await caches.match(request, { ignoreSearch: true });
    if (respuestaCache) {
      return respuestaCache;
    }

    const respuestaRed = await fetch(request);
    await guardarRespuesta(CACHE_RUNTIME, request, respuestaRed.clone());
    return respuestaRed;
  })().catch(async () => {
    const respuestaCache = await caches.match(request, { ignoreSearch: true });
    return respuestaCache || Response.error();
  }));
});
