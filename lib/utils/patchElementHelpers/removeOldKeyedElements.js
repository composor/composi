import { removeElement } from '../patchElementHelpers/removeElement'

/**
 * @description Remove old keyed elements.
 * @param {Node} element 
 * @param {Object} oldKeyed 
 * @param {Object} newKeyed 
 * @returns {void} undefined
 */
export function removeOldKeyedElements(element, oldKeyed, newKeyed) {
  for (let k in oldKeyed) {
    if (!newKeyed[k]) {
      removeElement(element, oldKeyed[k][0], oldKeyed[k][1])
    }
  }
}
