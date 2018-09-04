import { EMPTY_OBJECT, EMPTY_ARRAY, TEXT_NODE, RECYCLED_NODE } from './utils'
/**
 * @typedef {Object.<string, any> | {}} Props
 * @property {Children} Props.children
 */
/**
 * @typedef {VNode[]} Children
 */
/**
 * @typedef {string | number | Function} Type
 * @typedef {number | string | null} Key
 * @typedef {Object.<string, any>} VNode
 * @property {Type} VNode.type
 * @property {Props} VNode.props
 * @property {Children} VNode.children
 * @property {Element} VNode.element
 * @property {Key} [VNode.key]
 * @property {number} VNode.flag
 */
/**
 * Create a virtual node with the provided properties.
 * @param {string | Function} type
 * @param {Props} props
 * @param {Children} children
 * @param {Element} element
 * @param {string | number | null} key
 * @param {number} flag
 * @return {VNode} VNode
 */
export function createVNode(type, props, children, element, key, flag) {
  return {
    type,
    props,
    children,
    element,
    key,
    flag
  }
}

/**
 * Create a virtual text node.
 * @param {string} text
 * @param {Element} [element]
 * @return {VNode} VNode
 */
export function createTextVNode(text, element) {
  return createVNode(text, EMPTY_OBJECT, EMPTY_ARRAY, element, null, TEXT_NODE)
}

/**
 * Create a virtual node represeting an element and its children.
 * @param {Element} element
 * @return {VNode} VNode
 */
export function vnodeFromElement(element) {
  return createVNode(
    element.nodeName.toLowerCase(),
    EMPTY_OBJECT,
    EMPTY_ARRAY.map.call(element.childNodes, vnodeFromChild),
    element,
    null,
    RECYCLED_NODE
  )
}

/**
 * Cycle through the child nodes of an element and create virtual nodes of them.
 * @param {Element} element
 * @return {VNode}
 */
function vnodeFromChild(element) {
  if (element.nodeType === 3) {
    return createTextVNode(element.nodeValue, element)
  } else {
    return vnodeFromElement(element)
  }
}
