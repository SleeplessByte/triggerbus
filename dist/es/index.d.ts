// Type definitions for triggerbus 1.2.0
// Project: triggerbus
// Definitions by: Derk-Jan Karrenbeld <https://github.com/SleeplessByte>

declare module 'triggerbus' {
    export type Callback = (...args: any[]) => void

    export class Bus {
        on(name: string, fn: Callback): () => Bus
        once(name: string, fn: Callback): () => Bus
        off(name: string, fn?: Callback): Bus
        trigger(name: string, ...args: any[]): Bus
    }

    export default function triggerbus(): Bus;
}
