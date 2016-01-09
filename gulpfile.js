var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var env = require('gulp-env');

gulp.task('nodemon', function () {
  env({
    file: '.env',
    type: 'ini'
  });

  nodemon({
    script: 'index.js',
  });
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init({
    proxy: 'http://localhost:8080',
    files: ['views/**/*', 'public/**/*'],
    notify: false,
    browser: 'google chrome canary'
  });
});

gulp.task('sass', function () {
  return gulp.src('src/style/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/style/'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch('src/style/**/*.scss', ['sass']);
});
