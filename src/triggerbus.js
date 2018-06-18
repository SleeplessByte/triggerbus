class EventBus {
  constructor() {
    this.callbacks = {}

    this.api = Object.freeze({
      on: this.on.bind(this),
      once: this.once.bind(this),
      off: this.off.bind(this),
      trigger: this.trigger.bind(this)
    })

    return this.api
  }

  _callbacks(name) {
    if (!this.callbacks[name]) {
      this.callbacks[name] = []
    }

    return this.callbacks[name]
  }

  trigger(name, ...args) {
    this._callbacks(name).forEach(function(c) {
      c.apply(undefined, args)
    })
    return this.api
  }

  on(name, fn) {
    this._callbacks(name).push(fn)
    return () => {
      this.off(name, fn)
    }
  }

  off(name, fn) {
    if (!fn) {
      this.callbacks[name] = []
    } else {
      this.callbacks[name] = this._callbacks(name).filter((c) => c !== fn)
    }
    return this.api
  }

  once(name, fn) {
    const self = this
    function fnOnce(...args) {
      fn.apply(undefined, args)
      self.off(name, fnOnce)
    }
    return this.on(name, fnOnce)
  }
}

const triggerbus = function() {
  return new EventBus()
}
triggerbus.EventBus = EventBus

export default triggerbus
