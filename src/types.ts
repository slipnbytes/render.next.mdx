import type { Options as MDXOptions } from '@mdx-js/mdx';
import type { ComponentType } from 'react';

export interface RenderData {
  html: string;
  code: string;
  requiredComponents: string[];
}

export interface RenderOptions
  extends Pick<MDXOptions, 'remarkPlugins' | 'rehypePlugins'> {
  scope?: Scope;
}

export interface Scope {
  [key: string]: ComponentType<any>;
}
