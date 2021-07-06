# mr-EventEmitter

Provides ability to subscribe and emit events. This event emitter is tailored for real-time applications so is designed with performance and memory efficiency in mind.  
Also it has two build targets: ES5 (ECMA2009) and ES8+ (modern JS), to maximize [browser support](#Browser) without sacrificing benefits of modern JS for majority of users.

[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](LICENSE)


## :rocket: Install


#### Node.js

Install:
```bash
npm install mr-eventemitter
```
In code:
```js
const EventEmitter = require('mr-eventemitter');
```


#### Browser

```html
<script type='module' src='mr-eventemitter.min.js'></script>
<script nomodule src='mr-eventemitter.es5.min.js'></script>
```
Use built files from a `dist` directory for the browser. It will load ES8+ version if it is supported ([~94%](https://caniuse.com/?search=ES8)), otherwise it will load ES5 (ECMA2009) version that supports pretty much [every](https://caniuse.com/?search=ES5) platform.

#### CDN ([jsDelivr](https://www.jsdelivr.com/))

You can use a public CDN for the library:

ES8+ module: https://cdn.jsdelivr.net/npm/mr-eventemitter@0.1/dist/mr-eventemitter.min.js  
ES5 version: https://cdn.jsdelivr.net/npm/mr-eventemitter@0.1/dist/mr-eventemitter.es5.min.js

#### Example

```js
let obj = new EventEmitter();

obj.on('event', (a) => {
    console.log('event', a);
});

obj.emit('event', 42);
```


## :scroll: [API Documentation](API.md)

## Usage

#### Creating:

Creating event emitter directly:
```js
let obj = new EventEmitter();
```

With class:
```js
class World extends EventEmitter {
    contrunctor() {
        super();
    }
}
```

With prototype:
```js
function World() {
    EventEmitter.call(this);
}
World.prototype = Object.create(EventEmitter.prototype);
World.prototype.constructor = World;
```


#### Emitting:

```js
obj.emit('event', 42);
```

Or with many arguments:
```js
obj.emit('event', 4, 8, 16, 32);
```


#### Subscribing:
```js
obj.on('event', function(value) {
    console.log('event', value);
});
```

It is possible to pass to an event many arguments:
```js
obj.on('event', function(a, b, c, d) {
    console.log('event', a, b, c, d);
});
```

For single life event use `once`:
```js
obj.once('event', function(value) {
    console.log('event', value);
});
```

Sometimes providing scope for a callback function is usefull:
```js
class Place {
    constructor() {
        this.name = 'Home';

        world.on('event', function() {
            // this - will be this `Place` instead of `world`
            console.log('event', this.name); // hello Home
        }, this); // - notice `this`
    }
}
```


#### Removing events:
To remove event handler, you can use `off` method on EventEmitter:
```js
obj.off('event', fn);
```

To remove all events by name:
```js
obj.off('event');
```

Remove a group of events, that match a regular expression:
```js
obj.off(/input:\w+/);

obj.emit('init');
obj.emit('input:start');    // ignored
obj.emit('input:end');      // ignored
```

To remove all events:
```js
obj.off();
```

And for easier management, `on` and `once` methods return **EventHandler**, which then can be used for removing events:
```js
let evt = obj.on('event', (value) => {
    console.log('event', value);
});

evt.off();
```

## Building

Builds a single file into two ES5 and ES8+ versions using Babel and Terser.  
Source file: `src/index.js`  
Built versions ES5 (`dist/mr-eventemitter.es5.min.js`) and ES8+ (`dist/mr-eventemitter.min.js`):

```bash
npm install
npm run build
```
