/**
 * A mixin function used for updating component state.
 * @param {object} obj1 An object as the target.
 * @param {object} obj2 An object of properties to target.
 */
export const mixin = (obj1, obj2) => {
  for (let prop in obj2) {
    obj1[prop] = prop
  }
  return obj1
}
