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

    notify() {
        chrome.notifications.create('armateam.online', {
            title: 'L’ArmaTeam est en ligne \\o/',
            type: 'basic',
            iconUrl: chrome.extension.getURL('images/arma-64.png'),
            message: this.channel.channel.status
        });
    }

    poll() {
        return this.twitch
            .getChannel(config.channel)
            .then(channel => {
                const previous = this.online;

                this.channel = channel;
                this.online = !!channel;

                if (this.online && previous !== this.online) {
                    this.notify();
                }

                chrome.runtime
                    .sendMessage({
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
            });
    }
}

const ext = new Extension();
ext.start();

// ## //

window.extension = ext;
