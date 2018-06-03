Composi
=======

Contents
--------
- [Installation](../README.md)
- [JSX](./jsx.md)
- [Hyperx](./hyperx.md)
- [Hyperscript](./hyperscript.md)
- [Functional Components](./functional-components.md)
- [Mount and Render](./render.md)
- [Components](./components.md)
- [State](./state.md)
- [Lifecycle Methods](./lifecycle.md)
- [Events](./events.md)
- [Styles](./styles.md)
- [Unmount](./unmount.md)
- [Third Party Libraries](./third-party.md)
- [Deployment](./deployment.md)
- Differences with React

Differences Between Composi and React
-------------------------------------

Although Composi and React share many API features, there are substantial differences. The following tables show what they share and how they differ.

**API**

| Composi            | React                       |
|--------------------|-----------------------------|
| h                  | React.createElement         |
| mount              | ReactDOM.hydrate            |
| render             | ReactDOM.render             |
| Component          | React.Component             |
| Component.render   | React.Component.render      |
| Component.state    | React.Component.state       |
| Component.setState | React.Component.setState    |
| Component.update   | React.Component.forceUpdate |
| Component.unmount  | N/A                         |
| Fragment           | React.Fragment              |

Composi uses `mount` to render a functional component the first time. This returns a reference to the component tree. You can pass that reference to the `render` function in order to update that functional component efficiently. Only that tree will be updated. 

`mount` is also used to hydrate server-side rendered DOM with functional components, similar to `ReactDOM.hydrate`. Just pass a DOM reference for the structure to hydrate as the third argument to `mount`:

```javascript
// Hydrate H1 inside header tag:
mount(<Title message='Amazing Title'/> 'header', 'h1')
```
Use `render` to update an already mounted functional component:

```javascript
const title = mount(<Title message='Boring!'/>, 'header')
// Sometime later update the title.
// Pass in the 'title' variable from above:
render(<Title message='An Amazing Title!!!'/>, title)
```

**Properties**

| Composi                          | React                                        |
|----------------------------------|----------------------------------------------|
| class                            | className                                    |
| inline events                    | inline events (synthesized)                  |
| onclick                          | onClick                                      |
| oninput                          | onUpdate                                     |
| for                              | htmlFor                                      |
| xlink-href                       | xlinkHref                                    |
| dangerouslySetInnerHTML (string) | dangerouslySetInnerHTML (callback)           |
| style (accepts object or standard inline string value) | style (accepts object) |

Inline events are just inline events, same as they've always been since DOM Level 0. Composi uses standard HTML attributes. No need for camel case or non-standard terms. For SVG icons you can use `xlink-href`. `dangerouslySetInnerHTML` accepts a string as its value. No need for a complicated function like with React. `style` can take a JavaScript object literal of key value pairs, or you can use a string as you normally would with HTML. React and friends only accept an object.

For handling `innerHTML`, Composi uses `dangerouslySetInnerHTML`. Unlike React, which requires a callback, you just pass a string for the content to insert:

```javascript
function Title() {
  return (
    <h1>Original Content</h1>
  )
}
const title = mount(<Title/>, 'header')
// Later update the title:
render(<Title dangerouslySetInnerHTML='The New Title!'/>, title)
```

**Lifecycle Hooks for Class Comopnents**

| Composi                   | React                                                      |
|---------------------------|------------------------------------------------------------|
| componentWillMount        | componentWillMount/UNSAFE_componentWillMount               |
| componentDidMount         | comopnentDidMount                                          |
| componentWillUpdate       | componentWillUpdate/UNSAFE_componentWillUpdate             |
| componentDidUpdate        | componentDidUpdate                                         |
| componentWillUnmount      | componentWillUnmount/UNSAFE_componentWillUnmount           |
| N/A                       | componentWillReceiveProps/UNSAFE_componentWillReceiveProps |
| N/A                       | getDerivedStateFromProps                                   |
| componentShouldUpdate (attribute) | componentShouldUpdate (callback)                   |

**Lifecycle Events for Functional Components**

| Composi                      | React                |
|------------------------------|----------------------|
| onComponentDidMount          | N/A                  |
| componentDidUpdate           | N/A                  |
| onComponentWillUnmount       | N/A                  |

Inline events are standard inline events. They do not get sythesized like React.

