var gulp                = require('gulp');
var esnext              = require('gulp-esnext');
var es6ModuleTranspiler = require("gulp-es6-module-transpiler");
var concat              = require('gulp-concat');
var sourcemaps          = require('gulp-sourcemaps');
var del                 = require('del');

var paths = {
  scripts: ['esnext/**/*.js']
};

gulp.task('clean', function(cb) {
  del(['js'], cb);
});

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
    //.pipe(sourcemaps.init())
      .pipe(esnext())
      .pipe(es6ModuleTranspiler({type: 'amd'}))
      .pipe(concat('solar.js'))
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('js'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['watch', 'scripts']);
