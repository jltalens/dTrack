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
  it('should return the modules required in a file', () => {
    let sample1 = __dirname + '/../../samples/commonJSSample1.js';
    let commonJS = new CommonJSAnalyser(new Tokenizer(new FileReader));
    assert.deepEqual(['file'], commonJS.getDependencies(sample1));

    let sample2 = __dirname + '/../../samples/commonJSSample2.js';
    assert.deepEqual(['require'], commonJS.getDependencies(sample2));
  });
});
