import {h} from './h'
import {patch} from './patch'
import {mixin} from './mixin'

var rAF = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(cb) { return setTimeout(cb, 16) }

/**
 * @type {object} dataStore A pseudo-private property using Date object to store the component's state.
 */
const dataStore = new Date().getTime()

/**
 * @class Class to create a component
 */
export class Component {
  /**
   * Constructor for Component class.
   * @typedef {object} props An object of property/values to configure the class instance.
   * @property {string|element} props.container The container element in which to render the component.
   * @property {state} [props.state] The state object of the component. This can be of type boolean, string, number, object or array.
   * @property {function} props.render A function that returns nodes to render to the DOM.
   */
  constructor(props) {
    /** @type {props} */
    if (!props) props = {}
    this.selector = props.container || props.root ||  'body'
    
    if (props.render) {
      this.render = props.render
    }
    
    if (props.state) {
      this.state = props.state
    }

    this.oldNode = null
    if (this.selector) {
      this.container = document.querySelector(this.selector)
    }
    this.componentShouldUpdate = true
    
    this.mounted = false
    this.element
    
    /**
     * Handle lifecycle methods.
     */
    if (props.beforeCreateComponent) {
      this.beforeCreateComponent = props.beforeCreateComponent
    }
    // Alias for React lifecycle hook:
    if (props.componentWillMount || this.componentWillMount) {
      this.beforeCreateComponent = props.componentWillMount || this.componentWillMount
    }
    if (props.componentWasCreated) {
      this.componentWasCreated = props.componentWasCreated
    }
    // Alias for React lifecycle hook:
    if (props.componentDidMount || this.componentDidMount) {
      this.componentWasCreated = props.componentDidMount || this.componentDidMount
    }
    if (props.componentWillUpdate) {
      this.componentWillUpdate = props.componentWillUpdate
    }
    if (props.componentDidUpdate) {
      this.componentDidUpdate = props.componentDidUpdate
    }
    if (props.componentWillUnmount) {
      this.componentWillUnmount = props.componentWillUnmount
    }
  }

  /**
   * Define getters and setters for state.
   */
  set state(data) {
    this[dataStore] = data
    rAF(() => this.update())
  }

  get state() {
    return this[dataStore]
  }
  
  /**
   * Method to set a component's state.
   * @param {string|number|boolean|object|array} data The data to set.
   * @param {number} [position] The index of an array whose data you want to set.
   */
  setState(data, position) {
    if (typeof data === 'function') {
      const state = data.call(this, this.state)
      if (typeof state !== 'function' && !!state) this.setState(state)
    }
    if (Array.isArray(this.state)) {
      const state = this.state
      if (position || position === 0) {
        if (typeof state[position] === 'object') {
          mixin(state[position], data)
          this.state = state
        } else {
          state[position] = data
          this.state = state
        }
      } else {
        this.state = state
      }
    } else if (typeof this.state === 'object') {
      const state = this.state
      mixin(state, data)
      this.state = state
    } else {
      this.state = data
    }
  }

  /**
   * Function to render component after data changes.
   * If data is passed as argument, it will be used.
   * Otherwise state will be used.
   * @param {boolean|number|string|object|array} [data ]
   * @returns void
   */
  update(data) {
    if (!this.render) return

    // If componentShouldUpdate is set to false, render one time only.
    // All other updates will be ignored.
    if (!this.componentShouldUpdate && this.mounted) return

    // If data is 0 or non-boolean, use,
    // else use component state.
    let __data  = this.state
    if (data !== true && data) __data = data

    if (this.container && typeof this.container === 'string') {
      this.selector = this.container
      this.container = document.querySelector(this.container)
    }

    // Check if vnode already exists.
    // Used for deciding whether to fire lifecycle events.
    const __oldNode = this.oldNode
    const __render = this.render
    function testIfVNodesDiffer(data) {
      try {
        if (JSON.stringify(this.oldNode) === JSON.stringify(__render(data))) {
          return false
        } else {
          return true
        }
      } catch(err) {
        return true
      }
    }
    // Create virtual dom and check if component id already exists in document.
    const vdom = this.render(__data)
    let elem
    if (vdom && vdom.props && vdom.props.id) {
      try {
        elem = this.container.querySelector(`#${vdom.props.id}`)
      } catch(err) {}
    }

    // If component element id already exists in DOM, 
    // remove it before rendering the component.
    if (elem && !this.mounted) {
      elem.parentNode.removeChild(elem)
    }

    // Patch DOM with component update.
    this.element = patch(
      this.oldNode,
      (this.oldNode = this.render(__data)),
      this.element,
      this.container
    )
    if (this.mounted && this.oldNode && testIfVNodesDiffer(__data)) {
      this.componentWillUpdate && this.componentWillUpdate(this)
    } else {
      this.beforeCreateComponent && this.beforeCreateComponent(this)
      this.componentWasCreated && this.componentWasCreated(this)
      this.mounted = true
      return
    }
    this.componentDidUpdate && testIfVNodesDiffer(__data) && this.componentDidUpdate(this)
  }
  
  /**
   * Method to destroy component.
   * First unbind events.
   * Then remove component element from DOM.
   * Also null out component properties.
   * @returns void
   */
  unmount() {
    const self = this
    const eventWhitelist = ['click', 'dblclick', 'mousedown','mouseup', 'mouseover','mouseout', 'mouseleave', 'select', 'input', 'change', 'keydown', 'keypress', 'keyup', 'submit']
    if (!this.element) return
    this.componentWillUnmount && this.componentWillUnmount(this)
    eventWhitelist.map(event => {
      this.element.removeEventListener(event, this)
    })
    this.container.removeChild(this.element)
    this.container = undefined
    for (let key in this) {
      delete this[key]
    }
    delete this.state
    this.update = undefined
    this.unmount = undefined
  }
}

// Polyfill for Element.closest:
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest = 
  function(s) {
    let matches = (this.document || this.ownerDocument).querySelectorAll(s)
    let i
    let el = this
    do {
      i = matches.length
      while (--i >= 0 && matches.item(i) !== el) {}
    } while ((i < 0) && (el = el.parentElement))
    return el
  }
}
