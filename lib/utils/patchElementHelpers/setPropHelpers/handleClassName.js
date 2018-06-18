/**
 * @description Handle converting 'className' to 'class'.
 * @param {string} prop
 * @returns {string} string
 */
export function handleClassName(prop) {
  if (prop === 'classname') {
    prop = 'class'
  }
  return prop
}
