describe("ES6 Compiling", function(){
    "use strict";
    var assert = require("assert");
    it("should compile ES6 classes", function () {
        class Fraction {
            constructor(number) {
                this.number = number;
            }
            update(number) {
                this.number = number;
            }
        }
        var x = new Fraction(5);
        assert(typeof x === "object");
    });

    it("should modify the array", function () {
        var m = [1,2,3];
        m = m.map(v => v + 1);
        assert.deepEqual(m, [2,3,4], `It should output [2,3,4]: ${m}`);
    });
});