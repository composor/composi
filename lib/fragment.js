/**
 * @description A tag to enable return sibling elements. This is useful for return list items to render in a list or table cells to render in a table row.
 * @example <Fragment>
 *            <li>A</li>
 *            <li>B</li>
 *            <li>C</li>
 *          </Fragment>
 * Or functionally:
 * Fragment(null, [
 *   h('li', {}, 'A'),
 *   h('li', {}, 'B'),
 *   h('li', {}, 'C')
 * ])
 * @param {null|Object} props This is never used. If using Fragment as a function, provide either null or {} as value.
 * @param {any[]} children The siblings to return with the Fragment.
 */
export const Fragment = (props, children) => children
