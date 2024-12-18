import "./styles.css";
import { useState, useRef } from "react";

export default function App() {
  const [result, setResult] = useState(0);
  const [updateBy, setUpdateBy] = useState(1);
  const [positiveBound, setPositiveBound] = useState(100);
  const [negativeBound, setNegativeBound] = useState(-100);
  const [delay, setDelay] = useState(1);
  const [showAsyncPlus, setShowAsyncPlus] = useState(true);
  const [showAsyncMinus, setShowAsyncMinus] = useState(true);
  let positiveTimerID = useRef(null);
  let negativeTimerID = useRef(null);

  const increment = () => {
    if (!(result + updateBy > positiveBound)) {
      setResult((prev) => prev + updateBy);
      if (positiveTimerID.current) {
        clearTimeout(positiveTimerID.current);
        setShowAsyncPlus(true);
      }
    }
  };

  const decrement = () => {
    if (!(result - updateBy < negativeBound)) {
      setResult((prev) => prev - updateBy);
      if (negativeTimerID.current) {
        clearTimeout(negativeTimerID.current);
        setShowAsyncMinus(true);
      }
    }
  };

  const onSerializedClick = (type) => {
    if (type === "INCREMENT") {
      increment();
    } else {
      decrement();
    }
  };

  const onAsyncClick = (type) => {
    if (type === "INCREMENT") {
      setShowAsyncPlus(false);
      positiveTimerID.current = setTimeout(increment, delay * 1000);
    } else {
      setShowAsyncMinus(false);
      negativeTimerID.current = setTimeout(decrement, delay * 1000);
    }
  };

  return (
    <div className="App">
      <h1>Advanced Counter</h1>
      <div className="counter">
        <div> {result} </div>
        <div>
          <button
            onClick={() => {
              onSerializedClick("INCREMENT");
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              onSerializedClick("DECREMENT");
            }}
          >
            -
          </button>
        </div>
        <div>
          <button
            disabled={!showAsyncPlus}
            onClick={() => {
              onAsyncClick("INCREMENT");
            }}
          >
            Async +
          </button>
          <button
            disabled={!showAsyncMinus}
            onClick={() => {
              onAsyncClick("DECREMENT");
            }}
          >
            Async -
          </button>
        </div>
        <input
          type="range"
          min="1"
          max="5"
          step="2"
          onChange={(e) => setDelay(Number(e.target.value))}
          value={delay}
        />
        <div>
          <span>Increment/Decrement by</span>
          <input
            type="number"
            value={updateBy}
            onChange={(e) => setUpdateBy(Number(e.target.value))}
          />
        </div>
        <div>
          <span>Lower Limit</span>
          <input
            type="number"
            value={negativeBound}
            onChange={(e) => setNegativeBound(e.target.value)}
          />
        </div>
        <div>
          <span>Upper Limit</span>
          <input
            min={0}
            type="number"
            value={positiveBound}
            onChange={(e) => setPositiveBound(e.target.value)}
          />
        </div>
        <button onClick={() => setResult(0)}>RESET</button>
      </div>
    </div>
  );
}
