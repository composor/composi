/**
 * @description A function to recycle/reuse DOM elements when updating existing elements.
 * @param {HTMLElement} element
 * @returns {Object} A virtual node of a recyclable element.
 */
export function recycleElement(element) {
  if (element && element.nodeName) {
    return {
      type: element.nodeName.toLowerCase(),
      props: {},
      children: Array.prototype.map.call(
        element.children,
        element =>
          element.nodeType === 3 ? element.nodeValue : recycleElement(element)
      )
    }
  }
}
