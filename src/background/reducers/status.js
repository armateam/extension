import Constants from '../../constants';
import { createReducer } from './utils';

// ## //

const initialState = {
    original: null,
    clean: null
};

export default createReducer(initialState, {
    [Constants.GET_CHANNEL_FULFILLED]: (state, data) => {
        if (data.payload) {
            const status = data.payload.channel.status;

            if (status.indexOf('[FR] ') === 0) {
                return {
                    ...state,
                    original: status,
                    clean: status.substring(5)
                };
            }
        }

        return state;
    }
});
