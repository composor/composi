/**
 * @description Enable setting innerHTML as a prop.
 * @param {Node} element
 * @param {string} prop
 * @param {string | number | boolean | any[] | Object} value
 * @returns {void} undefined
 */
export function handleDangerouslySetInnerHTML(element, prop, value) {
  if (prop === 'dangerouslysetinnerhtml') {
    element['innerHTML'] = value
  }
}
