Composi
=======

Contents
--------
- [Components](./components.md)
- [JSX](./jsx.md)
- [Hyperx](./hyperx.md)
- [Hyperscript](./hyperscript.md)
- [Render](./render.md)
- [CreateElement](./create-element.md)s
- [State](./state.md)
- [Lifecycle Methods](./lifecycle.md)
- [Events](./events.md)
- [Unmount](./unmount.md)
- [Installation](../README.md)
- [Third Party Libraries](./third-party.md)
- [Functional Components](./functional-components.md)
- [Deployment](./deployment.md)

Styling a Component
-------------------

You can define styles for a component. There are three ways to do this:

1. You can style your component using [BEM] conventions(http://getbem.com/introduction/) and adding the component's styles to your project's stylesheet.
2. You can use inline styles. This expects an object of property/values.
3. You can provide your component with a style tag with styles for it inside the component's markup.
4. You can use the NPM module `stylor` to create a virtual stylesheet scoped to your component.

Style Tag in Component
----------------------
If you are creating an instance of the Component class, you want to define your styles in the render function and then pass them to the style tag inside your component's markup. In the example below, notice how we use the `nav` tag's id to scope the styles to it:

```javascript
import {h, Component} from 'composi'

export const title = new Component({
  container: 'header',
  render: (message) => {
    // Define styles for style tag:
    const styles = `
      #nav {
        padding: 10px;
        background-color: #333;
      }
      #nav h1 {
        color: #fff;
        font-size: 2rem;
      }`

    // Define style tag in component:
    return (
      <nav id='nav'>
        <style>
          {styles}
        </style>
        <h1>Hello, {message}!</h1>
      </nav>
    )
  }
})
```

If you are extending the Component class, the process is the same. Define your styles as a variable inside the `render` function before returning the markup:

```javascript
import {h, Component, uuid} from 'composi'

class List extends Component {
  constructor(props) {
    super(props)
    this.container = 'section'
  }
  render(data) {
    const styles = `
    .list {
      list-style: none;
      padding: 0;
      margin: 10px;
      border: solid 1px #ccc;
      width: 300px;
    }
    .list > li {
      margin: 0;
      padding: 10px;
      border-bottom: solid 1px #ccc;
    }
    .list > li:hover {
      cursor: pointer;
    }
    .list > li:last-of-type {
      border: none;
    }
  `
    return (
      <div id='list-container'>
        <style>
          {styles}
        </style>
        <ul class='list'>
          {
            data.map(item => <li key={item.id} data-id={item.id}><input type="checkbox" checked={item.checked}/> {item.name}</li>)
          }
        </ul>
      </div>
    )
  }
}
```

When you are using this technique, it is up to you to make sure the styles in the tag are scoped to the component. In the above examples we used an id on the base element of the component. However, if you want to have multiple instances of a component, then you might want to think about using BEM and add the styles directly to your project's stylesheet.

Inline Styles
-------------

You can provide your component elements with inline styles. This is just like you would normally do with HTML, a style attribute followed by a string of CSS properties and values:


```javascript
const title = new Component({
  container: 'header',
  state: 'World',
  render: state => (
    &lt;nav style='padding: 20px; background-color: #ccc;'>
      &lt;h1 style='margin: 0; color: #fff;'>Hello, {state}!&lt;h1>
    &lt;/nav>
  )
})
```

You can also choose to use an object notation approach. This allows you to use dynamic JavaScript evaluations in your CSS. In this case you are passing the `style` attribute a JavaScript object defining the style to be created. This means that CSS properties that are hyphenated must be camel cased. Also all values other than pure numbers must be enclosed in quotes. Since the style property's value needs to be interpolated, the style definition needs to be enclosed in curly braces. Notice how we provide objects as styles inside curly braces:

```javascript
const list = new Component({
  container: 'section',
  render: (data) => (
    <ul style={{
        listStyle: 'none', 
        margin: '20px',
        border: 'solid 1px #ccc',
        borderBottom: 'none'
      }}>
      {
        data.map(item => <li style={{
          borderBottom: 'solid 1px #ccc',
          padding: '5px 10px'
        }}>{item}</li>)
      }
    </ul>
  )
})
```

Since the style value is a JavaScript object, you can remove a style from within the markup and store it as a separate value. This is especially easy when you define a component in its own file:

