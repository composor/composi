/**
 * @description Hyperscript function. Enables definition of HTML/SVG using functions.
 * @param {string} type - The name of the HTML or SVG tag to create.
 * @param {object} props - And object of property/value pairs.
 * @param {string|number|boolean|any[]} args - Any child elements.
 * @returns {object} A virtual node describing an element.
 * @example Virtual node with string as content:
 * const title = h('h1', {class: 'main-title'}, 'This is the Titel!')
 * @example Virtual node with children:
 * const list = h(
 *   'ul',
 *   {class: 'list'},
 *   [
 *     h('li', {}, 'One'),
 *     h('li', {}, 'Two'),
 *     h('li', {}, 'Three')
 *   ]
 * )
 */
export function h(type, props, ...args) {
  let node
  const children = []

  // Go thru args from front to back.
  while (args.length) {
    // If child is array, process.
    if (Array.isArray((node = args.shift()))) {
      node.map(item => args.push(item))
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
