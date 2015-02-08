/**
 * @module graph/graph
 */
(function(){
    'use strict';

    var parser = require('../parser'),
        utils = require('../helpers').utils,
        map;

    /**
     * Build dep. graph from a file
     * @param {String} filename
     * @param {String} [configFile]
     * @param {String} root
     * @returns {{}}
     */
    var fromFile = function fromFile(filename, configFile, root) {

        /**
         * Get the config map from a file
         * @see helpers/require
         * @param configFile
         * @returns {*}
         */
        var getMapFromConfig = function getMapFromConfig(configFile) {
            return require('../helpers').require.requireMaps(configFile);
        };


        /**
         * Split the dirname
         * @example
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
            var tokens = parser.getTokens(filename);
            if ( tokens.length === 0 ) {
                return [];
            }
            return parser.argumentsFor('define', tokens);
        };

        /**
         * Builds dependency graph
         * @example
         * What builds
         * {app.js:
         *   './route/Router': [{ ... }, { ... }] ,
         *   './controller/BasePage': [{ ... }, { ... }] ,
         * }
         * @param filename
         * @param rootDir
         * @param struc
         */
        var dependencyConstructor = function dependencyConstructor(filename, rootDir, struc) {
            /**
             * Returns the full file path
             * @param fileKey
             * @returns {string}
             */
            var fullFilePath = function fullFilePath(fileKey) {
                var fileName = getFileFromKey(fileKey);
                return rootDir + '/' + fileName + '.js';
            };
            /**
             * Initialize the struct to empty objects from the dependencies
             * @param struct
             * @param dependencies
             * @returns {*}
             */
            var initializeStruct = function initializeStruct(struct, dependencies) {
                dependencies.forEach(function(dep) {
                    struct[dep] = {};
                });
                return struct;
            };

            var tmpStruc = struc,
                pool = [],
                dependenciesOfFile,
                moduleName,
                moduleInStruct;
            pool.push(filename);
            while ((moduleName = pool.pop())) {
                dependenciesOfFile = dependencies(fullFilePath(moduleName));
                pool = pool.concat(dependenciesOfFile);
                //If the dependency is already in the structure find it and return its parent
                moduleInStruct = utils.findLevelInStruct(tmpStruc, moduleName);
                if (moduleInStruct === undefined) {
                    moduleInStruct = tmpStruc;
                }
                moduleInStruct[moduleName] = moduleInStruct[moduleName] || {};
                moduleInStruct[moduleName] = initializeStruct(moduleInStruct[moduleName], dependenciesOfFile);
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
                rootDir = root || split[0];

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
