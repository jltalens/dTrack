export class DependencyTracker {
  constructor(analizer) {
    if (typeof analizer === 'undefined') {
      throw new Error('Missing dependencies');
    }
    this.analizer = analizer;
  }

  getDependencyTree(file) {
    return new Promise((resolve, reject) => {
      let deps = {
        'commonJSSample1': ['file']
      };
      resolve(deps);
    });
  }

  get name() {
    return 'DependencyTracker';
  }
};
