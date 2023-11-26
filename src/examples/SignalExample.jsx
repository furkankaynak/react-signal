import { useRef, useState } from "react";
import { signal } from "../lib/Signal";

// We can use signals outside of component
const counter = signal(0);

export function SignalExample() {
  const [, forceRender] = useState();

  const renderCount = useRef(0);
  renderCount.current += 1;

  const increment = () => {
    counter.value++;
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h1>Signal Test</h1>

      <h2>Count: {counter}</h2>

      <button onClick={increment}>increment</button>

      <h4>
        App Render Count: {renderCount.current}
        <button onClick={forceRender}>Render App</button>
      </h4>
    </div>
  );
}
