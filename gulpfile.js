var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function () {
  return nodemon({
    script: 'index.js',
  });
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init({
    proxy: 'http://localhost:8080',
    files: ['views/**/*'],
    notify: false,
    browser: 'google chrome canary'
  });
});

gulp.task('default', ['browser-sync'], function () {
});
