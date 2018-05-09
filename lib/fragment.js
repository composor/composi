/**
 * @description A tag to enable returning sibling elements. This is useful for returning list items to render in a list or table cells to render in a table row.
 * @example
 * <Fragment>
 *   <li>A</li>
 *   <li>B</li>
 *   <li>C</li>
 * </Fragment>
 * Or functionally:
 * Fragment(null, [
 *   h('li', {}, 'A'),
 *   h('li', {}, 'B'),
 *   h('li', {}, 'C')
 * ])
 * @param {null|Object} props When using Fragment as a function, props is the first argument. Provide either null or {} as the value for props.
 * @param {any[]} children The siblings to return with the Fragment. This will be an array of sibling elements.
 * @returns {Object[]} An array of virtual nodes.
 */
export const Fragment = (props, children) => children
