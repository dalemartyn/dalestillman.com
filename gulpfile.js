"use strict";

const gulp = require('gulp');
const livereload = require('gulp-livereload');


// tasks
const img           = require('./gulp-tasks/images');
const sass          = require('./gulp-tasks/styles');
const dark_theme    = require('./gulp-tasks/dark-theme');
const scripts       = require('./gulp-tasks/scripts');
const figma_images  = require('./gulp-tasks/figma-images');
const image_optim   = require('./gulp-tasks/image-optim');


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
exports.opt = image_optim.optimiseImages;
