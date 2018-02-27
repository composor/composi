Composi
=======

Contents
--------
- [Components](./components.md)
- [Hyperx](./hyperx.md)
- [Hyperscript](./hyperscript.md)
- [Render](./render.md)
- [CreateElement](./create-element.md)
- [State](./state.md)
- [Lifecycle Methods](./lifecycle.md)
- [Events](./events.md)
- [Styles](./styles.md)
- [Unmount](./unmount.md)
- [Installation](../README.md)
- [Third Party Libraries](./third-party.md)
- [Deployment](./deployment.md)

Functional Components
---------------------
The component architecture is based on classes. If you favor functional programing over OOP, you might prefer to use functional components. Functional Components are always stateless, so you will want to use them with some kind of state management, such as Redux, Mobx, etc. 

Virtual Dom
-----------

When you create components with the Component class, you have a reference for the component's properties, methods, etc. This also provides a point of reference for the virtual dom. In contrast, functional components do not have this reference for their virtual dom. Instead, with functional components, the scope in which the function is invoked becomes the scope for the virtual dom. This means as your project grows and code gets out over many files, the scope of a functional component can be spread across several files. For components this is not a problem. For functional components this means the first time it gets invoked in a new scope, the previous virtual dom will be replaced by a new one. Unless you are creating a list with 10,000 or more items, you won't notice any inefficencies. However, it does result in more layout thrashing than when creating class-based components.

Creating Functional Components
------------------------------

Functional components use [JSX](./jsx.md) to create markup, but technically you could also use [Hyperx](./hyperx.md) with ES6 template literals. Here we're going to look at using JSX.

To create a functional component, you start with a function, surprise! The function could accept some data, or not. It depends on what the function needs to return. If it is returning static content, no need for a parameter of data. If you want the function component to consume some data, then pass it in as a parameter. And of course you'll need to return some markup. In the example below we have a simple, function component that creates a header:

```javascript
// title.js:
// We need to import the "h" function:
import {h} from 'composi'

// Define function that takes props for data:
export function Title(props) {
  // Return the header with name from props:
  return (
    <nav>
      <h1>Hello, {props.name}!</h1>
    </nav>
  )
}
```

If we were to do this with the Composi `h` function, it would look like this:

```javascript
// app.js:
import {h} from 'composi'

// Define function that takes props for data:
export function Title(name) {
  return h(
    'nav', {}, h(
      'h1', {}, name
    )
  )
}
```

Both examples above create virtual nodes, so we will need a way to get them into the DOM. Composi provides the `render` function for that purpose. It works similar to React's `ReactDOM.render` function. It takes two arguments: a tag/vnode and a selector/element in which to insert the markup.

In our `app.js` file we import `h` and `render` and then the `Title` functional component and render it to the DOM:

```javascript
// app.js:
import {h, render} from 'composi'
import {Title} from './components/title'

// Define data for component:
const name = 'World'

// Render the component into header tag:
render(<Title {...{name}}/>, 'header')
```

This will convert the functional component into a virtual node (vnode) and then convert that into actual nodes inside the header tag. Because a virtual node was created, we can re-render this later with new data and Composi will patch the DOM efficiently for us. In this case that would involve patching the text node of the `h1` tag.

List with Map
-------------