```javascript
// file: ./components/list.js

// Define inline styles as separate objects:
const listStyle = {
  listStyle: 'none', 
  margin: '20px',
  border: 'solid 1px #ccc',
  borderBottom: 'none'
}

const listItemStyle = {
  borderBottom: 'solid 1px #ccc',
  padding: '5px 10px'
}

// Pass style objects to component:
const list = new Component({
  container: 'section',
  render: (data) => (
    <ul style={listStyle}>
      {
        data.map(item => <li style={listItemStyle}>{item}</li>)
      }
    </ul>
  )
})
```

Although inline styles result in highly portable styled components, they also result in markup that is harder to read. If you mind your component's legibility getting degraded by inline styles, consider using the style tag as explained previously, or using the <code>stylor</code> module explained next.


Using Stylor
------------

You can use the NPM module `stylor` to create a virtual stylesheet scoped to your components. You will do this inside the component's `componentWasCreated` lifecyle method. This requires the styles to be defined as a JavaScript object. Properties must be camel cased and values must be quoted. If you want, you can use hypenated properties by enclosing them in quotes. Simple selectors are fine, but complex properties will need to be enclosed in quotes. You can use hierachical nesting to define parent child relationships, similar to how LESS and SASS do. If the value for a property will be a pixel value, you do not need to provide the "px". values of plain numbers will get converted to pixel values.

### Installing Stylor

Use NPM:

```sh
# cd to the project folder and run this:
npm i -D stylor
```
### Importing Stylor into Your Project
After installing `stylor` as a dependency of your project, you need to import it in your project. In whichever file you want to use it, import it like this:

```javascript
import {createStylesheet} from 'stylor'
```

After importing `createStylesheet` from `stylor` you can use it to create a stylesheet for a component. The `createStylesheet` function takes an object with two properties: `base` and `styles`. `base` is a selector for the element from which styles will be scoped. This should be a unique selector, preferrably with an id. `styles` is an object defining the styles to be created.

Here is an example of styles set up for a Component instance:

```javascript
const personComponent = new Component({
  container: '#person',
  state: personData,
  render: (person) => (
    <div>
      <p>Name: {person.name.last}, {person.name.first}</p>
      <p>Job: {person.job}</p>
      <p>Employer: {person.employer}</p>
      <p>Age: {person.age}</p>
    </div>
  ),
  componentWasCreated: () => {
    // Define conponent-scoped styles:
    createStylesheet({
      base: '#person',
      styles: {
        border: 'solid 1px #ccc',
        margin: '1em',
        p: {
          margin: 0,
          padding: '5px 10px',
          // Hover effect for p tags:
          ':hover': {
            backgroundColor: '#ddd',
            color: '#fff',
            cursor: 'pointer'
          }
        }
      }
    })
  }
})
```

An here is an example of styles set up for when extending Component:

```javascript
class Person extends Component {
  constructor(opts) {
    super(opts)
    this.container = '#person'
    this.state = personData
  }
  render = (person) => (
    <div>
      <p>Name: {person.name.last}, {person.name.first}</p>
      <p>Job: {person.job}</p>
      <p>Employer: {person.employer}</p>
      <p>Age: {person.age}</p>
    </div>
  )
  componentWasCreated() {
    // Define conponent-scoped styles:
    createStylesheet({
      base: '#person',
      styles: {
        border: 'solid 1px #ccc',
        margin: '1em',
        p: {
          margin: 0,
          padding: '5px 10px',
          // Hover effect for p tags:
          ':hover': {
            backgroundColor: '#ddd',
            color: '#fff',
            cursor: 'pointer'
          }
        }
      }
    })
  }
}
```

And here's a sample of some general `styles` objects from an actual component. You can see that we can target element inside a component. Because the styles get scoped to the component, these styles will not leak out and affect other elements in the page.

```javascript
styles: {
  label: {
    display: 'inline-block',
    width: 100,
    textAlign: 'right'
  },
  button: {
    color: '#fff',
    backgroundColor: 'green'
  },
  'button.delete': {
    transition: 'all .25s ease-out',
    border: 'solid 1px red',
    backgroundColor: 'red',
    color: '#fff',
    padding: '10px 20px',
    ':hover': {
      backgroundColor: '#fff',
      color: 'red',
    }
  },
  'li:last-of-type': {
    borderBottom: 'none'
  },
  input: {
    width: 150
  }
}
```

