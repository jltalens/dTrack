describe('ES6 Compiling', function() {
  'use strict';
  var assert = require('assert');
  it('should compile ES6 classes', function() {
    class Fraction {
      constructor(number) {
        this.number = number;
      }

      update(number) {
        this.number = number;
      }
    };
    var x = new Fraction(5);
    assert(typeof x === 'object');
  });
});
