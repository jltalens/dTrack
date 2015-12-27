import trackDependencies from './trackDependencies';
import assert from 'assert';
describe('dependency tracker module', () => {
    it('returns object with empty value if the file doesnt have an import', () => {
        assert.deepEqual({
            'es6-no-import': []
        }, trackDependencies.from('../samples/es6-no-import.js'));
    });
});
