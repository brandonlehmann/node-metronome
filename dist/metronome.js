"use strict";
// Copyright (c) 2018-2020, Brandon Lehmann
//
// Please see the included LICENSE file for more information.
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
/**
 * A Metronome like timer that emits a tick event at the defined interval
 */
class Metronome extends events_1.EventEmitter {
    /**
     * Creates a new metronome based timer object that will call the tick event as required
     * @param interval the interval to 'tick' at in milliseconds
     * @param [autoStart] if the timer should auto start
     */
    constructor(interval, autoStart = false) {
        super();
        this.m_timerInterval = 100;
        this.m_paused = true;
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
     * The interval of the tick event in milliseconds
     */
    get interval() {
        return this.m_timerInterval;
    }
    set interval(interval) {
        this.m_timerInterval = interval;
    }
    /**
     * Whether the metronome is paused
     */
    get paused() {
        return this.m_paused;
    }
    set paused(paused) {
        this.m_paused = paused;
    }
    /**
     * Forces a tick event to be emitted
     * @event tick()
     */
    tick() {
        this.emit('tick');
    }
    /**
     * Toggles the timer on/off
     * @returns the Metronome's current paused state
     */
    toggle() {
        this.paused = (!this.paused);
        return this.paused;
    }
}
exports.Metronome = Metronome;
