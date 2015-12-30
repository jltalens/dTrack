import path from 'path';
import fs from 'fs';
export default class ES6Analyzer {
    constructor(fileReader) {
        this.fileReader = fileReader;
    }
    generateDependencyObject(filePath, deps = {}) {
        const basename = path.basename(filePath, '.js');
        deps[basename] = [];
        const tokens = this.fileReader.tokenize(filePath);
        let imports = getImportsFromTokens(tokens);
        if (imports.length === 0) {
            return deps;
        }
        imports.forEach((importedPathFile) => {
            let imported = {};
            let moduleName = path.basename(importedPathFile.replace(/'/g,''), '.js');
            imported[moduleName] = [];
            deps[basename].push(imported);
        });
        return deps;


        function getImportsFromTokens(tokens) {
            let index = 0;
            let imports = [];
            //stop condition: after a ";" token comes something different of "import"
            while (1) {
                while (index < tokens.length && tokens[index].value !== 'import')
                    index += 1;
                if (index === tokens.length)
                    break;
                while (tokens[index].value !== ';')
                    index += 1;
                imports.push(tokens[index - 1].value);
            }
            return imports;
        }
    }
}