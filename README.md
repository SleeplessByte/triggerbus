# triggerbus

[![Build Status](https://travis-ci.com/SleeplessByte/triggerbus.svg?branch=master)](https://travis-ci.com/SleeplessByte/triggerbus)
[![npm](https://img.shields.io/npm/v/triggerbus.svg)](https://www.npmjs.com/package/triggerbus)


Simple JavaScript eventbus that uses `trigger` to `emit` events.

```JavaScript
import triggerbus from 'triggerbus'

const bus = triggerbus()

const callback = function(...args) {
  // the callback
}

const off = bus.on('event', callback)
// off is a function, same as bus.off('event', callback)

bus.trigger('event', ...args)
```
