import { FileReader } from './FileReader.js';
describe('Tokenize source JS files', () => {
  'use strict';
  var assert = require('assert'),
      simpleContent = __dirname + '/../../samples/simpleContent.js',
      fileReader = new FileReader();
  it('should have a name attribute', () => {
    assert.equal('FileReader', fileReader.name);
  });
  it('should be able to return promises', (done) => {
    var sampleFilePromise = fileReader.read(simpleContent);
    sampleFilePromise.then(() => {
      assert(true);
      done();
    });
  });
  it('should be able to return the file content', (done) => {
    var sampleFilePromise = fileReader.read(simpleContent);
    sampleFilePromise.then((data) => {
      assert.equal(data.toString(), '(function(){ })();\n');
      done();
    });
  });
  it('should reject if file cant be read', (done) => {
    var filePromise = fileReader.read('notExists');
    filePromise
        .then(() => {
          assert(false);
          done();
        })
        .catch(() => {
          assert(true);
          done();
        });
  });
});
