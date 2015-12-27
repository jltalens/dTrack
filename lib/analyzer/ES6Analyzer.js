import path from 'path';
import R from 'ramda';
export default class ES6Analyzer {
    constructor(fileReader) {
        this.fileReader = fileReader;
        this.keyForImports = 'value';
        this.valueForImports = 'import';
    }
    generateDependencyObject(filePath) {
        let deps = {};
        deps[path.basename(filePath, '.js')] = [];
        if (R.findIndex(R.propEq(this.keyForImports, this.valueForImports))(this.fileReader.tokenize(filePath)) === -1) {
            return deps;
        }
    }
}