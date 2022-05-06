importScripts('./ngsw-worker.js');
(function () {
    'use strict';
    self.addEventListener('notificationclick', event => {
        event.notification.close();
        event.waitUntil(
            clients.matchAll().then(matchedClients => {
                try {
                    for (let client of matchedClients) {
                        if (client) {
                            if ('navigate' in client) {
                                if (event.notification.data.url)
                                    client.navigate(event.notification.data.url);
                            }
                            return client.focus();
                        }
                    }
                    if (event.notification.data.url) return clients.openWindow(event.notification.data.url);
                    return clients.openWindow("/");
                } catch (error) {
                    console.log(error);
                }

            })
        );
    });
}());