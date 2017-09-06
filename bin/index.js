#!/usr/bin/env node

// Import packages:
const cpFile = require('cp-file')
const copy = require('copy')
const cp = require('fs-cp')
const mkdirp = require('mkdirp')
const ncp = require('ncp').ncp
const replace = require('replace-in-file')
const writefile = require('writefile')
const argv = require('yargs').argv

// Import local values:
const fs = require('fs')
const p = require("path")
const homedir = (process.platform === "win32") ? process.env.HOMEPATH : process.env.HOME
const user = (process.platform === "win32") ? process.env.USERNAME : process.env.USER
const pkg = require('../package.json')
const desktop = argv.d
const pwa = argv.p
const mobile = argv.x
const hybrid = argv.h
const noop = function() {}

function createPackage(opts) {
  return `{
    "name": "${opts.name}",
    "version": "1.0.0",
    "description": "Put your description here.",
    "main": "app.js",
    "scripts": {
      "test": "echo \\"Error: no test specified\\" && exit 1"
    },
    "author": "${opts.user}",
    "repository": "foo",
    "license": "MIT",
    "devDependencies": {
      "babel": "^6.5.2",
      "babel-plugin-external-helpers": "^6.22.0",
      "babel-plugin-transform-react-jsx": "^6.24.1",
      "babel-preset-es2015": "^6.14.0",
      "bluebird": "~2.9.24",
      "browser-sync": "^2.12.10",
      "composi": "^${opts.version}",
      "gulp-better-rollup": "^1.1.1",
      "gulp-cli": "^1.4.0",
      "rollup-plugin-babel": "^2.7.1",
      "rollup-plugin-commonjs": "^8.0.2",
      "rollup-plugin-node-resolve": "^3.0.0",
      "rollup-plugin-uglify": "^2.0.1"
    }
  }`
}
const composi = (() => {
  /**
   * Create variables based on command line arguments.
   */
  const originalName = argv.n
  const name = originalName ? originalName.toLowerCase() : ''
  const path = argv.path || argv.p || p.join(homedir, 'Desktop')
  const version = argv.version || argv.v
  const composi_path = __dirname.split('/bin')[0]
  const package = createPackage({name, user, version: pkg.version})
  

  if (version) {
    console.log(pkg.version)
    return
  }
  if (!name) {
    console.log('No name was provided. Please try again and provide a name.')
    return
  }
  if (name) {
    // Create new project:
    console.log('Creating a new Composi project.')
    mkdirp(p.join(homedir, 'Desktop', name))
    const packageName = name.replace(' ', '-')
    cpFile(p.join(composi_path, 'resources', '.babelrc'), p.join(homedir, 'Desktop', name, '.babelrc'), noop)
    cpFile(p.join(composi_path, 'resources', 'gulpfile.js'), p.join(homedir, 'Desktop', name, 'gulpfile.js'), noop)
    cpFile(p.join(composi_path, 'resources', '.editorconfig'), p.join(homedir, 'Desktop', name, '.editorconfig'), noop)
    cp(p.join(composi_path, 'resources', 'css', 'styles.css'), p.join(homedir, 'Desktop', name, 'css', 'styles.css'), noop)
    cp(p.join(composi_path, 'resources', 'dev', 'app.js'), p.join(homedir, 'Desktop', name, 'dev', 'app.js'), noop)
    cpFile(p.join(composi_path, 'resources', 'index.html'), p.join(homedir, 'Desktop', name, 'index.html'), noop)
    writefile(p.join(path, originalName, 'package.json'), package, noop)
    cpFile(p.join(composi_path, 'resources', 'README.md'), p.join(homedir, 'Desktop', name, 'README.md'), noop)
    setTimeout(function() {
      replace({
        from: /project_name/g,
        to: originalName,
        files: [
          p.join(path, name, 'index.html')
        ],
      }),
      replace({
        from: /project_name/g,
        to: originalName,
        files: [
          p.join(path, name, 'README.md')
        ]
      }),
      setTimeout(function() {
      replace({
        from: /userName/g,
        to: user,
        files: [
          p.join(path, name, 'README.md')
        ]
      })}, 200),
      setTimeout(function() {
      replace({
        from: /currentYear/g,
        to: new Date().getFullYear(),
        files: [
          p.join(path, name, 'README.md')
        ]
      })}, 400),
      console.log('The project has been created.') 
      console.log('Use the terminal to cd to it and run `npm i` to install its dependencies.')
      console.log('After the install is done, you can run `gulp` to build and run your project.')
    }, 2500)
  }
})(argv)