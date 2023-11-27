import { useState } from "react";
import { SignalExample } from './examples/SignalExample';
import { ComputedExample } from './examples/ComputedExample';


export default function App() {
  const [testFeature, setTestFeature] = useState("signal");

  let testFeatureComponent = <SignalExample />;
  if (testFeature === "signal") {
    testFeatureComponent = <SignalExample />;
  } else if (testFeature === "computed") {
    testFeatureComponent = <ComputedExample />;
  }

  return (
    <div className="App">
      <ul style={{ backgroundColor: "#e9b14a", padding: "10px" }}>
        <li>
          <button
            onClick={() => {
              setTestFeature("signal");
            }}
          >
            Test Signal
          </button>
        </li>
        <li style={{ marginTop: "5px" }}>
          <button
            onClick={() => {
              setTestFeature("computed");
            }}
          >
            Test Signal and Computed With Deps Signal
          </button>
        </li>
      </ul>
      {testFeatureComponent}
    </div>
  );
}
