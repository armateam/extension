import store from './store'
import {getChannel} from './actions'
import {applyBrowserAction, applyNotifications} from './effects'

// ## //

const interval = 15 * 1000
const poll = () => store.dispatch(getChannel())

store.subscribe(applyBrowserAction(store))
store.subscribe(applyNotifications(store))

setInterval(poll, interval)
poll()
