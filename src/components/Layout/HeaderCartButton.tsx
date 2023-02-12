import React, { useContext } from "react";
import CartContext from "../../Store/cart-context";
import { CartIcon } from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

export const HeaderCartButton: React.FC<{ onClickHandler: () => void }> = (
  props
) => {
  const context = useContext(CartContext);
  const noOfCartItems = context.items.reduce(
    (currentNumber, item: { amount: number }) => {
      return currentNumber + item.amount;
    },
    0
  );

  return (
    <button className={classes.button} onClick={props.onClickHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfCartItems}</span>
    </button>
  );
};
