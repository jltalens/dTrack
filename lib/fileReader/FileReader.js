export class FileReader {
  constructor() {
    this.fs = require('fs');
  }
  get name() {
    return 'FileReader';
  }
  read(file) {
    var that = this;
    return new Promise(function(resolve, reject) {
      var stream = that.fs.createReadStream(file);
      stream
          .on('data', function(data) {
            resolve(data);
          })
          .on('error', function(err) {
            reject(err);
          });
    });
  }
};
