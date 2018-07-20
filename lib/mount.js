import { patch } from './vdom'
import { FragmentError } from './utils'

/**
 * A function to create and inject a virtual node into the document. The node will be appended to the container. The first argument can be either a JSX tag or an h function. After mounting, use the render function and the element returned by mount to udate the DOM.
 * @example Insert Title tag into section:
 * const title = mount(<Title message='Hello World!'/>, 'section').
 * // Update the node with new prop value and reference to DOM from mount:
 * render(<Title message='New stuff'/>, title)
 * @param {Object | Function} tag A JSX tag or hyperscript function to render.
 * @param {Node | string} [container] The element into which the tag will be rendered.
 * @param {HTMLElement} [elementToHydrate] A server-rendered element to hydrate during initial load.
 * @return {Node} The base element of the rendered tag.
 */
export const mount = (tag, container, elementToHydrate) => {
  container = typeof container === 'string' && document.querySelector(container)
  if (!container) container = document.body
  if (Array.isArray(tag)) throw new FragmentError()
  const element = patch(tag)
  if (tag.props && tag.props.onComponentDidMount) {
    tag.props.onComponentDidMount.call(tag.props.onComponentDidMount, element)
  }

  element['mounted'] = true
  if (elementToHydrate) {
    if (typeof elementToHydrate === 'string') {
      elementToHydrate = document.querySelector(elementToHydrate)
    }
    if (elementToHydrate.nextElementSibling) {
      elementToHydrate.parentNode.insertBefore(
        element,
        elementToHydrate.nextElementSibling
      )
      elementToHydrate.parentNode.removeChild(elementToHydrate)
      return element
    } else {
      elementToHydrate.parentNode.appendChild(element)
      elementToHydrate.parentNode.removeChild(elementToHydrate)
      return element
    }
  } else {
    return container.appendChild(element)
  }
}
