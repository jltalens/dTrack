"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

describe("ES6 Compiling", function () {
    "use strict";
    var assert = require("assert");
    it("should compile ES6 classes", function () {
        var Fraction = (function () {
            function Fraction(number) {
                _classCallCheck(this, Fraction);

                this.number = number;
            }

            _createClass(Fraction, [{
                key: "update",
                value: function update(number) {
                    this.number = number;
                }
            }]);

            return Fraction;
        })();

        var x = new Fraction(5);
        assert(typeof x === "object");
    });
});

//# sourceMappingURL=ES6CompilerSpec-compiled.js.map