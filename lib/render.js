import {createElement} from './patch'
import {patch} from './patch'
import {h} from './h'

/**
 * A function to create and inject a virtual node into the document. On the first render, the node will be appended to the container. After than, each subsequential render will patch and update the DOM. The first argument can be either a JSX tag or an h function.
 * 
 * @param {function} tag A JSX tag or hyperscript function to render.
 * @param {Element|boolean} [container] The element into which the tag will be rendered.
 */
const watchedNodes = {
  container: undefined,
  element: undefined,
  oldNode: undefined,
  mounted: false
}

export const render = (tag, container) => {
  if (typeof container === 'string') container = document.querySelector(container)
  if (watchedNodes.container !== container) {
    watchedNodes.container = container
    watchedNodes.element = undefined
    watchedNodes.oldNode = undefined
  }
  if (watchedNodes.container && watchedNodes.mounted) watchedNodes.mounted = false
  let elem
  if (tag.props && tag.props.id) {
    try {
      if (typeof container === 'string') {
        elem = document.querySelector(container).querySelector(`#${tag.props.id}`)
      } else {
        elem = container.querySelector(`#${tag.props.id}`)
      }
    } catch(err) {}
  }
  
  watchedNodes.element = patch(
    watchedNodes.oldNode,
    (watchedNodes.oldNode = tag),
    watchedNodes.element,
    container
  )
  watchedNodes.mounted = true
}
