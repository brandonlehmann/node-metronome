// Copyright (c) 2018-2020, Brandon Lehmann
//
// Please see the included LICENSE file for more information.

import {EventEmitter} from 'events';

/**
 * A Metronome like timer that emits a tick event at the defined interval
 */
export class Metronome extends EventEmitter {
    private m_timerInterval: number = 100;
    private m_paused: boolean = true;

    /**
     * Creates a new metronome based timer object that will call the tick event as required
     * @param interval the interval to 'tick' at in milliseconds
     * @param [autoStart] if the timer should auto start
     */
    constructor(interval: number, autoStart: boolean = false) {
        super();

        this.m_timerInterval = interval;

        if (autoStart) {
            this.m_paused = false;
        }

        const tick = () => {
            if (!this.paused) {
                this.tick();
            }
            setTimeout(tick, this.interval);
        };

        tick();
    }

    /**
     * Event that is emitted every time a tick occurs
     * @param event
     * @param listener
     */
    public on(event: 'tick', listener: () => void): this;

    /** @ignore */
    public on(event: any, listener: (...args: any[]) => void): this {
        return super.on(event, listener);
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
