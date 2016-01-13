function trackDependencies(dependencies, result = '') {
  let first = dependencies.shift().replace(/"/g, '');
  let node = `digraph "${first}" { %nodes% }`;
  if (dependencies.length === 0) {
    return node.replace('%nodes%', '"' + first + '"');
  }
  let depAsString = `"${first}" -> "{dep}"`;
  dependencies[0].forEach((elem) => {
    result += depAsString.replace('{dep}', elem) + '; ';
  });
  return node.replace('%nodes%', result.slice(0, -1));
}

export default (dependencyObject) => {
  return trackDependencies(dependencyObject);
}
