Composi
=======

Contents
--------
- [Components](./components.md)
- [JSX](./jsx.md)
- [Hyperx](./hyperx.md)
- Hyperscript
- [Mount and Render](./render.md)
- [State](./state.md)
- [Lifecycle Methods](./lifecycle.md)
- [Events](./events.md)
- [Styles](./styles.md)
- [Unmount](./unmount.md)
- [Installation](../README.md)
- [Third Party Libraries](./third-party.md)
- [Functional Components](./functional-components.md)
- [Deployment](./deployment.md)

hyperscript - h
---------------

Although most people are fine using JSX, some people hate it and would rather use anything else. Hyperscript is an alternate way of defining markup. In fact, when you build your project, Babel converts all JSX into hyperscript. Composi provides the `h` function to enable hyperscript compatible usage.

`h` expects three arguments:

1. tag name
2. propertes/attributes
3. children

Tag Name
--------

The first argument is a tag name. This is a lowercase HTML tag.
```javascript
const h1 = h('h1')
const div = h('div')
const p = h('p')
const ul = h('ul')
````

Properties/Attribues
--------------------

Often you want to be able to give an element a property or attribute. We're talking about `class`, `id`, `checked`, `disabled`, etc. You can add properties and attributes by providing a second argument. This will be a key/value pair wrapped in curly braces:

```javascript
const h1 = h('h1', {class: 'title'})
const button = h('button', {disabled: true})
```

When an element has no properties, you can use empty curly braces or `null`:

```javascript
const h1 = h('h1', {})
const button = h('button', null)
```

Children
--------

The final argument allows you to define children for an element. There are two kinds of children: a text node, or other HTML elements. Providing text as an element's child is easy, just use a quoted string:

```javascript
const h1 = h('h1', {class: 'title'}, 'This is the Title!')
```

To indicate that an element has child elements, use brackets with hyperscript defining those elements. Examine these two examples carefully:

```javascript
const header = h('header', {}, [
  h('h1', {}, 'This is the Title!'),
  h('h2', {}, 'This is the Subtitle!')
])

const list = h('ul', {class: 'list'}, [
  h('li', {}, 'Apples'),
  h('li', {}, 'Oranges'),
  h('li', {}, 'Bananas')
])
```

If you need to create an element's children dynamically based on a set of data, you can use JavaScript for that. Notice how we use a template literal to output the object values:

```javascript
const fruits = {
  {
    name: 'Apple',
    price: '.50'
  },
  {
    name: 'Orange',
    price: '.75'
  },
  {
    name: 'Banana',
    price: '.30'
  }
}

// ES5 version:
const list = h('ul', {class: 'list'}, [
  fruits.map(function(fruit) {
    return h('li', {}, `${fruit.name}: $${fruit.price}`)
  })
])

// ES6 version:
const list = h('ul', {class: 'list'}, [
  fruits.map(fruit => h('li', {}, `${fruit.name}: $${fruit.price}`))
])
```

Summary
-------

The hyperscript function `h` lets you define markup with JavaScript functions. If you do not like the look and feel of JSX, this is a good alternative. This `h` function is similar to [React.createElement](https://facebook.github.io/react/docs/react-api.html#createelement)