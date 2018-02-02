import {patch} from './patch'
import {h} from './h'

// Keep tract of rendered nodes.
/**
 * @description Object literal to keep tract of rendered nodes.
 * @attribute {Element} container The element in which the component is rendered.
 * @attribute {Element} element The root element of the component tree.
 * @attribute {object} oldNode A VNode (virtual node in object literal format) defining the last render of the component.
 */
const watchedNodes = {
  container: undefined,
  element: undefined,
  oldNode: undefined
}

/**
 * @description A function to create and inject a virtual node into the document. On the first render, the node will be appended to the container. After that, each subsequential render will patch and update the DOM. The first argument can be either a JSX tag or an h function.
 * 
 * @param {function} tag A JSX tag or hyperscript function to render.
 * @param {Element|boolean} [container] The element into which the tag will be rendered.
 * @returns {undefined} void
 */
export const render = (tag, container) => {
  if (typeof container === 'string') container = document.querySelector(container)
  
  // First time rendering.
  if (watchedNodes.container !== container) {
    watchedNodes.container = container
    watchedNodes.element = undefined
    watchedNodes.oldNode = undefined
  }
  
  watchedNodes.element = patch(
    watchedNodes.oldNode,
    (watchedNodes.oldNode = tag),
    watchedNodes.element,
    container
  )
}
