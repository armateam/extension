import Constants from '../../constants';

import config from '../config.json';
import Twitch from '../twitch';

// ## //

const twitch = new Twitch({
    clientId: config.twitch.clientId
});

export function getChannel() {
    return (dispatch, getState) => {
        dispatch({
            type: Constants.GET_CHANNEL,
            payload: {
                promise: new Promise(async resolve => {
                    const channel = await twitch.getChannel(config.channel);

                    if (channel) {
                        const status = channel.channel.status;
                        if (status.indexOf('[FR] ') === 0) {
                            channel.channel.status = status.substring(5);
                        }
                    }

                    resolve(channel);
                })
            }
        })
    }
};
