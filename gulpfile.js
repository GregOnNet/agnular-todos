'use strict';

var gulp = require('gulp');
var less = require('gulp-less');


gulp.task('less', function() {
  return gulp.src('./styles/*.less')
             .pipe(less())
             .pipe(gulp.dest('./build-dev/css/'));
});
