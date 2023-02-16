import React, { useRef, useState, useEffect, useContext } from "react";
import classes from "./Checkout.module.css";
import { Input } from "../UI/Input";
import { CheckoutType } from "../../Store/Checkout.types";
import { useHTTP } from "../../hooks/useHTTP";
import CartContext from "../../Store/cart-context";

interface ICheckoutProps {
  onCancel: () => void;
}

const isEmpty = (value: string) =>
  value.trim() === "" && value.trim().length === 0;
const isFiveChars = (value: number) => value.toString().length === 5;

export const Checkout: React.FC<ICheckoutProps> = (props) => {
  const context = useContext(CartContext);
  const [data, setData] = useState<CheckoutType>();
  const response = useHTTP({
    url: "https://star-wars-f4c01-default-rtdb.firebaseio.com/Checkout.json",
    method: "POST",
    body: data,
  });
  useEffect(() => {
    response.useHttpHandler();
  }, [data]);
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
    const postal: number = parseInt(postalInputRef.current!.value);
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
    const data: CheckoutType = {
      name: name,
      city: city,
      street: street,
      postalCode: postal,
      meals: context.items,
    };
    setData(data);
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
        <div className={classes.success}>
          {response.hasError &&
            !response.isLoading &&
            "Your Order couldn't be placed, try again later."}
          {!response.hasError &&
            !response.isLoading &&
            "Your Order has been placed."}
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
