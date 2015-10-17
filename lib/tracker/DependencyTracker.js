export class DependencyTracker {
  constructor(analizer) {
    if (typeof analizer === 'undefined') {
      throw new Error('Missing dependencies');
    }
    this.analizer = analizer;
    this.path = require('path');
    this.jsExtension = '.js';
  }

  getDependencyTree(file) {
    let that = this;
    return new Promise((resolve, reject) => {
      that.analizer.getDependencies(file)
          .then((deps) => {
            let fileName = that.path.basename(file, that.jsExtension);
            let values = {};
            values[fileName] = deps;
            resolve(values);
          })
          .catch((error) => {
            reject(error);
          });
    });
  }

  get name() {
    return 'DependencyTracker';
  }
};
