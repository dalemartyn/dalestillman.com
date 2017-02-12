var gulp = require('gulp');
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rubysass = require('gulp-ruby-sass');
var resize = require('gulp-image-resize');
var imagemin = require('gulp-imagemin');
// var browserSync = require('browser-sync').create();
// var reload = browserSync.reload;

gulp.task('resize', function () {
  return gulp.src('_img/*.{jpg,png}')
    .pipe(resize({
      width : 1920,
      height : 1080,
      crop : true,
      upscale : true,
      format: 'jpg'
    }))
    .pipe(gulp.dest('./img/'));
});

gulp.task('img', function() {
  return gulp.src('_img/**/*.{jpg,png}')
    .pipe(resize({
      format: 'jpg',
      quality: 1,
      imageMagick: true
    }))
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./img/'));
});

gulp.task('sass', function() {
	gulp.src(['_sass/*.scss'])
		.pipe(sourcemaps.init())
			.pipe(sass({
				precision: 8
			}).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./css/'))
		.pipe(livereload());
});

gulp.task('sass-prod', function() {
  gulp.src(['_sass/*.scss'])
    .pipe(sass({
      precision: 8,
      outputStyle: 'compressed'
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('./css/'))
    .pipe(livereload());
});

gulp.task('compass', function() {
  return rubysass('_sass/grids.scss', {compass: true})
    .on('error', sass.logError)
    .pipe(gulp.dest('./css/'));
});

gulp.task('watch', function() {
	gulp.watch(['_site/css/*.css', '_site/js/*.js']).on('change', function(file) {
    livereload.changed(file.path);
	});
  // gulp.watch(['_site/css/*.css']).on('change', reload);
  gulp.watch(['_sass/**/*.scss', '!./_sass/grids.scss'], ['sass']);
	// gulp.watch(['_sass/grids.scss'], ['compass']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "127.0.0.1:4000"
    });
});

gulp.task('default',
[
  'sass',
  // 'compass',
  // 'browser-sync',
  'watch'
],
function() {
	livereload.listen();
});
