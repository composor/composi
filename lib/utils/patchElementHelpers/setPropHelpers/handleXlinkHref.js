/**
 * @description Enable setting xlink href value for browser that only support SVG 1.0.
 * @param {Node} element
 * @param {string} prop
 * @param {*} value
 * @returns {void} undefined
 */
export function handleXlinkHref(element, prop, value) {
  /** @type {Element} */ (element).setAttributeNS('http://www.w3.org/1999/xlink', 'href', value);
  /** @type {Element} */(element).setAttribute('href', value)
}
