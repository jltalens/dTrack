/**
 * @module graph/graph
 */
(function(){
    'use strict';

    var parser = require('../parser');

    /**
     * Build dep. graph from a file
     * @param filename
     * @returns {{}}
     */
    var fromFile = function fromFile(filename) {
        /**
         * Split the dirname
         * input:
         * /some/dir/file.js
         * output:
         * [/some/dir, file.js]
         * @param {String} filename
         * @returns {Array}
         */
        var splitName = function splitName(filename) {
            var lastFolder = filename.lastIndexOf('/');
            if (lastFolder === -1) {
                return ['', filename];
            }
            var dir = filename.substr(0, lastFolder);
            var file = filename.substring(lastFolder + 1);
            return [dir, file];
        };
        /**
         * Get the dependencies for the given filename
         * @param {String} filename
         * @returns {Array}
         */
        var dependencies = function dependencies(filename) {
            return parser.argumentsFor('define', parser.getTokens(filename));
        };

        /**
         * Builds dependency graph
         * @example What builds
         * {app.js: [
         *  { './route/Router': [{ ... }, { ... }] },
         *  { './controller/BasePage': [{ ... }, { ... }] },
         *  ]
         * }
         * @param filename
         * @param rootDir
         * @param struc
         */
        var dependencyConstructor = function dependencyConstructor(filename, rootDir, struc) {
            var tmpStruc = struc;
            var pool = [],
                arg;
            pool.push(filename);
            while ((arg = pool.pop()) !== undefined) {
                tmpStruc[arg] = {};
                var tkns = parser.getTokens(rootDir + '/' + arg + '.js');
                if (tkns.length !== 0) {
                    var dependeciesOfFile = parser.argumentsFor('define', tkns);
                    pool = pool.concat(dependeciesOfFile);
                    tmpStruc = tmpStruc[arg];
                }
            }
            return struc;
        };

        var split = splitName(filename),
            structure = {},
            file = split[1],
            rootDir = split[0];
        structure[file] = {};
        var deps = dependencies(filename);
        deps.forEach(function(dependency){
            var dep = dependencyConstructor(dependency, rootDir, {});
            structure[file][dependency] = dep[dependency];
        });
        return structure;

    };

    module.exports = {
        readFromFile: fromFile
    };
})();
