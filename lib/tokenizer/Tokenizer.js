export class Tokenizer {
  constructor(fileReader) {
    if (fileReader.name !== 'FileReader') {
      throw new Error('FileReader instance expected');
    }
    this.fileReader = fileReader;
    this.esprima = require('esprima');
  }
  getTokens(fileName) {
    let that = this;
    return new Promise(function(resolve, reject) {
      that.fileReader.read(fileName)
          .then(function(data) {
            resolve(that.tokenize(data));
          })
          .catch(reject);
    });
  }
  tokenize(content) {
    return this.esprima.tokenize(content);
  }
  get name() {
    return 'Tokenizer';
  }
};
