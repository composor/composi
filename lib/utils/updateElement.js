import {mixin} from './mixin'
import {setProps} from './setProps'

/**
 * @description Update an element with new values for properties and/or children.
 * @param {Element} element 
 * @param {node} oldProps 
 * @param {object} props 
 * @returns {undefined} void
 */
export function updateElement(element, oldProps, props) {
  Object.keys(mixin(oldProps, props)).forEach(key => {
    let value = props[key]
    let oldValue = key === "value" || key === "checked" ? element[key] : oldProps[key]
    if (value !== oldValue) setProps(element, key, value, oldValue)
  })
}
