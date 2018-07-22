import { XLINK_NS, SVG_NS, mixin } from './utils'

/**
 * @typedef {import('./vnode').VNode} VNode
 */

/**
 * Handle converting 'className' to 'class'.
 * @param {string} prop
 * @return {string} string
 */
function handleClassName(prop) {
  if (prop === 'classname') {
    prop = 'class'
  }
  return prop
}

/**
 * Enable setting innerHTML as a prop.
 * @param {Element} element
 * @param {string} prop
 * @param {*} value
 * @return {void} undefined
 */
function handleDangerouslySetInnerHTML(element, prop, value) {
  if (prop === 'dangerouslysetinnerhtml') {
    element.innerHTML = value
  }
}

/**
 * Handle styles defined as object literals.
 * @param {Node} element
 * @param {string} prop
 * @param {any} newValue
 * @param {any} oldValue
 * @return {void} undefined
 */
function handleStyles(element, prop, newValue, oldValue) {
  for (let i in mixin(oldValue, newValue)) {
    const style = newValue == null || newValue[i] == null ? '' : newValue[i]
    if (i[0] === '-') {
      element[prop].setProperty(i, style)
    } else {
      element[prop][i] = style
    }
  }
}

/**
 * Enable setting xlink href value for browser that only support SVG 1.0.
 * @param {Element} element
 * @param {any} value
 * @return {void} undefined
 */
function handleXlinkHref(element, value) {
  element.setAttributeNS(XLINK_NS, 'href', value)
  element.setAttribute('href', value)
}

/**
 * Function to get a node's key.
 * @param {VNode} node A virtual node.
 * @return {string | number | null} key.
 */
const getKey = node => (node ? node.key : null)

/**
 * Function to set properties and attributes on element.
 * @param {Element} element The element to set props on.
 * @param {string} prop The property/attribute.
 * @param {any} newValue The new value for the prop.
 * @param {string | number | boolean} oldValue The original value of the prop.
 * @param {boolean} isSVG Whether this is SVG or not
 * @return {void} undefined
 */
export function setProp(element, prop, newValue, oldValue, isSVG) {
  // Do not add these as node attributes:
  if (
    prop === 'key' ||
    prop === 'onComponentDidMount' ||
    prop === 'onComponentDidUpdate' ||
    prop === 'onComponentWillUnmount'
  ) {
    return
  } else if (
    prop === 'style' &&
    typeof newValue === 'object' &&
    !Array.isArray(newValue)
  ) {
    handleStyles(element, prop, newValue, oldValue)
  } else {
    // Convert camel case props to lower case:
    prop = prop.toLowerCase()

    // Handle cases where 'className' is used:
    prop = handleClassName(prop)

    // Allow setting innerHTML:
    handleDangerouslySetInnerHTML(element, prop, newValue)

    if (prop in element && prop !== 'list' && !isSVG) {
      element[prop] = newValue == (null || 'no') ? '' : newValue
    } else if (
      newValue != null &&
      newValue !== 'null' &&
      newValue !== 'false' &&
      newValue !== 'no' &&
      newValue !== 'off'
    ) {
      // Support SVG 'xlink:href' property:
      if (prop === 'xlink-href') {
        handleXlinkHref(element, newValue)
      } else {
        if (newValue === 'true') newValue = ''
        // Set prop as attribute, except dangerouslySetInnerHTML:
        if (prop !== 'dangerouslysetinnerhtml') {
          element.setAttribute(prop, newValue)
        }
      }
    }

    if (
      newValue == null ||
      newValue === 'null' ||
      newValue === 'undefined' ||
      newValue === 'false' ||
      newValue === 'no' ||
      newValue === 'off'
    ) {
      element.removeAttribute(prop)
    }
  }
}

/**
 * Function to convert hyperscript/JSX into DOM nodes.
 * @param {string | number | Object} node A node to create. This may be a hyperscript function or a JSX tag which gets converted to hyperscript during transpilation.
 * @param {boolean} [isSVG] Whether the node is SVG or not.
 * @return {Node} An element created from a virtual dom object.
 */
