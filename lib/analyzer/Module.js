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
      .reduce((strAcc, current) => strAcc + this.deps[current].toString() + ',', '')
      .slice(0, -1);
    return `{\"${this.name}\": [${depsAsString}]}`;
  }
  toArray() {
    let arr = [];
    arr.push(this.name);
    let depsAsArray = Object
      .keys(this.deps)
      .reduce((arrAcc, current) => arrAcc.concat(this.deps[current].toArray()), []);
    if (depsAsArray.length > 0) {
      arr.push(depsAsArray)
    }
    return arr;
  }
}
export default Module;