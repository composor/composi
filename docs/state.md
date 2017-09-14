Composi
=======

Contents
--------
- [Components](./components.md)
- [JSX](./jsx.md)
- [Hyperx](./hyperx.md)
- [Hyperscript](./hyperscript.md)
- [injectElement](./injectElement.md)
- [Lifecycle Methods](./lifecycle.md)
- [Events](./events.md)
- [Styles](./styles.md)
- [Unmount](./unmount.md)
- [Pubsub](./pubsub.md)
- [Uuid](./uuid.md)
- [Installation](../README.md)

State
-----

Components can be stateless or stateful. There are advantages to both. Chose the right one depending on use case. For example, if a component will only display the result of some other action, make it stateless and pass it the data it needs. If the data of a component can change at unpredictable times, make it stateful. That way, when its data changes, it will update automatically. If you have a fixed dataset and the component will never need to be rendered again during the session, make it stateless and pass it the data. 

When you give a component state, Composi assigns it getters and setters. Setting state causes the component to render a new virtual dom, diff it with the old virtual dom, and if there are differences, update the actual DOM. As such, the assignment of data to a component's state will trigger an update. Setting state directly is ideal for primitive data types, such as string, numbers:

```javascript
const helloWorld = new Component({
  root: '#hello',
  state: 'World',
  render: (message) => (
    <h1>Hello, {message}!</h1>
  )
})
// Inject component in DOM:
helloWorld.update()
```

With the above component, we can change its output by directly accessing the component's state:

```javascript
helloWorld.state = 'everybody'
```

Booleans
---------
By default boolean values are not output. This is so they can be used for truthy conditional checks. However, if you want to output a boolean value, just convert it to a string. There are two ways to do this. For `true` or `false` you can add `.toString()` to convert them to strings. The values `null` and `undefined` do not have a `.toString()` function, but you can use string concatenation to convert them. Below are examples of both approaches:

```javascript
// For true or false:
render: (value) => <p>The boolean value is: {value.toString()}</p>
// The above approach would throw and error is the boolean was undefined or null.
// For them, do the following:
render: (value) => <p>The boolean value is: {value + ''}</p>
// Make boolean uppercase:
render: (value) => <p>The boolean value is: {(value + '').toUpperCase()}</p>
```

Complex Data Types
------------------
Most components will have state of complex data types: objects or arrays. For update state of complex types you have two choice: use the `setState` method or get the state, perform your operations and set the state with the final result. We'll look at `setState` first.

setState
--------
The Component class has a method called `setState`. Actually, you can use `setState` to set the state of primitive types. So, with the helloWorld component above, we could update its state like this:

```javascript
helloWorld.state = 'everybody'
// or:
helloWorld.setState('everybody')
```

But `setState` is really about making it easy to update the state of complex types. Lets look at a component with an object for its state:

```javascript
const personComponent = new Component({
  root: '#personDiv',
  state: {
    firstName: 'Joe',
    lastName: 'Bodoni',
    job: 'Mechanic',
    age: 23
  },
  render: (person) => (
    <div>
      <p>Name: {}</p>
      <p>Job{}</p>
    </div>
  )
})
```

Because this component's state is complex, we cannot directly update the state properties:

```javascript
// This assignment will not work:
personComponent.state.job = 'Web Developer'
```

Instead we need to use the `setState` method. To update a state object property, we pass in an object with that property and the new value. Behind the scenes, `setState` will mixin the new object with the state object. Then it will create a new virtual dom and patch the actual DOM to reflect the changes.

```javascript
// Update the job property of the component's state:
personComponent.setState({job: 'Web Developer'})
```

Updating Array State
--------------------

When a component has an array as state, you need to provide a second argument for `setState`: the index of the array where you want to make the index. For instance, suppose we have a component `fruitList` that prints out a list of fruits. We notice that the third item in the list is mispelled and want to update it. We can do that as follows:

```javascript
// Use second argument for index in the array:
fruitList.setState('Pinapple', 2)
```

### Arrays of Objects
Arrays of objects are more complicated. This is because when you use `setState` on an array, it is actually performing a splice operation on the array. That means that if you only pass in an object with the property you want to update, as we did for objects, the entire object at that position in the array will be replaced by what you provided. Therefore to update an object in an array you need to provide a complete object for the update, or update the object first and then pass it in. Let's suppose we have an array of people objects:

```javascript
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
    job: 'Web Developer'
  }
]
```
This array is used as the state for a component of users. We want to update Joe's job to Rock Star. You might try to do this:

```javascript
// Update job for Joe Bodoni:
userList.setState({job: 'Rock Star', 0})
```

This will instead result in the object loosing the firstName and lastName properties, and the list in the DOM would be updated accordingly. Instead, we need to get the object we want to update from the array, make whatever changes we need to and then set it on the state:

```javascript
// Proper way to set an object in an array.
// Get the Joe Bodoni user from state:
const state = userList.state[0]
// Set job to new value:
state.job = 'Rock Star'
// Update component's state:
userList.setState(state, 0)
```

Complex State Operations
------------------------

