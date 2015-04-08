'use strict';

var gulp            = require('gulp');
var watch           = require('gulp-watch');
var less            = require('gulp-less');
var bower           = require('main-bower-files');
var inject          = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var browserSync     = require('browser-sync');

var streams = {
  'app'    : null,
  'styles' : null
};

gulp.task('less-watch', ['less', 'inject'], browserSync.reload);
gulp.task('js-watch', ['js', 'inject'], browserSync.reload);

gulp.task('watch', function() {
  watch('./styles/*.less', function() { gulp.start('less-watch'); });
  watch('./src/client/app/**/*.js', function() { gulp.start('js-watch'); });
});

gulp.task('less', function() {
  streams.styles = gulp.src('./styles/*.less')
                       .pipe(less())
                       .pipe(gulp.dest('./build-dev/css/'));
});

gulp.task('js', function() {
  streams.app = gulp.src('./src/client/app/**/*.js')
                    .pipe(angularFilesort())
                    .pipe(gulp.dest('./build-dev/client/app/'));
});

gulp.task('inject', function() {
  var index = gulp.src('./src/client/index.html');
  var bowerFiles = gulp.src(bower(), { read: false });

  index
    .pipe(inject(streams.app,    { name: 'app', ignorePath : 'build-dev' }))
    .pipe(inject(streams.styles, { name: 'app', ignorePath : 'build-dev' }))
    .pipe(inject(bowerFiles, { name: 'bower' }))
    .pipe(gulp.dest('./build-dev/'));
});

gulp.task('serve-dev', ['less', 'js', 'inject', 'watch'], function() {
  browserSync({
    server: {
      baseDir: "./build-dev/",
      routes: {
          '/bower_components': 'bower_components'
      }
    }
  });
});
