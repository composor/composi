import { getKey } from './getKey'
import { createElement } from './createElement'
import { updateElement } from './updateElement'
import { removeElement } from './removeElement'

/**
 * @description A function to diff and patch a DOM node with a virtual node.
 * @param {HTMLElement} parent The parent node of the elment being patched.
 * @param {HTMLElement} element The element being patched.
 * @param {Object} oldNode A virtual dom node from the previous patch.
 * @param {Object} node The current virtual dom node.
 * @param {boolean} isSVG Whether we are dealing with an SVG element or not.
 * @returns element The patched element.
 */
export function patchElement(parent, element, oldNode, node, isSVG) {
  if (node === oldNode) {
    return
  } else if (oldNode == null || oldNode.type !== node.type) {
    const newElement = createElement(node, isSVG)
    if (parent) {
      parent.insertBefore(newElement, element)
      if (oldNode != null) {
        removeElement(parent, element, oldNode)
      }
    }
    element = newElement
  } else if (oldNode.type == null) {
    element.nodeValue = node
  } else {
    updateElement(
      element,
      oldNode.props,
      node.props,
      (isSVG = isSVG || node.type === 'svg')
    )

    const oldKeyed = {}
    const newKeyed = {}
    const oldElements = []
    const oldChildren = oldNode.children
    const children = node.children

    for (let i = 0; i < oldChildren.length; i++) {
      oldElements[i] = element.childNodes[i]

      const oldKey = getKey(oldChildren[i])
      if (oldKey != null) {
        oldKeyed[oldKey] = [oldElements[i], oldChildren[i]]
      }
    }

    let i = 0
    let k = 0

    while (k < children.length) {
      let oldKey = getKey(oldChildren[i])
      let newKey = getKey(children[k])

      if (newKeyed[oldKey]) {
        i++
        continue
      }

      if (newKey != null && newKey === getKey(oldChildren[i + 1])) {
        if (oldKey == null) {
          removeElement(element, oldElements[i], oldChildren[i])
        }
        i++
        continue
      }

      if (newKey == null) {
        if (oldKey == null) {
          patchElement(
            element,
            oldElements[i],
            oldChildren[i],
            children[k],
            isSVG
          )
          k++
        }
        i++
      } else {
        const keyedNode = oldKeyed[newKey] || []

        if (oldKey === newKey) {
          patchElement(element, keyedNode[0], keyedNode[1], children[k], isSVG)
          i++
        } else if (keyedNode[0]) {
          patchElement(
            element,
            element.insertBefore(keyedNode[0], oldElements[i]),
            keyedNode[1],
            children[k],
            isSVG
          )
        } else {
          patchElement(element, oldElements[i], null, children[k], isSVG)
        }

        newKeyed[newKey] = children[k]
        k++
      }
    }

    while (i < oldChildren.length) {
      if (getKey(oldChildren[i]) == null) {
        removeElement(element, oldElements[i], oldChildren[i])
      }
      i++
    }

    for (let i in oldKeyed) {
      if (!newKeyed[i]) {
        removeElement(element, oldKeyed[i][0], oldKeyed[i][1])
      }
    }
  }
  return element
}
