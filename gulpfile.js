import gulp from 'gulp';
import shell from 'gulp-shell';
import ts from 'gulp-typescript';
import uglify from 'gulp-uglify';
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
    done();
  });
});

gulp.task('watch', gulp.series('compileTS'), () => {
  gulp.watch('src/**/*.ts', ['compileTS']);
});

gulp.task('test', (done) => {
  return shell.task(['jest'])(done);
});

gulp.task('test:coverage', (done) => {
  return shell.task(['rimraf coverage', 'jest --coverage'])(done);
});

gulp.task('build:base', (done) => {
  return gulp.series(
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
