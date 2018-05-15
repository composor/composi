import { removeChildren } from './removeChildren'

/**
 * @description Function to remove element from DOM.
 * @param {Node} parent The containing element in which the component resides.
 * @param {Node} element The parent of the element to remove.
 * @param {Node} node The element to remove.
 * @returns {void} undefined
 */
export const removeElement = (parent, element, node) => {
  parent.removeChild(removeChildren(element, node))
  if (node && node.props && node.props['onComponentDidUnmount']) {
    node.props['onComponentDidUnmount'].call(
      node.props['onComponentDidUnmount'],
      parent
    )
  }
}
