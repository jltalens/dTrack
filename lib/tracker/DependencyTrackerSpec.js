import {DependencyTracker} from './DependencyTracker.js';
import {CommonJSAnalyser} from '../tokenAnalysers/CommonJSAnalyser.js';
import {Tokenizer} from '../tokenizer/Tokenizer.js';
import {FileReader} from '../fileReader/FileReader.js';
describe('dependency tracker module', () => {
  let assert = require('assert');
  it('should fail if the mod. dependencies are not passed', () => {
    assert.throws(() => {
      new DependencyTracker();
    }, Error, 'Missing dependencies');
  });

  it('should be able to instantiate the class', () => {
    let commonJSAnalyser = new CommonJSAnalyser(new Tokenizer(new FileReader));
    let dependencyTracker = new DependencyTracker(commonJSAnalyser);
    assert.equal(dependencyTracker.name, 'DependencyTracker');
  });
});