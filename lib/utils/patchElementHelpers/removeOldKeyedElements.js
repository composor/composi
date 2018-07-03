import { removeElement } from '../patchElementHelpers/removeElement'

/**
 * Remove old keyed elements.
 * @param {Node} element 
 * @param {Object.<string, any>} oldKeyed
 * @param {Object.<string, any>} newKeyed
 * @return {void} undefined
 */
export function removeOldKeyedElements(element, oldKeyed, newKeyed) {
  for (let k in oldKeyed) {
    if (!newKeyed[k]) {
      removeElement(element, oldKeyed[k][0], oldKeyed[k][1])
    }
  }
}
