import { rollup } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import svelte from 'rollup-plugin-svelte';
import css from 'rollup-plugin-css-only';
import terser from '@rollup/plugin-terser';
import path from 'path';

export function prod_bundler(entry, output_file, output_name) {
  const cssOutputFile = path.basename(entry).replace(/\.js$/, '.css');

  return rollup({
    input: entry,
    plugins: [
      json(),
      svelte({
        dev: true,
      }),
      css({
        output: cssOutputFile,
      }),
      resolve({ browser: true }),
      commonjs(),
      terser(),
    ],
  }).then((bundle) => {
    return bundle.write({
      file: output_file,
      format: 'iife',
      name: output_name,
      sourcemap: true,
    });
  });
}
