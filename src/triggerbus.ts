type Unsubscribe = () => EventBus
type Callback = (...args) => void

class EventBus {

  private callbacks: {}

  constructor() {
    this.callbacks = {}
  }

  _callbacks(name): Array<Callback> {
    if (!this.callbacks[name]) {
      this.callbacks[name] = []
    }

    return this.callbacks[name]
  }

  /**
   * Trigger an event
   *
   * @param {String} name name of the event to trigger
   * @param {any[]} args arguments to pass to callback
   *
   * @returns {EventBus}
   */
  trigger(name, ...args) {
    this._callbacks(name).forEach(function(c) {
      c.apply(undefined, args)
    })
    return this
  }

  /**
   * Add a callback to an event name
   *
   * @param {String} name name of the event to listen on
   * @param {(...args) => void} fn callback to call when it's triggered
   *
   * @returns {() => EventBus} unsubscribe this callback
   */
  on(name, fn): Unsubscribe {
    this._callbacks(name).push(fn)
    return () => this.off(name, fn)
  }

 /**
  * Remove callbacks from a name, or a specific one if given
  *
  * @param {String} name name of the event to remove from
  * @param {(...args) => void}[]fn optional callback to remove from the event
  *
  * @returns {EventBus}
  */
  off(name: string, fn?: Callback): this {
    if (!fn) {
      this.callbacks[name] = []
    } else {
      this.callbacks[name] = this._callbacks(name).filter((c) => c !== fn)
    }
    return this
  }

   /**
   * Add a callback to an event name, which is removed the first time it is
   *   triggered.
   *
   * @param {String} name name of the event to listen on
   * @param {(...args) => void} fn callback to call when it's triggered
   *
   * @returns {() => EventBus} unsubscribe this callback
   */
  once(name: string, fn: Callback): Unsubscribe {
    const EventBus = this
    function fnOnce(...args) {
      fn.apply(undefined, args)
      EventBus.off(name, fnOnce)
    }
    return this.on(name, fnOnce)
  }
}

interface triggerbus {
  (): EventBus
  EventBus: typeof EventBus
}

const triggerbus = <triggerbus>function () {
  return new EventBus()
}
triggerbus.EventBus = EventBus

export default triggerbus
