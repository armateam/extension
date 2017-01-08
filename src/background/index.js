import cloneDeep from 'lodash.clonedeep';

import Twitch from './twitch';
import config from './config.json';

// ## //

class Extension {
    constructor() {
        this.interval = 15 * 1000;

        this.twitch = new Twitch({
            clientId: config.twitch.clientId
        });

        this.online = false;
        this.channel = null;
    }

    start() {
        this.createAlarm();

        chrome.runtime.onMessage.addListener(this.onMessage.bind(this));
    }

    createAlarm() {
        this.poll();

        clearInterval(this.alarm);
        this.alarm = setInterval(this.poll.bind(this), this.interval);
    }

    onMessage(message, sender, sendResponse) {
        switch (message.name) {
            case 'armateam.ping':
                this.poll();
                break;
        }
    }

    notify(title) {
        chrome.notifications.create('armateam.online', {
            type: 'basic',
            iconUrl: chrome.extension.getURL('images/arma-64.png'),
            title: title,
            message: this.channel.channel.status
        });
    }

    async poll() {
        const previous = cloneDeep(this.channel);
        const channel = await this.twitch.getChannel(config.channel);

        this.channel = channel;
        this.online = !!channel;

        if (this.online && !previous) {
            this.notify('L’ArmaTeam est en ligne \\o/');
        }
        else if (this.online && previous.channel.status !== this.channel.channel.status) {
            this.notify('Changement de streamer sur l’ArmaTeam !');
        }

        chrome.runtime.sendMessage({
            name: 'armateam.pong',
            data: {
                online: this.online,
                channel: this.channel
            }
        });

        if (this.online) {
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
    }
}

const ext = new Extension();
ext.start();

// ## //

window.extension = ext;
