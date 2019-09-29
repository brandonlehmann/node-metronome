// Copyright (c) 2018-2019, Brandon Lehmann
//
// Please see the included LICENSE file for more information.

'use strict'

const EventEmitter = require('events')

class Metronome extends EventEmitter {
  constructor (interval, autoStart) {
    super()

    this.timerInterval = parseInt(interval) || 100

    if (autoStart) {
      this.paused = false
    } else {
      this.paused = true
    }

    const that = this
    function tick () {
      if (!that.paused) that.emit('tick')
      setTimeout(tick, that.timerInterval)
    }
    tick()
  }

  get interval () {
    return this.timerInterval
  }

  set interval (value) {
    const i = parseInt(value)
    if (isNaN(i)) throw new Error('Interval must be an integer')
    this.timerInterval = i
  }

  get pause () {
    return this.paused
  }

  set pause (value) {
    this.paused = value !== false
  }

  tick () {
    this.emit('tick')
  }

  toggle () {
    this.paused = (!this.paused)
  }
}

module.exports = Metronome
