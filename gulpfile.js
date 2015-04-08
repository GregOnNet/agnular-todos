'use strict';

var gulp            = require('gulp');
var less            = require('gulp-less');
var bower           = require('main-bower-files');
var inject          = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');

var appStyles = gulp.src('./styles/*.less')
                    .pipe(less())
                    .pipe(gulp.dest('./build-dev/css/'));

gulp.task('inject', function() {

  var index = gulp.src('./src/client/index.html');
  var appFiles = gulp.src('./src/client/app/**/*.js').pipe(angularFilesort());
  var bowerFiles = gulp.src(bower(), { read: false });

  index
    .pipe(inject(appFiles,   {name: 'app', relative: false}))
    .pipe(inject(appStyles,  {name: 'app'}))
    .pipe(inject(bowerFiles, {name: 'bower', relative: false}))
    .pipe(gulp.dest('./build-dev/'));
});