As we saw in our last example of arrays, sometimes you will need to get the state, operate on it separately and then set the component's state to that. For example, if you need to use map, filter, sort or reverse on an array, you'll want to get the complete state and perform these operations. Aftwards you can just set the state:

```javascript
// Get the component's state:
const state = fruitsList.state
// Reverse the array:
state.reverse()
// Set the component's state with the new state:
fruitsList.state = state
```

setState with Callback
----------------------
One option for handling the need for complex operations when setting state is to pass a callback to the `setState` method. When you do so, the first argument of the callback will be the component's state. In the example below, notice how we get the state and manipulate it in the `handleClick` method. After doing what you need to with state, remember to return it. Otherwise the component's state will not get updated.

```javascript
class Button extends Component {
  constructor(props) {
    super(props)
    this.state = { counter: 1 }
  }
  render() {
    return <button onclick={() => this.handleClick()}>{this.state.counter}</button>
  }
  handleClick() {
    this.setState(state => {
      if (state.counter < 10) {
        return {counter: state.counter + 1}
      }
    })
  }
}

// Create instance of button:
// Clicking on the new button will encrease its value upto 10.
const button = new Button()
```

Keyed Items
-----------

In general, Composi's diffing algorythm is very efficient at determining what changed. However, when dealing with long lists, especially if the items order has changed in a random way, it can be challenging to determine the best way to patch the DOM. Keys provide a mechnamism to remedy this. If you are not going to make any drastic changes to a list's data, keys are not necessary. But if the order of updated items can change dramatically, you'll want to use keyed data. 

### Keyed Array Data
The easiest way to create a keyed list is to have any array of data with unique ids. These ids only need to be unique for the items in the array the list is using. You can use any scheme to create unique ids for array items. We provide a `uuid` function for creating uuids of 32 hexadecimal digits. The [documentation](./uuid.md) explains how to use it.

Below is an example of some keyed data:

```javascript
const fruits = [
  {
    id: 'a101',
    name: 'Apple',
    price: '1.00'
  },
  {
    id: 'a102',
    name: 'Orange',
    price: '1.50'
  },
  {
    id: 'a103',
    name: 'Banana',
    price: '2.00'
  }
]
```

To create a keyed list we need to provide each item in the list a `key` property. Notice how the following template does that:

```javascript
const fruitList = new Component({
  root: '#fruits',
  state: fruits,
  render: (fruits) => (
    <ul>
      {
        fruits.map(fruit => <li key={fruit.id}>{fruit.name}</li>)
      }
    </ul>
  )
})
```

The diffing algorythm will use the key value to understand the order of items in the list. This results in more efficient diffing and patching. Putting the `key` properting in the markup of a list will not be rendered to the DOM. The `key` property will only exist in the virtual dom, where it is used to determine if the order of list elements has changed.

Keys Must Be Unique
-------------------
When using keys, make sure that each key is unique to that dataset. Otherwise, if they are not the diff and patch algorythms will get confused and produced unpredictable results when patching the DOM. You can use whatever means you want to create keys as long as they are unique.

State in Extended Components
----------------------------

When you extend Component to create a specialized class, you may want to set initial state for all instances of the class. You can set state directly in the constructor using the `this` keyword:

```javascript
class Clock extends Component {
  constructor(opts) {
    super(opts)
    // Set state for all class instances:
    this.state = {time: Date.now()}
    this.styles = {
      'p > span': {
        fontFamily: 'Courier, Monospace'
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
        </div>
      </li>
    )
  }
}
```


Third Party State Management
----------------------------
Because you can create stateless components, you can use thrid party state management solutions with Composi. Redux, Mobx, or roll your own.

### Redux

```javascript
const { h, Component } from 'composi'
const { createStore } from 'redux'

// Reducer:
function count(state=0, action) {
  switch(action.type) {
    case 'INCREMENT':
      if (state > 99) return 100
      return state + 1
    case 'DECREMENT':
      if (state < 1) return 0
      return state - 1;
    default:
      return state
  }
}

// Action Creators:
const increment = () => {
  return {
    type: 'INCREMENT'
  };
};

const decrement = () => {
  return {
    type: 'DECREMENT'
  };
};

// Create Redux store:
const store = createStore(count)


// Extend Component to create counter:
class Counter extends Component {
  constructor(opts) {
    super(opts)
    
    // Assigning store to component:
    this.store = opts.store
    
    // Update component when store state changes:
    store.subscribe(() => this.updateFromStore())
    
    // Give counter default value of "0":
    this.render = (count = 0) => (
    <div id="counter">
      <button id="dec" disabled={count==0}  onclick={() => this.dec()}>-</button>
      <span id="text">{count}</span>
      <button id="inc" onclick={() => this.inc()}>+</button>
    </div>
    )
  }
  
  // Use ths method to udpate counter with state changes:
  updateFromStore() {
    const state = this.store.getState()
    this.update(state)
  }

  inc() {
    this.store.dispatch(increment())
  }

  dec() {
    this.store.dispatch(decrement())
  }
}

// Create new counter:
const counter = new Counter({
  root: 'article',
  store: store
})
counter.update()
```