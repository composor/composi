/**
 * @description Function to get a node's key.
 * @param {object} node A virtual node.
 * @returns {string|number} key
 */
export function getKey(node) {
  if (node && node.props) {
    return node.props.key
  }
}
