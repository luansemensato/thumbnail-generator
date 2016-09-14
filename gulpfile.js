var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var ife = require('gulp-if');

gulp.task('styles', function () {
  return gulp.src('./styles/*.scss')
    .pipe(rename('app.css'))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(rename('app.min.css'))
    .pipe(ife('*.css', cleanCSS({compatibility: 'ie8'})))
    .pipe(gulp.dest('dist/styles'))
});

gulp.task('scripts', function(){
  return gulp.src(['scripts/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('default', ['styles', 'scripts'], function() {});

gulp.task('watch', function() {
  gulp.watch('./styles/*.scss', ['styles']);
  gulp.watch('./scripts/*.js', ['scripts']);
});