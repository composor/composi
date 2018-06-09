import { removeElement } from '../patchElementHelpers/removeElement'

/**
 * @description Remove old keyed elements.
 * @param {Node} element 
 * @param {Object} oldKeyed 
 * @param {Object} newKeyed 
 * @returns {void} undefined
 */
export function removeOldKeyedElements(element, oldKeyed, newKeyed) {
  for (let i in oldKeyed) {
    if (!newKeyed[i]) {
      removeElement(element, oldKeyed[i][0], oldKeyed[i][1])
    }
  }
}
