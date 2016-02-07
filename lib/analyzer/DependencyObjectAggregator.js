import path from 'path';
import fs from 'fs';
import Module from './Module';
export default class {
  constructor(fileReader, analyzer) {
    let fail = false,
      unmetDependency = [];
    if (typeof fileReader === 'undefined') {
      fail = true;
      unmetDependency.push('fileReader');
    }
    if (typeof analyzer === 'undefined') {
      fail = true;
      unmetDependency.push('analyzer');
    }
    if (fail === true) {
      throw `Unmet dependencies: ${unmetDependency.join(' ')}`;
    }
    this.fileReader = fileReader;
    this.analyzer = analyzer;
  }

  generateDependencyObject(filePath, baseModule) {
    const basename = path.basename(filePath, '.js');
    baseModule = baseModule || new Module(basename);
    const tokens = this.fileReader.tokenize(filePath);
    let module = this.analyzer(tokens)
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
  }
}
