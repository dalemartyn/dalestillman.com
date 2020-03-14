const gulp = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const imageminSvgo = require('imagemin-svgo');
const { join } = require('path');

const src = join('src/_assets/img/**/*.svg');
const base = join('src/_assets/');
const dist = join('dist/');

function svgs_optimize() {
  // SVGO options at https://github.com/svg/svgo#what-it-can-do
  return gulp.src(src, {
      base: base
    })
    .pipe(changed(dist))
    .pipe(imagemin([
      imageminSvgo({
        plugins: [{
          cleanupAttrs: true,
        }, {
          removeDoctype: true,
        }, {
          removeXMLProcInst: true,
        }, {
          removeComments: true,
        }, {
          removeMetadata: true,
        }, {
          removeTitle: true,
        }, {
          removeDesc: true,
        }, {
          removeUselessDefs: true,
        }, {
          removeXMLNS: false
        }, {
          removeEditorsNSData: true,
        }, {
          removeEmptyAttrs: true,
        }, {
          removeHiddenElems: true,
        }, {
          removeEmptyText: true,
        }, {
          removeEmptyContainers: true,
        }, {
          removeViewBox: false,
        }, {
          cleanupEnableBackground: true,
        }, {
          convertStyleToAttrs: true,
        }, {
          convertColors: true,
        }, {
          convertPathData: true,
        }, {
          convertTransform: true,
        }, {
          removeUnknownsAndDefaults: true,
        }, {
          removeNonInheritableGroupAttrs: true,
        }, {
          removeUselessStrokeAndFill: true,
        }, {
          removeUnusedNS: true,
        }, {
          cleanupIDs: true,
        }, {
          cleanupNumericValues: true,
        }, {
          moveElemsAttrsToGroup: true,
        }, {
          moveGroupAttrsToElems: true,
        }, {
          collapseGroups: true,
        }, {
          removeRasterImages: false,
        }, {
          mergePaths: true,
        }, {
          convertShapeToPath: true,
        }, {
          sortAttrs: true,
        }, {
          removeDimensions: false,
        }, {
          removeAttrs: {
            // attrs: '(stroke|fill)'
          },
        }]
      })
    ]))
    .pipe(gulp.dest(dist));
}

function svgs_watch() {
  gulp.watch(src, svgs_optimize);
}

module.exports = {
  optimize: svgs_optimize,
  watch: svgs_watch
};
