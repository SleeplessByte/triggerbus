// Type definitions for triggerbus 2.0.0
// Project: triggerbus
// Definitions by: Derk-Jan Karrenbeld <https://github.com/SleeplessByte>

declare module 'triggerbus/dist/mjs/triggerbus' {
    import { Bus } from 'triggerbus'
    export * from 'triggerbus'
    export default function triggerbus(): Bus;
}
