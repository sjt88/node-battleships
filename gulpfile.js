var gulp   = require('gulp');
var gjshint = require('gulp-jshint');
var gjasmine = require('gulp-jasmine'); 

var paths = [
  './*.js',
  './lib/*.js', 
  './spec/*.js'
];

gulp.task('lint', function() {
  gulp.src(paths)
    .pipe(gjshint({
      'node':true, 
      'jasmine':true
    }))
    .pipe(gjshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch(paths, ['test']);
});

gulp.task('test', ['lint'], function() {
  gulp.src(['spec/*-spec.js'])
    .pipe(gjasmine());
});

gulp.task('default', ['lint', 'test','watch']);
