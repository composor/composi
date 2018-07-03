/**
 * A function to test whether the data provided for updating a component creates a new virtual node or not.
 * @param {import('../../h').VNode} oldNode The previous virtual node of a component.
 * @param {*} data Data to be used when rendering a new virtual node for a component.
 * @param {import('../../component').Component} component A reference to the component being used.
 * @return {boolean} boolean
 */
export function isSameNode(oldNode, data, component) {
  if (
    component && JSON.stringify(oldNode) === JSON.stringify(component.render(data))
  ) {
    return true
  }
  return false
}
