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

You might have the best looking components on the planet, but if there wasn't a way for users to interact with your components, they would be essentially useless. There are three ways to implement events: inline, through the `interactions` property and the `handleEvent` interface. Inline events are the primary way developers implement events in React, Angular, Vue and other libraries and frameworks. Composi offers a second way to implement events using a component's `interactions` property. This takes an array of event objects that definine the event type, the target and the callback. Behind the scene this wires up tradition events with `addEventListener`. The third option is to create a `handleEvent` object that gets passed to the `addEventListener` event. This is similiar to the second approach. It differs in that instead of passing the event listener a callback, you pass it an object with a method called `handleEvent`. This will get called when the event fires.

### Which to Use
Although inline events are in vogue with libraries and frameworks, they can lead to substantial memory usage when you use them on the items of a list of 1000s of items. This can lead to sluggish performance. Using `interactions` to setup event listeners enables you to use delegation to avoid this problem. But using event listeners introduces the problem of callback scopes that can lead to memory leaks. With the `handleEvent` aproach, you can implement event delegation, reducing memory usage, and there is no callback scope, avoiding the problem of memory leaks. This approach is also safer, reducing the number of attack points for script injection. Event removal is also dead simple.

If you just want to get things done fast, use inline events. If you're comfortable with event listeners, use `interactions` and if you're a control freak or paranoid about security issues or just like to use the most sophisticated approach, use the `handleEvent` interface. We strongly recommend you give `handleEvent` a try. 

Inline Events
--------------

Inline events (DOM Level 0) have been around since 1996. They are the original event system for JavaScript. In versions of Internet Export upto 8, inline events were a source of serious memory leaks that could crash the browser. Composi's support for Internet Explorer starts at version 9, so this is not a concern. You can use inline events with a Component instance or when extending Component. How you do so in each case differs quite a bite. This is due to the way Component instantiation happens. When you create an instance of the Component class, you pass it an object literal of properties. That object literal will not have access to the Component instance, so no `this`. You'll need to define your callbacks and other custom properties separate from the component initialization.

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
When we extend the Component class, we can avoid all the above issues of inline event callbacks. This gives us direct access to the component instance through the `this` keyword and results in code that is more readable and maintainable. To preserve the context of the component, you do need to bind the inline event. Notice how we do this below:

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

Arrow Functions for Inline Events
---------------------------------
When you're extending the Component class, you can get around having to use `bind(this)` on your inline events by using arrows functions. To do this, the value of the inline event needs to be an arrow function that returns the component method. Refactoring the `render` method from above, we get this:

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
4. bubbles - A boolean. False is default. 

### Event
This can be any type: click, mousedown, touchstart, etc.

### Element
This can be the component's main element, in which case you would use the value "self", otherwise a selector for any of the components child elements. When using "self" as the element, the event is registered on the component's main elemnt. When selectors for child elements are used, the event is delegated. Event delegate is a good choice when you create a component list with a lot of list items that are interactive. Creating an list with a thousand or more list items that are interactive would consume a lot of memory. Creating a delegated event for them using `interactions` would be very efficient.

### Callback
This is a normal event callback. The first parameter will be the event itself. For a default JavaScript function `this` will refer to the element that captures the event. If you use an arrow function for the callback, `this` will be the scope of the component. You still have access to the element through the event object target.

Here's an example of `interactions` on an instance of the Component class:

```javascript
import {h, Component} from 'composi'

const fruits = [
  {
    key: 101,
    name: 'Apples'
  },
  {
    key: 102,
    name: 'Oranges'
  },
  {
    key: 103,
    name: 'Bananas'
  }
]
// initial key value to increase for each new item.
let key = 10000

// Create new list component:
const list = new Component({
  root: 'section',
  state: fruits,
  render: (fruits) => (
    <div>
    <p>
      <input id='nameInput' type='text' />
      <button id='buttonAdd'>Add</button>
    </p>
    <ul id='fruitList' class='list'>
      {
        list.state.map(fruit => <li key={fruit.key}>{fruit.name}</li>)
      }
    </ul>
  </div> 
  ),
  interactions: [
    {
      event: 'click',
      element: '#buttonAdd',
      // Notice how we have to use the component instance "list"
      // to access its properties:
      callback: () => {
        const nameInput = list.element.querySelector('#nameInput')
        const name = nameInput.value
        if (!name) {
          alert('Please provide a name!')
          return
        } else {
          list.setState({name, key: key++}, list.state.length)
          nameInput.value = ''
          nameInput.focus()
        }
      }
    }
  ]
})
```

