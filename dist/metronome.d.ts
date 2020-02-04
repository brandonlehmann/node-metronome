/// <reference types="node" />
import { EventEmitter } from 'events';
/**
 * A Metronome like timer that emits a tick event at the defined interval
 */
export declare class Metronome extends EventEmitter {
    private m_timerInterval;
    private m_paused;
    /**
     * Creates a new metronome based timer object that will call the tick event as required
     * @param interval the interval to 'tick' at in milliseconds
     * @param [autoStart] if the timer should auto start
     */
    constructor(interval: number, autoStart?: boolean);
    /**
     * The interval of the tick event in milliseconds
     */
    get interval(): number;
    set interval(interval: number);
    /**
     * Whether the metronome is paused
     */
    get paused(): boolean;
    set paused(paused: boolean);
    /**
     * Forces a tick event to be emitted
     * @event tick()
     */
    tick(): void;
    /**
     * Toggles the timer on/off
     * @returns the Metronome's current paused state
     */
    toggle(): boolean;
}
