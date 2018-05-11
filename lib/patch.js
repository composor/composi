import { patchElement } from './utils/patchElement'

/**
 * @description A function to patch a virtual node agains a DOM element, updating it in the most efficient manner possible.
 * @param {Object} node A virtual node. This may be a JSX tag or a hyperscript function.
 * @param {HTMLElement} element The element to patch.
 * @returns {HTMLElement} The updated element.
 */
export function patch(node, element) {
  if (element) {
    patchElement(element.parentNode, element, element && element.node, node)
  } else {
    element = patchElement(null, null, null, node)
  }

  element.node = node

  return element
}
