# Component-DataStore

This contains three classes: DataStore, DataStoreComponent and Observer. These enable creating Composi class components using a `dataStore` for state management. When the `dataStore` is modified, it automatically updates the component.


## Installation

To install, run the following:

```
npm i --save composi-datastore
```

Then import DataStore and DataStoreComponent into your app:

```javascript
import { h, Component } from 'composi'
import { DataStore, DataStoreComponent } from 'composi-datastore'
```

## Create a `dataStore`

With these imported, you can now create a `dataStore`. You do this by passing an object with a state property which defines the data you want the `dataStore` to manage.

```javascript
const dataStore = new DataStore({
  state: {
    message: 'This is a simple dataStore',
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
```

## Define an `actions` Object

Next we can create an `actions` object that our component will use. Actions will be methods that operate on the `dataStore`. Notice that we are passing the `dataStore` as the first argument of each method. This is so we can use its `setState` method to update the data and trigger a re-render of the component. The second arguemnt is any data we need for whatever data manipulation we need to do:

```javascript
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
```

## Extend DataStoreComopnent Class

And finally we need to create a component using the `DataStoreComponent` class. We do this just like we would with `Component`, by extending it. `DataStoreComponent` is an extension of `Component`, so the same lifecyle hooks and `render` function are available. Notice how we use the `dataStore` in the two methods that update state.

```javascript
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
      // Use the actions method to udpate the dataStore:
      actions.addItem(this.dataStore, {id: this.key++, value})
      this.input.value = ''
      this.input.focus()
    } else {
      alert('Please provide a value before submitting.')
    }
  }
  deleteItem(id) {
    // Use the actions method to udpate the dataStore:
    actions.deleteItem(this.dataStore, id)
  }
}
```

## Instantiate the Component

Now that we have a custom component derived from `DataStoreComponent`, we can create an instance. Like a normal Component instance, we pass it an object literal with several properties. The first is the container to render the component in. The second is the `dataStore` to use.

After create the instance with the `new` keyword, we need to invoke the `update` method on it, passing in the `dataStore` state. This is because, unlike stateful components, components derived from `DataStoreComponent` don't have state. Their state is being handle by the `dataStore`. So, to trigger the first render, you need to pass the `dataStore` to the component through the `update` method. After that, any updates to the `dataStore` will trigger a re-render of the component.

```javascript
const list = new List({
  container: 'section',
  dataStore
})

list.update(dataStore.state)
```

### Default DataStore Event
`DataStore` uses `dataStoreStateChanged` as the default event in conjunction with `DataStoreComponent`. So DO NOT USE this for your own watchers. It will render your `DataStoreComponent` incapable of update when the dataStore changes.

## Observer 

This is a simple observer class with just two methods: `watch` and `dispatch`. Can't get any simpler than that. To use it, import it into your project:

```javascript
import { Observer } from 'composi-datastore'
```

After that you can create a new instance of `Observer`:

```javascript
const observer = new Observer()
```

After creating a new observer, you can set up watchers and when appropriate dispatch to them. You tell the observer to watch events and give them a callback to execute when the event happens. Dispatch announces the event and optionally passes some data along with it. Note, you don't need to send data. An watcher can just be waiting for an event to happen.

```javascript
import { Observer } from 'composi-datastore'

const observer = new Observer()

function callback(data) {
  console.log(`This is the event: ${data}`)
}

observer.watch('test', callback)

// Sometime later:
observer.dispatch('test', 'Sending a message to the observer.')
```

### Events

The observer stores its events on its `events` property. If we took the `observer` from the above example, we could examine its events like this:

```javascript
console.log(oberser.events)
/**
  returns: {test: [
  function (t){console.log("This is the event: "+t)}
]}
*/
```

### TODO

Implement Jest tests for `DataStoreComponent`. Since this has a dependency on a Node module (composi), I haven't been able to create a test that works. Seems Jest has problems dealing with ES6 `import/export` with Babel. Have tried all kinds of configs, but Jest fails to import Composi module.