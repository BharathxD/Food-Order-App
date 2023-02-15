import classes from "./MealItemForm.module.css";
import { Input } from "../../UI/Input";
import { FormEvent, useRef, useState } from "react";

export const MealItemForm: React.FC<{
  onAddToCart: (amount: number) => void;
}> = (props) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current!.value;
    const enteredAmountNumber = parseInt(enteredAmount);
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <>
      <form onSubmit={submitHandler} className={classes.form}>
        <Input
          label="Amount"
          inputRef={amountInputRef}
          input={{
            id: "amount",
            type: "number",
            min: "1",
            max: "5",
            step: "1",
            defaultValue: "1",
            placeholder: "Amount",
          }}
        />
        <button type="submit">+ Add</button>
        {!isValid && <p>Please enter a valid amount (1-5).</p>}
      </form>
    </>
  );
};
