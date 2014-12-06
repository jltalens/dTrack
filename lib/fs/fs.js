(function(){
    'use strict';
    var fs = require('fs');

    /**
     * Returns the content of a file
     * @var {String} file
     * @return {String|Number}
     */
    var open = function open(file) {
        var content;
        try {
            content = fs.readFileSync(file, 'utf8');
        }
        catch(ex) {
            return -1;
        }
        return content;
    };

    module.exports = {
        open: open
    };
})();