Typing into the component's input and clicking on the Add button will update the componet's state and patch the DOM to update the list items. Notice how in the callback, we have to directly access the component instance to get access to its `setState` method. 

Interactions with Extended Component
------------------------------------

We can also use the `interactions` property to register events when we extend the Component class. Because `interactions` are defined in the constructor, within the callback you'll have access to the component instance. This means we can use `this` to reference the component's state, etc.

```javascript
// Extending Componet with Interactions:
class List extends Component {
  constructor(opts) {
    super(opts)
    this.state = fruits
    this.key = 1000
    const self = this
    // Define events for component:
    this.interactions = [{
      event: 'click',
      element: '#buttonAdd',
      // Use arrow function for callback so that 'this' refers to component:
      callback: () => {
        const nameInput = this.element.querySelector('#nameInput')
        const name = nameInput.value
        if (!name) {
          alert('Please provide a name!')
          return
        }
        this..setState({name, key: list.key++}, list.state.length)
        nameInput.value = ''
        nameInput.focus()
      }
    }]
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
  root: 'section'
})
list.update()
```

### About Arrow Functions
When using arrow functions for a callback, the value of `this` will no longer refer to the event target or element that intercepted the event. There are two possible values for `this`:

1. When creating an instance of the Component class and using an arrow function for the callback, `this` will be the global scope of the object literal. This does not give you access to the object literal, but instead is `undefined`. The only way to access the interactive element is through the event target.
2. When extending the Component class and using an arrow function for the event callback, `this` will refer to the class itself, giving you access to all the class properties and methods. The element that intercepted the event will be available through the event target.

Depending on what you need to do in an event callback, you can choose to use a traditional function or arrow function for the event callback.

Using handleEvent
-----------------
Perhaps the least used and understood method of handling events has been around since 2000. We're talking about `handldeEvent`. There are two ways you can use the `handleEvent` interface: as an object or as a class method. The interface might appear a little peculiar at first. This is offset by the benefits it offers over other types of event registration. The biggest benefit of `handleEvent` is that it reduces memory usage and helps avoids the problems of memory leaks.

### Usage
The `handleEvent` interface cannot be used with inline events. It can only be used with `addEventListener`. It will be the second argument instead of a callback.. The `handleEvent` will be a function defined on that object. There are two ways to do this: as the method of an object literal or as a class method.  

handleEvent Object
------------------
To use the `handleEvent` interface as an object, you just create an object literal that at minumum has `handleEvent` as a function:

```javascript
const handler = {
  handleEvent: (e) => {
    // Do stuff here
  }
}
```

Let's take a look at how to use a `handleEvent` object with a Component instance.

### Component Instance
Here is an example of a component instance using the `handleEvent` interface. In this case we define a separate object with properties, including the `handleEvent` method. Notice that the handler object has its own private state that we can access easily from the `handleEvent` method. To set up the event listener for `handleEvent` we use the `componentWasCreated` lifecycle method:

```javascript
import {h, Component} from 'composi'

const title = new Component({
  root: 'body',
  state: 'World',
  render: (message) => (
    <h1>Hello, {message}!</h1>
  ),
  // Bind event with handleEvent object after component is injected in DOM:
  componentWasCreated: () => {
    title.element.addEventListener('click', handler)
  }
})

// Define handleEvent object:
const handler = {
  state: 0,
  handleEvent: function(e) {
    alert(e.target.textContent)
    // Increase this object's state:
    this.state++
    // Log the new state:
    console.log(this.state)
  }
}

// Render the title:
const title.update()
```

Notice that the `handleEvent` funciton in the `handler` object above has access to other object properties through the `this` keyword.

### Component Class Extension
Using a `handleEvent` object when extending the Component class is the same. Like the previous example, we use the `componentWasCreated` lifecycle method to add an event listener and pass it a `handleEvent` object:

