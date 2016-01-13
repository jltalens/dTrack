function trackDependencies(dependencies, result = '') {
  let first = dependencies.shift().replace(/"/g, '');
  let node = `digraph "${first}" { %nodes% }`;
  let prev = first;
  if (dependencies.length === 0) {
    return node.replace('%nodes%', '"' + first + '"');
  }
  let depAsString = '"{first}" -> "{dep}"';
  dependencies[0].forEach((elem) => {
    if (typeof elem !== 'string') {
      first = prev;
    }
    result += depAsString.replace('{first}', first).replace('{dep}', elem) + '; ';
    prev = elem;
  });
  return node.replace('%nodes%', result.slice(0, -1));
}

export default (dependencyObject) => {
  return trackDependencies(dependencyObject);
}
