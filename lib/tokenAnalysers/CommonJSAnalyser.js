export class CommonJSAnalyser {
  constructor(tokenizer) {
    if (!tokenizer || tokenizer.name !== 'Tokenizer') {
      throw new Error('Unmet dependencies');
    }
    this.tokenizer = tokenizer;
  }
};
