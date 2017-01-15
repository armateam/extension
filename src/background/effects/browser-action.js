import watch from 'redux-watch';

// ## //

export default function (store) {
    const watcher = watch(store.getState, 'channel.channel');

    return watcher(newVal => {
        if (newVal) {
            chrome.browserAction.setTitle({
                title: 'ArmaTeam – En ligne'
            });
            chrome.browserAction.setIcon({
                path: {
                    48: 'images/arma-48.png',
                    96: 'images/arma-96.png'
                }
            });
        }

        else {
            chrome.browserAction.setTitle({
                title: 'ArmaTeam – Hors-ligne'
            });
            chrome.browserAction.setIcon({
                path: {
                    48: 'images/arma-48-gs.png',
                    96: 'images/arma-96-gs.png'
                }
            });
        }
    });
}
