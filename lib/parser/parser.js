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
     * Returns the values of a tokenized array
     * @private
     * @param {number} index
     * @param {Array} tokens
     * @returns {Array}
     */
    var gatherArguments = function gatherArguments(index, tokens) {
        var cleanString = function cleanString(dirtyString) {
            return dirtyString.replace(/'/g, '');
        };
        var args = [];
        while (tokens[index].type !== 'Keyword') {
            if (tokens[index].type === 'String') {
                args.push(cleanString(tokens[index].value));
            }
            index++;
        }
        return args;
    };

    /**
     * Gets the values inside an array of the specified function
     * @param {String} func
     * @param {Array} tokens
     * @returns {Array}
     */
    var argumentsFor = function argumentsFor(func, tokens) {
        var index = 0,
            tokensLength = tokens.length;
        if (tokensLength === 0) {
            return [];
        }
        while (tokens[index].value !== func && index < tokensLength) {
            index ++;
        }
        if (index === tokensLength) {
            throw new Error( func + ' not found');
        }
        var args = gatherArguments(index, tokens);
        return args;   
    };

    module.exports = {
        getTokens: getTokens,
        argumentsFor: argumentsFor
    };
})();
