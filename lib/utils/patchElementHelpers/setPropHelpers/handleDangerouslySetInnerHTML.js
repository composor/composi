/**
 * Enable setting innerHTML as a prop.
 * @param {Element} element
 * @param {string} prop
 * @param {*} value
 * @return {void} undefined
 */
export function handleDangerouslySetInnerHTML(element, prop, value) {
  if (prop === 'dangerouslysetinnerhtml') {
    element.innerHTML = value
  }
}
