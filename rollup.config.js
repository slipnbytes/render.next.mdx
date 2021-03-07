import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';

/**
 * @type {import('rollup').Plugin[]}
 */
const basePlugins = [
  nodeResolve(),
  commonjs(),
  babel({ babelHelpers: 'bundled' }),
];

/**
 * @type {import('rollup').RollupOptions}
 */
const baseOptions = {
  external: getExternal(),
  plugins: [makeTypeScriptPlugin(), ...basePlugins],
};

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
  {
    input: 'src/index.ts',
    output: {
      format: 'cjs',
      file: 'dist/index.js',
      sourcemap: true,
    },
  },
  {
    input: 'src/Provider.tsx',
    plugins: [makeTypeScriptPlugin({ outDir: 'provider' }), basePlugins],
    output: [
      {
        format: 'cjs',
        file: 'provider/index.js',
        sourcemap: true,
      },
      {
        format: 'esm',
        file: 'provider/index.esm.js',
        sourcemap: true,
      },
    ],
  },
].map(cfg => ({ ...baseOptions, ...cfg }));

/**
 * @param {import('@rollup/plugin-typescript').RollupTypescriptOptions} options
 * @return {import('rollup').Plugin}
 */
function makeTypeScriptPlugin(options = {}) {
  return typescript({ rootDir: 'src', include: ['**/*'], ...options });
}

//

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
