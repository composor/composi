#!/usr/bin/env node

// Import packages:
const fs = require('fs-extra')
const replace = require('replace-in-file')
const argv = require('yargs').argv

// Import local values:
const p = require("path")
const homedir = (process.platform === "win32") ? process.env.HOMEPATH : process.env.HOME
const user = (process.platform === "win32") ? process.env.USERNAME : process.env.USER
const pkg = require('../package.json')

function createPackage(opts) {
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
  const composi_path = __dirname.split(p.sep + 'bin')[0]
  const packageName = name.replace(' ', '-')
  const package = createPackage({name: packageName, user: user, version: pkg.version})

  const deploy = argv.d || argv.deploy
    
  if (version) {
    return console.log(pkg.version)
  }
  if (!name) {
    if (deploy) {
      console.log('Deploying to production.')
      console.log('Please wait.')
      
      let deployName = process.cwd().split(p.sep)
      deployName = deployName[deployName.length -1]
      deployName = `${deployName}-production`
      fs.copy(p.join(process.cwd(), 'index.html'), p.join(path, deployName, 'index.html'))
      fs.copy(p.join(process.cwd(), 'js'), p.join(path, deployName, 'js'))
      fs.copy(p.join(process.cwd(), 'css'), p.join(path, deployName, 'css'))
      fs.copy(p.join(process.cwd(), 'icons'), p.join(path, deployName, 'icons'))
        .catch(err => console.log('No icons to copy.'))
      fs.copy(p.join(process.cwd(), 'images'), p.join(path, deployName, 'images'))
        .catch(err => console.log('No images to copy.'))
      console.log('Deployment completed.')
      console.log('Project deployed at: ' + path + p.sep + deployName)

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
    const packageName = name.replace(' ', '-')
    fs.copy(p.join(composi_path, 'resources', '.babelrc'), p.join(path, '.babelrc'))
    fs.copy(p.join(composi_path, 'resources', 'gulpfile.js'), p.join(path, 'gulpfile.js'))
    fs.copy(p.join(composi_path, 'resources', '.editorconfig'), p.join(path, '.editorconfig'))
    fs.copy(p.join(composi_path, 'resources', 'jsconfig.json'), p.join(path, 'jsconfig.json'))
    fs.copy(p.join(composi_path, 'resources', 'dev', 'css', 'styles.css'), p.join(path, 'dev','css', 'styles.css'))
    fs.copy(p.join(composi_path, 'resources', 'dev', 'app.js'), p.join(path, 'dev', 'app.js'))
    fs.copy(p.join(composi_path, 'resources', 'dev', 'title.js'), p.join(path, 'dev', 'components', 'title.js'))
    fs.copy(p.join(composi_path, 'resources', 'index.html'), p.join(path, 'index.html'))
    fs.outputFile(p.join(path, 'package.json'), package)
    fs.copy(p.join(composi_path, 'resources', 'README.md'), p.join(path, 'README.md'))
    fs.copy(p.join(composi_path, 'resources', 'favicon-16x16.png'), p.join(path, 'images', 'favicon-16x16.png'))
    fs.copy(p.join(composi_path, 'resources', 'favicon-32x32.png'), p.join(path, 'images', 'favicon-32x32.png'))
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
})()
