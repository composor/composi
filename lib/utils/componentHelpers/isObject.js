/**
 * @description A function to test where something is an object literal or not. Used by Component setState.
 * @param {Object} obj An object literal to test.
 * @returns boolean
 */
export function isObject(obj) {
  if (Array.isArray(obj)) return false
  else if (typeof obj === 'object') return true
  else return false
}
