Composi
=======

Contents
--------
- [Components](./components.md)
- [JSX](./jsx.md)
- [Hyperx](./hyperx.md)
- [Hyperscript](./hyperscript.md)
- [injectElement](./injectElement.md)
- [State](./state.md)
- [Events](./events.md)
- [Styles](./styles.md)
- [Unmount](./unmount.md)
- [Pubsub](./pubsub.md)
- [Uuid](./uuid.md)
- [Installation](../README.md)
- [Thrid Party Libraries](./third-party.md)

Lifecycle Methods
-----------------

Composi has the following four lifecycle methods:

1. beforeCreateComponent
2. componentWasCreated
3. componentWillUpdate
4. componentDidUpdate
5. componentWillUnmount

Lifecycle methods let you implement maintenance and clean up code based on the status of a component from when it is created and injected into the DOM, when it is updated and when it is removed from the DOM.

`beforeCreateComponent` is executed before the component is created and inserted into the DOM.

`componentWasCreated` is executed after the component is inserted into the DOM.

`componentWillUpdate` is executed right before the component is updated.

`componentDidUpdate` is executed immediately after the component was updated.

`componentWillUnmount` is executed before a component is unmounted with its `unmount` method.

Lifecycle Methods are Asynchronous
----------------------------------
When using lifecycle methods, be aware that they are asynchronous. For example, with `beforeCreateComponent` your component will probably be created and inserted into the DOM before your method can finish. Similarly, when using `componentWillUnmount`, the component will probably be unmounted and destroyed before your code in this method completes. If you want to handle these two in a synchronous manner for tighter control, you have two choices. Use a method that returns a promise, or use the [ES7 async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function). If your browser target includes IE9, you will need to polyfill promises for either of these to work.

Order of Execution
------------------
The first time a component is rendered, `beforeCreateComponent` and `componentWasCreated` will be executed. `componentWillUpdate` and `componentWillUpdate` will not be executed at this time. After the component was created, each render will fire `componentWillUpdate` and `componentWillUpdate`. So, if you wanted to do something when the component is initially created and after it updates, you would need to do this:

```javascript
class List extends Component {
  //... setup here.
  componentWasCreated() {
    // Do stuff after component was created.
  }
  componentDidUpdate() {
    // Do stuff every time component is updated.
  }
}
```

Lifecycle Methods with Component Instance
-----------------------------------------

In the following example we use `componentWasCreated` to start a timer and `componentWillUnmount` to terminate the timer.

In our first example of lifecycle methods, we'll use a Component instance. This poses several problems for the lifecycle methods. They do not have access to the component itself. This forces us to use global variables to pass things around.

```javascript
import {h, Component} from 'composi'

function tick() {
  clock.setState({
    time: new Date()
  });
}
let timerID
const clock = new Component({
  root: '#clock',
  state: {time: new Date()},
  render: (date) => {
    return (
    <div>
      <h2>The Current Time</h2>
      <p>It is {date.time.toLocaleTimeString()}.</p>
    </div>
  )},

  componentWasCreated() {
    timerID = setInterval(
      () => {
        tick()
      },
      1000
    );
  },

  componentWillUnmount() {
    clearInterval(timerID);
  }
})

clock.update()
```

Lifecycle Methods with Extended Component
-----------------------------------------

When we create a new component by extending the Component class, we can access component properties directly through the `this` keyword. This is so because we define the lifecycle methods as class methods. Notice how we do this in the example below.

```javascript
import {h, Component} from 'composi'

class Clock extends Component {
  constructor(props) {
    super(props)
    this.root = '#clock'
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h2>Current Time</h2>
        <h2>It is {this.getLocalTime()}.</h2>
      </div>
    )
  }

  getLocalTime() {
    return this.state.date.toLocaleTimeString()
  }

  componentWasCreated() {
    // Store timer referrence so we can clear it later:
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  // If component is unmounted, end interval loop:
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: new Date()
    });
  }
}

// Instantiated clock will create and start it:
const clock = new Clock()
```