export function createElement(node, isSVG) {
  let element
  if (typeof node === 'number') node = node.toString()
  if (typeof node === 'string') {
    element = document.createTextNode(node)
  } else if ((isSVG = isSVG || node.type === 'svg')) {
    element = document.createElementNS(SVG_NS, node.type)
  } else {
    element = document.createElement(node.type)
  }
  /**
   * @property {Object.<string, any>} node.props A virtual node stored on the node.
   */
  const props = node.props
  if (props) {
    for (let i = 0; i < node.children.length; i++) {
      element.appendChild(createElement(node.children[i], isSVG))
    }

    for (let prop in props) {
      setProp(element, prop, props[prop], null, isSVG)
    }
  }

  return element
}

/**
 * A function to remove the children of a node.
 * @param {Node} element The parent of the node whose children will be removed.
 * @param {Element} node The node whose children will be removed.
 * @return {Node} element The parent of the removed nodes.
 */
export function removeChildren(element, node) {
  const props = node['props']
  if (props) {
    for (let i = 0; i < node.children.length; i++) {
      removeChildren(element.childNodes[i], node.children[i])
    }
  }
  return element
}

/**
 * Function to remove oldChild element when patching.
 * @param {Node} element
 * @param {any[]} oldChildren
 * @param {Node[]} oldElements
 * @param {number} i
 * @return {void} undefined
 */
export function removeOldChild(element, oldChildren, oldElements, i) {
  while (i < oldChildren.length) {
    if (getKey(oldChildren[i]) == null) {
      removeElement(element, oldElements[i], oldChildren[i])
    }
    i++
  }
}

/**
 * Function to remove element from DOM.
 * @param {Node} parent The containing element in which the component resides.
 * @param {Node} element The parent of the element to remove.
 * @param {Element} node The element to remove.
 * @return {void} undefined
 */
export const removeElement = (parent, element, node) => {
  parent.removeChild(removeChildren(element, node))
  if (node && node['props'] && node['props'].onComponentDidUnmount) {
    node['props'].onComponentDidUnmount.call(
      node['props'].onComponentDidUnmount,
      parent
    )
  }
}

/**
 * When oldNode does not exist or node.type is different, create a new element.
 * @param {Node} node
 * @param {boolean} isSVG
 * @param {Node} parent
 * @param {Element} element
 * @param {Element} oldNode
 * @return {Node} Node
 */
export function createNewElement(node, isSVG, parent, element, oldNode) {
  const newElement = createElement(node, isSVG)
  if (parent) {
    parent.insertBefore(newElement, element)
    if (oldNode != null) {
      removeElement(parent, element, oldNode)
    }
  }
  element = /** @type {Element} */ (newElement)
  return element
}

/**
 * Update values for old element and key.
 * @param {Node} element
 * @param {Node[]} oldElements
 * @param {VNode[]} oldChildren
 * @param {Object.<string, any>} oldKeyed
 * @return {void} undefined
 */
export function trackOldElements(element, oldElements, oldChildren, oldKeyed) {
  for (let i = 0; i < oldChildren.length; i++) {
    oldElements[i] = element.childNodes[i]

    const oldKey = getKey(oldChildren[i])
    if (oldKey != null) {
      oldKeyed[oldKey] = [oldElements[i], oldChildren[i]]
    }
  }
}

/**
 * Remove old keyed elements.
 * @param {Node} element
 * @param {Object.<string, any>} oldKeyed
 * @param {Object.<string, any>} newKeyed
 * @return {void} undefined
 */
export function removeOldKeyedElements(element, oldKeyed, newKeyed) {
  for (let k in oldKeyed) {
    if (!newKeyed[k]) {
      removeElement(element, oldKeyed[k][0], oldKeyed[k][1])
    }
  }
}

/**
 * @description A function to update an element based on a virtual dom node.
 * @param {Element} element
 * @param {Object.<string, any>} oldProps The original props used to create the element.
 * @param {Object.<string, any>} newProps New props generated by the virtual dom.
 * @param {boolean} isSVG Whether we are dealing with SVG or not.
 * @function {function(element: Node, oldProps: VNode, props: VNode,isSVG: boolean): void}
 * @return {void} undefined
 */
