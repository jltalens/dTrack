import DependencyObjectAggregator from './DependencyObjectAggregator';
import assert from 'assert';
import path from 'path';
import commonJSAnalyzer from './CommonJSAnalyzer';
import fileReader from '../fileReader/fileReader';
describe('CommonJS analyzer module', () => {
  let analyse;
  let samplesPath = path.join(__dirname, '..', '..', 'samples');

  beforeEach(() => {
    analyse = f => new DependencyObjectAggregator(fileReader, commonJSAnalyzer)
        .generateDependencyObject(path.join(samplesPath, f));
  });

  it('only check one file if the deps are node modules', () => {
    let dependencies = analyse('common-js-single-import.js');
    assert.deepEqual(dependencies,['common-js-single-import',['path']]);
  });

  it('gets multiple dependencies in one file', () => {
    let dependencies = analyse('require-multi-import-same-dir.js');
    assert.deepEqual(dependencies,['require-multi-import-same-dir',['es6-no-import','path']]);
  });

});