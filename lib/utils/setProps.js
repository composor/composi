import {mixin} from './mixin'

/**
 * @description Function to set properties and attributes on element.
 * @param {HTMLElement} element The element to set props on.
 * @param {string} prop The property/attribute.
 * @param {string|number|boolean} value The value of the prop.
 * @param {string|number|boolean} oldValue The original value of the prop.
 * @param {boolean} isSVG Whether this is SVG or not
 * @returns {undefined} void.
 */
export function setProps(
    element, 
    prop, 
    value, 
    oldValue, 
    isSVG
  ) {
  if (prop === "key") {
  } else if (prop === "style" && typeof value !== 'string') {
    for (let i in mixin(oldValue, value)) {
      element[prop][i] = value == null || value[i] == null ? "" : value[i]
    }
  } else {
    // Allow setting innerHTML:
    if (prop === 'dangerouslySetInnerHTML') {
      element.innerHTML = value
    }
      
    if (
      typeof value === "function" ||
      (prop in element && prop !== "list" && !isSVG)
    ) {
      element[prop] = value == null ? "" : value
    
    } else if (value != null && value !== false) {
      // Support SVG 'xlink:href' property:
      if (prop === 'xlink-href') {
        element.setAttributeNS('http://www.w3.org/1999/xlink', 'href', value)
        element.setAttribute('href', value)
      } else {
        element.setAttribute(prop, value)
      }
    }

    if (value == null || value === false) {
      element.removeAttribute(prop)
    }
  }
}
