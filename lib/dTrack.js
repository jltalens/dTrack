import trackDependencies from './trackDependencies';
import dotFormat from './translators/dotFormat';
import fs from 'fs';
export default {
  init: args => {
    let options = ['-f'];
    if (args.length < 3) {
      throw 'InvalidArguments';
    }
    let inputFile = args[2];
    try {
      if (!fs.statSync(inputFile).isFile())
        throw '';
    }
    catch(ex) {
      throw new Error(`File ${inputFile} doesn't exist or it's not accessible`);
    }
    let dependencyMap = trackDependencies.from(args[2]);
    if (args.indexOf(options[0]) !== -1) {
      return dotFormat(dependencyMap);
    }
    return dependencyMap;
  }
}
