const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');


function build() {
  return src('src/_assets/js/darkmode.js')
    .pipe(uglify())
    .pipe(dest('./dist/_includes/js/'));
}

module.exports = {
  build
};
