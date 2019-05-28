const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const touch = require('gulp-touch-cmd');

const rev = require('gulp-rev');
const revDel = require('rev-del');

function dev() {
  return src('_sass/main.scss', { sourcemaps: true })
    .pipe(sass({
      precision: 8
    }).on('error', sass.logError))
    .pipe(dest('css', { sourcemaps: true }))
    .pipe(touch());
}

function prod() {
  return src('_sass/main.scss')
    .pipe(sass({
      precision: 8,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(rev())
    .pipe(dest('css'))
    .pipe(rev.manifest('css-manifest.json'))
    .pipe(revDel({oldManifest: 'css-manifest.json', suppress: false, dest: './css'}))
    .pipe(dest('.'));
}

module.exports = {
  dev,
  prod
};
