import fileReader from '../fileReader/fileReader';
import es6analyzer from './ES6Analyzer';
import DependencyObjectAggregator from './DependencyObjectAggregator';
import assert from 'assert';
import path from 'path';
describe('ES6 Analyzer', () => {

  let analyse;
  let samplesPath = path.join(__dirname, '..', '..', 'samples', 'es6');

  beforeEach(() => {
    analyse = file => new DependencyObjectAggregator(fileReader, es6analyzer)
        .generateDependencyObject(path.join(samplesPath, file));
  });

  it('returns an object with an empty array as value if no dependency found', () => {
    let dependencies = analyse('no-import.js');
    assert.deepEqual(dependencies, ['no-import']);
  });

  it('only check one file if the deps are node modules', () => {
    let dependencies = analyse('single-import.js');
    assert.deepEqual(dependencies,['single-import',['path']]);
  });

  it('support "as from" syntax', () => {
    let dependencies = analyse('single-import-as-syntax.js');
    assert.deepEqual(dependencies,['single-import-as-syntax',['no-import']]);
  });

  it('gets multiple dependencies in one file', () => {
    let dependencies = analyse('multi-import-same-dir.js');
    assert.deepEqual(dependencies,['multi-import-same-dir',['no-import','path']]);
  });

  it('gets one level of nested dependencies', () => {
    let dependencies = analyse('nested-import-same-dir.js');
    assert.deepEqual(dependencies,['nested-import-same-dir',['nested-import',['path'],'path']]);
  });

  it('gets multiple level of nested dependencies', () => {
    let dependencies = analyse('multiple-nested-same-dir.js');
    assert.deepEqual(dependencies,['multiple-nested-same-dir', ['nested-import-same-dir',['nested-import', ['path'], 'path'], 'path']]);
  });

  describe('bugs', () => {
    it('outputs the right name independently of being written with single or double quotes', () => {
      let dependencies = analyse('single-import-double-quote.js');
      assert.deepEqual(dependencies,['single-import-double-quote',['path']]);
    });
  });

});