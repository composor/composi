import {h} from './h'
import {patch} from './patch'
import {mixin} from './utils/mixin'

/**
 * @description A cross-browser normalization/polyfill for requestAnimationFrame.
 */
const rAF = window && window.requestAnimationFrame
  || window && window.webkitRequestAnimationFrame
  || window && window.mozRequestAnimationFrame
  || window && window.msRequestAnimationFrame
  || function(cb) { return setTimeout(cb, 16) }

/**
 * @description This is a Time Object used as a key to create a pseudo-private property in the Component class for holding state.
 * @type {Object} dataStore A Date object to use as pseudo-private key to store the component's state.
 */
const dataStore = new Date().getTime()

/**
 * @description Component can be instantiated with the new keyword, or extended to create a custom version of the class.
 * @class Class to create a component.
 * @example New instance of Component class:
 * const title = new Component({
 *   container: 'header',
 *   state: 'World',
 *   render: message => <h1>Hello, {message}!</h1>
 * })
 * @example Extending Component class:
 * class UserList extends Component {
 *   constructor(props) {
 *     super(props)
 *     this.state = users
 *     this.container = 'section'
 *   }
 *   render(users) {
 *     return (
 *      <ul class='user-list'>
 *        {
 *          users.map(user => <li>{user.name}</li>)
 *        }
 *      </ul>
 *     )
 *   }
 * }
 */
export class Component {
  /**
   * @description Constructor for Component class.
   *
   * Possible values to pass to new Component are:
   * 1. container - element to render component in.
   * 2. state - data for the component to consume.
   * 2. render - a function to return markup to create.
   * 3. componentWillMount - a callback to execute before the component is mount.
   * 4. componentDidMount - a callback to execute after the component mounts.
   * 5. componentWillUpdate - a callback to execute before the component updates.
   * 6. componentDidUpdate - a callback to execute after the component updates.
   * 7. componentWillUnmount - a callback to execute before the component unmounts.
   *
   * @typedef {object} props An object of property/values to configure the class instance.
   * @property {string|element} props.container The container element in which to render the component.
   * @property {state} [props.state] The state object of the component. This can be of type boolean, string, number, object or array.
   * @property {function} props.render A function that returns nodes to render to the DOM.
   * @constructs Component
   */
  constructor(props) {
    if (!props) props = {}
    /** @property {string} */
    this.selector = props.container || 'body'

    if (props.render) {
      /** @property {Function} */
      this.render = props.render
    }

    if (props.state) {
      /** @property {boolean|number|string|object|array} */
      this.state = props.state
    }

    /** @property {null, Object} */
    this.oldNode = null
    if (this.selector) {
      /** @property {HTMLElement} */
      this.container = document.querySelector(this.selector)
    }
    
    /** @property {boolean} */
    this.componentShouldUpdate = true

    /** @property {boolean} */
    this.mounted = false

    /**
     * @property {HTMLElement|undefined}
     * @default {undefined}
    */
    this.element

    /**
     * @description Handle lifecycle hooks.
     */
    if (props.componentWillMount) 
      this.componentWillMount = props.componentWillMount

    if (props.componentDidMount) 
      this.componentDidMount = props.componentDidMount

    if (props.componentWillUpdate) 
      this.componentWillUpdate = props.componentWillUpdate

    if (props.componentDidUpdate) 
      this.componentDidUpdate = props.componentDidUpdate

    if (props.componentWillUnmount) 
      this.componentWillUnmount = props.componentWillUnmount
  }

  /**
   * @description This is getter to access the component's state using the pseudo-private key dataStore.
   * @returns {boolean|number|string|object|any[]} The component's state
   */
  get state() {
    return this[dataStore]
  }

  /**
   * @description This is a setter to define the component's state. It uses the dataStore object as a pseudo-private key. It uses requestAnimationFrame to throttle component updates to avoid layout thrashing.
   * @param {string|number|boolean|object|array} data Data to set as component state.
   * @returns {undefined} void
   */
  set state(data) {
    this[dataStore] = data
    rAF(() => this.update())
  }

  /**
   * @description Method to set a component's state. This accepts simple types or Objects. If updating an array, you can pass in the data and the position (number) in the array to update. Optionally you can pass a callback. This receives the state as its argument. You need to return the state changes in order to update the component's state.
   * @example
   * this.setState(true)
   * this.setState(0)
   * this.setState({name: 'Joe'})
   * this.setState([1,2,3])
   * this.setState(prevState => prevState + 1)
   * @property Component#setState
   * @param {string|number|boolean|object|array|Function} data - The data to set.
   * @param {number} [position] The index of an array whose data you want to set.
   * @returns {undefined} void
   */
  setState(data, position) {
    if (typeof data === 'function') {
      const state = data.call(this, this.state)
      if (typeof state !== 'function' && !!state) this.setState(state)
    } else if (Array.isArray(this.state)) {
      const state = this.state
      if (position || position === 0) {
        if (typeof state[position] === 'object') {
          this.state = mixin(state[position], data)
        } else {
          state[position] = data
          this.state = state
        }
      } else {
        this.state = state
      }
    } else if (typeof this.state === 'object') {
      const state = this.state
      this.state = mixin(state, data)
    } else {
      this.state = data
    }
  }

  /**
   * @description Function to render component after data changes.
   * If data is passed as argument, it will be used.
   * Otherwise state will be used.
   * @property Component#update
   * @param {boolean|number|string|object|array} [data]
   * @returns {undefined} void
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
    function testIfVNodesDiffer(oldNode, data) {
      if (this && JSON.stringify(oldNode) === JSON.stringify(__render(data))) {
        return false
      } else {
        return true
      }
    }

    // Create virtual dom and check if component id 
    // already exists in document.
    const vdom = this.render(__data)
    let elem
    if (
      vdom
      && vdom.props
      && vdom.props.id
      && this.container
    ) {
      elem = this.container && this.container.querySelector(`#${vdom.props.id}`)
    }

    // If component element id already exists in DOM,
    // remove it before rendering the component.
    if (elem && !this.mounted) {
      elem.parentNode.removeChild(elem)
    }

    // Patch DOM with component update.
    this.oldNode = this.render(__data)
    this.element = patch(
      this.oldNode,
      this.element
    )
    if (!this.mounted) {
      this.componentWillMount && this.componentWillMount(this)
      this.container.appendChild(this.element)
      this.mounted = true
      this.componentDidMount && this.componentDidMount(this)
      return
    }

    if (this.mounted && this.oldNode && testIfVNodesDiffer(__oldNode, __data)) {
      this.componentWillUpdate && this.componentWillUpdate(this)
    }
    this.componentDidUpdate && testIfVNodesDiffer(__oldNode, __data) && this.componentDidUpdate(this)
  }

  /**
   * @description Method to destroy component.
   * First unbind events.
   * Then remove component element from DOM.
   * Also null out component properties.
   * @property Component#unmount
   * @returns {undefined} void
   */
  unmount() {
    const self = this
    const eventWhitelist = [
      'change',
      'click',
      'dblclick',
      'input',
      'keydown',
      'keypress',
      'keyup',
      'mousedown',
      'mouseleave',
      'mouseout',
      'mouseover',
      'mouseup',
      'pointercancel',
      'pointerdown',
      'pointermove',
      'pointerup',
      'select',
      'submit',
      'touchcancel',
      'touchend',
      'touchmove',
      'touchstart'
    ]
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
