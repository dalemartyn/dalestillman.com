const gulp = require('gulp');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

function build() {
  return rollup.rollup({
    input: './_js/main.js',
    plugins: [
      resolve({ browser: true }),
      commonjs(),
    ]
  }).then(bundle => {
    return bundle.write({
      file: './js/main.js',
      format: 'iife',
      name: 'app',
      sourcemap: true
    });
  });
}

module.exports = {
  build
};
