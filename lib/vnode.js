/**
 * @typedef {string | Function} Type
 */
/**
 * @typedef {Object.<string, any> | {}} Props
 * @property {Children} Props#children
 */
/**
 * @typedef {number | string | null} Key
 */
/**
 * @typedef {Object.<string, any>} VNode
 * @property {string | Function} type
 * @property {Props} props
 * @property {Children} children
 * @property {Key} key
 */
/**
 * @typedef {VNode[]} Children
 */
/**
 * @param {Type} type
 * @param {Props} [props]
 * @param {Children} [children]
 * @param {Key} [key]
 * @return {VNode} VNode
 */
export function createVNode(type, props, children, key) {
  return {
    type,
    props,
    children,
    key
  }
}
