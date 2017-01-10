'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _backgroundStore = require('./background-store');

Object.defineProperty(exports, 'createBackgroundStore', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_backgroundStore).default;
  }
});

var _uiStore = require('./ui-store');

Object.defineProperty(exports, 'createUIStore', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_uiStore).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }