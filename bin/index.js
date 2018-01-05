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
const noop = function() {}

function createPackage(opts) {
  return `{
  "name": "${opts.name}",
  "version": "1.0.0",
  "description": "Put your description here.",
  "main": "app.js",
  "scripts": {
    "build": "gulp",
    "test": "echo \\"Error: no test specified\\" && exit 1"
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
    "gulp-better-rollup": "^1.1.1",
    "gulp-cssnano": "^2.1.2",
    "gulp-gzip": "^1.4.0",
    "gulp-sourcemaps": "^2.6.1",
    "rollup-plugin-babel": "^2.7.1",
    "rollup-plugin-commonjs": "^8.0.2",
    "rollup-plugin-node-resolve": "^3.0.0",
    "rollup-plugin-uglify": "^2.0.1"
  }
}
`
}
const composi = (() => {
  /**
   * Create variables based on command line arguments.
   */
  const originalName = argv.n
  const name = argv.n ? argv.n.toLowerCase() : ''
  let path = argv.path || argv.p || p.join(homedir, 'Desktop')
  const version = argv.version || argv.v
  const sep = p.sep
  const composi_path = __dirname.split(sep + 'bin')[0]
  const packageName = name.replace(' ', '-')
  const package = createPackage({name: packageName, user: user, version: pkg.version})

  const deploy = argv.d || argv.deploy
    
  if (version) {
    console.log(pkg.version)
    return
  }
  if (!name) {
    if (deploy) {
      console.log('Deploying to production.')
      console.log('Please wait.')
      let proj_dir = deploy.split(sep)
      proj_dir = proj_dir[proj_dir.length -1]
      proj_dir += '-production'
      cp(p.join(deploy, 'index.html'), p.join(path, proj_dir, 'index.html'), noop)
      ncp(p.join(deploy, 'js'), p.join(path, proj_dir, 'js'), noop)
      ncp(p.join(deploy, 'css'), p.join(path, proj_dir, 'css'), noop)
      ncp(p.join(deploy, 'icons'), p.join(path, proj_dir, 'icons'), noop)
      ncp(p.join(deploy, 'images'), p.join(path, proj_dir, 'images'), noop)
      console.log('Deployment completed.')
      console.log('Project deployed at: ' + path + p.sep + proj_dir)

    } else {
      console.log('No name was provided. Please try again and provide a name.')
      console.log('Make sure you use the `-n` flag before the name.')
      console.log('Example: composi -n MyProject')
    }
    return
  }
  if (name) {
    path = p.join(path, name)
    // Create new project:
    console.log('Creating a new Composi project.')
    mkdirp(path)
    const packageName = name.replace(' ', '-')
    cpFile(p.join(composi_path, 'resources', '.babelrc'), p.join(path, '.babelrc'), noop)
    cpFile(p.join(composi_path, 'resources', 'gulpfile.js'), p.join(path, 'gulpfile.js'), noop)
    cpFile(p.join(composi_path, 'resources', '.editorconfig'), p.join(path, '.editorconfig'), noop)
    cp(p.join(composi_path, 'resources', 'dev', 'css', 'styles.css'), p.join(path, 'dev','css', 'styles.css'), noop)
    cp(p.join(composi_path, 'resources', 'dev', 'app.js'), p.join(path, 'dev', 'app.js'), noop)
    cp(p.join(composi_path, 'resources', 'dev', 'title.js'), p.join(path, 'dev', 'components', 'title.js'), noop)
    cpFile(p.join(composi_path, 'resources', 'index.html'), p.join(path, 'index.html'), noop)
    writefile(p.join(path, 'package.json'), package, noop)
    cpFile(p.join(composi_path, 'resources', 'README.md'), p.join(path, 'README.md'), noop)
    cpFile(p.join(composi_path, 'resources', 'favicon-16x16.png'), p.join(path, 'images', 'favicon-16x16.png'))
    cpFile(p.join(composi_path, 'resources', 'favicon-32x32.png'), p.join(path, 'images', 'favicon-32x32.png'))
    setTimeout(function() {
      replace({
        from: /project_name/g,
        to: originalName,
        files: [
          p.join(path, 'index.html')
        ],
      }),
      replace({
        from: /project_name/g,
        to: originalName,
        files: [
          p.join(path, 'README.md')
        ]
      }),
      setTimeout(function() {
      replace({
        from: /userName/g,
        to: user,
        files: [
          p.join(path, 'README.md')
        ]
      })}, 200),
      setTimeout(function() {
      replace({
        from: /currentYear/g,
        to: new Date().getFullYear(),
        files: [
          p.join(path, 'README.md')
        ]
      })}, 400),
      console.log('The project has been created.') 
      console.log('Use the terminal to cd to it and run `npm i` to install its dependencies.')
      console.log('After the install is done, you can run `gulp` to build and run your project.')
    }, 2500)
  }
})(argv)