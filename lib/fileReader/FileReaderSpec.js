import { FileReader } from './FileReader.js';
describe('Tokenize source JS files', function() {
  'use strict';
  var assert = require('assert'),
      simpleContent = __dirname + '/../../samples/simpleContent.js',
      fileReader = new FileReader();
  it('should have a name attribute', function() {
    assert.equal('FileReader', fileReader.name);
  });
  it('should be able to return promises', function(done) {
    var sampleFilePromise = fileReader.read(simpleContent);
    sampleFilePromise.then(function() {
      assert(true);
      done();
    });
  });
  it('should be able to return the file content', function(done) {
    var sampleFilePromise = fileReader.read(simpleContent);
    sampleFilePromise.then(function(data) {
      assert.equal(data.toString(), '(function(){ })();\n');
      done();
    });
  });
  it('should reject if file cant be read', function(done) {
    var filePromise = fileReader.read('notExists');
    filePromise
        .then(function(data) {
          assert(false);
          done();
        })
        .catch(function(reason) {
          assert(true);
          done();
        });
  });
});
