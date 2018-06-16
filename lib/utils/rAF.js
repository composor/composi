/**
 * @description A cross-browser normalization/polyfill for requestAnimationFrame.
 * @param {Function} cb A callback to execute.
 * @returns {number} The request id, that uniquely identifies the entry in the browser's callback list.
 */
export const rAF =
  (window && window.requestAnimationFrame) ||
  (window && window['msRequestAnimationFrame']) ||
  function(cb) {
    return setTimeout(cb, 16)
  }
