import {mixin} from './mixin'

/**
 * @description Function to set properties and attributes on element.
 * @param {node} element 
 * @param {string} name 
 * @param {string|number|boolean} value 
 * @param {string|number|boolean} oldValue 
 * @returns void
 */
export function setProps(element, name, value, oldValue) {
  if (name === 'key') {
  } else if (name === 'style' && typeof value !== 'string') {
    for (let name in mixin(oldValue, (value = value || {}))) {
      element.style[name] = value[name] + "" || ''
    }
  } else {
    if (value === 0) value = value + ""

    // Handle cases where 'className' is used:
    if (name === 'className') name = 'class'

    // Handle inline events.
    // If they are camel case, convert to lowercase:
    if (name[0]=='o' && name[1]=='n') {
      name = name.toLowerCase()
    }

    // Allow setting innerHTML:
    if (name === 'dangerouslySetInnerHTML') element.innerHTML = value
  
    // Cannot set SVG properties this way, so test before setting property.
    // This line sets values for element properties, not attributes.
    // Attributes will get handled in the next block.
    if (element.namespaceURI !== 'http://www.w3.org/2000/svg') element[name] = value

    // Set element attributes.
    // Check that value is not a function.
    // This avoids resetting inline events.
    if (typeof value !== 'function') {
      if (!!value) {
        // Support SVG 'xlink:href' property:
        if (name === 'xlink-href') {
          element.setAttributeNS('http://www.w3.org/1999/xlink', 'href', value)
          element.setAttribute('href', value)
        } else {
          element.setAttribute(name, value)
        }
      } else {
        element.removeAttribute(name)
      }
    }
  }
}
