function buildGraph(dependencies) {
  let node = 'digraph "%title%" { "%nodes%" }';
  let result = trackDependencies(dependencies, result);
  console.log('res', result);
  return result[0];
}

function trackDependencies(dependencies, result = '') {
  result += dependencies.reduce((prev, curr) => {
    console.log('prev', prev, 'curr', curr);
    if (result !== '')
      prev[1] += `${prev[1]} -> `;
    if (typeof curr === 'string' || curr.length === 1)
      prev[1] += `${curr}\n`;
    else {
      console.log('next', curr, prev[1]);
      let dp = trackDependencies(curr, prev[1]);
      prev[1] += dp;
    }
    return prev;
  }, ['', result]);
  console.log(result);
  return result[0];
}

export default (dependencyObject) => {
  let node = 'digraph "%title%" { "%nodes%" }';
  let entryPoint = dependencyObject.pop();
  node = node.replace('%title%', entryPoint);
  node = node.replace('%nodes%', entryPoint);
  return node;
}
