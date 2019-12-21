"use strict";

const gulp = require('gulp');
const livereload = require('gulp-livereload');


// tasks
const img           = require('./gulp-tasks/images.js');
const sass          = require('./gulp-tasks/styles.js');
const dark_theme    = require('./gulp-tasks/dark-theme.js');
const scripts       = require('./gulp-tasks/scripts.js');
const figma_images  = require('./gulp-tasks/figma-images.js');


function watch_built_files() {
  return gulp.watch(['_site/css/*.css', '_site/js/*.js']).on('change', function(file) {
    livereload.changed(file);
  });
}

function livereload_listen(done) {
  livereload.listen({
    port: '35729'
  },
  done);
}

// export tasks to CLI
exports.default = gulp.parallel(
  livereload_listen,
  gulp.series(
    sass.dev,
    scripts.build,
    dark_theme.build,
    gulp.parallel(
      sass.watch,
      dark_theme.watch,
      watch_built_files
    )
  )
);

exports.build = gulp.series(
  sass.build,
  scripts.build,
  dark_theme.build,
);

exports.img = img.resize;
exports.js = scripts.build;
exports.fig = figma_images.download;
