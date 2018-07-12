/**
 * Enable setting xlink href value for browser that only support SVG 1.0.
 * @param {Element} element
 * @param {string} prop
 * @param {*} value
 * @return {void} undefined
 */
export function handleXlinkHref(element, prop, value) {
  element.setAttributeNS('http://www.w3.org/1999/xlink', 'href', value);
  element.setAttribute('href', value)
}
