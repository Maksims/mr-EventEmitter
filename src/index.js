/**
 * @class
 * @name EventEmitter
 * @description Provides ability to subscribe and emit events in sync manner. Each subscribtion (on, once) returns EventHandler that simplifies callbacks management.
 * @example
 * const world = new EventEmitter();
 *
 * world.on('event', function (number) {
 *     console.log('event', number);
 * });
 *
 * world.emit('event', 42);
 */
class EventEmitter {
    constructor() {
        this._events = new Map();
    }

    /**
     * @function
     * @name EventEmitter#on
     * @description Attach an event handler.
     * @param {string} name - Name of the event to bind the callback to.
     * @param {function} callback - Function that is called when event is emitted.
     * @param {object} [scope] - Object to use as 'this' when the event is emitted, defaults to current this.
     * @param {boolean} [once] - Boolean to indicate if this event should emit only once. Defaults to false.
     * @returns {EventHandler} Object that can be used to manage the event.
     * @example
     * obj.on('event', function (a, b) {
     *     console.log(a + b);
     * });
     * obj.emit('event', 4, 2);
     */
    on(name, callback, scope, once = false) {
        const evt = new EventHandler(this, name, callback, scope || this, once);

        let callbacks = this._events.get(name);
        if (! callbacks) {
            callbacks = new Set();
            this._events.set(name, callbacks);
        }

        callbacks.add(evt);

        return evt;
    }

    /**
     * @function
     * @name EventEmitter#once
     * @description Attach an event handler which will emit only once.
     * @param {string} name - Name of the event to bind the callback to.
     * @param {function} callback - Function that is called when event is emitted.
     * @param {object} [scope] - Object to use as 'this' when the event is emitted, defaults to current this.
     * @returns {EventHandler} Object that can be used to manage the event.
     * @example
     * obj.once('event', function (a) {
     *     console.log(a);
     * });
     * obj.emit('event', 4);
     * obj.emit('event', 2); // will not trigger
     */
    once(name, callback, scope) {
        return this.on(name, callback, scope, true);
    }

    /**
     * @function
     * @name EventEmitter#emit
     * @description Emit the event by name and optional list of arguments.
     * @param {string} name - Name of the event to bind the callback to.
     * @param {...*} [args] - Arguments to be passed to event callbacks.
     * @example
     * obj.emit('event', 'hello', 42);
     */
    emit(name, ...args) {
        if (! this._events.has(name)) return;
        const callbacks = new Set(this._events.get(name));
        for(let evt of callbacks) {
            evt.emit(...args);
        }
    }

    /**
     * @function
     * @name EventEmitter#off
     * @description Remove event handlers based on provided arguments.
     * @param {string} [name] - Name of the events to remove. If not specified all events will be removed.
     * @param {function} [callback] - Function that is used as callback. If not defined, then all events of specified name will be removed.
     * @param {object} [scope] - Object that is used as a scope for event handlers. If not defined, then all events with matching name and callback function will be removed.
     * @example
     * obj.off(); // removes all events
     * obj.off('event'); // removes all events named `event`.
     * obj.off('event', fn); // removes events named `event` with `fn`
     * obj.off('event', fn, obj); // removes events named `event` with `fn` callback and `obj` as a scope.
     */
    off(name, callback, scope) {
        if (! name) {
            for(let callbacks of this._events.values()) {
                for(let evt of callbacks) {
                    evt.destroy();
                }
            }
            this._events.clear();
        } else if (! callback) {
            if (this._events.has(name)) {
                for(let evt of this._events.get(name)) {
                    evt.destroy();
                }
                this._events.delete(name);
            }
        } else {
            if (! this._events.has(name)) return;
            scope = scope || this;
            const callbacks = this._events.get(name);
            const before = new Set(callbacks);

            for(let evt of before) {
                if (evt.callback === callback && evt.scope === scope) {
                    callbacks.delete(evt);
                    evt.destroy();
                }
            }

            if (callbacks.size === 0) this._events.delete(name);
        }
    }
}

/**
 * @class
 * @name EventHandler
 * @description Constructed by EventEmitter and provides easy ability to manage event.
 */
class EventHandler {
    constructor(owner, name, callback, scope, once = false) {
        this.owner = owner;
        this.name = name;
        this.callback = callback;
        this.scope = scope;
        this.once = once;
    }

    /**
     * @function
     * @name EventHandler#emit
     * @description Emit the event with optional list of arguments.
     * @param {...*} [args] - Arguments to be passed to event callbacks.
     * @example
     * evt.emit(42, 'hello');
     */
    emit(...args) {
        this.callback.apply(this.scope, args);
        if (this.once) this.off();
    }

    /**
     * @function
     * @name EventHandler#off
     * @description Removes event from EventEmitter.
     * @example
     * evt.off();
     */
    off() {
        if (! this.owner || ! this.owner._events.has(this.name))
            return;

        const callbacks = this.owner._events.get(this.name);
        callbacks.delete(this);

        if (callbacks.size === 0) this.owner._events.delete(this.name);

        this.destroy();
    }

    /**
     * @private
     * @function
     * @name EventHandler#destroy
     * @description Clears related variables to avoid scope visibilities that can prevent garbage collection.
     */
    destroy() {
        this.owner = null;
        this.name = null;
        this.callback = null;
        this.scope = null;
    }
}

if (typeof(module) !== 'undefined')
    module.exports = EventEmitter;

if (typeof(window) !== 'undefined')
    window['EventEmitter'] = EventEmitter;
