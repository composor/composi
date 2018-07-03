import { mixin } from '../../mixin'

/**
 * Handle styles defined as object literals.
 * @param {Node} element
 * @param {string} prop
 * @param {any} value
 * @param {any} oldValue
 * @return {void} undefined
 */
export function handleStyles(element, prop, value, oldValue) {
  for (let i in mixin(oldValue, value)) {
    const style = value == null || value[i] == null ? '' : value[i]
    if (i[0] === '-') {
      element[prop].setProperty(i, style)
    } else {
      element[prop][i] = style
    }
  }
}
