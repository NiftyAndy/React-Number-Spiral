import React from "react";
import classNames from "classnames";
import "./index.css";

const NumberBox = ({ highlighted, number }) => (
  <div
    className={classNames("box", {
      highlighted: highlighted.includes(number)
    })}
  >
    <div className="number">{number}</div>
  </div>
);

export default NumberBox;
