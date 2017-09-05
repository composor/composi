Composi
=======

Contents
--------
- [Components](./components.md)
- [JSX](./jsx.md)
- [Hyperscript](./hyperscript.md)
- [injectElement](./injectElement.md)
- [State](./state.md)
- [Events](./events.md)
- [Styles](./styles.md)
- [Unmount](./unmount.md)
- [Pubsub](./pubsub.md)
- [Uuid](./uuid.md)
- [Installation](../README.md)

Lifecycle Methods
-----------------

Composi has the following four lifecycle methods:

1. componentWasCreated
2. componentWillRender
3. componentDidRender
4. componentWillUnmount

Lifecycle methods let you implement maintenance and clean up code based on the status of a component from when it is created and injected into the DOM, when it is updated and when it is removed from the DOM.

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

In contrast, when we create a new component by extending the Component class, we are able to access component properties directly through the `this` keyword.

```javascript
import {h, Component} from 'composi'

class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {time: new Date()};
  }

  render() {
    return (
      <div>
        <h2>Current Time</h2>
        <p>It is {this.state.time.toLocaleTimeString()}.</p>
      </div>
    )
  }

  componentWasCreated() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: new Date()
    });
  }
}

const clock = new Clock({
  root: '#clock'
})
```