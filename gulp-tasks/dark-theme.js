const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');


function build() {
  return src('_js/darkmode.js')
    .pipe(concat('dark.js'))
    .pipe(uglify())
    .pipe(dest('./_includes/js/'));
}

module.exports = {
  build
};
