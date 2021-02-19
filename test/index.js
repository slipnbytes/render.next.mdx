const { promises } = require('fs');
const { resolve } = require('path');

const { render } = require('..');

const filePath = resolve(__dirname, 'main.mdx');

async function run() {
  const mdxContent = await promises.readFile(filePath, 'utf8');
  const result = await render(mdxContent);

  console.log(result);
}

run();
