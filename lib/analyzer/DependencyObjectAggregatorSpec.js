import DependencyObjectAggregator from './DependencyObjectAggregator';
import fileReader from '../fileReader/fileReader';
import path from 'path';
import assert from 'assert';
describe('DependencyObjectAggregator', () => {
  it('requires a fileReader and an analyzer', () => {
    assert.throws(() => new DependencyObjectAggregator(),
        /Unmet dependencies: fileReader analyzer/,
        'requires fileReader and analyzer');
    assert.throws(() => new DependencyObjectAggregator({}),
        /Unmet dependencies: analyzer/,
        'requires analyzer');
    assert.throws(() => new DependencyObjectAggregator(undefined, {}),
        /Unmet dependencies: fileReader/,
        'requires fileReader');
  });

  it('calls the analyzer function', () => {
    let notCalled = false;
    let analyzer = (tokens) => notCalled = tokens;
    let samples = path.join(__dirname, '..', '..', 'samples', 'es6-single-import.js');
    (new DependencyObjectAggregator(fileReader, analyzer).generateDependencyObject(samples));
    assert.equal(typeof notCalled, 'object', 'an array should be returned');
    assert.deepStrictEqual(notCalled.shift(), {type: 'Keyword', value: 'import'}, 'tokens not present');
  });
});