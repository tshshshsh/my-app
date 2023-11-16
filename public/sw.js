//public/sw.js
self.addEventListener("install", function (event) {
    console.log("Hello world from the Service Worker 🤙");
});

// Register event listener for the 'push' event.
self.addEventListener('push', function (event) {
    // Retrieve the textual payload from event.data (a PushMessageData object).
    // Other formats are supported (ArrayBuffer, Blob, JSON), check out the documentation
    // on https://developer.mozilla.org/en-US/docs/Web/API/PushMessageData.
    const payload = event.data ? event.data.text() : 'no payload';

    // Keep the service worker alive until the notification is created.
    event.waitUntil(
        // Show a notification with title 'ServiceWorker Cookbook' and use the payload
        // as the body.
        self.registration.showNotification('Message for you', {
            body: payload,
        })
    );
});

// self.addEventListener('notificationclick', function (event) {
//     event.notification.close()
//     event.waitUntil(
//         clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
//             if (clientList.length > 0) {
//                 let client = clientList[0]
//                 for (let i = 0; i < clientList.length; i++) {
//                     if (clientList[i].focused) {
//                         client = clientList[i]
//                     }
//                 }
//                 return client.focus()
//             }
//             return clients.openWindow('/')
//         })
//     )
// })