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
