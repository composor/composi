Composi
=======

Contents
--------
- [Components](./components.md)
- [JSX](./jsx.md)
- [Hyperx](./hyperx.md)
- [Hyperscript](./hyperscript.md)
- [Mount and Render](./render.md)
- CreateElement
- [State](./state.md)
- [Lifecycle Methods](./lifecycle.md)
- [Events](./events.md)
- [Styles](./styles.md)
- [Unmount](./unmount.md)
- [Installation](../README.md)
- [Third Party Libraries](./third-party.md)
- [Functional Components](./functional-components.md)
- [Deployment](./deployment.md)

createElement
-------------

It is possible that on a rare occasion you might want to be able to create some DOM nodes to insert into the DOM as a one-time event. `createElement` helps you do that. The method takes as its argument a virtual node and returns a DOM node. It will also create any children that the virtual node might have. After creating the node, you can insert it in the DOM using any standard DOM methods, such as `Element.appendChild(node)`.

`createElement` can except a JSX tag, or the result of an `h` function. To use it, you first need to import it into your project:

```javascript
import {h, createElement} from 'composi'
```

After importing it, you can use it to create nodes. Notice how we use it to create nodes and then append them to the document body:

```javascript
import {h, createElement} from 'composi'

function Title({data}) {
  return (
    &lt;nav>
      &lt;h1>{data}&lt;/h1>
    &lt;/nav>
  )
}

const title = createElement(&lt;Title data='Hello World!'/>)
document.body.appendChild(title)

// Or:
function Title(data) {
  return h('nav', {}, [
    h('h1', {}, data)
  ])
}
const title = createElement(Title('Hello World!'))
document.body.appendChild(title)
```

Remember, if you think that at some point you may need to update the content that this function creates, then you should instead be using the `render` function or a simple component with the `new` keyword. 

`createElement` is for when you need to dynamically create some DOM nodes once during a browser session.