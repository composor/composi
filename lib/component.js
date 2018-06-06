import { patch } from './patch'
import { mixin } from './utils/mixin'
import { rAF } from './utils/rAF'
import { isSameNode } from './utils/isSameNode'
import { isObject } from './utils/isObject'

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
   * @constructor
   * @description Constructor for Component class.
   * @property {state} [props.state] The state object of the component. This can be of type boolean, string, number, object or array.
   * @property {string} selector A CSS selector describing the DOM container in which to render the component.
   * @property {HTMLElement} container The DOM node in which the component is rendered.
   * @property {boolean} componentShouldUpdate A flag to determine whether a component can render or not. Setting this to false allows you to maipulate a component's state without triggering and automatic render. After setting to true, you may need to execute `update()` on a component instance to force render it.
   * @property {boolean} mounted A boolean flag that tracks whether a component has been mounted in the DOM or not. This is used internally by Composi, do not touch!
   * @property {HTMLElement} element The root or base element of a component's DOM tree. You can use it to register events or as the basis of a component-specific DOM query.
   * @property {Function} componentWillMount A callback that is called before a component is mounted in the DOM.
   * @property {Function} componentDidMount A callback that is called after a component is mounted in the DOM. Use this to register events, query the component DOM, etc.
   * @property {Function} componentWillUpdate A callback that is called before a component is updated. This is not called the first time a component is rendered.
   * @property {Function} componentDidUpdate A callback that is called after a component is updated. This is not called the first time a component is rendered.
   * @property {Function} componentWillUnmount A callback that is called before a component is unmounted from the DOM. Use this for any environmental cleanup.
   * @property {Function} render A method that returns nodes to render to the DOM.¸
   * @property {Function} update A method that renders the component template with provided data to the DOM. Data may be provided directly as the primary argument, or it can be derived from the component's state. Data provided as an argument will override use of component state.
   * @property {Function} unmount A method to unmount a component from the DOM. This deletes the DOM tree structure starting from the component's base element, and sets the component instance properties to null.
   * @constructs Component
   */
  constructor(props) {
    if (!props) props = {}
    /**
     * @property {Object} props An object literal of options passed to the class constructor during initialization.
     */
    this.props = props
    /**
     * @property {string | HTMLElement} container The HTML element in which the component gets rendered. This can be a CSS selector describing the container or a DOM node reference.
     */
    this.selector = props.container || 'body'

    if (props.render) {
      /**
       * @property {Function} render A method to convert markup into DOM nodes to inject in the document. The method itself gets provided at init time by a function provided by the user as an argument, or in the case of extending, a method defined directly on the class extension.
       */
      this.render = props.render
    }

    if (props.state) {
      /**
       * @property {boolean | number | string | Object | any[]}
       */
      this.state = props.state
    }

    if (this.selector) {
      /**
       * @property {HTMLElement} container The HTML element in which the component gets rendered.
       */
      this.container = document.querySelector(this.selector)
    }

    /**
     * @property {boolean} componentShouldUpdate Determines whether a component should update. Set `componentShouldUpdate` to `false`, make changes, then set  `componentShouldUpdate` to `true` and update component with `update` method.
     */
    this.componentShouldUpdate = true

    /**
     * @property {boolean} mounted Indicates whether a component is mounted in the DOM or not. This is used internally, so do not change!
     */
    this.mounted = false

    /**
     * @property {HTMLElement}
     */
    this.element

    if (props.componentWillMount)
      /**
       * @property {Function} componentWillMount A method to execute a callback before the component mounts. The callback gets a reference to the component instance as its argument.
       * @returns {void} undefined
       */
      this.componentWillMount = props.componentWillMount

    if (props.componentDidMount)
      /**
       * @property {Function} componentDidMount  A method to execute a callback after the component mounts. The callback gets a reference to the component instance as its argument.
       * @returns {void} undefined
       */
      this.componentDidMount = props.componentDidMount

    if (props.componentWillUpdate)
      /**
       * @property {Function} componentWillUpdate A method to execute a callback before the component updates. The callback gets a reference to the component instance as its argument.
       * @returns {void} undefined
       */
      this.componentWillUpdate = props.componentWillUpdate

    if (props.componentDidUpdate)
      /**
       * @property {Function} componentDidUpdate -A method to execute a callback after the component updates. The callback gets a reference to the component instance as its argument.
       * @returns {void} undefined
       */
      this.componentDidUpdate = props.componentDidUpdate

    if (props.componentWillUnmount)
      /**
       * @property {Function} componentWillUnmount A method to execute a callback before the component unmounts. The callback gets a reference to the component instance as its argument.
       * @returns {void} undefined
       */
      this.componentWillUnmount = props.componentWillUnmount
  }

  /**
   * @method A method to execute a callback before the component mounts.
   * @returns {void} undefined
   */
  componentWillMount(cb) {
    return cb
  }
  /**
   * @method A method to execute a callback after the component mounts.
   * @returns {void} undefined
   */
  componentDidMount(cb) {
    return cb
  }
  /**
   * @method A method to execute a callback before the component updates.
   * @returns {void} undefined
   */
  componentWillUpdate(cb) {
    return cb
  }
  /**
   * @method A method to execute a callback after the component updates.
   * @returns {void} undefined
   */
  componentDidUpdate(cb) {
    return cb
  }
  /**
   * @method A method to execute a callback after the component updates.
   * @returns {void} undefined
   */
  componentWillUnmount(cb) {
    return cb
  }
  /**
   * @method A method to create a virtual node from data and markup. The returned virtual node will get converted into a node that gets injected in the DOM.
   * @param {*} data
   */
  render(data) {
    return data
  }
  /** End of type stubs */

  /**
   * @method This is getter to access the component's state using the pseudo-private key dataStore.
   * @returns {boolean | number | string | Object | any[]} The component's state
   */
  get state() {
    return this[dataStore]
  }

  /**
   * @method This is a setter to define the component's state. It uses the dataStore object as a pseudo-private key. It uses requestAnimationFrame to throttle component updates to avoid layout thrashing.
   * @param {string | number | boolean | Object | any[]} data Data to set as component state.
   * @returns {void} undefined
   */
  set state(data) {
    this[dataStore] = data
    rAF(() => this.update())
  }

  /**
   * @method Method to set a component's state. This accepts simple types or Objects. If updating an array, you can pass in the data and the position (number) in the array to update. Optionally you can pass a callback, which receives the state as its argument. You need to return the state changes in order to update the component's state.
   * @example
   * this.setState(true)
   * this.setState(0)
   * this.setState({name: 'Joe'})
   * this.setState([1,2,3])
   * this.setState(prevState => prevState + 1)
   * @param {string | number | boolean | Object | any[] | Function} data The data to set. This canIf a callback is passed as the argument to execute, it gets passed the previous state as its argument. You need to make sure the callback returns the final state or the component will not update.
   * @returns {void} undefined
   */
  setState(data) {
    if (typeof data === 'function') {
      const state = data.call(this, this.state)
      if (state) this.state = state
    } else if (isObject(this.state) && isObject(data)) {
      const state = this.state
      this.state = mixin(state, data)
    } else {
      this.state = data
    }
  }

  /**
   * @method Function to render component after data changes.
   * If data is passed as argument, it will be used.
   * Otherwise state will be used.
   * @param {boolean | number | string | Object | any[]} [data] By default, data will be the component's current state, otherwise, if data is provided as an argument, that will be used, overriding the state.
   * @returns {void} undefined
   */
  update(data) {
    if (!this.render) return

    // If componentShouldUpdate is set to false,
    // render one time only.
    // All other updates will be ignored.
    if (!this.componentShouldUpdate && this.mounted) return

    // If data is 0 or non-boolean, use,
    // else use component state.
    let __data = this.state
    if (data !== true && data) __data = data

    if (this.container && typeof this.container === 'string') {
      this.selector = this.container
      this.container = document.querySelector(this.container)
    }

    // Create virtual dom and check if component id
    // already exists in document.
    /**
     * @type {Object | null}
     */
    const vdom = this.render(__data)
    let elem
    if (vdom && vdom.props && vdom.props.id && this.container) {
      elem = this.container && this.container.querySelector(`#${vdom.props.id}`)
    }

    // If component element id already exists in DOM,
    // remove it before rendering the component.
    if (elem && !this.mounted) {
      elem.parentNode.removeChild(elem)
    }

    // Capture old node to use with isSameNode if component has already mounted:
    const __oldNode = this.element && this.element.node

    // Short circuit update if VNodes are identical:
    if (isSameNode(__oldNode, __data, this)) return

    /**
     * @property {HTMLElement} element The base element of the rendered component. You can use this as the base for comopnent instance specific DOM queries or event registration.
     */
    this.element = patch(this.render(__data), this.element)
    if (!this.mounted) {
      this.componentWillMount && this.componentWillMount(this)
      if (!this.container || this.container.nodeType !== 1) {
        console.error(
          'The container for a class component is not a valid DOM node. Check the selector provided for the class to make sure it is a valid CSS selector and that the container exists in the DOM. You might be targeting a nonexistent node.'
        )
      }
      this.container.appendChild(this.element)
      this.mounted = true
      this.componentDidMount && this.componentDidMount(this)
      return
    }

    this.componentWillUpdate && this.componentWillUpdate(this)
    this.componentDidUpdate && this.componentDidUpdate(this)
  }

  /**
   * @method Method to destroy a component.
   * First unbind events.
   * Then remove component element from DOM.
   * Also null out component properties.
   * @returns {void} undefined
   */
  unmount() {
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
