"use strict";

const gulp = require('gulp');
const { parallel, series } = gulp;
const livereload = require('gulp-livereload');

// tasks
const img = require('./gulp-tasks/images.js');
const jekyll = require('./gulp-tasks/jekyll.js');
const server = require('./gulp-tasks/server.js');
const sass = require('./gulp-tasks/styles.js');
const js = require('./gulp-tasks/scripts.js');


function watch_files() {
  gulp.watch(['_site/css/*.css', '_site/js/*.js']).on('change', function(file) {
    livereload.changed(file);
  });

  gulp.watch(['_sass/**/*.scss'], sass.dev);

  return livereload.listen();
}


const watch = series([sass.dev, watch_files]);
const build = series([sass.prod, jekyll.build]);

// export tasks to CLI
exports.default = parallel([watch, server.init, jekyll.init]);
exports.drafts = parallel([watch, server.init, jekyll.init_drafts]);
exports.build = build;
exports.img = img.resize;
