import { transformAsync } from '@babel/core';
import mdx from '@mdx-js/mdx';
import { renderToStaticMarkup } from 'react-dom/server';

import { MDX_OPTIONS, BABEL_TRANSFORM_OPTIONS } from './constants';
import { getComponentsByImports } from './getComponentsByImports';
import { makeMarkdownElement } from './makeMarkdownElement';
import { parseScope } from './parseScope';
import type { RenderData, RenderOptions } from './types';

export async function render(
  markdown: string,
  options: RenderOptions = {},
): Promise<RenderData> {
  const {
    rehypePlugins = [],
    remarkPlugins = [],
    scope: defaultScope = {},
  } = options;

  const component = await mdx(
    markdown,
    Object.assign(MDX_OPTIONS, { rehypePlugins, remarkPlugins }),
  );

  const fileResult = await transformAsync(component, BABEL_TRANSFORM_OPTIONS);

  if (!fileResult || !fileResult.code) {
    throw new Error('Unresolved babel compilation.');
  }

  const { code: defaultCode } = fileResult;

  const components = await getComponentsByImports(component);
  const scope = parseScope(components, defaultScope);

  const code = makeFullCode(defaultCode);
  const html = renderToStaticMarkup(makeMarkdownElement(code, scope));

  return {
    html,
    code,
    requiredComponents: components,
  };
}

function makeFullCode(code: string): string {
  return `
    ${code}
    
    return React.createElement(MDXContent, {});
  `;
}
