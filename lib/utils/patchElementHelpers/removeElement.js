import { removeChildren } from './removeChildren'

/**
 * Function to remove element from DOM.
 * @param {Node} parent The containing element in which the component resides.
 * @param {Node} element The parent of the element to remove.
 * @param {Node} node The element to remove.
 * @return {void} undefined
 */
export const removeElement = (parent, element, node) => {
  parent.removeChild(removeChildren(element, node))
  if (node && /** @type {Object.<string, any>}*/(node).props && /** @type {Object.<string, any>}*/(node).props.onComponentDidUnmount) {
    /** @type {Object.<string, any>}*/(node).props.onComponentDidUnmount.call(
      /** @type {Object.<string, any>}*/(node).props.onComponentDidUnmount,
      parent
    )
  }
}
