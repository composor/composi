/**
 * Observer class providing two methods: watch and dispatch.
 * It also exposes a method for setting state: `setState`.
 * `setState` works just like the same method on Composi class components.
 * When you use `setState` it sends a message to an instance of DataStoreComponent to update itself.
 */
export class Observer {
  constructor() {
    this.events = {};
  }

  /**
   * Method to subscribe to a publishing event.
   * @param {string} event 
   * @param {Function} callback 
   * @return {Object.<string, any>} events
   */
  watch(event, callback) {
    if (!this.events.hasOwnProperty(event)) {
      this.events[event] = [];
    }
    return this.events[event].push(callback);
  }

  /**
   * 
   * @param {string} event 
   * @param {any} data 
   * @return {any[]} events
   */
  dispatch(event, data = {}) {
    // There's no event to dispatch to, so bail out:
    if (!this.events.hasOwnProperty(event)) {
      return [];
    }
    return this.events[event].map(callback => callback(data));
  }
}
