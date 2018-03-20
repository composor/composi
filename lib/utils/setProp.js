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
export function setProp(
    element, 
    prop, 
    value, 
    oldValue, 
    isSVG
  ) {
  if (prop === 'key') {
  } else if (prop === 'style' && typeof value !== 'string') {
    for (let i in mixin(oldValue, value)) {
      const style = value == null || value[i] == null ? '' : value[i]
      if (i[0] === '-') {
        element[prop].setProperty(i, style)
      } else {
        element[prop][i] = style
      }
    }
  } else {

    // Handle cases where 'className' is used:
    if (prop === 'className') prop = 'class'

    // Allow setting innerHTML:
    if (prop === 'dangerouslySetInnerHTML') element.innerHTML = value

    // Handle inline events.
    // If they are camel case, convert to lowercase:
    if (prop[0] == 'o' && prop[1] == 'n') {
      prop = prop.toLowerCase()
    }

    if (prop in element && prop !== 'list' && !isSVG) {
      element[prop] = value == (null || 'no') ? '' : value
    } else if (value != null && value !== false && value !== 'no') {
      
      // Support SVG 'xlink:href' property:
      if (prop === 'xlink-href') {
        element.setAttributeNS('http://www.w3.org/1999/xlink', 'href', value)
        element.setAttribute('href', value)
      } else {
        if (value === 'true') value = true
        element.setAttribute(prop, value)
      }
    }

    if (value == null || value === false || value === 'false') {
      element.removeAttribute(prop)
    }
  }
}
