import {setProps} from './setProps'

/**
 * @description Function to convert hyperscript/JSX into DOM nodes.
 * @param {Function} node A node to create. This may be a hyperscript function or a JSX tag which gets converted to hyperscript during transpilation.
 * @param {boolean} isSVG Whether the node is SVG or not.
 * @returns {HTMLElement}.
 */
export function createElement(node, isSVG) {
  const element =
    typeof node === "string" || typeof node === "number"
      ? document.createTextNode(node)
      : (isSVG = isSVG || node.type === "svg")
        ? document.createElementNS("http://www.w3.org/2000/svg", node.type)
        : document.createElement(node.type)

  const props = node.props
  if (props) {

    for (let i = 0; i < node.children.length; i++) {
      element.appendChild(createElement(node.children[i], isSVG))
    }

    for (let prop in props) {
      setProps(element, prop, props[prop], null, isSVG)
    }
  }

  return element
}
