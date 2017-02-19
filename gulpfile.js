var gulp = require('gulp');
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rubysass = require('gulp-ruby-sass');
var resize = require('gulp-image-resize');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// var browserSync = require('browser-sync').create();
// var reload = browserSync.reload;

var scripts = [
  'node_modules/smoothscroll-polyfill/dist/smoothscroll.js',
  '_js/darkmode.js',
  '_js/smoothscroll.js'
];

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

gulp.task('screencaps', function() {
  return gulp.src(['_img/**/*.{jpg,png}', '!_img/profile.jpg'])
    .pipe(resize({
      format: 'jpg',
      quality: 0.85,
      imageMagick: true,
      interlace: true
    }))
    .pipe(imagemin({
      progressive: true,
      arithmetic: true
    }))
    .pipe(gulp.dest('./img/'));
});

gulp.task('profile-pic', function() {
  return gulp.src('_img/profile.jpg')
    .pipe(resize({
      format: 'jpg',
      quality: 0.7,
      imageMagick: true,
      interlace: true
    }))
    .pipe(imagemin({
      progressive: true,
      arithmetic: true
    }))
    .pipe(gulp.dest('./img/'));
});

gulp.task('img', ['screencaps', 'profile-pic']);

gulp.task('sass-develop', function() {
	return gulp.src(['_sass/*.scss'])
		.pipe(sourcemaps.init())
			.pipe(sass({
				precision: 8
			}).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./css/'))
		.pipe(livereload());
});

gulp.task('sass', function() {
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

gulp.task('scripts', function() {
  return gulp.src(scripts)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});

gulp.task('watch', function() {
	gulp.watch(['_site/css/*.css', '_site/js/*.js']).on('change', function(file) {
    livereload.changed(file.path);
	});
  // gulp.watch(['_site/css/*.css']).on('change', reload);
  gulp.watch(['_sass/**/*.scss', '!./_sass/grids.scss'], ['sass-develop']);
  gulp.watch(scripts, ['scripts']);
	// gulp.watch(['_sass/grids.scss'], ['compass']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "127.0.0.1:4000"
    });
});

gulp.task('build', ['sass', 'scripts']);

gulp.task('default',
[
  'sass-develop',
  'scripts',
  // 'compass',
  // 'browser-sync',
  'watch'
],
function() {
	livereload.listen();
});
