export default function (tokens) {
  let index = 0;
  let imports = [];
  //stop condition: after a ";" token comes something different of "import"
  for (;;) {
    while (index < tokens.length && tokens[index].value !== 'require')
      index += 1;
    if (index === tokens.length)
      break;
    while (tokens[index].value !== ')')
      index += 1;
    imports.push(tokens[index - 1].value.replace(/['"]/g, ''));
  }
  return imports;
}
