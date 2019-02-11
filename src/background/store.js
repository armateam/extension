import {createStore, applyMiddleware} from 'redux'
import {createBackgroundStore} from 'redux-webext'

import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'

import reducer from './reducers'

// ## //

let middlewares = [
  promise,
  thunk
]

if (process.env.NODE_ENV !== 'production') {
  const {createLogger} = require('redux-logger')

  middlewares = [
    ...middlewares,
    createLogger()
  ]
}

const store = createStore(reducer, applyMiddleware(...middlewares))

export default createBackgroundStore({
  store
})
