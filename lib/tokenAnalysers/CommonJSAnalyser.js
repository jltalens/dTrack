export class CommonJSAnalyser {
  constructor(tokenizer) {
    if (!tokenizer || tokenizer.name !== 'Tokenizer') {
      throw new Error('Unmet dependencies');
    }
    this.tokenizer = tokenizer;
  }
  getDependencies(file) {
    let that = this;
    return new Promise((resolve, reject) => {
      that.tokenizer.yieldTokens(file, 'require', 2)
          .then((tokens) => {
            resolve(tokens.map((token) => {
              //The tokenizer returns the quotes of the values as well.
              return token.value.replace(/'/g, '');
            }));
          })
          .catch(reject);
    });
  }
};
