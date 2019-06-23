"use strict";

const gulp = require('gulp');
const { parallel, series } = gulp;
const livereload = require('gulp-livereload');

// tasks
const img           = require('./gulp-tasks/images.js');
const jekyll        = require('./gulp-tasks/jekyll.js');
const server        = require('./gulp-tasks/server.js');
const sass          = require('./gulp-tasks/styles.js');
const dark_theme_js = require('./gulp-tasks/dark-theme.js');
const js            = require('./gulp-tasks/scripts.js');


function watch_files() {
  gulp.watch(['_site/css/*.css', '_site/js/*.js']).on('change', function(file) {
    livereload.changed(file);
  });

  gulp.watch(['_sass/**/*.scss'], sass.dev);
  gulp.watch(['_js/main.js'], js.build);

  return livereload.listen();
}


const watch = series([sass.dev, watch_files]);
const build = series([sass.build, jekyll.build]);

// export tasks to CLI
exports.default = parallel([watch, server.init, jekyll.init]);
exports.drafts = parallel([watch, server.init, jekyll.init_drafts]);
exports.build = build;
exports.img = img.resize;
exports.png = img.png;
exports.dark_theme = dark_theme_js.build;
exports.js = js.build;
