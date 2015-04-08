'use strict';

var gulp            = require('gulp');
var less            = require('gulp-less');
var bower           = require('main-bower-files');
var inject          = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var browserSync     = require('browser-sync');

var appStyles = gulp.src('./styles/*.less')
                    .pipe(less())
                    .pipe(gulp.dest('./build-dev/css/'));

var appFiles = gulp.src('./src/client/app/**/*.js')
                   .pipe(angularFilesort())
                   .pipe(gulp.dest('./build-dev/client/app/'));

gulp.task('inject', function() {

  var index = gulp.src('./src/client/index.html');
  var bowerFiles = gulp.src(bower(), { read: false });

  index
    .pipe(inject(appFiles,   { name: 'app', ignorePath : 'build-dev' }))
    .pipe(inject(appStyles,  { name: 'app', ignorePath : 'build-dev' }))
    .pipe(inject(bowerFiles, { name: 'bower' }))
    .pipe(gulp.dest('./build-dev/'));
});

gulp.task('serve-dev', ['inject'], function(){

  browserSync({
    server: {
      baseDir: "./build-dev/",
      routes: {
          '/bower_components': 'bower_components'
      }
    }
  });
});
