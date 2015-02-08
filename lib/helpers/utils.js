(function(){
    'use strict';
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
