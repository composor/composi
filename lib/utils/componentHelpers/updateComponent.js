import { isSameNode } from './isSameNode'
import { patch } from '../../patch'

/**
 * @description This function updates an already rendered component. In doing so it checks to see if user provided data as an argument to this function. If data was provided, it uses that to render the component. Otherwise it checks if the component has state. If true, the function uses that to render the component. If no data was provided and the component is stateless, nothing will happen.
 * @param {boolean | number | string | Object | any[]} data
 * @param {import('../../component').Component} component 
 */
export function updateComponent(data, component) {
  if (!component.render) return

  // If componentShouldUpdate is set to false,
  // render one time only.
  // All other updates will be ignored.
  if (!component.componentShouldUpdate && component.mounted) return

  // If data is 0 or non-boolean, use,
  // else use component state.
  let __data = component.state
  if (data !== true && data) __data = data

  if (component.container && typeof component.container === 'string') {
    component.selector = component.container
    component.container = document.querySelector(component.container)
  }

  // Create virtual dom and check if component id
  // already exists in document.
  /**
   * @type {Object | null}
   */
  const vdom = component.render(__data)
  let elem
  if (vdom && vdom.props && vdom.props.id && component.container) {
    elem = component.container && component.container.querySelector(`#${vdom.props.id}`)
  }

  // If component element id already exists in DOM,
  // remove it before rendering the component.
  if (elem && !component.mounted) {
    elem.parentNode.removeChild(elem)
  }

  // Capture old node to use with isSameNode if component is already mounted:
  const __oldNode = component.element && component.element.vnode

  // Short circuit update if VNodes are identical:
  if (isSameNode(__oldNode, __data, component)) return

  /**
   * @property {HTMLElement} element The base element of the rendered component. You can use component as the base for comopnent instance specific DOM queries or event registration.
   */
  component.element = patch(component.render(__data), component.element)
  if (!component.mounted) {
    component.componentWillMount && component.componentWillMount()
    if (!component.container || component.container.nodeType !== 1) {
      console.error(
        'The container for a class component is not a valid DOM node. Check the selector provided for the class to make sure it is a valid CSS selector and that the container exists in the DOM. You might be targeting a nonexistent node.'
      )
    }
    component.container.appendChild(component.element)
    component.mounted = true
    component.componentDidMount && component.componentDidMount()
    return
  }

  component.componentWillUpdate && component.componentWillUpdate()
  component.componentDidUpdate && component.componentDidUpdate()
}
