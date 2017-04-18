var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var path = require('path');

gulp.task('default', ['develop']);

gulp.task('develop', ['less-dev']);

gulp.task('prod', ['less']);

gulp.task('less-dev', function () {
  return gulp.src('./src/less/lapostoj.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./src/css'));
});
 
gulp.task('less', function () {
  return gulp.src('./src/less/lapostoj.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css'));
});