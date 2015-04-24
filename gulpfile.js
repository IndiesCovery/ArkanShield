var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');


gulp.task('build-min', function() {
  gulp.src(['./app/js/index.js'])
    .pipe(concat('arkanoidShield.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build-dev', function() {
  gulp.src(['./app/js/index.js'])
    .pipe(concat('arkanoidShield.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['build-min', 'build-dev', 'webserver'], function() {

});

gulp.task('webserver', function(){
  gulp.src('./app')
  .pipe(webserver({
    livereload: true
  }));
});