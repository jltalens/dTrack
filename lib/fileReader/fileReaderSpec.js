import fileReader from './fileReader';
import assert from 'assert';
import path from 'path';
describe('File reader module', () => {
  it('reads a file and return the content', () => {
    const sample = path.join(__dirname, '..', '..', 'samples', 'es6', 'no-import.js');
    let content = fileReader.tokenize(sample);
    assert.equal(content.length, 8);
    assert.deepEqual(content[4], {type: 'Keyword', value: 'export'});
  });

});