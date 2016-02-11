import trackDependencies from './trackDependencies';
import dotFormat from './translators/dotFormat';
import es6analyzer from '../lib/analyzer/ES6Analyzer';
import commonJSAnalyzer from '../lib/analyzer/CommonJSAnalyzer';
import fs from 'fs';
import minimist from 'minimist';
export default {
  init: args => {
    const FORMAT_OPTION = 'f';
    const ANALYSER_TYPE_OPTION = 't';
    const options = ['_', FORMAT_OPTION, ANALYSER_TYPE_OPTION];
    let analyzer = es6analyzer;
    let arg = minimist(args.slice(2));
    if (arg._.length !== 1) {
      throw new Error('Input file needed');
    }
    let argumentKeys = Object.keys(arg);
    if ( argumentKeys.length > 1 && !argumentKeys.every(key => options.indexOf(key) !== -1)) {
      throw new Error('It only supports an output format option \'-f\' and/or import type \'-t\'');
    }
    if (arg.hasOwnProperty('t') && ['es6', 'commonJS'].indexOf(arg.t) !== -1) {
      analyzer = (arg.t === 'commonJS') ? commonJSAnalyzer : es6analyzer;
    }
    let dependencyMap = trackDependencies.from(arg._[0], analyzer);
    if (arg.hasOwnProperty(FORMAT_OPTION)) {
      return dotFormat(dependencyMap);
    }
    return dependencyMap;
  }
}
