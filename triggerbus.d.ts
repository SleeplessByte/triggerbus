declare type Off = () => any
declare type Listener = (name: string, data?: any) => void
interface Registry {
  [name: string]: Listener[]
  '*': Listener[]
}
/**
 * Create a 🚌 triggerbus
 * @param preset optional preset event => Listener map
 */
export default function triggerbus(
  preset?: Registry
): {
  /**
   * Register {@link fn} on {@link name}
   *
   * @param name event name
   * @param fn function to call on event
   * @returns function to unregister
   */
  on(name: string, fn: Listener): Off
  /**
   * Register {@link fn} on {@link name}, trigger once
   *
   * @param name event name, use '*' for all
   * @param fn function to call on event
   * @returns function to unregister
   */
  once(name: string, fn: Listener): Off
  /**
   * Unregister {@link fn} from {@link name}
   *
   * @param name event name, use '*' for all
   * @param fn function, use undefined for all
   */
  off(name: string, fn?: Listener | undefined): void
  /**
   * Trigger {@link event} on {@link name} and '*'
   * @param name event name, use unexisting (_) to hit only '*'
   * @param event optional event data, second argument to fns
   */
  trigger(name: string, event?: any): void
}
export {}
