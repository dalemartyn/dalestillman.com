const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');


module.exports = function prod_bundler(entry, output_file, output_name) {

  return rollup.rollup({
    input: entry,
    plugins: [
      resolve({ browser: true }),
      commonjs(),
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
