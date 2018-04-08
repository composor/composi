import {patchElement} from './utils/patchElement'
import {recycleElement} from './utils/recycleElement'

/**
 * @description A function to patch a virtual node agains a DOM element, updating it in the most efficient manner possible.
 * @param {object} node A virtual node. This may be a JSX tag or a hyperscript function.
 * @param {HTMLElement} element The element to patch.
 * @returns {HTMLElement} The updated element.
 */
export function patch(node, element) {
  
  if (element) {
    patchElement(
      element.parentNode,
      element,
      element.node == null 
        ? recycleElement(element, [].map) 
        : element.node,
      node,
      element.node == null
    )
  } else {
    element = patchElement(
      null, 
      null, 
      null, 
      node
    )
  }

  element.node = node

  return element
}
