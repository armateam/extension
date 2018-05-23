import {combineReducers} from 'redux'

import channel from './channel'
import status from './status'

// ## //

export default combineReducers({
  channel,
  status
})
