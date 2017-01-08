import Constants from '../../constants';

import config from '../config.json';
import Twitch from '../twitch';

// ## //

const twitch = new Twitch({
    clientId: config.twitch.clientId
});

const notify = (title, channel) => {
    chrome.notifications.create('armateam.online', {
        type: 'basic',
        iconUrl: chrome.extension.getURL('images/arma-64.png'),
        title: title,
        message: channel.channel.status
    });
};

const setOnline = (channel, previousState) => {
    chrome.browserAction.setTitle({
        title: 'ArmaTeam – En ligne'
    });
    chrome.browserAction.setIcon({
        path: {
            48: 'images/arma-48.png',
            96: 'images/arma-96.png'
        }
    });

    if (!previousState.channel) {
        notify('L’ArmaTeam est en ligne \\o/', channel);
    }

    else if (channel.status !== previousState.channel.status) {
        notify('Changement de streamer sur l’ArmaTeam !', channel);
    }
};

const setOffline = () => {
    chrome.browserAction.setTitle({
        title: 'ArmaTeam – Hors-ligne'
    });
    chrome.browserAction.setIcon({
        path: {
            48: 'images/arma-48-gs.png',
            96: 'images/arma-96-gs.png'
        }
    });
};

export function getChannel() {
    return (dispatch, getState) => {
        dispatch({
            type: Constants.GET_CHANNEL,
            payload: {
                promise: new Promise(async resolve => {
                    const channel = await twitch.getChannel(config.channel);

                    resolve(channel);

                    if (channel) {
                        setOnline(channel, getState().channel);
                    }
                    else {
                        setOffline();
                    }
                })
            }
        })
    }
};
