import gulp from 'gulp';
import livereload from 'gulp-livereload';

// tasks
import { stylesDev, stylesBuild, stylesWatch } from './tasks/styles.js';
import { darkThemeBuild, darkThemeWatch } from './tasks/dark-theme.js';
import { scriptsDev, scriptsBuild } from './tasks/scripts/index.js';

function watchBuiltFiles() {
  return gulp.watch(['_site/css/*.css', '_site/js/*.js']).on('change', (file) => {
    livereload.changed(file);
  });
}

function livereloadListen(done) {
  livereload.listen({
    port: '35729',
  });
  done();
}

export default gulp.parallel(
  livereloadListen,
  gulp.series(
    gulp.parallel(
      stylesDev,
      scriptsDev,
      darkThemeBuild,
    ),
    gulp.parallel(
      stylesWatch,
      darkThemeWatch,
      watchBuiltFiles,
    )
  )
);

export const test = scriptsDev;

export const build = gulp.series(
  stylesBuild,
  scriptsBuild,
  darkThemeBuild,
);
