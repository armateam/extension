import watch from 'redux-watch';

// ## //

export default function (store) {
    const watcher = watch(store.getState, 'channel.channel');

    return watcher((newVal, oldVal) => {
        if (newVal) {
            if (!oldVal) {
                chrome.notifications.create('armateam.notification', {
                    type: 'basic',
                    iconUrl: chrome.extension.getURL('images/arma-64.png'),
                    title: 'L’ArmaTeam est en ligne \\o/',
                    message: newVal.channel.status
                });
            }

            else if (newVal.channel.status !== oldVal.channel.status) {
                chrome.notifications.create('armateam.notification', {
                    type: 'basic',
                    iconUrl: chrome.extension.getURL('images/arma-64.png'),
                    title: 'Changement de streamer sur l’ArmaTeam !',
                    message: newVal.channel.status
                });
            }
        }
    });
}
