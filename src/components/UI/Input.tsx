import React from "react";
import classes from "./Input.module.css";

type InputTagType = {
  id: string;
  type: string;
  placeholder?: string;
  min?: string;
  max?: string;
  step?: string;
  defaultValue?: string;
};

type InputProp = {
  inputRef: React.Ref<HTMLInputElement>;
  label?: string;
  input: InputTagType;
};

export const Input: React.FC<InputProp> = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      {props.label && <label htmlFor={props.input.id}>{props.label}</label>}
      <input {...props.input} ref={props.inputRef} />
    </div>
  );
});
