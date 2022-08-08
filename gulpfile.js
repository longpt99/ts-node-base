const gulp = require('gulp');
const shell = require('gulp-shell');
const uglify = require('gulp-uglify');
// const htmlmin = require('gulp-htmlmin');
const pipeline = require('readable-stream').pipeline;

// function compileHTML() {
//   return gulp
//     .src('src/assets/html/*.html')
//     .pipe(
//       htmlmin({
//         collapseWhitespace: true,
//         removeComments: true,
//         removeAttributeQuotes: true,
//         removeEmptyElements: true,
//       })
//     )
//     .pipe(gulp.dest('dist/assets/html'));
// }

// gulp.task('copyNonTS', gulp.parallel(compileHTML));

gulp.task('compress', (done) => {
  gulp.src('dist/**/*.js').pipe(uglify()).pipe(gulp.dest('dist/'));
  done();
});

// gulp.task('watch', gulp.series('compileTS'), () => {
//   gulp.watch('src/**/*.ts', ['compileTS']);
// });

gulp.task('test', (done) => {
  return shell.task(['jest'])(done);
});

gulp.task('test:coverage', (done) => {
  return shell.task(['rimraf coverage', 'jest --coverage'])(done);
});

gulp.task('build:base', (done) => {
  return shell.task(['rimraf dist', 'tsc'])(done);
});

gulp.task('build:local', async (done) => {
  return shell.task(['gulp build:base'])(done);
});

gulp.task('build:production', async (done) => {
  return shell.task(['gulp build:base', 'gulp compress'])(done);
});
