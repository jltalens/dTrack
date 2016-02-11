import trackDependencies from './trackDependencies';
import dotFormat from './translators/dotFormat';
import es6analyzer from '../lib/analyzer/ES6Analyzer';
import commonJSAnalyzer from '../lib/analyzer/CommonJSAnalyzer';
import fs from 'fs';
import minimist from 'minimist';
export default {
  init: args => {
    const FORMAT_OPTION = 'f';
    let arg = minimist(args.slice(2));
    if (arg._.length !== 1) {
      throw new Error('Input file needed');
    }
    let dependencyMap = trackDependencies.from(arg._[0], commonJSAnalyzer);
    if (arg.hasOwnProperty(FORMAT_OPTION)) {
      return dotFormat(dependencyMap);
    }
    return dependencyMap;
  }
}
