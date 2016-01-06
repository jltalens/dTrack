import path from 'path';
import fs from 'fs';
import Module from './Module';
export default class ES6Analyzer {
  constructor(fileReader) {
    this.fileReader = fileReader;
  }

  generateDependencyObject(filePath, baseModule) {
    const basename = path.basename(filePath, '.js');
    baseModule = baseModule || new Module(basename);
    const tokens = this.fileReader.tokenize(filePath);
    let module = getImportsFromTokens(tokens)
      .reduce((prevObj, importedPathFile) => buildDependencyObject(importedPathFile, prevObj, this), baseModule);

    return module.toObject();


    function buildDependencyObject(importedPathFile, module, context) {
      let moduleName = path.basename(importedPathFile, '.js');
      let moduleAbsolutePath = path.dirname(filePath) + '/' + importedPathFile.replace(/'/g, '') + '.js';
      module.addDependency(moduleName);
      if (fs.existsSync(moduleAbsolutePath)) {
        context.generateDependencyObject(moduleAbsolutePath, module.deps[moduleName]);
      }

      return module;
    }

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
        imports.push(tokens[index - 1].value.replace(/'/g, ''));
      }
      return imports;
    }
  }
}