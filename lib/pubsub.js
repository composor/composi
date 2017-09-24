/**
 * @type {object} subscriptions
 */
const subscriptions = {}
const hasProp = subscriptions.hasOwnProperty

/**
 * Function to dispatch a topic and payload
 * @param {string} topic The topic to listen for.
 * @param {string|number|boolean|object|array} payload Any data to pass with the dispatch.
 */
export const dispatch = (topic, payload) => {
  if (!hasProp.call(subscriptions, topic)) return
  subscriptions[topic].map((item) => item(payload != undefined ? payload : {}))
}

/**
 * Function to subscribe to dispatches.
 * @param {string} topic The topic for the subscription.
 * @param {function} callback A function to execute when the dispatched topic matches.
 */
export const subscribe = (topic, callback) => {
  if (!hasProp.call(subscriptions, topic)) subscriptions[topic] = []
  const index = subscriptions[topic].push(callback) - 1
}

/**
 * Function to unsbuscribe from a topic.
 * @param {string} topic The topic to unsubscribe.
 */
export const unsubscribe = (topic) => delete subscriptions[topic]
