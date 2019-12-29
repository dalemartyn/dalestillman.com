const livereload = require('gulp-livereload');

const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');


module.exports = function dev_bundler(entry, output_file, output_name) {

  const inputOptions = {
    input: entry,
    plugins: [
      resolve({
        browser: true
      }),
      commonjs(),
    ]
  };

  const outputOptions = {
    file: output_file,
    format: 'iife',
    sourcemap: true,
    name: output_name
  };

  const watchOptions = {
    ...inputOptions,
    output: outputOptions,
    watch: {
      chokidar: true,
    }
  }

  const watcher = rollup.watch(watchOptions);

  watcher.on('event', function (event) {
    if (event.code === 'BUNDLE_END') {
      event.output.forEach(function (file) {
        livereload.reload(file);
      });
    }
    if (event.code === 'ERROR') {
      console.log(event.error);
    }
  });
}
