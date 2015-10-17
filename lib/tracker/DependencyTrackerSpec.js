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

  it('should be able to get a core module from a file', (done) => {
    let file = __dirname + '/../../samples/commonJSSample1.js';
    let commonJSAnalyser = new CommonJSAnalyser(new Tokenizer(new FileReader));
    let dependencyTracker = new DependencyTracker(commonJSAnalyser);
    let expected = {
      'commonJSSample1': ['file']
    };
    dependencyTracker.getDependencyTree(file)
        .then((deps) => {
            assert.deepEqual(deps, expected);
            done();
        })
        .catch((reason) => {
            console.log(reason);
            assert(false);
            done();
        });
  });

  it('should be able to get all core modules from a file', (done) => {
    let file = __dirname + '/../../samples/commonJSSample2.js';
    let commonJSAnalyser = new CommonJSAnalyser(new Tokenizer(new FileReader));
    let dependencyTracker = new DependencyTracker(commonJSAnalyser);
    let expected = {
      'commonJSSample2': ['assert', 'file', 'io']
    };
    dependencyTracker.getDependencyTree(file)
        .then((deps) => {
            assert.deepEqual(deps, expected);
            done();
        })
        .catch((reason) => {
            console.log(reason);
            assert(false);
            done();
        });
  });


});