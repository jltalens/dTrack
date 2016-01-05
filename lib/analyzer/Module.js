class Module {
  constructor(name = '') {
    this.name = name;
    this.deps = [];
  }
};
export default Module;