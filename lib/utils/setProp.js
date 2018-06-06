import { handleStyles } from './setPropHelpers/handleStyles'
import { handleClassName } from './setPropHelpers/handleClassName'
import { handleDangerouslySetInnerHTML } from './setPropHelpers/handleDangerouslySetInnerHTML'
import { handleXlinkHref } from './setPropHelpers/handleXlinkHref'

/**
 * @description Function to set properties and attributes on element.
 * @param {HTMLElement} element The element to set props on.
 * @param {string} prop The property/attribute.
 * @param {string} value The value of the prop.
 * @param {string} oldValue The original value of the prop.
 * @param {boolean} isSVG Whether this is SVG or not
 * @returns {void} undefined
 */
export function setProp(element, prop, value, oldValue, isSVG) {
  // Do not add these as node attributes:
  if (
    prop === 'key' ||
    prop === 'onComponentDidMount' ||
    prop === 'onComponentDidUpdate' ||
    prop === 'onComponentWillUnmount'
  ) {
    return
  } else if (prop === 'style' && typeof value !== 'string') {
    handleStyles(element, prop, value, oldValue)
  } else {
    // Convert camel case props to lower case:
    prop = prop.toLowerCase()

    // Handle cases where 'className' is used:
    prop = handleClassName(prop)

    // Allow setting innerHTML:
    handleDangerouslySetInnerHTML(element, prop, value)

    if (prop in element && prop !== 'list' && !isSVG) {
      element[prop] = value == (null || 'no') ? '' : value
    } else if (
      value != null &&
      value !== 'null' &&
      value !== 'false' &&
      value !== 'no' &&
      value !== 'off'
    ) {
      // Support SVG 'xlink:href' property:
      if (prop === 'xlink-href') {
        handleXlinkHref(element, prop, value)
      } else {
        if (value === 'true') value = ''
        // Set prop as attribute, except dangerouslySetInnerHTML:
        if (prop !== 'dangerouslysetinnerhtml')
          element.setAttribute(prop, value)
      }
    }

    if (
      value == null ||
      value === 'null' ||
      value === 'undefined' ||
      value === 'false' ||
      value === 'no' ||
      value === 'off'
    ) {
      element.removeAttribute(prop)
    }
  }
}
