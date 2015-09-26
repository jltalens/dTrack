import {CommonJSAnalyser} from './CommonJSAnalyser.js';
import {Tokenizer} from '../tokenizer/Tokenizer.js';
import {FileReader} from '../fileReader/FileReader.js';
describe('CommonJS tokens analysis', function() {
  let assert = require('assert');
  it('should fail if the dependencies are not passed', function() {
    assert.throws(() => new CommonJSAnalyser(), /Unmet dependencies/);
  });
  it('should allow us to construct passing tokenizer', () => {
    assert(new CommonJSAnalyser(new Tokenizer(new FileReader)));
  });
});
