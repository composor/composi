import { createElement } from '../patchElementHelpers/createElement'
import { removeElement} from '../patchElementHelpers/removeElement'

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
  element = /** @type {Element} */(newElement)
  return element
}
