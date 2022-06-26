import React from "react";

export const CheckBox = (props) => {
  return (
      <div>
      <input
        key={props.id}
        onClick={props.handleCheckChieldElement}
        type="checkbox"
        checked={props.disabled}
        value={props.value}
      />{" "}
      <label>{props.value}</label>
      </div>
  );
};

export default CheckBox;