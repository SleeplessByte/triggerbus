// Type definitions for triggerbus 1.2.0
// Project: triggerbus
// Definitions by: Derk-Jan Karrenbeld <https://github.com/SleeplessByte>

export as namespace triggerbus;

export = TriggerBusFunction;

declare function TriggerBusFunction(): TriggerBusFunction.EventBus;

declare namespace TriggerBusFunction {
    export type Callback<T = any[]> = (...args: T) => void

    export class EventBus {
        on(name: string, fn: Callback): () => EventBus
        once(name: string, fn: Callback): () => EventBus
        off(name: string, fn?: Callback): EventBus
        trigger<T = any[]>(name: string, ...args: T): EventBus
    }

    export const EventBus: new() => T;
}
