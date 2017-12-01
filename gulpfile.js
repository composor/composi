const gulp = require('gulp')
const rollup = require('rollup')
const babel =  require('rollup-plugin-babel')
const uglify =  require('rollup-plugin-uglify')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const gzip = require('gulp-gzip')

gulp.task('build', () => {
  return rollup.rollup({
    input: './index.js',
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
    return bundle.write({
      format: 'umd',
      name: 'composi',
      file: './dist/composi.js',
      sourcemap: true
    })
  })
  .then((bundle) => {
    gulp.src('./dist/composi.js')
     .pipe(gzip({ extension: 'gzip' }))
     .pipe(gulp.dest('./dist'))
  })
})

gulp.task('default', ['build'])
