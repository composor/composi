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
- [Styles](./styles.md)
- [Unmount](./unmount.md)
- [Pubsub](./pubsub.md)
- [Uuid](./uuid.md)
- [Installation](../README.md)

You might have the best looking components on the planet, but if there wasn't a way for users to interact with your components, they would be essentially useless. There are two ways to implement events: inline and through the `interactions` property. We'll look at inline first.

Inline Events
--------------

Inline events (DOM Level 0) have been around since 1996. They are the original event system for JavaScript. In versions of Internet Export upto 8, inline events were a source of serious memory leaks that could crash the browser. Composi's support for Internet Explorer start at version 9, so this is not a concern. You can use inline events with a Component instance or when extending Component. How you do so in each case differs quite a bite. This is due to the way Component instantiation happens. When you create an instance of the Component class, you pass it an object literal of properties. That object literal will not have access to the Component instance, so no `this`. 

```javascript
import {h, Component} from 'composi'

const increase = () => {
  counter.setState({disabled: false, number: counter.state.number + 1})
}

const decrease = () => {
  if (counter.state.number < 2) {
    counter.setState({disabled: true, number: counter.state.number - 1})
  } else {
    counter.setState({disabled: false, number: counter.state.number - 1})
  }
} 
export const counter = new Component({
  root: '#counter',
  state: {disabled: false, number: 1},
  render: (data) => {
    const {disabled, number} = data
    return (
      <div class='counter' id={uuid()}>
        <button key='beezle' disabled={disabled} onclick={decrease} id="decrease">-</button>
        <span>{number}</span>
        <button onclick={increase} id="increase">+</button>
      </div>
    )
  }
})
```

Notice how in the above example, `increase` and `decrease` are separate functions. This may not be a big deal for you, or it may drive you up the wall. If you would prefer your event callbacks defined as part of a component, you can use the `methods` property:

Methods Property
----------------


You can eleviate the disconnect created by the object literal as Component initializer by giving your component a `methods` property and defining your event callback on it. When you do so, you can access the methods directly from the component instance itself:

```javascript
import {h, Component} from 'composi'

const counter = new Component({
  root: '#counter',
  state: {disabled: false, number: 1},
  render: (data) => {
    const {disabled, number} = data
    return (
      <div class='counter' id={uuid()}>
        <button key='beezle' disabled={disabled} onclick={counter.decrease} id="decrease">-</button>
        <span>{number}</span>
        <button onclick={counter.increase} id="increase">+</button>
      </div>
    )
  },
  methods: {
    increase: () => {
      counter.setState({disabled: false, number: counter.state.number + 1})
    },
  
    decrease: () => {
      if (counter.state.number < 2) {
        counter.setState({disabled: true, number: counter.state.number - 1})
      } else {
        counter.setState({disabled: false, number: counter.state.number - 1})
      }
    }
  }
})
```

Inline Events on Extended Component
-----------------------------------
We can avoid all the above issues of inline event callbacks by using when extending Component. This gives us direct access to the component instance through the `this` keyword and results in more readable and more maintainable code. To preserve the context of the component, you do need to bind the inline event. Notice how we do this below:

```javascript
import {h, Component} from 'composi'

// Define Counter class by extending Component:
export class Counter extends Component {
  constructor (opts) {
    super(opts)
  }

  render(data) {
    const {disabled, number} = data
    // Use bind on the inline events:
    return (
      <div class='counter' id={uuid()}>
        <button key='beezle' disabled={disabled} onclick={this.decrease.bind(this)} id="decrease">-</button>
        <span>{number}</span>
        <button onclick={this.increase.bind(this)} id="increase">+</button>
      </div>
    )
  }

  // Because these methods are part of the class,
  // we can accesss the component directly to set state:
  increase() {
    this.setState({disabled: false, number: this.state.number + 1})
  }

  decrease() {
    if (this.state.number < 2) {
      this.setState({disabled: true, number: this.state.number - 1})
    } else {
      this.setState({disabled: false, number: this.state.number - 1})
    }
  }
}
```

As you can see, this gives us a more concise and readable format. Another option for events is to define them using the `interacions` property, as explained below.

Arrow Functions for Inline Events
---------------------------------
You can get around having to use `bind(this)` on your inline events by using arrows functions. To do this, the value of the inline event needs to be an arrow function that returns the comonent method. Refactoring the `render` method form above, we get this:

