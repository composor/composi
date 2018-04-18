import { patch } from './patch'

/**
 * Function to throw error message when attempting to insert Fragement tag directly into DOM.
 */
function FragmentError() {
  this.message = 'Cannot insert Fragment tag directly into DOM.'
  this.toString = function() {
    return this.message
  }
}

/**
 * @description A function to create and inject a virtual node into the document. The node will be appended to the container. The first argument can be either a JSX tag or an h function. After mounting, use the render function and the element returned by mount to udate the DOM.
 * @example Insert Title tag into section:
 * const title = mount(<Title message='Hello World!'/>, 'section').
 * // Update the node with new prop value and reference to DOM from mount:
 * render(<Title message='New stuff'/>, title)
 * @param {function} tag A JSX tag or hyperscript function to render.
 * @param {HTMLElement|boolean} [container] The element into which the tag will be rendered.
 * @returns {HTMLElement} The base element of the rendered tag.
 */
export const mount = (tag, container) => {
  container = typeof container === 'string' && document.querySelector(container)
  if (!container) container = document.body
  if (Array.isArray(tag)) throw new FragmentError()
  const element = patch(tag)
  if (tag.props && tag.props['onComponentDidMount']) {
    tag.props['onComponentDidMount'].call(
      tag.props['onComponentDidMount'],
      element
    )
  }
  element.mounted = true
  return container.appendChild(element)
}
