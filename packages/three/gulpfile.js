const path = require('path');
const gulp = require('gulp');
const eyeglass = require('eyeglass');
const sass = require('gulp-sass');

const sassOptions = {
  eyeglass: {
    // put eyeglass options you need here.
  }
};

gulp.task('sass', function() {
  return gulp
    .src(['**/*.scss', '!node_modules/**/*'])
    .pipe(sass(eyeglass(sassOptions))
      .on("error", sass.logError))
    .pipe(gulp.dest('css'));
});