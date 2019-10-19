"use strict";

const argv = require('yargs').argv;
const gulp = require('gulp');
const livereload = require('gulp-livereload');


// tasks
const img           = require('./gulp-tasks/images.js');
const jekyll        = require('./gulp-tasks/jekyll.js');
const server        = require('./gulp-tasks/server.js');
const sass          = require('./gulp-tasks/styles.js');
const dark_theme_js = require('./gulp-tasks/dark-theme.js');
const scripts       = require('./gulp-tasks/scripts.js');


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
    gulp.parallel(
      sass.watch,
      watch_built_files
    ),
  )
);

exports.build = gulp.series(
  sass.build
);

exports.img = img.resize;
exports.png = img.png;
exports.dark_theme = dark_theme_js.build;
exports.js = scripts.build;