Now lets create a functional component that takes an array and outputs a list of items. Notice that we are using [BEM](https://css-tricks.com/bem-101/) notation for class names to make styling easier.

```javascript
// list.js:
import {h} from 'composi'

export function List(props) {
  return (
    <div class='container--list'>
      <ul class='list--fruits'>
        {props.items.map(item => <li class='list--fruits__item'>{props.item}</li>)}
      </ul> 
    </div>
  )
}
```

This list is consuming an `items` array:

```javascript
// items.js:
export const items = ['Apples', 'Oranges', 'Bananas']
```

In our `app.js` file we put this all together:

```javascript
// app.js:
import {h, render} from 'composi'
import {Title} from './components/title'
import {List} from './components/list'
import {items} from './items'

// Define data for Title component:
const name = 'World'

// Render component into header:
render(<Title {...{name}}/>, 'header')

// Render list component into section with items data:
render(<List {...{items}}/>, 'section')
```

Custom Tags
-----------

We can break this list down a bit using a custom tag for the list item. We will need to pass the data down to the child component through its props:


```javascript
// list.js:
import {h} from 'composi'

function ListItem(props) {
  return (
    <li class='list--fruits__item'>{props.item}</li>
  )
}

export function List(props) {
  return (
    <div class='container--list'>
      <ul class='list--fruits'>
        {props.items.map(item => <ListItem {...{item}}/>)}
      </ul> 
    </div>
  )
}
```

Data Flows Down
---------------

When using custom tags inside a functional component, the data flows down, from the parent to the children. There is no two-way data binding. This makes it easy to reason about. If you need a child component to communicate some kind of data change to its parent, you can use events or any pubsub solution from NPM. We have a tiny and efficient pubsub module on NPM called [pubber](https://www.npmjs.com/package/pubber) that is perfect for these situations.

Events
------

What if we wanted to make this list dynamic by allowing the user to add items? For that we need events. We'll add a text input and button so the user can enter an item. Since this doesn't involve any data consuming any data, their function just needs to return the markup for the nodes to be created. We'll call this function component `ListForm`:

```javascript
// list.js:
import {h} from 'composi'

function ListForm() {
  return (
    <p>
      <input class='list--fruits__input--add' placeholder='Enter Item...' type="text"/>
      <button class='list--fruits__button--add'>Add Item</button>
    </p>
  )
}
function ListItem(props) {
  return (
    <li>{props.item}</li>
  )
}

export function List(props) {
  return (
    <div class='container--list'>
      <ListForm />
      <ul>
        {props.items.map(item => <ListItem {...{item}}/>)}
      </ul> 
    </div>
  )
}
```

handleEvent Interface
---------------------

We are going to use the `handleEvent` interface to wire up events for the component. We'll do this in a separate file and import it into our `app.js` file. To use `handleEvent` with a functional component we'll need to create an object with the `handleEvent` function on it. Then we'll use a standar event listener and pass the that object instead of a callback.

Since we want to be able to add a new fruit to the list, we need to have access to the data and also the function component that renders the list. Therefore we import them into the `events.js` file.

```javascript
// events.js:
import {h, render} from 'composi'
import {items} from './items'
import {List} from './components/list'

export const events = {
  addItem(e) {
    const input = document.querySelector('.list__input--add')
    const value = input.value
    if (value) {
      items.push(value)
      render(<List {...{items}}/>, 'section')
      input.value = ''
    }
  },
  handleEvent(e) {
    e.target.className === 'list__button--add' && this.addItem(e)
  }
}
```

As you can see above, we need to get the value of the input. If the value is truthy, we push it to the items array. Then we re-render the functional component list. Because this is a different scope than `app.js` where we initially rendered the list, the first time we add an item, the list will be created a new, replacing what was there. That's because this is a different scope than `app.js`. However, with every new addition, the render function will use the new virtual dom in this scope to patch the DOM efficiently.

Using the handleEvent Object
----------------------------

Now that we have our `handleEvent` object defined, we need to wire it up to our component. We'll do that in our `app.js` file:

```javascript
// app.js:
import {h, render} from 'composi'
import {Title} from './components/title'
import {List} from './components/list'
import {events} from './events'
import {items} from './items'

// Define data for component:
const name = 'World'
// Render component into header:
render(<Title {...{name}}/>, 'header')

// Render list component into section:
render(<List {...{items}}/>, 'section')

// Add event listener to the component's container and pass in the handleEvent object instead of a callback:
document.querySelector('.container--list').addEventListener('click', events)
```

And that's it. With that we now have an interactive functional component that updates in real time with a virtual dom.

Component Class Advantages
--------------------------

Although you can build a complex app using nothing but functional components, there are certain conveniences when using the Component class. First and foremost is the fact that classes allow you to encapsulate functionality using properties and methods defined directly on the component. The second is the component itself enables more efficient use of the virtual dom because it keeps track of that internally.

