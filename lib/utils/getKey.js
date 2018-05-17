/**
 * @description Function to get a node's key.
 * @param {Object} node A virtual node.
 * @returns {string | number | null} key.
 */
export const getKey = node => (node ? node.key : null)
