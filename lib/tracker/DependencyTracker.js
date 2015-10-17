export class DependencyTracker {
  constructor(analizer) {
    if (typeof analizer === 'undefined') {
      throw new Error('Missing dependencies');
    }
    this.analizer = analizer;
  }

  get name() {
    return 'DependencyTracker';
  }
};
