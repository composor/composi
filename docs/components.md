Composi
=======

Contents
--------
- [Installation](../README.md)
- [JSX](./jsx.md)
- [Hyperx](./hyperx.md)
- [Hyperscript](./hyperscript.md)
- [Functional Components](./functional-components.md)
- [Mount, Render and Unmount](./render.md)
- Components
  - [Class Component](#Class-Component)
  - [Exteding the Class Component](#Extending-the-Class-Component)
  - [State](#State)
  - [Events](#Events)
  - [Styles](#Styles)
  - [Lifecylce Methods](#Lifecylce-Methods)
  - [Trigger Initial Render With State](#Trigger-Initial-Render-with-State)
  - [Querying the DOM](#Querying-the-DOM)
  - [SSR & Hydration](#SSR-&-Hydration)
- [State](./state.md)
- [Lifecycle Methods](./lifecycle.md)
- [Events](./events.md)
- [Styles](./styles.md)
- [State Management with DataStore](./data-store.md)
- [Unmount](./unmount.md)
- [Third Party Libraries](./third-party.md)
- [Deployment](./deployment.md)
- [Differences with React](./composi-react.md)

## Class Component

Composi is a library that provides a rich and powerful solution for components. This is provided by the Component class. To use it, you'll first need to create a project. After creating a project (see [Create a New Project](../README.md)), import both `h` and `Component` into your `app.js` file:

```javascript
import {h, Component} from 'composi'
```

You create a new or custom component by extending the Component class. Components have a number of properties that you can use to make your component useful. Below is a general list of properties. There are differences in how an instance of the Component class, or an extension of it, use these.

1. container - the element in the DOM in which the component will be rendered. Multiple components can share the same container. In such a case they will be appended to the container one after the other in the order you first render them or set their initial state.
2. render - a function that returns markup for the element. This function may optionally take some data that it uses to create dynamic content for the component. You may want to use inline events in your markup to capture user interactions. Read the [documentation for events](./events.md) for more information.
3. state - some data that the component will use when rendering. This could be primitive types, or an object or array.
4. Lifecycle methods - these allow you to do things during the lifecycle of the component.

## Extending the Class Component

By extending Component, you can create a custom, reusable component. This is how you would be able to create multiple versions of the same component on the page. You would need to provide only the container element and data to render. If you want to use inline events, you would want to create and extension of Component because then you can define all your actions directly on the component. To learn more about adding events to components, read the [documentation](./events.md).

Below we are going to create a list component to create multiple lists with different datasets:

```javascript
import {h, Component} from 'composi'

// Three arrays of data for three different components:
const fruits = [
  {
    name: 'Apple',
    quantity: 2
  },
  {
    name: 'Orange',
    quantity: 3
  },
  {
    name: 'Banana',
    quantity: 1
  }
]

const pets = [
  {
    name: 'cat',
    quantity: 1
  },
  {
    name: 'dog',
    quantity: 1
  },
  {
    name: 'turtle',
    quantity: 0
  }
]

const tools = [
  {
    name: 'hammer',
    quantity: 1
  },
  {
    name: 'nails',
    quantity: 100
  },
  {
    name: 'screw driver',
    quantity: 1
  }
]

// Extend Component:
class List extends Component {
  constructor(opts) {
    super(opts)
    // Render all instances in the body:
    this.container = 'body'
  }

  render(data) {
    return (
      <ul>
        {
          data.map(item => (
          <li>
            <div>Name: {item.name}</div>
            <div>Quanity: {item.quantity}</div>
          </li>))
        }
      </ul>
    )
  }
}

// Create three instances of List.
// Then assign them state to render them.
const fruitsList = new List()
fruitsList.state = fruits

const petsList = new List()
petsList.state = pets

const toolsList = new List()
toolsList.state = tools
```

The above code would render three lists in the document body.

## State

In the above examples our components were stateless. Whatever data they needed, we passed it to them using their `update` methods. But you can define a component with state. The advantage is that when you change the state, the component automatically updates. Learn more about state by reading the [documentation](./state.md).

## Events

Components can handle events in two ways, inline or as event listeners. Learn more about adding events to component by reading the [documentation](./events.md).

## Styles

There are two ways to define styles for a component: a component style tag or a virtual stylesheet scoped to a component. This makes the component easier to reuse. Learn more about defining styles for components by reading the [documentation](./styles.md).

## Lifecylce Methods

Components have five lifecycle methods:

1. componentWillMount
2. componentDidMount
3. componentWillUpdate
4. componentDidUpdate
5. componentWillUnmount

Learn more about using lifecycle methods with components by reading the [documentation](./lifecycle.md).

About Component Instantiation
-----------------------------

When you create a stateless component, you'll need to pass it some data with its `update` method to get it to render in the DOM. Of course, you counld make a component that does not need any data passed to it because it is not rendering any data. Below we show both approaches:

```javascript
// Render title component, no data needed:
const title = new Component({
  container: 'header',
  // Define render function that returns state markup:
  render: () => <h1>This is a Title!</h1>
})
// Render component without data:
titleComponent.update()

// Render the fruitList component with fruits data:
const fruitList = new Component({
  container: 'body',
  // Define render function that consumes fruit data:
  render: (fruits) => (
    <ul class='list'>
      {
        fruits.map(fruit => <li>{fruit}</li>)
      }
    </ul>
  )
})
// Render component with fruit data:
fruitList.update(fruits)
```
### Creating a Stateful Component
When you create a class by extending Component you can set default state in the constructor. When you create a new instance of such a class, the state gets set. This triggers the creation of a virtual DOM, Composi runs a diff, and then patches the DOM. This results in the automatic rendering and insertion of the component in the DOM without having to run `update` on the component instance. Examine the example below: 

```javascript
import {h, Component} from 'composi'

class Clock extends Component {
  constructor(opts) {
    super(opts)
    this.state = {time: Date.now()}
    this.styles = {
      'p > span': {
        fontFamily: 'Monospace'
      }
    }
  }
  render() {
    let time = this.state.time
    const angle = (time) => 2 * Math.PI * time / 60000
    return (
      <li>
        <div>
          <svg viewBox="0 0 100 100" width="150px">
            <circle cx="50" cy="50" r="45" fill="blue" />
            <line
              stroke-width="2"
              x1="50"
              y1="50"
              x2={ 50 + 40 * Math.cos(angle(time)) }
              y2={ 50 + 40 * Math.sin(angle(time)) }
              stroke="white"
            />
          </svg>
          <p>The time: <span>{ new Date(time).getHours() > 12 ? new Date(time).getHours() -12 : new Date(time).getHours() }:{ new Date(time).getMinutes() }:{ new Date(time).getSeconds() < 10 ?  '0' + new Date(time).getSeconds() : new Date(time).getSeconds()} { new Date(time).getHours() > 12 ? 'PM' : 'AM' }</span></p>
        </div>
      </li>
    )
  }

  tick() {
    this.setState({time: new Date()})
  }

  componentDidMount() {
    this.timeID = setInterval(() => { this.tick() }, 1000)
  }
}
const clock = new Clock({
  container: '#clock'
})
```

## Trigger Initial Render With State

When you create a component instance, you can trigger its render by setting state on the instance. When you do, no need to use `update` on it:

```javascript
// Define component:
const hello = new Component({
  container: 'body',
  render: (name) => <h1>Hello, {name}!</h1>
})

// Setting state on the Component instance will cause the component to render to the DOM into the body tag:
hello.state = 'World'
```

## Querying the DOM

### this.element

Composi does not have a `ref` property like React. However, every component has an `element` property, which is the base element you define in the component's `render` function. Let's look at the following example:

```javascript
const List extends Component {
  constructor(props) {
    super(props)
    this.container = 'body',
  }
  render(data) {
    return (
      <ul class='list'>
        {
          data.map(item => <li>{item}</li>)
        }
      </ul>
    )
  }
}
const list = new List()
// Render list with data:
list.update(['One','Two','Three'])
```

The above component instance `list` has a property `element`. In this case its value will be `<ul class="list"></ul`> We can search for any of the list's  child elements using the `element` property as the starting point. This gives you more precise, scoped queries:

```javascript
// Get the text of the second list item:
const text = list.element.children[1].textContent

// Get the last list item,
// then set an event on it:
const lastItem = list.element.querySelector('li:last-of-type')
lastItem.addEventListener('click', (e) => alert(e.textContent.trim()))
```
For components with complex descendent structure you can use the `element` property for access. You can also access the `element` property from the Component extension's `this` keyword. Notice how we do this in the `update` method below:

```javascript
import {h, Component} from 'composi'

class Person extends Component {
  constructor(props) {
    super(props)
    this.container = 'section'
  }
  render(person) {
    return (
      <div class='person-component'>
        <h3>{person.name}</h3>
        <p>
          <label for="name">New Name:</label>
          <input type="text" />
          <button onclick={() => this.updateName()}>Update</button>
        </p>
      </div>
    )
  }
  updateName() {
    // Get input through 'element' property:
    const input = this.element.querySelector('input')
    const name = input.value || 'unknown'
    this.setState({name})
  }
}
const person = new Person()
person.state = {name: 'Joe'}
```

## SSR & Hydration

You can use whatever server-side solution to pre-render the html for your document. Then after page loads, you can let Composi take over parts of the document as class components. To do this you need to tell the component what element in the DOM to hydrate. You do that with the `hydrate` property.

Let's take a look at how we might do this. Suppose on the server we output some markup as follows:

```html
<body>
  <article>
    <ul id="specialList">
      <li>Apples</li>
      <li>Oranges</li>
      <li>Bananas</li>
    </ul>
  </article>
</body>
```

When the page first loads this will be the default content. In fact, if the JavaScript did not load or failed with an exception, the user would see this content. If we want to replace the static content with a dynamic list, we can define the list component like this:

```javascript
class Liste extends Component {
  render(data) {
    return (
    <ul id="specialList">
      {
        fruits.map(fruit => <li>{fruit}</li>)
      }
    </ul>
    )
  }
}

// Create instance of List:
const list = new List({
  // Designate container to render in:
  container: 'article',
  // Tell Composi to hydrate the list with an id of 'specialList':
  hydrate: 'specialList'
  // Set state, render the component and replace state nodes:
  state: ['Stawberries', 'Peaches', 'Blueberries']
})
```

With the above code, even though the server sent a static list to the browser, at load time Composi will replace it with the dynamic component of the same id in the same container element.

**Note:** When implementing serve-side rendering and component hydration, it's best to use ids for the parts you want to hydrate. That way it's easier for Composi to identify unique parts of the static HTML to take over.

