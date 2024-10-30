import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import touch from 'gulp-touch-cmd';
import rev from 'gulp-rev';

const sass = gulpSass(dartSass);

const src_files = 'src/_assets/sass/**/*.scss';
const entries = 'src/_assets/sass/main.scss';

const sassOptions = {
  loadPaths: [
    'src/_assets/sass/',
  ],
  quietDeps: true,
  silenceDeprecations: ['mixed-decls']
};

export function stylesDev() {
  return gulp.src(entries, { sourcemaps: true })
    .pipe(sass({
      ...sassOptions,
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css', { sourcemaps: true }))
    .pipe(touch());
}

export function stylesBuild() {
  return gulp.src(entries)
    .pipe(sass({
      ...sassOptions,
      outputStyle: 'compressed',
    }, true).on('error', sass.logError))
    .pipe(rev())
    .pipe(gulp.dest('./dist/css'))
    .pipe(rev.manifest('css-manifest.json'))
    .pipe(gulp.dest('./dist/css'));
}

export function stylesWatch() {
  gulp.watch(src_files, stylesDev);
}
