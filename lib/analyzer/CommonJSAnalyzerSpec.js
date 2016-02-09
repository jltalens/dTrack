import DependencyObjectAggregator from './DependencyObjectAggregator';
import assert from 'assert';
import path from 'path';
import commonJSAnalyzer from './CommonJSAnalyzer';
import fileReader from '../fileReader/fileReader';
describe('CommonJS analyzer module', () => {
  let analyse;
  let samplesPath = path.join(__dirname, '..', '..', 'samples', 'commonJS');

  beforeEach(() => {
    analyse = f => new DependencyObjectAggregator(fileReader, commonJSAnalyzer)
        .generateDependencyObject(path.join(samplesPath, f));
  });

  it('only check one file if the deps are node modules', () => {
    let dependencies = analyse('single-import.js');
    assert.deepEqual(dependencies,['single-import',['path']]);
  });

  it('gets multiple dependencies in one file', () => {
    let dependencies = analyse('multi-import-same-dir.js');
    assert.deepEqual(dependencies,['multi-import-same-dir',['no-import','path']]);
  });

});