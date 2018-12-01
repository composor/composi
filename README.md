# Composi

# This library is no longer in development. It has been superseded by [@composi/core](https://github.com/composi/core). We took everything related to Composi and created [a special namespace](https://github.com/composi) on NPM and Github. The new version is a natural evolution of Composi which fully embraces functional programing, abandoning class components for functional components. It provides a Redux-style state management for functional components its [runtime environment](https://composi.github.io/en/docs/runtime/runtime.html) inspired by [the Elm architecture](https://guide.elm-lang.org/architecture/). You can learn more about @composi/core on its [dedicated website](https://composi.github.io)

[![npm](https://img.shields.io/npm/v/composi.svg)](https://www.npmjs.org/package/composi) 
[![Gzip Size](https://img.badgesize.io/https://unpkg.com/composi/dist/composi.js.gzip)](https://www.npmjs.org/package/composi)
[![apm](https://img.shields.io/npm/l/composi.svg)](https://www.npmjs.org/package/composi)
[![npm](https://img.shields.io/npm/dt/composi.svg)](https://www.npmjs.org/package/composi)
[![Read the Docs (version)](https://img.shields.io/readthedocs/pip/stable.svg)](https://composor.github.io)

Composi is a framework for creating desktop and mobile apps. With Composi you can create a dynamic website with reactive components, a progressive web app, or a hybrid app for mobile app stores. Visit the [website](https://composor.github.io).

Composi is small. The core is barely 3KB gzipped. It therefore loads fast. Its virtual DOM updates components efficiently and quickly. It has an API very similar to React, while mainting it's emphasis on simplicity, size, and ease of learning. In fact, you can learn everything you need to know to build apps with Composi in an hour or two.

Composi components can be stateless or stateful. Stateful components are reactive. When you change a component's state, that triggers the component's render function. That in turn creates a new virtual DOM based on the data changes. It then patches the DOM to match the changes. If there are no changes, nothing will happen.

A component's markup is written with JSX. This means you can create custom tags to organize your component's template. You can also pass props to a component tag. If you prefer, you can instead use the `h` function to define the component's markup with hyperscript. In fact, at render time the JSX is converted to this.

## Browser Support

Composi is compatible with browsers back to IE 9 on Windows 7, although you may need to include a [polyfill for promises](https://github.com/stefanpenner/es6-promise) for complete compatibility.



## Breaking Changes in Version 3.0.0

Upgrading from Composi 2.x.x to 3.x.x will require addressing two breaking changes. If you are using functional components, pay attention to the change in the call signature for the `render` function. Secondly, if you are using hydration with class components, this is now done with a `hydrate` property. 

### render

In version 3.x.x the `render` function returns a vitual node representing the current tree of the component. This needs to be assigned to the same variable used to capture the result of the `mount` function. Also, the `render` function now expects a third argument, the container the component is in. Notice in the following example how we mount a component, capturing its result in the variable `list`, then use that again when we `render` the component in the `addItem` function:

```javascript
import { h, mount, render } from 'composi'

let input = null
let key = 104
const fruits = [
  { key: 101, value: 'Apples' },
  { key: 102, value: 'Oranges' },
  { key: 103, value: 'Bananas' }
]
function List(props) {
  function init(el) {
    input = el.querySelector('input')
    input.focus()
  }
  function addItem() {
    const value = input.value
    if (value) {
      fruits.push({
        key: key++,
        value
      })
      // Update the component.
      // Pass list from mount and re-capture it.
      // Don't forget to pass in container as last argument.
      list = render(<List fruits={fruits} />, list, 'section')
      input.value = ''
      input.focus()
    } else {
      alert('Please add a value before submitting.')
    }
  }
  return (
    <div onmount={el => init(el)}>
      <p>
        <input type="text"/>
        <button onclick={() => addItem()}>Add</button>
      </p>
      <ul>
        {
          props.fruits.map(item => <li key={item.key}>{item.value}</li>)
        }
      </ul>
    </div>
  )
}

let list = mount(<List fruits={fruits}/>, 'section')
```

### Class Component Hydration

In version 3.x.x how class components hydrate was changed. It now uses the `hydrate` property to tell Composi what element to use for hydration. When Composi finds the `hydrate` property, it creates a virtual node from the DOM element and uses that to patch the DOM during the first render. This means faster initial render and reaching first interactivity sooner. Below is an example of using the `hydrate` property:

```javascript
import { h, Component } 

class List extends Component {
  // Define list component here...
}

// Instantiate list component:
const list = new List({
  state: fruits,
  container: 'section',
  hydrate: '#old-list-from-server'
})
```

If your class component is a single use one, you can put the `hydrate` property directly in the constuctor:

```javascript
import { h, Component } 

class List extends Component {
  constructor(props) {
    super(props) 
    this.state = fruits
    this.container = 'section'
    this.hydrate = '#old-list-from-server'
  }
  // Define rest of list component here...
}

// Instantiate list component:
const list = new List()
```

## Live Examples on Codepen

1. <a href='https://codepen.io/rbiggs/pen/GOyObq' target='__blank'>Todo List</a>
3. <a href='https://codepen.io/rbiggs/pen/zPmERR' target='__blank'>Minimal Hacker News</a>
2. <a href='https://codepen.io/rbiggs/pen/POMbxG' target='__blank'>Tour of Heroes (Client Side Routing)s</a>
4. <a href='https://codepen.io/rbiggs/pen/MBdMKw' target='__blank'>Calculator</a>
5. <a href='https://codepen.io/rbiggs/pen/qVxvOp' target='__blank'>Cat Image Browser</a>
6. <a href='https://codepen.io/rbiggs/pen/EbovjJ' target='__blank'>Pythagoras Dancing Tree</a>
7. <a href='https://codepen.io/rbiggs/pen/POpMMz' target='__blank'>Tic-Tac-Toe</a>
8. <a href='https://codepen.io/rbiggs/pen/jYbVPe' target='__blank'>Rick and Morty Character Viewer</a>
9. <a href='https://codepen.io/rbiggs/pen/VywZWE' target='__blank'>Slideshow Component</a>
10. <a href='https://codepen.io/rbiggs/pen/gXopyN' target='__blank'>Coin Flip App</a>
11. <a href='https://codepen.io/rbiggs/pen/LOZmbG' target='__blank'>Canvas Clock</a>
12. <a href='https://codepen.io/rbiggs/pen/RjRpxL' target='__blank'>SVG Clock</a>
13. <a href='https://codepen.io/rbiggs/pen/mqyxJX' target='__blank'>Spreadsheet</a>
14. <a href='https://codepen.io/rbiggs/pen/oervxx' target='__blank'>Counter with Redux</a>
15. <a href='https://codepen.io/rbiggs/pen/JygrLo' target='__blank'>Counter with Mobx</a>

## Installation

To install Composi, you'll need to have [Nodejs](https://nodejs.org/en/) installed. Open your terminal and run:

```sh
npm i -g composi
```

**Note:** On macOS and Linux, you may need to run the above command with `sudo`.

## Create a New Project

After installing Composi, you can use it to create a new project. The simplest way to do this is to provide a project name following the `-n` flag:

```sh
composi -n myproject
```
This will create a project named "myproject" on your desktop. If you want to have the project placed somewhere else, you can provide a path with the `-p` flag:

```sh
npm -n myproject -p dev/New \Projects
```
On Windows use the standard Windows file system path notation to define your project's path.

## Project Structure

A new project will have the following folder structure:
```
+--myproject
|  +--dev
|     +--components
|        |--title.js
|     +--css
|        |--styles.css
|     |--app.js
|  +--js
|--.babelrc
|--.editorconfig
|--gulpfile.js
|--index.html
|--jsconfig.json
|--package.json
|--README.md
```

## Building

To build your project, `cd` to its folder and run:

```sh
npm i
```

This will install the dependencies, build the project the first time and launch it in your default browser.

At any other time you can build and launch the project. While in your project's root folder, run:

```sh
npm start
```

You can add other sub-folders to components, or create other folders inside the `dev` folder as necessary.

`styles.css` is a CSS reset. We are using the Bootstrap 4 rest since it provides a consistent baseline for HTML across all browsers. `app.js` is the core of your website/app. `components` folder has one component: `list.js`. You can add more files for other component as needs. Feel free to add more folders and files to the `dev` folder as you see fit to achieve the structure your app needs. Import them into `app.js`. At build time the build script uses `app.js` to bundle all your files and output them to `js/app.js`. The `index.html` is automatically setup to import that script. `index.html` is your main page.

## Example Code - Functional Component

```javascript
import { h, mount } from 'composi'

function HelloWorld({name}) {
  return (
    <nav>
      <h1>Hello, {name}!</h1>
    </nav>
  )
}

let hello = mount(<HelloWorld name='World' />, 'header')
```

## Example Code - Class Component

```javascript
import { h, Component } from 'composi'
import { sampleData } from './data/sample-data'

class List extends Component {
  render(data) {
    return (
      <ul class='list'>
        {
          data.map(item => <li key={item.key}>{item.name}</li>)
        }
      </ul>
    )
  }
}

// Instantiate class to render component to DOM:
new List({
  container: 'section',
  state: sampleData
})
```

## Documentation

To learn how to use Composi, open the [docs](./docs/index.md) folder for project documentation, or for in depth tutorials visit the [website](https://composor.github.io)

## Summary

Composi is all about components. These provide a great way to organize your code into modular and reusable chunks. The virtual DOM means you never have to touch the DOM to change something.

Because Composi uses JSX, there are many similarities to React patterns. Please note that Composi is not a React clone. It is not trying to be compatible with React and the React ecosystem the way Preact and Inferno do. Component state is managed quite differently from React. Components lack the React refs and context properties. Also lacking, PropTypes. Events are not synthetic. They are either real inline events or the `handleEvent` interface. Props and custom tags are supported only because JSX provides these by default. The component architecture is actually adapted from the Component class of [ChocolateChip-UI](https://github.com/chocolatechip-ui/chocolatechipui). Changes were made to the API to work with a virtual DOM.

Composi is small, just 3KB for the gzipped core. It loads quickly. Its small and focused API means you can learn everything in half a day and be productive. If you're already familiar with JSX, then you only need to learn the Component API. You can easily do that in an hour.

## Type Safety

Composi is written in standard ES6 with JSDoc comments to document type usage. This exposes Composi's type system to TypeScript during build time to verify that the source code is correctly typed. This also provides enhanced features when using Composi with [Visual Studio Code](https://code.visualstudio.com). Open `Settings` from the `Preferences` menu in Visual Studio Code and add the following:

```javascript
"javascript.implicitProjectConfig.checkJs": true
```
This tells Visual Studio Code to use TypeScript to check the JavaScript in a project. By default it uses inference to understand JavaScript types, which is very lax. But with JSDoc comments specifying types, it uses those instead for a more strict check of the code structure.

This also gives intellisense when hovering over terms, intelligent code completion, symbol definition peek, symbol renaming across files, typo detection, flagging of unused variables, and wrong use of types as parameters, wrong number of parameters, etc. All of this is happening live, as you are coding. Not build step necessary.

You can run a type check on Composi with TypeScript using this package script:

```javascript
npm run checkjs
```
This test gets run automatically when performiing a build:

```shell
npm run build
>  npm run format && npm run lint && npm run checkjs && npm run bundle && gulp gzip
> prettier --no-semi --single-quote --write ./lib/*.js ./lib/utils/*.js
> eslint --config ./.eslintrc.json lib
> tsc --allowJs --checkJs --noEmit --target ES6 lib/*.js lib/**/*.js
> rollup -c
```

## Running Tests

Composi comes with unit test written with Mocha and Chai. These are loaded from a CDN, so you require an internet connect to run these tests. To run them, open your terminal and execute:

```bash
npm test
```

This will open a navigation page in your default browser. There are four tests:

1. h
2. fragment
3. mount and render
4. Component

Clicking on one of these will open the test page. The test runs automatically when you open the page. Some errors may only show in the browser console, so open it to check. You can get back to the test navigation page by clicking any where on the top header.

## What's Missing

Composi is focused on one thing - providing a solution for components for building and structureing a projects. That means there are certain things it does not address, such as state management, routing, Ajax, and data persistence. There are already solutions that provide these, as enumerated below.

### State Management
Composi provides the barest support for state through the component's `state` property and `setState` method. However for a more robust solution you may prefer to use [Redux](http://redux.js.org), [Mobx](https://mobx.js.org), or some other state management solution. When you do so, you'll want to create stateless components. Read the documentation for [Component](./docs/components.md) to learn more about stateless components. If yo want something really minimal, take a look at [trkl](https://www.npmjs.com/package/trkl) and [pure](https://www.npmjs.com/package/purestate). You could event roll your own state management solution by defining a class and using Composi's [pubsub functions](./docs/pubsub.md), `subscribe` and `dispatch` for making it reactive. Another possibility for state management is [freezer-js](https://www.npmjs.com/package/freezer-js)

### Router
Composi does not provide a client-side router. However, you can use our blessed router [composi-router](https://www.npmjs.com/package/composi-router). The Github repository has documentation on how to use.

Other alternatives for client-side routing are [Page.js](https://www.npmjs.com/package/page.js), [Universal Router](https://www.npmjs.com/package/universal-router), [Navigo](https://www.npmjs.com/package/navigo) or [rlite-router](https://www.npmjs.com/package/rlite-router).

### Ajax
Composi does not provide a means of aquiring remote data. If you only need to support current, ever-green browsers, you an use [fectch](). If you would like to use `fetch` with older browsers, you can provide the [WHATWG polyfill](https://github.com/whatwg/fetch). If don't need every possible feature of `fetch` and are concerned about the polyfill size, you can consider [unfetch](https://www.npmjs.com/package/unfetch). It's tiny and provides good support for the basics.

If you would prefer an approach more like tradition Ajax championed by jQuery, you can take a look at [Axios](https://www.npmjs.com/package/axios).

### Local Data Persistence
If you need to persist data locally, you could use the browser's [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). If you need greater storage or a more sophisticated API, you might look at [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API). If you need support for older browsers, you might consider [localForage](https://www.npmjs.com/package/localforage). This is a libarary that uses whatever local dataStore is the best choice for the browser. It provides a simple interface that works the same for localStorage, WebSQL and IndexedDB.

## Assorted Resources

Useful resources for Composi, such as routing, Ajax, etc.: [Awesome Composi](https://github.com/composor/awesome-composi)


## Prior Art

Composi was not conceived in a vacuum. Inspiration came from exposure to:

1. [vue](https://github.com/vuejs/vue)
2. [react](https://github.com/facebook/react)
3. [preact](https://github.com/developit/preact)
4. [domvm](https://github.com/leeoniya/domvm)
5. [yo-yo](https://github.com/maxogden/yo-yo)
6. [choo](https://github.com/choojs/choo)
7. [hyperapp](https://github.com/hyperapp/hyperapp)
