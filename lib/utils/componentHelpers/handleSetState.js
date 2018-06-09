import { mixin } from '../mixin'
import { isObject } from '../componentHelpers/isObject'

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