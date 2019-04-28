"use strict";

const { src, dest, parallel, series, watch } = require('gulp');
const livereload = require('gulp-livereload');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const resize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rev = require('gulp-rev');
const revDel = require('rev-del');
const spawn = require('child_process').spawn;
const superstatic = require('superstatic').server;
const chalk = require('chalk');
const fs = require('fs');
const touch = require('gulp-touch-cmd');


function sass_dev() {
  return src(['_sass/main.scss'])
    .pipe(sourcemaps.init())
      .pipe(sass({
        precision: 8
      }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest('css'))
    .pipe(touch());
}

function sass_prod() {
  return src(['_sass/main.scss'])
    .pipe(sass({
      precision: 8,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    // .pipe(rev())
    .pipe(dest('css'));
    // .pipe(rev.manifest('css-manifest.json'))
    // .pipe(revDel({oldManifest: 'css-manifest.json', suppress: false, dest: './css'}))
    // .pipe(dest('.'));
}

function dark_mode_js() {
  return src('_js/darkmode.js')
    .pipe(concat('dark.js'))
    .pipe(uglify())
    .pipe(dest('./_includes/'));
}

function watch_files() {
  watch(['_site/css/*.css', '_site/js/*.js']).on('change', function(file) {
    livereload.changed(file);
  });

  watch(['_sass/**/*.scss', '!./_sass/dark.scss'], sass_dev);
}

function jekyll_serve(done) {
  return spawn('bundle', ['exec', 'jekyll', 'build', '--watch'], { stdio: 'inherit' })
    .on('close', done);
}

function jekyll_serve_drafts(done) {
  return spawn('bundle', ['exec', 'jekyll', 'build', '--watch', '--drafts'], { stdio: 'inherit' })
    .on('close', done);
}

function jekyll_build(done) {
  return spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit' })
    .on('close', done);
}

function firebase_serve(cb) {
  // use superstatic (which firebase tools uses)
  // https://github.com/firebase/firebase-tools/blob/master/commands/serve.js

  var options = {
    stack: 'strict',
    host: '0.0.0.0',
    port: 5000
  };

  options.config = require('./firebase.json').hosting;

  var server = superstatic(options);

  return server.listen(function(err, cb) {
    if (err) { console.log(err); }

    console.log('Starting Firebase development server...');
    console.log(chalk.bold('Public Directory:'), options.config.public);
    console.log(chalk.bold('Project Directory:'), options.config.projectDir || process.cwd());
    console.log('Server listening at: ' + chalk.underline(chalk.bold('http://' + options.host + ':' + options.port)));
  });
}

function listen() {
  return livereload.listen();
}

exports.sass = sass_dev;
exports.serve_drafts = parallel([jekyll_serve_drafts, firebase_serve]);
exports.serve = parallel([jekyll_serve, firebase_serve]);
exports.build = parallel([sass_prod, jekyll_build]);
exports.drafts = parallel([sass_dev, watch_files, listen, exports.serve_drafts]);
exports.default = series([sass_dev, watch_files, listen, exports.serve]);
exports.jekyll_serve_drafts = jekyll_serve_drafts;
exports.firebase_serve = firebase_serve;
