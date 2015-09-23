export class Tokenizer {
  constructor(fileReader) {
    if (fileReader.name !== 'FileReader') {
      throw new Error('FileReader instance expected');
    }
    this.fileReader = fileReader;
  }
  get name() {
    return 'Tokenizer';
  }
};

