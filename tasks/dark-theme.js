import gulp from 'gulp';
import uglify from 'gulp-uglify';

const src = 'src/_assets/js/darkmode.js';
const dist = './src/_includes/js/';

export function darkThemeBuild() {
  return gulp.src(src)
    .pipe(uglify())
    .pipe(gulp.dest(dist));
}

export function darkThemeWatch() {
  gulp.watch(src, darkThemeBuild);
}