export function updateElement(element, oldProps, newProps, isSVG) {
  for (let prop in mixin(oldProps, newProps)) {
    if (
      newProps[prop] !==
      (prop === 'value' || prop === 'checked' ? element[prop] : oldProps[prop])
    ) {
      setProp(element, prop, newProps[prop], oldProps[prop], isSVG)
    }
  }

  // Handle lifecycle hook:
  if (element['mounted'] && newProps && newProps.onComponentDidUpdate) {
    newProps.onComponentDidUpdate.call(
      newProps.onComponentDidUpdate,
      oldProps,
      newProps,
      element
    )
  }
}

/**
 * A function to diff and patch a DOM node with a virtual node.
 * @param {Node} parent The parent node of the elment being patched.
 * @param {Element} element The element being patched.
 * @param {Object} oldVNode A virtual dom node from the previous patch.
 * @param {Object} newVNode The current virtual dom node.
 * @param {boolean} [isSVG] Whether we are dealing with an SVG element or not.
 * @return {Node} element The patched element.
 */
export function patchElement(parent, element, oldVNode, newVNode, isSVG) {
  // Short circuit patch if VNodes are identical
  if (newVNode === oldVNode) {
    return
  } else if (oldVNode == null || oldVNode.type !== newVNode.type) {
    element = /** @type {Element} */ (createNewElement(
      newVNode,
      isSVG,
      parent,
      element,
      oldVNode
    ))
  } else if (oldVNode.type == null) {
    element.nodeValue = newVNode
  } else {
    updateElement(
      element,
      oldVNode.props,
      newVNode.props,
      (isSVG = isSVG || newVNode.type === 'svg')
    )

    const oldKeyed = {}
    const newKeyed = {}
    const oldElements = []
    const oldChildren = oldVNode.children
    const children = newVNode.children

    trackOldElements(element, oldElements, oldChildren, oldKeyed)

    let i = 0
    let j = 0

    while (j < children.length) {
      let oldKey = getKey(oldChildren[i])
      let newKey = getKey(children[j])

      if (newKeyed[oldKey]) {
        i++
        continue
      }

      if (newKey != null && newKey === getKey(oldChildren[i + 1])) {
        if (oldKey == null) {
          removeElement(element, oldElements[i], oldChildren[i])
        }
        i++
        continue
      }

      if (newKey == null) {
        if (oldKey == null) {
          patchElement(
            element,
            oldElements[i],
            oldChildren[i],
            children[j],
            isSVG
          )
          j++
        }
        i++
      } else {
        const keyedNode = oldKeyed[newKey] || []

        if (oldKey === newKey) {
          patchElement(element, keyedNode[0], keyedNode[1], children[j], isSVG)
          i++
        } else if (keyedNode[0]) {
          patchElement(
            element,
            element.insertBefore(keyedNode[0], oldElements[i]),
            keyedNode[1],
            children[j],
            isSVG
          )
        } else {
          patchElement(element, oldElements[i], null, children[j], isSVG)
        }

        newKeyed[newKey] = children[j]
        j++
      }
    }

    removeOldChild(element, oldChildren, oldElements, i)
    removeOldKeyedElements(element, oldKeyed, newKeyed)
  }
  return element
}

/**
 * A function to patch a virtual node against a DOM element, updating it in the most efficient manner possible.
 * @param {() => VNode} newVNode A function that returns a virtual node. This may be a JSX tag, which gets converted into a function, or a hyperscript function.
 * @param {Node} [element] The element to patch.
 * @return {Node} The updated element.
 */
export function patch(newVNode, element) {
  if (element) {
    patchElement(
      element.parentNode,
      /** @type{Element} */ (element),
      element && element['vnode'],
      newVNode
    )
  } else {
    element = patchElement(null, null, null, newVNode)
  }

  element['vnode'] = newVNode

  return element
}
