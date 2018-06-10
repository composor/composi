/**
 * @description Hyperscript function. Enables definition of HTML/SVG using functions.
 * @param {string | Function} type A tag name or function.
 * @param {Object} [props] An Object literal of key-value pairs.
 * @param {any[]} [children] An array of strings or other arrays.
 * @returns Object An object literal of type, props and children.
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
    if (node && node.pop) {
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
