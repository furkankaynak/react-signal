import { useRef, useState } from "react";
import { computed, signal } from "../lib/Signal";

// We can use signals outside of component
const counter = signal(0);

const computedCount = computed(() => {
  return counter.value * 5;
}, [counter]);

const doubleComputedCount = computed(() => {
  return computedCount * 5;
}, [computedCount]);

export function ComputedExample() {
  const [, forceRender] = useState();

  const renderCount = useRef(0);
  renderCount.current += 1;

  const increment = () => {
    counter.value++;
  };

  return (
    <div className="App">
      <h1>Computed With Dependency Test</h1>

      <h3>Count: {counter}</h3>
      <h3>Computed Count: {computedCount}</h3>
      <h3>Double Computed Count: {doubleComputedCount}</h3>

      <button onClick={increment}>increment</button>

      <h4>
        App Render Count: {renderCount.current}
        <button onClick={forceRender}>Render App</button>
      </h4>
    </div>
  );
}
