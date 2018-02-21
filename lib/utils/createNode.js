import {createElement} from './createElement'
import {setProps} from './setProps'

/**
 * @description Function to create an HTML or SVG node.
 * @param {object} node A virtual node object defining an element to be created.
 * @param {boolean} isSVG Whether the node is SVG or not.
 * @returns {Element}
 */
export function createNode(node, isSVG) {
  let element = (isSVG = isSVG || node.type === 'svg') 
    ? document.createElementNS("http://www.w3.org/2000/svg", node.type)
    : document.createElement(node.type)

  Object.keys(node.props).forEach(key => setProps(element, key, node.props[key]))
  node.children.map(child => element.appendChild(createElement(child, isSVG)))
  return element
}