```javascript
import {h, Component} from 'composi'

class Title extends Component {
  constructor(props) {
    super(props)
    this.root = 'header'
    this.state = 'World',
    this.render = (message) => (
      <h1>Hello, {message}!</h1>
    )
  }

  // Bind event with handleEvent object after component is injected in DOM:
  componentWasCreated() {
    this.element.addEventListener('click', handler)
  }
}

// Define handleEvent object:
const handler = {
  state: 0,
  handleEvent: function(e) {
    alert(e.target.textContent)
    // Increase this object's state:
    this.state++
    // Log the new state:
    console.log(this.state)
  }
}
// Create new title component:
const title = new Title()

// Render the title:
title.update()
```

handleEvent Method
------------------
The other way to use the `handleEvent` interface is as a method of a class. We can do that by making `handleEvent` a method when we extend Component. Because the `handleEvent` method is defined directly on the class, we pass the class itself directly to the event listener by means of the `this` keyword. This means that the `handleEvent` method will have access to all the properties and methods of the class through normal use of `this`. Notice how we can directly access the coponent's state property from within the `handleEvent` method:

```javascript
class Title extends Component {
  constructor(props) {
    super(props)
    this.root = 'header'
    this.state = 'World',
    this.render = (message) => (
      <h1>Hello, {message}!</h1>
    )
  }
  handleEvent(e) {
    // Log the event target:
    console.log(e.target.nodeName)
    // Alert the state.
    // We can access it from the 'this' keyword:
    alert(this.state)
  }

  // Bind event with handleEvent object after component is injected in DOM:
  componentWasCreated() {
    this.element.addEventListener('click', this)
  }
}
// Create new title component:
const title = new Title()

// Render the title:
title.update()
```

Event Delegation with handleEvent
---------------------------------
In the previous examples, we only registered one event on an element. Inline events and `interactions` allow us to register events that are captured on multiple items. This is useful when you have a list of interactive items. We can implement event delegation with the `handleEvent` interface as well. It just requires a little extra code on our part.

Remember that the only argument `handleEvent` receives is the event. From this we can check the event target to see what the user interacted with. Below is an example doing this:

```javascript
import {h, Component} from 'composi'

const fruits = [
  {
    key: 101,
    name: 'Apples'
  },
  {
    key: 102,
    name: 'Oranges'
  },
  {
    key: 103,
    name: 'Bananas'
  }
]

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
          <button id='addItem'>Add</button>
        </p>
        <ul id='fruitList' class='list'>
          {
            this.state.map(fruit => <li key={fruit.key}>{fruit.name}</li>)
          }
        </ul>
      </div>
    )
  }
  handleEvent(e) {
    // Handle button click:
    if (e.target.id === 'buttonAdd') {
      const nameInput = this.element.querySelector('#nameInput')
      const name = nameInput.value
      if (!name) {
        alert('Please provide a name!')
        return
      }
      this.setState({name, key: this.key++}, this.state.length)
      nameInput.value = ''
      nameInput.focus()
    // Handle list item click:
    } else if (e.target.nodeName === 'LI') {
      alert(e.target.textContent.trim())
    }
  }
  componentWasCreated() {
    this.element.addEventListener('click', this)
  }
}
const list = new List({
  root: 'section'
})
list.update()
```

As you can see in the above example, `handleEvent` allows us to implement events in a very efficient manner without any drawbacks. No callback hell with scope issues. If you have a lot of events of the same type on different elements, you can use a switch statement to simplify things. To make your guards simpler, you might resort to using classes on all interactive elements. We've redone the above example to show this approach:

```javascript
import {h, Component} from 'composi'

const fruits = [
  {
    key: 101,
    name: 'Apples'
  },
  {
    key: 102,
    name: 'Oranges'
  },
  {
    key: 103,
    name: 'Bananas'
  }
]

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
          <button class='addItem'>Add</button>
        </p>
        <ul id='fruitList' class='list'>
          {
            this.state.map(fruit => <li class='listItem' key={fruit.key}>{fruit.name}</li>)
          }
        </ul>
      </div>
    )
  }
  handleEvent(e) {
    switch(e.target.className) {
      // Handle button click:
      case 'addItem':
        const nameInput = this.element.querySelector('#nameInput')
        const name = nameInput.value
        if (!name) {
          alert('Please provide a name!')
          return
        }
        this.setState({name, key: this.key++}, this.state.length)
        nameInput.value = ''
        nameInput.focus()
        break
      // Handle list item clic:
      case 'listItem':
        alert(e.target.textContent.trim())
        break
      // Other checks here:
    }
  }
  componentWasCreated() {
    this.element.addEventListener('click', this)
  }
}
const list = new List({
  root: 'section'
})
list.update()
```

