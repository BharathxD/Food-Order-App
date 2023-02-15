import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";
import { Input } from "../UI/Input";

interface ICheckoutProps {
  onCancel: () => void;
}

const isEmpty = (value: string) =>
  value.trim() === "" && value.trim().length === 0;
const isFiveChars = (value: string) => value.trim().length === 5;

export const Checkout: React.FC<ICheckoutProps> = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    city: true,
    street: true,
    postalCode: true,
  });

  const nameInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const postalInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);

  const confirmHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const name = nameInputRef.current!.value;
    const street = streetInputRef.current!.value;
    const postal = postalInputRef.current!.value;
    const city = cityInputRef.current!.value;
    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const postalIsValid = isFiveChars(postal);
    const cityIsValid = !isEmpty(city);
    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;
    setFormInputValidity({
      name: nameIsValid,
      city: cityIsValid,
      street: streetIsValid,
      postalCode: postalIsValid,
    });
    if (!formIsValid) {
      console.log("INVALID");
      return;
    }
    nameInputRef.current!.value = "";
    streetInputRef.current!.value = "";
    postalInputRef.current!.value = "";
    cityInputRef.current!.value = "";
  };

  const nameControlClass = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetControlClass = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const postalControlClass = `${classes.control} ${
    formInputValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClass = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div>
        <div className={nameControlClass}>
          <Input
            input={{ type: "text", id: "name", placeholder: "Name" }}
            inputRef={nameInputRef}
          />
          {!formInputValidity.name && <p>Enter a valid Name</p>}
        </div>

        <div className={streetControlClass}>
          <Input
            input={{ type: "text", id: "street", placeholder: "Street Name" }}
            inputRef={streetInputRef}
          />
          {!formInputValidity.street && <p>Enter a valid Street Name</p>}
        </div>

        <div className={postalControlClass}>
          <Input
            input={{
              type: "number",
              id: "PostalCode",
              placeholder: "Postal Code",
            }}
            inputRef={postalInputRef}
          />
          {!formInputValidity.postalCode && <p>Enter a valid Postal Code</p>}
        </div>

        <div className={cityControlClass}>
          <Input
            input={{ type: "text", id: "city", placeholder: "City" }}
            inputRef={cityInputRef}
          />
          {!formInputValidity.city && <p>Enter a valid City Name</p>}
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button onClick={confirmHandler} className={classes.submit}>
          Place Order
        </button>
      </div>
    </form>
  );
};
