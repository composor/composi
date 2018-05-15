/**
 * @description A cross-browser normalization/polyfill for requestAnimationFrame.
 * @param {Function} cb A callback to execute.
 * @returns {any} The result of the callback.
 */
export const rAF =
  (window && window.requestAnimationFrame) ||
  (window && window.webkitRequestAnimationFrame) ||
  (window && window.mozRequestAnimationFrame) ||
  (window && window.msRequestAnimationFrame) ||
  function(cb) {
    return setTimeout(cb, 16)
  }