Here's another sample `styles` object:

```javascript
styles: {
  div: {
    margin: 20,
    span: {
      position: 'relative',
      top: '-1px',
      display: 'inline-block',
      border: 'solid 1px #007aff',
      padding:' 5px 10px 5px',
      minWidth: '20px',
      textAlign: 'center'
    },
    button: {
      fontSize: '13pt',
      border: 'solid 1px #007aff',
      color: '#fff',
      backgroundColor: '#007aff',
      padding: '3px 10px 3px',
      cursor: 'pointer',
      margin: 0,
      ':first-of-type': {
        borderRight: 'none'
      },
      ':nth-child(3)': {
        borderLeft: 'none'
      },
      ':last-of-type': {
        backgroundColor: 'red',
        borderColor: 'red',
        color: '#fff',
        marginLeft: 10,
        ':hover': {
          backgroundColor: '#fff',
          color: 'red'
        }
      },
      ':hover': {
        backgroundColor: '#fff',
        color: '#007aff',
        borderColor: '#007aff'
      },
      '[disabled]': {
        backgroundColor: '#ccc',
        borderColor: '#ccc',
        cursor: 'default',
        opacity: '.75',
        ':hover': {
          backgroundColor: '#ccc',
          color: '#007aff',
          borderColor: '#ccc'
        }
      }
    }
  }
}
```

BEM
---

This will also work with [BEM](https://css-tricks.com/bem-101/). When doing so, best to just use the generic body tag as the base for the stylesheet:

```html
<ul class="list">
  <li class="list__item">
    <h3 class="item__title">Joe Bodoni</h3>
  </li>
  <li class="list__item">
    <h3 class="item__title-selected">Ellen Vanderbilt</h3>
  </li>
  <li class="list__item">
    <h3 class="item__title">Sam Anderson</h3>
  </li>
</ul>
```
Define BEM CSS for above markup:

```javascript
createStylesheet('body', {
  '.list': {
    margin: '20px 0',
    listStyle: 'none',
    border: 'solid 1px #ccc'
  },
  '.list__item': {
    padding: 0,
    borderBottom: 'solid 1px #ccc',
    ':last-of-type': {
      border: 'none'
    }
  },
  '.item__title': {
    margin: 0,
    padding: 10,
    ':hover': {
      backgroundColor: '#333',
      color: '#fff',
      cursor: 'pointer'
    }
  },
  'item__title-selected': {
    backgroundColor: '#333',
    color: '#fff'
  }
})
```

Scoped Stylesheets and Memory
-----------------------------

When you define styles on a class constructor, each instance of the class will have its own virtual stylesheet created. This is fine if the number of instances are not large. You should, however, bare in mind that each scoped stylesheet takes up memory. If you intend to create many instances of the same component, it might make sense to not create a scope style but to instead put the styles that all instances will share in your project's stylesheet. 

SASS, LESS, POST-CSS
--------------------

If you want, you can use SASS, LESS or PostCSS as CSS preprocessors in your project. To do so you will have to use the `gulp` versions. For SASS, use [gulp-sass](https://www.npmjs.com/package/gulp-sass), or LESS use [gulp-less](https://www.npmjs.com/package/gulp-less) and for PostCSS use [postcss](https://www.npmjs.com/package/gulp-postcss). Just install these like this:

```sh 
npm i -D gulp-sass
// or
npm i -D gulp-less
// or
npm i -D gulp-postcss
```

Then add these to your project's gulpfile:

```javascript 
// For SASS:
const sass = require('gulp.sass');

// Define a task for SASS:
gulp.task('sass', function () {
  gulp.src('./scss/.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'))
});

// Then add new SASS task to build:
gulp.task('default', ['sass', 'serve', 'watch'])
```

```javascript
// For LESS:
const less = require('gulp-less')

// Define a task for LESS:
gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./css'))
})

// Then add new LESS task to build:
gulp.task('default', ['less', 'serve', 'watch'])
```

```javascript
// For PostCSS
const postcss = require('gulp-postcss');
 
// Define a task for PostCSS:
gulp.task('postcss', function () {
  return gulp.src('./src/*.css')
    .pipe(postcss())
    .pipe(gulp.dest('./css'))
})

// Then add new PostCSS task to build:
gulp.task('default', ['postcss', 'serve', 'watch'])
```