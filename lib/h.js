/**
 * Hyperscript function. Enables definition of HTML/SVG using functions.
 * @param {string} type The name of the HTML or SVG tag to create.
 * @param {object} props And object of property/value pairs.
 * @param {string, number, boolean, any[]} children Any child elements.
 */
export function h(type, props, ...args) {
  let stack = [], node
  const children = []
  stack = stack.concat(args.reverse())

  while (stack.length) {
    if (Array.isArray((node = stack.pop()))) {
      node.map(item => stack.unshift(item))
    } else if (node != null && node !== true && node !== false) {
      typeof node === "number" ? node = node + '' : node
      children.push(node)
    }
  }
  
  return typeof type === "string" 
    ? {type, props: props || {}, children } 
    : type(props || {}, children)
}
