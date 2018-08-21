import { patch, createElement } from './vdom'
import { vnodeFromElement } from './vnode'
import { FragmentError } from './utils'

/**
 * A function to create and inject a virtual node into the document. The node will be appended to the container. The first argument can be either a JSX tag or an h function. After mounting, use the render function and the element returned by mount to udate the DOM.
 * @example 
 * 
 * ```
 * // Insert Title tag into section:
 * const title = mount(<Title message='Hello World!'/>, 'section').
 * // Update the node with new prop value and reference to DOM from mount:
 * render(<Title message='New stuff'/>, title)
 ```
 * @typedef {import('./vnode').VNode} VNode
 * @param {Object | Function} tag A JSX tag or hyperscript function to render.
 * @param {Element | string} [container] The element into which the tag will be rendered.
 * @param {string | Element} [elementToHydrate] A server-rendered element to hydrate during initial load.
 * @return {VNode} The base element of the rendered tag.
 */
export function mount(tag, container, elementToHydrate) {
  if (typeof container === 'string')
    container = document.querySelector(container)
  if (!container) container = document.body
  const lifecycle = []
  if (Array.isArray(tag)) throw new FragmentError()

  if (elementToHydrate) {
    if (typeof elementToHydrate === 'string') {
      elementToHydrate = document.querySelector(elementToHydrate)
    }
    const nodeToRecycle = vnodeFromElement(elementToHydrate)
    patch(tag, nodeToRecycle, container)
  } else {
    const element = createElement(tag, lifecycle)
    container.appendChild(element)
    tag.element = element
  }
  tag.element['isMounted'] = true
  while (lifecycle.length > 0) lifecycle.pop()()
  return tag
}
