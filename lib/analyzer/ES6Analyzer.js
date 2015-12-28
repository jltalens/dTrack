import path from 'path';
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
        imports.forEach((importedModule) => {
            let imported = {};
            imported[importedModule] = [];
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
                imports.push(path.basename(tokens[index - 1].value.replace(/'/g,''), '.js'));
            }
            return imports;
        }
    }
}