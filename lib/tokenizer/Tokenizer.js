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
    return new Promise((resolve, reject) => {
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

  yieldTokens(fileName, valueName, offset) {
    let that = this;
    return new Promise((resolve, reject) => {
      that.getTokens(fileName)
        .then((tokens) => {
            let foundTokens = getTokensFoundByValue (tokens, offset);
            resolve(foundTokens);
          })
          .catch(reject);
    });
    function getTokensFoundByValue(tokens, offset = 0) {
      let foundTokens = [];
      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].value === valueName) {
          foundTokens.push (tokens[i + offset]);
        }
      }
      return foundTokens;
    }
  }
  get name() {
    return 'Tokenizer';
  }
};
