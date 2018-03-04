import {h} from './h'
import {patch} from './patch'

/**
 * @description A function to update a functional component already mounted in the DOM. The first argument can be either a JSX tag or an h function.
 * @example Update Title tag into section: 
 * const element = mount(<Title message='Hello World!'/>, 'section')
 * // Pass the captured element to the render function:
 * render(<Title message='Hello Everyone!'/>, element)
 * @param {function} tag A JSX tag or hyperscript function to render.
 * @param {HTMLElement|boolean} [element] The element in the DOM which will be updated.
 * @returns {HTMLElement} The base element of the rendered tag.
 */
 export function render(tag, element) {
   return patch(tag, element)
 }
