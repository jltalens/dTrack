import trackDependencies from './trackDependencies';
import dotFormat from './translators/dotFormat';
export default {
  init: args => {
    let options = ['-i', '-f'];
    if (args.length < 4) {
      throw new Error('InvalidArguments');
    }
    let optionIniFile = args.indexOf(options[0]);
    if (optionIniFile === -1) {
      throw new Error('InvalidArguments');
    }
    let dependencyMap = trackDependencies.from(args[optionIniFile + 1]);
    if (args.indexOf(options[1]) !== -1) {
      return dotFormat(dependencyMap);
    }
    return dependencyMap;
  }
}
