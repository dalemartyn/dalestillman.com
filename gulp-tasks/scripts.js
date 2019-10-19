const gulp = require('gulp');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const entry = 'src/_assets/js/main.js';
const output = './dist/js/main.js';

function scripts_build() {
  return rollup.rollup({
    input: entry,
    plugins: [
      resolve({ browser: true }),
      commonjs(),
    ]
  }).then(bundle => {
    return bundle.write({
      file: output,
      format: 'iife',
      name: 'app',
      sourcemap: true
    });
  });
}

function scripts_watch() {
  gulp.watch(entry, js.build);
}

module.exports = {
  build: scripts_build,
  watch: scripts_watch
};
