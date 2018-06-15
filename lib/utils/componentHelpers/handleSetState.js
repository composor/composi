import { mixin } from '../mixin'
import { isObject } from '../componentHelpers/isObject'

/**
 * @function A helper function for the Component class. This sets state on the class component provided.
 * @param {*} data Data to use as state.
 * @param {import('../../component').Component} component A reference to the component to use.
 */
export function handleSetState(data, component) {
  if (typeof data === 'function') {
    const state = data.call(component, component.state)
    if (state) component.state = state
  } else if (isObject(component.state) && isObject(data)) {
    const state = component.state
    component.state = mixin(state, data)
  } else {
    component.state = data
  }
}