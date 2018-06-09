/**
 * @description Enable setting xlink href value for browser that only support SVG 1.0.
 * @param {HTMLElement} element
 * @param {string} prop
 * @param {string | number | boolean | any[] | Object} value
 * @returns {void} undefined
 */
export function handleXlinkHref(element, prop, value) {
  element.setAttributeNS('http://www.w3.org/1999/xlink', 'href', value)
  element.setAttribute('href', value)
}
