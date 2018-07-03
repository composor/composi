// @ts-nocheck
const gulp = require('gulp')
const browserSync = require('browser-sync')
const gzip = require('gulp-gzip')

// Gzip files:
gulp.task('gzip', function() {
  gulp.src('./dist/composi.js')
    .pipe(gzip({ extension: 'gzip' }))
    .pipe(gulp.dest('./dist'))
})

// Setup tests:
gulp.task('test', function() {
  // Launch browser:
  browserSync({
    port: 4040,
    server: {
      open: false,
      baseDir: "./",
      index: "./test/index.html"
    }
  }).reload
})
