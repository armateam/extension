import merge from 'lodash.merge';

// ## //

export default class Twitch {
    constructor(options) {
        this.baseUrl = 'https://api.twitch.tv/kraken';

        this.options = {
            clientId: options.clientId
        };

        if (!this.options.clientId) {
            throw new Error('Twitch: No clientId specified');
        }
    }

    async request(path, options) {
        const res = await fetch(`${this.baseUrl}/${path}`, merge({
            headers: {
                'Accept': 'application/vnd.twitchtv.v3+json',
                'Client-Id': this.options.clientId
            }
        }, options));

        return await res.json();
    }

    async getChannel(name) {
        const res = await this.request(`streams/${name}`);

        return res.stream;
    }
}
