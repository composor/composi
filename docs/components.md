Composi
=======

Contents
--------
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

Let's look at the first option, creating an instance of `Component`. When creating a component, you need to provide at least two arguments: the element or root into which the component will be rendered and a render function. The root element could just be the document body. Or you could have a basic html shell with predefined containers into which you will render your components. Using a shell means your document reaches first render quicker. 

The component's render function is used to define markup that will get converted into elements and inserted into the DOM. The render function is also used every time the component is updated. Rendering the component with new data or changing the state of a stateful component causes the component to create a new virtual dom. Composi compares the component's new virtual dom with its previous one. If they do not match, the new one is used to patch and update the DOM. This results in fast and efficient updating of the DOM based on current state.

By default Composi uses JSX for markdown. You can learn more about JSX in the [documentation](./jsx.md). If you prefer, you can use thehyperscript function [h](./hyperscript.md) to define your markup. Here we're going to use JSX.

Component Instance
------------------

When you create a new Component instance, you initialize it by passing an object of options to the constructor. In this case, the options will be `root` and `render:

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
    this.root = document.querySelector('body')
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
fruitList.update(fruits)

// Render title component, no data needed:
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
