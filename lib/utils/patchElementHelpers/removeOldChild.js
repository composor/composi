import {removeElement} from '../patchElementHelpers/removeElement'
import {getKey} from '../patchElementHelpers/getKey'

/**
 * Function to remove oldChild element when patching.
 * @param {Node} element 
 * @param {any[]} oldChildren
 * @param {Node[]} oldElements
 * @param {number} i 
 * @returns {void} undefined
 */
export function removeOldChild(element, oldChildren, oldElements, i) {
  while (i < oldChildren.length) {
    if (getKey(oldChildren[i]) == null) {
      removeElement(element, oldElements[i], oldChildren[i])
    }
    i++
  } 
}
