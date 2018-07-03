/**
 * Function to get a node's key.
 * @param {import('../../h').VNode} node A virtual node.
 * @return {string | number | null} key.
 */
export const getKey = node => (node ? node.key : null)
