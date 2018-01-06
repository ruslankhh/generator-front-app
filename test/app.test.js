import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
import data from './prompts/data.json';

describe('generator-front2-app:app', () => {
  beforeAll(() => {
    jest.setTimeout(300000);

    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts(data.app);
  });

  test('creates files', () => {
    assert.file(['package.json', 'public/index.html']);
  });
});
