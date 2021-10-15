const gulp = require('gulp');
const ts = require('gulp-typescript');
const jasmine = require('gulp-jasmine');
const clean = require('gulp-clean');
const runSequence = require('gulp4-run-sequence');

gulp.task('build', function() {
    const merge = require('merge2');
    const tsProject = ts.createProject('tsconfig.json');

    var tsResult = tsProject.src()
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest('./dist')),
        tsResult.js.pipe(gulp.dest(tsProject.config.compilerOptions.outDir))
    ]);
});

gulp.task('clean', function () {
    return gulp.src('dist', { read: false, allowEmpty: true })
        .pipe(clean());
});

gulp.task('test:run', function() {
    return gulp.src('dist/spec/**')
      .pipe(jasmine());
});

gulp.task('test:copy_fixtures', () => {
    return gulp.src('./spec/fixtures/*')
               .pipe(gulp.dest('./dist/spec/fixtures/'));
});

gulp.task('default', gulp.series( function(cb) {
  runSequence('clean', 'build', cb);
}));

gulp.task('watch', gulp.series('default', function() {
    gulp.watch('lib/*.ts', ['default']);
    gulp.watch('examples/*.ts', ['default']);
}));

gulp.task('test', gulp.series( function(cb) {
  runSequence('clean', 'build', 'test:copy_fixtures', 'test:run', cb);
}));
