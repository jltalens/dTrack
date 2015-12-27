import ES6Analyzer from './analyzer/ES6Analyzer';
import fileReader from './fileReader/fileReader';
export default {
    from: filePath => {
        return new ES6Analyzer(fileReader).generateDependencyObject(filePath);
    }
}