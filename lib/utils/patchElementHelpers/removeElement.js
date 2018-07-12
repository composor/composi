import { removeChildren } from './removeChildren'

/**
 * Function to remove element from DOM.
 * @param {Node} parent The containing element in which the component resides.
 * @param {Node} element The parent of the element to remove.
 * @param {Element} node The element to remove.
 * @return {void} undefined
 */
export const removeElement = (parent, element, node) => {
  parent.removeChild(removeChildren(element, node))
  if (
    node && 
    node['props'] && 
    node['props'].onComponentDidUnmount
  ) {
    node['props'].onComponentDidUnmount.call(
      node['props'].onComponentDidUnmount,
      parent
    )
  }
}
