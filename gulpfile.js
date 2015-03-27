var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var plumber = require('gulp-plumber');
var shell = require('gulp-shell');
var cache = require('gulp-cached');
var gulpFilter = require('gulp-filter');

var tsProject = ts.createProject({
  declarationFiles: true,
  noExternalResolve: false,
  target: 'ES5'
});

//cache once
gulp.task('build', ['typescript'], function() {
  return gulp.src('build/**/*.js')
  .pipe(cache('verify'));
});

//compile typescript
gulp.task('typescript', function() {
  var tsResult = gulp.src('src/**/*.ts')
  .pipe(plumber())
  .pipe(ts(tsProject));

  return merge([
    tsResult.dts.pipe(gulp.dest('build/definitions')),
    tsResult.js.pipe(gulp.dest('build'))
  ]);
});

//verify changed files
gulp.task('verify', ['typescript'], function() {
  return gulp.src('build/**/*.js')
  .pipe(gulpFilter(['*', '!_*']))
  .pipe(cache('verify'))
  .pipe(shell('<%= runner(file.path) %> select "<%= number(file.path) %>" && <%= runner(file.path) %> verify "<%= file.path %>"', {
    templateData: {
      number: function(s) {
        var base = new String(s).substring(s.lastIndexOf('/') + 1);
        if (base.lastIndexOf(".") != -1)
          base = base.substring(0, base.lastIndexOf("."));
        return base;
      },
      runner: function(s) {
        return 'node_modules/.bin/' + s.split('/').slice(-2, -1).pop();
      }
    }
  }))
});

gulp.task('default', ['build'], function() {
  gulp.watch("src/**/*.ts", ['verify']);
});
