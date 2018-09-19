import triggerbus from '../src/triggerbus'

describe('triggerbus', () => {
  describe('creation', () => {
    it('should return a function', () => {
      expect(typeof(triggerbus)).toBe('function')
    })
  })

  describe('trigger', () => {
    it('should trigger an event to on callbacks', () => {
      const bus = triggerbus()
      let called = false

      bus.on('event:foo', () => {
        called = true
      })

      bus.trigger('event:foo')

      expect(called).toBe(true)
    })

    it('should only trigger the correct event name', () => {
      const bus = triggerbus()
      let called = false

      bus.on('event:other', () => {
        called = true
      });

      bus.trigger('event:foo')

      expect(called).toBe(false)
    })

    it('should pass parameters to the on callbacks', () => {
      const bus = triggerbus()
      let calledWith = undefined
      let expectedWith = {
          foo: 'bar'
      }

      bus.on('foobar', (param) => {
        calledWith = param
      })

      bus.trigger('foobar', expectedWith)

      expect(calledWith).toBe(expectedWith)
    })

    it('should trigger all the callbacks for a name', () => {
      const bus = triggerbus()
      let result = 0

      bus.on('name', () => {
        result = result | 1
      })

      bus.on('name', () => {
        result = result | 2
      })

      bus.on('name', () => {
        result = result | 4
      })

      bus.trigger('name')

      expect(result & 7).toBe(7)
    })
  })

  describe('on', () => {
    it('should receive trigger many times', () => {
      const bus = triggerbus()
      let callCount = 0

      bus.on('event', () => {
        callCount += 1
      })

      const expectedCount = Math.floor(Math.random() * 10) + 6
      for (let i = 0; i < expectedCount; i++) {
        bus.trigger('event')
      }

      expect(callCount).toBe(expectedCount)
    })

    it('should return off', () => {
      const bus = triggerbus()
      let callCount = 0

      const off = bus.on('event', () => {
        callCount += 1
      })

      off()

      const expectedCount = Math.floor(Math.random() * 10) + 6
      for (let i = 0; i < expectedCount; i++) {
        bus.trigger('event')
      }

      expect(callCount).toBe(0)
    })
  })

  describe('once', () => {
    it('should receive trigger one time', () => {
      const bus = triggerbus()
      let callCount = 0

      bus.once('event', () => {
        callCount += 1
      })

      const expectedCount = Math.floor(Math.random() * 10) + 6
      for (let i = 0; i < expectedCount; i++) {
        bus.trigger('event')
      }

      expect(callCount).toBe(1)
    })

    it('should return off', () => {
      const bus = triggerbus()
      let callCount = 0

      const off = bus.once('event', () => {
        callCount += 1
      })

      off()

      const expectedCount = Math.floor(Math.random() * 10) + 6
      for (let i = 0; i < expectedCount; i++) {
        bus.trigger('event')
      }

      expect(callCount).toBe(0)
    })
  })

  describe('off', () => {
    it('should remove all callbacks when none given', () => {
      const bus = triggerbus()
      let callCount = 0
      bus.on('event', () => {
        callCount += 1
      })

      bus.on('event', () => {
        callCount += 2
      })

      bus.on('event', () => {
        callCount += 3
      })

      bus.off('event')
      bus.trigger('event')

      expect(callCount).toBe(0)
    })

    it('should remove a single callbacks, when given', () => {
      const bus = triggerbus()
      let callCount = 0
      bus.on('event', () => {
        callCount += 1
      })

      bus.on('event', () => {
        callCount += 2
      })

      const cb = () => {
        callCount += 3
      }
      bus.on('event', cb)

      bus.off('event', cb)
      bus.trigger('event')

      expect(callCount).toBe(3)
    })
  })
})
