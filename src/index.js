import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import NumberBox from "./components/NumberBox";

import "./styles.css";

const numberMatrix = [
  [43, 44, 45, 46, 47, 48, 49],
  [42, 21, 22, 23, 24, 25, 26],
  [41, 20, 7, 8, 9, 10, 27],
  [40, 19, 6, 1, 2, 11, 28],
  [39, 18, 5, 4, 3, 12, 29],
  [38, 17, 16, 15, 14, 13, 30],
  [37, 36, 35, 34, 33, 32, 31]
];

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => clearInterval(id);
  }, [delay]);
};

const App = () => {
  const [highlighted, setHighlighted] = useState([]);
  const [expanding, setExpanding] = useState(true);

  const expandArr = () => setHighlighted([...highlighted, highlighted.length]);
  const reduceArr = () =>
    setHighlighted(highlighted.slice(0, highlighted.length - 1));

  useInterval(() => {
    if (highlighted.length === 0) {
      setExpanding(true);
      expandArr();
    } else if (highlighted.length === 50) {
      setExpanding(false);
      reduceArr();
    } else if (highlighted.length < 50 && expanding) {
      expandArr();
    } else if (!expanding && highlighted.length > 0) {
      reduceArr();
    }
  }, 100);

  return (
    <div className="App">
      {numberMatrix.map(row => (
        <div className="boxRow">
          {row.map(number => (
            <NumberBox key={number} number={number} highlighted={highlighted} />
          ))}
        </div>
      ))}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
