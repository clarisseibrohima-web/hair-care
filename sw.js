self.addEventListener('install', event => {
  console.log('Service Worker installé');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker activé');
});

// Écouter les notifications push (avec un serveur push, mais ici on peut tester simple)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'check-rappels') {
    event.waitUntil(
      // Ici tu peux vérifier les rappels stockés et envoyer des notifications
      self.registration.showNotification("🧴 Rappel de soin", {
        body: "N'oublie pas ton soin aujourd'hui !",
        icon: "icon.png"
      })
    );
  }
});

