/**
 * @description Function to get a node's key.
 * @param {object} node A virtual node.
 * @returns {string|number} key.
 */
export const getKey = node => node && node.props ? node.props.key : null
