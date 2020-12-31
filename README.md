# mr-EventEmitter

Provides ability to subscribe and emit events. This event emitter is tailored for real-time applications so is designed with performance and memory efficiency in mind.  
Also it has two build targets: ES5 (ECMA2009) and ES8 (ECMA2017), to maximize [browser support](#Browser) without sacraficing benefits of modern JS for majority of users.

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
<script type='module' src='mr-eventemitter.es8.min.js'></script>
<script nomodule src='mr-eventemitter.es5.min.js'></script>
```
Use built files from `dist` directory for browser. It will load ES8 (ECMA2017) version if it is supported ([~94%](https://caniuse.com/?search=ES8)), otherwise it will load ES5 (ECMA2009) version that supports pretty much [every](https://caniuse.com/?search=ES5) platform.

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

Builds single file into two ES5 and ES8 versions using Google Closure Compiler.  
Source file: `src/index.js`  
Built versions ES5 (`dist/mr-eventemitter.es5.min.js`) and ES8 (`dist/mr-eventemitter.es8.min.js`):

```bash
npm install
npm run build
```
