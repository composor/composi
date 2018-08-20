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
- Third Party Libraries
- [Deployment](./deployment.md)
- [Differrences with React](./composi-react.md)

Third Party Libraries
---------------------

Composi works fine with third-party libraries. You can use [Material Design Lite](https://getmdl.io), [Bootstrap](http://getbootstrap.com), [jQuery](http://jquery.com), [Redux](http://redux.js.org), [Mobx](https://mobx.js.org), [Lodash](https://lodash.com), [Ramda](http://ramdajs.com). The only thing to be aware of is markup. If you are using JSX, any markup must respect the rule of well-formedness. This means that all HTML self-closing tags will have to be escaped in the render function with a forward slash:

```html
wrong          correct
----------------------
<br>           <br/>
<hr>           <hr/>
<img>          <img/>
<input>        <input/>
<col>          <col/>
<param>        <param/>
<link>         <link/>
<meta>         <meta/>
```
