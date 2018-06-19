// Type definitions for triggerbus 2.0.0
// Project: triggerbus
// Definitions by: Derk-Jan Karrenbeld <https://github.com/SleeplessByte>

export as namespace triggerbus;

export = TriggerBus;

declare function TriggerBus(): TriggerBus.Bus;

declare namespace TriggerBus {
    export type Callback = (...args: any[]) => void

    export class Bus {
        on(name: string, fn: Callback): () => Bus
        once(name: string, fn: Callback): () => Bus
        off(name: string, fn?: Callback): Bus
        trigger(name: string, ...args: any[]): Bus
    }

    export const EventBus: new() => Bus;
}
