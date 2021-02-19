// By -> https://github.com/mdx-js/mdx/blob/main/packages/runtime/types/index.d.ts

declare module '@mdx-js/runtime' {
  import type { Options } from '@mdx-js/mdx';
  import type { ComponentsProp } from '@mdx-js/react';
  import type { FunctionComponent } from 'react';

  /**
   * Properties for the MDX Runtime component
   */
  export interface MDXRuntimeProps
    extends Omit<Options, 'footnotes' | 'compilers'>,
      Partial<ComponentsProp> {
    /**
     * MDX text
     */
    children?: string;

    /**
     * Values in usable in MDX scope
     */
    scope?: {
      [variableName: string]: unknown;
    };
  }

  /**
   * Renders child MDX text as a React component
   */
  const mdxRuntime: FunctionComponent<MDXRuntimeProps>;

  export default mdxRuntime;
}
