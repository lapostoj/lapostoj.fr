var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-clean-css');
var path = require('path');

gulp.task('default', ['develop']);

gulp.task('develop', ['less-dev']);

gulp.task('prod', ['less']);

gulp.task('less-dev', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('../install/css'));
});