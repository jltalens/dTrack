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

    /**
     *
     * @param dependency
     * @returns {*}
     */
    var getFileFromKey = function getFileFromKey(dependency) {
        return dependency;
    };

    /**
     *
     * @param fileKey
     * @param rootDir
     * @returns {string}
     */
    var fullFilePath = function fullFilePath(fileKey, rootDir) {
        var fileName = getFileFromKey(fileKey);
        return rootDir + '/' + fileName + '.js';
    };

    module.exports = {
        getDependencies: getDependencies,
        type: type,
        getFileFromKey: getFileFromKey,
        fullFilePath: fullFilePath
    };
})();