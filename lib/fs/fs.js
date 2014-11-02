(function(){
    'use strict';
    var fs = require('fs');

    /**
     * Returns the content of a file
     * @var string file
     * @return string
     */
    var open = function open(file) {
        return fs.readFileSync(file, 'utf8');
    };

    module.exports = {
        open: open
    };
})();
