const gulp = require('gulp');
const uglify = require('gulp-uglify');

const src = 'src/_assets/js/darkmode.js';
const dist = './src/_includes/js/';

function dark_theme_build() {
  return gulp.src(src)
    .pipe(uglify())
    .pipe(gulp.dest(dist));
}

function dark_theme_watch() {
  gulp.watch(src, dark_theme_build);
}


module.exports = {
  build: dark_theme_build,
  watch: dark_theme_watch
};
