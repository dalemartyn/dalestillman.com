const rollup = require('rollup');
const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const svelte = require('rollup-plugin-svelte');
const terser = require('rollup-plugin-terser').terser;

module.exports = function prod_bundler(entry, output_file, output_name) {

  return rollup.rollup({
    input: entry,
    plugins: [
      json(),
      svelte({
        dev: true
      }),
      resolve({ browser: true }),
      commonjs(),
      terser(),
    ]
  }).then(bundle => {
    return bundle.write({
      file: output_file,
      format: 'iife',
      name: output_name,
      sourcemap: true
    });
  });
}
