/**
 * @module graph/graph
 */
(function(){
    'use strict';

    var utils = require('../helpers').utils,
        dependencyBuilder,
        map;

    /**
     * Build dep. graph from a file
     * @param {String} depType Type of dependency (AMD, CommonJS,...)
     * @param {String} filename
     * @param {String} [configFile]
     * @param {String} root
     * @returns {Object}
     */
    var readFromFile = function readFromFile(depType, filename, configFile, root) {

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
                dependenciesOfFile = dependencyBuilder.getDependencies(fullFilePath(moduleName));
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
            var deps = dependencyBuilder.getDependencies(filename);
            deps.forEach(function(dependency){
                var fileFromKey = getFileFromKey(dependency);
                var dep = dependencyConstructor(fileFromKey, rootDir, {});
                structure[file][dependency] = dep[fileFromKey];
            });
            return structure;
        };

        /**
         * Main entrance
         * @param depType
         * @param filename
         * @param configFile
         */
        var init = function init(depType, filename, configFile) {
            //Get the dependency builder helpers
            dependencyBuilder = require('../builders').dependencyBuilder.getBuilder(depType);
            if (typeof configFile !== 'undefined') {
                map = dependencyBuilder.requireMaps(configFile);
            }
            return buildFromFile(filename, map);
        };

        return init(depType, filename, configFile);

    };

    module.exports = {
        readFromFile: readFromFile
    };
})();
