import fileReader from './fileReader';
import assert from 'assert';
describe('File reader module', () => {
  it('reads a file and return the content', () => {
    const sample = __dirname + '/../../samples/es6-no-import.js';
    let content = fileReader.tokenize(sample);
    assert.equal(content.length, 8);
    assert.deepEqual(content[4], {type: 'Keyword', value: 'export'});
  });

});