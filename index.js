function oneLine(template, ...expressions) {
  let result = template.reduce((prev, next, i) => {
      let expression = expressions[i - 1];
      return prev + expression + next;
  });

  result = result.replace(/(\s+)/g, " ");
  result = result.trim();

  return result;
}
let message = oneLine`
	Hi,
	Daisy!
	I am
	Kevin.
`;