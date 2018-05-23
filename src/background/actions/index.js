import Constants from '../../constants'

import config from '../config'
import Twitch from '../twitch'

// ## //

const twitch = new Twitch({
  clientId: config.twitch.clientId
})

export function getChannel() {
  return dispatch => dispatch({
    type: Constants.GET_CHANNEL,
    payload: {
      promise: twitch.getChannel(config.channel)
    }
  })
}
