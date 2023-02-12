import React from "react";
import classes from "./Input.module.css";

export const Input: React.FC<{ label: string; input: any }> = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  );
};
