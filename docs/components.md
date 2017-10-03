Composi
=======

Contents
--------
- [JSX](./jsx.md)
- [Hyperx](./hyperx.md)
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

Component
---------

The Composi is all about components. For this you use the Component class.

After creating a project (see [Create a New Project](../README.md)), import both `h` and `Component` into your `app.js` file:

```javascript
import {h, Component} from 'composi'
```

With these imported, you have two options for creating components. 

1. Create an instance of Component
2. Extend Component to create a new class

Regardless of which approach you take, components have a number of properties that you can use to make your component useful. Below is a general list of properties. There are differences in how an instance of the Component class, or an extension of it, use these.

1. root - the element in the DOM in which the component will be rendered. Multiple components can share the same root. In such a case they will be appended to the root element one after the other in the order you update them or set their initial state.
2. render - a function that returns markup for the element. This function may optionally take some data that it uses to create dynamic content for the component. You may want to use inline events in your markup to capture user interactions. Read the [documentation for events](./events.md) for more information.
3. styles - This is an object defining a stylesheet for the component. It follows normal object literal conventions. To learn more about how to create a sytles object, [read the documentation](./styles.md).
4. interactions - This is an array of event objects. This is only available when creating an instance of the Component class. To learn more about events, [read the documentation](./events.md).
5. methods - This is an object of methods for a component instance. It is not necessary when extended the Component class because you can define methods directly on the class itself. To learn more about methods, [read the documentation for events](./events.md).

Creating an Instance of Component
---------------------------------

Let's look at the first option, creating an instance of `Component`. When creating a component, you need to provide at least two arguments: the root, which is element into which the component will be rendered and a render function. The root element could just be the document body. Or you could have a basic html shell with predefined containers into which you will render your components. Using a shell means your document reaches first render quicker. 

The component's render function is used to define markup that will get converted into elements and inserted into the DOM. The render function is also used every time the component is updated. Rendering the component with new data or changing the state of a stateful component causes the component to create a new virtual dom. Composi compares the component's new virtual dom with its previous one. If they do not match, the new one is used to patch and update the DOM. This results in fast and efficient updating of the DOM based on current state.

By default Composi uses JSX for markdown. You can learn more about JSX in the [documentation](./jsx.md). If you prefer, you can use thehyperscript function [h](./hyperscript.md) to define your markup. Here we're going to use JSX.

Component Instance
------------------

When you create a new Component instance, you initialize it by passing an object of options to the constructor. In this case, the options will be `root` and `render`:

```javascript
import {h, Component} from 'composi'

const hello = new Component({
  element: '#helloMessage',
  render: (name) => <p>Hello, {name}!</p>
})

// Use the component:
hello('World') // Returns <p>Hello, World!</p>
```

We can also design a component that uses a complex object as its source of data:

```javascript
import {h, Component} from 'composi'

// A person object:
const person = {
  name: {
    firstName: 'Joe',
    lastName: 'Bodoni'
  },
  job: 'Mechanic',
  age: 23
}

// Define a component instance:
const user = new Component({
  root: '#userOutput',
  render: (person) => <div>
    <p>Name: {person.name.first} {person.name.last}</p>
    <p>Job: {person.job}</p>
  </div>
})

// Render the component with the person object:
user.update(person)
```

You can also use an array as the source of data for a component. This can be an array of simple types or of objects. In order to output the contents of an array you'll need to use the `map` function on the array and return the markup for each array loop instance:

```javascript
import {h, Component} from 'composi'

const fruits = ['Apples', 'Oranges', 'Bananas']

const fruitList = new Component({
  root: '#fruits',
  render: (fruits) => <ul>
    {
      fruits.map(fruit => <li>{fruit}</li>)
    }
  </ul>
})
// Render the list of fruits:
fruitList.update(fruits)
```

Using this same pattern, we can output an array of objects:

