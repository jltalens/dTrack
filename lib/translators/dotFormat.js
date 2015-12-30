export default (dependencyObject) => {
  let node = 'digraph "%title%" { "%nodes%" }';
  let entryPoint = Object.keys(dependencyObject).pop();
  node = node.replace('%title%', entryPoint);
  node = node.replace('%nodes%', entryPoint);
  return node;
}
