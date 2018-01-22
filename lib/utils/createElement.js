import {createNode} from './createNode'

/**
 * @description Function to convert hyperscript/JSX into DOM nodes.
 * @param {Function} node A node to create. This may be a hyperscript function or a JSX tag which gets converted to hyperscript during transpilation.
 * @param {boolean} isSVG Whether the node is SVG or not.
 * @returns {Element} 
 */
export function createElement(node, isSVG) {
  return typeof node === "string" ? document.createTextNode(node) : createNode(node, isSVG)
}
