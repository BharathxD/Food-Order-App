import React, { useContext, useState, useEffect } from "react";
import CartContext from "../../Context/cart-context";
import { CartIcon } from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

export const HeaderCartButton: React.FC<{ onClickHandler: () => void }> = (
  props
) => {
  const [buttonIsHighlighted, setButtonIsHighlighted] =
    useState<boolean>(false);
  const context = useContext(CartContext);
  const { items } = context;
  const noOfCartItems = items.reduce(
    (currentNumber, item: { amount: number }) => {
      return currentNumber + item.amount;
    },
    0
  );

  const btnClasses = `${classes.button} ${
    buttonIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) return;
    setButtonIsHighlighted(true);
    const cleaner = setTimeout(() => {
      setButtonIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(cleaner);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClickHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfCartItems}</span>
    </button>
  );
};
