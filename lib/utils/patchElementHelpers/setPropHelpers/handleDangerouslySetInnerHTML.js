/**
 * @description Enable setting innerHTML as a prop.
 * @param {Node} element
 * @param {string} prop
 * @param {*} value
 * @returns {void} undefined
 */
export function handleDangerouslySetInnerHTML(element, prop, value) {
  if (prop === 'dangerouslysetinnerhtml') {
    /** @type {Element} */ (element).innerHTML = value
  }
}
