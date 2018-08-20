module.exports = opts => {
  return `{
  "name": "${opts.name}",
  "version": "1.0.0",
  "description": "Put your description here.",
  "main": "app.js",
  "scripts": {
    "build": "gulp",
    "start": "npm run build",
    "test": "echo \\"Error: no test specified\\" && exit 1",
    "prepare": "npm run build"
  },
  "author": "${opts.user}",
  "repository": "foo",
  "license": "MIT",
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-plugin-external-helpers": "^6.22.0",
    "babel-plugin-transform-class-properties": "^6.24.1",
    "babel-plugin-transform-react-jsx": "^6.24.1",
    "babel-preset-env": "^1.6.0",
    "bluebird": "~2.9.24",
    "browser-sync": "^2.12.10",
    "composi": "^${opts.version}",
    "gulp": "^3.9.1",
    "gulp-better-rollup": "^3.3.0",
    "gulp-cssnano": "^2.1.3",
    "gulp-gzip": "^1.4.2",
    "gulp-sourcemaps": "^2.6.4",
    "rollup": "0.49.2",
    "rollup-plugin-babel": "^2.7.1",
    "rollup-plugin-commonjs": "^8.0.2",
    "rollup-plugin-node-resolve": "^3.0.0",
    "rollup-plugin-uglify": "^2.0.1"
  }
}
`
}