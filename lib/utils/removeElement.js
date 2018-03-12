import {removeChildren} from './removeChildren'

/**
 * @description Function to remove element from DOM.
 * @param {HTMLElement} parent The containing element in which the component resides.
 * @param {HTMLElement} element The parent of the element to remove.
 * @param {HTMLElement} node The element to remove.
 * @returns {undefined} void.
 */
export const removeElement = (parent, element, node) => parent.removeChild(removeChildren(element, node))
