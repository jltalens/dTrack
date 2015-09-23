import {FileReader} from '../fileReader/FileReader.js';
import {Tokenizer} from './Tokenizer.js';
describe('tokenizer module', function() {
  let assert = require('assert');
  it('should be able to instantiate and pass the file reader', function() {
    let tokenizer = new Tokenizer(new FileReader);
    assert(true);
  });
  it('should have the name attribute', function() {
    let tokenizer = new Tokenizer();
    assert.equal('Tokenizer', tokenizer.name);
  });
});
