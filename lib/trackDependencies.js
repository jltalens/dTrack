import DependencyObjectAggregator from './analyzer/DependencyObjectAggregator';
import fileReader from './fileReader/fileReader';
export default {
  from: (filePath, analyser) => new DependencyObjectAggregator(fileReader, analyser).generateDependencyObject(filePath)
}