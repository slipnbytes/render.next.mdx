import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: ['src/index.ts', 'src/Provider.tsx'],
  external: getExternal(),
  output: [
    {
      format: 'cjs',
      dir: 'dist',
      sourcemap: true,
    },
    {
      format: 'esm',
      dir: 'dist',
      sourcemap: true,
      entryFileNames: makeEntryFileNames('esm'),
    },
  ],
  plugins: [
    typescript({
      rootDir: 'src',
      include: ['**/*'],
    }),
    nodeResolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
  ],
};

function makeEntryFileNames(extension) {
  return info => `${info.name}.${extension}.js`;
}

function makeExternalPredicate(externalArray) {
  if (!externalArray.length) return () => false;

  const pattern = new RegExp(`^(${externalArray.join('|')})($|/)`);
  return id => pattern.test(id);
}

function getExternal() {
  const external = Object.keys(pkg.peerDependencies || {});
  const allExternal = [...external, ...Object.keys(pkg.dependencies || {})];

  return makeExternalPredicate(allExternal);
}

export default config;
