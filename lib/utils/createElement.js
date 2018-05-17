import { setProp } from './setProp'

/**
 * @description Function to convert hyperscript/JSX into DOM nodes.
 * @param {Object | string} node A node to create. This may be a hyperscript function or a JSX tag which gets converted to hyperscript during transpilation.
 * @param {boolean} [isSVG] Whether the node is SVG or not.
 * @returns {Node} An element created from a virtual dom object.
 */
export function createElement(node, isSVG) {
  let element
  if (typeof node === 'number') node = node.toString()
  if (typeof node === 'string') {
    element = document.createTextNode(node)
  } else if ((isSVG = isSVG || node.type === 'svg')) {
    element = document.createElementNS('http://www.w3.org/2000/svg', node.type)
  } else {
    element = document.createElement(node.type)
  }
  /**
   * @property {Object} node.props A virtual node stored on the node.
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
