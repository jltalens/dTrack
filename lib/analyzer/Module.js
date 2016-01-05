class Module {
  constructor(name = '') {
    this.name = name;
    this.deps = {};
  }
  addDependency(dep) {
    this.deps[dep] = new Module(dep);
    return this;
  }
  toObject() {
    return JSON.parse(this.toString());
  }
  toString() {
    let depsAsString = Object
      .keys(this.deps)
      .reduce((strAcc, key) => strAcc + this.deps[key].toString() + ',', '')
      .slice(0, -1);
    return `{\"${this.name}\": [${depsAsString}]}`;
  }
};
export default Module;