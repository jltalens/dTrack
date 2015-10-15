import {FileReader} from '../fileReader/FileReader.js';
import {Tokenizer} from './Tokenizer.js';
describe('tokenizer module', () => {
  let assert = require('assert');
  it('should be able to instantiate and pass the file reader', () => {
    let tokenizer = new Tokenizer(new FileReader);
    assert(true);
  });
  it('should have the name attribute', () => {
    let tokenizer = new Tokenizer(new FileReader);
    assert.equal('Tokenizer', tokenizer.name);
  });
  it('should fail if not passed an instance of FileReader to constructor', () => {
    assert.throws(() => {
      let failToken = new Tokenizer();
    }, Error);
  });
  it('should tokenize the function', (done) => {
    let tokenizer = new Tokenizer(new FileReader);
    let fileName = '/../../samples/simpleContent.js';
    let tokens = tokenizer.getTokens(__dirname + fileName);
    tokens
        .then((tokens) => {
          assert.equal(10, tokens.length);
          assert.equal('function', tokens[1].value);
          done();
        })
        .catch((reason) => {
          assert(false);
          done();
        });
  });
  it('should yield a token by value', (done) => {
    let tokenizer = new Tokenizer(new FileReader);
    let fileName = __dirname + '/../../samples/commonJSSample1.js';
    tokenizer.yieldTokens(fileName, 'require')
        .then((tokensArray) => {
          assert.deepEqual([{
            'type': 'Identifier',
            'value': 'require'
          }], tokensArray);
          done();
        })
        .catch((reason) => {
          console.log(reason);
          assert(false);
          done();
        });
  });
  it('should yield a token with offset', (done) => {
    let tokenizer = new Tokenizer(new FileReader);
    let fileName = __dirname + '/../../samples/commonJSSample1.js';
    tokenizer.yieldTokens(fileName, 'require', 2)
        .then((tokensArray) => {
          assert.deepEqual([{
            'type': 'String',
            'value': '\'file\''
          }], tokensArray);
          done();
        })
        .catch((reason) => {
          console.log(reason);
          assert(false);
          done();
        });
  });
  it('should yield all the tokens by value', (done) => {
    let tokenizer = new Tokenizer(new FileReader);
    let fileName = __dirname + '/../../samples/commonJSSample2.js';
    tokenizer.yieldTokens(fileName, 'require', 2)
        .then((tokensArray) => {
          assert.equal(3, tokensArray.length);
          done();
        })
        .catch((reason) => {
          console.log(reason);
          assert(false);
          done();
        });
  });
});
