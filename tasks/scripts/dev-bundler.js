import livereload from 'gulp-livereload';
import { rollup, watch } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import svelte from 'rollup-plugin-svelte';
import css from 'rollup-plugin-css-only';
import path from 'path';

export function dev_bundler(entry, output_file, output_name) {
  const cssOutputFile = path.basename(entry).replace(/\.js$/, '.css');

  const inputOptions = {
    input: entry,
    plugins: [
      json(),
      svelte({
        compilerOptions: {
          dev: true,
        },
      }),
      css({
        output: cssOutputFile,
      }),
      resolve({
        browser: true,
      }),
      commonjs(),
    ],
  };

  const outputOptions = {
    file: output_file,
    format: 'iife',
    sourcemap: true,
    name: output_name,
  };

  const watchOptions = {
    ...inputOptions,
    output: outputOptions,
  };

  const watcher = watch(watchOptions);

  watcher.on('event', (event) => {
    if (event.code === 'BUNDLE_END') {
      event.output.forEach((file) => {
        livereload.reload(file);
      });
    }
    if (event.code === 'ERROR') {
      console.error(event.error);
    }
  });
}
