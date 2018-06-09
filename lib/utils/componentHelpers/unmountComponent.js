import { eventWhitelist } from './eventWhitelist'

/**
 * @description This function will unmount the provided component. Doing so it unregisters a whitelist of events, deletes the base element of the component from the DOM, and sets the component instance properties to null.
 * @param {*} component 
 */
export function unmountComponent(component) {
  if (!component.element) return
  component.componentWillUnmount && component.componentWillUnmount(component)
  eventWhitelist.map(event => {
    component.element.removeEventListener(event, component)
  })
  component.container.removeChild(component.element)
  component.container = undefined
  for (let key in component) {
    delete component[key]
  }
  delete component.state
  component.update = undefined
  component.unmount = undefined
}