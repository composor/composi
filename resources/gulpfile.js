const gulp = require('gulp')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const rollup = require('rollup')
const babel =  require('rollup-plugin-babel')
const uglify =  require('rollup-plugin-uglify')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const gzip = require('gulp-gzip')
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');

// Static Server & watching files:
gulp.task('serve', ['build'], function () {
  browserSync({
    port: 4040,
    server: {
      open: false,
      baseDir: './'
    }
  }).reload
})

gulp.task('watch', function() {
  gulp.watch('./index.html').on('change', reload)
  gulp.watch(['./dev/app.js', 'dev/**/*.js'], ['build', reload])
  gulp.watch('./js/app.js').on('change', reload)
  gulp.watch('./dev/css/*.css', ['build', reload])
})

gulp.task('build', function () {

  gulp.src('./dev/css/styles.css')
    .pipe(sourcemaps.init())
    .pipe(cssnano({advanced: true, aggressiveMerging: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    

  return rollup.rollup({
    input: './dev/app.js',
    plugins: [
      babel(),
      resolve({
        jsnext: true,
        main: true,
        browser: true
      }),
      commonjs(),
      uglify({
        compress: {
          collapse_vars: true
        }
      })
    ]
  })
  .then((bundle) => {
    return bundle.write({
      format: 'iife',
      name: 'app',
      file: './js/app.js',
      sourcemap: true
    })
  })
  .then((bundle) => {
    return gulp.src('./js/app.js')
     .pipe(gzip({ extension: 'gzip' }))
     .pipe(gulp.dest('./js'))
  })
  .then((bundle) => {
    gulp.src('./css/styles.css')
      .pipe(gzip({ extension: 'gzip' }))
      .pipe(gulp.dest('./css'))
  })
})

// Process app.js and load page in browser:
gulp.task('default', ['serve', 'watch'])
