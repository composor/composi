/**
 * @description A virtual node defining a node to be created. This gets returns by the h function.
 * @typedef {Object} VNode
 * @prop {string} type The node to create, such as "h1", "p", "div", etc.
 * @prop {Object} [props] An object of key/value pairs defining properties and values for the node. These include properties such as "class", "id", "disabled", etc.
 * @prop {Array.<VNode> | null} [children] An array of children belonging to the node.
 * @prop {string | number | undefined} [key] A unique key to identify a node.
 */
/**
 * @description Hyperscript function. Enables definition of HTML/SVG using functions.
 * @param {string | Function} type The name of the HTML or SVG tag to create or a function using an HTML tag name.
 * @param {Object} [props] An object of property/value pairs.
 * @param {<Array>.VNode} [children] Any child elements.
 * @returns {VNode} A virtual node describing an element.
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
  let key

  while (length-- > 0) nodes.push(children[length])

  if (props && props.key) {
    // Assign by value:
    key = props.key
    // Remove duplicate from attributes:
    delete props.key
  }

  while (nodes.length) {
    const node = nodes.pop()
    if (node && node['pop']) {
      for (length = node.length; length--; ) {
        nodes.push(node[length])
      }
    } else if (node != null && node !== true && node !== false) {
      childNodes.push(node)
    }
  }

  if (typeof type === 'function') {
    return type(props || {}, childNodes)
  } else {
    return {
      type,
      props: props || {},
      children: childNodes,
      key
    }
  }
}
