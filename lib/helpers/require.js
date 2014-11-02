(function(){
    'use strict';

    var requireMaps = function requireMaps(file) {
        var parser = require('../parser');
        var getConfigObject = function getConfigObject(file) {
            var tokens = parser.getTokens(file),
                tokensLength = tokens.length,
                map = {},
                key = '',
                value = '',
                finish = ['map', 'shim', ')'],
                ini = 0,
                end = 0;
            while (tokens[ini].value !== 'paths') {
                ini++;
            }
            end = ini;
            while (finish.indexOf(tokens[end].value) === -1) {
                end++;
            }
            while(ini < end) {
                while (tokens[ini].type !== 'String') {
                    ini++;
                }
                if (ini > end) {
                    break;
                }
                key = tokens[ini].value.replace(/'/g, '');
                ini++;
                while (tokens[ini].type !== 'String') {
                    ini++;
                }
                map[key] = tokens[ini].value.replace(/'/g, '');
                ini++;
            }
            return map;
        };
        return getConfigObject(file);
    };
    
    module.exports = {
        requireMaps: requireMaps
    };
})();
