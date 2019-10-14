const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');


function build() {
  return src('_js/darkmode.js')
    .pipe(uglify())
    .pipe(dest('./_includes/js/'));
}

module.exports = {
  build
};
