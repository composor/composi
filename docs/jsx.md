Composi
=======

Contents
--------
- [Installation](../README.md)
- JSX
  - [JSX](#JSX)
  - [XML](#XML)
  - [JSX Attributes](#JSX-Attributes)
  - [Partial Attributes](#Partial-Attributes)
  - [Custom Tags](#Custom-Tags)
  - [Custom Tags with Spread Operator](#Custom-Tags-with-Spread-Operator)
  - [One Tag to Rule Them All](#One-Tag-to-Rule-Them-All)
  - [Fragment Tag](#Fragment-Tag)
  - [Components with Same Container](#Components-with-Same-Container)
  - [Using SVG Sprite Icons](#Using-SVG-Sprite-Icons)
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
- [State Management with DataStore](./data-store.md)
- [Third Party Libraries](./third-party.md)
- [Deployment](./deployment.md)
- [Differrences with React](./composi-react.md)

## JSX

JSX provides a concise and convenient way to define markup to be created. Often people erroneously call JSX HTML. It is not HTML. It is in fact a type of XML. When you build your project, Babel takes the JSX code and converts it into hyperscript functions. In the case of a Composi project, it is set up to tell Babel to use Composi's hyperscript function for that transformation in the project's [.babelrc](https://babeljs.io/docs/usage/babelrc/) file.


## XML

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

Although some "purists" complain that JSX is mixing HTML into JavaScript, this is not completely true. JSX is just a DSL that describes the JavaScript functions that will be created to produce the elements. It is in fact very similar to a now abandoned effort to enable using XML in JavaScript called [E4X](https://developer.mozilla.org/en-US/docs/Archive/Web/E4X). 

If you read the E4X documentation, you will recognize the similarities to JSX. E4X was an attempt by Mozilla to enable the creation of DOM nodes without using string concatenation. Unfortunately E4X never took off. The introduction of template literals and tagged template literals solved some of the problems E4X was trying to address. However, the shortcoming of template literals is that the the markup is defined as strings. This means IDEs cannot understand the markup in a template literal. JSX does not have this limitation. As such text editors and IDEs provide great tooling to make using JSX productive.

## JSX Attributes

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

## Partial Attributes

JSX does not support partial attribute values. The following code will not work:

```javascript
function userList(users) {
  // The partial class defined below will not work:
  return (
    <ul>
      {
        users.map(user => (
          <li class='currently-{user.employed ? "employed" : "unemployed"}'>{user.name}</li>)
        )
      }
    </ul>
  )
}
```

The above JSX for the class value will generate an error. Instead you need to make the entire attribute value an evaluation. To do this, get replace the attribute value quotes with curly braces. Then use a template literal to output the results:

```javascript
function userList(users) {
  // Calculate the entire class value inside curly braces:
  return (
    <ul>
       {
         users.map(user => <li class={`currently-${user.employed ? "employed" : "unemployed"}`}>{user.name}</li>)
       }
    </ul>
  )
}
```

**Note** When evaluating attribute values, never use quotes around the evaluation as this will prevent the evaluation from happening. Just use curly braces.

## Custom Tags

Although JSX makes it easy to create standard HTML elements, it also allows you to create custom tags. These are not the same as [custom element](). There may be a few, higher level similarities between these two. But fundamentaly they are for different purposes. 

A custom tag is really just a function that returns some JSX. When you want to use it in other JSX, you do so as a tag. Functions for custom tags must start with an uppercase letter, with no exception. When your JSX consists of many different parts, it makes sense to break it down into modular pieces. 

Suppose we have a component with a render function like this:

```javascript
const fruitsList = new Component({
  container: '#fruit-list',
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

## Custom Tags with Spread Operator

Looking at the above markup, we could break it up a bit to make it easier to read and reuse. To do this we'll define two functions to return markup. As mentioned earlier functions for custom tags must start with an uppercase letter. Lets break this up into two subcomponents:</p> 

```javascript
// Define custom tag for fruit:
function FruitItem({fruit}) {
  return (
    <div>
      <h3>{fruit.title}</h3>
      <h4>{fruit.subtitle}</h4>
    </div>
  )
}

// Define custom tag for disclosure tag:
function Disclosure() {
  return (
    <aside>
      <span class='disclosure'></span>
    </aside>
  )
}
```

<p>In order to pass in the data, we need to encose the data parameter in curly braces. This is how props are passed to tags in JSX. When we actually use a custom tag, we need to use another convention with curly braces: double braces and a spread operator for destructuring assignment. This will pass each property of the object to the JSX function so that they can be accessed. It looks like this:

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

// Now that we have some custom tags, we can use them as follows:

const fruitsList = new Component({
  container: '#fruit-list',
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

## One Tag to Rule Them All

Because of the way JSX works, there must always be one enclosing tag for all the other tags you wish to create. You cannot return a group of siblings. They need to be contained in another tag. For example, suppose you wanted to create some list items to insert in a list:

```javascript
// This will not compile:
const badJSX = new Component({
  container: '#list',
  render: () => (
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
  )
})
```

The above code will not build. Instead you need to create the entire list like this and insert it in some higher element as the container:

```javascript
const goodJSX = new Component({
  container: '#listDiv',
  render: () => (
    <ul>
      <li>One</li>
      <li>Two</li>
      <li>Three</li>
    </ul>
  )
})
```

## Fragment Tag

As of version 1.5.0, Composi also supports a special Fragment tag. This allows you to group a number a siblings together instead of needing to enclose them in an html tag. The Fragment tag will be the parent, however it will not be converted into a tag in the DOM. Instead its children will become the children of whatever the Fragment gets inserted into. This is similar to how document fragments work. However, this is not an actual document fragment. The Fragment tag must always start with a capital F:

```javascript
function Title() {
  return (
    <Fragment>
      <h1>Main Title</h1>
      <h2>Secondary Title</h2>
    </Fragment>
  )
}
```

Let's look at the previous list example to see how we can use Fragments to make it more manageable. Before we can use the Fragment tag, we need to import it into our project:

```javascript
import {h, Fragment, Component} from 'composi'

class List extends Component {
  container = '#listDiv'
  state = ['Apples', 'Oranges', 'Bananas']
  render(items) {
    function ListItems({items}) {
      return (
        <Fragment>
          {
            items.map(item => <li>{item}</li>)
          }
        </Fragment>
      )
    }
    return (
      <ul>
        <ListItems items={this.state}>
        <ListItems>
      </ul>
    )
  }
}
// Instantiate a new List:
new List()
```

Because Fragment just returns their children, if you nest them, when you return them their children will be flattens. Notice what the following exaple returns:

```javascript
import {h, render, Fragment} from 'composi'

const letters = ['A', 'B', 'C', 'D', 'E', 'F']
function Items({letters}) {
  return (
    <main>
      <Fragment>
        <span>{letters[0]}</span>
        <span>{letters[1]}</span>
        <Fragment>
          <span>{letters[2]}</span>
          <span>{letters[3]}</span>
          <Fragment>
            <span>{letters[4]}</span>
            <span>{letters[5]}</span>
          </Fragment>
        </Fragment>
      </Fragment>
    </main>
  )
}

render(<Items letters={letters}/>, document.body)
// This will create the following:
<main>
  <span>A</span>
  <span>B</span>
  <span>C</span>
  <span>D</span>
  <span>E</span>
  <span>F</span>
</main>
```

## Components with Same Container

Components do not have to have unique container elements. Multiple components can be rendered in the same container element. Their order in the DOM will be dependent on their order in execution.

## Using SVG Sprite Icons

Often developers use SVG sprite sheets for icons in their apps. Here are some articles about how this works: [Icon System with SVG Sprites](https://css-tricks.com/svg-sprites-use-better-icon-fonts/), [An Overview of SVG Sprite Creation Techniques](https://24ways.org/2014/an-overview-of-svg-sprite-creation-techniques/), [How to Implement Cross-Browser SVG Sprites](https://webdesign.tutsplus.com/tutorials/how-to-implement-cross-browser-svg-sprites--cms-22427)

### SVG 1 and SVG 2

SVG 1.0 uses the `xlink:ref` attribute to link to an icon id in an SVG sprite sheet image. Unfortunately, JSX does not support namespaced properties on SVG. To get arround this limitation, Composi lets you use a custom property: `xlink-href` in your SVG icons. At render time this gets converted to the correct form as `xlink:href`. Although `xlink:href` is currently listed as deprecated for Firefox, Chrome and Edge, it is widely supported on older browsers. In fact, it is currenlty the only way to implement SVG icons on macOS and iOS. If you are not targetting macOS and iOS and do not care about older versions of IE, Firefox and Chrome, you can use the new syntax for SVG 2.0. This is a simple `href` property.


Below is an SVG Twitter image that we will use as the basis for a series of SVG icons of different colors. Notice that we have a path with the id of "shape-twitter". We'll use that id to pull that path into our icon.

```html
<svg class="hide" style="display:none;">
  <g id="shape-codepen">
    <path id="shape-twitter" d="M100.001,17.942c-3.681,1.688-7.633,2.826-11.783,3.339
      c4.236-2.624,7.49-6.779,9.021-11.73c-3.965,2.432-8.354,4.193-13.026,5.146C80.47,10.575,75.138,8,69.234,8 c-11.33,0-20.518,9.494-20.518,21.205c0,1.662,0.183,3.281,0.533, 4.833c-17.052-0.884-32.168-9.326-42.288-22.155
      c-1.767,3.133-2.778,6.773-2.778,10.659c0,7.357,3.622,13.849,9.127, 17.65c-3.363-0.109-6.525-1.064-9.293-2.651
      c-0.002,0.089-0.002,0.178-0.002,0.268c0,10.272,7.072,18.845,16.458,20.793c-1.721,0.484-3.534,0.744-5.405,0.744
      c-1.322,0-2.606-0.134-3.859-0.379c2.609,8.424,10.187,14.555,19.166,14.726c-7.021,5.688-15.867,9.077-25.48,9.077
      c-1.656,0-3.289-0.102-4.895-0.297C9.08,88.491,19.865,92,31.449,92c37.737,0,58.374-32.312,58.374-60.336
      c0-0.92-0.02-1.834-0.059-2.743C93.771,25.929,97.251,22.195,100.001,17.942L100.001,17.942z"></path>  
    </g>
</svg>
```

This image needs to be loaded into the document so that it is exposed globally. Since we put `style="display:none:"` on the SVG tag, we don't have to worry about it showing up anywhere. To use this, we can do the following:

```javascript
const icons = new Component({
  container: 'section',
  render: (data) => {
    return (
      <div>
        <svg viewBox="0 0 100 100" class="icon--shape-twitter-1">
          <use xlink-href="#shape-twitter"></use>
        </svg>

        <svg viewBox="0 0 100 100" class="icon--shape-twitter-2">
          <use xlink-href="#shape-twitter"></use>
        </svg>

        <svg viewBox="0 0 100 100" class="icon--shape-twitter-3">
          <use xlink-href="#shape-twitter"></use>
        </svg>

        <svg viewBox="0 0 100 100" class="icon--shape-twitter-4">
          <use xlink-href="#shape-twitter"></use>
        </svg>
      </div>
    )
  }
})
icons.update()
```

Notice that we gave each SVG tag a unique class. We can use these to give each icon a different color:

```css
svg * {
  transition: all .5s ease-out;
}
.shape-twitter-1 {
  fill: #000
}
.shape-twitter-2 {
  fill: #55ACEE
}
.shape-twitter-3 {
  fill: #ff0000;
}
.shape-twitter-4 {
  fill: #00aa00;
}
.shape-twitter-1:hover, 
.shape-twitter-2:hover, 
.shape-twitter-3:hover, 
.shape-twitter-4:hover {
  fill: #0000ff;
}
```
