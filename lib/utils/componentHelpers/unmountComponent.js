import { eventWhitelist } from './eventWhitelist'

/**
 * @typedef {import('../../component').Component} Component
 */
/**
 * This function will unmount the provided component. Doing so it unregisters a whitelist of events, deletes the base element of the component from the DOM, and sets the component instance properties to null.
 * @param {Component} component 
 * @return {void} undefined
 */
export function unmountComponent(component) {
  if (!component.element) return
  component.componentWillUnmount && component.componentWillUnmount()
  eventWhitelist.map(event => {
    component.element.removeEventListener(event, component)
  })
  component.container.removeChild(component.element)
  component.container = null
  for (let key in component) {
    delete component[key]
  }
  delete component.state
  component.update = null
  component.unmount = null
}
