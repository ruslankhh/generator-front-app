'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _yeomanGenerator = require('yeoman-generator');

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

var _promptsApp = require('./prompts/promptsApp');

var _data = require('./prompts/data.json');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _yeomanGenerator2.default {
  initializing() {
    this.default = _data2.default;
    this.props = {};
  }

  prompting() {
    var _this = this;

    // Have Yeoman greet the user.
    this.log((0, _yosay2.default)('Welcome to the tiptop ' + _chalk2.default.red('Front App') + ' generator!'));

    return Promise.resolve().then(function () {
      return _this.prompt([(0, _promptsApp.promptAppName)(_this.default.app.name), (0, _promptsApp.promptAppAuthorName)(_this.default.app.authorName), (0, _promptsApp.promptAppAuthorEmail)(_this.default.app.authorEmail), (0, _promptsApp.promptAppPackageManager)(_this.default.app.packageManager), (0, _promptsApp.promptAppRun)(_this.default.app.run)]);
    }).then(function (props) {
      _this.props.app = _extends({}, props);
    });
  }

  writing() {
    var _this2 = this;

    this.log('');
    this.log(_chalk2.default.bgBlue(_chalk2.default.black(' Creating App files ')));
    this.log('');

    ['babelrc', 'editorconfig', 'gitattributes', 'gitignore'].forEach(function (fileName) {
      return _this2.fs.copy(_this2.templatePath('_' + fileName), _this2.destinationPath('.' + fileName));
    });
    this.fs.copyTpl(this.templatePath('**/*.*'), this.destinationPath(), this.props);
    _fsExtra2.default.copySync(this.templatePath('app'), this.destinationPath('app'));
  }

  install() {
    var commandPackageManager = this.props.app.packageManager;

    this.log('');
    this.log(_chalk2.default.bgBlue(_chalk2.default.black(' Installing packages ')));
    this.log('');
    this.spawnCommandSync(commandPackageManager, ['install']);
  }

  end() {
    this.log('');
    this.log(_chalk2.default.green('Congratulations! All done.'));
    this.log('Thanks for using Yeoman.');
    if (this.props.app.run) {
      this.log('');
      this.log(_chalk2.default.bgBlue(_chalk2.default.black(' Runing App ')));
      this.log('');
      this.spawnCommandSync('gulp');
    }
  }
};
module.exports = exports['default'];