/**
 * @module builders/commonJS
 */
(function() {
    'use strict';

    var type = 'CommonJS';

    var getDependencies = function getDependencies(filename) {
        var parser = require('../parser/index'),
            tokens = parser.getTokens(filename);
        if ( tokens.length === 0 ) {
            return [];
        }
        return parser.argumentsFor('require', tokens);
    };

    module.exports = {
        getDependencies: getDependencies,
        type: type
    };
})();