## Classes

<dl>
<dt><a href="#EventEmitter">EventEmitter</a></dt>
<dd></dd>
<dt><a href="#EventHandler">EventHandler</a></dt>
<dd></dd>
</dl>

<a name="EventEmitter"></a>

## EventEmitter

* [EventEmitter](#EventEmitter)
    * [new EventEmitter()](#new_EventEmitter_new)
    * [.on(name, callback, [scope], [once])](#EventEmitter+on) ⇒ [<code>EventHandler</code>](#EventHandler)
    * [.once(name, callback, [scope])](#EventEmitter+once) ⇒ [<code>EventHandler</code>](#EventHandler)
    * [.emit(name, [...args])](#EventEmitter+emit)
    * [.off([name], [callback], [scope])](#EventEmitter+off)

<a name="new_EventEmitter_new"></a>

### new EventEmitter()
Provides ability to subscribe and emit events in sync manner. Each subscribtion (on, once) returns EventHandler that simplifies callbacks management.

**Example**  
```js
const world = new EventEmitter();world.on('event', function (number) {    console.log('event', number);});world.emit('event', 42);
```
<a name="EventEmitter+on"></a>

### eventEmitter.on(name, callback, [scope], [once]) ⇒ [<code>EventHandler</code>](#EventHandler)
Attach an event handler.

**Returns**: [<code>EventHandler</code>](#EventHandler) - Object that can be used to manage the event.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the event to bind the callback to. |
| callback | <code>function</code> | Function that is called when event is emitted. |
| [scope] | <code>object</code> | Object to use as 'this' when the event is emitted, defaults to current this. |
| [once] | <code>boolean</code> | Boolean to indicate if this event should emit only once. Defaults to false. |

**Example**  
```js
obj.on('event', function (a, b) {    console.log(a + b);});obj.emit('event', 4, 2);
```
<a name="EventEmitter+once"></a>

### eventEmitter.once(name, callback, [scope]) ⇒ [<code>EventHandler</code>](#EventHandler)
Attach an event handler which will emit only once.

**Returns**: [<code>EventHandler</code>](#EventHandler) - Object that can be used to manage the event.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the event to bind the callback to. |
| callback | <code>function</code> | Function that is called when event is emitted. |
| [scope] | <code>object</code> | Object to use as 'this' when the event is emitted, defaults to current this. |

**Example**  
```js
obj.once('event', function (a) {    console.log(a);});obj.emit('event', 4);obj.emit('event', 2); // will not trigger
```
<a name="EventEmitter+emit"></a>

### eventEmitter.emit(name, [...args])
Emit the event by name and optional list of arguments.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the event to bind the callback to. |
| [...args] | <code>\*</code> | Arguments to be passed to event callbacks. |

**Example**  
```js
obj.emit('event', 'hello', 42);
```
<a name="EventEmitter+off"></a>

### eventEmitter.off([name], [callback], [scope])
Remove event handlers based on provided arguments.


| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | Name of the events to remove. If not specified all events will be removed. |
| [callback] | <code>function</code> | Function that is used as callback. If not defined, then all events of specified name will be removed. |
| [scope] | <code>object</code> | Object that is used as a scope for event handlers. If not defined, then all events with matching name and callback function will be removed. |

**Example**  
```js
obj.off(); // removes all eventsobj.off('event'); // removes all events named `event`.obj.off(/input:\w+/); // removes all events with name matching regular expressionobj.off('event', fn); // removes events named `event` with `fn`obj.off('event', fn, obj); // removes events named `event` with `fn` callback and `obj` as a scope.
```
<a name="EventHandler"></a>

## EventHandler

* [EventHandler](#EventHandler)
    * [new EventHandler()](#new_EventHandler_new)
    * [.emit([...args])](#EventHandler+emit)
    * [.off()](#EventHandler+off)

<a name="new_EventHandler_new"></a>

### new EventHandler()
Constructed by EventEmitter and provides easy ability to manage event.

<a name="EventHandler+emit"></a>

### eventHandler.emit([...args])
Emit the event with optional list of arguments.


| Param | Type | Description |
| --- | --- | --- |
| [...args] | <code>\*</code> | Arguments to be passed to event callbacks. |

**Example**  
```js
evt.emit(42, 'hello');
```
<a name="EventHandler+off"></a>

### eventHandler.off()
Removes event from EventEmitter.

**Example**  
```js
evt.off();
```