```javascript
render(data) {
  const {disabled, number} = data
  // Use bind on the inline events:
  return (
    <div class='counter' id={uuid()}>
      <button key='beezle' disabled={disabled} onclick={() => this.decrease()} id="decrease">-</button>
      <span>{number}</span>
      <button onclick={() => this.increase()} id="increase">+</button>
    </div>
  )
}
```

As you can see, this gives us cleaner inline events.


Interactions Property
---------------------

Another way to add events to a component is to use the `interactions` property. This lets you register standard event listeners. Composi does this using `addEventListener`, so all the rules for it apply here.

Because these are normal DOM events, the context of the event callback will be either the element that the user interacted with, or, in the case that the callback is an arrow function, the global scope of the component. This means that interaction event callbacks do not have direct access to the component. This means that if you need to access the component instance, you'll need to do it directly from the instance itself, like with inline events on Component instances. In the following example we're assuming the existence of a state object called `personState`. This could be emplemented with any library that creates observables, such as [gawk](https://www.npmjs.com/package/gawk), [underscore-observe](https://www.npmjs.com/package/underscore-observe), [observe-plus ](https://www.npmjs.com/package/observe-plus), [observe](https://www.npmjs.com/package/observe), [mobx](https://github.com/mobxjs/mobx), or whatever other state management library you prefer. Please note that if you do use a third party state management solution, it will not make sense to make your components stateful. Instead make them stateless and when the state object changes/mutates, update the component by passig the new state to its `update` method. (See [components](./components.md) for more information about how they work.)

The `interactions` property exects and array of event definitions. These consist of the following three values: 

1. event - The type of event to listen for.
2. element - The element the event will be registered on.
3. callback - A callback to execute when the event occurs.

### Event
This can be any type: click, mousedown, touchstart, etc.

### Element
This can be the component's main element, in which case you would use the value "self", otherwise a selector for any of the components child elements. When using "self" as the element, the event is registered on the component's main elemnt. When selectors for child elements are used, the event is delegated. Event delegate is a good choice when you create a component list with a lot of list items that are interactive. Creating an list with a thousand or more list items that are interactive would consume a lot of memory. Creating a delegated event for them using `interactions` would be very efficient.

### Callback
This is a normal event callback. The first parameter will be the event itself. For a default JavaScript function `this` will refer to the element that captures the event. If you use an arrow function for the callback, `this` will be the scope of the component. You still have access to the element through the event object target.

```javascript
import {h, Component, uuid} from 'composi'

let key = 101
const list = new Component({
  root: '#listContainer',
  state: fruits,
  render() {
    return (
      <div>
        <p>
          <input id='nameInput' type='text' />
          <button id='buttonAdd'>Add</button>
        </p>
        <ul id='fruitList' class='list'>
          {
            this.state.map(fruit => <li key={fruit.key}>{fruit.name}</li>)
          }
        </ul>
      </div>
    )
  },
  interactions: [
    {
      event: 'click',
      element: '#buttonAdd',
      callback: function(e) {
        // e.target is the element the event is on.
        const nameInput = document.querySelector('#nameInput')
        const name = nameInput.value
        if (!name) alert('Please provide a name!')
        list.setState({name, key: key++}, list.state.length)
        nameInput.value = ''
      }
    }
  ]
})

list.update()
```

Typing into the component's input and click the Add button will update the componet's state and patch the DOM to update the list items. Notice how in the callback, we have to directly access the component instance to get access to its `setState` method. 

Interactions with Extended Component
------------------------------------

We can also use the `interactions` property to register events when we extend Component. Just as with making an instance of Component, events registerd on the DOM do not have access to the component instance. This means we have to use a reference to the instance to access its state, etc.

```javascript
// Extending Componet with Interactions:
class List extends Component {
  constructor(opts) {
    super(opts)
    this.state = fruits
    this.key = 1000
  }
  render() {
    let state = this.state
    return (
      <div>
        <p>
          <input id='nameInput' type='text' />
          <button id='buttonAdd'>Add</button>
        </p>
        <ul id='fruitList' class='list'>
          {
            this.state.map(fruit => <li key={fruit.key}>{fruit.name}</li>)
          }
        </ul>
      </div>
    )
  }
}
const list = new List({
  root: '#listContainer',
  interactions: [{
    event: 'click',
    element: '#buttonAdd',
    callback: function() {
      const nameInput = document.querySelector('#nameInput')
      const name = nameInput.value
      if (!name) {
        alert('Please provide a name!')
        return
      }
      list.setState({name, key: list.key++}, list.state.length)
      nameInput.value = ''
      nameInput.focus()
    }
  }]
})
```
