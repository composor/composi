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
- [Pubsub](./pubsub.md)
- [Installation](../README.md)

uuid
----

You might be surprised to see that Composi has a special function to create `uuids`. I cannot tell you how frustrating it is use big, complex frameworks that use a dumb trick for `uuids` by add 1 to a global variable. So Composi gives you a real `uuid` function that returns a `uuid` of 32 hexidecimal digits as a string. This allows you to create two types of `uuids`: with and without hyphens. Passing in a truthy value will return a `uuid` with hyphens, otherwise you'll get a `uuid` without hyphens. You choice. 

`uuid()` returns uuids in the following format:

```
"d417b3c83dac4b2c849c24fc32acdafc"

// With hyphens:
"6d5d42a1-cb98-43a0-2e68-e9c1c9e953ce"
```


You can use  `uuid` whenever you need a unique id/key for data or markup.

```javascript
const key = uuid() // returns something like: "51f03805250b4a748fcc667ddb0802db"

// Create uuid with hyphens:
const key = uuid(true) // returns something like: "985eafb4-386c-4b03-f7a1-9d75da6ee812"
```

The `uuid` function uses `Date.now()` and `performance.now()` to create the seed for randomization. This reduces the likelihood of a collision to one in a million. So, as long as you don't try to create a list with over a million items, you should be fine.