```javascript
import {h, Component} from 'composi'

const people = [
  {
    firstName: 'Joe',
    lastName: 'Bodoni',
    job: 'Mechanic'
  },
  {
    firstName: 'Ellen',
    lastName: 'Vanderbilt',
    job: 'Lab Technician'
  },
  {
    firstName: 'Sam',
    lastName: 'Anderson',
    job: 'Developer'
  }
]

const peopleList = new Component({
  root: '#people',
  render: (people) => <ul>
    {
      people.map(person => <li>
        <div>Name: {person.firstName} {person.lastName}</div>
        <div>Job: {person.job}</div>
      </li>)
    }
  </ul>
})

// Render the peopleList component:
peopleList.update(people)
```

Understanding Component Instances
-------------------------------------
When you create an instance of Component with the `new` keyword, you do so by passing in a object literal of properties and values. This means that the context of those properties is not the component but the object itself. This means that one property does not have access to another, even though they are defined in the same object literal. The only way to access these is from the instance itself. For example, suppose we create a new component instance with state. If we want to access that state inside an event, we would need to do so through the variable we used to create the instance:

```javascript
const person = new Component({
  root: '#person',
  state: personObj,
  render: (person) => (
    <div>
       <h3>{person.firstName} {person.lastName}</h3>
       <h4>{person.job}</h4>
    </div>
  ),
  // Define a user interactions that accesses the component state:
  interactions: [
    {
      event: 'click',
      element: 'h3',
      callback: (e) => {
        // No way to directly access component state,
        // so we have to use the instance itself:
        console.log(person.state)
      }
    }
  ]
})
```

Props
-----
By default a component instance only exposes its default properties. I you want custom properties, you can pass them as props during intialization. These will be exposed on the instance through its `props` property:

```javascript
const person = new Component({
  root: '#person',
  state: personObj,
  render: (person) => (
    <div>
       <h3>{person.firstName} {person.lastName}</h3>
       <h4>{person.job}</h4>
    </div>
  ),
  announce: (e) => console.log(e.target.textContent)
  // Define a user interactions that accesses the component state:
  interactions: [
    {
      event: 'click',
      element: 'h3',
      callback: (e) => {
        // In order to access the `announce` property added above,
        // we need to do so through the instance `props` property:
        person.props.announce(e)
      }
    }
  ]
})
```

You can also use the `methods` property to define methods for a component instance. See [events](./events.md) for more details.

### Anti-Patterns
Although it is possible to access a Component instance's properties as we've shown above, this is not ideal. Component instances are best used when the purpose is simple and straightforward. If you have need to directly access properties of a component or to have one with custom properties, then you want to instead extend Component. This is explained next.

Extending Component
-------------------

Sometimes it makes more sense to extend Component. Do so lets you create a custom, reusable component. This is how you would be able to create multiple versions of the same component on the page. You would need to provide only the root element and data to render. If you want to use inline events, you would want to extend Component because you can then define all your actions directly on the component. To learn more about adding events to components, read the [documentation](./events.md).

Below we are going to create a list component to create multiple lists with different datasets:

```javascript
import {h, Component} from 'composi'

// Three arrays of data for components:
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
    this.root = 'body'
    this.styles = {
      border: 'solid 1px #ccc',
      width: 200,
      ul: {
        margin: '5px 0'
      },
      h3: {
        textAlign: 'center',
        margin: '10px 0 0 0'
      },
      'h3+ul': {
        marginBottom: 20
      }
    }
  }

  render(data) {
    return (
      <ul>
        {
          data.map(item => <li>
            <div>Name: {item.name}</div>
            <div>Quanity: {item.quantity}</div>
          </li>)
        }
      </ul>
    )
  }
}

// Create three instances of List:
const fruitsList = new List({
  state: fruits
})
const petsList = new List({
  state: pets
})
const toolsList = new List({
  state: tools
})

// Render components to screen:
fruitsList.update()
petsList.update()
toolsList.update()
```

The above code would render three lists in the document body.

Component Instance or Extend
---------------------------
Decisions, decisions. Ultimately it's up to you to decide wether to create a Component instance or to extend it. Each has benefits and drawbacks. If you just want to define a render function, set up state and inject your component in the DOM, creating a Component instance is enough. If you want a component with special methods and lifecycle events, or you want a reusable component with multiple instances, you'll wnat to extend Component. Understanding what you need to accomplish will determine which approach you chose.

