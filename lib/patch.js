import {getKey} from './utils/getKey'
import {createElement} from './utils/createElement'
import {updateElement} from './utils/updateElement'
import {removeElement} from './utils/removeElement'

/**
 * @description Function to diff and patch the DOM based on differences in virtual dom. 
 * @param {Object|undefined|null} oldNode Virtual node defining original node or null.
 * @param {object} newNode A virtual node defining the new node.
 * @param {Element|undefined} element The component root element.
 * @param {Element} container The container element in which component is rendered.
 * @returns {Element}
 */
export function patch(
    oldNode, 
    newNode, 
    element, 
    container
  ) {
  container = container ? container : document.body
  return diffAndPatch(
    container, 
    element, 
    oldNode, 
    newNode
  )
}

/**
 * @description Function to patch DOM. Diffs virtual nodes, then patches the DOM.
 * @param {Element} container 
 * @param {Element|undefined} element 
 * @param {object} oldNode 
 * @param {object} newNode 
 * @param {boolean} isSVG 
 * @param {object} nextSibling 
 * @returns {Element}
 */
function diffAndPatch(
    container, 
    element, 
    oldNode, 
    newNode, 
    isSVG, 
    nextSibling
  ) {
  // There is no oldNode, so this is first render.
  if (oldNode == null) {
    element = container.insertBefore(createElement(newNode, isSVG), element)
  // There's an oldNode, so patch.
  } else if (newNode.type != null && newNode.type === oldNode.type) {
    updateElement(
      element, 
      oldNode.props, 
      newNode.props
    )

    isSVG = isSVG || newNode.type === "svg"
    const len = newNode.children.length
    let oldLen = oldNode.children.length
    let oldKeyed = {}
    let oldElements = []
    let keyed = {}

    let k = 0
    while (k < oldLen) {
      let oldElement = (oldElements[k] = element.childNodes[k])
      let oldChild = oldNode.children[k]
      let oldKey = getKey(oldChild)
      if (null != oldKey) oldKeyed[oldKey] = [oldElement, oldChild]
      k++
    }

    let i = 0, j = 0
    while (j < len) {
      let oldElement = oldElements[i]
      let oldChild = oldNode.children[i]
      let newChild = newNode.children[j]
      let oldKey = getKey(oldChild)
      if (keyed[oldKey]) {
        i++
        continue
      }
      
      let newKey = getKey(newChild)
      let keyedNode = oldKeyed[newKey] || []
      if (null == newKey) {
        if (null == oldKey) {
          diffAndPatch(
            element, 
            oldElement, 
            oldChild, 
            newChild, 
            isSVG
          )
          j++
        }
        i++
        } else {
          if (oldKey === newKey) {
          diffAndPatch(
            element, 
            keyedNode[0], 
            keyedNode[1], 
            newChild, 
            isSVG
          ) && i++ 
        } else if (keyedNode[0]) {
          element.insertBefore(keyedNode[0], oldElement) 
          && diffAndPatch(
            element, 
            keyedNode[0], 
            keyedNode[1], 
            newChild, 
            isSVG
          ) 
        } else { 
          diffAndPatch(
            element, 
            oldElement, 
            null, 
            newChild, 
            isSVG
          )
        }
        
        keyed[newKey] = newChild
        j++
      }
    }

    while (i < oldLen) {
      let oldChild = oldNode.children[i]
      let oldKey = getKey(oldChild)
      if (null == oldKey) removeElement(element, oldElements[i])
      i++
    }

    Object.keys(oldKeyed).forEach(key => {
      let keyedNode = oldKeyed[key]
      let reusableNode = keyedNode[1]
      if (!keyed[reusableNode.props.key]) {
        removeElement(element, keyedNode[0])
      }
    })
  } else if (element && newNode !== element.nodeValue) {
    if (typeof newNode === "string" && typeof oldNode === "string") {
      element.nodeValue = newNode
    } else {
      element = container.insertBefore(
        createElement(newNode, isSVG),
        (nextSibling = element)
      )
      removeElement(container, nextSibling, oldNode.data)
    }
  }
  return element
}
