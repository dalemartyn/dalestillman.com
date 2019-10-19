// packages
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const sharp = require("sharp");
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");

// specify transforms https://sharp.pixelplumbing.com/en/stable/api-resize/#parameters
const transforms = [
  // {
  //   src: "./*/main-3x2_3x.png",
  //   dist: "./img/",
  //   options: {
  //     width: 1050,
  //     height: 700,
  //     fit: "cover"
  //   }
  // },
  // {
  //   src: "./*/main-3x2_3x.png",
  //   dist: "./img/",
  //   options: {
  //     width: Math.round(911.25*2),
  //     height: 607.5*2,
  //     fit: "cover"
  //   }
  // },
  {
    src: "./surface/*.png",
    dist: "./img/"
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
        .webp()
        .toFile(saveTo.replace('.png', '.webp'))
        .catch(err => {
          console.log(err);
        });
    });
  });
  done();
}

// optimize images in place
function optimiseImages() {
  return gulp
    .src("./src/assets/img/**/*", { base: "./src/_assets/img" })
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
    .pipe(gulp.dest("./dist/img/"));
}

// optimize pngs in place
function optimisePngs() {
  return gulp.src("./src/_assets/img/**/main-3x2_3x.png", { base: "./src/_assets/img" })
    .pipe(imagemin([
      pngquant({
        quality: [.7, 1]
      })
    ]))
    .pipe(gulp.dest("./dist/img/"))
}

// exports (Common JS)
module.exports = {
  resize: resizeImages,
  optimise: optimiseImages,
  png: optimisePngs
};
