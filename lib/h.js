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
export function h(type, props, ...children) {
  const nodes = []
  const childNodes = []
  let length = children.length

  while (length-- > 0) nodes.push(children[length])

  while (nodes.length) {
    const node = nodes.pop()
    if (node && node.pop) {
      for (length = node.length; length--; ) {
        nodes.push(node[length])
      }
    } else if (node != null && node !== true && node !== false) {
      childNodes.push(node)
    }
  }

  if (typeof type === "function") {
    return type(props || {}, children)
  } else {
    return {
      type,
      props: props || {},
      children: childNodes
    }
  }
}
