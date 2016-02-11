import trackDependencies from './trackDependencies';
import assert from 'assert';
import path from 'path';
import commonJSAnalyzer from './analyzer/CommonJSAnalyzer';
describe('dependency tracker module', () => {
  it('returns object with empty value if the file doesnt have an import', () => {
    let sample = path.join(__dirname, '..', 'samples', 'es6', 'no-import.js');
    assert.deepEqual(['no-import'], trackDependencies.from(sample, commonJSAnalyzer));
  });
});
