const gulp = require('gulp');
const webpack = require('webpack');

gulp.task('default', () => {
  
})

gulp.task('commandJS', () => {
  gulp.src('./command/*.js')
    .pipe(webpack())
    .pipe(gulp.dest('dist/command/'));
})

gulp.task('commandHTML', () => {
  gulp.src('./command/*.html')
    .pipe(gulp.dest('/dist/command/'));
})

gulp.task('commandCSS', () => {
  gulp.src('./command/*.css')
    .pipe(gulp.dest('/dist/command/'));
})