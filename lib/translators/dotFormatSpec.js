import assert from 'assert';
import dotFormat from './dotFormat';
describe('dot format module', () => {
  it('one module, no dependencies', () => {
    let depTree = dotFormat(['es6-no-import']);
    assert.deepEqual(depTree, 'digraph "es6-no-import" { "es6-no-import" }');
  });
});
