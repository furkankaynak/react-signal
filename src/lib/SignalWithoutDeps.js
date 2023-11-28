import { useSyncExternalStore } from "react";

function SignalValue({ data }) {
  const value = useSyncExternalStore(data.subscribe, data.getSnapshot);

  return value;
}

// It stores instance of the computed state.
// The reason for this is to find the signal called inside the computed.
// In this way, we know which signals the computed signal depends on.
let runningContext = null;

class Signal {
  constructor(value) {
    this._value = value;
    this._listeners = new Set();
  }

  subscribe = (fn) => {
    this._listeners.add(fn);

    return () => {
      this._listeners = new Set([...this._listeners].filter((cb) => cb !== fn));
    };
  };

  notifyListeners = () => {
    this._listeners.forEach((updaterFn) => updaterFn(this));
  };

  getSnapshot = () => {
    return this.value;
  };

  valueOf() {
    return this.value;
  }

  _subscribeByRunningContext = () => {
    if (runningContext != null) {
      this.subscribe(runningContext.updater);
    }
  };

  get value() {
    this._subscribeByRunningContext();
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.notifyListeners();
  }
}

Object.defineProperties(Signal.prototype, {
  $$typeof: { configurable: false, value: Symbol.for("react.element") },
  $$$typeof: { configurable: false, value: Symbol.for("react.element") },
  type: { configurable: false, value: SignalValue },
  props: {
    configurable: true,
    get() {
      return { data: this };
    }
  },
  ref: { configurable: true, value: null }
});

export const signalWithoutDeps = (value) => new Signal(value);
