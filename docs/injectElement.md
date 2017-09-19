Composi
=======

Contents
--------
- [Components](./components.md)
- [JSX](./jsx.md)
- [Hyperx](./hyperx.md)
- [Hyperscript](./hyperscript.md)
- [State](./state.md)
- [Lifecycle Methods](./lifecycle.md)
- [Events](./events.md)
- [Styles](./styles.md)
- [Unmount](./unmount.md)
- [Pubsub](./pubsub.md)
- [Uuid](./uuid.md)
- [Installation](../README.md)

injectElement
-------------

Components provide a powerful and convenient way for you to create modular chunks of the UI. However, sometimes they are overkill. If you just need to output a chunk of static markup, a component is not necessary. Instead you can simply define a function that returns the markup. Once you've create a function to do that, you can render it into the document with the `injectElement` function. To use it, you will need to import it into your code:

```javascript
import {h, Component, injectElement} from 'composi'

```

`injectElement` can take upto three paraemeters:

1. tag - the element to create and insert into the DOM
2. root - the element in the DOM in which to insert the new element
3. replace - a boolean that if true, replaces the current content of the root with this element

The first and second parameters are required. The third is optional. If you pass in a truthy third parameter, the contents of the root element will be replaced with the new element. Otherwise by default `injectElement` appends the new element to the root element.

Define a Function to Return Markup
----------------------------------

```javascript
import {h, injectElement} from 'composi'

// Define function that returns JSX:
function createList(data) {
  return (
    <ul>
      {
        data.map(item => <li>{item}</li>)
      }
    </ul>
  )
}

// Create list:
const list = createList(fruits)

// Insert the list in the document body:
injectElement(list, 'body')
```

We could use the `createList` function to make several lists:

```javascript
// Creat lists
const fruitLiist = createList(fruits)
const petList = createList(pets)
const toolList = createList(tools)

// Append them to document body:
injectElement(fruitLiist, 'body')
injectElement(petList, 'body')
injectElement(toolList, 'body')
```

Replacing Static Elements
------------------------
Because these are not derived from the Component class, they have no virtual dom. This means there is no way to do an incremental update. If you need to update these lists with a data change, you need to recreate the entire list and append it. Remember that by default `injectElement` always append the element to the root. So to replace some existing element with a new version, you'll need to provide a third truth parameter. The code sample below shows how to do this:

```javascript
// Creat lists
let fruitLiist = createList(fruits)
let petList = createList(pets)
let toolList = createList(tools)

// Append them to document body:
injectElement(fruitLiist, 'body')
injectElement(petList, 'body')
injectElement(toolList, 'body')

// Later we need to update these lists:
fruitLiist = createList(newFruits)
petList = createList(newPets)
toolList = createList(newTools)

// Append them to document body:
// Replace all items in body with the first list:
injectElement(fruitLiist, 'body', true)
// Then append the other new lists:
injectElement(petList, 'body')
injectElement(toolList, 'body')
```

Although this works as expected, it's a lot of fidgeting to accomplish what components do so gracefully. `injectElement` is best reserved for state content that will never require updating, otherwise use components.

Summary
-------

`injectElement` is similar to [`ReactDOM.render`](https://facebook.github.io/react/docs/react-dom.html#render), if you have used that before. It has its use in very limited circumstances. Otherwise, components offer more functionality and versitility.