/**
 * @description A function to remove the children of a node.
 * @param {HTMLElement} element The parent of the node whose children will be removed.
 * @param {HTMLElement} node The node whose children will be removed.
 * @returns {HTMLElement} element The parent of the removed nodes.
 */
export function removeChildren(element, node) {
  const props = node.props
  if (props) {
    for (let i = 0; i < node.children.length; i++) {
      removeChildren(element.childNodes[i], node.children[i])
    }
  }
  return element
}
