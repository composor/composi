import { getKey } from '../patchElementHelpers/getKey'
/**
 * @typedef {import('../../h').VNode} VNode
 */
/**
 * Update values for old element and key.
 * @param {Node} element 
 * @param {Node[]} oldElements
 * @param {VNode[]} oldChildren
 * @param {Object.<string, any>} oldKeyed 
 * @return {void} undefined
 */
export function trackOldElements(element, oldElements, oldChildren, oldKeyed) {
  for (let i = 0; i < oldChildren.length; i++) {
    oldElements[i] = element.childNodes[i]

    const oldKey = getKey(oldChildren[i])
    if (oldKey != null) {
      oldKeyed[oldKey] = [oldElements[i], oldChildren[i]]
    }
  }
}
