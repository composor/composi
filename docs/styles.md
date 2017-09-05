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
- [Unmount](./unmount.md)
- [Pubsub](./pubsub.md)
- [Uuid](./uuid.md)
- [Installation](../README.md)

Styles
------

You can include styles for a component when you define it. Styles are created as virtual stylesheets scoped to the component. When you are creating an instance of Component, you create styles as an property of the initialization object. When you are creating a class by extending Component, you add styles as a property in its constructor using the `this` keyword.

Styles Defined as Object
------------------------

When you're defining styles, you need to write them in object notation. This means that hypenated properties need to be converted to camel case and values need to be quoted. If you want, you can use hypenated properties by enclosing them in quotes. Simple selectors are fine, but complex properties will need to be enclosed in quotes. You can use hierachical nesting to define parent child relationships, similar to how LESS and SASS do. If the value for a property will be a pixel value, you do not need to provide the "px". values of plain numbers will get converted to pixel values.

Here is an example of styles set up for a Component instance:

```javascript
const personComponent = new Component({
  root: '#person',
  state: personData,
  render: (person) => (
    <div>
      <p>Name: {person.name.last}, {person.name.first}</p>
      <p>Job: {person.job}</p>
      <p>Employer: {person.employer}</p>
      <p>Age: {person.age}</p>
    </div>
  ),
  // Define conponent-scoped styles:
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
```

An here is an example of styles set up for when extending Component:

```javascript
class Person extends Component {
  constructor(opts) {
    super(opts)
    this.root = '#person'
    this.state = personData
    this.render = (person) => (
      <div>
        <p>Name: {person.name.last}, {person.name.first}</p>
        <p>Job: {person.job}</p>
        <p>Employer: {person.employer}</p>
        <p>Age: {person.age}</p>
      </div>
    ),
    // Define conponent-scoped styles:
    this.styles = {
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
  }
})
```

And here's a sample of some general styles from an actual component. You can see that we can target element inside a component. Because the styles get scoped to the component, these styles will not leak out and affect other elements in the page.

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

Here's another sample styles:

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

Scoped Stylesheets and Memory
-----------------------------

When you define styles on a class constructor, each instance of the class will have its own virtual stylesheet created. This is fine if the number of instances are not large. You should, however, bare in mind that each scoped stylesheet takes up memory. If you intend to create many instances of the same component, it might make sense to not create a scope style but to instead put the styles that all instances will share in your project's stylesheet. 