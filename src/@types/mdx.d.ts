// By -> https://github.com/mdx-js/mdx/blob/main/packages/mdx/types/index.d.ts

declare module '@mdx-js/mdx' {
  import type { Plugin, Processor } from 'unified';

  export interface Options {
    /**
     * Path on disk to processed file
     * @default undefined
     */
    filepath?: string;

    /**
     * skip the addition of 'export default' statement when serializing
     * to JSX
     * @default false
     */
    skipExport?: boolean;

    /**
     * wrap 'export default' statement with provided string when serializing
     * to JSX
     */
    wrapExport?: string;

    /**
     * remark plugins to transform markdown content
     *
     * @default []
     */
    remarkPlugins?: Plugin[];

    /**
     * rehype plugins html content
     *
     * @default []
     */
    rehypePlugins?: Plugin[];
  }

  /**
   * compile mdx text to jsx text asynchronously
   *
   * @param mdx content as a text
   * @param options transform and compiler options
   * @returns jsx text
   */
  export function sync(markdown: string, options?: Options): string;

  /**
   * Generated an MDX compiler
   *
   * @param options transform and compiler options
   * @returns Unified Processor for MDX
   */
  export function createCompiler(options?: Options): Processor;

  export function createMdxAstCompiler(options?: Options): Processor;

  /**
   * compile mdx text to jsx text asynchronously
   *
   * @param mdx content as a text
   * @param options transform and compiler options
   * @returns jsx text
   */
  function mdx(markdown: string, options?: mdx.Options): Promise<string>;

  export default mdx;
}
