var gulp                = require('gulp');
var esnext              = require('gulp-esnext');
var es6ModuleTranspiler = require("gulp-es6-module-transpiler");
var concat              = require('gulp-concat');
var sourcemaps          = require('gulp-sourcemaps');
var connect             = require('gulp-connect');
var del                 = require('del');

var paths = {
  scripts: ['esnext/**/*.js']
};

gulp.task('clean', function(cb) {
  del(['js'], cb);
});

gulp.task('scripts', function() {
  gulp.src(paths.scripts)
    //.pipe(sourcemaps.init())
      .pipe(esnext())
      .pipe(es6ModuleTranspiler({type: 'amd'}))
      .pipe(concat('solar.js'))
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('js'))
    .pipe(connect.reload());
});

gulp.task('serve', ['scripts'], function() {
  connect.server({
    port: 3000,
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['serve', 'watch']);
