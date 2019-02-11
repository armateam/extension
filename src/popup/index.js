import React from 'react'
import ReactDOM from 'react-dom'

import {StoreContext} from 'redux-react-hook'
import {createUIStore} from 'redux-webext'

import Popup from './components/popup'

// ## //

async function init() {
  const store = await createUIStore()

  ReactDOM.render(
    <StoreContext.Provider value={store}>
      <Popup />
    </StoreContext.Provider>,
    document.querySelector('#app')
  )
}

init()
