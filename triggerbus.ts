type Off = () => any
type Name = string | '*'
type Listener = (name: string, data?: any) => void
type ListenerArgs = [string, any]

interface Registry {
  [name: string]: Listener[]
  '*': Listener[]
}

// tslint:disable-next-line:no-bitwise
const find = (list: Listener[], fn?: Listener) => list.indexOf(fn!) >>> 0
const sure = (registry: Registry, name: string) =>
  registry[name] || (registry[name] = [])
const forget = (list: Listener[], fn?: Listener) =>
  (fn && list.splice(find(list, fn), 1)) || list.splice(0, list.length)
const each = (list: Listener[], ...args: ListenerArgs) =>
  list.map(fn => fn(...args))

/**
 * Create a 🚌 triggerbus
 * @param preset optional preset event => Listener map
 */
export default function triggerbus(preset?: Registry) {
  const registry: Registry = preset || { '*': [] }
  return {
    /**
     * Register {@link fn} on {@link name}
     *
     * @param name event name
     * @param fn function to call on event
     * @returns function to unregister
     */
    on(name: Name, fn: Listener): Off {
      sure(registry, name).push(fn)
      return () => this.off(name, fn)
    },

    /**
     * Register {@link fn} on {@link name}, trigger once
     *
     * @param name event name, use '*' for all
     * @param fn function to call on event
     * @returns function to unregister
     */
    once(name: Name, fn: Listener): Off {
      const fnOnce = (...args: ListenerArgs) => {
        fn.apply(undefined, args)
        this.off(name, fnOnce)
      }
      return this.on(name, fnOnce)
    },

    /**
     * Unregister {@link fn} from {@link name}
     *
     * @param name event name, use '*' for all
     * @param fn function, use undefined for all
     */
    off(name: Name, fn?: Listener) {
      forget(sure(registry, name), fn)
    },

    /**
     * Trigger {@link event} on {@link name} and '*'
     * @param name event name, use unexisting (_) to hit only '*'
     * @param event optional event data, second argument to fns
     */
    trigger(name: Name, event?: any) {
      each(
        sure(registry, '*').concat(
          (name !== '*' && sure(registry, name)) || []
        ),
        name,
        event
      )
    }
  }
}
