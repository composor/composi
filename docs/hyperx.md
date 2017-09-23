Composi
=======

Contents
--------
- [Components](./components.md)
- [JSX](./jsx.md)
- [Hyperscript](./hyperscript.md)
- [injectElement](./injectElement.md)
- [State](./state.md)
- [Lifecycle Methods](./lifecycle.md)
- [Events](./events.md)
- [Styles](./styles.md)
- [Unmount](./unmount.md)
- [Pubsub](./pubsub.md)
- [Uuid](./uuid.md)
- [Installation](../README.md)
- [Thrid Party Libraries](./third-party.md)

Hyperx
------

If you do not like JSX, you can instead use Hyperx. This lets you define your component markup with ES6 template literals. At build time, Hyperx converts the template literals into hyperscript functions that Composi's virtual dom can understand. 

Installation
------------

First you will need to install Hyperx in your project. Open your terminal and run:

```sh
npm i -D hyperx
```

Then open your project's `gulpfile.js`. Scroll down to line 38 to the following plugin block:

```javascript
commonjs({
  include: 'node_modules/**'
}),
```

You will need to update this by adding in a new line: `ignoreGlobal: true`. This will enable Rollup to import Hyperx like a noraml ES6 module:

```javascript
commonjs({
  include: 'node_modules/**',
  ignoreGlobal: true
}),
```

Importing Hyperx for Use
------------------------
Next you'll need to import Hyperx into any file where you want to use it. That means any file in which you are importing Composi's `Component` class, you'll want to also import Hyperx. Besides importing it, you'll also need to let Hyperx know that it should use Composi's `h` function when it converts template literals into functions. You do that by importing the `h` function and passing it to Hyperx:

```javascript
import {h, Component} from 'composi'
import {hyperx} from 'hyperx'

// Tell Hyperx to use the Composi h function:
const html = hyperx(h)
```

We can now use the `html` function to define template literals as markup for Composi components. If you have not used template literals before, you might want to read up on [how they work](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

Using Hyperx
------------
Remember that unlike JSX, you need to use a dollar sign, $, before the curly braces to delimit a variable interpolation:

```javascript
import {h, Component} from 'composi'
import {hyperx} from 'hyperx'
const html = hyperx(h)

// Use class attribute as normal:
function header(data) {
  return html`
    <header>
      <h1 class='title'>${data.title}</h1>
      <h2 class='subtitle'>${data.subtitle}</h2>
    </header>
  `
}
```


### Partial Attributes

Unlike JSX, Hyperx does support partial attribute values. The following code will work without a problem:

```javascript
import {h, Component} from 'composi'
import {hyperx} from 'hyperx'
const html = hyperx(h)

function userList(users) {
  return html`
    <ul>
       {
         users.map(user => <li class='currently-${user.employed ? "employed" : "unemployed"}'>${user.name}</li>)
       }
    </ul>
  `
}
```

Hyperx with Components
----------------------

We can use Hyperx directly inside a Component as part of the `render` function. Notice that when we need to loop over the arrray of items, we use `html` to define the list item. If we instad made that part a template literal, the markup would be returned as an escaped string. Of course, if that is what you want, that is how you would do it.

```javascript
const fruitsList = new Component({
  root: '#fruit-list',
  state: fruits,
  render: (fruits) => html`
    <ul class='list'>
      ${
        fruits.map(fruit =>
          html`<li>
            <div>
              <h3>{fruit.title}</h3>
              <h4>{fruit.subtitle}</h4>
            </div>
            <aside>
              <span class='disclosure'></span>
            </aside>
          </li>`
        )
      }
    </ul>
  `
})
```

Custom Tags
-----------
JSX has the concept of custom tags that allow you to break up complex markup into smaller, reusable pieces. You can accomplish the same thing with Hyperx. Define the functions that return the markup and then use them inside the parent render function as methods inside dollar sign curly braces:

```javascript
function listItem(fruit) { 
  return html`
    <div>
      <h3>${fruit.name}</h3>
      <h4>${fruit.price}</h4>
    </div>`
}

// Function to return static markup:
function disclosure() { 
  return html`
    <aside>
      <span class='disclosure'></span>
    </aside>`
}

//Now that we have some custom tags, we can use them as follows:

const fruitsList = new Component({
  root: '#fruit-list',
  state: fruits,
  render: (fruits) => html`
    <ul class='list'>
      {
        fruits.map(fruit => (
          <li>
            ${listItem(fruit)}
            ${disclosure()}
          </li> 
        )
      }
    </ul>
  `
})
```

About Sibling Tags
------------------
Like JSX, you markup must always have one enclosing tag. Although it is legal to return a set of sibling elements in an ES6 template literal, this will not work with Composi's `h` function. That's because each tag you define will be converted into a function. For this reason there needs to be one final, top-most function that returns the markup. 

Bad markup:

```javascript
const badHyperx = new Component({
  root: '#list',
  render: () => html`
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
  `
})
```

The above code will not build. Instead you need to create the entire list like this and insert it in some higher element as the root:

```javascript
const goodHyperx = new Component({
  root: '#listDiv',
  render: () => html`
    <ul>
      <li>One</li>
      <li>Two</li>
      <li>Three</li>
    </ul>
  `
})
```

