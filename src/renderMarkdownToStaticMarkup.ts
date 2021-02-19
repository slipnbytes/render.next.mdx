import MDXRuntime from '@mdx-js/runtime';
import { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export function renderMarkdownToStaticMarkup(markdown: string): string {
  const elementRendered = MDXRuntime({ children: markdown });

  return renderToStaticMarkup(elementRendered as ReactElement);
}
