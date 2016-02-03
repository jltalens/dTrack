import trackDependencies from './trackDependencies';
import assert from 'assert';
import path from 'path';
describe('dependency tracker module', () => {
  it('returns object with empty value if the file doesnt have an import', () =>
    assert.deepEqual(['es6-no-import'], trackDependencies.from(path.join(__dirname, '..', 'samples', 'es6-no-import.js')))
  );
});
