const gulp = require('gulp');
const shell = require('gulp-shell');
const { argv } = require('yargs');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

const tsConfig = ts.createProject('tsconfig.json');

function compileHTML() {
  return gulp
    .src('src/assets/html/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true,
        removeEmptyElements: true,
      })
    )
    .pipe(gulp.dest('dist/assets/html'));
}

gulp.task('copyNonTS', gulp.parallel(compileHTML));

gulp.task('compileTS', async () => {
  return gulp
    .src(['src/**/*.ts', '!src/**/*.spec.ts'])
    .pipe(tsConfig())
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('test', (done) => {
  return shell.task([
    `${
      argv.isCoverage && 'nyc'
    } mocha -r ts-node/register src/api/**/*.spec.ts`,
  ])(done);
});

gulp.task('test:coverage', (done) => {
  return shell.task([`rimraf coverage`, `gulp test --isCoverage`])(done);
});

gulp.task('build:base', async (done) => {
  return shell.task([
    // 'gulp test:coverage',
    // 'rimraf ./dist',
    'tsc --build',
    // 'gulp compileTS',
    // 'gulp copyNonTS',
  ])(done);
});

gulp.task('build:local', async (done) => {
  return shell.task(['gulp build:base'])(done);
});

gulp.task('build:production', async (done) => {
  return shell.task(['gulp build:base'])(done);
});
