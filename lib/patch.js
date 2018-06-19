import { patchElement } from './utils/patchElement'

/**
 * @description A function to patch a virtual node against a DOM element, updating it in the most efficient manner possible.
 * @param {() => import('./h').VNode} node A function that returns a virtual node. This may be a JSX tag, which gets converted into a function, or a hyperscript function.
 * @param {Node} [element] The element to patch.
 * @returns {Node} The updated element.
 */
export function patch(node, element) {
  if (element) {
    // @ts-ignore
    patchElement(element.parentNode, element, element && element.vnode, node)
  } else {
    element = patchElement(null, null, null, node)
  }
  // @ts-ignore
  element.vnode = node

  return element
}
