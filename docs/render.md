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

render
------

Components provide a powerful and convenient way for you to create modular chunks of UI. However, sometimes they are overkill. If you just need to output a chunk of static markup, a component is not necessary. Instead you can define a function that returns the markup. This is sometimes called a functional component. Once you've created a function to do that, you can render it into the document with the `render` function. To use it, you will need to import it into your code:

```javascript
import {h, Component, render} from 'composi'

```
`render` take two parameters:

1. tag - the element to create and insert into the DOM
2. container - the element in the DOM in which to insert the new element 

Define a Function to Return Markup
----------------------------------

```javascript
import {h, render} from 'composi'

const fruits = ['Apples', 'Oranges', 'Bananas']

// Define function that returns JSX:
function createList(fruits) {
  return (
    <ul>
      {
        fruits.map(fruit => <li>{fruit}</li>)
      }
    </ul>
  )
}

// Create virtual node of list:
const list = createList(fruits)

// Insert the list in the document body:
render(list, 'body')
```

We could use the `createList` function to make several lists:

```javascript
function CreateList({data}) {
  return (
    <ul id={data.id}>
      {data.items.map(item => <li>{item}</li>)}
    </ul>
  )
}

// Data for lists:
const fruits = {id: '101', items:['Apples', 'Oranges', 'Bananas']}
const names = {id: '102', items:['Joe', 'Ellen', 'Sam']}

// Create lists and instert in their containers:
render(<CreateList data={fruits} />, '#list1')
render(<CreateList data={names} />, '#list2')
```

In the above example, each subsequent call of the `render` function in the same container will patch and update whatever was previously rendered there. Be aware that the inital invocation of `render` will not replace any static content already in the container. Please read `Gotchas` and `Scope` below to better understand how `render` patches the DOM.

Gotchas
-------
The first time `render` is executed, it does not check to see what is in the container. It just appends to it. If you want to have server-side rendered content and replace it with new content using `render`, you'll need to remove the nodes yourself before invoking `render`. After the inital execution, `render` will patch whatever a previous invocation appended to the container. This means that if you render a completely different function component with the `render` function to the same container, whatever the was previously rendered will be patched with the new functional component.

If you want to be able to create multiple instances of the same component, then you will want to use the Component class to do so. Please read the Component class [documentation](./components.md) to see how to do this.

Scope
-------
When `render` patches the DOM, it keeps track of changes scoped to the current call scope. So, if you used `render` to output some JSX in your `app.js` and then invoked the same function again in another file, because the scope is different, it would result in two versions of the same content being rendered in the container. When using `render`, understanding scope is very important to avoid duplication bugs.


Summary
-------

`render` is similar to [`ReactDOM.render`](https://facebook.github.io/react/docs/react-dom.html#render), if you have used that before. It has its use in very limited circumstances. Otherwise, components offer more functionality and versitility.