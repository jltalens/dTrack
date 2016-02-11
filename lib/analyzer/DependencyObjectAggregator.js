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

  generateDependencyObject(filePath, baseModule, globalDeps = []) {
    const basename = path.basename(filePath, '.js');
    baseModule = baseModule || new Module(basename);
    const tokens = this.fileReader.tokenize(filePath);
    let module = this.analyzer(tokens)
      .reduce((prevObj, importedPathFile) => buildDependencyObject(importedPathFile, prevObj, this), baseModule);

    return module.toArray();


    function buildDependencyObject(importedPathFile, module, context) {
      let moduleName = path.basename(importedPathFile, '.js');
      let moduleAbsolutePath = addFileExtension(path.dirname(filePath) + path.sep + importedPathFile);
      module.addDependency(moduleName);
      if (globalDeps.indexOf(moduleName) !== -1) {
        return module;
      }
      globalDeps.push(moduleName);
      if (fs.existsSync(moduleAbsolutePath) && path.extname(moduleAbsolutePath) === '.js') {
        context.generateDependencyObject(moduleAbsolutePath, module.deps[moduleName], globalDeps);
      }

      return module;

      function addFileExtension(moduleAbsolutePath) {
        if (path.extname(moduleAbsolutePath) === '') {
          moduleAbsolutePath += '.js';
        }
        return moduleAbsolutePath
      }
    }
  }
}
