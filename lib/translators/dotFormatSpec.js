import assert from 'assert';
import dotFormat from './dotFormat';
describe('dot format module', () => {
  it('one module, no dependencies', () => {
    let depTree = dotFormat(['es6-no-import']);
    assert.deepEqual(depTree, 'digraph "es6-no-import" { "es6-no-import" }');
  });
  it('one level of depedencies', () => {
    let depTree = dotFormat(['top-level', ['one-dep', 'second-dep']]);
    assert.deepEqual(depTree, 'digraph "top-level" { "top-level" -> "one-dep"; "top-level" -> "second-dep"; }');
  });
  it('more level of dependencies', () => {
    let depTree = dotFormat(['top-level', ['one-dep', 'second-dep', ['third-dep']]]);
    assert.deepEqual(depTree, 'digraph "top-level" { "top-level" -> "one-dep"; "top-level" -> "second-dep"; "second-dep" -> "third-dep"; }')
  })
});
