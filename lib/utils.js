/**
 * Used to determine if a vnode should be recycled.
 * @type {number}
 */
export const RECYCLED_NODE = 0

/**
 * Used in a vnode to indicate that it is a DOM node.
 * @type {number}
 */
export const ELEMENT_NODE = 1

/**
 * Used in a vnode to indicate that it is a text node.
 * @type {number}
 */
export const TEXT_NODE = 3

/**
 * Namespace for SVG elements with `xlink:href` attributes.
 * @type {string}
 */
export const XLINK_NS = 'http://www.w3.org/1999/xlink'

/**
 * Namespace for SVG elements.
 * @type {string}
 */
export const SVG_NS = 'http://www.w3.org/2000/svg'

/**
 * An empty object. Used as placeholder for `props` in VNode.
 * @type {{}} EMPTY_OBJECT
 */
export const EMPTY_OBJECT = {}

/**
 * An empty array. Used for access to array methods.
 * @type {any[]} EMPTY_ARRAY
 */
export const EMPTY_ARRAY = []

/**
 * Combine two objects, merging the second into the first. Any properties already existing in the first will be replaced by those of the second. Any properties in the second not in the first will be added to it.
 * @param {Object.<string, any>} firstObject
 * @param {Object.<string, any>} secondObject
 * @return {Object.<string, any>} target
 */
export function merge(firstObject, secondObject) {
  const target = {}

  for (let i in firstObject) target[i] = firstObject[i]
  for (let j in secondObject) target[j] = secondObject[j]

  return target
}

/**
 * A function to test where something is an object literal or not. Used by Component setState.
 * @param {Object.<string, any>} obj An object literal to test.
 * @return {boolean} boolean
 */
export function isObject(obj) {
  if (Array.isArray(obj)) return false
  else if (typeof obj === 'object') return true
  return false
}

/**
 * A function to test whether the data provided for updating a component creates a new virtual node or not.
 * @typedef {import('./vnode').VNode} VNode
 * @param {VNode} oldVNode The previous virtual node of a component.
 * @param {VNode} newVNode The current virtual node of a component.
 * @return {boolean} boolean
 */
export function isSameVNode(oldVNode, newVNode) {
  return JSON.stringify(oldVNode) === JSON.stringify(newVNode)
}

/**
 * Class to throw error message when attempting to insert Fragement tag directly into DOM.
 * @return {string} message
 */
export class FragmentError {
  constructor() {
    this.message = 'Cannot insert Fragment tag directly into DOM.'
    this.toString = function() {
      return this.message
    }
  }
}

/**
 * Function to create an RFC4122 version 4 compliant uuid.
 * @return {string} string
 */
export function uuid() {
  var d = new Date().getTime()
  if (
    typeof performance !== 'undefined' &&
    typeof performance.now === 'function'
  ) {
    d += performance.now() //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}
