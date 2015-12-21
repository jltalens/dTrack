import trackDependencies from './trackDependencies';
describe('dependency tracker module', () => {
    let assert = require('assert');
    it('returns object with empty value if the file doesnt have an import', () => {
        assert.deepEqual({
            'es-no-imports': []
        }, trackDependencies.from('../samples/es-no-import.js'));
    });
});
