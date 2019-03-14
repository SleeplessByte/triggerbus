# 🚌 triggerbus

[![Build Status](https://travis-ci.com/SleeplessByte/triggerbus.svg?branch=master)](https://travis-ci.com/SleeplessByte/triggerbus)
[![npm](https://img.shields.io/npm/v/triggerbus.svg)](https://www.npmjs.com/package/triggerbus)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Maintainability](https://api.codeclimate.com/v1/badges/26915d951dcc26ca4fe1/maintainability)](https://codeclimate.com/github/SleeplessByte/triggerbus/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/26915d951dcc26ca4fe1/test_coverage)](https://codeclimate.com/github/SleeplessByte/triggerbus/test_coverage)

Simple Typescript eventbus that uses `trigger` to broadcast events. Works in any environment.

```typescript
import triggerbus from 'triggerbus'

const bus = triggerbus()

bus.on('event', console.log)
bus.trigger('event', { foo: 42 })
// => log('event', { foo: 42 })
```

## Installation

```
yarn add triggerbus
npm install triggerbus --save
```

## Usage

```TypeScript
import triggerbus from 'triggerbus'

const bus = triggerbus()

const off1 = bus.on('name', callback)
// => off1() unregisters callback from name
//    alternatively: bus.off('name', callback)

const off2 = bus.once('name', callback)
// => off2() unregisters callback from name
//    automatically unregisters after calling callback once

bus.off('name')
// => removes all listeners of name

bus.off('name', callback)
// => removes first listener that matches callback
//    does *not* remove "once" listener

bus.trigger('name', { foo: 42 })
// => triggers all listeners on 'name' and '*' with ('name', { foo: 42 })
```
