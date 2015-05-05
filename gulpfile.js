'use strict';

var gulp            = require('gulp');
var watch           = require('gulp-watch');
var rename          = require('gulp-rename');
var less            = require('gulp-less');
var bower           = require('main-bower-files');
var inject          = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var browserSync     = require('browser-sync');

gulp.task('build-dev', ['less', 'js', 'templates', 'inject']);

gulp.task('less-watch', ['less', 'inject'], browserSync.reload);
gulp.task('js-watch', ['js', 'inject'], browserSync.reload);
gulp.task('templates-watch', ['templates'], browserSync.reload);

gulp.task('watch', function() {
  watch('./src/client/content/*.less', function() { gulp.start('less-watch'); });
  watch('./src/client/app/**/*.js', function() { gulp.start('js-watch'); });
  watch('./src/client/app/**/*.html', function() { gulp.start('templates-watch'); });
});

gulp.task('less', function() {
  gulp.src('./src/client/content/*.less')
      .pipe(less())
      .pipe(gulp.dest('./build-dev/client/content/'));
});

gulp.task('js', function() {
  gulp.src('./src/client/app/**/*.js')
      .pipe(angularFilesort())
      .pipe(gulp.dest('./build-dev/client/app/'));
});

gulp.task('templates', function() {
  gulp.src('./src/client/app/**/*.html')
      .pipe(gulp.dest('./build-dev/client/app/'));
});

gulp.task('inject', function() {
  var index      = gulp.src('./src/client/index.html');
  var appFiles   = gulp.src('./src/client/app/**/*.js').pipe(angularFilesort());
  var appStyles  = gulp.src('./src/client/content/*.less').pipe(rename({ extname: '.css'}));
  var bowerFiles = gulp.src(bower(), { read: false });

  index
    .pipe(inject(appFiles,  { name: 'app', relative: true }))
    .pipe(inject(appStyles, { name: 'app', relative: true }))
    .pipe(inject(bowerFiles, { name: 'bower' }))
    .pipe(gulp.dest('./build-dev/client/'));
});

gulp.task('serve-dev', ['build-dev', 'watch'], function() {
  browserSync({
      proxy: 'localhost:8080'
  });
});
