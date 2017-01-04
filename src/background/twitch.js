import merge from 'lodash/merge';

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

    request(path, options) {
        return fetch(`${this.baseUrl}/${path}`, merge({
            headers: {
                'Accept': 'application/vnd.twitchtv.v3+json',
                'Client-Id': this.options.clientId
           }
       }, options)).then(res => res.json());
    }

    getChannel(name) {
        return this
            .request(`streams/${name}`)
            .then(res => res.stream);
    }
}
