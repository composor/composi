const gulp = require('gulp')
const rollup = require('rollup')
const babel =  require('rollup-plugin-babel')
const uglify =  require('rollup-plugin-uglify')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const gzip = require('gulp-gzip')

gulp.task('build', function() {
return rollup.rollup({
    entry: './index.js',
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
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
      format: 'umd',
      moduleName: 'composi',
      dest: './dist/composi.js',
      sourceMap: true
    })
  })
})
gulp.task('zip', function() {
  setTimeout(function() {
    gulp.src('./dist/composi.js')
    .pipe(gzip({ extension: 'gzip' }))
    .pipe(gulp.dest('./dist'))
  }, 2000)
})



gulp.task('default', ['build', 'zip'])
