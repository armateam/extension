import watch from 'redux-watch';

// ## //

export default function (store) {
    const watcher = watch(store.getState, 'channel.channel');

    return watcher((newVal, oldVal) => {
        if (newVal) {
            let status = newVal.channel.status;
            if (status.indexOf('[FR] ') === 0) {
                status = status.substring(5);
            }

            if (!oldVal) {
                chrome.notifications.create('armateam.notification', {
                    type: 'basic',
                    iconUrl: chrome.extension.getURL('images/arma-64.png'),
                    title: 'L’ArmaTeam est en ligne \\o/',
                    message: status
                });
            }

            else if (newVal.channel.status !== oldVal.channel.status) {
                chrome.notifications.create('armateam.notification', {
                    type: 'basic',
                    iconUrl: chrome.extension.getURL('images/arma-64.png'),
                    title: 'Changement de streamer sur l’ArmaTeam !',
                    message: status
                });
            }
        }
    });
}
