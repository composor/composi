import { mixin } from '../mixin'
/**
 * @description Handle styles defined as object literals.
 * @param {HTMLElement} element
 * @param {string} prop
 * @param {string | number | boolean | any[] | Object} value
 * @param {string | number | boolean | any[] | Object} oldValue
 * @returns {void} undefined
 */
export function handleStyles(element, prop, value, oldValue) {
  for (let i in mixin(oldValue, value)) {
    const style = value == null || value[i] == null ? '' : value[i];
    if (i[0] === '-') {
      element[prop].setProperty(i, style);
    } else {
      element[prop][i] = style;
    }
  }
}
