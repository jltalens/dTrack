(function() {
    /**
     * @module parser
     */
    'use strict';
    var fs = require('../fs');
    var esprima = require('esprima');

    /**
     * Returns the application tokens
     * @param {String} file
     * @returns {Array}
     */
    var getTokens = function getTokens(file) {
        var content = fs.open(file);
        if ( content === -1 ) {
            return [];
        }
        return esprima.tokenize(content, {
            tolerant: true
        });
    };

    /**
     * Gets the values inside an array of the specified function
     * @param {String} func
     * @param {Array} tokens
     * @returns {Array}
     */
    var argumentsFor = function argumentsFor(func, tokens) {

        /**
         * Returns the values of a tokenized array
         * @private
         * @param {number} index
         * @param {Array} tokens
         * @param {Array} args
         * @returns {Array}
         */
        var gatherArguments = function gatherArguments(index, tokens, args) {
            var cleanString = function cleanString(dirtyString) {
                return dirtyString.replace(/'/g, '');
            };
            while (tokens[index] && tokens[index].type !== 'Keyword') {
                if (tokens[index].type === 'String') {
                    args.push(cleanString(tokens[index].value));
                }
                index++;
            }
            return args;
        };

        var index = 0,
            args = [];
        while (index < tokens.length) {
            if (tokens[index].value === func) {
                args = gatherArguments(index, tokens, args);
            }
            index ++;
        }
        return args;
    };

    module.exports = {
        getTokens: getTokens,
        argumentsFor: argumentsFor
    };
})();
