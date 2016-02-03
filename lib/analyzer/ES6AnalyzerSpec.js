import fileReader from '../fileReader/fileReader';
import ES6Analyzer from './ES6Analyzer';
import assert from 'assert';
import path from 'path';
describe('ES6 Analyzer', () => {
  let analyzer;
  let samplesPath = __dirname + ['', '..', '..', 'samples', ''].join(path.sep);
  beforeEach(() => {
    analyzer = new ES6Analyzer(fileReader);
  });
  it('returns an object with an empty array as value if no dependency found', () => {
    let dependencies = analyzer.generateDependencyObject(samplesPath + 'es6-no-import.js');
    assert.deepEqual(dependencies, ['es6-no-import']);
  });
  it('only check one file if the deps are node modules', () => {
    let dependencies = analyzer.generateDependencyObject(samplesPath + 'es6-single-import.js');
    assert.deepEqual(dependencies,['es6-single-import',['path']]);
  });
  it('support "as from" syntax', () => {
    let dependencies = analyzer.generateDependencyObject(samplesPath + 'es6-single-import-as-syntax.js');
    assert.deepEqual(dependencies,['es6-single-import-as-syntax',['es6-no-import']]);
  });
  it('gets multiple dependencies in one file', () => {
    let dependencies = analyzer.generateDependencyObject(samplesPath + 'es6-multi-import-same-dir.js');
    assert.deepEqual(dependencies,['es6-multi-import-same-dir',['es6-no-import','path']]);
  });
  it('gets one level of nested dependencies', () => {
    let dependencies = analyzer.generateDependencyObject(samplesPath + 'es6-nested-import-same-dir.js');
    assert.deepEqual(dependencies,['es6-nested-import-same-dir',['es6-nested-import',['path'],'path']]);
  });
  it('gets multiple level of nested dependencies', () => {
    let dependencies = analyzer.generateDependencyObject(samplesPath + 'es6-multiple-nested-same-dir.js');
    assert.deepEqual(dependencies,['es6-multiple-nested-same-dir', ['es6-nested-import-same-dir',['es6-nested-import', ['path'], 'path'], 'path']]);
  });
  describe('bugs', () => {
    it('outputs the right name independently of being written with single or double quotes', () => {
      let dependencies = analyzer.generateDependencyObject(samplesPath + 'es6-single-import-double-quote.js');
      assert.deepEqual(dependencies,['es6-single-import-double-quote',['path']]);
    });
  });
});