Composi
=======

Contents
--------
- [Components](./components.md)
- [JSX](./jsx.md)
- [Hyperx](./hyperx.md)
- [Hyperscript](./hyperscript.md)
- [CreateElement](./create-element.md)
- [State](./state.md)
- [Lifecycle Methods](./lifecycle.md)
- [Events](./events.md)
- [Styles](./styles.md)
- [Unmount](./unmount.md)
- [Installation](../README.md)
- [Third Party Libraries](./third-party.md)
- [Functional Components](./functional-components.md)
- [Deployment](./deployment.md)

mount
-----

This function is used to inject a function component into the DOM. It takes two arguments: the tag to convert to nodes and the element in which to inject the tag. The container can be indicated with a valid CSS selector, or an actualy DOM node. The `mount` function always returns a reference to the element injected into the DOM. You can use this as an argument to the `render` function so that it can update the already mounted component.

If no second argument for a component container is supplied, `mount` will inject the component into the body element.

Here are some examples of using `mount`:

```javascript
import {h, mount} from 'composi'

// Define a functional component:
function Header({message}) {
  return (
    <nav>
      <h1>{message}</h1>
    </nav>
  )
}

// Mount the functional component in the document's header element:
mount(<Header message="Hello, World!" />, "header")
```

render
------

Functional components are the best way to create components that are simple yet powerful. The `mount` function makes it easy to inject them into the DOM. But many times you may need to update the component when props or data change. For that you use the `render` function. To use it, you will need to import it into your code:

```javascript
import {h, mount, render} from 'composi'

```
`render` takes two parameters:

1. tag - the element to create and insert into the DOM
2. element - the element in the DOM that the tag will update 

Define a Function to Return Markup
----------------------------------

```javascript
import {h, mount, render} from 'composi'

const fruits = ['Apples', 'Oranges', 'Bananas']

// Define function that returns JSX:
function createList({fruits}) {
  return (
    <div>
      <p>
        <input type='text'/>
        <button>Add</button>
      </p>
      <ul>
        {
          fruits.map(fruit => <li>{fruit}</li>)
        }
      </ul>
    </div>
  )
}

// Insert the list into the document body:
const list = mount(<List fruits={fruits}/>, 'body')

// Define event object:
const listEvents = {
  // Define event handler:
  handleEvent(e) {
    e.target.nodeName === 'BUTTON' && this.addItem()
  },
  // Store reference to form input:
  input : document.querySelector('input')
  // Define method to add item and update list:
  addItem() {
    const value = this.document.value
    if (value) {
      fruits.push(value)
      // Update the list component with "render".
      // Pass in mounted component reference as second argument:
      render(<List fruits={fruits}/>, list)
      // Clear input value:
      input.value = ''
    } else {
      alert('Please provide a value before submitting.')
    }
  }
}
```

In the above example, each subsequent call of the `render` function will update the DOM tree structure with new data. Technically, if we wanted to modify the order of the list items, we would want to render them with a key.


Summary
-------

Both `mount` and `render` are similar in purpose to [`ReactDOM.render`](https://facebook.github.io/react/docs/react-dom.html#render). The main difference is that Composi separates mounting from updating. These means the two function have difference arguments. `mount` expects a second argument for where to inject the component, whereas `render` expects a second argument of the DOM tree to update. If your components need local state, class components might be a better choice. Or not. It depends on you specific needs and your design choices. If you do not like ES6 classes, you can stick with just `mount` and `render` for creating functional components.