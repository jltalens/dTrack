(function(){
    'use strict';
    /**
     * Does an iterative search for a key in a given map.
     * @param haystack
     * @param needle
     * @returns {Object} Returns the object that contains the given needle
     * @example
     * var struct = {
     *  aKey:
     *      { needle: { random: {} },
     *        needle2: { random2: { anotherKey: {} } }
     *      }
     * }
     * findLevelInStruct(struct, random2);
     * //=> { random2: {anotherKey: {} } }
     */
    var findLevelInStruct = function findLevelInStruct(haystack, needle) {
        var keys = [Object.keys(haystack)],
            key,
            struct = [haystack];
        while (keys.length > 0) {
            var group = keys.pop(),
                tmpStruct = struct.pop();
            while ((key = group.pop())) {
                if (needle === key) {
                    return tmpStruct;
                }
                if (typeof tmpStruct[key] === 'object') {
                    keys.push(Object.keys(tmpStruct[key]));
                    struct.push(tmpStruct[key]);
                }
            }
        }
        return undefined;
    };
    module.exports.findLevelInStruct = findLevelInStruct;
})();
