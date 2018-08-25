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
- [Lifecycle Methods](./lifecycle.md)
- [Events](./events.md)
- [Styles](./styles.md)
- [Unmount](./unmount.md)
- State Management with DataStore
  - [State Management with DataStore](#State-Management-with-DataStore)
  - [Importing in Your Project](#Importing-in-Your-Project)
  - [DataStore](#DataStore)
  - [DataStoreComponent](#DataStoreComponent)
  - [Observer](#Observer)
  - [Watch Method](#Watch-Method)
  - [Dispatch Method](#Dispatch-Method)
  - [uuid](#uuid)
- [Third Party Libraries](./third-party.md)
- [Deployment](./deployment.md)
- [Differences with React](./composi-react.md)

## State Management with DataStore

Composi's class components are a powerful way to structure your apps. Stateful class components let you create components with local state. In many situations this is a perfect way to handle state. But you may prefer to have state separate from your class components.  

For those situations Composi provides `DataStore` and `DataStoreComponent`. Together they create a combination similar to how Mobx works with React components. You create a `dataStore` and pass it to a `dataStore component`. When you update the data in the `dataStore`, the `dataStore component` udpates automatically.

If you are going to use `DataStore` then you are also going to use `DataStoreComponent`.

## Importing in Your Project

Importing `DataStore` into your project is simple. You import it from Composi's `data-store` folder:

```javascript
import { DataStore, DataStoreComponent } from 'composi/data-store'
```

## DataStore

After importing `DataStore`, you can create a `dataStore`. You do this using the `new` keyword and passing in the intial data to use. `DataStore` expects data in the following format:

```javascript
import { DataStore, DataStoreComponent } from 'composi/data-store'

const dataStore = new DataStore({
  state: {
    title: 'The Current Title',
    items: [
      'Apples',
      'Oranges',
      'Bananas'
    ]
  }
})
```

### setState

`DataStore` has only one public method: `setState`. You use this to update the state of a `dataStore`. You do this by using a callback. This gets pass the previous state of the `dataStore`. After doing whatever you need to do with `prevState`, you need to return it. Otherwise, the `dataStore` with never dispatch its update event:

```javascript
dataStore.setState(prevState => {
  prevState.items.push('Watermelon')
  // Don't forget to return prevState:
  return prevState
})
```

## DataStoreComponent

To make your `dataStore` useful, you need to pass it to an instance of `DataStoreComponent`. This is just a custom version of Composi's `Component` class witout state. It's configured to use a `dataStore` instead of state. It watches the `dataStore`. When you update the `dataStore`, it dispatches and event that `DataStoreComponent` listens for. When that happens, the component updates with the data that was sent.

To create a new `DataStoreComponent` you need to extend it, just like you would with the `Component` class:

```javascript
import { h } from 'composi'
import { DataStore, DataStoreComponent } from 'composi/data-store'

// Define a dataStore:
const dataStore = new DataStore({
  state: {
    title: 'The Current Title',
    items: [
      'Apples',
      'Oranges',
      'Bananas'
    ]
  }
})

// Define a custom component:
class List extends DataStoreComponent {
  render(data) {
    return (
      <ul class='list'>
        {
          data.items.map(item => <li>{item}</li>)
        }
      </ul>
    )
  }
}
```

With the custom component defined, we can instatiate it. When doing so, we need to give provide container to render in and pass in the `dataStore`:

```javascript
const list = new List(
  container: 'section',
  dataStore
)
```

And that's it. The component is now linked to the `dataStore`. If we change the `dataStore's` state, the component will udpate automatically. We would do that using `setState` on the `dataStore`, as we did above.

Because the component has no local state, as it currently stands the component hasn't mount. As it is, it won't mount until the `dataStore` gets updated. In order to mount the component the first time, we need to invoke its `update` method and pass in the `dataStore` state:

```javascript
list.update(dataStore.state)
```
This will mount the component for us.

## Example

Here's a complete example using `DataStore` and `DataStoreComponent`. In this example we separate out the code that updates the `dataStore` into an `actions` object. The component's user interactions will invoke those `actions` methods, which will result in the component itself being updated.

```javascript
import { h } from 'composi'
import { DataStore, DataStoreComponent } from 'composi/data-store'

// Define the dataStore:
const dataStore = new DataStore({
  state: {
    message: 'Bozo the clown',
    items: [
      {
        id: 101,
        value: 'Apples'
      },
      {
        id: 102,
        value: 'Oranges'
      }
    ]
  }
})

// Define actions to manipulate the dataStore:
const actions = {
  addItem(dataStore, data) {
    dataStore.setState(prevState => {
      prevState.items.push({
        id: data.id,
        value: data.value
      })
      return prevState
    })
  },
  deleteItem(dataStore, id) {
    dataStore.setState(prevState => {
      prevState.items = prevState.items.filter(item => item.id != id)
      return prevState
    })
  }
}

// Create a custom component by extending DataStoreComponent:
class List extends DataStoreComponent {
  key = 103
  render(data) {
    return (
      <div class='list-container'>
        <h2>{data.message}</h2>
        <p>
          <input type="text"/>
          <button className="add-item" onclick={() => this.addItem()}>Add</button>
        </p>
        <ul>
          {
            data.items.map(item => (
              <li key={item.id}>
                <span>{item.value}</span>
                <button className="delete-item" onclick={() => this.deleteItem(item.id)}>X</button>
              </li>)
            )
          }
        </ul>
      </div> 
    )
  }
  componentDidMount() {
    this.input = this.element.querySelector('input')
    this.input.focus()
  }
  addItem() {
    const value = this.input.value
    if (value) {
      actions.addItem(this.dataStore, {id: this.key++, value})
      this.input.value = ''
      this.input.focus()
    } else {
      alert('Please provide a value before submitting.')
    }
  }
  deleteItem(id) {
    actions.deleteItem(this.dataStore, id)
  }
}

// Create an instance of the custom component.
// Assign it a container and pass in the dataStore:
const list = new List({
  container: 'section',
  dataStore
})

// Don't forget to pass the dataStore to the list instance through the update method.
// You need to do this to forceß the component to mount the first time..
list.update(dataStore.state)
```

## Observer

`DataStore` exposes the `Observer` class that it uses internally so you can use it in your projects. `Observer` exposes two methods: `watch` and `dispatch`. You can use these to create an event bus to decouple your code. Like `DataStore`, you import `Observer` from Composi's `data-store` folder:

```javascript
import { Observer } from 'composi/data-store'
```

To you `Observer` you need to create a new instance first:

```javascript
import { Observer } from 'composi/data-store'

const observer = new Observer()
```

### Watch Method

Then you can create a watcher to listen for an event. You also need to provide a callback to execute when the event is dispatched. The callback will get passed the data as its argument:

```javascript
// Setting up a simple data.
// We're not really doing anything with the data.
// Just outputting it to show that it arrived.
observer.watch('boring', function(data) {
  console.log(`The boring event fired. Here's the data:`)
  console.log(data)
})
```

### Dispatch Method

Then we can dispatch our event with some data:

```javascript
observer.dispatch('boring', 'This is the new data.')
```

You can pass whatever kind of data you need to: boolean, number, string, array or object.

## uuid

The DataStore class uses the `uuid` function to create an RFC4122 version 4 compliant uuid. This is a random string of 36 characters. This is used internally by DataStore. You can also import `uuid` into your project to create a uuid for your own code.

```javascript
import { uuid } from 'composi/data-store

const id = uuid()
```
