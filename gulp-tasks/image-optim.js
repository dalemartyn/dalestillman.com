const gulp = require('gulp');
const imagemin = require("gulp-imagemin");

function optimiseImages() {
  return gulp
    .src("./figma-img/**/full/*.png", { base: "./figma-img" })
    .pipe(
      imagemin([
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 })
      ])
    )
    .pipe(gulp.dest("./figma-img/"));
}

module.exports = {
  optimiseImages
};
