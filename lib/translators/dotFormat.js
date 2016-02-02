function trackDependencies(dependencies) {
  let head = dependencies.shift();
  let digraph = `digraph "${head}" { $nodes$ }`;
  if (dependencies.length === 0) {
    return digraph.replace('$nodes$', `"${head}"`);
  }
  return digraph.replace('$nodes$', trackDependencies_(dependencies[0], '', head).slice(0, -1));


  function trackDependencies_(dependencies, result, head) {
    let i = 0;
    head = head || dependencies[i++].replace(/['"]/g, '');
    while (i < dependencies.length) {
      if (typeof dependencies[i] === 'string') {
        //dependencies[i] = dependencies[i].replace(/['"]/g, '');
        result += `"${head}" -> "${dependencies[i]}"[dir=back]; `;
      }
      else {
        result = trackDependencies_(dependencies[i], result, dependencies[i -1]);
      }
      i++;
    }
    return result;
  }
}

export default (dependencyObject) => {
  return trackDependencies(dependencyObject);
}