`componentShouldUpdate` is an attribute that accepts a boolean value. By default it is true. Setting this property to false will prevent it from updating, event when its state changes. After making state changes, you can flag the component to update again by setting this property to true. The next update will show the changes.

```javascript
class Title extends Component {
  render(data) {
    return (
      <h1>{data}</h1>
    )
  }
}
// Create instance.
// Because it has no state, it does not yet render.
const title = new Title({
  state: 'A Great Title',
  container: 'header'
})
title.componentShouldUpdate = false

// Sometime later you want to change the title.
// Because 'componentShouldUpdate' was set to false, nothing will happen.
title.setState('A Brand New Title!')

// To update the component, set 'componentShouldUpdate' to true, 
// then run 'update' on the component instance:
title.componentShouldUpdate = true
title.update()
```

**createRef/Ref**

| Composi                                                      | React           |
|--------------------------------------------------------------|-----------------|
| N/A (use this.element with  componentDidMount to access DOM) | React.createRef |
| N/A (same as above)                                          | ref             |

Composi does not have `createRef` like React, and so it does not support the `ref` property on elements. But you don't need it. Instead you can take advantage of a component's `element` property in the `componentDidUpdate` lifecycle hook to access elements in the DOM:

```javascript
class List extends Component {
  render(data) {
    return (
      <div class='list-container'>
        <p>
          <input type='text'/>
          <button>Add</button>
        </p>
        <ul>
          {
            data.map(item => <li key={item.key}>{item.value}</li>)
          }
        </ul>
      </div>
    )
  }
  componentDidMount() {
    // Notice how we access the component tree here:
    this.element.querySelector('button').addEventListener('click', this)
    this.input = this.element.querySelector('input')
  }
  handleEvent() {
    this.addItem()
  }
  addItem() {
    // Access input that we got in componentDidMount:
    const value = this.input.value
    if (value) {
      this.setState(prevState => {
        prevState.push(value)
        return prevState
      })
    } else {
      alert('Please provide a value before submitting.')
    }
  }
}
```

**Instantiation**

| Composi                                 | React                            |
|-----------------------------------------|----------------------------------|
| mount (for functional components)       | ReactDOM.hydrate/ReactDOM.render |
| new - use to instatiate class component | React.DOM.render  

To render a functional component the first time, use `mount`:

```javascript
function Title({message}) {
  return (
    <nav>
      <h1>{message}</h1>
    </nav>
  )
}
// Mount the custom tag in the header:
const title = mount(<Title message='A Great Title'/>, 'header')
```

To mount a class component, instantiate it with the `new` keyword. If the class component has state, it will render to the DOM automatically when you instantiate it. If it is stateless, you'll need to run `update` on the instance to render it.

```javascript
//Stateful component:
class Title extends Component {
  state = 'A Great Title'
  render(message) {
    return (
      <nav>
        <h1>{message}</h1>
      </nav>
    )
  }
}

// Create instance of component.
// Indicate where to render through container property.
// Because it has state, the component will immediately render to the DOM:
const title = new Title({
  container: 'header'
})

// Or you could provide state while initalizing.
// Here we refactor the above class for that:

//Stateless component:
class Title extends Component {
  render(message) {
    return (
      <nav>
        <h1>{message}</h1>
      </nav>
    )
  }
}

// Create instance of component.
// Provide state for the component to use.
// Indicate where to render through container property.
// Because we provide state here, the component will render immediately.
const title = new Title({
  state: 'A Great Title',
  container: 'header'
})

// We could also define a stateless component and add state after instantiation. This will also cause the stateless component to render immediately. Here we take the previous stateless component to illustrate this:

//Stateless component:
class Title extends Component {
  render(message) {
    return (
      <nav>
        <h1>{message}</h1>
      </nav>
    )
  }
}

// Because this has no state, instantiation will not cause it to render to the DOM yet.
const title = new Title({
  container: 'header'
})

// Provide state to the component instance.
// This will cause it to render immediately.
title.state = 'A Great Title'

// Finally, we can keep the component stateless and use the `update` function to pass data. This will render the component to the DOM using the data we provide.

//Stateless component:
class Title extends Component {
  render(message) {
    return (
      <nav>
        <h1>{message}</h1>
      </nav>
    )
  }
}

// Because this has no state, instantiation will not cause it to render to the DOM yet.
const title = new Title({
  container: 'header'
})

// Pass data to the stateless component, causing it to render immediately.
title.update('A Great Title')
```