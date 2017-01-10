'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = createBackgroundStore;

var _constants = require('./constants');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var store = void 0,
    actions = void 0,
    onDisconnect = void 0;

// eslint-disable-next-line consistent-return
function handleMessage(msg, sender, cb) {
    if (msg.type === _constants.DISPATCH) {
        var _msg$action = msg.action,
            type = _msg$action.type,
            actionData = _objectWithoutProperties(_msg$action, ['type']);

        var action = actions[type];

        if (action) {
            // if action doesn't have any data we should pass "undefined"
            store.dispatch(action(Object.keys(actionData).length ? actionData : undefined));
        } else {
            console.error('Provided in background store "actions" object doesn\'t contain "' + type + '" key.');
        }
    } else if (msg.type === _constants.UPDATE_STATE) {
        cb(store.getState());

        // keep channel open, https://developer.chrome.com/extensions/runtime#event-onMessage
        return true;
    }
}

// allow other parts of the app to reuse the store, e.g. popup
function handleConnection(connection) {
    if (connection.name !== _constants.CONNECTION_NAME) {
        return;
    }

    // send updated state to other parts of the app on every change
    var unsubscribe = store.subscribe(function () {
        connection.postMessage({
            type: _constants.UPDATE_STATE,
            data: store.getState()
        });
    });

    // unsubscribe on disconnect
    connection.onDisconnect.addListener(function () {
        unsubscribe();

        if (onDisconnect) {
            onDisconnect();
        }
    });
}

function createBackgroundStore(options) {
    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object' || _typeof(options.store) !== 'object') {
        throw new Error('Expected the "store" to be an object.');
    }

    if (options.hasOwnProperty('actions') && _typeof(options.actions) !== 'object') {
        throw new Error('Expected the "actions" to be an object.');
    }

    if (options.hasOwnProperty('onDisconnect') && typeof options.onDisconnect !== 'function') {
        throw new Error('Expected the "onDisconnect" to be a function.');
    }

    store = options.store;
    actions = options.actions || {};
    onDisconnect = options.onDisconnect;

    chrome.runtime.onConnect.addListener(handleConnection);
    chrome.runtime.onMessage.addListener(handleMessage);

    return store;
}