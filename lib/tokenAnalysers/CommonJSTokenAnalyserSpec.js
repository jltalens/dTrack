import {CommonJSAnalyser} from './CommonJSAnalyser.js';
describe('CommonJS tokens analysis', function() {
  let assert = require('assert');
  it('should fail if the dependencies are not passed', function() {
    assert.throws(() => new CommonJSAnalyser(), /Unmet dependencies/);
  });
});
