Composi
=======

Contents
--------
- [Components](./components.md)
- [Hyperx](./hyperx.md)
- [Hyperscript](./hyperscript.md)
- [injectElement](./injectElement.md)
- [State](./state.md)
- [Lifecycle Methods](./lifecycle.md)
- [Events](./events.md)
- [Styles](./styles.md)
- [Unmount](./unmount.md)
- [Pubsub](./pubsub.md)
- [Uuid](./uuid.md)
- [Installation](../README.md)

JSX
----

JSX provides a consice and convenient way to defining markup to be created. Often people erroneously call JSX HTML. It is not HTML. It is in fact a type of XML. When you build your project, Babel takes the JSX code and converts it into hyperscript functions. In the case of a Composi project, it is set up to tell Babel to use Composi's hyperscript function for that transformation in the project's [`.babelrc`](https://babeljs.io/docs/usage/babelrc/) file.


XML
---

Since JSX is a type of XML, tags need to follow XML rules. This means that all tags must be closed. In HTML 5 you can have self-closing tags, such as img, br, hr, input, etc.

```html
<img src='kitten.png'>
<br>
<hr>
<input type='text' value='Cute Kitten'>
```

To use the above tags in JSX, they would need to be closed with a forward slash:

```html
<img src='kitten.png' />
<br />
<hr />
<input type='text' value='Cute Kitten' />
```

Although some "purists" complain that JSX is mixing HTML into JavaScript, this is not completely true. JSX is just a DSL that describes the JavaScript functions that will be create to produce the elements. It is in fact very similar to a now abandoned effort to enable using XML in JavaScript called [E4X](https://developer.mozilla.org/en-US/docs/Archive/Web/E4X). 
If you read the E4X documentation, you will recognize the similarities to JSX. E4X was an attempt by Mozilla to enable the creation of DOM nodes without using string concatenation. Unfortunately E4X never took off. The introduction of template literals and tagged template literals solved some of the problems E4X was trying to address. However, the shortcoming of template literals is the the markup is defined as strings. This means IDEs cannot understand the markup in a template literal. JSX does not have this limitation. As such text editors and IDEs provide great tooling to make using JSX productive.

Tag Attributes
--------------

Unlike using JSX with React, Composi does not require that you use `className` instead of `class`. The following JSX would be invalid for React, but is the stardard for Composi:

```javascript
// Use class attribute as normal:
function header(data) {
  return (
    <header>
      <h1 class='title'>{data.title}</h1>
      <h2 class='subtitle'>{data.subtitle}</h2>
    </header>
  )
}
```

### Partial Attributes

JSX does not support partial attribute values. The following code will not work:

```javascript
function userList(users) {
  return (
    <ul>
       {
         users.map(user => <li class='currently-{user.employed ? "employed" : "unemployed"}'>{user.name}</li>)
       }
    </ul>
  )
}
```

The JSX for the class value will generate an error. Instead you need to make the entire attribute value an evaluation. To do this, get replace the attribute value quotes with curly braces. Then use a template literal to output the results:

```javascript
function userList(users) {
  return (
    <ul>
       {
         users.map(user => <li class={`currently-${user.employed ? "employed" : "unemployed"}`}>{user.name}</li>)
       }
    </ul>
  )
}
```

**Note** When evaluatig attribute values, never use quotes around the evaluation as this will prevent the evaluation from happening. Just use curly braces.

Custom Tags
------------

Although JSX makes it easy to create standard HTML elements, it also allows you to create custom tags. These are not the same as [custom element](). There may be a few, higher level similarities between these two. But fundamentaly they are for different purposes. 

A custom tag is really just a function that returns some JSX. When you want to use it in other JSX, you do so as a tag. Functions for custom tags must start with an uppercase letter, with no exception. When your JSX consists of many different parts, it makes sense to break it down into modular pieces. 

Suppose we have a component with a render function like this:

```javascript
const fruitsList = new Component({
  root: '#fruit-list',
  state: fruits,
  render: (fruits) => (
    <ul class='list'>
      {
        fruits.map(fruit =>
          <li>
            <div>
              <h3>{fruit.title}</h3>
              <h4>{fruit.subtitle}</h4>
            </div>
            <aside>
              <span class='disclosure'></span>
            </aside>
          </li> 
        )
      }
    </ul>
  )
})
```

Custom Tags with Spread Operator
--------------------------------

Looking at the above markup, we could break it up a bit to make it easier to read and reuse. To do this we'll define two functions to return markup. As mentioned earlier functions for custom tags must start with an uppercase letter. Also, in order to pass in the data, we need to encose the data parameter in curly braces. This is how props are passed to tags in JSX. When we actually use a custom tag, we need to use another convention with curly braces: double braces and a spread operator for destructuring assignment. This will pass each property of the object to the JSX function so that they can be accessed. It looks like this:

```javascript
  const data = {
    prop1: 'Whatever',
    prop2: 'More of the Same'
  }
  // Pass object with destructing to tag:
  <MyTag {...{data}} />
```

Remember that custom tags need to be closed with a forward slash at the end.

Below is how we can break our JSX into custom tags:

```jsx
function ListItem({fruit}) => (
  <div>
    <h3>{fruit.title}</h3>
    <h4>{fruit.subtitle}</h4>
  </div>
)

// No need for props here,
// we're just returning markup:
function Disclosure() => (
  <aside>
    <span class='disclosure'></span>
  </aside>
)

//Now that we have some custom tags, we can use them as follows:

const fruitsList = new Component({
  root: '#fruit-list',
  state: fruits,
  // Use spread operator on ListItem:
  render: (fruits) => (
    <ul class='list'>
      {
        fruits.map(fruit => (
          <li>
            <ListItem {...{fruit} />
            <Disclosure />
          </li> 
        )
      }
    </ul>
  )
})
```

This results in cleaner code that is easier to read and maintain.

One Tag to Rule Them All
------------------------
Because of the way JSX works, there must always be one enclosing tag for all the other tags you wish to create. You cannot return a groups of siblings. They need to be contained in another tag. For example, suppose you wanted to create some list items to insert in a list:

```javascript
const badJSX = new Component({
  root: '#list',
  render: () => (
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
  )
})
```

The above code will not build. Instead you need to create the entire list like this and insert it in some higher element as the root:

```javascript
const goodJSX = new Component({
  root: '#listDiv',
  render: () => (
    <ul>
      <li>One</li>
      <li>Two</li>
      <li>Three</li>
    </ul>
  )
})
```

Components with Same Root
-------------------------

Components do not have to have unique root elements. Multiple components can be rendered in the same root element. Their order in the DOM will be dependent on their order in code.
