import fileReader from '../fileReader/fileReader';
import ES6Analyzer from './ES6Analyzer';
import assert from 'assert';
describe('ES6 Analyzer', () => {
    it('returns an object with an empty array as value if no dependency found', () => {
        let analyzer = new ES6Analyzer(fileReader);
        let dependencies = analyzer.generateDependencyObject(__dirname + '/../../samples/es6-no-import.js');
        assert.deepEqual(dependencies, {'es6-no-import':[]});
    });
});