Removing Event with handleEvent
-------------------------------

Event removal with `handleEvent` interface couldn't be simpler. Just use the event and `this`:

```javascript 
// Example of simple event target:
class List extends Component {
  constructor(props) {
    super(props)
    this.render = (data) => (
      <div>
        <p>
          <button id='remove-event'>Remove Event</button>
        </p>
        <ul>
          {
            data.map(item => <li>{item}</li>)
          }
        </ul>
      </div>
    )
  }
  // Handle click on list item and button.
  // Remove event by passing "this" with event.
  handleEvent(e) {
    if (e.target.nodeName === 'LI') {
      alert(e.target.textContent)
    } else if (e.target.id === 'remove-event') {
      this.element.removeEventListener('click', this)
    }
  }

  // Bind event with handleEvent object after component is injected in DOM:
  componentWasCreated() {
    // Add event listener to component base (div):
    this.element.addEventListener('click', this)
  }
}
```

Dynamically Changing handleEvent
---------------------------------
One thing you can easily do with `handleEvents` that you cnnot do with inline events or ordinary events listeners is change the code for events on the fly. If you've ever tried to do something like this in the past, you probably wound up with callbacks litered with conditional guards. When you use `handleEvent` to control how an event listener works, this becomes quite simple. It's just a matter of assigning a new value.

For example, let's say you have a `handleEvent` method on a class and under certain circumstances you want to change how it functions. Instead of hanving the handler full of conditional checks, you can jsut toggle it for a completely different `handleEvent`. Let's take a look at how to do this. Below we have a simple list. To switch out the behavior of the `handleEvent` method, we'll give the class a new method: `newHandleEvent`. And when we want to switch from the current, default version, we'll just assign it to `oldHandleEvent`. It's that simple:

```javascript
import {h, Component} from 'composi'

export class List extends Component {
  constructor(opts) {
    super(opts)
    const beezle = this
    // Keep track of toggle handleEvent behavior:
    this.toggle = false
    this.render = (fruits) => (
      <div>
        <p>
          <br/>
          <br/>
          <button id='change-behavior'>Change List Behavior</button>
        </p>
        <ul class='list'>
          {
            fruits.map((fruit, idx) => <li data-dingo={fruit.name} key={fruit.key}><h3>{idx +1}: {fruit.name}</h3></li>)
          }
        </ul>
      </div>
    )
  }
  handleEvent(e) {
    const li = e.target.nodeName === 'LI' ? e.target : e.target.closest('li')
    if (li && li.nodeName && li.nodeName === 'LI') {
      alert(li.dataset.dingo)
    }
    if (e.target.id === 'change-behavior' && !this.toggle) {
      // Save original handleEvent so we can get it back on next toggle:
      this.oldHandleEvent = this.handleEvent
      // Use new handleEvent:
      this.handleEvent = this.newHandleEvent
      // Update toggle value for next check:
      this.toggle = !this.toggle
    }
    
  }
  // We'll use this one to switch with default one defined above.
  newHandleEvent(e) {
    const li = e.target.nodeName === 'LI' ? e.target : e.target.closest('li')
    if (li && li.nodeName && li.nodeName === 'LI') {
      console.log('This is the new behavior.')
      console.log(li.dataset.dingo)
    }
    if (e.target.id === 'change-behavior' && this.toggle) {
      // Get back orginal handleEvent:
      this.handleEvent = this.oldHandleEvent
      // Update toggle value for next check:
      this.toggle = !this.toggle
    }
  }
  // Attach event to capture handleEvent:
  componentWasCreated() {
    this.element.addEventListener('click', this)
  }
}
```

Event Target Gotchas
--------------------

