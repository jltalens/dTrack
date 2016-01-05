import Module from './Module';
import assert from 'assert';
describe('Module', () => {
  it('creates a new instance with the name of the module and 0 deps', () => {
    let module = new Module('path');
    assert.deepEqual(module.name, 'path');
  });
});
