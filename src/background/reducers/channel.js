import Constants from '../../constants'
import {createReducer} from './utils'

// ## //

const initialState = {
  isFetching: false,
  didInvalidate: false,
  channel: null
}

export default createReducer(initialState, {
  [Constants.GET_CHANNEL_PENDING]: state => ({
    ...state,
    isFetching: true,
    didInvalidate: false
  }),

  [Constants.GET_CHANNEL_FULFILLED]: (state, data) => ({
    ...state,
    channel: data.payload,
    isFetching: false,
    didInvalidate: false
  }),

  [Constants.GET_CHANNEL_REJECTED]: state => ({
    ...state,
    isFetching: false,
    didInvalidate: true
  })
})
