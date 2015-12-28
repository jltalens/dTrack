import fileReader from '../fileReader/fileReader';
import ES6Analyzer from './ES6Analyzer';
import assert from 'assert';
describe('ES6 Analyzer', () => {
    let analyzer;
    beforeEach(() => {
        analyzer = new ES6Analyzer(fileReader);
    });
    it('returns an object with an empty array as value if no dependency found', () => {
        let dependencies = analyzer.generateDependencyObject(__dirname + '/../../samples/es6-no-import.js');
        assert.deepEqual(dependencies, {'es6-no-import':[]});
    });
    it('only check one file if the deps are node modules', () => {
        let dependencies = analyzer.generateDependencyObject(__dirname + '/../../samples/es6-single-import.js');
        assert.deepEqual(dependencies,
            {
                'es6-single-import': [
                    {
                        'path': []
                    }
                ]
            });
    });
    it('support "as from" syntax', () => {
        let dependencies = analyzer.generateDependencyObject(__dirname + '/../../samples/es6-single-import-as-syntax.js');
        assert.deepEqual(dependencies,
            {
                'es6-single-import-as-syntax': [
                    {
                        'es6-no-import': []
                    }
                ]
            });
    })
});