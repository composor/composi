import {mixin} from './mixin'

/**
 * @constructor 
 * @param {node} oldNode Original node or null.
 * @param {node} node New node.
 * @param {node} element The component root element.
 * @param {node} parent Parent node in which component is rendered.
 */
export function patch(oldNode, node, element, parent) {
  element = diffAndPatch(parent || document.body, element, oldNode, node)
  return element
}
/**
 * Patch functions:
 * setProps 
 * createNode
 * createElement
 * getKey
 * updateElement
 * removeElement
 * diffAndPatch
 */

/**
 * Function to set properties and attributes on element.
 * @param {node} element 
 * @param {string} name 
 * @param {string|number|boolean} value 
 * @param {string|number|boolean} oldValue 
 */
function setProps(element, name, value, oldValue) {
  if (name === 'key') {
  } else if (name === "style") {
    for (let key of mixin(oldValue, (value = value || {}))) {
      element.style[key] = value[key] || ''
    }
  } else {
    try {
      element[name] = value
    } catch (err) {}
    typeof value !== "function" && value ? element.setAttribute(name, value) : element.removeAttribute(name)
  }
}

/**
 * Function to create an HTML or SVG node.
 * @param {node} node node A node to create.
 * @param {svg} svg Whether the node is SVG or not.
 */
function createNode(node, svg) {
  const element = (svg = svg || node.type === "svg")
  ? document.createElementNS("http://www.w3.org/2000/svg", node.type)
  : document.createElement(node.type)

  for (let key in node.props) setProps(element, key, node.props[key])
  node.children.map(child => element.appendChild(createElement(child, svg)))
  return element
}

/**
 * Function to convert hyperscript/JSX into DOM nodes.
 * @param {jsx|hyperscript} node A node to create.
 * @param {svg} svg Whether the node is SVG or not.
 */
export function createElement(node, svg) {
  return typeof node === "string" ? document.createTextNode(node) : createNode(node, svg)
}

/**
 * Function to get a node's key.
 * @param {node} node 
 */
function getKey(node) {
  if (node && node.props) {
    return node.key
  }
}

/**
 * Update an element with new values for properties and/or children.
 * @param {Element} element 
 * @param {node} oldProps 
 * @param {object} props 
 */
function updateElement(element, oldProps, props) {
  for (let key in mixin(oldProps, props)) {
    let value = props[key]
    , oldValue = key === "value" || key === "checked" ? element[key] : oldProps[key]

    if (value !== oldValue) setProps(element, key, value, oldValue)
  }
}

/**
 * Function to remove element from DOM.
 * @param {node} parent The parent of the element to remove.
 * @param {node} element The element to remove.
 */
const removeElement = (parent, element) => parent.removeChild(element)

/**
 * Function to patch DOM. Diffs virtual nodes, then patches the DOM.
 * @param {node} parent 
 * @param {node} element 
 * @param {node} oldNode 
 * @param {node} node 
 * @param {boolean} svg 
 * @param {node} nextSibling 
 */
function diffAndPatch(parent, element, oldNode, node, svg, nextSibling) {
  if (oldNode == null) {
    element = parent.insertBefore(createElement(node, svg), element)
  } else if (node.type != null && node.type === oldNode.type) {
    updateElement(element, oldNode.props, node.props)

    svg = svg || node.type === "svg"
    const len = node.children.length
    , oldLen = oldNode.children.length
    , oldKeyed = {}
    , oldElements = []
    , keyed = {}

    let k = 0
    while (k < oldLen) {
      let oldElement = (oldElements[k] = element.childNodes[k])
      , oldChild = oldNode.children[k]
      , oldKey = getKey(oldChild)
      if (null != oldKey) oldKeyed[oldKey] = [oldElement, oldChild]
      k++
    }

    let i = 0
    , j = 0

    while (j < len) {
      let oldElement = oldElements[i]
      , oldChild = oldNode.children[i]
      , newChild = node.children[j]
      , oldKey = getKey(oldChild)
  
      if (keyed[oldKey]) {
        i++
        continue
      }
      
      let newKey = getKey(newChild)
      , keyedNode = oldKeyed[newKey] || []

      if (null == newKey) {
        if (null == oldKey) {
          diffAndPatch(element, oldElement, oldChild, newChild, svg)
          j++
        }
        i++
      } else {
        oldKey === newKey ? diffAndPatch(element, keyedNode[0], keyedNode[1], newChild, svg) && i++ :
        keyedNode[0] ? element.insertBefore(keyedNode[0], oldElement) && diffAndPatch(element, keyedNode[0], keyedNode[1], newChild, svg) : diffAndPatch(element, oldElement, null, newChild, svg)
        
        keyed[newKey] = newChild

        j++
      }
    }

    while (i < oldLen) {
      let oldChild = oldNode.children[i]
      , oldKey = getKey(oldChild)
      if (null == oldKey) removeElement(element, oldElements[i])
      i++
    }

    for (let key in oldKeyed) {
      let keyedNode = oldKeyed[key]
      , reusableNode = keyedNode[1]
      if (!keyed[reusableNode.props.key]) {
        removeElement(element, keyedNode[0])
      }
    }
  } else if (element && node !== element.nodeValue) {
    element = parent.insertBefore(
      createElement(node, svg),
      (nextSibling = element)
    )
    removeElement(parent, nextSibling)
  }
  return element
}
