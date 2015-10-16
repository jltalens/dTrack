import {DependencyTracker} from './DependencyTracker.js';
describe('dependency tracker module', () => {
  let assert = require('assert');
  it('should fail if the mod. dependencies are not passed', () => {
    assert.throws(() => {
      new DependencyTracker();
    }, Error, "Missing dependencies");
  });
});