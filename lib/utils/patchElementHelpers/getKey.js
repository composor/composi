/**
 * @typedef {import('../../h').VNode} VNode
 */
/**
 * Function to get a node's key.
 * @param {VNode} node A virtual node.
 * @return {string | number | null} key.
 */
export const getKey = node => (node ? node.key : null)
