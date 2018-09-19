declare type Unsubscribe = () => EventBus;
declare type Callback = (...args: any[]) => void;
declare class EventBus {
    private callbacks;
    constructor();
    _callbacks(name: any): Array<Callback>;
    /**
     * Trigger an event
     *
     * @param {String} name name of the event to trigger
     * @param {any[]} args arguments to pass to callback
     *
     * @returns {EventBus}
     */
    trigger(name: any, ...args: any[]): this;
    /**
     * Add a callback to an event name
     *
     * @param {String} name name of the event to listen on
     * @param {(...args) => void} fn callback to call when it's triggered
     *
     * @returns {() => EventBus} unsubscribe this callback
     */
    on(name: any, fn: any): Unsubscribe;
    /**
     * Remove callbacks from a name, or a specific one if given
     *
     * @param {String} name name of the event to remove from
     * @param {(...args) => void}[]fn optional callback to remove from the event
     *
     * @returns {EventBus}
     */
    off(name: string, fn?: Callback): this;
    /**
    * Add a callback to an event name, which is removed the first time it is
    *   triggered.
    *
    * @param {String} name name of the event to listen on
    * @param {(...args) => void} fn callback to call when it's triggered
    *
    * @returns {() => EventBus} unsubscribe this callback
    */
    once(name: string, fn: Callback): Unsubscribe;
}
interface triggerbus {
    (): EventBus;
    EventBus: typeof EventBus;
}
declare const triggerbus: triggerbus;
export default triggerbus;
