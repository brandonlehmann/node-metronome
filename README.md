# Node-Metronome

A simple Metronome like repeating timer with events.

## TypeScript

```typescript
import {Metronome} from 'node-metronome';

const timer = new Metronome(1000, true);

timer.on('tick', () => {
    // do something
})
```

## Javascript

```javascript
const Metronome = require('node-metronome').Metronome

const timer = new Metronome(1000, true);

timer.on('tick', () => {
    // do something
})
```

Full documentation available [here](https://brandonlehmann.github.io/node-metronome/).
