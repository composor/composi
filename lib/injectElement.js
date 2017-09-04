import {h, createElement} from './patch'
/**
 * 
 * @param {function} tag A JSX tag or hyperscript function to render.
 * @param {?Element|boolean} root The element into which the tag will be rendered.
 * @param {?boolean} replace Whether to append to or replace the root content.
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
