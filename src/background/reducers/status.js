import Constants from '../../constants'
import {createReducer} from './utils'

// ## //

const initialState = {
  original: null,
  clean: null
}

export default createReducer(initialState, {
  [Constants.GET_CHANNEL_FULFILLED]: (state, data) => {
    if (data.payload) {
      const {status} = data.payload.channel

      return {
        ...state,
        original: status,
        clean: status.replace(/^\[\s*fr\s*\]\s*/i, '')
      }
    }

    return state
  }
})
