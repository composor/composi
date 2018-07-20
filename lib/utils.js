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
 * Combine two objects, merging the second into the first. Any properties already existing in the first will be replaced by those of the second. Any properties in the second not in the first will be added to it.
 * @param {Object.<string, any>} firstObject
 * @param {Object.<string, any>} secondObject
 * @return {Object.<string, any>} target
 */
export function mixin(firstObject, secondObject) {
  const target = {}

  for (let i in firstObject) target[i] = firstObject[i]
  for (let j in secondObject) target[j] = secondObject[j]

  return target
}

/**
 * A cross-browser normalization/polyfill for requestAnimationFrame.
 * @param {Function} cb A callback to execute.
 * @return {number} The request id, that uniquely identifies the entry in the browser's callback list.
 */
export const rAF =
  (window && window.requestAnimationFrame) ||
  (window && window['msRequestAnimationFrame']) ||
  function(cb) {
    return setTimeout(cb, 16)
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
 * @typedef {import('./vnode').VNode} VNode
 * @typedef {import('./component').Component} Component
 */
/**
 * A function to test whether the data provided for updating a component creates a new virtual node or not.
 * @param {VNode} oldNode The previous virtual node of a component.
 * @param {*} data Data to be used when rendering a new virtual node for a component.
 * @param {Component} component A reference to the component being used.
 * @return {boolean} boolean
 */
export function isSameNode(oldNode, data, component) {
  if (
    component &&
    JSON.stringify(oldNode) === JSON.stringify(component.render(data))
  ) {
    return true
  }
  return false
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