State
-----
In most of the above examples our components were stateless. Whatever data they needed, we passed it to them using their `update` methods. But you can define a component with state. The advantage is that when you change the state, the component automatically updates. Learn more about state by reading the [documentation](./state.md).

Events
------
Components can handle events in two way, inline or as event listeners. Learn more about adding events to component by reading the [documentation](./events.md).

Styles
------
You can define a virtual stylesheet scoped to a component. This makes the component easier to reuse. Learn more about defining styles for components by reading the [documentation](./styles.md).

Lifecylce Methods
-----------------
Components have four lifecycle methods:

1. componentWasCreated
2. componentWillUpdate
3. componentDidUpdate
4. componentWillUnmount

Learn more about using lifecycle methods with components by reading the [documentation](./lifecycle.md).

About Component Instantiation
-----------------------------

When you create a stateless component, you'll need to pass it some data with its `update` method to get it to render in the DOM. Of course, you counld make a component that does not need any data passed to it because it is rendering data. Below we show both approaches:

```javascript
// Render the fruitList component with fruits data:
const fruitList = new Component({
  root: 'body',
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

// Render title component, no data needed:
const title = new Component({
  root: 'header',
  // Define render function that returns state markup:
  render: () => <h1>This is a Title!</h1>
})
// Render component without data:
titleComponent.update()
```

When you create a class by extending Component you can set default state in the constructor. When you create a new instance of such a class, the state gets set. This triggers the creation of a virtual dom, Composi runs a diff, and then patch the DOM. This results in the automatic rendering and insertion of the component in the DOM without having to run `update` on the component instance. Examine the example below: 

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

  componentWasCreated() {
    this.timeID = setInterval(() => { this.tick() }, 1000)
  }
}
const clock = new Clock({
  root: '#clock'
})
```

Trigger Initial Render With State
---------------------------------
When you create a component instance, you can trigger its render by setting state on the instance. When you do, no need to use `update` on it:

```javascript
// Define component:
const hello = new Component({
  root: 'body',
  render: (name) => <h1>Hello, {name}!</h1>
})

// Setting state will also cause the component to render to the DOM:
hello.state = 'World'
```

Querying the DOM
----------------
### this.element

Composi does not have a `ref` property like React. However, every component has an `element` property, which is the base element you define in the component's render function. Let's look at the following example:

```javascript
const List extends Component {
  constructor(props) {
    super(props)
    this.root = 'body',
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
For components with complex descendent structure you can use the `element` property for access. You can also access the `element` property from the Component extension's `this` keyword:

```javascript
import {h, Component} from 'composi'

class Person extends Component {
  constructor(props) {
    super(props)
    this.root = 'section'
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

SSR & Hydration
---------------

If you want to, you can use whatever server-side solution to pre-render the html for your document. Then after page load, you can let Composi take over parts of the document as components. To do this you need to follows a simple rule.

Give your component's main element a unique id that matches the id of an element in the rendered document. This needs to be in the same element as the component's root. Let's take a look at how we might do this. Suppose on the server we output some markup as follows:

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
const list = new Component({
  // Give the component the same root as the list "specialList" above:
  root: 'article',
  // Define list with same id as list in server-side markup:
  render: (fruits) => (
    <ul id="specialList">
      {
        fruits.map(fruit => <li>{fruit}</li>)
      }
    </ul>
  )
})
// Set state, render the component and replace state nodes:
list.state = ['Stawberries', 'Peaches', 'Blueberries']
```

With the above code, even though the server sent a static list to the browser, at laod time Composi will replace it with the dynamic component of the same id in the same root element.

### Important

When Composi looks for a match in the DOM, it does so from the root element that you assigned for the component. If the root is a generic element as in the case above, and there are more than one in the document, Composi will search in the first match and insert the component there. It is therefore essential that a component's root be unique. If the document had multiple `article` tags, the component would render in the first one only. Remember, if you want to replace a DOM tree with a component, they both must share the same root and also have an element with the same id. Follow those two simple rules and hydration will happen automatically.
