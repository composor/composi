Composi
=======

Contents
--------
- [Components](./components.md)
- [JSX](./jsx.md)
- [Hyperx](./hyperx.md)
- [Hyperscript](./hyperscript.md)
- [Mount and Render](./render.md)
- [State](./state.md)
- [Lifecycle Methods](./lifecycle.md)
- [Events](./events.md)
- [Styles](./styles.md)
- Unmount
- [Installation](../README.md)
- [Third Party Libraries](./third-party.md)
- [Functional Components](./functional-components.md)
- [Deployment](./deployment.md)

Unmount
-------

Components have an `unmount` method. This allows you to destroy a component instance. This does several things. 

1. If the component has a `componentWillUnmount` method, it fires this first. Please note that `componentWillUnmount` will be asynchronous. It could take longer to execute than the actual unmounting of the component.
2. It deletes the component from the DOM. It does this based on the base element you used to define your component. This is the same node prepresented by the component's `this.element` value.
3. It nulls out the properties of the component instance for garbage collection.

As you may have noticed, there is nothing here to remove any events. Inline events don't need to be removed. They're just properties, afterall. If you've used the `handleEvent` interface, then you'll need to remove the event yourself. You'll need to do this before unmounting the component. Since we use a component's `element` property to bind events, this is easy. Just execute `removeEventListener` on it and pass in the `handleEvent` object.

Removing Event from Component Instance
--------------------------------------

```javascript
import {h, Component} from 'composi'

export const list = new Component({
  container: 'section',
  render: (fruits) => (
    <ul>
      {
        fruits.map(fruit => <li>{fruit}</li>)
      }
    </ul>
  ),
  // Pass in component instance so we can bind event listener:
  componentWasCreated() {
    list.element.addEventListener('click', eventObj)
  }
})

// Define eventHandler object:
const eventObj = {
  handleEvent(e) {
    eventObj.announceItem(e)
  },
  announceItem(e) {
    alert(e.target.textContent)
  }
}

```

To remove the above event before unmounting, we would need to do this:

```javascript
// Remove event from component, passing in handleEvent object:
list.element.removeEventListener('click', eventObj)

// Then we can unmount the component:
list.unmount()
```


Removing Event from Extended Component
--------------------------------------

```javascript
import {h, Component} from 'composi'

export class List extends Component {
  constructor(props) {
    super(props)
    this.container = 'section'
  }
  handleEvent(e) {
    if (e.target.nodeName === 'LI') {
      alert(e.target.textContent.trim())
    } else if (e.target.id === 'add-item') {
      this.componentShouldUpdate = true
      const input = this.element.querySelector('input')
      const value = input.value
      if (value) {
        let state = this.state
        state.unshift({id: String(uuid()), name: value, checked: false})
        this.state = state
        input.value = ''
      }
    } else if (e.target.type === 'checkbox') {
      this.componentShouldUpdate = false
      const id = e.target.closest('li').dataset.id
      let state = this.state
      const index = state.findIndex(item => id === item.id)
      console.log(`The index is: ${index}`)
      state[index].checked = !state[index].checked
      this.state = state
    /**
     * Remove all events from this component and unmount it!
     */
    } else if (e.target.id === 'unmount') {
      // Unbind event by passing in "this" as reference:
      this.element.removeEventListener('click', this)
      // Unmount the component:
      this.unmount()
    }
  }
  componentWasCreated() {
    this.element.addEventListener('click', this)
  }
  render(data) {
    return (
      <div>
        <p><button id='unmount'>Unmount Component</button></p>
        <p>
          <input type="text"/>
          <button id='add-item'>Add Item</button>
        </p>
        <ul class='list'>
          {
            data.map(item => <li key={item.id} data-id={item.id}><input type="checkbox" checked={item.checked}/> {item.name}</li>)
          }
        </ul>
      </div>
    )
  }
}
```

In the above example, we really only have one event registered that we are using for all the interactions on this component. This is called event delegation. The `handleEvent` interface makes this easy. Unbinding this event is also easy. Notice in the code slice from the above example how we execute the `removeEventListener` method on the component's `element` property. Then we pass in the 'click' event type. For a reference to the `handleEvent` interface we just pass in `this`. When we set up the event, we did the same. 
```javascript
// Setup event:
this.element.addEventListener('click', this)

// Remove event:
this.element.removeEventListener('click', this)
```
After removing the event, we can unmount it:

```javascript
this.unmount()
```

Using the `handleEvent` interface when extending the Component class gives us more power and easier to manage events, both adding and removing. Read the documentation for [events](events.md) for more details.