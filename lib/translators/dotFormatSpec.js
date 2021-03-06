import assert from 'assert';
import dotFormat from './dotFormat';
describe('dot format module', () => {
  it('one module, no dependencies', () => {
    let depTree = dotFormat(['es6-no-import']);
    assert.deepEqual(depTree, 'digraph "es6-no-import" { "es6-no-import" }');
  });
  it('one level of depedencies', () => {
    let depTree = dotFormat(['top-level', ['one-dep', 'second-dep']]);
    assert.deepEqual(depTree, 'digraph "top-level" { "top-level" -> "one-dep"[dir=back]; "top-level" -> "second-dep"[dir=back]; }');
  });
  it('two levels of dependencies', () => {
    let depTree = dotFormat(['top-level', ['one-dep', 'second-dep', ['third-dep']]]);
    assert.deepEqual(depTree, 'digraph "top-level" { "top-level" -> "one-dep"[dir=back]; "top-level" -> "second-dep"[dir=back]; "second-dep" -> "third-dep"[dir=back]; }')
  });
  it('two levels of dependencies salted', () => {
    let depTree = dotFormat(['top-level', ['one-dep', ['second-dep'], 'third-dep' ]]);
    assert.deepEqual(depTree, 'digraph "top-level" { "top-level" -> "one-dep"[dir=back]; "one-dep" -> "second-dep"[dir=back]; "top-level" -> "third-dep"[dir=back]; }')
  });
  it('multi level of dependencies', () => {
    let depTree = dotFormat(['a', ['b', ['c', 'd', ['e'], 'f'],'g']]);
    assert.deepEqual(depTree, 'digraph "a" { "a" -> "b"[dir=back]; "b" -> "c"[dir=back]; "b" -> "d"[dir=back]; "d" -> "e"[dir=back]; "b" -> "f"[dir=back]; "a" -> "g"[dir=back]; }');
  });
});
