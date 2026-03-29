const NOMBRE_CAJA = 'lumina-cache-v2.1';
const APP_SHELL = './index.html';

const archivosParaGuardar = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './Biblia_Catolica_Completa.json',
  './Catena_Aurea_Completa.json',
  './paperflip.wav'
];

self.addEventListener('install', evento => {
  self.skipWaiting(); // activar inmediatamente
  evento.waitUntil(
    caches.open(NOMBRE_CAJA)
      .then(caja => {
        console.log('Guardando archivos para usar sin internet...');
        return caja.addAll(archivosParaGuardar);
      })
      .catch(error => console.error('Error al cachear archivos:', error))
  );
});

self.addEventListener('activate', evento => {
  evento.waitUntil(
    caches.keys().then(nombres => {
      return Promise.all(
        nombres.map(nombre => {
          if (nombre !== NOMBRE_CAJA) {
            console.log('Tirando fotocopias viejas de:', nombre);
            return caches.delete(nombre);
          }
        })
      );
    }).then(() => {
      // tomar control de las pestañas abiertas
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', evento => {
  if (evento.request.mode === 'navigate') {
    evento.respondWith(
      fetch(evento.request).catch(() => caches.match(APP_SHELL))
    );
    return;
  }

  evento.respondWith(
    caches.match(evento.request).then(respuestaCache => {
      return respuestaCache || fetch(evento.request);
    })
  );
});
