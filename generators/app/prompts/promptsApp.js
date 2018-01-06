'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptAppRun = exports.promptAppPackageManager = exports.promptAppAuthorEmail = exports.promptAppAuthorName = exports.promptAppName = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodashCheckit = require('lodash-checkit');

var _lodashCheckit2 = _interopRequireDefault(_lodashCheckit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = _extends({}, _lodashCheckit2.default, _lodash2.default);

var promptAppName = exports.promptAppName = function promptAppName(value) {
  return {
    type: 'input',
    name: 'name',
    message: 'App name:',
    default: value,
    filter: function filter(str) {
      return str.replace(' ', '-').toLowerCase();
    },
    validate: _.negate(_.isEmpty)
  };
};

var promptAppAuthorName = exports.promptAppAuthorName = function promptAppAuthorName(value) {
  return {
    type: 'input',
    name: 'authorName',
    message: 'App author name:',
    default: value,
    validate: _.negate(_.isEmpty)
  };
};

var promptAppAuthorEmail = exports.promptAppAuthorEmail = function promptAppAuthorEmail(value) {
  return {
    type: 'input',
    name: 'authorEmail',
    message: 'App author email:',
    default: value,
    validate: _.isEmail
  };
};

var promptAppPackageManager = exports.promptAppPackageManager = function promptAppPackageManager(value) {
  return {
    type: 'list',
    name: 'packageManager',
    message: 'App Package Manager:',
    choices: ['yarn', 'npm'],
    default: value,
    validate: _.negate(_.isEmpty)
  };
};

var promptAppRun = exports.promptAppRun = function promptAppRun(value) {
  return {
    type: 'confirm',
    name: 'run',
    message: 'App. Run the App immediately after installation?',
    default: value,
    validate: _.negate(_.isEmpty)
  };
};