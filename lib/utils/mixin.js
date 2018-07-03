/**
 * A function to merge two objects together. The properties of the second object will overwrite any matching properties in the first object.
 * @param {Object.<string, any>} obj1 The first object to merge.
 * @param {Object.<string, any>} obj2 The second object to merge.
 * @return {Object.<string, any>} Returns a new object of the second object merged with the first.
 */
export function mixin(obj1, obj2) {
  const result = {}
  for (let i in obj1) {
    result[i] = obj1[i]
  }
  for (let i in obj2) {
    result[i] = obj2[i]
  }
  return result
}
