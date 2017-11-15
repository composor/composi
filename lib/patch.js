/**
 * A function to merge two objects together. The properties of the second object will overwrite any matching properties in the first object.
 * @param {Object} obj1 The first object to merge.
 * @param {Object} obj2 The second object to merge.
 */
function mixin(obj1, obj2) {
  const result = {}
  for (let i in obj1) {
    result[i] = obj1[i]
  }
  for (let i in obj2) {
    result[i] = obj2[i]
  }
  return result
}

/**
 * @constructor 
 * @param {node} oldNode Original node or null.
 * @param {node} node New node.
 * @param {node} element The component root element.
 * @param {node} container The container element in which component is rendered.
 */
export function patch(oldNode, node, element, container) {
  return diffAndPatch(container || document.body, element, oldNode, node)
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
  } else if (name === 'style') {
    for (let name in mixin(oldValue, (value = value || {}))) {
      element.style[name] = String(value[name]) || ''
    }
  } else {
    try {
      if (value === 0) value = String(value)
      element[name] = value
    } catch (err) {}

    if (typeof value !== 'function') {
      if (!!value) {
        // Support SVG 'xlink:href' property:
        if (name === 'xlink-href') {
          element.setAttributeNS('http://www.w3.org/1999/xlink', 'href', value)
        } else {
          element.setAttribute(name, value)
        }
      } else {
        element.removeAttribute(name)
      }
    }
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

  Object.keys(node.props).forEach(key => setProps(element, key, node.props[key]))
  node.children.map(child => element.appendChild(createElement(child, svg)))
  return element
}

/**
 * Function to convert hyperscript/JSX into DOM nodes.
 * @param {jsx|hyperscript} node A node to create.
 * @param {svg} svg Whether the node is SVG or not.
 */
function createElement(node, svg) {
  return typeof node === "string" ? document.createTextNode(node) : createNode(node, svg)
}

/**
 * Function to get a node's key.
 * @param {node} node 
 */
function getKey(node) {
  if (node && node.props) {
    return node.props.key
  }
}

/**
 * Update an element with new values for properties and/or children.
 * @param {Element} element 
 * @param {node} oldProps 
 * @param {object} props 
 */
function updateElement(element, oldProps, props) {
  Object.keys(mixin(oldProps, props)).forEach(key => {
    let value = props[key]
    let oldValue = key === "value" || key === "checked" ? element[key] : oldProps[key]

    if (value !== oldValue) setProps(element, key, value, oldValue)
  })
}

/**
 * Function to remove element from DOM.
 * @param {node} container The container of the element to remove.
 * @param {node} element The element to remove.
 */
const removeElement = (container, element) => container.removeChild(element)

/**
 * Function to patch DOM. Diffs virtual nodes, then patches the DOM.
 * @param {node} container 
 * @param {node} element 
 * @param {node} oldNode 
 * @param {node} node 
 * @param {boolean} svg 
 * @param {node} nextSibling 
 */
function diffAndPatch(container, element, oldNode, node, svg, nextSibling) {
  // There is no oldNode, so this is first render.
  if (oldNode == null) {
    element = container.insertBefore(createElement(node, svg), element)
  // There's an oldNode, so patch.
  } else if (node.type != null && node.type === oldNode.type) {
    updateElement(element, oldNode.props, node.props)

    svg = svg || node.type === "svg"
    const len = node.children.length
    let oldLen = oldNode.children.length
    let oldKeyed = {}
    let oldElements = []
    let keyed = {}

    let k = 0
    while (k < oldLen) {
      let oldElement = (oldElements[k] = element.childNodes[k])
      let oldChild = oldNode.children[k]
      let oldKey = getKey(oldChild)
      if (null != oldKey) oldKeyed[oldKey] = [oldElement, oldChild]
      k++
    }

    let i = 0, j = 0
    while (j < len) {
      let oldElement = oldElements[i]
      let oldChild = oldNode.children[i]
      let newChild = node.children[j]
      let oldKey = getKey(oldChild)
      if (keyed[oldKey]) {
        i++
        continue
      }
      
      let newKey = getKey(newChild)
      let keyedNode = oldKeyed[newKey] || []
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
      let oldKey = getKey(oldChild)
      if (null == oldKey) removeElement(element, oldElements[i])
      i++
    }

    Object.keys(oldKeyed).forEach(key => {
      let keyedNode = oldKeyed[key]
      let reusableNode = keyedNode[1]
      if (!keyed[reusableNode.props.key]) {
        removeElement(element, keyedNode[0])
      }
    })
  } else if (element && node !== element.nodeValue) {
    if (typeof node === "string" && typeof oldNode === "string") {
      element.nodeValue = node
    } else {
      element = container.insertBefore(
        createElement(node, svg),
        (nextSibling = element)
      )
      removeElement(container, nextSibling, oldNode.data)
    }
  }
  return element
}
