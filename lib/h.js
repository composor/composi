/**
 * Hyperscript function. Enables definition of HTML/SVG using functions.
 * @param {string} type The name of the HTML or SVG tag to create.
 * @param {object} props And object of property/value pairs.
 * @param {string, number, boolean, any[]} children Any child elements.
 */
export function h(type, props, ...args) {
  let stack = [], node
  const children = []
  stack = stack.concat(args)

  // Got thru stack from front.
  while (stack.length) {
    // If child is array, process.
    if (Array.isArray((node = stack.shift()))) {
      node.map(item => stack.push(item))
    // Else check if child is string or number.
    } else if (node != null && typeof node !== 'boolean') {
      typeof node === "number" ? node = node + '' : node
      children.push(node)
    }
  }
  
  return typeof type === "string" 
    ? {type, props: props || {}, children } 
    : type(props || {}, children)
}
