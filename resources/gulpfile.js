const gulp = require('gulp')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const rollup = require('rollup')
const babel =  require('rollup-plugin-babel')
const uglify =  require('rollup-plugin-uglify')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

// Static Server & watching files:
gulp.task('serve', ['build'], function () {
  browserSync({
    server: './',
    port: 4040,
    server: {
      open: false
    }
  }).reload
})

gulp.task('watch', function() {
  gulp.watch('./index.html').on('change', reload)
  gulp.watch(['./dev/app.js', 'dev/**/*.js'], ['build', reload])
  gulp.watch('./js/app.js').on('change', reload)
  gulp.watch('css/*.css').on('change', reload)
})

gulp.task('build', function () {
  return rollup.rollup({
    entry: './dev/app.js',
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
    bundle.write({
      format: 'iife',
      moduleName: 'app',
      dest: './js/app.js',
      sourceMap: true
    })
  })
})

// Process app.js and load page in browser:
gulp.task('default', ['serve', 'watch']);
