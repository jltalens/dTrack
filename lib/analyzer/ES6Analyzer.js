import path from 'path';
import R from 'ramda';
export default class ES6Analyzer {
    constructor(fileReader) {
        this.fileReader = fileReader;
        this.keyForValues = 'value';
        this.valueForImports = 'import';
        this.importedModuleOffsetIndex = 3;
    }
    generateDependencyObject(filePath, deps = {}) {
        const basename = path.basename(filePath, '.js');
        deps[basename] = [];
        const tokens = this.fileReader.tokenize(filePath);
        const index = R.findIndex(R.propEq(this.keyForValues, this.valueForImports))(tokens);
        if (index === -1) {
            return deps;
        }
        const importedModule = tokens[index + this.importedModuleOffsetIndex][this.keyForValues].replace(/'/g,'');
        deps[basename][0] = {};
        deps[basename][0][importedModule] = [];
        return deps;
    }
}