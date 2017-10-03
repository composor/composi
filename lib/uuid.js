/**
 * Creates a universally unique identifier (uuid).
 * 
 * @param {boolean} [param] Any truthy value. If true, uuid with have hyphens included.
 */
export const uuid = (param) => {
  const numbers = param ? '' + 1e7 + -1e3 + -4e3 + -1e3 + -1e11 : '' + 1e7 + 1e3 + 4e3 + 8e3 + 1e11
  let d = Date.now()
  return (numbers).replace(/1|0/g, () => (0 | (d + Math.random() * 16) % 16).toString(16))
}
