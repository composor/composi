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
- [Lifecycle Methods](./lifecycle.md)
- [Events](./events.md)
- [Styles](./styles.md)
- [Unmount](./unmount.md)
- [Uuid](./uuid.md)
- [Installation](../README.md)

Pubsub
------

Composi provides three functions to enable pubsub: subscribe, dispatch and unsubscribe. You can use these to loosely couple disparate parts of your app. You can use these to set a communication line between two components so that an interaction or state change on one can be communicated to the other. Pubsub uses topics to indicate what you want to subscribe to. The topic will be used to dispatch to a subscriber. You use the topic to unsubscribe from it.

subscribe(topic, callback)
---------------------------
To create a subscriber you use the `subscribe` method. This takes to arguments. The topic you wish to listen for and a callback to execute when that top is dispatched. The first argument of the callback will be any data passed with the dispatch. See `dispatch` below for information about how dispatcher work.

```javascript
// A subscriber without data:
subscribe('whatever', () => alert('We just received a message from Whatever!'))

// A subscriber with data:
subscribe('inbound-stuff', (data) => alert(`We just received this: ${data}`))
```

The data that a subscriber receives can be a primitive type: string, number, boolean, or a complex type: object or array. You can use a subscriber and dispatch to capture data from one part of your app and update the state of a component in the callback:

```javascript
// Update a users component with a new user:
subscribe('new-user', (user) => usersComponent.setState(user))

// Somewhere else you could then do this:
dispatch('new-user', {firstName: 'Joe', lastName: 'Bodoni', age: 21, id: 'd417b3c83dac4b'})
```

You can have multiple subscribers for the same topic.

```javascript
// Update a users component with a new user:
subscribe('new-user', (user) => usersComponent.setState(user))

// Welcome the new user:
subscribe('new-user', (user) => welcomeComponent.setState(user))

// Post new user to remote database:
subscribe('new-user', (user) => {
  // post user object to remote database
})

// The following dispatch will trigger all three of the above subscribers:
dispatch('new-user', {firstName: 'Joe', lastName: 'Bodoni', age: 21, id: 'd417b3c83dac4b'})
```


dispatch(topic, ?data)
-----------------------
The dispatch function takes at least one argument, with an options second. The main argument is the topic you want to dispatch to:

```javascript
dispatch('whatever')
```

Any subscribers listening for the topic "whatever" will execute when this is dispatched. It is also possible to pass some data as the second optional argument of a dispatch. The data can be of any type:

```javascript
dispatch('message', 'Hello World!')
dispatch('current-price', 10.25)
dispatch('employed', true)
dispatch('new-user', {firstName: 'Joe', lastName: 'Bodoni', age: 21, id: 'd417b3c83dac4b'})
dispatch('fruits', ['Apples','Orange', 'Bananas'])
```

Since a dispatch may or may not contain data and the data can be of any type, it is best to use guards before trying to use the data:

```javascript
subscribe('message', (message) => {
  if (typeof message === string) {
    messageComponent.setState(message)
  }
})
```

unsubscribe(topic, ?callback)
----------------------------

If you need to, you can unsubscribe from a topic. Just provide the topic you wish to unsubscribe. Remember that since multiple subscribers can be listening to the same topic, unsubscribing it will render them all ineffective.

If you want to unsubscribe a specific subscriber, you can use a secondary callback. This callback gets the `subscriptions` object, which contains all topics and their callbacks. You can loop over this and test for something unique to the callback you wish to eliminate. The best way to do this is to give the subscriber callback a unique id that you can test for:

```javascript
subscribe('message', (message) => {
  const id = 'd417b3c83dac4b'
  if (typeof message === string) {
    messageComponent.setState(message)
  }
})
```
Since the above callback has an id, we can test for it when unsubscribing:

```javascript
unsubscribe('do-something', (subscriptions) => {
  var idx
  // Loop through all subscribers of 'do-something'.
  // Then get the index of the one with the id of 'd417b3c83dac4b'.
  subscriptions['do-something'].forEach((cb, i) => {
    if (/d417b3c83dac4b/.test(cb.toString())) {
      idx = i
      return
    }
  })
  // Delete the matched callback by splicing the topic array:
  subscriptions['do-something'].splice(idx, 1)
})
```
