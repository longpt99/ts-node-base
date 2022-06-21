const gulp = require('gulp');
const shell = require('gulp-shell');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
// const htmlmin = require('gulp-htmlmin');
const exec = require('child_process').exec;

const tsConfig = ts.createProject('tsconfig.json');

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

gulp.task('compileTS', (done) => {
  exec('rimraf dist', (err) => {
    gulp
      .src('src/**/*.ts')
      .pipe(tsConfig())
      .pipe(uglify())
      .pipe(gulp.dest('dist/'));
    done(err);
  });
});

gulp.task('watch', gulp.series('compileTS'), () => {
  gulp.watch('src/**/*.ts', ['compileTS']);
});

gulp.task('test', (done) => {
  return shell.task(['jest'])(done);
});

gulp.task('test:coverage', (done) => {
  return shell.task(['rimraf coverage', 'gulp test --coverage'])(done);
});

gulp.task('build:base', (done) => {
  return gulp.series(
    'test:coverage',
    'compileTS'
    // 'gulp copyNonTS',
  )(done);
});

gulp.task('build:local', async (done) => {
  return shell.task(['gulp build:base'])(done);
});

gulp.task('build:production', async (done) => {
  return shell.task(['gulp build:base'])(done);
});
