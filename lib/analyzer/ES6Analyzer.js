import path from 'path';
import fs from 'fs';
import Module from './Module';
export default class {
  constructor(fileReader) {
    this.fileReader = fileReader;
  }

  generateDependencyObject(filePath, baseModule) {
    const basename = path.basename(filePath, '.js');
    baseModule = baseModule || new Module(basename);
    const tokens = this.fileReader.tokenize(filePath);
    let module = getImportsFromTokens(tokens)
      .reduce((prevObj, importedPathFile) => buildDependencyObject(importedPathFile, prevObj, this), baseModule);

    return module.toArray();


    function buildDependencyObject(importedPathFile, module, context) {
      let moduleName = path.basename(importedPathFile, '.js');
      let moduleAbsolutePath = path.dirname(filePath) + path.sep + importedPathFile;
      if (path.extname(moduleAbsolutePath) === '') {
          moduleAbsolutePath += '.js';
      }
      module.addDependency(moduleName);
      if (fs.existsSync(moduleAbsolutePath) && path.extname(moduleAbsolutePath) === '.js') {
        context.generateDependencyObject(moduleAbsolutePath, module.deps[moduleName]);
      }

      return module;
    }

    function getImportsFromTokens(tokens) {
      let index = 0;
      let imports = [];
      //stop condition: after a ";" token comes something different of "import"
      for (;;) {
        while (index < tokens.length && tokens[index].value !== 'import')
          index += 1;
        if (index === tokens.length)
          break;
        while (tokens[index].value !== ';')
          index += 1;
        imports.push(tokens[index - 1].value.replace(/['"]/g, ''));
      }
      return imports;
    }
  }
}
