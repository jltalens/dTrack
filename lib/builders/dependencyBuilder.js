/**
 * @module builders/dependencyBuilder
 */
(function(){
    'use strict';

    var amd = 'AMD',
        common = 'CommonJS';

    /**
     * Get
     * @param {String} depType
     */
    var getBuilder = function(depType){
        var dep = (depType === amd) ? require('./require.js') : require('./require.js');
        return dep;
    };

    module.exports.getBuilder = getBuilder;
})();
