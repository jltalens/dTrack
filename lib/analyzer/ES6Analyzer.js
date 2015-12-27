import path from 'path';
export default class ES6Analyzer {
    constructor(fileReader) {
        this.fileReader = fileReader;
    }
    generateDependencyObject(filePath) {
        let deps = {};
        deps[path.basename(filePath, '.js')] = [];
        return deps;
    }
}