import lodash from 'lodash';
import lodashCheckit from 'lodash-checkit';

const _ = { ...lodashCheckit, ...lodash };

export const promptAppName = value => ({
  type: 'input',
  name: 'name',
  message: 'App name:',
  default: value,
  filter: str => str.replace(' ', '-').toLowerCase(),
  validate: _.negate(_.isEmpty)
});

export const promptAppAuthorName = value => ({
  type: 'input',
  name: 'authorName',
  message: 'App author name:',
  default: value,
  validate: _.negate(_.isEmpty)
});

export const promptAppAuthorEmail = value => ({
  type: 'input',
  name: 'authorEmail',
  message: 'App author email:',
  default: value,
  validate: _.isEmail
});

export const promptAppPackageManager = value => ({
  type: 'list',
  name: 'packageManager',
  message: 'App Package Manager:',
  choices: ['yarn', 'npm'],
  default: value,
  validate: _.negate(_.isEmpty)
});

export const promptAppRun = value => ({
  type: 'confirm',
  name: 'run',
  message: 'App. Run the App immediately after installation?',
  default: value,
  validate: _.negate(_.isEmpty)
});
