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
- [Components](./components.md)
- [State](./state.md)
- Lifecycle Methods
  - [Lifecycle Methods](#Lifecycle-Methods)
  - [Order of Execution](#Order-of-Execution)
  - [Lifecycle Method Use](#Lifecycle-Method-Use)
- [Events](./events.md)
- [Styles](./styles.md)
- [Unmount](./unmount.md)
- [State Management with DataStore](./data-store.md)
- [Third Party Libraries](./third-party.md)
- [Deployment](./deployment.md)
- [Differrences with React](./composi-react.md)

## Lifecycle Methods

Composi has the following five lifecycle methods:

1. componentWillMount
2. componentDidMount
3. componentWillUpdate
4. componentDidUpdate
5. componentWillUnmount

Lifecycle methods let you implement maintenance and clean up code based on the status of a component from when it is created and injected into the DOM, when it is updated and when it is removed from the DOM. These do not work exactly the same as the React equivalents, so pay attention to the documentation for each one.

`componentWillMount` is executed before the component is created and inserted into the DOM. This gets passed a `done` callback. This callback is required to complete the mounting. If you exclude `done` the component will never mount. Since mounting is triggered by an initial state value, you should never use this to set state. Instead use it to do some environmental setup before the component is mounted.

```javascript
componentWillMount(done) {
  console.log('Mounting in 3 seconds.')
  // Do whatever you need to do before mounting...
  setTimeout(() => {
    console.log('We are now mounting!')
    // Don't forget to call done:
    done()
  }, 3000)
}
```

`componentDidMount` is executed after the component is inserted into the DOM. You can use it to attach events to component elements or to query the DOM of the newly mounted component. The base element of a mounted component is available through the component's `this.element` property. In the following example, notice how we set focus on a component's input:

```javascript
componentDidMount() {
  // Access the component base element.
  // Use it to find its input and focus it.
  this.element.querySelector('input').focus()
}
```

`componentWillUpdate` is executed right before the component is updated. If a component is updated with the same data, then no update will occur, meaning this will not execute. Like `componentWillMount`, this gets passed a `done` callback. This callback is required to complete the update. If you exclude `done` the component will never update. You can use this hook to examine the component properties, such as `element`, `currentVNode`, `oldVnode`, etc. State changes always trigger updates. As such, the previous state is not available to the lifecycle hooks. However, you can check the `oldVnode` property on the component to see what the previous state produced. Because this is executed before the update, we cannot know what the next update will produce.

Notice how in the following example we delay the update by three seconds:

```javascript
componentWillUpdate(done) {
  console.log('Updating in 3 seconds.')
  setTimeout(() => {
    console.log('We are now updating!')
    // Don't forget to call done:
    done()
  }, 3000)
}
```

`componentDidUpdate` is executed immediately after the component was updated. If a component is updated with the same data, then no update will occur, meaning this will not execute. Note that if you both a `componentWillUpdate` and `componentDidUpdate` lifecycle hook, `componentDidUpdate` will execute only after the `done` callback in `componentWillUpdate`. 

`componentWillUnmount` is executed before a component is unmounted with its `unmount` method. This gets passed a `done` callback. This callback is required to complete the unmounting. If you exclude the `done` callback, unmounting will not occur. Notice in the following example how we delay the unmounting for 3 seconds in our unmount hook:

```javascript
componentWillUnmount(done) {
  console.log('Unmounting in 3 seconds.')
  setTimeout(() => {
    console.log('We are now unmounting!')
    // Don't forget to call done:
    done()
  }, 3000)
}
```

## Order of Execution

The first time a component is rendered, `componentDidMount` and `componentWillMount` will be executed. `componentWillUpdate` and `componentWillUpdate` will not be executed at this time. After the component was created, each render will fire `componentWillUpdate` and `componentDidUpdate`. So, if you wanted to do something when the component is initially created and after it updates, you would need to do this:

```javascript
class List extends Component {
  //... setup here.
  componentDidMount() {
    // Do stuff after component was created.
  }
  componentDidUpdate() {
    // Do stuff every time component is updated.
  }
}
```

## Lifecycle Method Use

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

  componentDidMount() {
    // Store timer referrence so we can clear it later:
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  // If component is unmounted, end interval loop:
  componentWillUnmount(done) {
    clearInterval(this.timerID)
    done()
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
