/**
 * @description A function to merge two objects together. The properties of the second object will overwrite any matching properties in the first object.
 * @param {object} obj1 The first object to merge.
 * @param {object} obj2 The second object to merge.
 * @returns {object} Returns a new object of the second object merged with the first.
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
