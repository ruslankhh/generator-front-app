import fs from 'fs';
import fse from 'fs-extra';
import Generator from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';

import {
  promptAppName,
  promptAppAuthorName,
  promptAppAuthorEmail,
  promptAppPackageManager,
  promptAppRun
} from './prompts/promptsApp';

import data from './prompts/data.json';

export default class extends Generator {
  initializing() {
    this.default = data;
    this.props = {};
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Welcome to the tiptop ' + chalk.red('Front App') + ' generator!')
    );

    return Promise.resolve()
      .then(() => {
        return this.prompt([
          promptAppName(this.default.app.name),
          promptAppAuthorName(this.default.app.authorName),
          promptAppAuthorEmail(this.default.app.authorEmail),
          promptAppPackageManager(this.default.app.packageManager),
          promptAppRun(this.default.app.run)
        ])
      })
      .then(props => {
        this.props.app = { ...props };
      });
  }

  writing() {
    this.log('');
    this.log(chalk.bgBlue(chalk.black(' Creating App files ')));
    this.log('');

    ['babelrc', 'editorconfig', 'gitattributes', 'gitignore']
      .forEach((fileName) =>
        this.fs.copy(
          this.templatePath(`_${fileName}`),
          this.destinationPath(`.${fileName}`)
        )
      );
    this.fs.copyTpl(
      this.templatePath('**/*.*'),
      this.destinationPath(),
      this.props
    );
    fse.copySync(
      this.templatePath('app'),
      this.destinationPath('app')
    );
  }

  install() {
    const commandPackageManager = this.props.app.packageManager;

    this.log('');
    this.log(chalk.bgBlue(chalk.black(' Installing packages ')));
    this.log('');
    this.spawnCommandSync(commandPackageManager, ['install']);
  }

  end() {
    this.log('');
    this.log(chalk.green('Congratulations! All done.'));
    this.log('Thanks for using Yeoman.');
    if (this.props.app.run) {
      this.log('');
      this.log(chalk.bgBlue(chalk.black(' Runing App ')));
      this.log('');
      this.spawnCommandSync('gulp');
    }
  }
}
