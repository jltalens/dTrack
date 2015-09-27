import {FileReader} from '../fileReader/FileReader.js';
import {Tokenizer} from './Tokenizer.js';
describe('tokenizer module', function() {
  let assert = require('assert');
  it('should be able to instantiate and pass the file reader', function() {
    let tokenizer = new Tokenizer(new FileReader);
    assert(true);
  });
  it('should have the name attribute', function() {
    let tokenizer = new Tokenizer(new FileReader);
    assert.equal('Tokenizer', tokenizer.name);
  });
  it('should fail if not passed an instance of FileReader to constructor', function() {
    assert.throws(function() {
      let failToken = new Tokenizer();
    }, Error);
  });
  it('should tokenize the function', function(done) {
    let tokenizer = new Tokenizer(new FileReader);
    let fileName = '/../../samples/simpleContent.js';
    let tokens = tokenizer.getTokens(__dirname + fileName);
    tokens
        .then(function(tokens) {
          assert.equal(10, tokens.length);
          assert.equal('function', tokens[1].value);
          done();
        })
        .catch(function(reason) {
          assert(false);
          done();
        });
  });
  it('should yield a token by value with no offset', function(done) {
    let tokenizer = new Tokenizer(new FileReader);
    let fileName = __dirname + '/../../samples/commonJSSample1.js';
    tokenizer.yieldTokens(fileName, 'require')
        .then(function(tokensArray) {
          assert.deepEqual({
            'type': 'Identifier',
            'value': 'require'
          }, tokensArray);
          done();
        })
        .catch(function(reason) {
          console.log(reason);
          assert(false);
          done();
        });
  });
});
