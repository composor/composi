import {createElement} from './patch'

/**
 * A function to create and inject a virtual node into the document. If a third, truthy parameter is provided, it will replace the contents of the root with the new element tree. Otherwise it will append the element. The first argument can be either a JSX tag or an h function.
 * 
 * @param {function} tag A JSX tag or hyperscript function to render.
 * @param {Element|boolean} [root] The element into which the tag will be rendered.
 * @param {boolean} [replace] Whether to append to or replace the root content.
 */
export const injectElement = (tag, root, replace) => {
  if (typeof root === 'string') root = document.querySelector(root)
  if (!root || typeof root === 'boolean') {
    replace = root
    root = document.body
  }
  const element = createElement(tag)
  if (replace) root.textContent = ''
  root.append(element)
}
