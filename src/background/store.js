import { createStore, applyMiddleware } from 'redux'
import { createBackgroundStore } from 'redux-webext'

import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'

import reducer from './reducers'

// ## //

let middlewares = [
  thunkMiddleware,
  promiseMiddleware()
]

if (process.env.NODE_ENV !== 'production') {
  const { createLogger } = require('redux-logger')

  middlewares = [
    ...middlewares,
    createLogger()
  ]
}

const store = createStore(reducer, applyMiddleware(...middlewares))

export default createBackgroundStore({
  store
})
