import { useSyncExternalStore } from "react";

function SignalValue({ data }) {
  const value = useSyncExternalStore(data.subscribe, data.getSnapshot);

  return value;
}

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

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.notifyListeners();
  }
}

class Computed extends Signal {
  constructor(computedFn, deps = []) {
    super();
    this._computedFn = computedFn;

    deps.forEach((dependency) => {
      dependency.subscribe(this.updater);
    });
  }

  setComputedValue = () => {
    this._value = this._computedFn();
  };

  updater = () => {
    this.setComputedValue();
    this.notifyListeners();
  };

  get value() {
    this.setComputedValue();
    return this._value;
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

export const signal = (value) => new Signal(value);
export const computed = (fn, deps) => new Computed(fn, deps);
