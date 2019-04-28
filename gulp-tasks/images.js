// packages
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const sharp = require("sharp");
const imagemin = require("gulp-imagemin");
const gulp = require("gulp");

// specify transforms https://sharp.pixelplumbing.com/en/stable/api-resize/#parameters
const transforms = [
  {
    src: "./*/main-3x2_3x.png",
    dist: "./img/",
    options: {
      width: 525,
      height: 348,
      fit: "cover"
    }
  }
];

// resize images
function resizeImages(done) {
  transforms.forEach(function (transform) {
    const srcBase = path.join(process.cwd(), '_img');

    const filenames = glob.sync(transform.src, {
      cwd: srcBase
    });

    filenames.forEach(function (filename) {
      const saveTo = path.join(process.cwd(), transform.dist, filename);
      const dir = path.dirname(saveTo);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const file = path.join(srcBase, filename);

      sharp(file)
        .resize(transform.options)
        .toFile(saveTo)
        .catch(err => {
          console.log(err);
        });
    });
  });
  done();
}

// copy images
function optimiseImages() {
  return gulp
    .src("./src/assets/img/**/*", { base: "./src/assets/img" })
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: false }, { collapseGroups: true }]
        })
      ])
    )
    .pipe(gulp.dest("./src/assets/img/"));
}

// exports (Common JS)
module.exports = {
  resize: resizeImages,
  optimise: optimiseImages
};
