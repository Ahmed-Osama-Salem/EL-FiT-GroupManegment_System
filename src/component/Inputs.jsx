import React from "react";

function Inputs(props) {
  return (
    <>
      <label htmlFor={props.label} className="form-label">
        {props.label}
      </label>
      <input
        onChange={props.onType}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        autoComplete={props.autoComplete}
        required={props.requierd}
      />
    </>
  );
}

export default Inputs;
