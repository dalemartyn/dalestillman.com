var gulp = require('gulp');
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var resize = require('gulp-image-resize');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var revDel = require('rev-del');
var spawn = require('child_process').spawn;
var superstatic = require('superstatic').server;
var chalk = require('chalk');
// var browserSync = require('browser-sync').create();
// var reload = browserSync.reload;

var scripts = [
  'node_modules/smoothscroll-polyfill/dist/smoothscroll.js',
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
  return gulp.src('_img/profile*.jpg')
    .pipe(resize({
      format: 'jpg',
      quality: 0.6,
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
	return gulp.src(['_sass/main.scss'])
		.pipe(sourcemaps.init())
			.pipe(sass({
				precision: 8
			}).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('css'))
		.pipe(livereload());
});

gulp.task('sass-inline', function() {
  return gulp.src(['_sass/main.scss'])
    .pipe(sass({
      outputStyle: 'compressed',
      precision: 8
    }))
    .pipe(gulp.dest('_includes'))
    .pipe(livereload());
});

gulp.task('sass', function() {
  return gulp.src(['_sass/main.scss'])
    .pipe(sass({
      precision: 8,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    // .pipe(rev())
    .pipe(gulp.dest('css'));
    // .pipe(rev.manifest('css-manifest.json'))
    // .pipe(revDel({oldManifest: 'css-manifest.json', suppress: false, dest: './css'}))
    // .pipe(gulp.dest('.'));
});

gulp.task('sass-dark', function() {
  return gulp.src(['_sass/dark.scss'])
    .pipe(sass({
      precision: 8,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

gulp.task('scripts', function() {
  return gulp.src(scripts)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});

gulp.task('scripts-darkmode', function() {
  return gulp.src('_js/darkmode.js')
    .pipe(concat('dark.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./_includes/'));
});

gulp.task('watch', function() {
	gulp.watch(['_site/css/*.css', '_site/js/*.js']).on('change', function(file) {
    livereload.changed(file.path);
	});
  // gulp.watch(['_site/css/*.css']).on('change', reload);
  gulp.watch(['_sass/**/*.scss', '!./_sass/fonts.scss'], ['sass-develop']);
  gulp.watch(scripts, ['scripts']);
	// gulp.watch(['_sass/grids.scss'], ['compass']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "127.0.0.1:4000"
    });
});

gulp.task('jekyll-serve', function(done) {
  return spawn('bundle', ['exec', 'jekyll', 'build', '--watch'], { stdio: 'inherit' })
    .on('close', done);
});

gulp.task('jekyll-serve-drafts', function(done) {
  return spawn('bundle', ['exec', 'jekyll', 'build', '--watch', '--drafts'], { stdio: 'inherit' })
    .on('close', done);
});

gulp.task('jekyll-build', function(done) {
  return spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit' })
    .on('close', done);
});

gulp.task('firebase-serve', function(cb) {
  // use superstatic (which firebase tools uses)
  // https://github.com/firebase/firebase-tools/blob/master/commands/serve.js

  var options = {
    stack: 'strict',
    host: 'localhost',
    port: 5000
  };

  options.config = require('./firebase.json').hosting;

  var server = superstatic(options);

  server.listen(function(err, cb) {
    if (err) { console.log(err); }

    console.log('Starting Firebase development server...');
    console.log(chalk.bold('Public Directory:'), options.config.public);
    console.log(chalk.bold('Project Directory:'), options.config.projectDir || process.cwd());
    console.log('Server listening at: ' + chalk.underline(chalk.bold('http://' + options.host + ':' + options.port)));
  });
});

gulp.task('serve-drafts', ['jekyll-serve-drafts', 'firebase-serve']);
gulp.task('serve', ['jekyll-serve', 'firebase-serve']);

gulp.task('build', ['sass', 'scripts', 'jekyll-build']);

gulp.task('dev',
[
  'sass-develop',
  'scripts',
  'watch'
],
function() {
  livereload.listen();
});

gulp.task('drafts', ['dev', 'serve-drafts']);
gulp.task('default', ['dev', 'serve']);
