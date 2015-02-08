/**
 * @module helpers/require
 */
(function(){
    'use strict';

    /**
     * Return an object with the key => file relations
     * @param file
     * @returns {Object}
     */
    var requireMaps = function requireMaps(file) {
        var parser = require('../parser');
        /**
         * Removes the ' characters from a string
         * @param string
         * @returns {*|XML|string|void}
         */
        var removeTilde = function removeTilde(string) {
            return string.replace(/'/g, '');
        };
        /**
         * Finds the index in the tokens for a given value
         * @param tokens
         * @param value
         * @returns {number}
         */
        var findIndexForValue = function findIndexForValue(tokens, value) {
            var ini = 0;
            while (tokens[ini].value !== value) {
                ini++;
            }
            return ini;
        };
        /**
         * Builds the key => file map
         * @param ini
         * @param end
         * @param tokens
         * @param key
         * @param map
         * @returns {*}
         */
        var buildMap = function buildMap(ini, end, tokens, key, map) {
            while (ini < end) {
                while (tokens[ini].type !== 'String') {
                    ini++;
                }
                if (ini > end) {
                    break;
                }
                key = removeTilde(tokens[ini].value);
                ini++;
                while (tokens[ini].type !== 'String') {
                    ini++;
                }
                map[key] = removeTilde(tokens[ini].value);
                ini++;
            }
            return map;
        };
        /**
         * Init the vars and invoke the map builder
         * @param file
         * @returns {*}
         */
        var getConfigObject = function getConfigObject(file) {
            var tokens = parser.getTokens(file),
                map = {},
                key = '',
                finish = ['map', 'shim', ')'],
                ini,
                end;
            if (tokens.length === 0) {
                return {};
            }
            end = ini = findIndexForValue(tokens, 'paths');
            while (finish.indexOf(tokens[end].value) === -1) {
                end++;
            }
            return buildMap(ini, end, tokens, key, map);
        };
        return getConfigObject(file);
    };


    
    module.exports = {
        requireMaps: requireMaps
    };
})();
