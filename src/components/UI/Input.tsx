import React from "react";
import classes from "./Input.module.css";

export const Input: React.FC<{
  amountInputRef: React.MutableRefObject<HTMLInputElement | undefined>;
  label: string;
  input: any;
}> = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} ref={props.amountInputRef} />
    </div>
  );
});
