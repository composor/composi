import {h} from './h'
import {patch} from './patch'
import {mixin} from './mixin'

var rAF = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(cb) { return setTimeout(cb, 16); };

/**
 * @type {object} dataStore A pseudo-private property using Date object to store the component's state.
 */
const dataStore = new Date().getTime()

/**
 * @type {function} noop A no operation function.
 */
const noop = () => {}

/**
 * @class Class to create a component
 */
export class Component {
  /**
   * Constructor for Component class.
   * @typedef {object} props An object of property/values to configure the class instance.
   * @property {string|element} props.root The root element in which to render the component.
   * @property {state} [props.state] The state object of the component. This can be of type boolean, string, number, object or array.
   * @property {function} props.render A function that returns nodes to render to the DOM.
   * @property {object} [props.styles] An object defining a component-scoped stylesheet.
   * @property {object|array} [props.interactions] An object or array of objects defining user interactions. These are events with callbacks registed on the component or its child elements.
   */
  constructor(props) {
    if (!props) props = {}
    this.props = props
    this.selector = this.props.element || this.props.root || 'body'
    if (this.props.render) {
      this.render = this.props.render
    }
    this[dataStore] = this.props.state
    this.oldNode = null;
    this.styles = this.props.styles
    if (this.selector) {
      this.root = document.querySelector(this.selector)
    }
    
    this.scopedStylesheet = false
    this.mounted = false
    this.element
    this.interactionsAreRegistered = false
    
    /**
     * Create virtual stylesheet for component.
     */
    this.createComponentStyles = function() {
      let sharedSheet = null

      const unitlessProps = {
        columnCount: true,
        fillOpacity: true,
        flex: true,
        flexGrow: true,
        flexShrink: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        widows: true,
        zIndex: true,
        zoom: true
      }

      function flatten(array) {
        const flat = Array.prototype.concat(array)
        for (let i = 0; i < flat.length; i++) {
          if (Array.isArray(flat[i])) {
            flat.splice(i, 1, flat[i--])
          }
        }
        return flat
      }

      function createStyleSheet(options) {
        if (!(this instanceof createStyleSheet)) {
          return new createStyleSheet(options)
        }
        options || (options = {})
        options.prefix = !options.hasOwnProperty("prefix") ? true : !!options.prefix
        options.unit = options.hasOwnProperty("unit") ? options.unit : "px"

        this._sheet = null
        this._prefix = null

        this.css = function (element, styles, selector) {
          if (styles == null) return ""
          if (this._sheet == null) {
            this._sheet = sharedSheet = (sharedSheet || createSheet())
          }
          selector = element

          const rules = rulesFromStyles(selector, styles)
          if (options.prefix || options.unit !== "") {
            rules.forEach(function(set) {
              if (options.unit !== "") {
                addUnit(set[1], options.unit)
              }
            })
          }

          insertRules(rules, this._sheet)
        }
      }

      function createSheet() {
        if (document.head == null) {
          throw new Error("Can't add stylesheet before <head> is available. Make sure your document has a head element.")
        }
        const style = document.createElement("style")
        style.id = "styles_" + Math.random().toString(16).slice(2, 8)
        document.head.appendChild(style)
        return style.sheet
      }

      function rulesFromStyles(selector, styles) {
        if (!Array.isArray(styles)) styles = [styles]
        const style = {}
        let rules = []
        styles = flatten(styles)
        styles.forEach(function(block) {
          for (let prop in block) {
            let value = block[prop]
            if (isPlainObject(value) || Array.isArray(value)) {
              rules = rules.concat(
                rulesFromStyles(combineSelectors(selector, prop), value)
              )
            } else {
              if (prop === "content") value = "'"+value+"'"
              style[prop] = value
            }
          }
        })

        rules.push([ selector, style ])
        return rules
      }

      function insertRules(rules, sheet) {
        window.sheet = sheet
        function hyphenate(str) {
          return str.replace(/[A-Z]/g, function($0) { return '-'+$0.toLowerCase() })
        }
        rules.forEach(function(rule) {
          const pairs = []
          for (let prop in rule[1]) {
            pairs.push(hyphenate(prop) + ":" + rule[1][prop])
          }
          if (pairs.length > 0) {
            const rulez = rule[0] ? rule[0] : ''
            sheet.insertRule(rulez + "{" + pairs.join(";") + "}", 0)
          }
        })
      }

      function combineSelectors(parent, child) {
        const pseudoRe = /^[:\[]/
        const parents = parent.split(","), children = child.split(",")
        return parents.map(function(parent) {
          return children.map(function(part) {
            const separator = pseudoRe.test(part) ? "" : " "
            return parent + separator + part
          }).join(",")
        }).join(",")
      }

      function addUnit(style, unit) {
        for (let prop in style) {
          let value = style[prop] + ""
          if (!isNaN(value) && !unitlessProps[prop]) {
            value = value + unit
          }
          style[prop] = value
        }
        return style
      }

      function isPlainObject(obj) {
        return obj === Object(obj) && Object.prototype.toString === obj.toString
      }

      const stylesheets = {}
      stylesheets.css = createStyleSheet().css
      return stylesheets
    }

    /**
     * Register events on the component or its child nodes.
     */
    this.handleEvents = function() {
      if (!this.interactions) return
      const self = this
      let bubble = false
      if (this.mounted) return
      if (Array.isArray(this.interactions)) {
        if (!this.interactions.length || this.interactionsAreRegistered) return
        this.interactions.forEach(function(action) {
          bubble = action.bubble
          if (action && action.element === 'self' || action && !action.element) {
            self.root.addEventListener(action.event, action.callback, bubble)
          } else {
            self.root.addEventListener(action.event, function(e) {
              let target = e.target
              if (e.target.nodeType === 3) {
                target = e.target.parentNode
              }
              const els = [].slice.call(self.element.querySelectorAll(action.element))
              const len = els.length
              let i = 0
              while (i < len) {
                if (e.target.closest(action.element) === els[i]) {
                  action.callback.call(els[i], e)
                  break
                }
                i++
              }
            })
          }
          self.interactionsAreRegistered = true
        })
      }
    }
    
    /**
     * Check for interactions.
     */
    if (this.props.interactions) {
      this.interactions = this.props.interactions
    }
    this.interactions && this.handleEvents()

    /**
     * Attach any functions provided in methods property as component methods.
     */
    if (this.props.methods) {
      const self = this
      for (let method in this.props.methods) {
        self[method] = this.props.methods[method]
      }
    }
    
    /**
     * Handle lifecycle methods.
     */
    if (this.props.componentWasCreated) {
      this.componentWasCreated = this.props.componentWasCreated
    }
    if (this.props.componentWillUpdate) {
      this.componentWillUpdate = this.props.componentWillUpdate
    }
    if (this.props.componentDidUpdate) {
      this.componentDidUpdate = this.props.componentDidUpdate
    }
    if (this.props.componentWillUnmount) {
      this.componentWillUnmount = this.props.componentWillUnmount
    }
  }

  /**
   * Define getters and setters for state.
   */
  set state(data) {
    const self = this
    this[dataStore] = data
    rAF(function() {
      self.update()
    })
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
    const _data = data || this.state
    if (this.componentWillUpdate) this.componentWillUpdate(this)
    if (this.root && typeof this.root === 'string') {
      this.selector = this.root
      this.root = document.querySelector(this.root)
    }
    this.element = patch(
      this.oldNode,
      (this.oldNode = this.render(_data)),
      this.element,
      this.root
    )
    if (!this.mounted) {
      if (this.styles && (this.root && this.root.nodeName)) {
        const styles = this.createComponentStyles()
        if (typeof this.styles !== 'object') return
        styles.css(this.selector, this.styles)
      }
      this.handleEvents()
      this.componentWasCreated && this.componentWasCreated(this)
      this.mounted = true
    }
    this.componentDidUpdate && this.componentDidUpdate(this)
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
    this.componentWillUnmount && this.componentWillUnmount(this)
    if (this.interactions && this.interactions.length) {
      this.interactions.forEach(action => {
        this.root.removeEvent(action.event, action.callback)
      })
    }
    this.root.removeChild(this.element)
    this.root = undefined
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
    let el = this;
    do {
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== el) {};
    } while ((i < 0) && (el = el.parentElement)); 
    return el;
  };
}
