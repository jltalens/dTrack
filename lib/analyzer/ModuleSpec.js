import Module from './Module';
import assert from 'assert';
describe('Module', () => {
  describe('instantiation and use', () => {
    it('creates a new instance with the name of the module and 0 deps', () => {
      let module = new Module('path');
      assert.deepEqual(module.name, 'path');
      assert.deepEqual(module.deps, []);
    });
    it('exposes a method to add a dependency', () => {
      let module = new Module('path');
      assert('addDependency' in module);
      module.addDependency('fs');
      assert.deepEqual(Object.keys(module.deps), ['fs']);
      assert(module.deps['fs'] instanceof Module);
      assert.strictEqual(module.deps['fs'].name, 'fs');
    });
  });
  describe('representation', () => {
    it('can represent the hierarchy as an object', () => {
      let module = new Module('path').addDependency('fs').addDependency('module');
      let moduleAsObjectExpected = {
        "path": [
          {"fs": []},
          {"module": []}
        ]
      };
      assert.deepStrictEqual(module.toObject(), moduleAsObjectExpected);
    });
  });
});
