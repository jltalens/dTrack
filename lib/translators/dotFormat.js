function trackDependencies(dependencies, result = '') {
  let first = dependencies.shift().replace(/"/g, '');
  let node = `digraph "${first}" { %nodes% }`;
  let prev = first;
  if (dependencies.length === 0) {
    return node.replace('%nodes%', '"' + first + '"');
  }
  console.log(first, dependencies[0]);
  let depAsString = '"{first}" -> "{dep}"';
  dependencies[0].forEach((elem) => {
    if (typeof elem !== 'string') {
      first = prev;
    }
    result += depAsString.replace('{first}', first).replace('{dep}', elem) + '; ';
    prev = elem;
  });

  let dependantsPool = [].push(first);
  let i = 0;
  let depAsString = '"{first}" -> "{dep}"';
  result = '';
  while (i < dependencies.length) {
    let first = dependantsPool.pop();
    if (typeof dependencies[i] === 'string') {
      result += depAsString.replace('{first}', first).replace('{dep}', dependencies[i]) + '; ';
    }
    else {
      dependantsPool.push(first).push(dependencies[i]);
    }
  }


  return node.replace('%nodes%', result.slice(0, -1));
}

export default (dependencyObject) => {
  return trackDependencies(dependencyObject);
}