Regardless whether you are using event listeners or the `handleEvent` interface, you need to be aware about what the event target could be. In the case of simple markup, there is little to worry about. Suppose you have a simple list of items:

```html
<ul>
   <li>Apples</li>
   <li>Oranges</li>
   <li>Events</li>
</ul>
```

Assuming that an event listener is register on the list, when the user click on a list item, the event target will be the list item. Clicking on the first item:

```javascript
event.target // <li>Apples</li>
```
However, if the item being interacted with has child elements, then the target may not be what you are expecting. Let's look at a more complex list:

```html
<ul>
   <li>
    <h3>Name: Apples</h3>
    <h4>Quantity: 4</h4>
   </li>
   <li>
    <h3>Oranges</h3>
    <h4>Quantity: 6</h4>
   </li>
   <li>
    <h3>Bananas</h3>
    <h4>Quantity: 2</h4>
   </li>
</ul>
```

With an event listener registered on the list, when the user clicks, the event target might be the list item, or the H3 or the H4. In cases like this, you'll need to check what the event target is before using it. 

Here is an example of an event target that will always be predictable:

```javascript 
// Example of simple event target:
class List extends Component {
  constructor(props) {
    super(props)
    this.render = (data) => (
      <ul>
        {
          data.map(item => <li>{item}</li>})
        }
      </ul>
    )
    // Interactions:
    this.interactions = [
      event: 'click',
      element: 'li',
      // Use arrow function:
      callback: (e) => {
        // e.target will be the list item:
        alert(e.target.textContent)
      }
    ]
  }
}
```

Here is a list target that will not be predictable:

```javascript 
// Example of simple event target:
class List extends Component {
  constructor(props) {
    super(props)
    this.render = (data) => (
      <ul>
        {
          data.map(item => <li>
              <h3>{item.name}</h3>
              <h4>{item.value}</h4>
            </li>)
        }
      </ul>
    )
    // Interactions:
    this.interactions = [
      event: 'click',
      element: 'li',
      // Use arrow function:
      callback: (e) => {
        // Here e.target might be the list item,
        // or the h3, or the h4:
        alert(e.target.textContent)
      }
    ]
  }
}
```

To get around the uncertainty of what the event target might be, you'll need to use guards in the callback. In the example below we're using a ternary operator(condition ? result : alternativeResult) to do so:

```javascript 
// Example of simple event target:
class List extends Component {
  constructor(props) {
    super(props)
    this.render = (data) => (
      <ul>
        {
          data.map(item => <li>
            <h3>{item.name}</h3>
            <h4>{item.value}</h4>
          </li>)
        }
      </ul>
    )
    // Interactions:
    this.interactions = [
      event: 'click',
      element: 'li',
      // Use arrow function:
      callback: (e) => {
        // Here e.target might be the list item,
        // or the h3, or the h4.
        // Therefore we need to test whether the target.nodeName
        // is "LI". If not, we get its parent node:
        const target = e.target.nodeName === 'LI' ? e.target : e.target.parentNode
        // Alert the complete list item content:
        alert(target.textContent)
      }
    ]
  }
}
```

### Element.closest

In the above example the solution works and it's not hard to implement. However, you may have an interactive element with even more deeply nested children that could be event targets. In such a case, adding more parentNode tree climbing becomes unmanagable. To solve this you can use the `Element.closest` method. This is available in modern browsers. Composi includes a polyfill for older browsers, so you can use it now to handle these types of situations where you need event delegation. Here's the previous example redone with `closest`. No matter how complex the list item's children become, we'll always be able to capture the event on the list item itself:

```javascript 
// Example of simple event target:
class List extends Component {
  constructor(props) {
    super(props)
    this.render = (data) => (
      <ul>
        {
          data.map(item => (
            <li>
              <h3>
                <em>{item.name}</em>
              </h3>
              <h4>
                <span>{item.value}</span>
              </h4>
            </li>)
          )
        }
      </ul>
    )
    // Interactions:
    this.interactions = [
      event: 'click',
      element: 'li',
      // Use arrow function:
      callback: (e) => {
        // Use "closest" to test for list item:
        const target = e.target.nodeName === 'LI' ? e.target : e.target.closest('li')
        // Alert the complete list item content:
        alert(target.textContent)
      }
    ]
  }
}
```
