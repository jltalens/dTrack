/**
 * @module graph/graph
 */
(function(){
    'use strict';

    var parser = require('../parser'),
        map;

    /**
     * Build dep. graph from a file
     * @param {String} filename
     * @param {String} [configFile]
     * @returns {{}}
     */
    var fromFile = function fromFile(filename, configFile) {

        /**
         * Get the config map from a file
         * @see helpers/require
         * @param configFile
         * @returns {*}
         */
        var getMapFromConfig = function getMapFromConfig(configFile) {
            return require('../helpers').requireMaps(configFile);
        };


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
         * {app.js:
         *   './route/Router': [{ ... }, { ... }] ,
         *   './controller/BasePage': [{ ... }, { ... }] ,
         * }
         * @param filename
         * @param rootDir
         * @param struc
         */
        var dependencyConstructor = function dependencyConstructor(filename, rootDir, struc) {
            var tmpStruc = struc,
                pool = [],
                arg;
            pool.push(filename);
            while ((arg = pool.pop()) !== undefined) {
                tmpStruc[arg] = {};
                var tkns = parser.getTokens(rootDir + '/' + getFileFromKey(arg) + '.js');
                if (tkns.length !== 0) {
                    var dependeciesOfFile = parser.argumentsFor('define', tkns);
                    pool = pool.concat(dependeciesOfFile);
                    dependeciesOfFile.forEach(function(dep) {
                        tmpStruc[arg][dep] = {};
                    });
                    tmpStruc = tmpStruc[arg];
                }
            }
            return struc;
        };

        /**
         *
         * @param dependency
         */
        var getFileFromKey = function getFileFromKey(dependency) {
            return map[dependency] || dependency;
        };

        var buildFromFile = function buildFromFile(filename) {
            var split = splitName(filename),
                structure = {},
                file = split[1],
                rootDir = split[0];

            structure[file] = {};
            var deps = dependencies(filename);
            deps.forEach(function(dependency){
                var fileFromKey = getFileFromKey(dependency);
                var dep = dependencyConstructor(fileFromKey, rootDir, {});
                structure[file][dependency] = dep[fileFromKey];
            });
            return structure;
        };

        var init = function init(filename, configFile) {
            if (typeof configFile !== 'undefined') {
                map = getMapFromConfig(configFile);
            }
            return buildFromFile(filename, map);
        };


        return init(filename, configFile);

    };

    module.exports = {
        readFromFile: fromFile
    };
})();
