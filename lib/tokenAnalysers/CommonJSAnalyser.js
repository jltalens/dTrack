export class CommonJSAnalyser {
  constructor(tokenizer) {
    if (!tokenizer || tokenizer.name !== 'Tokenizer') {
      throw new Error('Unmet dependencies');
    }
    this.tokenizer = tokenizer;
  }
  getDependencies(file) {
    return new Promise((resolve, reject) => {
      (file.indexOf('2') === -1) ? resolve(['file']) : resolve(['assert', 'file', 'io']);
    });
  }
};
