import test from 'ava'
import triggerbus from '../triggerbus'

function state(): [() => void, () => number, () => void] {
  let count = 0
  return [() => (count += 1), () => count, () => (count = 0)]
}

function collector(): [
  (name: string, data: any) => void,
  (name: string) => any[],
  () => void
] {
  let called: { [name: string]: any[] } = {}
  return [
    (name: string, data: any) => {
      ;(called[name] || (called[name] = [])).push(data)
    },
    (name: string) => called[name] || [],
    () => (called = {})
  ]
}

test('triggerbus', t => {
  t.is(typeof triggerbus, 'function')
})

test('trigger event', t => {
  const bus = triggerbus()
  const [increase, get] = state()

  bus.on('invariant', increase)
  bus.on('event:foo', increase)

  bus.trigger('event:foo')

  t.is(get(), 1)
})

test('trigger event with multiple handlers', t => {
  const bus = triggerbus()
  const [increase, get] = state()

  bus.on('invariant', increase)
  bus.on('event:foo', increase)
  bus.on('event:foo', increase)

  bus.trigger('event:foo')

  t.is(get(), 2)
})

test('trigger event on *', t => {
  const bus = triggerbus()
  const [increase, get] = state()

  bus.on('event:foo', increase)
  bus.on('*', increase)

  bus.trigger('event:foo')

  t.is(get(), 2)
})

test('unregister event', t => {
  const bus = triggerbus()
  const [increase, get] = state()

  bus.on('invariant', increase)
  const unregister = bus.on('event:foo', increase)
  unregister()

  bus.trigger('event:foo')

  t.is(get(), 0)
})

test('unregister event multiple times', t => {
  const bus = triggerbus()
  const [increase, get] = state()

  bus.on('invariant', increase)
  const unregister = bus.on('event:foo', increase)
  unregister()
  unregister()

  bus.trigger('event:foo')

  t.is(get(), 0)
})

test('unregister event via off', t => {
  const bus = triggerbus()
  const [increase, get] = state()

  bus.on('invariant', increase)
  bus.on('event:foo', increase)

  bus.off('event:foo', increase)
  bus.trigger('event:foo')

  t.is(get(), 0)
})

test('unregister all events via off', t => {
  const bus = triggerbus()
  const [increase, get] = state()

  bus.on('invariant', increase)
  bus.on('event:foo', increase)
  bus.on('event:foo', increase)
  bus.on('event:foo', increase)

  bus.off('event:foo')

  bus.trigger('event:foo')
  t.is(get(), 0)
})

test('triggers with event data passed', t => {
  const bus = triggerbus()
  const [collect, retrieve] = collector()

  bus.on('invariant', collect)
  bus.on('event:foo', collect)

  const data = { foo: 42 }
  bus.trigger('event:foo', data)

  t.deepEqual(retrieve('invariant'), [])
  t.deepEqual(retrieve('event:foo'), [data])
})

test('triggers with event data passed to *', t => {
  const bus = triggerbus()
  const [collect, retrieve] = collector()

  bus.on('invariant', collect)
  bus.on('event:foo', collect)
  bus.on('*', collect)

  const data = { foo: 42 }
  bus.trigger('event:foo', data)

  t.deepEqual(retrieve('invariant'), [])
  t.deepEqual(retrieve('event:foo'), [data, data])
})

test('on receives multiple triggers', t => {
  const bus = triggerbus()
  const [increase, get] = state()

  bus.on('invariant', increase)
  bus.on('event:foo', increase)

  bus.trigger('event:foo')
  bus.trigger('event:foo')
  bus.trigger('event:foo')
  bus.trigger('event:foo')
  bus.trigger('event:foo')

  t.is(get(), 5)
})

test('once receives trigger once', t => {
  const bus = triggerbus()
  const [increase, get] = state()

  bus.on('invariant', increase)
  bus.once('event:foo', increase)

  bus.trigger('event:foo')
  bus.trigger('event:foo')
  bus.trigger('event:foo')
  bus.trigger('event:foo')
  bus.trigger('event:foo')

  t.is(get(), 1)
})

test('once returns unregister', t => {
  const bus = triggerbus()
  const [increase, get] = state()

  bus.on('invariant', increase)
  const unregister = bus.once('event:foo', increase)

  unregister()
  bus.trigger('event:foo')

  t.is(get(), 0)
})

test('can not unregister "once" via off', t => {
  const bus = triggerbus()
  const [increase, get] = state()

  bus.on('invariant', increase)
  bus.once('event:foo', increase)
  bus.off('event:foo', increase)

  bus.trigger('event:foo')

  t.is(get(), 1)
})

test('can safely off not existing', t => {
  const bus = triggerbus()

  bus.off('__')
  bus.trigger('__')

  t.pass('nothing went wrong')
})

test('can register listeners during callback', t => {
  const bus = triggerbus()
  const [increase, get] = state()

  bus.on('*', () => bus.on('event:foo', increase))

  bus.trigger('event:foo')
  t.is(get(), 0)

  bus.trigger('event:foo')
  t.is(get(), 1)
})
