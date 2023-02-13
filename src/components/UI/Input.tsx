import React from "react";
import classes from "./Input.module.css";

type InputTagType = {
  id: string;
  type: string;
  min?: string;
  max?: string;
  step?: string;
  defaultValue?: string;
};

type InputProp = {
  amountInputRef: React.Ref<HTMLInputElement>;
  label: string;
  input: InputTagType;
};

export const Input: React.FC<InputProp> = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input
        {...props.input}
        placeholder={props.label}
        ref={props.amountInputRef}
      />
    </div>
  );
});
