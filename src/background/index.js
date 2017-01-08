import store from './store';
import { getChannel } from './actions';

// ## //

const interval = 15 * 1000;
const poll = () => store.dispatch(getChannel());

setInterval(poll, interval);
poll();
