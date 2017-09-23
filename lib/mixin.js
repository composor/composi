/**
 * A mixin function used for updating component state.
 * @param {object} obj1 An object as the target.
 * @param {object} obj2 An object of properties to target.
 */
export const mixin = (obj1, obj2) => {
  Object.keys(obj2).forEach(p => {
    if (obj2.hasOwnProperty(p)) {
      Object.defineProperty(obj1, p, {
        value: obj2[p],
        writable: true,
        enumerable: false,
        configurable: true
      })
    }
  })
}