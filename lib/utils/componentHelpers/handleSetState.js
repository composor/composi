import { mixin } from '../mixin'
import { isObject } from '../componentHelpers/isObject'

/**
 * @typedef {import('../../component').Component} Component
 */
/**
 * A helper function for the Component class. This sets state on the class component provided.
 * @param {*} data Data to use as state.
 * @param {Component} component A reference to the component to use.
 * @return {void} undefined
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