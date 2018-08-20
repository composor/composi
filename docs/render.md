Composi
=======

Contents
--------
- [Installation](../README.md)
- [JSX](./jsx.md)
- [Hyperx](./hyperx.md)
- [Hyperscript](./hyperscript.md)
- [Functional Components](./functional-components.md)
- Mount, Render and Unmount
   - [mount](#mount)
   - [Reusing a Mount to Update Later](#Reusing-a-Mount-to-Update-Later)
   - [Hydration](#Hydration)
   - [render](#render)
   - [How to Use Render](#How-to-Use-Render)
   - [Unmount](#unmount)
   - [Remount an Unmounted Functional Component](#Remount-an-Unmounted-Functional-Component)
   - [Summary](#Summary)
- [Components](./components.md)
- [State](./state.md)
- [Lifecycle Methods](./lifecycle.md)
- [Events](./events.md)
- [Styles](./styles.md)
- [Unmount](./unmount.md)
- [Third Party Libraries](./third-party.md)
- [Deployment](./deployment.md)
- [Differrences with React](./composi-react.md)

## mount

This function is used to inject a function component into the DOM. It takes two arguments: the tag to convert to nodes and the element in which to inject the tag. The container can be indicated with a valid CSS selector, or an actualy DOM node. The `mount` function always returns a reference to the element injected into the DOM. You can use this as an argument to the `render` function so that it can update the already mounted component.


Here is an example of using `mount`:

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

## Reusing a Mount to Update Later

The `mount` function returns a virtual node representing the current state of the functional component. You can capture that virtual node in a variable and pass it to the [render](#render) function to update it. 

## Hydration


You can hydrate content rendered service-side, embuing it with Composi functionality. To do so, just provide a third argument to the `mount` function for the element in the DOM you wish to hydrate. This must be a node reference or a valid selector. Be aware that a selector should indicate a unique element in the document, otherwise it will choose the first occurence in the document.

Hydration creates a virtual node from the target element and uses this to patch the DOM with the functional component. This allows Composi to add events and dynamic functionality to server-rendered DOM elements.

Suppose we had a list rendered on the server like this:

```html
<ul class='list'>
  <li>Apples</li>
  <li>Oranges</li>
</ul>
```
And when it loads we want to update it as a component. We'll define the component and then mount it while also passing a reference to this list:

```javascript import { h, mount } from 'composi'
function List(props) {
  return (
    <ul class='list'>
      {
        props.data.map(item => <li key={item.key}>{item.value}</li>)
      }
    </ul>
  )
}
// We pass a third argument with a selector for the server-renered list:
mount(<List data={fruits}/> 'section', './list')
```


## render

Functional components let you create components that are simple yet powerful. The `mount` function makes it easy to inject them into the DOM. But many times you may need to update the component when props or data change. For that you use the `render` function. To use it, you will need to import it into your code:

```javascript
import {h, mount, render} from 'composi'

```
`render` takes three parameters:

1. vnode - the vnode returned by the mount function
2. tag - the element to create and insert into the DOM
3. container - the element in which the component is mounted

When rendering a functional component, always capture the latest vnode node in the varable you used when you mounted it. This gets passed as the first argument, followed by the tag to use to update the component. Although the tag might look exactly like the tag you used to mount, the values of its props can be different depending on events or interactions with the component. Please note that because the component reference from mounting will get reassigned with each render, you must use `let`, not `const` or you will get an error. 


## How to Use Render

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
      // Capture the latest vnode version of the component in the variable used to mount.
      // This will get passed in on the next render.
      list = render(list, <List fruits={fruits}/>, 'body')
      // Clear input value:
      input.value = ''
    } else {
      alert('Please provide a value before submitting.')
    }
  }
}
```

In the above example, each subsequent call of the `render` function will update the DOM tree structure with new data. Technically, if we wanted to modify the order of the list items, we would want to render them with a key.

## unmount

The `unmount` function lets you remove a mounted functional component from the DOM. To do so you pass it the reference to the functional component that was returned by the `mount` function:

```javascript
function Title({message}) {
  return (
    <nav>
      <h1>Hello, {message}!</h1>
    </nav>
  )
}
let title = mount(<Title message='World'/>, 'header')

// Unmount the title after 5 seconds:
setTimeout(() => unmount(title), 5000)
```

In most cases using conditional logic to render a functional component makes more sense. However, if conditional logic is not feasable or adds too much complexity to a component, you can use `unmount` to remove the mounted functional component from the DOM.

## Remount an Unmounted Functional Component

After you've unmounted a functional component, you can remount it later using the `mount` function:

```javascript
function Title({message}) {
  return (
    <nav>
      <h1>Hello, {message}!</h1>
    </nav>
  )
}
let title = mount(<Title message='World'/>, 'header')

// Unmount the title after 5 seconds:
setTimeout(() => unmount(title), 5000)

// Remount the title 5 seconds after it was unmounted:
setTimeout() => {
  title = mount(<Title message='World'/>, 'header')
}, 10000)
```

## Summary

Both `mount` and `render` are similar in purpose to [`ReactDOM.render`](https://facebook.github.io/react/docs/react-dom.html#render). The main difference is that Composi separates mounting from updating. These means the two function have difference arguments. `mount` expects a second argument for where to inject the component, whereas `render` expects a second argument of the DOM tree to update. If your components need local state, class components might be a better choice. Or not. It depends on your specific needs and your design choices. If you do not like ES6 classes, you can stick with just `mount` and `render` for creating functional components. If your components are very complex, class components may solve your problems better and result in better organization of responsibilities and concerns.