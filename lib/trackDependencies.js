import es6analyzer from './analyzer/ES6Analyzer';
import DependencyObjectAggregator from './analyzer/DependencyObjectAggregator';
import fileReader from './fileReader/fileReader';
export default {
  from: filePath => new DependencyObjectAggregator(fileReader, es6analyzer).generateDependencyObject(filePath)
}