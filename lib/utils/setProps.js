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
    /// Handle cases where inline event is camel cased:
    if (name[0]=='o' && name[1]=='n') name = name.toLowerCase()
    if (name === 'dangerouslySetInnerHTML') {
      element.innerHTML = value
      return
    }
    // Cannot set SVG properties this way, so test:
    if (element.namespaceURI !== 'http://www.w3.org/2000/svg') element[name] = value

    // In case of inline events, value would be function.
    // This avoids resetting them if they were set above as a property.
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
