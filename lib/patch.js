import { patchElement } from './utils/patchElement'
/**
 * @typedef {import('./h').VNode} VNode
 */

/**
 * A function to patch a virtual node against a DOM element, updating it in the most efficient manner possible.
 * @param {() => VNode} node A function that returns a virtual node. This may be a JSX tag, which gets converted into a function, or a hyperscript function.
 * @param {Node} [element] The element to patch.
 * @return {Node} The updated element.
 */
export function patch(node, element) {
  if (element) {
    patchElement(
      element.parentNode,
      /** @type{Element} */ (element),
      element && element['vnode'],
      node
    )
  } else {
    element = patchElement(null, null, null, node)
  }

  element['vnode'] = node

  return element
}
