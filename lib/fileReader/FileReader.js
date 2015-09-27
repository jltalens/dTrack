export class FileReader {
  constructor() {
    this.fs = require('fs');
  }
  get name() {
    return 'FileReader';
  }
  read(file) {
    var that = this;
    return new Promise((resolve, reject) => {
      var stream = that.fs.createReadStream(file);
      stream
          .on('data', resolve)
          .on('error', reject);
    });
  }
};
