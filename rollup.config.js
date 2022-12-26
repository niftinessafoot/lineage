import { babel, getBabelOutputPlugin } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { _C } from './constants';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  output: [
    {
      // TypeScript and React Transpiled IIFE/CJS (UMD)
      // Bundle-ready. Assumed will be transpiled on future builds.
      file: 'dist/umd/index.js',
      format: 'umd',
      name: _C.PackageName,
      plugins: [],
      sourcemap: true,
    },
    {
      // TypeScript and React Transpiled JS module (ESM)
      // Bundle-ready. Assumed will be transpiled on future builds.
      file: 'dist/esm/index.js',
      format: 'esm',
      plugins: [],
      sourcemap: true,
    },
    {
      // Transpiled IIFE/CJS (UMD) for individual use.
      // Suitable for standalone Node apps, WPA, and modern web pages.
      file: 'dist/umd/standalone.js',
      name: _C.PackageName,
      plugins: [
        getBabelOutputPlugin({
          presets: [['@babel/preset-env', { modules: 'umd' }]],
          allowAllFormats: true,
        }),
        terser(),
      ],
      sourcemap: true,
    },
    {
      // Transpiled modules (ESM) for individual use.
      // Suitable for standalone Node apps, WPA, and modern web pages.
      file: 'dist/esm/standalone.js',
      format: 'esm',
      plugins: [
        getBabelOutputPlugin({
          presets: ['@babel/preset-env'],
        }),
        terser({ module: true }),
      ],
      sourcemap: true,
    },
    {
      // Transpiled, minified code for *any* browser or legacy Node version.
      file: 'dist/umd/legacy.js',
      name: _C.PackageName,
      plugins: [
        getBabelOutputPlugin({
          presets: [
            [
              '@babel/preset-env',
              {
                ignoreBrowserslistConfig: true,
                modules: 'umd',
              },
            ],
          ],
        }),
        terser({ output: { preamble: _C.LegacyBanner } }),
      ],
      sourcemap: true,
    },
  ],
  plugins: [
    babel({ babelHelpers: 'bundled', extensions, include: ['src/**/*'] }),
  ],
};
