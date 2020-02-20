// Copyright (c) 2018-2020, Brandon Lehmann
//
// Please see the included LICENSE file for more information.

import {EventEmitter} from 'events';
import Timeout = NodeJS.Timeout;

/**
 * A Metronome like timer that emits a tick event at the defined interval
 */
export class Metronome extends EventEmitter {
    private m_timerInterval: number = 1000;
    private m_paused: boolean = true;
    private m_timer?: Timeout;

    /**
     * Creates a new metronome based timer object that will call the tick event as required
     * @param interval the interval to 'tick' at in milliseconds - defaults to 1000ms (1s)
     * @param [autoStart] if the timer should auto start
     */
    constructor(
        interval: number,
        autoStart: boolean = false,
    ) {
        super();

        this.m_timerInterval = interval;

        if (autoStart) {
            this.m_paused = false;
        }

        const tick = () => {
            if (!this.paused) {
                this.tick();
            }
            this.m_timer = setTimeout(tick, this.interval);
        };

        tick();
    }

    /**
     * Event that is emitted every time a tick occurs
     * @param event
     * @param listener
     */
    public on(
        event: 'tick', listener: () => void): this;

    /** @ignore */
    public on(
        event: any, listener: (...args: any[]) => void): this {
        return super.on(event, listener);
    }

    /**
     * Destroys the inner timer instance of the object
     */
    public destroy() {
        if (this.m_timer) {
            clearTimeout(this.m_timer);
        }
        delete this.m_timer;
    }

    /**
     * The interval of the tick event in milliseconds
     */
    public get interval(): number {
        return this.m_timerInterval;
    }

    public set interval(interval: number) {
        this.m_timerInterval = interval;
    }

    /**
     * Whether the metronome is paused
     */
    public get paused(): boolean {
        return this.m_paused;
    }

    public set paused(paused: boolean) {
        this.m_paused = paused;
    }

    /**
     * Forces a tick event to be emitted
     * @event tick()
     */
    public tick(): void {
        this.emit('tick');
    }

    /**
     * Toggles the timer on/off
     * @returns the Metronome's current paused state
     */
    public toggle(): boolean {
        this.paused = (!this.paused);
        return this.paused;
    }
}
