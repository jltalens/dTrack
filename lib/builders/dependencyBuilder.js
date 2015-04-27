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
        var dep = (depType === amd) ? require('./AMD.js') : require('./commonJS.js');
        return dep;
    };

    module.exports.getBuilder = getBuilder;
})();
